export const RULE_SCREEN_GROUPS_5E = [
  {
    id: 'turn',
    title: 'Ход и сцена',
    description: 'Базовые элементы хода, порядок действий и способы взаимодействия с окружением.',
    items: ['move', 'action', 'bonus_action', 'reaction', 'other_action']
  },
  {
    id: 'combat',
    title: 'Бой и опасности',
    description: 'Сражение, атаки, урон, здоровье, состояния, ловушки и среда.',
    items: ['combat', 'damage_and_attack', 'hits_death_rest', 'conditions_and_disease', 'environment', 'traps', 'chases']
  },
  {
    id: 'character',
    title: 'Персонаж',
    description: 'Происхождение, характеристики, навыки, классовые умения и развитие героя.',
    items: ['stats_and_skills', 'origins', 'active_class_features', 'multiclassing', 'experience', 'language']
  },
  {
    id: 'magic',
    title: 'Магия и предметы',
    description: 'Заклинания, снаряжение, магические предметы, артефакты и особые дары.',
    items: ['spells', 'equipment', 'magic_items', 'artifacts', 'supernatural_gifts', 'demonic_boons', 'epic_boons', 'magical_phenomena']
  },
  {
    id: 'master',
    title: 'Мастерская',
    description: 'Инструменты Мастера: приключения, простои, путешествия, планы и монстры.',
    items: ['downtime_activities', 'creating_adventures', 'journey', 'planar_travel', 'monster']
  }
]

