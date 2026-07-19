<script setup>
import { useKnotCanvas } from '~/composables/useKnotCanvas.js'

const route = useRoute()

const search = ref('')
const copiedLink = ref(false)
const descExpanded = ref(false)
const varietyDescOpen = ref(false)
const selectedVarietyId = ref(null)
const isPortraitOpen = ref(false)
const activeBloodList = ref(null)
const rolledBlood = ref(null)
const rolledD13Idx = ref(null)
const rolledD4Idx = ref(null)
const namesPartOpen = ref(null)
const activeThreadSourceId = ref('base')
const raceSparkWrapRef = ref(null)
const raceSparkRef = ref(null)

// The race dossier uses the same living thread as class pages: the spark
// follows the pointer only between real content nodes, settles into their
// diamonds and kindles the exact card or row currently under the pointer.
const RACE_SPARK_MAX_SPEED = 520
const RACE_SPARK_FOLLOW_RATE = 8.5
const RACE_SPARK_SNAP_DISTANCE = 1.25
const RACE_SPARK_LAYOUT_REFRESH_MS = 180
const RACE_SPARK_ITEM_SELECTOR = '.rd-central-emblem, .rd-hero-card, .rd-source-choice, .rd-vtab, .rd-stat, .rd-feat, .rd-item-row, .rd-wind-cell, .rd-nb-acc-item, .rd-pill'
let raceSparkRaf = null
let raceSparkRunning = false
let raceSparkCurrentY = null
let raceSparkLastTime = null
let raceSparkNodes = []
let raceSparkNodesReadAt = -Infinity
let raceSparkPointerClientX = null
let raceSparkPointerClientY = null
let raceSparkTargetNode = null
let raceSparkKindledNode = null
let raceSparkKindledItem = null
let raceSparkStopped = false

function raceReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function raceThreadNodeYs(wrap, wrapTop) {
  return Array.from(wrap.querySelectorAll('.rd-central-emblem, .rd-thread-node, .rd-thread .rd-block'))
    .map((el) => {
      const rect = el.getBoundingClientRect()
      const y = el.classList.contains('rd-central-emblem')
        ? rect.top - wrapTop + rect.height / 2
        : rect.top - wrapTop + 29.5
      return { el, rect, y }
    })
    .filter(node => node.rect.width > 0 && node.rect.height > 0)
    .sort((a, b) => a.y - b.y)
}

function ensureRaceSparkLoop() {
  if (raceSparkRunning || raceSparkStopped) return
  raceSparkRunning = true
  raceSparkRaf = requestAnimationFrame(raceSparkTick)
}

function placeRaceSpark(spark, y) {
  spark.style.transform = `translateY(${y}px) rotate(45deg)`
}

function activateRaceSparkNode(el) {
  raceSparkKindledNode = el
  el.classList.add('is-spark-active')
}

function leaveRaceSparkNode() {
  raceSparkKindledNode?.classList.remove('is-spark-active')
  raceSparkKindledNode = null
}

function activateRaceSparkItem(el) {
  if (el === raceSparkKindledItem) return
  raceSparkKindledItem?.classList.remove('is-spark-kindled')
  raceSparkKindledItem = el
  raceSparkKindledItem?.classList.add('is-spark-kindled')
}

function refreshRaceSparkTarget(now, wrap) {
  if (raceSparkPointerClientY == null) return
  const wrapRect = wrap.getBoundingClientRect()
  if (!raceSparkNodes.length || now - raceSparkNodesReadAt >= RACE_SPARK_LAYOUT_REFRESH_MS) {
    raceSparkNodes = raceThreadNodeYs(wrap, wrapRect.top)
    raceSparkNodesReadAt = now
  }

  const hit = raceSparkPointerClientX == null
    ? null
    : document.elementFromPoint(raceSparkPointerClientX, raceSparkPointerClientY)
  const hoveredEl = hit?.closest('.rd-central-emblem, .rd-thread-node, .rd-thread .rd-block')
  const hoveredNode = hoveredEl && wrap.contains(hoveredEl)
    ? raceSparkNodes.find(node => node.el === hoveredEl)
    : null
  const hoveredItem = hit?.closest(RACE_SPARK_ITEM_SELECTOR)
  activateRaceSparkItem(hoveredItem && wrap.contains(hoveredItem) ? hoveredItem : null)

  if (!hoveredNode || hoveredNode.el === raceSparkTargetNode?.el) return
  leaveRaceSparkNode()
  raceSparkTargetNode = hoveredNode
}

function raceSparkTick(now) {
  const wrap = raceSparkWrapRef.value
  const spark = raceSparkRef.value
  if (!wrap || !spark) { raceSparkRunning = false; return }

  refreshRaceSparkTarget(now, wrap)
  if (!raceSparkTargetNode) {
    raceSparkRunning = false
    raceSparkRaf = null
    return
  }

  if (raceSparkCurrentY == null) {
    raceSparkCurrentY = raceSparkTargetNode.y
    raceSparkLastTime = now
    placeRaceSpark(spark, raceSparkCurrentY)
    spark.classList.add('is-live')
    activateRaceSparkNode(raceSparkTargetNode.el)
  }

  const dt = Math.min(0.05, Math.max(0, (now - (raceSparkLastTime ?? now)) / 1000))
  raceSparkLastTime = now
  const distance = raceSparkTargetNode.y - raceSparkCurrentY
  const arrived = Math.abs(distance) <= RACE_SPARK_SNAP_DISTANCE
  if (arrived) {
    raceSparkCurrentY = raceSparkTargetNode.y
    if (raceSparkKindledNode !== raceSparkTargetNode.el) activateRaceSparkNode(raceSparkTargetNode.el)
  } else {
    const easedStep = distance * (1 - Math.exp(-RACE_SPARK_FOLLOW_RATE * dt))
    const maxStep = RACE_SPARK_MAX_SPEED * dt
    raceSparkCurrentY += Math.sign(easedStep) * Math.min(Math.abs(easedStep), maxStep)
  }
  placeRaceSpark(spark, raceSparkCurrentY)

  if (arrived) {
    raceSparkRunning = false
    raceSparkRaf = null
    return
  }
  raceSparkRaf = requestAnimationFrame(raceSparkTick)
}

function onRaceSparkPointerMove(event) {
  raceSparkPointerClientX = event.clientX
  raceSparkPointerClientY = event.clientY
  ensureRaceSparkLoop()
}

function onRaceSparkScroll() {
  if (raceSparkPointerClientY == null) return
  raceSparkNodesReadAt = -Infinity
  ensureRaceSparkLoop()
}

function onRaceSparkPointerLeave() {
  activateRaceSparkItem(null)
}

function invalidateRaceSpark() {
  raceSparkNodes = []
  raceSparkNodesReadAt = -Infinity
}

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

const selectedRaceDocument = computed(() => races.value.find(r => r.path === selectedPath.value) || null)

const threadSourceOptions = computed(() => {
  const race = selectedRaceDocument.value
  if (!race) return []
  return [
    {
      id: 'base',
      source: race.source || 'TL',
      sourceTitle: race.sourceTitle || 'The Threads of Largo',
      sourceAuthor: race.sourceAuthor,
      sourceUrl: race.sourceUrl,
      sourceNote: race.sourceNote,
      publishedAt: race.publishedAt
    },
    ...(race.threadSources || [])
  ]
})

const selectedThreadSource = computed(() => {
  return threadSourceOptions.value.find(item => item.id === activeThreadSourceId.value) || threadSourceOptions.value[0] || null
})

// The page always consumes one complete race view. A Thread Source can replace
// every visible and mechanical field while keeping the route stable.
const selectedRace = computed(() => {
  const race = selectedRaceDocument.value
  const threadSource = selectedThreadSource.value
  if (!race || !threadSource || threadSource.id === 'base') return race
  return {
    ...race,
    ...threadSource,
    path: race.path,
    body: race.body,
    threadSources: race.threadSources
  }
})

const sourceMeta = computed(() => {
  const view = selectedThreadSource.value
  if (!view) return null
  return {
    code: view.source || 'TL',
    title: view.sourceTitle || 'The Threads of Largo',
    author: view.sourceAuthor || '',
    url: view.sourceUrl || '',
    note: view.sourceNote || '',
    publishedAt: view.publishedAt || ''
  }
})

const threadSourceLore = computed(() => selectedThreadSource.value?.lore || [])

function minimarkPlainText(node) {
  if (typeof node === 'string') return node
  if (!Array.isArray(node)) return ''
  return node.slice(2).map(minimarkPlainText).join('')
}

function normalizeOverviewParagraph(text = '') {
  return text.replace(/\s+/g, ' ').trim()
}

const overviewBlocks = computed(() => {
  const blocks = []
  const lead = selectedRace.value?.description?.trim() || ''
  if (threadSourceLore.value.length) {
    for (const entry of threadSourceLore.value) {
      const title = typeof entry === 'string' ? '' : normalizeOverviewParagraph(entry?.title || '')
      const paragraph = typeof entry === 'string' ? entry : entry?.text || ''
      if (title) blocks.push({ type: 'heading', text: title })
      const text = normalizeOverviewParagraph(paragraph)
      if (text) blocks.push({ type: 'paragraph', text })
    }
    return blocks
  }

  const nodes = selectedRace.value?.body?.value
  if (!Array.isArray(nodes)) return blocks
  let firstParagraph = true
  for (const node of nodes) {
    if (!Array.isArray(node)) continue
    const tag = node[0]
    const rawText = minimarkPlainText(node).trim()
    if (!rawText) continue
    if (/^h[2-4]$/.test(tag)) {
      blocks.push({ type: 'heading', text: rawText })
      continue
    }
    if (tag !== 'p') continue
    let paragraph = rawText
    if (firstParagraph && lead && paragraph.startsWith(lead)) paragraph = paragraph.slice(lead.length).trim()
    firstParagraph = false
    paragraph = normalizeOverviewParagraph(paragraph)
    if (paragraph) blocks.push({ type: 'paragraph', text: paragraph })
  }
  return blocks
})

useSeoMeta({
  title: () => selectedRace.value?.title ? `${selectedRace.value.title} — TKK.club` : 'Расы и происхождения — TKK.club',
  description: () => selectedRace.value?.description || 'Расы и происхождения мира Эноа.'
})

// ---- constellation map for the races list (matches the hub's home/system look) ----
const RL_TH = { ink:'rgba(var(--theme-text-rgb),', glow:'rgba(176,188,232,', thread:'rgba(196,208,240,', hi:'238,243,255', disc:'7,8,12' }
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
      ? { stroke: RL_TH.thread + '0.4)', strokeWidth: '1', fill: 'rgba(var(--theme-surface-rgb),0.95)' }
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

function resetRaceView() {
  descExpanded.value = false
  selectedVarietyId.value = null
  isPortraitOpen.value = false
  varietyDescOpen.value = false
  activeBloodList.value = null
  rolledBlood.value = null
  rolledD13Idx.value = null
  rolledD4Idx.value = null
  namesPartOpen.value = null
  invalidateRaceSpark()
}

function threadSourceFromRoute() {
  const requested = typeof route.query.source === 'string' ? route.query.source : 'base'
  return threadSourceOptions.value.some(item => item.id === requested) ? requested : 'base'
}

watch([selectedPath, threadSourceOptions], () => {
  activeThreadSourceId.value = threadSourceFromRoute()
  resetRaceView()
}, { immediate: true })

watch(() => route.query.source, () => {
  const next = threadSourceFromRoute()
  if (activeThreadSourceId.value !== next) {
    activeThreadSourceId.value = next
    resetRaceView()
  }
})

