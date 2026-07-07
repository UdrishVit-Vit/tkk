export const EQUIPMENT_SCREEN_5E = {
  slug: 'equipment',
  title: 'Снаряжение',
  titleEn: 'Equipment',
  source: 'PHB / DMG / XGE',
  sourceName: 'D&D 5e 2014 и дополнительные источники',
  sourceUrl: 'https://5e14.ttg.club/screens/equipment',
  intro: 'Снаряжение описывает предметы, которыми персонажи пользуются в приключениях: оружие, доспехи, инструменты, наборы, фокусировки, яды, осадные машины и правила прочности объектов.'
}

export const EQUIPMENT_SOURCE_NAMES_5E = {
  PHB: "Player's Handbook 2014",
  DMG: "Dungeon Master's Guide 2014",
  XGE: "Xanathar's Guide to Everything",
  AI: 'Acquisitions Incorporated',
  WBtW: 'The Wild Beyond the Witchlight',
  SCC: 'Strixhaven: A Curriculum of Chaos',
  ERLW: 'Eberron: Rising from the Last War',
  IDRotF: 'Icewind Dale: Rime of the Frostmaiden',
  SatO: 'Sigil and the Outlands',
  EET: 'Elemental Evil Trinkets',
  COS: 'Curse of Strahd',
  TLtRW: 'Thayan Trinket source',
  VRGR: "Van Richten's Guide to Ravenloft",
  MTF: "Mordenkainen's Tome of Foes",
  EEW: 'Expanded Equipment Weapons',
  ToH: 'Tome of Heroes'
}

export const EQUIPMENT_ICON_SVG_5E = {
  default: '<path d="M5 7h14v12H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 7V5h8v2M8 11h8M8 15h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  armor: '<path d="M12 3l7 3v6c0 5-3 8-7 10-4-2-7-5-7-10V6z" fill="currentColor"/><path d="M12 6v12M8 9h8" stroke="#101820" stroke-width="1.7" stroke-linecap="round"/>',
  weapon: '<path d="M4 20L20 4M14 4h6v6M7 17l-3 3M9 15l-2 2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  trinket: '<path d="M12 3l3 6 6 1-4.5 4.3 1 6.2L12 17l-5.5 3.5 1-6.2L3 10l6-1z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/>',
  poison: '<path d="M9 3h6M10 3v5l-4 7a4 4 0 0 0 3.5 6h5a4 4 0 0 0 3.5-6l-4-7V3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M9 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  artisan: '<path d="M6 18l8-8M13 5l6 6-4 4-6-6z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M4 20l4-1-3-3z" fill="currentColor"/>',
  pack: '<path d="M7 8h10l2 12H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 8a3 3 0 0 1 6 0M8 13h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  tool: '<path d="M14 4l6 6-4 4-6-6zM4 20l8-8M7 17l-3 3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  siege: '<path d="M4 17h16M7 17l2-7h6l2 7M9 10l6-4M15 6l4 3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="8" cy="19" r="2" fill="currentColor"/><circle cx="16" cy="19" r="2" fill="currentColor"/>',
  property: '<path d="M5 5h14v14H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  focus: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 4v16M4 12h16M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  object: '<path d="M4 8l8-5 8 5v8l-8 5-8-5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M4 8l8 5 8-5M12 13v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
}

