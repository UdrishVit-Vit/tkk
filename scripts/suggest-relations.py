#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Кандидаты в типизированные связи — для ручного отбора.

Правила находят в утверждениях обороты вроде «сын Изудина» или «участник Белых
Соколов» и предлагают связь. Решение принимает человек: на пробном прогоне из
десяти кандидатов верными оказались четыре — «отец Ишмал» это сан, а не родство,
а «не смог защитить сына Изудина» говорит о третьем лице, не о subject статьи.

Поэтому вывод — не связи, а заготовки строк для `app/data/loreRelations.js`
вместе с текстом, из которого они выведены. Что подтвердилось, переносится
руками; что нет — выбрасывается.

Запуск:
    python scripts/suggest-relations.py --season 1
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

from ogni_text import fold, mentioned, name_variants

REPO = Path(__file__).resolve().parent.parent
DATA_DIR = REPO / 'app' / 'data' / 'loreOgniGlossary'
RELATIONS_FILE = REPO / 'app' / 'data' / 'loreRelations.js'

# Оборот -> тип связи и подпись. Захватывается слово-указатель и следующее за
# ним имя; имя ищется по основе, иначе «сын Изудина» не найдёт «Изудина».
PATTERNS = [
    ('kin', r'(сын|сына|дочь|дочери|брат|брата|сестра|сестры)\s+([А-ЯЁ][\w’\'-]+)'),
    ('member', r'(участник|участница|член|входит в|состоит в|вступил|вступила)\s+([А-ЯЁ][\w’\'-]+)'),
    ('leads', r'(возглавляет|возглавил|возглавила|вождь|глава|лидер)\s+([А-ЯЁ][\w’\'-]+)'),
    ('origin', r'(родом из|происходит из|выходец из|уроженец)\s+([А-ЯЁ][\w’\'-]+)'),
    ('owner', r'(владеет|владел|владела|принадлежит)\s+([А-ЯЁ][\w’\'-]+)'),
]


def existing_edges() -> set:
    """Что уже внесено руками — второй раз не предлагаем."""
    if not RELATIONS_FILE.exists():
        return set()
    text = RELATIONS_FILE.read_text(encoding='utf-8')
    return {
        (m.group(1), m.group(2))
        for m in re.finditer(r"from:\s*'([^']+)',\s*to:\s*'([^']+)'", text)
    }


def main() -> int:
    ap = argparse.ArgumentParser(description='Кандидаты в типизированные связи.')
    ap.add_argument('--season', type=int, default=1)
    args = ap.parse_args()

    path = DATA_DIR / f'season-{args.season:02d}.generated.json'
    if not path.exists():
        print(f'Нет данных: {path}', file=sys.stderr)
        return 1

    entries = json.loads(path.read_text(encoding='utf-8'))['entries']
    index = [(entry, [v for v in name_variants(entry) if v]) for entry in entries]
    known = existing_edges()

    def resolve(name):
        folded = fold(name)
        hits = [entry for entry, variants in index if any(mentioned(folded, v) for v in variants)]
        # Имя, подходящее сразу нескольким статьям, ничего не сообщает.
        return hits[0] if len(hits) == 1 else None

    seen = set()
    found = []
    for entry in entries:
        texts = [claim['text'] for claim in entry['claims']]
        texts += [item['text'] for item in entry['summaryByChapter']]
        for text in texts:
            for kind, pattern in PATTERNS:
                for match in re.finditer(pattern, text):
                    target = resolve(match.group(2))
                    if not target or target['id'] == entry['id']:
                        continue
                    key = (entry['id'], kind, target['id'])
                    if key in seen or (entry['id'], target['id']) in known:
                        continue
                    seen.add(key)
                    found.append((entry, kind, target, match.group(1), text))

    print(f'Кандидатов: {len(found)}. Проверьте каждый по тексту — правила ошибаются чаще, чем угадывают.\n')
    for entry, kind, target, word, text in found:
        print(f"  {{ from: '{entry['id']}', to: '{target['id']}', type: '{kind}', "
              f"label: '{word}', why: '…' }},")
        print(f"    {entry['term']} → {target['term']}")
        print(f"    {text[:150]}\n")
    return 0


if __name__ == '__main__':
    sys.exit(main())
