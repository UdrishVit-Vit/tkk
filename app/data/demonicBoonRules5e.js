export const DEMONIC_BOONS_SCREEN_5E = {
  slug: 'demonic_boons',
  title: 'Демонические дары',
  titleEn: 'Demonic Boons',
  source: 'MTF',
  sourceName: "Mordenkainen's Tome of Foes",
  sourceUrl: 'https://5e14.ttg.club/screens/demonic_boons',
  intro: 'Демонические дары отражают влияние владык Бездны и могущественных демонов. Такие силы почти всегда несут цену: искажение поведения, связь с покровителем, метку порчи или сюжетный долг.'
}

export const DEMONIC_BOON_ICON_SVG_5E = {
  default: '<path d="M12 3l8 7-3 10H7L4 10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 11h.01M16 11h.01M9 16c2-1 4-1 6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  lord: '<path d="M4 7l5 5 3-8 3 8 5-5-2 12H6z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M8 19h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  beast: '<path d="M4 12c3-7 13-7 16 0-2 6-14 6-16 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 8L5 4M16 8l3-4M9 13h.01M15 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  charm: '<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-6 10z" fill="currentColor"/><path d="M9 12h6" stroke="#101820" stroke-width="1.8" stroke-linecap="round"/>',
  madness: '<path d="M12 3c5 3 7 7 7 11a7 7 0 0 1-14 0c0-4 2-8 7-11z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 13h.01M16 13h.01M8 17c3-2 5 2 8 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  slime: '<path d="M6 16c0-6 3-11 6-11s6 5 6 11a6 6 0 0 1-12 0z" fill="currentColor"/><circle cx="10" cy="14" r="1" fill="#101820"/><circle cx="14" cy="14" r="1" fill="#101820"/>',
  death: '<path d="M7 10a5 5 0 0 1 10 0v5H7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M6 19h12M9 15l-2 5M15 15l2 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="11" r="1" fill="currentColor"/><circle cx="14" cy="11" r="1" fill="currentColor"/>',
  illusion: '<path d="M3 12c3-5 15-5 18 0-3 5-15 5-18 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  fiend: '<path d="M12 4l4 5 4-3-2 8a6 6 0 0 1-12 0L4 6l4 3z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M9 14h.01M15 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
}

