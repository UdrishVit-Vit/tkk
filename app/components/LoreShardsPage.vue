<script setup>
import { GEOGRAPHY_REGIONS, GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'
import { LORE_GLOSSARY } from '~/data/loreGlossary.js'

defineProps({ theme: { type: Object, required: true } })
defineEmits(['up'])

const route = useRoute()
const validIds = new Set(GEOGRAPHY_SHARDS.map(item => item.id))
const shardFromHash = () => {
  const id = route.query.shard || route.hash.replace(/^#/, '')
  return validIds.has(id) ? id : 'daskar'
}
const selectedId = ref(shardFromHash())
onMounted(() => { selectedId.value = shardFromHash() })
watch(() => [route.query.shard, route.hash], () => { selectedId.value = shardFromHash() })
const selectedShard = computed(() => GEOGRAPHY_SHARDS.find(item => item.id === selectedId.value))
const selectedEntry = computed(() => LORE_GLOSSARY.find(item => item.id === selectedShard.value?.glossaryId))
const showShardDetails = ref(true)
const regions = GEOGRAPHY_REGIONS.map(region => ({
  id: region.id, title: region.title, hasMap: Boolean(region.map), description: region.description,
}))


useHead({
  title: 'Осколки Эноа · Lore',
  meta: [{ name: 'description', content: 'Осколки мира Эноа: Даскар, Вар’Элор и Азар. Солнца, луны и облик мира сквозь эпохи.' }],
})
</script>

<template>
  <main class="shards-page" :style="{ background: theme.bg }">
    <div class="shards-scroll">
      <div class="shards-shell">
        <div class="shards-main-thread" aria-hidden="true" />
        <header class="shards-header">
          <button type="button" class="shards-back" aria-label="Вернуться к карте Lore" @click="$emit('up')">↖ <span>LORE</span></button>
          <p class="shards-eyebrow">АРХИВ МИРА ЭНОА · НЕБЕСНЫЙ АТЛАС</p>
          <h1>Осколки</h1>
          <p class="shards-lead">Одно небо. Разные эпохи. Проследите, как менялся мир — от единой Эноа до земель, разделённых Расколом.</p>
          <p class="shards-hint">ВЫБЕРИТЕ ЭПОХУ И ПРОЙДИТЕ ПО НИТИ ВРЕМЕНИ ↓</p>
        </header>

        <LoreShardEpochs :selected-shard="selectedId" @era-change="showShardDetails = $event" />

        <div v-if="showShardDetails" class="shards-layout">

          <aside v-if="selectedShard" :key="selectedShard.id" class="shard-detail" :class="`shard-detail--${selectedShard.id}`" aria-live="polite">
            <div class="shard-detail__top"><span>ОСКОЛОК ЭНОА</span><span>0{{ GEOGRAPHY_SHARDS.findIndex(item => item.id === selectedId) + 1 }} / 03</span></div>
            <div class="shard-detail__icon"><LoreShardIcon :id="selectedShard.id" /></div>
            <p class="shard-detail__kind">{{ selectedShard.kind }}</p>
            <h2>{{ selectedShard.title }}</h2>
            <p class="shard-detail__lead">{{ selectedShard.description }}</p>
            <div v-if="selectedEntry?.definition" class="shard-detail__text">
              <span>ИЗ СВОДА LORE</span>
              <p>{{ selectedEntry.definition }}</p>
            </div>
            <div v-if="selectedId === 'daskar'" class="shard-detail__links">
              <span>РЕГИОНЫ ДАСКАРА</span>
              <NuxtLink v-for="region in regions" :key="region.id" :to="`/lore/geography?region=${region.id}`">
                <strong>{{ region.title }}</strong><small>{{ region.hasMap ? 'КАРТА И МЕСТА ↗' : 'ОПОРНЫЕ МЕСТА ↗' }}</small>
              </NuxtLink>
            </div>
            <div v-else-if="selectedShard.threads?.length" class="shard-detail__links">
              <span>СВЯЗАННЫЕ НИТИ</span>
              <NuxtLink v-for="thread in selectedShard.threads" :key="thread.glossaryId" :to="`/lore/glossary/${thread.glossaryId}`">
                <strong>{{ thread.title }}</strong><small>{{ thread.note }} ↗</small>
              </NuxtLink>
            </div>
            <div class="shard-detail__footer">
              <NuxtLink :to="`/lore/glossary/${selectedShard.glossaryId}`">Читать статью в Lore <span>↗</span></NuxtLink>
              <NuxtLink :to="`/lore/geography?shard=${selectedShard.id}`">География Эноа <span>↗</span></NuxtLink>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.shards-page{position:fixed;inset:0;z-index:45;color:rgba(var(--theme-text-rgb),.86);overflow:hidden;background:var(--theme-bg)}
.shards-scroll{height:100%;overflow-y:auto;overflow-x:hidden;background:radial-gradient(ellipse 65% 35% at 60% 12%,rgba(var(--theme-accent-rgb),.055),transparent 80%)}
.shards-shell{--atlas-inset:max(148px,calc((100vw - 1120px) / 2 + 34px));position:relative;width:calc(100% - var(--atlas-inset) - 60px);max-width:1120px;margin-left:var(--atlas-inset);padding:64px 0 85px}
.shards-main-thread{position:absolute;left:-29px;top:0;bottom:0;width:1px;background:linear-gradient(#c4a16a30,#d5b589 190px,#c4a16a90 65%,#c4a16a20);box-shadow:0 0 14px #c4a16a30;pointer-events:none}
.shards-header{position:relative;text-align:center;padding:0 85px}
.shards-back{position:absolute;left:0;top:0;border:0;padding:9px 0;background:none;color:#d5b589;font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.16em;cursor:pointer}
.shards-back:hover,.shards-back:focus-visible{color:#efd5ad}
.shards-eyebrow,.shard-detail__top,.shard-detail__kind,.shard-detail__text>span,.shard-detail__links>span{color:#d5b589;font:600 9px 'Hanken Grotesk',sans-serif;letter-spacing:.2em}
.shards-header h1{margin:20px 0 18px;color:rgba(var(--theme-heading-rgb),.98);font:500 clamp(68px,9vw,112px)/.9 'Cormorant Garamond',serif}
.shards-lead{max-width:550px;margin:auto;color:rgba(var(--theme-text-rgb),.65);font:22px/1.4 'Cormorant Garamond',serif}
.shards-hint{margin:24px 0 0;color:rgba(var(--theme-text-rgb),.4);font:8px 'Hanken Grotesk',sans-serif;letter-spacing:.2em}
.shards-layout{margin-top:22px}
.shard-detail{--detail-color:#e9c18c;min-height:650px;position:relative;overflow:hidden;padding:26px 31px 30px;border:1px solid rgba(var(--theme-accent-rgb),.32);background:linear-gradient(145deg,rgba(var(--theme-surface-rgb),.91),rgba(var(--theme-surface-rgb),.45));animation:detail-in .28s ease-out}.shard-detail::before{content:"";position:absolute;top:-100px;right:-90px;width:330px;height:330px;border:1px solid color-mix(in srgb,var(--detail-color) 24%,transparent);transform:rotate(45deg);pointer-events:none}.shard-detail--var-elor{--detail-color:#b8a1d9}.shard-detail--azar{--detail-color:#b5d9e5}.shard-detail__top{display:flex;justify-content:space-between;gap:10px;font-size:9px}.shard-detail__icon{width:113px;height:113px;margin:23px 0 9px;color:var(--detail-color)}.shard-detail__kind{margin:0;color:var(--detail-color)}.shard-detail h2{margin:7px 0 13px;color:var(--detail-color);font:500 clamp(54px,5.5vw,76px)/.9 'Cormorant Garamond',serif}.shard-detail__lead{margin:0 0 24px;color:rgba(var(--theme-heading-rgb),.85);font:22px/1.23 'Cormorant Garamond',serif}.shard-detail__text{padding:17px 0;border-top:1px solid rgba(var(--theme-accent-rgb),.24)}.shard-detail__text p{margin:8px 0 0;color:rgba(var(--theme-text-rgb),.73);font:17px/1.45 'Cormorant Garamond',serif}.shard-detail__links{margin-top:7px;padding-top:14px;border-top:1px solid rgba(var(--theme-accent-rgb),.24)}.shard-detail__links>span{display:block;margin-bottom:10px}.shard-detail__links a{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.13);color:rgba(var(--theme-heading-rgb),.83);text-decoration:none}.shard-detail__links a:hover,.shard-detail__links a:focus-visible{color:var(--detail-color)}.shard-detail__links strong{font:500 21px 'Cormorant Garamond',serif}.shard-detail__links small{font:600 8px 'Hanken Grotesk',sans-serif;letter-spacing:.07em;color:var(--detail-color);text-align:right}.shard-detail__footer{display:grid;gap:8px;margin-top:25px}.shard-detail__footer a{display:flex;justify-content:space-between;padding:11px 13px;border:1px solid rgba(var(--theme-accent-rgb),.3);color:var(--detail-color);text-decoration:none;font:600 10px 'Hanken Grotesk',sans-serif;letter-spacing:.08em}.shard-detail__footer a:hover{background:rgba(var(--theme-accent-rgb),.09)}@keyframes detail-in{from{opacity:.35;transform:translateY(8px)}to{opacity:1;transform:none}}

.shard-detail{min-height:0;padding:32px 36px;display:grid;grid-template-columns:140px minmax(0,1fr) minmax(0,1fr);gap:0 28px}
.shard-detail__top{grid-column:1/-1;margin-bottom:24px}.shard-detail__icon{grid-column:1;grid-row:2/6;margin:0;width:120px;height:120px}.shard-detail__kind,.shard-detail h2,.shard-detail__lead{grid-column:2}.shard-detail h2{font-size:62px}.shard-detail__lead{font-size:20px}.shard-detail__text{grid-column:3;grid-row:2/5;padding-top:0;border-top:0}.shard-detail__links{grid-column:3;grid-row:5/7}.shard-detail__footer{grid-column:2;margin-top:0}
@media(max-width:1050px){.shards-shell{--atlas-inset:122px;width:calc(100% - 165px)}.shards-header{padding:0 55px}.shard-detail{grid-template-columns:90px minmax(0,1fr);gap:0 24px}.shard-detail__icon{width:85px;height:85px;grid-row:2/5}.shard-detail__text,.shard-detail__links,.shard-detail__footer{grid-column:2;grid-row:auto}.shard-detail__text{border-top:1px solid rgba(var(--theme-accent-rgb),.2);padding-top:16px}.shard-detail__footer{margin-top:20px}}
@media(max-width:760px){.shards-shell{--atlas-inset:40px;width:calc(100% - 60px);padding:80px 0 110px}.shards-main-thread{left:-16px}.shards-header{padding:0}.shards-back{top:-40px}.shards-eyebrow{font-size:7px;letter-spacing:.14em}.shards-header h1{font-size:76px}.shards-lead{font-size:19px}.shards-hint{font-size:6px;line-height:1.8}.shard-detail{display:block;padding:22px}.shard-detail__icon{margin:20px 0 14px;width:70px;height:70px}.shard-detail h2{font-size:52px}.shard-detail__text{margin-top:20px}}
@media(prefers-reduced-motion:reduce){.shard-detail{animation:none}}
</style>
