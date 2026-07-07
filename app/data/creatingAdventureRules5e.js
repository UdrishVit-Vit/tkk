export const CREATING_ADVENTURES_SCREEN_5E = {
  slug: 'creating_adventures',
  title: 'Создание приключений',
  titleEn: 'Creating Adventures',
  source: 'DMG',
  sourceName: "Dungeon Master's Guide 2014",
  sourceUrl: 'https://5e14.ttg.club/screens/creating_adventures',
  intro: 'Создание приключений помогает Мастеру собрать игровой каркас: цели персонажей, важных ПМ, локации, злодея, сцены, завязку, развязку и события, которые двигают историю.'
}

export const CREATING_ADVENTURES_ICON_SVG_5E = {
  default: '<path d="M5 5h14v14H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  goals: '<path d="M5 19V5h10l-2 4 2 4H5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M5 19h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  npc: '<circle cx="12" cy="7" r="3" fill="currentColor"/><path d="M5 21a7 7 0 0 1 14 0M4 11l3 3M20 11l-3 3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  book: '<path d="M5 5h6a4 4 0 0 1 4 4v10H9a4 4 0 0 0-4-4z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M15 5h4v14h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  climax: '<path d="M12 4v14M7 18h10M5 21h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 11l4-7 4 7" fill="currentColor"/>',
  villain: '<path d="M12 3l8 7-3 10H7L4 10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 11h.01M16 11h.01M9 16c2-1 4-1 6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  action: '<path d="M4 13l8-9v7h8l-8 9v-7z" fill="currentColor"/>',
  reaction: '<path d="M5 12a7 7 0 0 1 12-5l2 2M19 12a7 7 0 0 1-12 5l-2-2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M19 5v4h-4M5 19v-4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  location: '<path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M12 4v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  flag: '<path d="M5 20V5h12l-2 4 2 4H5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M8 20h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  encounter: '<path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 9h3M13 9h3M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  events: '<path d="M6 4h9l3 3v13H6z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M15 4v4h4M9 11h6M9 15h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
}

