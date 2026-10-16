<script setup>
import { guildBySlug } from '~/data/loreGuilds.js'
const route = useRoute()
const guild = computed(() => guildBySlug(String(route.params.slug || '')))
if (!guild.value) throw createError({ statusCode: 404, statusMessage: 'Гильдия не найдена' })
useHead(() => ({
  title: `${guild.value?.name || 'Гильдии'} · Гильдии Эноа`,
  meta: [{ name: 'description', content: guild.value?.summary || '' }],
}))
</script>

<template>
  <HubPage initial-system="lore" initial-section="Гильдии" :sync-query="false" />
</template>
