<script setup>
useHead({
  title: 'Pathfinder 2e — TKK.club',
  meta: [{
    name: 'description',
    content: 'Пространство Pathfinder Second Edition в мире Эноа: наследия, классы, архетипы, предыстории, снаряжение и заклинания.'
  }]
})
</script>

<template>
  <HubPage initial-system="pf" :sync-query="false" />
</template>
