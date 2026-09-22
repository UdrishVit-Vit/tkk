#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собрать сезонный источник глоссария «Огней» из Campaign_KB.

Campaign_KB хранит сущности сразу по всей кампании. Этот адаптер вырезает
нужный сезон, переводит глобальные номера глав в сезонные и выпускает схему,
которую понимает scripts/import-ogni-glossary.py.

Пример:
    python scripts/build-ogni-glossary-source.py --season 2
    python scripts/import-ogni-glossary.py --season 2 .tmpwork/ogni-glossary/season2_glossary.json
"""

from __future__ import annotations

import argparse
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


TRANSCRIPTS = Path('C:/EnoaTranscripts')
KB_FILE = TRANSCRIPTS / 'Campaign_KB' / 'campaign_knowledge.json'
ALIASES_FILE = TRANSCRIPTS / 'enoa_glossary.json'
REPO = Path(__file__).resolve().parent.parent
DEFAULT_OUT = REPO / '.tmpwork' / 'ogni-glossary'

SEASONS = {
    2: {'episode_first': 34, 'episode_last': 61, 'chapter_first': 33, 'chapter_last': 60},
    3: {'episode_first': 62, 'episode_last': 71, 'chapter_first': 61, 'chapter_last': 70},
}

CATEGORY_SECTION = {
    'ПЕРСОНАЖ': 'Другие персонажи',
    'ГЕОГРАФИЯ': 'Земли и места',
    'ОРГАНИЗАЦИЯ': 'Организации, дома и кланы',
    'СУЩЕСТВО_РЕСУРС': 'Народы и существа',
    'РЕЛИГИЯ': 'Вера, боги и устройство мира',
    'АРТЕФАКТ_МАГИЯ': 'Артефакты, магия и ресурсы',
    'КУЛЬТУРА': 'Культура, языки и обычаи',
}

HERO_NAMES = {
    'Абракс', 'Барбан', 'Ияр', 'Иярдар', 'Кофу', 'Миндер', 'Пепел', 'Сарим', 'Шида',
}

SECTION_PRIORITY = {
    'Герои и спутники': 0,
    'Вера, боги и устройство мира': 1,
    'Народы и существа': 2,
    'Организации, дома и кланы': 3,
    'Земли и места': 4,
    'Артефакты, магия и ресурсы': 5,
    'Культура, языки и обычаи': 6,
    'Другие персонажи': 7,
}


def load_json(path: Path):
    return json.loads(path.read_text(encoding='utf-8'))


def chapter_for_episode(episode: int, config: dict) -> int:
    global_chapter = episode - 1
    return global_chapter - config['chapter_first'] + 1


def alias_index():
    if not ALIASES_FILE.exists():
        return {}
    data = load_json(ALIASES_FILE)
    return {
        entry['canonical']: entry.get('variants', [])
        for entry in data.get('entries', [])
        if entry.get('canonical')
    }


def build_entry(entity: dict, season: int, config: dict, aliases: dict, roles: dict):
    lo, hi = config['episode_first'], config['episode_last']
    claims = []
    seen_claims = set()
    for claim in entity.get('claims', []):
        episode = claim.get('episode')
        if not isinstance(episode, int) or not lo <= episode <= hi:
            continue
        key = (claim.get('text', '').strip(), episode, claim.get('status'))
        if not key[0] or key in seen_claims:
            continue
        seen_claims.add(key)
        claims.append({
            'text': key[0],
            'status': claim.get('status') or 'НЕ ПОДТВЕРЖДЕНО',
            'confidence': claim.get('confidence') or 'high',
            'chapter': chapter_for_episode(episode, config),
        })

    summaries = []
    seen_summaries = set()
    for summary in entity.get('summaries', []):
        episode = summary.get('episode')
        text = (summary.get('text') or '').strip()
        if not isinstance(episode, int) or not lo <= episode <= hi or not text:
            continue
        key = (episode, text)
        if key in seen_summaries:
            continue
        seen_summaries.add(key)
        summaries.append({
            'chapter': chapter_for_episode(episode, config),
            'text': text,
            'chapterSource': 'exact',
        })

    if not claims and not summaries:
        return None

    name = entity['name']
    section = CATEGORY_SECTION.get(entity.get('category'), 'Культура, языки и обычаи')
    if name in HERO_NAMES:
        section = 'Герои и спутники'

    chapters = sorted({
        *[item['chapter'] for item in claims],
        *[item['chapter'] for item in summaries],
    })
    profile = {}
    if name in roles:
        profile['role'] = roles[name]

    return {
        'name': name,
        'category': entity.get('category', ''),
        'section': section,
        'source_names': [],
        'aliases': aliases.get(name, []),
        'summaries': sorted(summaries, key=lambda item: item['chapter']),
        'claims': sorted(claims, key=lambda item: (item['chapter'], item['status'], item['text'])),
        'profile': profile,
        'chapters': chapters,
    }


def merge_same_name(entries: list[dict]) -> list[dict]:
    """Campaign_KB иногда разводит один термин по двум категориям.

    Сайт закрепляет URL за именем, поэтому такие грани должны жить в одной
    статье. Раздел выбирается по смысловому приоритету, сведения сохраняются все.
    """
    by_name = {}
    for entry in entries:
        current = by_name.get(entry['name'])
        if current is None:
            by_name[entry['name']] = entry
            continue
        preferred = min(
            (current, entry),
            key=lambda item: SECTION_PRIORITY.get(item['section'], 99),
        )
        current['category'] = preferred['category']
        current['section'] = preferred['section']
        current['aliases'] = sorted(set(current['aliases'] + entry['aliases']))
        current['summaries'] = sorted(
            current['summaries'] + entry['summaries'], key=lambda item: item['chapter']
        )
        current['claims'] = sorted(
            current['claims'] + entry['claims'],
            key=lambda item: (item['chapter'], item['status'], item['text']),
        )
        current['chapters'] = sorted(set(current['chapters'] + entry['chapters']))
        current['profile'] = {**current['profile'], **entry['profile']}
    return list(by_name.values())


def main() -> int:
    ap = argparse.ArgumentParser(description='Сезонный срез Campaign_KB для сайта.')
    ap.add_argument('--season', type=int, choices=sorted(SEASONS), required=True)
    ap.add_argument('--output', type=Path, help='выходной JSON')
    args = ap.parse_args()

    if not KB_FILE.exists():
        raise SystemExit(f'Не найдена база кампании: {KB_FILE}')

    season = args.season
    config = SEASONS[season]
    kb = load_json(KB_FILE)
    aliases = alias_index()
    roles = {
        item['name']: item.get('role', '')
        for item in kb.get('core_characters', [])
        if item.get('name') and item.get('role') and item.get('id') != 'game_master'
    }

    entries = []
    for entity in kb.get('entities', []):
        entry = build_entry(entity, season, config, aliases, roles)
        if entry:
            entries.append(entry)
    entries = merge_same_name(entries)
    entries.sort(key=lambda item: item['name'].casefold())

    section_counts = Counter(item['section'] for item in entries)
    claim_count = sum(len(item['claims']) for item in entries)
    now = datetime.now(timezone.utc).isoformat()
    payload = {
        'schema_version': 2,
        'glossary_version': f'campaign-kb-{kb.get("generated_at", now)[:10]}',
        'book_version': '0.10.0',
        'generated_at': now,
        'scope': (
            f'Кампания II, сезон {season}, главы '
            f'{config["chapter_first"]}-{config["chapter_last"]}'
        ),
        'spoiler_policy': 'player-visible; СКРЫТО ОТ ИГРОКОВ исключается при импорте',
        'source_file': str(KB_FILE),
        'counts': {
            'entries': len(entries),
            'claims': claim_count,
            'sections': dict(section_counts),
        },
        'entries': entries,
    }

    output = args.output or DEFAULT_OUT / f'season{season}_glossary.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Сезон {season}: статей {len(entries)}, утверждений {claim_count}')
    print(f'Записано: {output}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
