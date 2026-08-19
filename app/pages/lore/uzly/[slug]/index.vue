<script setup>
import { UZLY_THREAD, UZLY_CONTENT } from '~/data/loreUzly.js'

definePageMeta({ scrollToTop: false })

const route = useRoute()
const sectionIndex = computed(() => UZLY_THREAD.sections.findIndex(item => item.slug === route.params.slug))
const section = computed(() => UZLY_THREAD.sections[sectionIndex.value])
const content = computed(() => UZLY_CONTENT.categories.find(item => item.slug === route.params.slug))

if (!section.value || !content.value) {
  throw createError({ statusCode: 404, statusMessage: 'Узел не найден' })
}

useHead(() => ({
  title: `${section.value.title} · Узлы`,
  meta: [{ name: 'description', content: section.value.summary }],
}))
</script>

<template>
  <LoreUzlyEntryPage :section="section" :content="content" :index="sectionIndex" />
</template>
