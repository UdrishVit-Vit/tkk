<script setup>
// Переиспользуемый каркас справочника в дизайне «нить».
// Данные, фильтры и содержимое раскрытия задаёт страница через props и слоты.
const props = defineProps({
  emblemImg: { type: String, required: true },
  emblemAlt: { type: String, default: '' },
  systemPath: { type: String, default: '/dnd5e' },
  systemLabel: { type: String, default: 'D&D 5e' },
  kicker: { type: String, default: 'D&D 5e' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  crumbCurrent: { type: String, required: true },
  searchPlaceholder: { type: String, default: 'Поиск' },
  groups: { type: Array, default: () => [] }, // [{ id, title, code?, items:[{ id, title, meta?, badge?, badgeTitle? }] }]
  total: { type: Number, default: 0 },
  visible: { type: Number, default: 0 },
  filters: { type: Array, default: () => [] }, // [{ key, label, note?, options:[{ value, label, title? }] }]
  isActive: { type: Function, default: () => false },
  activeFilterCount: { type: Number, default: 0 },
  queryKey: { type: String, default: 'open' },
  nodePrefix: { type: String, default: 'node' },
  columns: { type: Number, default: 1 }, // >1 — сетка карточек в N колонок
  threadWeb: { type: Boolean, default: false }, // золотое «плетение» нитей между узлами
  openRouteDecorations: { type: Boolean, default: true }, // подсвеченный маршрут, коннектор и искра открытой карточки
  cardCorners: { type: Boolean, default: true }, // золотые уголки на раскрытой карточке
  collapsible: { type: Boolean, default: false },
  collapseLabel: { type: String, default: 'Показать список' },
  // Панель иконок в раскрытой карточке: любой набор из ['expand','print','bookmark','link'].
  cardActions: { type: Array, default: () => [] },
  // Ключ localStorage для закладок (нужен, если в cardActions есть 'bookmark').
  bookmarkStore: { type: String, default: '' },
  emptyText: { type: String, default: 'Ничего не найдено. Попробуйте другой запрос или сбросьте фильтр.' }
})

const listShown = ref(!props.collapsible)

const emit = defineEmits(['toggle-filter', 'reset-filters'])

const route = useRoute()
const router = useRouter()

const search = defineModel('search', { type: String, default: '' })
const open = defineModel('open', { default: null })
const showFilter = defineModel('showFilter', { type: Boolean, default: false })
const renderedOpen = ref(open.value)
let openSwitchTimer = null
let openSwitchToken = 0
let switchingCards = false

function showPendingCard(token) {
  if (token !== openSwitchToken) return
  openSwitchTimer = null
  switchingCards = false
  renderedOpen.value = open.value
}

function toggleItem(item) {
  open.value = open.value === item.id ? null : item.id
}

watch(open, (nextOpen) => {
  router.replace({ query: open.value ? { [props.queryKey]: open.value } : {} })
  if (open.value !== expandedId.value) expandedId.value = null

  openSwitchToken += 1
  const token = openSwitchToken
  if (openSwitchTimer) {
    clearTimeout(openSwitchTimer)
    openSwitchTimer = null
  }

  // Сначала освобождаем старую строку сетки. Два раскрытия не должны
  // одновременно менять геометрию нити.
  if (renderedOpen.value && nextOpen && renderedOpen.value !== nextOpen) {
    switchingCards = true
    renderedOpen.value = null
    openSwitchTimer = setTimeout(() => showPendingCard(token), 280)
    return
  }

  // Во время быстрого переключения запускаем только последний выбор.
  if (!renderedOpen.value && nextOpen) {
    openSwitchTimer = setTimeout(() => showPendingCard(token), switchingCards ? 280 : 80)
    return
  }

  switchingCards = false
  renderedOpen.value = nextOpen
})

// ── Панель иконок карточки: ссылка · закладка · печать · разворот ──
const { isBookmarked, toggle: toggleBookmark, load: loadBookmarks } = useThreadBookmarks(props.bookmarkStore)

const copiedId = ref(null)
const expandedId = ref(null)
let copiedTimer = null

function cardKey(item) {
  return `${route.path}?${props.queryKey}=${item.id}`
}

function copyLink(item) {
  const href = (import.meta.client ? window.location.origin : '') + cardKey(item)
  const done = () => {
    copiedId.value = item.id
    clearTimeout(copiedTimer)
    copiedTimer = window.setTimeout(() => { copiedId.value = null }, 1500)
  }
  if (import.meta.client && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(href).then(done).catch(() => fallbackCopy(href, done))
  } else {
    fallbackCopy(href, done)
  }
}

function fallbackCopy(text, done) {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    done()
  } catch {
    // не удалось — молча выходим, буфер недоступен
  }
}

function bookmarkItem(item) {
  toggleBookmark({ key: cardKey(item), path: route.path, query: `${props.queryKey}=${item.id}`, title: item.title })
}

function printCard() {
  if (import.meta.client) window.print()
}

function toggleExpand(item) {
  expandedId.value = expandedId.value === item.id ? null : item.id
}

function onBackdrop(event, item) {
  if (expandedId.value === item.id && event.target === event.currentTarget) expandedId.value = null
}

function onKeydown(event) {
  if (event.key === 'Escape' && expandedId.value) expandedId.value = null
}

watch(expandedId, (val) => {
  if (import.meta.client) document.body.style.overflow = val ? 'hidden' : ''
})

// ── «Плетение» нитей: SVG-веер от ромба уровня к каждому заклинанию + сеть между ними ──
const webRailEl = ref(null)
const webW = ref(0)
const webH = ref(0)
const webPaths = ref([])
const webNodes = ref([])
const webJunctions = ref([])
const webRoutes = ref({})
const webRouteLengths = ref({})
const webConnector = ref(null)
const routeReadyId = ref(null)
const routeArrivedId = ref(null)
const hoveredWebId = ref(null)
let webRO = null
let routeArrivalTimer = null

function hoverWeb(item) {
  hoveredWebId.value = item ? `${props.nodePrefix}-${item.id}` : null
}

const selectedWebId = computed(() => (renderedOpen.value ? `${props.nodePrefix}-${renderedOpen.value}` : null))
const openRoute = computed(() => (
  selectedWebId.value && routeReadyId.value === selectedWebId.value
    ? webRoutes.value[selectedWebId.value] || ''
    : ''
))
const openRouteDuration = computed(() => {
  const length = selectedWebId.value ? webRouteLengths.value[selectedWebId.value] || 0 : 0
  return Math.min(6.2, Math.max(2.1, length / 170))
})
const openRouteDurationText = computed(() => `${openRouteDuration.value.toFixed(2)}s`)
const openRouteStyle = computed(() => ({
  '--route-duration': openRouteDurationText.value,
  '--connector-delay': `${Math.max(1.35, openRouteDuration.value * .72).toFixed(2)}s`
}))
let webTimer = null

watch([openRoute, selectedWebId, openRouteDuration], ([routePath, selectedId, duration]) => {
  if (routeArrivalTimer) {
    clearTimeout(routeArrivalTimer)
    routeArrivalTimer = null
  }
  routeArrivedId.value = null
  if (!routePath || !selectedId) return

  const reduceMotion = import.meta.client
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const expectedId = selectedId
  routeArrivalTimer = setTimeout(() => {
    routeArrivalTimer = null
    if (selectedWebId.value === expectedId && openRoute.value) {
      routeArrivedId.value = expectedId
    }
  }, reduceMotion ? 0 : Math.round(duration * 1000) + 350)
})

