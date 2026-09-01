// Контракт сущности лора: что обязано быть у любой статьи справочника,
// откуда бы она ни пришла — из свода Башни Мафраш, из кампании или из досье.
//
// Это единственное описание формы. По нему статья приводится к общему виду
// (`normalizeLoreEntity`) и по нему же проверяется — `scripts/validate-lore.mjs`.
// Если появляется новое поле, его добавляют здесь, а не в трёх местах.

// Вид сущности — что это такое. Отвечает на вопрос «что», а не «какое»:
// свойства живут в метках (`tags`). Восемь категорий глоссария остаются
// крупной навигацией, вид уточняет её внутри.
export const LORE_ENTITY_TYPES = [
  { id: 'concept', title: 'Понятие', category: 'foundations' },
  { id: 'deity', title: 'Божество', category: 'foundations' },
  { id: 'religion', title: 'Вера', category: 'foundations' },
  { id: 'people', title: 'Народ', category: 'beings' },
  { id: 'creature', title: 'Существо', category: 'beings' },
  { id: 'character', title: 'Лицо', category: 'characters' },
  { id: 'region', title: 'Земли', category: 'places' },
  { id: 'settlement', title: 'Поселение', category: 'places' },
  { id: 'location', title: 'Место', category: 'places' },
  { id: 'state', title: 'Держава', category: 'powers' },
  { id: 'organization', title: 'Сообщество', category: 'powers' },
  { id: 'title', title: 'Сан', category: 'powers' },
  { id: 'era', title: 'Эпоха', category: 'history' },
  { id: 'event', title: 'Событие', category: 'history' },
  { id: 'item', title: 'Предмет', category: 'practices' },
  { id: 'magic', title: 'Магия', category: 'practices' },
  { id: 'resource', title: 'Материал', category: 'practices' },
  { id: 'custom', title: 'Обычай', category: 'culture' },
  { id: 'language', title: 'Язык', category: 'culture' },
]

// Статус знания — насколько твёрдо стоит утверждение статьи в целом.
// Выводится из свидетельств, а не вводится руками: у кампании статус каждого
// утверждения известен точно, и статья не может быть твёрже сильнейшего из них.
export const LORE_ENTITY_STATUSES = [
  { id: 'canon', title: 'Канон', short: 'Свод мира или подтверждённый факт' },
  { id: 'scene-canon', title: 'Канон сцены', short: 'Установлено в игре' },
  { id: 'legend', title: 'Поверье', short: 'Во что верят, а не что доказано' },
  { id: 'unconfirmed', title: 'Не подтверждено', short: 'Намёк или догадка' },
  { id: 'empty', title: 'Без толкования', short: 'Имя есть, статьи ещё нет' },
]

const TYPE_IDS = new Set(LORE_ENTITY_TYPES.map(item => item.id))
const STATUS_IDS = new Set(LORE_ENTITY_STATUSES.map(item => item.id))

