<script setup>
import { computed } from 'vue'
const props=defineProps({kind:{type:String,default:'about'}})
const patterns={
  // A folded archive ribbon: a single inward journey and its returning thread.
  about:['M128 56 184 112 128 168 88 128 128 88 152 112 128 136 120 128 128 120','M128 200 72 144 128 88 168 128 128 168 104 144 128 120'],
  // A gathering knot: four pairs of hooked strands hold a shared open centre.
  members:['M104 56H128V88H152V104H200V128H168V152H152V200H128V168H104V152H56V128H88V104H104Z','M152 56H128V88H104V104H56V128H88V152H104V200H128V168H152V152H200V128H168V104H152Z','M112 112H144V144H112Z'],
  // News carried outward: a rising woven trail, with three distinct folds.
  news:['M80 176 112 144 88 120 112 96 136 120 160 96 136 72 152 56','M104 200 136 168 112 144 136 120 160 144 184 120 160 96 176 80','M64 152 88 176 112 152M144 80 168 104 192 80'],
}
const ribbons=computed(()=>patterns[props.kind]||patterns.about)
</script>
<template>
  <svg class="lore-section-seal" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M128 9 247 128 128 247 9 128Z" fill="var(--theme-surface,#090a10)" stroke="currentColor" stroke-width="2.5"/>
    <path d="M128 24 232 128 128 232 24 128Z" stroke="currentColor" stroke-width="1" opacity=".38"/>
    <path d="m107 30 21-21 21 21m77 77 21 21-21 21m-77 77-21 21-21-21m-77-77L9 128l21-21" stroke="var(--theme-accent-strong)" stroke-width="3" opacity=".8"/>
    <g stroke-linejoin="miter">
      <g v-for="(ribbon,index) in ribbons" :key="index"><path :d="ribbon" stroke="var(--theme-surface,#090a10)" stroke-width="16"/><path :d="ribbon" stroke="var(--theme-accent-strong)" stroke-width="7"/><path :d="ribbon" stroke="#fff9e6" stroke-width="1" opacity=".6"/></g>
    </g>
  </svg>
</template>
<style scoped>
.lore-section-seal{display:block;width:100%;height:100%;overflow:visible}
</style>
