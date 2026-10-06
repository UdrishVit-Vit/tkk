<script setup>
import { NAME_GUIDES } from '~/data/nameLibrary.js'
const route = useRoute()
const slug = String(route.params.slug)
if (!NAME_GUIDES.some(guide => guide.slug === slug)) throw createError({ statusCode: 404, statusMessage: 'Разбор не найден' })
const { data: guide } = await useAsyncData(`name-guide-${slug}`, () => queryCollection('nameGuides').path(`/lore/names/${slug}`).first())
if (!guide.value) throw createError({ statusCode: 404, statusMessage: 'Разбор не найден' })
useHead(() => ({ title: `${guide.value.title} · Имена ЭНОА`, meta: [{ name: 'robots', content: 'noindex, nofollow' }] }))
</script>
<template><main class="name-article"><nav><NuxtLink to="/lore/names">← Имена ЭНОА</NuxtLink><a :href="`/name-library/${slug}.md`" download>Скачать текст</a></nav><ContentRenderer v-if="guide" :value="guide" /><footer><NuxtLink to="/lore/names">К именникам и генераторам →</NuxtLink></footer></main></template>
<style scoped>
.name-article{max-width:960px;margin:auto;padding:32px 24px 80px;color:rgba(var(--theme-text-rgb),.9);font:19px/1.7 'Cormorant Garamond',serif}.name-article nav{display:flex;justify-content:space-between;gap:16px;font:12px 'Hanken Grotesk',sans-serif;margin-bottom:48px}.name-article :deep(a){color:var(--theme-accent-strong)}.name-article :deep(h1){font-size:40px;line-height:1.2}.name-article :deep(h2){font-size:29px;margin-top:36px}.name-article :deep(h3){font-size:23px;margin-top:24px}.name-article :deep(table){display:block;overflow-x:auto;border-collapse:collapse;max-width:100%;font-size:16px;margin:24px 0}.name-article :deep(th),.name-article :deep(td){padding:10px;border:1px solid rgba(var(--theme-accent-rgb),.2);text-align:left;min-width:95px}.name-article :deep(pre){padding:16px;background:var(--theme-surface);overflow:auto;font-size:13px}.name-article :deep(blockquote){border-left:2px solid var(--theme-accent);padding-left:18px}.name-article :deep(ul),.name-article :deep(ol){padding-left:25px}.name-article footer{margin-top:48px}@media(max-width:640px){.name-article{padding:24px 16px 60px}.name-article :deep(h1){font-size:31px}}
</style>