async function selectThreadSource(id) {
  if (id === activeThreadSourceId.value) return
  activeThreadSourceId.value = id
  resetRaceView()
  const query = { ...route.query }
  if (id === 'base') delete query.source
  else query.source = id
  await navigateTo({ path: selectedPath.value, query }, { replace: true })
}

function onEscClose(e) { if (e.key === 'Escape') isPortraitOpen.value = false }
onMounted(() => { if (import.meta.client) window.addEventListener('keydown', onEscClose) })
onUnmounted(() => { if (import.meta.client) window.removeEventListener('keydown', onEscClose) })

onMounted(() => {
  if (!import.meta.client || raceReducedMotion()) return
  window.addEventListener('scroll', onRaceSparkScroll, { passive: true })
})
onBeforeUnmount(() => {
  raceSparkStopped = true
  if (import.meta.client) window.removeEventListener('scroll', onRaceSparkScroll)
  if (raceSparkRaf) cancelAnimationFrame(raceSparkRaf)
  leaveRaceSparkNode()
  activateRaceSparkItem(null)
})

function toggleDesc() { descExpanded.value = !descExpanded.value }
function selectVariety(id) {
  selectedVarietyId.value = id
  varietyDescOpen.value = false
  activeBloodList.value = null
  rolledBlood.value = null
  rolledD13Idx.value = null
  rolledD4Idx.value = null
  namesPartOpen.value = null
}

function rollBothName() {
  const nd = activeNameData.value
  if (!nd) return
  rolledD13Idx.value = Math.floor(Math.random() * nd.d13.entries.length)
  rolledD4Idx.value = Math.floor(Math.random() * nd.d4x4.entries.length)
}

function rollBlood() {
  const tables = activeBloodTables.value
  if (!tables) return
  const m = Math.floor(Math.random() * tables.mother.length)
  const f = Math.floor(Math.random() * tables.father.length)
  rolledBlood.value = { m, f }
  activeBloodList.value = null
}

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
  'Человек (Дангун)': ['Там, где Солнце не заходит', 'Удача и индиго'],
  'Человек (Бралл)': ['Красота в голове'],
  'Человек (Адаад)': ['Неугасающий дух']
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
  },
  '/dnd5e/races/morhory': {
    'Дитя Анзу': '/images/races/morhory/knots/anzu-t.png',
    'Дитя Эдры': '/images/races/morhory/knots/edra-t.png'
  },
  '/dnd5e/races/vetu': {
    "Ча'Нери": '/images/races/vetu/knots/chaneri.png',
    "Кса'От": '/images/races/vetu/knots/ksaot.png',
    "Тлан'Каа": '/images/races/vetu/knots/tlaankaa.png'
  }
}
// Default knot for races without varieties
const RACE_KNOT_DEFAULT = {
  '/dnd5e/races/borosy': '/images/races/borosy/knots/borosy-t.png',
  '/dnd5e/races/jabari': '/images/races/jabari/knots/jabari-t.png',
  '/dnd5e/races/adzhaidy': '/images/races/adzhaidy/knots/adzhaidy-t.png',
  '/dnd5e/races/oyrdugi': '/images/races/oyrdugi/knots/oyrdugi-t.png',
  '/dnd5e/races/samaghi': '/images/races/samaghi/knots/samaghi-t.png',
  '/dnd5e/races/ehornur': '/images/races/ehornur/knots/ehornur-t.png'
}
const activeKnot = computed(() => {
  const map = RACE_KNOTS[selectedPath.value]
  if (map && activeVariety.value) return map[varietyShortTitle(activeVariety.value)] || ''
  return RACE_KNOT_DEFAULT[selectedPath.value] || ''
})
const CLEAN_CENTRAL_KNOT_PATHS = new Set([
  '/dnd5e/races/borosy',
  '/dnd5e/races/jabari',
  '/dnd5e/races/vetu',
  '/dnd5e/races/oyrdugi',
  '/dnd5e/races/samaghi',
  '/dnd5e/races/ehornur'
])
const hasCleanCentralKnot = computed(() => CLEAN_CENTRAL_KNOT_PATHS.has(selectedPath.value))
const hasLargeCentralKnot = computed(() => selectedPath.value === '/dnd5e/races/hudduliny')

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

// Names block — shown only for varieties listed in nameData.varieties (Ча'Нери, Кса'От)
const activeNameData = computed(() => {
  const nd = selectedRace.value?.nameData
  if (!nd) return null
  const variety = activeVariety.value
  if (!variety) return null
  return (nd.varieties || []).includes(varietyShortTitle(variety)) ? nd : null
})
const d4x4Left = computed(() => activeNameData.value?.d4x4?.entries?.filter((_, i) => i % 2 === 0) || [])
const d4x4Right = computed(() => activeNameData.value?.d4x4?.entries?.filter((_, i) => i % 2 === 1) || [])
const isLostName = computed(() => {
  const nd = activeNameData.value
  if (!nd || rolledD13Idx.value === null || rolledD4Idx.value === null) return false
  const d13e = nd.d13?.entries?.[rolledD13Idx.value]
  const d4e = nd.d4x4?.entries?.[rolledD4Idx.value]
  if (!d13e || !d4e || !nd.lost) return false
  return nd.lost.entries.some(e => e.d13 === d13e.roll && e.roll === d4e.roll)
})
function rollD13() {
  const entries = activeNameData.value?.d13?.entries
  if (!entries?.length) return
  rolledD13Idx.value = Math.floor(Math.random() * entries.length)
}
function rollD4x4() {
  const entries = activeNameData.value?.d4x4?.entries
  if (!entries?.length) return
  rolledD4Idx.value = Math.floor(Math.random() * entries.length)
}

function adjForm(adj, gender) {
  if (!adj || !gender || gender === 'm') return adj
  const base = adj.replace(/ый$/, '')
  if (gender === 'f') return base + 'ая'
  if (gender === 'n') return base + 'ое'
  if (gender === 'pl') return base + 'ые'
  return adj
}

const rolledMeaning = computed(() => {
  if (rolledD13Idx.value === null || rolledD4Idx.value === null) return ''
  const nd = activeNameData.value
  const d13e = nd?.d13?.entries?.[rolledD13Idx.value]
  const d4e = nd?.d4x4?.entries?.[rolledD4Idx.value]
  if (!d13e || !d4e) return ''
  return adjForm(d13e.desc, d4e.g || 'm') + ' ' + d4e.sign
})

// Blood of Snakes table — only shown for the Тлан'Каа variety when the race has bloodTables
const activeBloodTables = computed(() => {
  if (!selectedRace.value?.bloodTables) return null
  const variety = activeVariety.value
  if (!variety) return null
  return varietyShortTitle(variety) === 'Тлан\'Каа' ? selectedRace.value.bloodTables : null
})

// Rule sections already surfaced elsewhere (summary panel, names, ability score)
// — everything else (e.g. a race's own titled tables like "Татуировки ветров" or
// "Стигматы") still needs somewhere to render, even for races with no varieties.
const SHOWN_ELSEWHERE = ['Увеличение характеристик', 'Возраст', 'Мировоззрение', 'Размер', 'Скорость', 'Языки', 'Имена', 'Разновидности']
const extraRuleSections = computed(() => {
  const varietyIds = new Set(varietyItemSections.value.map(section => section.id))
  return detailSections.value
    .filter(section => !SHOWN_ELSEWHERE.includes(section.title) && !varietyIds.has(section.id))
    .map(section => ({ ...section, id: 'extra-' + section.id }))
})

const activeWindTattooTable = computed(() => {
  const table = selectedRace.value?.windTattooTable
  return table?.entries?.length ? table : null
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
    { label: 'Тип существа', value: r.creatureType || '—' },
    { label: 'Характеристики', value: r.abilityScore || '—' },
    { label: 'Размер', value: r.raceSize || '—' },
    { label: 'Скорость', value: r.speed || '—' },
    { label: 'Возраст', value: fullText(findRuleText(r, 'Возраст')) },
    { label: 'Мировоззрение', value: fullText(findRuleText(r, 'Мировоззрение')) },
    { label: 'Тёмное зрение', value: darkvision(r) },
    { label: 'Языки', value: fullText(findRuleText(r, 'Языки')) }
  ]
})

// Names are a standard race block. A Thread may replace them with its own
// "Имена" section; otherwise the shared race names remain visible.
const namesText = computed(() => {
  const sourceNames = findRuleText(selectedRace.value, 'Имена')
  if (sourceNames) return sourceNames
  if (selectedThreadSource.value?.id !== 'base' && selectedThreadSource.value?.inheritNames === false) return ''
  return findRuleText(selectedRaceDocument.value, 'Имена')
})
const namesParagraphs = computed(() => namesText.value ? sectionParagraphs({ title: 'Имена', text: namesText.value }) : [])

