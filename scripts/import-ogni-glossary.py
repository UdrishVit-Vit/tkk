#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Импорт глоссария кампании «Огни» из C:\\EnoaTranscripts в данные сайта.

Источник — машиночитаемый свод, собранный пайплайном транскриптов:
    Campaign_KB/Season<N>_Glossary/season<N>_glossary.json

Результат:
    app/data/loreOgniGlossary/season-<NN>.generated.json  — данные для сайта
    app/data/loreOgniGlossary/slugs.json                  — реестр слагов (append-only)
    app/data/loreOgniGlossary/season-<NN>.report.md       — отчёт для автора

Запуск:
    python scripts/import-ogni-glossary.py --season 1
    python scripts/import-ogni-glossary.py --season 2 "<путь к json>"

Правила:
  * Слаг статьи фиксируется в slugs.json и больше не меняется — иначе поедут URL.
    Сезоны 2 и 3 переиспользуют слаг по имени сущности, поэтому «Ияр» останется
    одной статьёй с несколькими сезонными вхождениями.
  * Утверждения со статусом «СКРЫТО ОТ ИГРОКОВ» в данные сайта не попадают:
    это мастерское знание и защищённый будущий сюжет. Их число и состав видны
    только в отчёте. Флаг --include-hidden снимает защиту осознанно.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from collections import Counter, OrderedDict
from datetime import datetime, timezone
from pathlib import Path

from ogni_facets import build_facets
from ogni_text import chapter_texts, fold, mentioned, name_variants

REPO = Path(__file__).resolve().parent.parent
DATA_DIR = REPO / 'app' / 'data' / 'loreOgniGlossary'
SLUGS_FILE = DATA_DIR / 'slugs.json'
SITE_GLOSSARY = REPO / 'app' / 'data' / 'loreGlossary.js'
UZLY_FILE = REPO / 'app' / 'data' / 'loreUzlyOgni.generated.json'
TRANSCRIPTS = Path('C:/EnoaTranscripts')

SOURCE_ID = 'ogni'

# Статус утверждения: код для UI + подпись, как её печатает бумажный справочник.
CLAIM_STATUS = {
    'ФАКТ МИРА':          ('world-fact',  'Факт мира'),
    'СОБЫТИЕ':            ('event',       'Событие'),
    'НАМЁК МАСТЕРА':      ('gm-hint',     'Намёк Мастера'),
    'ПОВЕРЬЕ':            ('belief',      'Поверье'),
    'ИМПРО-КАНОН':        ('scene-canon', 'Канон сцены'),
    'НЕ ПОДТВЕРЖДЕНО':    ('unconfirmed', 'Не подтверждено'),
    'СКРЫТО ОТ ИГРОКОВ':  ('gm-only',     'Скрыто от игроков'),
}
HIDDEN_STATUS = 'СКРЫТО ОТ ИГРОКОВ'

# Раздел справочника -> категория глоссария сайта.
# `characters` и `culture` — новые категории, их нужно добавить
# в LORE_GLOSSARY_CATEGORIES (app/data/loreGlossary.js).
CATEGORY_BY_SECTION = {
    'Герои и спутники':             'characters',
    'Другие персонажи':             'characters',
    'Земли и места':                'places',
    'Организации, дома и кланы':    'powers',
    'Народы и существа':            'beings',
    'Вера, боги и устройство мира': 'foundations',
    'Артефакты, магия и ресурсы':   'practices',
    'Культура, языки и обычаи':     'culture',
}

# Раздел справочника -> раздел сайта в хабе Lore (для будущих страниц).
SITE_SECTION_BY_SECTION = {
    'Герои и спутники':             'Персонажи',
    'Другие персонажи':             'Персонажи',
    'Земли и места':                'География',
    'Организации, дома и кланы':    'Гильдии',
    'Народы и существа':            'Животные',
    'Вера, боги и устройство мира': 'Пантеон',
    'Артефакты, магия и ресурсы':   'Предметы',
    'Культура, языки и обычаи':     'Глоссарий',
}

TRANSLIT = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
}


def slugify(name: str) -> str:
    """Транслитерация в том же стиле, что уже принят в app/data/loreGlossary.js."""
    text = unicodedata.normalize('NFC', name).lower()
    out = []
    for ch in text:
        if ch in TRANSLIT:
            out.append(TRANSLIT[ch])
        elif ch.isascii() and ch.isalnum():
            out.append(ch)
        else:
            out.append(' ')
    slug = re.sub(r'\s+', '-', ''.join(out).strip())
    slug = re.sub(r'-{2,}', '-', slug).strip('-')
    return slug or 'entry'


