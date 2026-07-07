export const SPELLS_SCREEN_5E = {
  slug: 'spells',
  title: 'Заклинания',
  titleEn: 'Spells',
  source: 'PHB',
  sourceName: 'Player’s Handbook 2014',
  sourceUrl: 'https://www.dndbeyond.com/sources/dnd/basic-rules-2014/spellcasting',
  intro: 'Заклинания — оформленные правилами магические эффекты. Их описывают уровень и ячейки, компоненты и время наложения, дистанция, длительность и концентрация, а также способ поражения цели: бросок атаки, спасбросок или область воздействия.'
}

const TCE_NAME = 'Tasha’s Cauldron of Everything'
const TCE_URL = 'https://www.dndbeyond.com/sources/dnd/tcoe/spells'
const DMG_NAME = 'Dungeon Master’s Guide 2014'
const DMG_URL = 'https://www.dndbeyond.com/sources/dnd/dmg-2014/dungeon-masters-workshop'

export const SPELLS_ICON_SVG_5E = {
  personalize: '<path d="M4 20l5-1 9-9-4-4-9 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13 5l4 4M15 3l2 2 2-2-2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  scroll: '<path d="M7 4h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6 6a2 2 0 0 0 4 0V4M9 10h6M9 14h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  damage: '<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  cantrip: '<path d="M12 4l1.6 3.6L17 9l-3.4 1.4L12 14l-1.6-3.6L7 9l3.4-1.4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 15l.8 1.8L20 18l-2.2.9L17 21l-.8-2.1L14 18l2.2-1.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  ritual: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4v16M4.5 8.5l15 7M19.5 8.5l-15 7" stroke="currentColor" stroke-width="1.4"/>',
  slots: '<rect x="4" y="7" width="16" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10v4M12 10v4M16 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  attack: '<path d="M4 20l7-7M9 11l4-4 4-4h3v3l-4 4-4 4M14 8l2 2M4 16v4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  time: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 8v4l3 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  range: '<path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  duration: '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  components: '<path d="M12 3l7 4v10l-7 4-7-4V7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 3v18M5 7l7 4 7-4" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  concentration: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  area: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',
  combine: '<circle cx="9" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/>',
  save: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
}

export const SPELL_RULE_GROUPS_5E = [
  {
    id: 'general',
    items: ['personalizing-spells', 'scrolls', 'spell-damage']
  },
  {
    id: 'info',
    title: 'Информация о заклинаниях',
    items: ['cantrips', 'rituals', 'spell-slots-spells']
  },
  {
    id: 'casting',
    title: 'Наложение заклинаний',
    items: ['spell-attack-rolls', 'casting-time-spells', 'range', 'duration', 'components', 'concentration', 'area-of-effect', 'combining-effects', 'saving-throw']
  }
]

