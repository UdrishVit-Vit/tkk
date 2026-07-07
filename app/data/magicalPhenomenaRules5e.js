export const MAGICAL_PHENOMENA_SCREEN_5E = {
  slug: 'magical_phenomena',
  title: 'Магические проявления',
  titleEn: 'Magical Phenomena',
  source: 'TCE / DoDk',
  sourceName: 'D&D 5e 2014 и дополнительные источники',
  sourceUrl: 'https://5e14.ttg.club/screens/magical_phenomena',
  intro: 'Магические проявления описывают необычные природные и сверхъестественные явления: волшебные грибы, зачарованные источники, отголоски эмоций, делериум, аномалии и мистические бури.'
}

export const MAGICAL_PHENOMENA_SOURCE_NAMES_5E = {
  TCE: "Tasha's Cauldron of Everything",
  DoDk: 'Dungeons of Drakkenheim'
}

export const MAGICAL_PHENOMENA_ICON_SVG_5E = {
  default: '<path d="M12 3l3 6 6 1-4.5 4.2 1 6-5.5-3.2-5.5 3.2 1-6L3 10l6-1z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/>',
  mushroom: '<path d="M4 12a8 8 0 0 1 16 0zM9 12v7h6v-7M8 8h.01M12 7h.01M16 9h.01" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  spring: '<path d="M4 18c2-2 4-2 6 0s4 2 6 0 3-2 4 0M6 13c2-2 4-2 6 0s4 2 6 0M12 3c3 4 4 6 4 8a4 4 0 0 1-8 0c0-2 1-4 4-8z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  echo: '<path d="M12 21V8M8 12l4-4 4 4M6 19h12M8 5a4 4 0 0 1 8 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  fruit: '<path d="M12 8c5 0 7 4 5 8-2 5-8 5-10 0-2-4 0-8 5-8zM12 8c0-3 2-5 5-5M12 8c-1-2-3-3-5-3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  road: '<path d="M5 21c2-6 4-11 7-18 3 7 5 12 7 18M8 15h8M9 11h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  crystal: '<path d="M12 3l7 7-7 11-7-11zM12 3v18M5 10h14" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/>',
  use: '<path d="M5 20h14M7 20V9l5-5 5 5v11M9 13h6M10 17h4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  anomaly: '<path d="M12 3c4 5 6 8 6 12a6 6 0 0 1-12 0c0-4 2-7 6-12z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 12l6 6M15 12l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  storm: '<path d="M4 8c5-3 11-3 16 0M4 13c5-3 11-3 16 0M4 18c5-3 11-3 16 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M8 5l2 4M14 14l2 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  skull: '<path d="M12 4a7 7 0 0 0-7 7c0 3 2 5 4 6v3h6v-3c2-1 4-3 4-6a7 7 0 0 0-7-7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 12h.01M15 12h.01M10 17h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  fire: '<path d="M12 21c4-2 6-5 5-9-1-4-5-5-5-9-5 5-7 9-5 13 1 2 2 4 5 5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 18c2-1 3-3 2-5-2 1-4 3-2 5z" fill="currentColor"/>',
  wind: '<path d="M4 16c5 2 10 1 13-2 2-2 1-5-2-5-3 0-4 3-2 5M6 10c4 1 8 0 10-2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
}

const MAGICAL_PHENOMENA_GROUP_DATA_5E = [
  {
    id: 'wild-phenomena',
    title: '',
    items: [
      ['magic-mushrooms', 'Волшебные грибы', 'Magic Mushrooms', 'TCE', 'mushroom', 'magic_mushrooms', 'Волшебные грибы создают странные эффекты в местах, где магия пропитала почву, пещеры или лесную подстилку.'],
      ['enchanted-springs', 'Зачарованные источники', 'Enchanted Springs', 'TCE', 'spring', 'enchanted_springs', 'Зачарованные источники несут магическую воду, способную исцелять, менять настроение, давать видения или оставлять необычные последствия.'],
      ['emotional-echoes', 'Отголоски эмоций', 'Emotional Echoes', 'TCE', 'echo', 'emotional_echoes', 'Отголоски эмоций сохраняют переживания прошлого и заставляют место откликаться на страх, радость, скорбь или ярость.'],
      ['primal-fruit', 'Первозданный плод', 'Primal Fruit', 'TCE', 'fruit', 'primal_fruit', 'Первозданный плод растёт в местах мощной природной магии и может давать временные чудесные свойства или опасные побочные эффекты.'],
      ['unearthly-roads', 'Таинственные тропы', 'Unearthly Roads', 'TCE', 'road', 'unearthly_roads', 'Таинственные тропы соединяют далёкие места, искажают расстояние или ведут путников туда, куда обычная дорога не должна вести.']
    ]
  },
  {
    id: 'delerium',
    title: 'Делериум',
    items: [
      ['delerium', 'Делериум', 'Delerium', 'DoDk', 'crystal', 'delerium', 'Делериум - опасный магический материал, который даёт силу, но несёт заражение, искушение и непредсказуемые последствия.'],
      ['uses-for-delerium', 'Использование делериума', 'Uses for Delerium', 'DoDk', 'use', 'uses_for_delerium', 'Использование делериума охватывает алхимию, магические практики, усиление эффектов и риск обращения с нестабильной субстанцией.'],
      ['delerium-properties', 'Свойства делериума', 'Delerium Properties', 'DoDk', 'crystal', 'delerium_properties', 'Свойства делериума помогают определить его форму, силу, ценность, опасность и влияние на существ или окружение.'],
      ['arcane-anomalies', 'Таинственные аномалии', 'Arcane Anomalies', 'DoDk', 'anomaly', 'arcane_anomalies', 'Таинственные аномалии показывают, как испорченная или нестабильная магия меняет пространство, заклинания и поведение существ.']
    ]
  },
  {
    id: 'mystic-storms',
    title: 'Мистические бури',
    items: [
      ['thryms-howl', 'Вой Трима', 'Thryms Howl', 'TCE', 'storm', 'thryms_howl', 'Вой Трима приносит ледяную мистическую бурю, где холод и магическое давление становятся частью опасности.'],
      ['necrotic-tempest', 'Некротический шторм', 'Necrotic Tempest', 'TCE', 'skull', 'necrotic_tempest', 'Некротический шторм наполняет местность энергией смерти, угнетая живых и меняя атмосферу сцены.'],
      ['flame-storm', 'Огненная буря', 'Flame Storm', 'TCE', 'fire', 'flame_storm', 'Огненная буря превращает пространство в зону жара, пламени и нестабильной магии, где каждый шаг может стать риском.'],
      ['flaywind', 'Свежующий ветер', 'Flaywind', 'TCE', 'wind', 'flaywind', 'Свежующий ветер - жестокий магический поток, который сдирает защиту, мешает движению и делает открытую местность опасной.']
    ]
  }
]

