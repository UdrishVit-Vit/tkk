<script setup>
defineProps({ event: { type: String, required: true } })
</script>

<template>
  <svg :class="['calendar-event-icon', event]" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <template v-if="event === 'shamas'"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></template>
    <path v-else-if="event === 'manu'" d="M19 15.7A8.5 8.5 0 0 1 8.3 5a8.5 8.5 0 1 0 10.7 10.7Z"/>
    <template v-else-if="event === 'hunt'"><path d="M5 4c14 1 14 15 15 15L5 4 4 20 20 19M3 21 20 4m-5 0h5v5"/></template>
    <path v-else-if="event === 'eri'" d="M12 3C10 7 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12Z"/>
    <template v-else-if="event === 'silence'"><circle cx="12" cy="12" r="8"/><path d="M10 5v14m4-14v14"/></template>
    <template v-else-if="event === 'darkness'"><rect x="4" y="4" width="16" height="16"/><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/></template>
    <rect v-else-if="event === 'eaten'" x="6" y="6" width="12" height="12" fill="currentColor" stroke="none"/>
    <path v-else-if="event === 'absent'" d="M6 12h12"/>
  </svg>
</template>

<style scoped>
.calendar-event-icon{display:inline-block;flex:none;width:18px;height:18px;vertical-align:-3px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.shamas{color:#f0c461}.manu{color:#a2cafa}.eri{color:#ff8795}.silence{color:#e0ba81}.darkness,.eaten{color:var(--theme-accent-strong)}
</style>