def normalize_term(term: str) -> str:
    """Ключ для сверки с существующим глоссарием сайта."""
    text = unicodedata.normalize('NFC', term).lower().replace('ё', 'е')
    text = re.sub(r"[’'`\u2019\u02bc]", '', text)
    return re.sub(r'[^\w]+', ' ', text, flags=re.UNICODE).strip()


class SlugRegistry:
    """Реестр «имя сущности -> слаг». Пополняется, но не переписывается."""

    def __init__(self, path: Path):
        self.path = path
        self.by_name = OrderedDict()
        if path.exists():
            raw = json.loads(path.read_text(encoding='utf-8'))
            self.by_name = OrderedDict(raw.get('entries', {}))
        self.taken = {slug: name for name, slug in self.by_name.items()}
        self.added = []

    def resolve(self, name: str) -> str:
        if name in self.by_name:
            return self.by_name[name]
        base = slugify(name)
        slug = base
        n = 2
        while slug in self.taken:
            slug = f'{base}-{n}'
            n += 1
        self.by_name[name] = slug
        self.taken[slug] = name
        self.added.append((name, slug))
        return slug

    def save(self) -> None:
        payload = {
            '_comment': (
                'Реестр слагов глоссария «Огни». Пополняется скриптом '
                'scripts/import-ogni-glossary.py и НЕ должен переписываться: '
                'слаг — это URL статьи. Переименование сущности правится здесь '
                'вручную, слаг при этом сохраняется.'
            ),
            'entries': OrderedDict(sorted(self.by_name.items(), key=lambda kv: kv[1])),
        }
        self.path.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'
        )


def load_book():
    if not UZLY_FILE.exists():
        return {}
    return json.loads(UZLY_FILE.read_text(encoding='utf-8'))


def attach_mentions(entries, book):
    """Главы книги, где имя статьи действительно встречается.

    Список `chapters` пришёл из базы знаний: это главы, по которым записано
    хоть одно утверждение. В книге сущность может мелькать и в других главах —
    для читателя это тоже встреча, поэтому храним отдельным полем.
    """
    texts = chapter_texts(book)
    if not texts:
        return
    for entry in entries:
        variants = name_variants(entry)
        if not variants:
            entry['mentions'] = []
            continue
        entry['mentions'] = [
            number for number, text in sorted(texts.items())
            if any(mentioned(text, variant) for variant in variants)
        ]


def attach_relations(entries, limit=14):
    """Связи между статьями: кого статья называет в своих сведениях.

    Глава берётся у самого раннего утверждения, где встретилось имя, — связь
    подчиняется тому же срезу по главам, что и остальные сведения.
    """
    index = []
    for entry in entries:
        variants = name_variants(entry)
        if variants:
            index.append((entry, variants))

    for entry in entries:
        pieces = [(claim['text'], claim['chapter']) for claim in entry['claims']]
        pieces += [(item['text'], item.get('chapter')) for item in entry['summaryByChapter']]
        if not pieces:
            entry['relations'] = []
            continue

        found = {}
        for other, variants in index:
            if other['id'] == entry['id']:
                continue
            for text, chapter in pieces:
                folded = fold(text)
                if not any(mentioned(folded, variant) for variant in variants):
                    continue
                current = found.get(other['id'])
                known = [c for c in ((current or {}).get('chapter'), chapter) if c is not None]
                found[other['id']] = {
                    'id': other['id'],
                    'term': other['term'],
                    'category': other['category'],
                    'chapter': min(known) if known else None,
                    'weight': (current['weight'] + 1) if current else 1,
                }
        entry['relations'] = sorted(
            found.values(),
            key=lambda item: (-item['weight'], item['chapter'] or 99, item['term']),
        )[:limit]


def read_chapter_index():
    """Главы узла «Огни»: номер, слаг и название — для ссылок из статьи в текст."""
    if not UZLY_FILE.exists():
        return []
    data = json.loads(UZLY_FILE.read_text(encoding='utf-8'))
    return [
        {'number': ch['number'], 'slug': ch['slug'], 'title': ch['title']}
        for ch in data.get('chapters', []) if ch.get('number') and ch.get('slug')
    ]


