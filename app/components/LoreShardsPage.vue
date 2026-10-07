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
  <main class="shards-page" :style="{background:theme.bg}">
    <div class="shards-scroll"><div class="shards-shell">
      <div class="shards-axis" aria-hidden="true"><i/><i/><i/><i/></div>
      <header class="shards-header">
        <button type="button" class="shards-back" @click="$emit('up')">← Lore</button>
        <div class="shards-heading"><img src="/assets/nodes/shards-lore.svg?v=2" width="88" height="88" alt=""><h1>Осколки</h1></div>
      </header>
      <LoreShardEpochs :selected-shard="selectedId" @era-change="showShardDetails=$event">
        <section v-if="showShardDetails && selectedShard" :key="selectedShard.id" class="shard-detail" aria-live="polite">
          <div class="shard-detail__heading"><h3>{{selectedShard.title}}</h3><NuxtLink :to="`/lore/glossary/${selectedShard.glossaryId}`">Статья ↗</NuxtLink><NuxtLink :to="`/lore/geography?shard=${selectedShard.id}`">Карта ↗</NuxtLink></div>
          <p>{{selectedEntry?.definition || selectedShard.description}}</p>
          <details v-if="selectedId === 'daskar' || selectedShard.threads?.length" class="shard-detail__more">
            <summary>{{selectedId === 'daskar' ? 'Регионы Даскара' : 'Связанные нити'}}</summary>
            <nav v-if="selectedId === 'daskar'"><NuxtLink v-for="region in regions" :key="region.id" :to="`/lore/geography?region=${region.id}`">{{region.title}} ↗</NuxtLink></nav>
            <nav v-else><NuxtLink v-for="thread in selectedShard.threads" :key="thread.glossaryId" :to="`/lore/glossary/${thread.glossaryId}`">{{thread.title}} ↗</NuxtLink></nav>
          </details>
        </section>
      </LoreShardEpochs>
    </div></div>
  </main>
</template>

<style scoped>
.shards-page{position:fixed;inset:0 0 0 68px;z-index:45;color:rgba(var(--theme-text-rgb),.86);overflow:hidden;background:var(--theme-bg)}
.shards-scroll{height:100%;overflow-y:auto;overflow-x:hidden;background:radial-gradient(ellipse at 75% 22%,#c4a16a09,transparent 70%)}
.shards-shell{--shell-margin:38px;--axis-x:25px;position:relative;isolation:isolate;margin:0 var(--shell-margin);max-width:1500px;padding:34px 0 70px}
.shards-header{position:absolute;top:24px;left:0;width:300px;z-index:2}.shards-back{margin-left:75px;padding:8px 0;border:0;background:none;color:#cbb68f;font:11px 'Hanken Grotesk',sans-serif;cursor:pointer}.shards-heading{position:relative;display:flex;align-items:center;min-height:78px;margin-top:14px;padding-left:75px}.shards-heading img{position:absolute;left:var(--axis-x);top:0;transform:translateX(-50%);width:78px;height:78px;filter:drop-shadow(0 0 12px #d5b58920)}.shards-heading h1{margin:0;font:500 60px/.9 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.97)}
.shard-detail{border-top:1px solid #c4a16a25;padding-top:20px;animation:detail-in .4s ease-out}.shard-detail__heading{display:flex;align-items:baseline;gap:22px}.shard-detail h3{flex:1;margin:0;color:#d5b589;font:500 32px 'Cormorant Garamond',serif}.shard-detail a{color:#cbb68f;text-decoration:none;font:10px 'Hanken Grotesk',sans-serif}.shard-detail a:hover{color:#efd5ad}.shard-detail>p{max-width:700px;margin:10px 0 0;font:19px/1.5 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.65)}.shard-detail__more{margin-top:18px;color:#cbb68f;font:11px 'Hanken Grotesk',sans-serif}.shard-detail__more summary{cursor:pointer;width:fit-content;padding:8px 0}.shard-detail__more nav{display:flex;flex-wrap:wrap;gap:18px;padding:12px 0}.shard-detail__more[open] summary{color:#efd5ad}
button:focus-visible,a:focus-visible,summary:focus-visible{outline:1px solid #d5b589;outline-offset:5px}@keyframes detail-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
@media(max-width:1050px){.shards-shell{--shell-margin:24px}.shards-header{width:250px}.shards-heading{padding-left:65px}.shards-back{margin-left:65px}.shards-heading h1{font-size:51px}.shards-heading img{width:70px;height:70px}}
@media(max-width:760px){.shards-page{left:0}.shards-shell{--shell-margin:22px;padding:24px 0 100px}.shards-header{position:relative;top:auto;width:100%;margin-bottom:24px}.shards-heading{margin-top:14px}.shards-heading h1{font-size:52px}.shards-heading img{width:70px;height:70px}.shard-detail__heading{gap:18px}.shard-detail>p{font-size:18px}}
.shards-axis{position:absolute;left:var(--axis-x);top:0;bottom:0;width:14px;transform:translateX(-50%);pointer-events:none;z-index:-1}.shards-axis i{position:absolute;left:50%;top:0;bottom:0;transform:translateX(-50%)}.shards-axis i:nth-child(1){width:2px;background:linear-gradient(transparent,#c4a16a80 4%,#e0c291aa 50%,#c4a16a60 96%,transparent);box-shadow:0 0 9px #c4a16a33}.shards-axis i:nth-child(2){width:7px;background:#c4a16a20;filter:blur(5px)}.shards-axis i:nth-child(3),.shards-axis i:nth-child(4){width:1px;background:repeating-linear-gradient(#e0c29190 0 6px,transparent 6px 12px);animation:axis-weave 8s linear infinite}.shards-axis i:nth-child(3){margin-left:-3px}.shards-axis i:nth-child(4){margin-left:3px;animation-direction:reverse;animation-duration:11s}@keyframes axis-weave{to{background-position:0 24px}}
@media(prefers-reduced-motion:reduce){.shard-detail,.shards-axis i{animation:none}}
</style>