function sourceName(source) {
  return MAGICAL_PHENOMENA_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function ruleType(group) {
  if (group.id === 'delerium') return 'Делериум'
  if (group.id === 'mystic-storms') return 'Мистическая буря'
  return 'Магическое проявление'
}

function buildBlocks(rule, group) {
  if (group.id === 'mystic-storms') {
    return [
      {
        title: 'Мистическая буря',
        paragraphs: [
          rule.summary,
          'Такая буря должна ощущаться как событие, а не просто фон. Она меняет видимость, движение, выбор маршрута, безопасность отдыха и то, как персонажи используют магию или укрытия.'
        ]
      },
      {
        title: 'За столом',
        paragraphs: [
          'Перед сценой определите, как буря предупреждает о себе, как долго длится и что помогает пережить её: укрытие, проверка навыка, магическая защита, быстрый маршрут или отказ от движения.',
          'Если буря слишком сильно замедляет игру, используйте её как одну яркую проблему сцены: риск урона, потеря направления, ухудшение видимости или осложнение для заклинаний.'
        ]
      }
    ]
  }

  if (group.id === 'delerium') {
    return [
      {
        title: 'Опасная магическая субстанция',
        paragraphs: [
          rule.summary,
          'Делериум удобно использовать как редкий ресурс с ценой. Он может быть наградой, уликой, топливом для ритуала, причиной болезни, источником аномалии или предметом торговли.'
        ]
      },
      {
        title: 'Использование в приключении',
        paragraphs: [
          'Показывайте делериум через последствия: изменённую среду, странные симптомы, алчность охотников за ресурсом, нестабильную магию и моральный выбор между выгодой и безопасностью.',
          'Чем чаще персонажи взаимодействуют с делериумом, тем важнее заранее определить риск, способ защиты и признаки того, что ситуация выходит из-под контроля.'
        ]
      }
    ]
  }

  return [
    {
      title: 'Магическое проявление',
      paragraphs: [
        rule.summary,
        'Такие явления помогают сделать местность узнаваемой: они дают сцене цвет, риск, награду и повод для исследования. Лучше всего они работают, когда игроки могут заметить признаки заранее и выбрать, как взаимодействовать.'
      ]
    },
    {
      title: 'Как применять',
      paragraphs: [
        'Определите, является ли проявление постоянной особенностью места, случайным событием или следом давней магии. Затем решите, что оно даёт: информацию, ресурс, опасность, короткий эффект или сюжетную зацепку.',
        'Не обязательно превращать каждое проявление в проверку. Иногда достаточно описания, небольшого выбора и понятного последствия.'
      ]
    }
  ]
}

function makeRule(entry, group) {
  const [slug, title, titleEn, source, icon, externalSlug, summary] = entry
  const groupTitle = group.title || 'Магические проявления'

  return {
    slug,
    title,
    titleEn,
    icon,
    source,
    sourceName: sourceName(source),
    sourceUrl: sourceUrl(externalSlug),
    group: group.id,
    groupTitle,
    summary,
    quick: [
      { label: 'Раздел', value: groupTitle },
      { label: 'Источник', value: source },
      { label: 'Тип', value: ruleType(group) }
    ],
    terms: group.id === 'delerium'
      ? ['делериум', 'аномалия', 'заражение', 'магический ресурс']
      : group.id === 'mystic-storms'
        ? ['буря', 'магия', 'опасность', 'укрытие', 'местность']
        : ['магическое проявление', 'аномалия', 'местность', 'исследование'],
    blocks: buildBlocks({ summary }, group)
  }
}

export const MAGICAL_PHENOMENA_RULE_GROUPS_5E = MAGICAL_PHENOMENA_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const MAGICAL_PHENOMENA_RULES_5E = MAGICAL_PHENOMENA_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const MAGICAL_PHENOMENA_RULE_BY_SLUG_5E = Object.fromEntries(MAGICAL_PHENOMENA_RULES_5E.map(rule => [rule.slug, rule]))

export const MAGICAL_PHENOMENA_GROUPS_WITH_RULES_5E = MAGICAL_PHENOMENA_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => MAGICAL_PHENOMENA_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function magicalPhenomenaRulePath(slug) {
  return `/dnd5e/screens/magical_phenomena/${slug}`
}