const EQUIPMENT_GROUP_DATA_5E = [
  {
    id: 'core',
    title: '',
    items: [
      ['armors', 'Доспехи', 'Armors', 'PHB', 'armor', 'Правила доспехов описывают категории брони, Класс Доспеха, требования к Силе, вес, скрытность и владение.'],
      ['weapons', 'Оружие', 'Weapons', 'PHB', 'weapon', 'Правила оружия объясняют категории оружия, урон, свойства, дистанции, боеприпасы и владение.'],
      ['silvering-weapons', 'Серебрение оружия', 'Silvering Weapons', 'PHB', 'weapon', 'Серебрение оружия позволяет подготовить клиноки и боеприпасы против существ, уязвимых к посеребрённому оружию.'],
      ['improvised-weapons', 'Импровизированное оружие', 'Improvised Weapons', 'PHB', 'weapon', 'Импровизированное оружие помогает использовать подручные предметы в бою, когда подходящего оружия под рукой нет.']
    ]
  },
  {
    id: 'trinkets',
    title: 'Безделушки',
    items: [
      ['trinkets', 'Безделушки', 'Trinkets', 'PHB', 'trinket', 'Безделушки добавляют персонажу небольшую странную деталь, сувенир или зацепку для истории.'],
      ['acquisitions-incorporated-trinket', 'Безделушки Корпорации приобретений', 'Acquisitions Incorporated Trinket', 'AI', 'trinket', 'Корпоративные безделушки подходят персонажам, связанным с авантюрным бизнесом, контрактами и странными трофеями.'],
      ['feywild-trinket', 'Безделушки Страны Фей', 'Feywild Trinket', 'WBtW', 'trinket', 'Фейские безделушки несут причудливый, сказочный или тревожно-игривый след Страны Фей.'],
      ['strixhaven-trinkets', 'Безделушки Стриксхейвена', 'Strixhaven Trinkets', 'SCC', 'trinket', 'Безделушки Стриксхейвена подчёркивают академическую магию, кампусную жизнь и странные учебные находки.'],
      ['eberron-trinket', 'Безделушки Эберрона', 'Eberron Trinket', 'ERLW', 'trinket', 'Безделушки Эберрона отражают магитехнику, драконьи метки, интриги домов и послевоенный мир.'],
      ['icewind-dale-trinkets', 'Безделушки долины Ледяного Ветра', 'Icewind Dale Trinkets', 'IDRotF', 'trinket', 'Эти безделушки подходят для сурового севера, холода, изоляции и следов древних тайн.'],
      ['planar-philosopher-trinket', 'Безделушки планарного философа', 'Planar Philosopher Trinket', 'SatO', 'trinket', 'Планарные безделушки связаны с мировоззрением, космологией и странными идеями внешних планов.'],
      ['gate-warden-trinket', 'Безделушки стража врат', 'Gate Warden Trinket', 'SatO', 'trinket', 'Безделушки стража врат подходят персонажам, связанным с порталами, переходами и границами миров.'],
      ['elemental-evil-trinket', 'Безделушки элементального зла', 'Elemental Evil Trinket', 'EET', 'trinket', 'Элементальные безделушки несут след стихий, культов, древних катастроф и странной природной силы.'],
      ['gothic-trinkets', 'Готические безделушки', 'Gothic Trinkets', 'COS', 'trinket', 'Готические безделушки подходят мрачным историям, проклятым землям, фамильным тайнам и предчувствию беды.'],
      ['thayan-trinket', 'Тэйские безделушки', 'Thayan Trinket', 'TLtRW', 'trinket', 'Тэйские безделушки несут оттенок красных магов, некромантии, рабских рынков и опасной политики.'],
      ['horror-trinket', 'Ужасные безделушки', 'Horror Trinket', 'VRGR', 'trinket', 'Ужасные безделушки помогают задать тревожный тон, личную травму или жуткую связь с доменами страха.'],
      ['elven-trinket', 'Эльфийские безделушки', 'Elven Trinket', 'MTF', 'trinket', 'Эльфийские безделушки подчёркивают древность, красоту, память и связь с народами эльфов.']
    ]
  },
  {
    id: 'poison-types',
    title: 'Виды ядов',
    items: [
      ['inhaled', 'Вдыхаемый', 'Inhaled', 'DMG', 'poison', 'Вдыхаемый яд действует через воздух и обычно опасен в облаке, дыме, порошке или газе.'],
      ['contact', 'Контактный', 'Contact', 'DMG', 'poison', 'Контактный яд действует через прикосновение к коже или предмету, на который он нанесён.'],
      ['injury', 'Оружейный', 'Injury', 'DMG', 'poison', 'Оружейный яд попадает в тело через ранение, обычно после попадания оружием или боеприпасом.'],
      ['ingested', 'Поглощаемый', 'Ingested', 'DMG', 'poison', 'Поглощаемый яд действует после еды, питья или другого попадания вещества внутрь организма.']
    ]
  },
  {
    id: 'artisan-tools',
    title: 'Инструменты ремесленников',
    items: [
      ['alchemist-s-supplies', 'Инструменты алхимика', "Alchemist's supplies", 'XGE', 'artisan', 'Инструменты алхимика помогают создавать и распознавать вещества, кислоты, реагенты и алхимические смеси.'],
      ['potter-tools', 'Инструменты гончара', 'Potter tools', 'XGE', 'artisan', 'Инструменты гончара используются для работы с глиной, посудой, керамикой и следами обжига.'],
      ['calligrapher-s-supplies', 'Инструменты каллиграфа', "Calligrapher's Supplies", 'XGE', 'artisan', 'Инструменты каллиграфа помогают писать, оформлять документы, распознавать почерк и качество чернил.'],
      ['mason-s-tools', 'Инструменты каменщика', "Mason's Tools", 'XGE', 'artisan', 'Инструменты каменщика подходят для оценки каменной кладки, поиска слабых мест и работы с камнем.'],
      ['cartographer-tools', 'Инструменты картографа', 'Cartographer tools', 'XGE', 'artisan', 'Инструменты картографа помогают составлять карты, читать маршруты и замечать ошибки в планах местности.'],
      ['leatherworker-tools', 'Инструменты кожевника', 'Leatherworker tools', 'XGE', 'artisan', 'Инструменты кожевника используются для кожи, ремней, ножен, седел, сумок и ремонта кожаных вещей.'],
      ['smith-s-tools', 'Инструменты кузнеца', "Smith's tools", 'XGE', 'artisan', 'Инструменты кузнеца нужны для ковки, ремонта металла, оценки оружия, доспехов и металлических деталей.'],
      ['brewer-tools', 'Инструменты пивовара', 'Brewer tools', 'XGE', 'artisan', 'Инструменты пивовара помогают готовить напитки, распознавать качество воды и работать с брожением.'],
      ['carpenter-tools', 'Инструменты плотника', 'Carpenter tools', 'XGE', 'artisan', 'Инструменты плотника помогают строить, ремонтировать деревянные конструкции и оценивать прочность древесины.'],
      ['cook-s-utensils', 'Инструменты повара', "Cook's Utensils", 'XGE', 'artisan', 'Инструменты повара помогают готовить пищу, поддерживать отряд в пути и распознавать качество продуктов.'],
      ['wood-carver-tools', 'Инструменты резчика по дереву', 'Wood carver tools', 'XGE', 'artisan', 'Инструменты резчика по дереву используются для мелкой резьбы, стрел, украшений и точной работы с деревом.'],
      ['artisan-s-tools', 'Инструменты ремесленников', "Artisan's Tools", 'PHB', 'artisan', 'Общая категория ремесленных инструментов объединяет наборы для профессионального ремесла и создания предметов.'],
      ['tinker-s-tools', 'Инструменты ремонтника', "Tinker's tools", 'XGE', 'artisan', 'Инструменты ремонтника помогают чинить мелкие механизмы, утварь и простые технические устройства.'],
      ['cobbler-s-tools', 'Инструменты сапожника', "Cobbler's Tools", 'XGE', 'artisan', 'Инструменты сапожника используются для обуви, дорожного ремонта и оценки следов по состоянию подошв.'],
      ['glass-blower-tools', 'Инструменты стеклодува', 'Glass blower tools', 'XGE', 'artisan', 'Инструменты стеклодува подходят для стекла, сосудов, линз и распознавания качества стеклянных изделий.'],
      ['weaver-tools', 'Инструменты ткача', 'Weaver tools', 'XGE', 'artisan', 'Инструменты ткача помогают работать с тканью, одеждой, полотнами, верёвками и следами текстиля.'],
      ['painter-s-supplies', 'Инструменты художника', "Painter's supplies", 'XGE', 'artisan', 'Инструменты художника помогают создавать изображения, распознавать стиль, пигменты и подделки.'],
      ['jeweler-tools', 'Инструменты ювелира', 'Jeweler tools', 'XGE', 'artisan', 'Инструменты ювелира используются для драгоценных камней, украшений, огранки и оценки тонкой работы.']
    ]
  },
  {
    id: 'packs',
    title: 'Наборы снаряжения',
    items: [
      ['entertainer-s-pack', 'Набор артиста', "Entertainer's Pack", 'PHB', 'pack', 'Набор артиста содержит вещи для выступлений, дороги и поддержания сценического образа.'],
      ['burglar-s-pack', 'Набор взломщика', "Burglar's Pack", 'PHB', 'pack', 'Набор взломщика помогает действовать скрытно, проникать в места и работать с препятствиями.'],
      ['diplomat-s-pack', 'Набор дипломата', "Diplomat's Pack", 'PHB', 'pack', 'Набор дипломата содержит вещи для переговоров, переписки, этикета и представительного вида.'],
      ['dungeoneer-s-pack', 'Набор исследователя подземелий', "Dungeoneer's Pack", 'PHB', 'pack', 'Набор исследователя подземелий рассчитан на темноту, ловушки, препятствия и опасные руины.'],
      ['explorer-s-pack', 'Набор путешественника', "Explorer's Pack", 'PHB', 'pack', 'Набор путешественника покрывает базовые нужды дороги, лагеря и длительного перехода.'],
      ['priest-s-pack', 'Набор священника', "Priest's Pack", 'PHB', 'pack', 'Набор священника содержит предметы для служения, молитв, пожертвований и религиозных обязанностей.'],
      ['scholar-s-pack', 'Набор учёного', "Scholar's Pack", 'XGE', 'pack', 'Набор учёного помогает вести записи, исследования, переписку и работу с текстами.']
    ]
  },
  {
    id: 'starting-equipment',
    title: 'Начальное снаряжение',
    items: [
      ['starting-equipment', 'Начальное снаряжение', 'Starting Equipment', 'DMG', 'pack', 'Начальное снаряжение определяет, с какими предметами персонаж начинает игру, и может заменяться покупкой за стартовые средства.']
    ]
  },
  {
    id: 'common-tools',
    title: 'Обычные инструменты',
    items: [
      ['thieves-tools', 'Воровские инструменты', 'Thieves tools', 'XGE', 'tool', 'Воровские инструменты используются для замков, ловушек, скрытого доступа и тонкой механической работы.'],
      ['gaming-set', 'Игровой набор', 'Gaming Set', 'XGE', 'tool', 'Игровой набор описывает владение конкретной игрой, азартными ситуациями и чтением поведения соперников.'],
      ['navigator-tools', 'Инструменты навигатора', 'Navigator Tools', 'XGE', 'tool', 'Инструменты навигатора помогают прокладывать курс, ориентироваться и вести путешествие по воде или звёздам.'],
      ['poisoner-s-kit', 'Инструменты отравителя', "Poisoner's Kit", 'XGE', 'tool', 'Инструменты отравителя используются для приготовления, распознавания и безопасного обращения с ядами.'],
      ['musical-instruments', 'Музыкальные инструменты', 'Musical instruments', 'PHB', 'tool', 'Музыкальные инструменты дают возможность исполнять музыку, зарабатывать выступлениями и поддерживать образ персонажа.'],
      ['disguise-kit', 'Набор для грима', 'Disguise Kit', 'XGE', 'tool', 'Набор для грима помогает менять внешность, создавать маскировку и поддерживать ложную личность.'],
      ['forgery-kit', 'Набор для фальсификации', 'Forgery Kit', 'XGE', 'tool', 'Набор для фальсификации используется для подделки документов, печатей, подписей и распознавания подделок.'],
      ['herbalism-kit', 'Набор травника', 'Herbalism Kit', 'XGE', 'tool', 'Набор травника помогает собирать растения, готовить простые средства и работать с природными компонентами.']
    ]
  },
  {
    id: 'siege-equipment',
    title: 'Осадное снаряжение',
    items: [
      ['ballista', 'Баллиста', 'Ballista', 'DMG', 'siege', 'Баллиста - крупная осадная машина, стреляющая тяжёлыми болтами по существам, объектам и укреплениям.'],
      ['suspended-cauldron', 'Котёл, подвешенный', 'Suspended Cauldron', 'DMG', 'siege', 'Подвешенный котёл сбрасывает опасное содержимое на существ у ворот, стены или прохода.'],
      ['mangonel', 'Мангонель', 'Mangonel', 'DMG', 'siege', 'Мангонель метает тяжёлые снаряды по площадям, стенам и крупным целям.'],
      ['siege-tower', 'Осадная башня', 'Siege Tower', 'DMG', 'siege', 'Осадная башня помогает войскам приблизиться к стене и перейти на укрепление под защитой конструкции.'],
      ['cannon', 'Пушка', 'Cannon', 'DMG', 'siege', 'Пушка использует пороховой выстрел и наносит тяжёлый урон на расстоянии.'],
      ['ram', 'Таран', 'Ram', 'DMG', 'siege', 'Таран предназначен для разрушения ворот, дверей и иных прочных преград.'],
      ['trebuchet', 'Требушет', 'Trebuchet', 'DMG', 'siege', 'Требушет метает массивные снаряды на большую дистанцию и особенно полезен против укреплений.']
    ]
  },
  {
    id: 'weapon-properties',
    title: 'Свойства оружия',
    items: [
      ['reload', 'Боекомплект', 'Reload', 'DMG', 'property', 'Боекомплект ограничивает число выстрелов до перезарядки оружия.'],
      ['ammunition', 'Боеприпас', 'Ammunition', 'PHB', 'property', 'Свойство боеприпас означает, что оружие использует стрелы, болты, пули или другие расходуемые снаряды.'],
      ['ammunition-firearm', 'Боеприпас огнестрельный', 'Ammunition Firearm', 'DMG', 'property', 'Огнестрельные боеприпасы используются с оружием, работающим по правилам огнестрела.'],
      ['returning', 'Возвращающееся', 'Returning', 'EEW', 'property', 'Возвращающееся оружие возвращается к владельцу после метания или иного использования по правилу свойства.'],
      ['dual-weapons', 'Двойное оружие', 'Dual Weapons', 'EEW', 'property', 'Двойное оружие объединяет две ударные части и использует отдельные правила обращения.'],
      ['two-handed', 'Двуручное', 'Two-handed', 'PHB', 'property', 'Двуручное оружие требует двух рук, когда вы совершаете им атаку.'],
      ['ranged', 'Дистанционное', 'Ranged', 'PHB', 'property', 'Дистанционное оружие атакует цель на расстоянии и использует обычную и максимальную дистанцию.'],
      ['reach', 'Досягаемость', 'Reach', 'PHB', 'property', 'Досягаемость увеличивает расстояние, на котором оружием можно атаковать в ближнем бою.'],
      ['light', 'Лёгкое', 'Light', 'PHB', 'property', 'Лёгкое оружие удобно для боя двумя оружиями и быстрых атак.'],
      ['magazine', 'Магазин', 'Magazine', 'ToH', 'property', 'Магазин хранит несколько боеприпасов и влияет на перезарядку оружия.'],
      ['thrown', 'Метательное', 'Thrown', 'PHB', 'property', 'Метательное оружие можно использовать для дальнобойной атаки, бросая его в цель.'],
      ['special', 'Особое', 'Special', 'PHB', 'property', 'Особое оружие имеет дополнительные правила, указанные в его описании.'],
      ['burst-fire', 'Очередь', 'Burst Fire', 'DMG', 'property', 'Очередь позволяет некоторому оружию атаковать область или расходовать больше боеприпасов за один выстрел.'],
      ['loading', 'Перезарядка', 'Loading', 'PHB', 'property', 'Перезарядка ограничивает число атак этим оружием из-за времени, нужного на подготовку нового выстрела.'],
      ['gunpowder', 'Пороховое', 'Gunpowder', 'ToH', 'property', 'Пороховое оружие зависит от пороха, выстрела и правил обращения с огнестрельной технологией.'],
      ['hidden', 'Скрытое', 'Hidden', 'EEW', 'property', 'Скрытое оружие легче прятать или носить незаметно по правилу свойства.'],
      ['heavy', 'Тяжёлое', 'Heavy', 'PHB', 'property', 'Тяжёлое оружие неудобно для маленьких существ и может давать им помеху на атаки.'],
      ['versatile', 'Универсальное', 'Versatile', 'PHB', 'property', 'Универсальное оружие можно держать одной или двумя руками, меняя кость урона при хвате двумя руками.'],
      ['finesse', 'Фехтовальное', 'Finesse', 'PHB', 'property', 'Фехтовальное оружие позволяет выбирать Силу или Ловкость для бросков атаки и урона.'],
      ['exotic', 'Экзотическое', 'Exotic', 'EEW', 'property', 'Экзотическое оружие требует отдельного разрешения, владения или культурного контекста кампании.']
    ]
  },
  {
    id: 'focuses',
    title: 'Фокусировки',
    items: [
      ['arcane-focus', 'Магическая фокусировка', 'Arcane Focus', 'PHB', 'focus', 'Магическая фокусировка заменяет материальные компоненты заклинаний, если компонент не имеет указанной стоимости и не расходуется.'],
      ['holy-symbol', 'Священный символ', 'Holy Symbol', 'PHB', 'focus', 'Священный символ служит фокусировкой для божественной магии и связан с верой персонажа.'],
      ['druidic-focus', 'Фокусировка друидов', 'Druidic Focus', 'PHB', 'focus', 'Фокусировка друидов связана с природой и помогает накладывать заклинания друида.']
    ]
  },
  {
    id: 'object-statistics',
    title: 'Характеристики предмета',
    items: [
      ['object-armor-class', 'Класс доспеха предмета', 'Object Armor Class', 'DMG', 'object', 'Класс доспеха предмета показывает, насколько трудно повредить объект атакой.'],
      ['object-hit-point', 'Хиты предмета', 'Object Hit Point', 'DMG', 'object', 'Хиты предмета показывают, сколько повреждений объект выдерживает до разрушения.']
    ]
  }
]

