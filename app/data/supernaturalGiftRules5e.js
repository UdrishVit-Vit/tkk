export const SUPERNATURAL_GIFTS_SCREEN_5E = {
  slug: 'supernatural_gifts',
  title: 'Сверхъестественные дары',
  titleEn: 'Supernatural gifts',
  source: 'DMG / Setting Books',
  sourceName: 'D&D 5e 2014 и дополнительные источники',
  sourceUrl: 'https://5e14.ttg.club/screens/supernatural_gifts',
  intro: 'Сверхъестественные дары дают персонажу силу вне обычной классовой прогрессии: благословения, чары, тёмные сделки, драконьи черты, дары богов и странные метки судьбы.'
}

export const SUPERNATURAL_GIFT_SOURCE_NAMES_5E = {
  DMG: "Dungeon Master's Guide 2014",
  IDRotF: 'Icewind Dale: Rime of the Frostmaiden',
  MTF: "Mordenkainen's Tome of Foes",
  CM: 'Candlekeep Mysteries',
  BAM: "Boo's Astral Menagerie",
  FTD: "Fizban's Treasury of Dragons",
  ODL: 'Odyssey of the Dragonlords',
  MOT: 'Mythic Odysseys of Theros',
  VRGR: "Van Richten's Guide to Ravenloft",
  COS: 'Curse of Strahd',
  DoD: 'Domains of Delight',
  EGtW: "Explorer's Guide to Wildemount",
  ToFW: 'Turn of Fortune Wheel',
  VNotEE: 'Vecna: Nest of the Eldritch Eye',
  GGR: "Guildmasters' Guide to Ravnica"
}

export const SUPERNATURAL_GIFT_ICON_SVG_5E = {
  default: '<path d="M12 3l3 6 6 1-4.5 4.3 1 6.2L12 17l-5.5 3.5 1-6.2L3 10l6-1z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/>',
  blessing: '<path d="M12 3v18M6 9h12M8 21h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 3l3 4h-6z" fill="currentColor"/>',
  charm: '<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-6 10z" fill="currentColor"/>',
  dragon: '<path d="M4 15c4-9 12-9 16 0-4-2-6-1-8 4-2-5-4-6-8-4z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M9 10l3-6 3 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  theros: '<path d="M12 3l8 8-8 10-8-10z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="12" cy="11" r="3" fill="currentColor"/>',
  dark: '<path d="M12 3c5 3 7 7 7 11a7 7 0 0 1-14 0c0-4 2-8 7-11z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 13h.01M15 13h.01M9 17c2-1 4-1 6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  cos: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" fill="currentColor"/><path d="M8 11h8M9 15h6" stroke="#101820" stroke-width="1.8" stroke-linecap="round"/>',
  fey: '<path d="M12 21c-4-4-7-8-7-12 0-3 2-5 5-5 2 0 3 1 4 3 1-2 2-3 4-3 1 6-1 11-6 17z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 21c0-6 2-10 6-14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  guild: '<path d="M5 5h14v14H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
}

