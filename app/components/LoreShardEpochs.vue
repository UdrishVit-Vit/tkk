<script setup>
import { SHARD_ERAS, SHARD_CELESTIAL_BODIES } from '~/data/loreShardEras.js'
import { shardThreadPoints, threadPath } from '~/utils/loreShardThreads.js'
import { SHARD_ERA_STORIES, SHARD_NODE_STORIES } from '~/data/loreShardStories.js'
import { shardEraReading, shardNodeTimeline } from '~/data/loreShardExperience.js'

const props = defineProps({ selectedShard: { type: String, required: true } })
const emit = defineEmits(['era-change'])
const route = useRoute()
const router = useRouter()
const era = computed(() => SHARD_ERAS.find(item => item.id === (route.query.era === 'leto-treh-solnts' ? 'epoha-lyudey' : route.query.era)) || SHARD_ERAS.at(-1))
const isOrigin = computed(() => era.value.id === 'zhertva-purusha')
const atlasCenter = computed(() => era.value.worldCenter || { x: 500, y: 320 })
const skyHeight = computed(() => era.value.skyHeight || (era.value.split ? 900 : 660))
const centerLayers = computed(() => era.value.centerLayers || [])
const hasCentralSpark = computed(() => centerLayers.value.length > 0)
const eraIndex = computed(() => SHARD_ERAS.indexOf(era.value))
const uid = useId().replace(/:/g, '')
const futureCount = computed(() => SHARD_ERAS.length - eraIndex.value - 1)
const mapZoom = ref(1)
const expandedWorld = computed(() => mapZoom.value > 1)
const drawing = ref(null)
let touchOrigin = null
let pinchOrigin = null
let suppressClickUntil = 0
let slideAnimation = null
let slideDirection = 1
function startSwipe(event) {
  if(event.touches.length === 2) {
    touchOrigin = null
    const [a,b] = event.touches
    pinchOrigin = {distance:Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),zoom:mapZoom.value}
    suppressClickUntil = Date.now()+400
    return
  }
  pinchOrigin = null
  touchOrigin = !expandedWorld.value && event.touches.length === 1
    ? { x:event.touches[0].clientX, y:event.touches[0].clientY, time:Date.now() } : null
}
function trackSwipe(event) {
  if(event.touches.length === 2 && pinchOrigin?.distance > 0) {
    event.preventDefault()
    const [a,b] = event.touches
    const bounds = drawing.value?.getBoundingClientRect()
    if(bounds) setMapZoom(pinchOrigin.zoom*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/pinchOrigin.distance,
      {x:(a.clientX+b.clientX)/2-bounds.left,y:(a.clientY+b.clientY)/2-bounds.top})
    suppressClickUntil = Date.now()+400
  }
  if(event.touches.length !== 1) touchOrigin = null
}
function endSwipe(event) {
  if(pinchOrigin) {
    pinchOrigin = null
    touchOrigin = null
    suppressClickUntil = Date.now()+400
    return
  }
  const start = touchOrigin
  touchOrigin = null
  const end = event.changedTouches[0]
  if(!start || !end || expandedWorld.value) return
  const dx = end.clientX-start.x
  const dy = end.clientY-start.y
  if(Date.now()-start.time > 900 || Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy)*1.5) return
  suppressClickUntil = Date.now()+400
  moveEra(dx < 0 ? 1 : -1)
}
function moveEra(delta) {
  goToEra(eraIndex.value+delta)
}
function goToEra(index) {
  if(index < 0 || index >= SHARD_ERAS.length) return
  slideDirection = index > eraIndex.value ? 1 : -1
  navigateTo(eraLink(index))
}
watch(() => era.value.id, () => {
  slideAnimation?.cancel()
  if(import.meta.client && drawing.value?.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    slideAnimation = drawing.value.animate([
      {opacity:.3,transform:`translateX(${slideDirection*24}px)`},
      {opacity:1,transform:'translateX(0)'}
    ], {duration:320,easing:'cubic-bezier(.2,.8,.2,1)'})
  }
}, {flush:'post'})
onBeforeUnmount(() => slideAnimation?.cancel())
const positions = { shamas:[500,110], azrak:[320,170], ula:[680,170], manu:[240,320], eri:[240,320], dayya:[500,390] }
const hiddenSuns = computed(() => (era.value.hiddenSuns || []).map((id,index)=>({id,...SHARD_CELESTIAL_BODIES[id],x:(era.value.bodyPositions?.shamas || positions.shamas)[0],y:(era.value.bodyPositions?.shamas || positions.shamas)[1],scale:index ? 1.5 : 2.05})))
const hiddenMoons = computed(() => (era.value.hiddenMoons || []).map(id=>({id,...SHARD_CELESTIAL_BODIES[id],scale:1.5})))
const moonCount = computed(()=>era.value.moons.length + hiddenMoons.value.length)
const sunCount = computed(()=>era.value.suns.length + hiddenSuns.value.length)
const worldNodes = computed(() => {
  const lights = [...era.value.suns,...era.value.moons].map(id => {
    const [x,y] = era.value.bodyPositions?.[id] || positions[id]
    return {id,...SHARD_CELESTIAL_BODIES[id],x,y,scale:(id === 'manu' || id === 'eri' && hiddenMoons.value.length) && !isOrigin.value ? 1.10349 : undefined,color:era.value.bodyColors?.[id] || SHARD_CELESTIAL_BODIES[id].color,type:SHARD_CELESTIAL_BODIES[id].sun?'sun':'moon'}
  })
  const center = hasCentralSpark.value ? [{id:'spark',title:'Искра',kind:centerLayers.value.map(layer=>layer.title).join(', '),x:atlasCenter.value.x,y:atlasCenter.value.y,type:'spark',color:'#e0c291'}] : []
  const lands = era.value.split ? [
    {id:'daskar',title:'Даскар',kind:'Крупнейший осколок',type:'land',color:'#e0c291'},
    {id:'azar',title:'Азар',kind:'Замёрзший осколок',type:'land',color:'#b5d9e5'},
    {id:'var-elor',title:'Вар’Элор',kind:'Тёмный осколок',type:'land',color:'#b8a1d9'}
  ].map(node=>{const [x,y]=era.value.shardPositions?.[node.id] || {daskar:[500,440],azar:[550,610],'var-elor':[500,770]}[node.id];return {...node,x,y}})
    : hasCentralSpark.value ? [] : [{id:'enoa',title:'Эноа',kind:'До Раскола',x:500,y:390,type:'land',color:'#e0c291'}]
  const minor = (era.value.minorShards || []).map(id=>{const [x,y]=era.value.shardPositions?.[id] || [335,505];return {id,title:'Осколок Иш’Кашим',kind:'Малый осколок',x,y,type:'land',scale:.6,color:'#d7c19a'}})
  const distant = isOrigin.value ? [] : [{id:'dalnie-chertogi',title:'Дальние Чертоги',kind:'За гранью мира',x:900,y:-130,type:'distant',scale:.55,color:'#9299b3'}]
  const spirits = era.value.spiritPockets ? [{id:'spirit-pockets',title:'Карманы мира духов',kind:'Области мира духов',x:170,y:560,type:'spirit',scale:.8,color:'#99b9b0'}] : []
  // The hidden Manu shares the foreground moon's centre and still guards Choku.
  const dreamGate = lights.find(node=>node.id === 'manu') || (hiddenMoons.value.some(node=>node.id === 'manu') ? lights.find(node=>node.id === 'eri') : undefined)
  const dreams = dreamGate ? [{id:'choku',title:'Царство Чоку',kind:'Царство Мечтателя',x:Math.max(120,dreamGate.x-260),y:dreamGate.y-100,parentId:dreamGate.id,type:'dream',scale:.7,color:'#aab4d7'}] : []
  return [...lights,...center,...[...lands,...minor].sort((a,b)=>a.y-b.y),...distant,...spirits,...dreams]
})
const inspectedId = ref(route.query.node || '')
const animatedNodeId = ref('')
const animationVersion = ref(0)
const animationKey = id => `${id}-${animatedNodeId.value === id ? animationVersion.value : 0}`
const eraStory = computed(() => SHARD_ERA_STORIES[era.value.id] || era.value.summary)
const inspectionNodes = computed(() => {
  const nodes = [...worldNodes.value.filter(node=>node.id === 'spark'),...centerLayers.value.toReversed(),...worldNodes.value.filter(node=>node.id !== 'spark'),...hiddenMoons.value,...hiddenSuns.value]
  return nodes.filter((node,index)=>SHARD_NODE_STORIES[node.id] && nodes.findIndex(item=>item.id === node.id) === index)
})
const requestedNodeId = computed(() => route.query.node || inspectedId.value)
const selectedNodeId = computed(() => inspectionNodes.value.some(node=>node.id === requestedNodeId.value) ? requestedNodeId.value : requestedNodeId.value ? 'spark' : era.value.split ? props.selectedShard : 'spark')
const selectedNode = computed(() => inspectionNodes.value.find(node=>node.id === selectedNodeId.value) || inspectionNodes.value[0])
const selectedStory = computed(() => SHARD_NODE_STORIES[selectedNode.value?.id])
const selectedReading = computed(() => shardEraReading(selectedNodeId.value, era.value))
const selectedTimeline = computed(() => shardNodeTimeline(selectedNodeId.value))
const nodeUnavailable = computed(() => requestedNodeId.value && !inspectionNodes.value.some(node => node.id === requestedNodeId.value))
const requestedTitle = computed(() => {
  for(const item of SHARD_ERAS) {
    const layer = item.centerLayers.find(node => node.id === requestedNodeId.value)
    if(layer) return layer.title
  }
  return SHARD_CELESTIAL_BODIES[requestedNodeId.value]?.title || {daskar:'Даскар',azar:'Азар','var-elor':'Вар’Элор','ish-kashim':"Осколок Иш’Кашим"}[requestedNodeId.value] || 'Выбранный узел'
})
watch(() => era.value.id, () => { animatedNodeId.value = '' })
watch(() => route.query.node, id => { inspectedId.value = id || '' })
watch(() => props.selectedShard, () => { if(era.value.split && !route.query.node) inspectedId.value = props.selectedShard })
async function setMapZoom(value,point) {
  const previous = mapZoom.value
  const next = Math.max(1,Math.min(4,value))
  if(!Number.isFinite(next) || next === previous) return
  const element = drawing.value
  const anchor = point || {x:(element?.clientWidth || 0)/2,y:(element?.clientHeight || 0)/2}
  const left = element?.scrollLeft || 0
  const top = element?.scrollTop || 0
  mapZoom.value = next
  await nextTick()
  if(!element?.clientWidth) return
  element.scrollLeft = Math.max(0,(left+anchor.x)*next/previous-anchor.x)
  element.scrollTop = Math.max(0,(top+anchor.y)*next/previous-anchor.y)
}
async function resetMap() {
  mapZoom.value = 1
  touchOrigin = null
  pinchOrigin = null
  await nextTick()
  if(drawing.value) { drawing.value.scrollLeft = 0; drawing.value.scrollTop = 0 }
}
async function centerSpark() {
  await setMapZoom(Math.max(2,mapZoom.value))
  const element = drawing.value
  if(!element?.clientWidth) return
  const height = skyHeight.value+(isOrigin.value ? 0 : 200)
  const fit = Math.min(element.clientWidth/1120,element.clientHeight/height)
  const x = (element.clientWidth-1120*fit)/2+(atlasCenter.value.x+60)*fit
  const y = (element.clientHeight-height*fit)/2+(atlasCenter.value.y+(isOrigin.value ? 0 : 200))*fit
  element.scrollLeft = Math.max(0,x*mapZoom.value-element.clientWidth/2)
  element.scrollTop = Math.max(0,y*mapZoom.value-element.clientHeight/2)
}
watch(() => era.value.id,resetMap)
function worldEscape(event) {
  if(!expandedWorld.value) return
  event.stopPropagation()
  event.preventDefault()
  resetMap()
}
function layerLeader(layer) {
  const radius = layer.scale * 44
  if(layer.anchor === 'middle') return `M0 ${radius} V${layer.labelY-18}`
  const side = layer.anchor === 'start' ? 1 : -1
  const y = Math.max(-radius*.7,Math.min(radius*.7,layer.labelY-6))
  const x = side*(radius-Math.abs(y))
  return `M${x} ${y} L${layer.labelX-side*16} ${layer.labelY-6}`
}
function timelineLink(id) {
  const link = eraLink(SHARD_ERAS.findIndex(item=>item.id === id))
  link.query.node = selectedNodeId.value
  return link
}
async function selectNode(node) {
  if(Date.now() < suppressClickUntil) return
  if(import.meta.client && !window.getSelection()?.isCollapsed) return
  inspectedId.value = node.id
  animatedNodeId.value = node.id
  animationVersion.value++
  if(route.query.node !== node.id) await navigateTo(nodeLink(node))
}
function connection(node) {
  if(era.value.id === 'epoha-lyudey' && ['azrak','ula'].includes(node.id)) {
    const top = atlasCenter.value.y-44
    const side = Math.sign(node.x-atlasCenter.value.x)
    const corridor = atlasCenter.value.x+side*15
    return `M${atlasCenter.value.x} ${top} L${corridor} ${top-15} V${node.y+Math.abs(node.x-corridor)} L${node.x} ${node.y}`
  }
  if(node.type === 'distant') return `M${atlasCenter.value.x} ${atlasCenter.value.y} L${node.x} ${atlasCenter.value.y-(node.x-atlasCenter.value.x)} V${node.y}`
  if (era.value.split && node.type === 'land') return threadPath(shardThreadPoints(node, atlasCenter.value))
  const parentId = node.parentId || era.value.bodyParents?.[node.id] || era.value.shardParents?.[node.id]
  const parent = parentId ? worldNodes.value.find(item=>item.id === parentId) : undefined
  const origin = parent ? [parent.x,parent.y] : [atlasCenter.value.x,atlasCenter.value.y]
  const dx = node.x - origin[0]
  const dy = node.y - origin[1]
  if (!dx || !dy) return `M${origin[0]} ${origin[1]} L${node.x} ${node.y}`
  const diagonal = Math.min(Math.abs(dx),Math.abs(dy))
  return `M${origin[0]} ${origin[1]} L${origin[0] + Math.sign(dx)*diagonal} ${origin[1] + Math.sign(dy)*diagonal} L${node.x} ${node.y}`
}
function nodeLink(node) {
  return {path:route.path,query:{...route.query,node:node.id,...(isShard(node) ? {shard:node.id} : {})},hash:''}
}
function isShard(node) { return era.value.split && ['daskar','var-elor','azar'].includes(node.id) }
function selectWorldNode(node,event) {
  event.preventDefault()
  selectNode(node)
}
function timeKeyboard(event) {
  if(event.altKey || event.ctrlKey || event.metaKey) return
  const target = { ArrowLeft:Math.max(0,eraIndex.value-1), ArrowRight:Math.min(SHARD_ERAS.length-1,eraIndex.value+1), Home:0, End:SHARD_ERAS.length-1 }[event.key]
  if(target === undefined) return
  event.preventDefault()
  navigateTo(eraLink(target))
}

