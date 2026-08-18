<script setup>
import { FACTIONS_THREAD, FACTIONS_CONTENT } from '~/data/loreFactions.js'

definePageMeta({ scrollToTop: false })

const route = useRoute()
const sectionIndex = computed(() => FACTIONS_THREAD.sections.findIndex(item => item.slug === route.params.slug))
const section = computed(() => FACTIONS_THREAD.sections[sectionIndex.value])
const content = computed(() => FACTIONS_CONTENT.categories.find(item => item.slug === route.params.slug))

if (!section.value || !content.value) {
  throw createError({ statusCode: 404, statusMessage: 'Фракция не найдена' })
}

useHead(() => ({
  title: `${section.value.title} · Фракции`,
  meta: [{ name: 'description', content: section.value.summary }],
}))
</script>

<template>
  <LoreFactionsEntryPage :section="section" :content="content" :index="sectionIndex" />
</template>
