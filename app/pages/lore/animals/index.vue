<script setup>
useHead({
  title: 'Животные Эноа · Lore',
  meta: [
    { name: 'description', content: 'Животные, домашние виды и дикая фауна мира Эноа.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="Животные" :sync-query="false" />
</template>