function onRouteAnimationEnd(event) {
  if (!String(event.animationName || '').includes('route-weave')) return
  const pathId = event.currentTarget?.dataset?.routeId
  if (!pathId || pathId !== selectedWebId.value || !openRoute.value) return
  if (routeArrivalTimer) {
    clearTimeout(routeArrivalTimer)
    routeArrivalTimer = null
  }
  routeArrivedId.value = pathId
}

function scheduleWeb(delay = 72) {
  if (webTimer) clearTimeout(webTimer)
  webTimer = setTimeout(computeWeb, delay)
}

const TAN33 = Math.tan(33 * Math.PI / 180)

function computeWeb() {
  const rail = webRailEl.value
  const shell = railEl.value
  if (!props.threadWeb || !rail || !shell) return

  const railRect = rail.getBoundingClientRect()
  const shellRect = shell.getBoundingClientRect()
  const axis = parseFloat(getComputedStyle(shell).getPropertyValue('--axis')) || 38
  const srcX = shellRect.left + axis - railRect.left

  webW.value = rail.clientWidth
  webH.value = rail.scrollHeight

  const paths = []
  const nodes = []
  const junctions = []
  const routes = {} // маршрут искры к каждому заклинанию (ромб → шина → спайн → узел)
  const routeLengths = {}
  const routeBase = {} // «ствол+шина+вход в спайн» на случай переопределения к карточке
  const STUB = 16 // отступ спайна влево от колонки
  const CH = 6    // размер 45°-фаски у отвода

  for (const sec of rail.querySelectorAll('.thread-group')) {
    const title = sec.querySelector('.thread-group-title')
    if (!title) continue
    const tr = title.getBoundingClientRect()
    const Dx = srcX
    const Dy = tr.top - railRect.top + 17

    // Узлы, сгруппированные по колонкам (по X)
    const colMap = new Map()
    const knots = [...sec.querySelectorAll('.thread-knot')]
    const itemsGrid = sec.querySelector('.thread-items')
    const gridStyle = itemsGrid ? getComputedStyle(itemsGrid) : null
    const gridTracks = gridStyle?.gridTemplateColumns
      ?.split(/\s+/)
      .map(value => parseFloat(value))
      .filter(Number.isFinite) || []
    const gridGap = parseFloat(gridStyle?.columnGap || '0') || 0
    const gridRect = itemsGrid?.getBoundingClientRect()
    const trackX = []
    if (gridRect && gridTracks.length > 1) {
      let cursor = gridRect.left - railRect.left
      for (const width of gridTracks) {
        trackX.push(Math.round(cursor))
        cursor += width + gridGap
      }
    }

    knots.forEach((knot, index) => {
      const item = knot.querySelector('.thread-item') || knot
      const ir = item.getBoundingClientRect()
      // Раскрытая карточка занимает всю строку, поэтому её текущий left
      // больше не отражает исходный столбец.
      const originalColumn = trackX.length ? index % trackX.length : 0
      const x = knot.classList.contains('open') && trackX.length
        ? trackX[originalColumn]
        : Math.round(ir.left - railRect.left)
      const y = ir.top - railRect.top + Math.min(ir.height, 42) / 2
      if (!colMap.has(x)) colMap.set(x, [])
      colMap.get(x).push({ x, y, id: knot.id })
    })
    if (!colMap.size) continue

    const cols = [...colMap.keys()].sort((a, b) => a - b)
    const spineX = cols.map(cx => cx - STUB)
    const minNodeY = Math.min(...[...colMap.values()].flat().map(p => p.y))
    const busY = Math.max(Dy + 12, minNodeY - 24) // горизонтальная «шина» уровня, выше первого ряда
    const busEndX = Math.max(...spineX)

    // Ствол: ромб → 33°-диагональ → горизонтальная шина уровня
    const kinkX = Dx + (busY - Dy) / TAN33
    paths.push({ cls: 'trunk', d: `M${Dx.toFixed(1)} ${Dy.toFixed(1)} L${kinkX.toFixed(1)} ${busY.toFixed(1)} L${busEndX.toFixed(1)} ${busY.toFixed(1)}` })
    junctions.push({ x: Dx, y: Dy })

    cols.forEach((cx, ci) => {
      const sx = spineX[ci]
      const colNodes = colMap.get(cx).sort((a, b) => a.y - b.y)
      const bottomY = colNodes[colNodes.length - 1].y

      // Вертикальный спайн колонки от шины вниз
      paths.push({ cls: 'spine', d: `M${sx.toFixed(1)} ${busY.toFixed(1)} L${sx.toFixed(1)} ${bottomY.toFixed(1)}` })
      junctions.push({ x: sx, y: busY })

      // Отвод к каждому заклинанию: 45°-фаска от спайна, затем горизонталь в узел
      for (const n of colNodes) {
        paths.push({ cls: 'tap', id: n.id, d: `M${sx.toFixed(1)} ${(n.y - CH).toFixed(1)} L${(sx + CH).toFixed(1)} ${n.y.toFixed(1)} L${n.x.toFixed(1)} ${n.y.toFixed(1)}` })
        nodes.push({ x: n.x, y: n.y, id: n.id })
        // Маршрут искры: ромб → излом → шина → вниз по спайну → в узел
        if (n.id) {
          const d0 = `M${Dx.toFixed(1)} ${Dy.toFixed(1)} L${kinkX.toFixed(1)} ${busY.toFixed(1)} L${sx.toFixed(1)} ${busY.toFixed(1)}`
          routes[n.id] = `${d0} L${sx.toFixed(1)} ${n.y.toFixed(1)} L${n.x.toFixed(1)} ${n.y.toFixed(1)}`
          const d0Length = Math.hypot(kinkX - Dx, busY - Dy) + Math.abs(sx - kinkX)
          routeLengths[n.id] = d0Length + Math.abs(n.y - busY) + Math.abs(n.x - sx)
          routeBase[n.id] = { d0, d0Length, sx, targetX: n.x, busY }
        }
      }
    })
  }

  // Открытая карточка: нить приходит к верхней границе в том же столбце,
  // где находилось заклинание до раскрытия.
  let connector = null
  const openKnot = rail.querySelector('.thread-knot.open')
  if (openKnot && openKnot.id && routeBase[openKnot.id]) {
    const body = openKnot.querySelector('.rule-body')
    if (body) {
      const br = body.getBoundingClientRect()
      const { d0, d0Length, sx, targetX, busY } = routeBase[openKnot.id]
      const bodyLeft = br.left - railRect.left
      const bodyRight = br.right - railRect.left
      const connX = Math.min(bodyRight - 28, Math.max(bodyLeft + 28, targetX + 28))
      const connY = br.top - railRect.top
      const approachY = connY - CH
      routes[openKnot.id] = `${d0} L${sx.toFixed(1)} ${approachY.toFixed(1)} L${(sx + CH).toFixed(1)} ${connY.toFixed(1)} L${connX.toFixed(1)} ${connY.toFixed(1)}`
      routeLengths[openKnot.id] = d0Length
        + Math.abs(approachY - busY)
        + Math.hypot(CH, CH)
        + Math.abs(connX - (sx + CH))
      connector = { x: connX, y: connY }
    }
  }

  const computedSelection = selectedWebId.value
  const cardBodies = rail.querySelectorAll('.rule-body')
  const oldCardIsLeaving = !!rail.querySelector('.card-weave-leave-active')
  const routeCanStart = !computedSelection || (
    openKnot
    && cardBodies.length === 1
    && !oldCardIsLeaving
  )

  // При очень быстрых кликах Vue ещё может держать уходящую карточку в DOM.
  // Не фиксируем координаты новой нити, пока старая карточка окончательно
  // не покинула сетку.
  if (computedSelection && !routeCanStart) {
    webPaths.value = paths
    webNodes.value = nodes
    webJunctions.value = junctions
    webRoutes.value = {}
    webRouteLengths.value = {}
    webConnector.value = null
    routeReadyId.value = null
    scheduleWeb(120)
    return
  }

  const keepStableSelection = computedSelection
    && routeReadyId.value === computedSelection
    && webRoutes.value[computedSelection]
    && webConnector.value
  if (keepStableSelection) {
    routes[computedSelection] = webRoutes.value[computedSelection]
    routeLengths[computedSelection] = webRouteLengths.value[computedSelection]
    connector = webConnector.value
  }

  webPaths.value = paths
  webNodes.value = nodes
  webJunctions.value = junctions
  webRoutes.value = routes
  webRouteLengths.value = routeLengths
  webConnector.value = connector
  routeReadyId.value = computedSelection && connector && routes[computedSelection]
    ? computedSelection
    : null
}

