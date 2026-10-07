<script setup>
// Temporarily hidden; retain the page for later restoration.
definePageMeta({
  middleware: () => navigateTo('/lore', { replace: true, redirectCode: 302 }),
})

useHead({
  title: 'Растения Эноа · Lore',
  meta: [
    { name: 'description', content: 'Растения, травы и необычная флора мира Эноа.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="Растения" :sync-query="false" />
</template>
