<script setup>
import { useKnotCanvas } from '~/composables/useKnotCanvas.js'

const route = useRoute()

const search = ref('')
const copiedLink = ref(false)
const descExpanded = ref(false)
const varietyDescOpen = ref(false)
const selectedVarietyId = ref(null)
const isPortraitOpen = ref(false)

const selectedPath = computed(() => {
  const slug = route.params.slug
  return slug ? `/dnd5e/races/${Array.isArray(slug) ? slug.join('/') : slug}` : ''
})

const { data: racesData } = await useAsyncData('dnd5e-races-list', () => {
  return queryCollection('dnd5eRaces').order('title', 'ASC').all()
})

const races = computed(() => (racesData.value || []).filter(r => r.status !== 'archived'))

const filteredRaces = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return races.value
  return races.value.filter(r =>
    r.title?.toLowerCase().includes(q) ||
    r.description?.toLowerCase().includes(q) ||
    r.originalName?.toLowerCase().includes(q) ||
    (r.tags || []).some(t => t.toLowerCase().includes(q))
  )
})

const selectedRace = computed(() => races.value.find(r => r.path === selectedPath.value) || null)

useSeoMeta({
  title: () => selectedRace.value?.title ? `${selectedRace.value.title} — TKK.club` : 'Расы и происхождения — TKK.club',
  description: () => selectedRace.value?.description || 'Расы и происхождения мира Эноа.'
})

// ---- constellation map for the races list (matches the hub's home/system look) ----
const RL_TH = { ink:'rgba(226,230,244,', glow:'rgba(176,188,232,', thread:'rgba(196,208,240,', hi:'238,243,255', disc:'7,8,12' }
const rlCanvasEl = ref(null)
const { start: rlStart, stop: rlStop } = useKnotCanvas(rlCanvasEl, 46)
const rlCenter = reactive({ x: 0, y: 0 })
const rlFit = ref(1)
function rlApplyFit() {
  if (!import.meta.client) return
  rlCenter.x = window.innerWidth / 2 + 34
  rlCenter.y = window.innerHeight / 2
  rlFit.value = Math.max(0.5, Math.min(1, (window.innerWidth/2 - 90)/360, (window.innerHeight/2 - 28)/312))
}
onMounted(() => {
  if (!selectedPath.value) rlStart()
  rlApplyFit()
  window.addEventListener('resize', rlApplyFit)
})
onUnmounted(() => { rlStop(); window.removeEventListener('resize', rlApplyFit) })
watch(selectedPath, (val) => { if (!val) { rlStart(); rlApplyFit() } else { rlStop() } })

