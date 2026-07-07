const PHB_SOURCE_5E = {
  source: 'PHB',
  sourceName: "Player's Handbook 2014",
  sourceUrl: 'https://5e14.ttg.club/screens/active_class_features'
}

export const ACTIVE_CLASS_FEATURES_SCREEN_5E = {
  slug: 'active_class_features',
  title: 'Активные умения класса',
  titleEn: 'Active class features',
  source: PHB_SOURCE_5E.source,
  sourceName: PHB_SOURCE_5E.sourceName,
  sourceUrl: PHB_SOURCE_5E.sourceUrl,
  intro: 'Здесь собраны классовые умения D&D 5e 2014, которые требуют действия, бонусного действия, реакции, ресурса или отдельного решения игрока во время сцены.'
}

export const ACTIVE_CLASS_FEATURES_ICON_SVG_5E = {
  default: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bard: '<path d="M7 18V7l10-2v11" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="7" cy="18" r="3" fill="currentColor"/><circle cx="17" cy="16" r="3" fill="currentColor"/>',
  barbarian: '<path d="M5 19L19 5M5 5l14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 4l-4 4M16 20l4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  fighter: '<path d="M4 20L20 4M7 7l10 10M4 4l16 16" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  druid: '<path d="M12 21c-5-4-7-8-7-12 0-3 2-5 5-5 2 0 3 1 4 3 1-2 2-3 4-3 1 6-1 11-6 17z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 21c0-6 2-10 6-14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  cleric: '<path d="M12 3v18M5 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 21h10M8 6h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  monk: '<circle cx="12" cy="5" r="2.3" fill="currentColor"/><path d="M12 8v6M7 12h10M8 21l4-7 4 7" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  paladin: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" fill="currentColor"/><path d="M12 7v10M8 11h8" stroke="#101820" stroke-width="1.9" stroke-linecap="round"/>',
  rogue: '<path d="M4 9l8-5 8 5-8 11z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 10h8M9 14h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  ranger: '<path d="M12 3l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" stroke="currentColor" stroke-width="1.7" fill="none"/><path d="M12 8v7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
}

export const ACTIVE_CLASS_FEATURE_GROUPS_5E = [
  { id: 'bard', title: 'Бард', items: ['bardic-inspiration'] },
  { id: 'barbarian', title: 'Варвар', items: ['extra-attack-barbarian', 'rage'] },
  { id: 'fighter', title: 'Воин', items: ['action-surge', 'second-wind', 'extra-attack-fighter', 'indomitable'] },
  { id: 'druid', title: 'Друид', items: ['revert-to-your-normal-form', 'wild-shape'] },
  { id: 'cleric', title: 'Жрец', items: ['divine-intervention', 'turn-undead'] },
  { id: 'monk', title: 'Монах', items: ['diamond-soul', 'extra-attack-monk', 'slow-fall', 'deflect-missiles', 'stunning-strike', 'step-of-the-wind', 'empty-body', 'stillness-of-mind', 'patient-defense', 'flurry-of-blows'] },
  { id: 'paladin', title: 'Паладин', items: ['divine-smite', 'divine-sense', 'extra-attack-paladin', 'lay-on-hands', 'cleansing-touch'] },
  { id: 'rogue', title: 'Плут', items: ['sneak-attack', 'evasion', 'cunning-action'] },
  { id: 'ranger', title: 'Следопыт', items: ['extra-attack-ranger', 'vanish', 'primal-awareness'] }
]

function featureUrl(slug) {
  return `https://5e14.ttg.club/screens/${slug}`
}

