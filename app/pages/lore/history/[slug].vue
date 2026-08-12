<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'

const route = useRoute()
const sectionIndex = computed(() => HISTORY_THREAD.sections.findIndex(item => item.slug === route.params.slug))
const section = computed(() => HISTORY_THREAD.sections[sectionIndex.value])

if (!section.value) {
  throw createError({ statusCode: 404, statusMessage: 'Эпоха не найдена' })
}

useHead(() => ({
  title: `${section.value.title} · История Эноа`,
  meta: [{ name: 'description', content: section.value.summary }],
}))
</script>

<template>
  <LoreHistoryEraPage :section="section" :index="sectionIndex" />
</template>