onMounted(() => {
  if (!props.threadWeb) return
  webRO = new ResizeObserver(scheduleWeb)
  nextTick(() => {
    if (webRailEl.value) {
      webRO.observe(webRailEl.value)
      computeWeb()
    }
  })
  window.addEventListener('resize', scheduleWeb)
})

watch(selectedWebId, () => {
  // Сначала убираем старую нить, затем строим один стабильный маршрут
  // уже по геометрии новой карточки.
  routeReadyId.value = null
  webConnector.value = null
  webRoutes.value = {}
  webRouteLengths.value = {}
  scheduleWeb()
}, { flush: 'post' })

// Пересчёт при смене фильтров (RO ловит и это, но так надёжнее)
watch(() => props.groups, scheduleWeb, { deep: true })

onBeforeUnmount(() => {
  if (webTimer) clearTimeout(webTimer)
  if (openSwitchTimer) clearTimeout(openSwitchTimer)
  if (routeArrivalTimer) clearTimeout(routeArrivalTimer)
  if (webRO) webRO.disconnect()
  window.removeEventListener('resize', scheduleWeb)
})

// ── Искра по нити, зажигающая золотые ромбы ──────────────────────
const railEl = ref(null)
const sparkEl = ref(null)
let sparkRaf = null
let sparkTimer = null

onMounted(() => {
  if (props.cardActions.includes('bookmark')) loadBookmarks()
  window.addEventListener('keydown', onKeydown)

  const initial = String(route.query[props.queryKey] || '')
  if (initial) {
    open.value = initial
    nextTick(() => document.getElementById(`${props.nodePrefix}-${initial}`)?.scrollIntoView({ block: 'center' }))
  }

  const rail = railEl.value
  const spark = sparkEl.value
  if (!rail || !spark) return

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const SPEED = 85
  const PAUSE = 1600

  function collectNodes() {
    const railTop = rail.getBoundingClientRect().top
    const line = rail.querySelector('.screens-thread-line')
    const titles = [...rail.querySelectorAll('.thread-group-title')]
    const startY = line ? line.getBoundingClientRect().top - railTop : 0
    const nodes = titles
      .map(t => ({ el: t, y: t.getBoundingClientRect().top + 17 - railTop }))
      .sort((a, b) => a.y - b.y)
    return { startY, nodes }
  }

  function clearLit(nodes) {
    for (const n of nodes) n.el.classList.remove('lit')
  }

  if (reduce) {
    const { nodes } = collectNodes()
    for (const n of nodes) n.el.classList.add('lit')
    spark.style.display = 'none'
    return
  }

  function runPass() {
    const { startY, nodes } = collectNodes()
    if (!nodes.length) {
      sparkTimer = window.setTimeout(runPass, 400)
      return
    }
    clearLit(nodes)
    const endY = nodes[nodes.length - 1].y
    const distance = Math.max(1, endY - startY)
    const duration = (distance / SPEED) * 1000
    let start = null
    spark.style.opacity = '1'

    function frame(ts) {
      if (start === null) start = ts
      const t = Math.min(1, (ts - start) / duration)
      const y = startY + (endY - startY) * t
      spark.style.transform = `translate(-50%, ${y}px)`
      for (const n of nodes) {
        if (y >= n.y - 10) n.el.classList.add('lit')
      }
      if (t < 1) {
        sparkRaf = requestAnimationFrame(frame)
      } else {
        spark.style.opacity = '0'
        sparkTimer = window.setTimeout(runPass, PAUSE)
      }
    }
    sparkRaf = requestAnimationFrame(frame)
  }

  sparkTimer = window.setTimeout(runPass, 500)
})

