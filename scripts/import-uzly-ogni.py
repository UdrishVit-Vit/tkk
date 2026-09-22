"""Импорт литературных редакций «Огней» из PDF в узел Lore.

Результат: app/data/loreUzlyOgni.generated.json - блоки текста всех сезонов.

Запуск без аргументов берёт три готовые редакции из C:\\EnoaTranscripts::
    python scripts/import-uzly-ogni.py

Пути можно передать явно (номер сезона извлекается из имени файла):
    python scripts/import-uzly-ogni.py "<сезон 1.pdf>" "<сезон 2.pdf>" "<сезон 3.pdf>"

Разметка исходника (по шрифтам):
    CormorantGaramond-SemiBold 27    - титул главы на полосе-разделителе;
    CormorantGaramond-SemiBold 25-26 - тот же титул на первой полосе главы;
    CormorantGaramond-SemiBold 13/17 - подзаголовок сцены внутри главы;
    Constantia 8.9                   - основной текст;
    ArialNarrow-Bold 6.5/7.0         - колонтитул и надпись «ГЛАВА NN»;
    CormorantGaramond-Italic         - «Глава NN» и «Конец главы NN».

Абзацы собираются по межстрочному интервалу: внутри абзаца шаг строк 12.6-12.7
пункта, между абзацами - 18.6-18.7. Отступ первой строки для этого не годится:
у авторской речи отступ на первой строке, а у реплик - на переносах.
"""

import argparse
import json
import re
import sys
from pathlib import Path

import fitz

BODY_FONT = 'Constantia'
HEAD_FONT = 'CormorantGaramond-SemiBo'
ITALIC_FONT = 'CormorantGaramond-Italic'
BODY_SIZE = 8.9
CHAPTER_TITLE_MIN = 24.0
HEADING_SIZES = (13.0, 17.0)
PARAGRAPH_INDENT = 70.0  # красная строка ~76, обычная ~64
PARAGRAPH_GAP = 15.5     # шаг строк внутри абзаца ~12.6, между абзацами ~18.6

ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / 'app' / 'data' / 'loreUzlyOgni.generated.json'

DIVIDER_MARK = re.compile(r'^Глава\s+\d+$', re.I)
# Служебные подзаголовки: «Глава 9. Охота», «Кампания 2. Глава 11», «Конец главы».
SERVICE_HEADING = re.compile(r'^(Глава|Кампания)\s+\d+|^Конец\s+(первой\s+)?глав', re.I)
NOTE_MARKER = 'Атмосферная хроника по сыгранной партии'
DASH_START = re.compile(r'^[-‐-―]\s')
SENTENCE_END = re.compile(r'[.!?…»:"]$')

SEASONS = {
    1: {
        'start': 1,
        'slugs': [
            'severnyy-veter', 'holmy-tishiny', 'les-rubyat-shchepki-letyat', 'stena-kostey',
            'dela-poshli-ne-tak', 'gorod-v-ogne', 'provodnik', 'beglecy-i-yamy', 'ohota',
            'pomestye-tashar', 'dobro-pozhalovat-v-migdash', 'plamya-belyh-sokolov',
            'luchshiy-strelok-migdasha', 'svoboda-ot-grehov', 'sekret-druzhby',
            's-ognem-ne-igrayut', 'karty-raskryty', 'vechnyy-ogon', 'beskonechnaya-voyna',
            'po-goryachim-sledam', 'velikie-gonki', 'zhizn-smertnogo', 'kryshi-i-dedy',
            'solnechnye-holmy', 'proklyatie-zemel', 'prizvanie', 'cena', 'zagadki-bogini',
            'pozhiratel', 'sekrety-holmov', 'malahitovaya-gryada', 'solnce-hranit',
        ],
    },
    2: {
        'start': 33,
        'slugs': [
            'sovet', 'put', 'pustota-i-holod', 'put-korolya', 'kto-ty', 'hram-krovi',
            'novye-zemli-i-problemy', 'vybor-puti', 'dobro-pozhalovat-v-tikchik',
            'kraby-i-rakushki', 'ogni-v-nochi', 'osvoboditsya-ot-sudby', 'na-grani-vuali',
            'v-poiskah-rudnikov', 'razdelyay-i-vlastvuy', 'chernyy-kvadrat',
            'vodovorot-sudby', 'strah-i-nenavist-v-daskare', 'put-meridirov',
            'solncelikiy', 'spiral-vniz', 'komponent-zhizni', 'dogovor-glubin',
            'taktika-ot-boga', 'vstrecha-v-spirali', 'grehi-predkov',
            'dangunskiy-sovet', 'hurhonskaya-borba',
        ],
    },
    3: {
        'start': 61,
        'slugs': [
            'nachalo-igry', 'plany-v-nochi', 'pererozhdenie', 'zameshatelstvo', 'son',
            '5-putey', 'postanovlenie', 'ohota-otkryta', 'ogon-spasenie', 'voyna',
        ],
    },
}

