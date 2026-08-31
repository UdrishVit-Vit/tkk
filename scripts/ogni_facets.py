#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Разбор сведений статьи по атрибутам её вида.

У персонажа и у обычая разные вопросы к тексту: одному нужны внешность,
характер и биография, другому — как он устроен и кто его соблюдает. Модуль
задаёт набор атрибутов для каждого вида статьи и раскладывает по ним
утверждения справочника.

Раскладка — производная, а не авторская. Сначала работает статус утверждения
(поверье, намёк Мастера, событие), затем ключевые слова. Что не опознано,
попадает в «Прочие сведения» — этот атрибут показывает, сколько ещё осталось
разобрать.
"""

from __future__ import annotations

import re

from ogni_text import fold

# Атрибут -> подпись по умолчанию.
FACETS = {
    'nature': 'Что это',
    'appearance': 'Внешность',
    'character': 'Характер',
    'biography': 'Биография',
    'artifacts': 'Предметы и знаки',
    'properties': 'Свойства и сила',
    'ways': 'Уклад и обычаи',
    'lands': 'Земли и владения',
    'people': 'Кто с этим связан',
    'worship': 'Вера и обряды',
    'deeds': 'Что произошло',
    'beliefs': 'О чём говорят',
    'riddles': 'Что осталось загадкой',
    'facts': 'Прочие сведения',
}

# Порядок атрибутов внутри вида статьи. Первый — самый важный для этого вида.
CATEGORY_FACETS = {
    'characters': ['nature', 'appearance', 'character', 'biography', 'artifacts', 'people', 'deeds', 'beliefs', 'riddles', 'facts'],
    'foundations': ['nature', 'properties', 'worship', 'appearance', 'people', 'deeds', 'beliefs', 'riddles', 'facts'],
    'beings': ['appearance', 'ways', 'lands', 'properties', 'people', 'deeds', 'beliefs', 'riddles', 'facts'],
    'places': ['nature', 'appearance', 'people', 'lands', 'deeds', 'beliefs', 'riddles', 'facts'],
    'powers': ['nature', 'people', 'artifacts', 'lands', 'deeds', 'beliefs', 'riddles', 'facts'],
    'practices': ['nature', 'appearance', 'properties', 'people', 'deeds', 'beliefs', 'riddles', 'facts'],
    'culture': ['nature', 'ways', 'people', 'worship', 'deeds', 'beliefs', 'riddles', 'facts'],
    'history': ['nature', 'deeds', 'people', 'beliefs', 'riddles', 'facts'],
}

# Подпись зависит от вида: «кто состоит» у дома и «кто владеет» у артефакта —
# это один и тот же атрибут, но спрашивают о разном.
LABEL_OVERRIDES = {
    'characters': {'nature': 'Кто это', 'people': 'Связи', 'deeds': 'Что сделал', 'artifacts': 'Предметы и знаки'},
    'foundations': {'people': 'Кто чтит', 'appearance': 'Как является'},
    'beings': {'people': 'Связи с другими', 'appearance': 'Облик'},
    'places': {'people': 'Кто там', 'lands': 'Округа и пути', 'appearance': 'Облик и устройство'},
    'powers': {'people': 'Кто состоит', 'artifacts': 'Знаки и приметы', 'lands': 'Где действует'},
    'practices': {'people': 'Кто владеет', 'appearance': 'Облик', 'properties': 'Что делает'},
    'culture': {'people': 'Кто соблюдает', 'ways': 'Как устроено'},
}

# Ключевые слова ищутся с начала слова: «бог» иначе находится внутри «богатых».
KEYWORDS = {
    'appearance': [
        'рост', 'ростом', 'метр', 'волос', 'глаз', 'шерст', 'кож', 'лиц', 'одет',
        'одежд', 'ткан', 'плащ', 'чуб', 'броня', 'брон', 'доспех', 'рог', 'хвост',
        'крыл', 'шрам', 'борода', 'выгляд', 'облик', 'окрас', 'белоснеж', 'черн',
        'чёрн', 'красн', 'зелен', 'зелён', 'син', 'золот', 'серебр', 'фигур',
        'клык', 'пасть', 'татуиров', 'носит',
    ],
    'character': [
        'характер', 'нрав', 'упрям', 'вспыльч', 'робок', 'робк', 'наивн', 'любопыт',
        'добр', 'жесток', 'склонен', 'склонна', 'боится', 'предан', 'горд', 'спокоен',
        'весел', 'вёсел', 'замкнут', 'терпел', 'дерзк', 'осторож', 'привык', 'мечтает',
        'стыд', 'совест', 'сомнева',
    ],
    'biography': [
        'родил', 'вырос', 'детств', 'прежде', 'юност', 'воспит', 'изгнан', 'вырастил',
        'семь', 'отец', 'отца', 'мать', 'матер', 'сын', 'дочь', 'брат', 'сестр',
        'клан', 'происход', 'вырастал', 'покинул', 'до встречи', 'в прошлом',
    ],
    'artifacts': [
        'маск', 'кинжал', 'амулет', 'кулон', 'посох', 'меч', 'копь', 'топор', 'глеф',
        'арбалет', 'нит', 'камен', 'кристалл', 'кольц', 'реликв', 'оруж', 'свит',
        'колокол', 'печат', 'монет', 'сосуд', 'флакон', 'колб', 'клинок', 'эмблем',
    ],
    'properties': [
        'сил', 'способн', 'магия', 'магич', 'заклин', 'позволя', 'даёт', 'дает',
        'исцел', 'защища', 'свойств', 'горит', 'светит', 'превраща', 'лечит', 'яд',
        'действу', 'сдержива', 'питает',
    ],
    'worship': [
        'молит', 'обряд', 'ритуал', 'жрец', 'жриц', 'храм', 'почита', 'вера', 'веру',
        'поклон', 'благослов', 'проклят', 'святилищ', 'алтар', 'бога', 'боги', 'богин',
        'божеств', 'культ',
    ],
    'ways': [
        'уклад', 'обыча', 'кочу', 'питают', 'охот', 'ремесл', 'язык', 'наречи',
        'торгу', 'воюют', 'повадк', 'принято', 'запрещ', 'традиц',
    ],
    'lands': [
        'земл', 'город', 'стоянк', 'горах', 'горы', 'пустын', 'река', 'реки', 'озер',
        'обитают', 'располож', 'к северу', 'к югу', 'к востоку', 'к западу', 'долин',
        'ущель', 'побережь',
    ],
    'people': [
        'возглав', 'вожд', 'глава', 'состоит', 'входят', 'член', 'владе', 'хозя',
        'правит', 'основал', 'служ', 'подчин', 'нанял', 'спутник', 'друг', 'враг',
    ],
    'nature': [
        'является', 'называ', 'считается', 'представляет собой', 'означа', 'зовут',
        'известен', 'известна', 'известны',
    ],
}

COMPILED = {
    facet: [re.compile(r'(?<![а-я])' + re.escape(fold(word))) for word in words]
    for facet, words in KEYWORDS.items()
}

# Статус утверждения сразу задаёт атрибут: это сильнее ключевых слов.
STATUS_FACET = {
    'belief': 'beliefs',
    'gm-hint': 'riddles',
    'unconfirmed': 'riddles',
    'event': 'deeds',
}

# Досье героя приходит из базы знаний уже разобранным — кроме «подтверждённого
# образа»: там вперемешку рост, глаза, ремесло и происхождение, поэтому эти
# строки проходят через тот же разбор по ключевым словам, что и утверждения.
PROFILE_FACET = {
    'appearance': 'appearance',
    'personality': 'character',
    'biography': 'biography',
}
PROFILE_CLASSIFIED = ('confirmed',)


def classify(text: str, allowed) -> str:
    """Атрибут, к которому ближе всего утверждение."""
    folded = fold(text)
    best, best_score = None, 0
    for facet in allowed:
        patterns = COMPILED.get(facet)
        if not patterns:
            continue
        score = sum(1 for pattern in patterns if pattern.search(folded))
        if score > best_score:
            best, best_score = facet, score
    return best or 'facts'


def label_for(category: str, facet: str) -> str:
    return LABEL_OVERRIDES.get(category, {}).get(facet) or FACETS[facet]


def build_facets(entry: dict) -> list:
    """Атрибуты статьи: подпись, вид и содержимое с главами и статусами."""
    category = entry['category']
    order = CATEGORY_FACETS.get(category, CATEGORY_FACETS['practices'])
    buckets = {facet: [] for facet in order}

    keyword_facets = [f for f in order if f not in ('deeds', 'beliefs', 'riddles', 'facts')]

    def add(facet, text):
        if facet not in buckets:
            facet = classify(text, keyword_facets)
        buckets[facet].append({'text': text, 'chapter': None, 'status': 'profile',
                               'statusLabel': 'Досье', 'season': entry.get('season')})

    # Досье героя: уже разложено автором справочника, номера главы у него нет.
    profile = entry.get('profile') or {}
    for key, facet in PROFILE_FACET.items():
        for line in (profile.get(key) or []):
            add(facet, line)
    for key in PROFILE_CLASSIFIED:
        for line in (profile.get(key) or []):
            add(classify(line, keyword_facets), line)
    for claim in entry.get('claims', []):
        facet = STATUS_FACET.get(claim['status'])
        if facet not in buckets:
            facet = classify(claim['text'], keyword_facets)
        buckets[facet].append({
            'text': claim['text'],
            'chapter': claim['chapter'],
            'season': claim['season'],
            'status': claim['status'],
            'statusLabel': claim['statusLabel'],
        })

    return [
        {
            'id': facet,
            'label': label_for(category, facet),
            'items': buckets[facet],
        }
        for facet in order if buckets[facet]
    ]
