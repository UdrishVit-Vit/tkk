<script setup>
useHead({
  title: 'Пантеон Эноа · Lore',
  meta: [
    { name: 'description', content: 'Божества, культы и религиозные традиции мира Эноа.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="Пантеон" :sync-query="false" />
</template>
