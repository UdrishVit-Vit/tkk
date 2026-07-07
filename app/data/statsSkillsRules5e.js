export const STATS_SKILLS_SCREEN_5E = {
  slug: 'stats_and_skills',
  title: 'Характеристики и Навыки',
  titleEn: 'Stats and Skills',
  source: 'PHB / DMG / XGE',
  sourceName: 'D&D 5e 2014',
  sourceUrl: 'https://5e14.ttg.club/screens/stats_and_skills',
  intro: 'Характеристики описывают базовые возможности персонажа и существа, а навыки показывают, где опыт, обучение и привычка помогают применить эти возможности точнее.'
}

export const STATS_SKILLS_SOURCE_NAMES_5E = {
  PHB: 'Player’s Handbook 2014',
  DMG: 'Dungeon Master’s Guide 2014',
  MOT: 'Mythic Odysseys of Theros',
  ODL: 'Optional / campaign table'
}

const icon = {
  default: '<path d="M12 3l9 5v8l-9 5-9-5V8z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="15" r="1" fill="currentColor"/>',
  modifier: '<path d="M4 5h16v14H4zM7 9h5M7 13h3M15 9h2M15 13h2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="8" cy="16" r="1" fill="currentColor"/>',
  passive: '<path d="M5 7h13M5 12h13M5 17h13M3 7h.01M3 12h.01M3 17h.01" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
  check: '<path d="M12 3l4 8-4 10-4-10z" fill="currentColor"/><path d="M6 12h12M9 6l6 12" stroke="#0f1921" stroke-width="1.4" stroke-linecap="round"/>',
  contest: '<circle cx="7" cy="8" r="2" fill="currentColor"/><circle cx="17" cy="8" r="2" fill="currentColor"/><path d="M7 11v8M17 11v8M4 15h6M14 15h6M10 12h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  save: '<path d="M12 3l9 5v8l-9 5-9-5V8z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  spell: '<circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M12 8v8M16 5l4 4M20 5l-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  investigation: '<circle cx="10" cy="10" r="5.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M14 14l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  book: '<path d="M5 5c3-1 5-.5 7 1v14c-2-1.5-4-2-7-1zM12 6c2-1.5 4-2 7-1v14c-3-1-5-.5-7 1z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
  arcana: '<path d="M4 15c4-2 5-8 12-9-3 3-2 8-7 12M12 8l7-3-2 7" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  nature: '<path d="M12 20c-4-4-4-9 0-14 4 5 4 10 0 14zM12 12c3-4 6-5 9-3-1 5-4 7-9 7M12 12C9 8 6 7 3 9c1 5 4 7 9 7" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  religion: '<path d="M12 3v18M7 8h10M6 17c3-3 9-3 12 0M5 12c2 2 4 2 7 0 3 2 5 2 7 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  acrobatics: '<path d="M5 18h14M8 18v-7M16 18v-7M12 5v13M8 10l4-5 4 5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  attack: '<path d="M5 20L19 6M14 5l5 1 1 5M8 17l-2-2M12 13l-2-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  armor: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 9h8M7 13h10M10 17h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  sleight: '<path d="M6 16c3-5 8-5 12 0M8 12l4-6 4 6M5 19h14" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="8" cy="9" r="2" fill="currentColor"/>',
  stealth: '<path d="M4 15c3-7 13-7 16 0-4 4-12 4-16 0z" fill="currentColor"/><circle cx="10" cy="14" r="1" fill="#0f1921"/><circle cx="14" cy="14" r="1" fill="#0f1921"/>',
  perception: '<path d="M3 12c3-5 15-5 18 0-3 5-15 5-18 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  survival: '<path d="M10 21c-2-5 1-7 3-10 1-2 0-5 3-8 2 4 3 8 0 12-2 2-4 3-6 6z" fill="currentColor"/><path d="M7 8c2 0 3 1 4 3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  medicine: '<path d="M7 4c4 0 5 3 5 7 0-4 1-7 5-7 2 0 4 2 4 5 0 5-5 8-9 12C8 17 3 14 3 9c0-3 2-5 4-5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 9v6M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  insight: '<path d="M12 4c5 2 8 5 9 8-1 3-4 6-9 8-5-2-8-5-9-8 1-3 4-6 9-8z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  animal: '<path d="M6 12c0-5 12-5 12 0v7H6z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M8 6L5 3M16 6l3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  dice: '<path d="M12 3l9 5v8l-9 5-9-5V8z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="15" r="1" fill="currentColor"/>',
  pointBuy: '<circle cx="8" cy="7" r="2" fill="currentColor"/><path d="M8 10v10M5 14h6M14 6h6M14 12h6M14 18h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  array: '<path d="M4 15c4-4 12-4 16 0M6 12c3-3 9-3 12 0M8 9c2-2 6-2 8 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  optional: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 7v10M7 12h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0zM9 18h6M10 14v4M14 14v4M5 6H3c0 4 2 6 5 6M19 6h2c0 4-2 6-5 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  athletics: '<path d="M12 4v16M8 20h8M7 9l5-5 5 5M5 13h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  load: '<path d="M6 9h12l2 11H4z" fill="currentColor"/><path d="M9 9a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="1.8" fill="none"/><text x="12" y="17" text-anchor="middle" font-size="5" fill="#0f1921" font-weight="800">Kg</text>',
  carrying: '<path d="M6 6h12v14H6zM9 6V3h6v3M9 11h6M10 15h4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  size: '<path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4M5 12h14" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  pushing: '<circle cx="8" cy="7" r="2" fill="currentColor"/><path d="M8 10l-3 5h5l-2 6M10 12h6l4-4M16 8h4v4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  breath: '<path d="M12 20c-4-3-6-6-6-10a6 6 0 0 1 12 0c0 4-2 7-6 10z" fill="currentColor"/><path d="M8 13c2-2 6-2 8 0M9 16h6" stroke="#0f1921" stroke-width="1.4" stroke-linecap="round"/>',
  hitPoints: '<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-6 10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 8v7M8.5 11.5h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  performance: '<path d="M7 6c3-3 7-3 10 0v5c0 4-2 7-5 9-3-2-5-5-5-9z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 11c2 2 4 2 6 0M9 7h.01M15 7h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  intimidation: '<path d="M12 3l8 8-8 10-8-10z" fill="currentColor"/><path d="M8 12h8M10 9h.01M14 9h.01" stroke="#0f1921" stroke-width="1.5" stroke-linecap="round"/>',
  deception: '<path d="M4 12c4-4 8-4 12 0 2 2 3 4 4 7-4 1-8 0-12-4-2-2-3-3-4-3z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 10l8 6M10 14c2 1 4 1 6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  persuasion: '<circle cx="8" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="8" r="2" fill="currentColor"/><path d="M8 11v8M16 11v8M6 15c3 2 9 2 12 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
}

