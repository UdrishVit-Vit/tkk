<script setup>
import { GEOGRAPHY_REGIONS, GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'
import { LORE_GLOSSARY } from '~/data/loreGlossary.js'

defineProps({ theme: { type: Object, required: true } })
defineEmits(['up'])

const route = useRoute()
const router = useRouter()
const shardId = computed(() => GEOGRAPHY_SHARDS.some(item => item.id === route.query.shard) ? route.query.shard : 'daskar')
const regionId = computed(() => GEOGRAPHY_REGIONS.some(item => item.id === route.query.region) ? route.query.region : 'north')
const query = ref('')
const mappedOnly = ref(false)
const selectedShard = computed(() => GEOGRAPHY_SHARDS.find(item => item.id === shardId.value))
const selectedRegion = computed(() => GEOGRAPHY_REGIONS.find(item => item.id === regionId.value))
const mapExplorer = ref(null)
const mapAnchor = ref(null)
const mapExpanded = ref(false)
const indexAnchor = ref(null)
const markerNames = computed(() => new Set(selectedRegion.value?.markers?.map(item => item.name) || []))
function selectShard(id) {
  if (id === shardId.value) return
  router.push({ query: { ...route.query, shard: id, region: regionId.value } })
}
function selectRegion(id) {
  if (id === regionId.value) return
  router.push({ query: { ...route.query, shard: 'daskar', region: id } })
}
watch([shardId, regionId], () => { query.value = ''; mappedOnly.value = false; mapExpanded.value = false })
function scrollTo(target) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}
function showOnMap(name) {
  if (!mapExplorer.value?.focus(name)) return
  scrollTo(mapAnchor.value)
}
const places = LORE_GLOSSARY.filter(item => item.category === 'places')