async function copyRaceLink() {
  if (!import.meta.client) return
  const url = new URL(route.fullPath, window.location.origin).toString()
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
        <NuxtLink to="/dnd5e" class="rl-node rl-node-center" title="К карте D&D 5e">
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

      <aside class="rl-sidebar" aria-label="Навигация">
        <NuxtLink to="/" class="rl-sidebar-btn" title="Главный узел">
          <img src="/assets/knot-main.png" width="30" height="30" style="display:block;object-fit:contain">
        </NuxtLink>
        <ThemeSwitcher compact />
      </aside>
    </div>

    <!-- DETAIL DOSSIER -->
    <div v-else class="rd">
      <svg class="rd-filter-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="rd-knot-alpha-clean" color-interpolation-filters="sRGB">
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 0 1 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

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
        <ThemeSwitcher compact />
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

        <div
          ref="raceSparkWrapRef"
          class="rd-window"
          @pointermove="onRaceSparkPointerMove"
          @pointerleave="onRaceSparkPointerLeave"
        >
          <span ref="raceSparkRef" class="rd-spark" aria-hidden="true" />

          <section class="rd-central-head">
            <NuxtLink
              to="/dnd5e/races"
              class="rd-central-emblem"
              :class="{
                'rd-central-emblem--clean-knot': hasCleanCentralKnot,
                'rd-central-emblem--large-knot': hasLargeCentralKnot
              }"
              title="Назад к расам"
              aria-label="Назад к списку рас"
            >
              <span class="rd-central-emblem-frame" />
              <img
                v-if="activeKnot"
                :src="activeKnot"
                :alt="activeVariety ? `Узел: ${varietyShortTitle(activeVariety)}` : 'Узел расы'"
                class="rd-central-emblem-knot"
              >
              <img v-else src="/assets/nodes/rasy.png" alt="Узел расы" class="rd-central-emblem-knot">
            </NuxtLink>

            <div class="rd-central-heading">
              <nav class="rd-eyebrow rd-eyebrow-path">
                <NuxtLink to="/">D&D 5e</NuxtLink>
                <span class="rd-eyebrow-sep">/</span>
                <NuxtLink to="/dnd5e/races">Расы</NuxtLink>
                <span class="rd-eyebrow-sep">/</span>
                <span class="rd-eyebrow-current">{{ selectedRace.title }}</span>
              </nav>
              <h1 class="rd-title">{{ selectedRace.title.toUpperCase() }}</h1>
              <div v-if="selectedRace.originalName" class="rd-original-name">{{ selectedRace.originalName }}</div>
            </div>
          </section>

          <div class="rd-thread">
            <!-- Standard race presentation: Thread Source strip + shared overview + portrait -->
            <section class="rd-presentation" aria-label="Представление расы">
              <div class="rd-source-panel rd-thread-node" aria-label="Источник Нити">
                <div
                  class="rd-source-choices"
                  :class="{ 'has-variants': threadSourceOptions.length > 1 }"
                  role="tablist"
                  aria-label="Доступные Источники Нити"
                >
                  <button
                    v-for="option in threadSourceOptions"
                    :key="option.id"
                    type="button"
                    class="rd-source-choice"
                    :class="{ active: option.id === activeThreadSourceId }"
                    role="tab"
                    :aria-selected="option.id === activeThreadSourceId"
                    @click="selectThreadSource(option.id)"
                  >
                    <span class="rd-source-line">
                      <small>Источник Нити</small>
                      <i>—</i>
                      <b>{{ option.source }}</b>
                      <i>—</i>
                      <strong>{{ option.sourceTitle }}</strong>
                    </span>
                  </button>
                </div>

                <div v-if="sourceMeta?.note || sourceMeta?.publishedAt || sourceMeta?.url" class="rd-source-current">
                  <span v-if="sourceMeta?.note" class="rd-source-note">{{ sourceMeta.note }}</span>
                  <span v-if="sourceMeta?.publishedAt">{{ sourceMeta.publishedAt }}</span>
                  <a
                    v-if="sourceMeta?.url"
                    :href="sourceMeta.url"
                    target="_blank"
                    rel="noreferrer"
                    class="rd-source-link"
                  >Открыть источник ↗</a>
                </div>
              </div>

              <div class="rd-hero rd-thread-node">
                <div class="rd-hero-card rd-hero-text-card">
                  <div v-if="selectedRace.description" class="rd-overview-lead">
                    <p class="rd-quote">«{{ selectedRace.description }}»</p>
                  </div>

                  <div v-if="overviewBlocks.length" class="rd-desc" :class="{ open: descExpanded }">
                    <div class="rd-desc-inner rd-overview-blocks">
                      <template v-for="(block, index) in overviewBlocks" :key="`${block.type}-${index}`">
                        <h3 v-if="block.type === 'heading'" class="rd-overview-heading">{{ block.text }}</h3>
                        <p v-else class="rd-overview-paragraph">{{ block.text }}</p>
                      </template>
                    </div>
                  </div>
                  <button v-if="overviewBlocks.length" class="rd-desc-toggle" type="button" @click="toggleDesc">
                    <span v-if="descExpanded" class="rd-desc-toggle-arrow">↑</span>
                    <span v-else class="rd-desc-toggle-ellipsis">…</span>
                    {{ descExpanded ? 'Свернуть описание' : 'Продолжить чтение' }}
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
            <div class="rd-variety-tabs rd-thread-node">
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
                    Представители
                    <span class="rd-variety-badge">{{ varietyShortTitle(activeVariety) }}</span>
                  </h2>
                  <div class="rd-variety-desc" :class="{ collapsed: varietyDescParagraphs.length > 3 && !varietyDescOpen }">
                    <p v-for="(p, pi) in varietyDescParagraphs" :key="pi" :class="{ 'is-heading': p.heading, 'is-quote': p.quote }">
                      {{ p.text }}
                    </p>
                    <p v-if="!varietyDescParagraphs.length" class="rd-variety-desc-empty">Описание этой разновидности в подготовке.</p>
                  </div>
                  <button
                    v-if="varietyDescParagraphs.length > 3"
                    class="rd-desc-toggle"
                    type="button"
                    @click="varietyDescOpen = !varietyDescOpen"
                  >
                    <span v-if="varietyDescOpen" class="rd-desc-toggle-arrow">↑</span>
                    <span v-else class="rd-desc-toggle-ellipsis">…</span>
                    {{ varietyDescOpen ? 'Свернуть описание' : 'Продолжить чтение' }}
                  </button>
                </div>

                <!-- 2. race names (generic fallback; structured variety names are rendered below and reordered with CSS) -->
                <div v-if="namesText && !activeNameData" class="rd-block rd-names-block">
                  <h2 class="rd-h2">Имена</h2>
                  <div class="rd-names">
                    <p v-for="(p, pi) in namesParagraphs" :key="pi">
                      <strong v-if="p.label" class="rd-names-label">{{ p.label }}:</strong>
                      {{ p.text }}
                    </p>
                  </div>
                </div>

                <!-- 3. unified rules block: summary + traits -->
                <div class="rd-block rd-summary-block rd-details-block">
                  <h2 class="rd-h2">Особенности</h2>
                  <div class="rd-summary-grid">
                    <div v-for="row in summaryRows" :key="row.label" class="rd-stat">
                      <span class="rd-stat-label">{{ row.label }}</span>
                      <span class="rd-stat-value">{{ row.value }}</span>
                    </div>
                  </div>
                  <div class="rd-details-divider" aria-hidden="true"><span /></div>
                  <div class="rd-features">
                    <template v-for="card in varietyFeatures" :key="'v-' + card.title">
                      <!-- Кровь змей: special interactive card with expandable blood lists -->
                      <div
                        v-if="card.title === 'Кровь змей' && activeBloodTables"
                        class="rd-feat rd-feat--v rd-feat--blood wide"
                      >
                        <span class="rd-feat-name">{{ card.title }}<span class="rd-feat-tag">{{ varietyShortTitle(activeVariety) }}</span></span>
                        <span class="rd-feat-text">{{ card.text }}</span>
                        <!-- Roll button -->
                        <button class="rd-blood-roll-btn" type="button" @click="rollBlood">
                          Бросить кубики
                        </button>

                        <!-- Roll result -->
                        <transition name="rd-blood-fade">
                          <div v-if="rolledBlood" class="rd-blood-result">
                            <div class="rd-blood-result-col">
                              <div class="rd-blood-result-label">Кровь Матери</div>
                              <div class="rd-blood-result-entry">
                                <span class="rd-blood-entry-dice">{{ activeBloodTables.mother[rolledBlood.m].dice }}</span>
                                <div class="rd-blood-entry-body">
                                  <strong class="rd-blood-entry-name">{{ activeBloodTables.mother[rolledBlood.m].name }}</strong>
                                  <p class="rd-blood-entry-text">{{ activeBloodTables.mother[rolledBlood.m].text }}</p>
                                </div>
                              </div>
                            </div>
                            <div class="rd-blood-result-divider" />
                            <div class="rd-blood-result-col">
                              <div class="rd-blood-result-label">Кровь Отца</div>
                              <div class="rd-blood-result-entry">
                                <span class="rd-blood-entry-dice">{{ activeBloodTables.father[rolledBlood.f].dice }}</span>
                                <div class="rd-blood-entry-body">
                                  <strong class="rd-blood-entry-name">{{ activeBloodTables.father[rolledBlood.f].name }}</strong>
                                  <p class="rd-blood-entry-text">{{ activeBloodTables.father[rolledBlood.f].text }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </transition>

                        <!-- Full list tabs (browse mode) -->
                        <div class="rd-blood-tabs">
                          <button
                            class="rd-blood-tab"
                            :class="{ active: activeBloodList === 'mother' }"
                            type="button"
                            @click="rolledBlood = null; activeBloodList = activeBloodList === 'mother' ? null : 'mother'"
                          >Кровь Матери</button>
                          <button
                            class="rd-blood-tab"
                            :class="{ active: activeBloodList === 'father' }"
                            type="button"
                            @click="rolledBlood = null; activeBloodList = activeBloodList === 'father' ? null : 'father'"
                          >Кровь Отца</button>
                        </div>
                        <transition name="rd-blood-fade">
                          <div v-if="activeBloodList" class="rd-blood-list">
                            <div
                              v-for="entry in activeBloodTables[activeBloodList]"
                              :key="entry.dice"
                              class="rd-blood-entry"
                            >
                              <span class="rd-blood-entry-dice">{{ entry.dice }}</span>
                              <div class="rd-blood-entry-body">
                                <strong class="rd-blood-entry-name">{{ entry.name }}</strong>
                                <p class="rd-blood-entry-text">{{ entry.text }}</p>
                              </div>
                            </div>
                          </div>
                        </transition>
                      </div>
                      <!-- Regular feature card -->
                      <div v-else class="rd-feat rd-feat--v" :class="{ wide: featWide(card.text) }">
                        <span class="rd-feat-name">{{ card.title }}<span class="rd-feat-tag">{{ varietyShortTitle(activeVariety) }}</span></span>
                        <span class="rd-feat-text">{{ card.text }}</span>
                      </div>
                    </template>
                    <div v-for="trait in baseFeatures" :key="'b-' + trait.title" class="rd-feat" :class="{ wide: featWide(trait.text) }">
                      <span class="rd-feat-name">{{ trait.title }}</span>
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

                <!-- Structured names block — only for varieties with nameData (Ча'Нери, Кса'От); CSS places it before summary -->
                <div v-if="activeNameData" class="rd-block rd-names-block">
                  <h2 class="rd-h2">
                    Имена
                    <span class="rd-variety-badge">{{ varietyShortTitle(activeVariety) }}</span>
                  </h2>

                  <p class="rd-nb-intro">{{ activeNameData.intro }}</p>

                  <div v-if="activeNameData.examples" class="rd-nb-examples">
                    <span class="rd-nb-examples-lbl">Примеры:</span> {{ activeNameData.examples }}
                  </div>

                  <!-- Generated name result -->
                  <transition name="rd-nb-result-fade">
                    <div
                      v-if="rolledD13Idx !== null && rolledD4Idx !== null"
                      class="rd-nb-result"
                      :class="{ lost: isLostName }"
                    >
                      <template v-if="isLostName">
                        <span class="rd-nb-result-lbl">Имя</span>
                        <span class="rd-nb-result-name rd-nb-result-nameless">Безымянный</span>
                        <span class="rd-nb-result-meaning">Утерянное имя — рождённые в этот день остаются без имени</span>
                      </template>
                      <template v-else>
                        <span class="rd-nb-result-lbl">Имя</span>
                        <span class="rd-nb-result-name">
                          {{ activeNameData.d13.entries[rolledD13Idx].value }}{{ activeNameData.d4x4.entries[rolledD4Idx].value }}
                        </span>
                        <span class="rd-nb-result-meaning">{{ rolledMeaning }}</span>
                      </template>
                    </div>
                  </transition>

                  <!-- Main roll button -->
                  <button class="rd-nb-roll-main" type="button" @click="rollBothName">
                    Бросить кубики
                  </button>

                  <!-- Accordion parts -->
                  <div class="rd-nb-accordion">

                    <!-- First part: d13 -->
                    <div class="rd-nb-acc-item">
                      <button
                        class="rd-nb-acc-toggle"
                        :class="{ open: namesPartOpen === 'd13' }"
                        type="button"
                        @click="namesPartOpen = namesPartOpen === 'd13' ? null : 'd13'"
                      >
                        <span class="rd-nb-die-tag">1d13</span>
                        <span class="rd-nb-acc-label">Первая часть имени</span>
                        <span class="rd-nb-acc-arrow">{{ namesPartOpen === 'd13' ? '▴' : '▾' }}</span>
                      </button>
                      <transition name="rd-nb-collapse">
                        <div v-if="namesPartOpen === 'd13'" class="rd-nb-acc-body">
                          <p v-if="activeNameData.d13.intro" class="rd-nb-sub-intro">{{ activeNameData.d13.intro }}</p>
                          <div class="rd-nb-table">
                            <div class="rd-nb-thead"><span>Бросок</span><span>Описание</span><span>Префикс</span></div>
                            <div
                              v-for="(entry, idx) in activeNameData.d13.entries"
                              :key="entry.roll"
                              class="rd-nb-row"
                              :class="{ hl: rolledD13Idx === idx }"
                            >
                              <span class="rd-nb-cell-die">{{ entry.roll }}</span>
                              <span class="rd-nb-cell-desc">{{ entry.desc }}</span>
                              <span class="rd-nb-cell-val">{{ entry.value }}</span>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>

                    <!-- Second part: 4d4 -->
                    <div class="rd-nb-acc-item">
                      <button
                        class="rd-nb-acc-toggle"
                        :class="{ open: namesPartOpen === 'd4x4' }"
                        type="button"
                        @click="namesPartOpen = namesPartOpen === 'd4x4' ? null : 'd4x4'"
                      >
                        <span class="rd-nb-die-tag">4к4</span>
                        <span class="rd-nb-acc-label">Вторая часть имени</span>
                        <span class="rd-nb-acc-arrow">{{ namesPartOpen === 'd4x4' ? '▴' : '▾' }}</span>
                      </button>
                      <transition name="rd-nb-collapse">
                        <div v-if="namesPartOpen === 'd4x4'" class="rd-nb-acc-body">
                          <p v-if="activeNameData.d4x4.intro" class="rd-nb-sub-intro">{{ activeNameData.d4x4.intro }}</p>
                          <div class="rd-nb-d4-grid">
                            <div class="rd-nb-table">
                              <div class="rd-nb-thead"><span>4к4</span><span>Знак</span><span>Часть</span></div>
                              <div
                                v-for="(entry, idx) in d4x4Left"
                                :key="entry.roll"
                                class="rd-nb-row"
                                :class="{ hl: rolledD4Idx === idx * 2 }"
                              >
                                <span class="rd-nb-cell-die rd-nb-cell-die--sm">{{ entry.roll }}</span>
                                <span class="rd-nb-cell-desc">{{ entry.sign }}</span>
                                <span class="rd-nb-cell-val">{{ entry.value }}</span>
                              </div>
                            </div>
                            <div class="rd-nb-table">
                              <div class="rd-nb-thead"><span>4к4</span><span>Знак</span><span>Часть</span></div>
                              <div
                                v-for="(entry, idx) in d4x4Right"
                                :key="entry.roll"
                                class="rd-nb-row"
                                :class="{ hl: rolledD4Idx === idx * 2 + 1 }"
                              >
                                <span class="rd-nb-cell-die rd-nb-cell-die--sm">{{ entry.roll }}</span>
                                <span class="rd-nb-cell-desc">{{ entry.sign }}</span>
                                <span class="rd-nb-cell-val">{{ entry.value }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>

                  </div>

                  <!-- Lost names accordion -->
                  <div v-if="activeNameData.lost" class="rd-nb-accordion rd-nb-accordion--lost">
                    <div class="rd-nb-acc-item rd-nb-acc-item--lost">
                      <button
                        class="rd-nb-acc-toggle rd-nb-acc-toggle--lost"
                        :class="{ open: namesPartOpen === 'lost' }"
                        type="button"
                        @click="namesPartOpen = namesPartOpen === 'lost' ? null : 'lost'"
                      >
                        <span class="rd-nb-acc-label">Утерянные имена</span>
                        <span class="rd-nb-acc-arrow">{{ namesPartOpen === 'lost' ? '▴' : '▾' }}</span>
                      </button>
                      <transition name="rd-nb-collapse">
                        <div v-if="namesPartOpen === 'lost'" class="rd-nb-acc-body">
                          <p class="rd-nb-sub-intro">{{ activeNameData.lost.desc }}</p>
                          <div class="rd-nb-table rd-nb-table--lost">
                            <div class="rd-nb-thead rd-nb-thead--3col">
                              <span>1d13</span><span>4к4</span><span>Знак</span>
                            </div>
                            <div
                              v-for="(entry, idx) in activeNameData.lost.entries"
                              :key="idx"
                              class="rd-nb-row rd-nb-row--3col"
                              :class="{ hl: isLostName && rolledD13Idx !== null && activeNameData.d13.entries[rolledD13Idx]?.roll === entry.d13 && activeNameData.d4x4.entries[rolledD4Idx]?.roll === entry.roll }"
                            >
                              <span class="rd-nb-cell-die">{{ entry.d13 }}</span>
                              <span class="rd-nb-cell-die rd-nb-cell-die--sm">{{ entry.roll }}</span>
                              <span class="rd-nb-cell-desc">{{ entry.sign }}</span>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            </section>

            <!-- races without varieties: plain summary + base features -->
            <section v-else class="rd-variety-section">
            <div v-if="namesText" class="rd-block rd-names-block">
              <h2 class="rd-h2">Имена</h2>
              <div class="rd-names">
                <p v-for="(p, pi) in namesParagraphs" :key="pi">
                  <strong v-if="p.label" class="rd-names-label">{{ p.label }}:</strong>
                  {{ p.text }}
                </p>
              </div>
            </div>
            <div class="rd-block rd-summary-block rd-details-block">
              <h2 class="rd-h2">Особенности</h2>
              <div class="rd-summary-grid">
                <div v-for="row in summaryRows" :key="row.label" class="rd-stat">
                  <span class="rd-stat-label">{{ row.label }}</span>
                  <span class="rd-stat-value">{{ row.value }}</span>
                </div>
              </div>
              <div class="rd-details-divider" aria-hidden="true"><span /></div>
              <div class="rd-features">
                <div v-for="trait in baseFeatures" :key="trait.title" class="rd-feat" :class="{ wide: featWide(trait.text) }">
                  <span class="rd-feat-name">{{ trait.title }}</span>
                  <span class="rd-feat-text">{{ trait.text }}</span>
                </div>
              </div>
            </div>
            </section>

            <!-- Source-defined free-form blocks follow the standard dossier in every race. -->
            <div v-if="activeWindTattooTable" class="rd-block rd-wind-block">
              <h2 class="rd-h2">{{ activeWindTattooTable.title }}</h2>
              <div class="rd-wind-table" role="table" :aria-label="activeWindTattooTable.title">
                <div class="rd-wind-head" role="row">
                  <span role="columnheader">Белый Ветер</span>
                  <span role="columnheader">Чёрный Ветер</span>
                </div>
                <div v-for="entry in activeWindTattooTable.entries" :key="entry.whiteTitle" class="rd-wind-row" role="row">
                  <article class="rd-wind-cell rd-wind-cell--white" role="cell">
                    <span class="rd-wind-cell-label">Белый Ветер</span>
                    <h3>{{ entry.whiteTitle }}</h3>
                    <p>{{ entry.whiteText }}</p>
                  </article>
                  <article class="rd-wind-cell rd-wind-cell--black" role="cell">
                    <span class="rd-wind-cell-label">Чёрный Ветер</span>
                    <h3>{{ entry.blackTitle }}</h3>
                    <p>{{ entry.blackText }}</p>
                    <p class="rd-wind-darkness">
                      Вы получаете <strong>{{ entry.darknessPoints }}</strong>
                      {{ entry.darknessPoints === 1 ? 'Пункт Тьмы' : 'Пункта Тьмы' }}.
                    </p>
                  </article>
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

            <!-- Related terms close the dossier; names now live in their standard position above the summary. -->
            <section v-if="selectedRace.related?.length" class="rd-foot rd-thread-node">
              <div class="rd-foot-col">
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
  </div>
</template>

<style scoped>
.races-page{position:relative;min-height:100vh;background:radial-gradient(130% 120% at 50% 0%,#0c0e14 0%,#070810 52%,#040406 100%);color:rgba(var(--theme-text-rgb),.92);font-family:'Hanken Grotesk',sans-serif}

/* ---- list view: constellation map ---- */
@keyframes rlKnotSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes rlThreadBead{to{stroke-dashoffset:-522}}
@keyframes rlRiseIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes rlLinePulse{0%,100%{opacity:.45}50%{opacity:1}}

.rl{position:fixed;inset:0;overflow:hidden}
.rl-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.rl-conn{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}
.rl-halo rect{fill:none;stroke:rgba(var(--theme-accent-rgb),.14);stroke-width:1}
.rl-halo rect:first-child{stroke:rgba(var(--theme-accent-rgb),.22)}
.rl-stub{stroke:rgba(196,208,240,.28);stroke-width:1;fill:none}
.rl-nodes{position:absolute;inset:0;z-index:4;transform-origin:calc(50% + 34px) 50%}

.rl-node{position:absolute;left:calc(50% + 34px);top:50%;width:0;height:0;border:0;background:none;padding:0;cursor:pointer;color:rgba(var(--theme-text-rgb),.92);text-decoration:none;transition:transform .45s cubic-bezier(.34,1.3,.5,1)}
.rl-node-center{color:rgba(var(--theme-text-rgb),1)}
.rl-disc{position:absolute;left:0;top:0;width:106px;height:106px;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle, rgba(var(--theme-surface-rgb),1) 44%, rgba(var(--theme-surface-rgb),0) 74%);pointer-events:none}
.rl-disc-center{width:186px;height:186px}
.rl-frame{position:absolute;left:0;top:0;width:96px;height:96px;transform:translate(-50%,-50%) rotate(45deg);border:1px solid rgba(var(--theme-accent-rgb),.32);border-radius:8px;box-shadow:0 0 14px rgba(var(--theme-accent-rgb),.14), inset 0 0 12px rgba(var(--theme-accent-rgb),.05);pointer-events:none;transition:border-color .3s,box-shadow .3s}
.rl-node:hover .rl-frame{border-color:rgba(var(--theme-accent-rgb),.6);box-shadow:0 0 20px rgba(var(--theme-accent-rgb),.32), inset 0 0 14px rgba(var(--theme-accent-rgb),.1)}
.rl-knot{position:absolute;left:0;top:0;width:76px;height:76px;transform:translate(-50%,-50%);color:inherit;filter:drop-shadow(0 0 8px rgba(176,188,232,.22));transition:filter .3s,transform .3s}
.rl-knot img{width:100%;height:100%;object-fit:contain;display:block}
.rl-node:hover .rl-knot{transform:translate(-50%,-50%) scale(1.16);filter:drop-shadow(0 0 16px rgba(var(--theme-accent-rgb),.55)) brightness(1.15)}
.rl-knot-center{width:154px;height:154px;filter:drop-shadow(0 0 16px rgba(176,188,232,.3))}

/* The portraits are pre-cut into a diamond via alpha transparency, so the
   diamond shape comes from the image itself — no rotate/clip trick needed.
   drop-shadow (unlike box-shadow) follows the alpha silhouette, so the glow
   and shadow hug the actual diamond outline instead of a square box. */
.rl-portrait{position:absolute;left:0;top:0;width:110px;height:110px;transform:translate(-50%,-50%);transition:transform .4s cubic-bezier(.34,1.3,.5,1),filter .35s ease;filter:drop-shadow(0 10px 18px rgba(0,0,0,.6)) drop-shadow(0 0 10px rgba(var(--theme-accent-rgb),.16))}
.rl-portrait img{width:100%;height:100%;object-fit:contain;display:block;transition:filter .35s ease;filter:brightness(.94) saturate(.94)}
.rl-node:hover .rl-portrait{transform:translate(-50%,-50%) scale(1.24);filter:drop-shadow(0 14px 26px rgba(0,0,0,.65)) drop-shadow(0 0 8px rgba(var(--theme-accent-strong-rgb),.9)) drop-shadow(0 0 20px rgba(var(--theme-accent-rgb),.6))}
.rl-node:hover .rl-portrait img{filter:brightness(1.08) saturate(1.1)}

.rl-text{position:absolute;left:0;top:0;width:170px;display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:none}
.rl-text-below{transform:translate(-50%, 50px)}
.rl-text-above{transform:translate(-50%, calc(-100% - 50px))}
.rl-node-center .rl-text{transform:translate(-50%, 85px)}
.rl-label{font-family:'Cormorant Garamond',serif;font-size:14.5px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:inherit;text-align:center;line-height:1.2;white-space:normal;text-shadow:0 0 7px rgba(5,6,10,.95),0 0 16px rgba(5,6,10,.85),0 1px 3px rgba(5,6,10,.95)}
.rl-label-center{font-size:21px;letter-spacing:.2em}

.rl-wordmark{position:absolute;top:24px;left:92px;z-index:30;pointer-events:none}
.rl-wordmark-eyebrow{font-family:'Hanken Grotesk';font-size:9.5px;letter-spacing:.42em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.42)}
.rl-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:21px;letter-spacing:.32em;color:rgba(var(--theme-heading-rgb),.92);margin-top:3px}

.rl-crumb{position:absolute;top:26px;right:34px;z-index:30;display:flex;align-items:center;gap:9px;animation:rlRiseIn .5s ease both}
.rl-crumb-sep{font-size:11px;color:rgba(var(--theme-text-rgb),.28)}
.rl-crumb-link{font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.34em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.4);text-decoration:none;cursor:pointer}
.rl-crumb-strong{font-family:'Cormorant Garamond',serif;font-size:18px;letter-spacing:.12em;color:rgba(var(--theme-heading-rgb),.92)}
.rl-crumb-exit{margin-left:6px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.5);border:1px solid rgba(var(--theme-contrast-rgb),.14);border-radius:20px;padding:5px 11px;cursor:pointer;text-decoration:none}
.rl-crumb-exit:hover{background:rgba(var(--theme-contrast-rgb),.05);color:rgba(var(--theme-heading-rgb),.95)}

