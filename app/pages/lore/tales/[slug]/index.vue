<script setup>
import { TALES_THREAD, TALES_CONTENT } from '~/data/loreTales.js'

definePageMeta({ scrollToTop: false })

const route = useRoute()
const sectionIndex = computed(() => TALES_THREAD.sections.findIndex(item => item.slug === route.params.slug))
const section = computed(() => TALES_THREAD.sections[sectionIndex.value])
const content = computed(() => TALES_CONTENT.categories.find(item => item.slug === route.params.slug))

if (!section.value || !content.value) {
  throw createError({ statusCode: 404, statusMessage: 'Сказание не найдено' })
}

useHead(() => ({
  title: `${section.value.title} · Сказания`,
  meta: [{ name: 'description', content: section.value.summary }],
}))
</script>

<template>
  <LoreTalesEntryPage :section="section" :content="content" :index="sectionIndex" />
</template>
