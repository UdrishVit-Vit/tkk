export const JOURNEY_SCREEN_5E = {
  slug: 'journey',
  title: 'Путешествие',
  titleEn: 'Journey',
  source: 'PHB / DMG / TOA',
  sourceName: 'D&D 5e 2014 и дополнительные источники',
  sourceUrl: 'https://5e14.ttg.club/screens/journey',
  intro: 'Путешествие охватывает дорогу между сценами: еду и воду, темп движения, труднопроходимую местность, форсированный марш, скакунов, транспорт, груз, экипаж и состояние судов.'
}

export const JOURNEY_SOURCE_NAMES_5E = {
  PHB: "Player's Handbook 2014",
  DMG: "Dungeon Master's Guide 2014",
  TOA: 'Tomb of Annihilation'
}

export const JOURNEY_ICON_SVG_5E = {
  default: '<path d="M5 18c4-7 10-11 14-12-1 6-5 11-12 14l-2-2z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M8 16l-4 4M13 8l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  food: '<path d="M7 3v8M10 3v8M7 7h3M16 3v18M16 3c3 2 3 7 0 9" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  supplies: '<path d="M5 8h14v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 8V6a4 4 0 0 1 8 0v2M9 13h6M9 17h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  dehydration: '<path d="M12 3c4 5 6 8 6 12a6 6 0 0 1-12 0c0-4 2-7 6-12z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 15c2 2 4 2 6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  foraging: '<path d="M6 18c1-7 5-11 12-12-1 7-5 11-12 12z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M6 18l8-8M7 11c-2-1-3-3-2-6 3 1 5 3 6 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  pace: '<path d="M4 17c4-3 6-3 10 0s5 3 6 0M5 12c4-3 6-3 10 0s5 3 6 0M6 7c4-3 6-3 10 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  terrain: '<path d="M3 18l5-7 4 5 3-4 6 6z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M8 11l2-5 2 10M15 12l1-6 3 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  march: '<path d="M8 21l2-7-4-2 3-5 4 2 2 4 4 1M13 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  mount: '<path d="M4 15l3-6 7-2 5 4-2 7M8 20l1-5M16 20l-1-6M7 9l-3-2M17 11l3-2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  horses: '<path d="M4 15c3-7 8-8 13-5l3 2-3 2-1 5M9 20v-5M14 20l-1-5M7 11l-3-1" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  ship: '<path d="M4 15h16l-3 5H7zM7 15V7l8 4v4M4 20c2-1 4-1 6 0s4 1 6 0 3-1 4 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  sail: '<path d="M5 19h14M8 18V4l9 8H8M8 12l-4 6h4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  cargo: '<path d="M5 8h14v11H5zM8 8V5h8v3M5 12h14M9 16h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  wagon: '<path d="M4 15h14l2-5H7zM7 18a2 2 0 1 0 0 .1M17 18a2 2 0 1 0 0 .1M5 15l-2-4M18 10l2-3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  passengers: '<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 21v-2a4 4 0 0 1 8 0v2M12 21v-2a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  threshold: '<path d="M12 3l8 5v6c0 4-3 7-8 9-5-2-8-5-8-9V8z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 13h8M12 9v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  repair: '<path d="M14 6l4 4-8 8H6v-4zM16 4l4 4M4 20h16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  crew: '<path d="M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 22v-2a7 7 0 0 1 14 0v2M4 13h16M8 13v8M16 13v8" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
}

