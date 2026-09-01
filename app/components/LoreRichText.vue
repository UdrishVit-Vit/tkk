<script setup>
import { tokenizeLoreText } from '~/utils/loreText.js'

const props = defineProps({
  text: { type: String, default: '' },
  // Статья, внутри которой идёт текст: сама на себя не ссылается.
  skipId: { type: String, default: '' },
  // Какие имена в этом куске делать ссылками. Пусто — все. В книге иначе
  // нельзя: имя героя встречается пятьсот раз, и подчёркнуто было бы каждое.
  allow: { type: Object, default: null },
})

// Термин не уводит из статьи сразу: сначала всплывающая карточка, и только
// с неё — переход. Читатель, встретивший незнакомое слово, чаще хочет
// вспомнить, что это, и вернуться к чтению.
const emit = defineEmits(['preview'])

const tokens = computed(() => {
  const parsed = tokenizeLoreText(props.text, props.skipId)
  if (!props.allow) return parsed
  return parsed.map(token => (token.type !== 'term' || token.ids.some(id => props.allow.has(id))
    ? token
    : { type: 'text', text: token.text }))
})

// На устройствах с указателем карточка появляется и при наведении — но с
// задержкой, иначе она выскакивает от случайного движения по строке.
const HOVER_DELAY = 380
let hoverTimer = null
let canHover = false

onMounted(() => {
  canHover = window.matchMedia('(hover: hover)').matches
})
onBeforeUnmount(() => window.clearTimeout(hoverTimer))

function show(event, ids) {
  window.clearTimeout(hoverTimer)
  emit('preview', { ids, rect: event.currentTarget.getBoundingClientRect() })
}

function onEnter(event, ids) {
  if (!canHover) return
  const target = event.currentTarget
  window.clearTimeout(hoverTimer)
  hoverTimer = window.setTimeout(() => {
    emit('preview', { ids, rect: target.getBoundingClientRect() })
  }, HOVER_DELAY)
}

function onLeave() {
  window.clearTimeout(hoverTimer)
}
</script>

<template>
  <span class="lore-rich"><template v-for="(token, index) in tokens" :key="index"><button
    v-if="token.type === 'term'"
    type="button"
    class="lore-term"
    :title="`${token.title} — показать карточку`"
    @click="show($event, token.ids)"
    @mouseenter="onEnter($event, token.ids)"
    @mouseleave="onLeave"
    @focus="show($event, token.ids)"
  >{{ token.text }}</button><template v-else>{{ token.text }}</template></template></span>
</template>

<style scoped>
.lore-rich{display:inline}
.lore-term{border:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.38);background:none;padding:0;color:inherit;font:inherit;cursor:pointer;transition:color .16s,border-color .16s}
.lore-term:hover,.lore-term:focus-visible{border-bottom-color:var(--gold-bright);color:var(--gold-bright);outline:0}
</style>