.rl-search-wrap{position:absolute;left:50%;bottom:36px;z-index:30;transform:translateX(-50%);width:min(420px,90vw)}
.rl-search{width:100%;min-height:42px;padding:0 16px;border:1px solid rgba(var(--theme-contrast-rgb),.12);border-radius:999px;background:rgba(var(--theme-surface-rgb),.6);backdrop-filter:blur(8px);outline:none;color:rgba(var(--theme-heading-rgb),.95);font-family:'Cormorant Garamond',serif;font-size:16px}
.rl-search:focus{border-color:rgba(var(--theme-accent-rgb),.5)}

.rl-sidebar{position:absolute;top:0;bottom:0;left:0;z-index:50;width:68px;display:flex;flex-direction:column;align-items:center;gap:4px;border-right:1px solid rgba(var(--theme-contrast-rgb),.06);background:rgba(var(--theme-surface-rgb),.5);padding:16px 0;backdrop-filter:blur(10px)}
.rl-sidebar-btn{width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:11px;color:rgba(var(--theme-heading-rgb),.85);transition:all .25s}
.rl-sidebar-btn:hover{background:rgba(var(--theme-contrast-rgb),.05)}

@media (max-width: 760px){
  .rl-wordmark{left:24px}
  .rl-crumb{right:16px;left:16px;justify-content:flex-end;flex-wrap:wrap}
  .rl-sidebar{position:fixed;top:auto;right:0;bottom:0;width:auto;height:54px;flex-direction:row;border-top:1px solid rgba(var(--theme-contrast-rgb),.06);border-right:0;padding:0 10px}
}

