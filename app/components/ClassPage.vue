<script setup>
import { SPELLS_5E, SPELL_LEVELS, SPELL_SCHOOLS, SPELL_TAGS, SPELL_SOURCES } from '~/data/spells5e.js'

const props = defineProps(['vm', 'state'])
const emit = defineEmits(['up'])

// ---- Thread spark that slowly trails the cursor along the rail ----------
// A single soft spark rides the left thread. It eases toward the cursor's
// vertical position (never snaps — always a slow, lazy follow), and as it
// drifts past a knot it briefly kindles it. Selecting tabs never touches it.
const classWrapRef = ref(null)
const classSparkRef = ref(null)
const FLARE_MS = 700
const sparkTimers = new Set()
let sparkRaf = null
let sparkRunning = false
let sparkTargetY = null
let sparkCurrentY = null
let sparkPrevY = null
let sparkStopped = false

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function kindle(el) {
  el.classList.add('is-lit')
  const id = window.setTimeout(() => { el.classList.remove('is-lit'); sparkTimers.delete(id) }, FLARE_MS)
  sparkTimers.add(id)
}

function threadNodeYs(wrap, wrapTop) {
  const ys = []
  const emblem = wrap.querySelector('.cls-emblem-box')
  if (emblem) { const r = emblem.getBoundingClientRect(); ys.push({ el: emblem, y: r.top - wrapTop + r.height / 2 }) }
  wrap.querySelectorAll('.cls-thread-node:not(.cls-feature-card)').forEach((n) => { const r = n.getBoundingClientRect(); ys.push({ el: n, y: r.top - wrapTop + 23 }) })
  return ys
}

function ensureSparkLoop() {
  if (sparkRunning || sparkStopped) return
  sparkRunning = true
  sparkRaf = requestAnimationFrame(sparkTick)
}

function sparkTick() {
  const wrap = classWrapRef.value
  const spark = classSparkRef.value
  if (!wrap || !spark) { sparkRunning = false; return }
  const wrapRect = wrap.getBoundingClientRect()
  const height = Math.max(wrapRect.height, 1)
  if (sparkTargetY == null) sparkTargetY = height * 0.14
  if (sparkCurrentY == null) { sparkCurrentY = sparkTargetY; sparkPrevY = sparkTargetY; spark.classList.add('is-live') }

  const diff = sparkTargetY - sparkCurrentY
  sparkCurrentY += diff * 0.05                         // медленный ленивый догон
  const y = Math.max(0, Math.min(height, sparkCurrentY))
  spark.style.transform = `translateY(${y}px) rotate(45deg)`

  // kindle knots the spark drifts past
  const lo = Math.min(sparkPrevY, y), hi = Math.max(sparkPrevY, y)
  if (hi - lo > 0.5) {
    for (const node of threadNodeYs(wrap, wrapRect.top)) {
      if (node.y >= lo && node.y <= hi) kindle(node.el)
    }
  }
  sparkPrevY = y

  if (Math.abs(diff) < 0.4) { sparkRunning = false; return }   // осел — стоп до движения курсора
  sparkRaf = requestAnimationFrame(sparkTick)
}

function onSparkPointerMove(e) {
  const wrap = classWrapRef.value
  if (!wrap) return
  const r = wrap.getBoundingClientRect()
  sparkTargetY = Math.max(0, Math.min(r.height, e.clientY - r.top))
  ensureSparkLoop()
}

onMounted(() => {
  if (typeof window === 'undefined' || reducedMotion()) return
  window.addEventListener('pointermove', onSparkPointerMove, { passive: true })
  ensureSparkLoop()
})

onBeforeUnmount(() => {
  sparkStopped = true
  if (typeof window !== 'undefined') {
    window.removeEventListener('pointermove', onSparkPointerMove)
    if (sparkRaf) cancelAnimationFrame(sparkRaf)
  }
  for (const id of sparkTimers) window.clearTimeout(id)
  sparkTimers.clear()
})

// ---- Right-edge scrubber -------------------------------------------------
// A diamond thumb on its own thread at the right edge. Drag it up/down to
// scroll the page. While it is held, the left-thread spark goes out and the
// flame burns on the thumb instead; on release the spark returns.
const classPageRef = ref(null)
const scrubTrackRef = ref(null)
const scrubDragging = ref(false)
const scrubRatio = ref(0)

function updateScrubFromScroll() {
  const el = classPageRef.value
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  scrubRatio.value = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0
}

function scrubApplyClientY(clientY) {
  const el = classPageRef.value
  const track = scrubTrackRef.value
  if (!el || !track) return
  const r = track.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (clientY - r.top) / Math.max(1, r.height)))
  scrubRatio.value = ratio
  el.scrollTop = ratio * (el.scrollHeight - el.clientHeight)
}

function onScrubDown(e) {
  scrubDragging.value = true
  scrubApplyClientY(e.clientY)
  e.currentTarget?.setPointerCapture?.(e.pointerId)
}
function onScrubMove(e) {
  if (!scrubDragging.value) return
  scrubApplyClientY(e.clientY)
}
function onScrubUp() { scrubDragging.value = false }

onMounted(() => {
  const el = classPageRef.value
  if (!el) return
  el.addEventListener('scroll', updateScrubFromScroll, { passive: true })
  updateScrubFromScroll()
})

onBeforeUnmount(() => {
  classPageRef.value?.removeEventListener('scroll', updateScrubFromScroll)
})

const duplicateArchetypeNames = computed(() => {
  const counts = new Map()
  for (const archetype of props.vm.classArchetypes || []) counts.set(archetype.name, (counts.get(archetype.name) || 0) + 1)
  return new Set([...counts].filter(([, count]) => count > 1).map(([name]) => name))
})

const SOURCE_FULL_NAMES = {
  PHB: 'Player’s Handbook',
  TCE: 'Tasha’s Cauldron of Everything',
  TLDC: 'The Threads of Lost Dice Club',
  TS: 'The Threads of Shkad',
  TJB: 'The Threads of JorasBashu',
  TU: 'The Threads of Unseen',
  TKK: 'TKK.club'
}

const SOURCE_URLS = {
  PHB: 'https://www.dndbeyond.com/sources/dnd/phb-2014',
  TCE: 'https://www.dndbeyond.com/sources/dnd/tcoe'
}

const CLASS_CARD_TABS = [
  { id: 'skills', label: 'Навыки' },
  { id: 'description', label: 'Описание' },
  { id: 'spells', label: 'Заклинания' },
  { id: 'filter', label: 'Фильтр' }
]

function sourceTitle(source, fullName = '') {
  const name = fullName || SOURCE_FULL_NAMES[source]
  return name ? `${source} - ${name}` : source
}

function classSourceTitle(source) {
  return sourceTitle(source, props.vm.classSourceFullNames?.[source])
}

function spellLevelName(level) {
  return SPELL_LEVELS[level] || `${level} уровень`
}

function spellSchoolName(school) {
  return SPELL_SCHOOLS[school] || school
}

function spellSourceTitle(source) {
  return SPELL_SOURCES[source] ? `${source} - ${SPELL_SOURCES[source]}` : sourceTitle(source)
}

function spellTagNames(tags = []) {
  return tags.map(tag => SPELL_TAGS[tag] || tag).filter(Boolean)
}

function isAnzuPatron(name) {
  return name === 'Потусторонний покровитель Анзу'
}

function featureParagraphs(text) {
  return String(text || '').split(/\n{2,}/).map(p => p.trim()).filter(Boolean)
}

const FEATURE_SECTION_TITLES = [
  'Гнев Ильбеша',
  'Разрушение укрытия',
  'Ул, Величайший Глад',
  'Ту, Глад Разума',
  'Хаз, Иссушающий Глад',
  'Юл, Жестокий Глад',
  'Кет, Смеющийся Глад',
  'Гог, Тихий Глад',
  'Продолжительный отдых',
  'Короткий отдых',
  'Дыхание Сумуга',
  'Могущество Древних',
  'Затронутый Вуалью',
  'Сияние Улунгуров',
  'Первозданный',
  'Бессмертная Искра',
  'Пожиратели',
  'Ограничения',
  'Правосудие Ула',
  'Власть Ту',
  'Утроба Хаза',
  'Жестокость Юл',
  'Дикость Кет',
  'Безмолвие Гог',
  'Количество использований',
  'Размер Кости Вуали',
  'Другие источники',
  'На Эфирном плане',
  'Возвращение',
  'Порыв Вуали',
  'Поглощение',
  'Преобразование',
  'Множитель цены, за который вы продаёте товар, равен: 2.',
  'Множитель цены, за который вы продаёте товар, равен: 3.',
  'Множитель цены, за который вы продаёте товар, равен: 4.',
  'Множитель цены, за который вы продаёте товар, равен: 5.',
  'Цена продажи',
  'Фразы силы',
  'Типы существ',
  'Слово Граара',
  'Слово Раагра',
  'Удар безмолвия',
  'Изрекание секрета',
  'Прилив',
  'Разжигание Искры',
  'Сокрушение',
  'Барьер Вуали',
  'Изгиб нити',
  'Шаг стихий',
  'Фальшивая жизнь',
  'Знание знамений',
  'Воля кочевника',
  'Пример',
  'Использование Кости Вуали',
  'Резонанс Вуали',
  'Мощь Вуали',
  'Заговоры',
  'Ячейки заклинаний',
  'Известные заклинания 1-го и более высоких уровней',
  'Базовая характеристика заклинаний',
  'Исполнение ритуалов',
  'Фокусировка заклинания',
  'Получение импланта',
  'Происхождение',
  'Создание импланта',
  'Вживление импланта',
  'Отторжение импланта',
  'Поддержание имплантов',
  'Использование имплантов в игре',
  'Каталог имплантов',
  'Проведение ритуала',
  'Успех',
  'Провал',
  'Магия Духов',
  'Цепной Дух',
  'Проклятые Кости',
  'Шаг Пустоты (Дух Пустоты)',
  'Хранящее Око Шамаса (Дух Шамаса)',
  'Благословляющий Свет (Дух Ману)',
  'Дух Инея (спокойствие, одиночество, задумчивость)',
  'Дух Красок (радость, праздник, счастье)',
  'Дух Воли (преодоление, боль)',
  'Дух Стали (решимость, уверенность)',
  'Дух Сновидений (сон, ночь, отдых)',
  'Дюнный огнеус',
  'Атака Явления',
  'Перемещение Явления',
  'Усиленное Явление',
  'Обо Гнева Акрепы (радиус 30 футов)',
  'Обо Милости Акрепы (радиус 50 футов)',
  'Обо Голода Акрепы (радиус 40 футов)',
  'Перенос обо',
  'Малый набор обо',
  'Песчаный хамелеон',
  'Создание Акрепы',
  'Странник дюнных рек',
  'Аура огня',
  'Песчаный круговорот',
  'Изменение положения',
  'Дюнная река',
  'Защита без доспеха',
  'Оружие покровителя',
  'Возмездие Укт’ээ',
  'Молот Мракоглазых',
  'Элегия Нулевого Факелоносца',
  'Надир сердца-пепельницы',
  'Обугленный хирд',
  'Зилот Испепелённой',
  'Защита',
  'Тактика стаи',
  'Расплавленный клинок',
  'Ожоги внутренней искры',
  'Плетение урона',
  'Печать Вуали',
  'Клинок Инферно',
  'Связь сознаний',
  'Влияние на Анзу',
  'Неугасающая жизнь',
  'Смена особого захвата',
  'Захват Анаконды',
  'Сохранение Искры',
  'Наложение нитей',
  'Извлечение Искры',
  'Цена урона',
  'Цена исцеления',
  'Вызов',
  'Воля золы',
  'Раж войны',
  'Ваш противник',
  'Зов Вуали',
  'Прилив/отлив Вуали',
  'Дух Крови (ярость, страх, боль, жизнь)',
  'Использование',
  'Количество имплантов',
  'Снижение риска отторжения',
  'Увеличение лимита имплантов',
  'Улучшенный лимит имплантов',
  'Малый патчфамильяр',
  'Средний патчфамильяр',
  'Большой патчфамильяр',
  'Развитие патчфамильяра',
  'Иджра',
  'Эффекты Слияния',
  'Цена Слияния',
  'Бросок имплантов'
]

function tableCells(line) {
  return String(line || '')
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim())
}

function isMarkdownTable(paragraph) {
  const lines = String(paragraph || '').split('\n').map(line => line.trim()).filter(Boolean)
  return lines.length >= 2
    && lines[0].startsWith('|')
    && /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?$/.test(lines[1])
}

function markdownTableBlock(paragraph) {
  const lines = String(paragraph || '').split('\n').map(line => line.trim()).filter(Boolean)
  return {
    type: 'table',
    headers: tableCells(lines[0]),
    rows: lines.slice(2).filter(line => line.includes('|')).map(tableCells)
  }
}

function isDiceLabel(text) {
  return /^[кd](?:4|6|8|10|12|20|100)$/i.test(String(text || '').trim())
}

function inlineParts(text) {
  const value = String(text || '')
  const parts = []
  const pattern = /(\*\*[^*\n]+\*\*|Гнев(?:а)? Ильбеша|(?:\d+)?[кd](?:4|6|8|10|12|20|100))/giu
  let lastIndex = 0
  for (const match of value.matchAll(pattern)) {
    const start = match.index || 0
    if (start > lastIndex) parts.push({ type: 'text', value: value.slice(lastIndex, start) })
    parts.push(match[0].startsWith('**')
      ? { type: 'bold', value: match[0].slice(2, -2) }
      : /^гнева? ильбеша$/iu.test(match[0])
        ? { type: 'link', value: match[0], href: '/dnd5e/wrath' }
        : { type: 'dice', value: match[0] })
    lastIndex = start + match[0].length
  }
  if (lastIndex < value.length) parts.push({ type: 'text', value: value.slice(lastIndex) })
  return parts
}

const featureTableRolls = reactive({})

function featureTableRollDefinition(featureName) {
  if (featureName === 'Откровение Эсхи') return { sides: 100, button: 'Бросить к100', result: 'Откровение' }
  if (featureName === 'Печати Вуали') return { sides: 6, button: 'Сгенерировать Печать', result: 'Печать' }
  return null
}

function tableRangeContains(value, roll) {
  const match = String(value || '').replace(/\s+/g, '').replace(/[–—−]/g, '-').match(/^(\d+)(?:-(\d+))?$/)
  if (!match) return false
  const from = Number(match[1])
  const to = Number(match[2] || match[1])
  return roll >= from && roll <= to
}

function isFeatureTableRollMatch(featureName, row) {
  const result = featureTableRolls[featureName]
  return Boolean(result && tableRangeContains(row?.[0], result.roll))
}

function rollFeatureTable(featureName, block, event) {
  const definition = featureTableRollDefinition(featureName)
  if (!definition) return
  const roll = 1 + Math.floor(Math.random() * definition.sides)
  const row = block.rows.find(item => tableRangeContains(item?.[0], roll))
  featureTableRolls[featureName] = {
    roll,
    label: definition.result,
    text: row?.slice(1).join(' · ') || 'Результат отсутствует в таблице.'
  }
  const wrap = event?.currentTarget?.closest('.cls-feature-table-wrap')
  nextTick(() => wrap?.querySelector('tr.is-roll-match')?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
}

const inlineDiceTimers = new Set()

function parseInlineDice(value) {
  const normalized = String(value || '').replace(/\s+/g, '').replace(/−/g, '-')
  const match = normalized.match(/^(\d+)?[кd](4|6|8|10|12|20|100)([+-]\d+)?$/iu)
  if (!match) return null
  return {
    count: Number(match[1] || 1),
    sides: Number(match[2]),
    modifier: Number(match[3] || 0)
  }
}

function rollInlineDice(target) {
  const dice = parseInlineDice(target.textContent)
  if (!dice) return

  const rolls = Array.from({ length: dice.count }, () => 1 + Math.floor(Math.random() * dice.sides))
  const total = rolls.reduce((sum, roll) => sum + roll, 0) + dice.modifier
  const formula = target.textContent.trim()
  let breakdown = rolls.join(' + ')
  if (dice.modifier) breakdown += dice.modifier > 0 ? ` + ${dice.modifier}` : ` − ${Math.abs(dice.modifier)}`

  target.dataset.roll = String(total)
  target.classList.add('is-rolled')
  target.title = `${formula}: ${breakdown} = ${total}`
  target.setAttribute('aria-label', `Бросок ${formula}: выпало ${total}. Нажмите, чтобы бросить снова`)

  const previousTimer = Number(target.dataset.rollTimer || 0)
  if (previousTimer) window.clearTimeout(previousTimer)
  const timer = window.setTimeout(() => {
    target.classList.remove('is-rolled')
    delete target.dataset.roll
    delete target.dataset.rollTimer
    target.setAttribute('aria-label', `Бросить ${formula}`)
    inlineDiceTimers.delete(timer)
  }, 2600)
  target.dataset.rollTimer = String(timer)
  inlineDiceTimers.add(timer)
}

function classDiceTarget(event) {
  const target = event.target instanceof Element ? event.target.closest('.cls-dice-token') : null
  return target && classWrapRef.value?.contains(target) ? target : null
}

function onClassDiceClick(event) {
  const target = classDiceTarget(event)
  if (target) rollInlineDice(target)
}

function onClassDiceKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const target = classDiceTarget(event)
  if (!target) return
  event.preventDefault()
  rollInlineDice(target)
}

function enhanceInlineDiceTokens() {
  classWrapRef.value?.querySelectorAll('.cls-dice-token').forEach((token) => {
    token.setAttribute('role', 'button')
    token.setAttribute('tabindex', '0')
    token.setAttribute('aria-label', `Бросить ${token.textContent.trim()}`)
    if (!token.title) token.title = 'Нажмите, чтобы бросить кубик'
  })
}

onMounted(() => nextTick(enhanceInlineDiceTokens))
onUpdated(() => nextTick(enhanceInlineDiceTokens))

onBeforeUnmount(() => {
  for (const timer of inlineDiceTimers) window.clearTimeout(timer)
  inlineDiceTimers.clear()
})

function splitFeatureLead(text) {
  const match = String(text || '').match(/^([^.!?…]{2,80}[.!?…])\s*(.*)$/u)
  if (!match) return { lead: '', rest: String(text || '') }
  return { lead: match[1], rest: match[2] }
}

const ROYAL_BLOOD_KINGS = new Set([
  'Тусус', 'Гулом', 'Фатза', 'Фахат', 'Ветомон',
  'Кхуджим', 'Му и Ло', 'Эктор', 'Сабара', 'Аегус'
])

function isRoyalBloodKing(value) {
  return ROYAL_BLOOD_KINGS.has(String(value || '').trim())
}

