<script setup>
import { PANTHEON_THREAD, PANTHEON_CONTENT } from '~/data/lorePantheon.js'

definePageMeta({ scrollToTop: false })

const route = useRoute()
const sectionIndex = computed(() => PANTHEON_THREAD.sections.findIndex(item => item.slug === route.params.slug))
const section = computed(() => PANTHEON_THREAD.sections[sectionIndex.value])
const content = computed(() => PANTHEON_CONTENT.categories.find(item => item.slug === route.params.slug))

if (!section.value || !content.value) {
  throw createError({ statusCode: 404, statusMessage: 'Раздел пантеона не найден' })
}

useHead(() => ({
  title: `${section.value.title} · Пантеон`,
  meta: [{ name: 'description', content: section.value.summary }],
}))
</script>

<template>
  <LorePantheonEntryPage :section="section" :content="content" :index="sectionIndex" />
</template>