const JOURNEY_GROUP_DATA_5E = [
  {
    id: 'core',
    title: '',
    items: [
      ['food-and-water', 'Еда и вода', 'Food and Water', 'PHB', 'food', 'food_and_water', 'Еда и вода задают базовую стоимость и расход припасов в дороге, а также последствия нехватки питания и питья.'],
      ['food-and-water-for-creatures', 'Еда и вода для существ', 'Food and Water for Creatures', 'DMG', 'supplies', 'food_and_water_for_creatures', 'Еда и вода для существ помогают учитывать потребности скакунов, животных-компаньонов, пленников и других существ в путешествии.'],
      ['dehydration', 'Обезвоживание', 'Dehydration', 'TOA', 'dehydration', 'dehydration', 'Обезвоживание усиливает опасность жары, джунглей, пустынь и долгих переходов без достаточного запаса воды.'],
      ['foraging', 'Поиск пищи в Подземье', 'Foraging', 'TOA', 'foraging', 'foraging', 'Поиск пищи в Подземье или дикой местности определяет, может ли группа найти еду и воду без готовых припасов.'],
      ['pace-of-movement', 'Темп передвижения', 'Pace of Movement', 'PHB', 'pace', 'pace_of_movement', 'Темп передвижения определяет, насколько быстро группа проходит расстояние и какие риски принимает: скрытность, внимание, усталость и время в пути.'],
      ['difficult-terrain', 'Труднопроходимая местность', 'Difficult Terrain', 'PHB', 'terrain', 'difficult_terrain', 'Труднопроходимая местность замедляет движение через густой лес, болото, завалы, снег, крутые склоны и другие препятствия.'],
      ['forced-march', 'Форсированный марш', 'Forced march', 'PHB', 'march', 'forced_march', 'Форсированный марш позволяет идти дольше обычного, но превращает время в пути в риск истощения и падения темпа группы.']
    ]
  },
  {
    id: 'mounts',
    title: 'Скакуны',
    items: [
      ['mount-and-other-animals', 'Скакуны и другие животные', 'Mount and other Animals', 'PHB', 'mount', 'mount_and_other_animals', 'Скакуны и другие животные увеличивают скорость, грузоподъёмность и варианты перемещения, но требуют заботы, корма и управления.'],
      ['horses-and-transport', 'Скакуны и транспорт', 'Horses and transport', 'PHB', 'horses', 'horses_and_transport', 'Скакуны и транспорт связывают скорость поездки, стоимость перевозки, доступность дорог и количество груза, которое может взять отряд.']
    ]
  },
  {
    id: 'transport',
    title: 'Транспорт',
    items: [
      ['waterborne-vehicles', 'Водный транспорт', 'Waterborne Vehicles', 'PHB', 'ship', 'waterborne_vehicles', 'Водный транспорт описывает лодки и корабли, их стоимость, скорость, вместимость и роль в путешествиях по рекам, морям и озёрам.'],
      ['airborne-and-waterborne-vehicles', 'Воздушные и водные суда', 'Airborne and Waterborne Vehicles', 'DMG', 'sail', 'airborne_and_waterborne_vehicles', 'Воздушные и водные суда расширяют путешествие до кораблей, дирижаблей и иных крупных средств передвижения, где важны экипаж, скорость и состояние корпуса.'],
      ['cargo', 'Груз', 'Cargo', 'DMG', 'cargo', 'cargo', 'Груз определяет, сколько товаров, припасов, сокровищ и снаряжения может перевозить судно или повозка без перегруза.'],
      ['ground-vehicles', 'Наземный транспорт', 'Ground Vehicles', 'PHB', 'wagon', 'ground_vehicles', 'Наземный транспорт включает повозки, телеги, сани и другие средства, которые помогают перевозить людей и груз по дорогам или пересечённой местности.'],
      ['passengers', 'Пассажиры', 'Passengers', 'DMG', 'passengers', 'passengers', 'Пассажиры занимают место, требуют припасов и могут влиять на безопасность, стоимость и темп путешествия.'],
      ['damage-threshold', 'Порог урона', 'Damage Threshold', 'DMG', 'threshold', 'damage_threshold', 'Порог урона помогает определять, когда крупный объект или судно игнорирует слишком слабые повреждения.'],
      ['ship-repair', 'Судоремонт', 'Ship Repair', 'DMG', 'repair', 'ship_repair', 'Судоремонт описывает восстановление корабля после повреждений, стоимость работ, время ремонта и необходимость материалов или специалистов.'],
      ['crew', 'Экипаж', 'Crew', 'DMG', 'crew', 'crew', 'Экипаж управляет судном, поддерживает порядок, отвечает за навигацию, ремонт, вахты и эффективность транспорта в пути.']
    ]
  }
]

