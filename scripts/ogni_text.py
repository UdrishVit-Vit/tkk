#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Поиск имён сущностей в русском тексте.

Общий модуль для импорта глоссария и его сверки с книгой.

Имена склоняются, поэтому имя ищется как основа плюс закрытый список падежных
окончаний. Список закрыт намеренно: свободное усечение основы находит чужие
слова — «Абрам» оказывается внутри «Абракса». Метод не знает беглых гласных
(«Пепел» — «Пепла») и супплетивных форм, поэтому пропуски возможны.
"""

from __future__ import annotations

import re
import unicodedata

STOP_WORDS = {
    'и', 'в', 'во', 'на', 'по', 'с', 'со', 'из', 'от', 'до', 'у', 'к', 'о', 'об',
    'за', 'для', 'при', 'над', 'под', 'the', 'не', 'но', 'а', 'же', 'или',
}

ENDINGS = [
    'ами', 'ями', 'ими', 'ов', 'ев', 'ей', 'ам', 'ям', 'ах', 'ях', 'ом', 'ем',
    'ём', 'ой', 'ые', 'ых', 'ым', 'ия', 'ии', 'ию', 'ье', 'ья', 'ью',
    'а', 'я', 'ы', 'и', 'у', 'ю', 'е', 'о', 'ь', 'й',
]
ENDING_RE = '(?:%s)?' % '|'.join(sorted(set(ENDINGS), key=len, reverse=True))


def fold(text: str) -> str:
    text = unicodedata.normalize('NFC', str(text or '')).lower().replace('ё', 'е')
    return re.sub(r"[’'`ʼ«»\"]", '', text)


def word_pattern(word: str) -> str:
    base = word
    # Именительный падеж уже может кончаться на изменяемую букву:
    # «аджаиды» -> «аджаид», «боросы» -> «борос», «Шида» -> «Шид».
    if len(base) >= 4 and base[-1] in 'аоуыэяюеиьй':
        base = base[:-1]
    return r'(?<![а-я])' + re.escape(base) + ENDING_RE + r'(?![а-я])'


def name_patterns(name: str):
    """Регулярки значимых слов имени. Пустой список — имя искать нельзя."""
    words = [w for w in re.split(r'[^\wа-яА-Я]+', fold(name)) if w and w not in STOP_WORDS]
    return [re.compile(word_pattern(word)) for word in words if len(word) > 2]


def mentioned(text: str, patterns) -> bool:
    """Все значимые слова имени встречаются в тексте."""
    return bool(patterns) and all(pattern.search(text) for pattern in patterns)


def name_variants(entry: dict):
    """Наборы регулярок для всех написаний сущности."""
    names = [entry['term'], *entry.get('aliases', []), *entry.get('sourceNames', [])]
    return [patterns for patterns in (name_patterns(name) for name in names) if patterns]


def chapter_texts(book: dict) -> dict:
    """Номер главы -> её текст в свёрнутом виде."""
    texts = {}
    for chapter in book.get('chapters', []):
        parts = []
        for block in chapter.get('blocks', []):
            parts.extend(block.get('paragraphs') or [])
            if block.get('text'):
                parts.append(block['text'])
        texts[chapter['number']] = fold(' '.join(parts))
    return texts