let _rlCi = 0
// Warm sparks in a small rotating palette, same idea as the hub's living
// threads — each connector gets its own colour, speed and stagger so the
// whole map never pulses in unison.
const RL_SPARK_COLORS = ['255,236,196', '255,210,150', '214,230,255', '255,224,236', '226,255,236', '255,250,235']
function rlLink(d, len, open) {
  const idx = _rlCi++
  const a = open ? 0.74 : 0.42
  const bw = open ? 2.1 : 1.6
  const gc = RL_SPARK_COLORS[idx % RL_SPARK_COLORS.length]
  return {
    d,
    base: { stroke: RL_TH.thread + a + ')', strokeWidth: bw, fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round', transition: 'stroke .45s, stroke-width .45s' },
    glow: { stroke: 'rgba(' + gc + ',0.1)', strokeWidth: '5', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', animation: 'rlLinePulse ' + (4.5 + (idx % 6) * 0.7) + 's ease-in-out infinite', animationDelay: (idx * 0.5) + 's' },
    flow: { stroke: 'rgba(' + RL_TH.hi + ',' + (open ? 0.5 : 0.26) + ')', strokeWidth: Math.max(1, bw * 0.55), fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round', strokeDasharray: '2 560', animation: 'rlThreadBead 15s linear infinite', animationDelay: (idx * 0.6) + 's' },
    sparkR: 2.2 + (idx % 3) * 0.6,
    sparkStyle: { fill: 'rgba(' + gc + ',0.98)', filter: 'drop-shadow(0 0 5px rgba(246,208,126,0.85))' },
    // Slow, gentle travel from the centre out to the portrait — duration and
    // stagger both vary per node so sparks drift past each other, not in sync.
    sparkDur: (10 + (idx % 7) * 2.2) + 's',
    sparkBegin: (-(idx * 1.7)) + 's'
  }
}
function rlMarker(x, y, s, faint) {
  return {
    d: 'M ' + x + ' ' + (y - s) + ' L ' + (x + s) + ' ' + y + ' L ' + x + ' ' + (y + s) + ' L ' + (x - s) + ' ' + y + ' Z',
    style: faint
      ? { stroke: RL_TH.thread + '0.4)', strokeWidth: '1', fill: 'rgba(7,8,12,0.95)' }
      : { stroke: 'rgba(246,208,126,0.9)', strokeWidth: '1.2', fill: 'rgba(238,190,98,0.9)' }
  }
}
// Brutalist "circuit board" routing: out from the centre, two right-angle
// bends instead of one (a little stagger/offset on the second leg) plus a
// couple of short decorative stub ticks branching off the bends — reads as
// drafted geometry rather than a simple bent thread.
function rlElbow(x, y, i) {
  const horizontal = Math.abs(x) >= Math.abs(y)
  // first bend: out along the dominant axis
  const bx = horizontal ? Math.round(x * 0.42) : Math.round(x * (0.5 + (i % 3) * 0.06))
  const by = horizontal ? Math.round(y * (0.5 + (i % 3) * 0.06)) : Math.round(y * 0.42)
  // second bend: jog toward the node's axis before the final straight run-in
  const cx = horizontal ? Math.round(x * 0.78) : bx
  const cy = horizontal ? by : Math.round(y * 0.78)
  const d = `M0 0 L ${bx} ${by} L ${cx} ${cy} L ${x} ${y}`
  const beads = [
    [bx, by, 3.4, false],
    [cx, cy, 3, true]
  ]
  // short perpendicular stub off the first bend — pure circuit-board decoration
  const stubLen = 14
  const stub = horizontal
    ? `M ${bx} ${by} L ${bx} ${by + (by >= 0 ? stubLen : -stubLen)}`
    : `M ${bx} ${by} L ${bx + (bx >= 0 ? stubLen : -stubLen)} ${by}`
  return { d, beads, stub }
}

// Procedural mandala icon per race — same generator the hub uses for classes
// without dedicated artwork, so every node reads as a unique knot glyph.
function rlEmblem(i) {
  const st = 'rgba(232,226,208,.92)'
  const r2 = (k) => { const v = Math.sin((i + 1) * (k * 12.9 + 7.3)) * 43758.5; return v - Math.floor(v) }
  const axes = [3, 4, 5, 6, 4, 6, 5, 4][i % 8]
  const ry = 12 + Math.round(r2(1) * 7)
  const step = 180 / axes
  let g = ''
  for (let a = 0; a < axes; a++) g += '<ellipse rx="36" ry="' + ry + '" transform="rotate(' + (a * step).toFixed(1) + ')"/>'
  if (r2(2) > 0.5) { const ir = 20; for (let a = 0; a < axes; a++) g += '<ellipse rx="' + ir + '" ry="' + Math.round(ir * 0.42) + '" transform="rotate(' + (a * step + step / 2).toFixed(1) + ')"/>' }
  const cr = 5 + Math.round(r2(3) * 4)
  g += '<circle r="' + cr + '"/>'
  if (r2(4) > 0.45) g += '<circle r="26" stroke-dasharray="1.5 5" opacity="0.55"/>'
  if (r2(5) > 0.6) g += '<circle r="42" stroke-dasharray="1 7" opacity="0.4"/>'
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><g fill="none" stroke="' + st + '" stroke-width="1.2">' + g + '</g></svg>'
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

// Per-race portrait shown in the constellation node — falls back to the
// procedural mandala emblem if a race has no dedicated portrait yet.
function rlPortrait(race) {
  const slug = race.path.split('/').filter(Boolean).at(-1) || ''
  return `/images/races/portraits/${slug}.png`
}

const racesMap = computed(() => {
  _rlCi = 0
  const list = filteredRaces.value
  const n = list.length
  const Rx = 360, Ry = 312
  const nodes = [], connectors = [], markers = [], stubs = []
  list.forEach((race, i) => {
    // Even angular spacing, starting at the top and going clockwise, so the
    // alphabetical order of races (already sorted by the query) reads in a
    // clean sweep around the circle instead of jumping between positions.
    const angle = (-90 + i * (360 / n)) * Math.PI / 180
    const x = Math.round(Math.cos(angle) * Rx)
    const y = Math.round(Math.sin(angle) * Ry)
    const { d, beads, stub } = rlElbow(x, y, i)
    connectors.push(rlLink(d, 0, false))
    beads.forEach(([bx, by, s, faint]) => markers.push(rlMarker(bx, by, s, faint)))
    stubs.push(stub)
    nodes.push({
      x, y, race,
      emblem: rlEmblem(i),
      portrait: rlPortrait(race),
      label: race.title,
      labelAbove: y < 0
    })
  })
  return { nodes, connectors, markers, stubs }
})

function goToRace(race) { navigateTo(race.path) }

watch(selectedPath, () => { descExpanded.value = false; selectedVarietyId.value = null; isPortraitOpen.value = false; varietyDescOpen.value = false })

function onEscClose(e) { if (e.key === 'Escape') isPortraitOpen.value = false }
onMounted(() => { if (import.meta.client) window.addEventListener('keydown', onEscClose) })
onUnmounted(() => { if (import.meta.client) window.removeEventListener('keydown', onEscClose) })

function toggleDesc() { descExpanded.value = !descExpanded.value }
function selectVariety(id) { selectedVarietyId.value = id; varietyDescOpen.value = false }

function originalLabel(race) {
  const name = race.originalName?.trim()
  if (name) return name
  return (race.path.split('/').filter(Boolean).at(-1) || '').replace(/-/g, ' ')
}

function sourceLabel(race) {
  const source = race.source?.trim()
  return (!source || source === 'ENOA') ? 'ED' : source
}

function firstLetter(title = '') {
  return title.trim().charAt(0).toUpperCase()
}

const THEME_ORDER = ['shamas', 'manu', 'marak', 'dangun', 'brall']
function cardImage(race) {
  if (race.image) return race.image
  const images = race.cardImages || {}
  for (const key of THEME_ORDER) if (images[key]) return images[key]
  return ''
}
function detailImage(race) {
  if (race.image) return race.image
  const images = race.detailImages || {}
  for (const key of THEME_ORDER) if (images[key]) return images[key]
  return ''
}
function hasDetailImage(race) {
  return Boolean(race.detailImages && THEME_ORDER.some(k => race.detailImages[k]))
}

// Some race portraits need a custom crop so faces aren't cut off.
const cardImagePosition = {
  '/dnd5e/races/adaady': '50% 34%',
  '/dnd5e/races/adzhaidy': '50% 34%'
}
const detailImagePosition = {
  '/dnd5e/races/jabari': '72% 18%'
}
function cardImageStyle(race) {
  const pos = cardImagePosition[race.path]
  return pos ? { objectPosition: pos } : {}
}
function detailImageStyle(race) {
  const pos = detailImagePosition[race.path]
  return pos ? { objectPosition: pos } : {}
}

// ---- per-race "titled items" inside a rule section's free text ----
// A handful of races describe a list of named things (tattoos, parasites, pacts...)
// as plain prose inside one rule section. We split that text into individual items
// by matching known titles, instead of asking authors to model every race's quirks
// in the schema.
const tattooTitles = ['Чум', 'Столб', 'Компас', 'Ошейник додора', 'Крепость', 'Зубья', 'Ману', 'Шамас']
const varietyTitles = ['Янтарный', 'Пепельный', 'Драгмирец']
const stigmataTitles = ['Глаза зверя', 'Вены Бездны', 'Хвост Порочного', 'Копыта Странника', 'Лапы чудовища', 'Оболочка медузы', 'Крыло падшего', 'Рога Тьмы', 'Бивни Рока', 'Язык Змеи', 'Крюки фатума', 'Раны Крови']
const parasiteTitles = ['Багровый червь', 'Солнечный жук-рогач', 'Большой таракан Худа', 'Многохвостая крыса-барсук', 'Паук-слепун', 'Стеклянный муравей', 'Волосатая сороконожка-альбинос', 'Жадеитовый скарабей', 'Колония лазурных термитов', 'Саранча-иллюзионист']
const paktTitles = ['Договор Густой Крови', 'Договор Проводника', 'Договор Монеты', 'Договор Смерти', 'Договор Искры', 'Запретный Договор']
const anzuRageTitles = ['1', '2', '3', '4-10']

const parasiteImageByTitle = {
  'Багровый червь': '/images/races/udrishi/parasites/bagrovyy-cherv.png',
  'Солнечный жук-рогач': '/images/races/udrishi/parasites/solnechnyy-zhuk-rogach.png',
  'Большой таракан Худа': '/images/races/udrishi/parasites/bolshoy-tarakan-huda.png',
  'Многохвостая крыса-барсук': '/images/races/udrishi/parasites/mnogohvostaya-krysa-barsuk.png',
  'Паук-слепун': '/images/races/udrishi/parasites/pauk-slepun.png',
  'Стеклянный муравей': '/images/races/udrishi/parasites/steklyannyy-muravey.png',
  'Волосатая сороконожка-альбинос': '/images/races/udrishi/parasites/volosataya-sorokonozhka-albinos.png',
  'Жадеитовый скарабей': '/images/races/udrishi/parasites/zhadeitovyy-skarabey.png',
  'Колония лазурных термитов': '/images/races/udrishi/parasites/koloniya-lazurnyh-termitov.png',
  'Саранча-иллюзионист': '/images/races/udrishi/parasites/sarancha-illyuzionist.png'
}
const tattooImageByTitle = {
  'Чум': '/images/races/adzhaidy/tattoos/chum.png',
  'Столб': '/images/races/adzhaidy/tattoos/stolb.png',
  'Компас': '/images/races/adzhaidy/tattoos/kompas.png',
  'Ошейник додора': '/images/races/adzhaidy/tattoos/osheynik-dodora.png',
  'Крепость': '/images/races/adzhaidy/tattoos/krepost.png',
  'Зубья': '/images/races/adzhaidy/tattoos/zubya.png',
  'Ману': '/images/races/adzhaidy/tattoos/manu.png',
  'Шамас': '/images/races/adzhaidy/tattoos/shamas.png'
}

function titledItemTitles(sectionTitle = '') {
  if (sectionTitle === 'Разновидности') return varietyTitles
  if (sectionTitle === 'Стигматы') return stigmataTitles
  if (sectionTitle === 'Удриш (Пйюр-Пйюр)') return parasiteTitles
  if (sectionTitle === 'Маракиец (Драгмирец)') return paktTitles
  if (sectionTitle === 'Мор’хоры (Дитя Анзу)') return anzuRageTitles
  return tattooTitles
}

function normalizeBreaks(text = '') {
  return text.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\r\n/g, '\n')
}

function parseTitledItems(text = '', sectionTitle = '') {
  const normalized = normalizeBreaks(text).trim()
  if (!normalized) return { intro: '', items: [] }

  const titles = titledItemTitles(sectionTitle)
  const escaped = titles.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const pattern = new RegExp(`(?:^|\\n\\n)(${escaped})\\.\\s+`, 'g')
  const matches = Array.from(normalized.matchAll(pattern))
  if (matches.length === 0) return { intro: normalized, items: [] }

  const first = matches[0]
  const intro = normalized.slice(0, first.index).trim()
  const items = matches.map((match, index) => {
    const start = match.index + match[0].length
    const end = matches[index + 1]?.index ?? normalized.length
    const title = match[1] || ''
    return {
      title,
      text: normalized.slice(start, end).trim(),
      image: tattooImageByTitle[title] || parasiteImageByTitle[title]
    }
  })
  return { intro, items }
}

function sectionIntro(section) {
  return parseTitledItems(section.text, section.title).intro
}
function sectionItems(section) {
  return parseTitledItems(section.text, section.title).items
}
function sectionItemsColumnLabel(section) {
  if (section.title === 'Стигматы') return 'Описание и бонусы'
  if (section.title === 'Маракиец (Драгмирец)') return 'Описание'
  if (section.title === 'Мор’хоры (Дитя Анзу)') return 'Ярость Анзу'
  return 'Способности'
}
function sectionItemsNameLabel(section) {
  return section.title === 'Мор’хоры (Дитя Анзу)' ? 'к10' : 'Название'
}

const sectionSubheadingsByTitle = {
  'Маракиец (Драгмирец)': ['Хранители троп', 'Договор Крови', 'Алые драгмирцы'],
  'Люди (Дангун)': ['Там, где Солнце не заходит', 'Удача и индиго'],
  'Люди (Бралл)': ['Красота в голове'],
  'Люди (Адаад)': ['Неугасающий дух']
}
function sectionParagraphs(section) {
  const intro = sectionIntro(section)
  if (!intro) return []

  const subheadings = sectionSubheadingsByTitle[section.title] || []
  return intro.split(/\n\s*\n/g).map(p => p.trim()).filter(Boolean).map(paragraph => {
    if (subheadings.includes(paragraph)) return { text: paragraph, heading: true }
    if (/^—\s/.test(paragraph)) return { text: paragraph, quote: true }
    if (/^Таблица\s.{1,60}\.$/.test(paragraph)) return { text: paragraph, caption: true }

    const match = paragraph.match(/^([^:]{2,110}):\s*(.+)$/s)
    if (!match) return { text: paragraph }
    return { label: match[1], text: match[2].trim() }
  })
}

// ---- varieties ----
const detailSections = computed(() => {
  return (selectedRace.value?.ruleSections || []).map((section, index) => ({ ...section, id: `rule-${index}` }))
})
const varietyItemSections = computed(() => {
  const sections = detailSections.value
  const headerIndex = sections.findIndex(s => s.title === 'Разновидности')
  if (headerIndex === -1) return []
  const items = []
  let i = headerIndex + 1
  while (i < sections.length && /\(.+\)/.test(sections[i]?.title || '')) { items.push(sections[i]); i += 1 }
  return items
})
function varietyShortTitle(section) {
  const match = section.title.match(/\((.+)\)/)
  return match ? match[1] : section.title
}

// Default to the first variety (no "base" option); selecting a tab overrides it.
const activeVarietyId = computed(() => selectedVarietyId.value ?? varietyItemSections.value[0]?.id ?? null)
const activeVariety = computed(() => varietyItemSections.value.find(s => s.id === activeVarietyId.value) || null)

// Per-race, per-variety knot symbols — the corner emblem swaps with the chosen variety.
const RACE_KNOTS = {
  '/dnd5e/races/udrishi': {
    'Урма': '/images/races/udrishi/knots/urma-t.png',
    'Эрил': '/images/races/udrishi/knots/eril-t.png',
    'Пйюр-Пйюр': '/images/races/udrishi/knots/pure-pure-t.png'
  },
  '/dnd5e/races/hudduliny': {
    'Эрх': '/images/races/hudduliny/knots/erh-t.png',
    'Сар': '/images/races/hudduliny/knots/sar-t.png',
    'Омор': '/images/races/hudduliny/knots/omor-t.png'
  },
  '/dnd5e/races/marakiytsy': {
    'Янтарный': '/images/races/marakiytsy/knots/yantarniy-t.png',
    'Пепельный': '/images/races/marakiytsy/knots/pepelniy-t.png',
    'Драгмирец': '/images/races/marakiytsy/knots/dragmirec-t.png'
  },
  '/dnd5e/races/lyudi': {
    'Дангун': '/images/races/lyudi/knots/dangun-t.png',
    'Бралл': '/images/races/lyudi/knots/brall-t.png',
    'Адаад': '/images/races/lyudi/knots/adaad-t.png'
  }
}
const activeKnot = computed(() => {
  const map = RACE_KNOTS[selectedPath.value]
  if (map && activeVariety.value) return map[varietyShortTitle(activeVariety.value)] || ''
  return ''
})

// Per-race, per-variety portraits — for merged races (e.g. Люди) whose varieties
// are visually distinct peoples, the hero portrait swaps with the chosen variety.
const RACE_PORTRAITS = {
  '/dnd5e/races/lyudi': {
    'Дангун': '/images/races/danguntsy/details/shamas.png',
    'Бралл': '/images/races/bralltsy/details/shamas.png',
    'Адаад': '/images/races/adaady/adaad.png'
  }
}
const activePortrait = computed(() => {
  const map = RACE_PORTRAITS[selectedPath.value]
  if (map && activeVariety.value) return map[varietyShortTitle(activeVariety.value)] || ''
  return detailImage(selectedRace.value)
})

const varietyDescParagraphs = computed(() => {
  if (!activeVariety.value) return []
  return sectionParagraphs(activeVariety.value).filter(p => !p.label && !p.caption)
})
const varietyFeatures = computed(() => {
  if (!activeVariety.value) return []
  return sectionParagraphs(activeVariety.value)
    .filter(p => p.label)
    .map(p => ({ title: p.label, text: p.text }))
})
const varietyItemsList = computed(() => activeVariety.value ? sectionItems(activeVariety.value) : [])
const varietyItemsHaveImages = computed(() => varietyItemsList.value.some(i => i.image))

// The base ability-score increase lives in a rule section, not in primaryTraits —
// surface it as the first base feature so it reads as "base + variety" together.
const baseAbility = computed(() => {
  const s = selectedRace.value?.ruleSections?.find(x => x.title === 'Увеличение характеристик')
  return s ? { title: s.title, text: fullText(s.text) } : null
})
const baseFeatures = computed(() => {
  const list = [...(selectedRace.value?.primaryTraits || [])]
  // When varieties exist, each variety's ability line already states the full total
  // (base + variety), so we don't show a separate base ability card.
  if (baseAbility.value && !varietyItemSections.value.length) list.unshift(baseAbility.value)
  return list
})

// Rule sections already surfaced elsewhere (summary panel, names, ability score)
// — everything else (e.g. a race's own titled tables like "Татуировки ветров" or
// "Стигматы") still needs somewhere to render, even for races with no varieties.
const SHOWN_ELSEWHERE = ['Увеличение характеристик', 'Возраст', 'Мировоззрение', 'Размер', 'Скорость', 'Языки', 'Имена', 'Разновидности']
const extraRuleSections = computed(() => {
  if (varietyItemSections.value.length) return []
  return (selectedRace.value?.ruleSections || [])
    .filter(s => !SHOWN_ELSEWHERE.includes(s.title))
    .map((s, i) => ({ ...s, id: 'extra-' + i }))
})

// ---- summary panel ----
function findRuleText(race, title) {
  return race?.ruleSections?.find(s => s.title === title)?.text || ''
}
function fullText(text = '') {
  return normalizeBreaks(text).trim() || '—'
}
// Long feature descriptions read poorly in a single narrow column — let them span two.
function featWide(text = '') {
  return (text || '').length > 200
}
function darkvision(race) {
  const haystack = [
    ...(race?.primaryTraits || []).map(t => t.text),
    ...(race?.ruleSections || []).map(s => s.text)
  ].join(' ')
  const match = haystack.match(/(?:тёмное|темное) зрени[ея][^.]{0,40}?(\d+)\s*фут/i)
  return match ? `${match[1]} футов` : '—'
}

const summaryRows = computed(() => {
  const r = selectedRace.value
  if (!r) return []
  return [
    { label: 'Размер', value: r.raceSize || '—' },
    { label: 'Скорость', value: r.speed || '—' },
    { label: 'Возраст', value: fullText(findRuleText(r, 'Возраст')) },
    { label: 'Мировоззрение', value: fullText(findRuleText(r, 'Мировоззрение')) },
    { label: 'Тёмное зрение', value: darkvision(r) },
    { label: 'Языки', value: fullText(findRuleText(r, 'Языки')) }
  ]
})

const namesText = computed(() => findRuleText(selectedRace.value, 'Имена'))
const namesParagraphs = computed(() => namesText.value ? sectionParagraphs({ title: 'Имена', text: namesText.value }) : [])

async function copyRaceLink() {
  if (!import.meta.client) return
  const url = new URL(selectedPath.value, window.location.origin).toString()
  await navigator.clipboard?.writeText(url)
  copiedLink.value = true
  window.setTimeout(() => { copiedLink.value = false }, 1400)
}
function printRace() {
  if (import.meta.client) window.print()
}
</script>

<template>
  <div class="races-page">
    <!-- LIST VIEW: constellation map, matching the hub's home/system look -->
    <div v-if="!selectedRace" class="rl">
      <canvas ref="rlCanvasEl" class="rl-canvas" />

      <svg class="rl-conn">
        <g :transform="`translate(${rlCenter.x},${rlCenter.y}) scale(${rlFit})`">
          <!-- decorative diamond halos, evoking the engraved circuit-board look -->
          <g class="rl-halo">
            <rect x="-300" y="-300" width="600" height="600" transform="rotate(45)" />
            <rect x="-430" y="-430" width="860" height="860" transform="rotate(45)" />
          </g>
          <path v-for="(s, i) in racesMap.stubs" :key="'s'+i" :d="s" class="rl-stub" />
          <g v-for="(c, i) in racesMap.connectors" :key="'c'+i">
            <path :d="c.d" :style="c.glow" />
            <path :d="c.d" :style="c.base" />
            <path :d="c.d" :style="c.flow" />
            <circle :r="c.sparkR" :style="c.sparkStyle">
              <animateMotion :dur="c.sparkDur" :begin="c.sparkBegin" repeatCount="indefinite" :path="c.d" />
            </circle>
          </g>
          <path v-for="(m, i) in racesMap.markers" :key="'m'+i" :d="m.d" :style="m.style" />
        </g>
      </svg>

      <div class="rl-nodes" :style="{ transform: `scale(${rlFit})` }">
        <!-- central node: Расы и происхождения → back to the D&D 5e system map -->
        <NuxtLink to="/?system=5e" class="rl-node rl-node-center" title="К карте D&D 5e">
          <div class="rl-disc rl-disc-center" />
          <div class="rl-knot rl-knot-center">
            <img src="/assets/nodes/rasy.png" alt="Расы и происхождения">
          </div>
          <div class="rl-text rl-text-below">
            <div class="rl-label rl-label-center">Расы и происхождения</div>
          </div>
        </NuxtLink>

        <!-- one node per race -->
        <button
          v-for="(node, i) in racesMap.nodes"
          :key="node.race.path"
          type="button"
          class="rl-node"
          :style="{ transform: `translate(${node.x}px, ${node.y}px)` }"
          @click="goToRace(node.race)"
        >
          <div class="rl-portrait">
            <img
              :src="node.portrait"
              :alt="node.label"
              draggable="false"
              @error="$event.target.src = node.emblem"
            >
          </div>
          <div class="rl-text" :class="{ 'rl-text-above': node.labelAbove, 'rl-text-below': !node.labelAbove }">
            <div class="rl-label">{{ node.label }}</div>
          </div>
        </button>
      </div>

      <div class="rl-wordmark">
        <div class="rl-wordmark-eyebrow">Threads of the Knot of Knots</div>
        <div class="rl-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
      </div>

      <nav class="rl-crumb">
        <NuxtLink to="/" class="rl-crumb-link">Системы</NuxtLink>
        <span class="rl-crumb-sep">/</span>
        <span class="rl-crumb-strong">Расы и происхождения</span>
        <NuxtLink to="/" class="rl-crumb-exit">← выйти</NuxtLink>
      </nav>

      <div class="rl-search-wrap">
        <input v-model="search" class="rl-search" type="search" placeholder="Поиск народа...">
      </div>

      <NuxtLink to="/" class="rl-sidebar-btn" title="Главный узел">
        <img src="/assets/knot-main.png" width="30" height="30" style="display:block;object-fit:contain">
      </NuxtLink>
    </div>

    <!-- DETAIL DOSSIER -->
    <div v-else class="rd">
      <aside class="rd-nav">
        <NuxtLink to="/" class="rd-nav-btn rd-nav-main" title="Главный узел">
          <img src="/assets/knot-main.png" width="24" height="24" style="display:block;object-fit:contain">
        </NuxtLink>
        <div class="rd-nav-btn" title="Поиск">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
        </div>
        <div class="rd-nav-btn" title="Закладки">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M6 3.5h12v17l-6-4.2-6 4.2z"/></svg>
        </div>
        <div class="rd-nav-btn" title="Тема">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.7A8.2 8.2 0 1 1 11.3 3a6.4 6.4 0 0 0 9.7 9.7z"/></svg>
        </div>
        <div style="flex:1" />
        <div class="rd-nav-btn" title="Авторизация">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8.5" r="3.6"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>
        </div>
      </aside>

      <div class="rd-main">
        <header class="rd-top">
          <div class="rd-wordmark">
            <div class="rd-wordmark-eyebrow">Threads of the Knot of Knots</div>
            <div class="rd-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
          </div>
          <div class="rd-top-right">
            <nav class="rd-crumb">
              <NuxtLink to="/" class="crumb-link">Системы</NuxtLink>
              <span class="crumb-sep">/</span>
              <NuxtLink to="/dnd5e/races" class="crumb-link crumb-gold">Расы</NuxtLink>
              <span class="crumb-sep">/</span>
              <span class="crumb-gold">{{ selectedRace.title }}</span>
            </nav>
            <div class="rd-actions">
              <button
                class="rd-action-btn"
                type="button"
                :title="copiedLink ? 'Скопировано' : 'Скопировать ссылку'"
                @click="copyRaceLink"
              >
                <span v-if="copiedLink">✓</span><span v-else>🔗</span>
              </button>
              <button class="rd-action-btn" type="button" title="Печать" @click="printRace">🖨</button>
              <NuxtLink to="/dnd5e/races" class="rd-action-btn" title="Закрыть">✕</NuxtLink>
            </div>
          </div>
        </header>

        <div class="rd-window">
          <!-- HERO: text card + portrait card, side by side -->
          <section class="rd-hero">
            <div class="rd-hero-card rd-hero-text-card">
              <span class="rd-corner rd-corner-tl" /><span class="rd-corner rd-corner-tr" />
              <span class="rd-corner rd-corner-br" /><span class="rd-corner rd-corner-bl" />

              <div class="rd-hero-card-top">
                <NuxtLink to="/dnd5e/races" class="rd-emblem" title="Назад к расам">
                  <img v-if="activeKnot" :src="activeKnot" :alt="`Узел: ${varietyShortTitle(activeVariety)}`" class="rd-emblem-knot">
                  <img v-else src="/assets/nodes/rasy.png" alt="Узел расы" class="rd-emblem-knot">
                </NuxtLink>

                <nav class="rd-eyebrow rd-eyebrow-path">
                  <NuxtLink to="/">D&D 5e</NuxtLink>
                  <span class="rd-eyebrow-sep">/</span>
                  <NuxtLink to="/dnd5e/races">Расы</NuxtLink>
                  <span class="rd-eyebrow-sep">/</span>
                  <span class="rd-eyebrow-current">{{ selectedRace.title }}</span>
                </nav>
              </div>

              <h1 class="rd-title">{{ selectedRace.title.toUpperCase() }}</h1>
              <div class="rd-title-divider"><span class="rd-title-diamond" /></div>

              <p v-if="selectedRace.description" class="rd-quote">«{{ selectedRace.description }}»</p>

              <div v-if="selectedRace.body" class="rd-desc" :class="{ open: descExpanded }">
                <div class="rd-desc-inner race-prose"><ContentRenderer :value="selectedRace" /></div>
                <span v-if="!descExpanded" class="rd-desc-fade" />
              </div>
              <button v-if="selectedRace.body" class="rd-desc-toggle" type="button" @click="toggleDesc">
                <span class="rd-desc-toggle-diamond" />{{ descExpanded ? 'Свернуть текст' : 'Читать о народе подробнее' }}
              </button>
            </div>

            <button
              v-if="activePortrait"
              type="button"
              class="rd-hero-card rd-hero-portrait-card"
              title="Открыть изображение"
              @click="isPortraitOpen = true"
            >
              <span class="rd-corner rd-corner-tl" /><span class="rd-corner rd-corner-tr" />
              <span class="rd-corner rd-corner-br" /><span class="rd-corner rd-corner-bl" />
              <span class="rd-portrait-star">✦</span>
              <img
                class="themed"
                :src="activePortrait"
                :style="detailImageStyle(selectedRace)"
                :alt="selectedRace.imageAlt || selectedRace.title"
              >
            </button>
            <div v-else class="rd-hero-card rd-hero-portrait-card">
              <span class="rd-corner rd-corner-tl" /><span class="rd-corner rd-corner-tr" />
              <span class="rd-corner rd-corner-br" /><span class="rd-corner rd-corner-bl" />
              <div class="rd-portrait-empty">{{ firstLetter(selectedRace.title) }}</div>
            </div>
          </section>

          <Teleport to="body">
            <transition name="rd-lightbox">
              <div v-if="isPortraitOpen" class="rd-lightbox" @click="isPortraitOpen = false">
                <button class="rd-lightbox-close" type="button" title="Закрыть" @click="isPortraitOpen = false">✕</button>
                <img
                  :src="activePortrait"
                  :alt="selectedRace.imageAlt || selectedRace.title"
                  @click.stop
                >
              </div>
            </transition>
          </Teleport>

          <!-- VARIETY-DRIVEN DOSSIER: tabs → description → summary → features -->
          <section v-if="varietyItemSections.length" class="rd-variety-section">
            <div class="rd-variety-tabs">
              <button
                v-for="section in varietyItemSections"
                :key="section.id"
                class="rd-vtab"
                :class="{ active: activeVarietyId === section.id }"
                type="button"
                @click="selectVariety(section.id)"
              >
                <img
                  v-if="activeVarietyId === section.id && RACE_KNOTS[selectedPath]?.[varietyShortTitle(section)]"
                  :src="RACE_KNOTS[selectedPath][varietyShortTitle(section)]"
                  class="rd-vtab-knot"
                  alt=""
                >
                <span v-else class="rd-vtab-diamond" />
                {{ varietyShortTitle(section) }}
              </button>
            </div>

            <transition name="rd-swap" mode="out-in">
              <div :key="activeVarietyId" class="rd-variety-body">
                <!-- 1. variety description -->
                <div class="rd-block">
                  <h2 class="rd-h2">
                    Описание
                    <span class="rd-variety-badge">{{ varietyShortTitle(activeVariety) }}</span>
                  </h2>
                  <div class="rd-variety-desc" :class="{ collapsed: varietyDescParagraphs.length > 3 && !varietyDescOpen }">
                    <p v-for="(p, pi) in varietyDescParagraphs" :key="pi" :class="{ 'is-heading': p.heading, 'is-quote': p.quote }">
                      {{ p.text }}
                    </p>
                    <p v-if="!varietyDescParagraphs.length" class="rd-variety-desc-empty">Описание этой разновидности в подготовке.</p>
                    <span v-if="varietyDescParagraphs.length > 3 && !varietyDescOpen" class="rd-desc-fade" />
                  </div>
                  <button
                    v-if="varietyDescParagraphs.length > 3"
                    class="rd-desc-toggle"
                    type="button"
                    @click="varietyDescOpen = !varietyDescOpen"
                  >
                    {{ varietyDescOpen ? '▴ Свернуть' : '▾ Читать полностью' }}
                  </button>
                </div>

                <!-- 2. race summary -->
                <div class="rd-block">
                  <h2 class="rd-h2">Сводка о расе</h2>
                  <div class="rd-summary-grid">
                    <div v-for="row in summaryRows" :key="row.label" class="rd-stat">
                      <span class="rd-stat-label">{{ row.label }}</span>
                      <span class="rd-stat-value">{{ row.value }}</span>
                    </div>
                  </div>
                </div>

                <!-- 3. variety features + base features together -->
                <div class="rd-block">
                  <h2 class="rd-h2">Особенности</h2>
                  <div class="rd-features">
                    <div v-for="card in varietyFeatures" :key="'v-' + card.title" class="rd-feat rd-feat--v" :class="{ wide: featWide(card.text) }">
                      <span class="rd-feat-name">{{ card.title }}<span class="rd-feat-tag">{{ varietyShortTitle(activeVariety) }}</span></span>
                      <span class="rd-feat-text">{{ card.text }}</span>
                    </div>
                    <div v-for="trait in baseFeatures" :key="'b-' + trait.title" class="rd-feat" :class="{ wide: featWide(trait.text) }">
                      <span class="rd-feat-name">{{ trait.title }}<span class="rd-feat-tag rd-feat-tag--base">БАЗ</span></span>
                      <span class="rd-feat-text">{{ trait.text }}</span>
                    </div>
                  </div>

                  <div
                    v-if="varietyItemsList.length"
                    class="rd-items"
                    :class="{ compact: !varietyItemsHaveImages }"
                  >
                    <div class="rd-items-head">
                      <span v-if="varietyItemsHaveImages">Изображение</span>
                      <span>{{ sectionItemsNameLabel(activeVariety) }}</span>
                      <span>{{ sectionItemsColumnLabel(activeVariety) }}</span>
                    </div>
                    <div v-for="item in varietyItemsList" :key="item.title" class="rd-item-row">
                      <div v-if="varietyItemsHaveImages" class="rd-item-img">
                        <img v-if="item.image" :src="item.image" :alt="item.title">
                      </div>
                      <strong>{{ item.title }}</strong>
                      <p>{{ item.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </section>

          <!-- races without varieties: plain summary + base features -->
          <section v-else class="rd-variety-section">
            <div class="rd-block">
              <h2 class="rd-h2">Сводка о расе</h2>
              <div class="rd-summary-grid">
                <div v-for="row in summaryRows" :key="row.label" class="rd-stat">
                  <span class="rd-stat-label">{{ row.label }}</span>
                  <span class="rd-stat-value">{{ row.value }}</span>
                </div>
              </div>
            </div>
            <div class="rd-block">
              <h2 class="rd-h2">Особенности расы</h2>
              <div class="rd-features">
                <div v-for="trait in baseFeatures" :key="trait.title" class="rd-feat" :class="{ wide: featWide(trait.text) }">
                  <span class="rd-feat-name">{{ trait.title }}<span class="rd-feat-tag rd-feat-tag--base">БАЗ</span></span>
                  <span class="rd-feat-text">{{ trait.text }}</span>
                </div>
              </div>
            </div>

            <!-- race-specific titled tables, e.g. "Татуировки ветров" (Аджаид) or "Стигматы" (Ойрдуг) -->
            <div v-for="section in extraRuleSections" :key="section.id" class="rd-block">
              <h2 class="rd-h2">{{ section.title }}</h2>
              <div v-if="sectionParagraphs(section).length" class="rd-variety-desc">
                <p v-for="(p, pi) in sectionParagraphs(section)" :key="pi" :class="{ 'is-heading': p.heading, 'is-quote': p.quote }">
                  <strong v-if="p.label" class="rd-section-label">{{ p.label }}:</strong> {{ p.text }}
                </p>
              </div>
              <div
                v-if="sectionItems(section).length"
                class="rd-items"
                :class="{ compact: !sectionItems(section).some(i => i.image) }"
              >
                <div class="rd-items-head">
                  <span v-if="sectionItems(section).some(i => i.image)">Изображение</span>
                  <span>{{ sectionItemsNameLabel(section) }}</span>
                  <span>{{ sectionItemsColumnLabel(section) }}</span>
                </div>
                <div v-for="item in sectionItems(section)" :key="item.title" class="rd-item-row">
                  <div v-if="sectionItems(section).some(i => i.image)" class="rd-item-img">
                    <img v-if="item.image" :src="item.image" :alt="item.title">
                  </div>
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.text }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- NAMES + RELATED -->
          <section v-if="namesText || selectedRace.related?.length" class="rd-foot">
            <div v-if="namesText" class="rd-foot-col">
              <h2 class="rd-h2">Имена</h2>
              <div class="rd-names">
                <p v-for="(p, pi) in namesParagraphs" :key="pi">
                  <strong v-if="p.label" class="rd-names-label">{{ p.label }}:</strong>
                  {{ p.text }}
                </p>
              </div>
            </div>
            <div v-if="selectedRace.related?.length" class="rd-foot-col">
              <h2 class="rd-h2">Связанные нити</h2>
              <div class="rd-related">
                <span v-for="term in selectedRace.related" :key="term" class="rd-pill">{{ term }}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.races-page{position:relative;min-height:100vh;background:radial-gradient(130% 120% at 50% 0%,#0c0e14 0%,#070810 52%,#040406 100%);color:rgba(226,230,244,.92);font-family:'Hanken Grotesk',sans-serif}

/* ---- list view: constellation map ---- */
@keyframes rlKnotSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes rlThreadBead{to{stroke-dashoffset:-522}}
@keyframes rlRiseIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes rlLinePulse{0%,100%{opacity:.45}50%{opacity:1}}

.rl{position:fixed;inset:0;overflow:hidden}
.rl-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.rl-conn{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}
.rl-halo rect{fill:none;stroke:rgba(214,170,96,.14);stroke-width:1}
.rl-halo rect:first-child{stroke:rgba(214,170,96,.22)}
.rl-stub{stroke:rgba(196,208,240,.28);stroke-width:1;fill:none}
.rl-nodes{position:absolute;inset:0;z-index:4;transform-origin:calc(50% + 34px) 50%}

.rl-node{position:absolute;left:calc(50% + 34px);top:50%;width:0;height:0;border:0;background:none;padding:0;cursor:pointer;color:rgba(226,230,244,.92);text-decoration:none;transition:transform .45s cubic-bezier(.34,1.3,.5,1)}
.rl-node-center{color:rgba(226,230,244,1)}
.rl-disc{position:absolute;left:0;top:0;width:106px;height:106px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle, rgba(7,8,12,1) 44%, rgba(7,8,12,0) 74%);pointer-events:none}
.rl-disc-center{width:186px;height:186px}
.rl-frame{position:absolute;left:0;top:0;width:96px;height:96px;transform:translate(-50%,-50%) rotate(45deg);border:1px solid rgba(214,170,96,.32);border-radius:8px;box-shadow:0 0 14px rgba(214,170,96,.14), inset 0 0 12px rgba(214,170,96,.05);pointer-events:none;transition:border-color .3s,box-shadow .3s}
.rl-node:hover .rl-frame{border-color:rgba(214,170,96,.6);box-shadow:0 0 20px rgba(214,170,96,.32), inset 0 0 14px rgba(214,170,96,.1)}
.rl-knot{position:absolute;left:0;top:0;width:76px;height:76px;transform:translate(-50%,-50%);color:inherit;filter:drop-shadow(0 0 8px rgba(176,188,232,.22));transition:filter .3s,transform .3s}
.rl-knot img{width:100%;height:100%;object-fit:contain;display:block}
.rl-node:hover .rl-knot{transform:translate(-50%,-50%) scale(1.16);filter:drop-shadow(0 0 16px rgba(214,170,96,.55)) brightness(1.15)}
.rl-knot-center{width:154px;height:154px;filter:drop-shadow(0 0 16px rgba(176,188,232,.3))}

/* The portraits are pre-cut into a diamond via alpha transparency, so the
   diamond shape comes from the image itself — no rotate/clip trick needed.
   drop-shadow (unlike box-shadow) follows the alpha silhouette, so the glow
   and shadow hug the actual diamond outline instead of a square box. */
.rl-portrait{position:absolute;left:0;top:0;width:110px;height:110px;transform:translate(-50%,-50%);transition:transform .4s cubic-bezier(.34,1.3,.5,1),filter .35s ease;filter:drop-shadow(0 10px 18px rgba(0,0,0,.6)) drop-shadow(0 0 10px rgba(214,170,96,.16))}
.rl-portrait img{width:100%;height:100%;object-fit:contain;display:block;transition:filter .35s ease;filter:brightness(.94) saturate(.94)}
.rl-node:hover .rl-portrait{transform:translate(-50%,-50%) scale(1.24);filter:drop-shadow(0 14px 26px rgba(0,0,0,.65)) drop-shadow(0 0 8px rgba(244,224,170,.9)) drop-shadow(0 0 20px rgba(214,170,96,.6))}
.rl-node:hover .rl-portrait img{filter:brightness(1.08) saturate(1.1)}

.rl-text{position:absolute;left:0;top:0;width:170px;display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:none}
.rl-text-below{transform:translate(-50%, 50px)}
.rl-text-above{transform:translate(-50%, calc(-100% - 50px))}
.rl-node-center .rl-text{transform:translate(-50%, 85px)}
.rl-label{font-family:'Cormorant Garamond',serif;font-size:14.5px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:inherit;text-align:center;line-height:1.2;white-space:normal;text-shadow:0 0 7px rgba(5,6,10,.95),0 0 16px rgba(5,6,10,.85),0 1px 3px rgba(5,6,10,.95)}
.rl-label-center{font-size:21px;letter-spacing:.2em}

.rl-wordmark{position:absolute;top:24px;left:92px;z-index:30;pointer-events:none}
.rl-wordmark-eyebrow{font-family:'Hanken Grotesk';font-size:9.5px;letter-spacing:.42em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.rl-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:21px;letter-spacing:.32em;color:rgba(232,236,250,.92);margin-top:3px}

.rl-crumb{position:absolute;top:26px;right:34px;z-index:30;display:flex;align-items:center;gap:9px;animation:rlRiseIn .5s ease both}
.rl-crumb-sep{font-size:11px;color:rgba(226,230,244,.28)}
.rl-crumb-link{font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:rgba(226,230,244,.4);text-decoration:none;cursor:pointer}
.rl-crumb-strong{font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:.12em;color:rgba(232,236,250,.92)}
.rl-crumb-exit{margin-left:6px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(226,230,244,.5);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:5px 11px;cursor:pointer;text-decoration:none}
.rl-crumb-exit:hover{background:rgba(255,255,255,.05);color:rgba(234,238,252,.95)}

.rl-search-wrap{position:absolute;left:50%;bottom:36px;z-index:30;transform:translateX(-50%);width:min(420px,90vw)}
.rl-search{width:100%;min-height:42px;padding:0 16px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(7,8,12,.6);backdrop-filter:blur(8px);outline:none;color:rgba(236,240,252,.95);font-family:'Cormorant Garamond',serif;font-size:16px}
.rl-search:focus{border-color:rgba(214,170,96,.5)}

.rl-sidebar-btn{position:absolute;top:18px;left:18px;z-index:30;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:11px;color:rgba(232,236,250,.85);transition:all .25s}
.rl-sidebar-btn:hover{background:rgba(255,255,255,.05)}

@media (max-width: 760px){
  .rl-wordmark{left:24px}
  .rl-crumb{right:16px;left:16px;justify-content:flex-end;flex-wrap:wrap}
  .rl-sidebar-btn{display:none}
}

/* ---- dossier shell ---- */
.rd{position:relative;min-height:100vh;display:flex}
.rd-nav{position:fixed;top:0;left:0;bottom:0;width:60px;z-index:50;display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:4px;border-right:1px solid rgba(255,255,255,.06);background:rgba(7,8,12,.55);backdrop-filter:blur(10px)}
.rd-nav-btn{width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:rgba(226,230,244,.55);cursor:pointer;border-radius:11px;transition:all .25s;text-decoration:none}
.rd-nav-btn:hover{color:rgba(234,238,252,.95);background:rgba(255,255,255,.05)}
.rd-nav-main{margin-bottom:6px;color:rgba(232,236,250,.85)}

.rd-main{flex:1;margin-left:60px;min-width:0}
.rd-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:20px 28px 0}
.rd-wordmark{pointer-events:none}
.rd-wordmark-eyebrow{font-family:'Hanken Grotesk';font-size:9px;letter-spacing:.4em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.rd-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.32em;color:rgba(232,236,250,.92);margin-top:3px}
.rd-top-right{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:flex-end}
.rd-crumb{display:flex;align-items:center;gap:8px}
.crumb-sep{font-size:11px;color:rgba(226,230,244,.28)}
.crumb-link{font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(226,230,244,.4);text-decoration:none}
.crumb-gold{font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:.1em;text-transform:none;color:rgba(244,224,170,.95)}
.rd-actions{display:flex;gap:6px}
.rd-action-btn{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(7,8,12,.4);color:rgba(226,230,244,.65);cursor:pointer;font-size:12px;text-decoration:none}
.rd-action-btn:hover{background:rgba(255,255,255,.08);color:rgba(236,240,252,.95)}

.rd-window{max-width:1160px;margin:0 auto;padding:22px 28px 80px;display:grid;gap:24px}

/* ---- hero: two ornate cards side by side ---- */
.rd-hero{display:grid;grid-template-columns:1.3fr 1fr;gap:18px;align-items:stretch}
.rd-hero-card{position:relative;border:1px solid rgba(214,170,96,.22);border-radius:18px;background:rgba(255,255,255,.018)}
.rd-hero-text-card{padding:24px 28px}
.rd-hero-portrait-card{padding:0;overflow:hidden;min-height:280px;cursor:zoom-in;border:1px solid rgba(214,170,96,.22);transition:transform .2s,border-color .2s}
.rd-hero-portrait-card:hover{transform:scale(1.01);border-color:rgba(214,170,96,.4)}
.rd-hero-portrait-card img{width:100%;height:100%;object-fit:cover;display:block}
.rd-portrait-empty{display:grid;place-items:center;width:100%;height:100%;min-height:280px;font-family:'Cormorant Garamond',serif;font-size:64px;color:rgba(214,170,96,.4)}
.rd-portrait-star{position:absolute;top:14px;right:16px;z-index:2;color:rgba(244,224,170,.85);font-size:18px;text-shadow:0 0 10px rgba(0,0,0,.6)}

/* corner brackets, shared decorative motif */
.rd-corner{position:absolute;width:28px;height:28px;pointer-events:none}
.rd-corner-tl{top:8px;left:8px;border-top:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:6px 0 0 0}
.rd-corner-tr{top:8px;right:8px;border-top:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 6px 0 0}
.rd-corner-br{bottom:8px;right:8px;border-bottom:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 0 6px 0}
.rd-corner-bl{bottom:8px;left:8px;border-bottom:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:0 0 0 6px}

.rd-hero-card-top{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.rd-emblem{flex:none;display:grid;place-items:center;width:56px;height:56px;border:1px solid rgba(214,170,96,.3);border-radius:13px;background:rgba(214,170,96,.06);transition:all .35s ease}
.rd-emblem-knot{width:38px;height:38px;object-fit:contain;display:block;filter:drop-shadow(0 0 10px rgba(214,170,96,.3));transition:filter .35s ease;animation:rd-knot-idle 5s ease-in-out infinite}
.rd-emblem:hover{background:rgba(214,170,96,.14);border-color:rgba(214,170,96,.6);transform:translateY(-1px) scale(1.06)}
.rd-emblem:hover .rd-emblem-knot{filter:drop-shadow(0 0 18px rgba(214,170,96,.65)) brightness(1.25);animation:rd-knot-shimmer 1.4s ease-in-out infinite}

@keyframes rd-knot-idle{0%,100%{filter:drop-shadow(0 0 10px rgba(214,170,96,.3))}50%{filter:drop-shadow(0 0 14px rgba(214,170,96,.42))}}
@keyframes rd-knot-shimmer{0%,100%{filter:drop-shadow(0 0 16px rgba(214,170,96,.55)) brightness(1.1)}50%{filter:drop-shadow(0 0 24px rgba(244,224,170,.85)) brightness(1.35)}}

.rd-eyebrow{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(214,170,96,.8)}
.rd-eyebrow-path{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.rd-eyebrow-path a{color:rgba(214,170,96,.8);text-decoration:none}
.rd-eyebrow-path a:hover{color:rgba(244,224,170,1);text-decoration:underline}
.rd-eyebrow-sep{color:rgba(226,230,244,.3)}
.rd-eyebrow-current{color:rgba(226,230,244,.6)}
.rd-title{font-family:'Cormorant Garamond',serif;font-size:44px;letter-spacing:.07em;color:rgba(238,242,252,.97);margin:0;line-height:1}
.rd-title-divider{display:flex;align-items:center;gap:10px;margin:14px 0 16px}
.rd-title-divider::before,.rd-title-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(214,170,96,.35),transparent)}
.rd-title-divider::after{background:linear-gradient(90deg,transparent,rgba(214,170,96,.35))}
.rd-title-diamond{flex:none;width:7px;height:7px;background:rgba(214,170,96,.7);transform:rotate(45deg)}

.rd-lightbox{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:40px;background:rgba(5,6,9,.86);backdrop-filter:blur(4px);cursor:zoom-out}
.rd-lightbox img{max-width:min(90vw,720px);max-height:90vh;object-fit:contain;border-radius:16px;box-shadow:0 30px 90px rgba(0,0,0,.6)}
.rd-lightbox-close{position:absolute;top:24px;right:28px;width:40px;height:40px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.2);border-radius:50%;background:rgba(255,255,255,.06);color:#fff;font-size:18px;cursor:pointer}
.rd-lightbox-close:hover{background:rgba(255,255,255,.14)}
.rd-lightbox-enter-active,.rd-lightbox-leave-active{transition:opacity .2s ease}
.rd-lightbox-enter-from,.rd-lightbox-leave-to{opacity:0}

.rd-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;line-height:1.5;color:rgba(244,224,170,.85);margin:20px 0 14px}
.rd-desc{position:relative;max-height:140px;overflow:hidden;transition:max-height .25s ease}
.rd-desc.open{max-height:3000px}
.rd-desc-inner{font-size:14px;line-height:1.75;color:rgba(226,230,244,.78)}
.rd-desc-fade{position:absolute;left:0;right:0;bottom:0;height:60px;background:linear-gradient(180deg,rgba(11,13,18,0),rgba(11,13,18,.9))}
.rd-desc-toggle{display:inline-flex;align-items:center;gap:7px;margin-top:8px;background:none;border:0;padding:0;color:rgba(214,170,96,.85);font-family:'Hanken Grotesk';font-size:12px;cursor:pointer}
.rd-desc-toggle:hover{color:rgba(244,224,170,.95)}
.rd-desc-toggle-diamond{flex:none;width:6px;height:6px;background:rgba(214,170,96,.8);transform:rotate(45deg)}
.race-prose :deep(p){margin:0 0 1em}
.race-prose :deep(h2){font-family:'Cormorant Garamond',serif;font-size:19px;color:rgba(244,224,170,.9);margin:1.1em 0 .4em}

/* ---- variety-driven dossier ---- */
.rd-variety-section{display:grid;gap:16px}
.rd-variety-tabs{display:flex;gap:6px;flex-wrap:wrap;padding:5px;border-radius:14px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.06);overflow-x:auto}
.rd-vtab{flex:1 1 auto;display:flex;align-items:center;justify-content:center;gap:8px;min-height:42px;border:0;border-radius:10px;padding:8px 18px;background:transparent;color:rgba(226,230,244,.7);cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.04em;transition:all .2s;white-space:nowrap}
.rd-vtab:hover{color:rgba(244,224,170,.95)}
.rd-vtab.active{background:rgba(214,170,96,.18);color:rgba(244,224,170,.98);box-shadow:inset 0 0 0 1px rgba(214,170,96,.4)}
.rd-vtab-diamond{flex:none;width:6px;height:6px;background:rgba(214,170,96,.5);transform:rotate(45deg)}
.rd-vtab-knot{flex:none;width:22px;height:22px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(214,170,96,.5))}

.rd-variety-body{display:grid;gap:16px}
.rd-block{border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.018);padding:20px 22px}
.rd-h2{display:flex;align-items:center;gap:10px;font-family:'Hanken Grotesk';font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(214,170,96,.85);margin:0 0 14px}
.rd-h2-sub{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:400;letter-spacing:.02em;text-transform:none;color:rgba(226,230,244,.5)}

