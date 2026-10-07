<script setup>
import { SHARD_ERAS, SHARD_CELESTIAL_BODIES } from '~/data/loreShardEras.js'
import { GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'

const props = defineProps({ selectedShard: { type: String, required: true } })
const emit = defineEmits(['era-change'])
const route = useRoute()
const era = computed(() => SHARD_ERAS.find(item => item.id === (route.query.era === 'leto-treh-solnts' ? 'epoha-lyudey' : route.query.era)) || SHARD_ERAS.at(-1))
const isOrigin = computed(() => era.value.id === 'zhertva-purusha')
const eraIndex = computed(() => SHARD_ERAS.indexOf(era.value))
const uid = useId().replace(/:/g, '')
const futureCount = computed(() => SHARD_ERAS.length - eraIndex.value - 1)
function titlePosition(index) {
  const offset = index - eraIndex.value
  const sideCount = offset < 0 ? eraIndex.value : futureCount.value
  return { '--time-x': offset ? `${50 + offset / (sideCount + 1) * 48}%` : '50%', '--time-width': `${48 / (sideCount + 1)}%`, '--time-font': sideCount > 4 ? '13px' : '18px' }
}
const positions = { shamas:[500,110], azrak:[320,170], ula:[680,170], manu:[240,290], eri:[760,290], dayya:[500,530] }
const worldNodes = computed(() => {
  const lights = [...era.value.suns,...era.value.moons].map(id => ({id,...SHARD_CELESTIAL_BODIES[id], x:positions[id][0],y:positions[id][1],type:SHARD_CELESTIAL_BODIES[id].sun?'sun':'moon'}))
  const lands = isOrigin.value ? [{id:'spark',title:'Колыбель Искры',kind:'Начало мира',x:500,y:390,type:'spark',color:'#e0c291'}]
    : era.value.split ? [{id:'daskar',title:'Даскар',kind:'Крупнейший осколок',x:500,y:390,type:'land',color:'#e0c291'}, {id:'var-elor',title:'Вар’Элор',kind:'Тёмный осколок',x:350,y:540,type:'land',color:'#b8a1d9'}, {id:'azar',title:'Азар',kind:'Замёрзший осколок',x:650,y:540,type:'land',color:'#b5d9e5'}]
    : [{id:'enoa',title:'Единая Эноа',kind:'До Раскола',x:500,y:390,type:'land',color:'#e0c291'}]
  return [...lights,...lands]
})
function connection(node) {
  const dx = node.x - 500
  const dy = node.y - 320
  const diagonal = Math.min(Math.abs(dx),Math.abs(dy))
  return `M500 320 L${500 + Math.sign(dx)*diagonal} ${320 + Math.sign(dy)*diagonal} L${node.x} ${node.y}`
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
    <div class="epoch-time" @keydown="timeKeyboard">
      <div class="epoch-horizontal-thread" aria-hidden="true"><i/><i/><i/><i/><b/></div>
      <div class="epoch-bookmark">ЭПОХА <span>НИТЬ ВРЕМЕНИ</span></div>
      <span class="epoch-side epoch-side--past">← ПРОШЛОЕ</span><span class="epoch-side epoch-side--future">БУДУЩЕЕ →</span>
      <nav class="epoch-titles" aria-label="Выбор эпохи; стрелки влево и вправо — переход во времени">
        <NuxtLink v-for="(item,index) in SHARD_ERAS" :key="item.id" :to="eraLink(index)" class="epoch-title"
          :class="{'is-past':index < eraIndex,'is-current':index === eraIndex,'is-future':index > eraIndex}"
          :style="titlePosition(index)" :aria-current="index === eraIndex ? 'date' : undefined">
          <span class="epoch-title__index">0{{index+1}} <span v-if="index === eraIndex">/ 07 · {{futureCount ? 'ВЫБРАННОЕ ВРЕМЯ' : 'НАСТОЯЩЕЕ'}}</span></span>
          <span class="epoch-title__name" :role="index === eraIndex ? 'heading' : undefined" :aria-level="index === eraIndex ? 2 : undefined">{{item.title}}</span>
          <span class="epoch-title__node" aria-hidden="true"><i/><b>{{String(index+1).padStart(2,'0')}}</b></span>
        </NuxtLink>
      </nav>
      <p class="epoch-selected-label" :key="era.id" aria-live="polite">{{era.label}}</p>
      <nav class="epoch-controls" aria-label="Переход во времени">
        <NuxtLink v-if="eraIndex" :to="eraLink(eraIndex-1)"><span aria-hidden="true">←</span><span>В прошлое<small>{{SHARD_ERAS[eraIndex-1].title}}</small></span></NuxtLink>
        <span v-else class="is-disabled" aria-disabled="true">← Начало нити</span>
        <NuxtLink :to="eraLink(6)" class="epoch-controls__present" :aria-current="!futureCount ? 'date' : undefined"><span aria-hidden="true">◇</span><span>В настоящее<small>Время Ветров</small></span></NuxtLink>
        <NuxtLink v-if="futureCount" :to="eraLink(eraIndex+1)"><span>В будущее<small>{{SHARD_ERAS[eraIndex+1].title}}</small></span><span aria-hidden="true">→</span></NuxtLink>
        <span v-else class="is-disabled" aria-disabled="true">Настоящее →</span>
      </nav>
    </div>

    <div class="epoch-world" role="group" :aria-label="isOrigin ? 'Жертва Пуруша: Колыбель для Искры, начало мира' : `${era.title}: ${era.suns.length} ${era.suns.length === 1 ? 'солнце' : 'солнца'}, ${era.moons.length} луны; ${era.split ? 'мир разделён на осколки' : 'мир един'}`">
      <div class="epoch-world__caption"><span>НЕБЕСНЫЙ АТЛАС</span><small>Облик мира во времени</small></div>
      <svg class="epoch-sky" viewBox="0 0 1000 660" role="img" :aria-labelledby="`${uid}-title ${uid}-desc`">
        <title :id="`${uid}-title`">{{era.title}} — мандала узлов Эноа</title>
        <desc :id="`${uid}-desc`">{{era.note}} Связанные узлы: {{worldNodes.map(node=>node.title).join(', ')}}. Расположение условное.</desc>
        <g class="mandala-frame" fill="none" aria-hidden="true">
          <path d="M500 24 796 195 796 445 500 616 204 445 204 195Z"/>
          <path d="M500 60 760 130 870 320 760 510 500 580 240 510 130 320 240 130Z"/>
          <path d="M500 60 760 320 500 580 240 320Z M500 130 690 320 500 510 310 320Z"/>
          <path d="M500 24 796 536 204 536Z M500 616 796 104 204 104Z" class="mandala-weave"/>
          <path d="M500 0V660M100 320H900" stroke-dasharray="3 9"/>
        </g>
        <TransitionGroup name="mandala-link" tag="g" class="mandala-connections" aria-hidden="true">
          <g v-for="node in worldNodes" :key="node.id" :style="{color:node.color}"><path :d="connection(node)"/><path :d="connection(node)" class="mandala-flow"/></g>
        </TransitionGroup>
        <g class="mandala-heart" transform="translate(500 320)" aria-hidden="true"><path d="M0-25 25 0 0 25-25 0Z M0-15 15 0 0 15-15 0Z"/><path d="M0-5 5 0 0 5-5 0Z" fill="#e0c291"/></g>
        <TransitionGroup name="celestial" tag="g">
          <g v-for="node in worldNodes" :key="node.id" :transform="`translate(${node.x} ${node.y})`" :style="{color:node.color}" class="mandala-node" :class="`mandala-node--${node.type}`">
            <path class="mandala-node__halo" d="M0-58 58 0 0 58-58 0Z"/>
            <path class="mandala-node__outer" d="M0-42 42 0 0 42-42 0Z"/>
            <path class="mandala-node__inner" d="M0-31 31 0 0 31-31 0Z"/>
            <path v-if="node.type === 'sun'" d="M0-20 20 0 0 20-20 0Z M0-10 10 0 0 10-10 0Z M0-42V-58M42 0H58M0 42V58M-42 0H-58" class="mandala-node__glyph"/>
            <path v-else-if="node.type === 'moon'" d="M0-22 22 0 0 22 8 0Z M-8-14-22 0-8 14" class="mandala-node__glyph"/>
            <path v-else-if="node.type === 'spark'" d="M0-22 7-7 22 0 7 7 0 22-7 7-22 0-7-7Z" class="mandala-node__glyph"/>
            <path v-else d="M0-22 13-9 0 4-13-9Z M-13-4 0 9-13 22-26 9Z M13-4 26 9 13 22 0 9Z" class="mandala-node__glyph"/>
            <text y="78" text-anchor="middle">{{node.title}}</text><text y="96" text-anchor="middle" class="mandala-node__kind">{{node.kind}}</text>
          </g>
        </TransitionGroup>
        <text x="500" y="648" text-anchor="middle" class="mandala-note">НИТИ СВЯЗЫВАЮТ МИР · РАСПОЛОЖЕНИЕ УСЛОВНОЕ</text>
      </svg>
      <div v-if="isOrigin" class="epoch-world__stats" aria-live="polite"><span><b>Искра</b>начало мира</span><span><b>01</b>колыбель</span></div>
      <div v-else class="epoch-world__stats" aria-live="polite"><span><b>{{ era.suns.length }}</b>{{ era.suns.length === 1 ? 'солнце' : 'солнца' }}</span><span><b>{{ era.moons.length }}</b>луны</span><span><b>{{ era.split ? '03' : '01' }}</b>{{ era.split ? 'осколка' : 'единый мир' }}</span></div>
    </div>

    <div class="epoch-story" aria-live="polite"><span class="epoch-story__mark" aria-hidden="true">✧</span><p>{{ era.note }}</p><NuxtLink :to="`/lore/history/${era.history}`">Летопись эпохи ↗</NuxtLink></div>
    <p v-if="era.moons.includes('dayya')" class="epoch-draft-note">Раннее небо показано условно: время гибели Дайи требует уточнения.</p>
    <div v-if="era.split" class="epoch-shard-picker" aria-label="Выбор осколка">
      <NuxtLink v-for="(shard, index) in GEOGRAPHY_SHARDS" :key="shard.id" :to="{ path: route.path, query: { ...route.query, shard: shard.id }, hash: '' }" :class="{ 'is-active': selectedShard === shard.id }" :aria-current="selectedShard === shard.id ? 'true' : undefined"><LoreShardIcon :id="shard.id"/><span><small>0{{ index + 1 }} · {{ shard.kind }}</small><strong>{{ shard.title }}</strong></span><span class="epoch-shard-picker__arrow">↗</span></NuxtLink>
    </div>
    <div v-else class="epoch-undivided"><span>{{ isOrigin ? 'НАЧАЛО МИРА' : 'ДО РАСКОЛА' }}</span><p>{{ isOrigin ? 'Нить начинается с Колыбели для Искры. Перейдите к Рассвету, чтобы увидеть следующий облик мира.' : 'Земли ещё составляют единый мир. Выберите более позднее время, чтобы открыть осколки.' }}</p><NuxtLink :to="eraLink(isOrigin ? 1 : 4)">{{ isOrigin ? 'К Рассвету →' : 'К Расколу →' }}</NuxtLink></div>
  </section>
</template>

<style scoped>
.epoch-atlas{--thread-gold:#c4a16a;position:relative;margin-top:64px;color:rgba(var(--theme-text-rgb),.8)}
.epoch-time{position:relative;min-height:325px}.epoch-horizontal-thread{position:absolute;left:50%;top:139px;width:100vw;height:16px;transform:translateX(-50%);pointer-events:none}.epoch-horizontal-thread i{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}.epoch-horizontal-thread i:nth-child(1){height:2px;background:linear-gradient(90deg,transparent,#c4a16a80 2%,#e0c291aa 50%,#c4a16a60 98%,transparent);box-shadow:0 0 9px #c4a16a33}.epoch-horizontal-thread i:nth-child(2){height:7px;background:#c4a16a2e;filter:blur(5px)}.epoch-horizontal-thread i:nth-child(3),.epoch-horizontal-thread i:nth-child(4){height:1px;background:repeating-linear-gradient(90deg,#e0c291bf 0 6px,transparent 6px 12px);animation:weave-x 8s linear infinite}.epoch-horizontal-thread i:nth-child(3){margin-top:-3px}.epoch-horizontal-thread i:nth-child(4){margin-top:3px;animation-direction:reverse;animation-duration:11s}.epoch-horizontal-thread b{position:absolute;top:50%;width:7px;height:7px;border:1px solid #e0c291;background:#08090f;transform:translateY(-50%) rotate(45deg);box-shadow:0 0 18px #c4a16a60;animation:spark-x 18s ease-in-out infinite}
.epoch-bookmark{position:relative;top:-36px;text-align:center;color:#d5b589;font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.24em}.epoch-bookmark span{display:block;margin-top:7px;font-size:6px;color:rgba(var(--theme-text-rgb),.4)}.epoch-side{position:absolute;top:198px;font:7px 'Hanken Grotesk',sans-serif;letter-spacing:.2em;color:#c4a16a80}.epoch-side--past{left:0}.epoch-side--future{right:0}
.epoch-titles{position:absolute;inset:0}.epoch-title{position:absolute;left:var(--time-x);top:48px;width:min(108px,calc(var(--time-width) - 4px));height:126px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:8px;transform:translateX(-50%);text-align:center;color:rgba(var(--theme-text-rgb),.5);text-decoration:none;transition:left .85s cubic-bezier(.22,.8,.22,1),width .7s,color .4s}.epoch-title__index{font:7px 'Hanken Grotesk',sans-serif;letter-spacing:.1em;color:#c4a16a95}.epoch-title__index>span{font-size:6px}.epoch-title__name{position:absolute;bottom:65px;font:500 min(clamp(13px,1.45vw,18px),var(--time-font))/1.1 'Cormorant Garamond',serif;text-wrap:balance;transition:font-size .65s,color .4s;max-width:100%}.epoch-title__node{position:absolute;bottom:14px;width:27px;height:27px;border:1px solid #c4a16a70;background:#08090f;transform:rotate(45deg);box-shadow:0 0 0 5px #08090fb8,0 0 20px #c4a16a15;transition:width .7s,height .7s,bottom .7s,border-color .4s}.epoch-title__node i{position:absolute;inset:5px;border:1px dashed #c4a16a30}.epoch-title__node b{display:grid;height:100%;place-items:center;transform:rotate(-45deg);font:10px 'Cormorant Garamond',serif;color:#d5b589}.epoch-title__index{position:absolute;bottom:51px}.epoch-title.is-past{color:rgba(var(--theme-text-rgb),.42)}.epoch-title.is-current{width:50%;color:rgba(var(--theme-heading-rgb),.97);z-index:3}.epoch-title.is-current .epoch-title__name{bottom:108px;font-size:clamp(28px,3vw,43px);background:var(--theme-bg);padding:3px 12px;width:max-content;max-width:100%}.epoch-title.is-current .epoch-title__index{bottom:174px;background:var(--theme-bg);padding:4px 8px}.epoch-title.is-current .epoch-title__node{width:49px;height:49px;bottom:3px;border-color:#e0c291;animation:time-node-pulse 6s ease-in-out infinite}.epoch-title.is-current .epoch-title__node i{inset:9px}.epoch-title.is-current .epoch-title__node b{font-size:16px}.epoch-title:hover{color:#efd5ad}.epoch-title:hover .epoch-title__node{border-color:#efd5ad}.epoch-selected-label{position:absolute;top:184px;left:50%;transform:translateX(-50%);margin:0;background:var(--theme-bg);padding:0 12px;font:italic 18px 'Cormorant Garamond',serif;text-align:center;animation:era-caption-in .55s ease-out}
.epoch-controls{position:absolute;left:50%;top:239px;width:min(650px,100%);transform:translateX(-50%);display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}.epoch-controls a,.epoch-controls>.is-disabled{display:flex;justify-content:center;align-items:center;gap:12px;text-decoration:none;color:#d5b589;background:#08090fea;border:1px solid #c4a16a30;padding:12px 10px;font:500 10px 'Hanken Grotesk',sans-serif;transition:border-color .2s,background .2s}.epoch-controls small{display:block;margin-top:6px;font:italic 13px 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.5)}.epoch-controls a>span:first-child:not(:last-child),.epoch-controls a>span:last-child:not(:first-child){line-height:1.2}.epoch-controls a:hover{border-color:#c4a16a90;background:#c4a16a12}.epoch-controls>.is-disabled{opacity:.3}.epoch-controls__present[aria-current]{border-color:#c4a16a75}
@keyframes weave-x{to{background-position:24px 0}}@keyframes spark-x{0%,100%{left:2%;opacity:0}20%,80%{opacity:.9}95%{left:98%;opacity:0}}@keyframes time-node-pulse{0%,100%{box-shadow:0 0 0 6px #08090fb8,0 0 18px #c4a16a20}50%{box-shadow:0 0 0 6px #08090fb8,0 0 30px #c4a16a50}}@keyframes era-caption-in{from{opacity:0;translate:0 8px}to{opacity:1;translate:0 0}}
.mandala-frame{stroke:#c4a16a;stroke-opacity:.16;stroke-width:1}.mandala-weave{stroke-opacity:.08}.mandala-connections path{fill:none;stroke:currentColor;stroke-opacity:.35;stroke-width:1.2}.mandala-connections .mandala-flow{stroke-opacity:.75;stroke-dasharray:4 24;animation:mandala-weave 8s linear infinite}.mandala-heart path{fill:#08090f;stroke:#c4a16a;stroke-width:1.2}.mandala-node{transition:transform .85s cubic-bezier(.22,.8,.22,1);filter:drop-shadow(0 0 10px #c4a16a15)}.mandala-node__halo{fill:none;stroke:currentColor;stroke-opacity:.13;stroke-dasharray:3 7}.mandala-node__outer{fill:#08090f;stroke:currentColor;stroke-opacity:.75;stroke-width:1.4}.mandala-node__inner{fill:none;stroke:currentColor;stroke-opacity:.25;stroke-dasharray:3 5}.mandala-node__glyph{fill:none;stroke:currentColor;stroke-width:1.3}.mandala-node text{fill:currentColor;font:24px 'Cormorant Garamond',serif;letter-spacing:.04em}.mandala-node .mandala-node__kind{font:8px 'Hanken Grotesk',sans-serif;letter-spacing:.13em;fill-opacity:.5}.mandala-note{fill:#c4a16a80;font:7px 'Hanken Grotesk',sans-serif;letter-spacing:.22em}.mandala-link-enter-active,.mandala-link-leave-active{transition:opacity .6s}.mandala-link-enter-from,.mandala-link-leave-to{opacity:0}@keyframes mandala-weave{to{stroke-dashoffset:-56}}
.epoch-world{position:relative;border-top:1px solid rgba(var(--theme-accent-rgb),.15);border-bottom:1px solid rgba(var(--theme-accent-rgb),.15);background:radial-gradient(ellipse at 50% 36%,rgba(var(--era-tint),.15),transparent 65%);transition:background .5s}.epoch-world__caption{position:absolute;top:22px;left:0;display:grid;gap:6px}.epoch-world__caption span{font-size:9px;letter-spacing:.22em;color:#c4a16a}.epoch-world__caption small{font:italic 16px 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.4)}.epoch-sky{display:block;width:100%;max-height:640px;overflow:visible}.epoch-world__stats{position:absolute;bottom:24px;right:0;display:flex;gap:22px}.epoch-world__stats span{display:flex;flex-direction:column;gap:4px;font:italic 14px 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.5)}.epoch-world__stats b{font:400 28px 'Cormorant Garamond',serif;color:#d5b589}
.epoch-story{display:flex;align-items:center;gap:20px;padding:22px 0}.epoch-story__mark{font-size:30px;color:#c4a16a}.epoch-story p{flex:1;max-width:780px;margin:0;font:21px/1.4 'Cormorant Garamond',serif}.epoch-story a{flex-shrink:0;margin-left:auto;color:#d5b589;text-decoration:none;font-size:10px;letter-spacing:.06em}.epoch-draft-note{margin:0 0 20px;font-size:11px;color:rgba(var(--theme-text-rgb),.5)}
.epoch-shard-picker{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px}.epoch-shard-picker a{text-decoration:none;display:flex;align-items:center;gap:16px;border:1px solid rgba(var(--theme-accent-rgb),.2);background:rgba(var(--theme-surface-rgb),.3);padding:20px;color:rgba(var(--theme-text-rgb),.65);text-align:left;cursor:pointer;transition:background .2s,border-color .2s}.epoch-shard-picker a.is-active{border-color:#c4a16a90;background:#c4a16a0b;color:#e4c592}.epoch-shard-picker svg{width:54px;height:54px;flex-shrink:0}.epoch-shard-picker small{display:block;font:8px 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase}.epoch-shard-picker strong{display:block;margin-top:6px;font:500 30px 'Cormorant Garamond',serif}.epoch-shard-picker__arrow{margin-left:auto;color:#c4a16a}.epoch-undivided{padding:20px;border:1px solid #c4a16a30;display:flex;align-items:center;gap:20px}.epoch-undivided>span{font-size:9px;letter-spacing:.15em;color:#d5b589}.epoch-undivided p{flex:1;margin:0;font:19px 'Cormorant Garamond',serif}.epoch-undivided a{text-decoration:none;background:none;border:0;color:#d5b589;cursor:pointer;font:inherit}
button:focus-visible,a:focus-visible{outline:2px solid #d5b589;outline-offset:5px}.celestial-enter-active,.celestial-leave-active{transition:opacity .55s}.celestial-enter-from,.celestial-leave-to{opacity:0}
@media(max-width:1050px){.epoch-shard-picker a{padding:15px;gap:10px}.epoch-shard-picker svg{width:42px;height:42px}.epoch-shard-picker small{font-size:7px}.epoch-world__stats{bottom:15px;gap:15px}}
@media(max-width:760px){.epoch-atlas{margin-top:52px}.epoch-time{min-height:360px}.epoch-title{width:42px}.epoch-title__name{font-size:10px;bottom:65px}.epoch-title.is-current{width:70%}.epoch-title.is-current .epoch-title__name{font-size:27px;bottom:139px}.epoch-title.is-current .epoch-title__index{bottom:123px}.epoch-title.is-current .epoch-title__node{width:35px;height:35px;bottom:10px}.epoch-title.is-current .epoch-title__node i{inset:6px}.epoch-title__node{width:14px;height:14px;bottom:20px}.epoch-title__node i{inset:3px}.epoch-title__node b{font-size:7px}.epoch-title.is-current .epoch-title__node b{font-size:12px}.epoch-title__index{display:none}.epoch-title.is-current .epoch-title__index{display:block}.epoch-title.is-current .epoch-title__name{max-width:100%;line-height:1}.epoch-title:not(.is-current) .epoch-title__name{font-size:10px;writing-mode:vertical-rl;transform:rotate(180deg);height:75px;text-wrap:nowrap;bottom:52px;width:14px}.epoch-bookmark{top:-45px;text-align:center;font-size:7px}.epoch-bookmark span{display:none}.epoch-side{font-size:6px}.epoch-selected-label{font-size:16px;top:186px;width:80%}.epoch-controls{top:240px;gap:7px}.epoch-controls a,.epoch-controls>.is-disabled{padding:12px 5px;gap:4px;font-size:8px;text-align:center}.epoch-controls small{font-size:11px}.mandala-node text{font-size:29px}.mandala-node .mandala-node__kind{font-size:11px}.mandala-note{font-size:10px}.epoch-world{padding-top:50px;padding-bottom:52px}.epoch-world__caption{top:15px}.epoch-world__caption small{font-size:14px}.epoch-sky{width:calc(100% + 20px);margin-left:-10px}.epoch-world__stats{left:0;right:auto;bottom:12px;flex-direction:row;gap:24px}.epoch-world__stats span{flex-direction:row;align-items:baseline;font-size:14px;gap:7px}.epoch-world__stats b{font-size:24px}.epoch-story{flex-wrap:wrap;gap:12px;padding:20px 0}.epoch-story p{font-size:19px}.epoch-story a{width:100%;padding-left:34px}.epoch-shard-picker{grid-template-columns:1fr;gap:8px;margin-top:0}.epoch-shard-picker a{padding:12px 16px}.epoch-shard-picker small{font-size:8px}.epoch-shard-picker strong{font-size:28px;margin-top:2px}.epoch-undivided{flex-wrap:wrap;gap:12px}.epoch-undivided p{flex-basis:100%}}
@media(prefers-reduced-motion:reduce){*,*::before{transition:none!important;animation:none!important}}
</style>
