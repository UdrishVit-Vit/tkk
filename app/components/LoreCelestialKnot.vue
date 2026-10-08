<script setup>
const props = defineProps({ id: { type: String, required: true } })
// Continuous ribbons share a woven core; their outer loops identify each body.
const motifs = {
  'dalnie-chertogi': ['M0-35 35 0 0 35-35 0Z', 'M-24-11-11-24M11-24 24-11M24 11 11 24M-11 24-24 11', 'M0-27 9-18 0-9-9-18Z M27 0 18 9 9 0 18-9Z M0 27-9 18 0 9 9 18Z M-27 0-18-9-9 0-18 9Z'],
  shamas: ['M0-34 12-22 0-10-12-22Z M34 0 22 12 10 0 22-12Z M0 34-12 22 0 10 12 22Z M-34 0-22-12-10 0-22 12Z'],
  ula: ['M0-35C18-28 28-18 35 0 28 18 18 28 0 35-18 28-28 18-35 0-28-18-18-28 0-35Z', 'M0-35 0-24M35 0H24M0 35V24M-35 0H-24'],
  azrak: ['M0-37 8-24 0-11-8-24Z M37 0 24 8 11 0 24-8Z M0 37-8 24 0 11 8 24Z M-37 0-24-8-11 0-24 8Z', 'M-25-25-17-17M25-25 17-17M25 25 17 17M-25 25-17 17'],
  eri: ['M0-34 34 0 0 34-34 0Z', 'M-29 0-20-9-11 0-20 9Z M29 0 20 9 11 0 20-9Z'],
  dayya: ['M0-35 28-7 16 5 0-11-16 5-28-7Z', 'M-28 9 0 37 28 9 16-3 0 13-16-3Z'],
  enoa: ['M0-35 35 0 0 35-35 0Z', 'M0-35V-26M35 0H26M0 35V26M-35 0H-26'],
  'ish-kashim': ['M-8-34 15-11-8 12-31-11Z M8-12 31 11 8 34-15 11Z'],
  sanctuary: ['M0-35 35 0 0 35-35 0Z', 'M0-27 27 0 0 27-27 0Z', 'M0-35 9-26 0-17-9-26Z M35 0 26 9 17 0 26-9Z M0 35-9 26 0 17 9 26Z M-35 0-26-9-17 0-26 9Z'],
  tingir: ['M0-35 17-18 7-8 18 3 28-7 35 0 18 17 8 7-3 18 7 28 0 35-17 18-7 8-18-3-28 7-35 0-18-17-8-7 3-18-7-28Z'],
  cradle: ['M0-35 35 0 0 35-35 0Z', 'M-12-23 12-23 23-12 23 12 12 23-12 23-23 12-23-12Z', 'M0-35 12-23 0-11-12-23Z M35 0 23 12 11 0 23-12Z M0 35-12 23 0 11 12 23Z M-35 0-23-12-11 0-23 12Z'],
  spark: ['M0-36 10-10 36 0 10 10 0 36-10 10-36 0-10-10Z']
}
// Designs are drawn in a square and rotated into the enclosing diamond.
// All ribbons, including their underpass clearance, fit inside the 44-unit frame.
const fittedKnots = {
  labyrinth: {
    paths: ['M-23-23H23V23H-23V-15H15V15H-15V-7H7V7H-7', 'M-23-7V23H-7V15M23 7V-23H7V-15'],
    bridges: ['M-23 2V12', 'M23-12V-2']
  },
  manu: {
    paths: ['M-21-21H3V-9H-9V9H3V21H-21Z', 'M-9-9H21V21H9V3H-9Z', 'M3-21H21V-3H9V-9H3Z'],
    bridges: ['M-9-14V-4', 'M-14 9H-4']
  },
  daskar: {
    paths: ['M-21-21H3V3H-21Z', 'M-3-3H21V21H-3Z', 'M-21 9H9V-21H21V-9H-9V21H-21Z'],
    bridges: ['M-3 4V14', 'M4-9H14', 'M-14 3H-4']
  },
  'var-elor': {
    paths: ['M-21-21H9V-9H-9V9H-21Z', 'M-9-9H21V21H-9V9H9V3H-9Z', 'M-21 9H-3V21H-21Z'],
    bridges: ['M4-9H14', 'M-9 4V14']
  },
  azar: {
    paths: ['M-21-21H-3V-3H-21Z M3 3H21V21H3Z', 'M3-21H21V-3H3Z M-21 3H-3V21H-21Z', 'M-9-9H9V9H-9Z', 'M-15-3H3V15H-3V-3H15V3H-15Z'],
    bridges: ['M-9-8V2', 'M9-2V8', 'M-8 9H2', 'M-2-9H8']
  }
}
const fittedKnot = computed(() => fittedKnots[props.id])
const loops = computed(() => motifs[props.id] || motifs.enoa)
const coreScale = computed(() => ['daskar', 'ish-kashim', 'manu'].includes(props.id) ? .65 : .8)
const weave = ['M-18-6H6V18H18V6H-6V-18H-18Z', 'M-6-18H18V-6H-18V18H6V-18Z']
</script>

<template>
  <g class="celestial-knot" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <g v-for="(path,index) in (fittedKnot ? [] : loops)" :key="index">
      <path :d="path" stroke="#08090f" stroke-width="7.4"/>
      <path :d="path" stroke="currentColor" stroke-width="3.6"/>
      <path :d="path" stroke="#fff4d8" stroke-opacity=".45" stroke-width=".6"/>
    </g>
    <g v-if="!fittedKnot" :transform="`rotate(45) scale(${coreScale})`">
      <g v-for="(path,index) in weave" :key="index">
        <path :d="path" stroke="#08090f" stroke-width="8.5"/>
        <path :d="path" stroke="currentColor" stroke-width="4.5"/>
        <path :d="path" stroke="#fff4d8" stroke-opacity=".5" stroke-width=".8"/>
      </g>
      <!-- Alternate overpasses keep the crossing ribbons visibly interlaced. -->
      <g v-for="x in [-6,6]" :key="x">
        <path :d="`M${x} -11V-1`" stroke="#08090f" stroke-width="8.5"/>
        <path :d="`M${x} -11V-1`" stroke="currentColor" stroke-width="4.5"/>
        <path :d="`M${x} -11V-1`" stroke="#fff4d8" stroke-opacity=".5" stroke-width=".8"/>
      </g>
    </g>
    <g v-else transform="rotate(45)">
      <g v-for="(path,index) in [...fittedKnot.paths,...fittedKnot.bridges]" :key="index">
        <path :d="path" stroke="#08090f" stroke-width="7"/>
        <path :d="path" stroke="currentColor" stroke-width="3.5"/>
        <path :d="path" stroke="#fff4d8" stroke-opacity=".5" stroke-width=".65"/>
      </g>
    </g>
  </g>
</template>
