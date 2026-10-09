<script setup>
import { boundaryAnimation } from '~/utils/loreBoundaryAnimations.js'

const props = defineProps({
  id: { type:String, required:true },
  color: { type:String, required:true },
  active: Boolean,
  changed: Boolean,
  pulse: { type:Number, default:0 },
})
const visual = ref(null)
let running = []
let tracer = null
function stop() {
  running.forEach(animation=>animation.cancel())
  running = []
  if(tracer) tracer.style.removeProperty('stroke-dasharray')
  tracer = null
}
function play() {
  stop()
  const element = visual.value
  if(!props.active || !props.pulse || !element?.animate) return
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const effect = boundaryAnimation(props.id,props.color)
  running.push(element.animate(effect.frames,{duration:effect.duration,easing:effect.easing}))
  if(props.id === 'labyrinth') {
    tracer = element.querySelector('.labyrinth-boundary')
    if(tracer) {
      tracer.style.strokeDasharray = '14 5'
      running.push(tracer.animate([{strokeDashoffset:'76'},{strokeDashoffset:'0'}],{duration:effect.duration,easing:'linear'}))
    }
  }
}
watch(()=>[props.active,props.pulse],play,{flush:'post'})
onBeforeUnmount(stop)
</script>

<template>
  <g ref="visual" class="boundary-visual" :class="{'boundary-is-active':active,'boundary-has-changed':changed}" :data-animation-node="id" :style="{color,filter:active ? `drop-shadow(0 0 8px ${color})` : 'none'}">
    <slot/>
  </g>
</template>

<style scoped>
.boundary-visual{transform-box:view-box;transform-origin:0 0}
.boundary-is-active :deep(.hidden-sun__surface){stroke-opacity:1;stroke-width:2}
.boundary-has-changed :deep(.hidden-sun__surface),.boundary-has-changed :deep(.mandala-node__outer){stroke-dasharray:4 3;animation:boundary-arrival 1.4s ease-out}
.boundary-is-active :deep(.hidden-sun__surface),.boundary-is-active :deep(.mandala-node__outer){stroke-dasharray:none}
@keyframes boundary-arrival{0%,60%{stroke-opacity:1;stroke-width:2.7}100%{stroke-width:1.5}}
@media(prefers-reduced-motion:reduce){.boundary-has-changed :deep(path){animation:none}}
</style>