function eraLink(index) {
  return { path: route.path, query: { ...route.query, node:requestedNodeId.value || selectedNodeId.value, era: SHARD_ERAS[index].id }, hash: '' }
}
watch(() => era.value.split, split => emit('era-change', split), { immediate: true })
</script>

<template>
  <section class="epoch-atlas" :style="{ '--era-tint': era.tint, '--sky-ratio': (skyHeight+(isOrigin ? 0 : 200))/1120 }" aria-label="Облик Эноа в разные эпохи">
    <aside class="epoch-time" @keydown="timeKeyboard">
      <p class="epoch-bookmark">ЭПОХИ <span>{{String(eraIndex+1).padStart(2,'0')}} / 07</span></p>
      <nav class="epoch-titles" aria-label="Выбор эпохи; стрелки влево и вправо — переход во времени">
        <NuxtLink v-for="(item,index) in SHARD_ERAS" :key="item.id" :to="eraLink(index)" class="epoch-title"
          :class="{'is-past':index < eraIndex,'is-current':index === eraIndex,'is-future':index > eraIndex}"
          :aria-current="index === eraIndex ? 'date' : undefined">
          <span class="epoch-title__node" :style="{ '--era-emblem': `url(${item.emblem})` }" aria-hidden="true"><img :src="item.emblem" width="42" height="42" alt="" decoding="async"></span>
          <span class="epoch-title__name">{{item.title}}<small v-if="index === eraIndex && !futureCount">НАСТОЯЩЕЕ</small></span>
        </NuxtLink>
      </nav>
      <nav class="epoch-controls" aria-label="Переход во времени">
        <NuxtLink v-if="eraIndex" :to="eraLink(eraIndex-1)" :title="SHARD_ERAS[eraIndex-1].title" aria-label="В прошлое">← Назад</NuxtLink><span v-else aria-disabled="true">← Назад</span>
        <NuxtLink v-if="futureCount" :to="eraLink(6)" title="Время Ветров" aria-label="В настоящее">Настоящее</NuxtLink><span v-else aria-disabled="true">Настоящее</span>
        <NuxtLink v-if="futureCount" :to="eraLink(eraIndex+1)" :title="SHARD_ERAS[eraIndex+1].title" aria-label="В будущее">Вперёд →</NuxtLink><span v-else aria-disabled="true">Вперёд →</span>
      </nav>
    </aside>

    <div class="epoch-world" :class="{'is-expanded':expandedWorld}" @keydown.esc="worldEscape" role="group" :aria-label="`${era.title}: ${sunCount} ${sunCount === 1 ? 'солнце' : 'солнца'}, ${moonCount} луны; ${hasCentralSpark ? `Искра в центре, ${centerLayers.map(layer=>layer.title).join(', ')}` : era.split ? 'мир разделён на осколки' : 'мир един'}`">
      <div class="epoch-world-caption" aria-live="polite"><h2>{{era.title}}</h2><p v-if="era.id === 'epoha-lyudey'" class="epoch-period">Поздняя эпоха · после Раскола · Лето Трёх Солнц</p></div>
      <nav class="epoch-mobile-nav" aria-label="Переключение эпох" @keydown="timeKeyboard">
        <button type="button" :disabled="!eraIndex" :aria-label="eraIndex ? `Предыдущая эпоха: ${SHARD_ERAS[eraIndex-1].title}` : 'Начало временной нити'" @click="moveEra(-1)">←</button>
        <div class="epoch-mobile-era" aria-live="polite"><img :src="era.emblem" width="36" height="36" alt=""><div><small>ЭПОХА {{String(eraIndex+1).padStart(2,'0')}} / 07</small><h2>{{era.title}}</h2></div></div>
        <button type="button" :disabled="!futureCount" :aria-label="futureCount ? `Следующая эпоха: ${SHARD_ERAS[eraIndex+1].title}` : 'Последняя эпоха'" @click="moveEra(1)">→</button>
        <div class="epoch-mobile-dots"><button v-for="(item,index) in SHARD_ERAS" :key="item.id" type="button" :aria-label="item.title" :aria-current="index === eraIndex ? 'date' : undefined" @click="goToEra(index)"><i/></button></div>
      </nav>
      <div class="epoch-map-frame" :class="{'is-zoomed':expandedWorld}" :style="{'--map-zoom':mapZoom}">
      <div class="epoch-map-controls" role="group" aria-label="Управление картой">
        <button type="button" :disabled="mapZoom <= 1" aria-label="Отдалить карту" title="Отдалить" @click="setMapZoom(mapZoom-.5)">−</button>
        <output aria-label="Масштаб карты">{{Math.round(mapZoom*100)}}%</output>
        <button type="button" :disabled="mapZoom >= 4" aria-label="Приблизить карту" title="Приблизить" @click="setMapZoom(mapZoom+.5)">+</button>
        <button type="button" aria-label="Показать всю схему" title="Вся схема" @click="resetMap"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4H4V9M15 4H20V9M4 15V20H9M20 15V20H15M8 12H16M12 8V16"/></svg></button>
        <button type="button" aria-label="К центру Искры" title="К Искре" @click="centerSpark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3V7M12 17V21M3 12H7M17 12H21M12 6 18 12 12 18 6 12Z"/></svg></button>
      </div>
      <div ref="drawing" class="epoch-drawing" @touchstart.passive="startSwipe" @touchmove="trackSwipe" @touchend.passive="endSwipe" @touchcancel="touchOrigin=null;pinchOrigin=null" :tabindex="expandedWorld ? 0 : -1" :aria-label="`Карта эпохи: ${era.title}`">
      <svg class="epoch-sky" :class="{'epoch-sky--vertical':era.split,'epoch-sky--origin':isOrigin,'epoch-sky--stacked':era.verticalSky}" :viewBox="`-60 ${isOrigin ? 0 : -200} 1120 ${skyHeight+(isOrigin ? 0 : 200)}`" role="group" :aria-labelledby="`${uid}-title ${uid}-desc`">
        <title :id="`${uid}-title`">{{era.title}} — мандала узлов Эноа</title>
        <desc :id="`${uid}-desc`">{{eraStory}} {{hiddenSuns.length ? 'Азрак и Ула скрыты за Шамасом.' : ''}} {{hiddenMoons.length ? (era.hiddenMoons.includes('manu') ? 'Ману выглядывает из-за Эри.' : 'Эри скрыта за Ману.') : ''}} {{era.moons.includes('dayya') ? 'Над Искрой Дайя; выше неё оранжевая Эри; позади её ромба выглядывает Ману. Над лунами — три совмещённых солнца.' : ''}} {{hasCentralSpark ? `В центре Искра; за ней: ${[...centerLayers].reverse().map(layer=>layer.title).join(', ')}. Нити исходят из Искры.` : ''}} Связанные узлы: {{worldNodes.map(node=>node.title).join(', ')}}. Расположение условное.</desc>
        <g v-if="era.verticalSky" class="mandala-frame" fill="none" aria-hidden="true">
          <path :d="`M500 24 796 195 796 ${skyHeight-220} 500 ${skyHeight-40} 204 ${skyHeight-220} 204 195Z`"/>
          <path :d="`M500 60 760 130 870 320 760 ${skyHeight-200} 500 ${skyHeight-60} 240 ${skyHeight-200} 130 320 240 130Z`"/>
          <path :d="`M500 ${atlasCenter.y-160} 660 ${atlasCenter.y} 500 ${atlasCenter.y+160} 340 ${atlasCenter.y}Z`"/>
          <path :d="`M500 24 796 ${skyHeight-220} 204 ${skyHeight-220}Z M500 ${skyHeight-40} 796 195 204 195Z`" class="mandala-weave"/>
          <path :d="`M500 0V${skyHeight-20}`" stroke-dasharray="3 9"/>
        </g>
        <g v-else-if="!era.split" class="mandala-frame" fill="none" aria-hidden="true">
          <path d="M500 24 796 195 796 445 500 616 204 445 204 195Z"/>
          <path d="M500 60 760 130 870 320 760 510 500 580 240 510 130 320 240 130Z"/>
          <path d="M500 60 760 320 500 580 240 320Z M500 130 690 320 500 510 310 320Z"/>
          <path d="M500 24 796 536 204 536Z M500 616 796 104 204 104Z" class="mandala-weave"/>
          <path d="M500 0V660M100 320H900" stroke-dasharray="3 9"/>
        </g>
        <g v-else class="mandala-frame" fill="none" aria-hidden="true">
          <path d="M500 24 796 195 796 570 500 850 204 570 204 195Z"/>
          <path d="M500 60 760 130 870 320 760 610 500 850 240 610 130 320 240 130Z"/>
          <path d="M500 60 760 320 500 580 240 320Z M500 350 740 590 500 830 260 590Z"/>
          <path d="M500 24 796 536 204 536Z M500 850 796 338 204 338Z" class="mandala-weave"/>
          <path d="M500 0V870" stroke-dasharray="3 9"/>
        </g>
        <TransitionGroup name="mandala-link" tag="g" class="mandala-connections" aria-hidden="true">
          <g v-for="node in worldNodes.filter(item=>item.id !== 'spark' && item.type !== 'center')" :key="node.id" :class="{'distant-thread':node.type === 'distant','thread-is-selected':selectedNodeId === node.id}" :style="{color:node.color}"><path :d="connection(node)"/><path :d="connection(node)" class="mandala-flow"/></g>
        </TransitionGroup>
        <g v-if="!hasCentralSpark && !era.centralNode" class="mandala-heart" transform="translate(500 320)" aria-hidden="true"><path d="M0-25 25 0 0 25-25 0Z M0-15 15 0 0 15-15 0Z"/><path d="M0-5 5 0 0 5-5 0Z" fill="#e0c291"/></g>
        <TransitionGroup name="celestial" tag="g" class="hidden-suns">
          <g v-for="(sun,index) in hiddenSuns" :key="sun.id" :transform="`translate(${sun.x} ${sun.y})`" :style="{color:sun.color}" :aria-label="`${sun.title} скрыт за Шамасом`">
            <g :transform="`scale(${sun.scale})`" class="hidden-sun__mark"><g :key="animationKey(sun.id)" :class="{'node-pulse':animatedNodeId === sun.id,'node-highlight':selectedNodeId === sun.id}"><path class="hidden-sun__surface" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="sun.id"/></g></g>
            <path class="hidden-sun__leader" :d="index ? 'M69 0H103' : 'M-94 0H-125'"/>
            <text :x="index ? 115 : -137" y="6" :text-anchor="index ? 'start' : 'end'" class="node-label" role="button" tabindex="0" @click.stop="selectNode(sun)" @keydown.enter.prevent.stop="selectNode(sun)" @keydown.space.prevent.stop="selectNode(sun)">{{sun.title}}</text>
          </g>
        </TransitionGroup>

        <TransitionGroup name="celestial" tag="g">
          <a v-for="node in worldNodes" :key="node.id" :href="router.resolve(nodeLink(node)).href" :aria-label="`История узла ${node.title}`" :aria-current="selectedNodeId === node.id ? 'true' : undefined" :class="{'is-selectable':true,'is-selected':selectedNodeId === node.id,'distant-node':node.type === 'distant','has-layers':node.id === 'spark'}" @click="selectWorldNode(node,$event)" :transform="`translate(${node.x} ${node.y})`" :style="{color:node.color}" class="mandala-node">
            <TransitionGroup v-if="node.id === (era.hiddenMoons?.includes('manu') ? 'eri' : 'manu') && hiddenMoons.length" name="celestial" tag="g" class="hidden-moons">
              <g v-for="moon in hiddenMoons" :key="moon.id" :style="{color:moon.color}" :aria-label="`${moon.title} ${moon.id === 'manu' ? 'скрыт' : 'скрыта'} за ${node.id === 'eri' ? 'Эри' : 'Ману'}`">
                <g :transform="`scale(${moon.scale})`" class="hidden-moon__mark"><g :key="animationKey(moon.id)" :class="{'node-pulse':animatedNodeId === moon.id,'node-highlight':selectedNodeId === moon.id}"><path class="hidden-sun__surface" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="moon.id"/></g></g>
                <path class="hidden-sun__leader" d="M-68 0H-91"/>
                <text x="-103" y="8" text-anchor="end" class="node-label" role="button" tabindex="0" @click.stop.prevent="selectNode(moon)" @keydown.enter.prevent.stop="selectNode(moon)" @keydown.space.prevent.stop="selectNode(moon)">{{moon.title}}</text>
              </g>
            </TransitionGroup>
            <TransitionGroup v-if="node.id === 'spark'" name="celestial" tag="g" class="origin-cradle">
              <g v-for="layer in centerLayers" :key="layer.id" :data-node-id="layer.id" :class="{'noa-layer':layer.id === 'noa','tingir-layer':layer.id === 'tingir','labyrinth-layer':layer.id === 'labyrinth','enoa-layer':layer.id === 'enoa','sanctuary-layer':layer.id === 'sanctuary','world-layer':['enoa','sanctuary'].includes(layer.id)}" :style="{color:layer.color,'--node-glow':layer.color}" :aria-label="`${layer.title} позади Искры`" @click.stop.prevent="selectNode(layer)">
                <g :transform="`scale(${layer.scale})`"><LoreShardBoundary :id="layer.id" :color="layer.color" :active="selectedNodeId === layer.id" :pulse="animatedNodeId === layer.id ? animationVersion : 0"><path class="hidden-sun__surface" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="layer.id"/></LoreShardBoundary></g>
                <path v-if="isOrigin" class="hidden-sun__leader" d="M-53-53-86-86H-95"/>
                <path class="layer-label-leader" :d="layerLeader(layer)" aria-hidden="true"/>
                <text :x="layer.labelX" :y="layer.labelY" :text-anchor="layer.anchor" class="node-label" :class="{'node-label--link':layer.id === 'noa'}" role="button" tabindex="0" @click.stop.prevent="selectNode(layer)" @keydown.enter.prevent.stop="selectNode(layer)" @keydown.space.prevent.stop="selectNode(layer)">{{layer.title}}</text>
              </g>
            </TransitionGroup>
            <g :transform="`scale(${node.scale || 1})`"><LoreShardBoundary :id="node.id" :color="node.color" :active="selectedNodeId === node.id" :pulse="animatedNodeId === node.id ? animationVersion : 0"><path v-if="node.id !== 'spark'" class="mandala-node__halo" d="M0-58 58 0 0 58-58 0Z"/><path class="mandala-node__outer" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="node.id"/></LoreShardBoundary></g>
            <text @click.stop.prevent="selectNode(node)" v-if="isOrigin && node.id === 'spark'" x="98" y="8" text-anchor="start">{{node.title}}</text>
            <text @click.stop.prevent="selectNode(node)" v-else-if="((era.split && node.type === 'land' && !node.scale) || node.id === 'spark' || node.type === 'center')" :x="node.id === 'spark' ? Math.max(...centerLayers.map(layer=>layer.scale))*44+24 : 76" y="8" text-anchor="start">{{node.title}}</text>
            <text @click.stop.prevent="selectNode(node)" v-else-if="node.id === 'shamas' && hiddenSuns.length" x="115" y="74" text-anchor="start">{{node.title}}</text>
            <text @click.stop.prevent="selectNode(node)" v-else-if="era.verticalSky && node.type === 'moon'" x="104" y="8" text-anchor="start">{{node.title}}</text>
            <text v-else-if="node.id === 'choku'" @click.stop.prevent="selectNode(node)" y="53" text-anchor="middle" class="mandala-node__minor-label">{{node.title}}</text>
            <text @click.stop.prevent="selectNode(node)" v-else :class="{'mandala-node__minor-label':node.scale}" :y="node.id === 'shamas' && hiddenSuns.length ? 114 : node.id === 'manu' && hiddenMoons.length ? 104 : node.scale ? 53 : 78" text-anchor="middle">{{node.title}}</text>
          </a>
        </TransitionGroup>
        <text x="500" :y="skyHeight-12" text-anchor="middle" class="mandala-note">РАСПОЛОЖЕНИЕ УСЛОВНОЕ</text>
      </svg>
      </div>
      <p class="epoch-map-hint">{{expandedWorld ? 'Перемещайте карту пальцем · Нажмите узел' : 'Свайп — другая эпоха · Два пальца — масштаб'}}</p>
      </div>
    </div>

    <div class="epoch-story" aria-live="polite"><div class="epoch-story-copy"><span class="epoch-story-label">Об эпохе</span><p>{{eraStory}}</p></div><NuxtLink :to="`/lore/history/${era.history}`">Читать летопись ↗</NuxtLink></div>
    <p v-if="era.id === 'epoha-pererozhdeniya'" class="epoch-draft-note">Дайя ещё в небе. К переходу в Эпоху Света она погибает, а Эри становится Кровавой Луной и скрывается за Ману.</p>
    <section v-if="selectedStory" :id="`${uid}-node-story`" tabindex="-1" class="epoch-node-story" aria-label="Истории узлов эпохи">
      <p class="epoch-node-hint">Истории узлов</p>
      <p v-if="nodeUnavailable" class="epoch-unavailable" role="status">{{requestedTitle}} не показан в этой эпохе. Сейчас выделена Искра. Ваш выбор сохранён.</p>
      <nav class="epoch-node-picker" aria-label="Выберите узел, чтобы прочитать его историю">
        <button v-for="node in inspectionNodes" :key="node.id" type="button" :aria-pressed="selectedNodeId === node.id" :style="{'--node-color':node.color}" @click="selectNode(node)">{{node.title}}</button>
      </nav>
      <div class="epoch-node-reading" aria-live="polite" aria-atomic="true">
        <div class="epoch-node-heading"><h3><button type="button" :aria-label="`Подсветить узел «${selectedNode.title}»`" @click="selectNode(selectedNode)">{{selectedNode.title}}</button></h3><NuxtLink v-if="selectedStory.glossaryId" :to="`/lore/glossary/${selectedStory.glossaryId}`">Статья ↗</NuxtLink><NuxtLink v-if="selectedStory.geographyId" :to="`/lore/geography?shard=${selectedStory.geographyId}`">Карта ↗</NuxtLink></div>
        <p class="epoch-node-current"><span>{{era.title}}</span>{{selectedReading}}</p>
        <details v-if="selectedReading !== selectedStory.text" class="epoch-node-more"><summary>Происхождение узла</summary><p>{{selectedStory.text}}</p></details>
        <details v-if="selectedTimeline.length > 1" class="epoch-node-more"><summary>Как менялся узел</summary><ol class="epoch-node-timeline"><li v-for="moment in selectedTimeline" :key="moment.id"><NuxtLink :to="timelineLink(moment.id)" :aria-current="moment.id === era.id ? 'date' : undefined">{{moment.title}}</NuxtLink><p>{{moment.text}}</p></li></ol></details>
      </div>
    </section>
    <div class="epoch-detail"><slot :node-id="selectedNodeId"/></div>
  </section>
