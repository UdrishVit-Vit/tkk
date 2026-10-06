<script setup>
import { publicNamesForTable } from '~/data/publicRaceNames.js'

const props = defineProps({ table: { type: Object, required: true } })
const guide = computed(() => publicNamesForTable(props.table))
</script>

<template>
  <div v-if="guide" class="name-examples">
    <p class="name-formation">{{ guide.formation }}</p>
    <p v-if="guide.names"><strong>Примеры:</strong> {{ guide.names.join(', ') }}.</p>
    <template v-else>
      <p><strong>Мужские:</strong> {{ guide.m.join(', ') }}.</p>
      <p><strong>Женские:</strong> {{ guide.f.join(', ') }}.</p>
    </template>
  </div>
</template>

<style scoped>
.name-examples{font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.6;color:rgba(var(--theme-text-rgb),.88);margin-bottom:16px;overflow-wrap:anywhere}
.name-examples p{margin:0 0 6px}
.name-examples .name-formation{margin-bottom:10px}
.name-examples strong{font-weight:700;color:rgba(var(--theme-accent-strong-rgb),.95)}
</style>
