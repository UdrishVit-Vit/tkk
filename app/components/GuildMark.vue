<script setup>
import { computed } from 'vue'
const props = defineProps({ kind: { type: String, default: 'stone' } })
const box = (x,y,w,h) => [[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]]
// Emblem concepts, not additional lore: three linked vows, a stable weave,
// four travelling strands, folded silk, a sealed centre, a hidden passage,
// paired currents, a running braid, a tightened grip, an off-centre clasp,
// an unbroken circuit, linked exchanges, paired shoulders, a crossing, a route.
const patterns = {
  apple: [box(62,62,72,72),box(122,62,72,72),box(92,122,72,72)],
  stone: [box(62,86,132,84),box(86,62,84,132),box(110,62,36,132)],
  cup: [box(56,80,96,48),box(104,128,96,48),box(80,104,48,96),box(128,56,48,96)],
  hat: [[[56,80],[104,80],[104,56],[176,56],[176,104],[200,104],[200,176],[152,176],[152,200],[80,200],[80,152],[56,152],[56,80]],box(80,104,96,48)],
  shield: [box(62,62,132,132),box(86,110,84,36),box(110,86,36,84)],
  'blind-eye': [[[62,62],[146,62],[146,110],[110,110],[110,194],[62,194],[62,146],[194,146],[194,98],[170,98],[170,170],[86,170],[86,86],[62,86],[62,62]]],
  spears: [box(62,86,132,36),box(62,134,132,36),box(86,62,36,132),box(134,62,36,132)],
  hyena: [[[56,80],[104,80],[104,104],[152,104],[152,128],[200,128],[200,176],[152,176],[152,152],[104,152],[104,128],[56,128],[56,80]],[[80,56],[128,56],[128,104],[152,104],[152,152],[176,152],[176,200],[128,200],[128,152],[104,152],[104,104],[80,104],[80,56]]],
  fist: [[[62,62],[194,62],[194,194],[62,194],[62,110],[146,110],[146,146],[110,146],[110,170],[170,170],[170,86],[86,86],[86,62],[62,62]],box(86,134,84,36)],
  earring: [box(62,62,108,132),box(110,86,84,84),box(86,110,36,36)],
  ring: [box(56,80,144,96),box(80,56,96,144)],
  coins: [box(56,56,84,84),box(116,116,84,84),box(92,92,72,72)],
  buffalo: [[[56,56],[104,56],[104,104],[152,104],[152,56],[200,56],[200,152],[176,152],[176,200],[128,200],[128,152],[80,152],[80,104],[56,104],[56,56]],box(80,128,96,48)],
  pickaxe: [box(56,104,144,48),box(104,56,48,144),box(80,80,96,96)],
  compass: [[[56,56],[152,56],[152,80],[80,80],[80,176],[176,176],[176,104],[200,104],[200,200],[56,200],[56,56]],[[104,56],[104,128],[56,128],[56,152],[152,152],[152,200],[176,200],[176,104],[128,104],[128,56],[104,56]]],
}
const strands = computed(() => patterns[props.kind] || patterns.stone)
const path = points => points.map(([x,y],i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
// Explicit alternating over/under bridges, including self-crossings.
const bridges = computed(() => {
  const segments = strands.value.flatMap(points => points.slice(1).map((p,i) => ({a:points[i],b:p})))
  const result = new Map()
  for (const h of segments.filter(s => s.a[1] === s.b[1])) {
    for (const v of segments.filter(s => s.a[0] === s.b[0])) {
      const x=v.a[0], y=h.a[1]
      if (x<=Math.min(h.a[0],h.b[0]) || x>=Math.max(h.a[0],h.b[0]) || y<=Math.min(v.a[1],v.b[1]) || y>=Math.max(v.a[1],v.b[1])) continue
      const horizontal = (Math.round((x-56)/24)+Math.round((y-56)/24))%2 === 0
      result.set(`${x},${y}`, horizontal ? `M${x-9} ${y}h18` : `M${x} ${y-9}v18`)
    }
  }
  return [...result.values()]
})
</script>

<template>
  <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="guild-mark">
    <g transform="rotate(45 128 128)" stroke-linejoin="miter" stroke-linecap="butt">
      <g v-for="(points,i) in strands" :key="i">
        <path :d="path(points)" stroke="currentColor" stroke-width="8"/>
        <path :d="path(points)" stroke="#fff9e6" stroke-width="1.5" opacity=".65"/>
      </g>
      <g v-for="(bridge,i) in bridges" :key="`cross-${i}`">
        <path :d="bridge" stroke="var(--theme-surface,#090a10)" stroke-width="15"/>
        <path :d="bridge" stroke="currentColor" stroke-width="8"/>
        <path :d="bridge" stroke="#fff9e6" stroke-width="1.5" opacity=".65"/>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.guild-mark{width:100%;height:100%;display:block;overflow:visible}
</style>
