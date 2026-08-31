<script setup>
import {
  LORE_GLOSSARY,
  LORE_GLOSSARY_BY_ID,
  LORE_GLOSSARY_CATEGORIES,
  LORE_GLOSSARY_DEFAULT_SOURCE,
  LORE_GLOSSARY_SEASONS,
  LORE_GLOSSARY_SOURCES,
  cutOgniPayload,
  loreDisplayTerm,
  loreMatchKey,
} from '~/data/loreGlossary.js'
import { ogniChapterLink } from '~/data/loreOgniGlossary/index.js'
import { LORE_DOSSIERS } from '~/data/loreDossiers.js'

defineProps({ theme: { type: Object, default: () => ({}) } })
defineEmits(['up'])

const route = useRoute()
const router = useRouter()
const searchInput = ref(null)
const listPanel = ref(null)
const detailPanel = ref(null)
const mobileDetailOpen = ref(false)
const filtersOpen = ref(route.query.panel === 'filters')
const sourceQuery = ref('')
const historyOnly = ref(route.query.history === '1')
const relatedOnly = ref(route.query.related === '1')
const detailExpanded = ref(false)
const detailVisible = ref(true)
const actionMessage = ref('')
let actionTimer

const sourceOptions = Object.values(LORE_GLOSSARY_SOURCES)
const query = ref(typeof route.query.q === 'string' ? route.query.q : '')
const activeCategory = ref(
  LORE_GLOSSARY_CATEGORIES.some(item => item.id === route.query.category)
    ? route.query.category
    : 'all',
)
const activeSource = ref(
  typeof route.query.source === 'string' && LORE_GLOSSARY_SOURCES[route.query.source]
    ? route.query.source
    : 'all',
)
const activeLetter = ref(typeof route.query.letter === 'string' ? route.query.letter : 'all')
const sortDirection = ref(route.query.sort === 'desc' ? 'desc' : 'asc')

const HISTORY_LABELS = {
  'zhertva-purusha': 'Жертва Пуруша',
  'epoha-rassveta': 'Эпоха Рассвета',
  'epoha-pererozhdeniya': 'Эпоха Перерождения',
  'epoha-sveta': 'Эпоха Света',
  'epoha-lyudey': 'Эпоха Людей',
  'epoha-vosstanovleniya': 'Эпоха Восстановления',
  'vremya-vetrov': 'Время Ветров',
}