function sourceName(source) {
  return EQUIPMENT_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(slug) {
  return `https://5e14.ttg.club/screens/${slug.replaceAll('-', '_')}`
}

function buildBlocks(rule) {
  if (rule.blocks) return rule.blocks

  return [
    {
      title: 'Назначение правила',
      paragraphs: [
        rule.summary,
        'Используйте это правило, когда предмет, набор или свойство влияет на проверку, атаку, стоимость, вес, владение или возможности персонажа в сцене.'
      ]
    },
    {
      title: 'За столом',
      paragraphs: [
        'Сначала уточните, есть ли у персонажа нужный предмет и владение им. Затем примените конкретные ограничения: требуемое действие, дистанцию, расход боеприпасов, условия использования или время работы.',
        'Если предмет используется творчески, Мастер может назначить проверку характеристики, преимущество, помеху, урон по объекту или другой уместный эффект.'
      ]
    }
  ]
}

function makeRule(entry, group) {
  const [slug, title, titleEn, source, icon, summary, extra = {}] = entry

  return {
    slug,
    title,
    titleEn,
    icon,
    source,
    sourceName: sourceName(source),
    sourceUrl: extra.sourceUrl || sourceUrl(extra.externalSlug || slug),
    group: group.id,
    groupTitle: group.title || 'Снаряжение',
    summary,
    quick: extra.quick || [
      { label: 'Раздел', value: group.title || 'Снаряжение' },
      { label: 'Источник', value: source },
      { label: 'Тип', value: title }
    ],
    terms: extra.terms || [group.title || 'снаряжение', title, source],
    blocks: buildBlocks({ summary, ...extra }),
    ...extra
  }
}

export const EQUIPMENT_RULE_GROUPS_5E = EQUIPMENT_GROUP_DATA_5E.map(group => ({
  id: group.id,
  title: group.title,
  items: group.items.map(item => item[0])
}))

export const EQUIPMENT_RULES_5E = EQUIPMENT_GROUP_DATA_5E.flatMap(group => group.items.map(item => makeRule(item, group)))

export const EQUIPMENT_RULE_BY_SLUG_5E = Object.fromEntries(EQUIPMENT_RULES_5E.map(rule => [rule.slug, rule]))

export const EQUIPMENT_GROUPS_WITH_RULES_5E = EQUIPMENT_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => EQUIPMENT_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function equipmentRulePath(slug) {
  return `/dnd5e/screens/equipment/${slug}`
}
