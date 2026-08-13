<script setup>
import historyContent from '~/data/loreHistoryContent.generated.json'

const route = useRoute()
const era = historyContent.eras.find(item => item.slug === route.params.slug)
const chapter = era?.chapters.find(item => item.slug === route.params.chapter)

if (!era || !chapter) {
  throw createError({ statusCode: 404, statusMessage: 'Раздел летописи не найден' })
}

await navigateTo({
  path: `/lore/history/${era.slug}`,
  query: { chapter: chapter.slug },
}, { redirectCode: 301, replace: true })
</script>

<template><div /></template>
