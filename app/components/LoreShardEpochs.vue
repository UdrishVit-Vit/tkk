<script setup>
import { SHARD_ERAS, SHARD_CELESTIAL_BODIES } from '~/data/loreShardEras.js'
import { shardThreadPoints, threadPath } from '~/utils/loreShardThreads.js'

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
const positions = { shamas:[500,110], azrak:[320,170], ula:[680,170], manu:[240,320], eri:[240,320], dayya:[500,390] }
const hiddenSuns = computed(() => (era.value.hiddenSuns || []).map((id,index)=>({id,...SHARD_CELESTIAL_BODIES[id],x:(era.value.bodyPositions?.shamas || positions.shamas)[0],y:(era.value.bodyPositions?.shamas || positions.shamas)[1],scale:index ? 1.5 : 2.05})))
const hiddenMoons = computed(() => (era.value.hiddenMoons || []).map(id=>({id,...SHARD_CELESTIAL_BODIES[id],x:(era.value.bodyPositions?.manu || positions.manu)[0],y:(era.value.bodyPositions?.manu || positions.manu)[1],scale:1.7})))
const moonCount = computed(()=>era.value.moons.length + hiddenMoons.value.length)
const sunCount = computed(()=>era.value.suns.length + hiddenSuns.value.length)
const shardCount = computed(()=>era.value.split ? 3+(era.value.minorShards?.length || 0) : 1)
const worldNodes = computed(() => {
  const lights = [...era.value.suns,...era.value.moons].map(id => {
    const [x,y] = era.value.bodyPositions?.[id] || positions[id]
    return {id,...SHARD_CELESTIAL_BODIES[id],x,y:hasCentralSpark.value && id === 'dayya' && !isOrigin.value ? 530 : y,color:era.value.bodyColors?.[id] || SHARD_CELESTIAL_BODIES[id].color,type:SHARD_CELESTIAL_BODIES[id].sun?'sun':'moon'}
  })
  const center = hasCentralSpark.value ? [{id:'spark',title:'Искра',kind:centerLayers.value.map(layer=>layer.title).join(', '),x:atlasCenter.value.x,y:atlasCenter.value.y,type:'spark',color:'#e0c291'}] : []
  const lands = era.value.split ? [
    {id:'daskar',title:'Даскар',kind:'Крупнейший осколок',type:'land',color:'#e0c291'},
    {id:'azar',title:'Азар',kind:'Замёрзший осколок',type:'land',color:'#b5d9e5'},
    {id:'var-elor',title:'Вар’Элор',kind:'Тёмный осколок',type:'land',color:'#b8a1d9'}
  ].map(node=>{const [x,y]=era.value.shardPositions?.[node.id] || {daskar:[500,440],azar:[550,610],'var-elor':[500,770]}[node.id];return {...node,x,y}})
    : hasCentralSpark.value ? [] : [{id:'enoa',title:'Эноа',kind:'До Раскола',x:500,y:390,type:'land',color:'#e0c291'}]
  const minor = (era.value.minorShards || []).map(id=>{const [x,y]=era.value.shardPositions?.[id] || [335,505];return {id,title:"Осколок Иш'Кашим",kind:'Малый осколок',x,y,type:'land',scale:.6,color:'#d7c19a'}})
  return [...lights,...center,...[...lands,...minor].sort((a,b)=>a.y-b.y)]
})
function connection(node) {
  if (era.value.split && node.type === 'land') return threadPath(shardThreadPoints(node, atlasCenter.value))
  const parentId = era.value.bodyParents?.[node.id] || era.value.shardParents?.[node.id]
  const parent = parentId ? worldNodes.value.find(item=>item.id === parentId) : undefined
  const origin = parent ? [parent.x,parent.y] : [atlasCenter.value.x,atlasCenter.value.y]
  const dx = node.x - origin[0]
  const dy = node.y - origin[1]
  if (!dx || !dy) return `M${origin[0]} ${origin[1]} L${node.x} ${node.y}`
  const diagonal = Math.min(Math.abs(dx),Math.abs(dy))
  return `M${origin[0]} ${origin[1]} L${origin[0] + Math.sign(dx)*diagonal} ${origin[1] + Math.sign(dy)*diagonal} L${node.x} ${node.y}`
}
function shardLink(node) {
  return {path:route.path,query:{...route.query,shard:node.id},hash:''}
}
function isShard(node) { return era.value.split && ['daskar','var-elor','azar'].includes(node.id) }
function selectWorldNode(node,event) {
  if(!isShard(node)) return
  event.preventDefault()
  navigateTo(shardLink(node))
}
function timeKeyboard(event) {
  if(event.altKey || event.ctrlKey || event.metaKey) return
  const target = { ArrowLeft:Math.max(0,eraIndex.value-1), ArrowRight:Math.min(SHARD_ERAS.length-1,eraIndex.value+1), Home:0, End:SHARD_ERAS.length-1 }[event.key]
  if(target === undefined) return
  event.preventDefault()
  navigateTo(eraLink(target))
}

