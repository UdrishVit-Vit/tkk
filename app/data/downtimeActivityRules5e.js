export const DOWNTIME_ACTIVITIES_SCREEN_5E = {
  slug: 'downtime_activities',
  title: 'Деятельность в простое',
  titleEn: 'Downtime Activities',
  source: 'PHB / DMG / XGE',
  sourceName: 'D&D 5e 2014 и дополнительные источники',
  sourceUrl: 'https://5e14.ttg.club/screens/downtime_activities',
  intro: 'Деятельность в простое описывает, чем персонажи занимаются между приключениями: работают, учатся, исследуют, восстанавливаются, ищут магические предметы, ведут дела и оплачивают жизнь.'
}

export const DOWNTIME_SOURCE_NAMES_5E = {
  PHB: "Player's Handbook 2014",
  DMG: "Dungeon Master's Guide 2014",
  XGE: "Xanathar's Guide to Everything"
}

export const DOWNTIME_ICON_SVG_5E = {
  default: '<path d="M5 5h14v14H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  gambling: '<path d="M7 4h10v16H7z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="10" cy="8" r="1" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/><circle cx="10" cy="16" r="1" fill="currentColor"/>',
  combat: '<path d="M4 19L19 4M8 5l11 11M5 8l11 11" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  recovery: '<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-6 10z" fill="currentColor"/><path d="M12 8v8M8 12h8" stroke="#101820" stroke-width="1.8" stroke-linecap="round"/>',
  money: '<path d="M6 7c0-2 12-2 12 0s-12 2-12 0Zm0 0v10c0 2 12 2 12 0V7M6 12c0 2 12 2 12 0" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  craft: '<path d="M5 19l8-8M14 4l6 6-5 5-6-6z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20l4-1-3-3z" fill="currentColor"/>',
  research: '<path d="M5 5h7a4 4 0 0 1 4 4v10H9a4 4 0 0 0-4-4z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M16 5h3v14h-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  carousing: '<path d="M8 4h8l-1 7a3 3 0 0 1-6 0zM12 14v6M8 20h8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M6 7h12" stroke="currentColor" stroke-width="1.8"/>',
  training: '<path d="M4 8l8-4 8 4-8 4z" fill="currentColor"/><path d="M7 11v4c3 2 7 2 10 0v-4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  relaxation: '<path d="M12 21c4-3 7-7 7-12a5 5 0 0 0-10-1 5 5 0 0 0-4 8c2 3 5 4 7 5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  magic: '<path d="M12 3l2.2 6.3H21l-5.4 3.9 2.1 6.5L12 15.8l-5.7 3.9 2.1-6.5L3 9.3h6.8z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>',
  crime: '<path d="M7 4h10v16H7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M10 8h4M10 12h4M10 16h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="18" cy="18" r="3" fill="currentColor"/>',
  work: '<path d="M8 8V6h8v2M5 8h14v11H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M5 13h14M10 13v2h4v-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  religion: '<path d="M12 3v18M7 9h10M5 21h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M4 16h16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  rumor: '<path d="M4 7h9a4 4 0 0 1 0 8H9l-5 4V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M15 9h5M15 13h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  stronghold: '<path d="M4 20V9l4-2 4 2 4-2 4 2v11M4 13h16M8 20v-5h8v5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  food: '<path d="M7 4v16M5 4v5a2 2 0 0 0 4 0V4M14 4v16M14 4c4 2 4 8 0 10" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  lodging: '<path d="M4 18V8h16v10M4 13h16M8 13V9h5a3 3 0 0 1 3 3v1" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  service: '<path d="M12 3l3 5 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/>'
}

