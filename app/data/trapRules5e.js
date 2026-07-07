export const TRAPS_SCREEN_5E = {
  slug: 'traps',
  title: 'Ловушки',
  titleEn: 'Traps',
  source: 'DMG / XGE',
  sourceName: 'Dungeon Master\'s Guide 2014 и Xanathar\'s Guide to Everything',
  sourceUrl: 'https://5e14.ttg.club/screens/traps',
  intro: 'Ловушки создают опасность в исследовании: их можно заметить, обойти, обезвредить, активировать ошибкой или использовать как часть сцены, где важны внимательность, инструменты, спасброски и последствия.'
}

export const TRAP_SOURCE_NAMES_5E = {
  DMG: 'Dungeon Master\'s Guide 2014',
  XGE: 'Xanathar\'s Guide to Everything'
}

export const TRAP_ICON_SVG_5E = {
  default: '<path d="M5 19h14M7 19l5-14 5 14" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M9 13h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  detect: '<path d="M3 12c3-5 15-5 18 0-3 5-15 5-18 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M18 18l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  trigger: '<path d="M12 3v8M8 7l4-4 4 4M5 20h14M7 16h10" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="14" r="2" fill="currentColor"/>',
  effect: '<path d="M12 3l2.2 6.3H21l-5.4 3.9 2.1 6.5L12 15.8l-5.7 3.9 2.1-6.5L3 9.3h6.8z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/>',
  crossbow: '<path d="M4 12h16M6 8l4 4-4 4M14 8l4 4-4 4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  sleep: '<path d="M15 4a8 8 0 1 0 5 10 6 6 0 0 1-5-10z" fill="currentColor"/><path d="M5 6h5l-5 5h5M12 14h4l-4 4h4" stroke="#101820" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  fire: '<path d="M12 21c4-2 6-5 6-8 0-4-3-6-4-10-4 3-1 6-5 8-2 1-3 3-3 5 0 3 2 5 6 5z" fill="currentColor"/>',
  sphere: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M4 12h16M12 4v16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  blade: '<path d="M5 19L19 5M13 5h6v6M5 15l4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  pit: '<path d="M4 8h16M6 8l4 12h4l4-12M9 12h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  bear: '<path d="M5 16c2 4 12 4 14 0M5 16l4-8M19 16l-4-8M9 8h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="12" cy="15" r="3" fill="currentColor"/>',
  collapse: '<path d="M4 6h16M6 10h4M14 10h4M8 14h3M13 18h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 6l-2 14M16 6l2 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  poison: '<path d="M9 3h6M10 3v5l-4 7a4 4 0 0 0 3.5 6h5a4 4 0 0 0 3.5-6l-4-7V3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  portcullis: '<path d="M5 4h14v16H5zM8 4v16M12 4v16M16 4v16M5 9h14" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  net: '<path d="M4 4h16v16H4zM4 9h16M4 15h16M9 4v16M15 4v16" stroke="currentColor" stroke-width="1.5" fill="none"/>',
  tempest: '<path d="M5 16c2-5 12-5 14 0M6 20h12M9 4l-2 5M14 4l-2 5M19 5l-3 5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
}

