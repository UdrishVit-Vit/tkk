<script setup>
defineProps({ id: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M50 4 91 27v46L50 96 9 73V27Z" stroke="currentColor" stroke-opacity=".28" />
    <path d="M50 11 84 31v38L50 89 16 69V31Z" stroke="currentColor" stroke-opacity=".18" stroke-dasharray="2 4" />
    <g v-if="id === 'daskar'" stroke="currentColor" stroke-linejoin="round">
      <path d="m18 68 17-31 10 16 12-29 25 44H18Z" stroke-width="2" />
      <path d="m29 48 6-11 10 16 12-29 10 18M39 68l11-17 11 17M20 75h60" stroke-opacity=".52" />
      <path d="M50 13v9m-5-4h10" stroke-opacity=".6" />
    </g>
    <g v-else-if="id === 'var-elor'" stroke="currentColor" stroke-linecap="round">
      <path d="M64 18c-17 7-25 21-22 37 2 13 12 22 25 26-21 4-41-9-46-29-5-19 7-37 28-42 6-1 11-1 15 0Z" stroke-width="2" />
      <path d="M34 55c12-15 27-16 43-2-11 15-26 20-43 2Z" stroke-width="1.5" />
      <path d="M56 52v6m-3-3h6M71 24l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" stroke-opacity=".7" />
    </g>
    <g v-else stroke="currentColor" stroke-linejoin="round">
      <path d="m50 15 23 35-23 36-23-36 23-35Z" stroke-width="2" />
      <path d="M50 15v71M27 50h46M35 35l30 30M65 35 35 65" stroke-opacity=".65" />
      <path d="m50 6 4 6-4 6-4-6 4-6Zm-34 44 7-4 7 4-7 4-7-4Zm68 0-7-4-7 4 7 4 7-4Z" stroke-opacity=".6" />
    </g>
  </svg>
</template>

<style scoped>
svg{display:block;width:100%;height:100%;filter:drop-shadow(0 0 10px currentColor)}
</style>