function eraLink(index) {
  return { path: route.path, query: { ...route.query, ...(route.hash ? { shard: props.selectedShard } : {}), era: SHARD_ERAS[index].id }, hash: '' }
}
watch(() => era.value.split, split => emit('era-change', split), { immediate: true })
</script>

<template>
  <section class="epoch-atlas" :style="{ '--era-tint': era.tint }" aria-label="Облик Эноа в разные эпохи">
    <aside class="epoch-time" @keydown="timeKeyboard">
      <p class="epoch-bookmark">ЭПОХИ <span>{{String(eraIndex+1).padStart(2,'0')}} / 07</span></p>
      <nav class="epoch-titles" aria-label="Выбор эпохи; стрелки влево и вправо — переход во времени">
        <NuxtLink v-for="(item,index) in SHARD_ERAS" :key="item.id" :to="eraLink(index)" class="epoch-title"
          :class="{'is-past':index < eraIndex,'is-current':index === eraIndex,'is-future':index > eraIndex}"
          :aria-current="index === eraIndex ? 'date' : undefined">
          <span class="epoch-title__node" aria-hidden="true"><i/><b>{{String(index+1).padStart(2,'0')}}</b></span>
          <span class="epoch-title__name" :role="index === eraIndex ? 'heading' : undefined" :aria-level="index === eraIndex ? 2 : undefined">{{item.title}}<small v-if="index === eraIndex && !futureCount">НАСТОЯЩЕЕ</small></span>
        </NuxtLink>
      </nav>
      <nav class="epoch-controls" aria-label="Переход во времени">
        <NuxtLink v-if="eraIndex" :to="eraLink(eraIndex-1)" :title="SHARD_ERAS[eraIndex-1].title" aria-label="В прошлое">← Назад</NuxtLink><span v-else aria-disabled="true">← Назад</span>
        <NuxtLink v-if="futureCount" :to="eraLink(6)" title="Время Ветров" aria-label="В настоящее">Настоящее</NuxtLink><span v-else aria-disabled="true">Настоящее</span>
        <NuxtLink v-if="futureCount" :to="eraLink(eraIndex+1)" :title="SHARD_ERAS[eraIndex+1].title" aria-label="В будущее">Вперёд →</NuxtLink><span v-else aria-disabled="true">Вперёд →</span>
      </nav>
    </aside>

    <div class="epoch-world" role="group" :aria-label="`${era.title}: ${sunCount} ${sunCount === 1 ? 'солнце' : 'солнца'}, ${moonCount} луны; ${hasCentralSpark ? `Искра в центре, ${centerLayers.map(layer=>layer.title).join(', ')}` : era.split ? 'мир разделён на осколки' : 'мир един'}`">
      <svg class="epoch-sky" :class="{'epoch-sky--vertical':era.split,'epoch-sky--origin':isOrigin,'epoch-sky--stacked':era.verticalSky}" :viewBox="`0 0 1000 ${skyHeight}`" role="group" :aria-labelledby="`${uid}-title ${uid}-desc`">
        <title :id="`${uid}-title`">{{era.title}} — мандала узлов Эноа</title>
        <desc :id="`${uid}-desc`">{{era.note}} {{hiddenSuns.length ? 'Азрак и Ула скрыты за Шамасом.' : ''}} {{hiddenMoons.length ? 'Эри скрыта за Ману.' : ''}} {{isOrigin ? 'Над Искрой Дайя; выше неё ответвляются Ману слева и оранжевая Эри справа. Над лунами — три совмещённых солнца.' : ''}} {{hasCentralSpark ? `В центре Искра; за ней: ${[...centerLayers].reverse().map(layer=>layer.title).join(', ')}. Нити исходят из Искры.` : ''}} Связанные узлы: {{worldNodes.map(node=>node.title).join(', ')}}. Расположение условное.</desc>
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
          <g v-for="node in worldNodes.filter(item=>item.id !== 'spark' && item.type !== 'center')" :key="node.id" :style="{color:node.color}"><path :d="connection(node)"/><path :d="connection(node)" class="mandala-flow"/></g>
        </TransitionGroup>
        <g v-if="!hasCentralSpark && !era.centralNode" class="mandala-heart" transform="translate(500 320)" aria-hidden="true"><path d="M0-25 25 0 0 25-25 0Z M0-15 15 0 0 15-15 0Z"/><path d="M0-5 5 0 0 5-5 0Z" fill="#e0c291"/></g>
        <TransitionGroup name="celestial" tag="g" class="hidden-suns">
          <g v-for="(sun,index) in hiddenSuns" :key="sun.id" :transform="`translate(${sun.x} ${sun.y})`" :style="{color:sun.color}" :aria-label="`${sun.title} скрыт за Шамасом`">
            <g :transform="`scale(${sun.scale})`" class="hidden-sun__mark"><path class="hidden-sun__surface" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="sun.id"/></g>
            <path class="hidden-sun__leader" :d="index ? 'M69 0H103' : 'M-94 0H-125'"/>
            <text :x="index ? 115 : -137" y="6" :text-anchor="index ? 'start' : 'end'">{{sun.title}}</text>
          </g>
        </TransitionGroup>
        <TransitionGroup name="celestial" tag="g" class="hidden-moons">
          <g v-for="moon in hiddenMoons" :key="moon.id" :transform="`translate(${moon.x} ${moon.y})`" :style="{color:moon.color}" :aria-label="`${moon.title} скрыта за Ману`">
            <g :transform="`scale(${moon.scale})`" class="hidden-sun__mark"><path class="hidden-sun__surface" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="moon.id"/></g>
            <path class="hidden-sun__leader" d="M-78 0H-101"/>
            <text x="-113" y="8" text-anchor="end">{{moon.title}}</text>
          </g>
        </TransitionGroup>
        <TransitionGroup name="celestial" tag="g">
          <a v-for="node in worldNodes" :key="node.id" :href="isShard(node) ? router.resolve(shardLink(node)).href : undefined" :aria-label="isShard(node) ? `Выбрать осколок ${node.title}` : undefined" :aria-current="isShard(node) && selectedShard === node.id ? 'true' : undefined" :class="{'is-selectable':isShard(node),'is-selected':isShard(node) && selectedShard === node.id}" @click="selectWorldNode(node,$event)" :transform="`translate(${node.x} ${node.y})`" :style="{color:node.color}" class="mandala-node">
            <TransitionGroup v-if="node.id === 'spark'" name="celestial" tag="g" class="origin-cradle">
              <g v-for="layer in centerLayers" :key="layer.id" :style="{color:layer.color}" :aria-label="`${layer.title} позади Искры`">
                <g :transform="`scale(${layer.scale})`"><path class="hidden-sun__surface" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="layer.id"/></g>
                <path v-if="isOrigin" class="hidden-sun__leader" d="M-53-53-86-86H-95"/>
                <text :x="layer.labelX" :y="layer.labelY" :text-anchor="layer.anchor">{{layer.title}}</text>
              </g>
            </TransitionGroup>
            <g :transform="`scale(${node.scale || 1})`"><path v-if="node.id !== 'spark'" class="mandala-node__halo" d="M0-58 58 0 0 58-58 0Z"/><path class="mandala-node__outer" d="M0-44 44 0 0 44-44 0Z"/><LoreCelestialKnot :id="node.id"/></g>
            <text v-if="isOrigin && node.id === 'spark'" x="98" y="8" text-anchor="start">{{node.title}}</text>
            <text v-else-if="((era.split && node.type === 'land' && !node.scale) || node.id === 'spark' || node.type === 'center')" :x="node.id === 'spark' ? Math.max(...centerLayers.map(layer=>layer.scale))*44+24 : 76" y="8" text-anchor="start">{{node.title}}</text>
            <text v-else-if="node.id === 'shamas' && hiddenSuns.length" x="115" y="74" text-anchor="start">{{node.title}}</text>
            <text v-else-if="era.verticalSky && node.type === 'moon'" x="104" y="8" text-anchor="start">{{node.title}}</text>
            <text v-else :class="{'mandala-node__minor-label':node.scale}" :y="node.id === 'shamas' && hiddenSuns.length ? 114 : node.id === 'manu' && hiddenMoons.length ? 104 : node.scale ? 53 : 78" text-anchor="middle">{{node.title}}</text>
          </a>
        </TransitionGroup>
        <text x="500" :y="skyHeight-12" text-anchor="middle" class="mandala-note">РАСПОЛОЖЕНИЕ УСЛОВНОЕ</text>
      </svg>
      <div class="epoch-world__stats" aria-live="polite"><span><b>{{ sunCount }}</b>{{ sunCount === 1 ? 'солнце' : 'солнца' }}</span><span><b>{{ moonCount }}</b>луны</span><span v-if="!isOrigin"><b>{{ String(shardCount).padStart(2,'0') }}</b>{{ era.split ? 'осколка' : 'единый мир' }}</span></div>
    </div>

    <div class="epoch-story" aria-live="polite"><p>{{era.summary}}</p><NuxtLink :to="`/lore/history/${era.history}`">Летопись ↗</NuxtLink></div>
    <p v-if="era.moons.includes('dayya')" class="epoch-draft-note">Раннее небо условно: время гибели Дайи ещё не установлено.</p>
    <div class="epoch-detail"><slot/></div>
  </section>
