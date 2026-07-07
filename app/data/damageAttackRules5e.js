export const DAMAGE_ATTACK_SCREEN_5E = {
  slug: 'damage_and_attack',
  title: 'Урон и атака',
  titleEn: 'Damage and Attack',
  source: 'PHB / DMG / MM',
  sourceName: 'D&D 5e 2014',
  sourceUrl: 'https://5e14.ttg.club/screens/damage_and_attack',
  intro: 'Мастер может описывать потерю хитов разными путями. Если ваши хиты не меньше половины от максимума хитов, обычно у вас не будет признаков ранения. Когда хиты опускаются ниже половины от максимума, у вас появляются первые порезы и синяки. Атака, опускающая хиты до 0, попадает точно по вам, оставляя кровоточащие раны и другие травмы, либо просто лишает вас сознания.'
}

export const DAMAGE_ATTACK_SOURCE_NAMES_5E = {
  PHB: 'Player’s Handbook 2014',
  DMG: 'Dungeon Master’s Guide 2014',
  MM: 'Monster Manual 2014',
  ScDun: 'Damage by Level and Severity'
}

export const DAMAGE_ATTACK_ICON_SVG_5E = {
  criticalMiss: '<path d="M12 3l9 5v8l-9 5-9-5V8z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 8l8 8M16 8l-8 8M12 5v14M5 10h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  criticalHit: '<path d="M12 3l9 5v8l-9 5-9-5V8z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M12 8v8M7 7l10 10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  fall: '<circle cx="8" cy="5" r="2" fill="currentColor"/><path d="M10 8l4 4-3 3 4 5M8 8l-3 5M14 4l5-2M16 8l4-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  advantage: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M5 12c3-5 8-7 14-7-1 6-4 11-7 14-2-3-4-5-7-7z" fill="currentColor"/>',
  mobs: '<path d="M5 19l6-12M9 19l6-14M13 19l5-9M4 15c4-1 7-3 9-7M9 15c4-1 7-3 9-7" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M4 20h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  severity: '<path d="M4 18c3-4 6-6 8-6s5 2 8 6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M8 15l4-9 4 9" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="6" r="2" fill="currentColor"/>',
  immunity: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 7v10M8 12h8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M18 4v16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  resistance: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  vulnerability: '<path d="M12 3l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 10l4 5 4-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  massive: '<path d="M12 3c4 4 6 8 6 12a6 6 0 0 1-12 0c0-4 2-8 6-12z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M12 8v6M12 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  cleave: '<path d="M4 19c7-1 11-5 14-13M7 20c4-3 8-4 13-4M15 5l5 1-2 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  bludgeoning: '<path d="M5 19l9-9M12 5l7 7-5 5-7-7z" fill="currentColor"/><path d="M4 20l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  thunder: '<path d="M5 18c4-3 4-9 0-12M9 20c6-5 6-13 0-18M13 17c3-3 3-7 0-10M18 8h3M18 12h4M18 16h3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  radiant: '<path d="M12 3v18M6 6l12 12M18 6L6 18M4 12h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 7l4 5-4 5-4-5z" fill="currentColor"/>',
  improvised: '<path d="M5 18l10-10 4 4-10 10z" fill="currentColor"/><path d="M5 18c-2-2-2-5 0-7M8 15c-1-1-1-3 0-4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  acid: '<path d="M12 4c4 6 7 10 7 13a7 7 0 0 1-14 0c0-3 3-7 7-13z" fill="currentColor"/><path d="M8 18c2 1 6 1 8 0" stroke="#0f1921" stroke-width="1.4" stroke-linecap="round"/>',
  piercing: '<path d="M5 20L19 4M14 5l5-1-1 5M8 17l-2-2M12 13l-2-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  necrotic: '<path d="M7 14a5 5 0 1 1 10 0v3H7z" stroke="currentColor" stroke-width="1.8" fill="none"/><circle cx="10" cy="13" r="1" fill="currentColor"/><circle cx="14" cy="13" r="1" fill="currentColor"/><path d="M10 17v3M14 17v3M6 20h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  fire: '<path d="M12 22c-4-2-6-5-6-8 0-4 4-6 5-11 3 3 7 6 7 11 0 3-2 6-6 8z" fill="currentColor"/><path d="M12 19c-2-1-3-3-3-5 2 1 3 0 4-3 2 2 3 4 2 6-.5 1-1.5 1.7-3 2z" fill="#0f1921"/>',
  psychic: '<path d="M12 20v-5M8 15a5 5 0 1 1 8 0M6 12a6 6 0 0 1 12 0M3 12a9 9 0 0 1 18 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  slashing: '<path d="M4 20L20 4M8 20l12-12M4 16L16 4M6 6l12 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
  force: '<circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 12h8M12 8v8M16 5l4 4M20 5l-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  cold: '<path d="M12 3v18M6 6l12 12M18 6L6 18M4 12h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
  lightning: '<path d="M13 2L4 13h7l-2 9 11-13h-7z" fill="currentColor"/>',
  poison: '<path d="M7 10a5 5 0 0 1 10 0v5H7z" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M6 19h12M8 15l-3 5M16 15l3 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="12" r="1" fill="currentColor"/><circle cx="14" cy="12" r="1" fill="currentColor"/>'
}