const DEMONIC_BOON_GROUP_DATA_5E = [
  {
    id: 'demon-lords',
    title: '',
    kind: 'Дар владыки демонов',
    items: [
      ['boon-of-baphomet', 'Бафомет', 'Boon of Baphomet', 'lord', 'boon_of_baphomet', 'Дар Бафомета связан с дикостью, лабиринтами, яростью охоты и звериной силой Бездны.'],
      ['boon-of-graz-zt', 'Граз’зт', 'Boon of Graz zt', 'charm', 'boon_of_graz_zt', 'Дар Граз’зта связан с искушением, властью через желание, красотой, ложью и опасной харизмой.'],
      ['boon-of-demogorgon', 'Демогоргон', 'Boon of Demogorgon', 'madness', 'boon_of_demogorgon', 'Дар Демогоргона несёт раздвоенность, безумие, разрушительный взгляд и хаотичную власть глубин.'],
      ['boon-of-juiblex', 'Джуиблекс', 'Boon of Juiblex', 'slime', 'boon_of_juiblex', 'Дар Джуиблекса связан с кислотой, слизью, распадом тел и бесформенной порчей.'],
      ['boon-of-zuggtmoy', 'Заггтмой', 'Boon of Zuggtmoy', 'slime', 'boon_of_zuggtmoy', 'Дар Заггтмой несёт влияние грибов, спор, заражения, ложного единения и медленного подчинения.'],
      ['boon-of-yeenoghu', 'Йеногу', 'Boon of Yeenoghu', 'beast', 'boon_of_yeenoghu', 'Дар Йеногу связан с голодом, резнёй, стаей, преследованием и радостью жестокого нападения.'],
      ['boon-of-orcus', 'Оркус', 'Boon of Orcus', 'death', 'boon_of_orcus', 'Дар Оркуса несёт власть смерти, нежити, разложения и ненависти ко всему живому.'],
      ['boon-of-fraz-urb-luu', 'Фраз-Урб’лу', 'Boon of Fraz-Urb luu', 'illusion', 'boon_of_fraz-urb_luu', 'Дар Фраз-Урб’лу связан с иллюзиями, обманом, подменой истинного и разрушением доверия.']
    ]
  },
  {
    id: 'other-demons',
    title: 'Прочие демоны',
    kind: 'Демонический дар',
    items: [
      ['boon-of-balor', 'Балор', 'Boon of Balor', 'fiend', 'boon_of_balor', 'Дар балора отражает огонь, разрушение, боевую мощь и ужасающий авторитет великого демона.'],
      ['boon-of-goristro', 'Гористро', 'Boon of Goristro', 'beast', 'boon_of_goristro', 'Дар гористро связан с чудовищной силой, рогатым натиском, упрямством и разрушением преград.'],
      ['boon-of-marilith', 'Марилит', 'Boon of Marilith', 'fiend', 'boon_of_marilith', 'Дар марилит подчёркивает смертоносную ловкость, тактическое мышление и многорукую жестокость демонического воина.'],
      ['boon-of-nalfeshnee', 'Нальфешни', 'Boon of Nalfeshnee', 'madness', 'boon_of_nalfeshnee', 'Дар нальфешни связан с мерзким величием, жадностью, ужасом и подавляющим демоническим присутствием.']
    ]
  }
]

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function buildBlocks(rule, group) {
  return [
    {
      title: 'Суть дара',
      paragraphs: [
        rule.summary,
        'Такой дар лучше выдавать не как обычную награду, а как след контакта с Бездной: сделку, проклятие, одержимость, службу культу или пережитое демоническое воздействие.'
      ]
    },
    {
      title: 'Цена и последствия',
      paragraphs: [
        'Демонический дар должен давать силу, но оставлять след. Это может быть изменение внешности, навязчивое желание, кошмары, репутация, внимание культистов или требование покровителя.',
        'Если дар получает персонаж игрока, заранее определите, что является механикой, а что остаётся сюжетным давлением. Игрок должен понимать выгоду и риск.'
      ]
    },
    {
      title: 'Для Мастера',
      paragraphs: [
        group.id === 'demon-lords'
          ? 'Дары владык демонов должны ощущаться как влияние конкретного князя Бездны. Подчёркивайте тему покровителя в описаниях, снах, искушениях и реакции мира.'
          : 'Дары могущественных демонов удобно использовать для элитных культистов, чемпионов Бездны, проклятых чудовищ или редких наград с дурной славой.'
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
    source: 'MTF',
    sourceName: DEMONIC_BOONS_SCREEN_5E.sourceName,
    sourceUrl: sourceUrl(externalSlug),
    group: group.id,
    groupTitle: group.title || 'Демонические дары',
    summary,
    quick: [
      { label: 'Раздел', value: group.title || 'Владыки демонов' },
      { label: 'Источник', value: 'MTF' },
      { label: 'Тип', value: group.kind }
    ],
    terms: [group.kind, 'демон', 'Бездна', 'дар', 'искушение'],
    blocks: buildBlocks({ summary }, group)
  }
}

export const DEMONIC_BOON_RULE_GROUPS_5E = DEMONIC_BOON_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const DEMONIC_BOON_RULES_5E = DEMONIC_BOON_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const DEMONIC_BOON_RULE_BY_SLUG_5E = Object.fromEntries(DEMONIC_BOON_RULES_5E.map(rule => [rule.slug, rule]))

export const DEMONIC_BOON_GROUPS_WITH_RULES_5E = DEMONIC_BOON_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => DEMONIC_BOON_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function demonicBoonRulePath(slug) {
  return `/dnd5e/screens/demonic_boons/${slug}`
}
