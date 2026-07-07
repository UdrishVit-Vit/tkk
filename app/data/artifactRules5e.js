export const ARTIFACTS_SCREEN_5E = {
  slug: 'artifacts',
  title: 'Артефакты',
  titleEn: 'Artifacts',
  source: 'DMG',
  sourceName: "Dungeon Master's Guide 2014",
  sourceUrl: 'https://5e14.ttg.club/screens/artifacts',
  intro: 'Артефакт - это уникальный магический предмет потрясающей силы, со своим собственным происхождением, историей, свойствами, недостатками и особым способом уничтожения.'
}

export const ARTIFACT_ICON_SVG_5E = {
  default: '<path d="M12 3l8 8-8 10-8-10z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="11" r="3" fill="currentColor"/>',
  destruction: '<path d="M12 3l8 8-8 10-8-10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  detrimental: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 11h8M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  beneficial: '<path d="M12 3l3 6 6 1-4.5 4.3 1 6.2L12 17l-5.5 3.5 1-6.2L3 10l6-1z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/><path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'
}

const ARTIFACT_GROUP_DATA_5E = [
  {
    id: 'core',
    title: '',
    items: [
      ['destruction-of-artifacts', 'Уничтожение артефактов', 'Destruction of artifacts', 'destruction', 'destruction_of_artifacts', 'Артефакты редко можно разрушить обычной силой. Для их уничтожения обычно нужен уникальный способ, связанный с происхождением, целью или легендой предмета.']
    ]
  },
  {
    id: 'detrimental',
    title: 'Отрицательные свойства',
    items: [
      ['minor-detrimental-properties', 'Малые отрицательные свойства', 'Minor Detrimental Properties', 'detrimental', 'minor_detrimental_properties', 'Малые отрицательные свойства добавляют артефакту цену: странность, слабость, неудобство, опасный побочный эффект или сюжетное осложнение.'],
      ['major-detrimental-properties', 'Основные отрицательные свойства', 'Major Detrimental Properties', 'detrimental', 'major_detrimental_properties', 'Основные отрицательные свойства делают артефакт по-настоящему рискованным: его сила сопровождается серьёзной угрозой, проклятием или разрушительным влиянием.']
    ]
  },
  {
    id: 'beneficial',
    title: 'Положительные свойства',
    items: [
      ['minor-beneficial-properties', 'Малые положительные свойства', 'Minor Beneficial Properties', 'beneficial', 'minor_beneficial_properties', 'Малые положительные свойства дают артефакту дополнительные преимущества, не превращая его в полностью неконтролируемую силу.'],
      ['major-beneficial-properties', 'Основные положительные свойства', 'Major Beneficial Properties', 'beneficial', 'major_beneficial_properties', 'Основные положительные свойства показывают легендарный масштаб артефакта и дают владельцу мощные преимущества, достойные уникального предмета.']
    ]
  }
]

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function buildBlocks(rule, group) {
  if (group.id === 'core') {
    return [
      {
        title: 'Уникальный способ',
        paragraphs: [
          rule.summary,
          'Способ уничтожения должен быть частью истории артефакта: место, существо, ритуал, план существования, редкое условие или повторение события, при котором предмет был создан.'
        ]
      },
      {
        title: 'Для кампании',
        paragraphs: [
          'Если артефакт можно уничтожить, сделайте этот путь приключением, а не простой проверкой. Игроки должны узнать условие, подготовиться, добраться до нужного места и пережить последствия.',
          'Уничтожение артефакта может изменить мир: освободить заключённую силу, снять проклятие, разгневать покровителя или закрыть целую сюжетную линию.'
        ]
      }
    ]
  }

  return [
    {
      title: 'Роль свойства',
      paragraphs: [
        rule.summary,
        'Свойства артефакта помогают отличить его от обычного магического предмета. Они делают предмет живым элементом истории, а не только набором чисел.'
      ]
    },
    {
      title: group.id === 'detrimental' ? 'Цена силы' : 'Легендарная награда',
      paragraphs: [
        group.id === 'detrimental'
          ? 'Отрицательное свойство должно быть заметным, но интересным. Оно может создавать риск, моральный выбор, давление времени, социальную проблему или опасное искушение.'
          : 'Положительное свойство усиливает владельца и подчёркивает масштаб артефакта. Лучше выбирать его так, чтобы оно поддерживало тему предмета и стиль героя.',
        'Если свойств несколько, проверьте, чтобы они работали вместе: усиливали тему артефакта, давали ясные решения за столом и не перегружали владельца лишними исключениями.'
      ]
    },
    {
      title: 'Настройка',
      paragraphs: [
        'Мастер может выбрать свойства сам или использовать таблицы как источник вдохновения. Важнее всего, чтобы итоговый артефакт имел узнаваемый характер, цель и последствия владения.'
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
    sourceName: ARTIFACTS_SCREEN_5E.sourceName,
    sourceUrl: sourceUrl(externalSlug),
    group: group.id,
    groupTitle: group.title || 'Артефакты',
    summary,
    quick: [
      { label: 'Раздел', value: group.title || 'Артефакты' },
      { label: 'Источник', value: 'DMG' },
      { label: 'Тип', value: group.id === 'core' ? 'Правило артефакта' : 'Свойство артефакта' }
    ],
    terms: ['артефакт', 'магический предмет', 'свойство', 'история', 'уничтожение'],
    blocks: buildBlocks({ summary }, group)
  }
}

export const ARTIFACT_RULE_GROUPS_5E = ARTIFACT_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const ARTIFACT_RULES_5E = ARTIFACT_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const ARTIFACT_RULE_BY_SLUG_5E = Object.fromEntries(ARTIFACT_RULES_5E.map(rule => [rule.slug, rule]))

export const ARTIFACT_GROUPS_WITH_RULES_5E = ARTIFACT_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => ARTIFACT_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function artifactRulePath(slug) {
  return `/dnd5e/screens/artifacts/${slug}`
}