export const STATS_SKILLS_ICON_SVG_5E = icon

export const STATS_SKILLS_RULE_GROUPS_5E = [
  { id: 'core', title: '', items: ['ability-modifier', 'passive-checks', 'ability-checks', 'contests', 'saving-throws'] },
  { id: 'intelligence', title: 'Интеллект', items: ['investigation', 'spellcasting-ability-intelligence', 'history', 'arcana', 'nature', 'other-intelligence-checks', 'religion'] },
  { id: 'dexterity', title: 'Ловкость', items: ['acrobatics', 'attack-and-damage-rolls-dexterity', 'armor-class', 'sleight-of-hand', 'other-dexterity-checks', 'stealth'] },
  { id: 'wisdom', title: 'Мудрость', items: ['spellcasting-ability-wisdom', 'perception', 'survival', 'medicine', 'insight', 'other-wisdom-checks', 'animal-handling'] },
  { id: 'scores', title: 'Определение значений характеристик', items: ['rolling-for-scores', 'point-buy', 'standard-array'] },
  { id: 'optional', title: 'Опциональные характеристики', items: ['piety-mot', 'piety', 'sanity', 'proficiency-dice', 'renown', 'table-of-fame-rewards', 'honor'] },
  { id: 'strength', title: 'Сила', items: ['athletics', 'attack-and-damage-rolls-strength', 'encumbrance', 'carrying-capacity', 'other-strength-checks', 'size-and-weight', 'pushing-and-carrying'] },
  { id: 'constitution', title: 'Телосложение', items: ['holding-your-breath', 'other-constitution-checks', 'hit-points'] },
  { id: 'charisma', title: 'Харизма', items: ['spellcasting-ability-charisma', 'performance', 'intimidation', 'deception', 'other-charisma-checks', 'persuasion'] }
]

const abilityText = {
  strength: 'Сила',
  dexterity: 'Ловкость',
  constitution: 'Телосложение',
  intelligence: 'Интеллект',
  wisdom: 'Мудрость',
  charisma: 'Харизма'
}