export const LORE_ENTITY_SCHEMA = {
  version: 1,
  fields: {
    id: { type: 'slug', required: true, unique: true },
    type: { type: 'enum', required: true, values: TYPE_IDS },
    title: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    status: { type: 'enum', required: true, values: STATUS_IDS },
    sources: { type: 'string[]', required: true, minItems: 1 },
    aliases: { type: 'string[]' },
    tags: { type: 'string[]' },
    era: { type: 'string[]' },
    region: { type: 'string[]' },
  },
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Сильнейшее свидетельство задаёт статус статьи: одно «факт мира» делает её
// каноном, а если есть только намёки — она остаётся неподтверждённой.
const CLAIM_STATUS_RANK = {
  'world-fact': 'canon',
  event: 'canon',
  'scene-canon': 'scene-canon',
  belief: 'legend',
  'gm-hint': 'unconfirmed',
  unconfirmed: 'unconfirmed',
  profile: 'canon',
}
const STATUS_ORDER = ['canon', 'scene-canon', 'legend', 'unconfirmed', 'empty']

export function loreEntityStatus(entry) {
  // Свод Башни Мафраш — это и есть канон мира.
  if ((entry.sources || []).includes('threads-of-unseen')) return 'canon'
  const claims = entry.ogni?.claims || []
  if (!claims.length) return entry.ogni?.stub === false ? 'scene-canon' : 'empty'
  let best = 'empty'
  for (const claim of claims) {
    const status = CLAIM_STATUS_RANK[claim.status] || 'unconfirmed'
    if (STATUS_ORDER.indexOf(status) < STATUS_ORDER.indexOf(best) || best === 'empty') best = status
  }
  return best
}

// ——— Определение вида ———
//
// Вид выводится, а не размечается руками: 424 статьи пришли из двух сводов,
// и переразмечать их вручную значит обречь себя на это же при каждом сезоне.
// Сигналы, от сильного к слабому: ручное исключение, вид досье, ключевые слова
// в названии и толковании, категория статьи.

// Исключения. Сюда попадает то, что правила разбирают неверно, — по одной
// строке на статью, вместо переразметки всего свода.
const TYPE_OVERRIDES = {
  iskra: 'concept',
  vual: 'concept',
  izir: 'concept',
  esha: 'concept',
  kolybel: 'concept',
  'serdtse-kolybeli': 'location',
  'kuznya-sudby': 'location',
  purush: 'deity',
  sadhiyary: 'deity',
  morhory: 'people',
  ehornury: 'people',
  narekateli: 'religion',
  obyatie: 'event',
  zugrul: 'deity',
  magusy: 'organization',
  traditsii: 'custom',
  'dalnie-chertogi': 'location',
  ner: 'concept',
  graar: 'deity',
  'belyy-prorok': 'deity',
  'bashnya-mafrash': 'organization',
  // Пантеон: свод богов прямо называет их божествами, правила ошибались.
  'vechny-zmey': 'deity',
  'mal-aa': 'deity',
  ulungury: 'deity',
  zvezdy: 'deity',
  bihor: 'deity',
  gendin: 'deity',
  urma: 'deity',
  eril: 'deity',
  narar: 'deity',
  raran: 'deity',
  salbar: 'deity',
  'bat-rina': 'deity',
  ir: 'deity',
  'hada-ra': 'deity',
  uktee: 'deity',
  zhark: 'deity',
  'ay-anga': 'deity',
  salhi: 'deity',
  igeros: 'deity',
  chidkur: 'deity',
  indrar: 'deity',
  zariy: 'deity',
  'dom-ra': 'organization',
  // Три луны и три солнца — светила пантеона, а не отвлечённые понятия.
  ula: 'deity',
  azrak: 'deity',
  manu: 'deity',
  eri: 'deity',
  dayya: 'deity',
  // Линии Силы — устройство мира, а не вера; «учение медресе» сбивало правило.
  'linii-sily': 'concept',
  mhur: 'concept',
  // Саны и должности — свой вид.
  'verhovnyy-belyy-otets': 'title',
  'velikiy-agha': 'title',
  'stepnoy-tigr': 'title',
  vizir: 'title',
  // Народы, у которых в толковании нет слова «народ».
  mrakoglazy: 'people',
  chotgory: 'people',
  lyudi: 'people',
  // Боги кочевников: пути снега и льда названы путями, а не божествами.
  'kas-ak': 'deity',
  'myo-ey': 'deity',
  'snezhnyy-otets': 'deity',
  'ledyanaya-mat': 'deity',
  // Звезда судьбы удришей — понятие, а не светило; спящий бог в толковании
  // Колеса Судьбы сбивал правило точно так же.
  'mel-ozar': 'character',
  narmesh: 'concept',
  'koleso-sudby': 'concept',
  // Места и державы, которые правила разобрали по случайному слову.
  uatana: 'region',
  obo: 'location',
  'zolotaya-yurta': 'location',
  'dyunnoe-tsarstvo': 'state',
  'propast-snov': 'location',
  razar: 'organization',
  'kostyanye-providtsy': 'organization',
  // «Время Королей»: отряд — не орден, логово — не крепость, а год — не событие.
  'vsadniki-shamasa': 'organization',
  'logovo-vsadnikov': 'location',
  'pochtovoe-derevo': 'location',
  'shpil-zur': 'location',
  'god-krasnogo-varana': 'era',
  'koren-chumy': 'resource',
  // Ремёсла и вещи.
  'tanets-vetra': 'magic',
  indigo: 'resource',
  'korona-udrishey': 'item',
}

// Начало названия — сигнал сильнее ключевых слов в толковании: «Алтарь многих
// богов» это место, а не божество, сколько бы богов ни упоминалось дальше.
const TITLE_HINTS = [
  ['item', /^(маск|кинжал|амулет|кулон|посох|меч|копь|топор|глеф|арбалет|колокол|рубин|опал|камен|кристалл|свит|печат|монет|клинок|кадил|ошейник|статуэтк|чаш|сосуд|флакон|колб|столб|обломк|осколк)/i],
  ['location', /^(алтар|храм|гаван|шахт|пещер|озер|река|поместь|арен|лаборатори|врат|колодец|ям[аы]|руин|святилищ|некропол|дворец|тюрьм|карцер)/i],
  ['character', /^(отец |бабка |старейшина |король |князь |вождь )/i],
]

// Правила читаются сверху вниз внутри своей категории; первое совпадение
// побеждает. `default` срабатывает, когда не подошло ничто.
const TYPE_RULES = {
  foundations: [
    // Границу слова здесь не поставить через : в JS он работает по латинице,
    // и «бог» в русском тексте не находился вовсе.
    ['deity', /(^|[^а-яё])бог[аиеуо]?(?![а-яё])|божеств|садхияр|улунгур|покровител|звезда|светил/i],
    ['religion', /культ|вера|веры|учение|обряд|жрец|жриц|орден/i],
    ['default', 'concept'],
  ],
  beings: [
    ['people', /народ|племя|раса|клан[ыа]? |выходц|жител[и]|потомк/i],
    ['default', 'creature'],
  ],
  characters: [['default', 'character']],
  places: [
    ['settlement', /город|стоянк|поселени|посёлок|поселок|селени|крепост|порт|застав/i],
    ['region', /земл|област|край|холм|пустын|горы|гор[ае]|долин|континент|побережь|степ|лес[а]?\b|остров/i],
    ['default', 'location'],
  ],
  powers: [
    ['state', /импери|султанат|ханств|королевств|держав|союз|совет городов|каганат/i],
    ['religion', /культ|орден|вера|церков|жрец|нарекател/i],
    ['default', 'organization'],
  ],
  history: [
    ['era', /эпох|время|век[а]?\b|летопис/i],
    ['default', 'event'],
  ],
  practices: [
    ['resource', /материал|руда|металл|шёлк|шелк|трав[аы]|ресурс|добыва|ткан[ьи]/i],
    ['magic', /магия|магич|заклин|ритуал|обряд|одержим|плетени|узелков|шаманск|способност/i],
    ['default', 'item'],
  ],
  culture: [
    ['language', /язык|наречи|письменност|руны|(^|[^а-яё])говор/i],
    ['default', 'custom'],
  ],
}

const DOSSIER_TYPE = { race: 'people', pantheon: 'deity', faction: 'organization' }

export function loreEntityType(entry, dossierKind = '') {
  if (TYPE_OVERRIDES[entry.id]) return TYPE_OVERRIDES[entry.id]

  // Вид досье надёжнее ключевых слов: «Змееобразные метисы болот Уатаны» —
  // это народ, хотя слова «народ» в толковании нет.
  const kind = dossierKind || entry.dossierKind
  if (kind === 'race') return DOSSIER_TYPE.race

  const title = entry.term || ''
  for (const [type, test] of TITLE_HINTS) {
    if (test.test(title)) return type
  }

  const rules = TYPE_RULES[entry.category]
  if (!rules) return 'concept'

  const haystack = `${title} ${entry.definition || ''}`
  for (const [type, test] of rules) {
    if (type === 'default') continue
    if (test instanceof RegExp && test.test(haystack)) return type
  }

  // Досье знает вид точнее ключевых слов, но не точнее прямого исключения.
  if (DOSSIER_TYPE[kind]) return DOSSIER_TYPE[kind]

  const fallback = rules.find(([type]) => type === 'default')
  return fallback ? fallback[1] : 'concept'
}

// Метки описывают свойства статьи, а не её вид: вид — это `type`.
export function loreEntityTags(entry) {
  const tags = new Set()
  if (entry.ogni) {
    tags.add('огни')
    if (entry.ogni.hero) tags.add('спутник')
    if (entry.ogni.season) tags.add(`сезон-${entry.ogni.season}`)
  }
  if ((entry.sources || []).includes('threads-of-unseen')) tags.add('башня-мафраш')
  if (entry.history) tags.add(entry.history)
  return [...tags]
}

/**
 * Приводит статью к контракту, не ломая полей, которыми пользуется интерфейс:
 * `term`, `definition` и `category` остаются как есть.
 */
export function normalizeLoreEntity(entry, dossierKind = '') {
  return {
    ...entry,
    type: loreEntityType(entry, dossierKind),
    title: entry.term,
    summary: entry.definition,
    status: loreEntityStatus(entry),
    tags: loreEntityTags(entry),
    era: entry.history ? [entry.history] : [],
    region: entry.region || [],
    aliases: entry.aliases || [],
    sources: entry.sources || [],
  }
}
