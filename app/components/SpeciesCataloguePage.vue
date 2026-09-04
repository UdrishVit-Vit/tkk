<script setup>
import { useThreadConstellation } from '~/composables/useThreadConstellation.js'

const route = useRoute()

// One dossier component serves three rulesets. Each edition keeps its own
// wording, route base and content collection; the shared Enoa artwork stays
// addressed by the original 5e race paths.
const EDITIONS = {
  '5e': {
    key: '5e',
    cataloguePath: '/dnd5e/races',
    systemPath: '/dnd5e',
    systemLabel: 'D&D 5e',
    catalogueTitle: 'Расы и происхождения',
    catalogueShortTitle: 'Расы',
    catalogueNavLabel: 'Народы',
    catalogueCountWord: 'народов',
    catalogueSearchPlaceholder: 'Поиск народа...',
    catalogueMobileSearch: 'Найти народ',
    dataKey: 'dnd5e-races-list',
    collection: 'dnd5eRaces',
    varietyLabel: 'Выберите разновидность',
    varietyWord: 'разновидность'
  },
  '2024': {
    key: '2024',
    cataloguePath: '/dnd55e/species',
    systemPath: '/dnd55e',
    systemLabel: 'D&D 5.5e',
    catalogueTitle: 'Виды',
    catalogueShortTitle: 'Виды',
    catalogueNavLabel: 'Виды',
    catalogueCountWord: 'народов',
    catalogueSearchPlaceholder: 'Поиск народа...',
    catalogueMobileSearch: 'Найти народ',
    dataKey: 'dnd55e-species-list',
    collection: 'dnd55eSpecies',
    varietyLabel: 'Выберите разновидность',
    varietyWord: 'разновидность'
  },
  pf2e: {
    key: 'pf2e',
    cataloguePath: '/pf2e/ancestries',
    systemPath: '/pf2e',
    systemLabel: 'Pathfinder 2e',
    catalogueTitle: 'Наследия',
    catalogueShortTitle: 'Наследия',
    catalogueNavLabel: 'Наследия',
    catalogueCountWord: 'предков',
    catalogueSearchPlaceholder: 'Поиск предка...',
    catalogueMobileSearch: 'Найти предка',
    dataKey: 'pf2e-ancestries-list',
    collection: 'pf2eAncestries',
    varietyLabel: 'Выберите наследие',
    varietyWord: 'наследие'
  }
}

const editionKey = route.path.startsWith('/dnd55e/species')
  ? '2024'
  : route.path.startsWith('/pf2e/ancestries') ? 'pf2e' : '5e'
const edition = EDITIONS[editionKey]
const is2024Edition = editionKey === '2024'
const isPf2e = editionKey === 'pf2e'
const cataloguePath = edition.cataloguePath
const systemPath = edition.systemPath
const systemLabel = edition.systemLabel
const catalogueTitle = edition.catalogueTitle
const catalogueShortTitle = edition.catalogueShortTitle
const catalogueDataKey = edition.dataKey

function assetCataloguePath(path = '') {
  return path
    .replace(/^\/dnd55e\/species/, '/dnd5e/races')
    .replace(/^\/pf2e\/ancestries/, '/dnd5e/races')
}

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
const RACE_SPARK_ITEM_SELECTOR = '.rd-central-emblem, .rd-hero-card, .rd-source-choice, .rd-vtab, .rd-stat, .rd-feat, .rd-pf-feat, .rd-feat-level, .rd-item-row, .rd-wind-cell, .rd-nb-acc-item, .rd-pill'
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
  return slug ? `${cataloguePath}/${Array.isArray(slug) ? slug.join('/') : slug}` : ''
})
const selectedAssetPath = computed(() => assetCataloguePath(selectedPath.value))

const { data: racesData } = await useAsyncData(catalogueDataKey, () => {
  return queryCollection(edition.collection).order('title', 'ASC').all()
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
  title: () => selectedRace.value?.title ? `${selectedRace.value.title} — ${systemLabel} — TKK.club` : `${catalogueTitle} — ${systemLabel} — TKK.club`,
  description: () => selectedRace.value?.description || `${catalogueTitle} мира Эноа.`
})

// ---- constellation map for the races list ----
// The ring, threads and sparks are shared with every other catalogue; only the
// portrait lookup is specific to races.
function rlPortrait(race) {
  const slug = race.path.split('/').filter(Boolean).at(-1) || ''
  return `/images/races/portraits/${slug}.webp`
}