function highlightsListLead(featureName) {
  return [
    'Подчинение духа',
    'Диффузия духовного естества',
    'Покров песков',
    'Текучесть',
    'Пожирание Искры',
    'Возвышение',
    'Поглощающий облик',
    'Образ короля',
    'Королевский триумф',
    'Жизнь за жизнь',
    'Явление',
    'Узел',
    'Узор',
    'Превзойдя запреты',
    'Одержимость духом',
    'Источнение',
    'Единство с оружием',
    'Воля базаров',
    'Догматы Слова',
    'Воин Слова',
    'Догмы секретов',
    'Связующие секреты',
    'Хранитель секретов',
    'Принципы Пожирателя',
    'Божественный канал: Поглощённый враг',
    'Божественный канал: Пожирающая кара',
    'Ра’а',
    'Принципы нукера',
    'Путь кочевника',
    'Догматы Жнеца Имён',
    'Кость Вуали',
    'Жнец Имён',
    'Изменения плоти',
    'Божественный канал: Реликвии войны',
    'Божественный канал: Пар судьбы',
    'Металл жизни',
    'Сальбарит',
    'Живой металл',
    'Малые духи',
    'Средние духи',
    'Дополнительный предмет договора: Договор Костей',
    'Лик Сияния',
    'Лик Ужаса',
    'Лик Любви',
    'Лик Обличителя',
    'Гнев песков',
    'Опека Шаха Дюн',
    'Дары Акрепы',
    'Договор Цепи: дюнный огнеус',
    'Милостивое благословение, окровавленный песок',
    'Повелитель пустыни',
    'Приговор Укт’ээ',
    'Дополнительные таинственные воззвания',
    'Зилот Испепелённой',
    'Дары Огнерукой',
    'Чемпион Инферно',
    'Знания прошлой жизни',
    'Воля Анзу',
    'Вечный дозор',
    'Общая жизнь',
    'Змеиные захваты и броски',
    'Развитые змеиные приёмы',
    'Нить Ки',
    'Мастерские змеиные приёмы',
    'Совершенный змеиный приём',
    'Король Земли',
    'Техники пожирателей',
    'Поглощённый враг',
    'Пожирающая метка',
    'Неостановимый танец смерти',
    'Догматы Бесклыкого',
    'Тысячи глаз Галантара',
    'Догматы клятвы',
    'Божественный канал',
    'Воплощение Эсхи'
  ].includes(featureName)
}

function highlightsParagraphLead(featureName) {
  return [
    'Связь с оружием',
    'Заварщик судеб',
    'Сальбарит'
  ].includes(featureName)
}

function salbariteInfusionParts(text) {
  const value = String(text || '')
  const match = value.match(/^Требование:\s*([^.]+)\.\s*(.*)$/u)
  if (!match) return { level: '', item: '', text: value }

  const requirement = match[1].trim()
  const levelMatch = requirement.match(/^(\d+-й уровень)(?:\s+и\s+(.+))?$/u)
  const rawItem = levelMatch ? (levelMatch[2] || '') : requirement
  const item = rawItem.toLocaleLowerCase('ru') === 'нет'
    ? ''
    : rawItem.charAt(0).toLocaleUpperCase('ru') + rawItem.slice(1)

  return {
    level: levelMatch?.[1] || '',
    item,
    text: match[2].trim()
  }
}

function featureBlocks(text) {
  return featureParagraphs(text).map(paragraph => {
    if (isMarkdownTable(paragraph)) return markdownTableBlock(paragraph)
    const formula = paragraph.match(/^(КД|Сл(?: проверки| спасброск(?:а|ов)(?: [^=]+)?)?|Модификатор броска атаки)\s*=\s*(.+)$/i)
    if (formula) return { type: 'formula', label: formula[1], value: formula[2] }
    if (/^Например,/i.test(paragraph)) return { type: 'example', text: paragraph }
    const exactTitle = FEATURE_SECTION_TITLES.find(name => paragraph === name)
    if (exactTitle) return { type: 'section', title: exactTitle, text: '' }
    const title = FEATURE_SECTION_TITLES.find(name => paragraph.startsWith(`${name}. `))
    if (title) return { type: 'section', title, text: paragraph.slice(title.length + 2) }
    const lines = paragraph.split('\n').map(line => line.trim()).filter(Boolean)
    if (lines.length > 1 && isDiceLabel(lines[0]) && lines.slice(1).every(line => /^[-•]\s+/.test(line))) {
      return { type: 'diceGroup', die: lines[0].toLowerCase(), items: lines.slice(1).map(line => line.replace(/^[-•]\s+/, '')) }
    }
    if (isDiceLabel(paragraph)) return { type: 'diceHeading', die: paragraph.toLowerCase() }
    if (lines.length > 1 && lines.every(line => /^[-•]\s+/.test(line))) {
      return { type: 'list', items: lines.map(line => line.replace(/^[-•]\s+/, '')) }
    }
    return { type: 'paragraph', text: paragraph }
  })
}

function sourceRoute(source) {
  return SOURCE_URLS[source] || `/dnd5e/class-features?source=${encodeURIComponent(source || '')}`
}

function isExternalSource(source) {
  return !!SOURCE_URLS[source]
}

const featureSources = computed(() => [...new Set([
  ...(props.vm.classAllFeatures || props.vm.classFeatures).map(f => f.src),
  ...props.vm.classArchetypes.map(a => a.source),
  ...classSpellList.value.map(spell => spell.source)
].filter(Boolean))])
const featureLevels = computed(() => [...new Set((props.vm.classAllFeatures || props.vm.classFeatures).map(f => f.rank).filter(v => v !== 999))].sort((a, b) => a - b))
const activeClassTab = computed(() => ['skills', 'description', 'spells'].includes(props.state.classCardTab)
  ? props.state.classCardTab
  : 'skills'
)
const classSpellList = computed(() => {
  const className = props.vm.className
  const direct = SPELLS_5E.filter(spell => spell.classes?.includes(className))
  if (direct.length) return direct
  return SPELLS_5E.filter(spell => !spell.classes?.length || spell.classes.includes(className))
})
const sourceFilteredArchetypes = computed(() => props.vm.classArchetypes.filter(arch => {
  if (!props.state.classFilterTouched) return true
  return props.state.classFeatureSource === 'all' || arch.source === props.state.classFeatureSource
}))
const visibleClassArchetypes = computed(() => sourceFilteredArchetypes.value.filter(arch => {
  if (!props.state.classFilterTouched) return true
  if (props.state.classFeatureSubclass !== 'all' && props.state.classFeatureSubclass !== 'base' && arch.id !== props.state.classFeatureSubclass) return false
  if (props.state.classFeatureLevel !== 'all') {
    const hasLevelFeature = arch.features?.some(feature => String(feature.rank) === String(props.state.classFeatureLevel))
    const hasLevelSpells = arch.spells?.length && String(arch.level || '').match(/\d+/)?.[0] === String(props.state.classFeatureLevel)
    if (!hasLevelFeature && !hasLevelSpells) return false
  }
  return true
}))
const classSources = computed(() => {
  if (props.state.classFilterTouched && props.state.classFeatureSource !== 'all') {
    return [props.state.classFeatureSource]
  }
  if (props.vm.classHasSelectedArchetype) {
    return [props.vm.classSelectedArchetype.source].filter(Boolean)
  }
  return [...new Set(props.vm.classFeatures.map(f => f.src).filter(Boolean))]
})
const CLASS_BASE_SUMMARIES = {
  'Бард': 'Бард соединяет магию слова, музыку, знание и вдохновение. Он поддерживает союзников, влияет на ход сцены и гибко закрывает пробелы группы за счёт навыков и заклинаний.'
}
const activeBuildTitle = computed(() => props.vm.classHasSelectedArchetype
  ? `${props.vm.className}: ${props.vm.classSelectedArchetype.name}`
  : props.vm.className
)
const activeBuildSummary = computed(() => props.vm.classHasSelectedArchetype
  ? (props.vm.classSelectedArchetype.summary || 'Подкласс добавляет свои особенности к базовому развитию класса.')
  : (CLASS_BASE_SUMMARIES[props.vm.className] || 'Основная линия развития класса без дополнительных особенностей подкласса.')
)
const activeBuildMeta = computed(() => props.vm.classHasSelectedArchetype
  ? `${props.vm.classSelectedArchetype.level} · ${sourceTitle(props.vm.classSelectedArchetype.source, props.vm.classSelectedArchetype.sourceFullName)}`
  : `D&D 5e 2014 · ${visibleClassFeatures.value.length} умений`
)
const classQuickStats = computed(() => [
  { label: 'Кость хитов', value: `к${props.vm.classHd}`, part: 'overview' },
  { label: 'Спасброски', value: props.vm.classSaves, part: 'overview' },
  { label: 'Владения', value: props.vm.classArmor, part: 'overview' },
  { label: 'Умения', value: `${visibleClassFeatures.value.length}`, part: 'skills' }
])
const visibleClassFeatures = computed(() => {
  const classFeatures = props.vm.classFeatures || []
  const allFeatures = props.vm.classAllFeatures || classFeatures
  const filterByLevel = feature => props.state.classFeatureLevel === 'all'
    || String(feature.rank) === String(props.state.classFeatureLevel)

  if (!props.state.classFilterTouched) return classFeatures

  const subclass = props.state.classFeatureSubclass || 'base'
  return allFeatures.filter(feature => {
    if (!filterByLevel(feature)) return false
    if (!feature.isArchetype) return true
    if (subclass === 'base') return false
    if (subclass !== 'all' && feature.archetypeId !== subclass) return false
    if (props.state.classFeatureSource !== 'all' && feature.src !== props.state.classFeatureSource) return false
    return true
  })
})
const classDescription = computed(() => props.vm.classDescription || {
  title: props.vm.className,
  source: 'Описание класса',
  intro: [activeBuildSummary.value],
  sections: []
})
const visibleClassSpells = computed(() => classSpellList.value.filter(spell => {
  if (props.state.classFilterTouched && props.state.classFeatureSource !== 'all' && spell.source !== props.state.classFeatureSource) return false
  return true
}))
const itemRolls = reactive({})
const IMPLANT_BONES = [
  { key: 'bunti', value: 1, label: 'Бунти' },
  { key: 'ayur', value: 2, label: 'Аюр' },
  { key: 'dodor', value: 3, label: 'Додор' },
  { key: 'tahar', value: 4, label: 'Тахар' }
]

function itemRollKey(feature) {
  return feature.id || `${feature.name}-${feature.itemsTitle || ''}`
}

function itemRollResult(feature) {
  return itemRolls[itemRollKey(feature)] || null
}

function rollFeatureItem(feature) {
  const items = feature.items || []
  if (!items.length) return
  if (feature.itemsRollMode === 'implants-4d4') {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4) + 1)
    const counts = IMPLANT_BONES.reduce((acc, bone) => {
      acc[bone.key] = rolls.filter(value => value === bone.value).length
      return acc
    }, {})
    const index = items.findIndex(item => implantRollMatches(item, counts))
    const item = items[index] || items[0]
    itemRolls[itemRollKey(feature)] = {
      number: index >= 0 ? index + 1 : 1,
      item,
      dice: '4D4',
      rolls,
      counts
    }
    return
  }
  const index = Math.floor(Math.random() * items.length)
  itemRolls[itemRollKey(feature)] = {
    number: index + 1,
    item: items[index]
  }
}

function implantRollMatches(item, counts) {
  const itemCounts = item.roll?.counts || {}
  return IMPLANT_BONES.every(bone => Number(itemCounts[bone.key] || 0) === Number(counts[bone.key] || 0))
}

function implantBoneCount(item, bone) {
  return Number(item.roll?.counts?.[bone.key] || 0)
}

function implantActiveBones(item) {
  return IMPLANT_BONES.filter(bone => implantBoneCount(item, bone) > 0)
}

function implantRollCounts(result) {
  return IMPLANT_BONES.map(bone => ({
    ...bone,
    count: Number(result?.counts?.[bone.key] || 0)
  }))
}

function implantRollCombo(result) {
  return implantRollCounts(result)
    .filter(bone => bone.count)
    .map(bone => `${bone.count}x ${bone.label}`)
    .join(' · ')
}

function implantRollName(value) {
  return IMPLANT_BONES.find(bone => bone.value === value)?.label || value
}

function implantParts(text) {
  const lines = String(text || '').split('\n').map(line => line.trim()).filter(Boolean)
  const meta = []
  const levels = []
  const notes = []
  for (const line of lines) {
    if (/^(Кости|Характеристики|Тип|Бонус|Провал)\s*:?\s*$/i.test(line)) continue
    const level = line.match(/^Уровень\s+(\d+\+?)\s*:?\s*(.+)$/i)
    if (level) {
      levels.push({ level: `Уровень ${level[1]}`, text: level[2].trim() })
      continue
    }
    const metaLine = line.match(/^(Создание импланта|Получение импланта|Вживление импланта)\s*:?\s*(.*)$/i)
    if (metaLine) {
      meta.push({ label: metaLine[1], value: metaLine[2] || 'не указано' })
      continue
    }
    notes.push(line)
  }
  return { meta, levels, notes }
}

function selectClassTab(tab) {
  if (tab === 'filter') {
    props.state.classFilterOpen = true
    return
  }
  props.state.classCardTab = tab
}

function selectBase() {
  props.state.classMode = 'base'
  props.state.activeArchetype = null
  if (props.state.classFilterTouched) props.state.classFeatureSubclass = 'base'
}

function selectArchetype(id) {
  props.state.classMode = 'archetype'
  props.state.activeArchetype = id
  if (props.state.classFilterTouched) props.state.classFeatureSubclass = id
}

function toggleSubclass(id) {
  props.state.openSubclass = props.state.openSubclass === id ? null : id
}

function chooseFeatureSource(source) {
  props.state.classFilterTouched = true
  props.state.classFeatureSource = source
  if (source !== 'all' && props.state.classFeatureSubclass !== 'all' && props.state.classFeatureSubclass !== 'base') {
    const archetype = props.vm.classArchetypes.find(arch => arch.id === props.state.classFeatureSubclass)
    if (!archetype || archetype.source !== source) props.state.classFeatureSubclass = 'base'
  }
  if (source !== 'all' && props.state.activeArchetype) {
    const activeArchetype = props.vm.classArchetypes.find(arch => arch.id === props.state.activeArchetype)
    if (!activeArchetype || activeArchetype.source !== source) selectBase()
  }
}

function chooseFeatureLevel(level) {
  props.state.classFilterTouched = true
  props.state.classFeatureLevel = String(level)
}

function chooseFeatureSubclass(id) {
  props.state.classFilterTouched = true
  props.state.classFeatureSubclass = id
  if (id === 'base') selectBase()
  else if (id !== 'all') selectArchetype(id)
}

function resetFeatureFilters() {
  props.state.classFeatureSource = 'all'
  props.state.classFeatureLevel = 'all'
  props.state.classFeatureSubclass = 'base'
  props.state.classFilterTouched = false
  selectBase()
}

async function copyClassLink() {
  if (typeof window === 'undefined') return
  const url = window.location.href
  if (navigator?.clipboard?.writeText) await navigator.clipboard.writeText(url)
  props.state.classToolMessage = 'Ссылка скопирована'
}

function bookmarkClass() {
  const label = props.vm.className
  if (!props.state.bookmarks.includes(label)) props.state.bookmarks.push(label)
  props.state.classToolMessage = 'Добавлено в закладки'
}

function printClass() {
  if (typeof window !== 'undefined') window.print()
}

async function toggleFullscreen() {
  if (typeof document === 'undefined') return
  if (document.fullscreenElement) await document.exitFullscreen()
  else await document.documentElement.requestFullscreen?.()
}

function closeClass() {
  emit('up')
}