def read_site_glossary():
    """Достаёт термины и синонимы из существующего свода Башни Мафраш."""
    if not SITE_GLOSSARY.exists():
        return []
    text = SITE_GLOSSARY.read_text(encoding='utf-8')
    records = []
    for chunk in re.split(r'\n\s*\{\s*\n?', text)[1:]:
        m_id = re.search(r"id:\s*'([^']+)'", chunk)
        m_term = re.search(r"term:\s*'([^']+)'", chunk)
        if not (m_id and m_term):
            continue
        aliases = []
        m_al = re.search(r"aliases:\s*\[([^\]]*)\]", chunk)
        if m_al:
            aliases = re.findall(r"'([^']+)'", m_al.group(1))
        records.append({'id': m_id.group(1), 'term': m_term.group(1), 'aliases': aliases})
    return records


def read_summaries(raw: dict):
    """Сводки статьи в виде (текст, глава).

    Схема 1 хранила только тексты, схема 2 — тексты с номером главы:
    первую читаем как список строк, вторую как список объектов.
    """
    items = []
    for item in raw.get('summaries', []):
        if isinstance(item, str):
            text, chapter = item, None
        else:
            text, chapter = item.get('text', ''), item.get('chapter')
        text = (text or '').strip()
        if text:
            items.append((text, chapter))
    return items


def build_entry(raw: dict, slug: str, season: int, include_hidden: bool):
    section = raw['section']
    chapters = sorted({int(c) for c in raw.get('chapters', [])})
    summary_items = read_summaries(raw)
    summaries = [text for text, _ in summary_items]

    claims, hidden = [], []
    for c in raw.get('claims', []):
        code, label = CLAIM_STATUS.get(c['status'], ('other', c['status'].capitalize()))
        item = {
            'text': c['text'].strip(),
            'status': code,
            'statusLabel': label,
            'confidence': c.get('confidence') or 'high',
            'season': season,
            'chapter': int(c['chapter']),
        }
        if c['status'] == HIDDEN_STATUS and not include_hidden:
            hidden.append(item)
            continue
        claims.append(item)
    claims.sort(key=lambda c: (c['chapter'], c['statusLabel']))

    profile = {k: v for k, v in (raw.get('profile') or {}).items() if v}
    aliases = [a for a in raw.get('aliases', []) if a and a != raw['name']]
    source_names = [n for n in raw.get('source_names', []) if n and n != raw['name']]

    # Подпись для среза «я дошёл до главы N». Схема 2 несёт главу у каждой
    # сводки; в схеме 1 главу приходится выводить из порядка, и то лишь когда
    # число сводок совпало с числом глав появления.
    if any(chapter is not None for _, chapter in summary_items):
        summary_by_chapter = [
            {'chapter': chapter, 'text': text}
            for text, chapter in summary_items if chapter is not None
        ]
        summary_by_chapter.sort(key=lambda s: s['chapter'])
    elif summaries and len(summaries) == len(chapters):
        summary_by_chapter = [
            {'chapter': ch, 'text': s} for ch, s in zip(chapters, summaries)
        ]
    else:
        summary_by_chapter = []

    entry = {
        'id': slug,
        'term': raw['name'],
        'category': CATEGORY_BY_SECTION.get(section, 'practices'),
        'siteSection': SITE_SECTION_BY_SECTION.get(section, 'Глоссарий'),
        'section': section,
        'sourceCategory': raw.get('category', ''),
        'hero': section == 'Герои и спутники',
        'stub': not summaries and not claims,
        'aliases': aliases,
        'sourceNames': source_names,
        # Сводки идут по ходу сезона: последняя описывает актуальное состояние
        # сущности, первая — то, что о ней было известно при первом появлении.
        'summary': summaries[-1] if summaries else '',
        'summaryEarly': summaries[0] if summaries else '',
        'summaries': summaries,
        'summaryByChapter': summary_by_chapter,
        'chapters': chapters,
        'firstChapter': chapters[0] if chapters else None,
        'lastChapter': chapters[-1] if chapters else None,
        'profile': profile,
        'claims': claims,
        'claimCounts': dict(Counter(c['status'] for c in claims)),
    }
    return entry, hidden


