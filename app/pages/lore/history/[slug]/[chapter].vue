<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'
import historyContent from '~/data/loreHistoryContent.generated.json'

const route = useRoute()
const eraIndex = computed(() => HISTORY_THREAD.sections.findIndex(item => item.slug === route.params.slug))
const section = computed(() => HISTORY_THREAD.sections[eraIndex.value])
const content = computed(() => historyContent.eras.find(item => item.slug === route.params.slug))
const entries = computed(() => content.value?.entries || [])
const entryIndex = computed(() => entries.value.findIndex(item => item.slug === route.params.chapter))
const entry = computed(() => entries.value[entryIndex.value])

if (!section.value || !entry.value) {
  throw createError({ statusCode: 404, statusMessage: 'Запись летописи не найдена' })
}

useHead(() => ({
  title: `${entry.value.title} · ${section.value.title} · История Эноа`,
  meta: [{ name: 'description', content: entry.value.description || section.value.summary }],
}))
</script>

<template>
  <LoreHistoryEntryPage
    :section="section"
    :entry="entry"
    :entries="entries"
    :era-index="eraIndex"
    :entry-index="entryIndex"
  />
</template>
