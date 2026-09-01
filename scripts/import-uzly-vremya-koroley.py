"""Импорт книги «Время Королей» из docx в узел Lore.

Источник: «Книга - Времени Королей.docx» — десять глав приквела «Вечерних Костей».
Результат: app/data/loreUzlyVremyaKoroley.generated.json — блоки текста по главам.

Запуск:
    python scripts/import-uzly-vremya-koroley.py "<путь к docx>"

Разметка исходника бедная: ни стилей, ни заголовков — только сплошной текст.
Опознаётся по содержимому:
    «Глава N. «Название»»  — начало главы, часто склеено с первой фразой;
    «***»                  — смена сцены;
    сплошной курсив        — легенда, отбиваемая в вёрстке цитатой.

Главное здесь — не разбор, а переверстка. Реплики в рукописи склеены: один
абзац в 23 тысячи знаков несёт 258 реплик подряд. Признак потерянного конца
абзаца — пропущенный пробел перед тире («торговки.– Здравствуйте»). Он надёжен:
после такого тире во всём тексте 1716 раз идёт прописная буква и ни разу
строчная, то есть это всегда новая реплика. Тире через пробел («быть? –
спросил старик») абзац не рвёт: там слова автора, и разрыв оставил бы ремарку
стоять отдельной репликой.
"""

import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / 'app' / 'data' / 'loreUzlyVremyaKoroley.generated.json'

CHAPTER_MARK = re.compile('Глава\\s+(\\d+)\\.\\s*«([^»]+)»')
DIVIDER = re.compile(r'^\*{2,}$')

# Порядок и адреса глав. Заголовки в рукописи вклеены прямо в текст: чаще в
# начало абзаца, а у четвёртой главы — в конец предыдущего. Поэтому заголовок
# ищется в любом месте абзаца, а текст вокруг него расходится по обе стороны.
CHAPTERS = [
    ('nachalo-konca', 'Начало конца'),
    ('logovo', 'Логово'),
    ('otsech-golovy', 'Отсечь головы'),
    ('vremya', 'Время'),
    ('deti-vremeni', 'Дети времени'),
    ('zolotoy-telec', 'Золотой телец'),
    ('vladyka', 'Владыка'),
    ('slava', 'Слава'),
    ('vrata', 'Врата'),
    ('voyna-koroley', 'Война королей'),
]

DASH = '–—'
# «торговки.– Здравствуйте»: пропущенный пробел перед тире — потерянный конец
# абзаца. Тире через пробел не трогаем: там слова автора.
GLUED = re.compile('(?<=[.!?…»])(?=[%s]\\s)' % DASH)

# Имена, которые в рукописи написаны двояко. Правильное написание подтверждено
# автором; правится основа, чтобы падежи выправились сами («Ликоне» → «Ликоте»).
NAMES = [
    ('Окреп', 'Акреп'),
    ('Ликон', 'Ликот'),
    ('Михшир', 'Мехшир'),
    ('Аейгус', 'Аегус'),
    ('Гулум', 'Гулом'),
    ('Имифеюс', 'Эмефеюс'),
]


def paragraphs(path):
    """Абзацы документа: текст и признак сплошного курсива."""
    root = ET.fromstring(zipfile.ZipFile(path).read('word/document.xml'))
    for p in root.find(W + 'body').iter(W + 'p'):
        text = ''
        italic = runs = 0
        for run in p.iter(W + 'r'):
            piece = ''.join(node.text or '' for node in run.iter(W + 't'))
            if piece.strip():
                runs += 1
                props = run.find(W + 'rPr')
                if props is not None and props.find(W + 'i') is not None:
                    italic += 1
            text += piece
        text = re.sub(r'\s+', ' ', text).replace('­', '').strip()
        for wrong, right in NAMES:
            text = text.replace(wrong, right)
        if text:
            yield text, bool(runs and italic == runs)


def split_speech(text):
    """Разносит склеенные реплики по абзацам."""
    return [piece.strip() for piece in GLUED.split(text) if piece.strip()]


def blocks_of(items):
    """Абзацы главы — в блоки страницы: проза, легенда, смена сцены."""
    blocks = []
    prose = []

    def flush():
        if prose:
            blocks.append({'type': 'prose', 'paragraphs': list(prose)})
            prose.clear()

    for text, italic in items:
        if DIVIDER.match(text):
            flush()
            if blocks and blocks[-1]['type'] != 'divider':
                blocks.append({'type': 'divider'})
            continue
        if italic:
            flush()
            blocks.append({'type': 'verse', 'paragraphs': split_speech(text)})
            continue
        prose.extend(split_speech(text))
    flush()
    while blocks and blocks[-1]['type'] == 'divider':
        blocks.pop()
    return blocks


def parse(path):
    items = list(paragraphs(path))
    chapters = []
    epigraph = []
    current = None

    for text, italic in items:
        match = CHAPTER_MARK.search(text)
        if match:
            head = text[:match.start()].strip()
            if head and current is not None:
                current['items'].append((head, italic))
            chapters.append({'number': int(match.group(1)), 'items': []})
            current = chapters[-1]
            tail = text[match.end():].strip()
            if tail:
                current['items'].append((tail, italic))
            continue
        if current is None:
            # До первой главы стоит эпиграф книги.
            if italic:
                epigraph.append(text)
            continue
        current['items'].append((text, italic))

    return epigraph, chapters


def main():
    if len(sys.argv) < 2:
        raise SystemExit('Укажите путь к docx первым аргументом.')

    path = sys.argv[1]
    epigraph, chapters = parse(path)
    if len(chapters) != len(CHAPTERS):
        found = ', '.join(str(chapter['number']) for chapter in chapters)
        raise SystemExit('Ожидалось %d глав, найдено %d (%s).' % (len(CHAPTERS), len(chapters), found))

    payload = {
        'source': Path(path).name,
        'epigraph': epigraph,
        'chapters': [
            {
                'slug': CHAPTERS[index][0],
                'number': index + 1,
                'title': CHAPTERS[index][1],
                'blocks': blocks_of(chapter['items']),
            }
            for index, chapter in enumerate(chapters)
        ],
    }

    OUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    counts = []
    for chapter in payload['chapters']:
        text = sum(len(p) for block in chapter['blocks'] for p in block.get('paragraphs', []))
        paragraph_count = sum(len(block.get('paragraphs', [])) for block in chapter['blocks'])
        scenes = sum(1 for block in chapter['blocks'] if block['type'] == 'divider')
        counts.append((chapter['number'], chapter['title'], paragraph_count, scenes, text))
    for number, title, paragraph_count, scenes, text in counts:
        print('%2d. %-16s абзацев %4d, сцен %2d, знаков %6d' % (number, title, paragraph_count, scenes + 1, text))
    print('Эпиграф: %d абзац(ев). Записано: %s' % (len(epigraph), OUT_PATH.relative_to(ROOT)))


if __name__ == '__main__':
    main()