/* ---- dossier shell ---- */
.rd{position:relative;min-height:100vh;display:flex}
.rd-nav{position:fixed;top:0;left:0;bottom:0;width:60px;z-index:50;display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:4px;border-right:1px solid rgba(var(--theme-contrast-rgb),.06);background:rgba(var(--theme-surface-rgb),.55);backdrop-filter:blur(10px)}
.rd-nav-btn{width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:rgba(var(--theme-text-rgb),.55);cursor:pointer;border-radius:11px;transition:all .25s;text-decoration:none}
.rd-nav-btn:hover{color:rgba(var(--theme-heading-rgb),.95);background:rgba(var(--theme-contrast-rgb),.05)}
.rd-nav-main{margin-bottom:6px;color:rgba(var(--theme-heading-rgb),.85)}

.rd-main{flex:1;margin-left:60px;min-width:0}
.rd-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:20px 28px 0}
.rd-wordmark{pointer-events:none}
.rd-wordmark-eyebrow{font-family:'Hanken Grotesk';font-size:9px;letter-spacing:.4em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.42)}
.rd-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.32em;color:rgba(var(--theme-heading-rgb),.92);margin-top:3px}
.rd-top-right{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:flex-end}
.rd-crumb{display:flex;align-items:center;gap:8px}
.crumb-sep{font-size:11px;color:rgba(var(--theme-text-rgb),.28)}
.crumb-link{font-family:'Hanken Grotesk';font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.4);text-decoration:none}
.crumb-gold{font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:.1em;text-transform:none;color:rgba(var(--theme-accent-strong-rgb),.95)}
.rd-actions{display:flex;gap:6px}
.rd-action-btn{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(var(--theme-contrast-rgb),.14);border-radius:50%;background:rgba(var(--theme-surface-rgb),.4);color:rgba(var(--theme-text-rgb),.65);cursor:pointer;font-size:12px;text-decoration:none}
.rd-action-btn:hover{background:rgba(var(--theme-contrast-rgb),.08);color:rgba(var(--theme-heading-rgb),.95)}

.rd-window{--rd-rail-left:28px;position:relative;max-width:1160px;margin:0 auto;padding:22px 28px 80px 58px;display:grid;gap:24px}
.rd-window::before{content:"";position:absolute;left:var(--rd-rail-left);top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,rgba(var(--theme-text-rgb),.14) 58px,rgba(var(--theme-text-rgb),.14) 94%,transparent);box-shadow:0 0 10px rgba(var(--theme-accent-rgb),.08)}
.rd-spark{position:absolute;z-index:1;left:var(--rd-rail-left);top:0;width:5px;height:5px;margin-left:-2.5px;border-radius:1.5px;background:#fff3c8;box-shadow:0 0 4px #fff3c8,0 0 11px rgba(244,198,104,.9),0 0 20px rgba(var(--theme-accent-rgb),.5);opacity:0;pointer-events:none;transform:translateY(-20px) rotate(45deg);transition:opacity .8s ease;will-change:transform}
.rd-spark.is-live{opacity:.92}

/* ---- hero: two ornate cards side by side ---- */
.rd-central-head{display:flex;align-items:center;gap:0;min-height:112px}
.rd-central-emblem{position:relative;z-index:3;isolation:isolate;flex:none;display:flex;align-items:center;justify-content:center;width:112px;height:112px;margin-left:-86px;margin-right:30px;border-radius:14px;text-decoration:none;cursor:pointer;transform:translate3d(0,0,0);transition:filter .3s ease}
.rd-central-emblem::before{content:"";position:absolute;z-index:0;width:88px;height:88px;border-radius:8px;background:var(--theme-bg);transform:rotate(45deg)}
.rd-central-emblem-frame{position:absolute;z-index:1;width:88px;height:88px;border:1px solid rgba(var(--theme-accent-rgb),.5);border-radius:8px;box-shadow:0 0 22px rgba(var(--theme-accent-rgb),.18);transform:rotate(45deg);transition:border-color .3s ease,box-shadow .3s ease,background .3s ease}
.rd-central-emblem-knot{position:relative;z-index:2;width:88px;height:88px;display:block;object-fit:contain;pointer-events:none;user-select:none;filter:drop-shadow(0 0 10px rgba(var(--theme-accent-rgb),.28));transition:filter .3s ease,transform .3s ease}
.rd-central-emblem:hover .rd-central-emblem-frame,.rd-central-emblem.is-spark-active .rd-central-emblem-frame{border-color:#fff0bd;background:rgba(var(--theme-accent-rgb),.08);box-shadow:0 0 5px rgba(255,240,189,.7),0 0 18px rgba(var(--theme-accent-rgb),.46),0 0 30px rgba(var(--theme-accent-rgb),.18)}
.rd-central-emblem:hover .rd-central-emblem-knot,.rd-central-emblem.is-spark-active .rd-central-emblem-knot{filter:drop-shadow(0 0 18px rgba(var(--theme-accent-rgb),.68)) brightness(1.22);transform:scale(1.04)}
.rd-central-emblem--large-knot .rd-central-emblem-knot{width:117px;height:117px}
.rd-filter-defs{position:absolute;width:0;height:0;overflow:hidden;pointer-events:none}
.rd-central-emblem--clean-knot .rd-central-emblem-knot{filter:url('#rd-knot-alpha-clean')}
.rd-central-emblem--clean-knot:hover .rd-central-emblem-frame,.rd-central-emblem--clean-knot.is-spark-active .rd-central-emblem-frame{background:transparent}
.rd-central-emblem--clean-knot:hover .rd-central-emblem-knot,.rd-central-emblem--clean-knot.is-spark-active .rd-central-emblem-knot{filter:url('#rd-knot-alpha-clean')}
.rd-central-heading{flex:1;min-width:0}
.rd-original-name{margin-top:6px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.4)}
.rd-presentation{overflow:visible;border:1px solid rgba(var(--theme-accent-rgb),.3);border-radius:18px;background:rgba(var(--theme-contrast-rgb),.018);transition:border-color .28s ease,box-shadow .28s ease,background .28s ease}
.rd-hero{display:grid;grid-template-columns:1.3fr 1fr;gap:0;align-items:stretch}
.rd-hero-card{position:relative;border:1px solid rgba(var(--theme-accent-rgb),.22);border-radius:18px;background:rgba(var(--theme-contrast-rgb),.018)}
.rd-presentation .rd-hero-card{border:0;border-radius:0;background:transparent}
.rd-hero-text-card{padding:24px 28px}
.rd-presentation .rd-hero-text-card{border-radius:0 0 0 17px}
.rd-hero-portrait-card{padding:0;overflow:hidden;min-height:280px;cursor:zoom-in;border:1px solid rgba(var(--theme-accent-rgb),.22);transition:transform .2s,border-color .2s}
.rd-presentation .rd-hero-portrait-card{border-left:1px solid rgba(var(--theme-accent-rgb),.18);border-radius:0 0 17px 0}
.rd-hero-portrait-card:hover{transform:scale(1.01);border-color:rgba(var(--theme-accent-rgb),.4)}
.rd-hero-portrait-card img{width:100%;height:100%;object-fit:cover;display:block}
.rd-portrait-empty{display:grid;place-items:center;width:100%;height:100%;min-height:280px;font-family:'Cormorant Garamond',serif;font-size:64px;color:rgba(var(--theme-accent-rgb),.4)}
.rd-portrait-star{position:absolute;top:14px;right:16px;z-index:2;color:rgba(var(--theme-accent-strong-rgb),.85);font-size:18px;text-shadow:0 0 10px rgba(0,0,0,.6)}

/* corner brackets, shared decorative motif */
.rd-corner{position:absolute;width:28px;height:28px;pointer-events:none}
.rd-corner-tl{top:8px;left:8px;border-top:1.5px solid rgba(var(--theme-accent-rgb),.55);border-left:1.5px solid rgba(var(--theme-accent-rgb),.55);border-radius:6px 0 0 0}
.rd-corner-tr{top:8px;right:8px;border-top:1.5px solid rgba(var(--theme-accent-rgb),.55);border-right:1.5px solid rgba(var(--theme-accent-rgb),.55);border-radius:0 6px 0 0}
.rd-corner-br{bottom:8px;right:8px;border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.55);border-right:1.5px solid rgba(var(--theme-accent-rgb),.55);border-radius:0 0 6px 0}
.rd-corner-bl{bottom:8px;left:8px;border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.55);border-left:1.5px solid rgba(var(--theme-accent-rgb),.55);border-radius:0 0 0 6px}