</template>

<style scoped>
.epoch-atlas{--gold-bright:var(--theme-accent-strong,#f4e0aa);overflow-anchor:none}
.epoch-title__node{z-index:3}
.epoch-title__node::after{content:'';position:absolute;inset:-3px;z-index:-1;background:var(--theme-bg);clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);pointer-events:none}
.epoch-title__node img{position:relative;z-index:1}
/* Nested SVG groups must not capture clicks in empty space over another world's label. */
.mandala-node.has-layers{filter:none}
.origin-cradle .labyrinth-layer{--node-glow:#82b398}.origin-cradle .labyrinth-layer .hidden-sun__surface{stroke-width:1.9;stroke-opacity:.95}.origin-cradle .labyrinth-layer :deep(.celestial-knot),.origin-cradle .tingir-layer :deep(.celestial-knot){opacity:.95}
.origin-cradle .noa-layer{--node-glow:#e59a58}.origin-cradle .tingir-layer{--node-glow:#b5b1d7}
.origin-cradle .world-layer .hidden-sun__surface{stroke-width:1.8;stroke-opacity:.85}.origin-cradle .world-layer :deep(.celestial-knot){opacity:.85}.origin-cradle>g{cursor:pointer}
.node-label--link{text-decoration:underline;text-decoration-thickness:.7px;text-underline-offset:4px}
.origin-cradle .noa-layer :deep(.celestial-knot){opacity:.9}.origin-cradle .noa-layer .hidden-sun__surface{stroke-opacity:.9}
.mandala-connections .distant-thread path{stroke-opacity:.22;stroke-dasharray:3 9}.mandala-connections .distant-thread .mandala-flow{stroke-opacity:.32;stroke-dasharray:2 32;animation-duration:14s}
.mandala-node.distant-node{opacity:.65}.mandala-node.distant-node:hover,.mandala-node.distant-node.is-selected{opacity:1}.mandala-node.distant-node text{font-size:18px;letter-spacing:.05em}
.epoch-atlas text,.epoch-node-picker button,.epoch-node-heading button,.epoch-node-reading{user-select:text;-webkit-user-select:text}
.node-label{pointer-events:bounding-box;cursor:pointer}.node-label:hover,.node-label:focus-visible{opacity:1;fill:currentColor}
.node-highlight{filter:drop-shadow(0 0 8px currentColor)}.node-highlight .hidden-sun__surface{stroke-opacity:1;stroke-width:2}
.node-pulse{transform-box:view-box;transform-origin:0 0;animation:node-awaken 900ms ease-out}
.epoch-node-heading button{color:inherit;font:inherit;background:none;border:0;padding:0;text-align:left;cursor:pointer}
.epoch-node-heading button:focus-visible,.node-label:focus-visible{outline:1px solid var(--gold-bright);outline-offset:5px}
@keyframes node-awaken{0%{transform:scale(1);filter:drop-shadow(0 0 0 transparent)}35%{transform:scale(1.045);filter:drop-shadow(0 0 12px currentColor)}100%{transform:scale(1);filter:drop-shadow(0 0 0 transparent)}}
.epoch-atlas{--thread-gold:#c4a16a;position:relative;display:grid;grid-template-columns:250px minmax(0,1fr);gap:0 40px;align-items:start;color:rgba(var(--theme-text-rgb),.8)}
.epoch-time{grid-column:1;grid-row:1/span 4;position:relative;padding-top:0;padding-bottom:18px}.epoch-bookmark{display:flex;justify-content:space-between;margin:0 0 18px;font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.2em;color:var(--gold-bright)}.epoch-bookmark span{color:rgba(var(--theme-text-rgb),.35)}
.epoch-titles{display:grid}.epoch-title{position:relative;display:flex;align-items:center;gap:22px;min-height:60px;color:rgba(var(--theme-text-rgb),.67);text-decoration:none;padding-left:0;transition:color .3s,translate .55s cubic-bezier(.2,.8,.2,1)}.epoch-title.is-past{color:rgba(var(--theme-text-rgb),.55);translate:0 0}.epoch-title.is-future{translate:0 0}.epoch-title.is-current{color:rgba(var(--theme-heading-rgb),.98);translate:0 0}.epoch-title__node{position:absolute;left:-72px;display:grid;place-items:center;width:42px;height:42px;flex-shrink:0;transform:translateX(-50%);isolation:isolate;transition:transform .3s ease,filter .3s ease}.epoch-title__node::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--era-emblem) center/contain no-repeat;filter:brightness(0);transform:scale(1.08)}.epoch-title__node img{display:block;width:100%;height:100%;object-fit:contain;opacity:.7;transition:opacity .3s ease;pointer-events:none}.epoch-title__name{position:relative;background:none;font:500 21px/1.05 'Cormorant Garamond',serif}.epoch-title__name small{display:block;margin-top:8px;color:var(--gold-bright);font:6px 'Hanken Grotesk',sans-serif;letter-spacing:.18em}.epoch-title.is-current .epoch-title__node{transform:translateX(-50%) scale(1.14);filter:drop-shadow(0 0 7px rgba(var(--theme-accent-rgb),.45))}.epoch-title:hover{color:var(--gold-bright)}.epoch-title:is(:hover,:focus-visible) .epoch-title__node img,.epoch-title.is-current .epoch-title__node img{opacity:1}.epoch-title:focus-visible{outline:1px solid var(--gold-bright);outline-offset:5px}.epoch-title:is(:hover,:focus-visible) .epoch-title__node{filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.35))}
.epoch-controls{display:flex;justify-content:space-between;gap:12px;margin-top:24px;padding:16px 0 0 48px;border-top:1px solid #c4a16a20}.epoch-controls a,.epoch-controls>span{font:10px 'Hanken Grotesk',sans-serif;color:#cbb68f;text-decoration:none;padding:10px 0}.epoch-controls>span{opacity:.3}.epoch-controls a:hover{color:var(--gold-bright)}
.epoch-world{grid-column:2;z-index:1;grid-row:1;position:relative;background:radial-gradient(ellipse at 50% 42%,rgba(var(--era-tint),.11),transparent 68%)}.epoch-sky{display:block;width:100%;max-height:590px;overflow:visible}.epoch-sky--vertical,.epoch-sky--stacked{max-height:none}
.mandala-frame{stroke:#c4a16a;stroke-opacity:.13;stroke-width:1}.mandala-weave{stroke-opacity:.07}.mandala-connections path{fill:none;stroke:currentColor;stroke-opacity:.35;stroke-width:1.2}.mandala-connections .mandala-flow{stroke-opacity:.65;stroke-dasharray:4 24;animation:mandala-weave 8s linear infinite}.mandala-heart path{fill:#08090f;stroke:#c4a16a;stroke-width:1.2}.mandala-node{pointer-events:visiblePainted;transition:opacity .3s;filter:drop-shadow(0 0 10px #c4a16a15);text-decoration:none}.mandala-node__halo{fill:none;stroke:currentColor;stroke-opacity:.13;stroke-dasharray:3 7;transition:stroke-opacity .3s}.mandala-node__outer{fill:#08090f;stroke:currentColor;stroke-opacity:.75;stroke-width:1.4}.mandala-node__inner{fill:none;stroke:currentColor;stroke-opacity:.25;stroke-dasharray:3 5}.mandala-node__glyph{fill:none;stroke:currentColor;stroke-width:1.3}.hidden-sun__surface{fill:#08090f;stroke:currentColor;stroke-width:1;stroke-opacity:.65}.hidden-sun__mark :deep(.celestial-knot){opacity:.7}.hidden-moon__mark :deep(.celestial-knot){opacity:.45}.hidden-moon__mark .hidden-sun__surface{stroke-opacity:.4}.mandala-node .hidden-moons text{font-size:20px;letter-spacing:.03em;opacity:.55}.hidden-sun__leader{fill:none;stroke:currentColor;stroke-opacity:.4;stroke-width:1}.hidden-suns text,.hidden-moons text{fill:currentColor;opacity:.55;font:20px 'Cormorant Garamond',serif;letter-spacing:.03em}.mandala-node text{fill:currentColor;font:26px 'Cormorant Garamond',serif;letter-spacing:.04em}.mandala-node .mandala-node__minor-label{font-size:22px}.origin-cradle{color:#bca783}.origin-cradle :deep(.celestial-knot){opacity:.6}.mandala-node .origin-cradle text{font-size:22px;opacity:.7}.mandala-node.is-selectable{cursor:pointer}.mandala-node.is-selectable:hover .mandala-node__halo,.mandala-node.is-selected .mandala-node__halo{stroke-opacity:.8}.mandala-node.is-selectable:hover .mandala-node__outer,.mandala-node.is-selected .mandala-node__outer{stroke-width:2.4;stroke-opacity:1}.mandala-note{fill:#c4a16a60;font:7px 'Hanken Grotesk',sans-serif;letter-spacing:.18em}.mandala-link-enter-active,.mandala-link-leave-active{transition:opacity .6s}.mandala-link-enter-from,.mandala-link-leave-to{opacity:0}.celestial-enter-active,.celestial-leave-active{transition:opacity .6s}.celestial-enter-from,.celestial-leave-to{opacity:0}
.epoch-story{grid-column:2;display:flex;align-items:flex-start;gap:22px;padding:0 0 22px}.epoch-story p{flex:1;max-width:700px;margin:0;font:italic 20px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.72)}.epoch-story a{flex-shrink:0;margin-top:7px;color:#cbb68f;text-decoration:none;font:10px 'Hanken Grotesk',sans-serif}.epoch-draft-note{grid-column:2;margin:0 0 22px;font:10px/1.6 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.4)}.epoch-detail{grid-column:2}
.epoch-node-story{grid-column:2;scroll-margin-top:36px;border-top:1px solid #c4a16a25;padding:20px 0 24px}.epoch-node-hint{margin:0 0 12px;font:9px 'Hanken Grotesk',sans-serif;letter-spacing:.08em;color:rgba(var(--theme-text-rgb),.45)}.epoch-node-story:focus{outline:none}.epoch-node-picker{display:flex;flex-wrap:wrap;gap:8px 18px;margin-bottom:24px}.epoch-node-picker button{display:flex;align-items:center;gap:8px;border:0;background:none;padding:6px 0;color:rgba(var(--theme-text-rgb),.6);font:16px 'Cormorant Garamond',serif;cursor:pointer}.epoch-node-picker button::before{content:'';width:5px;height:5px;border:1px solid var(--node-color,#c4a16a);transform:rotate(45deg);opacity:.45}.epoch-node-picker button[aria-pressed='true']{color:var(--gold-bright)}.epoch-node-picker button[aria-pressed='true']::before{background:var(--node-color,#c4a16a);opacity:1}.epoch-node-picker button:hover{color:var(--gold-bright)}.epoch-node-picker button:focus-visible{outline:1px solid #d5b589;outline-offset:5px}.epoch-node-heading{display:flex;flex-wrap:wrap;align-items:baseline;gap:18px}.epoch-node-heading h3{flex:1;margin:0;font:500 34px/1.1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95)}.epoch-node-heading a{font:10px 'Hanken Grotesk',sans-serif;color:var(--gold-bright);text-decoration:none}.epoch-node-reading>p{max-width:700px;margin:14px 0 0;font:19px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.76)}.epoch-node-reading .epoch-node-moment{font-style:italic;color:rgba(var(--theme-text-rgb),.6)}.epoch-node-moment span{display:block;margin-bottom:5px;font:8px 'Hanken Grotesk',sans-serif;color:var(--gold-bright);letter-spacing:.12em}.epoch-detail:empty{display:none}
a:focus-visible{outline:1px solid #d5b589;outline-offset:5px}.mandala-node:focus-visible{outline:none}.mandala-node:focus-visible .mandala-node__halo{stroke-opacity:1;stroke-width:2}
@keyframes weave-y{to{background-position:0 24px}}@keyframes mandala-weave{to{stroke-dashoffset:-56}}
@media(max-width:1050px){.epoch-atlas{grid-template-columns:210px minmax(0,1fr);gap:0 28px}.epoch-title__name{font-size:19px}.epoch-controls{gap:8px;padding-left:0}.epoch-controls a,.epoch-controls>span{font-size:8px}.epoch-story{flex-wrap:wrap;gap:10px}.epoch-story a{margin-top:0}.mandala-node text{font-size:30px}}
@media(max-width:760px){.epoch-atlas{display:flex;flex-direction:column;gap:0}.epoch-time{position:relative;padding-top:0;width:100%;padding-bottom:22px}.epoch-bookmark{margin:0 0 12px;height:12px}.epoch-titles{display:grid}.epoch-title{min-height:46px;gap:24px;padding-left:0;translate:0 0!important}.epoch-title__name{font-size:18px}.epoch-title__node{left:-44px;width:32px;height:32px}.epoch-title.is-current .epoch-title__node{transform:translateX(-50%) scale(1.14);filter:drop-shadow(0 0 7px rgba(var(--theme-accent-rgb),.45))}.epoch-controls{margin:14px 0 0;padding:8px 0 0}.epoch-controls a,.epoch-controls>span{font-size:10px;padding:15px 0}.epoch-world,.epoch-story,.epoch-detail,.epoch-draft-note,.epoch-node-story{width:100%}.mandala-node text{font-size:34px}.mandala-note{font-size:11px}.epoch-story p{font-size:19px}.epoch-story{padding-bottom:20px}}
@media(prefers-reduced-motion:reduce){*,*::before{transition:none!important;animation:none!important}}
.epoch-mobile-nav,.epoch-map-controls,.epoch-map-hint,.epoch-story-label{display:none}
.epoch-story-copy{flex:1;min-width:0}
.epoch-world-caption{padding:0 0 12px;border-bottom:1px solid #c4a16a30}
.epoch-world-caption h2{margin:0;font:500 32px/1.1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98)}
.epoch-period{margin:8px 0;color:var(--gold-bright);font:11px/1.6 'Hanken Grotesk',sans-serif}
.epoch-node-current>span{display:block;margin-bottom:5px;font:10px/1.5 'Hanken Grotesk',sans-serif;letter-spacing:.1em;color:var(--gold-bright)}

.epoch-node-more summary:focus-visible{outline:1px solid var(--gold-bright);outline-offset:4px}

.epoch-unavailable{max-width:660px;font:13px/1.55 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.8)}
.epoch-unavailable{border-left:2px solid var(--gold-bright);padding-left:12px;font-size:13px}

.epoch-time{position:sticky;top:16px;align-self:start;z-index:2}
.epoch-sky .mandala-frame{stroke-opacity:.08}.epoch-sky .mandala-weave{stroke-opacity:.035}
.mandala-connections .thread-is-selected path{stroke-width:2;stroke-opacity:.85}
.mandala-node text,.hidden-suns text,.hidden-moons text{opacity:.85}
.mandala-node .origin-cradle text{opacity:.95}
.mandala-node .hidden-moons text{opacity:.8}
.layer-label-leader{fill:none;stroke:currentColor;stroke-width:1;stroke-opacity:.65;pointer-events:none}
.mandala-node:focus-visible .boundary-visual :deep(.mandala-node__outer),.mandala-node:hover .boundary-visual :deep(.mandala-node__outer){stroke-opacity:1;stroke-width:2}
.mandala-node__outer,.hidden-sun__surface{fill:var(--theme-bg,#08090f);fill-opacity:1}
.mandala-node.distant-node{opacity:1}
.mandala-node.distant-node :deep(.celestial-knot){opacity:.65}
.mandala-node.distant-node:hover :deep(.celestial-knot),.mandala-node.distant-node.is-selected :deep(.celestial-knot){opacity:1}
.epoch-node-picker{gap:4px 12px}.epoch-node-picker button{min-height:36px;padding:6px 4px}
.epoch-node-picker button[aria-pressed='true']{color:var(--node-color)}
.epoch-node-more{margin-top:16px}.epoch-node-more summary{width:fit-content;padding:10px 0;cursor:pointer;font:12px/1.5 'Hanken Grotesk',sans-serif;color:var(--gold-bright)}
.epoch-node-more p{max-width:700px;font:19px/1.5 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.78)}
.epoch-node-timeline{margin:12px 0;padding:0 0 0 18px;border-left:1px solid #c4a16a50;list-style:none}
.epoch-node-timeline li{position:relative;margin-bottom:18px}.epoch-node-timeline li::before{content:'';position:absolute;left:-22px;top:6px;width:6px;height:6px;transform:rotate(45deg);border:1px solid var(--gold-bright);background:var(--theme-bg)}
.epoch-node-timeline a{font:17px 'Cormorant Garamond',serif;color:var(--gold-bright)}.epoch-node-timeline a[aria-current]{text-decoration:underline;text-underline-offset:4px}.epoch-node-timeline p{margin:8px 0}
@media(max-width:760px){
  .epoch-time{display:none}
  .epoch-controls{display:flex;justify-content:space-between;gap:8px;margin-top:6px;padding:0;border:0}.epoch-controls a,.epoch-controls>span{min-height:44px;display:flex;align-items:center;font-size:11px;padding:0 4px}
  .epoch-world{display:flex;flex-direction:column;margin-top:0;overflow:hidden}.epoch-drawing{order:0;touch-action:pan-y}.epoch-world-caption{order:2;padding:0;border:0}.epoch-world-caption h2{display:none}.epoch-world-caption .epoch-period{margin:10px 0;font-size:10px}.epoch-unavailable{order:4}
  .epoch-mobile-nav{order:1;display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;gap:8px 4px;margin:4px 0 0 32px;padding:12px 0 0;border-top:1px solid rgba(var(--theme-accent-rgb),.18)}
  .epoch-mobile-era{grid-row:1;grid-column:1/-1;display:flex;align-items:center;gap:12px;min-width:0;text-align:left;color:rgba(var(--theme-heading-rgb),.98)}
  .epoch-mobile-era img{width:36px;height:36px;flex-shrink:0;object-fit:contain}.epoch-mobile-era>div{min-width:0}
  .epoch-mobile-era h2{margin:4px 0 0;font:500 clamp(25px,7vw,29px)/1.08 'Cormorant Garamond',serif;text-wrap:balance;overflow-wrap:normal}
  .epoch-mobile-era small{display:block;color:var(--gold-bright);font:9px/1.4 'Hanken Grotesk',sans-serif;letter-spacing:.12em}
  .epoch-mobile-nav>button{grid-row:2;display:grid;place-items:center;min-width:44px;min-height:44px;padding:0;border:1px solid rgba(var(--theme-accent-rgb),.2);border-radius:3px;background:var(--theme-bg);color:var(--gold-bright);font-size:23px;cursor:pointer}.epoch-mobile-nav>button:first-child{grid-column:1}.epoch-mobile-nav>button:nth-of-type(2){grid-column:3}
  .epoch-mobile-nav button:disabled{opacity:.25;cursor:default}.epoch-mobile-nav button:focus-visible{outline:1px solid var(--gold-bright);outline-offset:2px}
  .epoch-mobile-dots{grid-column:2;grid-row:2;display:grid;grid-template-columns:repeat(7,minmax(24px,1fr));align-items:center}
  .epoch-mobile-dots button{display:grid;place-items:center;min-width:24px;height:44px;padding:0;border:0;background:none;cursor:pointer}.epoch-mobile-dots i{width:5px;height:5px;transform:rotate(45deg);border:1px solid rgba(var(--theme-accent-rgb),.55)}.epoch-mobile-dots [aria-current] i{width:7px;height:7px;background:var(--gold-bright);border-color:var(--gold-bright);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.4)}

.epoch-unavailable{box-sizing:border-box;border:0;border-radius:3px;padding:10px 12px;margin:0 0 16px;background:rgba(var(--theme-accent-rgb),.07);color:rgba(var(--theme-text-rgb),.7);font:12px/1.5 'Hanken Grotesk',sans-serif}

.epoch-world .epoch-sky .mandala-node text,.epoch-world .epoch-sky .hidden-suns text{font-size:36px}.epoch-world .mandala-note{display:none}
  .epoch-node-story{margin-top:24px;padding-top:20px;border-color:rgba(var(--theme-accent-rgb),.18)}
  .epoch-node-hint,.epoch-story-label{display:block;margin:0 0 10px;font:600 10px/1.4 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-bright)}
  .epoch-node-picker{flex-wrap:nowrap;gap:8px;overflow-x:auto;margin:0 0 20px;padding:0 2px 10px;scrollbar-width:thin;scrollbar-color:rgba(var(--theme-accent-rgb),.3) transparent;overscroll-behavior-x:contain}
  .epoch-node-picker button{flex:0 0 auto;min-height:44px;padding:8px 12px;border:1px solid rgba(var(--theme-accent-rgb),.18);border-radius:3px;white-space:nowrap;font:13px/1.4 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.8)}
  .epoch-node-picker button[aria-pressed='true']{border-color:var(--node-color);background:color-mix(in srgb,var(--node-color) 9%,transparent)}
  .epoch-node-heading{gap:6px 16px;align-items:center}.epoch-node-heading h3{font-size:32px}.epoch-node-heading a{display:inline-flex;align-items:center;min-height:44px;font-size:12px}
  .epoch-node-reading>p,.epoch-node-more p,.epoch-node-timeline p{font:17px/1.65 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.84);overflow-wrap:anywhere}
  .epoch-node-current>span{font-size:10px;line-height:1.5;letter-spacing:.04em;margin-bottom:10px;color:rgba(var(--theme-text-rgb),.6)}
  .epoch-node-more{margin-top:12px;border-top:1px solid rgba(var(--theme-accent-rgb),.15)}.epoch-node-more summary{display:flex;align-items:center;min-height:44px;padding:6px 0;font-size:13px}.epoch-node-more summary::after{content:'+';margin-left:12px;font-size:18px}.epoch-node-more[open] summary::after{content:'−'}
  .epoch-story{flex-direction:column;align-items:stretch;gap:8px;padding-top:20px;padding-bottom:0}
  .epoch-story p{font:17px/1.65 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.84);text-wrap:pretty}
  .epoch-story a{display:inline-flex;align-items:center;align-self:flex-start;min-height:44px;margin:0;font:12px/1.4 'Hanken Grotesk',sans-serif;color:var(--gold-bright)}
  .epoch-draft-note{margin-top:12px;font-size:12px;line-height:1.5}
  .epoch-world .epoch-sky .mandala-node.distant-node text{font-size:26px}.epoch-world .epoch-sky .mandala-node .mandala-node__minor-label{font-size:30px}
}
@media(max-width:360px){.epoch-mobile-nav{grid-template-columns:40px minmax(0,1fr) 40px}.epoch-mobile-nav>button{min-width:40px}}
@media(max-width:760px){
  .epoch-map-frame{--map-height:min(52svh,calc((100vw - 60px)*var(--sky-ratio)));order:0;display:flex;flex-direction:column;box-sizing:border-box;width:calc(100% - 32px);margin-left:32px;min-width:0;position:relative;border:1px solid rgba(var(--theme-accent-rgb),.32);border-radius:4px;background:radial-gradient(ellipse at 50% 45%,rgba(var(--era-tint),.1),transparent 75%),var(--theme-bg);box-shadow:inset 0 0 0 3px rgba(var(--theme-accent-rgb),.035);overflow:hidden}
  .epoch-map-frame .epoch-drawing{order:0;width:100%;height:var(--map-height);overflow:auto;overscroll-behavior:auto;scrollbar-width:none;touch-action:pan-y}.epoch-map-frame .epoch-drawing::-webkit-scrollbar{display:none}
  .epoch-map-frame.is-zoomed .epoch-drawing{touch-action:pan-x pan-y;overscroll-behavior:contain}
  .epoch-map-frame .epoch-sky{width:calc(100% * var(--map-zoom));height:calc(var(--map-height) * var(--map-zoom));max-width:none;max-height:none}
  .epoch-map-controls{order:2;display:flex;align-items:center;justify-content:center;gap:2px;flex-shrink:0;padding:4px 8px;border-top:1px solid rgba(var(--theme-accent-rgb),.15);background:var(--theme-bg)}
  .epoch-map-controls button{display:grid;place-items:center;min-width:44px;min-height:44px;padding:0;border:0;border-radius:3px;background:transparent;color:var(--gold-bright);font:24px/1 'Hanken Grotesk',sans-serif;cursor:pointer;touch-action:manipulation}
  .epoch-map-controls button:disabled{opacity:.25;cursor:default}.epoch-map-controls button:active{background:rgba(var(--theme-accent-rgb),.12)}.epoch-map-controls button:focus-visible{outline:1px solid var(--gold-bright);outline-offset:-2px}
  .epoch-map-controls svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linejoin:round;stroke-linecap:round}.epoch-map-controls output{min-width:48px;text-align:center;font:11px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.75);font-variant-numeric:tabular-nums}
  .epoch-map-hint{order:1;display:block;margin:0;padding:8px 6px;text-align:center;flex-shrink:0;background:var(--theme-bg);color:rgba(var(--theme-text-rgb),.6);font:10px/1.5 'Hanken Grotesk',sans-serif}
  .epoch-mobile-nav{margin-top:16px;padding-top:0;border-top:0}
}
</style>
