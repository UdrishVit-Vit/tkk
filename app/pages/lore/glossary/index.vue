<script setup>
useHead({
  title: 'Глоссарий Эноа · Lore',
  meta: [
    { name: 'description', content: 'Справочник имён, мест, существ и понятий мира Эноа по Нити Башни Мафраш.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="Глоссарий" :sync-query="false" />
</template>
