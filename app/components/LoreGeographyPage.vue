<script setup>
import { GEOGRAPHY_REGIONS, GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'
import { LORE_GLOSSARY } from '~/data/loreGlossary.js'

defineProps({ theme: { type: Object, required: true } })
defineEmits(['up'])

const route = useRoute()
const initialShard = GEOGRAPHY_SHARDS.some(item => item.id === route.query.shard) ? route.query.shard : 'daskar'
const initialRegion = GEOGRAPHY_REGIONS.some(item => item.id === route.query.region) ? route.query.region : 'north'
const shardId = ref(initialShard)
const regionId = ref(initialRegion)
const query = ref('')
const selectedShard = computed(() => GEOGRAPHY_SHARDS.find(item => item.id === shardId.value))
const selectedRegion = computed(() => GEOGRAPHY_REGIONS.find(item => item.id === regionId.value))
const mapExplorer = ref(null)
const mapAnchor = ref(null)
const mapExpanded = ref(false)
const markerNames = computed(() => new Set(selectedRegion.value?.markers?.map(item => item.name) || []))
function showOnMap(name) {
  if (!mapExplorer.value?.focus(name)) return
  mapAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
  .filter(item => matches(item.name, item.entry))
  .sort((a, b) => placeCollator.compare(a.name, b.name)))

useHead({ title: 'География Эноа · Lore', meta: [{
  name: 'description',
  content: 'Атлас Даскара, Вар’Элора и Азара: карты Северного и Центрального Даскара и указатель географических названий мира Эноа.',
}] })
</script>

<template>
  <main class="lore-geography" :class="{ 'map-is-expanded': mapExpanded }" :style="{ background: theme.bg }">
    <div class="geo-scroll">
      <div class="geo-shell">
        <header class="geo-header">
          <button type="button" class="geo-back" aria-label="Вернуться к карте Lore" @click="$emit('up')">↖ <span>LORE</span></button>
          <p>АРХИВ МИРА ЭНОА · АТЛАС</p>
          <h1>География</h1>
          <span class="geo-intro">Три осколка мира. Карты, названия и дороги, вокруг которых складываются истории.</span>
          <NuxtLink to="/lore/shards" class="geo-shards-link">Обзор осколков ↗</NuxtLink>
        </header>

        <div class="geo-branch">
          <div class="geo-branch__stem" aria-hidden="true"><i /></div>
          <div class="geo-branch__node" aria-hidden="true">
            <img src="/assets/nodes/geography-lore.webp" width="128" height="128" alt="">
          </div>
          <div class="geo-branch__routes" aria-hidden="true"><i v-for="shard in GEOGRAPHY_SHARDS" :key="shard.id" /></div>
          <nav class="geo-shards" aria-label="Осколки мира">
            <button v-for="(shard, index) in GEOGRAPHY_SHARDS" :key="shard.id" type="button"
              :class="{ active: shardId === shard.id }" :aria-pressed="shardId === shard.id" @click="shardId = shard.id; query = ''">
              <i class="geo-shards__knot" aria-hidden="true" />
              <small>ОСКОЛОК 0{{ index + 1 }}</small><strong>{{ shard.title }}</strong><span>{{ shard.id === 'daskar' ? '2 карты в атласе' : 'Нити свода' }}</span>
            </button>
          </nav>
        </div>

        <section v-if="selectedShard" class="geo-chapter" aria-live="polite">
          <div class="geo-chapter__heading">
            <div><p>ОСКОЛОК · {{ selectedShard.kind }}</p><h2>{{ selectedShard.title }}</h2><span>{{ selectedShard.description }}</span></div>
            <NuxtLink :to="`/lore/glossary/${selectedShard.glossaryId}`" class="geo-text-link">Статья в глоссарии ↗</NuxtLink>
          </div>

          <template v-if="shardId === 'daskar'">
            <nav class="geo-regions" aria-label="Регионы Даскара">
              <button v-for="(region, index) in GEOGRAPHY_REGIONS" :key="region.id" type="button"
                :class="{ active: regionId === region.id }" :aria-pressed="regionId === region.id" @click="regionId = region.id; query = ''">
                <i aria-hidden="true" />
                <span>0{{ index + 1 }} · {{ region.short }}</span><strong>{{ region.id === 'central' ? 'Земли Ханидов' : region.title }}</strong><small>{{ region.map ? 'Карта и места' : 'Сведения свода' }}</small>
              </button>
            </nav>

            <section v-if="selectedRegion" class="geo-region">
              <div class="geo-region__heading"><p>Д А С К А Р / {{ selectedRegion.short.toLocaleUpperCase('ru-RU') }}</p><h3>{{ selectedRegion.title }}</h3><span>{{ selectedRegion.description }}</span></div>
              <div v-if="selectedRegion.map" ref="mapAnchor" class="geo-map-anchor">
                <LoreMapExplorer ref="mapExplorer" :region="selectedRegion" @expanded="mapExpanded = $event" />
              </div>
              <div v-else class="geo-map-pending"><i aria-hidden="true">◇</i><span>Карта Южного Даскара ещё не добавлена</span></div>

              <div class="geo-index-heading"><div><p>ТОПОНИМИЧЕСКИЙ УКАЗАТЕЛЬ</p><h4>{{ selectedRegion.map ? 'Места на карте' : 'Опорные места' }}</h4></div>
                <label><span class="sr-only">Поиск географического названия</span><input v-model="query" type="search" placeholder="Найти место…"></label>
              </div>
              <ol v-if="visiblePlaces.length" class="geo-index-list" aria-label="Географические названия по алфавиту">
                  <li v-for="(item, index) in visiblePlaces" :key="item.name" class="geo-item" :class="{ linked: item.entry }">
                      <span class="geo-index-list__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                      <NuxtLink v-if="item.entry" :to="`/lore/glossary/${item.entry.id}`" class="geo-item__name"><b>{{ item.name }}</b><small>Статья Lore ↗</small></NuxtLink>
                      <span v-else class="geo-item__name"><b>{{ item.name }}</b><small>На карте</small></span>
                      <button v-if="markerNames.has(item.name)" type="button" class="geo-item__locate" :aria-label="`Показать на карте: ${item.name}`" title="Показать на карте" @click="showOnMap(item.name)">⌖</button>
                  </li>
              </ol>
              <p v-else class="geo-empty">По этому запросу названий на карте нет.</p>
            </section>
          </template>
          <div v-else>
            <div class="geo-shard-note"><span>◇</span><p>Названия этого осколка ждут своей карты. Начало географической нити уже есть в статье глоссария.</p></div>
            <div class="geo-threads"><p>НИТИ ДЛЯ ИСТОРИЙ</p><div>
              <NuxtLink v-for="thread in selectedShard.threads || []" :key="thread.glossaryId" :to="`/lore/glossary/${thread.glossaryId}`"><small>{{ thread.note }}</small><strong>{{ thread.title }}</strong><span>Читать в Lore ↗</span></NuxtLink>
            </div></div>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>

<style scoped>
.lore-geography{position:fixed;inset:0;z-index:45;color:rgba(var(--theme-text-rgb),.82);background:#090b11;overflow:hidden}.geo-scroll{height:100%;overflow-y:auto;background:radial-gradient(ellipse 60% 35% at 50% 0%,rgba(var(--theme-accent-rgb),.08),transparent 75%)}.geo-shell{width:min(1180px,calc(100% - 64px));margin:auto;padding:50px 0 120px}.geo-header{text-align:center;position:relative;padding:30px 0 58px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.2)}.geo-back{position:absolute;left:0;top:0;border:1px solid rgba(var(--theme-accent-rgb),.25);background:rgba(var(--theme-surface-rgb),.32);color:var(--gold-bright);padding:10px 14px;cursor:pointer;font:600 11px 'Hanken Grotesk',sans-serif;letter-spacing:.16em}.geo-header p,.geo-chapter__heading p,.geo-region__heading p,.geo-index-heading p,.geo-archive>div:first-child p{font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.25em;color:var(--gold-bright)}.geo-header h1{font:500 clamp(64px,11vw,130px)/.95 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);margin:15px 0 21px}.geo-intro,.geo-chapter__heading span,.geo-region__heading span,.geo-archive>div:first-child span{display:block;max-width:660px;margin:auto;font:20px/1.4 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.65)}.geo-shards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:30px 0 55px}.geo-shards button{min-height:153px;text-align:left;border:1px solid rgba(var(--theme-accent-rgb),.22);background:linear-gradient(150deg,rgba(var(--theme-surface-rgb),.65),rgba(var(--theme-surface-rgb),.2));padding:21px 24px;cursor:pointer;color:inherit;transition:border-color .2s,transform .2s}.geo-shards button:hover{transform:translateY(-3px);border-color:rgba(var(--theme-accent-rgb),.5)}.geo-shards button.active{border-color:var(--gold-bright);box-shadow:inset 0 0 0 1px rgba(var(--theme-accent-rgb),.3)}.geo-shards small,.geo-shards button>span{display:block;color:rgba(var(--theme-accent-rgb),.65);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.17em;text-transform:uppercase}.geo-shards strong{display:block;color:rgba(var(--theme-heading-rgb),.92);font:500 39px/1.1 'Cormorant Garamond',serif;margin:17px 0 13px}.geo-chapter__heading{display:flex;justify-content:space-between;gap:30px;align-items:end;border-bottom:1px solid rgba(var(--theme-accent-rgb),.2);padding-bottom:27px}.geo-chapter__heading h2,.geo-archive h2{font:500 clamp(45px,6vw,75px)/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95);margin:8px 0 12px}.geo-chapter__heading span{margin:0}.geo-text-link{white-space:nowrap;color:var(--gold-bright);text-decoration:none;border-bottom:1px solid rgba(var(--theme-accent-rgb),.4);padding-bottom:5px;font:600 11px 'Hanken Grotesk',sans-serif;letter-spacing:.08em}.geo-regions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:34px 0 42px}.geo-regions button{text-align:left;border:1px solid rgba(var(--theme-accent-rgb),.17);background:rgba(var(--theme-surface-rgb),.25);padding:15px 18px;cursor:pointer;color:inherit}.geo-regions button.active{background:rgba(var(--theme-accent-rgb),.12);border-color:rgba(var(--theme-accent-rgb),.6)}.geo-regions button span{display:block;color:var(--gold-bright);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase}.geo-regions button strong{display:block;margin-top:7px;color:rgba(var(--theme-heading-rgb),.87);font:500 25px 'Cormorant Garamond',serif}.geo-region__heading{text-align:center;margin:0 auto 30px}.geo-region__heading h3{font:500 clamp(42px,6vw,70px)/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);margin:10px 0}.geo-map{margin:0}.geo-map a{display:block;position:relative;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.33);background:#241c1a}.geo-map img{display:block;width:100%;height:auto}.geo-map a>span{position:absolute;right:14px;bottom:14px;padding:11px 15px;background:rgba(7,8,12,.87);border:1px solid rgba(237,202,152,.55);color:#f4d6a2;font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.07em}.geo-map figcaption{padding:11px 0;text-align:right;font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.58)}.geo-map-pending{height:230px;display:grid;place-content:center;text-align:center;gap:13px;border:1px dashed rgba(var(--theme-accent-rgb),.35);background:rgba(var(--theme-surface-rgb),.22);color:rgba(var(--theme-text-rgb),.62);font:18px 'Cormorant Garamond',serif}.geo-map-pending i{font-size:34px;color:var(--gold-bright);font-style:normal}.geo-index-heading{display:flex;justify-content:space-between;align-items:end;gap:20px;margin:55px 0 25px}.geo-index-heading h4{font:500 42px 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.9);margin:4px 0 0}.geo-index-heading input{min-width:260px;padding:11px 14px;color:inherit;background:rgba(var(--theme-surface-rgb),.35);border:1px solid rgba(var(--theme-accent-rgb),.27);outline:none}.geo-index-heading input:focus{border-color:var(--gold-bright)}.geo-groups{display:grid;gap:30px}.geo-group h5{font:500 29px 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.84);margin:0 0 10px}.geo-group h5 span{color:var(--gold-bright);font:600 10px 'Hanken Grotesk',sans-serif;margin-left:5px}.geo-items{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.geo-item{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 13px;border:1px solid rgba(var(--theme-accent-rgb),.15);background:rgba(var(--theme-surface-rgb),.2);color:rgba(var(--theme-text-rgb),.77);text-decoration:none}.geo-item.linked:hover{border-color:var(--gold-bright);color:var(--gold-bright)}.geo-item b{font:500 18px/1.05 'Cormorant Garamond',serif}.geo-item small{flex:none;font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.06em;color:rgba(var(--theme-accent-rgb),.56)}.geo-empty{padding:30px;border:1px solid rgba(var(--theme-accent-rgb),.18);text-align:center}.geo-shard-note{padding:60px 30px;text-align:center;border:1px dashed rgba(var(--theme-accent-rgb),.25);margin-top:35px}.geo-shard-note>span{display:block;font-size:42px;color:var(--gold-bright)}.geo-shard-note p{max-width:470px;margin:10px auto;font:22px 'Cormorant Garamond',serif}.geo-archive{margin-top:90px;padding-top:35px;border-top:1px solid rgba(var(--theme-accent-rgb),.2)}.geo-archive>div:first-child span{margin:0}.geo-archive__list{display:flex;flex-wrap:wrap;gap:7px;margin-top:25px}.geo-archive__list a{display:inline-flex;gap:8px;padding:9px 11px;border:1px solid rgba(var(--theme-accent-rgb),.16);color:rgba(var(--theme-text-rgb),.7);text-decoration:none;font:17px 'Cormorant Garamond',serif}.geo-archive__list a:hover{border-color:var(--gold-bright);color:var(--gold-bright)}.geo-archive__list i{font-style:normal;color:var(--gold-bright)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.geo-threads{margin-top:35px}.geo-threads>p{color:var(--gold-bright);font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.2em}.geo-threads>div{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.geo-threads a{padding:22px;border:1px solid rgba(var(--theme-accent-rgb),.24);background:rgba(var(--theme-surface-rgb),.23);text-decoration:none;color:inherit}.geo-threads a:hover{border-color:var(--gold-bright)}.geo-threads small,.geo-threads span{display:block;color:var(--gold-bright);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase}.geo-threads strong{display:block;margin:13px 0;color:rgba(var(--theme-heading-rgb),.93);font:500 31px 'Cormorant Garamond',serif}
@media(min-width:761px){.geo-shell{position:relative;left:34px;width:min(1120px,calc(100% - 160px))}}
@media(max-width:760px){.geo-shell{width:calc(100% - 32px);padding:65px 0 100px}.geo-header{padding:22px 0 35px}.geo-back{top:-45px}.geo-header h1{font-size:68px}.geo-intro,.geo-chapter__heading span,.geo-region__heading span{font-size:17px}.geo-shards{gap:6px;margin:20px 0 35px}.geo-shards button{min-height:105px;padding:12px 8px}.geo-shards small{font-size:7px;line-height:1.4}.geo-shards strong{font-size:27px;margin:12px 0 4px}.geo-shards button>span{display:none}.geo-chapter__heading{display:block}.geo-text-link{display:inline-block;margin-top:18px}.geo-regions{gap:5px;margin:23px}.geo-regions button{padding:10px 8px}.geo-regions button strong{font-size:17px}.geo-map a>span{font-size:8px;padding:7px}.geo-index-heading{display:block;margin-top:37px}.geo-index-heading label{display:block;margin-top:15px}.geo-index-heading input{width:100%}.geo-items,.geo-threads>div{grid-template-columns:repeat(2,1fr)}.geo-item{display:block;padding:10px}.geo-item b{display:block}.geo-item small{display:block;margin-top:5px}.geo-archive{margin-top:60px}.geo-archive h2{font-size:46px}}

/* Та же грамматика узлов, что в нитях истории: входящая нить, ромб и три исходящих пути. */
.geo-header{padding-bottom:10px;border-bottom:0}
.geo-header h1{margin-bottom:15px}
.geo-branch{position:relative;isolation:isolate}
.geo-branch__stem{position:relative;width:18px;height:50px;margin:auto}
.geo-branch__stem::before{content:"";position:absolute;inset:0 auto 0 8px;width:2px;background:linear-gradient(transparent,rgba(var(--theme-accent-strong-rgb),.8));box-shadow:0 0 12px rgba(var(--theme-accent-rgb),.35)}
.geo-branch__stem::after{content:"";position:absolute;inset:4px auto 2px 4px;width:10px;border-left:1px dashed rgba(var(--theme-accent-rgb),.36);border-right:1px dashed rgba(var(--theme-accent-rgb),.36)}
.geo-branch__stem i{position:absolute;z-index:1;left:5px;top:13px;width:8px;height:8px;border:1px solid var(--gold-bright);background:rgb(var(--theme-surface-rgb));transform:rotate(45deg);box-shadow:0 0 13px rgba(var(--theme-accent-rgb),.55);animation:geo-spark 5s ease-in-out infinite}
.geo-branch__node{position:relative;z-index:2;display:grid;place-items:center;width:138px;height:138px;margin:0 auto;background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.14),transparent 68%)}
.geo-branch__node::before{content:"";position:absolute;width:92px;height:92px;border:1px solid rgba(var(--theme-accent-rgb),.38);transform:rotate(45deg);box-shadow:0 0 0 10px rgba(var(--theme-accent-rgb),.025),0 0 26px rgba(var(--theme-accent-rgb),.12)}
.geo-branch__node img{position:relative;width:128px;height:128px;object-fit:contain;filter:drop-shadow(0 0 15px rgba(var(--theme-accent-rgb),.3))}
.geo-branch__routes{position:relative;height:83px;margin-top:-1px;pointer-events:none}
.geo-branch__routes::before{content:"";position:absolute;left:50%;top:0;height:30px;width:2px;transform:translateX(-50%);background:rgba(var(--theme-accent-strong-rgb),.7);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.28)}
.geo-branch__routes::after{content:"";position:absolute;left:16.666%;right:16.666%;top:29px;border-top:1px solid rgba(var(--theme-accent-strong-rgb),.6);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.3)}
.geo-branch__routes i{position:absolute;top:29px;bottom:0;width:1px;background:linear-gradient(rgba(var(--theme-accent-strong-rgb),.65),rgba(var(--theme-accent-rgb),.72));box-shadow:0 0 8px rgba(var(--theme-accent-rgb),.2)}
.geo-branch__routes i:nth-child(1){left:16.666%}.geo-branch__routes i:nth-child(2){left:50%}.geo-branch__routes i:nth-child(3){left:83.333%}
.geo-shards{position:relative;margin:0 0 56px}
.geo-shards button{position:relative;min-height:145px;overflow:visible;background:repeating-linear-gradient(45deg,rgba(var(--theme-accent-rgb),.016) 0 1px,transparent 1px 8px),linear-gradient(150deg,rgba(var(--theme-surface-rgb),.84),rgba(var(--theme-surface-rgb),.35));box-shadow:0 9px 24px rgba(0,0,0,.18)}
.geo-shards button:focus-visible,.geo-regions button:focus-visible{outline:2px solid var(--gold-bright);outline-offset:3px}
.geo-shards__knot{position:absolute;top:-7px;left:50%;width:13px;height:13px;transform:translateX(-50%) rotate(45deg);border:1px solid rgba(var(--theme-accent-strong-rgb),.8);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 0 5px rgba(var(--theme-surface-rgb),.6)}
.geo-shards button.active .geo-shards__knot,.geo-shards button:hover .geo-shards__knot{background:var(--gold-bright);box-shadow:0 0 0 5px rgba(var(--theme-surface-rgb),.6),0 0 17px var(--gold-bright)}
.geo-shards button.active{background:radial-gradient(circle at 50% 0,rgba(var(--theme-accent-rgb),.12),transparent 67%),rgb(var(--theme-surface-rgb))}
.geo-chapter{position:relative}
.geo-chapter::before{content:"";position:absolute;left:50%;top:-56px;height:56px;border-left:1px solid rgba(var(--theme-accent-rgb),.36);pointer-events:none}
.geo-chapter__heading{position:relative;padding-top:20px}
.geo-chapter__heading::before{content:"";position:absolute;left:50%;top:-6px;width:11px;height:11px;transform:translateX(-50%) rotate(45deg);border:1px solid rgba(var(--theme-accent-strong-rgb),.65);background:rgb(var(--theme-surface-rgb))}
.geo-regions{position:relative;margin-top:47px;padding-top:29px}
.geo-regions::before{content:"";position:absolute;top:0;left:16.666%;right:16.666%;border-top:1px solid rgba(var(--theme-accent-rgb),.42)}
.geo-regions::after{content:"";position:absolute;top:-47px;left:50%;height:47px;border-left:1px solid rgba(var(--theme-accent-rgb),.42)}
.geo-regions button{position:relative;min-height:80px;background:repeating-linear-gradient(45deg,rgba(var(--theme-accent-rgb),.012) 0 1px,transparent 1px 7px),rgba(var(--theme-surface-rgb),.42)}
.geo-regions button::before{content:"";position:absolute;left:50%;bottom:100%;height:29px;border-left:1px solid rgba(var(--theme-accent-rgb),.42)}
.geo-regions button i{position:absolute;top:-7px;left:50%;width:12px;height:12px;transform:translateX(-50%) rotate(45deg);border:1px solid rgba(var(--theme-accent-rgb),.55);background:rgb(var(--theme-surface-rgb))}
.geo-regions button.active i{background:var(--gold-bright);box-shadow:0 0 14px rgba(var(--theme-accent-rgb),.7)}
.geo-group h5::before{content:"";display:inline-block;width:8px;height:8px;margin:0 13px 3px 2px;transform:rotate(45deg);border:1px solid rgba(var(--theme-accent-rgb),.65)}
@keyframes geo-spark{0%,100%{top:4px;opacity:.35}50%{top:37px;opacity:1}}
@media(max-width:760px){.geo-header{padding-bottom:5px}.geo-header h1{font-size:68px}.geo-branch__stem{height:33px}.geo-branch__node{width:108px;height:108px}.geo-branch__node::before{width:72px;height:72px}.geo-branch__node img{width:104px;height:104px}.geo-branch__routes{height:60px}.geo-branch__routes::before{height:21px}.geo-branch__routes::after{top:20px}.geo-branch__routes i{top:20px}.geo-shards{margin:0 0 40px}.geo-shards button{min-height:112px;padding:16px 8px 10px}.geo-shards strong{font-size:clamp(21px,5.8vw,27px)}.geo-chapter::before{top:-40px;height:40px}.geo-chapter__heading{padding-top:16px}.geo-regions{margin:30px 0 35px;padding-top:20px}.geo-regions::after{top:-30px;height:30px}.geo-regions button{min-height:74px}.geo-regions button::before{height:20px}}
@media(prefers-reduced-motion:reduce){.geo-branch__stem i{animation:none}}
.geo-map-anchor{scroll-margin-top:28px}
.lore-geography.map-is-expanded{z-index:1000}
.geo-item__name{display:block;min-width:0;flex:1;color:inherit;text-decoration:none}
.geo-item__name b,.geo-item__name small{display:block}
.geo-item__name small{margin-top:5px}
.geo-item__locate{flex:none;display:grid;place-items:center;width:31px;height:31px;padding:0;border:1px solid rgba(var(--theme-accent-rgb),.32);background:rgba(var(--theme-accent-rgb),.06);color:var(--gold-bright);cursor:pointer;font:25px/1 'Cormorant Garamond',serif}
.geo-item__locate:hover,.geo-item__locate:focus-visible{border-color:var(--gold-bright);background:rgba(var(--theme-accent-rgb),.18);outline:none}
.geo-index-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:38px;list-style:none;margin:0;padding:0;border-top:1px solid rgba(var(--theme-accent-rgb),.24)}
.geo-index-list .geo-item{min-width:0;min-height:70px;padding:13px 5px;border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.18);background:transparent}
.geo-index-list .geo-item.linked:hover{background:rgba(var(--theme-accent-rgb),.045)}
.geo-index-list__number{width:31px;flex:none;color:rgba(var(--theme-accent-rgb),.48);font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.04em}
.geo-index-list .geo-item__name b{font-size:22px}
.geo-shards-link{display:inline-block;margin-top:17px;padding:8px 14px;border:1px solid rgba(var(--theme-accent-rgb),.36);color:var(--gold-bright);text-decoration:none;font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.11em;text-transform:uppercase}.geo-shards-link:hover,.geo-shards-link:focus-visible{border-color:var(--gold-bright);background:rgba(var(--theme-accent-rgb),.1)}
@media(max-width:760px){.geo-item{display:flex;align-items:center}.geo-item__locate{width:29px;height:29px}}
@media(max-width:760px){.geo-index-list{grid-template-columns:1fr;column-gap:0}.geo-index-list .geo-item{min-height:60px}.geo-index-list .geo-item__name b{font-size:20px}}

