"""Импорт литературной редакции сезона «Огни» из PDF в узел Lore.

Источник: «ЭНОА - Кампания II - Сезон 1 - Огни - v0.09.3.pdf» (главы 01-32).
Результат: app/data/loreUzlyOgni.generated.json - блоки текста для каждой главы.

Запуск:
    python scripts/import-uzly-ogni.py "<путь к PDF>"

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

SLUGS = [
    'severnyy-veter', 'holmy-tishiny', 'les-rubyat-shchepki-letyat', 'stena-kostey',
    'dela-poshli-ne-tak', 'gorod-v-ogne', 'provodnik', 'beglecy-i-yamy', 'ohota',
    'pomestye-tashar', 'dobro-pozhalovat-v-migdash', 'plamya-belyh-sokolov',
    'luchshiy-strelok-migdasha', 'svoboda-ot-grehov', 'sekret-druzhby',
    's-ognem-ne-igrayut', 'karty-raskryty', 'vechnyy-ogon', 'beskonechnaya-voyna',
    'po-goryachim-sledam', 'velikie-gonki', 'zhizn-smertnogo', 'kryshi-i-dedy',
    'solnechnye-holmy', 'proklyatie-zemel', 'prizvanie', 'cena', 'zagadki-bogini',
    'pozhiratel', 'sekrety-holmov', 'malahitovaya-gryada', 'solnce-hranit',
]


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


def main():
    if len(sys.argv) < 2:
        raise SystemExit('Укажите путь к PDF первым аргументом.')

    pdf_path = sys.argv[1]
    chapters = parse(pdf_path)
    if len(chapters) != len(SLUGS):
        raise SystemExit(f'Ожидалось {len(SLUGS)} глав, найдено {len(chapters)}.')

    notes = {chapter['note'] for chapter in chapters if chapter['note']}
    if len(notes) > 1:
        print(f'Внимание: вводных примечаний несколько ({len(notes)}), взято первое.')

    payload = {
        'source': Path(pdf_path).name,
        'note': sorted(notes)[0] if notes else '',
        'chapters': [
            {
                'slug': SLUGS[index],
                'number': index + 1,
                'title': chapter['title'],
                'page': chapter['page'],
                'blocks': chapter['blocks'],
            }
            for index, chapter in enumerate(chapters)
        ],
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
    print(f'Глав: {len(payload["chapters"])}, сцен: {headings}, абзацев: {paragraphs}')
    print(f'Записано: {OUT_PATH.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