TITLE_OVERRIDES = {
    'kto-ty': 'Кто ты?',
}

DEFAULT_SOURCE_DIR = Path('C:/EnoaTranscripts/Готовые версии')


def clean(text):
    text = text.replace('­', '').replace(' ', ' ')
    return re.sub(r'\s+', ' ', text).strip()


def fold(text):
    """Ключ для сравнения заголовка с титулом главы: без ё, регистра и пунктуации."""
    text = text.lower().replace('ё', 'е')
    return re.sub(r'[^а-яa-z0-9]+', '', text)


def is_divider(page):
    """Полоса-разделитель главы: крупный титул и курсивная подпись «Глава NN»."""
    for block in page.get_text('dict')['blocks']:
        if block['type'] != 0:
            continue
        for line in block['lines']:
            for span in line['spans']:
                if span['font'].startswith(ITALIC_FONT) and DIVIDER_MARK.match(clean(span['text'])):
                    return True
    return False


def collect_lines(page):
    """Строки полосы без колонтитулов, сверху вниз.

    Выключка по формату разносит слова одной строки по отдельным фрагментам,
    поэтому фрагменты сначала группируются по базовой линии.
    """
    pieces = []
    for block in page.get_text('dict')['blocks']:
        if block['type'] != 0:
            continue
        for line in block['lines']:
            for span in line['spans']:
                text = clean(span['text'])
                if not text:
                    continue
                font = span['font']
                if font.startswith('ArialNarrow') or font.startswith('LiberationSans'):
                    continue  # колонтитул, «ГЛАВА NN», шапка разделителя
                pieces.append({
                    'x0': round(span['bbox'][0], 1),
                    'y0': round(span['bbox'][1], 1),
                    'size': round(span['size'], 1),
                    'font': font,
                    'text': text,
                })

    lines = []
    pieces.sort(key=lambda item: (item['y0'], item['x0']))
    for piece in pieces:
        previous = lines[-1] if lines else None
        if previous is not None and abs(previous['y0'] - piece['y0']) < 1.5:
            previous['text'] = f"{previous['text']} {piece['text']}"
            continue
        lines.append(dict(piece))
    return lines


def starts_paragraph(line, previous_line, blocks):
    """Новый абзац - по межстрочному интервалу.

    Внутри абзаца шаг строк 12.6-12.7 пункта, между абзацами 18.6-18.7.
    Отступ первой строки здесь не работает: у авторской речи с красной строки
    отступ на первой строке, а у реплик - наоборот, на переносах.
    На стыке полос интервала нет, и приходится опираться на отступ и точку
    в конце предыдущей строки.
    """
    previous = blocks[-1] if blocks else None
    if previous is None or previous['type'] != 'prose':
        return True
    if previous_line is None:
        return bool(
            line['x0'] > PARAGRAPH_INDENT
            and SENTENCE_END.search(previous['paragraphs'][-1])
        )
    return line['y0'] - previous_line['y0'] > PARAGRAPH_GAP