const isRaceDetail = computed(() => Boolean(selectedRace.value))
const {
  canvasEl: rlCanvasEl,
  center: rlCenter,
  fit: rlFit,
  map: racesMap
} = useThreadConstellation(filteredRaces, {
  label: race => race.title,
  portrait: rlPortrait,
  isDetail: isRaceDetail
})

function goToRace(race) {
  const slug = race.path.split('/').filter(Boolean).at(-1) || ''
  navigateTo(`${cataloguePath}/${slug}`)
}

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
  const pos = cardImagePosition[assetCataloguePath(race.path)]
  return pos ? { objectPosition: pos } : {}
}
function detailImageStyle(race) {
  const pos = detailImagePosition[assetCataloguePath(race.path)]
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
  'Багровый червь': '/images/races/udrishi/parasites/bagrovyy-cherv.webp',
  'Солнечный жук-рогач': '/images/races/udrishi/parasites/solnechnyy-zhuk-rogach.webp',
  'Большой таракан Худа': '/images/races/udrishi/parasites/bolshoy-tarakan-huda.webp',
  'Многохвостая крыса-барсук': '/images/races/udrishi/parasites/mnogohvostaya-krysa-barsuk.webp',
  'Паук-слепун': '/images/races/udrishi/parasites/pauk-slepun.webp',
  'Стеклянный муравей': '/images/races/udrishi/parasites/steklyannyy-muravey.webp',
  'Волосатая сороконожка-альбинос': '/images/races/udrishi/parasites/volosataya-sorokonozhka-albinos.webp',
  'Жадеитовый скарабей': '/images/races/udrishi/parasites/zhadeitovyy-skarabey.webp',
  'Колония лазурных термитов': '/images/races/udrishi/parasites/koloniya-lazurnyh-termitov.webp',
  'Саранча-иллюзионист': '/images/races/udrishi/parasites/sarancha-illyuzionist.webp'
}
const tattooImageByTitle = {
  'Чум': '/images/races/adzhaidy/tattoos/chum.webp',
  'Столб': '/images/races/adzhaidy/tattoos/stolb.webp',
  'Компас': '/images/races/adzhaidy/tattoos/kompas.webp',
  'Ошейник додора': '/images/races/adzhaidy/tattoos/osheynik-dodora.webp',
  'Крепость': '/images/races/adzhaidy/tattoos/krepost.webp',
  'Зубья': '/images/races/adzhaidy/tattoos/zubya.webp',
  'Ману': '/images/races/adzhaidy/tattoos/manu.webp',
  'Шамас': '/images/races/adzhaidy/tattoos/shamas.webp'
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
function varietyCountWord(n) {
  if (isPf2e) return n === 1 ? 'наследие' : (n >= 2 && n <= 4) ? 'наследия' : 'наследий'
  return n === 2 ? 'варианта' : 'вариантов'
}
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
    'Урма': '/images/races/udrishi/knots/urma-v4.webp',
    'Эрил': '/images/races/udrishi/knots/eril-v2.webp',
    'Пйюр-Пйюр': '/images/races/udrishi/knots/pure-pure-v3.webp'
  },
  '/dnd5e/races/hudduliny': {
    'Эрх': '/images/races/hudduliny/knots/erh-t.webp',
    'Сар': '/images/races/hudduliny/knots/sar-t.webp',
    'Омор': '/images/races/hudduliny/knots/omor-t.webp'
  },
  '/dnd5e/races/marakiytsy': {
    'Янтарный': '/images/races/marakiytsy/knots/yantarniy-v2.webp',
    'Пепельный': '/images/races/marakiytsy/knots/pepelniy-v2.webp',
    'Драгмирец': '/images/races/marakiytsy/knots/dragmirec-v2.webp'
  },
  '/dnd5e/races/lyudi': {
    'Дангун': '/images/races/lyudi/knots/dangun-v2.webp',
    'Бралл': '/images/races/lyudi/knots/brall-v2.webp',
    'Адаад': '/images/races/lyudi/knots/adaad-v2.webp'
  },
  '/dnd5e/races/morhory': {
    'Дитя Анзу': '/images/races/morhory/knots/anzu-v2.webp',
    'Дитя Эдры': '/images/races/morhory/knots/edra-v2.webp'
  },
  '/dnd5e/races/vetu': {
    "Ча'Нери": '/images/races/vetu/knots/chaneri-v2.webp',
    "Кса'От": '/images/races/vetu/knots/ksaot-v4.webp',
    "Тлан'Каа": '/images/races/vetu/knots/tlaankaa-v2.webp'
  }
}
// Default knot for races without varieties
const RACE_KNOT_DEFAULT = {
  '/dnd5e/races/borosy': '/images/races/borosy/knots/borosy-v2.webp',
  '/dnd5e/races/jabari': '/images/races/jabari/knots/jabari-v4.webp',
  '/dnd5e/races/adzhaidy': '/images/races/adzhaidy/knots/adzhaidy-v2.webp',
  '/dnd5e/races/oyrdugi': '/images/races/oyrdugi/knots/oyrdugi-v3.webp',
  '/dnd5e/races/samaghi': '/images/races/samaghi/knots/samaghi-t.webp',
  '/dnd5e/races/ehornur': '/images/races/ehornur/knots/ehornur-v2.webp',
  '/dnd5e/races/virmorozhdennye': '/images/races/virmorozhdennye/knots/virmbirth-v2.webp',
  '/dnd5e/races/chotgory': '/images/races/chotgory/knots/chotgor.webp',
  '/dnd5e/races/morhory': '/images/races/morhory/knots/anzu-v2.webp'
}
const activeKnot = computed(() => {
  const map = RACE_KNOTS[selectedAssetPath.value]
  if (map && activeVariety.value) return map[varietyShortTitle(activeVariety.value)] || ''
  return RACE_KNOT_DEFAULT[selectedAssetPath.value] || ''
})
// The source PNGs have very different transparent margins. These dimensions
// normalize the visible mark inside the diamond to roughly the same scale as
// the Amber and Ash Marakian emblems.
const CENTRAL_KNOT_SIZE_BY_ASSET = {
  '/images/races/udrishi/knots/urma-v4.webp': [93, 68],
  '/images/races/udrishi/knots/eril-v2.webp': [93, 68],
  '/images/races/udrishi/knots/pure-pure-v3.webp': [93, 68],
  '/images/races/hudduliny/knots/erh-t.webp': [113, 82],
  '/images/races/hudduliny/knots/sar-t.webp': [104, 76],
  '/images/races/hudduliny/knots/omor-t.webp': [118, 86],
  '/images/races/marakiytsy/knots/yantarniy-v2.webp': [88, 64],
  '/images/races/marakiytsy/knots/pepelniy-v2.webp': [98, 71],
  '/images/races/marakiytsy/knots/dragmirec-v2.webp': [93, 68],
  '/images/races/lyudi/knots/dangun-v2.webp': [93, 68],
  '/images/races/lyudi/knots/brall-v2.webp': [93, 68],
  '/images/races/lyudi/knots/adaad-v2.webp': [94, 69],
  '/images/races/morhory/knots/anzu-v2.webp': [129, 94],
  '/images/races/morhory/knots/edra-v2.webp': [112, 82],
  '/images/races/vetu/knots/chaneri-v2.webp': [91, 66],
  '/images/races/vetu/knots/ksaot-v4.webp': [93, 68],
  '/images/races/vetu/knots/tlaankaa-v2.webp': [90, 66],
  '/images/races/borosy/knots/borosy-v2.webp': [116, 85],
  '/images/races/jabari/knots/jabari-v4.webp': [93, 68],
  '/images/races/adzhaidy/knots/adzhaidy-v2.webp': [133, 97],
  '/images/races/oyrdugi/knots/oyrdugi-v3.webp': [93, 68],
  '/images/races/samaghi/knots/samaghi-t.webp': [93, 68],
  '/images/races/ehornur/knots/ehornur-v2.webp': [93, 68],
  '/images/races/virmorozhdennye/knots/virmbirth-v2.webp': [93, 68],
  '/images/races/chotgory/knots/chotgor.webp': [93, 68]
}
const centralKnotStyle = computed(() => {
  const [desktop, mobile] = CENTRAL_KNOT_SIZE_BY_ASSET[activeKnot.value] || [88, 64]
  return {
    '--rd-knot-size': `${desktop}px`,
    '--rd-knot-size-mobile': `${mobile}px`
  }
})
const VETU_GOLD_VARIETY_KNOTS = new Set(["Ча'Нери", "Кса'От", "Тлан'Каа"])
const hasVetuGoldCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/vetu'
  && activeVariety.value
  && VETU_GOLD_VARIETY_KNOTS.has(varietyShortTitle(activeVariety.value))
))
const hasTlaankaaCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/vetu'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === "Тлан'Каа"
))
const hasYantarMarakCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/marakiytsy'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Янтарный'
))
const hasPepelniyMarakCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/marakiytsy'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Пепельный'
))
const hasDragmirecMarakCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/marakiytsy'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Драгмирец'
))
const hasDangunHumanCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/lyudi'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Дангун'
))
const hasBrallHumanCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/lyudi'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Бралл'
))
const hasAdaadHumanCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/lyudi'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Адаад'
))
const hasErilUdrishCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/udrishi'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Эрил'
))
const hasUrmaUdrishCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/udrishi'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Урма'
))
const hasPurePureUdrishCentralKnot = computed(() => (
  selectedAssetPath.value === '/dnd5e/races/udrishi'
  && activeVariety.value
  && varietyShortTitle(activeVariety.value) === 'Пйюр-Пйюр'
))
const CLEAN_CENTRAL_KNOT_PATHS = new Set([
  '/dnd5e/races/borosy',
  '/dnd5e/races/vetu',
  '/dnd5e/races/oyrdugi',
  '/dnd5e/races/samaghi',
  '/dnd5e/races/ehornur'
])
const hasCleanCentralKnot = computed(() => (
  CLEAN_CENTRAL_KNOT_PATHS.has(selectedAssetPath.value)
  && !hasVetuGoldCentralKnot.value
  && selectedAssetPath.value !== '/dnd5e/races/borosy'
))
const hasBorosCentralKnot = computed(() => selectedAssetPath.value === '/dnd5e/races/borosy')
const hasOyrdugiCentralKnot = computed(() => selectedAssetPath.value === '/dnd5e/races/oyrdugi')
const hasEhornurCentralKnot = computed(() => selectedAssetPath.value === '/dnd5e/races/ehornur')
const hasSamaghiCentralKnot = computed(() => selectedAssetPath.value === '/dnd5e/races/samaghi')
const hasMorhoryCentralKnot = computed(() => selectedAssetPath.value === '/dnd5e/races/morhory')
const hasMarakiytsyCentralKnot = computed(() => selectedAssetPath.value === '/dnd5e/races/marakiytsy')
const LARGE_CENTRAL_KNOT_PATHS = new Set([
  '/dnd5e/races/hudduliny',
  '/dnd5e/races/virmorozhdennye',
  '/dnd5e/races/chotgory',
  '/dnd5e/races/morhory',
  '/dnd5e/races/adzhaidy',
  '/dnd5e/races/jabari'
])
const hasLargeCentralKnot = computed(() => LARGE_CENTRAL_KNOT_PATHS.has(selectedAssetPath.value))
const hasVirmCentralKnot = computed(() => selectedAssetPath.value === '/dnd5e/races/virmorozhdennye')
const GOLD_CENTRAL_KNOT_PATHS = new Set([
  '/dnd5e/races/chotgory',
  '/dnd5e/races/morhory'
])
const hasGoldCentralKnot = computed(() => GOLD_CENTRAL_KNOT_PATHS.has(selectedAssetPath.value))
const FILLED_GOLD_CENTRAL_KNOT_PATHS = new Set([
  '/dnd5e/races/adzhaidy'
])
const hasFilledGoldCentralKnot = computed(() => FILLED_GOLD_CENTRAL_KNOT_PATHS.has(selectedAssetPath.value))
const NATIVE_GOLD_CENTRAL_KNOT_PATHS = new Set([
  '/dnd5e/races/jabari'
])
const hasNativeGoldCentralKnot = computed(() => NATIVE_GOLD_CENTRAL_KNOT_PATHS.has(selectedAssetPath.value))

