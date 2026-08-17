<script setup>
useHead({
  title: 'Гильдии Эноа · Lore',
  meta: [
    { name: 'description', content: 'Торговые, ремесленные и военные гильдии мира Эноа.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="Гильдии" :sync-query="false" />
</template>