.rd-eyebrow{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.8)}
.rd-eyebrow-path{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.rd-eyebrow-path a{color:rgba(var(--theme-accent-rgb),.8);text-decoration:none}
.rd-eyebrow-path a:hover{color:rgba(var(--theme-accent-strong-rgb),1);text-decoration:underline}
.rd-eyebrow-sep{color:rgba(var(--theme-text-rgb),.3)}
.rd-eyebrow-current{color:rgba(var(--theme-text-rgb),.6)}
.rd-title{font-family:'Cormorant Garamond',serif;font-size:44px;letter-spacing:.07em;color:rgba(238,242,252,.97);margin:0;line-height:1}
.rd-title-divider{display:flex;align-items:center;gap:10px;margin:14px 0 16px}
.rd-title-divider::before,.rd-title-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.35),transparent)}
.rd-title-divider::after{background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.35))}
.rd-title-diamond{flex:none;width:7px;height:7px;background:rgba(var(--theme-accent-rgb),.7);transform:rotate(45deg)}

.rd-lightbox{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:40px;background:rgba(5,6,9,.86);backdrop-filter:blur(4px);cursor:zoom-out}
.rd-lightbox img{max-width:min(90vw,720px);max-height:90vh;object-fit:contain;border-radius:16px;box-shadow:0 30px 90px rgba(0,0,0,.6)}
.rd-lightbox-close{position:absolute;top:24px;right:28px;width:40px;height:40px;display:grid;place-items:center;border:1px solid rgba(var(--theme-contrast-rgb),.2);border-radius:50%;background:rgba(var(--theme-contrast-rgb),.06);color:#fff;font-size:18px;cursor:pointer}
.rd-lightbox-close:hover{background:rgba(var(--theme-contrast-rgb),.14)}
.rd-lightbox-enter-active,.rd-lightbox-leave-active{transition:opacity .2s ease}
.rd-lightbox-enter-from,.rd-lightbox-leave-to{opacity:0}

.rd-overview-lead{margin-bottom:14px}
.rd-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:19px;font-weight:600;line-height:1.5;color:rgba(var(--theme-accent-strong-rgb),.98);margin:0}
.rd-desc{position:relative;max-height:360px;overflow:hidden;transition:max-height .25s ease}
.rd-desc.open{max-height:3000px}
.rd-desc:not(.open)::after,.rd-variety-desc.collapsed::after{content:"…";position:absolute;right:0;bottom:0;display:grid;place-items:center;min-width:30px;height:26px;padding:0 4px 4px 14px;background:rgba(var(--theme-surface-rgb),.96);color:rgba(var(--theme-accent-strong-rgb),.96);font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;line-height:1;letter-spacing:.08em}
.rd-desc-inner{font-size:14px;line-height:1.75;color:rgba(var(--theme-text-rgb),.78)}
.rd-overview-blocks{display:grid;gap:8px}
.rd-overview-paragraph{margin:0;padding:11px 14px;border-left:2px solid rgba(var(--theme-accent-rgb),.3);border-radius:0 9px 9px 0;background:rgba(var(--theme-contrast-rgb),.018);line-height:1.7;color:rgba(var(--theme-text-rgb),.8);transition:border-color .25s ease,background .25s ease,color .25s ease}
.rd-overview-heading{margin:8px 0 0;padding:0 2px;font-family:'Hanken Grotesk',sans-serif;font-size:10.5px;font-weight:750;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.9)}
.rd-desc-toggle{display:inline-flex;align-items:center;gap:8px;margin-top:9px;background:none;border:0;padding:2px 0;color:rgba(var(--theme-accent-rgb),.85);font-family:'Hanken Grotesk';font-size:12px;cursor:pointer}
.rd-desc-toggle:hover{color:rgba(var(--theme-accent-strong-rgb),.95)}
.rd-desc-toggle-ellipsis{display:inline-grid;place-items:center;min-width:24px;height:18px;border:1px solid rgba(var(--theme-accent-rgb),.32);border-radius:999px;background:rgba(var(--theme-accent-rgb),.07);font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700;line-height:.5;padding-bottom:5px}
.rd-desc-toggle-arrow{font-size:14px;line-height:1}
.race-prose :deep(p){margin:0 0 1em}
.race-prose :deep(h2){font-family:'Cormorant Garamond',serif;font-size:19px;color:rgba(var(--theme-accent-strong-rgb),.9);margin:1.1em 0 .4em}


/* One continuous thread, matching class pages, crosses the whole dossier. */
.rd-thread{position:relative;display:grid;gap:20px}
.rd-thread-node,.rd-thread .rd-block{position:relative}
.rd-thread-node::before,.rd-thread .rd-block::before{content:"";position:absolute;z-index:3;left:-36px;top:24px;width:11px;height:11px;border:1px solid var(--theme-accent);background:var(--theme-bg);transform:rotate(45deg);transition:border-color .28s ease,background .28s ease,box-shadow .28s ease}
.rd-thread-node::after,.rd-thread .rd-block::after{content:"";position:absolute;left:-25px;top:29px;width:25px;height:1px;background:rgba(var(--theme-text-rgb),.14)}
.rd-thread-node.is-spark-active::before,.rd-thread .rd-block.is-spark-active::before{border-color:#fff0bd;background:rgba(var(--theme-accent-strong-rgb),.92);box-shadow:0 0 5px #fff0bd,0 0 13px rgba(var(--theme-accent-rgb),.72),0 0 25px rgba(var(--theme-accent-rgb),.3)}
.rd-thread-node.is-spark-active .rd-h2,.rd-thread .rd-block.is-spark-active .rd-h2,.rd-thread-node.is-spark-active .rd-source-line{color:rgba(var(--theme-accent-strong-rgb),1);text-shadow:0 0 12px rgba(var(--theme-accent-rgb),.3)}
.rd-hero.is-spark-active .rd-quote{color:#fff0bd;text-shadow:0 0 14px rgba(var(--theme-accent-rgb),.34)}
.rd-hero.is-spark-active .rd-overview-paragraph{border-left-color:rgba(var(--theme-accent-strong-rgb),.7);background:rgba(var(--theme-accent-rgb),.055);color:rgba(var(--theme-text-rgb),.88)}
.rd-source-panel,.rd-variety-tabs,.rd-block,.rd-hero-card,.rd-names,.rd-related{transition:border-color .28s ease,box-shadow .28s ease,background .28s ease}
.rd-variety-tabs.is-spark-active,.rd-block.is-spark-active{border-color:rgba(var(--theme-accent-strong-rgb),.48);box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.1),0 0 24px rgba(var(--theme-accent-rgb),.12)}
.rd-hero.is-spark-active .rd-hero-card,.rd-foot.is-spark-active .rd-names,.rd-foot.is-spark-active .rd-related{border-color:rgba(var(--theme-accent-strong-rgb),.44);box-shadow:0 0 22px rgba(var(--theme-accent-rgb),.11)}

/* The docked spark also kindles the exact element under the pointer. */
.rd-hero-card.is-spark-kindled,.rd-feat.is-spark-kindled,.rd-nb-acc-item.is-spark-kindled{border-color:rgba(var(--theme-accent-strong-rgb),.64)!important;box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.12),0 0 26px rgba(var(--theme-accent-rgb),.16)}
.rd-stat,.rd-item-row,.rd-vtab,.rd-source-choice,.rd-pill,.rd-nb-acc-item{transition:border-color .25s ease,box-shadow .25s ease,background .25s ease,color .25s ease}
.rd-stat.is-spark-kindled,.rd-item-row.is-spark-kindled{background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.13),rgba(var(--theme-accent-rgb),.025) 72%,transparent)}
.rd-stat.is-spark-kindled .rd-stat-label,.rd-stat.is-spark-kindled .rd-stat-value,.rd-item-row.is-spark-kindled strong{color:rgba(var(--theme-accent-strong-rgb),1);text-shadow:0 0 11px rgba(var(--theme-accent-rgb),.24)}
.rd-vtab.is-spark-kindled,.rd-source-choice.is-spark-kindled,.rd-pill.is-spark-kindled{border-color:rgba(var(--theme-accent-strong-rgb),.58);background:rgba(var(--theme-accent-rgb),.15);color:rgba(var(--theme-accent-strong-rgb),1);box-shadow:0 0 18px rgba(var(--theme-accent-rgb),.13)}

.rd-source-panel{display:grid;border-radius:17px 17px 0 0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.22);background:rgba(var(--theme-accent-rgb),.05)}
.rd-source-choices{display:grid;grid-template-columns:minmax(0,1fr)}
.rd-source-choices.has-variants{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.rd-source-choice{position:relative;display:flex;min-width:0;min-height:52px;align-items:center;padding:12px 18px;border:0;border-left:1px solid rgba(var(--theme-contrast-rgb),.07);background:transparent;color:rgba(var(--theme-text-rgb),.66);cursor:pointer;text-align:left}
.rd-source-choice:first-child{border-left:0}
.rd-source-choice::after{content:"";position:absolute;right:14px;bottom:-1px;left:14px;height:2px;background:rgba(var(--theme-accent-strong-rgb),.92);opacity:0;transform:scaleX(.3);transition:opacity .2s ease,transform .2s ease}
.rd-source-choice:hover{background:rgba(var(--theme-contrast-rgb),.025);color:rgba(var(--theme-heading-rgb),.92)}
.rd-source-choice.active{background:rgba(var(--theme-accent-rgb),.09);color:rgba(var(--theme-accent-strong-rgb),.98)}
.rd-source-choice.active::after{opacity:1;transform:scaleX(1)}
.rd-source-line{display:flex;min-width:0;width:100%;align-items:center;gap:8px;overflow:hidden;white-space:nowrap}
.rd-source-line small{flex:none;font-family:'Hanken Grotesk',sans-serif;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.48)}
.rd-source-line i{flex:none;font-style:normal;color:rgba(var(--theme-accent-rgb),.45)}
.rd-source-line b{flex:none;font-family:'Hanken Grotesk',sans-serif;font-size:11px;font-weight:800;letter-spacing:.14em;color:rgba(var(--theme-accent-strong-rgb),.94)}
.rd-source-line strong{min-width:0;overflow:hidden;font-family:'Hanken Grotesk',sans-serif;font-size:12px;font-weight:650;letter-spacing:.025em;color:rgba(var(--theme-heading-rgb),.84);text-overflow:ellipsis}
.rd-source-current{display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-width:0;padding:10px 18px;border-top:1px solid rgba(var(--theme-accent-rgb),.13);background:rgba(var(--theme-surface-rgb),.14)}
.rd-source-current>span{font-size:10px;line-height:1.45;letter-spacing:.04em;color:rgba(var(--theme-text-rgb),.54)}
.rd-source-note{flex:1 1 260px}
.rd-source-link{font-size:10px;letter-spacing:.06em;white-space:nowrap;color:rgba(var(--theme-accent-rgb),.85);text-decoration:none}
.rd-source-link:hover{color:rgba(var(--theme-accent-strong-rgb),1);text-decoration:underline}