const CREATING_ADVENTURE_GROUP_DATA_5E = [
  {
    id: 'location-based',
    title: 'Приключения, основанные на локациях',
    items: [
      ['partys-goals', '1. Цели группы', "Party's Goals", 'goals', "party's_goals", 'Определите, зачем отряд идёт в локацию: спасти пленника, найти предмет, остановить угрозу, исследовать тайну или выбраться живыми.'],
      ['important-npcs', '2. Важные ПМ', 'Important NPCs', 'npc', 'important_npcs', 'Подготовьте ключевых персонажей Мастера, которые двигают локацию: союзников, врагов, пленников, хозяев места и тех, кто знает правду.'],
      ['ideal-introduction', '4. Идеальное введение', 'Ideal Introduction', 'book', 'ideal_introduction', 'Продумайте первое впечатление от приключения: сцену входа, крючок, тревожный знак или выбор, который сразу вовлекает игроков.'],
      ['ideal-climax', '5. Идеальное завершение', 'Ideal Climax', 'climax', 'ideal_climax', 'Опишите, чем локационное приключение может закончиться: решающей сценой, раскрытием тайны, побегом, переговорами или большой битвой.']
    ]
  },
  {
    id: 'event-based',
    title: 'Приключения, основанные на событиях',
    items: [
      ['start-with-a-villain', '1. Начните со злодея', 'Start with a Villain', 'villain', 'start_with_a_villain', 'Событийное приключение удобно строить от злодея: кто действует, чего хочет, почему это важно и что случится, если герои не вмешаются.'],
      ['determine-the-villains-actions', '2. Определите действия злодея', "Determine the Villain's Actions", 'action', "determine_the_villain's_actions", 'Запишите план злодея как последовательность действий. Это создаёт ход времени и помогает миру реагировать даже без участия героев.'],
      ['determine-the-partys-goals', '3. Определите цели отряда', "Determine the Party's Goals", 'goals', "determine_the_party's_goals", 'Сформулируйте, что должны или могут сделать герои: разоблачить, остановить, защитить, добыть, выжить, договориться или выбрать сторону.'],
      ['identify-important-npcs', '4. Придумайте важных ПМ', 'Identify Important NPCs', 'npc', 'identify_important_npcs', 'Выберите персонажей Мастера, которые помогают показать конфликт: жертвы, свидетели, союзники, соперники, агенты злодея и нейтральные фигуры.'],
      ['anticipate-the-villains-reactions', '5. Определите реакции злодея', "Anticipate the Villain's Reactions", 'reaction', "anticipate_the_villain's_reactions", 'Подумайте, как злодей ответит на успехи и ошибки героев: ускорит план, сменит цель, начнёт охоту, предложит сделку или спрячется.'],
      ['detail-key-locations', '6. Заполните ключевые локации', 'Detail Key Locations', 'location', 'detail_key_locations', 'Опишите места, где принимаются важные решения: что там видно, кто там находится, какие есть опасности, тайны и пути отхода.'],
      ['choose-an-introduction-and-a-climax', '7. Выберите введение и развязку', 'Choose an Introduction and a Climax', 'flag', 'choose_an_introduction_and_a_climax', 'Подберите начало, которое быстро вводит конфликт, и развязку, где ставки становятся ясными и действия героев меняют итог.'],
      ['plan-encounters', '8. Спланируйте сцены', 'Plan Encounters', 'encounter', 'plan_encounters', 'Разложите приключение на сцены: социальные, боевые, исследовательские, промежуточные и кульминационные, оставляя место для выбора игроков.'],
      ['framing-events', 'Основные события', 'Framing Events', 'events', 'framing_events', 'Основные события задают фон приключения: катастрофы, праздники, нападения, исчезновения, политические решения или любые перемены в мире.']
    ]
  }
]

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function buildBlocks(rule) {
  return [
    {
      title: 'Задача шага',
      paragraphs: [
        rule.summary,
        'Записывайте результат коротко и практично: одно-два предложения, которые можно сразу использовать за столом.'
      ]
    },
    {
      title: 'Вопросы для подготовки',
      bullets: [
        'Что игроки поймут или выберут благодаря этому элементу?',
        'Какие последствия появятся, если герои проигнорируют этот элемент?',
        'Как этот шаг связан с целью отряда, злодеем, локацией или кульминацией?'
      ]
    },
    {
      title: 'За столом',
      paragraphs: [
        'Не превращайте подготовку в жёсткий сценарий. Этот элемент должен помогать реагировать на решения игроков, а не заменять их выбор.',
        'Если сцена меняется из-за действий отряда, сохраните намерение шага и переставьте его в другое место приключения.'
      ]
    }
  ]
}

function makeRule(entry, group) {
  const [slug, title, titleEn, icon, externalSlug, summary] = entry

  return {
    slug,
    title,
    titleEn,
    icon,
    source: 'DMG',
    sourceName: CREATING_ADVENTURES_SCREEN_5E.sourceName,
    sourceUrl: sourceUrl(externalSlug),
    group: group.id,
    groupTitle: group.title,
    summary,
    quick: [
      { label: 'Тип', value: group.title.includes('локациях') ? 'Локация' : 'Событие' },
      { label: 'Источник', value: 'DMG' },
      { label: 'Роль', value: title.replace(/^\d+\.\s*/, '') }
    ],
    terms: [group.title, 'приключение', 'сцена', 'цели', 'ПМ'],
    blocks: buildBlocks({ summary })
  }
}

export const CREATING_ADVENTURE_RULE_GROUPS_5E = CREATING_ADVENTURE_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const CREATING_ADVENTURE_RULES_5E = CREATING_ADVENTURE_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const CREATING_ADVENTURE_RULE_BY_SLUG_5E = Object.fromEntries(CREATING_ADVENTURE_RULES_5E.map(rule => [rule.slug, rule]))

export const CREATING_ADVENTURE_GROUPS_WITH_RULES_5E = CREATING_ADVENTURE_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => CREATING_ADVENTURE_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function creatingAdventureRulePath(slug) {
  return `/dnd5e/screens/creating_adventures/${slug}`
}
