<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg class="tkk-ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path v-if="name === 'home'" d="m3 11 9-8 9 8M5.5 9v11h5v-6h3v6h5V9" />
    <template v-else-if="name === 'search'">
      <circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 4.5 4.5" />
    </template>
    <path v-else-if="name === 'filter'" d="M4 5h16l-6 7v6l-4 2v-8z" />
    <path v-else-if="name === 'back'" d="M19 12H5m6-6-6 6 6 6" />
    <path v-else-if="name === 'next'" d="m9 5 7 7-7 7" />
    <path v-else-if="name === 'bookmark'" d="M6 3.5h12v17l-6-4.2-6 4.2z" />
    <path v-else-if="name === 'systems'" d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5" />
    <path v-else-if="name === 'more'" d="M5 12h.1m6.9 0h.1m6.9 0h.1" stroke-width="2.6" />
  </svg>
</template>