/* ---- variety-driven dossier ---- */
.rd-variety-section{display:grid;gap:16px}
.rd-variety-tabs{display:flex;gap:6px;flex-wrap:wrap;padding:5px;border-radius:14px;background:rgba(0,0,0,.25);border:1px solid rgba(var(--theme-contrast-rgb),.06);overflow-x:auto}
.rd-vtab{flex:1 1 auto;display:flex;align-items:center;justify-content:center;gap:8px;min-height:42px;border:0;border-radius:10px;padding:8px 18px;background:transparent;color:rgba(var(--theme-text-rgb),.7);cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.04em;transition:all .2s;white-space:nowrap}
.rd-vtab:hover{color:rgba(var(--theme-accent-strong-rgb),.95)}
.rd-vtab.active{background:rgba(var(--theme-accent-rgb),.18);color:rgba(var(--theme-accent-strong-rgb),.98);box-shadow:inset 0 0 0 1px rgba(var(--theme-accent-rgb),.4)}
.rd-vtab-diamond{flex:none;width:6px;height:6px;background:rgba(var(--theme-accent-rgb),.5);transform:rotate(45deg)}
.rd-vtab-knot{flex:none;width:22px;height:22px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(var(--theme-accent-rgb),.5))}

.rd-variety-body{display:grid;gap:16px}
.rd-names-block{order:2}
.rd-summary-block{order:3}
.rd-block{border:1px solid rgba(var(--theme-contrast-rgb),.08);border-radius:18px;background:rgba(var(--theme-contrast-rgb),.018);padding:20px 22px}
.rd-h2{display:flex;align-items:center;gap:10px;font-family:'Hanken Grotesk';font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.85);margin:0 0 14px}
.rd-h2-sub{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:400;letter-spacing:.02em;text-transform:none;color:rgba(var(--theme-text-rgb),.5)}

.rd-variety-badge{font-family:'Hanken Grotesk';font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(20,15,6,.95);background:rgba(var(--theme-accent-rgb),.9);border-radius:8px;padding:4px 11px}
.rd-variety-desc{font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.7;color:rgba(var(--theme-text-rgb),.82)}
.rd-variety-desc.collapsed{position:relative;max-height:240px;overflow:hidden}
.rd-variety-desc p{margin:0 0 .8em}
.rd-variety-desc p:last-child{margin-bottom:0}
.rd-variety-desc .is-heading{font-weight:600;color:rgba(var(--theme-accent-strong-rgb),.92);font-size:17px}
.rd-variety-desc .is-quote{border-left:3px solid rgba(var(--theme-accent-rgb),.5);padding-left:14px;font-style:italic;color:rgba(var(--theme-text-rgb),.7)}
.rd-variety-desc-empty{font-style:italic;color:rgba(var(--theme-text-rgb),.5)}

.rd-summary-grid{display:grid;gap:0}
.rd-stat{display:grid;grid-template-columns:160px minmax(0,1fr);gap:18px;align-items:start;padding:11px 0;border-top:1px solid rgba(var(--theme-contrast-rgb),.06)}
.rd-stat:first-child{border-top:0}
.rd-stat-label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.5);padding-top:3px}
.rd-stat-value{font-family:'Cormorant Garamond',serif;font-size:15.5px;color:rgba(var(--theme-heading-rgb),.92);line-height:1.55}
.rd-details-divider{display:flex;align-items:center;gap:10px;margin:18px 0}
.rd-details-divider::before,.rd-details-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.24))}
.rd-details-divider::after{background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.24),transparent)}
.rd-details-divider span{width:6px;height:6px;border:1px solid rgba(var(--theme-accent-rgb),.54);background:rgba(var(--theme-accent-rgb),.08);transform:rotate(45deg)}

.rd-features{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.rd-feat{display:flex;flex-direction:column;gap:7px;border:1px solid rgba(var(--theme-contrast-rgb),.08);border-radius:13px;background:rgba(var(--theme-contrast-rgb),.02);padding:16px 18px}
.rd-feat.wide{grid-column:1 / -1}
.rd-feat-name{display:flex;align-items:center;gap:8px;font-family:'Hanken Grotesk';font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.9)}
.rd-feat-tag{flex:none;font-size:9px;font-weight:700;letter-spacing:.06em;color:rgba(20,15,6,.95);background:rgba(var(--theme-accent-rgb),.85);border-radius:5px;padding:2px 6px}
.rd-feat-text{font-size:13.5px;line-height:1.65;color:rgba(var(--theme-text-rgb),.76)}
.rd-feat--v{border-color:rgba(var(--theme-accent-rgb),.4);background:rgba(var(--theme-accent-rgb),.07)}

.rd-wind-table{display:grid;margin-top:14px;overflow:hidden;border:1px solid rgba(var(--theme-contrast-rgb),.1);border-radius:14px;background:rgba(var(--theme-contrast-rgb),.012)}
.rd-wind-head,.rd-wind-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}
.rd-wind-head{background:rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-accent-strong-rgb),.94);font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.rd-wind-head span{padding:10px 18px}
.rd-wind-row{border-top:1px solid rgba(var(--theme-contrast-rgb),.075)}
.rd-wind-cell{min-width:0;padding:17px 19px;transition:background .25s ease,border-color .25s ease,color .25s ease}
.rd-wind-cell--white{background:rgba(var(--theme-accent-rgb),.025)}
.rd-wind-cell--black{border-left:1px solid rgba(var(--theme-accent-rgb),.18);background:rgba(var(--theme-contrast-rgb),.035)}
.rd-wind-cell-label{display:none;margin-bottom:8px;color:rgba(var(--theme-accent-rgb),.72);font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.rd-wind-cell h3{margin:0 0 7px;font-family:'Hanken Grotesk';font-size:12px;font-weight:700;letter-spacing:.065em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.94)}
.rd-wind-cell p{margin:0;font-size:13px;line-height:1.62;color:rgba(var(--theme-text-rgb),.76)}
.rd-wind-cell .rd-wind-darkness{margin-top:13px;padding:8px 11px;border-left:2px solid rgba(var(--theme-accent-rgb),.58);border-radius:0 7px 7px 0;background:rgba(var(--theme-accent-rgb),.08);color:rgba(var(--theme-accent-strong-rgb),.9);font-size:11px;font-weight:650;letter-spacing:.025em}
.rd-wind-darkness strong{font-family:'Cormorant Garamond',serif;font-size:18px;line-height:1;color:rgba(var(--theme-accent-strong-rgb),1)}
.rd-wind-cell.is-spark-kindled{background:rgba(var(--theme-accent-rgb),.11)}
.rd-wind-cell.is-spark-kindled h3{color:rgba(var(--theme-accent-strong-rgb),1)}

.rd-items{display:grid;margin-top:14px;overflow:hidden;border:1px solid rgba(var(--theme-contrast-rgb),.08);border-radius:12px;background:rgba(var(--theme-contrast-rgb),.012)}
.rd-items-head,.rd-item-row{display:grid;grid-template-columns:84px 160px minmax(0,1fr);gap:14px;align-items:start}
.rd-items.compact .rd-items-head,.rd-items.compact .rd-item-row{grid-template-columns:180px minmax(0,1fr)}
.rd-items-head{padding:9px 14px;background:rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-accent-strong-rgb),.92);font-size:10.5px;font-weight:700;text-transform:uppercase}
.rd-item-row{padding:11px 14px;border-top:1px solid rgba(var(--theme-contrast-rgb),.06)}
.rd-item-img{display:grid;place-items:center;min-height:70px;border-radius:8px;border:1px solid rgba(var(--theme-contrast-rgb),.08);background:rgba(var(--theme-contrast-rgb),.02)}
.rd-item-img img{width:min(66px,100%);max-height:80px;object-fit:contain}
.rd-item-row strong{display:block;margin-bottom:3px;color:rgba(var(--theme-heading-rgb),.92);font-size:14px}
.rd-item-row p{margin:0;font-size:13px;line-height:1.55;color:rgba(var(--theme-text-rgb),.74)}

/* ---- Кровь Змей — inline blood feature card ---- */
.rd-feat--blood{flex-direction:column;align-items:flex-start;gap:10px}
.rd-feat--blood .rd-feat-text{white-space:normal}
.rd-blood-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.rd-blood-tab{padding:7px 18px;border:1px solid rgba(var(--theme-accent-rgb),.3);border-radius:999px;background:rgba(var(--theme-accent-rgb),.04);color:rgba(var(--theme-text-rgb),.75);font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.04em;cursor:pointer;transition:all .18s}
.rd-blood-tab:hover{border-color:rgba(var(--theme-accent-rgb),.55);background:rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-heading-rgb),.95)}
.rd-blood-tab.active{border-color:rgba(var(--theme-accent-rgb),.75);background:rgba(var(--theme-accent-rgb),.14);color:rgba(var(--theme-accent-strong-rgb),1);font-weight:600}
.rd-blood-list{width:100%;margin-top:4px;display:flex;flex-direction:column;gap:0;border:1px solid rgba(var(--theme-accent-rgb),.18);border-radius:12px;overflow:hidden}
.rd-blood-entry{display:grid;grid-template-columns:48px 1fr;gap:12px;align-items:start;padding:12px 14px;border-bottom:1px solid rgba(var(--theme-contrast-rgb),.05)}
.rd-blood-entry:last-child{border-bottom:none}
.rd-blood-entry:nth-child(even){background:rgba(var(--theme-contrast-rgb),.015)}
.rd-blood-entry-dice{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:700;color:rgba(var(--theme-accent-rgb),.8);text-align:center;padding-top:2px;letter-spacing:.04em}
.rd-blood-entry-body{min-width:0}
.rd-blood-entry-name{display:block;font-size:13.5px;font-weight:600;color:rgba(var(--theme-heading-rgb),.92);margin-bottom:3px}
.rd-blood-entry-text{margin:0;font-size:12.5px;line-height:1.6;color:rgba(var(--theme-text-rgb),.7)}
.rd-blood-fade-enter-active,.rd-blood-fade-leave-active{transition:opacity .22s,transform .22s}
.rd-blood-fade-enter-from,.rd-blood-fade-leave-to{opacity:0;transform:translateY(-6px)}

.rd-blood-roll-btn{padding:8px 22px;border:1px solid rgba(var(--theme-accent-rgb),.5);border-radius:999px;background:rgba(var(--theme-accent-rgb),.12);color:rgba(var(--theme-accent-strong-rgb),.95);font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.04em;cursor:pointer;transition:all .18s}
.rd-blood-roll-btn:hover{border-color:rgba(var(--theme-accent-rgb),.8);background:rgba(var(--theme-accent-rgb),.22);color:rgba(255,240,190,1)}
.rd-blood-result{display:grid;grid-template-columns:1fr auto 1fr;gap:0;width:100%;border:1px solid rgba(var(--theme-accent-rgb),.3);border-radius:12px;background:rgba(var(--theme-accent-rgb),.07);overflow:hidden}
.rd-blood-result-col{padding:14px 16px;display:flex;flex-direction:column;gap:8px}
.rd-blood-result-label{font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.7)}
.rd-blood-result-entry{display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:start}
.rd-blood-result-divider{width:1px;background:rgba(var(--theme-accent-rgb),.2);margin:12px 0}

