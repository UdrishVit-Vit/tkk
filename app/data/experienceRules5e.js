export const EXPERIENCE_SCREEN_5E = {
  slug: 'experience',
  title: 'Опыт',
  titleEn: 'Experience',
  source: 'PHB / DMG',
  sourceName: 'D&D 5e 2014',
  sourceUrl: 'https://5e14.ttg.club/screens/experience',
  intro: 'Когда персонаж отправляется в приключение и преодолевает испытания, он получает опыт, выраженный в виде очков опыта. Персонаж, который получает определённое количество очков опыта, улучшает свои способности, достигая нового уровня.'
}

export const EXPERIENCE_SOURCE_NAMES_5E = {
  PHB: "Player's Handbook 2014",
  DMG: "Dungeon Master's Guide 2014"
}

export const EXPERIENCE_ICON_SVG_5E = {
  default: '<path d="M4 19h16M6 16l4-5 3 3 5-8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 6v6h-6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  gain: '<path d="M4 19h16M6 16l4-5 3 3 5-8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 6h3v3M20 6l-6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  required: '<path d="M4 19h16M6 16l4-5 3 3 5-8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 5h8M8 8h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
}

const EXPERIENCE_GROUP_DATA_5E = [
  {
    id: 'core',
    title: '',
    items: [
      ['experience-gain', 'Получение опыта', 'Experience gain', 'DMG', 'gain', 'experience_gain', 'Получение опыта описывает, за какие преодолённые испытания персонажи получают очки опыта и как Мастер распределяет награду между участниками.'],
      ['experience-required', 'Требуемый опыт', 'Experience required', 'PHB', 'required', 'experience_required', 'Требуемый опыт показывает, сколько очков опыта нужно персонажу, чтобы достичь следующего уровня и получить новые возможности класса.']
    ]
  }
]

function sourceName(source) {
  return EXPERIENCE_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function buildBlocks(rule) {
  return [
    {
      title: 'Правило опыта',
      paragraphs: [
        rule.summary,
        'Опыт помогает отслеживать рост персонажа через преодоление опасностей, задач и важных препятствий. Он может начисляться за победы, переговоры, исследование, выполнение целей и решения, которые двигают приключение вперёд.'
      ]
    },
    {
      title: 'За столом',
      paragraphs: [
        'Перед кампанией лучше договориться, как именно используется опыт: за сражения, за цели, за исследование или в сочетании с вехами. Так игроки понимают, что игра считает значимым прогрессом.',
        'Если вы используете очки опыта, фиксируйте награды регулярно и ясно. Если переходите на повышение по вехам, раздел опыта всё равно полезен как ориентир темпа развития и сложности испытаний.'
      ]
    }
  ]
}

function makeRule(entry, group) {
  const [slug, title, titleEn, source, icon, externalSlug, summary] = entry

  return {
    slug,
    title,
    titleEn,
    icon,
    source,
    sourceName: sourceName(source),
    sourceUrl: sourceUrl(externalSlug),
    group: group.id,
    groupTitle: 'Опыт',
    summary,
    quick: [
      { label: 'Раздел', value: 'Опыт' },
      { label: 'Источник', value: source },
      { label: 'Тип', value: source === 'PHB' ? 'Развитие персонажа' : 'Награда за испытания' }
    ],
    terms: ['опыт', 'очки опыта', 'уровень', 'награда', 'испытание'],
    blocks: buildBlocks({ summary })
  }
}

export const EXPERIENCE_RULE_GROUPS_5E = EXPERIENCE_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const EXPERIENCE_RULES_5E = EXPERIENCE_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const EXPERIENCE_RULE_BY_SLUG_5E = Object.fromEntries(EXPERIENCE_RULES_5E.map(rule => [rule.slug, rule]))

export const EXPERIENCE_GROUPS_WITH_RULES_5E = EXPERIENCE_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => EXPERIENCE_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function experienceRulePath(slug) {
  return `/dnd5e/screens/experience/${slug}`
}