const DOWNTIME_GROUP_DATA_5E = [
  {
    id: 'core',
    title: '',
    items: [
      ['gambling', 'Азартные игры', 'Gambling', 'XGE', 'gambling', 'Азартные игры в простое позволяют персонажу рисковать деньгами, читать соперников и получать как прибыль, так и неприятности.'],
      ['pit-fighting', 'Бойцовский турнир', 'Pit Fighting', 'XGE', 'combat', 'Бойцовский турнир описывает участие персонажа в поединках, где важны физическая подготовка, тактика и риск травм.'],
      ['recuperating', 'Восстановление', 'Recuperating', 'PHB', 'recovery', 'Восстановление помогает персонажу оправиться от болезней, ядов и других длительных последствий между приключениями.'],
      ['living-costs', 'Затраты на существование', 'Living costs', 'DMG', 'money', 'Затраты на существование помогают оценить цену выбранного образа жизни, проживания и повседневных расходов.'],
      ['crafting-an-item', 'Изготовление предмета', 'Crafting an Item', 'XGE', 'craft', 'Изготовление предмета описывает работу над обычными вещами, стоимость материалов, время и требования к инструментам.'],
      ['research', 'Исследование', 'Research', 'XGE', 'research', 'Исследование в простое позволяет искать сведения через библиотеки, архивы, информаторов и учёные контакты.'],
      ['researching', 'Исследование', 'Researching', 'PHB', 'research', 'Исследование по базовым правилам помогает добывать знания за время простоя, если персонаж имеет доступ к источникам информации.'],
      ['carousing', 'Кутёж', 'Carousing', 'DMG', 'carousing', 'Кутёж описывает праздное общение, развлечения, знакомства и последствия социальной жизни персонажа.'],
      ['training', 'Обучение', 'Training', 'XGE', 'training', 'Обучение позволяет в простое осваивать языки, инструменты или иные навыки, если есть учитель и достаточно времени.'],
      ['relaxation', 'Отдых', 'Relaxation', 'XGE', 'relaxation', 'Отдых в простое помогает снять напряжение, восстановить силы и избавиться от некоторых негативных последствий.'],
      ['buying-a-magic-item', 'Покупка магических предметов', 'Buying a Magic Item', 'XGE', 'magic', 'Покупка магического предмета превращает поиск продавца в отдельную деятельность с проверками, редкостью и риском осложнений.'],
      ['crime', 'Преступная деятельность', 'Crime', 'XGE', 'crime', 'Преступная деятельность описывает подготовку и выполнение незаконного дела, где возможны прибыль, провал и последствия.'],
      ['selling-a-magic-item', 'Продажа магического предмета', 'Selling a Magic Item', 'XGE', 'magic', 'Продажа магического предмета помогает найти покупателя, определить цену и отыграть переговоры или осложнения сделки.'],
      ['work', 'Работа', 'Work', 'XGE', 'work', 'Работа в простое позволяет персонажу зарабатывать монеты, используя профессию, навыки, репутацию или физический труд.'],
      ['practicing-a-profession', 'Работа по профессии', 'Practicing a Profession', 'PHB', 'work', 'Работа по профессии отражает обычный заработок персонажа между приключениями и поддержание уровня жизни.'],
      ['religious-service', 'Религиозное служение', 'Religious Service', 'XGE', 'religion', 'Религиозное служение описывает работу при храме, помощь общине и получение благосклонности духовенства.'],
      ['crafting', 'Ремесло', 'Crafting', 'PHB', 'craft', 'Ремесло по базовым правилам позволяет изготавливать предметы в простое, если есть материалы и нужные инструменты.'],
      ['scribing-a-spell-scroll', 'Создание Свитка заклинания', 'Scribing a Spell Scroll', 'XGE', 'magic', 'Создание свитка заклинания позволяет магу вложить известное заклинание в расходуемый магический предмет.']
    ]
  },
  {
    id: 'additional',
    title: 'Дополнительная деятельность в простое',
    items: [
      ['performing-sacred-rites', 'Исполнение священных ритуалов', 'Performing Sacred Rites', 'DMG', 'religion', 'Священные ритуалы помогают персонажу служить культу, поддерживать связь с храмом и укреплять религиозное влияние.'],
      ['running-a-business', 'Коммерческая деятельность', 'Running a Business', 'DMG', 'work', 'Коммерческая деятельность описывает управление делом, доходы, убытки и события, которые случаются с бизнесом между приключениями.'],
      ['gaining-renown', 'Получение славы', 'Gaining Renown', 'DMG', 'service', 'Получение славы отражает рост репутации персонажа в организации, городе, фракции или общине.'],
      ['building-a-stronghold', 'Постройка крепости', 'Building a Stronghold', 'DMG', 'stronghold', 'Постройка крепости описывает большие проекты, цену, сроки и управление работами по созданию базы.'],
      ['sowing-rumors', 'Распространение слухов', 'Sowing Rumors', 'DMG', 'rumor', 'Распространение слухов позволяет влиять на общественное мнение, репутацию и политическую обстановку.'],
      ['crafting-a-magic-item', 'Создание магического предмета', 'Crafting a Magic Item', 'DMG', 'magic', 'Создание магического предмета требует редких компонентов, времени, золота и согласования с Мастером.'],
      ['training-to-gain-levels', 'Тренировки для получения уровней', 'Training to Gain Levels', 'DMG', 'training', 'Тренировки для получения уровней используются как вариант правила, где рост персонажа требует времени и наставления.']
    ]
  },
  {
    id: 'expenses',
    title: 'Расходы',
    items: [
      ['food-drink', 'Еда, напитки', 'Food, Drink', 'PHB', 'food', 'Еда и напитки задают повседневные цены для таверн, путешествий, запасов и жизни персонажей.'],
      ['lifestyle-expenses', 'Затраты на существование', 'Lifestyle Expenses', 'PHB', 'money', 'Затраты на существование показывают, сколько стоит выбранный уровень жизни персонажа за день.'],
      ['lodging', 'Постой', 'Lodging', 'PHB', 'lodging', 'Постой описывает цену ночлега, качество жилья и условия отдыха в поселениях.'],
      ['services', 'Услуги', 'Services', 'PHB', 'service', 'Услуги задают цены на наём работников, перевозчиков, специалистов и другую помощь за деньги.']
    ]
  }
]

