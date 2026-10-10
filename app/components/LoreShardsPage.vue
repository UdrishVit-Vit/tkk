<script setup>
import { GEOGRAPHY_REGIONS, GEOGRAPHY_SHARDS } from '~/data/loreGeography.js'

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
  <LoreThreadPage class="shards-page" :theme="theme" title="Осколки" eyebrow="Архив Башни · Облик мира" icon="/assets/nodes/shards-lore.svg?v=2" @up="$emit('up')">
    <template #intro>
      <p>Мир сквозь эпохи. Солнца, луны и осколки Эноа, связанные одной нитью времени.</p>
      <NuxtLink to="/lore/geography">Атлас мира ↗</NuxtLink>
    </template>
      <LoreShardEpochs v-slot="{nodeId}" :selected-shard="selectedId" @era-change="showShardDetails=$event">
        <section v-if="showShardDetails && selectedShard && nodeId === selectedId" :key="selectedShard.id" class="shard-detail" aria-live="polite">
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
@media(max-width:760px){
  .shards-page :deep(.lore-thread-canvas){--thread-x:24px;--body-x:70px;padding:16px 12px 96px}
  .shards-page :deep(.lore-thread-intro){min-height:0;padding:8px 0 18px 58px}
  .shards-page :deep(.lore-thread-home){left:12px;top:6px;width:48px;height:48px}
  .shards-page :deep(.lore-thread-eyebrow){margin-bottom:8px;font-size:6px}
  .shards-page :deep(.lore-thread-copy h1){font-size:36px}
  .shards-page :deep(.lore-thread-note){display:none}
  .shards-page :deep(.lore-thread-body){padding-left:0}
  .shards-page :deep(.epoch-story),.shards-page :deep(.epoch-draft-note),.shards-page :deep(.epoch-node-story),.shards-page :deep(.epoch-detail){box-sizing:border-box;padding-left:40px}
}
.shard-detail{padding-bottom:12px}.shard-detail a{color:var(--gold-bright);text-decoration:none;font:9px 'Hanken Grotesk',sans-serif}.shard-detail a:hover{text-decoration:underline}.shard-detail__more{font:10px 'Hanken Grotesk',sans-serif;color:var(--gold-bright)}.shard-detail__more summary{cursor:pointer;width:fit-content;padding:8px 0}.shard-detail__more nav{display:flex;flex-wrap:wrap;gap:18px;padding:14px 0}a:focus-visible,summary:focus-visible{outline:1px solid var(--gold-bright);outline-offset:5px}
</style>
