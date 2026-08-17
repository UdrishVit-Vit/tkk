<script setup>
useHead({
  title: 'Сказания Эноа · Lore',
  meta: [
    { name: 'description', content: 'Мифы, легенды и сказания народов мира Эноа.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="Сказания" :sync-query="false" />
</template>