const SUPERNATURAL_GIFT_GROUP_DATA_5E = [
  {
    id: 'blessings',
    title: 'Благословения',
    icon: 'blessing',
    kind: 'благословение',
    items: [
      ['blessing-of-valhalla', 'Благословение Валгаллы', 'Blessing of Valhalla', 'DMG'],
      ['blessing-of-the-frostmaiden', 'Благословение Морозной Девы', 'Blessing of the Frostmaiden', 'IDRotF'],
      ['blessing-of-the-morninglord', 'Благословение Утреннего Лорда', 'Blessing of the Morninglord', 'IDRotF'],
      ['blessing-of-wound-closure', 'Благословение затягивающихся ран', 'Blessing of Wound Closure', 'DMG'],
      ['blessing-of-protection', 'Благословение защиты', 'Blessing of Protection', 'DMG'],
      ['blessing-of-health', 'Благословение здоровья', 'Blessing of Health', 'DMG'],
      ['blessing-of-understanding', 'Благословение понимания', 'Blessing of Understanding', 'DMG'],
      ['blessing-of-magic-resistance', 'Благословение сопротивления магии', 'Blessing of Magic Resistance', 'DMG'],
      ['blessing-of-weapon-enhancement', 'Благословение улучшения оружия', 'Blessing of Weapon Enhancement', 'DMG'],
      ['the-blessed-of-corellon', 'Благословлённые Кореллоном', 'The Blessed of Corellon', 'MTF']
    ]
  },
  {
    id: 'chwinga-charms',
    title: 'Волшебный дар чвинги',
    icon: 'charm',
    kind: 'чары',
    items: [
      ['charm-of-snowball-strike', 'Чары атаки снежками', 'Charm of Snowball Strike', 'IDRotF'],
      ['charm-of-the-water-bearer', 'Чары водолея', 'Charm of the Water Bearer', 'CM'],
      ['charm-of-air-bubbles', 'Чары воздушных пузырей', 'Charm of Air Bubbles', 'BAM'],
      ['charm-of-the-ice-troll', 'Чары ледяного тролля', 'Charm of the Ice Troll', 'IDRotF'],
      ['charm-of-instant-tools', 'Чары мгновенных инструментов', 'Charm of Instant Tools', 'BAM'],
      ['charm-of-the-mirage', 'Чары миража', 'Charm of the Mirage', 'CM'],
      ['charm-of-the-travelers-haven', 'Чары приюта странника', 'Charm of the Travelers Haven', 'IDRotF'],
      ['charm-of-the-snow-walker', 'Чары снегохода', 'Charm of the Snow Walker', 'IDRotF'],
      ['charm-of-cold-resistance', 'Чары сопротивления холоду', 'Charm of Cold Resistance', 'IDRotF'],
      ['charm-of-biting-cold', 'Чары сурового мороза', 'Charm of Biting Cold', 'IDRotF'],
      ['charm-of-bounty', 'Чары щедрости', 'Charm of Bounty', 'IDRotF']
    ]
  },
  {
    id: 'draconic-gifts',
    title: 'Драконий дар',
    icon: 'dragon',
    kind: 'драконий дар',
    items: [
      ['draconic-familiar', 'Драконий фамильяр', 'Draconic Familiar', 'FTD'],
      ['tongue-of-the-dragon', 'Драконий язык', 'Tongue of the Dragon', 'FTD'],
      ['echo-of-dragonsight', 'Отражение мудрости дракона', 'Echo of Dragonsight', 'FTD'],
      ['draconic-rebirth', 'Перерождение дракона', 'Draconic Rebirth', 'FTD'],
      ['psionic-reach', 'Псионическая досягаемость', 'Psionic Reach', 'FTD'],
      ['frightful-presence', 'Ужасающее присутствие', 'Frightful Presence', 'FTD'],
      ['scaled-toughness', 'Усиленная стойкость', 'Scaled Toughness', 'FTD'],
      ['draconic-senses', 'Чувства дракона', 'Draconic Senses', 'FTD']
    ]
  },
  {
    id: 'theros-gifts',
    title: 'Сверхестественные дары Тероса',
    icon: 'theros',
    kind: 'дар Тероса',
    items: [
      ['divine-path', 'Божественный путь', 'Divine Path', 'ODL'],
      ['heroic-destiny', 'Героическая судьба', 'Heroic Destiny', 'MOT'],
      ['iconoclast', 'Иконоборец', 'Iconoclast', 'MOT'],
      ['anvilwrought', 'Кованый', 'Anvilwrought', 'MOT'],
      ['pious', 'Набожный', 'Pious', 'MOT'],
      ['inscrutable', 'Непостижимый', 'Inscrutable', 'MOT'],
      ['unscarred', 'Неранимый', 'Unscarred', 'MOT'],
      ['oracle', 'Оракул', 'Oracle', 'MOT'],
      ['lifelong-companion', 'Пожизненный спутник', 'Lifelong Companion', 'MOT'],
      ['nyxborn', 'Порождение Никса', 'Nyxborn', 'MOT']
    ]
  },
  {
    id: 'dark-gifts',
    title: 'Тёмные дары',
    icon: 'dark',
    kind: 'тёмный дар',
    items: [
      ['second-skin', 'Вторая кожа', 'Second Skin', 'VRGR'],
      ['living-shadow', 'Живая тень', 'Living Shadow', 'VRGR'],
      ['watchers', 'Наблюдатели', 'Watchers', 'VRGR'],
      ['gathered-whispers', 'Объединённые шёпоты', 'Gathered Whispers', 'VRGR'],
      ['echoing-soul', 'Отголосок души', 'Echoing Soul', 'VRGR'],
      ['touch-of-death', 'Прикосновение смерти', 'Touch of Death', 'VRGR'],
      ['symbiotic-being', 'Симбионт', 'Symbiotic Being', 'VRGR'],
      ['mist-walker', 'Туманный ходок', 'Mist Walker', 'VRGR']
    ]
  },
  {
    id: 'curse-of-strahd-dark-gifts',
    title: 'Тёмные дары Проклятия Страда',
    icon: 'cos',
    kind: 'тёмный дар',
    items: [
      ['vaund-the-evasive', 'Дар Вунда неуловимого', 'Vaund the Evasive', 'COS'],
      ['dahlver-nar-he-of-the-many-teeth', 'Дар Далвер-Нара многозубого', 'Dahlver-Nar He of the Many Teeth', 'COS'],
      ['delban-the-star-of-ice-and-hate', 'Дар Делбана, звезды льда и ненависти', 'Delban the Star of Ice and Hate', 'COS'],
      ['drizlash-the-nine-eyed-spider', 'Дар Дризлаша, девятиглазого паука', 'Drizlash the Nine-Eyed Spider', 'COS'],
      ['zhudun-the-corpse-star', 'Дар Жудуна, трупной звезды', 'Zhudun the Corpse Star', 'COS'],
      ['zantras-the-kingmaker', 'Дар Зантраса царетворца', 'Zantras the Kingmaker', 'COS'],
      ['zrin-hala-the-howling-storm', 'Дар Зрин-халы, воющего шторма', 'Zrin-Hala the Howling Storm', 'COS'],
      ['yrrga-the-eye-of-shadows', 'Дар Йирги, глаза теней', 'Yrrga the Eye of Shadows', 'COS'],
      ['yog-the-invincible', 'Дар Йога непобедимого', 'Yog the Invincible', 'COS'],
      ['norganas-the-finger-of-oblivion', 'Дар Норганаса, перста забвения', 'Norganas the Finger of Oblivion', 'COS'],
      ['savnok-the-inscrutible', 'Дар Савнока непостижимого', 'Savnok the Inscrutible', 'COS'],
      ['seriach-the-hell-hound-whisperer', 'Дар Сериаха, шепчущей адской гончей', 'Seriach the Hell Hound Whisperer', 'COS'],
      ['sykane-the-soul-hungerer', 'Дар Сикейна, голода душ', 'Sykane the Soul Hungerer', 'COS'],
      ['tarakamedes-the-grave-wyrm', 'Дар Таракамедеса, могильного вирма', 'Tarakamedes the Grave Wyrm', 'COS'],
      ['tenebrous', 'Дар Тенебруса', 'Tenebrous', 'COS'],
      ['fekre-queen-of-poxes', 'Дар Фекры, королевы оспы', 'Fekre Queen of Poxes', 'COS'],
      ['khirad-the-star-of-secrets', 'Дар Хирада, звезды секретов', 'Khirad the Star of Secrets', 'COS'],
      ['shami-amourae-the-lady-of-delights', 'Дар Шами Амураэ, леди утех', 'Shami Amourae the Lady of Delights', 'COS'],
      ['vampyr', 'Дар вампира', 'Vampyr', 'COS'],
      ['dark-gift-of-great-taar-haak-the-five-headed-destroyer', 'Дар великого Таара Хаака, пятиглавого разрушителя', 'Dark Gift of Great Taar Haak, the Five-Headed Destroyer', 'COS']
    ]
  },
  {
    id: 'fey-gifts',
    title: 'Фейский дар',
    icon: 'fey',
    kind: 'фейский дар',
    items: [
      ['gifts-of-the-archfee', 'Дары архифей', 'Gifts of the Archfee', 'DoD'],
      ['cored', 'Полый', 'Cored', 'EGtW']
    ]
  },
  {
    id: 'charms',
    title: 'Чары',
    icon: 'charm',
    kind: 'чары',
    items: [
      ['eyes-of-the-impossible', 'Глаза невозможного', 'Eyes of the Impossible', 'ToFW'],
      ['charm-of-restoration', 'Чары восстановления', 'Charm of Restoration', 'DMG'],
      ['charm-of-heroism', 'Чары героизма', 'Charm of Heroism', 'DMG'],
      ['charm-of-vitality', 'Чары живучести', 'Charm of Vitality', 'DMG'],
      ['charm-of-the-creeping-hand', 'Чары жуткой Руки', 'Charm of the Creeping Hand', 'VNotEE'],
      ['charm-of-the-eldritch-eye', 'Чары мистического Глаза', 'Charm of the Eldritch Eye', 'VNotEE'],
      ['charm-of-feather-falling', 'Чары падения пёрышком', 'Charm of Feather Falling', 'DMG'],
      ['charm-of-animal-conjuring', 'Чары призыва животных', 'Charm of Animal Conjuring', 'DMG'],
      ['charm-of-darkvision', 'Чары тёмного зрения', 'Charm of Darkvision', 'DMG'],
      ['charm-of-the-slayer', 'Чары убийцы', 'Charm of the Slayer', 'DMG']
    ]
  },
  {
    id: 'ravnica-guild-charms',
    title: 'Чары Гильдий Равники',
    icon: 'guild',
    kind: 'чары гильдии',
    items: [
      ['azorius-charm', 'Чары Азориус', 'Azorius Charm', 'GGR'],
      ['boros-charm', 'Чары Борос', 'Boros Charm', 'GGR'],
      ['golgari-charm', 'Чары Голгари', 'Golgari Charm', 'GGR'],
      ['gruul-charm', 'Чары Груул', 'Gruul Charm', 'GGR'],
      ['dimir-charm', 'Чары Димир', 'Dimir Charm', 'GGR'],
      ['izzet-charm', 'Чары Иззет', 'Izzet Charm', 'GGR'],
      ['orzhov-charm', 'Чары Орзов', 'Orzhov Charm', 'GGR'],
      ['rakdos-charm', 'Чары Ракдос', 'Rakdos Charm', 'GGR'],
      ['selesnya-charm', 'Чары Селезнии', 'Selesnya Charm', 'GGR'],
      ['simic-charm', 'Чары Симик', 'Simic Charm', 'GGR']
    ]
  }
]