/* ---- footer (names + related) ---- */
.rd-foot{display:grid;grid-template-columns:1.6fr 1fr;gap:18px}
.rd-foot-col{min-width:0}
.rd-names{font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1.7;color:rgba(var(--theme-text-rgb),.8)}
.rd-names p{margin:0 0 .6em}
.rd-names p:last-child{margin-bottom:0}
.rd-names-label{color:rgba(var(--theme-accent-strong-rgb),.9);font-weight:600}
.rd-section-label{color:rgba(var(--theme-accent-strong-rgb),.9);font-weight:600}
.rd-related{border:1px solid rgba(var(--theme-contrast-rgb),.08);border-radius:14px;background:rgba(var(--theme-contrast-rgb),.018);padding:18px 20px;display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;height:100%}
.rd-pill{border:1px solid rgba(var(--theme-accent-rgb),.3);background:rgba(var(--theme-accent-rgb),.08);color:rgba(var(--theme-accent-strong-rgb),.92);border-radius:999px;padding:6px 14px;font-family:'Cormorant Garamond',serif;font-size:14px}

.rd-swap-enter-active,.rd-swap-leave-active{transition:opacity .18s ease,transform .18s ease}
.rd-swap-enter-from,.rd-swap-leave-to{opacity:0;transform:translateY(8px)}

/* ---- breakpoints ---- */
@media (max-width: 900px){
  .rd-hero{grid-template-columns:1fr}
  .rd-hero-portrait-card{min-height:220px}
  .rd-presentation .rd-hero-text-card{border-radius:0}
  .rd-presentation .rd-hero-portrait-card{border-top:1px solid rgba(var(--theme-accent-rgb),.18);border-left:0;border-radius:0 0 17px 17px}
}
@media (max-width: 760px){
  .rd-nav{flex-direction:row;top:auto;bottom:0;right:0;width:auto;height:54px;padding:0 10px;border-right:0;border-top:1px solid rgba(var(--theme-contrast-rgb),.06)}
  .rd-nav-main{margin-bottom:0;margin-right:6px}
  .rd-main{margin-left:0;padding-bottom:60px}
  .rd-window{--rd-rail-left:46px;padding:18px 16px 80px 72px}
  .rd-central-head{min-height:76px}
  .rd-central-emblem{width:76px;height:76px;margin-left:-64px;margin-right:8px}
  .rd-central-emblem::before,.rd-central-emblem-frame,.rd-central-emblem-knot{width:64px;height:64px}
  .rd-central-emblem--large-knot .rd-central-emblem-knot{width:85px;height:85px}
  .rd-central-emblem::before,.rd-central-emblem-frame{border-radius:6px}
  .rd-hero-text-card{padding:18px 18px}
  .rd-title{font-size:32px}
  .rd-stat{grid-template-columns:1fr;gap:4px}
  .rd-features{grid-template-columns:1fr}
  .rd-wind-head{display:none}
  .rd-wind-row{grid-template-columns:1fr}
  .rd-wind-row + .rd-wind-row{border-top-color:rgba(var(--theme-accent-rgb),.22)}
  .rd-wind-cell-label{display:block}
  .rd-wind-cell--black{border-top:1px solid rgba(var(--theme-accent-rgb),.16);border-left:0}
  .rd-foot{grid-template-columns:1fr}
  .rd-thread-node::before,.rd-thread .rd-block::before{left:-32px}
  .rd-thread-node::after,.rd-thread .rd-block::after{left:-21px;width:21px}
  .rd-source-choices.has-variants{grid-template-columns:1fr}
  .rd-source-choice{border-top:1px solid rgba(var(--theme-contrast-rgb),.07);border-left:0}
  .rd-source-choice:first-child{border-top:0}
  .rd-source-line{flex-wrap:wrap;white-space:normal}
  .rd-source-line strong{flex:1 1 150px;white-space:normal}
  .rd-source-current{align-items:flex-start;padding:10px 16px}
}

@media (prefers-reduced-motion: reduce){.rd-spark{display:none}}

/* ---- Names block (Имена) ---- */
.rd-nb-intro{font-family:'Cormorant Garamond',serif;font-size:16.5px;line-height:1.74;color:rgba(var(--theme-text-rgb),.84);margin:0 0 16px}
.rd-nb-examples{font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1.68;color:rgba(var(--theme-text-rgb),.74);background:rgba(var(--theme-contrast-rgb),.04);border-left:2px solid rgba(var(--theme-accent-rgb),.45);border-radius:0 8px 8px 0;padding:12px 16px;margin-bottom:22px}
.rd-nb-examples-lbl{color:rgba(var(--theme-accent-strong-rgb),.9);font-weight:600;font-style:normal}

.rd-nb-result{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;padding:16px 20px;border:1px solid rgba(var(--theme-accent-rgb),.4);border-radius:12px;background:rgba(var(--theme-accent-rgb),.1);margin:0 0 22px;transition:background .25s,border-color .25s}
.rd-nb-result.lost{border-color:rgba(200,90,90,.5);background:rgba(200,90,90,.1)}
.rd-nb-result-nameless{font-style:italic;opacity:.8}
.rd-nb-result-lbl{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.7);align-self:center}
.rd-nb-result.lost .rd-nb-result-lbl{color:rgba(200,90,90,.7)}
.rd-nb-result-name{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:700;color:rgba(var(--theme-accent-strong-rgb),.98);letter-spacing:.08em;line-height:1}
.rd-nb-result.lost .rd-nb-result-name{color:rgba(220,160,160,.98)}
.rd-nb-result-meaning{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;color:rgba(var(--theme-text-rgb),.6)}
.rd-nb-result-lost-tag{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(200,90,90,.9);border:1px solid rgba(200,90,90,.5);border-radius:999px;padding:3px 10px;align-self:center}
.rd-nb-result-fade-enter-active,.rd-nb-result-fade-leave-active{transition:opacity .22s,transform .22s}
.rd-nb-result-fade-enter-from,.rd-nb-result-fade-leave-to{opacity:0;transform:translateY(-5px)}

.rd-nb-section{margin-top:26px;padding-top:20px;border-top:1px solid rgba(var(--theme-contrast-rgb),.07)}
.rd-nb-sub{display:flex;align-items:center;gap:10px;font-family:'Hanken Grotesk';font-size:11px;font-weight:700;letter-spacing:.17em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.85);margin-bottom:10px}
.rd-nb-sub--lost{color:rgba(190,100,100,.9)}
.rd-nb-die-tag{display:inline-flex;align-items:center;justify-content:center;min-width:44px;padding:3px 10px;border:1px solid rgba(var(--theme-accent-rgb),.45);border-radius:6px;font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;letter-spacing:.04em;color:rgba(var(--theme-accent-strong-rgb),.95);background:rgba(var(--theme-accent-rgb),.1);text-transform:none}
.rd-nb-sub-intro{font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1.62;color:rgba(var(--theme-text-rgb),.7);margin:0 0 12px}

/* Table base */
.rd-nb-table{border:1px solid rgba(var(--theme-contrast-rgb),.08);border-radius:11px;overflow:hidden}
.rd-nb-thead{display:grid;grid-template-columns:48px 1fr 96px;gap:12px;align-items:center;padding:9px 16px;background:rgba(var(--theme-accent-rgb),.11);color:rgba(var(--theme-accent-strong-rgb),.9);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em}
.rd-nb-row{display:grid;grid-template-columns:48px 1fr 96px;gap:12px;align-items:center;padding:11px 16px;border-top:1px solid rgba(var(--theme-contrast-rgb),.05);transition:background .15s,border-color .15s}
.rd-nb-row:nth-child(even){background:rgba(var(--theme-contrast-rgb),.014)}
.rd-nb-row.hl{background:rgba(var(--theme-accent-rgb),.22)!important;border-color:rgba(var(--theme-accent-rgb),.38)}

/* 4d4 table — wider die column for "1 1 1 1" combinations */
.rd-nb-d4-grid .rd-nb-thead{grid-template-columns:90px 1fr 96px}
.rd-nb-d4-grid .rd-nb-row{grid-template-columns:90px 1fr 96px}

/* Lost names table columns */
.rd-nb-thead--3col{grid-template-columns:46px 106px 1fr}
.rd-nb-row--3col{grid-template-columns:46px 106px 1fr}

/* Table cells */
.rd-nb-cell-die{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:rgba(var(--theme-accent-rgb),.88);letter-spacing:.05em}
.rd-nb-cell-die--sm{font-size:14px;letter-spacing:.22em;white-space:nowrap}
.rd-nb-cell-desc{font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(var(--theme-text-rgb),.86);line-height:1.3}
.rd-nb-cell-val{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:700;color:rgba(var(--theme-accent-strong-rgb),.97);letter-spacing:.06em}

/* Two-column 4d4 layout */
.rd-nb-d4-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}

/* Roll button */
/* Main roll button */
.rd-nb-roll-main{display:block;width:100%;margin:18px 0 0;padding:13px 22px;border:1px solid rgba(var(--theme-accent-rgb),.5);border-radius:12px;background:rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-accent-strong-rgb),.97);font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;letter-spacing:.06em;text-align:center;cursor:pointer;transition:all .2s}
.rd-nb-roll-main:hover{background:rgba(var(--theme-accent-rgb),.2);border-color:rgba(var(--theme-accent-rgb),.75);color:#f0d890}

/* Accordion */
.rd-nb-accordion{display:flex;flex-direction:column;gap:6px;margin-top:18px}
.rd-nb-acc-item{border:1px solid rgba(var(--theme-accent-rgb),.2);border-radius:10px;overflow:hidden;background:rgba(var(--theme-accent-rgb),.03)}
.rd-nb-acc-toggle{display:flex;align-items:center;gap:10px;width:100%;padding:13px 18px;background:none;border:none;color:rgba(var(--theme-text-rgb),.88);font-family:'Cormorant Garamond',serif;font-size:17px;letter-spacing:.03em;cursor:pointer;text-align:left;transition:background .18s}
.rd-nb-acc-toggle:hover{background:rgba(var(--theme-accent-rgb),.08)}
.rd-nb-acc-toggle.open{background:rgba(var(--theme-accent-rgb),.07);color:rgba(var(--theme-accent-strong-rgb),.97)}
.rd-nb-acc-label{flex:1}
.rd-nb-acc-arrow{font-size:12px;opacity:.6;margin-left:auto}
.rd-nb-acc-body{padding:14px 16px 16px}

/* Lost names accordion variant */
.rd-nb-accordion--lost{margin-top:14px}
.rd-nb-acc-item--lost{border-color:rgba(180,80,80,.25);background:rgba(180,80,80,.04)}
.rd-nb-acc-toggle--lost{color:rgba(220,160,160,.85)}
.rd-nb-acc-toggle--lost:hover{background:rgba(180,80,80,.08)}
.rd-nb-acc-toggle--lost.open{background:rgba(180,80,80,.07);color:rgba(240,180,180,.95)}

/* Collapse transition */
.rd-nb-collapse-enter-active,.rd-nb-collapse-leave-active{transition:opacity .2s,max-height .22s ease}
.rd-nb-collapse-enter-from,.rd-nb-collapse-leave-to{opacity:0;max-height:0}
.rd-nb-collapse-enter-to,.rd-nb-collapse-leave-from{opacity:1;max-height:2000px}

@media (max-width: 760px){.rd-nb-d4-grid{grid-template-columns:1fr}}

@media print{
  .rd-nav,.rd-actions,.rd-wordmark{display:none}
  .rd-main{margin-left:0}
  .rd-desc{max-height:none;overflow:visible}
  .rd-desc-toggle{display:none}
}
</style>
