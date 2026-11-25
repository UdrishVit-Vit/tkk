<script setup>
defineProps({
  items: { type: Array, required: true },
  current: { type: String, required: true },
})
</script>

<template>
  <nav class="ds-crumb" aria-label="Путь к странице">
    <ol>
      <li v-for="item in items" :key="item.to">
        <NuxtLink :to="item.to" class="ds-control">{{ item.label }}</NuxtLink>
        <span aria-hidden="true">/</span>
      </li>
      <li aria-current="page">{{ current }}</li>
    </ol>
  </nav>
</template>