function sourceName(source) {
  return DOWNTIME_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(slug) {
  return `https://5e14.ttg.club/screens/${slug.replaceAll('-', '_')}`
}

function buildBlocks(rule) {
  if (rule.blocks) return rule.blocks

  return [
    {
      title: 'Как использовать',
      paragraphs: [
        rule.summary,
        'Определите, сколько дней простоя персонаж тратит, какие ресурсы нужны, какие контакты или инструменты доступны и требуется ли проверка характеристики.'
      ]
    },
    {
      title: 'Результат',
      paragraphs: [
        'После завершения деятельности Мастер сообщает итог: прибыль, расходы, полученные сведения, созданный предмет, новый контакт, осложнение или иной результат, подходящий сцене.',
        'Если деятельность связана с риском, провал проверки не обязан означать полную неудачу. Он может создать долг, слух, врага, потерю времени или новую зацепку для приключения.'
      ]
    }
  ]
}

function makeRule(entry, group) {
  const [slug, title, titleEn, source, icon, summary, extra = {}] = entry

  return {
    slug,
    title,
    titleEn,
    icon,
    source,
    sourceName: sourceName(source),
    sourceUrl: extra.sourceUrl || sourceUrl(extra.externalSlug || slug),
    group: group.id,
    groupTitle: group.title || 'Деятельность в простое',
    summary,
    quick: extra.quick || [
      { label: 'Раздел', value: group.title || 'Простой' },
      { label: 'Источник', value: source },
      { label: 'Время', value: 'Дни простоя' }
    ],
    terms: extra.terms || [group.title || 'простой', title, 'проверка', 'расходы'],
    blocks: buildBlocks({ summary, ...extra }),
    ...extra
  }
}

export const DOWNTIME_ACTIVITY_GROUPS_5E = DOWNTIME_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const DOWNTIME_ACTIVITY_RULES_5E = DOWNTIME_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const DOWNTIME_ACTIVITY_RULE_BY_SLUG_5E = Object.fromEntries(DOWNTIME_ACTIVITY_RULES_5E.map(rule => [rule.slug, rule]))

export const DOWNTIME_ACTIVITY_GROUPS_WITH_RULES_5E = DOWNTIME_ACTIVITY_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => DOWNTIME_ACTIVITY_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function downtimeActivityRulePath(slug) {
  return `/dnd5e/screens/downtime_activities/${slug}`
}