// Per-race, per-variety portraits — for merged races (e.g. Люди) whose varieties
// are visually distinct peoples, the hero portrait swaps with the chosen variety.
const RACE_PORTRAITS = {
  '/dnd5e/races/lyudi': {
    'Дангун': '/images/races/danguntsy/details/shamas.webp',
    'Бралл': '/images/races/bralltsy/details/shamas.webp',
    'Адаад': '/images/races/adaady/adaad.webp'
  }
}
const activePortrait = computed(() => {
  const map = RACE_PORTRAITS[selectedAssetPath.value]
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
const SHOWN_ELSEWHERE = [
  'Увеличение характеристик',
  'Характеристики и предыстория',
  'Возраст',
  'Мировоззрение',
  'Культурные склонности',
  'Размер',
  'Скорость',
  'Языки',
  'Языки персонажа',
  'Имена',
  'Разновидности'
]
// Pathfinder 2e keeps age, customs and beliefs as readable lore blocks — only
// the fields that already have their own place in the dossier are hidden.
const PF2E_SHOWN_ELSEWHERE = ['Разновидности', 'Имена', 'Языки', 'Размер', 'Скорость']
const extraRuleSections = computed(() => {
  const hidden = isPf2e ? PF2E_SHOWN_ELSEWHERE : SHOWN_ELSEWHERE
  const varietyIds = new Set(varietyItemSections.value.map(section => section.id))
  return detailSections.value
    .filter(section => !hidden.includes(section.title) && !varietyIds.has(section.id))
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
  // Pathfinder 2e reads a different stat block: rarity, ancestry HP, boosts and
  // a flaw replace the 5e creature-type / alignment lines entirely.
  if (isPf2e) {
    return [
      { label: 'Редкость', value: r.rarity || 'Обычное' },
      { label: 'Хиты предка', value: r.hp ? String(r.hp) : '—' },
      { label: 'Размер', value: r.raceSize || '—' },
      { label: 'Скорость', value: r.speed || '—' },
      { label: 'Повышения характеристик', value: r.abilityScore || '—' },
      ...(r.abilityFlaw && r.abilityFlaw !== '—' ? [{ label: 'Изъян характеристики', value: r.abilityFlaw }] : []),
      { label: 'Чувства', value: r.senses || '—' },
      { label: 'Языки', value: r.languages || fullText(findRuleText(r, 'Языки')) },
      { label: 'Черты', value: (r.ancestryTraits || []).join(', ') || '—' }
    ]
  }
  return [
    { label: 'Тип существа', value: r.creatureType || '—' },
    { label: 'Характеристики', value: r.abilityScore || '—' },
    { label: 'Размер', value: r.raceSize || '—' },
    { label: 'Скорость', value: r.speed || '—' },
    { label: 'Возраст', value: fullText(findRuleText(r, 'Возраст')) },
    {
      label: is2024Edition ? 'Культурные склонности' : 'Мировоззрение',
      value: fullText(findRuleText(r, is2024Edition ? 'Культурные склонности' : 'Мировоззрение'))
    },
    { label: 'Тёмное зрение', value: darkvision(r) },
    { label: 'Языки', value: fullText(findRuleText(r, is2024Edition ? 'Языки персонажа' : 'Языки')) }
  ]
})

// ---- Pathfinder 2e ancestry feats ----
// Feats are chosen at 1st level and then every four levels, so the dossier
// groups them by level and lets the reader narrow to a single tier.
const featLevelFilter = ref('all')
const ancestryFeats = computed(() => selectedRace.value?.ancestryFeats || [])
const featLevels = computed(() => {
  return Array.from(new Set(ancestryFeats.value.map(f => f.level))).sort((a, b) => a - b)
})
const featGroups = computed(() => {
  const levels = featLevelFilter.value === 'all'
    ? featLevels.value
    : featLevels.value.filter(l => l === featLevelFilter.value)
  return levels.map(level => ({
    level,
    feats: ancestryFeats.value.filter(f => f.level === level)
  }))
})
function featActionGlyph(actions = '') {
  const map = { '1': '◆', '2': '◆◆', '3': '◆◆◆', 'reaction': '⤶', 'free': '◇' }
  return map[String(actions).toLowerCase()] || ''
}
function featParagraphs(text = '') {
  return normalizeBreaks(text).split(/\n\s*\n/g).map(t => t.trim()).filter(Boolean)
}

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
      <main class="rl-mobile" aria-label="Каталог народов">
        <header class="rl-mobile-head">
          <NuxtLink :to="systemPath" class="rl-mobile-back" :aria-label="`Назад к ${systemLabel}`">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          </NuxtLink>
          <div class="rl-mobile-brand"><span>Threads of the Knot of Knots</span><b>TKK<em>.club</em></b></div>
          <span class="rl-mobile-head-spacer" />
        </header>

        <section class="rl-mobile-hero">
          <NuxtLink :to="systemPath" class="rl-mobile-centre" :aria-label="`Назад к ${systemLabel}`">
            <span /><span />
            <img src="/assets/nodes/rasy.png" :alt="catalogueTitle">
          </NuxtLink>
          <div>
            <span>{{ systemLabel }}</span>
            <h1>{{ catalogueTitle }}</h1>
            <p>{{ races.length }} {{ edition.catalogueCountWord }}</p>
          </div>
        </section>

        <label class="rl-mobile-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/></svg>
          <input v-model="search" type="search" :placeholder="edition.catalogueMobileSearch">
          <span v-if="search" @click="search = ''">×</span>
        </label>

        <section class="rl-mobile-list">
          <button v-for="(node, i) in racesMap.nodes" :key="node.item.path" type="button" @click="goToRace(node.item)">
            <span class="rl-mobile-portrait">
              <img :src="node.portrait" :alt="node.label" @error="$event.target.src = node.emblem">
            </span>
            <span class="rl-mobile-copy">
              <b>{{ node.label }}</b>
              <small v-if="node.item.originalName">{{ node.item.originalName }}</small>
              <small v-else>Открыть описание</small>
            </span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>
          <p v-if="!racesMap.nodes.length" class="rl-mobile-empty">По вашему запросу ничего не найдено.</p>
        </section>
      </main>

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
        <!-- central catalogue node → back to the selected rules system -->
        <NuxtLink :to="systemPath" class="rl-node rl-node-center" :title="`К карте ${systemLabel}`">
          <div class="rl-disc rl-disc-center" />
          <div class="rl-knot rl-knot-center">
            <img src="/assets/nodes/rasy.png" :alt="catalogueTitle">
          </div>
          <div class="rl-text rl-text-below">
            <div class="rl-label rl-label-center">{{ catalogueTitle }}</div>
          </div>
        </NuxtLink>

        <!-- one node per race -->
        <button
          v-for="(node, i) in racesMap.nodes"
          :key="node.item.path"
          type="button"
          class="rl-node"
          :style="{ transform: `translate(${node.x}px, ${node.y}px)` }"
          @click="goToRace(node.item)"
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
        <span class="rl-crumb-strong">{{ catalogueTitle }}</span>
        <NuxtLink to="/" class="rl-crumb-exit">← выйти</NuxtLink>
      </nav>

      <div class="rl-search-wrap">
        <input v-model="search" class="rl-search" type="search" :placeholder="edition.catalogueSearchPlaceholder">
      </div>

      <aside class="rl-sidebar" aria-label="Навигация">
        <NuxtLink to="/" class="rl-sidebar-btn" title="Главная">
          <img src="/assets/knot-main.png" width="30" height="30" style="display:block;object-fit:contain">
          <span>Главная</span>
        </NuxtLink>
        <NuxtLink :to="systemPath" class="rl-sidebar-btn" title="Система">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>
          <span>Система</span>
        </NuxtLink>
        <div class="rl-sidebar-theme"><ThemeSwitcher compact /><span>Тема</span></div>
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
        <NuxtLink to="/" class="rd-nav-btn rd-nav-main" title="Главная">
          <img src="/assets/knot-main.png" width="24" height="24" style="display:block;object-fit:contain">
          <span>Главная</span>
        </NuxtLink>
        <NuxtLink :to="cataloguePath" class="rd-nav-btn" :title="`Все — ${edition.catalogueNavLabel}`">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
          <span>{{ edition.catalogueNavLabel }}</span>
        </NuxtLink>
        <NuxtLink :to="systemPath" class="rd-nav-btn" title="Система">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>
          <span>Система</span>
        </NuxtLink>
        <div class="rd-nav-theme"><ThemeSwitcher compact /><span>Тема</span></div>
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
              <NuxtLink :to="cataloguePath" class="crumb-link crumb-gold">{{ catalogueShortTitle }}</NuxtLink>
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
              <NuxtLink :to="cataloguePath" class="rd-action-btn" title="Закрыть">✕</NuxtLink>
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
              :to="cataloguePath"
              class="rd-central-emblem"
              :style="centralKnotStyle"
              :class="{
                'rd-central-emblem--clean-knot': hasCleanCentralKnot,
                'rd-central-emblem--large-knot': hasLargeCentralKnot,
                'rd-central-emblem--virm-knot': hasVirmCentralKnot,
                'rd-central-emblem--oyrdugi-knot': hasOyrdugiCentralKnot,
                'rd-central-emblem--ehornur-knot': hasEhornurCentralKnot,
                'rd-central-emblem--samaghi-knot': hasSamaghiCentralKnot,
                'rd-central-emblem--morhory-knot': hasMorhoryCentralKnot,
                'rd-central-emblem--marakiytsy-knot': hasMarakiytsyCentralKnot,
                'rd-central-emblem--gold-knot': hasGoldCentralKnot,
                'rd-central-emblem--filled-gold-knot': hasFilledGoldCentralKnot,
                'rd-central-emblem--native-gold-knot': hasNativeGoldCentralKnot,
                'rd-central-emblem--vetu-gold-knot': hasVetuGoldCentralKnot,
                'rd-central-emblem--tlaankaa-knot': hasTlaankaaCentralKnot,
                'rd-central-emblem--yantar-marak-knot': hasYantarMarakCentralKnot,
                'rd-central-emblem--pepelniy-marak-knot': hasPepelniyMarakCentralKnot,
                'rd-central-emblem--dragmirec-marak-knot': hasDragmirecMarakCentralKnot,
                'rd-central-emblem--dangun-human-knot': hasDangunHumanCentralKnot,
                'rd-central-emblem--brall-human-knot': hasBrallHumanCentralKnot,
                'rd-central-emblem--adaad-human-knot': hasAdaadHumanCentralKnot,
                'rd-central-emblem--eril-udrish-knot': hasErilUdrishCentralKnot,
                'rd-central-emblem--urma-udrish-knot': hasUrmaUdrishCentralKnot,
                'rd-central-emblem--pure-pure-udrish-knot': hasPurePureUdrishCentralKnot,
                'rd-central-emblem--boros-knot': hasBorosCentralKnot
              }"
              :title="`Назад к разделу «${catalogueTitle}»`"
              :aria-label="`Назад к разделу «${catalogueTitle}»`"
            >
              <span class="rd-central-emblem-frame" />
              <img
                v-if="activeKnot"
                :src="activeKnot"
                :alt="activeVariety ? `Узел: ${varietyShortTitle(activeVariety)}` : `Узел: ${catalogueShortTitle}`"
                class="rd-central-emblem-knot"
              >
              <img v-else src="/assets/nodes/rasy.png" :alt="`Узел: ${catalogueShortTitle}`" class="rd-central-emblem-knot">
            </NuxtLink>

            <div class="rd-central-heading">
              <nav class="rd-eyebrow rd-eyebrow-path">
                <NuxtLink :to="systemPath">{{ systemLabel }}</NuxtLink>
                <span class="rd-eyebrow-sep">/</span>
                <NuxtLink :to="cataloguePath">{{ catalogueShortTitle }}</NuxtLink>
                <span class="rd-eyebrow-sep">/</span>
                <span class="rd-eyebrow-current">{{ selectedRace.title }}</span>
              </nav>
              <h1 class="rd-title">{{ selectedRace.title.toUpperCase() }}</h1>
              <div v-if="selectedRace.originalName" class="rd-original-name">{{ selectedRace.originalName }}</div>
            </div>
          </section>

          <div class="rd-thread">
            <!-- Standard race presentation: Thread Source strip + shared overview + portrait -->
            <section class="rd-presentation" :aria-label="`Представление: ${catalogueShortTitle}`">
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

            <aside v-if="isPf2e" class="rd-edition-note rd-thread-node">
              <span class="rd-edition-note-mark" aria-hidden="true">PF2e</span>
              <div>
                <h2>Предок в Pathfinder 2e</h2>
                <p>
                  Предок задаёт хиты предка, размер, скорость, чувства, черты и языки, даёт два
                  повышения характеристик и свободное повышение, а иногда — изъян. На 1 уровне вы
                  выбираете наследие (heritage) и первый родовой талант, дальше родовые таланты
                  открываются на 5, 9, 13 и 17 уровнях.
                </p>
              </div>
            </aside>

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
              <div class="rd-variety-selector-head">
                <span>{{ edition.varietyLabel }}</span>
                <small>{{ varietyItemSections.length }} {{ varietyCountWord(varietyItemSections.length) }}</small>
              </div>
              <button
                v-for="section in varietyItemSections"
                :key="section.id"
                class="rd-vtab"
                :class="{ active: activeVarietyId === section.id }"
                type="button"
                @click="selectVariety(section.id)"
              >
                <img
                  v-if="activeVarietyId === section.id && RACE_KNOTS[selectedAssetPath]?.[varietyShortTitle(section)]"
                  :src="RACE_KNOTS[selectedAssetPath][varietyShortTitle(section)]"
                  class="rd-vtab-knot"
                  :class="{
                    'rd-vtab-knot--gold': hasGoldCentralKnot,
                    'rd-vtab-knot--vetu-gold': hasVetuGoldCentralKnot,
                    'rd-vtab-knot--dangun-gold': hasDangunHumanCentralKnot,
                    'rd-vtab-knot--brall-gold': hasBrallHumanCentralKnot,
                    'rd-vtab-knot--adaad-gold': hasAdaadHumanCentralKnot,
                    'rd-vtab-knot--eril-gold': hasErilUdrishCentralKnot,
                    'rd-vtab-knot--urma-gold': hasUrmaUdrishCentralKnot,
                    'rd-vtab-knot--pure-pure-gold': hasPurePureUdrishCentralKnot
                  }"
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
                    Наследие
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
                      <div class="rd-item-name">
                        <span class="rd-item-mobile-label">{{ sectionItemsNameLabel(activeVariety) }}</span>
                        <strong>{{ item.title }}</strong>
                      </div>
                      <div class="rd-item-copy">
                        <span class="rd-item-mobile-label">{{ sectionItemsColumnLabel(activeVariety) }}</span>
                        <p>{{ item.text }}</p>
                      </div>
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
              <div class="rd-wind-mobile" :aria-label="activeWindTattooTable.title">
                <p class="rd-wind-mobile-hint">Нажмите на пару Ветров, чтобы прочитать её полностью.</p>
                <details
                  v-for="(entry, index) in activeWindTattooTable.entries"
                  :key="`mobile-${entry.whiteTitle}`"
                  class="rd-wind-mobile-entry"
                  :open="index === 0"
                >
                  <summary>
                    <span><small>Белый Ветер</small><b>{{ entry.whiteTitle }}</b></span>
                    <span><small>Чёрный Ветер</small><b>{{ entry.blackTitle }}</b></span>
                    <i aria-hidden="true" />
                  </summary>
                  <div class="rd-wind-mobile-pair">
                    <article class="rd-wind-cell rd-wind-cell--white">
                      <span class="rd-wind-cell-label">Белый Ветер</span>
                      <h3>{{ entry.whiteTitle }}</h3>
                      <p>{{ entry.whiteText }}</p>
                    </article>
                    <article class="rd-wind-cell rd-wind-cell--black">
                      <span class="rd-wind-cell-label">Чёрный Ветер</span>
                      <h3>{{ entry.blackTitle }}</h3>
                      <p>{{ entry.blackText }}</p>
                      <p class="rd-wind-darkness">
                        Вы получаете <strong>{{ entry.darknessPoints }}</strong>
                        {{ entry.darknessPoints === 1 ? 'Пункт Тьмы' : 'Пункта Тьмы' }}.
                      </p>
                    </article>
                  </div>
                </details>
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
                  <div class="rd-item-name">
                    <span class="rd-item-mobile-label">{{ sectionItemsNameLabel(section) }}</span>
                    <strong>{{ item.title }}</strong>
                  </div>
                  <div class="rd-item-copy">
                    <span class="rd-item-mobile-label">{{ sectionItemsColumnLabel(section) }}</span>
                    <p>{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pathfinder 2e ancestry feats: chosen at 1st level, then every four levels. -->
            <div v-if="ancestryFeats.length" class="rd-block rd-feats-block">
              <h2 class="rd-h2">Родовые таланты</h2>
              <p class="rd-feats-note">
                Первый родовой талант вы берёте на 1 уровне, следующие — на 5, 9, 13 и 17 уровнях.
                Талант доступен, если его уровень не превышает ваш.
              </p>
              <div class="rd-feat-levels">
                <button
                  type="button"
                  class="rd-feat-level"
                  :class="{ active: featLevelFilter === 'all' }"
                  @click="featLevelFilter = 'all'"
                >Все</button>
                <button
                  v-for="level in featLevels"
                  :key="level"
                  type="button"
                  class="rd-feat-level"
                  :class="{ active: featLevelFilter === level }"
                  @click="featLevelFilter = level"
                >{{ level }} ур.</button>
              </div>

              <div v-for="group in featGroups" :key="group.level" class="rd-feat-group">
                <div class="rd-feat-group-head">
                  <span class="rd-feat-group-level"><i aria-hidden="true" /><b>{{ group.level }}</b></span>
                  <span class="rd-feat-group-label">уровень</span>
                  <i aria-hidden="true" />
                </div>
                <article v-for="feat in group.feats" :key="feat.name" class="rd-pf-feat">
                  <header class="rd-pf-feat-head">
                    <h3>
                      {{ feat.name }}
                      <em v-if="featActionGlyph(feat.actions)" class="rd-pf-actions" :title="`Действия: ${feat.actions}`">{{ featActionGlyph(feat.actions) }}</em>
                    </h3>
                    <span class="rd-pf-feat-tier">Талант {{ feat.level }}</span>
                  </header>
                  <div v-if="feat.traits?.length" class="rd-pf-traits">
                    <span v-for="trait in feat.traits" :key="trait" class="rd-pf-trait">{{ trait }}</span>
                  </div>
                  <dl class="rd-pf-meta">
                    <div v-if="feat.prerequisites"><dt>Требования</dt><dd>{{ feat.prerequisites }}</dd></div>
                    <div v-if="feat.frequency"><dt>Частота</dt><dd>{{ feat.frequency }}</dd></div>
                    <div v-if="feat.trigger"><dt>Триггер</dt><dd>{{ feat.trigger }}</dd></div>
                    <div v-if="feat.requirements"><dt>Условие</dt><dd>{{ feat.requirements }}</dd></div>
                  </dl>
                  <p v-for="(paragraph, pi) in featParagraphs(feat.text)" :key="pi" class="rd-pf-feat-text">{{ paragraph }}</p>
                  <p v-if="feat.special" class="rd-pf-feat-special"><strong>Особое:</strong> {{ feat.special }}</p>
                </article>
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

<style scoped src="../assets/css/thread-dossier.css"></style>