def parse(pdf_path):
    doc = fitz.open(pdf_path)
    chapters = []
    current = None
    started = False

    for pno in range(len(doc)):
        page = doc[pno]
        lines = collect_lines(page)

        if not started:
            # Всё до разделителя первой главы - обложка, выходные данные, оглавление.
            if not is_divider(page):
                continue
            started = True

        if is_divider(page):
            title = ' '.join(
                item['text'] for item in lines
                if item['font'].startswith(HEAD_FONT) and item['size'] >= CHAPTER_TITLE_MIN
            )
            current = {'title': title, 'page': pno + 1, 'note': '', 'blocks': []}
            chapters.append(current)
            continue

        if current is None:
            continue

        in_note = False
        previous_line = None
        for line in lines:
            size, font, text = line['size'], line['font'], line['text']

            if font.startswith(ITALIC_FONT):
                continue  # «Конец главы NN»

            if font.startswith(HEAD_FONT) and size >= CHAPTER_TITLE_MIN:
                in_note = False
                continue  # титул главы, повторённый на её первой полосе

            if font.startswith(HEAD_FONT) and size in HEADING_SIZES:
                in_note = False
                previous_line = None
                if SERVICE_HEADING.match(text) or fold(text) == fold(current['title']):
                    continue
                current['blocks'].append({'type': 'heading', 'text': text})
                continue

            if font.startswith(BODY_FONT) and abs(size - BODY_SIZE) < 0.6:
                if text.startswith(NOTE_MARKER):
                    current['note'] = text
                    in_note = True
                    previous_line = line
                    continue
                if in_note:
                    if starts_paragraph(line, previous_line, [{'type': 'prose', 'paragraphs': [current['note']]}]):
                        in_note = False  # примечание кончилось, пошёл текст главы
                    else:
                        current['note'] = f"{current['note']} {text}".strip()
                        previous_line = line
                        continue
                if starts_paragraph(line, previous_line, current['blocks']):
                    current['blocks'].append({'type': 'prose', 'paragraphs': [text]})
                else:
                    tail = current['blocks'][-1]['paragraphs'][-1]
                    current['blocks'][-1]['paragraphs'][-1] = f'{tail} {text}'
                previous_line = line
                continue

            raise SystemExit(f'Неизвестный стиль на стр. {pno + 1}: {font} {size} :: {text[:60]}')

    return chapters


def season_from_path(pdf_path):
    match = re.search(r'Сезон\s+(\d+)', Path(pdf_path).name, re.I)
    if not match:
        raise SystemExit(f'Не удалось определить сезон из имени: {pdf_path}')
    season = int(match.group(1))
    if season not in SEASONS:
        raise SystemExit(f'Сезон {season} не описан в SEASONS.')
    return season


def default_sources():
    return [
        DEFAULT_SOURCE_DIR / f'ЭНОА - Кампания II - Сезон {season} - Огни - v0.10.0.pdf'
        for season in sorted(SEASONS)
    ]


def main():
    ap = argparse.ArgumentParser(description='Импорт литературных редакций «Огней».')
    ap.add_argument('pdf', nargs='*', help='PDF сезонов; без аргументов берутся готовые v0.10.0')
    args = ap.parse_args()

    sources = [Path(path) for path in args.pdf] or default_sources()
    missing = [str(path) for path in sources if not path.exists()]
    if missing:
        raise SystemExit('Не найдены PDF:\n' + '\n'.join(missing))

    all_chapters = []
    season_meta = []
    all_notes = []
    seen_seasons = set()
    for pdf_path in sources:
        season = season_from_path(pdf_path)
        if season in seen_seasons:
            raise SystemExit(f'Сезон {season} передан дважды.')
        seen_seasons.add(season)

        parsed = parse(pdf_path)
        config = SEASONS[season]
        slugs = config['slugs']
        if len(parsed) != len(slugs):
            raise SystemExit(
                f'Сезон {season}: ожидалось {len(slugs)} глав, найдено {len(parsed)}.'
            )

        notes = sorted({chapter['note'] for chapter in parsed if chapter['note']})
        all_notes.extend(notes)
        season_meta.append({
            'season': season,
            'title': f'Сезон {season}',
            'source': pdf_path.name,
            'chapterCount': len(parsed),
            'firstChapter': config['start'],
            'lastChapter': config['start'] + len(parsed) - 1,
            'note': notes[0] if notes else '',
        })
        for index, chapter in enumerate(parsed):
            slug = slugs[index]
            all_chapters.append({
                'slug': slug,
                'number': index + 1,
                'globalNumber': config['start'] + index,
                'season': season,
                'title': TITLE_OVERRIDES.get(slug, chapter['title']),
                'sourceTitle': chapter['title'],
                'page': chapter['page'],
                'blocks': chapter['blocks'],
            })

    season_meta.sort(key=lambda item: item['season'])
    all_chapters.sort(key=lambda item: item['globalNumber'])
    payload = {
        'source': '; '.join(item['source'] for item in season_meta),
        'sources': season_meta,
        'note': all_notes[0] if all_notes else '',
        'chapters': all_chapters,
    }

    OUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + '\n',
        encoding='utf-8',
    )

    paragraphs = sum(
        len(block.get('paragraphs', []))
        for chapter in payload['chapters']
        for block in chapter['blocks']
    )
    headings = sum(
        1 for chapter in payload['chapters']
        for block in chapter['blocks'] if block['type'] == 'heading'
    )
    print(f'Сезонов: {len(season_meta)}, глав: {len(payload["chapters"])}, '
          f'сцен: {headings}, абзацев: {paragraphs}')
    print(f'Записано: {OUT_PATH.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
