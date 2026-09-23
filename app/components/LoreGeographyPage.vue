<script setup>
import { GEOGRAPHY_REGIONS, GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'
import { LORE_GLOSSARY } from '~/data/loreGlossary.js'

defineProps({ theme: { type: Object, required: true } })
defineEmits(['up'])

const shardId = ref('daskar')
const regionId = ref('north')
const query = ref('')
const selectedShard = computed(() => GEOGRAPHY_SHARDS.find(item => item.id === shardId.value))
const selectedRegion = computed(() => GEOGRAPHY_REGIONS.find(item => item.id === regionId.value))
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

const mappedIds = new Set([
  ...GEOGRAPHY_SHARDS.map(item => item.glossaryId),
  ...GEOGRAPHY_REGIONS.flatMap(region => region.groups.flatMap(group => group.names))
    .map(name => glossaryEntry(name)?.id).filter(Boolean),
])
const otherPlaces = places.filter(item => !mappedIds.has(item.id))
const needle = computed(() => query.value.toLocaleLowerCase('ru-RU').trim())
function matches(name, entry) {
  return !needle.value || `${name} ${entry?.summary || ''}`.toLocaleLowerCase('ru-RU').includes(needle.value)
}
const visibleGroups = computed(() => (selectedRegion.value?.groups || [])
  .map(group => ({
    ...group,
    items: group.names.map(name => ({ name, entry: glossaryEntry(name) }))
      .filter(item => matches(item.name, item.entry)),
  }))
  .filter(group => group.items.length))
const visibleOtherPlaces = computed(() => otherPlaces.filter(item => matches(item.term, item)))

useHead({ title: 'География Эноа · Lore', meta: [{
  name: 'description',
  content: 'Атлас Даскара, Вар’Элора и Азара: карты Северного и Центрального Даскара и указатель географических названий мира Эноа.',
}] })
</script>

<template>
  <main class="lore-geography" :style="{ background: theme.bg }">
    <div class="geo-scroll">
      <div class="geo-shell">
        <header class="geo-header">
          <button type="button" class="geo-back" aria-label="Вернуться к карте Lore" @click="$emit('up')">↖ <span>LORE</span></button>
          <p>АРХИВ МИРА ЭНОА · АТЛАС</p>
          <h1>География</h1>
          <span class="geo-intro">Три осколка мира. Карты, названия и дороги, вокруг которых складываются истории.</span>
        </header>

        <nav class="geo-shards" aria-label="Осколки мира">
          <button v-for="(shard, index) in GEOGRAPHY_SHARDS" :key="shard.id" type="button"
            :class="{ active: shardId === shard.id }" :aria-pressed="shardId === shard.id" @click="shardId = shard.id; query = ''">
            <small>0{{ index + 1 }} · {{ shard.kind }}</small><strong>{{ shard.title }}</strong><span>Открыть осколок ↗</span>
          </button>
        </nav>

        <section v-if="selectedShard" class="geo-chapter" aria-live="polite">
          <div class="geo-chapter__heading">
            <div><p>ОСКОЛОК · {{ selectedShard.kind }}</p><h2>{{ selectedShard.title }}</h2><span>{{ selectedShard.description }}</span></div>
            <NuxtLink :to="`/lore/glossary/${selectedShard.glossaryId}`" class="geo-text-link">Статья в глоссарии ↗</NuxtLink>
          </div>

          <template v-if="shardId === 'daskar'">
            <nav class="geo-regions" aria-label="Регионы Даскара">
              <button v-for="region in GEOGRAPHY_REGIONS" :key="region.id" type="button"
                :class="{ active: regionId === region.id }" :aria-pressed="regionId === region.id" @click="regionId = region.id; query = ''">
                <span>{{ region.short }}</span><strong>{{ region.title }}</strong>
              </button>
            </nav>

            <section v-if="selectedRegion" class="geo-region">
              <div class="geo-region__heading"><p>Д А С К А Р / {{ selectedRegion.short.toLocaleUpperCase('ru-RU') }}</p><h3>{{ selectedRegion.title }}</h3><span>{{ selectedRegion.description }}</span></div>
              <figure v-if="selectedRegion.map" class="geo-map">
                <a :href="selectedRegion.map" target="_blank" rel="noopener noreferrer" :aria-label="`Открыть карту: ${selectedRegion.title}`">
                  <img :src="selectedRegion.map" :alt="selectedRegion.mapAlt" loading="lazy">
                  <span>Открыть карту в полном размере ↗</span>
                </a>
                <figcaption>{{ selectedRegion.id === 'central' ? 'Земли Ханидов · Центральный Даскар' : selectedRegion.title }} · карта из архива пользователя</figcaption>
              </figure>
              <div v-else class="geo-map-pending"><i aria-hidden="true">◇</i><span>Карта Южного Даскара ещё не добавлена</span></div>

              <div class="geo-index-heading"><div><p>ТОПОНИМИЧЕСКИЙ УКАЗАТЕЛЬ</p><h4>{{ selectedRegion.map ? 'Места на карте' : 'Опорные места' }}</h4></div>
                <label><span class="sr-only">Поиск географического названия</span><input v-model="query" type="search" placeholder="Найти место…"></label>
              </div>
              <div v-if="visibleGroups.length" class="geo-groups">
                <section v-for="group in visibleGroups" :key="group.title" class="geo-group">
                  <h5>{{ group.title }} <span>{{ group.items.length }}</span></h5>
                  <div class="geo-items">
                    <template v-for="item in group.items" :key="item.name">
                    <NuxtLink v-if="item.entry" :to="`/lore/glossary/${item.entry.id}`" class="geo-item linked">
                      <b>{{ item.name }}</b><small>{{ item.entry ? 'Статья Lore ↗' : 'На карте' }}</small>
                    </NuxtLink>
                    <span v-else class="geo-item"><b>{{ item.name }}</b><small>На карте</small></span>
                    </template>
                  </div>
                </section>
              </div>
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

        <section class="geo-archive">
          <div><p>УКАЗАТЕЛЬ LORE</p><h2>Другие места свода</h2><span>Топонимы из глоссария, которые пока не привязаны к этим двум картам. Их регион не назначен без подтверждения источником.</span></div>
          <div class="geo-archive__list">
            <NuxtLink v-for="entry in visibleOtherPlaces" :key="entry.id" :to="`/lore/glossary/${entry.id}`">{{ entry.term }} <i>↗</i></NuxtLink>
            <p v-if="!visibleOtherPlaces.length">По запросу ничего не найдено.</p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.lore-geography{position:fixed;inset:0;z-index:45;color:rgba(var(--theme-text-rgb),.82);background:#090b11;overflow:hidden}.geo-scroll{height:100%;overflow-y:auto;background:radial-gradient(ellipse 60% 35% at 50% 0%,rgba(var(--theme-accent-rgb),.08),transparent 75%)}.geo-shell{width:min(1180px,calc(100% - 64px));margin:auto;padding:50px 0 120px}.geo-header{text-align:center;position:relative;padding:30px 0 58px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.2)}.geo-back{position:absolute;left:0;top:0;border:1px solid rgba(var(--theme-accent-rgb),.25);background:rgba(var(--theme-surface-rgb),.32);color:var(--gold-bright);padding:10px 14px;cursor:pointer;font:600 11px 'Hanken Grotesk',sans-serif;letter-spacing:.16em}.geo-header p,.geo-chapter__heading p,.geo-region__heading p,.geo-index-heading p,.geo-archive>div:first-child p{font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.25em;color:var(--gold-bright)}.geo-header h1{font:500 clamp(64px,11vw,130px)/.95 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);margin:15px 0 21px}.geo-intro,.geo-chapter__heading span,.geo-region__heading span,.geo-archive>div:first-child span{display:block;max-width:660px;margin:auto;font:20px/1.4 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.65)}.geo-shards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:30px 0 55px}.geo-shards button{min-height:153px;text-align:left;border:1px solid rgba(var(--theme-accent-rgb),.22);background:linear-gradient(150deg,rgba(var(--theme-surface-rgb),.65),rgba(var(--theme-surface-rgb),.2));padding:21px 24px;cursor:pointer;color:inherit;transition:border-color .2s,transform .2s}.geo-shards button:hover{transform:translateY(-3px);border-color:rgba(var(--theme-accent-rgb),.5)}.geo-shards button.active{border-color:var(--gold-bright);box-shadow:inset 0 0 0 1px rgba(var(--theme-accent-rgb),.3)}.geo-shards small,.geo-shards button>span{display:block;color:rgba(var(--theme-accent-rgb),.65);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.17em;text-transform:uppercase}.geo-shards strong{display:block;color:rgba(var(--theme-heading-rgb),.92);font:500 39px/1.1 'Cormorant Garamond',serif;margin:17px 0 13px}.geo-chapter__heading{display:flex;justify-content:space-between;gap:30px;align-items:end;border-bottom:1px solid rgba(var(--theme-accent-rgb),.2);padding-bottom:27px}.geo-chapter__heading h2,.geo-archive h2{font:500 clamp(45px,6vw,75px)/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95);margin:8px 0 12px}.geo-chapter__heading span{margin:0}.geo-text-link{white-space:nowrap;color:var(--gold-bright);text-decoration:none;border-bottom:1px solid rgba(var(--theme-accent-rgb),.4);padding-bottom:5px;font:600 11px 'Hanken Grotesk',sans-serif;letter-spacing:.08em}.geo-regions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:34px 0 42px}.geo-regions button{text-align:left;border:1px solid rgba(var(--theme-accent-rgb),.17);background:rgba(var(--theme-surface-rgb),.25);padding:15px 18px;cursor:pointer;color:inherit}.geo-regions button.active{background:rgba(var(--theme-accent-rgb),.12);border-color:rgba(var(--theme-accent-rgb),.6)}.geo-regions button span{display:block;color:var(--gold-bright);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase}.geo-regions button strong{display:block;margin-top:7px;color:rgba(var(--theme-heading-rgb),.87);font:500 25px 'Cormorant Garamond',serif}.geo-region__heading{text-align:center;margin:0 auto 30px}.geo-region__heading h3{font:500 clamp(42px,6vw,70px)/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);margin:10px 0}.geo-map{margin:0}.geo-map a{display:block;position:relative;overflow:hidden;border:1px solid rgba(var(--theme-accent-rgb),.33);background:#241c1a}.geo-map img{display:block;width:100%;height:auto}.geo-map a>span{position:absolute;right:14px;bottom:14px;padding:11px 15px;background:rgba(7,8,12,.87);border:1px solid rgba(237,202,152,.55);color:#f4d6a2;font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.07em}.geo-map figcaption{padding:11px 0;text-align:right;font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.58)}.geo-map-pending{height:230px;display:grid;place-content:center;text-align:center;gap:13px;border:1px dashed rgba(var(--theme-accent-rgb),.35);background:rgba(var(--theme-surface-rgb),.22);color:rgba(var(--theme-text-rgb),.62);font:18px 'Cormorant Garamond',serif}.geo-map-pending i{font-size:34px;color:var(--gold-bright);font-style:normal}.geo-index-heading{display:flex;justify-content:space-between;align-items:end;gap:20px;margin:55px 0 25px}.geo-index-heading h4{font:500 42px 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.9);margin:4px 0 0}.geo-index-heading input{min-width:260px;padding:11px 14px;color:inherit;background:rgba(var(--theme-surface-rgb),.35);border:1px solid rgba(var(--theme-accent-rgb),.27);outline:none}.geo-index-heading input:focus{border-color:var(--gold-bright)}.geo-groups{display:grid;gap:30px}.geo-group h5{font:500 29px 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.84);margin:0 0 10px}.geo-group h5 span{color:var(--gold-bright);font:600 10px 'Hanken Grotesk',sans-serif;margin-left:5px}.geo-items{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.geo-item{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 13px;border:1px solid rgba(var(--theme-accent-rgb),.15);background:rgba(var(--theme-surface-rgb),.2);color:rgba(var(--theme-text-rgb),.77);text-decoration:none}.geo-item.linked:hover{border-color:var(--gold-bright);color:var(--gold-bright)}.geo-item b{font:500 18px/1.05 'Cormorant Garamond',serif}.geo-item small{flex:none;font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.06em;color:rgba(var(--theme-accent-rgb),.56)}.geo-empty{padding:30px;border:1px solid rgba(var(--theme-accent-rgb),.18);text-align:center}.geo-shard-note{padding:60px 30px;text-align:center;border:1px dashed rgba(var(--theme-accent-rgb),.25);margin-top:35px}.geo-shard-note>span{display:block;font-size:42px;color:var(--gold-bright)}.geo-shard-note p{max-width:470px;margin:10px auto;font:22px 'Cormorant Garamond',serif}.geo-archive{margin-top:90px;padding-top:35px;border-top:1px solid rgba(var(--theme-accent-rgb),.2)}.geo-archive>div:first-child span{margin:0}.geo-archive__list{display:flex;flex-wrap:wrap;gap:7px;margin-top:25px}.geo-archive__list a{display:inline-flex;gap:8px;padding:9px 11px;border:1px solid rgba(var(--theme-accent-rgb),.16);color:rgba(var(--theme-text-rgb),.7);text-decoration:none;font:17px 'Cormorant Garamond',serif}.geo-archive__list a:hover{border-color:var(--gold-bright);color:var(--gold-bright)}.geo-archive__list i{font-style:normal;color:var(--gold-bright)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.geo-threads{margin-top:35px}.geo-threads>p{color:var(--gold-bright);font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.2em}.geo-threads>div{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.geo-threads a{padding:22px;border:1px solid rgba(var(--theme-accent-rgb),.24);background:rgba(var(--theme-surface-rgb),.23);text-decoration:none;color:inherit}.geo-threads a:hover{border-color:var(--gold-bright)}.geo-threads small,.geo-threads span{display:block;color:var(--gold-bright);font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase}.geo-threads strong{display:block;margin:13px 0;color:rgba(var(--theme-heading-rgb),.93);font:500 31px 'Cormorant Garamond',serif}
@media(min-width:761px){.geo-shell{width:min(1120px,calc(100% - 160px));transform:translateX(34px)}}
@media(max-width:760px){.geo-shell{width:calc(100% - 32px);padding:65px 0 100px}.geo-header{padding:22px 0 35px}.geo-back{top:-45px}.geo-header h1{font-size:68px}.geo-intro,.geo-chapter__heading span,.geo-region__heading span{font-size:17px}.geo-shards{gap:6px;margin:20px 0 35px}.geo-shards button{min-height:105px;padding:12px 8px}.geo-shards small{font-size:7px;line-height:1.4}.geo-shards strong{font-size:27px;margin:12px 0 4px}.geo-shards button>span{display:none}.geo-chapter__heading{display:block}.geo-text-link{display:inline-block;margin-top:18px}.geo-regions{gap:5px;margin:23px}.geo-regions button{padding:10px 8px}.geo-regions button strong{font-size:17px}.geo-map a>span{font-size:8px;padding:7px}.geo-index-heading{display:block;margin-top:37px}.geo-index-heading label{display:block;margin-top:15px}.geo-index-heading input{width:100%}.geo-items,.geo-threads>div{grid-template-columns:repeat(2,1fr)}.geo-item{display:block;padding:10px}.geo-item b{display:block}.geo-item small{display:block;margin-top:5px}.geo-archive{margin-top:60px}.geo-archive h2{font-size:46px}}
</style>