.rd-variety-badge{font-family:'Hanken Grotesk';font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(20,15,6,.95);background:rgba(214,170,96,.9);border-radius:8px;padding:4px 11px}
.rd-variety-desc{font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.7;color:rgba(226,230,244,.82)}
.rd-variety-desc.collapsed{position:relative;max-height:240px;overflow:hidden}
.rd-variety-desc.collapsed .rd-desc-fade{position:absolute;left:0;right:0;bottom:0;height:70px;background:linear-gradient(180deg,rgba(13,15,20,0),rgba(13,15,20,.95))}
.rd-variety-desc p{margin:0 0 .8em}
.rd-variety-desc p:last-child{margin-bottom:0}
.rd-variety-desc .is-heading{font-weight:600;color:rgba(244,224,170,.92);font-size:17px}
.rd-variety-desc .is-quote{border-left:3px solid rgba(214,170,96,.5);padding-left:14px;font-style:italic;color:rgba(226,230,244,.7)}
.rd-variety-desc-empty{font-style:italic;color:rgba(226,230,244,.5)}

.rd-summary-grid{display:grid;gap:0}
.rd-stat{display:grid;grid-template-columns:160px minmax(0,1fr);gap:18px;align-items:start;padding:11px 0;border-top:1px solid rgba(255,255,255,.06)}
.rd-stat:first-child{border-top:0}
.rd-stat-label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(226,230,244,.5);padding-top:3px}
.rd-stat-value{font-family:'Cormorant Garamond',serif;font-size:15.5px;color:rgba(236,240,252,.92);line-height:1.55}

