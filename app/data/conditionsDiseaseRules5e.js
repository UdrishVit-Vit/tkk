export const CONDITIONS_DISEASE_SCREEN_5E = {
  slug: 'conditions_and_disease',
  title: 'Состояния и болезни',
  titleEn: 'Conditions and disease',
  source: 'PHB / DMG',
  sourceName: 'D&D 5e 2014 и дополнительные источники',
  sourceUrl: 'https://5e14.ttg.club/screens/conditions_and_disease',
  intro: 'Состояния различными способами изменяют возможности существа и могут являться следствием заклинания, классового умения, атаки чудовища или другого эффекта. Состояние длится до тех пор, пока не будет прервано или в течение времени, которое указано в эффекте, вызвавшем это состояние.'
}

export const CONDITIONS_DISEASE_SOURCE_NAMES_5E = {
  PHB: 'Player’s Handbook 2014',
  DMG: 'Dungeon Master’s Guide 2014',
  MM: 'Monster Manual 2014',
  TOA: 'Tomb of Annihilation',
  OotA: 'Out of the Abyss',
  VRGR: 'Van Richten’s Guide to Ravenloft',
  DoDk: 'Dungeons of Drakkenheim',
  GoS: 'Ghosts of Saltmarsh',
  GOS: 'Ghosts of Saltmarsh',
  IDRotF: 'Icewind Dale: Rime of the Frostmaiden',
  MHH: 'Mountain / harsh weather hazards',
  CM: 'Candlekeep Mysteries',
  TftYP: 'Tales from the Yawning Portal',
  EGtW: 'Explorer’s Guide to Wildemount',
  TaT: 'Third-party / table rule'
}

export const CONDITIONS_DISEASE_ICON_SVG_5E = {
  default: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  immunity: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" fill="currentColor"/><path d="M8 12h8M12 8v8" stroke="#0f1921" stroke-width="1.8" stroke-linecap="round"/>',
  disease: '<circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  curse: '<path d="M12 3l8 8-8 10-8-10z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 10l8 4M16 10l-8 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  state: '<path d="M5 5h14v14H5z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  unconscious: '<path d="M7 6c2-3 8-3 10 0 3 5 1 14-5 14S4 11 7 6z" fill="currentColor"/><path d="M9 12h6M9 15c2 1 4 1 6 0" stroke="#0f1921" stroke-width="1.5" stroke-linecap="round"/>',
  frightened: '<path d="M12 4c5 3 7 7 7 11a7 7 0 0 1-14 0c0-4 2-8 7-11z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 12h.01M15 12h.01M9 17c2-2 4-2 6 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  exhaustion: '<path d="M12 3v18M7 7h10M8 12h8M9 17h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.4" fill="none"/>',
  invisible: '<path d="M3 12c3-5 15-5 18 0-3 5-15 5-18 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M5 19L19 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  incapacitated: '<path d="M12 4v16M8 8h8M7 16h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="4" r="2" fill="currentColor"/>',
  deafened: '<path d="M7 10a5 5 0 0 1 10 0c0 5-4 5-4 9M9 10c1-2 5-2 6 0M5 5l14 14" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  petrified: '<path d="M7 20V8a5 5 0 0 1 10 0v12M5 20h14M9 10h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  restrained: '<path d="M5 8h14M5 16h14M8 5v14M16 5v14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  blinded: '<path d="M3 12c3-5 15-5 18 0-3 5-15 5-18 0z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M5 5l14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  poisoned: '<path d="M7 10a5 5 0 0 1 10 0v5H7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M6 19h12M8 15l-3 5M16 15l3 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/>',
  charmed: '<path d="M12 21c-5-3-8-6-8-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4-3 7-6 10z" fill="currentColor"/>',
  stunned: '<path d="M12 3l2 6h6l-5 4 2 7-5-4-5 4 2-7-5-4h6z" fill="currentColor"/>',
  paralyzed: '<path d="M8 4h8v16H8zM5 7h14M5 17h14" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  prone: '<path d="M4 18h16M7 14h10M8 10h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="6" cy="14" r="2" fill="currentColor"/>',
  grappled: '<path d="M8 8l-3 3a4 4 0 0 0 0 5.5 4 4 0 0 0 5.5 0l2-2M16 16l3-3a4 4 0 0 0 0-5.5 4 4 0 0 0-5.5 0l-2 2M9 15l6-6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
}