const categoryMap = Object.fromEntries(LORE_GLOSSARY_CATEGORIES.map(item => [item.id, item]))
const normalize = value => String(value || '')
  .toLocaleLowerCase('ru-RU')
  .replace(/ё/g, 'е')
  .replace(/[’'«»]/g, '')

function sourceIdsFor(term) {
  return term?.sources?.length
    ? term.sources
    : [term?.source || LORE_GLOSSARY_DEFAULT_SOURCE]
}

function sourceFor(term) {
  return LORE_GLOSSARY_SOURCES[sourceIdsFor(term)[0]]
    || LORE_GLOSSARY_SOURCES[LORE_GLOSSARY_DEFAULT_SOURCE]
}

function sourcesFor(term) {
  return sourceIdsFor(term).map(id => LORE_GLOSSARY_SOURCES[id]).filter(Boolean)
}

// Прогресс по сезону: 0 — весь сезон открыт, иначе номер главы, на которой
// читатель остановился. Статья не должна знать больше него.
const season = LORE_GLOSSARY_SEASONS[0] || null
const chapterMax = season?.chapterCount || 0
const requestedChapter = Number.parseInt(route.query.chapter, 10)
const chapterCut = ref(
  Number.isFinite(requestedChapter) && requestedChapter >= 1 && requestedChapter <= chapterMax
    ? requestedChapter
    : 0,
)
const chapterSlider = computed({
  get: () => chapterCut.value || chapterMax,
  set: (value) => { chapterCut.value = Number(value) >= chapterMax ? 0 : Number(value) },
})

const glossary = computed(() => {
  const cut = chapterCut.value
  if (!cut) return LORE_GLOSSARY
  return LORE_GLOSSARY.reduce((acc, term) => {
    if (!term.ogni) {
      acc.push(term)
      return acc
    }
    const met = term.ogni.chapters.some(chapter => chapter <= cut)
    const inArchive = sourceIdsFor(term).includes(LORE_GLOSSARY_DEFAULT_SOURCE)
    if (!met) {
      // Кампания эту сущность ещё не встретила: свод Башни Мафраш остаётся,
      // свидетельство «Огней» появится позже.
      if (inArchive) acc.push({ ...term, ogni: null, sources: [LORE_GLOSSARY_DEFAULT_SOURCE] })
      return acc
    }
    const ogni = cutOgniPayload(term.ogni, cut)
    acc.push({
      ...term,
      definition: !inArchive && ogni.summary ? ogni.summary : term.definition,
      ogni,
    })
    return acc
  }, [])
})

const categoryCounts = computed(() => Object.fromEntries(
  LORE_GLOSSARY_CATEGORIES.map(category => [
    category.id,
    glossary.value.filter(term => term.category === category.id).length,
  ]),
))

const sourceCounts = computed(() => Object.fromEntries(
  sourceOptions.map(source => [
    source.id,
    glossary.value.filter(term => sourceIdsFor(term).includes(source.id)).length,
  ]),
))

const filteredSourceOptions = computed(() => {
  const needle = normalize(sourceQuery.value).trim()
  if (!needle) return sourceOptions
  return sourceOptions.filter(source => normalize([
    source.mark,
    source.title,
    source.attributedTo,
    source.description,
  ].join(' ')).includes(needle))
})

const activeFilterCount = computed(() => [
  activeCategory.value !== 'all',
  activeSource.value !== 'all',
  activeLetter.value !== 'all',
  sortDirection.value !== 'asc',
  historyOnly.value,
  relatedOnly.value,
  chapterCut.value > 0,
].filter(Boolean).length)

const termsBeforeLetter = computed(() => {
  const needle = normalize(query.value).trim()
  return glossary.value
    .filter(term => activeCategory.value === 'all' || term.category === activeCategory.value)
    .filter(term => activeSource.value === 'all' || sourceIdsFor(term).includes(activeSource.value))
    .filter(term => !historyOnly.value || Boolean(term.history))
    .filter(term => !relatedOnly.value || Boolean(term.related?.length))
    .filter((term) => {
      if (!needle) return true
      const source = sourceFor(term)
      return normalize([
        term.term,
        ...(term.aliases || []),
        term.definition,
        source?.title,
        term.attributedTo || source?.attributedTo,
      ].join(' ')).includes(needle)
    })
})

const alphabet = computed(() => [...new Set(
  termsBeforeLetter.value.map(term => term.term[0].toLocaleUpperCase('ru-RU')),
)].sort((a, b) => a.localeCompare(b, 'ru')))

const filteredTerms = computed(() => termsBeforeLetter.value
  .filter(term => activeLetter.value === 'all' || term.term.toLocaleUpperCase('ru-RU').startsWith(activeLetter.value))
  .slice()
  .sort((a, b) => {
    const result = a.term.localeCompare(b.term, 'ru')
    return sortDirection.value === 'asc' ? result : -result
  }))

const requestedTerm = typeof route.query.term === 'string' ? route.query.term : ''
const activeId = ref(LORE_GLOSSARY_BY_ID[requestedTerm] ? requestedTerm : '')
const selected = computed(() => (
  filteredTerms.value.find(term => term.id === activeId.value)
  || filteredTerms.value[0]
  || null
))
const selectedSource = computed(() => sourceFor(selected.value))
const selectedSources = computed(() => sourcesFor(selected.value))
const selectedAttribution = computed(() => selected.value?.attributedTo || selectedSource.value?.attributedTo)
const relatedTerms = computed(() => (selected.value?.related || [])
  .map(id => LORE_GLOSSARY_BY_ID[id])
  .filter(Boolean))
// Позиция в текущей выборке, а не в полном своде: на телефоне карточки
// листаются смахиванием, и счётчик показывает, где читатель находится.
const selectedNumber = computed(() => {
  const index = filteredTerms.value.findIndex(term => term.id === selected.value?.id)
  return index < 0 ? '—' : `${index + 1} / ${filteredTerms.value.length}`
})

// Полное досье: народы, пантеон, фракции. Глоссарий показывает его целиком —
// он опорная точка термина, а не отсылка «читайте в другом разделе».
const dossierIndex = new Map()
for (const dossier of LORE_DOSSIERS) {
  const key = loreMatchKey(dossier.title)
  if (key && !dossierIndex.has(key)) dossierIndex.set(key, dossier)
}

const selectedDossier = computed(() => {
  const term = selected.value
  if (!term) return null
  for (const name of [term.term, ...(term.aliases || [])]) {
    const hit = dossierIndex.get(loreMatchKey(name))
    if (hit) return hit
  }
  return null
})

// Проза народов лежит в Markdown, поэтому подгружается по маршруту досье.
const dossierContentPath = computed(() => selectedDossier.value?.contentPath || '')
const { data: dossierDocument } = await useAsyncData(
  'lore-glossary-dossier',
  () => (dossierContentPath.value
    ? queryCollection('dnd5eRaces').path(dossierContentPath.value).first()
    : Promise.resolve(null)),
  { watch: [dossierContentPath] },
)

function minimarkText(node) {
  if (typeof node === 'string') return node
  if (!Array.isArray(node)) return ''
  return node.slice(2).map(minimarkText).join('')
}

// Блоки досье в одном виде, независимо от того, пришли они из Markdown или из
// модулей пантеона и фракций.
const dossierBlocks = computed(() => {
  const dossier = selectedDossier.value
  if (!dossier) return []

  if (dossier.contentPath) {
    const nodes = dossierDocument.value?.body?.value
    if (!Array.isArray(nodes)) return []
    const blocks = []
    for (const node of nodes) {
      if (!Array.isArray(node)) continue
      const text = minimarkText(node).trim()
      if (!text) continue
      if (/^h[2-4]$/.test(node[0])) blocks.push({ type: 'heading', text })
      else if (node[0] === 'p') blocks.push({ type: 'paragraph', text })
      else if (node[0] === 'blockquote') blocks.push({ type: 'quote', text })
    }
    return blocks
  }

  const blocks = []
  for (const block of dossier.blocks || []) {
    if (block.type === 'prose') {
      for (const paragraph of block.paragraphs || []) blocks.push({ type: 'paragraph', text: paragraph })
    } else if (block.type === 'heading') {
      blocks.push({ type: 'heading', text: block.text || block.title || '' })
    } else if (block.type === 'list') {
      blocks.push({ type: 'list', items: block.items || [] })
    } else if (block.type === 'facts') {
      blocks.push({ type: 'facts', items: block.items || [] })
    }
  }
  return blocks
})

// Атрибуты делятся надвое. Устойчивые — облик, нрав, путь — это портрет, и
// читаются они прозой: номер главы у каждой строки там только мешает.
// Событийные живут во времени, и глава для них — главное.
const PORTRAIT_FACETS = ['appearance', 'character', 'biography', 'ways', 'lands', 'properties', 'worship', 'artifacts']
const PORTRAIT_TITLES = {
  characters: { appearance: 'Облик', character: 'Нрав', biography: 'Путь' },
}

const portraitFacets = computed(() => {
  const ogni = selected.value?.ogni
  if (!ogni) return []
  const titles = PORTRAIT_TITLES[selected.value.category] || {}
  return ogni.facets
    .filter(facet => PORTRAIT_FACETS.includes(facet.id))
    .map(facet => ({ ...facet, label: titles[facet.id] || facet.label }))
})

const recordFacets = computed(() => {
  const ogni = selected.value?.ogni
  if (!ogni) return []
  // «Кто это» у персонажа повторяет строку роли под именем — не дублируем.
  const skip = new Set([...PORTRAIT_FACETS, ...(selected.value.category === 'characters' ? ['nature'] : [])])
  return ogni.facets.filter(facet => !skip.has(facet.id))
})

// Роль персонажа — подпись под именем, а не отдельный блок.
const selectedRole = computed(() => {
  const profile = selected.value?.ogni?.profile
  if (!profile?.role) return ''
  return profile.role.split(/[;,]/).map(part => part.trim()).filter(Boolean).join(' · ')
})

// Буквица на две строки требует минимум трёх строк текста — иначе ей не к чему
// прижиматься и она повисает под абзацем. Медиана толкований здесь 114 знаков,
// поэтому у коротких статей вместо буквицы поднятая литера на одной строке.
const DROPCAP_MIN = 170
const dropcapMode = computed(() => (
  (selected.value?.definition?.length || 0) >= DROPCAP_MIN ? 'drop' : 'versal'
))

// Сводка под именем нужна, только если добавляет что-то к строке роли:
// «Сар худдулин и паладин Истинного» после «САР ХУДДУЛИН · ПАЛАДИН ИСТИННОГО» —
// это повтор, а «Морхор и плут Огней» уже говорит, с кем он идёт.
const showLead = computed(() => {
  if (!portraitFacets.value.length) return false
  if (!selectedRole.value) return true
  const words = value => normalize(value).replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ')
  const role = words(selectedRole.value).join(' ')
  return words(selected.value.definition)
    .filter(word => word.length > 3)
    .some(word => !role.includes(word))
})

// Тридцать два номера подряд ничего не сообщают. Диапазон сообщает.
const chapterSpan = computed(() => {
  const chapters = selected.value?.ogni?.chapters || []
  if (!chapters.length) return null
  const first = chapters[0]
  const last = chapters[chapters.length - 1]
  if (chapters.length === 1) return { label: `глава ${first}`, chapter: first }
  if (chapters.length <= 4) return { label: `главы ${chapters.join(', ')}`, chapter: first }
  const solid = last - first + 1 === chapters.length
  return {
    label: solid ? `главы ${first}—${last}` : `${chapters.length} глав, с ${first} по ${last}`,
    chapter: first,
  }
})

// Связь ведёт к статье свода «Огни»: у слитых статей её id — это id архива,
// поэтому ищем и по нему, и по исходному ключу кампании.
const selectedRelations = computed(() => {
  const byOgniId = new Map(glossary.value.filter(term => term.ogniId).map(term => [term.ogniId, term]))
  return (selected.value?.ogni?.relations || [])
    .map(relation => ({ ...relation, target: byOgniId.get(relation.id) || LORE_GLOSSARY_BY_ID[relation.id] }))
    .filter(relation => relation.target)
})

// Главы, где имя звучит в книге, но отдельного свидетельства в справочнике нет:
// честно показываем, что там ещё есть что вычитать.
const mentionsBeyondClaims = computed(() => {
  const ogni = selected.value?.ogni
  if (!ogni?.mentions?.length) return []
  const known = new Set(ogni.chapters)
  return ogni.mentions.filter(chapter => !known.has(chapter))
})

function chapterLink(entrySeason, chapter) {
  return ogniChapterLink(entrySeason, chapter) || '/lore/uzly/ogni'
}

function chapterTitle(entrySeason, chapter) {
  return `Глава ${chapter} — открыть в узле «Огни»`
}

function shortDefinition(text) {
  const sentence = text.match(/^.*?[.!?](?:\s|$)/)?.[0] || text
  return sentence.length > 126 ? `${sentence.slice(0, 123).trim()}…` : sentence
}

function syncQuery() {
  const next = { ...route.query }
  if (query.value.trim()) next.q = query.value.trim()
  else delete next.q
  if (activeCategory.value !== 'all') next.category = activeCategory.value
  else delete next.category
  if (activeSource.value !== 'all') next.source = activeSource.value
  else delete next.source
  if (activeLetter.value !== 'all') next.letter = activeLetter.value
  else delete next.letter
  if (sortDirection.value !== 'asc') next.sort = sortDirection.value
  else delete next.sort
  if (historyOnly.value) next.history = '1'
  else delete next.history
  if (relatedOnly.value) next.related = '1'
  else delete next.related
  if (chapterCut.value) next.chapter = String(chapterCut.value)
  else delete next.chapter
  if (detailVisible.value && selected.value?.id) next.term = selected.value.id
  else delete next.term
  router.replace({ query: next })
}

function chooseTerm(term, openOnMobile = true) {
  if (!term) return
  activeId.value = term.id
  detailVisible.value = true
  mobileDetailOpen.value = openOnMobile
  detailPanel.value?.scrollTo({ top: 0, behavior: 'smooth' })
  syncQuery()
}

function chooseCategory(id) {
  activeCategory.value = id
  activeLetter.value = 'all'
  activeId.value = ''
  detailVisible.value = true
  mobileDetailOpen.value = false
  listPanel.value?.scrollTo({ top: 0, behavior: 'smooth' })
  nextTick(syncQuery)
}

// Термин, кликнутый прямо в тексте статьи.
function openTerm(id) {
  chooseRelated(glossary.value.find(term => term.id === id) || LORE_GLOSSARY_BY_ID[id])
}

function chooseRelated(term) {
  activeCategory.value = 'all'
  activeSource.value = 'all'
  activeLetter.value = 'all'
  chooseTerm(term)
}

function resetFilters() {
  query.value = ''
  activeCategory.value = 'all'
  activeSource.value = 'all'
  activeLetter.value = 'all'
  historyOnly.value = false
  relatedOnly.value = false
  chapterCut.value = 0
  sourceQuery.value = ''
  sortDirection.value = 'asc'
  activeId.value = ''
  nextTick(syncQuery)
}

function setFiltersOpen(value) {
  filtersOpen.value = value
  const next = { ...route.query }
  if (value) next.panel = 'filters'
  else delete next.panel
  router.replace({ query: next })
}

// ——— Смахивание по статьям на телефоне ———
// Карточка открыта поверх списка, поэтому горизонтальный жест ведёт к соседнему
// понятию текущей выборки: со всеми фильтрами, поиском и срезом по главам.
// Возврат к списку остаётся кнопкой — иначе жест значил бы сразу две вещи.
const SWIPE_START = 8
const SWIPE_TRIGGER = 64
const isNarrow = ref(false)
const swipeShift = ref(0)
const swiping = ref(false)
let swipeQuery
let swipeOrigin = null

function currentIndex() {
  return filteredTerms.value.findIndex(term => term.id === selected.value?.id)
}

function stepTerm(delta) {
  const list = filteredTerms.value
  if (!list.length) return false
  const index = currentIndex()
  const next = list[Math.min(list.length - 1, Math.max(0, (index < 0 ? 0 : index) + delta))]
  if (!next || next.id === selected.value?.id) return false
  chooseTerm(next)
  detailPanel.value?.scrollTo({ top: 0 })
  return true
}

function onSwipeStart(event) {
  if (!isNarrow.value || !mobileDetailOpen.value || event.touches.length !== 1) return
  const touch = event.touches[0]
  swipeOrigin = { x: touch.clientX, y: touch.clientY, axis: null }
}

function onSwipeMove(event) {
  if (!swipeOrigin || event.touches.length !== 1) return
  const touch = event.touches[0]
  const dx = touch.clientX - swipeOrigin.x
  const dy = touch.clientY - swipeOrigin.y

  if (!swipeOrigin.axis) {
    if (Math.abs(dx) < SWIPE_START && Math.abs(dy) < SWIPE_START) return
    // Вертикаль важнее: чтение длинной статьи не должно спотыкаться о жест.
    swipeOrigin.axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y'
    swiping.value = swipeOrigin.axis === 'x'
  }
  if (swipeOrigin.axis !== 'x') return
  if (event.cancelable) event.preventDefault()

  // На краях выборки карточка пружинит, а не уезжает в пустоту.
  const index = currentIndex()
  const atEdge = (dx < 0 && index >= filteredTerms.value.length - 1) || (dx > 0 && index <= 0)
  swipeShift.value = dx * (atEdge ? 0.14 : 0.4)
}

function onSwipeEnd() {
  if (swipeOrigin?.axis === 'x') {
    if (swipeShift.value <= -SWIPE_TRIGGER) stepTerm(1)
    else if (swipeShift.value >= SWIPE_TRIGGER) stepTerm(-1)
  }
  swipeOrigin = null
  swiping.value = false
  swipeShift.value = 0
}

onMounted(() => {
  swipeQuery = window.matchMedia('(max-width: 720px)')
  isNarrow.value = swipeQuery.matches
  const sync = event => { isNarrow.value = event.matches }
  swipeQuery.addEventListener('change', sync)
  onBeforeUnmount(() => swipeQuery.removeEventListener('change', sync))
})

function notifyAction(message) {
  actionMessage.value = message
  window.clearTimeout(actionTimer)
  actionTimer = window.setTimeout(() => { actionMessage.value = '' }, 2200)
}

function toggleExpand() {
  detailExpanded.value = !detailExpanded.value
  nextTick(() => detailPanel.value?.scrollTo({ top: 0, behavior: 'smooth' }))
}

function closeDetail() {
  detailExpanded.value = false
  mobileDetailOpen.value = false
  detailVisible.value = false
  activeId.value = ''
  syncQuery()
}

async function shareSelected() {
  if (!selected.value) return
  const url = new URL(window.location.href)
  url.searchParams.set('term', selected.value.id)
  const shareData = {
    title: `${selected.value.term} — Глоссарий Эноа`,
    text: selected.value.definition,
    url: url.toString(),
  }
  try {
    if (navigator.share) {
      await navigator.share(shareData)
      notifyAction('Ссылка отправлена')
    } else {
      await navigator.clipboard.writeText(shareData.url)
      notifyAction('Ссылка скопирована')
    }
  } catch (error) {
    if (error?.name !== 'AbortError') notifyAction('Не удалось поделиться')
  }
}

function printSelected() {
  if (!selected.value) return
  window.print()
}

function handleKeydown(event) {
  if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
    event.preventDefault()
    searchInput.value?.focus()
    return
  }
  if (event.key === 'Escape') {
    if (detailExpanded.value) detailExpanded.value = false
    else if (filtersOpen.value) setFiltersOpen(false)
    else if (mobileDetailOpen.value) mobileDetailOpen.value = false
    else return
    return
  }
  if (!['ArrowUp', 'ArrowDown'].includes(event.key) || ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return
  if (!filteredTerms.value.length) return
  event.preventDefault()
  const current = Math.max(0, filteredTerms.value.findIndex(term => term.id === selected.value?.id))
  const direction = event.key === 'ArrowDown' ? 1 : -1
  const next = filteredTerms.value[Math.min(filteredTerms.value.length - 1, Math.max(0, current + direction))]
  chooseTerm(next, false)
  nextTick(() => document.querySelector(`[data-term-id="${next.id}"]`)?.scrollIntoView({ block: 'nearest' }))
}

watch([query, activeSource, activeLetter, sortDirection, historyOnly, relatedOnly, chapterCut], () => {
  if (!filteredTerms.value.some(term => term.id === activeId.value)) activeId.value = ''
  syncQuery()
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.clearTimeout(actionTimer)
})
</script>

<template>
  <main class="lore-glossary" :class="{ 'detail-expanded': detailExpanded, 'filters-active': filtersOpen }">
    <div class="glossary-texture" aria-hidden="true" />

    <aside class="category-rail" aria-label="Категории глоссария">
      <header>
        <span>Архив понятий</span>
        <strong>Категории</strong>
      </header>
      <nav>
        <button :class="{ active: activeCategory === 'all' }" type="button" @click="chooseCategory('all')">
          <i /><span><b>Все понятия</b><small>Полный свод мира</small></span><em>{{ glossary.length }}</em>
        </button>
        <button
          v-for="category in LORE_GLOSSARY_CATEGORIES"
          :key="category.id"
          :class="{ active: activeCategory === category.id }"
          type="button"
          @click="chooseCategory(category.id)"
        >
          <i /><span><b>{{ category.title }}</b><small>{{ category.short }}</small></span><em>{{ categoryCounts[category.id] }}</em>
        </button>
      </nav>
      <footer>
        <span>Источники свода</span>
        <b>Башня Мафраш · Огни</b>
        <small>{{ sourceCounts['threads-of-unseen'] }} + {{ sourceCounts.ogni }} записей</small>
      </footer>
    </aside>

    <section class="glossary-layout">
      <header class="index-heading">
        <p>LORE · Справочник мира Эноа</p>
        <h1>Глоссарий</h1>
        <span>{{ filteredTerms.length }} из {{ glossary.length }} записей</span>
      </header>

      <div class="thread-column">
        <button class="main-sigil" type="button" title="Вернуться в раздел Lore" aria-label="Вернуться в раздел Lore" @click="navigateTo('/lore')">
          <img src="/assets/nodes/glossary-lore.webp" width="512" height="512" alt="Символ глоссария Эноа">
        </button>
        <div class="central-thread" aria-hidden="true"><i /><i /><i /><i /></div>
        <div class="current-knot" aria-hidden="true"><i /></div>
      </div>

      <header class="detail-heading">
        <span>Запись архива</span>
        <p><i /> Выберите понятие слева, чтобы прочитать полное толкование</p>
      </header>

      <section class="index-panel" aria-label="Перечень терминов">
        <div class="search-toolbar">
          <div class="search-field">
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
            <span>
              <small>Поиск по архиву</small>
              <input ref="searchInput" v-model="query" aria-label="Найти термин или описание" type="search" placeholder="Название, описание, источник…" />
            </span>
            <button v-if="query" type="button" aria-label="Очистить поиск" title="Очистить поиск" @click="query = ''">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" /></svg>
            </button>
            <kbd>/</kbd>
          </div>
          <button
            class="filter-toggle"
            :class="{ active: filtersOpen || activeFilterCount }"
            type="button"
            :aria-expanded="filtersOpen"
            aria-controls="glossary-filters"
            aria-label="Открыть фильтры"
            title="Фильтры"
            @click="setFiltersOpen(!filtersOpen)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M14 5v4M4 17h2M10 17h10M8 15v4M4 12h5M13 12h7M11 10v4" /></svg>
            <span class="filter-toggle-label">Фильтр</span>
            <em v-if="activeFilterCount">{{ activeFilterCount }}</em>
          </button>
        </div>

        <Transition name="filter-popover">
          <section v-if="filtersOpen" id="glossary-filters" class="filters-panel" role="region" aria-labelledby="glossary-filter-title">
            <header>
              <div class="filter-title-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M14 5v4M4 17h2M10 17h10M8 15v4M4 12h5M13 12h7M11 10v4" /></svg></div>
              <div><span>Рабочее пространство</span><b id="glossary-filter-title">Фильтрация архива</b></div>
              <em>{{ filteredTerms.length }} найдено</em>
              <button type="button" aria-label="Закрыть фильтры" @click="setFiltersOpen(false)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
            </header>

            <div class="filters-scroll">
              <div class="filter-section category-filter">
                <div class="filter-section-title"><span><i>01</i> Выберите категорию</span><small>{{ activeCategory === 'all' ? 'Все разделы' : categoryMap[activeCategory]?.title }}</small></div>
                <div class="category-options">
                  <button :class="{ active: activeCategory === 'all' }" type="button" @click="chooseCategory('all')">
                    <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></svg></i><span><b>Все понятия</b><small>Весь архив</small></span><em>{{ glossary.length }}</em>
                  </button>
                  <button v-for="category in LORE_GLOSSARY_CATEGORIES" :key="category.id" :class="{ active: activeCategory === category.id }" type="button" @click="chooseCategory(category.id)">
                    <i><span /></i><span><b>{{ category.title }}</b><small>{{ category.short }}</small></span><em>{{ categoryCounts[category.id] }}</em>
                  </button>
                </div>
              </div>

              <label class="source-search">
                <span><i>02</i> Найдите источник</span>
                <div><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg><input v-model="sourceQuery" type="search" placeholder="Название, автор или метка" /></div>
              </label>

              <div class="filter-section source-filter">
                <div class="filter-section-title"><span>Доступные источники</span><small>Происхождение сведений</small></div>
                <div class="source-options">
                  <button :class="{ active: activeSource === 'all' }" type="button" @click="activeSource = 'all'">
                    <i /> <span><b>Все источники</b><small>{{ glossary.length }} записей</small></span>
                  </button>
                  <button v-for="source in filteredSourceOptions" :key="source.id" :class="{ active: activeSource === source.id }" type="button" @click="activeSource = source.id">
                    <i /> <span><b>{{ source.title }}</b><small>{{ source.attributedTo }} · {{ sourceCounts[source.id] }}</small></span><em>{{ source.mark }}</em>
                  </button>
                  <p v-if="!filteredSourceOptions.length">Источники не найдены</p>
                </div>
              </div>

              <div class="filter-section letter-filter">
                <div class="filter-section-title"><span><i>03</i> Первая буква</span><small>Алфавитный указатель</small></div>
                <div class="letter-options">
                  <button :class="{ active: activeLetter === 'all' }" type="button" @click="activeLetter = 'all'">Все</button>
                  <button v-for="letter in alphabet" :key="letter" :class="{ active: activeLetter === letter }" type="button" @click="activeLetter = letter">{{ letter }}</button>
                </div>
              </div>

              <div v-if="season" class="filter-section chapter-filter">
                <div class="filter-section-title">
                  <span><i>04</i> Прогресс по сезону</span>
                  <small>{{ chapterCut ? `Открыто до главы ${chapterCut}` : 'Весь сезон открыт' }}</small>
                </div>
                <p class="chapter-hint">Свод «Огни» не покажет того, чего вы ещё не прочли.</p>
                <div class="chapter-slider">
                  <input
                    v-model.number="chapterSlider"
                    type="range"
                    min="1"
                    :max="chapterMax"
                    step="1"
                    :aria-label="`Открыто до главы ${chapterCut || chapterMax}`"
                  />
                  <div class="chapter-scale">
                    <b>{{ chapterCut || chapterMax }}</b>
                    <span>из {{ chapterMax }} глав</span>
                    <button type="button" :disabled="!chapterCut" @click="chapterCut = 0">Весь сезон</button>
                  </div>
                </div>
              </div>

              <div class="filter-section-title filter-options-title"><span><i>05</i> Дополнительные условия</span><small>Необязательно</small></div>
              <div class="filter-switches">
                <button :class="{ active: historyOnly }" type="button" :aria-pressed="historyOnly" @click="historyOnly = !historyOnly"><i><span /></i><span><b>Нить истории</b><small>Только упомянутые в летописи</small></span></button>
                <button :class="{ active: relatedOnly }" type="button" :aria-pressed="relatedOnly" @click="relatedOnly = !relatedOnly"><i><span /></i><span><b>Связанные понятия</b><small>Только записи со связями</small></span></button>
              </div>
            </div>

            <footer>
              <button class="sort-control" type="button" @click="sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M5 8l3-3 3 3M16 19V5M13 16l3 3 3-3" /></svg>{{ sortDirection === 'asc' ? 'А—Я' : 'Я—А' }}</button>
              <button class="reset-control" type="button" @click="resetFilters">Сбросить</button>
              <button class="apply-control" type="button" @click="setFiltersOpen(false)">Показать {{ filteredTerms.length }}</button>
            </footer>
          </section>
        </Transition>

        <div class="mobile-categories" aria-label="Категории">
          <button :class="{ active: activeCategory === 'all' }" type="button" @click="chooseCategory('all')">Все</button>
          <button v-for="category in LORE_GLOSSARY_CATEGORIES" :key="category.id" :class="{ active: activeCategory === category.id }" type="button" @click="chooseCategory(category.id)">{{ category.title }}</button>
        </div>

        <div class="results-bar">
          <span>{{ categoryMap[activeCategory]?.title || 'Все понятия' }}</span>
          <em v-if="chapterCut" class="chapter-badge">до главы {{ chapterCut }}</em>
          <button v-if="query || activeFilterCount" type="button" @click="resetFilters">Сбросить</button>
        </div>

        <div ref="listPanel" class="term-list">
          <button
            v-for="term in filteredTerms"
            :key="term.id"
            :data-term-id="term.id"
            :class="{ active: selected?.id === term.id }"
            type="button"
            @click="chooseTerm(term)"
          >
            <i class="list-knot" />
            <span>
              <small>{{ categoryMap[term.category]?.title }} · {{ sourcesFor(term).map(item => item.mark).join(' + ') }}</small>
              <b>{{ term.term }}</b>
              <em>{{ shortDefinition(term.definition) }}</em>
            </span>
            <i class="list-arrow">→</i>
          </button>

          <div v-if="!filteredTerms.length" class="empty-state">
            <span>◇</span><b>Нить не найдена</b>
            <p>Измените условия фильтра или вернитесь к полному списку.</p>
            <button type="button" @click="resetFilters">Сбросить фильтры</button>
          </div>
        </div>
      </section>

      <article
        ref="detailPanel"
        class="detail-panel"
        :class="{ 'mobile-open': mobileDetailOpen, 'is-swiping': swiping }"
        :style="{ '--swipe-shift': `${swipeShift}px` }"
        aria-live="polite"
        @touchstart.passive="onSwipeStart"
        @touchmove="onSwipeMove"
        @touchend="onSwipeEnd"
        @touchcancel="onSwipeEnd"
      >
        <button class="mobile-close" type="button" @click="mobileDetailOpen = false">← К списку понятий</button>
        <div v-if="selected && detailVisible" class="detail-actions" aria-label="Действия с карточкой">
          <span v-if="actionMessage" class="action-message">{{ actionMessage }}</span>
          <button type="button" :title="detailExpanded ? 'Свернуть' : 'Развернуть на весь экран'" :aria-label="detailExpanded ? 'Свернуть карточку' : 'Развернуть карточку на весь экран'" @click="toggleExpand">
            <svg v-if="!detailExpanded" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" /></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" /></svg>
          </button>
          <button type="button" title="Поделиться" aria-label="Поделиться термином" @click="shareSelected"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" /></svg></button>
          <button type="button" title="Напечатать" aria-label="Напечатать карточку" @click="printSelected"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9V3h10v6M7 17H4V9h16v8h-3M7 14h10v7H7z" /><path d="M17 12h.01" /></svg></button>
          <button type="button" title="Закрыть" aria-label="Закрыть карточку" @click="closeDetail"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg></button>
        </div>
        <template v-if="selected && detailVisible">
          <div class="detail-meta">
            <span>{{ categoryMap[selected.category]?.title }}</span>
            <em>{{ selectedNumber }}</em>
          </div>
          <h2>{{ selected.term }}</h2>
          <p v-if="selectedRole" class="detail-role">{{ selectedRole }}</p>
          <p v-if="selected.aliases?.length" class="aliases">Также: {{ selected.aliases.join(' · ') }}</p>
          <div class="detail-divider"><i /></div>
          <p v-if="showLead" class="definition definition-lead"><LoreRichText :text="selected.definition" :skip-id="selected.id" @term="openTerm" /></p>
          <p v-else-if="!portraitFacets.length" class="definition"><span :class="dropcapMode === 'drop' ? 'definition-dropcap' : 'definition-versal'">{{ selected.definition.slice(0, 1) }}</span><LoreRichText :text="selected.definition.slice(1)" :skip-id="selected.id" @term="openTerm" /></p>


          <section v-if="selectedDossier" class="dossier-block">
            <header>
              <span>{{ selectedDossier.kindLabel }}<template v-if="selectedDossier.parent"> · {{ selectedDossier.parent }}</template></span>
              <NuxtLink :to="selectedDossier.route" title="Открыть досье в его разделе">Открыть в разделе ↗</NuxtLink>
            </header>
            <template v-for="(block, index) in dossierBlocks" :key="index">
              <h3 v-if="block.type === 'heading'">{{ block.text }}</h3>
              <blockquote v-else-if="block.type === 'quote'"><LoreRichText :text="block.text" :skip-id="selected.id" @term="openTerm" /></blockquote>
              <ul v-else-if="block.type === 'list'">
                <li v-for="(item, itemIndex) in block.items" :key="itemIndex"><LoreRichText :text="item" :skip-id="selected.id" @term="openTerm" /></li>
              </ul>
              <dl v-else-if="block.type === 'facts'" class="dossier-facts">
                <div v-for="(item, itemIndex) in block.items" :key="itemIndex">
                  <dt>{{ item.label }}</dt><dd><LoreRichText :text="item.value" :skip-id="selected.id" @term="openTerm" /></dd>
                </div>
              </dl>
              <p v-else><LoreRichText :text="block.text" :skip-id="selected.id" @term="openTerm" /></p>
            </template>
          </section>

          <section v-if="selected.ogni" class="ogni-block">
            <header>
              <span>Свод «Огни» · сезон {{ selected.ogni.season }}</span>
              <NuxtLink
                v-if="chapterSpan"
                class="ogni-span"
                :to="chapterLink(selected.ogni.season, chapterSpan.chapter)"
                :title="chapterTitle(selected.ogni.season, chapterSpan.chapter)"
              >{{ chapterSpan.label }}</NuxtLink>
            </header>

            <section v-for="facet in portraitFacets" :key="facet.id" class="ogni-portrait">
              <h3>{{ facet.label }}</h3>
              <p v-for="(item, index) in facet.items" :key="index"><LoreRichText :text="item.text" :skip-id="selected.id" @term="openTerm" /></p>
            </section>

            <section v-for="facet in recordFacets" :key="facet.id" class="ogni-facet">
              <h3>{{ facet.label }}<em>{{ facet.items.length }}</em></h3>
              <ul>
                <li v-for="(item, index) in facet.items" :key="index" :data-status="item.status">
                  <p><LoreRichText :text="item.text" :skip-id="selected.id" @term="openTerm" /></p>
                  <div>
                    <span>{{ item.statusLabel }}</span>
                    <NuxtLink
                      v-if="item.chapter"
                      :to="chapterLink(item.season, item.chapter)"
                      :title="chapterTitle(item.season, item.chapter)"
                    >гл. {{ item.chapter }}</NuxtLink>
                  </div>
                </li>
              </ul>
            </section>

            <section v-if="selectedRelations.length" class="ogni-relations">
              <h3>С кем и чем связано</h3>
              <div>
                <button
                  v-for="relation in selectedRelations"
                  :key="relation.id"
                  type="button"
                  :title="relation.chapter ? `Впервые вместе в главе ${relation.chapter}` : 'Связь без указания главы'"
                  @click="chooseRelated(relation.target)"
                >
                  <i />{{ loreDisplayTerm(relation.term) }}<em v-if="relation.chapter">{{ relation.chapter }}</em>
                </button>
              </div>
            </section>

            <p v-if="mentionsBeyondClaims.length" class="ogni-cut">
              Имя встречается в книге ещё в главах {{ mentionsBeyondClaims.join(', ') }} — там о нём говорят,
              но отдельных сведений в справочник пока не записано.
            </p>
            <p v-if="selected.ogni.withheld" class="ogni-cut">
              Ещё {{ selected.ogni.withheld }} свидетельств откроется дальше по сезону.
            </p>
            <p v-else-if="!selected.ogni.facets.length" class="ogni-cut">
              Сущность упомянута в сезоне, но отдельных сведений о ней пока не записано.
            </p>
          </section>

          <dl class="provenance">
            <div v-for="source in selectedSources" :key="source.id">
              <dt>{{ source.id === 'ogni' ? 'Свидетельство кампании' : 'Источник Нити' }}</dt>
              <dd><b><span>{{ source.mark }}</span></b>{{ source.title }}</dd>
              <p>{{ source.id === 'ogni' ? source.attributedTo : selectedAttribution }}</p>
            </div>
          </dl>

          <NuxtLink v-if="selected.history" class="history-link" :to="`/lore/history/${selected.history}`">
            <span>В Нити Башни Мафраш</span>
            <b>{{ HISTORY_LABELS[selected.history] || 'Открыть летопись' }}</b>
            <i>↗</i>
          </NuxtLink>

          <section v-if="relatedTerms.length" class="related-block">
            <span>Связанные понятия</span>
            <div>
              <button v-for="term in relatedTerms" :key="term.id" type="button" @click="chooseRelated(term)"><i />{{ term.term }}</button>
            </div>
          </section>
        </template>
        <div v-else class="detail-empty">
          <i />
          <span>Запись архива закрыта</span>
          <b>Выберите понятие слева</b>
          <p>Карточка откроется здесь и продолжит центральную нить.</p>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.lore-glossary{--gold:#d6aa60;--gold-bright:#f4e0aa;--thread-x:calc(50vw - 68px);position:absolute;inset:0 0 0 68px;z-index:58;overflow:hidden;color:rgba(var(--theme-text-rgb),.9);background:radial-gradient(ellipse 50% 42% at 51% 0,rgba(18,20,29,.88),#07080d 68%,#040406);isolation:isolate;font-family:'Hanken Grotesk',sans-serif}
.glossary-texture{position:absolute;inset:0;z-index:-1;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.01) 0 1px,transparent 1px 4px);opacity:.7}
.category-rail{position:absolute;z-index:5;top:18px;bottom:18px;left:calc(var(--thread-x) - 596px);width:158px;display:flex;flex-direction:column;border:1px solid rgba(var(--theme-contrast-rgb),.12);background:linear-gradient(180deg,rgba(6,7,11,.95),rgba(5,6,9,.88));box-shadow:18px 0 40px rgba(0,0,0,.16);overflow:hidden}.category-rail::before,.category-rail::after{content:'';position:absolute;width:43px;height:43px;pointer-events:none}.category-rail::before{top:9px;left:9px;border-top:1px solid rgba(var(--theme-accent-rgb),.34);border-left:1px solid rgba(var(--theme-accent-rgb),.34)}.category-rail::after{right:9px;bottom:9px;border-right:1px solid rgba(var(--theme-accent-rgb),.22);border-bottom:1px solid rgba(var(--theme-accent-rgb),.22)}
.category-rail header{padding:20px 14px 18px;border-bottom:1px solid rgba(var(--theme-contrast-rgb),.08)}.category-rail header span,.category-rail footer>span{display:block;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.24em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.3)}.category-rail header strong{display:block;margin-top:13px;font:600 18px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.78)}
.category-rail nav{position:relative;flex:1;padding:4px 12px;overflow-y:auto;scrollbar-width:none}.category-rail nav::before{content:'';position:absolute;top:22px;bottom:22px;left:17px;width:1px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.4) 8%,rgba(var(--theme-accent-rgb),.14) 92%,transparent)}.category-rail nav button{position:relative;display:grid;width:100%;grid-template-columns:11px minmax(0,1fr) auto;gap:7px;align-items:start;border:0;background:none;padding:13px 0;color:rgba(var(--theme-text-rgb),.34);text-align:left;cursor:pointer;transition:color .2s}.category-rail nav button:hover,.category-rail nav button.active{color:rgba(var(--theme-heading-rgb),.88)}.category-rail nav button>i{position:relative;z-index:1;width:7px;height:7px;margin-top:3px;border:1px solid rgba(var(--theme-accent-rgb),.44);background:#07080d;transform:rotate(45deg)}.category-rail nav button.active>i{border-color:var(--gold-bright);background:var(--gold-bright);box-shadow:0 0 11px rgba(244,224,170,.48)}.category-rail nav b{display:block;font:600 11px/1.16 'Cormorant Garamond',serif}.category-rail nav small{display:none}.category-rail nav em{font:600 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.4);font-style:normal}.category-rail footer{margin:0 13px 13px;padding:16px 2px 7px;border-top:1px solid rgba(var(--theme-accent-rgb),.14)}.category-rail footer b{display:block;margin-top:8px;font:italic 13px/1.12 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.62)}.category-rail footer small{display:block;margin-top:8px;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.15em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.54)}
.glossary-layout{position:absolute;top:30px;right:28px;bottom:30px;left:calc(var(--thread-x) - 432px);display:grid;grid-template-columns:380px 104px minmax(420px,1fr);grid-template-rows:168px minmax(0,1fr);min-width:0}
.index-heading{grid-column:1;grid-row:1;align-self:center;padding-right:16px;box-sizing:border-box;text-align:right}.index-heading p,.detail-heading>span{margin:0;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}.index-heading h1{margin:8px 0 7px;font:600 clamp(43px,4.3vw,62px)/.88 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.97)}.index-heading>span{font:italic 12px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.38)}
.thread-column{position:relative;z-index:3;grid-column:2;grid-row:1/3;min-width:0}.main-sigil{position:absolute;z-index:3;top:6px;left:50%;display:grid;width:112px;height:112px;place-items:center;border:0;outline:0;background:none;padding:0;color:inherit;cursor:pointer;transform:translateX(-50%);transition:transform .25s,filter .25s;isolation:isolate}.main-sigil:hover{filter:brightness(1.18);transform:translateX(-50%) scale(1.045)}.main-sigil:focus-visible{filter:brightness(1.2);transform:translateX(-50%) scale(1.045)}.main-sigil:focus-visible::before{border-color:var(--gold-bright);box-shadow:0 0 0 6px rgba(5,6,10,.78),0 0 28px rgba(var(--theme-accent-rgb),.32)}.main-sigil::before{content:'';position:absolute;z-index:-1;inset:14px;border:1px solid rgba(var(--theme-accent-rgb),.36);background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.14),#08090e 66%);box-shadow:0 0 0 6px rgba(5,6,10,.78),0 0 28px rgba(var(--theme-accent-rgb),.14);transform:rotate(45deg)}.main-sigil img{width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 0 9px rgba(var(--theme-accent-rgb),.3));animation:sigilGlow 6s ease-in-out infinite}.central-thread{position:absolute;top:108px;bottom:0;left:50%;width:16px;transform:translateX(-50%)}.central-thread i{position:absolute;top:0;bottom:0;left:50%}.central-thread i:nth-child(1){width:2px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.52) 4%,rgba(var(--theme-accent-strong-rgb),.72) 48%,rgba(var(--theme-accent-rgb),.4));box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.22);transform:translateX(-50%)}.central-thread i:nth-child(2){width:7px;background:rgba(var(--theme-accent-rgb),.16);filter:blur(5px);transform:translateX(-50%)}.central-thread i:nth-child(3),.central-thread i:nth-child(4){width:1px;background:repeating-linear-gradient(to bottom,rgba(var(--theme-accent-strong-rgb),.75) 0 6px,transparent 6px 13px);animation:weaveY 9s linear infinite}.central-thread i:nth-child(3){margin-left:-4px}.central-thread i:nth-child(4){margin-left:4px;animation-direction:reverse;animation-duration:13s}.current-knot{position:absolute;top:48%;left:0;width:100%;height:28px}.current-knot::before,.current-knot::after{content:'';position:absolute;top:50%;width:50%;height:1px}.current-knot::before{right:50%;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.42))}.current-knot::after{left:50%;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.42),transparent)}.current-knot i{position:absolute;z-index:2;top:50%;left:50%;width:15px;height:15px;border:1px solid var(--gold-bright);background:var(--gold-bright);box-shadow:0 0 0 5px rgba(5,6,10,.85),0 0 18px rgba(244,224,170,.42);transform:translate(-50%,-50%) rotate(45deg)}
.detail-heading{grid-column:3;grid-row:1;align-self:center;padding-left:8px}.detail-heading p{display:flex;max-width:430px;align-items:center;gap:10px;margin:14px 0 0;font:italic 13px/1.4 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.4)}.detail-heading p i{flex:none;width:7px;height:7px;border:1px solid rgba(var(--theme-accent-rgb),.55);transform:rotate(45deg)}
.index-panel{position:relative;grid-column:1;grid-row:2;display:flex;min-width:0;min-height:0;flex-direction:column;border:1px solid rgba(var(--theme-accent-rgb),.16);background:linear-gradient(145deg,rgba(13,14,21,.92),rgba(7,8,13,.88));box-shadow:0 20px 44px rgba(0,0,0,.18)}
.search-toolbar{display:grid;flex:none;grid-template-columns:minmax(0,1fr) 42px;gap:7px;margin:18px 18px 10px}.search-field{display:flex;min-width:0;height:42px;align-items:center;border:1px solid rgba(var(--theme-accent-rgb),.24);background:rgba(3,4,7,.5);padding:0 12px;box-sizing:border-box}.search-field:focus-within{border-color:rgba(var(--theme-accent-strong-rgb),.55);box-shadow:0 0 20px rgba(var(--theme-accent-rgb),.06)}.search-field>i{width:7px;height:7px;margin-right:11px;border:1px solid rgba(var(--theme-accent-rgb),.56);transform:rotate(45deg)}.search-field input{min-width:0;flex:1;border:0;outline:0;background:none;color:rgba(var(--theme-heading-rgb),.78);font:500 9px/1 'Hanken Grotesk',sans-serif}.search-field input::placeholder{color:rgba(var(--theme-text-rgb),.28)}.search-field kbd{border:1px solid rgba(var(--theme-contrast-rgb),.11);padding:3px 6px;color:rgba(var(--theme-text-rgb),.28);font:500 7px/1 'Hanken Grotesk',sans-serif}.filter-toggle{position:relative;display:grid;width:42px;height:42px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.22);background:rgba(3,4,7,.55);color:rgba(var(--theme-text-rgb),.46);cursor:pointer;transition:border-color .2s,color .2s,background .2s}.filter-toggle:hover,.filter-toggle.active{border-color:rgba(var(--theme-accent-strong-rgb),.58);background:rgba(var(--theme-accent-rgb),.07);color:var(--gold-bright)}.filter-toggle svg{width:17px;fill:none;stroke:currentColor;stroke-width:1.35;stroke-linecap:square}.filter-toggle span{position:absolute;top:-6px;right:-6px;display:grid;width:16px;height:16px;place-items:center;border:2px solid #0a0b11;border-radius:50%;background:var(--gold-bright);color:#17130b;font:700 7px/1 'Hanken Grotesk',sans-serif}
.filters-panel{position:absolute;z-index:20;top:70px;right:18px;left:18px;max-height:calc(100% - 88px);overflow-y:auto;border:1px solid rgba(var(--theme-accent-rgb),.31);background:linear-gradient(145deg,rgba(14,15,22,.985),rgba(5,6,10,.985));box-shadow:0 24px 50px rgba(0,0,0,.58);scrollbar-width:thin;scrollbar-color:rgba(var(--theme-accent-rgb),.28) transparent}.filters-panel>header{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(var(--theme-accent-rgb),.1);padding:14px 15px}.filters-panel>header span,.filter-section>span,.source-search>span{display:block;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.52)}.filters-panel>header b{display:block;margin-top:5px;font:600 20px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.85)}.filters-panel>header button{border:0;background:none;color:rgba(var(--theme-text-rgb),.42);font:300 22px/1 sans-serif;cursor:pointer}.source-search{display:block;padding:13px 15px 0}.source-search>div{display:flex;height:35px;align-items:center;margin-top:7px;border:1px solid rgba(var(--theme-accent-rgb),.17);background:rgba(0,0,0,.24);padding:0 10px}.source-search i{width:6px;height:6px;margin-right:9px;border:1px solid rgba(var(--theme-accent-rgb),.5);transform:rotate(45deg)}.source-search input{min-width:0;flex:1;border:0;outline:0;background:none;color:rgba(var(--theme-heading-rgb),.72);font:500 8px/1 'Hanken Grotesk',sans-serif}.filter-section{padding:13px 15px 0}.source-options{display:grid;gap:5px;margin-top:8px}.source-options button{display:grid;grid-template-columns:8px minmax(0,1fr) auto;gap:9px;align-items:center;border:1px solid rgba(var(--theme-accent-rgb),.11);background:rgba(var(--theme-surface-rgb),.18);padding:9px;color:rgba(var(--theme-text-rgb),.44);text-align:left;cursor:pointer}.source-options button:hover,.source-options button.active{border-color:rgba(var(--theme-accent-strong-rgb),.44);color:rgba(var(--theme-heading-rgb),.84)}.source-options button>i{width:6px;height:6px;border:1px solid rgba(var(--theme-accent-rgb),.45);transform:rotate(45deg)}.source-options button.active>i{background:var(--gold-bright);border-color:var(--gold-bright);box-shadow:0 0 8px rgba(244,224,170,.35)}.source-options b{display:block;font:600 11px/1.1 'Cormorant Garamond',serif}.source-options small{display:block;margin-top:3px;font:600 6px/1 'Hanken Grotesk',sans-serif;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.27)}.source-options em{font:600 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.54);font-style:normal}.source-options p{margin:4px 0;color:rgba(var(--theme-text-rgb),.32);font:italic 12px/1.3 'Cormorant Garamond',serif}.letter-options{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px}.letter-options button{min-width:26px;height:25px;border:1px solid rgba(var(--theme-accent-rgb),.11);background:none;color:rgba(var(--theme-text-rgb),.4);font:600 7px/1 'Hanken Grotesk',sans-serif;cursor:pointer}.letter-options button.active,.letter-options button:hover{border-color:rgba(var(--theme-accent-strong-rgb),.48);background:rgba(var(--theme-accent-rgb),.08);color:var(--gold-bright)}.filter-switches{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:13px 15px}.filter-switches button{display:flex;align-items:center;border:1px solid rgba(var(--theme-accent-rgb),.1);background:none;padding:9px;color:rgba(var(--theme-text-rgb),.4);font:600 7px/1.2 'Hanken Grotesk',sans-serif;text-align:left;cursor:pointer}.filter-switches button i{flex:none;width:7px;height:7px;margin-right:8px;border:1px solid rgba(var(--theme-accent-rgb),.4);transform:rotate(45deg)}.filter-switches button.active{border-color:rgba(var(--theme-accent-strong-rgb),.42);color:rgba(var(--theme-heading-rgb),.78)}.filter-switches button.active i{border-color:var(--gold-bright);background:var(--gold-bright);box-shadow:0 0 7px rgba(244,224,170,.3)}.filters-panel>footer{display:flex;justify-content:space-between;border-top:1px solid rgba(var(--theme-accent-rgb),.1);padding:11px 15px}.filters-panel>footer button{border:0;background:none;padding:3px 0;color:rgba(var(--theme-accent-strong-rgb),.62);font:600 7px/1 'Hanken Grotesk',sans-serif;text-transform:uppercase;cursor:pointer}.filters-panel>footer button:last-child{color:rgba(var(--theme-text-rgb),.35)}.filters-panel>footer i{font-style:normal;color:rgba(var(--theme-text-rgb),.3)}
.search-toolbar{grid-template-columns:minmax(0,1fr) 82px;gap:8px;margin:14px 14px 10px}.search-field{position:relative;height:52px;border-color:rgba(var(--theme-accent-rgb),.2);border-radius:2px;background:linear-gradient(135deg,rgba(18,19,28,.82),rgba(5,6,10,.7));padding:0 10px 0 13px;box-shadow:inset 0 1px rgba(var(--theme-contrast-rgb),.025);transition:border-color .2s,box-shadow .2s,background .2s}.search-field::after{content:'';position:absolute;right:0;bottom:-1px;left:0;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-strong-rgb),.5),transparent);opacity:0;transform:scaleX(.6);transition:opacity .2s,transform .2s}.search-field:focus-within{border-color:rgba(var(--theme-accent-strong-rgb),.46);background:linear-gradient(135deg,rgba(21,22,31,.94),rgba(6,7,11,.86));box-shadow:0 10px 30px rgba(0,0,0,.22),0 0 22px rgba(var(--theme-accent-rgb),.055)}.search-field:focus-within::after{opacity:1;transform:scaleX(1)}.search-field .search-icon{flex:none;width:17px;height:17px;margin-right:11px;fill:none;stroke:rgba(var(--theme-accent-strong-rgb),.68);stroke-width:1.35}.search-field>span{display:flex;min-width:0;flex:1;flex-direction:column;gap:4px}.search-field>span small{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.15em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.44)}.search-field>span input{width:100%;font-size:9px}.search-field>button{display:grid;flex:none;width:22px;height:22px;place-items:center;border:0;background:none;color:rgba(var(--theme-text-rgb),.34);cursor:pointer}.search-field>button:hover{color:var(--gold-bright)}.search-field>button svg{width:12px;fill:none;stroke:currentColor;stroke-width:1.4}.search-field kbd{flex:none;margin-left:3px;border-radius:2px}.filter-toggle{display:flex;width:82px;height:52px;align-items:center;justify-content:center;gap:7px;border-color:rgba(var(--theme-accent-rgb),.2);border-radius:2px;background:linear-gradient(135deg,rgba(18,19,28,.82),rgba(5,6,10,.7));box-shadow:inset 0 1px rgba(var(--theme-contrast-rgb),.025)}.filter-toggle svg{width:16px}.filter-toggle .filter-toggle-label{position:static;display:inline;width:auto;height:auto;border:0;border-radius:0;background:none;color:inherit;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.08em;text-transform:uppercase}.filter-toggle em{position:absolute;top:-6px;right:-6px;display:grid;width:17px;height:17px;place-items:center;border:2px solid #0a0b11;border-radius:50%;background:var(--gold-bright);color:#17130b;font:700 7px/1 'Hanken Grotesk',sans-serif;font-style:normal}.filters-scrim{position:absolute;z-index:18;inset:77px 0 0;border:0;background:rgba(1,2,4,.58);cursor:default;backdrop-filter:blur(2px)}
.filters-panel{z-index:30;top:76px;right:10px;left:10px;display:flex;max-height:calc(100% - 86px);overflow:hidden;flex-direction:column;border-color:rgba(var(--theme-accent-strong-rgb),.28);border-radius:3px;background:linear-gradient(155deg,rgba(20,21,30,.96),rgba(7,8,13,.975) 55%,rgba(4,5,8,.985));box-shadow:0 30px 70px rgba(0,0,0,.72),0 0 0 1px rgba(var(--theme-contrast-rgb),.025),0 0 45px rgba(var(--theme-accent-rgb),.055);backdrop-filter:blur(22px) saturate(130%)}.filters-panel::before{content:'';position:absolute;z-index:2;top:-1px;right:73px;width:11px;height:11px;border-top:1px solid rgba(var(--theme-accent-strong-rgb),.34);border-left:1px solid rgba(var(--theme-accent-strong-rgb),.34);background:#12131b;transform:translateY(-50%) rotate(45deg)}.filters-panel>header{position:relative;z-index:3;display:grid;flex:none;grid-template-columns:34px minmax(0,1fr) auto 25px;gap:9px;align-items:center;border-bottom-color:rgba(var(--theme-accent-rgb),.13);padding:13px 14px;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.055),transparent 65%)}.filter-title-icon{display:grid;width:32px;height:32px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.2);border-radius:2px;background:rgba(var(--theme-accent-rgb),.045);color:var(--gold-bright)}.filter-title-icon svg,.filters-panel>header>button svg{width:15px;fill:none;stroke:currentColor;stroke-width:1.35}.filters-panel>header span{font-size:6px}.filters-panel>header b{margin-top:4px;font-size:18px}.filters-panel>header>em{border:1px solid rgba(var(--theme-accent-rgb),.14);border-radius:10px;background:rgba(var(--theme-accent-rgb),.045);padding:5px 7px;color:rgba(var(--theme-accent-strong-rgb),.6);font:600 6px/1 'Hanken Grotesk',sans-serif;font-style:normal;text-transform:uppercase;white-space:nowrap}.filters-panel>header>button{display:grid;width:25px;height:25px;place-items:center;padding:0;color:rgba(var(--theme-text-rgb),.4)}.filters-panel>header>button:hover{color:var(--gold-bright)}.filters-scroll{position:relative;min-height:0;overflow-y:auto;padding:13px 14px 15px;scrollbar-width:thin;scrollbar-color:rgba(var(--theme-accent-rgb),.25) transparent}
.setting-card{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:11px;align-items:center;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.18);border-radius:3px;background:radial-gradient(circle at 8% 50%,rgba(var(--theme-accent-rgb),.12),transparent 43%),rgba(var(--theme-surface-rgb),.25);padding:11px 12px}.setting-card::after{content:'';position:absolute;top:0;right:0;width:84px;height:1px;background:linear-gradient(90deg,transparent,var(--gold))}.setting-emblem{display:grid;width:40px;height:40px;place-items:center}.setting-emblem::before{content:'';position:absolute;width:27px;height:27px;border:1px solid rgba(var(--theme-accent-rgb),.27);transform:rotate(45deg)}.setting-emblem img{position:relative;width:38px;height:38px;object-fit:contain;filter:drop-shadow(0 0 6px rgba(var(--theme-accent-rgb),.2))}.setting-card>div:nth-child(2)>span{display:block;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.53)}.setting-card>div:nth-child(2)>b{display:block;margin-top:4px;font:600 20px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.88)}.setting-card>div:nth-child(2)>small{display:block;margin-top:4px;color:rgba(var(--theme-text-rgb),.35);font:500 7px/1 'Hanken Grotesk',sans-serif}.setting-card>em{display:flex;align-items:center;color:rgba(var(--theme-accent-strong-rgb),.56);font:600 6px/1 'Hanken Grotesk',sans-serif;font-style:normal;text-transform:uppercase}.setting-card>em i{width:5px;height:5px;margin-right:5px;border-radius:50%;background:#9fb97b;box-shadow:0 0 7px rgba(159,185,123,.55)}
.filter-section{padding:17px 0 0}.filter-section-title{display:flex;align-items:baseline;justify-content:space-between}.filter-section-title>span,.source-search>span{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.56)}.filter-section-title>small{color:rgba(var(--theme-text-rgb),.26);font:italic 10px/1 'Cormorant Garamond',serif}.category-options{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:9px}.category-options button{position:relative;display:grid;min-width:0;grid-template-columns:27px minmax(0,1fr) auto;gap:8px;align-items:center;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.1);border-radius:2px;background:rgba(var(--theme-surface-rgb),.17);padding:8px;color:rgba(var(--theme-text-rgb),.42);text-align:left;cursor:pointer;transition:border-color .18s,background .18s,color .18s,transform .18s}.category-options button:hover{border-color:rgba(var(--theme-accent-rgb),.3);background:rgba(var(--theme-accent-rgb),.045);color:rgba(var(--theme-heading-rgb),.72);transform:translateY(-1px)}.category-options button.active{border-color:rgba(var(--theme-accent-strong-rgb),.46);background:linear-gradient(135deg,rgba(var(--theme-accent-rgb),.1),rgba(var(--theme-accent-rgb),.025));color:rgba(var(--theme-heading-rgb),.9);box-shadow:inset 2px 0 var(--gold)}.category-options button>i{display:grid;width:25px;height:25px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.17);border-radius:2px}.category-options button>i>span{width:7px;height:7px;border:1px solid rgba(var(--theme-accent-rgb),.46);transform:rotate(45deg)}.category-options button.active>i>span{border-color:var(--gold-bright);background:var(--gold-bright);box-shadow:0 0 7px rgba(244,224,170,.3)}.category-options svg{width:13px;fill:none;stroke:currentColor;stroke-width:1.1}.category-options b{display:block;overflow:hidden;font:600 10px/1.1 'Cormorant Garamond',serif;text-overflow:ellipsis;white-space:nowrap}.category-options small{display:-webkit-box;overflow:hidden;margin-top:3px;color:rgba(var(--theme-text-rgb),.27);font:500 6px/1.2 'Hanken Grotesk',sans-serif;-webkit-box-orient:vertical;-webkit-line-clamp:2}.category-options button>em{font:600 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.43);font-style:normal}.source-search{display:block;padding:18px 0 0}.source-search>div{height:39px;margin-top:8px;border-radius:2px;background:rgba(0,0,0,.27);padding:0 11px}.source-search>div:focus-within{border-color:rgba(var(--theme-accent-strong-rgb),.43)}.source-search svg{flex:none;width:14px;margin-right:9px;fill:none;stroke:rgba(var(--theme-accent-strong-rgb),.54);stroke-width:1.35}.source-search input{font-size:8px}.source-options{gap:5px;margin-top:9px}.source-options button{border-radius:2px;padding:10px}.source-options button.active{background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.085),transparent)}.letter-options{gap:5px;margin-top:9px}.letter-options button{min-width:28px;height:28px;border-radius:2px}.filter-switches{grid-template-columns:1fr;gap:5px;padding:17px 0 0}.filter-switches button{padding:10px;border-radius:2px}.filter-switches button>i{position:relative;width:28px;height:16px;margin-right:10px;border-radius:9px;transform:none;transition:background .2s,border-color .2s}.filter-switches button>i>span{position:absolute;top:3px;left:3px;width:8px;height:8px;border-radius:50%;background:rgba(var(--theme-text-rgb),.35);transition:transform .2s,background .2s}.filter-switches button.active>i{background:rgba(var(--theme-accent-rgb),.14);box-shadow:none}.filter-switches button.active>i>span{background:var(--gold-bright);box-shadow:0 0 7px rgba(244,224,170,.3);transform:translateX(12px)}.filter-switches button>span{display:block}.filter-switches b{display:block;color:rgba(var(--theme-heading-rgb),.68);font:600 9px/1 'Hanken Grotesk',sans-serif}.filter-switches small{display:block;margin-top:4px;color:rgba(var(--theme-text-rgb),.28);font:500 6px/1.2 'Hanken Grotesk',sans-serif}.filters-panel>footer{position:relative;z-index:3;display:grid;flex:none;grid-template-columns:52px 1fr 1.35fr;gap:6px;border-top-color:rgba(var(--theme-accent-rgb),.13);padding:10px 14px;background:rgba(5,6,10,.82);backdrop-filter:blur(12px)}.filters-panel>footer button{height:34px;border:1px solid rgba(var(--theme-accent-rgb),.13);border-radius:2px;padding:0 10px}.filters-panel>footer .sort-control{display:flex;align-items:center;justify-content:center;gap:4px;color:rgba(var(--theme-text-rgb),.48)}.sort-control svg{width:12px;fill:none;stroke:currentColor;stroke-width:1.3}.filters-panel>footer .reset-control{color:rgba(var(--theme-text-rgb),.38)}.filters-panel>footer .apply-control{border-color:rgba(var(--theme-accent-strong-rgb),.5);background:linear-gradient(135deg,rgba(var(--theme-accent-rgb),.15),rgba(var(--theme-accent-rgb),.055));color:var(--gold-bright);box-shadow:0 7px 18px rgba(0,0,0,.19)}.filters-panel>footer .apply-control:hover{border-color:var(--gold-bright);background:rgba(var(--theme-accent-rgb),.18)}.filter-popover-enter-active,.filter-popover-leave-active{transition:opacity .2s,transform .24s cubic-bezier(.2,.75,.2,1)}.filter-popover-enter-from,.filter-popover-leave-to{opacity:0;transform:translateY(-8px) scale(.985)}
.filters-scrim{position:fixed;z-index:120;inset:0;background:rgba(2,3,6,.76);cursor:default;backdrop-filter:blur(7px) saturate(75%)}.filters-panel{position:fixed;z-index:130;top:50%;right:auto;left:50%;width:min(820px,calc(100vw - 136px));height:min(720px,calc(100vh - 70px));max-height:none;box-sizing:border-box;transform:translate(-50%,-50%)}.filters-panel::after{content:'';position:absolute;inset:7px;border:1px solid rgba(var(--theme-accent-rgb),.055);border-radius:2px;pointer-events:none}.filters-panel>header{grid-template-columns:40px minmax(0,1fr) auto 32px;padding:17px 20px}.filter-title-icon{width:38px;height:38px}.filters-panel>header b{font-size:23px}.filters-panel>header>button{width:32px;height:32px}.filters-scroll{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);grid-template-rows:auto auto auto auto 1fr;column-gap:22px;align-content:start;padding:18px 20px 24px}.setting-card{grid-column:1/-1;grid-row:1}.category-filter{grid-column:1;grid-row:2/6;padding-top:20px}.source-search{grid-column:2;grid-row:2;padding-top:20px}.source-filter{grid-column:2;grid-row:3}.letter-filter{grid-column:2;grid-row:4}.filter-switches{grid-column:2;grid-row:5}.category-options{gap:7px}.category-options button{min-height:57px;padding:9px}.category-options b{font-size:11px}.source-options button{min-height:43px}.filters-panel>footer{grid-template-columns:62px 1fr 1.35fr;padding:12px 20px 16px}.filters-panel>footer button{height:39px}.filter-popover-enter-from,.filter-popover-leave-to{opacity:0;transform:translate(-50%,calc(-50% - 12px)) scale(.975)}
.filters-panel>.filters-scroll{flex:1}
.mobile-categories{display:none}.results-bar{display:flex;flex:none;height:30px;align-items:center;justify-content:space-between;border-top:1px solid rgba(var(--theme-accent-rgb),.09);border-bottom:1px solid rgba(var(--theme-accent-rgb),.09);padding:0 19px}.results-bar span{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.58)}.results-bar button{border:0;background:none;color:rgba(var(--theme-text-rgb),.32);font:600 6px/1 'Hanken Grotesk',sans-serif;text-transform:uppercase;cursor:pointer}
.term-list{min-height:0;flex:1;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(var(--theme-accent-rgb),.24) transparent}.term-list>button{position:relative;display:grid;width:100%;grid-template-columns:14px minmax(0,1fr) 15px;gap:9px;border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.08);background:none;padding:15px 18px;color:inherit;text-align:left;cursor:pointer;transition:background .2s}.term-list>button:hover,.term-list>button.active{background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.07),transparent)}.term-list>button.active::after{content:'';position:absolute;top:8px;right:0;bottom:8px;width:1px;background:var(--gold-bright);box-shadow:0 0 8px rgba(244,224,170,.4)}.list-knot{width:7px;height:7px;margin-top:18px;border:1px solid rgba(var(--theme-accent-rgb),.45);background:#090a10;transform:rotate(45deg)}.term-list>button.active .list-knot{border-color:var(--gold-bright);background:var(--gold-bright);box-shadow:0 0 10px rgba(244,224,170,.4)}.term-list small{display:block;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.48)}.term-list b{display:block;margin:4px 0 5px;font:600 20px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.84)}.term-list em{display:-webkit-box;overflow:hidden;font:italic 12px/1.35 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.4);-webkit-box-orient:vertical;-webkit-line-clamp:2}.list-arrow{align-self:center;color:rgba(var(--theme-accent-rgb),.3);font-size:12px;font-style:normal}.term-list>button.active .list-arrow{color:var(--gold-bright)}
.empty-state{padding:50px 24px;text-align:center}.empty-state>span{display:block;color:var(--gold);font-size:22px}.empty-state>b{display:block;margin-top:12px;font:600 24px/1 'Cormorant Garamond',serif}.empty-state p{color:rgba(var(--theme-text-rgb),.42);font:italic 13px/1.4 'Cormorant Garamond',serif}.empty-state button{margin-top:10px;border:1px solid rgba(var(--theme-accent-rgb),.26);background:none;padding:8px 10px;color:rgba(var(--theme-accent-strong-rgb),.75);font:600 7px/1 'Hanken Grotesk',sans-serif;text-transform:uppercase;cursor:pointer}
.detail-panel{position:relative;grid-column:3;grid-row:2;min-width:0;min-height:0;overflow-y:auto;padding:20px clamp(24px,3vw,46px) 55px;scrollbar-width:thin;scrollbar-color:rgba(var(--theme-accent-rgb),.24) transparent}.detail-panel::before{content:'';position:absolute;inset:0;border-top:1px solid rgba(var(--theme-accent-rgb),.14);border-bottom:1px solid rgba(var(--theme-accent-rgb),.07);pointer-events:none}.mobile-close{display:none}.detail-actions{position:relative;z-index:3;display:flex;min-height:31px;align-items:center;justify-content:flex-end;gap:6px;margin-bottom:11px}.detail-actions>button{display:grid;width:31px;height:31px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.15);background:rgba(var(--theme-surface-rgb),.22);color:rgba(var(--theme-text-rgb),.42);cursor:pointer;transition:border-color .2s,color .2s,background .2s}.detail-actions>button:hover{border-color:rgba(var(--theme-accent-strong-rgb),.52);background:rgba(var(--theme-accent-rgb),.07);color:var(--gold-bright)}.detail-actions svg{width:14px;fill:none;stroke:currentColor;stroke-width:1.45;stroke-linecap:square;stroke-linejoin:miter}.action-message{margin-right:6px;color:rgba(var(--theme-accent-strong-rgb),.66);font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.09em;text-transform:uppercase}.detail-meta{display:flex;align-items:center;justify-content:space-between}.detail-meta span{font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}.detail-meta em{font:600 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.24);font-style:normal}.detail-panel h2{max-width:640px;margin:28px 0 8px;font:600 clamp(46px,5vw,74px)/.88 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);letter-spacing:-.02em;text-wrap:balance}.aliases{margin:15px 0 0;font:italic 15px/1.3 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.56)}.detail-divider{display:flex;align-items:center;margin:29px 0;max-width:570px}.detail-divider::before,.detail-divider::after{content:'';height:1px;flex:1;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.3))}.detail-divider::after{background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.3),transparent)}.detail-divider i{width:8px;height:8px;margin:0 10px;border:1px solid rgba(var(--theme-accent-rgb),.56);transform:rotate(45deg)}.definition{max-width:620px;margin:0;font:normal clamp(19px,1.7vw,25px)/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.74)}.definition::first-letter{float:left;margin:4px 8px 0 0;color:var(--gold-bright);font-size:52px;line-height:.7}
.definition{text-wrap:pretty;hanging-punctuation:first last}.definition::first-letter{float:none;margin:0;color:inherit;font:inherit}.definition::after{display:block;clear:both;content:''}.definition-dropcap{float:left;margin:.04em .13em 0 -.015em;color:var(--gold-bright);font:600 3.5em/.82 'Cormorant Garamond',serif;letter-spacing:-.045em;text-shadow:0 0 18px rgba(var(--theme-accent-rgb),.12)}
.provenance{display:grid;grid-template-columns:1.15fr 1fr;gap:8px;max-width:570px;margin:35px 0 0}.provenance>div{border:1px solid rgba(var(--theme-accent-rgb),.15);background:rgba(var(--theme-surface-rgb),.27);padding:14px 15px}.provenance dt,.related-block>span,.history-link span{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.5)}.provenance dd{margin:8px 0 0;font:600 14px/1.2 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.7)}.provenance dd b{display:inline-grid;width:25px;height:25px;place-items:center;margin-right:9px;border:1px solid rgba(var(--theme-accent-rgb),.34);font:600 7px/1 'Hanken Grotesk',sans-serif;color:var(--gold-bright);transform:rotate(45deg)}.provenance dd b span{transform:rotate(-45deg)}
.history-link{display:grid;grid-template-columns:1fr auto;gap:4px 16px;align-items:center;max-width:570px;margin-top:11px;border:1px solid rgba(var(--theme-accent-rgb),.18);background:rgba(var(--theme-surface-rgb),.28);padding:13px 15px;text-decoration:none;transition:border-color .2s}.history-link:hover{border-color:rgba(var(--theme-accent-strong-rgb),.48)}.history-link b{grid-row:2;font:600 16px/1.1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.78)}.history-link i{grid-row:1/3;grid-column:2;color:var(--gold-bright);font-style:normal}.related-block{max-width:570px;margin-top:29px;padding-top:19px;border-top:1px solid rgba(var(--theme-accent-rgb),.11)}.related-block>div{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}.related-block button{border:1px solid rgba(var(--theme-accent-rgb),.14);background:rgba(var(--theme-surface-rgb),.24);padding:8px 10px;color:rgba(var(--theme-text-rgb),.58);font:13px/1 'Cormorant Garamond',serif;cursor:pointer}.related-block button:hover{border-color:rgba(var(--theme-accent-rgb),.42);color:var(--gold-bright)}.related-block button i{display:inline-block;width:5px;height:5px;margin-right:7px;border:1px solid rgba(var(--theme-accent-rgb),.55);transform:rotate(45deg)}
.detail-empty{display:grid;min-height:78%;place-content:center;text-align:center}.detail-empty>i{width:18px;height:18px;justify-self:center;margin-bottom:23px;border:1px solid rgba(var(--theme-accent-rgb),.42);box-shadow:0 0 20px rgba(var(--theme-accent-rgb),.08);transform:rotate(45deg)}.detail-empty span{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.21em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.48)}.detail-empty b{margin-top:11px;font:600 30px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.68)}.detail-empty p{max-width:310px;margin:10px auto 0;color:rgba(var(--theme-text-rgb),.34);font:italic 14px/1.35 'Cormorant Garamond',serif}.detail-expanded .detail-panel{position:fixed;z-index:200;inset:0;display:block;overflow-y:auto;padding:42px clamp(55px,12vw,210px) 80px;background:radial-gradient(ellipse 55% 42% at 60% 5%,#171923 0,#090a0f 58%,#040406 100%);box-shadow:0 0 80px #000;transform:none}.detail-expanded .detail-panel::before{position:fixed;inset:20px;border:1px solid rgba(var(--theme-accent-rgb),.15)}.detail-expanded .detail-actions{position:sticky;top:0;max-width:760px;margin:0 auto 22px;padding:8px 0;background:linear-gradient(90deg,transparent,rgba(9,10,15,.92) 20%,rgba(9,10,15,.92))}.detail-expanded .detail-meta,.detail-expanded .detail-panel h2,.detail-expanded .aliases,.detail-expanded .detail-divider,.detail-expanded .definition,.detail-expanded .provenance,.detail-expanded .history-link,.detail-expanded .related-block{max-width:760px;margin-right:auto;margin-left:auto}.detail-expanded .detail-panel h2{font-size:clamp(62px,7vw,104px)}.detail-expanded .definition{font-size:clamp(23px,2vw,31px)}
.chapter-hint{margin:9px 0 0;color:rgba(var(--theme-text-rgb),.4);font:italic 12px/1.35 'Cormorant Garamond',serif}
.chapter-slider{margin-top:11px;border:1px solid rgba(var(--theme-accent-rgb),.14);border-radius:2px;background:rgba(var(--theme-surface-rgb),.2);padding:13px 14px}
.chapter-slider input{width:100%;height:3px;border-radius:2px;appearance:none;background:linear-gradient(90deg,rgba(var(--theme-accent-strong-rgb),.62),rgba(var(--theme-accent-rgb),.18));cursor:pointer}
.chapter-slider input::-webkit-slider-thumb{width:15px;height:15px;border:1px solid var(--gold-bright);appearance:none;background:#0a0b11;box-shadow:0 0 10px rgba(244,224,170,.42);cursor:pointer;transform:rotate(45deg)}
.chapter-slider input::-moz-range-thumb{width:13px;height:13px;border:1px solid var(--gold-bright);background:#0a0b11;box-shadow:0 0 10px rgba(244,224,170,.42);cursor:pointer}
.chapter-scale{display:flex;align-items:baseline;gap:8px;margin-top:12px}
.chapter-scale b{font:600 27px/1 'Cormorant Garamond',serif;color:var(--gold-bright)}
.chapter-scale span{flex:1;color:rgba(var(--theme-text-rgb),.38);font:500 9px/1 'Hanken Grotesk',sans-serif}
.chapter-scale button{border:1px solid rgba(var(--theme-accent-rgb),.2);border-radius:2px;background:none;padding:7px 9px;color:rgba(var(--theme-accent-strong-rgb),.7);font:600 8px/1 'Hanken Grotesk',sans-serif;text-transform:uppercase;cursor:pointer}
.chapter-scale button:disabled{border-color:rgba(var(--theme-contrast-rgb),.08);color:rgba(var(--theme-text-rgb),.22);cursor:default}
.chapter-badge{border:1px solid rgba(var(--theme-accent-rgb),.28);padding:3px 6px;color:var(--gold-bright);font:600 6px/1 'Hanken Grotesk',sans-serif;font-style:normal;letter-spacing:.12em;text-transform:uppercase}
.provenance{grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}.provenance p{margin:7px 0 0;color:rgba(var(--theme-text-rgb),.42);font:italic 12px/1.3 'Cormorant Garamond',serif}
.dossier-block{max-width:600px;margin-top:34px;border-top:1px solid rgba(var(--theme-accent-rgb),.14);padding-top:22px}
.dossier-block>header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:20px}
.dossier-block>header>span{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}
.dossier-block>header>a{border:1px solid rgba(var(--theme-accent-rgb),.2);padding:5px 9px;color:rgba(var(--theme-accent-strong-rgb),.72);font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-decoration:none;text-transform:uppercase}
.dossier-block>header>a:hover{border-color:var(--gold-bright);color:var(--gold-bright)}
.dossier-block h3{display:flex;align-items:center;gap:10px;margin:26px 0 12px;font:600 clamp(19px,1.7vw,24px)/1.15 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.86)}
.dossier-block h3::after{content:'';height:1px;flex:1;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.24),transparent)}
.dossier-block p{margin:0 0 12px;color:rgba(var(--theme-text-rgb),.76);font:clamp(16px,1.35vw,19px)/1.62 'Cormorant Garamond',serif;text-wrap:pretty}
.dossier-block blockquote{margin:0 0 16px;border-left:2px solid rgba(var(--theme-accent-rgb),.34);padding:2px 0 2px 15px;color:rgba(var(--theme-text-rgb),.56);font:italic clamp(15px,1.25vw,17px)/1.6 'Cormorant Garamond',serif}
.dossier-block ul{margin:0 0 14px;padding:0;list-style:none}
.dossier-block li{position:relative;margin-bottom:7px;padding-left:15px;color:rgba(var(--theme-text-rgb),.72);font:clamp(15px,1.25vw,17px)/1.55 'Cormorant Garamond',serif}
.dossier-block li::before{content:'';position:absolute;top:9px;left:0;width:5px;height:5px;border:1px solid rgba(var(--theme-accent-rgb),.5);transform:rotate(45deg)}
.dossier-facts{display:grid;gap:6px;margin:0 0 16px}
.dossier-facts>div{display:flex;align-items:baseline;gap:10px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.09);padding-bottom:6px}
.dossier-facts dt{flex:none;font:600 6px/1.4 'Hanken Grotesk',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.58)}
.dossier-facts dd{margin:0;color:rgba(var(--theme-text-rgb),.72);font:15px/1.4 'Cormorant Garamond',serif}
.detail-expanded .dossier-block{max-width:760px;margin-right:auto;margin-left:auto}
.ogni-block{max-width:570px;margin-top:32px;border-top:1px solid rgba(var(--theme-accent-rgb),.14);padding-top:22px}
.ogni-block>header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px}
.ogni-block>header>span{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}
.detail-role{margin:14px 0 0;color:rgba(var(--theme-accent-strong-rgb),.68);font:600 8px/1.4 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase}
.definition-lead{max-width:600px;color:rgba(var(--theme-text-rgb),.58);font:italic clamp(17px,1.5vw,21px)/1.5 'Cormorant Garamond',serif}
.ogni-span{border:1px solid rgba(var(--theme-accent-rgb),.2);padding:5px 9px;color:rgba(var(--theme-accent-strong-rgb),.72);font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-decoration:none;text-transform:uppercase;transition:border-color .18s,color .18s}
.ogni-span:hover{border-color:var(--gold-bright);color:var(--gold-bright)}
.ogni-portrait{margin-top:28px}
.ogni-portrait h3{display:flex;align-items:center;gap:10px;margin:0 0 13px;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}
.ogni-portrait h3::after{content:'';height:1px;flex:1;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.22),transparent)}
.ogni-portrait p{margin:0 0 11px;color:rgba(var(--theme-text-rgb),.76);font:clamp(16px,1.35vw,19px)/1.62 'Cormorant Garamond',serif;text-wrap:pretty}
.ogni-portrait p:last-child{margin-bottom:0}
.ogni-facet{margin-top:24px}
.ogni-facet h3{display:flex;align-items:center;gap:9px;margin:0;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.72)}
.ogni-facet h3::after{content:'';height:1px;flex:1;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.3),transparent)}
.ogni-facet h3 em{order:3;color:rgba(var(--theme-text-rgb),.28);font:600 7px/1 'Hanken Grotesk',sans-serif;font-style:normal}
.ogni-facet ul{margin:11px 0 0;padding:0;list-style:none;display:grid;gap:8px}
.ogni-facet li{border-left:2px solid rgba(var(--theme-accent-rgb),.32);background:linear-gradient(90deg,rgba(var(--theme-surface-rgb),.26),transparent);padding:9px 12px}
.ogni-facet li p{margin:0;color:rgba(var(--theme-text-rgb),.72);font:15px/1.5 'Cormorant Garamond',serif}
.ogni-facet li>div{display:flex;align-items:center;gap:9px;margin-top:6px}
.ogni-facet li>div>span{font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}
.ogni-facet li>div>a{color:rgba(var(--theme-text-rgb),.34);font:600 7px/1 'Hanken Grotesk',sans-serif;text-decoration:none}
.ogni-facet li>div>a:hover{color:var(--gold-bright)}
.ogni-facet li[data-status=world-fact]{border-left-color:rgba(159,185,123,.72)}.ogni-facet li[data-status=world-fact]>div>span{color:rgba(159,185,123,.82)}
.ogni-facet li[data-status=event]{border-left-color:rgba(214,170,96,.72)}
.ogni-facet li[data-status=scene-canon]{border-left-color:rgba(150,176,214,.6)}.ogni-facet li[data-status=scene-canon]>div>span{color:rgba(150,176,214,.72)}
.ogni-facet li[data-status=belief]{border-left-color:rgba(186,146,196,.6)}.ogni-facet li[data-status=belief]>div>span{color:rgba(186,146,196,.74)}
.ogni-facet li[data-status=gm-hint]{border-left-color:rgba(206,120,104,.62)}.ogni-facet li[data-status=gm-hint]>div>span{color:rgba(206,120,104,.78)}
.ogni-facet li[data-status=unconfirmed]{border-left-color:rgba(var(--theme-contrast-rgb),.24)}.ogni-facet li[data-status=unconfirmed]>div>span{color:rgba(var(--theme-text-rgb),.4)}
.ogni-facet li[data-status=profile]{border-left-color:rgba(214,170,96,.5)}.ogni-facet li[data-status=profile]>div>span{color:rgba(var(--theme-accent-rgb),.45)}
.ogni-relations{margin-top:26px}
.ogni-relations h3{margin:0;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.72)}
.ogni-relations>div{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}
.ogni-relations button{display:flex;align-items:center;gap:7px;border:1px solid rgba(var(--theme-accent-rgb),.14);background:rgba(var(--theme-surface-rgb),.24);padding:7px 10px;color:rgba(var(--theme-text-rgb),.6);font:13px/1 'Cormorant Garamond',serif;cursor:pointer}
.ogni-relations button:hover{border-color:rgba(var(--theme-accent-rgb),.44);color:var(--gold-bright)}
.ogni-relations button i{width:5px;height:5px;border:1px solid rgba(var(--theme-accent-rgb),.55);transform:rotate(45deg)}
.ogni-relations button em{color:rgba(var(--theme-text-rgb),.3);font:600 7px/1 'Hanken Grotesk',sans-serif;font-style:normal}
.ogni-cut{margin:13px 0 0;color:rgba(var(--theme-text-rgb),.38);font:italic 13px/1.4 'Cormorant Garamond',serif}
.detail-expanded .ogni-block,.detail-expanded .definition-lead{max-width:760px;margin-right:auto;margin-left:auto}
@media(max-width:720px){.ogni-facet li{padding:9px 10px}.ogni-facet li p{font-size:14px}}
@keyframes weaveY{to{background-position:0 260px}}@keyframes sigilGlow{0%,100%{filter:drop-shadow(0 0 7px rgba(var(--theme-accent-rgb),.2));opacity:.86}50%{filter:drop-shadow(0 0 13px rgba(var(--theme-accent-rgb),.42));opacity:1}}
@media(max-width:1360px){.category-rail{left:calc(var(--thread-x) - 534px);width:148px}.glossary-layout{left:calc(var(--thread-x) - 386px);right:18px;grid-template-columns:340px 92px minmax(360px,1fr)}.detail-panel{padding-right:28px;padding-left:28px}.term-list>button{padding-right:13px;padding-left:13px}}
@media(max-width:1120px){.category-rail{display:none}.glossary-layout{left:calc(var(--thread-x) - 396px);grid-template-columns:350px 92px minmax(350px,1fr)}.mobile-categories{display:flex;flex:none;gap:4px;margin:0 18px 10px;overflow-x:auto;scrollbar-width:none}.mobile-categories button{flex:none;border:1px solid rgba(var(--theme-accent-rgb),.13);background:none;padding:7px 8px;color:rgba(var(--theme-text-rgb),.36);font:600 6px/1 'Hanken Grotesk',sans-serif;text-transform:uppercase}.mobile-categories button.active{border-color:rgba(var(--theme-accent-strong-rgb),.48);color:var(--gold-bright)}}
@media(max-width:930px){.glossary-layout{left:calc(var(--thread-x) - 394px);grid-template-columns:350px 88px minmax(350px,1fr)}}
@media(max-width:720px){.lore-glossary{inset:0 0 66px 0}.glossary-layout{inset:0;display:block}.index-heading{height:145px;padding:31px 20px 0;text-align:center;box-sizing:border-box}.index-heading h1{font-size:48px}.index-heading p{font-size:6px}.thread-column,.detail-heading{display:none}.index-panel{position:absolute;inset:145px 12px 0}.search-toolbar{margin-top:12px}.filters-scrim{top:74px}.filters-panel{top:74px}.filter-switches{grid-template-columns:1fr}.detail-panel{position:fixed;inset:0 0 66px;z-index:20;display:block;padding:20px 22px 48px;background:radial-gradient(circle at 70% 10%,#131621,#07080d 58%,#040406);transform:translateX(102%);transition:transform .32s cubic-bezier(.2,.75,.2,1)}.detail-panel.mobile-open{transform:translateX(0)}.detail-expanded .detail-panel{inset:0;padding:24px 22px 55px;transform:none}.detail-expanded .detail-panel::before{inset:9px}.mobile-close{display:block;margin:0 0 12px;border:0;background:none;padding:7px 0;color:rgba(var(--theme-accent-strong-rgb),.7);font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.14em;text-transform:uppercase}.detail-expanded .mobile-close{display:none}.detail-panel h2{font-size:52px}.detail-expanded .detail-panel h2{font-size:58px}.definition{font-size:19px}.provenance{grid-template-columns:1fr}.term-list b{font-size:19px}}
@media(max-width:440px){.index-panel{right:8px;left:8px}.search-toolbar,.mobile-categories{margin-right:10px;margin-left:10px}.filters-panel{right:6px;left:6px}.filters-panel>header{grid-template-columns:32px minmax(0,1fr) 25px}.filters-panel>header>em{display:none}.detail-panel{padding-right:18px;padding-left:18px}.action-message{position:absolute;top:38px;right:0}}
@media(max-width:360px){.search-toolbar{grid-template-columns:minmax(0,1fr) 48px}.filter-toggle{width:48px}.filter-toggle-label,.search-field kbd{display:none!important}.category-options{grid-template-columns:1fr}.setting-card{grid-template-columns:40px minmax(0,1fr)}.setting-card>em{display:none}}
@media(max-width:900px){.filters-panel{width:calc(100vw - 40px)}}
@media(max-width:720px){.filters-scrim{top:0}.filters-panel{top:calc(50% - 33px);right:auto;left:50%;width:calc(100vw - 24px);height:calc(100vh - 92px);transform:translate(-50%,-50%)}.filters-scroll{display:block}.filter-popover-enter-from,.filter-popover-leave-to{transform:translate(-50%,calc(-50% - 9px)) scale(.98)}}
@media(max-width:440px){.filters-panel{right:auto;left:50%;width:calc(100vw - 16px)}.filters-panel>header{padding-right:14px;padding-left:14px}.filters-scroll{padding-right:14px;padding-left:14px}.filters-panel>footer{padding-right:14px;padding-left:14px}}
.filters-active .detail-heading,.filters-active .detail-panel{visibility:hidden;opacity:0;pointer-events:none}.filters-panel{position:fixed;z-index:40;top:30px;right:28px;bottom:30px;left:calc(50vw + 52px);width:auto;height:auto;max-height:none;border-color:rgba(var(--theme-accent-strong-rgb),.22);border-radius:0;background:radial-gradient(circle at 100% 0,rgba(var(--theme-accent-rgb),.075),transparent 42%),linear-gradient(145deg,rgba(14,15,22,.97),rgba(5,6,10,.985));box-shadow:-20px 20px 55px rgba(0,0,0,.25);transform:none;backdrop-filter:blur(16px) saturate(120%)}.filters-panel::before{display:none}.filters-panel>header{padding:18px 22px}.filters-scroll{padding:20px 22px 26px}.filters-panel>footer{padding:12px 22px 17px}.filter-popover-enter-from,.filter-popover-leave-to{opacity:0;transform:translateX(22px)}
@media(max-width:1360px){.filters-panel{right:18px;left:calc(50vw + 46px)}}
@media(max-width:1120px){.filters-scroll{display:block}.filters-panel{left:calc(50vw + 46px)}}
@media(max-width:930px){.filters-panel{left:calc(50vw + 44px)}}
@media(max-width:720px){.filters-active .detail-heading{display:none}.filters-panel{top:0;right:0;bottom:66px;left:0;width:auto;height:auto;transform:none}.filters-panel>header{padding:15px 18px}.filters-scroll{display:block;padding:16px 18px 22px}.filters-panel>footer{padding:11px 18px 15px}.filter-popover-enter-from,.filter-popover-leave-to{transform:translateX(100%)}}
@media(max-width:440px){.filters-panel{right:0;left:0;width:auto}.filters-panel>header,.filters-scroll,.filters-panel>footer{padding-right:14px;padding-left:14px}}
.filters-panel{right:auto;width:min(640px,calc(50vw - 80px))}.filters-panel>header{padding:19px 22px}.filters-panel>header span{font-size:9px}.filters-panel>header b{font-size:29px}.filters-panel>header>em{font-size:8px}.filters-scroll{display:block;padding:20px 22px 30px}.setting-card{grid-template-columns:54px minmax(0,1fr) auto;padding:14px 15px}.setting-emblem{width:48px;height:48px}.setting-emblem::before{width:33px;height:33px}.setting-emblem img{width:45px;height:45px}.setting-card>div:nth-child(2)>span{font-size:9px}.setting-card>div:nth-child(2)>b{margin-top:5px;font-size:27px}.setting-card>div:nth-child(2)>small{margin-top:5px;font-size:10px}.setting-card>em{font-size:8px}.filter-guidance{display:flex;align-items:flex-start;gap:12px;margin-top:12px;border:1px solid rgba(var(--theme-accent-rgb),.1);background:rgba(var(--theme-accent-rgb),.025);padding:12px 14px}.filter-guidance>svg{flex:none;width:17px;margin-top:1px;fill:none;stroke:rgba(var(--theme-accent-strong-rgb),.6);stroke-width:1.35}.filter-guidance span{display:block}.filter-guidance b{display:block;color:rgba(var(--theme-heading-rgb),.74);font:600 12px/1.2 'Hanken Grotesk',sans-serif}.filter-guidance small{display:block;margin-top:5px;color:rgba(var(--theme-text-rgb),.4);font:500 10px/1.35 'Hanken Grotesk',sans-serif}.filter-section,.category-filter,.source-search{padding-top:22px}.filter-section-title>span,.source-search>span{font-size:10px;letter-spacing:.14em}.filter-section-title>span>i,.source-search>span>i{margin-right:7px;color:var(--gold-bright);font-style:normal}.filter-section-title>small{font-size:12px}.category-options{gap:8px;margin-top:11px}.category-options button{min-height:72px;grid-template-columns:36px minmax(0,1fr) auto;gap:10px;padding:11px}.category-options button>i{width:33px;height:33px}.category-options b{font-size:15px}.category-options small{margin-top:5px;font-size:9px;line-height:1.35}.category-options button>em{font-size:9px}.source-search>div{height:46px;margin-top:10px;padding:0 13px}.source-search svg{width:17px}.source-search input{font-size:12px}.source-options{gap:7px;margin-top:10px}.source-options button{min-height:55px;grid-template-columns:10px minmax(0,1fr) auto;gap:11px;padding:12px}.source-options button>i{width:8px;height:8px}.source-options b{font-size:15px}.source-options small{margin-top:5px;font-size:9px}.source-options em{font-size:9px}.letter-options{gap:7px;margin-top:11px}.letter-options button{min-width:36px;height:36px;font-size:10px}.filter-options-title{margin-top:22px}.filter-switches{grid-template-columns:1fr 1fr;gap:8px;padding-top:11px}.filter-switches button{min-height:62px;padding:12px}.filter-switches b{font-size:12px}.filter-switches small{margin-top:5px;font-size:9px;line-height:1.3}.filters-panel>footer{grid-template-columns:66px 1fr 1.45fr;gap:8px;padding:12px 22px 17px}.filters-panel>footer button{height:43px;font-size:9px}.filters-panel>footer .apply-control{font-size:10px}
.category-options button{color:rgba(var(--theme-text-rgb),.64)}.category-options b{color:rgba(var(--theme-heading-rgb),.76)}.category-options small{color:rgba(var(--theme-text-rgb),.43);font-size:10px}.category-options button>em{color:rgba(var(--theme-accent-strong-rgb),.62)}.source-options button{color:rgba(var(--theme-text-rgb),.62)}.source-options b{color:rgba(var(--theme-heading-rgb),.76)}.source-options small{color:rgba(var(--theme-text-rgb),.44);font-size:10px}.letter-options button{color:rgba(var(--theme-text-rgb),.58)}.filter-switches small{color:rgba(var(--theme-text-rgb),.44);font-size:10px}
@media(max-width:1360px){.filters-panel{right:auto;width:min(620px,calc(50vw - 64px))}}
@media(max-width:930px){.filters-panel{width:calc(50vw - 62px)}.category-options,.filter-switches{grid-template-columns:1fr}}
@media(max-width:720px){.filters-panel{right:0;width:auto}.filters-panel>header{padding:16px 18px}.filters-panel>header b{font-size:25px}.filters-scroll{padding:17px 18px 25px}.category-options{grid-template-columns:1fr 1fr}.filter-switches{grid-template-columns:1fr 1fr}.filters-panel>footer{padding:11px 18px 15px}}
@media(max-width:440px){.category-options,.filter-switches{grid-template-columns:1fr}.filter-section-title{align-items:flex-start;gap:7px}.filter-section-title>small{text-align:right}.filters-panel>header b{font-size:22px}}
@media print{.lore-glossary{position:static;inset:auto;overflow:visible;background:#fff!important;color:#171717}.glossary-texture,.category-rail,.index-heading,.thread-column,.detail-heading,.index-panel,.detail-actions,.mobile-close{display:none!important}.glossary-layout{position:static;display:block}.detail-panel,.detail-expanded .detail-panel{position:static!important;display:block!important;overflow:visible!important;background:#fff!important;box-shadow:none!important;padding:24mm 20mm!important;color:#171717!important;transform:none!important}.detail-panel::before{display:none}.detail-panel h2,.detail-expanded .detail-panel h2{max-width:none;color:#111!important;font-size:54pt}.detail-meta span,.aliases,.definition,.provenance dd,.history-link b,.related-block button{color:#222!important}.definition,.detail-expanded .definition{max-width:none;font-size:18pt}.provenance,.history-link,.related-block{max-width:none;border-color:#aaa!important;background:none!important}.history-link{display:none}.related-block button{border-color:#bbb!important}}
/* ——— Типографическая система карточки ———
   Шесть ступеней вместо разнобоя от 6 до 74 пикселей. Засечный шрифт несёт
   смысл (заголовки и проза), гротеск — служебные подписи: вид блока, статус
   сведения, номер главы. Ниже 10 пикселей ничего не опускается. */
.detail-panel{
  --lore-band:600 10px/1.2 'Hanken Grotesk',sans-serif;      /* марка блока */
  --lore-tag:600 10px/1.3 'Hanken Grotesk',sans-serif;       /* статус, глава */
  --lore-meta:500 12px/1.45 'Hanken Grotesk',sans-serif;     /* служебный текст */
  --lore-body:400 clamp(16px,1.2vw,18px)/1.68 'Cormorant Garamond',serif;
  --lore-lead:italic 400 clamp(18px,1.45vw,21px)/1.55 'Cormorant Garamond',serif;
  --lore-head:600 clamp(20px,1.7vw,24px)/1.22 'Cormorant Garamond',serif;
  --lore-track:.17em;
  --lore-step:34px;
}

/* Марки блоков и служебные подписи — одна ступень на всех. */
.detail-panel .detail-meta span,
.detail-panel .dossier-block>header>span,
.detail-panel .ogni-block>header>span,
.detail-panel .ogni-relations h3,
.detail-panel .provenance dt,
.detail-panel .related-block>span,
.detail-panel .history-link span{font:var(--lore-band);letter-spacing:var(--lore-track);text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}
.detail-panel .detail-meta em{font:var(--lore-tag);letter-spacing:.1em;color:rgba(var(--theme-text-rgb),.3)}
.detail-panel .detail-role{font:var(--lore-band);letter-spacing:.2em;color:rgba(var(--theme-accent-strong-rgb),.7)}

/* Заголовок статьи и подзаголовки внутри неё. */
.detail-panel h2{font-size:clamp(40px,4.2vw,62px);letter-spacing:-.015em}
.detail-panel .dossier-block h3,
.detail-panel .ogni-portrait h3,
.detail-panel .ogni-facet h3{font:var(--lore-head);letter-spacing:0;text-transform:none;color:rgba(var(--theme-heading-rgb),.84)}
.detail-panel .ogni-facet h3 em{font:var(--lore-tag);letter-spacing:.1em;color:rgba(var(--theme-text-rgb),.3)}

/* Проза: одна ступень для досье, портрета и записей. */
.detail-panel .definition{font:var(--lore-body);font-size:clamp(18px,1.5vw,21px)}
.detail-panel .definition-lead{font:var(--lore-lead)}
.detail-panel .dossier-block p,
.detail-panel .dossier-block li,
.detail-panel .ogni-portrait p,
.detail-panel .ogni-facet li p{font:var(--lore-body);color:rgba(var(--theme-text-rgb),.78)}
.detail-panel .dossier-block blockquote{font:var(--lore-lead);font-size:clamp(16px,1.3vw,18px)}
.detail-panel .aliases{font:var(--lore-lead);font-size:clamp(15px,1.2vw,17px)}
.detail-panel .provenance dd{font:var(--lore-body);font-size:16px}
.detail-panel .provenance p,
.detail-panel .ogni-cut,
.detail-panel .chapter-hint{font:var(--lore-meta);color:rgba(var(--theme-text-rgb),.44)}

/* Подписи у сведений: статус и глава читаются, а не угадываются. */
.detail-panel .ogni-facet li>div>span,
.detail-panel .ogni-facet li>div>a,
.detail-panel .ogni-span,
.detail-panel .dossier-block>header>a,
.detail-panel .dossier-facts dt{font:var(--lore-tag);letter-spacing:.12em;text-transform:uppercase}
.detail-panel .dossier-facts dd,
.detail-panel .ogni-relations button,
.detail-panel .related-block button{font:var(--lore-meta);font-size:14px}
.detail-panel .ogni-relations button em{font:var(--lore-tag);letter-spacing:.08em}

/* Ритм блоков: один шаг между смысловыми частями. */
.detail-panel .dossier-block,
.detail-panel .ogni-block{margin-top:var(--lore-step);padding-top:26px}
.detail-panel .ogni-portrait,
.detail-panel .ogni-facet,
.detail-panel .ogni-relations{margin-top:28px}
.detail-panel .dossier-block h3{margin:30px 0 14px}
.detail-panel .provenance{margin-top:var(--lore-step)}

/* ——— Буквица ———
   Считается по метрикам Cormorant Garamond: высота прописной .63em, подъём .92,
   спуск .29 — и по межстрочному расстоянию текста (1.68).

   Литера занимает две строки: её верх встаёт на верх прописных первой строки,
   низ — на базовую линию второй. Высота литеры = 1.68 + .63 = 2.31em текста,
   значит кегль = 2.31 / .63 = 3.667em. Собственный интерлиньяж .63 делает
   строку буквицы равной высоте самой литеры, поэтому нижняя граница её блока
   совпадает с базовой линией второй строки, а не висит ниже неё.
   Отступ сверху .143em своего кегля = .525em текста — ровно расстояние от верха
   строки до верха прописных. */
.detail-panel .definition-dropcap{
  float:left;
  margin:.143em .085em 0 -.02em;
  font:600 3.667em/.63 'Cormorant Garamond',serif;
  letter-spacing:0;
  color:var(--gold-bright);
  text-shadow:0 0 18px rgba(var(--theme-accent-rgb),.12);
}

/* Смахивание по статьям: сдвиг живёт в переменной, чтобы не спорить с
   transform, которым карточка выезжает поверх списка. Во время жеста переход
   выключен — иначе карточка тянется за пальцем с запозданием. */
@media(max-width:720px){
  .detail-panel.mobile-open{transform:translateX(var(--swipe-shift,0px))}
  .detail-panel.is-swiping{transition:none}
}

/* Короткое толкование: поднятая литера на одной строке. Кегль 1.8em держит
   ink-высоту (.63 × 1.8 = 1.13em) внутри подъёма строки, поэтому строка не
   разъезжается, а литера стоит на общей базовой линии. */
.detail-panel .definition-versal{
  font:600 1.8em/.6 'Cormorant Garamond',serif;
  vertical-align:baseline;
  margin-right:.02em;
  color:var(--gold-bright);
  text-shadow:0 0 14px rgba(var(--theme-accent-rgb),.12);
}

/* Та же шкала в списке и на рельсе категорий: карточка и указатель — одно окно. */
.lore-glossary{--lore-band:600 10px/1.2 'Hanken Grotesk',sans-serif}
.term-list small,.results-bar span,.results-bar button,.mobile-categories button,
.category-rail header span,.category-rail footer>span,.category-rail footer small{font:var(--lore-band);letter-spacing:.16em;text-transform:uppercase}
.term-list b{font:600 19px/1.15 'Cormorant Garamond',serif}
.term-list em{font:italic 14px/1.45 'Cormorant Garamond',serif}
.category-rail nav b{font:600 13px/1.2 'Cormorant Garamond',serif}
.category-rail nav em{font:600 9px/1 'Hanken Grotesk',sans-serif}
.category-rail header strong{font-size:20px}
.category-rail footer b{font-size:14px}
.index-heading>span{font:italic 13px/1.3 'Cormorant Garamond',serif}
.search-field>span small{font:var(--lore-band);letter-spacing:.14em;text-transform:uppercase}
.search-field input,.search-field>span input{font:500 12px/1.3 'Hanken Grotesk',sans-serif}
.chapter-badge{font:var(--lore-band);letter-spacing:.12em}

@media(prefers-reduced-motion:reduce){.lore-glossary *{scroll-behavior:auto!important;animation:none!important;transition-duration:.01ms!important}}
</style>