const TRAP_GROUP_DATA_5E = [
  {
    id: 'core',
    title: '',
    items: [
      ['detecting-and-disabling-a-trap', 'Обнаружение и обезвреживание ловушки', 'Detecting and Disabling a Trap', 'DMG', 'detect', 'detecting_and_disabling_a_trap', 'Правило помогает определить, как персонажи замечают ловушку, какие проверки нужны для понимания механизма и как её безопасно обезвредить.'],
      ['triggering-a-trap', 'Срабатывание ловушки', 'Triggering a Trap', 'DMG', 'trigger', 'triggering_a_trap', 'Срабатывание ловушки описывает условие, которое запускает опасность: шаг на плиту, открытие двери, снятие предмета или иное действие.'],
      ['trap-effects', 'Эффекты ловушек', 'Trap Effects', 'DMG', 'effect', 'trap_effects', 'Эффекты ловушек задают последствия: урон, яд, падение, удержание, тревогу, разделение группы или изменение поля боя.']
    ]
  },
  {
    id: 'examples',
    title: 'Примеры ловушек',
    items: [
      ['crossbow-trap', 'Арбалет-ловушка', 'Crossbow Trap', 'XGE', 'crossbow', 'crossbow_trap', 'Арбалет-ловушка стреляет по цели при срабатывании механизма и проверяет внимательность персонажей к проводам, нажимным пластинам и скрытым отверстиям.'],
      ['sleep-of-ages-trap', 'Вековой сон', 'Sleep of Ages Trap', 'XGE', 'sleep', 'sleep_of_ages_trap', 'Вековой сон усыпляет жертву магическим или алхимическим эффектом, превращая ловушку в угрозу времени, охраны и спасения союзника.'],
      ['fiery-blast-trap', 'Испепеляющий поток', 'Fiery Blast Trap', 'XGE', 'fire', 'fiery_blast_trap', 'Испепеляющий поток выбрасывает пламя в область и заставляет героев учитывать направление, укрытие и спасброски.'],
      ['rolling-sphere', 'Катящийся шар', 'Rolling Sphere', 'DMG', 'sphere', 'rolling_sphere', 'Катящийся шар давит и преследует существ в коридоре, создавая сцену с бегством, препятствиями и быстрыми решениями.'],
      ['scything-blade-trap', 'Косящее лезвие', 'Scything Blade Trap', 'XGE', 'blade', 'scything_blade_trap', 'Косящее лезвие атакует пространство режущим механизмом и наказывает неосторожное движение через опасный участок.'],
      ['pit-trap', 'Ловчая яма', 'Pit Trap', 'XGE', 'pit', 'pit_trap', 'Ловчая яма скрывает провал под настилом, листвой или иллюзией и угрожает падением, разделением группы или пленением.'],
      ['bear-trap', 'Медвежий капкан', 'Bear Trap', 'XGE', 'bear', 'bear_trap', 'Медвежий капкан фиксирует цель и наносит боль при срабатывании, особенно опасен в погоне или засаде.'],
      ['collapsing-roof', 'Обрушивающийся потолок', 'Collapsing Roof', 'DMG', 'collapse', 'collapsing_roof', 'Обрушивающийся потолок превращает комнату или тоннель в зону падающих обломков, завалов и ограниченного выхода.'],
      ['fire-breathing-statue', 'Огнедышащая статуя', 'Fire-Breathing Statue', 'DMG', 'fire', 'fire_breathing_statue', 'Огнедышащая статуя выпускает пламя из декоративного объекта и хорошо работает как повторяющаяся угроза в зале или коридоре.'],
      ['poison-needle', 'Отравленная игла', 'Poison Needle', 'DMG', 'poison', 'poison_needle', 'Отравленная игла прячется в замке, рукояти, сундуке или механизме и опасна для тех, кто действует поспешно.'],
      ['poison-needle-trap', 'Отравленная игла', 'Poison Needle Trap', 'XGE', 'poison', 'poison_needle_trap', 'Вариант отравленной иглы из XGE оформляет ловушку как компактный механизм с ядом, проверками и понятным срабатыванием.'],
      ['poison-darts', 'Отравленные дротики', 'Poison Darts', 'DMG', 'poison', 'poison_darts', 'Отравленные дротики поражают цель или область из скрытых отверстий, сочетая урон от попадания и действие яда.'],
      ['falling-portcullis', 'Падающая решётка', 'Falling Portcullis', 'XGE', 'portcullis', 'falling_portcullis', 'Падающая решётка отрезает путь, разделяет группу и может запереть персонажей рядом с другой угрозой.'],
      ['falling-net', 'Падающая сеть', 'Falling Net', 'DMG', 'net', 'falling_net', 'Падающая сеть удерживает существ и делает их уязвимыми для охраны, монстров или следующего эффекта ловушки.'],
      ['path-of-blades', 'Путь клинков', 'Path of Blades', 'XGE', 'blade', 'path_of_blades', 'Путь клинков превращает проход в полосу режущих механизмов, где важны тайминг, проверки и выбор маршрута.'],
      ['net-trap', 'Сеть', 'Net Trap', 'XGE', 'net', 'net_trap', 'Сеть-ловушка захватывает цель, ограничивает движение и создаёт удобный момент для засады.'],
      ['sphere-of-annihilation', 'Сфера аннигиляции', 'Sphere of Annihilation', 'DMG', 'sphere', 'sphere_of_annihilation', 'Сфера аннигиляции представляет смертельно опасную магическую угрозу, где ошибка может уничтожить существо или объект.'],
      ['sphere-of-crushing-doom', 'Сфера сокрушающей участи', 'Sphere of Crushing Doom', 'XGE', 'sphere', 'sphere_of_crushing_doom', 'Сфера сокрушающей участи давит существ и заставляет быстро искать укрытие, путь отхода или способ остановить механизм.'],
      ['poisoned-tempest', 'Ядовитая буря', 'Poisoned Tempest', 'XGE', 'tempest', 'poisoned_tempest', 'Ядовитая буря заполняет область токсичным эффектом и вынуждает героев действовать против времени и видимости.'],
      ['pits', 'Ямы', 'Pits', 'DMG', 'pit', 'pits', 'Ямы бывают простыми, скрытыми, запирающими, с шипами или монстрами, и остаются одним из самых гибких типов ловушек.']
    ]
  }
]