onBeforeUnmount(() => {
  if (sparkRaf) cancelAnimationFrame(sparkRaf)
  if (sparkTimer) clearTimeout(sparkTimer)
  if (copiedTimer) clearTimeout(copiedTimer)
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <div class="screens-page">
    <div ref="railEl" class="screens-shell">
      <NuxtLink :to="systemPath" class="screens-emblem" :title="`Вернуться к ${systemLabel}`">
        <span class="screens-emblem-badge">
          <img :src="emblemImg" :alt="emblemAlt || title" width="120" height="120">
        </span>
      </NuxtLink>
      <span class="screens-thread-line" aria-hidden="true" />
      <span ref="sparkEl" class="thread-spark" :class="{ suppressed: !!renderedOpen }" aria-hidden="true" />

      <header class="screens-header">
        <nav class="screens-crumb" aria-label="Навигация">
          <NuxtLink to="/">Системы</NuxtLink>
          <span>/</span>
          <NuxtLink :to="systemPath">{{ systemLabel }}</NuxtLink>
          <span>/</span>
          <span>{{ crumbCurrent }}</span>
        </nav>

        <p class="screens-kicker">{{ kicker }}</p>
        <h1>{{ title }}</h1>
        <p v-if="lead" class="screens-lead">{{ lead }}</p>

        <slot name="intro" />

        <div class="screens-controls">
          <input
            v-model="search"
            type="search"
            class="screens-search"
            :placeholder="searchPlaceholder"
            aria-label="Поиск"
          >
          <button
            type="button"
            class="screens-filter-btn"
            :class="{ active: activeFilterCount || showFilter }"
            :aria-expanded="showFilter"
            title="Фильтр"
            @click="showFilter = !showFilter"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v6l-4 2v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            <span v-if="activeFilterCount" class="screens-filter-count">{{ activeFilterCount }}</span>
          </button>
          <span class="screens-count">{{ visible }} / {{ total }}</span>
        </div>

        <Transition name="weave">
          <div v-if="showFilter && filters.length" class="screens-filter-panel">
            <div v-for="fg in filters" :key="fg.key" class="screens-filter-group">
              <span class="screens-filter-label">{{ fg.label }}<span v-if="fg.note" class="screens-filter-note">{{ fg.note }}</span></span>
              <div class="screens-filter-chips">
                <button
                  v-for="opt in fg.options"
                  :key="opt.value"
                  type="button"
                  class="screens-filter-chip"
                  :class="{ active: isActive(fg.key, opt.value) }"
                  :title="opt.title || ''"
                  @click="emit('toggle-filter', fg.key, opt.value)"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>

            <button v-if="activeFilterCount" type="button" class="screens-filter-clear" @click="emit('reset-filters')">
              Сбросить всё
            </button>
          </div>
        </Transition>
      </header>

      <main class="screens-main">
        <button
          v-if="collapsible"
          type="button"
          class="thread-collapse-toggle"
          :class="{ open: listShown }"
          :aria-expanded="listShown"
          @click="listShown = !listShown"
        >
          <span class="thread-collapse-diamond" aria-hidden="true" />
          {{ collapseLabel }} <span class="thread-collapse-count">{{ visible }}</span>
          <span class="thread-collapse-chevron" aria-hidden="true" />
        </button>

        <div v-show="!collapsible || listShown" ref="webRailEl" class="thread-rail">
          <svg
            v-if="threadWeb"
            class="thread-web"
            :style="openRouteStyle"
            :width="webW"
            :height="webH"
            :viewBox="`0 0 ${webW} ${webH}`"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              v-for="(p, i) in webPaths"
              :key="`p${i}`"
              :d="p.d"
              :class="[p.cls, {
                lit: p.id && p.id === hoveredWebId,
                'open-route-hidden': !openRouteDecorations && p.id && p.id === selectedWebId
              }]"
            />
            <rect v-for="(j, i) in webJunctions" :key="`j${i}`" class="web-junction" :x="j.x - 2.6" :y="j.y - 2.6" width="5.2" height="5.2" :transform="`rotate(45 ${j.x} ${j.y})`" />
            <circle
              v-for="(n, i) in webNodes"
              :key="`c${i}`"
              :cx="n.x"
              :cy="n.y"
              r="2.1"
              :class="{
                lit: n.id && n.id === hoveredWebId,
                'open-route-hidden': !openRouteDecorations && n.id && n.id === selectedWebId
              }"
            />

            <!-- Выбранное заклинание: вся нить-маршрут золотом + ромб-коннектор у карточки + искра -->
            <path
              v-if="openRoute && openRouteDecorations"
              :key="`route-${selectedWebId}`"
              class="route-lit"
              :d="openRoute"
              :data-route-id="selectedWebId"
              pathLength="1"
              vector-effect="non-scaling-stroke"
              @animationend="onRouteAnimationEnd"
            />
            <rect
              v-if="webConnector && openRouteDecorations"
              :key="`connector-${selectedWebId}`"
              class="route-connector"
              :x="webConnector.x - 5"
              :y="webConnector.y - 5"
              width="10"
              height="10"
              :transform="`rotate(45 ${webConnector.x} ${webConnector.y})`"
            />
            <circle v-if="openRoute && openRouteDecorations" :key="`spark-${selectedWebId}`" class="route-spark" r="2.6">
              <animateMotion :path="openRoute" :dur="openRouteDurationText" fill="freeze" calcMode="paced" />
              <animate attributeName="opacity" values="0;.46;.36;0" keyTimes="0;.14;.82;1" :dur="openRouteDurationText" fill="freeze" />
            </circle>
          </svg>

          <section
            v-for="group in groups"
            :id="`grp-${group.id}`"
            :key="group.id"
            class="thread-group"
          >
            <h2 class="thread-group-title">
              {{ group.title }}
              <span v-if="group.code" class="thread-group-code">{{ group.code }}</span>
            </h2>

            <div class="thread-items" :class="{ 'thread-items-cols': columns > 1 }" :style="columns > 1 ? { '--cols': columns } : null">
              <div
                v-for="item in group.items"
                :id="`${nodePrefix}-${item.id}`"
                :key="item.id"
                class="thread-knot"
                :class="{ open: renderedOpen === item.id, expanded: expandedId === item.id }"
              >
                <button
                  type="button"
                  class="thread-item"
                  :aria-expanded="renderedOpen === item.id"
                  @click="toggleItem(item)"
                  @mouseenter="hoverWeb(item)"
                  @mouseleave="hoverWeb(null)"
                >
                  <slot name="item" :item="item" :expanded="renderedOpen === item.id">
                    <span class="thread-item-name">{{ item.title }}</span>
                    <span v-if="item.meta" class="thread-item-meta">{{ item.meta }}</span>
                  </slot>
                  <span class="thread-item-tail">
                    <span v-if="item.badge" class="thread-item-badge" :title="item.badgeTitle || ''">{{ item.badge }}</span>
                    <span class="thread-toggle" aria-hidden="true" />
                  </span>
                </button>

                <Transition name="card-weave">
                  <div v-if="renderedOpen === item.id" class="rule-body-wrap" @click="onBackdrop($event, item)">
                    <div
                      class="rule-body"
                      :class="{
                        'has-tools': cardActions.length,
                        'route-arrived': routeArrivedId === `${nodePrefix}-${item.id}`
                      }"
                    >
                      <template v-if="cardCorners">
                        <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
                        <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
                      </template>

                      <div v-if="cardActions.length" class="thread-card-tools">
                        <span class="thread-tool-flash" :class="{ show: copiedId === item.id }" aria-live="polite">{{ copiedId === item.id ? 'Скопировано' : '' }}</span>
                        <button
                          v-if="cardActions.includes('link')"
                          type="button"
                          class="thread-tool"
                          :class="{ active: copiedId === item.id }"
                          :title="copiedId === item.id ? 'Ссылка скопирована' : 'Скопировать ссылку'"
                          @click="copyLink(item)"
                        >
                          <svg v-if="copiedId === item.id" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                          <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
                        </button>
                        <button
                          v-if="cardActions.includes('bookmark')"
                          type="button"
                          class="thread-tool"
                          :class="{ active: isBookmarked(cardKey(item)) }"
                          :aria-pressed="isBookmarked(cardKey(item))"
                          :title="isBookmarked(cardKey(item)) ? 'Убрать закладку' : 'Добавить закладку'"
                          @click="bookmarkItem(item)"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path class="tool-fill" d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>
                        </button>
                        <button
                          v-if="cardActions.includes('print')"
                          type="button"
                          class="thread-tool"
                          title="Открыть окно печати"
                          @click="printCard"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
                        </button>
                        <button
                          v-if="cardActions.includes('expand')"
                          type="button"
                          class="thread-tool"
                          :class="{ active: expandedId === item.id }"
                          :aria-pressed="expandedId === item.id"
                          :title="expandedId === item.id ? 'Свернуть окно' : 'Развернуть окно'"
                          @click="toggleExpand(item)"
                        >
                          <svg v-if="expandedId === item.id" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v3a3 3 0 0 1-3 3H3"/><path d="M15 3v3a3 3 0 0 0 3 3h3"/><path d="M9 21v-3a3 3 0 0 0-3-3H3"/><path d="M15 21v-3a3 3 0 0 1 3-3h3"/></svg>
                          <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
                        </button>
                        <button
                          v-if="cardActions.includes('close')"
                          type="button"
                          class="thread-tool thread-tool-close"
                          title="Закрыть"
                          @click="open = null"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6 18 18M18 6 6 18"/></svg>
                        </button>
                      </div>

                      <slot name="body" :item="item" :expanded="expandedId === item.id" />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </section>

          <div v-if="!groups.length" class="screens-empty">
            {{ emptyText }}
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.screens-page{
  --t-bg:var(--theme-bg);
  --t-line:rgba(var(--theme-text-rgb),.12);
  --t-text:rgba(var(--theme-text-rgb),.9);
  --t-muted:rgba(var(--theme-text-rgb),.58);
  --t-faint:rgba(var(--theme-text-rgb),.38);
  --t-gold:var(--theme-accent);
  --t-gold-soft:rgba(var(--theme-accent-strong-rgb),.9);
  min-height:100vh;
  background:linear-gradient(180deg,rgba(var(--theme-contrast-rgb),.02),transparent 300px),var(--t-bg);
  color:var(--t-text);
  font-family:'Hanken Grotesk',system-ui,sans-serif;
}