export const CONDITIONS_DISEASE_RULE_GROUPS_5E = [
  { id: 'core', title: '', items: ['condition-immunities'] },
  { id: 'diseases', title: 'Болезни', items: ['mindfire', 'sight-rot', 'flesh-rot', 'throat-leeches', 'grackle-lung', 'the-gnawing-plague', 'filth-fever', 'shivering-sickness', 'contamination', 'redface', 'blue-mist-fever', 'arcane-blight', 'frostbite-and-hypothermia', 'seizure', 'saprophytic-plague', 'blue-rot', 'slimy-doom', 'blinding-sickness', 'snow-blindness', 'sewer-plague', 'super-tetanus', 'frigid-woe', 'cackle-fever'] },
  { id: 'curses', title: 'Проклятия', items: ['vampirism', 'lycanthropes'] },
  { id: 'other', title: 'Прочие состояния', items: ['madness', 'surprise', 'intoxicated', 'concentrated', 'stabilized', 'dodging'] },
  { id: 'conditions', title: 'Состояния', items: ['unconscious', 'frightened', 'exhaustion', 'invisible', 'incapacitated', 'deafened', 'petrified', 'restrained', 'blinded', 'poisoned', 'charmed', 'stunned', 'paralyzed', 'condition-prone', 'grappled'] }
]

function sourceName(source) {
  return CONDITIONS_DISEASE_SOURCE_NAMES_5E[source] || source
}

function sourceUrl(slug) {
  return `https://5e14.ttg.club/screens/${slug}`
}

function makeRule(rule) {
  return {
    sourceName: sourceName(rule.source),
    sourceUrl: sourceUrl(rule.externalSlug || rule.slug),
    quick: rule.quick || [
      { label: 'Источник', value: rule.source },
      { label: 'Тип', value: rule.groupTitle || 'Состояние' },
      { label: 'Длительность', value: 'По эффекту' }
    ],
    terms: rule.terms || ['состояние', 'эффект', 'существо'],
    blocks: rule.blocks || [
      {
        title: 'Правило',
        paragraphs: [
          rule.summary,
          'Конкретный эффект указывает длительность, способ снятия, спасброски и последствия. Если несколько правил называют одно состояние, оно не становится сильнее само по себе, но могут действовать разные источники.'
        ]
      },
      {
        title: 'В игре',
        paragraphs: [
          'Отмечайте состояние рядом с существом и сразу показывайте игрокам, что именно меняется: движение, атаки, проверки, способность говорить, видеть, действовать или концентрироваться.'
        ]
      }
    ],
    ...rule
  }
}

function disease(slug, title, titleEn, source = 'PHB') {
  return makeRule({
    slug,
    title,
    titleEn,
    icon: 'disease',
    source,
    group: 'diseases',
    groupTitle: 'Болезнь',
    summary: `${title} — болезнь или заражение, которое развивается по описанию источника и обычно требует спасбросков, лечения, магии или времени для преодоления.`,
    quick: [
      { label: 'Тип', value: 'Болезнь' },
      { label: 'Источник', value: source },
      { label: 'Лечение', value: 'По описанию болезни' }
    ],
    terms: ['болезнь', 'спасбросок', 'лечение']
  })
}

function condition(slug, title, titleEn, iconName, summary, quick, terms) {
  return makeRule({
    slug,
    title,
    titleEn,
    icon: iconName,
    source: 'PHB',
    group: 'conditions',
    groupTitle: 'Состояние',
    summary,
    quick,
    terms
  })
}

