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
  <LoreThreadPage :theme="theme" title="Осколки" eyebrow="Архив Башни · Облик мира" icon="/assets/nodes/shards-lore.svg?v=2" @up="$emit('up')">
    <template #intro>
      <p>Мир сквозь эпохи. Солнца, луны и осколки Эноа, связанные одной нитью времени.</p>
      <NuxtLink to="/lore/geography">Атлас мира ↗</NuxtLink>
    </template>
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
  </LoreThreadPage>
</template>

<style scoped>
.shard-detail{border-top:1px solid rgba(var(--theme-accent-rgb),.2);padding-top:24px}.shard-detail__heading{display:flex;flex-wrap:wrap;align-items:baseline;gap:18px}.shard-detail h3{flex:1;margin:0;font:600 36px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.95)}.shard-detail a{color:var(--gold-bright);text-decoration:none;font:9px 'Hanken Grotesk',sans-serif}.shard-detail a:hover{text-decoration:underline}.shard-detail>p{max-width:700px;margin:18px 0 0;font:italic 19px/1.6 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.65)}.shard-detail__more{margin-top:20px;font:10px 'Hanken Grotesk',sans-serif;color:var(--gold-bright)}.shard-detail__more summary{cursor:pointer;width:fit-content;padding:8px 0}.shard-detail__more nav{display:flex;flex-wrap:wrap;gap:18px;padding:14px 0}a:focus-visible,summary:focus-visible{outline:1px solid var(--gold-bright);outline-offset:5px}@media(max-width:760px){.shard-detail h3{font-size:32px}.shard-detail>p{font-size:17px}}
</style>
