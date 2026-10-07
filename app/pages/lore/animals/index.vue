<script setup>
// Temporarily hidden; retain the page for later restoration.
definePageMeta({
  middleware: () => navigateTo('/lore', { replace: true, redirectCode: 302 }),
})

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
