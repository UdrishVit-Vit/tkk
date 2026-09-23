<script setup>
const props = defineProps({
  region: { type: Object, required: true },
})
const emit = defineEmits(['expanded'])

const stage = ref(null)
const scale = ref(1)
const offset = reactive({ x: 0, y: 0 })
const selected = ref('')
const dragging = ref(false)
const expanded = ref(false)
const stageSize = reactive({ width: 0, height: 0 })
const mapAspect = computed(() => {
  const [width, height] = String(props.region.mapRatio || '').split('/').map(Number)
  return width > 0 && height > 0 ? width / height : 1.4
})
const pointers = new Map()
let resizeObserver = null
let dragOrigin = null
let pinchOrigin = null

const MIN_SCALE = 1
const MAX_SCALE = 4
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const viewStyle = computed(() => ({
  width: stageSize.width ? `${planeSize.value.width}px` : '100%',
  height: stageSize.height ? `${planeSize.value.height}px` : '100%',
  transform: `translate(-50%, -50%) translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale.value})`,
  '--pin-scale': String(1 / scale.value),
}))
const planeSize = computed(() => {
  const width = Math.min(stageSize.width, stageSize.height * mapAspect.value)
  return { width, height: width / mapAspect.value }
})

function bounds() {
  const rect = stage.value?.getBoundingClientRect()
  return rect ? { width: rect.width, height: rect.height, planeWidth: Math.min(rect.width, rect.height * mapAspect.value), planeHeight: Math.min(rect.height, rect.width / mapAspect.value), left: rect.left, top: rect.top } : null
}

function setView(nextScale, nextX, nextY) {
  const rect = bounds()
  if (!rect) return
  scale.value = clamp(nextScale, MIN_SCALE, MAX_SCALE)
  const maxX = Math.max(0, (scale.value * rect.planeWidth - rect.width) / 2)
  const maxY = Math.max(0, (scale.value * rect.planeHeight - rect.height) / 2)
  offset.x = clamp(nextX, -maxX, maxX)
  offset.y = clamp(nextY, -maxY, maxY)
}

function zoom(factor, clientX, clientY) {
  const rect = bounds()
  if (!rect) return
  const oldScale = scale.value
  const nextScale = clamp(oldScale * factor, MIN_SCALE, MAX_SCALE)
  const x = (clientX ?? rect.left + rect.width / 2) - rect.left - rect.width / 2
  const y = (clientY ?? rect.top + rect.height / 2) - rect.top - rect.height / 2
  const ratio = nextScale / oldScale
  setView(nextScale, x - (x - offset.x) * ratio, y - (y - offset.y) * ratio)
}

function reset() {
  selected.value = ''
  setView(1, 0, 0)
}

function focus(name) {
  const marker = props.region.markers?.find(item => item.name === name)
  const rect = bounds()
  if (!marker || !rect) return false
  const nextScale = Math.max(scale.value, 2.15)
  selected.value = name
  setView(nextScale,
    (0.5 - marker.x / 100) * rect.planeWidth * nextScale,
    (0.5 - marker.y / 100) * rect.planeHeight * nextScale)
  return true
}

function onWheel(event) {
  zoom(Math.exp(-event.deltaY * 0.0013), event.clientX, event.clientY)
}

function onPointerDown(event) {
  if (event.target.closest('button')) return
  stage.value?.setPointerCapture(event.pointerId)
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
  if (pointers.size === 1) {
    dragging.value = true
    dragOrigin = { x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y }
  } else if (pointers.size === 2) {
    dragging.value = true
    const [a, b] = [...pointers.values()]
    pinchOrigin = {
      distance: Math.hypot(a.x - b.x, a.y - b.y),
      midX: (a.x + b.x) / 2,
      midY: (a.y + b.y) / 2,
      scale: scale.value,
      offsetX: offset.x,
      offsetY: offset.y,
    }
  }
}

function onPointerMove(event) {
  if (!pointers.has(event.pointerId)) return
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
  if (pointers.size === 2 && pinchOrigin) {
    const rect = bounds()
    if (!rect) return
    const [a, b] = [...pointers.values()]
    const nextScale = clamp(pinchOrigin.scale * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, pinchOrigin.distance), MIN_SCALE, MAX_SCALE)
    const midX = (a.x + b.x) / 2 - rect.left - rect.width / 2
    const midY = (a.y + b.y) / 2 - rect.top - rect.height / 2
    const startX = pinchOrigin.midX - rect.left - rect.width / 2
    const startY = pinchOrigin.midY - rect.top - rect.height / 2
    const ratio = nextScale / pinchOrigin.scale
    setView(nextScale, midX - (startX - pinchOrigin.offsetX) * ratio, midY - (startY - pinchOrigin.offsetY) * ratio)
  } else if (pointers.size === 1 && dragOrigin) {
    setView(scale.value, dragOrigin.offsetX + event.clientX - dragOrigin.x, dragOrigin.offsetY + event.clientY - dragOrigin.y)
  }
}