.screens-shell{
  --indent:112px;
  --axis:38px;
  position:relative;
  width:min(872px,calc(100% - 48px));
  margin:0 auto;
  padding-left:var(--indent);
}

.screens-header{
  padding:38px 0 8px;
}

.screens-thread-line{
  position:absolute;
  left:var(--axis);
  transform:translateX(-50%);
  top:26px;
  bottom:56px;
  width:1px;
  background:linear-gradient(180deg,rgba(var(--theme-accent-rgb),.5),rgba(var(--theme-accent-rgb),.5) 210px,var(--t-line) 320px);
  z-index:0;
}

.thread-spark{
  position:absolute;
  left:var(--axis);
  top:0;
  width:4px;
  height:4px;
  border-radius:50%;
  background:#ffe4a0;
  box-shadow:0 0 5px 1.5px rgba(255,220,140,.7),0 0 10px 3px rgba(var(--theme-accent-rgb),.28);
  opacity:0;
  z-index:1;
  pointer-events:none;
  will-change:transform;
  transition:opacity .4s ease;
}

/* Пока заклинание выбрано — фоновая искра гаснет, ведущей становится искра-маршрут */
.thread-spark.suppressed{
  opacity:0 !important;
  display:none;
}

.screens-emblem{
  position:absolute;
  left:var(--axis);
  top:78px;
  transform:translateX(-50%);
  z-index:3;
  display:block;
  text-decoration:none;
  outline:none;
}

.screens-emblem-badge{
  position:relative;
  display:grid;
  place-items:center;
  width:116px;
  height:116px;
}

.screens-emblem-badge::before{
  content:'';
  position:absolute;
  inset:0;
  margin:auto;
  width:72px;
  height:72px;
  transform:rotate(45deg);
  border:1px solid rgba(var(--theme-accent-rgb),.55);
  background:var(--t-bg);
  transition:border-color .25s ease,box-shadow .25s ease;
}

.screens-emblem-badge::after{
  content:'';
  position:absolute;
  inset:0;
  margin:auto;
  width:88px;
  height:88px;
  transform:rotate(45deg);
  border:1px solid rgba(var(--theme-accent-rgb),.2);
  transition:border-color .25s ease;
}

.screens-emblem-badge img{
  position:relative;
  z-index:1;
  width:92px;
  height:92px;
  object-fit:contain;
  transition:transform .25s ease;
}

.screens-emblem:hover .screens-emblem-badge::before,
.screens-emblem:focus-visible .screens-emblem-badge::before{
  border-color:var(--t-gold);
  box-shadow:0 0 20px 4px rgba(var(--theme-accent-rgb),.4);
}

.screens-emblem:hover .screens-emblem-badge::after{
  border-color:rgba(var(--theme-accent-rgb),.5);
}

.screens-emblem:hover .screens-emblem-badge img{
  transform:scale(1.06);
}

.screens-crumb{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-bottom:34px;
  font-size:11px;
  font-weight:750;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.screens-crumb a{
  color:var(--t-gold-soft);
  text-decoration:none;
}

.screens-crumb a:hover{
  color:var(--theme-accent-strong);
}

.screens-kicker{
  margin:0 0 10px;
  font-size:10px;
  font-weight:800;
  letter-spacing:.26em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.72);
}

.screens-header h1{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:52px;
  line-height:1;
  font-weight:500;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:rgba(var(--theme-heading-rgb),.96);
}

.screens-lead{
  max-width:600px;
  margin:16px 0 0;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  line-height:1.5;
  color:var(--t-muted);
}

.screens-controls{
  display:flex;
  align-items:center;
  gap:14px;
  margin-top:30px;
}

.screens-search{
  flex:1;
  min-width:0;
  border:0;
  border-bottom:1px solid var(--t-line);
  background:transparent;
  padding:10px 2px;
  color:var(--t-text);
  font:inherit;
  font-size:16px;
  outline:none;
  transition:border-color .18s ease;
}

.screens-search::placeholder{
  color:var(--t-faint);
}

.screens-search:focus{
  border-color:rgba(var(--theme-accent-rgb),.6);
}

.screens-count{
  flex:0 0 auto;
  font-size:12px;
  font-weight:700;
  letter-spacing:.08em;
  color:var(--t-faint);
  font-variant-numeric:tabular-nums;
}

.screens-filter-btn{
  position:relative;
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:34px;
  height:34px;
  border:1px solid var(--t-line);
  border-radius:8px;
  background:none;
  color:var(--t-muted);
  cursor:pointer;
  transition:border-color .16s ease,color .16s ease;
}

.screens-filter-btn svg{
  width:17px;
  height:17px;
}

.screens-filter-btn:hover,
.screens-filter-btn.active{
  border-color:rgba(var(--theme-accent-rgb),.5);
  color:var(--t-gold-soft);
}

.screens-filter-count{
  position:absolute;
  top:-6px;
  right:-6px;
  min-width:15px;
  height:15px;
  padding:0 3px;
  border-radius:8px;
  background:var(--t-gold);
  color:#1a1408;
  font-size:9px;
  font-weight:850;
  line-height:15px;
  text-align:center;
}

.screens-filter-panel{
  display:flex;
  flex-direction:column;
  gap:14px;
  margin-top:18px;
  overflow:hidden;
}