</template>

<style scoped>
.epoch-atlas{--thread-gold:#c4a16a;position:relative;display:grid;grid-template-columns:250px minmax(0,1fr);gap:0 40px;align-items:start;color:rgba(var(--theme-text-rgb),.8)}
.epoch-time{grid-column:1;grid-row:1/span 4;position:relative;padding-top:0;padding-bottom:18px}.epoch-bookmark{display:flex;justify-content:space-between;margin:0 0 18px;font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.2em;color:var(--gold-bright)}.epoch-bookmark span{color:rgba(var(--theme-text-rgb),.35)}
.epoch-titles{display:grid}.epoch-title{position:relative;display:flex;align-items:center;gap:22px;min-height:60px;color:rgba(var(--theme-text-rgb),.67);text-decoration:none;padding-left:0;transition:color .3s,translate .55s cubic-bezier(.2,.8,.2,1)}.epoch-title.is-past{color:rgba(var(--theme-text-rgb),.55);translate:0 0}.epoch-title.is-future{translate:0 0}.epoch-title.is-current{color:rgba(var(--theme-heading-rgb),.98);translate:0 0}.epoch-title__node{position:absolute;left:-72px;width:23px;height:23px;flex-shrink:0;border:1px solid rgba(var(--theme-accent-rgb),.4);background:var(--theme-bg);transform:translateX(-50%) rotate(45deg);box-shadow:0 0 0 4px var(--theme-bg);transition:scale .4s,border-color .3s}.epoch-title__node i{position:absolute;inset:4px;border:1px dashed #c4a16a25}.epoch-title__node b{display:grid;height:100%;place-items:center;transform:rotate(-45deg);font:10px 'Cormorant Garamond',serif;color:var(--gold-bright)}.epoch-title__name{position:relative;background:none;font:500 21px/1.05 'Cormorant Garamond',serif}.epoch-title__name small{display:block;margin-top:8px;color:var(--gold-bright);font:6px 'Hanken Grotesk',sans-serif;letter-spacing:.18em}.epoch-title.is-current .epoch-title__node{transform:translateX(-50%) rotate(45deg) scale(1.3);border-color:var(--gold-bright);box-shadow:0 0 0 4px var(--theme-bg),0 0 20px #c4a16a35}.epoch-title:hover{color:var(--gold-bright)}.epoch-title:hover .epoch-title__node{border-color:var(--gold-bright)}
.epoch-controls{display:flex;justify-content:space-between;gap:12px;margin-top:24px;padding:16px 0 0 48px;border-top:1px solid #c4a16a20}.epoch-controls a,.epoch-controls>span{font:10px 'Hanken Grotesk',sans-serif;color:#cbb68f;text-decoration:none;padding:10px 0}.epoch-controls>span{opacity:.3}.epoch-controls a:hover{color:var(--gold-bright)}
.epoch-world{grid-column:2;z-index:1;grid-row:1;position:relative;background:radial-gradient(ellipse at 50% 42%,rgba(var(--era-tint),.11),transparent 68%)}.epoch-sky{display:block;width:100%;max-height:590px;overflow:visible}.epoch-sky--vertical,.epoch-sky--stacked{max-height:none}.epoch-world__stats{display:flex;justify-content:center;gap:25px;margin:5px 0 22px}.epoch-world__stats span{display:flex;align-items:baseline;gap:7px;font:italic 14px 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.4)}.epoch-world__stats b{font:400 23px 'Cormorant Garamond',serif;color:#cbb68f}
.mandala-frame{stroke:#c4a16a;stroke-opacity:.13;stroke-width:1}.mandala-weave{stroke-opacity:.07}.mandala-connections path{fill:none;stroke:currentColor;stroke-opacity:.35;stroke-width:1.2}.mandala-connections .mandala-flow{stroke-opacity:.65;stroke-dasharray:4 24;animation:mandala-weave 8s linear infinite}.mandala-heart path{fill:#08090f;stroke:#c4a16a;stroke-width:1.2}.mandala-node{transition:opacity .3s;filter:drop-shadow(0 0 10px #c4a16a15);text-decoration:none}.mandala-node__halo{fill:none;stroke:currentColor;stroke-opacity:.13;stroke-dasharray:3 7;transition:stroke-opacity .3s}.mandala-node__outer{fill:#08090f;stroke:currentColor;stroke-opacity:.75;stroke-width:1.4}.mandala-node__inner{fill:none;stroke:currentColor;stroke-opacity:.25;stroke-dasharray:3 5}.mandala-node__glyph{fill:none;stroke:currentColor;stroke-width:1.3}.hidden-sun__surface{fill:#08090f;stroke:currentColor;stroke-width:1;stroke-opacity:.65}.hidden-sun__mark :deep(.celestial-knot){opacity:.7}.hidden-sun__leader{fill:none;stroke:currentColor;stroke-opacity:.4;stroke-width:1}.hidden-suns text,.hidden-moons text{fill:currentColor;opacity:.55;font:20px 'Cormorant Garamond',serif;letter-spacing:.03em}.mandala-node text{fill:currentColor;font:26px 'Cormorant Garamond',serif;letter-spacing:.04em}.mandala-node .mandala-node__minor-label{font-size:22px}.origin-cradle{color:#bca783}.origin-cradle :deep(.celestial-knot){opacity:.6}.mandala-node .origin-cradle text{font-size:22px;opacity:.7}.mandala-node.is-selectable{cursor:pointer}.mandala-node.is-selectable:hover .mandala-node__halo,.mandala-node.is-selected .mandala-node__halo{stroke-opacity:.8}.mandala-node.is-selectable:hover .mandala-node__outer,.mandala-node.is-selected .mandala-node__outer{stroke-width:2.4;stroke-opacity:1}.mandala-note{fill:#c4a16a60;font:7px 'Hanken Grotesk',sans-serif;letter-spacing:.18em}.mandala-link-enter-active,.mandala-link-leave-active{transition:opacity .6s}.mandala-link-enter-from,.mandala-link-leave-to{opacity:0}.celestial-enter-active,.celestial-leave-active{transition:opacity .6s}.celestial-enter-from,.celestial-leave-to{opacity:0}
.epoch-story{grid-column:2;display:flex;align-items:flex-start;gap:22px;padding:0 0 22px}.epoch-story p{flex:1;max-width:700px;margin:0;font:italic 20px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.72)}.epoch-story a{flex-shrink:0;margin-top:7px;color:#cbb68f;text-decoration:none;font:10px 'Hanken Grotesk',sans-serif}.epoch-draft-note{grid-column:2;margin:0 0 22px;font:10px/1.6 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.4)}.epoch-detail{grid-column:2}
a:focus-visible{outline:1px solid #d5b589;outline-offset:5px}.mandala-node:focus-visible{outline:none}.mandala-node:focus-visible .mandala-node__halo{stroke-opacity:1;stroke-width:2}
@keyframes weave-y{to{background-position:0 24px}}@keyframes mandala-weave{to{stroke-dashoffset:-56}}
@media(max-width:1050px){.epoch-atlas{grid-template-columns:210px minmax(0,1fr);gap:0 28px}.epoch-title__name{font-size:19px}.epoch-controls{gap:8px;padding-left:0}.epoch-controls a,.epoch-controls>span{font-size:8px}.epoch-story{flex-wrap:wrap;gap:10px}.epoch-story a{margin-top:0}.mandala-node text{font-size:30px}}
@media(max-width:760px){.epoch-atlas{display:flex;flex-direction:column;gap:0}.epoch-time{position:relative;padding-top:0;width:100%;padding-bottom:22px}.epoch-bookmark{margin:0 0 12px;height:12px}.epoch-titles{display:grid}.epoch-title{min-height:46px;gap:24px;padding-left:0;translate:0 0!important}.epoch-title__name{font-size:18px}.epoch-title__node{left:-44px;width:18px;height:18px}.epoch-title__node b{font-size:8px}.epoch-title.is-current .epoch-title__node{transform:translateX(-50%) rotate(45deg) scale(1.35)}.epoch-controls{margin:14px 0 0;padding:8px 0 0}.epoch-controls a,.epoch-controls>span{font-size:10px;padding:15px 0}.epoch-world,.epoch-story,.epoch-detail,.epoch-draft-note{width:100%}.epoch-world__stats{gap:20px;margin:0 0 22px}.mandala-node text{font-size:34px}.mandala-note{font-size:11px}.epoch-story p{font-size:19px}.epoch-story{padding-bottom:20px}}
@media(prefers-reduced-motion:reduce){*,*::before{transition:none!important;animation:none!important}}
</style>