function onPointerUp(event) {
  pointers.delete(event.pointerId)
  if (pointers.size === 1) {
    const point = [...pointers.values()][0]
    dragOrigin = { x: point.x, y: point.y, offsetX: offset.x, offsetY: offset.y }
    pinchOrigin = null
  } else if (!pointers.size) {
    dragging.value = false
    dragOrigin = null
    pinchOrigin = null
  }
}

function onKeydown(event) {
  if (event.key === 'Escape' && expanded.value) expanded.value = false
}

watch(() => props.region.id, () => {
  expanded.value = false
  reset()
})
watch(expanded, value => {
  emit('expanded', value)
  nextTick(() => {
    const rect = bounds()
    if (!rect) return
    stageSize.width = rect.width
    stageSize.height = rect.height
    if (value && window.innerWidth <= 760) {
      setView(Math.max(scale.value, Math.min(MAX_SCALE, rect.height / rect.planeHeight)), 0, 0)
    } else if (!value) {
      reset()
    } else {
      setView(scale.value, offset.x, offset.y)
    }
    if (value && selected.value) focus(selected.value)
  })
})
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  resizeObserver = new ResizeObserver(() => {
    const rect = bounds()
    if (!rect) return
    stageSize.width = rect.width
    stageSize.height = rect.height
    setView(scale.value, offset.x, offset.y)
  })
  if (stage.value) resizeObserver.observe(stage.value)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  resizeObserver?.disconnect()
})
defineExpose({ focus })
</script>

<template>
  <figure class="map-explorer" :class="{ 'is-expanded': expanded }">
    <div class="map-explorer__topline">
      <div><small>ИНТЕРАКТИВНЫЙ АТЛАС · {{ region.short.toLocaleUpperCase('ru-RU') }}</small><strong>{{ region.title }}</strong></div>
      <span>Перетаскивайте карту · колесо или жест — масштаб</span>
    </div>
    <div ref="stage" class="map-explorer__stage" :class="{ 'is-dragging': dragging }" :style="{ aspectRatio: region.mapRatio, '--map-aspect': mapAspect }"
      role="group" :aria-label="`Интерактивная карта: ${region.title}`"
      @wheel.prevent="onWheel" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp">
      <div class="map-explorer__plane" :style="viewStyle">
        <img :src="region.map" :alt="region.mapAlt" draggable="false" decoding="async">
        <button v-for="marker in region.markers || []" :key="marker.name" type="button" class="map-explorer__pin"
          :class="{ 'is-selected': selected === marker.name }" :style="{ left: `${marker.x}%`, top: `${marker.y}%` }"
          :aria-label="`Приблизить: ${marker.name}`" @click.stop="focus(marker.name)">
          <i aria-hidden="true" /><span>{{ marker.name }}</span>
        </button>
      </div>
      <div class="map-explorer__shade" aria-hidden="true" />
      <div class="map-explorer__controls" aria-label="Управление картой">
        <button type="button" aria-label="Приблизить карту" @click="zoom(1.45)">+</button>
        <button type="button" aria-label="Отдалить карту" @click="zoom(1 / 1.45)">−</button>
        <button type="button" aria-label="Сбросить масштаб и положение" @click="reset">⌖</button>
        <button type="button" :aria-label="expanded ? 'Свернуть карту' : 'Развернуть карту'" @click="expanded = !expanded">{{ expanded ? '↙' : '↗' }}</button>
      </div>
      <div class="map-explorer__status" aria-live="polite"><b>{{ selected || 'Карта целиком' }}</b><span>{{ Math.round(scale * 100) }}% · {{ (region.markers || []).length }} отметок</span></div>
    </div>
    <figcaption>
      <span>{{ region.mapCaption || (region.id === 'central' ? 'Земли Ханидов · Центральный Даскар' : region.title) }} · карта из архива пользователя</span>
      <a :href="region.map" target="_blank" rel="noopener noreferrer">Открыть исходную карту ↗</a>
    </figcaption>
  </figure>
</template>