function sourceName(source) {
  return STATS_SKILLS_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(slug) {
  return `https://5e14.ttg.club/screens/${slug}`
}

function makeBlocks(rule) {
  if (rule.blocks?.length) return rule.blocks
  const blocks = [
    {
      title: 'Правило',
      paragraphs: [rule.summary, ...(rule.details || [])]
    }
  ]
  if (rule.bullets?.length) blocks.push({ title: 'Примеры', bullets: rule.bullets })
  blocks.push({
    title: 'В игре',
    paragraphs: rule.play
      ? [rule.play]
      : ['Используйте это правило, когда нужно быстро определить, какую характеристику, навык, владение или спасбросок применить к действию персонажа.']
  })
  return blocks
}

function makeRule(rule) {
  return {
    sourceName: sourceName(rule.source),
    sourceUrl: rule.sourceUrl || sourceUrl(rule.externalSlug || rule.slug),
    quick: rule.quick || [
      { label: 'Источник', value: rule.source },
      { label: 'Раздел', value: rule.groupTitle || 'Характеристики и Навыки' }
    ],
    terms: rule.terms || [],
    blocks: makeBlocks(rule),
    ...rule
  }
}

function skillRule({ slug, title, titleEn, icon: iconName, ability, summary, bullets }) {
  const abilityName = abilityText[ability]
  return makeRule({
    slug,
    title,
    titleEn,
    icon: iconName || 'default',
    source: 'PHB',
    group: ability,
    groupTitle: abilityName,
    summary: summary || `${title} — навык характеристики ${abilityName}, который применяется, когда персонаж использует обучение и практику в подходящей ситуации.`,
    quick: [
      { label: 'Характеристика', value: abilityName },
      { label: 'Тип', value: 'Навык' },
      { label: 'Владение', value: 'Добавляет бонус мастерства' }
    ],
    terms: [abilityName, title, 'проверка характеристики', 'бонус мастерства'],
    details: [
      `Если персонаж владеет навыком ${title}, он добавляет бонус мастерства к проверке ${abilityName}, когда этот навык подходит к задаче.`,
      'Мастер выбирает характеристику и навык по описанию действия, а не только по названию навыка.'
    ],
    bullets
  })
}

function spellAbilityRule({ slug, title, titleEn, ability, group, icon: iconName = 'spell' }) {
  const abilityName = abilityText[ability]
  return makeRule({
    slug,
    title,
    titleEn,
    icon: iconName,
    source: 'PHB',
    group,
    groupTitle: abilityName,
    summary: `${abilityName} может быть базовой характеристикой заклинаний для класса или существа, если это указано в его правилах.`,
    quick: [
      { label: 'Сл спасброска', value: `8 + БМ + мод. ${abilityName}` },
      { label: 'Атака заклинанием', value: `БМ + мод. ${abilityName}` },
      { label: 'Используется', value: 'Классом или особенностью' }
    ],
    terms: [abilityName, 'Сл спасброска', 'атака заклинанием', 'бонус мастерства'],
    details: [
      'Базовая характеристика заклинаний определяет, насколько трудно сопротивляться вашим заклинаниям и насколько точно вы попадаете атаками заклинаниями.',
      'Конкретный класс, подкласс, раса или предмет указывает, какая характеристика используется для его магии.'
    ]
  })
}

function otherChecksRule({ slug, title, titleEn, ability, group, bullets }) {
  const abilityName = abilityText[ability]
  return makeRule({
    slug,
    title,
    titleEn,
    icon: 'default',
    source: 'PHB',
    group,
    groupTitle: abilityName,
    summary: `Прочие проверки ${abilityName} используются для задач, которые опираются на характеристику, но не попадают точно в один из навыков.`,
    quick: [
      { label: 'Характеристика', value: abilityName },
      { label: 'Навык', value: 'Без навыка или по решению Мастера' },
      { label: 'Основа', value: 'Описание действия' }
    ],
    terms: [abilityName, 'проверка характеристики', 'Сл'],
    details: [
      'Если задача не совпадает с готовым навыком, Мастер может назначить чистую проверку характеристики.',
      'Иногда владение инструментом, язык, предыстория или особенность персонажа подходят лучше, чем навык.'
    ],
    bullets
  })
}

export const STATS_SKILLS_RULES_5E = [
  makeRule({
    slug: 'ability-modifier',
    title: 'Модификаторы характеристик',
    titleEn: 'Ability Modifier',
    icon: 'modifier',
    source: 'PHB',
    group: 'core',
    summary: 'Модификатор характеристики — число, которое прибавляется к броскам, связанным со значением этой характеристики.',
    quick: [{ label: 'Формула', value: '(значение - 10) / 2 вниз' }, { label: 'Пример', value: '16 даёт +3' }, { label: 'Используется', value: 'Проверки, атаки, спасброски' }],
    terms: ['характеристика', 'модификатор', 'проверка', 'спасбросок'],
    details: ['Почти все броски к20 используют не само значение характеристики, а её модификатор.', 'Округление идёт вниз, поэтому 9 даёт -1, 10 и 11 дают +0, 12 и 13 дают +1.']
  }),
  makeRule({
    slug: 'passive-checks',
    title: 'Пассивные проверки',
    titleEn: 'Passive Checks',
    icon: 'passive',
    source: 'PHB',
    group: 'core',
    summary: 'Пассивная проверка отражает средний результат без броска кости, когда действие повторяется или Мастер скрывает бросок.',
    quick: [{ label: 'Формула', value: '10 + все модификаторы' }, { label: 'Помеха', value: '-5' }, { label: 'Преимущество', value: '+5' }],
    terms: ['пассивная проверка', 'Внимательность', 'преимущество', 'помеха'],
    details: ['Самый частый пример — пассивная Мудрость (Внимательность), которая помогает заметить скрытых существ и опасности.', 'Пассивная проверка не заменяет активное действие, когда персонаж специально ищет, изучает или пробует что-то сделать.']
  }),
  makeRule({
    slug: 'ability-checks',
    title: 'Проверки характеристик',
    titleEn: 'Ability Checks',
    icon: 'check',
    source: 'PHB',
    group: 'core',
    summary: 'Проверка характеристики решает, успешно ли персонаж справляется с задачей, исход которой не очевиден.',
    quick: [{ label: 'Бросок', value: 'к20 + модификатор' }, { label: 'Если владеет', value: '+ бонус мастерства' }, { label: 'Сравнение', value: 'Против Сл' }],
    terms: ['проверка характеристики', 'Сл', 'бонус мастерства', 'к20'],
    details: ['Мастер назначает характеристику, а затем может разрешить применить навык или инструмент, если они подходят к описанному действию.', 'Если результат равен Сл или превышает её, проверка успешна.']
  }),
  makeRule({
    slug: 'contests',
    title: 'Состязание',
    titleEn: 'Contests',
    icon: 'contest',
    source: 'PHB',
    group: 'core',
    summary: 'Состязание используется, когда два существа прямо противодействуют друг другу проверками характеристик.',
    quick: [{ label: 'Бросают', value: 'Обе стороны' }, { label: 'Победа', value: 'Больший результат' }, { label: 'Ничья', value: 'Ситуация не меняется' }],
    terms: ['состязание', 'проверка характеристики', 'Атлетика', 'Акробатика'],
    details: ['Типичный пример — захват: одна сторона использует Силу (Атлетика), другая отвечает Силой (Атлетика) или Ловкостью (Акробатика).', 'При ничьей активная сторона обычно не меняет положение дел.']
  }),
  makeRule({
    slug: 'saving-throws',
    title: 'Спасброски',
    titleEn: 'Saving Throws',
    icon: 'save',
    source: 'PHB',
    group: 'core',
    summary: 'Спасбросок — реакция на опасность, заклинание, яд, ловушку или другой эффект, которому персонаж пытается сопротивляться.',
    quick: [{ label: 'Бросок', value: 'к20 + мод. характеристики' }, { label: 'Владение', value: '+ бонус мастерства' }, { label: 'Против', value: 'Сл эффекта' }],
    terms: ['спасбросок', 'Сл', 'заклинание', 'ловушка'],
    details: ['Эффект указывает, какая характеристика используется для спасброска и что происходит при успехе или провале.', 'Владение спасброском даёт бонус мастерства к соответствующим спасброскам.']
  }),

  skillRule({ slug: 'investigation', title: 'Анализ', titleEn: 'Investigation', icon: 'investigation', ability: 'intelligence', summary: 'Анализ помогает находить выводы по уликам, разгадывать закономерности и понимать скрытые механизмы.', bullets: ['Найти тайный отсек по следам пыли.', 'Понять принцип ловушки.', 'Собрать смысл из разрозненных улик.'] }),
  spellAbilityRule({ slug: 'spellcasting-ability-intelligence', title: 'Базовая характеристика Интеллект', titleEn: 'Spellcasting Ability Intelligence', ability: 'intelligence', group: 'intelligence' }),
  skillRule({ slug: 'history', title: 'История', titleEn: 'History', icon: 'book', ability: 'intelligence', summary: 'История отвечает за знание прошлого: королевства, войны, древние культуры, родословные и легенды.' }),
  skillRule({ slug: 'arcana', title: 'Магия', titleEn: 'Arcana', icon: 'arcana', ability: 'intelligence', summary: 'Магия помогает вспоминать знания о заклинаниях, магических традициях, планах существования, рунах и сверхъестественных явлениях.' }),
  skillRule({ slug: 'nature', title: 'Природа', titleEn: 'Nature', icon: 'nature', ability: 'intelligence', summary: 'Природа используется для знаний о местности, растениях, животных, погоде и природных циклах.' }),
  otherChecksRule({ slug: 'other-intelligence-checks', title: 'Прочие проверки Интеллекта', titleEn: 'Other Intelligence Checks', ability: 'intelligence', group: 'intelligence', bullets: ['Вспомнить редкий факт.', 'Оценить прочность конструкции.', 'Разобраться в шифре или схеме.'] }),
  skillRule({ slug: 'religion', title: 'Религия', titleEn: 'Religion', icon: 'religion', ability: 'intelligence', summary: 'Религия охватывает богов, обряды, святыни, культы, символы, молитвы и религиозные традиции.' }),

  skillRule({ slug: 'acrobatics', title: 'Акробатика', titleEn: 'Acrobatics', icon: 'acrobatics', ability: 'dexterity', summary: 'Акробатика помогает сохранять равновесие, выполнять трюки и избегать падений через ловкость тела.' }),
  makeRule({
    slug: 'attack-and-damage-rolls-dexterity',
    title: 'Броски атаки и урона',
    titleEn: 'Attack and Damage Rolls',
    icon: 'attack',
    source: 'PHB',
    group: 'dexterity',
    groupTitle: 'Ловкость',
    summary: 'Ловкость применяется к атакам и урону дальнобойным оружием, а также оружием с подходящими свойствами.',
    quick: [{ label: 'Обычно', value: 'Дальнобойное оружие' }, { label: 'Также', value: 'Фехтовальное оружие по выбору' }, { label: 'Добавляется', value: 'К атаке и урону' }],
    terms: ['Ловкость', 'бросок атаки', 'урон', 'фехтовальное оружие'],
    details: ['Для дальнобойного оружия обычно используется модификатор Ловкости. Для оружия со свойством фехтовальное можно выбрать Силу или Ловкость.', 'Если правило оружия или особенности говорит иначе, используйте это частное правило.']
  }),
  makeRule({
    slug: 'armor-class',
    title: 'Класс Доспеха',
    titleEn: 'Armor Class',
    icon: 'armor',
    source: 'PHB',
    group: 'dexterity',
    groupTitle: 'Ловкость',
    summary: 'Ловкость часто влияет на Класс Доспеха, если доспех или особенность позволяет добавить её модификатор.',
    quick: [{ label: 'Без доспеха', value: '10 + мод. Ловкости' }, { label: 'Лёгкий доспех', value: '+ мод. Ловкости' }, { label: 'Средний доспех', value: 'Обычно максимум +2' }],
    terms: ['Класс Доспеха', 'Ловкость', 'доспех', 'щит'],
    details: ['Точная формула КД зависит от доспеха, щита, заклинаний и особенностей персонажа.', 'Тяжёлые доспехи обычно не добавляют модификатор Ловкости к КД.']
  }),
  skillRule({ slug: 'sleight-of-hand', title: 'Ловкость рук', titleEn: 'Sleight of Hand', icon: 'sleight', ability: 'dexterity', summary: 'Ловкость рук применяется для незаметных манипуляций, карманных краж, фокусов и точных движений пальцами.' }),
  otherChecksRule({ slug: 'other-dexterity-checks', title: 'Прочие проверки Ловкости', titleEn: 'Other Dexterity Checks', ability: 'dexterity', group: 'dexterity', bullets: ['Удержать равновесие на узкой поверхности.', 'Сделать быстрый трюк руками.', 'Освободиться из пут через гибкость.'] }),
  skillRule({ slug: 'stealth', title: 'Скрытность', titleEn: 'Stealth', icon: 'stealth', ability: 'dexterity', summary: 'Скрытность помогает двигаться тихо, прятаться, избегать внимания и устраивать засаду.' }),

  spellAbilityRule({ slug: 'spellcasting-ability-wisdom', title: 'Базовая характеристика Мудрость', titleEn: 'Spellcasting Ability Wisdom', ability: 'wisdom', group: 'wisdom' }),
  skillRule({ slug: 'perception', title: 'Внимательность', titleEn: 'Perception', icon: 'perception', ability: 'wisdom', summary: 'Внимательность отвечает за обнаружение того, что можно заметить чувствами: звук, движение, запах, силуэт или опасность.' }),
  skillRule({ slug: 'survival', title: 'Выживание', titleEn: 'Survival', icon: 'survival', ability: 'wisdom', summary: 'Выживание помогает идти по следам, ориентироваться, добывать пищу, предсказывать погоду и избегать природных угроз.' }),
  skillRule({ slug: 'medicine', title: 'Медицина', titleEn: 'Medicine', icon: 'medicine', ability: 'wisdom', summary: 'Медицина используется для стабилизации, диагностики болезней, оценки ран и оказания обычной помощи.' }),
  skillRule({ slug: 'insight', title: 'Проницательность', titleEn: 'Insight', icon: 'insight', ability: 'wisdom', summary: 'Проницательность помогает читать намерения, распознавать ложь, страх, сомнение и скрытые мотивы.' }),
  otherChecksRule({ slug: 'other-wisdom-checks', title: 'Прочие проверки Мудрости', titleEn: 'Other Wisdom checks', ability: 'wisdom', group: 'wisdom', bullets: ['Понять, что животное встревожено.', 'Почувствовать неправильность ситуации.', 'Оценить направление по природным признакам.'] }),
  skillRule({ slug: 'animal-handling', title: 'Уход за животными', titleEn: 'Animal Handling', icon: 'animal', ability: 'wisdom', summary: 'Уход за животными помогает успокаивать зверей, управлять ездовыми животными и понимать их поведение.' }),

  makeRule({
    slug: 'rolling-for-scores',
    title: 'Метод бросание костей',
    titleEn: 'Rolling for Scores',
    icon: 'dice',
    source: 'PHB',
    group: 'scores',
    groupTitle: 'Определение значений характеристик',
    summary: 'Классический случайный метод: бросьте 4к6, отбросьте меньшую кость и сложите три оставшиеся.',
    quick: [{ label: 'Бросок', value: '4к6' }, { label: 'Отбросить', value: 'Меньшую кость' }, { label: 'Повторить', value: '6 значений' }],
    terms: ['4к6', 'характеристика', 'создание персонажа'],
    details: ['Полученные шесть значений распределяются между характеристиками персонажа по выбору игрока.', 'Метод даёт больше случайности: персонажи могут оказаться заметно сильнее или слабее стандартного ожидания.']
  }),
  makeRule({
    slug: 'point-buy',
    title: 'Метод покупки за очки',
    titleEn: 'Point Buy',
    icon: 'pointBuy',
    source: 'PHB',
    group: 'scores',
    groupTitle: 'Определение значений характеристик',
    summary: 'Метод покупки за очки позволяет собрать характеристики из общего бюджета, обычно 27 очков.',
    quick: [{ label: 'Бюджет', value: '27 очков' }, { label: 'Нижняя граница', value: '8' }, { label: 'Верхняя до бонусов', value: '15' }],
    terms: ['покупка за очки', 'характеристика', 'создание персонажа'],
    details: ['Чем выше значение характеристики, тем дороже его поднять. Это даёт контролируемый и сбалансированный способ создания персонажа.', 'Метод удобен, когда группа хочет равные стартовые возможности без случайности бросков.']
  }),
  makeRule({
    slug: 'standard-array',
    title: 'Метод стандартного массива',
    titleEn: 'Standard Array',
    icon: 'array',
    source: 'PHB',
    group: 'scores',
    groupTitle: 'Определение значений характеристик',
    summary: 'Стандартный массив даёт готовые значения 15, 14, 13, 12, 10 и 8 для распределения между характеристиками.',
    quick: [{ label: 'Значения', value: '15, 14, 13, 12, 10, 8' }, { label: 'Случайность', value: 'Нет' }, { label: 'Темп', value: 'Быстро' }],
    terms: ['стандартный массив', 'характеристика', 'создание персонажа'],
    details: ['Игрок распределяет готовые числа между шестью характеристиками до применения расовых или иных бонусов.', 'Это самый быстрый и предсказуемый метод для старта кампании.']
  }),

  makeRule({ slug: 'piety-mot', title: 'Благоволение', titleEn: 'Piety MOT', icon: 'optional', source: 'MOT', group: 'optional', groupTitle: 'Опциональные характеристики', summary: 'Благоволение отражает связь персонажа с богом, культовой традицией или божественной силой в стиле Theros.', terms: ['благоволение', 'бог', 'награда'], details: ['Значение растёт или падает в зависимости от поступков персонажа и может открывать особые награды.', 'Это не базовая характеристика PHB, а кампанийный инструмент.'] }),
  makeRule({ slug: 'piety', title: 'Благочестие', titleEn: 'Piety', icon: 'optional', source: 'DMG', group: 'optional', groupTitle: 'Опциональные характеристики', summary: 'Благочестие измеряет религиозную преданность персонажа и отношение высших сил к его поступкам.', terms: ['благочестие', 'религия', 'награда'], details: ['Мастер может использовать его как репутацию перед божеством или храмом.', 'Награды и последствия зависят от структуры кампании.'] }),
  makeRule({ slug: 'sanity', title: 'Здравомыслие', titleEn: 'Sanity', icon: 'optional', source: 'DMG', group: 'optional', groupTitle: 'Опциональные характеристики', summary: 'Здравомыслие — опциональная характеристика для кампаний с ужасом, безумием и давлением на разум.', terms: ['здравомыслие', 'ужас', 'психика'], details: ['Проверки и спасброски Здравомыслия подходят для контакта с невозможным, чуждым или разрушительным для рассудка.', 'Эта характеристика меняет тон игры, поэтому её лучше вводить явно.'] }),
  makeRule({ slug: 'proficiency-dice', title: 'Кость мастерства', titleEn: 'Proficiency Dice', icon: 'dice', source: 'DMG', group: 'optional', groupTitle: 'Опциональные характеристики', summary: 'Кость мастерства заменяет фиксированный бонус мастерства броском кости, добавляя больше случайности.', terms: ['бонус мастерства', 'кость мастерства', 'опциональное правило'], details: ['Вместо постоянного +2, +3 и так далее игрок бросает соответствующую кость и добавляет результат.', 'Это делает проверки менее предсказуемыми, но более живыми.'] }),
  makeRule({ slug: 'renown', title: 'Слава', titleEn: 'Renown', icon: 'optional', source: 'DMG', group: 'optional', groupTitle: 'Опциональные характеристики', summary: 'Слава показывает положение персонажа в организации, фракции или обществе.', terms: ['слава', 'фракция', 'репутация'], details: ['Слава может открывать услуги, доступ к ресурсам, титулы и особые задания.', 'Она хорошо работает для кампаний с гильдиями, домами, орденами и политикой.'] }),
  makeRule({ slug: 'table-of-fame-rewards', title: 'Таблица наград славой', titleEn: 'Table of Fame Rewards', icon: 'trophy', source: 'ODL', group: 'optional', groupTitle: 'Опциональные характеристики', summary: 'Таблица наград славой помогает связать рост репутации с конкретными преимуществами.', terms: ['слава', 'награда', 'репутация'], details: ['Награды могут включать контакты, доступ к местам, поддержку союзников, услуги или уникальные права.', 'Используйте таблицу как кампанийный инструмент, а не обязательное правило.'] }),
  makeRule({ slug: 'honor', title: 'Честь', titleEn: 'Honor', icon: 'trophy', source: 'DMG', group: 'optional', groupTitle: 'Опциональные характеристики', summary: 'Честь — опциональная характеристика для культур, где долг, кодекс и общественная оценка имеют механическое значение.', terms: ['честь', 'кодекс', 'репутация'], details: ['Проверки Чести подходят для соблюдения клятв, выдерживания позора, понимания этикета и влияния в обществе чести.', 'Как и другие опциональные характеристики, она должна соответствовать тону кампании.'] }),

  skillRule({ slug: 'athletics', title: 'Атлетика', titleEn: 'Athletics', icon: 'athletics', ability: 'strength', summary: 'Атлетика используется для лазания, прыжков, плавания, борьбы, удержания и других силовых действий.' }),
  makeRule({
    slug: 'attack-and-damage-rolls-strength',
    title: 'Броски атаки и урона',
    titleEn: 'Attack and Damage Rolls Stat',
    icon: 'attack',
    source: 'PHB',
    group: 'strength',
    groupTitle: 'Сила',
    summary: 'Сила обычно применяется к броскам атаки и урона рукопашным и метательным оружием.',
    quick: [{ label: 'Обычно', value: 'Рукопашное оружие' }, { label: 'Также', value: 'Метательное оружие' }, { label: 'Добавляется', value: 'К атаке и урону' }],
    terms: ['Сила', 'бросок атаки', 'урон', 'оружие'],
    details: ['Если оружие не имеет свойства фехтовальное или особого правила, рукопашные атаки оружием обычно используют Силу.', 'Метательное оружие обычно использует ту же характеристику, что и рукопашная атака этим оружием.']
  }),
  makeRule({ slug: 'encumbrance', title: 'Вариант: Нагрузка', titleEn: 'Encumbrance', icon: 'load', source: 'PHB', group: 'strength', groupTitle: 'Сила', summary: 'Вариант нагрузки делает вес снаряжения важнее и вводит штрафы за чрезмерно тяжёлый груз.', quick: [{ label: 'Правило', value: 'Вариант' }, { label: 'Основа', value: 'Сила и вес' }, { label: 'Эффект', value: 'Снижение скорости' }], terms: ['нагрузка', 'вес', 'Сила', 'скорость'], details: ['Если группа использует этот вариант, переносимый вес сравнивается с Силой персонажа.', 'Чем тяжелее груз, тем сильнее страдает скорость и мобильность.'] }),
  makeRule({ slug: 'carrying-capacity', title: 'Грузоподъёмность', titleEn: 'Carrying Capacity', icon: 'carrying', source: 'PHB', group: 'strength', groupTitle: 'Сила', summary: 'Грузоподъёмность показывает, сколько веса персонаж может нести без специальных вариантов нагрузки.', quick: [{ label: 'Формула', value: 'Сила × 15 фунтов' }, { label: 'Для существ', value: 'Зависит от размера' }, { label: 'Единица', value: 'Фунты' }], terms: ['грузоподъёмность', 'Сила', 'размер', 'вес'], details: ['Это базовый предел переносимого веса для существа.', 'Размер существа может увеличивать или уменьшать этот предел по правилам размера и груза.'] }),
  otherChecksRule({ slug: 'other-strength-checks', title: 'Прочие проверки Силы', titleEn: 'Other Strength Checks', ability: 'strength', group: 'strength', bullets: ['Выломать дверь.', 'Удержать падающий камень.', 'Разорвать путы или цепь.'] }),
  makeRule({ slug: 'size-and-weight', title: 'Размер и груз', titleEn: 'Size and Weight', icon: 'size', source: 'PHB', group: 'strength', groupTitle: 'Сила', summary: 'Размер существа влияет на то, сколько оно может нести, толкать, тянуть и поднимать.', quick: [{ label: 'Больше размер', value: 'Больше груз' }, { label: 'Меньше размер', value: 'Меньше груз' }, { label: 'Основа', value: 'Сила' }], terms: ['размер', 'груз', 'Сила'], details: ['Крупные существа несут больше, а крошечные — меньше, чем существо Среднего размера с той же Силой.', 'Это важно для ездовых животных, великанов, уменьшения, увеличения и переноски союзников.'] }),
  makeRule({ slug: 'pushing-and-carrying', title: 'Толкание, волочение и перенос', titleEn: 'Pushing and Carrying', icon: 'pushing', source: 'PHB', group: 'strength', groupTitle: 'Сила', summary: 'Существо может толкать, тащить или поднимать вес больше обычной грузоподъёмности, но с ограничениями.', quick: [{ label: 'Предел', value: 'Сила × 30 фунтов' }, { label: 'Если выше грузоподъёмности', value: 'Скорость 5 фт.' }, { label: 'Зависит от', value: 'Размер' }], terms: ['толкание', 'волочение', 'перенос', 'Сила'], details: ['Если вес превышает грузоподъёмность, движение становится крайне медленным.', 'Мастер может учитывать поверхность, форму предмета, помощь союзников и инструменты.'] }),

  makeRule({ slug: 'holding-your-breath', title: 'Задержка дыхания', titleEn: 'Holding Your Breath', icon: 'breath', source: 'PHB', group: 'constitution', groupTitle: 'Телосложение', summary: 'Существо может задержать дыхание на время, зависящее от модификатора Телосложения.', quick: [{ label: 'Длительность', value: '1 + мод. Телосложения минут' }, { label: 'Минимум', value: '30 секунд' }, { label: 'После воздуха', value: 'Раунды по мод. Телосложения' }], terms: ['Телосложение', 'дыхание', 'удушение'], details: ['Когда воздух заканчивается, существо может продержаться ещё ограниченное число раундов, после чего падает до 0 хитов.', 'Это правило важно для воды, дыма, вакуума, захоронения и удушающих эффектов.'] }),
  otherChecksRule({ slug: 'other-constitution-checks', title: 'Прочие проверки Телосложения', titleEn: 'Other Constitution Checks', ability: 'constitution', group: 'constitution', bullets: ['Выдержать марш без отдыха.', 'Пить без последствий.', 'Сохранять силы в суровой погоде.'] }),
  makeRule({ slug: 'hit-points', title: 'Хиты', titleEn: 'Hit Points', icon: 'hitPoints', source: 'PHB', group: 'constitution', groupTitle: 'Телосложение', summary: 'Модификатор Телосложения влияет на максимум хитов персонажа на каждом уровне.', quick: [{ label: 'На уровень', value: '+ мод. Телосложения' }, { label: 'Минимум прироста', value: 'Зависит от класса и правил' }, { label: 'Влияет', value: 'Живучесть' }], terms: ['Телосложение', 'хиты', 'кость хитов', 'максимум хитов'], details: ['При получении уровня персонаж добавляет модификатор Телосложения к результату кости хитов или фиксированному значению класса.', 'Если модификатор Телосложения меняется, максимум хитов пересчитывается за все уровни.'] }),

  spellAbilityRule({ slug: 'spellcasting-ability-charisma', title: 'Базовая характеристика Харизма', titleEn: 'Spellcasting Ability Charisma', ability: 'charisma', group: 'charisma' }),
  skillRule({ slug: 'performance', title: 'Выступление', titleEn: 'Performance', icon: 'performance', ability: 'charisma', summary: 'Выступление используется для музыки, актёрства, танца, рассказа, ритуальной речи и публичной подачи.' }),
  skillRule({ slug: 'intimidation', title: 'Запугивание', titleEn: 'Intimidation', icon: 'intimidation', ability: 'charisma', summary: 'Запугивание помогает заставить других действовать через угрозу, давление, демонстрацию силы или пугающую репутацию.' }),
  skillRule({ slug: 'deception', title: 'Обман', titleEn: 'Deception', icon: 'deception', ability: 'charisma', summary: 'Обман используется для лжи, маскировки намерений, блефа, фальшивых историй и введения в заблуждение.' }),
  otherChecksRule({ slug: 'other-charisma-checks', title: 'Прочие проверки Харизмы', titleEn: 'Other Charisma checks', ability: 'charisma', group: 'charisma', bullets: ['Влиться в толпу.', 'Произвести первое впечатление.', 'Передать эмоцию без слов.'] }),
  skillRule({ slug: 'persuasion', title: 'Убеждение', titleEn: 'Persuasion', icon: 'persuasion', ability: 'charisma', summary: 'Убеждение помогает влиять на других честными доводами, тактом, дружелюбием и дипломатией.' })
]

export const STATS_SKILLS_RULE_BY_SLUG_5E = Object.fromEntries(STATS_SKILLS_RULES_5E.map(rule => [rule.slug, rule]))

export const STATS_SKILLS_GROUPS_WITH_RULES_5E = STATS_SKILLS_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => STATS_SKILLS_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function statsSkillsRulePath(slug) {
  return `/dnd5e/screens/stats_and_skills/${slug}`
}
