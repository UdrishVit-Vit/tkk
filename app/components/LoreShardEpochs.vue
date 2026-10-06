<script setup>
import { SHARD_ERAS, SHARD_CELESTIAL_BODIES } from '~/data/loreShardEras.js'
import { GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'

const props = defineProps({ selectedShard: { type: String, required: true } })
const emit = defineEmits(['era-change'])
const route = useRoute()
const era = computed(() => SHARD_ERAS.find(item => item.id === (route.query.era === 'leto-treh-solnts' ? 'epoha-lyudey' : route.query.era)) || SHARD_ERAS.at(-1))
const isOrigin = computed(() => era.value.id === 'zhertva-purusha')
const eraIndex = computed(() => SHARD_ERAS.indexOf(era.value))
const bodies = computed(() => [...era.value.suns, ...era.value.moons].map(id => ({ id, ...SHARD_CELESTIAL_BODIES[id] })))
const uid = useId().replace(/:/g, '')
const stars = Array.from({ length: 65 }, (_, i) => ({ x: 95 + (i * 173 % 825), y: 35 + (i * 97 % 520), r: i % 5 === 0 ? 1.5 : .7 }))

function eraLink(index) {
  return { path: route.path, query: { ...route.query, ...(route.hash ? { shard: props.selectedShard } : {}), era: SHARD_ERAS[index].id }, hash: '' }
}
watch(() => era.value.split, split => emit('era-change', split), { immediate: true })
</script>

<template>
  <section class="epoch-atlas" :style="{ '--era-tint': era.tint }" aria-label="Облик Эноа в разные эпохи">
    <div class="epoch-crossing">
      <span class="epoch-knot" aria-hidden="true"><i /></span>
      <div class="epoch-bookmark"><span>ЭПОХИ</span><small>НИТЬ ВРЕМЕНИ</small></div>
      <div class="epoch-heading"><span>0{{ eraIndex + 1 }} / 0{{ SHARD_ERAS.length }}</span><h2>{{ era.title }}</h2><p>{{ era.label }}</p></div>
      <div class="epoch-arrows">
        <NuxtLink v-if="eraIndex > 0" :to="eraLink(eraIndex - 1)" aria-label="Предыдущая эпоха">←</NuxtLink><span v-else aria-disabled="true" aria-label="Первая эпоха">←</span>
        <NuxtLink v-if="eraIndex < SHARD_ERAS.length - 1" :to="eraLink(eraIndex + 1)" aria-label="Следующая эпоха">→</NuxtLink><span v-else aria-disabled="true" aria-label="Последняя эпоха">→</span>
      </div>
    </div>

    <nav class="epoch-tabs" aria-label="Выбор эпохи">
      <NuxtLink v-for="(item, index) in SHARD_ERAS" :key="item.id" :to="eraLink(index)" :class="{ 'is-active': item.id === era.id }" :aria-current="item.id === era.id ? 'date' : undefined">
        <span class="epoch-tabs__dot" aria-hidden="true" /><small>0{{ index + 1 }}</small>{{ item.title }}
      </NuxtLink>
    </nav>

    <div class="epoch-world" role="group" :aria-label="isOrigin ? 'Жертва Пуруша: Колыбель для Искры, начало мира' : `${era.title}: ${era.suns.length} ${era.suns.length === 1 ? 'солнце' : 'солнца'}, ${era.moons.length} луны; ${era.split ? 'мир разделён на осколки' : 'мир един'}`">
      <div class="epoch-world__caption"><span>НЕБЕСНЫЙ АТЛАС</span><small>Облик мира во времени</small></div>
      <svg class="epoch-sky" viewBox="0 0 1000 620" role="img" :aria-labelledby="`${uid}-title ${uid}-desc`">
        <title :id="`${uid}-title`">{{ era.title }} — небо и земли Эноа</title>
        <desc :id="`${uid}-desc`">{{ era.note }} {{ bodies.length ? `Светила: ${bodies.map(body => body.title).join(', ')}.` : 'Колыбель и Искра.' }}</desc>
        <defs>
          <radialGradient :id="`${uid}-aura`"><stop stop-color="currentColor" stop-opacity=".22" /><stop offset="1" stop-color="currentColor" stop-opacity="0" /></radialGradient>
          <linearGradient :id="`${uid}-land`" x2="0" y2="1"><stop stop-color="#b7aa87" stop-opacity=".24"/><stop offset="1" stop-color="#b7aa87" stop-opacity=".025"/></linearGradient>
        </defs>
        <g class="epoch-stars" aria-hidden="true"><circle v-for="(star, index) in stars" :key="index" :cx="star.x" :cy="star.y" :r="star.r" fill="currentColor" :opacity="index % 3 === 0 ? .5 : .2" /></g>
        <g class="epoch-orbits" fill="none" aria-hidden="true"><ellipse cx="500" cy="305" rx="355" ry="236"/><ellipse cx="500" cy="305" rx="420" ry="270"/><path d="M80 305h840M500 35v540" stroke-dasharray="2 8" /></g>
        <TransitionGroup name="celestial" tag="g">
          <g v-for="body in bodies" :key="body.id" :transform="`translate(${body.x} ${body.y})`" :style="{ color: body.color }" class="epoch-body">
            <circle :r="body.radius * 2.8" :fill="`url(#${uid}-aura)`" />
            <circle :r="body.radius + 8" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-dasharray="2 5" />
            <g v-if="body.sun" stroke="currentColor" stroke-opacity=".6"><path v-for="ray in 12" :key="ray" :transform="`rotate(${ray * 30})`" :d="`M0 ${-body.radius - 13}v-7`" /></g>
            <circle :r="body.radius" fill="currentColor" :fill-opacity="body.sun ? .2 : .12" stroke="currentColor" stroke-width="1.2" />
            <circle v-if="body.sun" :r="body.radius - 6" fill="none" stroke="currentColor" stroke-opacity=".35" />
            <path v-else :d="`M 0 ${-body.radius} A ${body.radius} ${body.radius} 0 0 1 0 ${body.radius} A ${body.radius * .7} ${body.radius} 0 0 0 0 ${-body.radius}`" fill="currentColor" fill-opacity=".5" />
            <text :y="body.radius + 32" text-anchor="middle" fill="currentColor">{{ body.title }}</text>
          </g>
        </TransitionGroup>
        <g v-if="isOrigin" class="epoch-cradle" transform="translate(500 310)" style="color:#e9bd72">
          <circle r="130" :fill="`url(#${uid}-aura)`" />
          <circle r="90" fill="none" stroke="currentColor" stroke-opacity=".25" />
          <circle r="62" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="2 8" />
          <path v-for="ray in 8" :key="ray" :transform="`rotate(${ray * 45})`" d="M0-35V-82" stroke="currentColor" stroke-opacity=".6" />
          <path d="M0-28 12-12 28 0 12 12 0 28-12 12-28 0-12-12Z" fill="currentColor" fill-opacity=".3" stroke="currentColor" />
          <circle r="6" fill="currentColor" />
          <text y="140" text-anchor="middle" fill="currentColor" class="epoch-whole-label">Колыбель Искры</text>
        </g>
        <g v-else class="epoch-lands" :class="{ 'is-split': era.split }" stroke-linejoin="round">
          <g class="epoch-land epoch-land--daskar">
            <path d="M325 334 362 305 405 315 443 291 485 306 528 290 571 307 609 296 651 322 683 334 639 351 598 365 555 354 512 373 463 355 420 368 374 352Z" :fill="`url(#${uid}-land)`" stroke="#cfb58b" />
            <path d="m350 334 32-18 20 15 38-23 34 23 38-24 30 27 41-19 22 16 31-15 28 18M373 339l30 8 38-11 27 9 38-12 35 13 36-12 33 9 37-10" fill="none" stroke="#cfb58b" stroke-opacity=".4" />
            <path d="m325 334 16 25 51 25 54 2 32 17 58-4 37-17 45 1 50-21 15-28-44 17-41 14-43-11-43 19-49-18-43 13-46-16Z" fill="#cfb58b" fill-opacity=".045" stroke="#cfb58b" stroke-opacity=".3" />
          </g>
          <g class="epoch-land epoch-land--elor">
            <path d="m347 389 41-25 31 10 29-14 33 18 46-11 39 23-31 25-43 9-24-13-40 6-28-18-32 7Z" fill="#af97c8" fill-opacity=".1" stroke="#af97c8" />
            <path d="m347 389 18 26 35 8 29 19 36-11 28 7 48-17 25-31-31 25-43 9-24-13-40 6-28-18-32 7Z" fill="#af97c8" fill-opacity=".04" stroke="#af97c8" stroke-opacity=".3" />
            <path d="m371 387 33-9 21 13 26-14 32 14 27-9 32 13" fill="none" stroke="#af97c8" stroke-opacity=".45" />
          </g>
          <g class="epoch-land epoch-land--azar">
            <path d="m536 384 30-18 27 11 32-17 30 21 23-3 30 26-46 18-37-11-33 8-29-17Z" fill="#a0c8d8" fill-opacity=".12" stroke="#a0c8d8" />
            <path d="m536 384 12 30 35 10 36 20 30-15 33 11 26-36-46 18-37-11-33 8-29-17Z" fill="#a0c8d8" fill-opacity=".04" stroke="#a0c8d8" stroke-opacity=".3" />
            <path d="m558 385 28-6 23 15 22-16 22 14 21 1M625 372v18m-6-13 12 8" fill="none" stroke="#a0c8d8" stroke-opacity=".5" />
          </g>
        </g>
        <g v-if="era.split" class="epoch-land-labels"><path d="M500 350v30M315 458v22M715 458v22"/><text x="500" y="402" text-anchor="middle">Даскар</text><text x="315" y="505" text-anchor="middle">Вар’Элор</text><text x="715" y="505" text-anchor="middle">Азар</text></g>
        <text v-else-if="!isOrigin" x="500" y="488" text-anchor="middle" class="epoch-whole-label">Единая Эноа</text>
        <g class="epoch-scale" aria-hidden="true"><path d="M438 552h124M438 548v8m31-8v8m31-8v8m31-8v8m31-8v8"/><text x="500" y="577" text-anchor="middle">РАСПОЛОЖЕНИЕ УСЛОВНОЕ</text></g>
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
.epoch-atlas{--thread-gold:#c4a16a;position:relative;margin-top:48px;color:rgba(var(--theme-text-rgb),.8)}
.epoch-atlas::before{content:'';position:absolute;top:51px;left:calc(-1 * var(--atlas-inset));width:100vw;height:1px;background:linear-gradient(90deg,#c4a16a,rgba(196,161,106,.6) 60%,rgba(196,161,106,.12));box-shadow:0 0 12px #c4a16a30;pointer-events:none}
.epoch-crossing{position:relative;display:flex;align-items:center;gap:32px;min-height:102px}
.epoch-knot{position:absolute;left:-39px;top:41px;width:20px;height:20px;border:1px solid #d5b589;transform:rotate(45deg);background:var(--theme-bg);box-shadow:0 0 22px #d5b58945;z-index:1}.epoch-knot i{position:absolute;inset:5px;background:#d5b589}
.epoch-bookmark{align-self:stretch;display:flex;flex-direction:column;justify-content:center;gap:8px;width:115px;flex-shrink:0;padding:0 16px;background:linear-gradient(140deg,#c4a16a20,rgba(var(--theme-surface-rgb),.96));border:1px solid #c4a16a65;clip-path:polygon(0 0,100% 0,100% 100%,50% 90%,0 100%);color:#d5b589;z-index:1}.epoch-bookmark>span{font:500 26px 'Cormorant Garamond',serif;letter-spacing:.12em}.epoch-bookmark small{font-size:8px;letter-spacing:.18em}
.epoch-heading{position:relative;padding:4px 18px;background:var(--theme-bg);z-index:1}.epoch-heading>span{font-size:9px;letter-spacing:.2em;color:#c4a16a}.epoch-heading h2{margin:6px 0 8px;font:500 clamp(30px,3.4vw,48px)/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95)}.epoch-heading p{margin:0;font:italic 18px 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.55)}
.epoch-arrows{margin-left:auto;display:flex;gap:8px;background:var(--theme-bg);padding-left:14px;z-index:1}.epoch-arrows a,.epoch-arrows>span{display:grid;place-items:center;text-decoration:none;width:39px;height:39px;border:1px solid #c4a16a50;background:var(--theme-bg);color:#d5b589;font-size:20px;cursor:pointer}.epoch-arrows>span{opacity:.25;cursor:default}
.epoch-tabs{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:14px;padding:30px 0 26px}.epoch-tabs a{min-width:0;overflow-wrap:anywhere;text-decoration:none;position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:7px;border:0;background:none;color:rgba(var(--theme-text-rgb),.5);text-align:left;font:500 16px 'Cormorant Garamond',serif;cursor:pointer;transition:color .2s}.epoch-tabs small{font:9px 'Hanken Grotesk',sans-serif;letter-spacing:.12em}.epoch-tabs__dot{width:5px;height:5px;border:1px solid #c4a16a60;transform:rotate(45deg);margin-bottom:4px}.epoch-tabs .is-active,.epoch-tabs a:hover{color:#e4c592}.epoch-tabs .is-active .epoch-tabs__dot{background:#d5b589;box-shadow:0 0 12px #d5b58980}
.epoch-world{position:relative;border-top:1px solid rgba(var(--theme-accent-rgb),.15);border-bottom:1px solid rgba(var(--theme-accent-rgb),.15);background:radial-gradient(ellipse at 50% 36%,rgba(var(--era-tint),.15),transparent 65%);transition:background .5s}.epoch-world__caption{position:absolute;top:22px;left:0;display:grid;gap:6px}.epoch-world__caption span{font-size:9px;letter-spacing:.22em;color:#c4a16a}.epoch-world__caption small{font:italic 16px 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.4)}.epoch-sky{display:block;width:100%;max-height:640px;overflow:visible}.epoch-stars{color:#c9bca5}.epoch-orbits{stroke:rgba(var(--theme-accent-rgb),.13);stroke-width:.8}.epoch-body text{font:18px 'Cormorant Garamond',serif;letter-spacing:.06em}.epoch-land{transition:transform .85s cubic-bezier(.2,.7,.2,1)}.is-split .epoch-land--daskar{transform:translateY(-5px)}.is-split .epoch-land--elor{transform:translate(-98px,48px)}.is-split .epoch-land--azar{transform:translate(93px,52px)}.epoch-land-labels{fill:#cdbb9d;font:25px 'Cormorant Garamond',serif}.epoch-land-labels path{stroke:#cdbb9d;stroke-opacity:.35}.epoch-whole-label{fill:#cdbb9d;font:30px 'Cormorant Garamond',serif;letter-spacing:.08em}.epoch-scale{stroke:#c4a16a55;fill:rgba(var(--theme-text-rgb),.4)}.epoch-scale text{stroke:none;font:8px 'Hanken Grotesk',sans-serif;letter-spacing:.22em}
.epoch-world__stats{position:absolute;bottom:24px;right:0;display:flex;gap:22px}.epoch-world__stats span{display:flex;flex-direction:column;gap:4px;font:italic 14px 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.5)}.epoch-world__stats b{font:400 28px 'Cormorant Garamond',serif;color:#d5b589}
.epoch-story{display:flex;align-items:center;gap:20px;padding:22px 0}.epoch-story__mark{font-size:30px;color:#c4a16a}.epoch-story p{flex:1;max-width:780px;margin:0;font:21px/1.4 'Cormorant Garamond',serif}.epoch-story a{flex-shrink:0;margin-left:auto;color:#d5b589;text-decoration:none;font-size:10px;letter-spacing:.06em}.epoch-draft-note{margin:0 0 20px;font-size:11px;color:rgba(var(--theme-text-rgb),.5)}
.epoch-shard-picker{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px}.epoch-shard-picker a{text-decoration:none;display:flex;align-items:center;gap:16px;border:1px solid rgba(var(--theme-accent-rgb),.2);background:rgba(var(--theme-surface-rgb),.3);padding:20px;color:rgba(var(--theme-text-rgb),.65);text-align:left;cursor:pointer;transition:background .2s,border-color .2s}.epoch-shard-picker a.is-active{border-color:#c4a16a90;background:#c4a16a0b;color:#e4c592}.epoch-shard-picker svg{width:54px;height:54px;flex-shrink:0}.epoch-shard-picker small{display:block;font:8px 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase}.epoch-shard-picker strong{display:block;margin-top:6px;font:500 30px 'Cormorant Garamond',serif}.epoch-shard-picker__arrow{margin-left:auto;color:#c4a16a}.epoch-undivided{padding:20px;border:1px solid #c4a16a30;display:flex;align-items:center;gap:20px}.epoch-undivided>span{font-size:9px;letter-spacing:.15em;color:#d5b589}.epoch-undivided p{flex:1;margin:0;font:19px 'Cormorant Garamond',serif}.epoch-undivided a{text-decoration:none;background:none;border:0;color:#d5b589;cursor:pointer;font:inherit}
button:focus-visible,a:focus-visible{outline:2px solid #d5b589;outline-offset:5px}.celestial-enter-active,.celestial-leave-active{transition:opacity .55s}.celestial-enter-from,.celestial-leave-to{opacity:0}
@media(max-width:1050px){.epoch-crossing{gap:16px}.epoch-tabs{grid-template-columns:repeat(4,minmax(0,1fr));gap:18px 8px}.epoch-shard-picker a{padding:15px;gap:10px}.epoch-shard-picker svg{width:42px;height:42px}.epoch-shard-picker small{font-size:7px}.epoch-world__stats{bottom:15px;gap:15px}}
@media(max-width:760px){.epoch-atlas{margin-top:30px}.epoch-knot{left:-26px}.epoch-crossing{gap:8px;min-height:102px}.epoch-bookmark{width:75px;padding:0 8px}.epoch-bookmark>span{font-size:21px}.epoch-bookmark small{font-size:6px}.epoch-heading{padding:8px;flex:1}.epoch-heading h2{font-size:29px}.epoch-heading p{font-size:15px}.epoch-arrows{position:absolute;right:0;top:-24px;padding-left:8px}.epoch-arrows a,.epoch-arrows>span{width:28px;height:28px;font-size:16px}.epoch-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 12px;padding:25px 0}.epoch-tabs a{min-width:0;font-size:13px;line-height:1.3;overflow-wrap:anywhere;gap:4px;padding:0}.epoch-tabs__dot{margin-bottom:2px}.epoch-world{padding-top:50px;padding-bottom:52px}.epoch-world__caption{top:15px}.epoch-world__caption small{font-size:14px}.epoch-sky{width:calc(100% + 20px);margin-left:-10px}.epoch-body text{font-size:29px}.epoch-land-labels{font-size:32px}.epoch-whole-label{font-size:35px}.epoch-scale text{font-size:13px}.epoch-world__stats{left:0;right:auto;bottom:12px;flex-direction:row;gap:24px}.epoch-world__stats span{flex-direction:row;align-items:baseline;font-size:14px;gap:7px}.epoch-world__stats b{font-size:24px}.epoch-story{flex-wrap:wrap;gap:12px;padding:20px 0}.epoch-story p{font-size:19px}.epoch-story a{width:100%;padding-left:34px}.epoch-shard-picker{grid-template-columns:1fr;gap:8px;margin-top:0}.epoch-shard-picker a{padding:12px 16px}.epoch-shard-picker small{font-size:8px}.epoch-shard-picker strong{font-size:28px;margin-top:2px}.epoch-undivided{flex-wrap:wrap;gap:12px}.epoch-undivided p{flex-basis:100%}}
@media(prefers-reduced-motion:reduce){*,*::before{transition:none!important}}
</style>