.screens-filter-group{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.screens-filter-label{
  display:flex;
  align-items:baseline;
  gap:8px;
  font-size:10px;
  font-weight:800;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.screens-filter-note{
  font-size:9px;
  font-weight:700;
  letter-spacing:.06em;
  text-transform:none;
  color:rgba(var(--theme-accent-rgb),.7);
}

.screens-filter-chips{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}

.screens-filter-chip{
  border:1px solid var(--t-line);
  border-radius:999px;
  background:none;
  padding:7px 14px;
  color:var(--t-muted);
  font-size:11px;
  font-weight:750;
  letter-spacing:.08em;
  text-transform:uppercase;
  cursor:pointer;
  transition:border-color .16s ease,color .16s ease,background .16s ease;
}

.screens-filter-chip:hover{
  border-color:rgba(var(--theme-accent-rgb),.4);
  color:var(--t-gold-soft);
}

.screens-filter-chip.active{
  border-color:rgba(var(--theme-accent-rgb),.55);
  background:rgba(var(--theme-accent-rgb),.12);
  color:var(--theme-accent-strong);
}

.screens-filter-clear{
  align-self:flex-start;
  border:0;
  background:none;
  padding:2px 0;
  color:var(--t-faint);
  font-size:11px;
  font-weight:750;
  letter-spacing:.08em;
  text-transform:uppercase;
  cursor:pointer;
  transition:color .16s ease;
}

.screens-filter-clear:hover{
  color:var(--t-gold-soft);
}

.screens-main{
  padding:28px 0 90px;
}

/* Раскрывающийся список (collapsible) */
.thread-collapse-toggle{
  position:relative;
  display:flex;
  align-items:center;
  gap:10px;
  width:100%;
  margin-bottom:6px;
  padding:12px 0;
  border:0;
  background:none;
  color:rgba(var(--theme-heading-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:22px;
  font-weight:500;
  letter-spacing:.05em;
  text-transform:uppercase;
  cursor:pointer;
}

.thread-collapse-diamond{
  position:absolute;
  left:calc(var(--axis) - var(--indent) - 6px);
  top:50%;
  width:12px;
  height:12px;
  margin-top:-6px;
  border:1px solid var(--t-gold);
  background:var(--t-bg);
  transform:rotate(45deg);
  z-index:1;
}

.thread-collapse-count{
  font-family:'Hanken Grotesk',system-ui,sans-serif;
  font-size:11px;
  font-weight:800;
  letter-spacing:.1em;
  color:var(--t-faint);
}

.thread-collapse-chevron{
  width:9px;
  height:9px;
  margin-left:4px;
  border-right:1.6px solid rgba(var(--theme-accent-rgb),.7);
  border-bottom:1.6px solid rgba(var(--theme-accent-rgb),.7);
  transform:rotate(45deg);
  transition:transform .25s ease;
}

.thread-collapse-toggle.open .thread-collapse-chevron{
  transform:rotate(-135deg);
}

.thread-collapse-toggle:hover{
  color:var(--theme-accent-strong);
}

.thread-group{
  position:relative;
  margin-top:38px;
  padding-left:0;
  scroll-margin-top:24px;
}

.thread-group:first-of-type{
  margin-top:6px;
}

.thread-group-title{
  position:relative;
  display:flex;
  align-items:baseline;
  gap:12px;
  margin:0 0 6px;
  font-family:'Cormorant Garamond',serif;
  font-size:28px;
  line-height:1.15;
  font-weight:500;
  letter-spacing:.05em;
  color:rgba(var(--theme-heading-rgb),.94);
}

.thread-group-title::before{
  content:'';
  position:absolute;
  left:calc(var(--axis) - var(--indent) - 6px);
  top:11px;
  width:12px;
  height:12px;
  border:1px solid var(--t-gold);
  background:var(--t-bg);
  transform:rotate(45deg);
  transition:background .4s ease,box-shadow .4s ease;
  z-index:1;
}

.thread-group-title.lit::before{
  background:var(--t-gold);
  box-shadow:0 0 13px 3px rgba(var(--theme-accent-rgb),.6);
}

.thread-group-code{
  font-family:'Hanken Grotesk',system-ui,sans-serif;
  font-size:10px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.thread-rail{
  position:relative;
}

/* «Плетение» нитей — SVG-слой за карточками.
   svg первым в DOM и без z-index → позиционированные группы после него рисуются поверх,
   а карточки не создают stacking-контекст, чтобы fixed-оверлей раскрытия не «застревал». */
.thread-web{
  position:absolute;
  top:0;
  left:0;
  overflow:visible;
  pointer-events:none;
}

.thread-web path{
  fill:none;
  stroke-linecap:round;
  stroke-linejoin:round;
}

/* Ствол + шина уровня — самая заметная нить */
.thread-web path.trunk{
  stroke:rgba(var(--theme-accent-rgb),.42);
  stroke-width:1.2;
}

/* Вертикальные спайны колонок */
.thread-web path.spine{
  stroke:rgba(var(--theme-accent-rgb),.3);
  stroke-width:1;
}

/* Отводы к заклинаниям */
.thread-web path.tap{
  stroke:rgba(var(--theme-accent-rgb),.22);
  stroke-width:1;
}

.thread-web circle{
  fill:rgba(var(--theme-accent-rgb),.55);
  transition:fill .18s ease,r .18s ease;
}

/* Подсветка нити и узла при наведении на заклинание */
.thread-web path.tap{
  transition:stroke .18s ease,stroke-width .18s ease;
}

.thread-web path.tap.lit{
  stroke:rgba(var(--theme-accent-rgb),.95);
  stroke-width:1.6;
}

.thread-web circle.lit{
  fill:var(--theme-accent-strong);
  r:3.2;
}

/* Для страниц без декора открытого маршрута скрываем и обычный отвод к выбранной карточке. */
.thread-web .open-route-hidden{
  opacity:0;
}

/* Выбранное заклинание: вся нить-маршрут светится золотом от начала до конца */
.thread-web .route-lit{
  stroke:rgba(var(--theme-accent-rgb),.78);
  stroke-width:1.35;
  stroke-dasharray:1;
  stroke-dashoffset:1;
  filter:drop-shadow(0 0 2px rgba(var(--theme-accent-rgb),.3));
  animation:
    route-weave var(--route-duration,2.4s) linear forwards,
    route-breathe 6.4s ease-in-out var(--route-duration,2.4s) infinite alternate;
}

/* Ромб-коннектор, которым нить подключается к границе карточки */
.thread-web .route-connector{
  fill:rgba(var(--theme-accent-rgb),.76);
  stroke:rgba(255,230,174,.68);
  stroke-width:1;
  opacity:0;
  filter:drop-shadow(0 0 3px rgba(var(--theme-accent-rgb),.4));
  animation:
    connector-awaken 1.15s cubic-bezier(.22,.65,.3,1) var(--connector-delay,1.7s) forwards,
    connector-breathe 6.4s ease-in-out calc(var(--connector-delay,1.7s) + 1.15s) infinite alternate;
}

/* Искра, бегущая по маршруту к выбранной карточке */
.thread-web .route-spark{
  fill:#f2ce86;
  filter:drop-shadow(0 0 3px rgba(255,220,140,.55));
}

@keyframes route-weave{
  to{ stroke-dashoffset:0; }
}

@keyframes route-breathe{
  from{
    stroke-width:1.3;
    filter:drop-shadow(0 0 1px rgba(var(--theme-accent-rgb),.22));
  }
  to{
    stroke-width:1.5;
    filter:drop-shadow(0 0 3px rgba(var(--theme-accent-rgb),.4));
  }
}

@keyframes connector-awaken{
  0%{ opacity:0; }
  100%{ opacity:.86; }
}

@keyframes connector-breathe{
  from{
    fill:rgba(var(--theme-accent-rgb),.7);
    filter:drop-shadow(0 0 2px rgba(var(--theme-accent-rgb),.3));
  }
  to{
    fill:rgba(var(--theme-accent-rgb),.84);
    filter:drop-shadow(0 0 4px rgba(var(--theme-accent-rgb),.46));
  }
}

@media (prefers-reduced-motion:reduce){
  .thread-web .route-lit{
    stroke-dashoffset:0;
    animation:none;
  }

  .thread-web .route-connector{
    opacity:1;
    animation:none;
  }

  .thread-web .route-spark{
    display:none;
  }
}

.thread-web .web-junction{
  fill:var(--t-bg);
  stroke:rgba(var(--theme-accent-rgb),.6);
  stroke-width:1;
}

.thread-items{
  display:flex;
  flex-direction:column;
}

/* Сетка карточек в N колонок */
.thread-items-cols{
  display:grid;
  grid-template-columns:repeat(var(--cols,3),minmax(0,1fr));
  column-gap:26px;
  align-items:start;
}

.thread-items-cols .thread-knot{
  min-width:0;
}

/* Раскрытая карточка занимает всю ширину под сеткой */
.thread-items-cols .thread-knot.open{
  grid-column:1 / -1;
}

/* Точки-узлы на рельсе не совпадают с колонками — скрываем их в сетке */
.thread-items-cols .thread-item::before{
  display:none;
}

@media (max-width:900px){
  .thread-items-cols{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}

@media (max-width:600px){
  .thread-items-cols{
    grid-template-columns:1fr;
  }

  .thread-items-cols .thread-item::before{
    display:block;
  }
}

.thread-knot{
  border-bottom:1px solid rgba(var(--theme-text-rgb),.05);
  scroll-margin-top:20px;
}

.thread-knot:last-child{
  border-bottom:0;
}

.thread-item{
  position:relative;
  display:flex;
  width:100%;
  align-items:baseline;
  gap:12px;
  padding:12px 2px;
  border:0;
  background:none;
  color:inherit;
  font:inherit;
  text-align:left;
  cursor:pointer;
}

.thread-item:focus-visible{
  outline:1px solid rgba(var(--theme-accent-rgb),.6);
  outline-offset:2px;
}

.thread-item::before{
  content:'';
  position:absolute;
  left:calc(var(--axis) - var(--indent) - 2.5px);
  top:21px;
  width:5px;
  height:5px;
  border-radius:50%;
  background:rgba(var(--theme-text-rgb),.28);
  transition:background .18s ease,box-shadow .18s ease,transform .18s ease;
  z-index:1;
}

.thread-item:hover::before,
.thread-knot.open .thread-item::before{
  background:var(--t-gold);
  box-shadow:0 0 0 3px rgba(var(--theme-accent-rgb),.18);
}

.thread-knot.open .thread-item::before{
  transform:scale(1.35);
}

.thread-item-name{
  font-size:17px;
  line-height:1.3;
  font-weight:750;
  color:rgba(var(--theme-heading-rgb),.92);
  transition:color .16s ease;
}

.thread-item:hover .thread-item-name,
.thread-knot.open .thread-item-name{
  color:var(--theme-accent-strong);
}

.thread-item-meta{
  font-size:11px;
  font-weight:700;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.66);
}

.thread-item-tail{
  display:inline-flex;
  align-items:center;
  gap:12px;
  margin-left:auto;
  align-self:center;
  flex:0 0 auto;
}

.thread-item-badge{
  border:1px solid var(--t-line);
  border-radius:999px;
  padding:3px 9px;
  font-size:9.5px;
  font-weight:800;
  letter-spacing:.06em;
  color:var(--t-faint);
  cursor:help;
}

.thread-toggle{
  position:relative;
  width:14px;
  height:14px;
  flex:0 0 auto;
  transition:transform .3s cubic-bezier(.4,0,.2,1);
}

.thread-toggle::before,
.thread-toggle::after{
  content:'';
  position:absolute;
  left:50%;
  top:50%;
  background:rgba(var(--theme-text-rgb),.4);
  transition:background .16s ease;
}

.thread-toggle::before{
  width:14px;
  height:1px;
  transform:translate(-50%,-50%);
}

.thread-toggle::after{
  width:1px;
  height:14px;
  transform:translate(-50%,-50%);
}

.thread-item:hover .thread-toggle::before,
.thread-item:hover .thread-toggle::after{
  background:var(--t-gold-soft);
}

.thread-knot.open .thread-item .thread-toggle{
  transform:rotate(45deg);
}

.rule-body-wrap{
  display:grid;
  grid-template-rows:1fr;
}

.rule-body-wrap > .rule-body{
  overflow:hidden;
  min-height:0;
}

.weave-enter-active,
.weave-leave-active{
  transition:grid-template-rows .5s cubic-bezier(.4,0,.2,1),opacity .4s ease;
}

.weave-enter-from,
.weave-leave-to{
  grid-template-rows:0fr;
  opacity:0;
}

/* Раскрытия карточек идут последовательно: короткое спокойное закрытие,
   затем одинаковое по времени появление новой карточки в любом столбце. */
.card-weave-enter-active{
  transition:grid-template-rows .82s cubic-bezier(.22,.61,.36,1),opacity .68s ease;
}

.card-weave-leave-active{
  transition:grid-template-rows .22s ease-in,opacity .18s linear;
}

.card-weave-enter-from,
.card-weave-leave-to{
  grid-template-rows:0fr;
  opacity:0;
}

.rule-body{
  position:relative;
  margin:8px 0 12px;
  padding:22px 24px 20px;
  border:1px solid rgba(var(--theme-accent-rgb),.16);
  border-radius:10px;
  /* Непрозрачная подложка (цвет страницы) + лёгкий золотой тон — скрывает нити за карточкой */
  background:linear-gradient(180deg,rgba(var(--theme-accent-rgb),.045),rgba(var(--theme-contrast-rgb),.008)),var(--t-bg);
  /* постоянное лёгкое свечение у границы — карточка «подключена» к нити */
  box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.07),-4px 0 22px -13px rgba(var(--theme-accent-rgb),.55);
  animation:card-ignite 2.35s ease-in-out 1.05s backwards,card-active 6.4s ease-in-out 3.4s infinite alternate;
  transition:border-color .25s ease,box-shadow .25s ease;
}

/* После прибытия искры золотой блик обходит карточку по периметру,
   а следом остаётся спокойная тонкая золотая рамка. */
.rule-body::before,
.rule-body::after{
  content:'';
  position:absolute;
  inset:0;
  z-index:3;
  border-radius:inherit;
  padding:1px;
  pointer-events:none;
  opacity:0;
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  mask-composite:exclude;
}

.rule-body::before{
  --card-flow-angle:-70deg;
  background:conic-gradient(
    from var(--card-flow-angle),
    transparent 0deg 292deg,
    rgba(var(--theme-accent-rgb),.16) 310deg,
    rgba(255,226,158,.96) 338deg,
    transparent 360deg
  );
}

.rule-body::after{
  background:rgba(var(--theme-accent-rgb),.82);
}

.rule-body.route-arrived::before{
  animation:card-border-flow 2.8s linear forwards;
}

.rule-body.route-arrived::after{
  animation:card-border-settle 1.9s ease 1.15s forwards;
}

/* Наведение зажигает границы карточки золотом */
.rule-body:hover{
  border-color:rgba(var(--theme-accent-rgb),.62);
  box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.16),0 0 24px -6px rgba(var(--theme-accent-rgb),.45);
}

/* Зажигание границ карточки: ждём искру (backwards держит 0%), затем вспышка и затухание */
@keyframes card-ignite{
  0%{
    border-color:rgba(var(--theme-accent-rgb),.16);
    box-shadow:0 0 0 0 rgba(var(--theme-accent-rgb),0),inset 0 0 0 rgba(var(--theme-accent-rgb),0);
  }
  58%{
    border-color:rgba(var(--theme-accent-rgb),.32);
    box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.1),0 0 22px -9px rgba(var(--theme-accent-rgb),.34),inset 0 0 24px rgba(var(--theme-accent-rgb),.032);
  }
  100%{
    border-color:rgba(var(--theme-accent-rgb),.23);
    box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.07),0 0 18px -11px rgba(var(--theme-accent-rgb),.3),inset 0 0 16px rgba(var(--theme-accent-rgb),.018);
  }
}

@property --card-flow-angle{
  syntax:'<angle>';
  inherits:false;
  initial-value:-70deg;
}

@keyframes card-border-flow{
  0%{
    --card-flow-angle:-70deg;
    opacity:0;
    filter:drop-shadow(0 0 0 rgba(var(--theme-accent-rgb),0));
  }
  12%{
    opacity:.5;
  }
  58%{
    opacity:.92;
    filter:drop-shadow(0 0 3px rgba(var(--theme-accent-rgb),.32));
  }
  100%{
    --card-flow-angle:290deg;
    opacity:0;
    filter:drop-shadow(0 0 0 rgba(var(--theme-accent-rgb),0));
  }
}

@keyframes card-border-settle{
  from{
    opacity:0;
    filter:drop-shadow(0 0 0 rgba(var(--theme-accent-rgb),0));
  }
  to{
    opacity:.74;
    filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.4));
  }
}