export const RULE_SCREENS_5E = [
  {
    slug: 'move',
    title: 'Движение',
    titleEn: 'Move',
    path: '/dnd5e/screens/move',
    sourceUrl: 'https://5e14.ttg.club/screens/move',
    summary: 'Правила перемещения в сцене и бою: скорость, труднопроходимая местность, прыжки, лазание, плавание, полет, падение и темп путешествия.',
    terms: ['скорость', 'труднопроходимая местность', 'прыжок', 'падение']
  },
  {
    slug: 'action',
    title: 'Действие',
    titleEn: 'Action',
    path: '/dnd5e/screens/action',
    sourceUrl: 'https://5e14.ttg.club/screens/action',
    summary: 'Основное действие хода: атака, сотворение заклинания, рывок, отход, помощь, поиск, подготовка и другие стандартные варианты.',
    terms: ['действие', 'атака', 'рывок', 'отход', 'помощь', 'подготовка']
  },
  {
    slug: 'bonus_action',
    title: 'Бонусное действие',
    titleEn: 'Bonus Action',
    path: '/dnd5e/screens/bonus_action',
    sourceUrl: 'https://5e14.ttg.club/screens/bonus_action',
    summary: 'Дополнительное действие, которое доступно только если умение, заклинание или другое правило прямо разрешает его выполнить.',
    terms: ['бонусное действие', 'заклинание', 'умение']
  },
  {
    slug: 'reaction',
    title: 'Реакция',
    titleEn: 'Reaction',
    path: '/dnd5e/screens/reaction',
    sourceUrl: 'https://5e14.ttg.club/screens/reaction',
    summary: 'Ответ на особый триггер вне обычного порядка действий: атаки по возможности, подготовленные действия и отдельные классовые умения.',
    terms: ['реакция', 'триггер', 'атака по возможности']
  },
  {
    slug: 'combat',
    title: 'Сражение',
    titleEn: 'Combat',
    path: '/dnd5e/screens/combat',
    sourceUrl: 'https://5e14.ttg.club/screens/combat',
    summary: 'Порядок боя: инициатива, раунды, ходы, позиции, дистанции, видимость, укрытие и типовые решения в столкновении.',
    terms: ['инициатива', 'раунд', 'ход', 'укрытие', 'дистанция']
  },
  {
    slug: 'other_action',
    title: 'Прочая деятельность',
    titleEn: 'Other Action',
    path: '/dnd5e/screens/other_action',
    sourceUrl: 'https://5e14.ttg.club/screens/other_action',
    summary: 'Небоевые действия и взаимодействия с предметами, сценой, препятствиями и социальными ситуациями.',
    terms: ['взаимодействие', 'предмет', 'сцена']
  },
  {
    slug: 'environment',
    title: 'Окружающая среда',
    titleEn: 'Environment',
    path: '/dnd5e/screens/environment',
    sourceUrl: 'https://5e14.ttg.club/screens/environment',
    summary: 'Опасные условия мира: свет, видимость, падение, удушье, истощение, пища, вода, путешествие и природные угрозы.',
    terms: ['свет', 'видимость', 'истощение', 'удушье']
  },
  {
    slug: 'damage_and_attack',
    title: 'Урон и атака',
    titleEn: 'Damage and Attack',
    path: '/dnd5e/screens/damage_and_attack',
    sourceUrl: 'https://5e14.ttg.club/screens/damage_and_attack',
    summary: 'Броски атаки, класс доспеха, попадание, критический удар, типы урона, сопротивление, уязвимость и иммунитет.',
    terms: ['бросок атаки', 'класс доспеха', 'критический удар', 'сопротивление', 'иммунитет']
  },
  {
    slug: 'hits_death_rest',
    title: 'Хиты, Смерть и Отдых',
    titleEn: 'Hits Death Rest',
    path: '/dnd5e/screens/hits_death_rest',
    sourceUrl: 'https://5e14.ttg.club/screens/hits_death_rest',
    summary: 'Хиты, временные хиты, бессознательное состояние, спасброски от смерти, короткий отдых, продолжительный отдых и восстановление.',
    terms: ['хиты', 'временные хиты', 'спасбросок от смерти', 'короткий отдых', 'продолжительный отдых']
  },
  {
    slug: 'stats_and_skills',
    title: 'Характеристики и Навыки',
    titleEn: 'Stats and Skills',
    path: '/dnd5e/screens/stats_and_skills',
    sourceUrl: 'https://5e14.ttg.club/screens/stats_and_skills',
    summary: 'Шесть характеристик, модификаторы, проверки, навыки, владение, спасброски, преимущество и помеха.',
    terms: ['Сила', 'Ловкость', 'Телосложение', 'Интеллект', 'Мудрость', 'Харизма', 'навык', 'спасбросок']
  },
  {
    slug: 'origins',
    title: 'Происхождение',
    titleEn: 'Origins',
    path: '/dnd5e/screens/origins',
    sourceUrl: 'https://5e14.ttg.club/screens/origins',
    summary: 'Элементы создания персонажа: раса, предыстория, языки, владения, особенности и стартовые решения.',
    terms: ['раса', 'предыстория', 'язык', 'владение']
  },
  {
    slug: 'conditions_and_disease',
    title: 'Состояния и болезни',
    titleEn: 'Conditions and disease',
    path: '/dnd5e/screens/conditions_and_disease',
    sourceUrl: 'https://5e14.ttg.club/screens/conditions_and_disease',
    summary: 'Состояния, болезни и эффекты, которые меняют возможности существа: ослепление, очарование, испуг, паралич, отравление и другие.',
    terms: ['состояние', 'болезнь', 'ослепление', 'очарование', 'испуг', 'отравление']
  },
  {
    slug: 'active_class_features',
    title: 'Активные умения класса',
    titleEn: 'Active class features',
    path: '/dnd5e/screens/active_class_features',
    sourceUrl: 'https://5e14.ttg.club/screens/active_class_features',
    summary: 'Классовые умения, которые требуют действия, бонусного действия, реакции, ресурса, цели или особых условий применения.',
    terms: ['умение класса', 'ресурс', 'действие', 'реакция']
  },
  {
    slug: 'spells',
    title: 'Заклинания',
    titleEn: 'Spells',
    path: '/dnd5e/screens/spells',
    sourceUrl: 'https://5e14.ttg.club/screens/spells',
    summary: 'Правила магии: уровни заклинаний, ячейки, компоненты, концентрация, ритуалы, спасброски, атаки заклинаниями и школы.',
    terms: ['заклинание', 'ячейка заклинаний', 'концентрация', 'ритуал', 'компоненты']
  },
  {
    slug: 'multiclassing',
    title: 'Мультиклассирование',
    titleEn: 'Multiclassing',
    path: '/dnd5e/screens/multiclassing',
    sourceUrl: 'https://5e14.ttg.club/screens/multiclassing',
    summary: 'Получение уровней в нескольких классах: требования характеристик, владения, ячейки заклинаний и совместимость умений.',
    terms: ['мультиклассирование', 'уровень класса', 'владение']
  },
  {
    slug: 'equipment',
    title: 'Снаряжение',
    titleEn: 'Equipment',
    path: '/dnd5e/screens/equipment',
    sourceUrl: 'https://5e14.ttg.club/screens/equipment',
    summary: 'Правила предметов: оружие, доспехи, наборы, инструменты, стоимость, вес, грузоподъемность, услуги и торговля.',
    terms: ['оружие', 'доспех', 'инструмент', 'стоимость', 'вес']
  },
  {
    slug: 'downtime_activities',
    title: 'Деятельность в простое',
    titleEn: 'Downtime Activities',
    path: '/dnd5e/screens/downtime_activities',
    sourceUrl: 'https://5e14.ttg.club/screens/downtime_activities',
    summary: 'Занятия между приключениями: ремесло, обучение, исследования, торговля, восстановление, контакты и жизнь персонажа вне сцены.',
    terms: ['простой', 'обучение', 'ремесло', 'исследование']
  },
  {
    slug: 'creating_adventures',
    title: 'Создание приключений',
    titleEn: 'Creating Adventures',
    path: '/dnd5e/screens/creating_adventures',
    sourceUrl: 'https://5e14.ttg.club/screens/creating_adventures',
    summary: 'Инструменты подготовки приключений: цели, сцены, зацепки, награды, темп, столкновения и последствия выбора игроков.',
    terms: ['приключение', 'сцена', 'награда', 'столкновение']
  },
  {
    slug: 'traps',
    title: 'Ловушки',
    titleEn: 'Traps',
    path: '/dnd5e/screens/traps',
    sourceUrl: 'https://5e14.ttg.club/screens/traps',
    summary: 'Создание и использование ловушек: обнаружение, обезвреживание, сложность, урон, спасброски и последствия.',
    terms: ['ловушка', 'сложность', 'спасбросок', 'урон']
  },
  {
    slug: 'supernatural_gifts',
    title: 'Сверхъестественные дары',
    titleEn: 'Supernatural gifts',
    path: '/dnd5e/screens/supernatural_gifts',
    sourceUrl: 'https://5e14.ttg.club/screens/supernatural_gifts',
    summary: 'Особые благословения, метки судьбы и силы, которые могут стать частью персонажа вне обычной классовой прогрессии.',
    terms: ['дар', 'благословение', 'особенность']
  },
  {
    slug: 'demonic_boons',
    title: 'Демонические дары',
    titleEn: 'Demonic Boons',
    path: '/dnd5e/screens/demonic_boons',
    sourceUrl: 'https://5e14.ttg.club/screens/demonic_boons',
    summary: 'Темные дары и сверхъестественные преимущества, связанные с демоническим влиянием, ценой и последствиями.',
    terms: ['демонический дар', 'проклятие', 'искушение']
  },
  {
    slug: 'epic_boons',
    title: 'Эпические дары',
    titleEn: 'Epic Boons',
    path: '/dnd5e/screens/epic_boons',
    sourceUrl: 'https://5e14.ttg.club/screens/epic_boons',
    summary: 'Награды для героев высшего уровня: мощные постоянные преимущества, открывающие сверхгероические возможности.',
    terms: ['эпический дар', '20 уровень', 'награда']
  },
  {
    slug: 'artifacts',
    title: 'Артефакты',
    titleEn: 'Artifacts',
    path: '/dnd5e/screens/artifacts',
    sourceUrl: 'https://5e14.ttg.club/screens/artifacts',
    summary: 'Уникальные магические предметы с историей, особыми свойствами, целями, недостатками и сюжетной ценой.',
    terms: ['артефакт', 'магический предмет', 'свойство']
  },
  {
    slug: 'magic_items',
    title: 'Магические предметы',
    titleEn: 'Magic Items',
    path: '/dnd5e/screens/magic_items',
    sourceUrl: 'https://5e14.ttg.club/screens/magic_items',
    summary: 'Категории, редкость, настройка, заряды, проклятия и правила применения магических предметов.',
    terms: ['редкость', 'настройка', 'заряд', 'проклятие']
  },
  {
    slug: 'journey',
    title: 'Путешествие',
    titleEn: 'Journey',
    path: '/dnd5e/screens/journey',
    sourceUrl: 'https://5e14.ttg.club/screens/journey',
    summary: 'Долгие переходы, темп, навигация, дозор, случайные события, ресурсы, усталость и встречи в пути.',
    terms: ['путешествие', 'темп', 'навигация', 'дозор']
  },
  {
    slug: 'planar_travel',
    title: 'Путешествия по планам',
    titleEn: 'Planar Travel',
    path: '/dnd5e/screens/planar_travel',
    sourceUrl: 'https://5e14.ttg.club/screens/planar_travel',
    summary: 'Переходы между планами существования, особенности планов, порталы, магия перемещения и опасности иных миров.',
    terms: ['план', 'портал', 'телепортация']
  },
  {
    slug: 'chases',
    title: 'Погоня',
    titleEn: 'Chases',
    path: '/dnd5e/screens/chases',
    sourceUrl: 'https://5e14.ttg.club/screens/chases',
    summary: 'Правила преследования: дистанция, препятствия, рывки, осложнения, скрытие и завершение погони.',
    terms: ['погоня', 'рывок', 'дистанция', 'препятствие']
  },
  {
    slug: 'magical_phenomena',
    title: 'Магические проявления',
    titleEn: 'Magical Phenomena',
    path: '/dnd5e/screens/magical_phenomena',
    sourceUrl: 'https://5e14.ttg.club/screens/magical_phenomena',
    summary: 'Редкие магические эффекты мира: зоны нестабильной магии, странные проявления, аномалии и последствия вмешательства сил.',
    terms: ['магическое проявление', 'аномалия', 'дикая магия']
  },
  {
    slug: 'monster',
    title: 'Монстры',
    titleEn: 'Monster',
    path: '/dnd5e/screens/monster',
    sourceUrl: 'https://5e14.ttg.club/screens/monster',
    summary: 'Статблоки существ: размер, тип, класс доспеха, хиты, скорость, чувства, языки, опасность, действия и особенности.',
    terms: ['монстр', 'статблок', 'опасность', 'действие']
  },
  {
    slug: 'language',
    title: 'Языки',
    titleEn: 'Language',
    path: '/dnd5e/screens/language',
    sourceUrl: 'https://5e14.ttg.club/screens/language',
    summary: 'Языки мира, письменность, общение, культурные связи и способы понимать существ через происхождение или магию.',
    terms: ['язык', 'письменность', 'общение']
  },
  {
    slug: 'experience',
    title: 'Опыт',
    titleEn: 'Experience',
    path: '/dnd5e/screens/experience',
    sourceUrl: 'https://5e14.ttg.club/screens/experience',
    summary: 'Получение опыта, продвижение по уровням, награды за преодоление препятствий и варианты развития персонажей.',
    terms: ['опыт', 'уровень', 'награда']
  }
]

export const RULE_SCREEN_BY_SLUG_5E = Object.fromEntries(RULE_SCREENS_5E.map(screen => [screen.slug, screen]))
