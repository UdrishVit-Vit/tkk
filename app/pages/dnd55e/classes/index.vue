<script setup>
useHead({
  title: 'Классы — D&D 5.5e 2024 — TKK.club',
  meta: [{
    name: 'description',
    content: 'Карта классов D&D 5.5e редакции 2024 года и авторских классов мира Эноа.'
  }]
})
</script>

<template>
  <HubPage
    initial-system="2024"
    initial-section="Классы"
    class-route-base="/dnd55e/classes"
    :sync-query="false"
  />
</template>
