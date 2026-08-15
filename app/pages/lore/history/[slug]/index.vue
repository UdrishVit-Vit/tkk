<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'
import historyContent from '~/data/loreHistoryContent.generated.json'

definePageMeta({ scrollToTop: false })

const route = useRoute()
const sectionIndex = computed(() => HISTORY_THREAD.sections.findIndex(item => item.slug === route.params.slug))
const section = computed(() => HISTORY_THREAD.sections[sectionIndex.value])
const content = computed(() => historyContent.eras.find(item => item.slug === route.params.slug))

if (!section.value || !content.value) {
  throw createError({ statusCode: 404, statusMessage: 'Эпоха не найдена' })
}

useHead(() => ({
  title: `${section.value.title} · Нить Башни Мафраш`,
  meta: [{ name: 'description', content: section.value.summary }],
}))
</script>

<template>
  <LoreHistoryEraPage :section="section" :content="content" :index="sectionIndex" />
</template>