/* Осколки остаются узлами одной нити; части Даскара — компактными вкладками. */
.geo-shell{padding-bottom:72px}
.geo-shards{gap:8px;margin-bottom:36px}
.geo-shards button{min-height:106px;padding:17px 20px 14px;border-color:rgba(var(--theme-accent-rgb),.25);background:rgba(var(--theme-surface-rgb),.3);box-shadow:none}
.geo-shards button.active{border-color:rgba(var(--theme-accent-strong-rgb),.68);background:linear-gradient(180deg,rgba(var(--theme-accent-rgb),.13),rgba(var(--theme-surface-rgb),.4));box-shadow:inset 0 -2px 0 var(--gold-bright)}
.geo-shards strong{font-size:31px;margin:6px 0 5px}
.geo-shards button>span{font-size:8px;letter-spacing:.11em}
.geo-chapter::before{top:-36px;height:36px}
.geo-chapter__heading{padding-top:14px}
.geo-regions{gap:0;margin:30px 0 34px;padding-top:21px}
.geo-regions::after{top:-30px;height:30px}
.geo-regions button{min-height:91px;padding:17px 18px 14px;border:0;border-top:1px solid rgba(var(--theme-accent-rgb),.25);border-bottom:1px solid rgba(var(--theme-accent-rgb),.25);background:transparent;transition:background .2s,border-color .2s}
.geo-regions button+button{border-left:1px solid rgba(var(--theme-accent-rgb),.19)}
.geo-regions button:hover{background:rgba(var(--theme-accent-rgb),.055)}
.geo-regions button.active{border-top-color:rgba(var(--theme-accent-strong-rgb),.7);border-bottom:2px solid var(--gold-bright);background:linear-gradient(180deg,rgba(var(--theme-accent-rgb),.095),transparent)}
.geo-regions button strong{font-size:25px;margin-top:6px}
.geo-regions button small{display:block;margin-top:5px;color:rgba(var(--theme-text-rgb),.53);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.06em}
.geo-region__heading{margin-bottom:24px}
.geo-region__heading h3{font-size:clamp(39px,5vw,59px);margin:7px 0}
@media(max-width:760px){
  .geo-shell{padding-bottom:60px}
  .geo-shards{gap:5px;margin-bottom:30px}
  .geo-shards button{min-height:88px;padding:14px 8px 10px}
  .geo-shards strong{font-size:clamp(19px,5vw,25px);margin:8px 0 0}
  .geo-shards button>span{display:none}
  .geo-chapter::before{top:-30px;height:30px}
  .geo-regions{margin:25px 0 28px;padding-top:18px}
  .geo-regions::after{top:-25px;height:25px}
  .geo-regions button{min-height:72px;padding:11px 6px}
  .geo-regions button::before{height:18px}
  .geo-regions button strong{font-size:clamp(15px,4vw,19px);line-height:1.05}
  .geo-regions button span{font-size:8px}
  .geo-regions button small{font-size:7px;line-height:1.2}
}
</style>