export const SPELL_RULES_5E = [
  {
    slug: 'personalizing-spells',
    title: 'Персонализация заклинаний',
    titleEn: 'Personalizing Spells',
    icon: 'personalize',
    source: 'TCE',
    sourceName: TCE_NAME,
    sourceUrl: TCE_URL,
    summary: 'Опциональное правило: менять внешний облик заклинания, не затрагивая его игровые эффекты.',
    quick: [
      { label: 'Меняется', value: 'Только описание' },
      { label: 'Не меняется', value: 'Правила и урон' }
    ],
    terms: ['описание', 'облик', 'эффект'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'С разрешения Мастера вы можете придать заклинанию уникальный облик: цвет, форму, звук или тему, отражающие вашего персонажа. Огненный шар может выглядеть как рой светлячков, а ледяной луч — как поток чёрного дыма.',
          'Персонализация касается только описания. Она не меняет тип урона, дистанцию, длительность, спасброски и другие игровые параметры заклинания.'
        ]
      }
    ]
  },
  {
    slug: 'scrolls',
    title: 'Свитки',
    titleEn: 'Scrolls',
    icon: 'scroll',
    source: 'PHB',
    summary: 'Свиток заклинания позволяет наложить записанное на нём заклинание один раз без траты ячейки.',
    quick: [
      { label: 'Использование', value: 'Однократное' },
      { label: 'Ячейка', value: 'Не требуется' }
    ],
    terms: ['свиток', 'ячейка заклинаний', 'проверка характеристики'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Свиток заклинания содержит одно заклинание. Если оно есть в списке вашего класса, вы можете прочитать свиток и наложить заклинание без ячейки и материальных компонентов; после этого свиток рассыпается.',
          'Заклинание накладывается на своём базовом уровне. Свитки высоких уровней требуют проверки характеристики заклинателя: при провале заклинание пропадает без эффекта.'
        ]
      }
    ]
  },
  {
    slug: 'spell-damage',
    title: 'Урон заклинания',
    titleEn: 'Spell Damage',
    icon: 'damage',
    source: 'DMG',
    sourceName: DMG_NAME,
    sourceUrl: DMG_URL,
    summary: 'Рекомендации Мастеру по величине урона заклинаний и настройке новых магических эффектов.',
    quick: [
      { label: 'Ориентир', value: 'Уровень ячейки' },
      { label: 'Назначение', value: 'Баланс новых эффектов' }
    ],
    terms: ['урон', 'уровень заклинания', 'ячейка заклинаний'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Урон заклинания привязан к уровню ячейки: чем выше уровень, тем больше костей урона. Эти ориентиры помогают Мастеру оценивать самодельные заклинания и магические эффекты предметов и ловушек.',
          'Одноцелевые заклинания обычно наносят больше урона, чем заклинания по области, а эффект с спасброском в среднем слабее эффекта с броском атаки по одной цели.'
        ]
      }
    ]
  },
  {
    slug: 'cantrips',
    title: 'Заговоры',
    titleEn: 'Cantrips',
    icon: 'cantrip',
    source: 'PHB',
    summary: 'Заговор — заклинание 0 уровня: его можно творить сколько угодно раз без ячейки, а сила растёт с уровнем персонажа.',
    quick: [
      { label: 'Уровень', value: '0' },
      { label: 'Ячейка', value: 'Не нужна' }
    ],
    terms: ['заговор', 'ячейка заклинаний', 'уровень персонажа'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Заговор закреплён в памяти и всегда готов к использованию. Его можно творить неограниченно и без траты ячейки заклинаний.',
          'Многие боевые заговоры усиливаются на 5, 11 и 17 уровнях персонажа — растёт число костей урона. Учитывается общий уровень персонажа, а не уровень в конкретном классе.'
        ]
      }
    ]
  },
  {
    slug: 'rituals',
    title: 'Ритуалы',
    titleEn: 'Rituals',
    icon: 'ritual',
    source: 'PHB',
    summary: 'Заклинание с меткой «ритуал» можно наложить за дополнительные 10 минут без траты ячейки.',
    quick: [
      { label: 'Время', value: '+10 минут' },
      { label: 'Ячейка', value: 'Не тратится' }
    ],
    terms: ['ритуал', 'ячейка заклинаний', 'время наложения'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Если у заклинания есть свойство «ритуал», его можно наложить по обычным правилам либо как ритуал. Ритуальная версия занимает на 10 минут дольше и не тратит ячейку заклинаний.',
          'Творить ритуал можно только если это позволяет умение класса. Заклинатель также должен иметь заклинание подготовленным или в книге, в зависимости от класса.'
        ]
      }
    ]
  },
  {
    slug: 'spell-slots-spells',
    title: 'Ячейки заклинаний',
    titleEn: 'Spell Slots Spells',
    icon: 'slots',
    source: 'PHB',
    summary: 'Ячейка — ресурс для наложения заклинания; заклинание можно творить ячейкой своего уровня или выше.',
    quick: [
      { label: 'Расход', value: 'Одна ячейка на заклинание' },
      { label: 'Усиление', value: 'Ячейкой выше уровнем' }
    ],
    terms: ['ячейка заклинаний', 'уровень заклинания', 'продолжительный отдых'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Чтобы наложить заклинание 1 уровня и выше, нужно потратить ячейку соответствующего или более высокого уровня. Ячейки восстанавливаются после продолжительного отдыха.',
          'Заклинание, наложенное ячейкой выше своего уровня, считается заклинанием уровня этой ячейки. Многие заклинания усиливаются при наложении из старших ячеек.'
        ]
      }
    ]
  },
  {
    slug: 'spell-attack-rolls',
    title: 'Броски атаки заклинанием',
    titleEn: 'Spell Attack Rolls',
    icon: 'attack',
    source: 'PHB',
    summary: 'Некоторые заклинания требуют броска атаки: к20 плюс модификатор заклинания и бонус мастерства против класса доспеха.',
    quick: [
      { label: 'Бросок', value: 'к20 + мод. + мастерство' },
      { label: 'Цель', value: 'Класс доспеха' }
    ],
    terms: ['бросок атаки', 'класс доспеха', 'критическое попадание', 'заклинательная характеристика'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Для заклинания с броском атаки бросьте к20 и прибавьте модификатор заклинательной характеристики и бонус мастерства. Если результат равен классу доспеха цели или выше — попадание.',
          'Броски атаки заклинанием подчиняются обычным правилам преимущества и помехи, дистанции, укрытия и критического попадания.'
        ]
      }
    ]
  },
  {
    slug: 'casting-time-spells',
    title: 'Время наложения',
    titleEn: 'Casting Time Spells',
    icon: 'time',
    source: 'PHB',
    summary: 'Большинство заклинаний накладывается за действие, но бывают бонусное действие, реакция и долгие заклинания в минутах или часах.',
    quick: [
      { label: 'Обычно', value: '1 действие' },
      { label: 'Также', value: 'Бонус, реакция, минуты' }
    ],
    terms: ['действие', 'бонусное действие', 'реакция', 'триггер'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Время наложения указано в описании заклинания. Чаще всего это одно действие, но некоторые заклинания требуют бонусного действия или реакции с определённым триггером.',
          'Заклинания с временем наложения в минутах или часах творятся вне боя и обычно требуют непрерывной концентрации на протяжении всего времени.'
        ]
      },
      {
        title: 'Бонусное действие и одно действие',
        paragraphs: [
          'Если вы творите заклинание бонусным действием, в этот ход другим заклинанием можно наложить только заговор со временем наложения «1 действие».'
        ]
      }
    ]
  },
  {
    slug: 'range',
    title: 'Дистанция',
    titleEn: 'Range',
    icon: 'range',
    source: 'PHB',
    summary: 'Дистанция задаёт, как далеко от заклинателя может находиться цель или точка начала эффекта.',
    quick: [
      { label: 'Типы', value: 'В футах, касание, на себя' },
      { label: 'Проверка', value: 'В момент наложения' }
    ],
    terms: ['дистанция', 'касание', 'область воздействия'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Цель заклинания должна находиться в пределах его дистанции. Для заклинаний с областью воздействия дистанция указывает, где можно разместить точку начала эффекта.',
          'Дистанция «на себя» действует на заклинателя или исходит от него. Дистанция «касание» требует коснуться цели, обычно с помощью действия наложения.'
        ]
      }
    ]
  },
  {
    slug: 'duration',
    title: 'Длительность',
    titleEn: 'Duration',
    icon: 'duration',
    source: 'PHB',
    summary: 'Длительность — как долго держится эффект: мгновенно, заданное время или пока держится концентрация.',
    quick: [
      { label: 'Типы', value: 'Мгновенная, время, концентрация' }
    ],
    terms: ['длительность', 'концентрация', 'мгновенная'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Мгновенное заклинание срабатывает и заканчивается сразу. Заклинание с указанной длительностью держится заданное время, если не прервано раньше.',
          'Заклинание с меткой «Концентрация» действует, только пока заклинатель сохраняет концентрацию.'
        ]
      }
    ]
  },
  {
    slug: 'components',
    title: 'Компоненты',
    titleEn: 'Components',
    icon: 'components',
    source: 'PHB',
    summary: 'Компоненты — что нужно для наложения: вербальные, соматические и материальные.',
    quick: [
      { label: 'Виды', value: 'В, С, М' },
      { label: 'Материальные', value: 'Мешочек или фокусировка' }
    ],
    terms: ['компоненты', 'вербальный', 'соматический', 'материальный', 'фокусировка'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Вербальный компонент (В) — произнесение слов; в тишине или с кляпом заклинание наложить нельзя. Соматический компонент (С) — жест свободной рукой.',
          'Материальный компонент (М) можно заменить мешочком с компонентами или заклинательной фокусировкой, если у компонента не указана стоимость и он не расходуется.'
        ]
      }
    ]
  },
  {
    slug: 'concentration',
    title: 'Концентрация',
    titleEn: 'Concentration',
    icon: 'concentration',
    source: 'PHB',
    summary: 'Некоторые заклинания требуют концентрации; одновременно можно держать только одно такое заклинание.',
    quick: [
      { label: 'Одновременно', value: 'Одно заклинание' },
      { label: 'Спасбросок', value: 'Телосложение, СЛ 10 или урон/2' }
    ],
    terms: ['концентрация', 'спасбросок Телосложения', 'урон', 'недееспособность'],
    blocks: [
      {
        title: 'Что прерывает концентрацию',
        bullets: [
          'Наложение другого заклинания, требующего концентрации.',
          'Получение урона — спасбросок Телосложения со СЛ, равной 10 или половине полученного урона (что больше).',
          'Недееспособность или смерть заклинателя.',
          'По решению Мастера — сильные отвлекающие факторы, например волны на бушующем море.'
        ]
      }
    ]
  },
  {
    slug: 'area-of-effect',
    title: 'Область воздействия',
    titleEn: 'Area of Effect',
    icon: 'area',
    source: 'PHB',
    summary: 'Заклинания по области поражают всех в заданной форме: конус, куб, цилиндр, линия или сфера.',
    quick: [
      { label: 'Формы', value: 'Конус, куб, цилиндр, линия, сфера' },
      { label: 'Начало', value: 'Точка начала эффекта' }
    ],
    terms: ['область воздействия', 'точка начала', 'конус', 'сфера'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Область воздействия исходит из точки начала эффекта и имеет заданную форму. Каждое существо в области подвергается эффекту заклинания.',
          'Точка начала эффекта сама не занимает клетку, но задаёт origin для формы. Укрытие и препятствия могут блокировать распространение эффекта.'
        ]
      }
    ]
  },
  {
    slug: 'combining-effects',
    title: 'Объединение эффектов',
    titleEn: 'Combining Effects',
    icon: 'combine',
    source: 'PHB',
    summary: 'Эффекты разных заклинаний складываются, но одно и то же заклинание не усиливается наложением поверх себя.',
    quick: [
      { label: 'Разные заклинания', value: 'Складываются' },
      { label: 'Одинаковые', value: 'Действует сильнейшее' }
    ],
    terms: ['эффект', 'длительность', 'преимущество'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Эффекты разных заклинаний складываются, пока их описания не противоречат друг другу. Эффекты одного и того же заклинания, наложенного несколько раз, не суммируются — действует наиболее мощный из них, а их длительности не продлевают друг друга.'
        ]
      }
    ]
  },
  {
    slug: 'saving-throw',
    title: 'Спасброски',
    titleEn: 'Saving Throw',
    icon: 'save',
    source: 'PHB',
    summary: 'Многие заклинания позволяют цели спасброском избежать или ослабить эффект против СЛ заклинателя.',
    quick: [
      { label: 'СЛ', value: '8 + мод. + мастерство' },
      { label: 'Успех', value: 'Нет эффекта или половина' }
    ],
    terms: ['спасбросок', 'СЛ заклинания', 'заклинательная характеристика'],
    blocks: [
      {
        title: 'Правило',
        paragraphs: [
          'Сложность спасброска против вашего заклинания равна 8 + модификатор заклинательной характеристики + бонус мастерства. Цель бросает указанный в заклинании спасбросок против этой СЛ.',
          'При успехе эффект обычно не наступает или уменьшается — например, урон уменьшается вдвое. Точный результат успеха и провала указан в описании заклинания.'
        ]
      }
    ]
  }
]

export const SPELL_RULE_BY_SLUG_5E = Object.fromEntries(SPELL_RULES_5E.map(rule => [rule.slug, rule]))

export const SPELL_GROUPS_WITH_RULES_5E = SPELL_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => SPELL_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function spellRulePath(slug) {
  return `/dnd5e/screens/spells/${slug}`
}
