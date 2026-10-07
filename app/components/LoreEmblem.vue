<script setup>
import { computed, useId } from 'vue'

const props = defineProps({ src: { type: String, required: true } })
// Only bundled, locally authored emblems can provide inline markup.
const emblems = import.meta.glob('../../public/assets/nodes/tales/*.svg', {
  eager: true, query: '?raw', import: 'default',
})
const cordId = `lore-cord-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
const markup = computed(() => {
  const svg = emblems[`../../public${props.src}`]
  return svg?.replace('id="cord"', `id="${cordId}"`).replaceAll('url(#cord)', `url(#${cordId})`)
})
</script>

<template>
  <span class="lore-emblem" aria-hidden="true">
    <span v-if="markup" class="lore-emblem__weave" v-html="markup" />
    <img v-else :src="src" width="256" height="256" alt="" decoding="async">
  </span>
</template>

<style scoped>
.lore-emblem{display:grid;width:100%;height:100%;place-items:center;pointer-events:none}
.lore-emblem img,.lore-emblem__weave{display:block;width:100%;height:100%;object-fit:contain;animation:emblemGlow 6s ease-in-out infinite}
.lore-emblem__weave :deep(svg){display:block;width:100%;height:100%;overflow:visible}
.lore-emblem__weave :deep(.knot-thread>g:nth-child(2) path){stroke-dasharray:1;animation:knotGather 1.8s cubic-bezier(.22,.61,.36,1) both}
.lore-emblem__weave :deep(.knot-crossings){animation:knotWeave 1.8s ease both}
@keyframes knotGather{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes knotWeave{0%,65%{opacity:0}100%{opacity:1}}
@keyframes emblemGlow{0%,100%{opacity:.84;filter:drop-shadow(0 0 2px rgba(230,222,190,.08))}50%{opacity:1;filter:drop-shadow(0 0 6px rgba(230,222,190,.22))}}
@media(prefers-reduced-motion:reduce){.lore-emblem img,.lore-emblem__weave,.lore-emblem__weave :deep(.knot-thread path),.lore-emblem__weave :deep(.knot-crossings){animation:none}}
</style>