/* После подключения карточка остаётся мягко подсвеченной, будто удерживает заряд нити. */
@keyframes card-active{
  from{
    border-color:rgba(var(--theme-accent-rgb),.21);
    box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.055),0 0 14px -12px rgba(var(--theme-accent-rgb),.24),inset 0 0 14px rgba(var(--theme-accent-rgb),.012);
  }
  to{
    border-color:rgba(var(--theme-accent-rgb),.3);
    box-shadow:0 0 0 1px rgba(var(--theme-accent-rgb),.085),0 0 20px -12px rgba(var(--theme-accent-rgb),.34),inset 0 0 19px rgba(var(--theme-accent-rgb),.024);
  }
}

@media (prefers-reduced-motion:reduce){
  .rule-body{ animation:none; }
  .rule-body.route-arrived::before{ animation:none; }
  .rule-body.route-arrived::after{
    animation:none;
    opacity:.7;
  }
}

.rt-corner{
  position:absolute;
  width:14px;
  height:14px;
  pointer-events:none;
  animation:corner-ignite 1.55s ease-out .9s both;
}

/* Уголки вспыхивают ярче и гаснут */
@keyframes corner-ignite{
  0%{ filter:drop-shadow(0 0 2px rgba(var(--theme-accent-rgb),.38)); opacity:.45; }
  100%{ filter:none; opacity:1; }
}