def write_report(path: Path, ctx: dict) -> None:
    L = []
    A = L.append
    A(f"# Импорт глоссария «Огни» — сезон {ctx['season']}\n")
    A(f"Собрано: {ctx['generated_at']}  ")
    A(f"Редакция справочника: {ctx['glossary_version']}, книга: {ctx['book_version']}\n")

    A('## Что доехало\n')
    A(f"- Статей: **{len(ctx['entries'])}** (исходник: {ctx['source_count']})")
    A(f"- Утверждений опубликовано: **{ctx['claims_published']}** из {ctx['claims_total']}")
    A(f"- Глав в сезоне: {ctx['chapter_count']}")
    A(f"- Слагов в реестре: {ctx['slug_total']} (добавлено этим запуском: {len(ctx['slug_added'])})\n")

    A('## Отрезано от сайта — мастерское знание\n')
    if ctx['hidden']:
        A(f"Статус «Скрыто от игроков» — {len(ctx['hidden'])} утверждений. "
          'На сайт не попали: часть из них раскрывает защищённый сюжет будущих сезонов.\n')
        for h in ctx['hidden']:
            A(f"- **{h['term']}**, гл. {h['chapter']}: {h['text']}")
        A('')
    else:
        A('Нет.\n')

    A('## Статьи без содержания\n')
    if ctx['stubs']:
        A(f"{len(ctx['stubs'])} статей имеют только номера глав — ни сводки, ни утверждений. "
          'Помечены `stub: true`; на сайте их лучше не показывать, пока не наполнены.\n')
        A('- ' + ', '.join(ctx['stubs']) + '\n')
    else:
        A('Нет.\n')

    A('## Статьи без номеров глав\n')
    if ctx['no_chapters']:
        A(f"{len(ctx['no_chapters'])} статей не привязаны ни к одной главе, поэтому "
          'в срезе «я дошёл до главы N» они не появятся вообще.\n')
        A('- ' + ', '.join(ctx['no_chapters']) + '\n')
    else:
        A('Нет.\n')

    A('## Похожие статьи внутри сезона\n')
    if ctx['near_dupes']:
        A('Имена различаются только регистром или знаками — вероятно, одна сущность '
          'разошлась на две статьи наверху, в пайплайне транскриптов.\n')
        for pair in ctx['near_dupes']:
            A('- ' + ' + '.join(f'«{t}» (гл. {ch})' for t, ch in pair))
        A('')
    else:
        A('Нет.\n')

    A('## Сводки без привязки к главам\n')
    A(f"У {ctx['unaligned']} статей нет ни одной сводки с номером главы — либо сводок нет "
      'вовсе, либо статья не нашлась в базе знаний. Срез по главам покажет для них '
      'только утверждения. Чинится наверху: `python normalize_season1_glossary.py` '
      'в `C:\\EnoaTranscripts`.\n')

    A('## Совпадения со сводом Башни Мафраш\n')
    if ctx['matches']:
        A(f"{len(ctx['matches'])} статей уже существуют в `app/data/loreGlossary.js`. "
          'Их нужно свести вручную: одна статья, два источника.\n')
        A('| Статья «Огни» | Совпадение | id на сайте | Как найдено |')
        A('| --- | --- | --- | --- |')
        for m in ctx['matches']:
            A(f"| {m['term']} | {m['site_term']} | `{m['site_id']}` | {m['how']} |")
        A('')
    else:
        A('Нет.\n')

    if ctx['orphans']:
        A('## Имена из реестра, которых нет в исходнике\n')
        A('Переименованы или удалены наверху. Слаг сохранён, чтобы не ломать ссылки.\n')
        A('- ' + ', '.join(ctx['orphans']) + '\n')

    path.write_text('\n'.join(L), encoding='utf-8')