function sourceName(source) {
  return JOURNEY_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function buildBlocks(rule, group) {
  const groupTitle = group.title || 'Путешествие'

  if (group.id === 'core') {
    return [
      {
        title: 'Правило путешествия',
        paragraphs: [
          rule.summary,
          'Перед выходом в дорогу определите темп, маршрут, запас припасов, условия местности и то, кто отвечает за навигацию, дозор, поиск пищи и заботу о животных. Эти решения задают ритм путешествия и помогают Мастеру быстро понять, где появляются проверки и опасности.'
        ]
      },
      {
        title: 'За столом',
        paragraphs: [
          'Используйте это правило как часть дорожной сцены: оно помогает решить, сколько времени занимает путь, какие ресурсы расходуются и где возникает риск истощения, задержки, встречи или потери направления.',
          'Если путешествие не является важной частью приключения, правило можно свернуть до пары решений и одного броска. Если дорога сама становится сценой, добавьте погоду, препятствия, случайные встречи и последствия выбранного темпа.'
        ]
      }
    ]
  }

  if (group.id === 'mounts') {
    return [
      {
        title: 'Скакуны в пути',
        paragraphs: [
          rule.summary,
          'Скакун делает путешествие быстрее и помогает перевозить груз, но становится отдельным ресурсом группы. Ему нужны корм, вода, отдых и безопасные условия; в опасной местности животное может потребовать проверки, ухода или выбора более медленного маршрута.'
        ]
      },
      {
        title: 'Когда применять',
        paragraphs: [
          'Используйте это правило, когда скорость, стоимость перевозки, нагрузка или выживание животных действительно влияют на сцену. Для коротких переходов достаточно отметить, что скакун есть; для дальних маршрутов лучше учитывать корм, утомление и доступность дорог.'
        ]
      }
    ]
  }

  return [
    {
      title: groupTitle,
      paragraphs: [
        rule.summary,
        'Транспорт превращает дорогу в управляемую систему: у него есть скорость, вместимость, экипаж, груз, повреждения и условия, при которых он может продолжать движение. Чем крупнее транспорт, тем важнее заранее понимать, кто им управляет и что произойдёт при поломке.'
      ]
    },
    {
      title: 'Использование в приключении',
      paragraphs: [
        'Проверяйте транспорт, когда он проходит опасный участок, получает урон, перегружен, идёт без достаточного экипажа или становится целью сцены. В спокойной дороге достаточно учитывать стоимость, время и вместимость.',
        'Если транспорт является важной частью истории, добавьте роли для персонажей: навигация, ремонт, наблюдение, управление, переговоры с экипажем и защита груза.'
      ]
    }
  ]
}

function makeRule(entry, group) {
  const [slug, title, titleEn, source, icon, externalSlug, summary] = entry
  const groupTitle = group.title || 'Путешествие'

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
      { label: 'Тип', value: group.id === 'transport' ? 'Транспорт' : group.id === 'mounts' ? 'Скакуны' : 'Правило пути' }
    ],
    terms: group.id === 'transport'
      ? ['путешествие', 'транспорт', 'груз', 'экипаж', 'скорость', 'повреждение']
      : group.id === 'mounts'
        ? ['путешествие', 'скакун', 'скорость', 'корм', 'груз', 'местность']
        : ['путешествие', 'темп', 'еда', 'вода', 'местность', 'истощение'],
    blocks: buildBlocks({ summary }, group)
  }
}

export const JOURNEY_RULE_GROUPS_5E = JOURNEY_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const JOURNEY_RULES_5E = JOURNEY_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const JOURNEY_RULE_BY_SLUG_5E = Object.fromEntries(JOURNEY_RULES_5E.map(rule => [rule.slug, rule]))

export const JOURNEY_GROUPS_WITH_RULES_5E = JOURNEY_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => JOURNEY_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function journeyRulePath(slug) {
  return `/dnd5e/screens/journey/${slug}`
}