@media (prefers-reduced-motion:reduce){
  .rt-corner{ animation:none; }
}

.rt-corner-tl{
  top:6px;
  left:6px;
  border-top:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-left:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-radius:5px 0 0 0;
}

.rt-corner-tr{
  top:6px;
  right:6px;
  border-top:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-right:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-radius:0 5px 0 0;
}

.rt-corner-bl{
  bottom:6px;
  left:6px;
  border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-left:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-radius:0 0 0 5px;
}

.rt-corner-br{
  bottom:6px;
  right:6px;
  border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-right:1.5px solid rgba(var(--theme-accent-rgb),.5);
  border-radius:0 0 5px 0;
}

/* Панель иконок карточки — на одной строке с бейджами, справа */
.thread-card-tools{
  position:absolute;
  top:23px;
  right:24px;
  z-index:2;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:2px;
}

/* Резерв справа в первой строке бейджей, чтобы пилюли не заходили под иконки */
.rule-body.has-tools :slotted(.tref-badges){
  padding-right:148px;
}

.thread-tool{
  display:grid;
  place-items:center;
  width:30px;
  height:30px;
  border:0;
  border-radius:8px;
  background:none;
  color:var(--t-faint);
  cursor:pointer;
  transition:color .16s ease,background .16s ease;
}

.thread-tool svg{
  width:16px;
  height:16px;
  fill:none;
  stroke:currentColor;
  stroke-width:1.6;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.thread-tool .tool-fill{
  transition:fill .16s ease;
}

.thread-tool:hover{
  color:var(--t-gold-soft);
  background:rgba(var(--theme-accent-rgb),.1);
}

.thread-tool:focus-visible{
  outline:1px solid rgba(var(--theme-accent-rgb),.6);
  outline-offset:1px;
}

.thread-tool.active{
  color:var(--t-gold);
}

.thread-tool.active .tool-fill{
  fill:currentColor;
}

.thread-tool-flash{
  margin-right:6px;
  font-size:9.5px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--t-gold-soft);
  white-space:nowrap;
  opacity:0;
  transition:opacity .2s ease;
  pointer-events:none;
}

.thread-tool-flash.show{
  opacity:1;
}

/* Развёрнутая карточка — фокус-оверлей на весь экран */
.thread-knot.expanded .rule-body-wrap{
  position:fixed;
  inset:0;
  z-index:200;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  padding:48px 20px;
  overflow:auto;
  background:rgba(3,4,8,.72);
  backdrop-filter:blur(2px);
  grid-template-rows:none;
}

.thread-knot.expanded .rule-body{
  width:min(760px,100%);
  margin:auto;
  overflow:visible;
  background:var(--t-bg);
  box-shadow:0 30px 90px rgba(0,0,0,.5);
}

.screens-empty{
  margin-top:40px;
  padding:40px 0;
  text-align:center;
  color:var(--t-muted);
  border-top:1px solid var(--t-line);
  border-bottom:1px solid var(--t-line);
}

@media (max-width:720px){
  .screens-shell{
    --indent:76px;
    --axis:26px;
    width:min(100% - 20px,760px);
  }

  .screens-header h1{
    font-size:34px;
  }

  .screens-lead{
    font-size:18px;
  }

  .screens-emblem{
    top:64px;
  }

  .screens-emblem-badge{
    width:84px;
    height:84px;
  }

  .screens-emblem-badge::before{
    width:46px;
    height:46px;
  }

  .screens-emblem-badge::after{
    width:60px;
    height:60px;
  }

  .screens-emblem-badge img{
    width:62px;
    height:62px;
  }

  .screens-thread-line{
    top:150px;
  }

  .thread-item{
    flex-wrap:wrap;
    row-gap:2px;
  }

  /* На узких экранах панель — отдельной строкой сверху, без резерва под бейджами */
  .thread-card-tools{
    position:static;
    margin:-4px 0 10px;
  }

  .rule-body.has-tools :slotted(.tref-badges){
    padding-right:0;
  }
}
</style>

<!-- Печать: на страницу выводится только раскрытая карточка, чёрным по белому -->
<style>
@media print{
  body{ background:#fff !important; }
  body *{ visibility:hidden !important; }
  .rule-body,
  .rule-body *{ visibility:visible !important; }
  .rule-body{
    position:absolute !important;
    left:0;
    top:0;
    width:100%;
    margin:0 !important;
    padding:16px 10px !important;
    border:none !important;
    border-radius:0 !important;
    background:#fff !important;
    color:#000 !important;
    box-shadow:none !important;
  }
  .rule-body *{ color:#000 !important; }
  .thread-card-tools,
  .rt-corner{ display:none !important; }
  .thread-knot.expanded .rule-body-wrap{
    position:static !important;
    padding:0 !important;
    background:none !important;
    backdrop-filter:none !important;
  }
}
</style>
