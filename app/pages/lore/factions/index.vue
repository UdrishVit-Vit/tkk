<script setup>
useHead({
  title: 'Фракции Даскара · Lore',
  meta: [
    { name: 'description', content: 'Ордена, культы и синдикаты, определяющие силы Даскара.' },
  ],
})
</script>

<template>
  <HubPage initial-system="lore" initial-section="Фракции" :sync-query="false" />
</template>