export const DAMAGE_ATTACK_RULE_GROUPS_5E = [
  { id: 'core', title: '', items: ['critical-miss', 'critical-hit', 'fall', 'advantage-and-disadvantage', 'handling-mobs', 'damage-by-level-and-severity'] },
  { id: 'damage-modifiers', title: 'Изменение урона', items: ['immunity', 'resistance', 'vulnerability'] },
  { id: 'optional', title: 'Опциональные правила', items: ['massive-damage', 'cleaving-through-creatures'] },
  { id: 'damage-types', title: 'Типы урона', items: ['bludgeoning', 'thunder', 'radiant', 'improvised-damage', 'acid', 'piercing', 'necrotic', 'fire', 'psychic', 'slashing', 'force', 'cold', 'lightning', 'poison'] }
]

function sourceName(source) {
  return DAMAGE_ATTACK_SOURCE_NAMES_5E[source] || source
}

function makeBlocks(rule) {
  if (rule.blocks?.length) return rule.blocks

  const blocks = [
    {
      title: 'Правило',
      paragraphs: [rule.summary, ...(rule.details || [])]
    }
  ]

  if (rule.bullets?.length) {
    blocks.push({ title: 'Ключевые эффекты', bullets: rule.bullets })
  }

  blocks.push({
    title: 'В игре',
    paragraphs: rule.play
      ? [rule.play]
      : ['Используйте это правило, когда нужно быстро понять, как атака, урон или защита меняют состояние существа в сцене.']
  })

  return blocks
}

function makeRule(rule) {
  return {
    sourceName: sourceName(rule.source),
    sourceUrl: rule.sourceUrl || DAMAGE_ATTACK_SCREEN_5E.sourceUrl,
    quick: rule.quick || [
      { label: 'Источник', value: rule.source },
      { label: 'Раздел', value: rule.groupTitle || 'Урон и атака' }
    ],
    terms: rule.terms || [],
    blocks: makeBlocks(rule),
    ...rule
  }
}

const core = 'Урон и атака'
const modifiers = 'Изменение урона'
const optional = 'Опциональные правила'
const types = 'Типы урона'