function scrollToClassPart(part) {
  if (typeof document === 'undefined') return
  const selector = {
    overview: '#class-overview',
    equipment: '#class-equipment',
    table: '#class-table',
    subclasses: '#class-subclasses',
    description: '#class-description, #class-overview',
    skills: '#class-features',
    spells: '.cls-feature-spells, .cls-spell-table'
  }[part]
  const target = selector ? document.querySelector(selector) : null
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function scrollToClassFeature(featureId) {
  if (!featureId || typeof document === 'undefined') return
  const target = document.getElementById(`class-feature-${featureId}`)
  if (!target) return
  if ('open' in target) target.open = true
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  target.classList.remove('is-scroll-target')
  window.setTimeout(() => target.classList.add('is-scroll-target'), 20)
  window.setTimeout(() => target.classList.remove('is-scroll-target'), 1500)
}
</script>

<template>
  <div ref="classPageRef" class="cls-page">
    <div
      ref="scrubTrackRef"
      class="cls-scrub"
      :class="{ dragging: scrubDragging }"
      title="Перетащите, чтобы прокрутить страницу"
      @pointerdown="onScrubDown"
      @pointermove="onScrubMove"
      @pointerup="onScrubUp"
      @pointercancel="onScrubUp"
    >
      <span class="cls-scrub-thumb" :style="{ top: (scrubRatio * 100) + '%' }" aria-hidden="true" />
    </div>
    <div ref="classWrapRef" class="cls-wrap" @click="onClassDiceClick" @keydown="onClassDiceKeydown">
      <span ref="classSparkRef" class="cls-spark" :class="{ 'is-suppressed': scrubDragging }" aria-hidden="true" />
      <div class="cls-head">
        <NuxtLink class="cls-emblem-box" to="/dnd5e/classes" title="Вернуться к списку классов" aria-label="Вернуться к списку классов">
          <div class="cls-emblem-frame" />
          <div class="cls-emblem" :style="{ backgroundImage: `url(${vm.classEmblemUrl})` }" />
        </NuxtLink>
        <div class="cls-heading">
          <nav class="cls-crumb" aria-label="Навигация">
            <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
            <span>/</span>
            <NuxtLink to="/dnd5e/classes">Классы</NuxtLink>
            <span>/</span>
            <span>{{ vm.className }}</span>
          </nav>
          <div class="cls-title">{{ vm.className }}</div>
          <div class="cls-en">{{ vm.classEn }}</div>
        </div>
        <div class="cls-icon-tools" aria-label="Инструменты страницы класса">
          <button type="button" class="cls-icon-btn" title="Скопировать ссылку" @click="copyClassLink">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>
          </button>
          <button type="button" class="cls-icon-btn" title="Добавить в закладки" @click="bookmarkClass">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>
          </button>
          <button type="button" class="cls-icon-btn" title="Открыть окно печати" @click="printClass">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V4h10v4"/><rect x="5" y="8" width="14" height="8" rx="1.5"/><path d="M8 14h8v6H8z"/></svg>
          </button>
          <button type="button" class="cls-icon-btn" title="Развернуть окно" @click="toggleFullscreen">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>
          </button>
          <button type="button" class="cls-icon-btn close" title="Закрыть страницу класса" @click="closeClass">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
      </div>

      <div class="cls-thread">

      <div class="cls-toolbar cls-thread-node">
        <div class="cls-section-tools">
          <button
            v-for="tab in CLASS_CARD_TABS"
            :key="tab.id"
            type="button"
            class="cls-section-btn"
            :class="{ active: activeClassTab === tab.id || (tab.id === 'filter' && state.classFilterOpen) }"
            @click="selectClassTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
        <span v-if="state.classToolMessage" class="cls-tool-message">{{ state.classToolMessage }}</span>
      </div>

      <Teleport to="body">
        <div v-if="state.classFilterOpen" class="cls-filter-modal" @click.self="state.classFilterOpen = false">
          <div class="cls-filter-window">
            <div class="cls-filter-top">
              <div>
                <div class="cls-filter-label">Фильтр</div>
                <div class="cls-filter-subtitle">{{ vm.className }} · {{ visibleClassFeatures.length }} умений · {{ visibleClassArchetypes.length }} подклассов</div>
              </div>
              <button type="button" class="cls-filter-close" title="Закрыть фильтр" @click="state.classFilterOpen = false">×</button>
            </div>

            <section class="cls-filter-section">
              <div class="cls-filter-section-head">
                <span>Источник</span>
                <button type="button" class="cls-filter-reset" @click="chooseFeatureSource('all')">Все</button>
              </div>
              <div class="cls-filter-pills">
                <button type="button" class="cls-filter-pill" :class="{ active: state.classFeatureSource === 'all' }" @click="chooseFeatureSource('all')">Все источники</button>
                <button
                  v-for="source in featureSources"
                  :key="source"
                  type="button"
                  class="cls-filter-pill"
                  :class="{ active: state.classFeatureSource === source }"
                  :title="classSourceTitle(source)"
                  @click="chooseFeatureSource(source)"
                >
                  {{ source }}
                </button>
              </div>
            </section>

            <section class="cls-filter-section">
              <div class="cls-filter-section-head">
                <span>Уровень</span>
                <button type="button" class="cls-filter-reset" @click="chooseFeatureLevel('all')">Все</button>
              </div>
              <div class="cls-filter-pills">
                <button type="button" class="cls-filter-pill" :class="{ active: state.classFeatureLevel === 'all' }" @click="chooseFeatureLevel('all')">Все уровни</button>
                <button
                  v-for="level in featureLevels"
                  :key="level"
                  type="button"
                  class="cls-filter-pill"
                  :class="{ active: String(state.classFeatureLevel) === String(level) }"
                  @click="chooseFeatureLevel(level)"
                >
                  {{ level }} уровень
                </button>
              </div>
            </section>

            <section class="cls-filter-section">
              <div class="cls-filter-section-head">
                <span>Подкласс</span>
                <button type="button" class="cls-filter-reset" @click="chooseFeatureSubclass('base')">База</button>
              </div>
              <div class="cls-filter-pills">
                <button type="button" class="cls-filter-pill" :class="{ active: state.classFeatureSubclass === 'base' }" @click="chooseFeatureSubclass('base')">Базовое описание</button>
                <button
                  v-for="arch in sourceFilteredArchetypes"
                  :key="arch.id"
                  type="button"
                  class="cls-filter-pill"
                  :class="{ active: state.classFeatureSubclass === arch.id }"
                  :title="sourceTitle(arch.source, arch.sourceFullName)"
                  @click="chooseFeatureSubclass(arch.id)"
                >
                  {{ arch.name }}
                </button>
              </div>
            </section>

            <div class="cls-filter-footer">
              <button type="button" class="cls-section-btn" @click="resetFeatureFilters">Сбросить</button>
              <button type="button" class="cls-section-btn" @click="state.classFilterOpen = false; state.subclassesOpen = true; selectClassTab('skills')">Показать умения</button>
            </div>
          </div>
        </div>
      </Teleport>

      <div class="cls-mode-panel cls-thread-node">
        <div class="cls-mode-top">
          <button
            type="button"
            class="cls-mode-btn"
            :class="{ active: state.classMode !== 'archetype' }"
            @click="selectBase"
          >
            Базовое описание
          </button>
          <button
            v-for="arch in sourceFilteredArchetypes"
            :key="arch.id"
            type="button"
            class="cls-mode-btn"
            :class="{ active: state.classMode === 'archetype' && state.activeArchetype === arch.id }"
            @click="selectArchetype(arch.id)"
          >
            {{ arch.name }}<template v-if="duplicateArchetypeNames.has(arch.name)"> · {{ arch.source }}</template>
          </button>
        </div>
        <div v-if="!vm.classHasArchetypes" class="cls-arch-empty">Подклассы для этого класса пока не добавлены.</div>
        <div v-else-if="state.classFeatureSource !== 'all' && !sourceFilteredArchetypes.length" class="cls-arch-empty">Для источника {{ state.classFeatureSource }} подклассы не найдены.</div>
      </div>

      <section class="cls-build-panel">
        <div class="cls-build-top cls-thread-node">
          <div class="cls-build-main">
            <h2>{{ activeBuildTitle }}</h2>
            <p>{{ activeBuildSummary }}</p>
            <div class="cls-build-meta">
              <span>{{ activeBuildMeta }}</span>
            </div>
          </div>
          <div class="cls-source-row">
            <span>Источники</span>
            <div>
              <template v-for="source in classSources" :key="source">
                <a v-if="isExternalSource(source)" class="cls-mini-source" :href="sourceRoute(source)" target="_blank" rel="noreferrer" :title="classSourceTitle(source)">{{ source }}</a>
                <NuxtLink v-else class="cls-mini-source" :to="sourceRoute(source)" :title="classSourceTitle(source)">{{ source }}</NuxtLink>
              </template>
            </div>
          </div>
        </div>

        <template v-if="activeClassTab === 'skills'">
        <div class="cls-build-summary">
          <button v-for="stat in classQuickStats" :key="stat.label" type="button" class="cls-summary-pill" @click="scrollToClassPart(stat.part)">
            <span>{{ stat.label }}</span>
            <strong>{{ stat.value }}</strong>
          </button>
        </div>

        <div id="class-overview" class="cls-rule-panels cls-thread-node">
          <section class="cls-rule-panel wide">
            <button type="button" class="cls-rule-head" @click="state.classHitsOpen = !state.classHitsOpen">
              <span class="cls-rule-mark">{{ state.classHitsOpen ? '−' : '+' }}</span>
              <span>Хиты</span>
            </button>
            <div v-if="state.classHitsOpen" class="cls-rule-body">
              <div class="cls-rule-row"><strong>Кость хитов</strong><span>1к{{ vm.classHd }} за уровень</span></div>
              <div class="cls-rule-row"><strong>На 1 уровне</strong><span>{{ vm.classHpFirst }}</span></div>
              <div class="cls-rule-row"><strong>Далее</strong><span>{{ vm.classHpNext }} (мин. 1)</span></div>
            </div>
          </section>

          <section v-if="vm.classHasEquip" id="class-equipment" class="cls-rule-panel balanced">
            <button type="button" class="cls-rule-head" @click="state.classEquipOpen = !state.classEquipOpen">
              <span class="cls-rule-mark">{{ state.classEquipOpen ? '−' : '+' }}</span>
              <span>Снаряжение</span>
            </button>
            <div v-if="state.classEquipOpen" class="cls-rule-body">
              <div v-for="(e, i) in vm.classEquip" :key="i" class="cls-rule-row">
                <strong class="equip-label">Список предметов №{{ i + 1 }}</strong><span>{{ e }}</span>
              </div>
              <div v-if="vm.classEquipNote" class="cls-rule-row note"><strong>Примечание</strong><span>{{ vm.classEquipNote }}</span></div>
            </div>
          </section>

          <section class="cls-rule-panel balanced" :class="{ wide: !vm.classHasEquip }">
            <button type="button" class="cls-rule-head" @click="state.classProfOpen = !state.classProfOpen">
              <span class="cls-rule-mark">{{ state.classProfOpen ? '−' : '+' }}</span>
              <span>Владение</span>
            </button>
            <div v-if="state.classProfOpen" class="cls-rule-body">
              <div class="cls-rule-row"><strong>Доспехи</strong><span>{{ vm.classArmor }}</span></div>
              <div class="cls-rule-row"><strong>Оружие</strong><span>{{ vm.classWeapons }}</span></div>
              <div class="cls-rule-row"><strong>Инструменты</strong><span>{{ vm.classTools }}</span></div>
              <div class="cls-rule-row"><strong>Спасброски</strong><span>{{ vm.classSaves }}</span></div>
              <div class="cls-rule-row"><strong>Навыки</strong><span>{{ vm.classSkills }}</span></div>
            </div>
          </section>
        </div>

        <template v-if="vm.classHasRules">
          <div class="cls-thread-node cls-node-wrap">
          <div id="class-table" class="cls-class-table-panel">
            <button type="button" class="cls-rule-head cls-table-headline" @click="state.classTableOpen = !state.classTableOpen">
              <span class="cls-rule-mark">{{ state.classTableOpen ? '−' : '+' }}</span>
              <span>Таблица класса</span>
            </button>
            <div v-if="state.classTableOpen" class="cls-table-wrap in-card">
              <div class="cls-table" :style="{ gridTemplateColumns: vm.classTableGrid }">
                <div v-for="(col, i) in vm.classTableCols" :key="'col'+i" class="cls-table-head">{{ col }}</div>
                <template v-for="(r, ri) in vm.classTableRows" :key="'row'+ri">
                  <div v-for="(c, ci) in r.cells" :key="'cell'+ri+'-'+ci" class="cls-table-cell" :class="c.className" :style="c.style" :title="c.title">
                    <template v-if="c.parts?.length">
                      <template v-for="part in c.parts" :key="part.key">
                        <button
                          v-if="part.featureId"
                          type="button"
                          class="cls-table-feature-part cls-table-feature-link"
                          :class="{ archetype: part.isArchetype }"
                          :title="`Перейти к умению: ${part.text}`"
                          @click="scrollToClassFeature(part.featureId)"
                        >
                          {{ part.text }}
                        </button>
                        <span
                          v-else
                          class="cls-table-feature-part"
                          :class="{ archetype: part.isArchetype }"
                        >
                          {{ part.text }}
                        </span>
                      </template>
                    </template>
                    <template v-else>{{ c.v }}</template>
                  </div>
                </template>
              </div>
            </div>
          </div>
          </div>

          <template v-if="vm.classHasSelectedArchetype">
            <div id="class-description" class="cls-subclass-description cls-thread-node">
              <div class="cls-subclass-description-head">
                <div>
                  <div class="cls-eyebrow">{{ vm.classSelectedArchetypeDescription.type }} · {{ vm.classSelectedArchetypeDescription.source }}</div>
                  <div class="cls-subclass-description-title">{{ vm.classSelectedArchetypeDescription.name }}</div>
                </div>
                <span class="cls-feature-lvl">{{ vm.classSelectedArchetypeDescription.level }}</span>
              </div>
              <blockquote v-if="vm.classSelectedArchetypeDescription.hasQuote" class="cls-arch-quote compact">{{ vm.classSelectedArchetypeDescription.quote }}</blockquote>
              <div v-if="isAnzuPatron(vm.classSelectedArchetypeDescription.name)" class="cls-archetype-warning">
                <span class="cls-archetype-warning-mark">!</span>
                <div>
                  <strong>Только для Мор’хоров</strong>
                  <span>Выбор представителем другой расы возможен только с разрешения Мастера.</span>
                </div>
              </div>
              <div class="cls-subclass-description-text">
                <p v-for="(p, i) in vm.classSelectedArchetypeDescription.intro" :key="i">{{ p }}</p>
                <p v-if="vm.classSelectedArchetypeDescription.summary && !isAnzuPatron(vm.classSelectedArchetypeDescription.name)">{{ vm.classSelectedArchetypeDescription.summary }}</p>
              </div>
            </div>
          </template>

          <div id="class-features" class="cls-features-heading cls-thread-node">
            <div>
              <div class="cls-eyebrow">Раздел класса</div>
              <h3>Умения класса</h3>
            </div>
            <span class="cls-feature-count">{{ visibleClassFeatures.length }}</span>
          </div>
          <div class="cls-features-list">
              <div v-if="!visibleClassFeatures.length" class="cls-stub">По выбранным фильтрам умения не найдены.</div>
              <details v-for="(f, i) in visibleClassFeatures" :id="`class-feature-${f.id}`" :key="f.id || i" class="cls-card cls-feature-card cls-thread-node" :class="{ 'is-archetype-feature': f.isArchetype }" :open="!f.itemsCollapsed">
                <summary class="cls-feature-summary">
                  <span class="cls-feature-summary-main">
                    <span class="cls-feature-name">{{ f.name }}</span>
                    <span class="cls-feature-lvl">{{ f.lvl }}<template v-if="f.isArchetype"> · {{ f.archetypeName }}</template></span>
                  </span>
                  <span class="cls-feature-meta-row">
                    <span class="cls-badge" :title="sourceTitle(f.src, f.sourceFullName)">{{ f.src }}</span>
                    <span class="cls-feature-mark" aria-hidden="true"></span>
                  </span>
                </summary>
                <div class="cls-feature-content">
                  <div class="cls-feature-prose" :class="{ 'is-option-list': f.name === 'Изменения плоти', 'is-weapon-link': f.name === 'Связь с оружием', 'is-relic-list': f.name === 'Божественный канал: Реликвии войны', 'is-bullet-list': ['Слово базаров', 'Звезда базаров', 'Единство с оружием', 'Ядовитый язык', 'Чешуя', 'Преображение', 'Источнение', 'Одержимость духом', 'Подчинение духа', 'Диффузия духовного естества', 'Покров песков', 'Текучесть', 'Пожирание Искры', 'Возвышение', 'Поглощающий облик', 'Образ короля', 'Королевский триумф', 'Жизнь за жизнь', 'Явление', 'Узел', 'Узор', 'Превзойдя запреты'].includes(f.name) }">
                    <template v-for="(block, bi) in featureBlocks(f.text)" :key="bi">
                      <section v-if="block.type === 'section'" class="cls-feature-section">
                        <h4>
                          <NuxtLink v-if="block.title === 'Гнев Ильбеша'" class="cls-inline-reference" to="/dnd5e/wrath">{{ block.title }}</NuxtLink>
                          <template v-else>{{ block.title }}</template>
                        </h4>
                        <p v-if="block.text">
                          <template v-for="(part, pi) in inlineParts(block.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                          </template>
                        </p>
                      </section>
                      <aside v-else-if="block.type === 'example'" class="cls-feature-example">
                        {{ block.text }}
                      </aside>
                      <div v-else-if="block.type === 'formula'" class="cls-feature-formula">
                        <strong>{{ block.label }}</strong> = {{ block.value }}
                      </div>
                      <ul v-else-if="block.type === 'list'" class="cls-feature-list">
                        <li v-for="(item, li) in block.items" :key="li">
                          <template v-if="highlightsListLead(f.name)">
                            <strong v-if="splitFeatureLead(item).lead" class="cls-dance-option">{{ splitFeatureLead(item).lead }}</strong>
                            <template v-for="(part, pi) in inlineParts(splitFeatureLead(item).rest)" :key="pi">
                              <NuxtLink v-if="part.type === 'link'" class="cls-inline-reference" :to="part.href">{{ part.value }}</NuxtLink>
                              <span v-else :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                            </template>
                          </template>
                          <template v-else v-for="(part, pi) in inlineParts(item)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                          </template>
                        </li>
                      </ul>
                      <div v-else-if="block.type === 'diceGroup'" class="cls-dice-group">
                        <div class="cls-dice-heading">{{ block.die }}</div>
                        <ul class="cls-feature-list">
                          <li v-for="(item, li) in block.items" :key="li">
                            <strong v-if="splitFeatureLead(item).lead" class="cls-dance-option">{{ splitFeatureLead(item).lead }}</strong>
                            <template v-for="(part, pi) in inlineParts(splitFeatureLead(item).rest)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                            </template>
                          </li>
                        </ul>
                      </div>
                      <div v-else-if="block.type === 'diceHeading'" class="cls-dice-heading">{{ block.die }}</div>
                      <div v-else-if="block.type === 'table'" class="cls-feature-table-wrap">
                        <div v-if="featureTableRollDefinition(f.name)" class="cls-table-roll-control">
                          <button type="button" class="cls-table-roll-button" @click="rollFeatureTable(f.name, block, $event)">
                            {{ featureTableRollDefinition(f.name).button }}
                          </button>
                          <div v-if="featureTableRolls[f.name]" class="cls-table-roll-result" aria-live="polite">
                            <strong>{{ featureTableRolls[f.name].label }}: {{ featureTableRolls[f.name].roll }}</strong>
                            <span>{{ featureTableRolls[f.name].text }}</span>
                          </div>
                        </div>
                        <table class="cls-feature-table">
                          <thead>
                            <tr>
                              <th v-for="(header, hi) in block.headers" :key="hi">
                                <template v-for="(part, pi) in inlineParts(header)" :key="pi"><span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span></template>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(row, ri) in block.rows" :key="ri" :class="{ 'is-roll-match': isFeatureTableRollMatch(f.name, row) }">
                              <td v-for="(cell, ci) in row" :key="ci">
                                <strong v-if="isRoyalBloodKing(cell)" class="cls-dance-option">{{ cell }}</strong>
                                <template v-else v-for="(part, pi) in inlineParts(cell)" :key="pi"><span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span></template>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p v-else>
                        <template v-if="highlightsParagraphLead(f.name)">
                          <strong v-if="splitFeatureLead(block.text).lead" class="cls-dance-option">{{ splitFeatureLead(block.text).lead }}</strong>
                          <template v-for="(part, pi) in inlineParts(splitFeatureLead(block.text).rest)" :key="pi"><span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span></template>
                        </template>
                        <template v-else v-for="(part, pi) in inlineParts(block.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                        </template>
                      </p>
                    </template>
                  </div>
                  <NuxtLink v-if="f.resourceLink" class="cls-open-arch" :to="f.resourceLink.href">{{ f.resourceLink.label }} →</NuxtLink>
                  <blockquote v-if="f.hasQuote" class="cls-arch-quote compact">{{ f.quote }}</blockquote>
                  <NuxtLink v-if="f.archetypeName === 'Школа Клыков' && (f.name === 'Импланты' || f.name === 'Список Имплантов')" class="cls-open-arch" to="/dnd5e/classes/wizard/school-of-fangs/implants">Открыть справочник 35 имплантов →</NuxtLink>
                  <NuxtLink v-if="f.archetypeName === 'Школа Клыков' && f.name === 'Создание фамильяра: Сошид-е-Мута'" class="cls-open-arch" to="/dnd5e/classes/wizard/school-of-fangs/familiars">Создать патчфамильяра · 105 вариантов →</NuxtLink>
                  <div v-if="f.hasItems && f.name === 'Сальбаритовые инфузии'" class="cls-inline-infusions">
                    <article v-for="item in f.items" :key="item.name" class="cls-card cls-inline-infusion-card">
                      <div class="cls-feature-head">
                        <span class="cls-feature-name">{{ item.name }}</span>
                        <span v-if="salbariteInfusionParts(item.text).level" class="cls-badge">{{ salbariteInfusionParts(item.text).level }}</span>
                        <span v-if="salbariteInfusionParts(item.text).item" class="cls-feature-lvl">{{ salbariteInfusionParts(item.text).item }}</span>
                      </div>
                      <div class="cls-feature-text">
                        <template v-for="(part, pi) in inlineParts(salbariteInfusionParts(item.text).text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                        </template>
                      </div>
                    </article>
                  </div>
                  <template v-else-if="f.hasItems && f.itemsTitle && f.name === f.itemsTitle">
                    <div v-if="f.itemsRollTitle" class="cls-arch-roll" :class="{ implants: f.itemsRollMode === 'implants-4d4' }">
                      <button type="button" class="cls-arch-roll-btn" :class="{ 'implant-roll-btn': f.itemsRollMode === 'implants-4d4' }" @click="rollFeatureItem(f)">
                        <svg v-if="f.itemsRollMode === 'implants-4d4'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/></svg>
                        <span>{{ f.itemsRollMode === 'implants-4d4' ? 'Создать имплант · 4D4' : f.itemsRollTitle }}</span>
                      </button>
                      <div v-if="itemRollResult(f) && f.itemsRollMode === 'implants-4d4'" class="cls-arch-roll-result implant-result">
                        <div class="cls-implant-dice-row">
                          <span v-for="(roll, ri) in itemRollResult(f).rolls" :key="ri" class="cls-implant-die" :class="`bone-${IMPLANT_BONES[roll - 1]?.key}`"><b>{{ roll }}</b>{{ implantRollName(roll) }}</span>
                          <span class="cls-implant-arrow">→</span>
                          <span class="cls-implant-result-name">{{ itemRollResult(f).number }}. {{ itemRollResult(f).item.name }}</span>
                        </div>
                        <div class="cls-implant-result-card">
                          <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
                          <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
                          <div class="cls-implant-result-badges">
                            <span class="cls-implant-pill"><span>Бросок</span><b>{{ itemRollResult(f).dice }}</b></span>
                            <span class="cls-implant-tag">{{ implantRollCombo(itemRollResult(f)) }}</span>
                          </div>
                          <div class="cls-implant-result-title">{{ itemRollResult(f).item.name }}</div>
                        </div>
                      </div>
                      <div v-else-if="itemRollResult(f)" class="cls-arch-roll-result">
                        <strong>{{ itemRollResult(f).number }}</strong>
                        <span>{{ itemRollResult(f).item.name }}</span>
                      </div>
                    </div>
                    <div class="cls-arch-items roomy">
                      <details v-for="item in f.items" :key="item.name" class="cls-arch-item" :open="!f.itemsCollapsed">
                        <summary>{{ item.name }}</summary>
                        <div v-if="f.itemsRollMode === 'implants-4d4'" class="cls-implant-body">
                          <div class="cls-implant-bones">
                            <span v-for="bone in implantActiveBones(item)" :key="bone.key" :class="`bone-${bone.key}`">{{ bone.label }} × {{ implantBoneCount(item, bone) }}</span>
                          </div>
                          <div v-if="implantParts(item.text).meta.length" class="cls-implant-meta">
                            <span v-for="meta in implantParts(item.text).meta" :key="meta.label"><strong>{{ meta.label }}</strong> {{ meta.value }}</span>
                          </div>
                          <div v-if="implantParts(item.text).levels.length" class="cls-implant-levels">
                            <article v-for="level in implantParts(item.text).levels" :key="level.level">
                              <strong>{{ level.level }}</strong>
                              <p>
                                <template v-for="(part, pi) in inlineParts(level.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                                </template>
                              </p>
                            </article>
                          </div>
                          <p v-for="note in implantParts(item.text).notes" :key="note" class="cls-implant-note">{{ note }}</p>
                        </div>
                        <div v-else class="cls-arch-item-text">
                          <template v-for="(part, pi) in inlineParts(item.text)" :key="pi">
                            <NuxtLink v-if="part.type === 'link'" class="cls-inline-reference" :to="part.href">{{ part.value }}</NuxtLink>
                            <strong v-else-if="part.type === 'bold'">{{ part.value }}</strong>
                            <span v-else :class="{ 'cls-dice-token': part.type === 'dice' }">{{ part.value }}</span>
                          </template>
                        </div>
                      </details>
                    </div>
                  </template>
                  <details v-else-if="f.hasItems && f.itemsTitle" class="cls-arch-items-group" :open="!f.itemsCollapsed">
                    <summary>
                      <span>{{ f.itemsTitle }}</span>
                      <small>{{ f.items.length }} в списке</small>
                    </summary>
                    <div v-if="f.itemsRollTitle" class="cls-arch-roll" :class="{ implants: f.itemsRollMode === 'implants-4d4' }">
                      <button type="button" class="cls-arch-roll-btn" :class="{ 'implant-roll-btn': f.itemsRollMode === 'implants-4d4' }" @click="rollFeatureItem(f)">
                        <svg v-if="f.itemsRollMode === 'implants-4d4'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/></svg>
                        <span>{{ f.itemsRollMode === 'implants-4d4' ? 'Создать имплант · 4D4' : f.itemsRollTitle }}</span>
                      </button>
                      <div v-if="itemRollResult(f) && f.itemsRollMode === 'implants-4d4'" class="cls-arch-roll-result implant-result">
                        <div class="cls-implant-dice-row">
                          <span v-for="(roll, ri) in itemRollResult(f).rolls" :key="ri" class="cls-implant-die" :class="`bone-${IMPLANT_BONES[roll - 1]?.key}`"><b>{{ roll }}</b>{{ implantRollName(roll) }}</span>
                          <span class="cls-implant-arrow">→</span>
                          <span class="cls-implant-result-name">{{ itemRollResult(f).number }}. {{ itemRollResult(f).item.name }}</span>
                        </div>
                        <div class="cls-implant-result-card">
                          <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
                          <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
                          <div class="cls-implant-result-badges">
                            <span class="cls-implant-pill"><span>Бросок</span><b>{{ itemRollResult(f).dice }}</b></span>
                            <span class="cls-implant-tag">{{ implantRollCombo(itemRollResult(f)) }}</span>
                          </div>
                          <div class="cls-implant-result-title">{{ itemRollResult(f).item.name }}</div>
                        </div>
                      </div>
                      <div v-else-if="itemRollResult(f)" class="cls-arch-roll-result">
                        <strong>{{ itemRollResult(f).number }}</strong>
                        <span>{{ itemRollResult(f).item.name }}</span>
                      </div>
                    </div>
                    <div class="cls-arch-items roomy">
                      <details v-for="item in f.items" :key="item.name" class="cls-arch-item" :open="!f.itemsCollapsed">
                        <summary>{{ item.name }}</summary>
                        <div v-if="f.itemsRollMode === 'implants-4d4'" class="cls-implant-body">
                          <div class="cls-implant-bones">
                            <span v-for="bone in implantActiveBones(item)" :key="bone.key" :class="`bone-${bone.key}`">{{ bone.label }} × {{ implantBoneCount(item, bone) }}</span>
                          </div>
                          <div v-if="implantParts(item.text).meta.length" class="cls-implant-meta">
                            <span v-for="meta in implantParts(item.text).meta" :key="meta.label"><strong>{{ meta.label }}</strong> {{ meta.value }}</span>
                          </div>
                          <div v-if="implantParts(item.text).levels.length" class="cls-implant-levels">
                            <article v-for="level in implantParts(item.text).levels" :key="level.level">
                              <strong>{{ level.level }}</strong>
                              <p>
                                <template v-for="(part, pi) in inlineParts(level.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                                </template>
                              </p>
                            </article>
                          </div>
                          <p v-for="note in implantParts(item.text).notes" :key="note" class="cls-implant-note">{{ note }}</p>
                        </div>
                        <div v-else class="cls-arch-item-text">
                          <template v-for="(part, pi) in inlineParts(item.text)" :key="pi">
                            <NuxtLink v-if="part.type === 'link'" class="cls-inline-reference" :to="part.href">{{ part.value }}</NuxtLink>
                            <strong v-else-if="part.type === 'bold'">{{ part.value }}</strong>
                            <span v-else :class="{ 'cls-dice-token': part.type === 'dice' }">{{ part.value }}</span>
                          </template>
                        </div>
                      </details>
                    </div>
                  </details>
                  <div v-else-if="f.hasItems" class="cls-arch-items" :class="{ roomy: f.hasLongItems }">
                    <details v-for="item in f.items" :key="item.name" class="cls-arch-item" open>
                      <summary>{{ item.name }}</summary>
                      <span>{{ item.text }}</span>
                    </details>
                  </div>
                  <div v-if="f.hasSpellTable" class="cls-spell-table">
                    <div class="cls-spell-table-head">
                      <div style="padding:9px 14px">Уровень</div>
                      <div style="padding:9px 14px;border-left:1px solid rgba(214,170,96,.18)">Заклинание</div>
                    </div>
                    <div v-for="(sr, sri) in f.spellTable" :key="sri" class="cls-spell-table-row">
                      <div style="padding:8px 14px;color:rgba(244,224,170,.85)">{{ sr.lvl }}</div>
                      <div style="padding:8px 14px;border-left:1px solid rgba(255,255,255,.05)">{{ sr.spell }}</div>
                    </div>
                  </div>
                  <div v-if="f.hasSpells" class="cls-feature-spells">
                    <div v-for="spell in f.spells" :key="spell.name" class="cls-spell-card">
                      <div class="cls-feature-head">
                        <span class="cls-feature-name">{{ spell.name }}</span>
                        <span class="cls-badge">{{ spell.level }}</span>
                        <span class="cls-feature-lvl">{{ spell.school }}</span>
                      </div>
                      <div class="cls-spell-meta">
                        <span>Сотворение: {{ spell.casting }}</span>
                        <span>Дистанция: {{ spell.range }}</span>
                        <span>Компоненты: {{ spell.components }}</span>
                        <span>Длительность: {{ spell.duration }}</span>
                      </div>
                      <div class="cls-feature-text">{{ spell.text }}</div>
                      <div v-if="spell.hasHigher" class="cls-higher"><strong>На больших уровнях.</strong> {{ spell.higher }}</div>
                    </div>
                  </div>
                </div>
              </details>
          </div>
        </template>
        </template>

        <div v-else-if="activeClassTab === 'description'" class="cls-tab-content cls-description-tab">
          <section class="cls-description-panel cls-description-intro-panel">
            <div class="cls-eyebrow">{{ classDescription.source }}</div>
            <h3>{{ classDescription.title || vm.className }}</h3>
            <div class="cls-description-prose">
              <p v-for="(p, i) in classDescription.intro" :key="'class-description-'+i">{{ p }}</p>
            </div>
          </section>
          <section v-for="section in classDescription.sections" :key="section.title" class="cls-description-panel" :class="{ accent: section.accent, 'has-table': section.table, 'has-notes': section.items?.length }">
            <div class="cls-eyebrow">{{ section.eyebrow || 'Описание' }}</div>
            <h3>{{ section.title }}</h3>
            <div class="cls-description-prose">
              <p v-for="(p, i) in section.paragraphs" :key="section.title+'-p-'+i">{{ p }}</p>
            </div>
            <div v-if="section.items?.length" class="cls-description-notes">
              <article v-for="item in section.items" :key="item.title" class="cls-description-note">
                <h4>{{ item.title }}</h4>
                <p>{{ item.text }}</p>
              </article>
            </div>
            <div v-if="section.table" class="cls-description-table">
              <div class="cls-description-table-head">
                <span v-for="col in section.table.cols" :key="col">{{ col }}</span>
              </div>
              <div v-for="row in section.table.rows" :key="row[0] + row[1]" class="cls-description-table-row">
                <span v-for="(cell, i) in row" :key="i">{{ cell }}</span>
              </div>
            </div>
          </section>
        </div>

        <div v-else-if="activeClassTab === 'spells'" class="cls-tab-content cls-spells-tab">
          <div class="cls-spell-tab-head">
            <div>
              <div class="cls-eyebrow">Список заклинаний</div>
              <h3>Заклинания {{ vm.className }}</h3>
            </div>
            <NuxtLink class="cls-open-arch ghost" to="/dnd5e/spells">Открыть раздел заклинаний</NuxtLink>
          </div>
          <div v-if="!visibleClassSpells.length" class="cls-stub">По выбранным фильтрам заклинания не найдены.</div>
          <div v-else class="cls-class-spell-list">
            <details v-for="spell in visibleClassSpells" :key="spell.id" class="cls-card cls-feature-card">
              <summary class="cls-feature-summary">
                <span class="cls-feature-mark" aria-hidden="true"></span>
                <span class="cls-feature-summary-main">
                  <span class="cls-feature-name">{{ spell.title }}</span>
                  <span class="cls-feature-meta-row">
                    <span class="cls-badge" :title="spellSourceTitle(spell.source)">{{ spell.source }}</span>
                    <span class="cls-feature-lvl">{{ spellLevelName(spell.level) }} · {{ spellSchoolName(spell.school) }}</span>
                  </span>
                </span>
              </summary>
              <div class="cls-feature-content">
                <div class="cls-spell-meta">
                  <span>Сотворение: {{ spell.castingTime }}</span>
                  <span>Дистанция: {{ spell.range }}</span>
                  <span>Компоненты: {{ spell.components }}</span>
                  <span>Длительность: {{ spell.duration }}</span>
                </div>
                <div v-if="spellTagNames(spell.tags).length" class="cls-spell-tags">
                  <span v-for="tag in spellTagNames(spell.tags)" :key="tag">{{ tag }}</span>
                </div>
                <div class="cls-feature-prose compact">
                  <p>{{ spell.description }}</p>
                  <section v-for="section in spell.sections" :key="section.title" class="cls-feature-section">
                    <h4>{{ section.title }}</h4>
                    <p>{{ section.text }}</p>
                  </section>
                </div>
              </div>
            </details>
          </div>
        </div>

      </section>

      <template v-if="vm.classHasRules">

        <template v-if="vm.classHasInfusions">
          <div class="cls-collapsible cls-thread-node" @click="state.infOpen = !state.infOpen">
            <span class="cls-chevron">{{ state.infOpen ? '▾' : '▸' }}</span>
            <span class="cls-collapsible-title">Список инфузий</span>
            <span class="cls-collapsible-hint">{{ state.infOpen ? '▾' : '▸' }} развернуть</span>
          </div>
          <div v-if="state.infOpen" style="display:flex;flex-direction:column;gap:14px;margin-top:16px">
            <div v-for="(inf, i) in vm.classInfusions" :key="i" class="cls-card">
              <div class="cls-feature-head">
                <span class="cls-feature-name" style="font-size:21px">{{ inf.name }}</span>
                <span v-if="inf.hasReq" class="cls-badge">{{ inf.req }}</span>
                <span class="cls-feature-lvl" style="letter-spacing:.05em;text-transform:none">{{ inf.item }}</span>
              </div>
              <div class="cls-feature-text" style="font-size:16.5px">{{ inf.text }}</div>
            </div>
          </div>
        </template>

        <template v-if="vm.classHasInvocations">
          <div class="cls-collapsible cls-thread-node" @click="state.invOpen = !state.invOpen">
            <span class="cls-chevron">{{ state.invOpen ? '▾' : '▸' }}</span>
            <span class="cls-collapsible-title">Список таинственных воззваний</span>
            <span class="cls-collapsible-hint">{{ state.invOpen ? '▾' : '▸' }} развернуть</span>
          </div>
          <div v-if="state.invOpen" style="display:flex;flex-direction:column;gap:14px;margin-top:16px">
            <div v-for="(inv, i) in vm.classInvocations" :key="i" class="cls-card">
              <div class="cls-feature-head">
                <span class="cls-feature-name" style="font-size:21px">{{ inv.name }}</span>
                <span v-if="inv.hasReq" class="cls-badge">{{ inv.req }}</span>
              </div>
              <div class="cls-feature-text" style="font-size:16.5px">{{ inv.text }}</div>
            </div>
          </div>
        </template>
      </template>
      <div v-else class="cls-stub">Полная таблица уровней и умения для класса «{{ vm.className }}» в подготовке.</div>

      <template v-if="vm.classHasArchetypes">
        <div id="class-subclasses" class="cls-collapsible cls-thread-node" @click="state.subclassesOpen = !state.subclassesOpen">
          <span class="cls-chevron">{{ state.subclassesOpen ? '−' : '+' }}</span>
          <span class="cls-collapsible-title">Подклассы</span>
          <span class="cls-collapsible-hint">{{ state.subclassesOpen ? 'свернуть' : 'развернуть' }}</span>
        </div>
        <div v-if="state.subclassesOpen" class="cls-subclass-list">
          <div v-if="!visibleClassArchetypes.length" class="cls-subclass-empty">По выбранным фильтрам подклассы не найдены.</div>
          <div v-for="arch in visibleClassArchetypes" :key="arch.id" class="cls-subclass-item">
            <div class="cls-subclass-toggle">
              <button type="button" class="cls-subclass-plus" :title="state.openSubclass === arch.id ? 'Свернуть подкласс' : 'Раскрыть подкласс'" @click.stop="toggleSubclass(arch.id)">
                {{ state.openSubclass === arch.id ? '−' : '+' }}
              </button>
              <div class="cls-subclass-heading" @click.stop="toggleSubclass(arch.id)">
                <span class="cls-subclass-title">{{ arch.name }}</span>
                <span class="cls-subclass-meta">{{ arch.level }} · {{ arch.type }}</span>
              </div>
              <span class="cls-subclass-source" :title="sourceTitle(arch.source, arch.sourceFullName)">{{ arch.source }}</span>
              <button type="button" class="cls-open-arch inline" @click.stop="selectArchetype(arch.id)">Применить подкласс</button>
            </div>
            <div v-if="state.openSubclass === arch.id" class="cls-subclass-body">
              <div v-if="isAnzuPatron(arch.name)" class="cls-archetype-warning compact">
                <span class="cls-archetype-warning-mark">!</span>
                <div>
                  <strong>Только для Мор’хоров</strong>
                  <span>Выбор представителем другой расы возможен только с разрешения Мастера.</span>
                </div>
              </div>
              <div v-else-if="arch.summary" class="cls-feature-text">{{ arch.summary }}</div>
              <blockquote v-if="arch.quote" class="cls-arch-quote compact">{{ arch.quote }}</blockquote>
              <div v-if="arch.intro?.length" class="cls-subclass-prose">
                <p v-for="(p, i) in arch.intro" :key="i">{{ p }}</p>
              </div>
              <div class="cls-subclass-rules">
                <article v-for="feature in arch.features" :key="feature.name" class="cls-subclass-rule">
                  <div class="cls-feature-head">
                    <span class="cls-feature-name">{{ feature.name }}</span>
                    <span class="cls-badge" :title="sourceTitle(arch.source, arch.sourceFullName)">{{ arch.source }}</span>
                    <span class="cls-feature-lvl">{{ feature.level }}</span>
                  </div>
                  <div class="cls-feature-prose compact" :class="{ 'is-option-list': feature.name === 'Изменения плоти', 'is-weapon-link': feature.name === 'Связь с оружием', 'is-relic-list': feature.name === 'Божественный канал: Реликвии войны', 'is-bullet-list': ['Слово базаров', 'Звезда базаров', 'Единство с оружием', 'Ядовитый язык', 'Чешуя', 'Преображение', 'Источнение', 'Одержимость духом', 'Подчинение духа', 'Диффузия духовного естества', 'Покров песков', 'Текучесть', 'Пожирание Искры', 'Возвышение', 'Поглощающий облик', 'Образ короля', 'Королевский триумф', 'Жизнь за жизнь', 'Явление', 'Узел', 'Узор', 'Превзойдя запреты'].includes(feature.name) }">
                    <template v-for="(block, bi) in featureBlocks(feature.text)" :key="bi">
                      <section v-if="block.type === 'section'" class="cls-feature-section">
                        <h4>
                          <NuxtLink v-if="block.title === 'Гнев Ильбеша'" class="cls-inline-reference" to="/dnd5e/wrath">{{ block.title }}</NuxtLink>
                          <template v-else>{{ block.title }}</template>
                        </h4>
                        <p v-if="block.text">
                          <template v-for="(part, pi) in inlineParts(block.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                          </template>
                        </p>
                      </section>
                      <aside v-else-if="block.type === 'example'" class="cls-feature-example">{{ block.text }}</aside>
                      <div v-else-if="block.type === 'formula'" class="cls-feature-formula">
                        <strong>{{ block.label }}</strong> = {{ block.value }}
                      </div>
                      <ul v-else-if="block.type === 'list'" class="cls-feature-list">
                        <li v-for="(item, li) in block.items" :key="li">
                          <template v-if="highlightsListLead(feature.name)">
                            <strong v-if="splitFeatureLead(item).lead" class="cls-dance-option">{{ splitFeatureLead(item).lead }}</strong>
                            <template v-for="(part, pi) in inlineParts(splitFeatureLead(item).rest)" :key="pi">
                              <NuxtLink v-if="part.type === 'link'" class="cls-inline-reference" :to="part.href">{{ part.value }}</NuxtLink>
                              <span v-else :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                            </template>
                          </template>
                          <template v-else v-for="(part, pi) in inlineParts(item)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                          </template>
                        </li>
                      </ul>
                      <div v-else-if="block.type === 'diceGroup'" class="cls-dice-group">
                        <div class="cls-dice-heading">{{ block.die }}</div>
                        <ul class="cls-feature-list">
                          <li v-for="(item, li) in block.items" :key="li">
                            <strong v-if="splitFeatureLead(item).lead" class="cls-dance-option">{{ splitFeatureLead(item).lead }}</strong>
                            <template v-for="(part, pi) in inlineParts(splitFeatureLead(item).rest)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                            </template>
                          </li>
                        </ul>
                      </div>
                      <div v-else-if="block.type === 'diceHeading'" class="cls-dice-heading">{{ block.die }}</div>
                      <div v-else-if="block.type === 'table'" class="cls-feature-table-wrap">
                        <div v-if="featureTableRollDefinition(feature.name)" class="cls-table-roll-control">
                          <button type="button" class="cls-table-roll-button" @click="rollFeatureTable(feature.name, block, $event)">
                            {{ featureTableRollDefinition(feature.name).button }}
                          </button>
                          <div v-if="featureTableRolls[feature.name]" class="cls-table-roll-result" aria-live="polite">
                            <strong>{{ featureTableRolls[feature.name].label }}: {{ featureTableRolls[feature.name].roll }}</strong>
                            <span>{{ featureTableRolls[feature.name].text }}</span>
                          </div>
                        </div>
                        <table class="cls-feature-table">
                          <thead>
                            <tr>
                              <th v-for="(header, hi) in block.headers" :key="hi">
                                <template v-for="(part, pi) in inlineParts(header)" :key="pi"><span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span></template>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(row, ri) in block.rows" :key="ri" :class="{ 'is-roll-match': isFeatureTableRollMatch(feature.name, row) }">
                              <td v-for="(cell, ci) in row" :key="ci">
                                <strong v-if="isRoyalBloodKing(cell)" class="cls-dance-option">{{ cell }}</strong>
                                <template v-else v-for="(part, pi) in inlineParts(cell)" :key="pi"><span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span></template>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p v-else>
                        <template v-if="highlightsParagraphLead(feature.name)">
                          <strong v-if="splitFeatureLead(block.text).lead" class="cls-dance-option">{{ splitFeatureLead(block.text).lead }}</strong>
                          <template v-for="(part, pi) in inlineParts(splitFeatureLead(block.text).rest)" :key="pi"><span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span></template>
                        </template>
                        <template v-else v-for="(part, pi) in inlineParts(block.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                        </template>
                      </p>
                    </template>
                  </div>
                  <NuxtLink v-if="feature.resourceLink" class="cls-open-arch" :to="feature.resourceLink.href">{{ feature.resourceLink.label }} →</NuxtLink>
                  <NuxtLink v-if="feature.archetypeName === 'Школа Клыков' && (feature.name === 'Импланты' || feature.name === 'Список Имплантов')" class="cls-open-arch" to="/dnd5e/classes/wizard/school-of-fangs/implants">Все правила и 35 имплантов в едином справочнике →</NuxtLink>
                  <NuxtLink v-if="feature.archetypeName === 'Школа Клыков' && feature.name === 'Создание фамильяра: Сошид-е-Мута'" class="cls-open-arch" to="/dnd5e/classes/wizard/school-of-fangs/familiars">Создать патчфамильяра · малый, средний или большой →</NuxtLink>
                  <div v-if="feature.hasItems && feature.name === 'Сальбаритовые инфузии'" class="cls-inline-infusions">
                    <article v-for="item in feature.items" :key="item.name" class="cls-card cls-inline-infusion-card">
                      <div class="cls-feature-head">
                        <span class="cls-feature-name">{{ item.name }}</span>
                        <span v-if="salbariteInfusionParts(item.text).level" class="cls-badge">{{ salbariteInfusionParts(item.text).level }}</span>
                        <span v-if="salbariteInfusionParts(item.text).item" class="cls-feature-lvl">{{ salbariteInfusionParts(item.text).item }}</span>
                      </div>
                      <div class="cls-feature-text">
                        <template v-for="(part, pi) in inlineParts(salbariteInfusionParts(item.text).text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                        </template>
                      </div>
                    </article>
                  </div>
                  <template v-else-if="feature.hasItems && feature.itemsTitle && feature.name === feature.itemsTitle">
                    <div v-if="feature.itemsRollTitle" class="cls-arch-roll" :class="{ implants: feature.itemsRollMode === 'implants-4d4' }">
                      <button type="button" class="cls-arch-roll-btn" :class="{ 'implant-roll-btn': feature.itemsRollMode === 'implants-4d4' }" @click="rollFeatureItem(feature)">
                        <svg v-if="feature.itemsRollMode === 'implants-4d4'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/></svg>
                        <span>{{ feature.itemsRollMode === 'implants-4d4' ? 'Создать имплант · 4D4' : feature.itemsRollTitle }}</span>
                      </button>
                      <div v-if="itemRollResult(feature) && feature.itemsRollMode === 'implants-4d4'" class="cls-arch-roll-result implant-result">
                        <div class="cls-implant-dice-row">
                          <span v-for="(roll, ri) in itemRollResult(feature).rolls" :key="ri" class="cls-implant-die" :class="`bone-${IMPLANT_BONES[roll - 1]?.key}`"><b>{{ roll }}</b>{{ implantRollName(roll) }}</span>
                          <span class="cls-implant-arrow">→</span>
                          <span class="cls-implant-result-name">{{ itemRollResult(feature).number }}. {{ itemRollResult(feature).item.name }}</span>
                        </div>
                        <div class="cls-implant-result-card">
                          <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
                          <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
                          <div class="cls-implant-result-badges">
                            <span class="cls-implant-pill"><span>Бросок</span><b>{{ itemRollResult(feature).dice }}</b></span>
                            <span class="cls-implant-tag">{{ implantRollCombo(itemRollResult(feature)) }}</span>
                          </div>
                          <div class="cls-implant-result-title">{{ itemRollResult(feature).item.name }}</div>
                        </div>
                      </div>
                      <div v-else-if="itemRollResult(feature)" class="cls-arch-roll-result">
                        <strong>{{ itemRollResult(feature).number }}</strong>
                        <span>{{ itemRollResult(feature).item.name }}</span>
                      </div>
                    </div>
                    <div class="cls-arch-items roomy">
                      <details v-for="item in feature.items" :key="item.name" class="cls-arch-item" :open="!feature.itemsCollapsed">
                        <summary>{{ item.name }}</summary>
                        <div v-if="feature.itemsRollMode === 'implants-4d4'" class="cls-implant-body">
                          <div class="cls-implant-bones">
                            <span v-for="bone in implantActiveBones(item)" :key="bone.key" :class="`bone-${bone.key}`">{{ bone.label }} × {{ implantBoneCount(item, bone) }}</span>
                          </div>
                          <div v-if="implantParts(item.text).meta.length" class="cls-implant-meta">
                            <span v-for="meta in implantParts(item.text).meta" :key="meta.label"><strong>{{ meta.label }}</strong> {{ meta.value }}</span>
                          </div>
                          <div v-if="implantParts(item.text).levels.length" class="cls-implant-levels">
                            <article v-for="level in implantParts(item.text).levels" :key="level.level">
                              <strong>{{ level.level }}</strong>
                              <p>
                                <template v-for="(part, pi) in inlineParts(level.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                                </template>
                              </p>
                            </article>
                          </div>
                          <p v-for="note in implantParts(item.text).notes" :key="note" class="cls-implant-note">{{ note }}</p>
                        </div>
                        <div v-else class="cls-arch-item-text">
                          <template v-for="(part, pi) in inlineParts(item.text)" :key="pi">
                            <NuxtLink v-if="part.type === 'link'" class="cls-inline-reference" :to="part.href">{{ part.value }}</NuxtLink>
                            <strong v-else-if="part.type === 'bold'">{{ part.value }}</strong>
                            <span v-else :class="{ 'cls-dice-token': part.type === 'dice' }">{{ part.value }}</span>
                          </template>
                        </div>
                      </details>
                    </div>
                  </template>
                  <details v-else-if="feature.hasItems && feature.itemsTitle" class="cls-arch-items-group" :open="!feature.itemsCollapsed">
                    <summary>
                      <span>{{ feature.itemsTitle }}</span>
                      <small>{{ feature.items.length }} в списке</small>
                    </summary>
                    <div v-if="feature.itemsRollTitle" class="cls-arch-roll" :class="{ implants: feature.itemsRollMode === 'implants-4d4' }">
                      <button type="button" class="cls-arch-roll-btn" :class="{ 'implant-roll-btn': feature.itemsRollMode === 'implants-4d4' }" @click="rollFeatureItem(feature)">
                        <svg v-if="feature.itemsRollMode === 'implants-4d4'" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/></svg>
                        <span>{{ feature.itemsRollMode === 'implants-4d4' ? 'Создать имплант · 4D4' : feature.itemsRollTitle }}</span>
                      </button>
                      <div v-if="itemRollResult(feature) && feature.itemsRollMode === 'implants-4d4'" class="cls-arch-roll-result implant-result">
                        <div class="cls-implant-dice-row">
                          <span v-for="(roll, ri) in itemRollResult(feature).rolls" :key="ri" class="cls-implant-die" :class="`bone-${IMPLANT_BONES[roll - 1]?.key}`"><b>{{ roll }}</b>{{ implantRollName(roll) }}</span>
                          <span class="cls-implant-arrow">→</span>
                          <span class="cls-implant-result-name">{{ itemRollResult(feature).number }}. {{ itemRollResult(feature).item.name }}</span>
                        </div>
                        <div class="cls-implant-result-card">
                          <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
                          <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
                          <div class="cls-implant-result-badges">
                            <span class="cls-implant-pill"><span>Бросок</span><b>{{ itemRollResult(feature).dice }}</b></span>
                            <span class="cls-implant-tag">{{ implantRollCombo(itemRollResult(feature)) }}</span>
                          </div>
                          <div class="cls-implant-result-title">{{ itemRollResult(feature).item.name }}</div>
                        </div>
                      </div>
                      <div v-else-if="itemRollResult(feature)" class="cls-arch-roll-result">
                        <strong>{{ itemRollResult(feature).number }}</strong>
                        <span>{{ itemRollResult(feature).item.name }}</span>
                      </div>
                    </div>
                    <div class="cls-arch-items roomy">
                      <details v-for="item in feature.items" :key="item.name" class="cls-arch-item" :open="!feature.itemsCollapsed">
                        <summary>{{ item.name }}</summary>
                        <div v-if="feature.itemsRollMode === 'implants-4d4'" class="cls-implant-body">
                          <div class="cls-implant-bones">
                            <span v-for="bone in implantActiveBones(item)" :key="bone.key" :class="`bone-${bone.key}`">{{ bone.label }} × {{ implantBoneCount(item, bone) }}</span>
                          </div>
                          <div v-if="implantParts(item.text).meta.length" class="cls-implant-meta">
                            <span v-for="meta in implantParts(item.text).meta" :key="meta.label"><strong>{{ meta.label }}</strong> {{ meta.value }}</span>
                          </div>
                          <div v-if="implantParts(item.text).levels.length" class="cls-implant-levels">
                            <article v-for="level in implantParts(item.text).levels" :key="level.level">
                              <strong>{{ level.level }}</strong>
                              <p>
                                <template v-for="(part, pi) in inlineParts(level.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                                </template>
                              </p>
                            </article>
                          </div>
                          <p v-for="note in implantParts(item.text).notes" :key="note" class="cls-implant-note">{{ note }}</p>
                        </div>
                        <div v-else class="cls-arch-item-text">
                          <template v-for="(part, pi) in inlineParts(item.text)" :key="pi">
                            <NuxtLink v-if="part.type === 'link'" class="cls-inline-reference" :to="part.href">{{ part.value }}</NuxtLink>
                            <strong v-else-if="part.type === 'bold'">{{ part.value }}</strong>
                            <span v-else :class="{ 'cls-dice-token': part.type === 'dice' }">{{ part.value }}</span>
                          </template>
                        </div>
                      </details>
                    </div>
                  </details>
                  <div v-else-if="feature.hasItems" class="cls-arch-items" :class="{ roomy: feature.items.length > 3 }">
                    <details v-for="item in feature.items" :key="item.name" class="cls-arch-item" open>
                      <summary>{{ item.name }}</summary>
                      <span>{{ item.text }}</span>
                    </details>
                  </div>
                </article>
              </div>
              <div v-if="arch.spells?.length" class="cls-subclass-spells">
                <div class="cls-h3">Дополнительные заклинания</div>
                <div style="display:flex;flex-direction:column;gap:12px">
                  <div v-for="spell in arch.spells" :key="spell.name" class="cls-spell-card">
                    <div class="cls-feature-head">
                      <span class="cls-feature-name">{{ spell.name }}</span>
                      <span class="cls-badge">{{ spell.level }}</span>
                      <span class="cls-feature-lvl">{{ spell.school }}</span>
                    </div>
                    <div class="cls-spell-meta">
                      <span>Сотворение: {{ spell.casting }}</span>
                      <span>Дистанция: {{ spell.range }}</span>
                      <span>Компоненты: {{ spell.components }}</span>
                      <span>Длительность: {{ spell.duration }}</span>
                    </div>
                    <div class="cls-feature-text rich">
                      <template v-for="(block, bi) in featureBlocks(spell.text)" :key="bi">
                        <section v-if="block.type === 'section'" class="cls-feature-section">
                          <h4>{{ block.title }}</h4>
                          <p v-if="block.text">
                            <template v-for="(part, pi) in inlineParts(block.text)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                            </template>
                          </p>
                        </section>
                        <ul v-else-if="block.type === 'list'" class="cls-feature-list">
                          <li v-for="(item, li) in block.items" :key="li">
                            <template v-for="(part, pi) in inlineParts(item)" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                            </template>
                          </li>
                        </ul>
                        <p v-else>
                          <template v-for="(part, pi) in inlineParts(block.text || '')" :key="pi">
                                  <span :class="{ 'cls-dice-token': part.type === 'dice', 'cls-inline-bold': part.type === 'bold' }">{{ part.value }}</span>
                          </template>
                        </p>
                      </template>
                    </div>
                    <div v-if="spell.hasHigher" class="cls-higher"><strong>На больших уровнях.</strong> {{ spell.higher }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      </div>
    </div>
  </div>
</template>

<style scoped>
.cls-page{
  --t-bg:#07080d;
  --t-line:rgba(232,236,248,.12);
  --t-muted:rgba(232,236,248,.58);
  --t-faint:rgba(232,236,248,.38);
  --t-gold:#d6aa60;
  --t-gold-soft:rgba(244,224,170,.9);
  --cls-page-left:68px;
  --cls-workspace-max:1080px;
  position:absolute;top:0;right:0;bottom:0;left:68px;z-index:58;overflow-y:auto;
  background:linear-gradient(180deg,rgba(255,255,255,.02),transparent 300px),var(--t-bg);
}
.cls-wrap{
  --cls-rail-left:61px;
  --cls-emblem-margin-left:-70px;
  --cls-emblem-margin-right:35px;
  max-width:var(--cls-workspace-max);
  margin:0 auto;
  padding:44px 56px 100px;
}
.cls-head{display:flex;align-items:center;gap:30px}
.cls-heading{flex:1;min-width:0}
.cls-crumb{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;font-size:11px;font-weight:750;letter-spacing:.16em;text-transform:uppercase;color:var(--t-faint)}
.cls-crumb a{color:var(--t-gold-soft);text-decoration:none}
.cls-crumb a:hover{color:#f4e0aa}

/* Нить: одна прямая вертикаль по левому краю, от верха страницы до низа.
   Центр большой эмблемы класса лежит точно на нити; ниже она проходит через
   центры малых ромбов-узлов с перемычками к каждому блоку. */
.cls-wrap{position:relative}
.cls-wrap::before{content:'';position:absolute;left:var(--cls-rail-left);top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,var(--t-line) 60px,var(--t-line) 92%,transparent)}
/* Искра на нити: единственная, transform (позицию Y) задаёт JS — она лениво
   тянется за курсором по рельсу */
.cls-spark{
  position:absolute;
  z-index:0;
  left:var(--cls-rail-left);
  top:0;
  width:5px;
  height:5px;
  margin-left:-2.5px;
  border-radius:1.5px;
  background:#fff3c8;
  box-shadow:0 0 4px #fff3c8,0 0 11px rgba(244,198,104,.9),0 0 20px rgba(214,170,96,.5);
  opacity:0;
  pointer-events:none;
  transform:translateY(-20px) rotate(45deg);
  transition:opacity .8s ease;
  will-change:transform;
}
.cls-spark.is-live{opacity:.9}
.cls-spark.is-suppressed{opacity:0}

/* Ползунок справа: своя нить + ромб-узел; тянешь — страница едет.
   Пока схвачен — искра слева гаснет, огонь горит на ромбе. */
.cls-page{scrollbar-width:none}
.cls-page::-webkit-scrollbar{display:none}
.cls-scrub{
  position:fixed;
  z-index:70;
  right:max(14px,calc((100vw - var(--cls-page-left) - var(--cls-workspace-max))/2 - 11px));
  top:110px;
  bottom:110px;
  width:22px;
  cursor:grab;
  touch-action:none;
}
.cls-scrub::before{
  content:'';
  position:absolute;
  left:50%;
  top:0;
  bottom:0;
  width:1px;
  margin-left:-.5px;
  background:linear-gradient(180deg,transparent,var(--t-line) 26px,var(--t-line) calc(100% - 26px),transparent);
}
.cls-scrub.dragging{cursor:grabbing}
.cls-scrub-thumb{
  position:absolute;
  left:50%;
  width:13px;
  height:13px;
  margin:-6.5px 0 0 -6.5px;
  border:1px solid var(--t-gold);
  background:var(--t-bg);
  transform:rotate(45deg);
  transition:box-shadow .25s ease,background .25s ease,border-color .25s ease;
}
.cls-scrub:hover .cls-scrub-thumb{border-color:rgba(244,224,170,.85);box-shadow:0 0 8px rgba(214,170,96,.35)}
.cls-scrub.dragging .cls-scrub-thumb{
  border-color:#fff0bd;
  background:#d6aa60;
  box-shadow:0 0 5px #fff3c8,0 0 13px rgba(244,198,104,.9),0 0 24px rgba(214,170,96,.55);
}
@media (max-width:820px){
  .cls-scrub{display:none}
  .cls-page{scrollbar-width:auto}
}
.cls-thread{position:relative;padding-left:30px}
.cls-thread-node{position:relative}
.cls-thread-node::before{content:'';position:absolute;left:-30px;top:18px;width:11px;height:11px;border:1px solid var(--t-gold);background:var(--t-bg);transform:rotate(45deg);z-index:1}
/* искра зажигает узел, проходя мимо */
.cls-thread-node.is-lit::before{animation:cls-node-lit .7s ease-out}
@keyframes cls-node-lit{
  0%{border-color:#fff0bd;background:#d6aa60;box-shadow:0 0 6px #fff0bd,0 0 15px rgba(214,170,96,.9)}
  100%{border-color:var(--t-gold);background:var(--t-bg);box-shadow:none}
}
/* перемычка нить → блок */
.cls-thread-node::after{content:'';position:absolute;left:-19px;top:23px;width:19px;height:1px;background:var(--t-line)}
.cls-emblem-box{position:relative;z-index:1;flex:none;display:flex;align-items:center;justify-content:center;width:150px;height:150px;margin-left:var(--cls-emblem-margin-left);margin-right:var(--cls-emblem-margin-right);border-radius:18px;text-decoration:none;cursor:pointer;transition:transform .18s,background .18s,box-shadow .18s}
.cls-emblem-box::before{content:'';position:absolute;z-index:0;width:120px;height:120px;border-radius:9px;background:var(--t-bg);transform:rotate(45deg)}
.cls-emblem-box:hover{background:rgba(255,255,255,.025);box-shadow:0 0 0 1px rgba(214,170,96,.14),0 18px 44px rgba(0,0,0,.18);transform:translateY(-1px)}
.cls-emblem-box:focus-visible{outline:2px solid rgba(244,224,170,.72);outline-offset:4px}
.cls-emblem-frame{position:absolute;z-index:1;width:120px;height:120px;transform:rotate(45deg);border:1px solid rgba(214,170,96,.5);border-radius:9px;box-shadow:0 0 22px rgba(214,170,96,.18)}
.cls-emblem-box.is-lit .cls-emblem-frame{animation:cls-emblem-lit .7s ease-out}
.cls-emblem{position:relative;z-index:2;width:120px;height:120px;background-size:contain;background-repeat:no-repeat;background-position:center;filter:drop-shadow(0 0 16px rgba(214,170,96,.3))}
.cls-eyebrow{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cls-title{font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:rgba(246,248,255,.96);line-height:1}
.cls-en{font-family:'Hanken Grotesk',sans-serif;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--t-faint);margin-top:6px}
.cls-toolbar{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-top:30px;padding:4px 0}
.cls-icon-tools,.cls-section-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cls-icon-tools{align-self:flex-start;padding-top:4px}
.cls-icon-btn{display:grid;place-items:center;width:36px;height:36px;border:1px solid var(--t-line);border-radius:8px;background:transparent;color:var(--t-muted);cursor:pointer;transition:.16s ease}
.cls-icon-btn svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.cls-icon-btn:hover{border-color:rgba(214,170,96,.5);color:var(--t-gold-soft)}
.cls-icon-btn.close:hover{border-color:rgba(220,120,120,.45);color:rgba(255,210,210,.95)}
.cls-section-btn{min-height:34px;border:1px solid rgba(214,170,96,.28);border-radius:999px;background:rgba(214,170,96,.06);color:rgba(244,224,170,.88);font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:0 13px;cursor:pointer}
.cls-section-btn:hover,.cls-section-btn.active{background:rgba(214,170,96,.14);border-color:rgba(214,170,96,.5)}
.cls-tool-message{font-family:'Hanken Grotesk',sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.48)}
.cls-filter-modal{position:fixed;inset:0;z-index:200;background:rgba(3,4,7,.62);backdrop-filter:blur(8px);display:flex;align-items:flex-start;justify-content:center;padding:48px 18px;overflow:auto}
.cls-filter-window{width:min(760px,100%);border:1px solid rgba(92,142,236,.85);border-radius:8px;background:rgba(18,28,33,.98);box-shadow:0 20px 80px rgba(0,0,0,.48);color:rgba(226,230,244,.9)}
.cls-filter-top{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035)}
.cls-filter-label{font-family:'Hanken Grotesk',sans-serif;font-size:20px;font-weight:700;letter-spacing:.02em;color:rgba(236,240,252,.98)}
.cls-filter-subtitle{margin-top:3px;font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.48)}
.cls-filter-close{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(255,255,255,.1);border-radius:9px;background:rgba(255,255,255,.1);color:rgba(236,240,252,.9);font-size:24px;line-height:1;cursor:pointer}
.cls-filter-close:hover{background:rgba(255,255,255,.16)}
.cls-filter-section{margin:14px;border:1px solid rgba(92,142,236,.55);border-radius:8px;background:rgba(5,10,14,.26);padding:13px}
.cls-filter-section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.cls-filter-section-head span{font-family:'Hanken Grotesk',sans-serif;font-size:14px;font-weight:700;color:rgba(236,240,252,.96)}
.cls-filter-reset{border:0;background:transparent;color:rgba(226,230,244,.55);font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}
.cls-filter-reset:hover{color:rgba(244,224,170,.92)}
.cls-filter-pills{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cls-filter-pill{border:1px solid rgba(255,255,255,.08);border-radius:999px;background:rgba(55,101,190,.72);color:rgba(236,240,252,.95);font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:700;padding:7px 11px;cursor:pointer}
.cls-filter-pill:hover{background:rgba(72,123,220,.82)}
.cls-filter-pill.active{border-color:rgba(244,224,170,.75);background:rgba(214,170,96,.2);color:rgba(244,224,170,.98)}
.cls-filter-footer{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;padding:0 14px 14px}
.cls-mode-panel{margin-top:26px;padding:14px 0 4px;border-top:1px solid rgba(232,236,248,.06)}
.cls-mode-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.cls-mode-btn{min-height:36px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(7,8,12,.32);color:rgba(226,230,244,.65);font-family:'Hanken Grotesk',sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:0 16px;cursor:pointer;transition:all .18s}
.cls-mode-btn:hover:not(:disabled){border-color:rgba(214,170,96,.45);color:rgba(244,224,170,.95)}
.cls-mode-btn.active{border-color:rgba(214,170,96,.6);background:rgba(214,170,96,.13);color:rgba(244,224,170,.98)}
.cls-mode-btn:disabled{opacity:.42;cursor:default}
/* Раскрытая карточка больше не бокс-в-боксе: это плоский поток секций, каждая
   из которых висит узлом на левой нити (заголовок, обзор, таблица, умения). */
.cls-build-panel{--subclass-accent:126,196,184;--subclass-strong:151,220,207;display:flex;flex-direction:column;gap:22px;margin-top:26px}
.cls-node-wrap{position:relative}
.cls-build-top{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:start}
.cls-build-main h2{margin:6px 0 10px;font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1.05;letter-spacing:.03em;text-transform:uppercase;color:rgba(236,240,252,.96)}
.cls-build-main p{max-width:760px;margin:0;font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.56;color:rgba(226,230,244,.72)}
.cls-build-meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:14px;font-family:'Hanken Grotesk',sans-serif;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.46)}
.cls-source-row{display:flex;flex-direction:column;align-items:flex-end;gap:9px;min-width:180px;padding-left:20px}
.cls-source-row>span,.cls-summary-pill span{font-family:'Hanken Grotesk',sans-serif;font-size:9px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cls-source-row div{display:flex;align-items:center;justify-content:flex-end;gap:6px;flex-wrap:wrap}
.cls-mini-source{display:inline-flex;border-radius:6px;background:rgba(214,170,96,.85);color:rgba(20,15,6,.95);font-family:'Hanken Grotesk',sans-serif;font-size:9px;font-weight:800;letter-spacing:.08em;text-decoration:none;padding:4px 7px}
.cls-tab-content{display:flex;flex-direction:column;gap:14px}
.cls-description-tab{gap:18px}
.cls-description-panel{border-top:1px solid rgba(255,255,255,.075);background:transparent;padding:24px 4px 2px}
.cls-description-panel:first-child{border-top:0}
.cls-description-intro-panel{border:1px solid rgba(214,170,96,.18);border-radius:12px;background:linear-gradient(145deg,rgba(214,170,96,.07),rgba(255,255,255,.018) 58%,rgba(7,8,12,.16));box-shadow:inset 0 1px 0 rgba(255,255,255,.035);padding:22px}
.cls-description-panel.accent{border-color:rgba(214,170,96,.2);background:rgba(214,170,96,.035)}
.cls-description-panel.muted{background:rgba(255,255,255,.018)}
.cls-description-panel h3,.cls-spell-tab-head h3,.cls-filter-card-head h3{margin:5px 0 0;font-family:'Cormorant Garamond',serif;font-size:26px;line-height:1.12;letter-spacing:.025em;text-transform:none;color:rgba(236,240,252,.95);font-weight:600;text-align:left}
.cls-description-panel>p{margin:10px 0 0;font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.56;color:rgba(226,230,244,.72)}
.cls-description-head,.cls-spell-tab-head,.cls-filter-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px}
.cls-description-prose{display:flex;max-width:880px;flex-direction:column;gap:12px;margin-top:14px;font-family:'Hanken Grotesk',sans-serif;font-size:14.5px;line-height:1.68;color:rgba(226,230,244,.78)}
.cls-description-intro-panel .cls-description-prose{max-width:930px;font-size:15px;color:rgba(226,230,244,.82)}
.cls-description-prose p{margin:0}
.cls-description-notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin-top:16px}
.cls-description-note{border:1px solid rgba(214,170,96,.14);border-radius:10px;background:linear-gradient(180deg,rgba(214,170,96,.055),rgba(7,8,12,.18));padding:14px 16px}
.cls-description-note h4{margin:0 0 7px;font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.cls-description-note p{margin:0;font-family:'Hanken Grotesk',sans-serif;font-size:14px;line-height:1.58;color:rgba(226,230,244,.77)}
.cls-description-table{max-width:920px;margin-top:18px;border:1px solid rgba(214,170,96,.18);border-radius:10px;overflow:hidden;background:rgba(5,6,10,.22)}
.cls-description-table-head,.cls-description-table-row{display:grid;grid-template-columns:54px minmax(0,1fr)}
.cls-description-table-head{background:linear-gradient(90deg,rgba(214,170,96,.2),rgba(214,170,96,.09))}
.cls-description-table-head span{font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:rgba(244,224,170,.95)}
.cls-description-table-row{border-top:1px solid rgba(255,255,255,.055)}
.cls-description-table-row:nth-child(odd){background:rgba(255,255,255,.018)}
.cls-description-table span{padding:10px 13px}
.cls-description-table span+span{border-left:1px solid rgba(255,255,255,.055)}
.cls-description-table-row span:first-child{display:flex;align-items:center;justify-content:center;font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:800;color:rgba(244,224,170,.9)}
.cls-description-table-row span:last-child{font-family:'Hanken Grotesk',sans-serif;font-size:14px;line-height:1.5;color:rgba(226,230,244,.8)}
.cls-class-spell-list{display:flex;flex-direction:column;gap:10px}
.cls-spell-tags{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:0 0 12px}
.cls-spell-tags span{border:1px solid rgba(214,170,96,.18);border-radius:999px;background:rgba(214,170,96,.08);padding:4px 9px;font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:rgba(244,224,170,.82)}
.cls-tab-content .cls-stub{margin-top:0}
.cls-build-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.cls-summary-pill{display:flex;min-height:64px;flex-direction:column;justify-content:center;gap:6px;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:rgba(7,8,12,.34);padding:12px 14px;text-align:left;cursor:pointer}
.cls-summary-pill:hover{border-color:rgba(214,170,96,.32)}
.cls-summary-pill:hover{background:rgba(214,170,96,.08)}
.cls-summary-pill strong{font-family:'Cormorant Garamond',serif;font-size:19px;line-height:1.1;color:rgba(244,224,170,.92);font-weight:600}
.cls-rule-panels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.cls-rule-panel{overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(7,8,12,.24)}
.cls-rule-panel.balanced{display:flex;flex-direction:column;align-self:stretch}
.cls-rule-panel.wide{grid-column:1/-1}
.cls-rule-head{width:100%;display:grid;grid-template-columns:28px minmax(0,1fr) auto;align-items:center;gap:10px;border:0;background:rgba(255,255,255,.028);color:inherit;text-align:left;padding:13px 15px;cursor:pointer}
.cls-rule-head:hover{background:rgba(214,170,96,.08)}
.cls-rule-mark{display:grid;place-items:center;width:24px;height:24px;border:1px solid rgba(214,170,96,.36);border-radius:50%;font-family:'Hanken Grotesk',sans-serif;font-size:13px;color:rgba(244,224,170,.95)}
.cls-rule-head span:not(.cls-rule-mark):not(.cls-feature-count){font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.06em;text-transform:uppercase;color:rgba(236,240,252,.92)}
.cls-rule-head small{font-family:'Hanken Grotesk',sans-serif;font-size:9px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cls-rule-body{border-top:1px solid rgba(255,255,255,.06)}
.cls-rule-panel.balanced .cls-rule-body{display:grid;grid-template-rows:repeat(4,minmax(44px,max-content)) minmax(max-content,1fr);flex:1}
.cls-rule-row{display:grid;grid-template-columns:minmax(128px,.36fr) minmax(0,1fr);align-items:stretch;border-top:1px solid rgba(255,255,255,.045)}
.cls-rule-row:first-child{border-top:0}
.cls-rule-row strong{display:flex;align-items:center;padding:8px 14px;background:rgba(214,170,96,.07);font-family:'Hanken Grotesk',sans-serif;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(244,224,170,.88)}
.cls-rule-row span{display:flex;align-items:center;padding:8px 14px;border-left:1px solid rgba(255,255,255,.045);font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.32;color:rgba(226,230,244,.79)}
.cls-rule-row.note strong,.cls-rule-row.note span,.cls-rule-row:last-child strong,.cls-rule-row:last-child span{align-items:flex-start}
.cls-rule-row.note span{font-style:normal;color:rgba(226,230,244,.78)}
.cls-rule-row .equip-label{font-size:9px;line-height:1.22;letter-spacing:.055em}
.cls-class-table-panel{overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(7,8,12,.24)}
.cls-table-headline{border-bottom:1px solid rgba(255,255,255,.06)}
.cls-class-features-panel{overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,.018),rgba(7,8,12,.24))}
.cls-features-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;border-bottom:1px solid rgba(232,236,248,.08);padding:8px 2px 12px}
/* Умения: плоский список, каждое умение — узел на нити (ромб вместо коробки) */
.cls-features-list{display:flex;flex-direction:column;gap:12px;margin-top:2px}
.cls-features-heading h3{margin:4px 0 0;font-family:'Cormorant Garamond',serif;font-size:24px;letter-spacing:.08em;text-transform:uppercase;color:rgba(236,240,252,.94);font-weight:500}
.cls-features-body{display:flex;flex-direction:column;gap:0;padding:20px 24px 26px}
.cls-features-body .cls-stub{margin-top:0}
.cls-feature-count{justify-self:end;border-radius:999px;background:rgba(214,170,96,.12);border:1px solid rgba(214,170,96,.28);padding:3px 9px;font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:800;letter-spacing:.08em;color:rgba(244,224,170,.92)}
.cls-source-filter{margin-left:auto;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.cls-source-filter span{font-family:'Hanken Grotesk',sans-serif;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cls-source-pill{border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.025);color:rgba(226,230,244,.62);font-family:'Cormorant Garamond',serif;font-size:14px;padding:5px 12px;cursor:pointer}
.cls-source-pill.active{border-color:rgba(214,170,96,.55);background:rgba(214,170,96,.12);color:rgba(244,224,170,.95)}
.cls-arch-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-top:14px}
.cls-arch-card{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:5px;min-height:126px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.018);padding:15px 16px;text-align:left;cursor:pointer;transition:all .2s}
.cls-arch-card:hover{border-color:rgba(214,170,96,.36);background:rgba(255,255,255,.04);transform:translateY(-1px)}
.cls-arch-card.active{border-color:rgba(214,170,96,.65);background:rgba(214,170,96,.09)}
.cls-arch-source{font-family:'Hanken Grotesk',sans-serif;font-size:9px;font-weight:700;letter-spacing:.12em;color:rgba(20,15,6,.95);background:rgba(214,170,96,.85);border-radius:6px;padding:3px 7px}
.cls-arch-name{font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.04;color:rgba(244,224,170,.96)}
.cls-arch-meta{font-family:'Hanken Grotesk',sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45)}
.cls-arch-summary{font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1.36;color:rgba(226,230,244,.68)}
.cls-arch-empty{margin-top:14px;border:1px dashed rgba(255,255,255,.12);border-radius:12px;padding:16px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(226,230,244,.48)}
.cls-grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:38px}
.cls-card{border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.018);padding:22px 24px}
.cls-card-title{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.92);margin-bottom:14px}
.cls-card-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;border:0;background:transparent;color:inherit;padding:0;text-align:left;cursor:pointer}
.cls-card-toggle .cls-card-title{margin-bottom:0}
.cls-card-toggle:hover .cls-card-title{color:rgba(255,236,190,.98)}
.cls-card-mark{display:grid;place-items:center;flex:none;width:26px;height:26px;border:1px solid rgba(214,170,96,.36);border-radius:50%;font-family:'Hanken Grotesk',sans-serif;font-size:16px;color:rgba(244,224,170,.92)}
.cls-card-body{display:flex;flex-direction:column;gap:9px;font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(226,230,244,.82);line-height:1.4}
.cls-card-toggle + .cls-card-body{margin-top:14px}
.dim{color:rgba(226,230,244,.45)}
.cls-h2{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.1em;text-transform:uppercase;color:rgba(236,240,252,.92);margin:46px 0 18px}
.cls-table-wrap{border:1px solid rgba(255,255,255,.09);border-radius:14px;overflow:hidden}
.cls-table-wrap.in-card{border:0;border-radius:0;overflow:auto;background:rgba(4,5,8,.2)}
.cls-table{display:grid;align-items:stretch}
.cls-table-head{padding:11px 6px;background:rgba(214,170,96,.1);font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.92);text-align:center;border-bottom:1px solid rgba(255,255,255,.1)}
.cls-table-cell.feature.has-archetype-parts{position:relative}
.cls-table-feature-part{display:inline;color:rgba(226,230,244,.72)}
.cls-table-feature-part:not(:last-child)::after{content:', ';color:rgba(226,230,244,.42)}
.cls-table-feature-part.archetype{color:rgba(var(--subclass-strong),.96);font-weight:800;text-shadow:0 0 12px rgba(var(--subclass-accent),.2)}
.cls-table-feature-link{border:0;background:transparent;padding:0;font:inherit;line-height:inherit;text-align:left;color:rgba(138,176,255,.92);cursor:pointer;text-decoration:underline;text-decoration-color:rgba(138,176,255,.28);text-underline-offset:3px}
.cls-table-feature-link:hover{color:rgba(244,224,170,.98);text-decoration-color:rgba(244,224,170,.75)}
.cls-table-feature-link.archetype:hover{color:rgba(var(--subclass-strong),1);text-decoration-color:rgba(var(--subclass-accent),.8)}
.cls-info-toggle{margin:14px 0 8px;padding:12px 16px}
.cls-info-toggle .cls-collapsible-title,.cls-table-toggle .cls-collapsible-title{font-size:20px;letter-spacing:.07em}
.cls-info-toggle .cls-collapsible-hint,.cls-table-toggle .cls-collapsible-hint{font-size:10px}
.cls-info-toggle .cls-chevron,.cls-table-toggle .cls-chevron{font-size:13px}
.cls-info-table{border:1px solid rgba(255,255,255,.09);border-radius:14px;overflow:hidden;background:rgba(255,255,255,.012)}
.cls-info-row{display:grid;grid-template-columns:minmax(150px,.32fr) minmax(0,1fr);border-top:1px solid rgba(255,255,255,.055)}
.cls-info-row:first-child{border-top:0}
.cls-info-row strong{padding:12px 16px;background:rgba(214,170,96,.075);font-family:'Hanken Grotesk',sans-serif;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,224,170,.88)}
.cls-info-row span{padding:12px 16px;border-left:1px solid rgba(255,255,255,.055);font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.45;color:rgba(226,230,244,.8)}
.cls-info-row.note span{font-style:italic;color:rgba(226,230,244,.62)}
.cls-equip-row{display:flex;gap:12px;align-items:baseline;font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(226,230,244,.82)}
.cls-equip-card{margin-top:46px}
.cls-card-toggle + .cls-equip-row,.cls-card-toggle + div{margin-top:14px}
.cls-equip-note{margin-top:14px;font-family:'Hanken Grotesk',sans-serif;font-size:12.5px;font-style:italic;color:rgba(226,230,244,.5)}
.cls-subclass-description{margin-top:0;border:1px solid rgba(var(--subclass-accent),.28);border-radius:14px;background:linear-gradient(145deg,rgba(var(--subclass-accent),.065),rgba(214,170,96,.032));padding:24px}
.cls-subclass-description-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px}
.cls-subclass-description-title{font-family:'Cormorant Garamond',serif;font-size:34px;letter-spacing:.03em;text-transform:uppercase;color:rgba(var(--subclass-strong),.96);line-height:1.04;margin-top:6px;text-shadow:0 0 18px rgba(var(--subclass-accent),.16)}
.cls-subclass-description-text{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px 22px;margin-top:16px;font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.6;color:rgba(226,230,244,.76)}
.cls-subclass-description-text p{margin:0}
.cls-feature-head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.cls-feature-name{font-family:'Cormorant Garamond',serif;font-size:27px;line-height:1.08;font-weight:500;letter-spacing:.035em;color:rgba(236,240,252,.96)}
.cls-feature-card{position:relative;scroll-margin-top:24px;padding:0;overflow:hidden;border:1px solid rgba(214,170,96,.13);border-radius:12px;background:linear-gradient(145deg,rgba(214,170,96,.045),rgba(255,255,255,.012) 42%,rgba(6,8,12,.36));box-shadow:inset 0 1px 0 rgba(255,255,255,.035)}
.cls-feature-card::before{content:'';position:absolute;inset:0 auto 0 0;width:3px;background:linear-gradient(180deg,rgba(214,170,96,.2),rgba(214,170,96,.72),rgba(214,170,96,.12));opacity:.9}
/* карточка умения как узел нити: ромб на рельсе (перекрывает левую акцент-полосу) + перемычка */
.cls-feature-card.cls-thread-node{overflow:visible}
.cls-feature-card.cls-thread-node::before{inset:auto;left:-30px;top:19px;width:11px;height:11px;background:var(--t-bg);border:1px solid var(--t-gold);border-radius:0;transform:rotate(45deg);opacity:1;z-index:2}
.cls-feature-card.cls-thread-node.is-archetype-feature::before{border-color:rgba(var(--subclass-accent),.85)}
.cls-feature-card + .cls-feature-card{margin-top:14px}
.cls-feature-card[open]{border-color:rgba(214,170,96,.24);background:linear-gradient(145deg,rgba(214,170,96,.06),rgba(255,255,255,.014) 48%,rgba(6,8,12,.32))}
.cls-feature-card.is-archetype-feature{border-color:rgba(var(--subclass-accent),.24);background:linear-gradient(145deg,rgba(var(--subclass-accent),.06),rgba(255,255,255,.012) 44%,rgba(6,8,12,.34))}
.cls-feature-card.is-archetype-feature::before{background:linear-gradient(180deg,rgba(var(--subclass-accent),.18),rgba(var(--subclass-accent),.78),rgba(var(--subclass-accent),.14))}
.cls-feature-card.is-archetype-feature[open]{border-color:rgba(var(--subclass-accent),.36);background:linear-gradient(145deg,rgba(var(--subclass-accent),.075),rgba(255,255,255,.014) 48%,rgba(6,8,12,.32))}
.cls-feature-card.is-archetype-feature .cls-feature-name{color:rgba(var(--subclass-strong),.96);text-shadow:0 0 14px rgba(var(--subclass-accent),.12)}
.cls-feature-card.is-scroll-target{animation:cls-feature-pulse 1.45s ease-out}
@keyframes cls-feature-pulse{
  0%{box-shadow:0 0 0 0 rgba(214,170,96,.42), inset 0 1px 0 rgba(255,255,255,.035)}
  42%{box-shadow:0 0 0 5px rgba(214,170,96,.11), 0 0 34px rgba(214,170,96,.16), inset 0 1px 0 rgba(255,255,255,.05)}
  100%{box-shadow:0 0 0 0 rgba(214,170,96,0), inset 0 1px 0 rgba(255,255,255,.035)}
}
.cls-feature-summary{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;align-items:start;list-style:none;border-bottom:1px solid rgba(214,170,96,.12);padding:17px 18px 14px 22px;cursor:pointer}
.cls-feature-summary::-webkit-details-marker{display:none}
.cls-feature-summary:hover .cls-feature-name{color:rgba(255,236,190,.98)}
.cls-feature-card[open] .cls-feature-summary{background:transparent}
.cls-feature-card.is-archetype-feature .cls-feature-summary{border-bottom-color:rgba(var(--subclass-accent),.18);box-shadow:none}
.cls-feature-card.is-archetype-feature[open] .cls-feature-summary{background:transparent}
.cls-feature-mark{display:inline-grid;place-items:center;width:24px;height:24px;border:1px solid rgba(214,170,96,.28);border-radius:50%;background:rgba(7,8,12,.28);font-family:'Hanken Grotesk',sans-serif;font-size:15px;font-weight:600;line-height:1;color:rgba(244,224,170,.86)}
.cls-feature-card.is-archetype-feature .cls-feature-mark{border-color:rgba(var(--subclass-accent),.36);color:rgba(var(--subclass-strong),.86);background:rgba(var(--subclass-accent),.08)}
.cls-feature-mark::before{content:'+'}
.cls-feature-card[open] .cls-feature-mark::before{content:'−'}
.cls-feature-summary-main{display:flex;min-width:0;flex-direction:column;gap:3px}
.cls-feature-meta-row{display:flex;align-items:center;justify-content:flex-end;gap:14px;white-space:nowrap;padding-top:2px}
.cls-feature-summary .cls-badge{border:1px solid rgba(214,170,96,.22);border-radius:7px;background:rgba(214,170,96,.12);padding:4px 8px;font-size:10px;font-weight:800;letter-spacing:.1em;color:rgba(244,224,170,.92)}
.cls-feature-card.is-archetype-feature .cls-feature-summary .cls-badge{border-color:rgba(var(--subclass-accent),.28);background:rgba(var(--subclass-accent),.1);color:rgba(var(--subclass-strong),.9)}
.cls-feature-content{padding:16px 22px 22px}
.cls-badge{font-family:'Hanken Grotesk',sans-serif;font-size:9.5px;font-weight:600;letter-spacing:.1em;color:rgba(20,15,6,.95);background:rgba(214,170,96,.85);border-radius:6px;padding:3px 7px}
.cls-badge.alt{border:1px solid rgba(214,170,96,.35);background:rgba(214,170,96,.1);color:rgba(244,224,170,.9)}
.cls-feature-lvl{font-family:'Hanken Grotesk',sans-serif;font-size:10.5px;line-height:1.25;letter-spacing:.13em;text-transform:uppercase;color:rgba(226,230,244,.44)}
.cls-feature-text{font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.5;color:rgba(226,230,244,.78)}
.cls-inline-bold{font-weight:700;color:rgba(244,224,170,.96)}
.cls-feature-text.rich{display:flex;flex-direction:column;gap:10px}
.cls-feature-text.rich p{margin:0}
.cls-feature-prose{display:flex;max-width:900px;flex-direction:column;gap:13px;font-family:'Cormorant Garamond',serif;font-size:18px;line-height:1.55;color:rgba(226,230,244,.8)}
.cls-feature-prose.compact{font-size:17px;gap:12px}
.cls-feature-prose p{margin:0}
.cls-feature-section{display:flex;flex-direction:column;gap:3px}
.cls-feature-section h4{margin:0;font-family:'Hanken Grotesk',sans-serif;font-size:11.5px;line-height:1.25;font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.cls-feature-card.is-archetype-feature .cls-feature-section h4{color:rgba(var(--subclass-strong),.92)}
.cls-feature-section p{margin:0}
.cls-feature-list{display:flex;flex-direction:column;gap:8px;margin:0;padding:0 0 0 22px}
.cls-feature-list li{padding-left:2px}
.cls-feature-list li::marker{color:rgba(244,224,170,.78)}
.cls-inline-infusions{display:flex;flex-direction:column;gap:14px;margin-top:16px}
.cls-inline-infusion-card .cls-feature-name{font-size:21px}
.cls-inline-infusion-card .cls-feature-lvl{letter-spacing:.05em;text-transform:none}
.cls-inline-infusion-card .cls-feature-text{font-size:16.5px}
.cls-feature-prose.is-relic-list .cls-feature-list{list-style:disc outside;padding-left:24px}
.cls-feature-prose.is-relic-list .cls-feature-list li::marker{color:rgba(var(--subclass-strong,244,224,170),.96);font-size:.9em}
.cls-feature-prose.is-relic-list .cls-dance-option{color:rgba(var(--subclass-strong,244,224,170),.96)}
.cls-feature-prose.is-bullet-list .cls-feature-list{list-style:disc outside;padding-left:30px}
.cls-feature-prose.is-bullet-list .cls-feature-list li::marker{color:rgba(var(--subclass-strong,244,224,170),.96);font-size:.95em}
.cls-dice-token{position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:2.2em;margin:0 .1em;border:1px solid rgba(var(--subclass-accent,214,170,96),.24);border-radius:7px;background:rgba(var(--subclass-accent,214,170,96),.09);padding:0 .38em;font-family:'Hanken Grotesk',sans-serif;font-size:.78em;font-weight:800;line-height:1.45;letter-spacing:.04em;color:rgba(var(--subclass-strong,244,224,170),.94);vertical-align:.08em;cursor:pointer;user-select:none;transition:background .16s ease,border-color .16s ease,transform .1s ease}
.cls-dice-token:hover{border-color:rgba(var(--subclass-strong,244,224,170),.62);background:rgba(var(--subclass-accent,214,170,96),.17)}
.cls-dice-token:active{transform:translateY(1px)}
.cls-dice-token:focus-visible{outline:1px solid rgba(var(--subclass-strong,244,224,170),.7);outline-offset:2px}
.cls-dice-token.is-rolled::after{content:attr(data-roll);position:absolute;left:50%;bottom:calc(100% + 7px);z-index:20;min-width:30px;transform:translateX(-50%);border:1px solid rgba(var(--subclass-accent,214,170,96),.42);border-radius:8px;background:rgba(13,15,21,.97);box-shadow:0 8px 24px rgba(0,0,0,.42);padding:5px 9px;font-family:'Hanken Grotesk',sans-serif;font-size:15px;font-weight:900;line-height:1;color:rgba(var(--subclass-strong,244,224,170),1);text-align:center;letter-spacing:0;pointer-events:none;animation:cls-dice-pop .16s ease-out}
@keyframes cls-dice-pop{from{opacity:0;transform:translate(-50%,4px) scale(.92)}to{opacity:1;transform:translate(-50%,0) scale(1)}}
.cls-dice-group{display:flex;flex-direction:column;gap:10px;margin:4px 0 2px;border:1px solid rgba(var(--subclass-accent,214,170,96),.16);border-radius:12px;background:linear-gradient(145deg,rgba(var(--subclass-accent,214,170,96),.055),rgba(255,255,255,.012));padding:12px 14px 14px}
.cls-dice-group .cls-feature-list{padding-left:20px}
.cls-dice-group .cls-feature-list li{line-height:1.58}
.cls-dance-option{display:inline;font-family:'Hanken Grotesk',sans-serif;font-size:.82em;font-weight:900;letter-spacing:.035em;color:rgba(var(--subclass-strong,244,224,170),.96);text-shadow:0 0 14px rgba(var(--subclass-accent,214,170,96),.12)}
.cls-inline-reference{color:rgba(var(--subclass-strong,244,224,170),.98);font-weight:900;text-decoration:underline;text-decoration-color:rgba(var(--subclass-accent,214,170,96),.55);text-decoration-thickness:1px;text-underline-offset:3px;transition:color .16s ease,text-decoration-color .16s ease}
.cls-inline-reference:hover{color:#fff2c8;text-decoration-color:currentColor}
.cls-inline-reference:focus-visible{border-radius:3px;outline:1px solid rgba(var(--subclass-strong,244,224,170),.8);outline-offset:2px}
.cls-dance-option::after{content:' ';white-space:pre}
.cls-feature-prose.is-option-list .cls-feature-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;padding:0;list-style:none}
.cls-feature-prose.is-option-list .cls-feature-list li{position:relative;padding:13px 15px 13px 18px;border:1px solid rgba(var(--subclass-accent,214,170,96),.14);border-radius:9px;background:rgba(var(--subclass-accent,214,170,96),.035);line-height:1.5}
.cls-feature-prose.is-option-list .cls-feature-list li::before{content:'';position:absolute;left:0;top:12px;bottom:12px;width:2px;border-radius:2px;background:rgba(var(--subclass-accent,214,170,96),.55)}
.cls-feature-prose.is-option-list .cls-dance-option{display:block;margin-bottom:4px;font-size:.88em}
.cls-feature-prose.is-weapon-link>p:has(.cls-dance-option){padding:13px 15px;border:1px solid rgba(var(--subclass-accent,214,170,96),.13);border-radius:9px;background:rgba(var(--subclass-accent,214,170,96),.03)}
.cls-feature-prose.is-weapon-link>p:has(.cls-dance-option) .cls-dance-option{display:block;margin-bottom:5px;font-size:.88em}
.cls-dice-heading{align-self:flex-start;border:1px solid rgba(var(--subclass-accent,214,170,96),.36);border-radius:999px;background:rgba(var(--subclass-accent,214,170,96),.12);padding:5px 11px;font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:900;line-height:1;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--subclass-strong,244,224,170),.96);box-shadow:0 0 18px rgba(var(--subclass-accent,214,170,96),.08)}
.cls-feature-table-wrap{max-width:100%;overflow:auto;border:1px solid rgba(214,170,96,.18);border-radius:10px;background:rgba(7,8,12,.24)}
.cls-table-roll-control{position:sticky;left:0;z-index:2;display:flex;align-items:flex-start;gap:12px;border-bottom:1px solid rgba(var(--subclass-accent,214,170,96),.18);background:linear-gradient(135deg,rgba(var(--subclass-accent,214,170,96),.1),rgba(7,8,12,.88));padding:12px}
.cls-table-roll-button{flex:0 0 auto;border:1px solid rgba(var(--subclass-strong,244,224,170),.5);border-radius:9px;background:rgba(var(--subclass-accent,214,170,96),.14);padding:8px 13px;font-family:'Hanken Grotesk',sans-serif;font-size:11px;font-weight:900;letter-spacing:.06em;color:rgba(var(--subclass-strong,244,224,170),.98);cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .1s ease}
.cls-table-roll-button:hover{border-color:rgba(var(--subclass-strong,244,224,170),.82);background:rgba(var(--subclass-accent,214,170,96),.24)}
.cls-table-roll-button:active{transform:translateY(1px)}
.cls-table-roll-button:focus-visible{outline:1px solid rgba(var(--subclass-strong,244,224,170),.9);outline-offset:2px}
.cls-table-roll-result{display:flex;min-width:0;flex-direction:column;gap:2px;font-family:'Hanken Grotesk',sans-serif;font-size:11px;line-height:1.45;color:rgba(226,230,244,.72)}
.cls-table-roll-result strong{color:rgba(var(--subclass-strong,244,224,170),.98);font-size:12px}
.cls-feature-table tr.is-roll-match td{background:rgba(var(--subclass-accent,214,170,96),.18);box-shadow:inset 3px 0 0 rgba(var(--subclass-strong,244,224,170),.88);color:rgba(245,246,252,.96)}
.cls-feature-table{width:100%;border-collapse:collapse;font-family:'Hanken Grotesk',sans-serif;font-size:12.5px;line-height:1.45;color:rgba(226,230,244,.78)}
.cls-feature-table th{padding:9px 10px;background:rgba(214,170,96,.12);font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.92);text-align:left;white-space:nowrap}
.cls-feature-table td{padding:9px 10px;border-top:1px solid rgba(255,255,255,.06);vertical-align:top}
.cls-feature-table tr:nth-child(even) td{background:rgba(255,255,255,.018)}
.cls-feature-example{margin:2px 0;border-left:2px solid rgba(214,170,96,.65);border-radius:0 10px 10px 0;background:linear-gradient(90deg,rgba(214,170,96,.085),rgba(255,255,255,.025));padding:13px 16px;font-family:'Hanken Grotesk',sans-serif;font-size:13.5px;line-height:1.5;color:rgba(226,230,244,.8)}
.cls-feature-formula{align-self:flex-start;border:1px solid rgba(214,170,96,.16);border-radius:10px;background:rgba(214,170,96,.055);padding:10px 14px;text-align:left;font-family:'Hanken Grotesk',sans-serif;font-size:13.5px;line-height:1.4;color:rgba(236,240,252,.9)}
.cls-feature-formula strong{font-weight:800;color:rgba(236,240,252,.98)}
.cls-spell-table{margin-top:14px;border:1px solid rgba(214,170,96,.22);border-radius:10px;overflow:hidden;max-width:420px}
.cls-spell-table-head{display:grid;grid-template-columns:130px 1fr;background:rgba(214,170,96,.12);font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.cls-spell-table-row{display:grid;grid-template-columns:130px 1fr;border-top:1px solid rgba(255,255,255,.05);font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(226,230,244,.82)}
.cls-collapsible{display:flex;align-items:center;gap:14px;margin:40px 0 0;padding:12px 2px;border-bottom:1px solid rgba(232,236,248,.08);cursor:pointer}
.cls-collapsible.cls-thread-node::before{top:16px}
.cls-collapsible.cls-thread-node::after{top:21px}
.cls-table-toggle{margin:28px 0 10px;padding:12px 16px}
.cls-collapsible:hover{background:rgba(255,255,255,.06)}
.cls-chevron{font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(244,224,170,.9)}
.cls-collapsible-title{flex:1;font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.06em;text-transform:uppercase;color:rgba(236,240,252,.92)}
.cls-collapsible-hint{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:rgba(226,230,244,.45)}
.cls-stub{margin-top:40px;border:1px dashed rgba(255,255,255,.14);border-radius:14px;padding:30px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:19px;color:rgba(226,230,244,.55)}
.cls-arch-detail{margin-top:34px}
.cls-arch-hero{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;border:1px solid rgba(214,170,96,.18);border-radius:14px;background:rgba(214,170,96,.045);padding:24px}
.cls-arch-detail-title{font-family:'Cormorant Garamond',serif;font-size:42px;letter-spacing:.03em;text-transform:uppercase;color:rgba(236,240,252,.96);line-height:1.04;margin-top:6px}
.cls-arch-detail-sub{font-family:'Hanken Grotesk',sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(214,170,96,.78);margin-top:6px}
.cls-arch-quote{margin:22px 0 18px;border-left:2px solid rgba(214,170,96,.45);padding:4px 0 4px 18px;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;line-height:1.55;color:rgba(244,224,170,.78)}
.cls-archetype-warning{display:flex;align-items:center;gap:14px;margin:18px 0;padding:14px 17px;border:1px solid rgba(255,190,64,.72);border-radius:10px;background:linear-gradient(100deg,rgba(255,135,24,.2),rgba(255,205,73,.08));box-shadow:0 0 24px rgba(255,153,31,.12);color:#ffe7a1}
.cls-archetype-warning.compact{margin:0 0 18px}
.cls-archetype-warning-mark{display:grid;flex:0 0 30px;width:30px;height:30px;place-items:center;border-radius:50%;background:#ffb52e;color:#171008;font-family:Inter,sans-serif;font-size:19px;font-weight:900;box-shadow:0 0 18px rgba(255,181,46,.38)}
.cls-archetype-warning div{display:flex;flex-direction:column;gap:2px}
.cls-archetype-warning strong{font-family:Inter,sans-serif;font-size:13px;letter-spacing:.09em;text-transform:uppercase;color:#ffd166}
.cls-archetype-warning span:not(.cls-archetype-warning-mark){font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.35;color:rgba(255,239,197,.82)}
.cls-arch-prose{display:flex;flex-direction:column;gap:12px;font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.62;color:rgba(226,230,244,.76)}
.cls-arch-prose p{margin:0}
.cls-arch-items-group{margin-top:16px;border:1px solid rgba(214,170,96,.18);border-radius:12px;background:rgba(7,8,12,.24);overflow:hidden}
.cls-arch-items-group>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;padding:14px 16px;font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.1;color:rgba(244,224,170,.96)}
.cls-arch-items-group>summary small{font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.5);white-space:nowrap}
.cls-arch-items-group .cls-arch-items{margin-top:0;padding:14px;border-top:1px solid rgba(214,170,96,.12)}
.cls-arch-roll{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 16px;border-top:1px solid rgba(214,170,96,.1);background:rgba(214,170,96,.035)}
.cls-arch-roll-btn{border:1px solid rgba(214,170,96,.42);border-radius:999px;background:rgba(214,170,96,.1);padding:8px 13px;font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,224,170,.95);cursor:pointer}
.cls-arch-roll-btn:hover{background:rgba(214,170,96,.18);border-color:rgba(244,224,170,.65)}
.cls-arch-roll-result{display:flex;align-items:center;gap:9px;min-width:0;font-family:'Hanken Grotesk',sans-serif;font-size:12px;color:rgba(226,230,244,.78)}
.cls-arch-roll-result strong{display:grid;place-items:center;min-width:24px;height:24px;border-radius:50%;background:rgba(214,170,96,.18);color:rgba(244,224,170,.96)}
.cls-arch-roll-result span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cls-arch-roll.implants{display:flex;align-items:flex-start;gap:18px;padding:18px 18px 20px;background:linear-gradient(180deg,rgba(214,170,96,.055),rgba(255,255,255,.012));}
.cls-arch-roll-btn.implant-roll-btn{display:inline-flex;align-items:center;gap:10px;border-radius:10px;padding:12px 22px;font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;letter-spacing:.06em}
.cls-arch-roll-btn.implant-roll-btn svg{width:20px;height:20px;flex:0 0 auto}
.cls-arch-roll-result.implant-result{display:flex;flex-direction:column;gap:14px;flex:1;min-width:280px;font-family:'Hanken Grotesk',sans-serif;color:rgba(226,230,244,.78)}
.cls-arch-roll-result.implant-result span{overflow:visible;text-overflow:clip;white-space:normal}
.cls-implant-dice-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.cls-implant-die{display:inline-flex;align-items:baseline;gap:6px;border:1px solid rgba(214,170,96,.32);border-radius:8px;background:rgba(214,170,96,.08);padding:6px 12px;font-size:13px;font-weight:700;letter-spacing:.04em;color:rgba(20,15,10,.9)}
.cls-implant-die b{font-size:16px;font-variant-numeric:tabular-nums;color:rgba(20,15,10,.95)}
.cls-implant-arrow{color:rgba(214,170,96,.62);font-size:18px}
.cls-implant-result-name{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;letter-spacing:.04em;color:rgba(246,248,255,.95)}
.cls-implant-result-card{position:relative;padding:18px 20px 17px;border:1px solid rgba(214,170,96,.22);border-radius:10px;background:linear-gradient(180deg,rgba(214,170,96,.05),rgba(255,255,255,.008));}
.rt-corner{position:absolute;width:14px;height:14px;pointer-events:none}
.rt-corner-tl{top:6px;left:6px;border-top:1.5px solid rgba(214,170,96,.5);border-left:1.5px solid rgba(214,170,96,.5);border-radius:5px 0 0 0}
.rt-corner-tr{top:6px;right:6px;border-top:1.5px solid rgba(214,170,96,.5);border-right:1.5px solid rgba(214,170,96,.5);border-radius:0 5px 0 0}
.rt-corner-bl{bottom:6px;left:6px;border-bottom:1.5px solid rgba(214,170,96,.5);border-left:1.5px solid rgba(214,170,96,.5);border-radius:0 0 0 5px}
.rt-corner-br{right:6px;bottom:6px;border-right:1.5px solid rgba(214,170,96,.5);border-bottom:1.5px solid rgba(214,170,96,.5);border-radius:0 0 5px 0}
.cls-implant-result-badges{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:12px}
.cls-implant-pill{display:inline-flex;align-items:baseline;gap:8px;border:1px solid rgba(214,170,96,.32);border-radius:999px;background:rgba(214,170,96,.08);padding:5px 13px}
.cls-implant-pill span{font-size:9px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(214,170,96,.7)}
.cls-implant-pill b{font-size:13px;font-weight:800;color:rgba(244,224,170,.9)}
.cls-implant-tag{border:1px solid rgba(232,236,248,.12);border-radius:999px;padding:4px 10px;font-size:10px;font-weight:800;color:rgba(214,170,96,.82)}
.cls-implant-result-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;line-height:1.2;letter-spacing:.035em;color:rgba(246,248,255,.95)}
.cls-implant-bones{display:flex;flex-wrap:wrap;gap:6px}
.cls-implant-bones span{display:inline-flex;align-items:center;border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:4px 7px;font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,15,10,.92)}
.bone-bunti{background:rgba(216,104,82,.86);border-color:rgba(246,154,128,.7)!important}
.bone-ayur{background:rgba(244,210,132,.9);border-color:rgba(255,229,163,.7)!important}
.bone-dodor{background:rgba(166,149,205,.9);border-color:rgba(197,181,235,.72)!important}
.bone-tahar{background:rgba(168,198,220,.9);border-color:rgba(201,225,242,.7)!important}
.cls-implant-body{display:flex;flex-direction:column;gap:12px;margin-top:13px}
.cls-implant-meta{display:flex;flex-wrap:wrap;gap:8px}
.cls-implant-meta span{display:inline-flex;gap:7px;align-items:center;border:1px solid rgba(214,170,96,.15);border-radius:8px;background:rgba(214,170,96,.055);padding:7px 10px;font-family:'Hanken Grotesk',sans-serif;font-size:11px;line-height:1.25;color:rgba(226,230,244,.72)}
.cls-implant-meta strong{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(244,224,170,.88)}
.cls-implant-levels{display:flex;flex-direction:column;gap:8px}
.cls-implant-levels article{display:grid;grid-template-columns:104px minmax(0,1fr);gap:12px;border-top:1px solid rgba(255,255,255,.07);padding-top:9px}
.cls-implant-levels strong{font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.cls-implant-levels p,.cls-implant-note{margin:0;font-family:'Cormorant Garamond',serif;font-size:16.5px;line-height:1.5;color:rgba(226,230,244,.78)}
.cls-arch-items{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px;margin-top:16px}
.cls-arch-items.roomy{display:flex;flex-direction:column;gap:12px}
.cls-arch-item{display:block;border:1px solid rgba(214,170,96,.14);border-radius:10px;background:rgba(7,8,12,.2);padding:16px 18px}
.cls-arch-items.roomy .cls-arch-item{padding:18px 20px}
.cls-arch-item summary{cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:19px;line-height:1.25;color:rgba(244,224,170,.95)}
.cls-arch-item span{display:block;margin-top:8px;font-family:'Cormorant Garamond',serif;font-size:16.5px;line-height:1.58;color:rgba(226,230,244,.78);white-space:pre-line}
.cls-arch-item-text{margin-top:8px;font-family:'Cormorant Garamond',serif;font-size:16.5px;line-height:1.58;color:rgba(226,230,244,.78);white-space:pre-line}
.cls-arch-item .cls-arch-item-text span{display:inline;margin:0;font:inherit;line-height:inherit;color:inherit;white-space:inherit}
.cls-arch-item-text strong{font-weight:700;color:rgba(244,224,170,.96)}
.cls-spell-meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:10px 0 12px;font-family:'Hanken Grotesk',sans-serif;font-size:11.5px;color:rgba(226,230,244,.55)}
.cls-feature-spells{display:flex;flex-direction:column;gap:12px;margin-top:14px}
.cls-spell-card{border:1px solid rgba(214,170,96,.16);border-radius:12px;background:rgba(7,8,12,.22);padding:16px}
.cls-higher{margin-top:12px;border-top:1px solid rgba(255,255,255,.07);padding-top:12px;font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.5;color:rgba(226,230,244,.72)}
.cls-higher strong{color:rgba(244,224,170,.92)}
.cls-arch-list{display:flex;flex-direction:column;gap:14px;margin-top:16px}
.cls-subclass-list{display:flex;flex-direction:column;gap:12px;margin-top:16px}
.cls-subclass-empty{border:1px dashed rgba(255,255,255,.14);border-radius:12px;background:rgba(255,255,255,.012);padding:20px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(226,230,244,.52)}
.cls-subclass-item{overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.018)}
.cls-subclass-toggle{width:100%;display:grid;grid-template-columns:34px minmax(0,1fr) auto auto;gap:12px;align-items:center;border:0;background:transparent;color:inherit;padding:16px 18px;text-align:left}
.cls-subclass-toggle:hover{background:rgba(255,255,255,.035)}
.cls-subclass-heading{display:flex;flex-direction:column;gap:4px;min-width:0;cursor:pointer}
.cls-subclass-plus{display:grid;place-items:center;width:26px;height:26px;border:1px solid rgba(214,170,96,.42);border-radius:50%;background:rgba(7,8,12,.25);font-family:'Hanken Grotesk',sans-serif;font-size:16px;color:rgba(244,224,170,.95);cursor:pointer}
.cls-subclass-plus:hover{background:rgba(214,170,96,.14)}
.cls-subclass-title{font-family:'Cormorant Garamond',serif;font-size:23px;line-height:1.05;color:rgba(236,240,252,.94)}
.cls-subclass-source{font-family:'Hanken Grotesk',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.1em;color:rgba(20,15,6,.95);background:rgba(214,170,96,.85);border-radius:6px;padding:4px 8px}
.cls-subclass-meta{font-family:'Hanken Grotesk',sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45);white-space:nowrap}
.cls-subclass-body{padding:0 22px 22px 64px}
.cls-subclass-prose{display:flex;flex-direction:column;gap:8px;margin-top:12px;font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.55;color:rgba(226,230,244,.72)}
.cls-subclass-prose p{margin:0}
.cls-subclass-rules{display:flex;flex-direction:column;gap:14px;margin-top:18px}
.cls-subclass-rule{border-top:1px solid rgba(255,255,255,.07);padding-top:16px}
.cls-subclass-spells{margin-top:22px;border-top:1px solid rgba(255,255,255,.07);padding-top:18px}
.cls-h3{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.92);margin-bottom:14px}
.cls-open-arch.inline{margin-top:0;white-space:nowrap}
.cls-arch-rule-mini{display:grid;gap:9px;margin-top:14px}
.cls-arch-rule-row{display:grid;grid-template-columns:minmax(150px,.42fr) minmax(0,1fr);gap:12px;border-top:1px solid rgba(255,255,255,.06);padding-top:9px}
.cls-arch-rule-row strong{font-family:'Hanken Grotesk',sans-serif;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.cls-arch-rule-row span{font-family:'Cormorant Garamond',serif;font-size:15.5px;line-height:1.45;color:rgba(226,230,244,.72)}
.cls-open-arch{margin-top:14px;border:1px solid rgba(214,170,96,.42);border-radius:999px;background:rgba(214,170,96,.1);color:rgba(244,224,170,.95);font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:9px 14px;cursor:pointer}
.cls-open-arch:hover{background:rgba(214,170,96,.18)}
.cls-open-arch.ghost{border-color:rgba(255,255,255,.1);background:rgba(255,255,255,.025);color:rgba(226,230,244,.62)}
@keyframes cls-emblem-lit{
  0%{border-color:#fff0bd;box-shadow:0 0 8px rgba(255,240,189,.9),0 0 30px rgba(214,170,96,.65)}
  100%{border-color:rgba(214,170,96,.5);box-shadow:0 0 22px rgba(214,170,96,.18)}
}
@media (max-width: 820px){
  .cls-wrap{
    --cls-rail-left:27px;
    --cls-emblem-margin-left:-43px;
    --cls-emblem-margin-right:20px;
    padding:34px 22px 84px;
  }
  .cls-head{align-items:flex-start;gap:18px}
  .cls-emblem-box{width:96px;height:96px}
  .cls-emblem-box::before,.cls-emblem-frame,.cls-emblem{width:82px;height:82px}
  .cls-title{font-size:38px}
  .cls-grid2{grid-template-columns:1fr}
  .cls-build-top{grid-template-columns:1fr}
  .cls-source-row{align-items:flex-start;border-left:0;border-top:1px solid rgba(214,170,96,.16);padding:14px 0 0}
  .cls-source-row div{justify-content:flex-start}
  .cls-build-summary{grid-template-columns:1fr 1fr}
  .cls-description-head,.cls-spell-tab-head,.cls-filter-card-head{flex-direction:column}
  .cls-rule-panels{grid-template-columns:1fr}
  .cls-rule-panel.wide{grid-column:auto}
  .cls-toolbar{align-items:flex-start}
  .cls-section-tools{order:1}
  .cls-icon-tools{order:2;margin-left:auto}
  .cls-tool-message{order:3;width:100%}
  .cls-info-row{grid-template-columns:1fr}
  .cls-info-row span{border-left:0;border-top:1px solid rgba(255,255,255,.045)}
  .cls-source-filter{margin-left:0;width:100%}
  .cls-rule-panel.balanced .cls-rule-body{display:block;height:auto}
  .cls-rule-row{grid-template-columns:1fr}
  .cls-rule-row span{border-left:0;border-top:1px solid rgba(255,255,255,.045)}
  .cls-rule-row .equip-label{min-height:34px;padding:10px 14px}
  .cls-features-heading{align-items:flex-start}
  .cls-feature-summary-main{align-items:flex-start;flex-direction:column;gap:7px}
  .cls-feature-meta-row{justify-content:flex-start}
  .cls-arch-detail-title{font-size:30px}
  .cls-spell-meta{grid-template-columns:1fr}
  .cls-subclass-toggle{grid-template-columns:30px minmax(0,1fr) auto}
  .cls-subclass-meta{white-space:normal}
  .cls-open-arch.inline{grid-column:2 / -1;justify-self:start}
  .cls-subclass-body{padding:0 16px 18px 16px}
  .cls-arch-rule-row{grid-template-columns:1fr}
  .cls-arch-roll.implants{flex-direction:column}
  .cls-arch-roll-result.implant-result{min-width:0;width:100%}
  .cls-implant-result-card{width:100%}
  .cls-implant-levels article{grid-template-columns:1fr;gap:6px}
}
@media (max-width: 540px){
  .cls-build-summary{grid-template-columns:1fr}
}
@media (prefers-reduced-motion: reduce){
  .cls-spark{display:none}
  .cls-thread-node.is-lit::before,
  .cls-emblem-box.is-lit .cls-emblem-frame{animation:none}
}
</style>
