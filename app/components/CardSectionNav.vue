<script setup>
const props = defineProps({ sections: { type: Array, required: true }, prefix: { type: String, required: true } })
const nav = ref(null)
const active = ref(props.sections[0]?.id)
let frame = 0
function update() {
  frame = 0
  if (!nav.value) return
  const edge = nav.value.getBoundingClientRect().bottom + 25
  let current = props.sections[0]?.id
  for (const section of props.sections) {
    const target = document.getElementById(`${props.prefix}-${section.id}`)
    if (target && target.getBoundingClientRect().top <= edge) current = section.id
  }
  active.value = current
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(update)
}
function jump(id) {
  const target = document.getElementById(`${props.prefix}-${id}`)
  if (!target) return
  target.style.scrollMarginTop = `${nav.value.offsetHeight + 24}px`
  target.scrollIntoView({ block: 'start', behavior: 'instant' })
  target.focus({ preventScroll: true })
  active.value = id
}
onMounted(() => {
  window.addEventListener('scroll', schedule, true)
  window.addEventListener('resize', schedule)
  update()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule, true)
  window.removeEventListener('resize', schedule)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <nav ref="nav" class="card-section-nav" aria-label="Разделы карточки">
    <a v-for="section in sections" :key="section.id" :href="`#${prefix}-${section.id}`"
      :aria-current="active === section.id ? 'location' : undefined" @click.prevent="jump(section.id)">{{ section.label }}</a>
  </nav>
</template>

<style scoped>
.card-section-nav{position:sticky;top:0;z-index:2;display:flex;flex-wrap:wrap;gap:0 20px;padding:0;margin:0 0 24px;background:var(--theme-surface);border-bottom:1px solid rgba(var(--theme-text-rgb),.12)}
.card-section-nav a{padding:12px 0;border-radius:0;color:rgba(var(--theme-text-rgb),.6);font-size:12px;font-weight:500;text-decoration:none}
.card-section-nav a:hover,.card-section-nav a[aria-current]{color:rgba(var(--theme-accent-strong-rgb),1)}
.card-section-nav a[aria-current]{box-shadow:inset 0 -2px rgba(var(--theme-accent-strong-rgb),.8)}
.card-section-nav a:focus-visible{outline:2px solid rgba(var(--theme-accent-strong-rgb),1);outline-offset:2px}
@media print{.card-section-nav{display:none}}
</style>
