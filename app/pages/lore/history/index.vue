<script setup>
useHead({
  title: 'История Эноа · Lore',
  meta: [
    { name: 'description', content: 'Семь эпох истории Эноа, соединённые золотой нитью летописи.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="История" :sync-query="false" />
</template>
