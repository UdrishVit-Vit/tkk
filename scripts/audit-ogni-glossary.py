#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Сверка глоссария «Огни» с литературным текстом сезона.

Справочник собран по стенограммам, а книга — отдельная литературная редакция.
Скрипт проверяет, держатся ли они друг друга:

  * встречается ли статья в тексте вообще;
  * упомянута ли она в тех главах, которые ей приписаны;
  * не появляется ли она в главах, которых у неё нет в списке.

Поиск имени — по основе и падежным окончаниям (см. scripts/ogni_text.py).
Метод не знает беглых гласных, поэтому его находки — повод посмотреть главу
глазами, а не приговор.

Запуск:
    python scripts/audit-ogni-glossary.py --season 1
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

from ogni_text import chapter_texts, mentioned, name_variants

REPO = Path(__file__).resolve().parent.parent
DATA_DIR = REPO / 'app' / 'data' / 'loreOgniGlossary'
BOOK_FILE = REPO / 'app' / 'data' / 'loreUzlyOgni.generated.json'


def main() -> int:
    ap = argparse.ArgumentParser(description='Сверка глоссария с текстом сезона.')
    ap.add_argument('--season', type=int, default=1)
    ap.add_argument('--limit', type=int, default=40, help='сколько строк показывать в каждом разделе')
    args = ap.parse_args()

    data_file = DATA_DIR / f'season-{args.season:02d}.generated.json'
    if not data_file.exists() or not BOOK_FILE.exists():
        print('Нет данных для сверки', file=sys.stderr)
        return 1

    data = json.loads(data_file.read_text(encoding='utf-8'))
    texts = chapter_texts(json.loads(BOOK_FILE.read_text(encoding='utf-8')))

    absent, wrong_chapter, extra_chapter = [], [], []
    stats = Counter()

    for entry in data['entries']:
        variants = name_variants(entry)
        if not variants:
            continue

        seen_in = [
            number for number, text in texts.items()
            if any(mentioned(text, variant) for variant in variants)
        ]
        listed = set(entry['chapters'])

        if not seen_in:
            absent.append(entry['term'])
            stats['absent'] += 1
            continue

        missing = sorted(listed - set(seen_in))
        if missing:
            wrong_chapter.append((entry['term'], missing, sorted(seen_in)[:6]))
            stats['wrong_chapter'] += 1

        extra = sorted(set(seen_in) - listed)
        if extra:
            extra_chapter.append((entry['term'], extra))
            stats['extra_chapter'] += 1

        if not missing:
            stats['ok'] += 1

    total = len(data['entries'])
    print(f'Статей: {total}; главы совпали: {stats["ok"]}; '
          f'не найдены в тексте: {stats["absent"]}; '
          f'приписана лишняя глава: {stats["wrong_chapter"]}; '
          f'упомянуты вне своих глав: {stats["extra_chapter"]}')

    print('\n## Не найдены в книге')
    print(', '.join(absent[:args.limit]) or 'нет')
    if len(absent) > args.limit:
        print(f'… и ещё {len(absent) - args.limit}')

    print('\n## Приписана глава, где имя не встречается')
    for term, missing, seen in wrong_chapter[:args.limit]:
        print(f'  {term}: нет в главах {missing}; встречается в {seen}')
    if len(wrong_chapter) > args.limit:
        print(f'  … и ещё {len(wrong_chapter) - args.limit}')

    print('\n## Упомянуты в главах, которых нет в статье')
    for term, extra in extra_chapter[:args.limit]:
        print(f'  {term}: + главы {extra[:10]}')
    if len(extra_chapter) > args.limit:
        print(f'  … и ещё {len(extra_chapter) - args.limit}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