<style scoped>
.map-explorer{margin:0;border:1px solid rgba(var(--theme-accent-rgb),.34);background:#101015;box-shadow:0 18px 58px rgba(0,0,0,.3)}
.map-explorer__topline{display:flex;justify-content:space-between;align-items:end;gap:20px;padding:16px 20px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.24);background:repeating-linear-gradient(45deg,rgba(var(--theme-accent-rgb),.018) 0 1px,transparent 1px 8px)}
.map-explorer__topline small,.map-explorer__topline strong{display:block}.map-explorer__topline small{font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.18em;color:var(--gold-bright)}.map-explorer__topline strong{margin-top:5px;font:500 27px 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95)}.map-explorer__topline>span{font:500 10px 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.54);text-align:right}
.map-explorer__stage{position:relative;width:100%;overflow:hidden;touch-action:none;cursor:grab;background:#211b1b;user-select:none}.map-explorer__stage.is-dragging{cursor:grabbing}
.map-explorer__plane{position:absolute;left:50%;top:50%;will-change:transform;transition:transform .52s cubic-bezier(.2,.7,.2,1)}.is-dragging .map-explorer__plane{transition:none}.map-explorer__plane>img{display:block;width:100%;height:100%;object-fit:fill;pointer-events:none;filter:saturate(.94) contrast(1.04)}
.map-explorer__pin{position:absolute;z-index:2;display:grid;place-items:center;width:30px;height:30px;padding:0;border:0;background:transparent;color:#ffe5b5;cursor:pointer;transform:translate(-50%,-50%) scale(var(--pin-scale));transform-origin:center}.map-explorer__pin i{width:12px;height:12px;transform:rotate(45deg);border:2px solid #fff0ce;background:#51341d;box-shadow:0 0 0 4px rgba(11,10,9,.55),0 0 12px #ffda8b}.map-explorer__pin:hover i,.map-explorer__pin.is-selected i{background:#e9bc71;box-shadow:0 0 0 5px rgba(11,10,9,.65),0 0 18px #ffda8b}.map-explorer__pin span{position:absolute;bottom:100%;left:50%;max-width:160px;padding:6px 9px;white-space:nowrap;transform:translateX(-50%);border:1px solid rgba(255,223,174,.65);background:rgba(18,16,17,.96);font:600 10px 'Hanken Grotesk',sans-serif;opacity:0;pointer-events:none}.map-explorer__pin:hover span,.map-explorer__pin.is-selected span,.map-explorer__pin:focus-visible span{opacity:1}.map-explorer__pin:focus-visible{outline:2px solid #fff;outline-offset:2px}
.map-explorer__shade{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(255,223,174,.2),inset 0 0 55px rgba(16,12,12,.44)}
.map-explorer__controls{position:absolute;z-index:3;top:15px;right:15px;display:grid;grid-template-columns:repeat(2,36px);gap:5px;padding:5px;border:1px solid rgba(255,223,174,.5);background:rgba(17,15,17,.89);backdrop-filter:blur(8px)}.map-explorer__controls button{height:36px;border:1px solid rgba(255,223,174,.22);background:rgba(255,223,174,.06);color:#ffdfad;cursor:pointer;font:22px/1 'Cormorant Garamond',serif}.map-explorer__controls button:hover,.map-explorer__controls button:focus-visible{border-color:#ffdfad;background:rgba(255,223,174,.18);outline:none}
.map-explorer__status{position:absolute;z-index:3;left:15px;bottom:15px;display:flex;align-items:baseline;gap:15px;max-width:calc(100% - 135px);padding:11px 15px;border:1px solid rgba(255,223,174,.5);background:rgba(17,15,17,.9);color:#f5dfbd;backdrop-filter:blur(8px)}.map-explorer__status b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:500 22px 'Cormorant Garamond',serif}.map-explorer__status span{flex:none;font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.07em;opacity:.68}
.map-explorer figcaption{display:flex;justify-content:space-between;gap:20px;padding:12px 18px;color:rgba(var(--theme-accent-rgb),.64);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.08em;text-transform:uppercase}.map-explorer figcaption a{color:var(--gold-bright);text-decoration:none}.map-explorer figcaption a:hover{text-decoration:underline}
.map-explorer.is-expanded{position:fixed;z-index:100;inset:12px;display:flex;flex-direction:column;margin:0;box-shadow:0 0 0 30px rgba(0,0,0,.9)}.map-explorer.is-expanded .map-explorer__stage{flex:1;min-height:0;aspect-ratio:auto!important}
@media(max-width:760px){.map-explorer__topline{padding:11px 12px}.map-explorer__topline strong{font-size:22px}.map-explorer__topline>span{display:none}.map-explorer__controls{top:8px;right:8px;grid-template-columns:repeat(2,30px);gap:3px;padding:3px}.map-explorer__controls button{height:30px;font-size:19px}.map-explorer__status{left:8px;bottom:8px;max-width:calc(100% - 95px);gap:7px;padding:7px 9px}.map-explorer__status b{font-size:16px}.map-explorer__status span{font-size:7px}.map-explorer figcaption{display:block;padding:10px 12px;line-height:1.5}.map-explorer figcaption a{display:block;margin-top:5px}.map-explorer.is-expanded{inset:0}}
@media(prefers-reduced-motion:reduce){.map-explorer__plane{transition:none}}
</style>