export const CONDITIONS_DISEASE_RULES_5E = [
  makeRule({
    slug: 'condition-immunities',
    title: 'Иммунитет к состояниям',
    titleEn: 'Condition Immunities',
    icon: 'immunity',
    source: 'DMG',
    group: 'core',
    summary: 'Иммунитет к состоянию означает, что указанное состояние не может быть наложено на существо обычным образом.',
    quick: [{ label: 'Тип', value: 'Защита' }, { label: 'Применение', value: 'Указанные состояния' }, { label: 'Смотреть', value: 'Блок характеристик' }],
    terms: ['иммунитет', 'состояние', 'существо']
  }),
  disease('mindfire', 'Воспаление Разума', 'Mindfire'),
  disease('sight-rot', 'Глазная Гниль', 'Sight Rot'),
  disease('flesh-rot', 'Гниение Плоти', 'Flesh Rot'),
  disease('throat-leeches', 'Гортанные Пиявки', 'Throat Leeches', 'TOA'),
  disease('grackle-lung', 'Гракл-Лунг', 'Grackle-Lung', 'OotA'),
  disease('the-gnawing-plague', 'Грызучая чума', 'The Gnawing Plague', 'VRGR'),
  disease('filth-fever', 'Грязевая Лихорадка', 'Filth Feve'),
  disease('shivering-sickness', 'Дрожащая Болезнь', 'Shivering Sickness', 'TOA'),
  disease('contamination', 'Контаминация', 'Contamination', 'DoDk'),
  disease('redface', 'Красноликость', 'Redface', 'GoS'),
  disease('blue-mist-fever', 'Лихорадка синего тумана', 'Blue Mist Fever', 'TOA'),
  disease('arcane-blight', 'Магическая зараза', 'Arcane Blight', 'IDRotF'),
  disease('frostbite-and-hypothermia', 'Обморожение и переохлаждение', 'Frostbite and Hypothermia', 'MHH'),
  disease('seizure', 'Припадок', 'Seizure'),
  disease('saprophytic-plague', 'Сапрофитная чума', 'Saprophytic Plague', 'CM'),
  disease('blue-rot', 'Синегниль', 'Blue Rot', 'GOS'),
  disease('slimy-doom', 'Склизкая Смерть', 'Slimy Doom'),
  disease('blinding-sickness', 'Слепотуха', 'Blinding Sickness'),
  disease('snow-blindness', 'Снежная слепота', 'Snow Blindness', 'MHH'),
  disease('sewer-plague', 'Сточная Чума', 'Sewer Plague', 'DMG'),
  disease('super-tetanus', 'Супер-столбняк', 'Super-Tetanus', 'TftYP'),
  disease('frigid-woe', 'Холодное горе', 'Frigid Woe', 'EGtW'),
  disease('cackle-fever', 'Хохочущая Лихорадка', 'Cackle Fever', 'DMG'),
  makeRule({ slug: 'vampirism', title: 'Вампиризм', titleEn: 'Vampirism', icon: 'curse', source: 'MM', group: 'curses', groupTitle: 'Проклятие', summary: 'Вампиризм превращает жертву в существо, связанное с кровью, нежитью, ночной охотой и властью вампира.', terms: ['проклятие', 'нежить', 'вампир'] }),
  makeRule({ slug: 'lycanthropes', title: 'Ликантропия', titleEn: 'Lycanthropes', icon: 'curse', source: 'MM', group: 'curses', groupTitle: 'Проклятие', summary: 'Ликантропия — проклятие оборотня, которое меняет тело, инстинкты и может передаваться через укус.', terms: ['проклятие', 'оборотень', 'форма'] }),
  makeRule({ slug: 'madness', title: 'Безумный', titleEn: 'Madness', icon: 'state', source: 'PHB', group: 'other', groupTitle: 'Прочее состояние', summary: 'Безумие отражает временное, длительное или постоянное нарушение восприятия и поведения персонажа.', terms: ['безумие', 'Мудрость', 'роль'] }),
  makeRule({ slug: 'surprise', title: 'Захваченый врасплох', titleEn: 'Surprise', icon: 'state', source: 'PHB', group: 'other', groupTitle: 'Прочее состояние', summary: 'Существо, захваченное врасплох в начале боя, не может двигаться или действовать в первый ход и не использует реакции до конца этого хода.', terms: ['внезапность', 'инициатива', 'реакция'] }),
  makeRule({ slug: 'intoxicated', title: 'Опьяненный', titleEn: 'Intoxicated', icon: 'poisoned', source: 'TaT', group: 'other', groupTitle: 'Прочее состояние', summary: 'Опьянение описывает ухудшение координации, речи и решений под действием алкоголя или похожего вещества.', terms: ['опьянение', 'помеха', 'яд'] }),
  makeRule({ slug: 'concentrated', title: 'Сконцентрированный', titleEn: 'Concentrated', icon: 'state', source: 'PHB', group: 'other', groupTitle: 'Прочее состояние', summary: 'Концентрация означает, что существо удерживает эффект заклинания или способности и может потерять его от урона или другого нарушения.', terms: ['концентрация', 'заклинание', 'Телосложение'] }),
  makeRule({ slug: 'stabilized', title: 'Стабилизированный', titleEn: 'Stabilized', icon: 'state', source: 'PHB', group: 'other', groupTitle: 'Прочее состояние', summary: 'Стабилизированное существо с 0 хитами больше не совершает спасброски от смерти, но остаётся без сознания до восстановления хитов.', terms: ['0 хитов', 'стабилизация', 'без сознания'] }),
  makeRule({ slug: 'dodging', title: 'Уклоняющийся', titleEn: 'Dodging', icon: 'state', source: 'PHB', group: 'other', groupTitle: 'Прочее состояние', summary: 'Уклоняющееся существо сосредоточено на защите: атаки по нему получают помеху, а оно получает преимущество на спасброски Ловкости, если видит угрозу.', terms: ['Уклонение', 'помеха', 'Ловкость'] }),
  condition('unconscious', 'Бессознательный', 'Unconscious', 'unconscious', 'Бессознательное существо не действует, не двигается, падает ничком и становится особенно уязвимым для атак.', [{ label: 'Действия', value: 'Не может' }, { label: 'Положение', value: 'Ничком' }, { label: 'Атаки рядом', value: 'Крит при попадании' }], ['без сознания', 'ничком', 'критическое попадание']),
  condition('frightened', 'Испуганный', 'Frightened', 'frightened', 'Испуганное существо имеет помеху на проверки и атаки, пока источник страха находится в линии обзора, и не может добровольно приблизиться к нему.', [{ label: 'Атаки', value: 'Помеха' }, { label: 'Проверки', value: 'Помеха' }, { label: 'Движение', value: 'Нельзя приблизиться' }], ['испуг', 'помеха', 'линия обзора']),
  condition('exhaustion', 'Истощенный', 'Exhaustion', 'exhaustion', 'Истощение накапливается уровнями и постепенно ухудшает проверки, скорость, атаки, максимум хитов и способность выживать.', [{ label: 'Тип', value: '6 уровней' }, { label: 'Снятие', value: 'Отдых и эффекты' }, { label: '6 уровень', value: 'Смерть' }], ['истощение', 'уровень', 'отдых']),
  condition('invisible', 'Невидимый', 'Invisible', 'invisible', 'Невидимое существо нельзя увидеть без магии или особого чувства; атаки по нему обычно имеют помеху, а его атаки — преимущество.', [{ label: 'Видимость', value: 'Не видно' }, { label: 'Атаки по нему', value: 'Помеха' }, { label: 'Его атаки', value: 'Преимущество' }], ['невидимость', 'преимущество', 'помеха']),
  condition('incapacitated', 'Недееспособный', 'Incapacitated', 'incapacitated', 'Недееспособное существо не может совершать действия и реакции.', [{ label: 'Действия', value: 'Нет' }, { label: 'Реакции', value: 'Нет' }, { label: 'Часто входит', value: 'В другие состояния' }], ['недееспособность', 'действие', 'реакция']),
  condition('deafened', 'Оглохший', 'Deafened', 'deafened', 'Оглохшее существо ничего не слышит и автоматически проваливает проверки, требующие слуха.', [{ label: 'Слух', value: 'Нет' }, { label: 'Проверки слуха', value: 'Автопровал' }, { label: 'Общение', value: 'Ограничено' }], ['глухота', 'слух', 'проверка']),
  condition('petrified', 'Окаменевший', 'Petrified', 'petrified', 'Окаменевшее существо превращается вместе со снаряжением в твёрдое вещество, становится недееспособным и почти не воспринимает мир.', [{ label: 'Действия', value: 'Нет' }, { label: 'Сопротивление', value: 'Ко многому урону' }, { label: 'Атаки рядом', value: 'Преимущество' }], ['окаменение', 'недееспособность', 'сопротивление']),
  condition('restrained', 'Опутанный', 'Restrained', 'restrained', 'Опутанное существо имеет скорость 0, атаки по нему совершаются с преимуществом, а его атаки и спасброски Ловкости страдают.', [{ label: 'Скорость', value: '0' }, { label: 'Атаки по нему', value: 'Преимущество' }, { label: 'Его атаки', value: 'Помеха' }], ['опутывание', 'скорость', 'Ловкость']),
  condition('blinded', 'Ослеплённый', 'Blinded', 'blinded', 'Ослеплённое существо ничего не видит и автоматически проваливает проверки, требующие зрения.', [{ label: 'Зрение', value: 'Нет' }, { label: 'Атаки по нему', value: 'Преимущество' }, { label: 'Его атаки', value: 'Помеха' }], ['ослепление', 'зрение', 'помеха']),
  condition('poisoned', 'Отравленный', 'Poisoned', 'poisoned', 'Отравленное существо имеет помеху на броски атаки и проверки характеристик.', [{ label: 'Атаки', value: 'Помеха' }, { label: 'Проверки', value: 'Помеха' }, { label: 'Источник', value: 'Яд или болезнь' }], ['отравление', 'помеха', 'яд']),
  condition('charmed', 'Очарованный', 'Charmed', 'charmed', 'Очарованное существо не может атаковать очаровавшего и даёт ему преимущество на социальные проверки.', [{ label: 'Атаки', value: 'Нельзя против источника' }, { label: 'Социальные проверки', value: 'Преимущество источнику' }, { label: 'Тип', value: 'Влияние' }], ['очарование', 'Харизма', 'преимущество']),
  condition('stunned', 'Ошеломлённый', 'Stunned', 'stunned', 'Ошеломлённое существо недееспособно, не может двигаться и говорит только запинаясь.', [{ label: 'Действия', value: 'Нет' }, { label: 'Движение', value: 'Нет' }, { label: 'Атаки по нему', value: 'Преимущество' }], ['ошеломление', 'недееспособность', 'помеха']),
  condition('paralyzed', 'Парализованный', 'Paralyzed', 'paralyzed', 'Парализованное существо недееспособно, не двигается, не говорит и особенно уязвимо к атакам рядом.', [{ label: 'Действия', value: 'Нет' }, { label: 'Движение', value: 'Нет' }, { label: 'Атаки рядом', value: 'Крит при попадании' }], ['паралич', 'недееспособность', 'критическое попадание']),
  condition('condition-prone', 'Сбитый с ног / лежащий ничком', 'Condition Prone', 'prone', 'Существо ничком ограничено в движении; атаки рядом по нему легче, а дальние атаки обычно сложнее.', [{ label: 'Передвижение', value: 'Ползком или встать' }, { label: 'Атаки рядом', value: 'Преимущество' }, { label: 'Дальние атаки', value: 'Помеха' }], ['ничком', 'ползание', 'атака']),
  condition('grappled', 'Схваченный', 'Grappled', 'grappled', 'Схваченное существо имеет скорость 0, пока захват не закончится.', [{ label: 'Скорость', value: '0' }, { label: 'Заканчивается', value: 'Освобождение или потеря захватчика' }, { label: 'Тип', value: 'Захват' }], ['захват', 'скорость', 'Атлетика'])
]

export const CONDITIONS_DISEASE_RULE_BY_SLUG_5E = Object.fromEntries(CONDITIONS_DISEASE_RULES_5E.map(rule => [rule.slug, rule]))

export const CONDITIONS_DISEASE_GROUPS_WITH_RULES_5E = CONDITIONS_DISEASE_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => CONDITIONS_DISEASE_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function conditionsDiseaseRulePath(slug) {
  return `/dnd5e/screens/conditions_and_disease/${slug}`
}
