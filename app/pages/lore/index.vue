<script setup>
useHead({
  title: 'Lore — мир Эноа · TKK.club',
  meta: [{
    name: 'description',
    content: 'Самостоятельный раздел истории, географии, фракций и понятий мира Эноа.',
  }],
})
</script>

<template>
  <HubPage initial-system="lore" :sync-query="false" />
</template>