.rd-features{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.rd-feat{display:flex;flex-direction:column;gap:7px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.02);padding:16px 18px}
.rd-feat.wide{grid-column:1 / -1}
.rd-feat-name{display:flex;align-items:center;gap:8px;font-family:'Hanken Grotesk';font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.rd-feat-tag{flex:none;font-size:9px;font-weight:700;letter-spacing:.06em;color:rgba(20,15,6,.95);background:rgba(214,170,96,.85);border-radius:5px;padding:2px 6px}
.rd-feat-tag--base{color:rgba(232,238,252,.95);background:rgba(120,140,180,.6)}
.rd-feat-text{font-size:13.5px;line-height:1.65;color:rgba(226,230,244,.76)}
.rd-feat--v{border-color:rgba(214,170,96,.4);background:rgba(214,170,96,.07)}

.rd-items{display:grid;margin-top:14px;overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.012)}
.rd-items-head,.rd-item-row{display:grid;grid-template-columns:84px 160px minmax(0,1fr);gap:14px;align-items:start}
.rd-items.compact .rd-items-head,.rd-items.compact .rd-item-row{grid-template-columns:180px minmax(0,1fr)}
.rd-items-head{padding:9px 14px;background:rgba(214,170,96,.1);color:rgba(244,224,170,.92);font-size:10.5px;font-weight:700;text-transform:uppercase}
.rd-item-row{padding:11px 14px;border-top:1px solid rgba(255,255,255,.06)}
.rd-item-img{display:grid;place-items:center;min-height:70px;border-radius:8px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02)}
.rd-item-img img{width:min(66px,100%);max-height:80px;object-fit:contain}
.rd-item-row strong{display:block;margin-bottom:3px;color:rgba(236,240,252,.92);font-size:14px}
.rd-item-row p{margin:0;font-size:13px;line-height:1.55;color:rgba(226,230,244,.74)}

