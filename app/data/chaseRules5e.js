export const CHASES_SCREEN_5E = {
  slug: 'chases',
  title: 'Погоня',
  titleEn: 'Chases',
  source: 'DMG',
  sourceName: "Dungeon Master's Guide 2014",
  sourceUrl: 'https://5e14.ttg.club/screens/chases',
  intro: 'Погоня превращает движение в отдельную сцену: участники начинают преследование, тратят усилия на рывки, сталкиваются с осложнениями, пытаются скрыться или выследить цель после разрыва дистанции.'
}

export const CHASE_ICON_SVG_5E = {
  default: '<path d="M4 18c5-8 11-11 17-12-2 6-6 11-13 14z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M7 16l-3 4M13 8l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  tracking: '<path d="M6 18c2-3 3-5 2-8M12 20c1-4 3-6 5-9M4 11c3-2 6-2 9 1M11 7c3-2 6-1 8 2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="7" cy="6" r="2" fill="currentColor"/>',
  ending: '<path d="M4 6h13M4 11h10M4 16h13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16 8l4 4-4 4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
  beginning: '<path d="M5 18l5-11 4 5 5-8M14 12l5 1-1 5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="18" r="2" fill="currentColor"/>',
  complications: '<path d="M4 18h16M5 15l3-8 4 5 3-6 4 9" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 19v2M16 19v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  running: '<path d="M8 21l2-7-4-2 3-5 4 2 2 4 4 1M13 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
}

const CHASE_GROUP_DATA_5E = [
  {
    id: 'core',
    title: '',
    items: [
      ['tracking', 'Выслеживание', 'Tracking', 'tracking', 'tracking', 'Выслеживание помогает продолжить сцену после того, как цель скрылась: персонажи ищут следы, направление бегства и признаки недавнего прохода.'],
      ['ending-a-chase', 'Завершение погони', 'Ending a Chase', 'ending', 'ending_a_chase', 'Завершение погони определяет, когда преследователь теряет цель, догоняет её или сцена переходит в другое столкновение.'],
      ['beginning-a-chase', 'Начало погони', 'Beginning a Chase', 'beginning', 'beginning_a_chase', 'Начало погони задаёт участников, дистанцию, направление, условия местности и момент, когда обычное движение становится напряжённой сценой.'],
      ['chase-complications', 'Осложнения погони', 'Chase Complications', 'complications', 'chase_complications', 'Осложнения погони добавляют препятствия, толпу, опасную местность, внезапные помехи и решения, которые меняют темп преследования.'],
      ['running-the-chase', 'Проведение погони', 'Running the Chase', 'running', 'running_the_chase', 'Проведение погони описывает ход сцены: движение, рывки, проверки, усталость, дистанцию и попытки уйти из поля зрения.']
    ]
  }
]

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function buildBlocks(rule) {
  return [
    {
      title: 'Правило погони',
      paragraphs: [
        rule.summary,
        'Погоня лучше работает как отдельная сцена с понятной целью: догнать, скрыться, удержать дистанцию, найти укрытие или довести преследование до места, где меняются ставки.'
      ]
    },
    {
      title: 'За столом',
      paragraphs: [
        'Перед началом определите стартовую дистанцию, кто участвует, какая местность вокруг и что завершает сцену. Затем отслеживайте не каждый фут, а важные изменения: рывок, препятствие, потерю цели, удачный манёвр или цену усталости.',
        'Осложнения стоит вводить так, чтобы они давали выбор, а не просто отнимали ход: перепрыгнуть препятствие, свернуть в переулок, рискнуть коротким путём или потратить действие на помощь союзнику.'
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
    sourceName: CHASES_SCREEN_5E.sourceName,
    sourceUrl: sourceUrl(externalSlug),
    group: group.id,
    groupTitle: 'Погоня',
    summary,
    quick: [
      { label: 'Раздел', value: 'Погоня' },
      { label: 'Источник', value: 'DMG' },
      { label: 'Тип', value: 'Правило сцены' }
    ],
    terms: ['погоня', 'дистанция', 'рывок', 'осложнение', 'выслеживание'],
    blocks: buildBlocks({ summary })
  }
}

export const CHASE_RULE_GROUPS_5E = CHASE_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const CHASE_RULES_5E = CHASE_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const CHASE_RULE_BY_SLUG_5E = Object.fromEntries(CHASE_RULES_5E.map(rule => [rule.slug, rule]))

export const CHASE_GROUPS_WITH_RULES_5E = CHASE_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => CHASE_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function chaseRulePath(slug) {
  return `/dnd5e/screens/chases/${slug}`
}