export const DAMAGE_ATTACK_RULES_5E = [
  makeRule({
    slug: 'critical-miss',
    title: 'Критический промах',
    titleEn: 'Critical Miss',
    icon: 'criticalMiss',
    source: 'PHB',
    group: 'core',
    groupTitle: core,
    summary: 'Если на к20 при броске атаки выпадает 1, атака промахивается независимо от модификаторов и КД цели.',
    quick: [{ label: 'Бросок', value: '1 на к20' }, { label: 'Эффект', value: 'Автоматический промах' }, { label: 'Относится к', value: 'Броскам атаки' }],
    terms: ['к20', 'бросок атаки', 'КД'],
    details: ['Это правило применяется именно к броскам атаки. Проверки характеристик и спасброски не получают автоматический провал от 1, если отдельное правило не говорит обратного.', 'Мастер может художественно описать промах как срыв удара, уход цели в сторону, удар по щиту или вмешательство обстановки.'],
    play: 'Не превращайте каждый критический промах в наказание сверх правил. Если хочется добавить драму, лучше описать сцену, а механические последствия давать только когда они уместны и заранее понятны группе.'
  }),
  makeRule({
    slug: 'critical-hit',
    title: 'Критическое попадание',
    titleEn: 'Critical Hit',
    icon: 'criticalHit',
    source: 'PHB',
    group: 'core',
    groupTitle: core,
    summary: 'Если на к20 при броске атаки выпадает 20, атака попадает независимо от КД цели и наносит дополнительный урон.',
    quick: [{ label: 'Бросок', value: '20 на к20' }, { label: 'Эффект', value: 'Автоматическое попадание' }, { label: 'Урон', value: 'Удвоить кости урона' }],
    terms: ['к20', 'бросок атаки', 'кости урона', 'КД'],
    details: ['При критическом попадании бросьте все кости урона атаки дважды и сложите результат с обычными модификаторами. Постоянные бонусы вроде модификатора характеристики не удваиваются, если правило не говорит обратного.', 'Дополнительные кости урона, которые являются частью этой атаки, также обычно удваиваются.'],
    play: 'Критическое попадание удобно выделять в тексте и таблицах, потому что оно меняет не только результат атаки, но и расчёт урона.'
  }),
  makeRule({
    slug: 'fall',
    title: 'Падение',
    titleEn: 'Fall',
    icon: 'fall',
    source: 'PHB',
    group: 'core',
    groupTitle: core,
    summary: 'Падение наносит дробящий урон в зависимости от высоты и обычно заканчивается состоянием ничком.',
    quick: [{ label: 'Урон', value: '1к6 за каждые 10 фт.' }, { label: 'Максимум', value: '20к6' }, { label: 'После падения', value: 'Ничком' }],
    terms: ['дробящий урон', 'ничком', 'падение'],
    details: ['Урон применяется при приземлении. Если существо избегает урона от падения или падение прерывается, состояние и последствия могут измениться.', 'Вода, магия, крылья, выступы, склон или падение на другое существо могут изменить сцену по решению Мастера.'],
    play: 'Падение хорошо связывается с атаками, толчками, боем на высоте и опасным окружением: угроза часто важнее самого урона.'
  }),
  makeRule({
    slug: 'advantage-and-disadvantage',
    title: 'Преимущество и помеха',
    titleEn: 'Advantage and Disadvantage',
    icon: 'advantage',
    source: 'PHB',
    group: 'core',
    groupTitle: core,
    summary: 'Преимущество и помеха меняют бросок к20: бросаются две кости, затем выбирается лучший или худший результат.',
    quick: [{ label: 'Преимущество', value: 'Взять больший к20' }, { label: 'Помеха', value: 'Взять меньший к20' }, { label: 'Вместе', value: 'Взаимно отменяются' }],
    terms: ['преимущество', 'помеха', 'к20', 'бросок атаки'],
    details: ['Преимущество и помеха применяются к броскам атаки, проверкам характеристик и спасброскам. Несколько источников преимущества не дают бросать больше двух костей.', 'Если у броска одновременно есть хотя бы одно преимущество и хотя бы одна помеха, они отменяют друг друга.'],
    play: 'Это главный инструмент для учёта позиции, видимости, помощи, состояния цели и условий боя без длинных списков малых модификаторов.'
  }),
  makeRule({
    slug: 'handling-mobs',
    title: 'Управление толпами',
    titleEn: 'Handling Mobs',
    icon: 'mobs',
    source: 'DMG',
    group: 'core',
    groupTitle: core,
    summary: 'Правило толп помогает быстро определить, сколько существ из большой группы попадает по цели без броска за каждого участника.',
    quick: [{ label: 'Для кого', value: 'Большие группы' }, { label: 'Метод', value: 'Средняя вероятность' }, { label: 'Экономит', value: 'Время боя' }],
    terms: ['толпа', 'КД', 'бросок атаки'],
    details: ['Мастер сравнивает бонус атаки существ с КД цели и определяет, сколько атак в среднем нужно для одного попадания.', 'После этого группа атакующих превращается в ожидаемое число попаданий, что ускоряет сцены с множеством слабых противников.'],
    play: 'Лучше всего работает, когда десятки одинаковых существ атакуют одну или несколько целей, а индивидуальная судьба каждого броска не важна.'
  }),
  makeRule({
    slug: 'damage-by-level-and-severity',
    title: 'Урон по уровню и серьезности',
    titleEn: 'Damage by Level and Severity',
    icon: 'severity',
    source: 'ScDun',
    group: 'core',
    groupTitle: core,
    summary: 'Таблица урона по уровню и серьёзности помогает подобрать опасность сцены под уровень персонажей.',
    quick: [{ label: 'Назначение', value: 'Импровизация урона' }, { label: 'Масштаб', value: 'Уровень персонажей' }, { label: 'Серьёзность', value: 'Лёгкая, средняя, смертельная' }],
    terms: ['урон', 'уровень', 'опасность', 'Сл'],
    details: ['Если ловушка, обвал, кислота, магический выброс или другая опасность не имеет готового урона, Мастер выбирает уровень группы и серьёзность угрозы.', 'Такой подход помогает держать опасность ощутимой, но не случайно уничтожать персонажей неподходящим числом костей.'],
    play: 'Используйте таблицу как ориентир, а не как жёсткую формулу: предупреждение, возможность избежать угрозы и последствия провала важны не меньше цифр.'
  }),
  makeRule({
    slug: 'immunity',
    title: 'Иммунитет к урону',
    titleEn: 'Immunity',
    icon: 'immunity',
    source: 'MM',
    group: 'damage-modifiers',
    groupTitle: modifiers,
    summary: 'Иммунитет означает, что существо не получает урон указанного типа.',
    quick: [{ label: 'Эффект', value: 'Урон становится 0' }, { label: 'Работает против', value: 'Указанного типа' }, { label: 'Смотреть', value: 'Блок характеристик' }],
    terms: ['иммунитет', 'тип урона', 'сопротивление'],
    details: ['Если существо имеет иммунитет к типу урона, весь урон этого типа игнорируется. Остальные типы урона в том же эффекте применяются отдельно.', 'Иммунитет сильнее сопротивления и уязвимости: для указанного типа урона итог остаётся нулевым.'],
    play: 'Иммунитет должен сразу быть заметен игрокам через описание: огонь гаснет на коже, яд не действует, клинок не оставляет следа.'
  }),
  makeRule({
    slug: 'resistance',
    title: 'Сопротивление',
    titleEn: 'Resistance',
    icon: 'resistance',
    source: 'PHB',
    group: 'damage-modifiers',
    groupTitle: modifiers,
    summary: 'Сопротивление уменьшает урон указанного типа вдвое после применения остальных модификаторов.',
    quick: [{ label: 'Эффект', value: 'Половина урона' }, { label: 'Округление', value: 'Вниз' }, { label: 'Тип', value: 'Указан в правиле' }],
    terms: ['сопротивление', 'тип урона', 'округление'],
    details: ['Если цель получает урон типа, к которому у неё есть сопротивление, итоговый урон делится пополам. В D&D дроби обычно округляются вниз.', 'Несколько сопротивлений к одному типу урона не складываются.'],
    play: 'Сопротивление удобно показывать короткой плашкой рядом с типом урона, потому что оно часто меняет расчёт после попадания.'
  }),
  makeRule({
    slug: 'vulnerability',
    title: 'Уязвимость',
    titleEn: 'Vulnerability',
    icon: 'vulnerability',
    source: 'PHB',
    group: 'damage-modifiers',
    groupTitle: modifiers,
    summary: 'Уязвимость удваивает урон указанного типа после применения остальных модификаторов.',
    quick: [{ label: 'Эффект', value: 'Урон ×2' }, { label: 'Тип', value: 'Указан в правиле' }, { label: 'Редкость', value: 'Встречается нечасто' }],
    terms: ['уязвимость', 'тип урона', 'сопротивление'],
    details: ['Если у цели есть уязвимость к типу урона, она получает вдвое больше урона этого типа.', 'Если в одном эффекте есть несколько типов урона, каждый тип рассчитывается отдельно.'],
    play: 'Уязвимость создаёт сильную награду за подготовку: знание слабости врага может резко изменить тактику группы.'
  }),
  makeRule({
    slug: 'massive-damage',
    title: 'Массивный урон',
    titleEn: 'Massive Damage',
    icon: 'massive',
    source: 'DMG',
    group: 'optional',
    groupTitle: optional,
    summary: 'Опциональное правило: очень большой урон за один раз может вызвать дополнительный шок и травму.',
    quick: [{ label: 'Правило', value: 'Опциональное' }, { label: 'Триггер', value: 'Большой урон за раз' }, { label: 'Последствие', value: 'Шок или осложнение' }],
    terms: ['опциональное правило', 'Телосложение', 'травма'],
    details: ['Мастер может использовать это правило, если хочет, чтобы особенно мощные удары ощущались опаснее простой потери хитов.', 'Обычно после большого урона требуется спасбросок или бросок по таблице последствий. Конкретный вариант зависит от выбранной версии правила.'],
    play: 'Подходит для более суровой кампании. Перед использованием лучше предупредить игроков, потому что правило меняет ожидания от боёв.'
  }),
  makeRule({
    slug: 'cleaving-through-creatures',
    title: 'Прорубание сквозь врагов',
    titleEn: 'Cleaving Through Creatures',
    icon: 'cleave',
    source: 'DMG',
    group: 'optional',
    groupTitle: optional,
    summary: 'Опциональное правило: избыток урона после уничтожения существа может перейти на другую цель рядом.',
    quick: [{ label: 'Правило', value: 'Опциональное' }, { label: 'Триггер', value: 'Лишний урон' }, { label: 'Цель', value: 'Существо рядом' }],
    terms: ['опциональное правило', 'урон', 'атака'],
    details: ['Если атака снижает существо до 0 хитов, а урон превышает нужное значение, Мастер может разрешить перенести остаток на другую подходящую цель.', 'Обычно это работает для рукопашных атак по слабым существам, стоящим рядом, и помогает героям быстрее проходить через толпы.'],
    play: 'Правило делает сражения с множеством миньонов более кинематографичными, но его стоит применять последовательно.'
  }),
  makeRule({
    slug: 'bludgeoning',
    title: 'Дробящий',
    titleEn: 'Bludgeoning',
    icon: 'bludgeoning',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Дробящий урон возникает от ударов, падений, давления и тупого оружия.',
    quick: [{ label: 'Тип', value: 'Физический' }, { label: 'Примеры', value: 'Молот, дубина, падение' }],
    terms: ['дробящий урон', 'оружие', 'падение'],
    details: ['Этот тип часто связан с молотами, дубинами, кулаками, обвалами, падением и ударами тяжёлых объектов.', 'Многие существа имеют сопротивление или иммунитет к немагическому дробящему урону.']
  }),
  makeRule({
    slug: 'thunder',
    title: 'Звук',
    titleEn: 'Thunder',
    icon: 'thunder',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Урон звуком представляет разрушительную ударную волну, гром или вибрацию.',
    quick: [{ label: 'Тип', value: 'Энергия' }, { label: 'Примеры', value: 'Гром, ударная волна' }],
    terms: ['урон звуком', 'заклинание', 'волна'],
    details: ['Звуковой урон не обязательно связан со слышимостью обычным образом: это может быть магическая вибрация, резонанс или волна силы.', 'Он часто применяется к объектам, стеклу, камню и существам, чувствительным к громким эффектам.']
  }),
  makeRule({
    slug: 'radiant',
    title: 'Излучение',
    titleEn: 'Radiant',
    icon: 'radiant',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Урон излучением связан со священной силой, звёздным светом или чистой обжигающей энергией.',
    quick: [{ label: 'Тип', value: 'Энергия' }, { label: 'Темы', value: 'Свет, святость, звёзды' }],
    terms: ['урон излучением', 'нежить', 'заклинание'],
    details: ['Излучение часто встречается у божественной магии, ангельских сил, солнечного света и эффектов, вредящих нежити.', 'Художественно оно может выглядеть как белое пламя, луч света, сияние рун или космический жар.']
  }),
  makeRule({
    slug: 'improvised-damage',
    title: 'Импровизированный урон',
    titleEn: 'Improvised Damage',
    icon: 'improvised',
    source: 'DMG',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Импровизированный урон помогает быстро назначить последствия необычной опасности без готового правила.',
    quick: [{ label: 'Назначение', value: 'Быстро оценить урон' }, { label: 'Основа', value: 'Опасность сцены' }, { label: 'Решает', value: 'Мастер' }],
    terms: ['импровизация', 'урон', 'опасность'],
    details: ['Если персонаж попал под падающую люстру, взрыв алхимии, пресс, поток лавы или другую уникальную угрозу, Мастер выбирает урон по масштабу опасности.', 'Важно учитывать предупреждение, шанс избежать угрозы и то, насколько серьёзным должно быть последствие.']
  }),
  makeRule({
    slug: 'acid',
    title: 'Кислота',
    titleEn: 'Acid',
    icon: 'acid',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Кислотный урон разъедает плоть, металл, камень или другие материалы.',
    quick: [{ label: 'Тип', value: 'Энергия / вещество' }, { label: 'Примеры', value: 'Слизь, кислота, желудочный сок' }],
    terms: ['кислотный урон', 'предметы', 'слизь'],
    details: ['Кислота часто продолжает быть опасной после контакта, если эффект так описан.', 'Она хорошо подходит для слизи, алхимических веществ, ловушек, чудовищных желудков и едких испарений.']
  }),
  makeRule({
    slug: 'piercing',
    title: 'Колющий',
    titleEn: 'Piercing',
    icon: 'piercing',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Колющий урон наносят острые наконечники, зубы, стрелы, копья и шипы.',
    quick: [{ label: 'Тип', value: 'Физический' }, { label: 'Примеры', value: 'Копьё, стрела, укус' }],
    terms: ['колющий урон', 'оружие', 'укус'],
    details: ['Колющий урон часто связан с точечным пробитием защиты.', 'Он встречается у стрелкового оружия, копий, кинжалов, клыков, жала, шипов и ловушек.']
  }),
  makeRule({
    slug: 'necrotic',
    title: 'Некротическая энергия',
    titleEn: 'Necrotic',
    icon: 'necrotic',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Некротический урон иссушает жизненную силу, ткани и душевную энергию.',
    quick: [{ label: 'Тип', value: 'Магическая энергия' }, { label: 'Темы', value: 'Смерть, увядание, нежить' }],
    terms: ['некротический урон', 'нежить', 'жизненная сила'],
    details: ['Такой урон часто встречается у нежити, проклятий, тёмной магии и сил, связанных со смертью.', 'В описании он может выглядеть как почернение кожи, холодное увядание, серый пепел или вытягивание жизни.']
  }),
  makeRule({
    slug: 'fire',
    title: 'Огонь',
    titleEn: 'Fire',
    icon: 'fire',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Огненный урон возникает от пламени, жара, лавы и многих заклинаний.',
    quick: [{ label: 'Тип', value: 'Энергия' }, { label: 'Примеры', value: 'Пламя, лава, взрыв' }],
    terms: ['огненный урон', 'горение', 'заклинание'],
    details: ['Огонь может поджигать предметы, если эффект или сцена это допускают.', 'Это один из самых распространённых типов урона, поэтому сопротивления к нему встречаются довольно часто.']
  }),
  makeRule({
    slug: 'psychic',
    title: 'Психическая энергия',
    titleEn: 'Psychic',
    icon: 'psychic',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Психический урон атакует разум, восприятие, память или личность существа.',
    quick: [{ label: 'Тип', value: 'Ментальная энергия' }, { label: 'Цель', value: 'Разум' }],
    terms: ['психический урон', 'разум', 'очарование'],
    details: ['Этот тип урона часто связан с псионикой, аберрациями, кошмарами, проклятиями и ментальными заклинаниями.', 'Существа без разума или с особыми иммунитетами могут быть защищены от таких эффектов.']
  }),
  makeRule({
    slug: 'slashing',
    title: 'Рубящий',
    titleEn: 'Slashing',
    icon: 'slashing',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Рубящий урон наносят клинки, когти, топоры и другие режущие поверхности.',
    quick: [{ label: 'Тип', value: 'Физический' }, { label: 'Примеры', value: 'Меч, топор, когти' }],
    terms: ['рубящий урон', 'оружие', 'когти'],
    details: ['Рубящий урон часто означает порезы, рассечения и разрывы.', 'Он распространён у оружия ближнего боя, природных атак и ловушек с лезвиями.']
  }),
  makeRule({
    slug: 'force',
    title: 'Силовое поле',
    titleEn: 'Force',
    icon: 'force',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Силовой урон представляет чистую магическую энергию, ударяющую по цели напрямую.',
    quick: [{ label: 'Тип', value: 'Чистая магия' }, { label: 'Примеры', value: 'Магические снаряды, поле силы' }],
    terms: ['силовой урон', 'магия', 'заклинание'],
    details: ['Силовой урон редко связан с обычной стихией или материалом, поэтому защиты от него встречаются нечасто.', 'В описании это может быть невидимый удар, мерцающий снаряд, импульс или сжатие пространства.']
  }),
  makeRule({
    slug: 'cold',
    title: 'Холод',
    titleEn: 'Cold',
    icon: 'cold',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Холодный урон возникает от мороза, льда, магического холода и лишения тепла.',
    quick: [{ label: 'Тип', value: 'Энергия' }, { label: 'Примеры', value: 'Лёд, мороз, дыхание дракона' }],
    terms: ['холодный урон', 'мороз', 'сопротивление'],
    details: ['Холод может замедлять, покрывать инеем, ломать хрупкие предметы и создавать опасную среду, если сцена это поддерживает.', 'Многие существа северных, подземных или стихийных регионов имеют защиту от холода.']
  }),
  makeRule({
    slug: 'lightning',
    title: 'Электричество',
    titleEn: 'Lightning',
    icon: 'lightning',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Урон электричеством возникает от молний, разрядов и заряженной магии.',
    quick: [{ label: 'Тип', value: 'Энергия' }, { label: 'Примеры', value: 'Молния, разряд, буря' }],
    terms: ['урон электричеством', 'заклинание', 'буря'],
    details: ['Электричество может быть природным или магическим. В некоторых сценах вода, металл и погода могут менять описание или распространение эффекта.', 'Если правило не говорит иначе, тип урона сам по себе не добавляет дополнительных условий.']
  }),
  makeRule({
    slug: 'poison',
    title: 'Яд',
    titleEn: 'Poison',
    icon: 'poison',
    source: 'MM',
    group: 'damage-types',
    groupTitle: types,
    summary: 'Урон ядом отражает токсины, отравленные раны, газы, укусы и вредные вещества.',
    quick: [{ label: 'Тип', value: 'Токсин' }, { label: 'Часто', value: 'Связан с состоянием отравления' }],
    terms: ['яд', 'отравление', 'Телосложение'],
    details: ['Урон ядом и состояние отравления — разные вещи: эффект может наносить яд без состояния или накладывать состояние без прямого урона.', 'Многие конструкты, нежить и особые существа имеют иммунитет к яду или состоянию отравления.']
  })
]

export const DAMAGE_ATTACK_RULE_BY_SLUG_5E = Object.fromEntries(DAMAGE_ATTACK_RULES_5E.map(rule => [rule.slug, rule]))

export const DAMAGE_ATTACK_GROUPS_WITH_RULES_5E = DAMAGE_ATTACK_RULE_GROUPS_5E.map(group => ({
  ...group,
  rules: group.items.map(slug => DAMAGE_ATTACK_RULE_BY_SLUG_5E[slug]).filter(Boolean)
}))

export function damageAttackRulePath(slug) {
  return `/dnd5e/screens/damage_and_attack/${slug}`
}