/* ---- footer (names + related) ---- */
.rd-foot{display:grid;grid-template-columns:1.6fr 1fr;gap:18px}
.rd-foot-col{min-width:0}
.rd-names{border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.018);padding:18px 20px;font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1.7;color:rgba(226,230,244,.8)}
.rd-names p{margin:0 0 .6em}
.rd-names p:last-child{margin-bottom:0}
.rd-names-label{color:rgba(244,224,170,.9);font-weight:600}
.rd-section-label{color:rgba(244,224,170,.9);font-weight:600}
.rd-related{border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.018);padding:18px 20px;display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;height:100%}
.rd-pill{border:1px solid rgba(214,170,96,.3);background:rgba(214,170,96,.08);color:rgba(244,224,170,.92);border-radius:999px;padding:6px 14px;font-family:'Cormorant Garamond',serif;font-size:14px}

.rd-swap-enter-active,.rd-swap-leave-active{transition:opacity .18s ease,transform .18s ease}
.rd-swap-enter-from,.rd-swap-leave-to{opacity:0;transform:translateY(8px)}

/* ---- breakpoints ---- */
@media (max-width: 900px){
  .rd-hero{grid-template-columns:1fr}
  .rd-hero-portrait-card{min-height:220px}
}
@media (max-width: 760px){
  .rd-nav{flex-direction:row;top:auto;bottom:0;right:0;width:auto;height:54px;padding:0 10px;border-right:0;border-top:1px solid rgba(255,255,255,.06)}
  .rd-nav-main{margin-bottom:0;margin-right:6px}
  .rd-main{margin-left:0;padding-bottom:60px}
  .rd-window{padding:18px 16px 80px}
  .rd-hero-text-card{padding:18px 18px}
  .rd-title{font-size:32px}
  .rd-stat{grid-template-columns:1fr;gap:4px}
  .rd-features{grid-template-columns:1fr}
  .rd-foot{grid-template-columns:1fr}
}

@media print{
  .rd-nav,.rd-actions,.rd-wordmark{display:none}
  .rd-main{margin-left:0}
  .rd-desc{max-height:none;overflow:visible}
  .rd-desc-fade,.rd-desc-toggle{display:none}
}
</style>