function sourceName(source) {
  return SUPERNATURAL_GIFT_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(slug) {
  return `https://5e14.ttg.club/screens/${slug.replaceAll('-', '_')}`
}

function groupSummary(group, title) {
  const lowerKind = group.kind

  if (group.id === 'blessings') return `${title} - ${lowerKind}, которое обычно даруется божеством, святыней, могущественным существом или важным сюжетным событием.`
  if (group.id === 'chwinga-charms') return `${title} - временные чары или малый волшебный дар, связанный с духами чвинга, природой и чудесной помощью в пути.`
  if (group.id === 'draconic-gifts') return `${title} - драконий дар, меняющий персонажа через силу, наследие, чувства или магию драконов.`
  if (group.id === 'theros-gifts') return `${title} - сверхъестественный дар, отражающий мифологическую судьбу, связь с богами, Никсом или героической ролью персонажа.`
  if (group.id === 'dark-gifts') return `${title} - тёмный дар, который даёт силу, но несёт странную цену, след проклятия или тревожное влияние.`
  if (group.id === 'curse-of-strahd-dark-gifts') return `${title} - тёмный дар из мрачных сил Баровии, который может соблазнить персонажа ценой опасного последствия.`
  if (group.id === 'fey-gifts') return `${title} - фейский или необычный дар, связывающий персонажа с иным происхождением, архифеями или странной природой мира.`
  if (group.id === 'ravnica-guild-charms') return `${title} - чары гильдии Равники, отражающие магический стиль, ценности и методы конкретной гильдии.`
  return `${title} - сверхъестественные чары, которые дают ограниченный магический эффект, особую защиту или одноразовую возможность.`
}

function buildBlocks(rule, group) {
  return [
    {
      title: 'Суть дара',
      paragraphs: [
        rule.summary,
        'Такой дар лучше выдавать как значимое последствие истории: награду за подвиг, след сделки, контакт с древней силой, благословение, проклятие или знак избранности.'
      ]
    },
    {
      title: 'Использование в кампании',
      paragraphs: [
        'Перед выдачей дара уточните длительность, число использований, способ восстановления и цену. Если дар сильнее обычной награды, он должен занимать заметное место в истории персонажа.',
        'Для баланса удобно сравнивать дар с магическим предметом, чертой, классовым умением или разовой наградой аналогичной силы.'
      ]
    },
    {
      title: 'Роль Мастера',
      paragraphs: [
        group.id.includes('dark') || group.id.includes('strahd')
          ? 'Тёмный дар должен ощущаться соблазнительно, но тревожно. Его цена может проявляться в поведении, внешности, связях, видениях или новых сюжетных угрозах.'
          : 'Дар должен поддерживать тон кампании и не заменять развитие класса. Используйте его как способ подчеркнуть событие, место, покровителя или выбор персонажа.'
      ]
    }
  ]
}

function makeRule(entry, group) {
  const [slug, title, titleEn, source] = entry
  const summary = groupSummary(group, title)

  return {
    slug,
    title,
    titleEn,
    icon: group.icon,
    source,
    sourceName: sourceName(source),
    sourceUrl: sourceUrl(slug),
    group: group.id,
    groupTitle: group.title,
    summary,
    quick: [
      { label: 'Раздел', value: group.title },
      { label: 'Источник', value: source },
      { label: 'Тип', value: group.kind }
    ],
    terms: [group.kind, group.title, 'дар', 'магия', 'награда'],
    blocks: buildBlocks({ summary }, group)
  }
}

export const SUPERNATURAL_GIFT_RULE_GROUPS_5E = SUPERNATURAL_GIFT_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const SUPERNATURAL_GIFT_RULES_5E = SUPERNATURAL_GIFT_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const SUPERNATURAL_GIFT_RULE_BY_SLUG_5E = Object.fromEntries(SUPERNATURAL_GIFT_RULES_5E.map(rule => [rule.slug, rule]))

export const SUPERNATURAL_GIFT_GROUPS_WITH_RULES_5E = SUPERNATURAL_GIFT_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => SUPERNATURAL_GIFT_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function supernaturalGiftRulePath(slug) {
  return `/dnd5e/screens/supernatural_gifts/${slug}`
}