// Ссылку ставим только при точном совпадении имени или однозначного синонима.
// Стемминг полезен в прозе, но для атласа способен спутать разные топонимы.
const key = value => String(value || '').toLocaleLowerCase('ru-RU')
  .replace(/ё/g, 'е').replace(/[’'`ʼ]/g, '').replace(/[^а-яa-z0-9]+/gi, ' ').trim()
const terms = new Map(places.map(item => [key(item.term), item]))
const aliases = new Map()
for (const item of places) {
  for (const alias of item.aliases || []) {
    const name = key(alias)
    if (!name) continue
    const current = aliases.get(name)
    aliases.set(name, current === false || (current && current.id !== item.id) ? false : item)
  }
}
function glossaryEntry(name) {
  return terms.get(key(name)) || aliases.get(key(name)) || null
}

const needle = computed(() => query.value.toLocaleLowerCase('ru-RU').trim())
function matches(name, entry) {
  return !needle.value || `${name} ${entry?.summary || ''}`.toLocaleLowerCase('ru-RU').includes(needle.value)
}
const placeCollator = new Intl.Collator('ru-RU', { sensitivity: 'base' })
const visiblePlaces = computed(() => (selectedRegion.value?.groups || [])
  .flatMap(group => group.names)
  .map(name => ({ name, entry: glossaryEntry(name) }))
  .filter(item => matches(item.name, item.entry) && (!mappedOnly.value || markerNames.value.has(item.name)))
  .sort((a, b) => placeCollator.compare(a.name, b.name)))

useHead({ title: 'География Эноа · Lore', meta: [{
  name: 'description',
  content: 'Атлас Даскара, Вар’Элора и Азара: карты Северного и Центрального Даскара и указатель географических названий мира Эноа.',
}] })
</script>

<template>
  <LoreThreadPage :theme="theme" title="География" eyebrow="Архив Башни · Атлас мира" icon="/assets/nodes/geography-lore.webp" @up="$emit('up')">
    <template #intro>
      <p>Три осколка мира. Карты, названия и дороги, вокруг которых складываются истории.</p>
      <NuxtLink to="/lore/shards">Обзор осколков ↗</NuxtLink>
    </template>
        <div class="geo-branch lore-thread-section">
          <p class="geo-step"><span>01 · Выберите осколок</span></p>
          <nav class="geo-shards" aria-label="Осколки мира">
            <button v-for="(shard, index) in GEOGRAPHY_SHARDS" :key="shard.id" type="button"
              :class="{ active: shardId === shard.id }" :aria-pressed="shardId === shard.id" @click="selectShard(shard.id)">
              <i class="geo-shards__knot" aria-hidden="true" />
              <small>ОСКОЛОК 0{{ index + 1 }} <span v-if="shardId === shard.id" aria-hidden="true">✓</span></small><strong>{{ shard.title }}</strong><span>{{ shard.id === 'daskar' ? 'Карты и места' : 'Сведения и связанные истории' }}</span>
            </button>
          </nav>
        </div>

        <section v-if="selectedShard" class="geo-chapter" :key="selectedShard.id" aria-labelledby="geo-shard-title">
          <div class="geo-chapter__heading lore-thread-section">
            <div><p>ОСКОЛОК · {{ selectedShard.kind }}</p><h2 id="geo-shard-title">{{ selectedShard.title }}</h2><span>{{ selectedShard.description }}</span></div>
            <NuxtLink :to="`/lore/glossary/${selectedShard.glossaryId}`" class="geo-text-link">Статья в глоссарии ↗</NuxtLink>
          </div>

          <template v-if="shardId === 'daskar'">
            <p class="geo-step geo-step--region"><span>02 · Выберите регион</span></p>
            <nav class="geo-regions" aria-label="Регионы Даскара">
              <button v-for="(region, index) in GEOGRAPHY_REGIONS" :key="region.id" type="button"
                :class="{ active: regionId === region.id }" :aria-pressed="regionId === region.id" @click="selectRegion(region.id)">
                <i aria-hidden="true" />
                <span>0{{ index + 1 }} · {{ region.short }}</span><strong>{{ region.id === 'central' ? 'Земли Ханидов' : region.title }}</strong><small>{{ region.id === 'south' ? 'Фрагмент карты' : region.map ? 'Карта и места' : 'Сведения свода' }}</small>
              </button>
            </nav>

            <section v-if="selectedRegion" :key="selectedRegion.id" class="geo-region" aria-labelledby="geo-region-title">
              <div class="geo-region__heading lore-thread-section"><p>Д А С К А Р / {{ selectedRegion.short.toLocaleUpperCase('ru-RU') }}</p><h3 id="geo-region-title">{{ selectedRegion.title }}</h3><span>{{ selectedRegion.description }}</span>
                <button type="button" class="geo-jump" @click="scrollTo(indexAnchor)">К указателю мест ↓</button>
              </div>
              <div v-if="selectedRegion.map" ref="mapAnchor" class="geo-map-anchor">
                <LoreMapExplorer ref="mapExplorer" :region="selectedRegion" @expanded="mapExpanded = $event" />
              </div>
              <div v-else class="geo-map-pending"><i aria-hidden="true">◇</i><span>Карта Южного Даскара ещё не добавлена</span></div>

              <div ref="indexAnchor" class="geo-index-heading lore-thread-section"><div><p>ТОПОНИМИЧЕСКИЙ УКАЗАТЕЛЬ</p><h4>{{ selectedRegion.id === 'south' ? 'Места карты и свода' : selectedRegion.map ? 'Места на карте' : 'Опорные места' }}</h4></div>
                <label><span class="sr-only">Поиск географического названия</span><input v-model="query" type="search" placeholder="Найти место…"></label>
              </div>
              <div class="geo-index-tools">
                <span aria-live="polite">Найдено мест: {{ visiblePlaces.length }}</span>
                <label v-if="markerNames.size"><input v-model="mappedOnly" type="checkbox"> Только с отметкой на карте</label>
                <button v-if="query || mappedOnly" type="button" @click="query = ''; mappedOnly = false">Сбросить фильтры</button>
              </div>
              <ol v-if="visiblePlaces.length" class="geo-index-list" aria-label="Географические названия по алфавиту">
                  <li v-for="(item, index) in visiblePlaces" :key="item.name" class="geo-item" :class="{ linked: item.entry }">
                      <span class="geo-index-list__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                      <NuxtLink v-if="item.entry" :to="`/lore/glossary/${item.entry.id}`" class="geo-item__name"><b>{{ item.name }}</b><small>Статья Lore ↗</small></NuxtLink>
                      <span v-else class="geo-item__name"><b>{{ item.name }}</b><small>Название в атласе</small></span>
                      <button v-if="markerNames.has(item.name)" type="button" class="geo-item__locate" :aria-label="`Показать на карте: ${item.name}`" title="Показать на карте" @click="showOnMap(item.name)"><span aria-hidden="true">⌖</span><span>На карте</span></button>
                  </li>
              </ol>
              <p v-else class="geo-empty">Мест по этому запросу не найдено. Попробуйте другое название или сбросьте фильтры.</p>
            </section>
          </template>
          <div v-else>
            <div class="geo-shard-note"><span>◇</span><p>Названия этого осколка ждут своей карты. Начало географической нити уже есть в статье глоссария.</p></div>
            <div class="geo-threads"><p>НИТИ ДЛЯ ИСТОРИЙ</p><div>
              <NuxtLink v-for="thread in selectedShard.threads || []" :key="thread.glossaryId" :to="`/lore/glossary/${thread.glossaryId}`"><small>{{ thread.note }}</small><strong>{{ thread.title }}</strong><span>Читать в Lore ↗</span></NuxtLink>
            </div></div>
          </div>
        </section>

  </LoreThreadPage>
</template>

<style scoped>

.geo-branch{padding:12px 0 44px}.geo-step{margin:0 0 20px;color:rgba(var(--theme-accent-rgb),.65);font:600 9px/1.4 'Hanken Grotesk',sans-serif;letter-spacing:.2em;text-transform:uppercase}
.geo-shards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.geo-shards button{position:relative;min-height:112px;text-align:left;padding:18px 0;border:0;border-top:1px solid rgba(var(--theme-accent-rgb),.22);background:none;color:inherit;cursor:pointer;transition:color .25s,border-color .25s}
.geo-shards button.active{border-top-color:var(--gold-bright)}.geo-shards button:hover{border-top-color:var(--gold-bright)}
.geo-shards small{display:flex;justify-content:space-between;font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.15em;color:rgba(var(--theme-accent-rgb),.62)}
.geo-shards strong{display:block;margin:13px 0 10px;font:600 36px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.78);transition:color .2s}.geo-shards button.active strong,.geo-shards button:hover strong{color:rgba(var(--theme-heading-rgb),.98)}
.geo-shards button>span{display:block;font:italic 15px/1.35 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.45)}.geo-shards__knot{display:none}
.geo-chapter{animation:geo-enter .35s ease-out}.geo-chapter__heading{display:flex;align-items:flex-end;justify-content:space-between;gap:32px;padding:12px 0 38px}
.geo-chapter__heading p,.geo-region__heading p,.geo-index-heading p,.geo-threads>p{margin:0 0 14px;font:600 8px/1.4 'Hanken Grotesk',sans-serif;letter-spacing:.22em;color:rgba(var(--theme-accent-rgb),.65);text-transform:uppercase}
.geo-chapter__heading h2{margin:0 0 20px;font:600 clamp(38px,4vw,55px)/.95 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96)}
.geo-chapter__heading span,.geo-region__heading>span{display:block;max-width:730px;font:italic 19px/1.6 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.62)}
.geo-text-link{flex:none;white-space:nowrap;color:var(--gold-bright);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.07em;text-decoration:none;border-bottom:1px solid rgba(var(--theme-accent-rgb),.35);padding:7px 0}
.geo-step--region{margin:8px 0 14px}.geo-regions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin:0 0 38px}
.geo-regions button{position:relative;min-height:100px;text-align:left;padding:15px 0;border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.2);background:none;color:inherit;cursor:pointer;transition:border-color .2s}
.geo-regions button:hover,.geo-regions button.active{border-color:var(--gold-bright)}.geo-regions button.active{box-shadow:0 1px var(--gold-bright)}
.geo-regions button>span{display:block;font:600 8px 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.65);letter-spacing:.13em;text-transform:uppercase}
.geo-regions strong{display:block;margin:10px 0 6px;font:500 25px/1.1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.85)}.geo-regions small{font:9px 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.45)}.geo-regions i{display:none}
.geo-region{animation:geo-enter .35s ease-out}.geo-region__heading{padding:12px 0 28px}.geo-region__heading h3{margin:0 0 16px;font:600 clamp(34px,3.5vw,46px)/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95)}
.geo-jump{margin-top:16px;padding:8px 0;border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.3);background:none;color:var(--gold-bright);cursor:pointer;font:600 9px 'Hanken Grotesk',sans-serif}
.geo-map-anchor,.geo-index-heading{scroll-margin-top:24px}.geo-map-anchor{margin-bottom:28px}
.geo-map-pending,.geo-shard-note{padding:32px 0;border-top:1px solid rgba(var(--theme-accent-rgb),.2);border-bottom:1px solid rgba(var(--theme-accent-rgb),.2);font:italic 20px/1.5 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.6)}.geo-map-pending i,.geo-shard-note>span{display:inline-block;margin-right:12px;color:var(--gold-bright);font-style:normal;font-size:24px}.geo-shard-note p{max-width:600px;margin:10px 0 0}
.geo-index-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin:38px 0 0;padding:12px 0 20px}.geo-index-heading h4{margin:0;font:600 36px/1.1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.94)}
.geo-index-heading input{width:240px;max-width:100%;padding:12px 14px;border:1px solid rgba(var(--theme-accent-rgb),.23);background:rgba(var(--theme-surface-rgb),.35);color:inherit;font:12px 'Hanken Grotesk',sans-serif}
.geo-index-tools{display:flex;align-items:center;flex-wrap:wrap;gap:16px;padding:0 0 20px;font:10px/1.5 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.5)}.geo-index-tools>span{margin-right:auto}.geo-index-tools label{display:flex;align-items:center;gap:7px;cursor:pointer}.geo-index-tools input{accent-color:var(--gold-bright)}.geo-index-tools button{border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.3);padding:3px 0;background:none;color:var(--gold-bright);cursor:pointer;font:inherit}
.geo-index-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:32px;list-style:none;margin:0;padding:0}
.geo-item{display:flex;align-items:center;gap:12px;min-width:0;min-height:70px;padding:12px 0;border-top:1px solid rgba(var(--theme-accent-rgb),.15)}.geo-index-list__number{flex:none;width:22px;color:rgba(var(--theme-accent-rgb),.45);font:8px 'Hanken Grotesk',sans-serif}
.geo-item__name{flex:1;min-width:0;color:inherit;text-decoration:none}.geo-item__name b{display:block;font:500 23px/1.15 'Cormorant Garamond',serif;overflow-wrap:anywhere}.geo-item__name small{display:block;margin-top:5px;font:8px 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-text-rgb),.4)}.geo-item a:hover,.geo-text-link:hover{color:var(--gold-bright)}
.geo-item__locate{display:flex;align-items:center;gap:5px;flex:none;padding:7px 9px;border:1px solid rgba(var(--theme-accent-rgb),.23);background:none;color:var(--gold-bright);cursor:pointer;font:9px 'Hanken Grotesk',sans-serif}.geo-item__locate>span:first-child{font-size:19px}.geo-item__locate:hover{background:rgba(var(--theme-accent-rgb),.08);border-color:var(--gold-bright)}
.geo-empty{margin:0;padding:24px 0;font:italic 18px/1.5 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.6)}
.geo-threads{margin-top:36px}.geo-threads>div{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.geo-threads a{display:block;padding:22px;border:1px solid rgba(var(--theme-accent-rgb),.18);background:rgba(var(--theme-surface-rgb),.35);color:inherit;text-decoration:none;transition:border-color .2s}.geo-threads a:hover{border-color:var(--gold-bright)}.geo-threads small,.geo-threads a>span{font:8px/1.5 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.65)}.geo-threads strong{display:block;margin:12px 0;font:500 27px/1.1 'Cormorant Garamond',serif}
button:focus-visible,a:focus-visible,input:focus-visible{outline:1px solid var(--gold-bright);outline-offset:5px}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@keyframes geo-enter{from{opacity:.4;transform:translateY(6px)}to{opacity:1;transform:none}}
@media(max-width:1050px){.geo-chapter__heading{display:block}.geo-text-link{margin-top:14px}.geo-index-list{column-gap:20px}.geo-item__locate>span:last-child{display:none}.geo-regions strong{font-size:23px}}
@media(max-width:760px){.geo-branch{padding-bottom:28px}.geo-shards{grid-template-columns:1fr;gap:0}.geo-shards button{min-height:96px;padding:16px 0}.geo-shards strong{font-size:32px;margin:10px 0 8px}.geo-chapter__heading{padding-bottom:28px}.geo-chapter__heading h2{font-size:38px}.geo-chapter__heading span,.geo-region__heading>span{font-size:17px}.geo-regions{grid-template-columns:1fr;gap:0;margin-bottom:30px}.geo-regions button{min-height:84px;padding:14px 0}.geo-regions strong{font-size:24px}.geo-region__heading h3{font-size:34px}.geo-index-heading{display:block}.geo-index-heading h4{font-size:30px}.geo-index-heading label{display:block;margin-top:18px}.geo-index-heading input{width:100%;box-sizing:border-box}.geo-index-tools{gap:12px}.geo-index-tools>span{flex-basis:100%}.geo-index-list{grid-template-columns:1fr}.geo-item{gap:8px}.geo-item__name b{font-size:21px}.geo-threads>div{grid-template-columns:1fr}.geo-step{font-size:8px}}
@media(prefers-reduced-motion:reduce){.geo-chapter,.geo-region{animation:none}.geo-shards button,.geo-shards strong,.geo-regions button,.geo-threads a{transition:none}}
</style>