def main() -> int:
    ap = argparse.ArgumentParser(description='Импорт глоссария «Огни» на сайт.')
    ap.add_argument('source', nargs='?', help='путь к season<N>_glossary.json')
    ap.add_argument('--season', type=int, default=1, help='номер сезона (по умолчанию 1)')
    ap.add_argument('--include-hidden', action='store_true',
                    help='ОСОЗНАННО опубликовать утверждения «Скрыто от игроков»')
    args = ap.parse_args()

    season = args.season
    candidates = []
    if args.source:
        candidates.append(Path(args.source))
    else:
        candidates.append(TRANSCRIPTS / 'Campaign_KB' / f'Season{season}_Glossary'
                          / f'season{season}_glossary.json')
        candidates.append(TRANSCRIPTS / 'Campaign_KB' / f'Season_{season}_Glossary'
                          / f'season{season}_glossary.json')
    src = next((p for p in candidates if p.exists()), None)
    if src is None:
        print(f'Не найден исходник: {candidates[0]}', file=sys.stderr)
        return 1

    raw = json.loads(src.read_text(encoding='utf-8'))
    entries_raw = raw['entries']
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    registry = SlugRegistry(SLUGS_FILE)
    seen_names = set()

    entries, hidden_all = [], []
    for item in entries_raw:
        name = item['name']
        if name in seen_names:
            print(f'Дубль имени в исходнике: {name}', file=sys.stderr)
        seen_names.add(name)
        slug = registry.resolve(name)
        entry, hidden = build_entry(item, slug, season, args.include_hidden)
        entries.append(entry)
        for h in hidden:
            hidden_all.append({'term': name, **h})

    entries.sort(key=lambda e: e['term'].lower())

    book = load_book()
    attach_mentions(entries, book)
    attach_relations(entries)
    for entry in entries:
        entry['facets'] = build_facets(entry)

    chapter_count = max((e['lastChapter'] or 0) for e in entries)

    generated_at = datetime.now(timezone.utc).isoformat()
    payload = {
        'schemaVersion': 1,
        'source': SOURCE_ID,
        'season': season,
        'seasonTitle': raw.get('scope', f'Сезон {season}'),
        'glossaryVersion': raw.get('glossary_version', ''),
        'bookVersion': raw.get('book_version', ''),
        'spoilerPolicy': raw.get('spoiler_policy', ''),
        'generatedAt': generated_at,
        'sourceFile': str(src),
        'chapterCount': chapter_count,
        'chapterIndex': read_chapter_index(),
        'counts': {
            'entries': len(entries),
            'claims': sum(len(e['claims']) for e in entries),
            'withheld': len(hidden_all),
            'sections': dict(Counter(e['section'] for e in entries)),
        },
        'entries': entries,
    }

    out = DATA_DIR / f'season-{season:02d}.generated.json'
    out.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    registry.save()

    # Сверка с существующим сводом сайта.
    site = read_site_glossary()
    site_index = {}
    for rec in site:
        for key in [rec['term'], *rec['aliases']]:
            site_index.setdefault(
                normalize_term(key),
                (rec, 'термин' if key == rec['term'] else 'синоним'),
            )
    matches = []
    for e in entries:
        for key in [e['term'], *e['aliases'], *e['sourceNames']]:
            hit = site_index.get(normalize_term(key))
            if hit:
                rec, how = hit
                matches.append({'term': e['term'], 'site_term': rec['term'],
                                'site_id': rec['id'], 'how': how})
                break

    # Статьи, разошедшиеся из-за регистра или апострофа.
    by_key = OrderedDict()
    for e in entries:
        by_key.setdefault(normalize_term(e['term']), []).append(e)
    near_dupes = [
        [(e['term'], ', '.join(str(c) for c in e['chapters']) or '—') for e in group]
        for group in by_key.values() if len(group) > 1
    ]

    report = DATA_DIR / f'season-{season:02d}.report.md'
    write_report(report, {
        'season': season,
        'generated_at': generated_at,
        'glossary_version': payload['glossaryVersion'],
        'book_version': payload['bookVersion'],
        'entries': entries,
        'source_count': len(entries_raw),
        'claims_published': payload['counts']['claims'],
        'claims_total': sum(len(x.get('claims', [])) for x in entries_raw),
        'chapter_count': chapter_count,
        'slug_total': len(registry.by_name),
        'slug_added': registry.added,
        'hidden': hidden_all,
        'stubs': [e['term'] for e in entries if e['stub']],
        'no_chapters': [e['term'] for e in entries if not e['chapters']],
        'near_dupes': near_dupes,
        'unaligned': sum(1 for e in entries if not e['summaryByChapter']),
        'matches': matches,
        'orphans': [n for n in registry.by_name if n not in seen_names],
    })

    print(f'Статей: {len(entries)}; утверждений: {payload["counts"]["claims"]}; '
          f'отрезано мастерских: {len(hidden_all)}')
    print(f'Данные:  {out}')
    print(f'Реестр:  {SLUGS_FILE} ({len(registry.by_name)} слагов, +{len(registry.added)})')
    print(f'Отчёт:   {report}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