function sourceName(source) {
  return TRAP_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(externalSlug) {
  return `https://5e14.ttg.club/screens/${externalSlug}`
}

function buildBlocks(rule, group) {
  return [
    {
      title: 'Как работает',
      paragraphs: [
        rule.summary,
        'Перед использованием определите три вещи: что запускает ловушку, как её можно заметить или понять, и что происходит при срабатывании.'
      ]
    },
    {
      title: 'Проверки и последствия',
      paragraphs: [
        'Для обнаружения обычно подходят Внимательность, Анализ или осмотр конкретного объекта. Для обезвреживания часто используются воровские инструменты, Магия, подходящий инструмент или творческое решение персонажей.',
        'Последствие ловушки должно быть понятно игрокам после срабатывания: урон, состояние, разделение группы, шум, расход времени, разрушение пути или новая угроза.'
      ]
    },
    {
      title: group.id === 'examples' ? 'Настройка примера' : 'Подготовка Мастера',
      paragraphs: [
        group.id === 'examples'
          ? 'Пример можно менять под уровень отряда: увеличивать или уменьшать Сл, урон, число целей, область, частоту срабатывания и способы обхода.'
          : 'Хорошая ловушка не только отнимает хиты. Она задаёт выбор: рискнуть, искать обход, потратить ресурс, шуметь, разделиться или изменить план.'
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
    groupTitle: group.title || 'Ловушки',
    summary,
    quick: [
      { label: 'Раздел', value: group.title || 'Правила ловушек' },
      { label: 'Источник', value: source },
      { label: 'Ключ', value: group.id === 'examples' ? 'Пример ловушки' : 'Базовое правило' }
    ],
    terms: [group.title || 'ловушка', 'Внимательность', 'Анализ', 'спасбросок', 'урон'],
    blocks: buildBlocks({ summary }, group)
  }
}

export const TRAP_RULE_GROUPS_5E = TRAP_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const TRAP_RULES_5E = TRAP_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const TRAP_RULE_BY_SLUG_5E = Object.fromEntries(TRAP_RULES_5E.map(rule => [rule.slug, rule]))

export const TRAP_GROUPS_WITH_RULES_5E = TRAP_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => TRAP_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function trapRulePath(slug) {
  return `/dnd5e/screens/traps/${slug}`
}