function makeFeature(feature) {
  return {
    source: PHB_SOURCE_5E.source,
    sourceName: PHB_SOURCE_5E.sourceName,
    sourceUrl: featureUrl(feature.externalSlug || feature.slug),
    quick: [
      { label: 'Класс', value: feature.className },
      { label: 'Уровень', value: feature.level },
      { label: 'Активация', value: feature.activation }
    ],
    terms: feature.terms || [feature.className, 'умение класса', feature.activation],
    blocks: feature.blocks || [
      {
        title: 'Как работает',
        paragraphs: [
          feature.summary,
          'Проверьте точный момент применения, доступный ресурс и ограничения в описании класса. Если умение требует действие, бонусное действие или реакцию, оно расходует соответствующую часть вашего хода.'
        ]
      },
      {
        title: 'В игре',
        paragraphs: [
          'Запишите рядом с умением его ресурс, длительность и условие восстановления. Это помогает быстро понять, можно ли применить способность сейчас или нужно дождаться отдыха, нового хода либо подходящего триггера.'
        ]
      }
    ],
    ...feature
  }
}

export const ACTIVE_CLASS_FEATURE_RULES_5E = [
  makeFeature({
    slug: 'bardic-inspiration',
    title: 'Вдохновение барда',
    titleEn: 'Bardic Inspiration',
    icon: 'bard',
    className: 'Бард',
    level: '1-й уровень',
    activation: 'Бонусное действие',
    summary: 'Бард вдохновляет существо словами, музыкой или выступлением. Выбранное существо получает кость бардовского вдохновения и позже может добавить её к проверке характеристики, броску атаки или спасброску.',
    terms: ['бонусное действие', 'кость бардовского вдохновения', 'проверка характеристики', 'бросок атаки', 'спасбросок', 'Харизма'],
    blocks: [
      {
        title: 'Выдача вдохновения',
        paragraphs: [
          'Бонусным действием выберите существо, которое может вас слышать в пределах 60 футов. Оно получает одну кость бардовского вдохновения.',
          'Существо может потратить эту кость после броска, но до объявления результата. Кость добавляется к одной проверке характеристики, броску атаки или спасброску.'
        ]
      },
      {
        title: 'Ресурс и рост',
        paragraphs: [
          'Количество использований связано с модификатором Харизмы барда, минимум одно использование. Потраченные использования восстанавливаются после продолжительного отдыха, а позже класс получает более удобное восстановление.',
          'Размер кости растёт с уровнем барда: сначала к6, затем к8, к10 и к12.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'extra-attack-barbarian',
    title: 'Дополнительная атака',
    titleEn: 'Extra Attack Barbarian',
    icon: 'barbarian',
    className: 'Варвар',
    level: '5-й уровень',
    activation: 'Действие Атака',
    summary: 'Когда варвар совершает действие Атака, он может атаковать дважды вместо одного раза.',
    terms: ['действие Атака', 'атака', 'оружие']
  }),
  makeFeature({
    slug: 'rage',
    title: 'Ярость',
    titleEn: 'Rage',
    icon: 'barbarian',
    className: 'Варвар',
    level: '1-й уровень',
    activation: 'Бонусное действие',
    summary: 'Варвар входит в ярость, усиливая проверки и спасброски Силы, урон рукопашных атак Силой и стойкость против дробящего, колющего и рубящего урона.',
    terms: ['бонусное действие', 'Сила', 'сопротивление', 'дробящий урон', 'колющий урон', 'рубящий урон'],
    blocks: [
      {
        title: 'Преимущества ярости',
        paragraphs: [
          'Пока ярость активна, варвар получает преимущество на проверки и спасброски Силы. Его рукопашные атаки оружием, использующие Силу, получают бонус к урону.',
          'Варвар также получает сопротивление дробящему, колющему и рубящему урону.'
        ]
      },
      {
        title: 'Ограничения',
        paragraphs: [
          'Во время ярости нельзя накладывать заклинания и поддерживать концентрацию на заклинаниях.',
          'Ярость заканчивается по условиям умения: например, если варвар не атакует в свой ход и не получает урон, либо если он теряет сознание. Точные ограничения зависят от уровня и особенностей класса.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'action-surge',
    title: 'Всплеск действий',
    titleEn: 'Action Surge',
    icon: 'fighter',
    className: 'Воин',
    level: '2-й уровень',
    activation: 'Особое действие в ход',
    summary: 'Воин на мгновение выходит за предел обычного темпа и получает дополнительное действие в свой ход.',
    terms: ['действие', 'ход', 'короткий отдых', 'продолжительный отдых'],
    blocks: [
      {
        title: 'Дополнительное действие',
        paragraphs: [
          'В свой ход воин может получить одно дополнительное действие помимо обычного действия и возможного бонусного действия.',
          'После использования умение восстанавливается после короткого или продолжительного отдыха. На высоком уровне воин получает больше использований, но всё равно не может тратить их без ограничений в одном ходу.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'second-wind',
    title: 'Второе дыхание',
    titleEn: 'Second Wind',
    icon: 'fighter',
    className: 'Воин',
    level: '1-й уровень',
    activation: 'Бонусное действие',
    summary: 'Воин собирает силы и восстанавливает хиты. Обычно восстановление равно 1к10 + уровень воина.',
    terms: ['бонусное действие', 'хиты', '1к10', 'короткий отдых', 'продолжительный отдых']
  }),
  makeFeature({
    slug: 'extra-attack-fighter',
    title: 'Дополнительная атака',
    titleEn: 'Extra Attack Fighter',
    icon: 'fighter',
    className: 'Воин',
    level: '5-й, 11-й и 20-й уровни',
    activation: 'Действие Атака',
    summary: 'Воин атакует несколько раз, когда совершает действие Атака. В отличие от большинства классов, количество атак у воина продолжает расти на высоких уровнях.',
    terms: ['действие Атака', 'атака', '5-й уровень', '11-й уровень', '20-й уровень'],
    blocks: [
      {
        title: 'Рост числа атак',
        paragraphs: [
          'С 5-го уровня воин атакует дважды вместо одного раза, когда совершает действие Атака.',
          'Позднее это умение усиливается: на 11-м уровне воин атакует трижды, а на 20-м уровне — четырежды.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'indomitable',
    title: 'Упорный',
    titleEn: 'Indomitable',
    icon: 'fighter',
    className: 'Воин',
    level: '9-й уровень',
    activation: 'После провала спасброска',
    summary: 'Воин может перебросить проваленный спасбросок. Новый результат используется вместо старого.',
    terms: ['спасбросок', 'переброс', 'продолжительный отдых']
  }),
  makeFeature({
    slug: 'revert-to-your-normal-form',
    title: 'Выход из дикого облика',
    titleEn: 'Revert to Your Normal Form',
    icon: 'druid',
    className: 'Друид',
    level: '2-й уровень',
    activation: 'Бонусное действие',
    summary: 'Друид может досрочно завершить Дикий облик и вернуться в обычную форму. Форма также прекращается при потере сознания, смерти или исчерпании хитов звериной формы.',
    terms: ['Дикий облик', 'бонусное действие', 'хиты', 'обычная форма']
  }),
  makeFeature({
    slug: 'wild-shape',
    title: 'Дикий облик',
    titleEn: 'Wild Shape',
    icon: 'druid',
    className: 'Друид',
    level: '2-й уровень',
    activation: 'Действие',
    summary: 'Друид принимает форму зверя, используя ограничения по уровню и опасности существа. Умение помогает в разведке, передвижении, выживании и бою.',
    terms: ['действие', 'зверь', 'хиты', 'короткий отдых', 'продолжительный отдых'],
    blocks: [
      {
        title: 'Форма зверя',
        paragraphs: [
          'Друид выбирает зверя, форму которого разрешают его уровень и ограничения Дикого облика. На ранних уровнях доступны более простые формы, а варианты с плаванием и полётом открываются позже.',
          'В форме зверя друид использует многие физические параметры новой формы, но сохраняет личность, мировоззрение и часть умственных возможностей.'
        ]
      },
      {
        title: 'Хиты и длительность',
        paragraphs: [
          'Звериная форма имеет собственные хиты. Когда они заканчиваются, лишний урон переносится на обычную форму друида.',
          'Длительность зависит от уровня друида. Умение обычно восстанавливается после короткого или продолжительного отдыха.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'divine-intervention',
    title: 'Божественное вмешательство',
    titleEn: 'Divine Intervention',
    icon: 'cleric',
    className: 'Жрец',
    level: '10-й уровень',
    activation: 'Действие',
    summary: 'Жрец обращается к своему божеству за прямой помощью. Успех зависит от уровня жреца, а на 20-м уровне вмешательство становится надёжным.',
    terms: ['действие', 'божество', 'процентный бросок', 'продолжительный отдых'],
    blocks: [
      {
        title: 'Просьба о помощи',
        paragraphs: [
          'Жрец описывает, какой помощи просит у божества. Мастер определяет форму ответа, часто ориентируясь на эффекты подходящих заклинаний жреца или домена.',
          'Если проверка вмешательства успешна, умение нельзя использовать снова несколько дней. Если нет, его можно повторить после продолжительного отдыха.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'turn-undead',
    title: 'Изгнание нежити',
    titleEn: 'Turn Undead',
    icon: 'cleric',
    className: 'Жрец',
    level: '2-й уровень',
    activation: 'Действие, Канал Божественности',
    summary: 'Жрец предъявляет священный символ и изгоняет нежить. Нежить, провалившая спасбросок Мудрости, становится обращённой на время действия эффекта.',
    terms: ['действие', 'Канал Божественности', 'нежить', 'спасбросок Мудрости', 'священный символ'],
    blocks: [
      {
        title: 'Обращённая нежить',
        paragraphs: [
          'Обращённая нежить должна тратить свои ходы на удаление от жреца и не может добровольно приблизиться к нему.',
          'Эффект заканчивается, если существо получает урон или если истекает длительность умения.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'diamond-soul',
    title: 'Алмазная душа',
    titleEn: 'Diamond soul',
    icon: 'monk',
    className: 'Монах',
    level: '14-й уровень',
    activation: 'После провала спасброска',
    summary: 'Монах получает владение всеми спасбросками и может тратить ки, чтобы перебрасывать проваленный спасбросок.',
    terms: ['ки', 'спасбросок', 'владение', 'переброс']
  }),
  makeFeature({
    slug: 'extra-attack-monk',
    title: 'Дополнительная атака',
    titleEn: 'Extra Attack Monk',
    icon: 'monk',
    className: 'Монах',
    level: '5-й уровень',
    activation: 'Действие Атака',
    summary: 'Когда монах совершает действие Атака, он может атаковать дважды вместо одного раза.',
    terms: ['действие Атака', 'атака', 'монашеское оружие', 'безоружный удар']
  }),
  makeFeature({
    slug: 'slow-fall',
    title: 'Медленное падение',
    titleEn: 'Slow Fall',
    icon: 'monk',
    className: 'Монах',
    level: '4-й уровень',
    activation: 'Реакция',
    summary: 'Когда монах падает, он может реакцией уменьшить получаемый урон от падения. Размер уменьшения зависит от уровня монаха.',
    terms: ['реакция', 'падение', 'урон', 'уровень монаха']
  }),
  makeFeature({
    slug: 'deflect-missiles',
    title: 'Отражение снарядов',
    titleEn: 'Deflect Missiles',
    icon: 'monk',
    className: 'Монах',
    level: '3-й уровень',
    activation: 'Реакция',
    summary: 'Монах реакцией уменьшает урон от дальнобойной атаки оружием. Если урон снижен до 0, снаряд можно поймать и иногда метнуть обратно.',
    terms: ['реакция', 'дальнобойная атака', '1к10', 'Ловкость', 'ки'],
    blocks: [
      {
        title: 'Снижение урона',
        paragraphs: [
          'Когда монах получает урон от дальнобойной атаки оружием, он может реакцией уменьшить этот урон на 1к10 + модификатор Ловкости + уровень монаха.',
          'Если урон снижен до 0 и предмет достаточно мал, монах может поймать его свободной рукой.'
        ]
      },
      {
        title: 'Бросок обратно',
        paragraphs: [
          'Пойманный снаряд можно метнуть обратно, потратив ки. Такая атака использует правила умения и считается частью той же реакции.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'stunning-strike',
    title: 'Ошеломляющий удар',
    titleEn: 'Stunning Strike',
    icon: 'monk',
    className: 'Монах',
    level: '5-й уровень',
    activation: 'При попадании атакой',
    summary: 'Монах тратит ки после попадания рукопашной атакой оружием. Цель совершает спасбросок Телосложения или становится ошеломлённой до конца следующего хода монаха.',
    terms: ['ки', 'атака', 'спасбросок Телосложения', 'ошеломлённый']
  }),
  makeFeature({
    slug: 'step-of-the-wind',
    title: 'Поступь ветра',
    titleEn: 'Step of the Wind',
    icon: 'monk',
    className: 'Монах',
    level: '2-й уровень',
    activation: 'Бонусное действие',
    summary: 'Монах тратит ки, чтобы бонусным действием совершить Рывок или Отход. Прыжки в этот ход становятся значительно дальше.',
    terms: ['ки', 'бонусное действие', 'Рывок', 'Отход', 'прыжок']
  }),
  makeFeature({
    slug: 'empty-body',
    title: 'Пустое тело',
    titleEn: 'Empty body',
    icon: 'monk',
    className: 'Монах',
    level: '18-й уровень',
    activation: 'Действие',
    summary: 'Монах тратит ки, чтобы стать невидимым и получить сопротивление почти всему урону на короткое время. Также умение открывает особое духовное путешествие.',
    terms: ['ки', 'действие', 'невидимый', 'сопротивление', 'силовой урон'],
    blocks: [
      {
        title: 'Невидимость и сопротивление',
        paragraphs: [
          'Действием монах может потратить ки и на 1 минуту стать невидимым. На это время он получает сопротивление всему урону, кроме силового.',
          'Эта часть умения особенно ценна, когда нужно пережить опасный раунд, уйти из-под давления или вести бой против нескольких противников.'
        ]
      },
      {
        title: 'Духовное путешествие',
        paragraphs: [
          'Монах также может потратить больше ки, чтобы использовать эффект астральной проекции на себя без обычной материальной платы.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'stillness-of-mind',
    title: 'Спокойствие разума',
    titleEn: 'Stillness of Mind',
    icon: 'monk',
    className: 'Монах',
    level: '7-й уровень',
    activation: 'Действие',
    summary: 'Монах действием завершает на себе один эффект, который накладывает состояние очарованный или испуганный.',
    terms: ['действие', 'очарованный', 'испуганный', 'состояние']
  }),
  makeFeature({
    slug: 'patient-defense',
    title: 'Терпеливая оборона',
    titleEn: 'Patient Defense',
    icon: 'monk',
    className: 'Монах',
    level: '2-й уровень',
    activation: 'Бонусное действие',
    summary: 'Монах тратит ки и бонусным действием совершает Уклонение.',
    terms: ['ки', 'бонусное действие', 'Уклонение', 'атака', 'спасбросок Ловкости']
  }),
  makeFeature({
    slug: 'flurry-of-blows',
    title: 'Шквал ударов',
    titleEn: 'Flurry of Blows',
    icon: 'monk',
    className: 'Монах',
    level: '2-й уровень',
    activation: 'Бонусное действие после Атаки',
    summary: 'После действия Атака монах тратит ки и бонусным действием совершает два безоружных удара.',
    terms: ['ки', 'действие Атака', 'бонусное действие', 'безоружный удар']
  }),
  makeFeature({
    slug: 'divine-smite',
    title: 'Божественная кара',
    titleEn: 'Divine Smite',
    icon: 'paladin',
    className: 'Паладин',
    level: '2-й уровень',
    activation: 'При попадании рукопашной атакой',
    summary: 'Паладин тратит ячейку заклинания после попадания рукопашной атакой оружием и добавляет к урону излучение. Против нежити и исчадий кара особенно сильна.',
    terms: ['ячейка заклинания', 'рукопашная атака', 'излучение', 'нежить', 'исчадие'],
    blocks: [
      {
        title: 'Урон кары',
        paragraphs: [
          'После попадания рукопашной атакой оружием паладин может потратить ячейку заклинания и нанести дополнительный урон излучением.',
          'Чем выше уровень потраченной ячейки, тем больше дополнительный урон, но у этого увеличения есть верхний предел. Против нежити и исчадий добавляется ещё одна кость урона.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'divine-sense',
    title: 'Божественное чувство',
    titleEn: 'Divine Sense',
    icon: 'paladin',
    className: 'Паладин',
    level: '1-й уровень',
    activation: 'Действие',
    summary: 'Паладин открывает чувства для присутствия небожителей, исчадий и нежити поблизости, если они не скрыты полным укрытием.',
    terms: ['действие', 'небожитель', 'исчадие', 'нежить', 'полное укрытие', 'Харизма']
  }),
  makeFeature({
    slug: 'extra-attack-paladin',
    title: 'Дополнительная атака',
    titleEn: 'Extra Attack Paladin',
    icon: 'paladin',
    className: 'Паладин',
    level: '5-й уровень',
    activation: 'Действие Атака',
    summary: 'Когда паладин совершает действие Атака, он может атаковать дважды вместо одного раза.',
    terms: ['действие Атака', 'атака', 'оружие']
  }),
  makeFeature({
    slug: 'lay-on-hands',
    title: 'Наложение рук',
    titleEn: 'Lay on Hands',
    icon: 'paladin',
    className: 'Паладин',
    level: '1-й уровень',
    activation: 'Действие',
    summary: 'Паладин использует запас целительной силы, чтобы восстанавливать хиты касанием или устранять болезнь и яд.',
    terms: ['действие', 'хиты', 'болезнь', 'яд', 'запас исцеления'],
    blocks: [
      {
        title: 'Запас исцеления',
        paragraphs: [
          'У паладина есть запас лечения, равный 5 x уровень паладина. Действием он касается существа и передаёт любое количество хитов из этого запаса.',
          'Часть запаса можно потратить, чтобы снять одну болезнь или один яд с цели.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'cleansing-touch',
    title: 'Очищающее касание',
    titleEn: 'Cleansing Touch',
    icon: 'paladin',
    className: 'Паладин',
    level: '14-й уровень',
    activation: 'Действие',
    summary: 'Паладин касается себя или согласного существа и завершает одно заклинание, действующее на цель.',
    terms: ['действие', 'заклинание', 'касание', 'Харизма', 'продолжительный отдых']
  }),
  makeFeature({
    slug: 'sneak-attack',
    title: 'Скрытая атака',
    titleEn: 'Sneak Attack',
    icon: 'rogue',
    className: 'Плут',
    level: '1-й уровень',
    activation: 'Один раз за ход при попадании',
    summary: 'Плут наносит дополнительный урон, когда попадает атакой с преимуществом или когда рядом с целью есть угрожающий ей союзник и нет помехи.',
    terms: ['один раз за ход', 'преимущество', 'помеха', 'фехтовальное оружие', 'дальнобойное оружие'],
    blocks: [
      {
        title: 'Условия',
        paragraphs: [
          'Скрытая атака работает с фехтовальным или дальнобойным оружием.',
          'Обычно требуется преимущество на бросок атаки. Альтернативно, умение может сработать, если другой враг цели находится рядом с ней, не недееспособен, а у плута нет помехи на бросок.'
        ]
      },
      {
        title: 'Урон',
        paragraphs: [
          'Дополнительный урон Скрытой атаки растёт с уровнем плута и применяется не чаще одного раза за ход.'
        ]
      }
    ]
  }),
  makeFeature({
    slug: 'evasion',
    title: 'Увёртливость',
    titleEn: 'Evasion',
    icon: 'rogue',
    className: 'Плут',
    level: '7-й уровень',
    activation: 'При спасброске Ловкости',
    summary: 'Если эффект позволяет уменьшить урон успешным спасброском Ловкости, плут при успехе не получает урон, а при провале получает только половину.',
    terms: ['спасбросок Ловкости', 'урон', 'успех', 'провал']
  }),
  makeFeature({
    slug: 'cunning-action',
    title: 'Хитрое действие',
    titleEn: 'Cunning action',
    icon: 'rogue',
    className: 'Плут',
    level: '2-й уровень',
    activation: 'Бонусное действие',
    summary: 'Плут использует бонусное действие, чтобы совершить Рывок, Отход или Засаду.',
    terms: ['бонусное действие', 'Рывок', 'Отход', 'Засада']
  }),
  makeFeature({
    slug: 'extra-attack-ranger',
    title: 'Дополнительная атака',
    titleEn: 'Extra Attack Ranger',
    icon: 'ranger',
    className: 'Следопыт',
    level: '5-й уровень',
    activation: 'Действие Атака',
    summary: 'Когда следопыт совершает действие Атака, он может атаковать дважды вместо одного раза.',
    terms: ['действие Атака', 'атака', 'оружие']
  }),
  makeFeature({
    slug: 'vanish',
    title: 'Исчезновение',
    titleEn: 'Vanish',
    icon: 'ranger',
    className: 'Следопыт',
    level: '14-й уровень',
    activation: 'Бонусное действие',
    summary: 'Следопыт может прятаться бонусным действием, а также становится труднее отслеживаемым немагическими средствами.',
    terms: ['бонусное действие', 'Скрытность', 'следы', 'немагическое выслеживание']
  }),
  makeFeature({
    slug: 'primal-awareness',
    title: 'Первозданная осведомлённость',
    titleEn: 'Primal Awareness',
    icon: 'ranger',
    className: 'Следопыт',
    level: '3-й уровень',
    activation: 'Действие и ячейка заклинания',
    summary: 'Следопыт обращается к связи с природой, чтобы почувствовать присутствие определённых типов существ в большом радиусе.',
    terms: ['действие', 'ячейка заклинания', 'существо', 'местность', 'чутьё'],
    blocks: [
      {
        title: 'Поиск присутствия',
        paragraphs: [
          'Потратив ячейку заклинания, следопыт может определить, есть ли поблизости определённые типы существ: например, аберрации, драконы, элементали, феи, исчадия, небожители или нежить.',
          'Умение сообщает присутствие и тип существ, но не раскрывает их количество, точное местоположение или личность.'
        ]
      },
      {
        title: 'Радиус',
        paragraphs: [
          'Обычный радиус велик, а в любимой местности следопыта становится ещё больше. Это умение полезно как разведочный инструмент до контакта с угрозой.'
        ]
      }
    ]
  })
]

export const ACTIVE_CLASS_FEATURE_RULE_BY_SLUG_5E = Object.fromEntries(ACTIVE_CLASS_FEATURE_RULES_5E.map(rule => [rule.slug, rule]))

export const ACTIVE_CLASS_FEATURE_GROUPS_WITH_RULES_5E = ACTIVE_CLASS_FEATURE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => ACTIVE_CLASS_FEATURE_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function activeClassFeatureRulePath(slug) {
  return `/dnd5e/screens/active_class_features/${slug}`
}
