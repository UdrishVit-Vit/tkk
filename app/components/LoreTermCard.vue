<script setup>
// Всплывающая карточка термина — средняя ступень между словом в тексте и
// полной статьёй. Читатель встретил «Нарекателей», хочет вспомнить, кто это,
// и вернуться к чтению, а не уходить в статью на десять тысяч знаков.
//
// Одно имя может вести в несколько статей: народ вету и земли Вету зовутся
// одинаково. В таком случае карточка не выбирает за читателя, а спрашивает.

const props = defineProps({
  terms: { type: Array, default: () => [] },
  anchor: { type: Object, default: null },
  typeTitles: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['open', 'close'])

const CARD_WIDTH = 320
const GAP = 10
const EDGE = 12
// До первой отрисовки высота неизвестна; берём типичную, а после измерения
// позиция пересчитывается сама.
const ASSUMED_HEIGHT = 230

const card = ref(null)
const cardHeight = ref(ASSUMED_HEIGHT)

const single = computed(() => (props.terms.length === 1 ? props.terms[0] : null))
const typeTitle = term => props.typeTitles[term?.type]?.title || ''

watch(() => [props.terms.map(term => term.id).join(), props.anchor], async () => {
  if (!props.terms.length) return
  await nextTick()
  const height = card.value?.offsetHeight
  if (height) cardHeight.value = height
}, { immediate: true })

// Карточка встаёт под словом; если внизу не помещается — над ним. По горизонтали
// прижимается к краям экрана, чтобы не уезжать за пределы окна на телефоне.
const position = computed(() => {
  const rect = props.anchor
  if (!rect) return { top: '0px', left: '0px', width: `${CARD_WIDTH}px` }

  const viewportWidth = typeof window === 'undefined' ? CARD_WIDTH + EDGE * 2 : window.innerWidth
  const viewportHeight = typeof window === 'undefined' ? 800 : window.innerHeight
  const width = Math.min(CARD_WIDTH, viewportWidth - EDGE * 2)

  const left = Math.min(
    Math.max(EDGE, rect.left + rect.width / 2 - width / 2),
    viewportWidth - width - EDGE,
  )
  const below = rect.bottom + GAP
  const height = cardHeight.value
  const roomBelow = viewportHeight - below - EDGE
  // Разворачиваем вверх, только если сверху места действительно больше.
  const flip = roomBelow < height && rect.top - GAP - EDGE > roomBelow

  if (flip) {
    return {
      width: `${width}px`,
      left: `${Math.round(left)}px`,
      bottom: `${Math.round(Math.min(viewportHeight - EDGE, viewportHeight - rect.top + GAP))}px`,
      top: 'auto',
    }
  }

  // Слово может оказаться за пределами экрана — например, если карточку открыли
  // с клавиатуры. Карточку в таком случае всё равно держим в поле зрения.
  const top = Math.min(Math.max(EDGE, below), Math.max(EDGE, viewportHeight - height - EDGE))
  return {
    width: `${width}px`,
    left: `${Math.round(left)}px`,
    top: `${Math.round(top)}px`,
    bottom: 'auto',
  }
})

function shortSummary(text) {
  const value = String(text || '')
  if (value.length <= 210) return value
  const cut = value.slice(0, 210)
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '))
  return stop > 120 ? cut.slice(0, stop + 1) : `${cut.trim()}…`
}
</script>

<template>
  <div
    v-if="terms.length"
    ref="card"
    class="term-card"
    :style="position"
    role="dialog"
    :aria-label="single ? single.term : 'Выбор статьи'"
  >
    <header>
      <span>{{ single ? typeTitle(single) : 'Одно имя, разные статьи' }}</span>
      <button type="button" title="Закрыть" aria-label="Закрыть карточку" @click="emit('close')">✕</button>
    </header>

    <template v-if="single">
      <b>{{ single.term }}</b>
      <p>{{ shortSummary(single.definition) }}</p>
      <button class="term-card-more" type="button" @click="emit('open', single.id)">
        Подробнее <i>→</i>
      </button>
    </template>

    <ul v-else class="term-card-choice">
      <li v-for="term in terms" :key="term.id">
        <button type="button" @click="emit('open', term.id)">
          <span>{{ typeTitle(term) }}</span>
          <b>{{ term.term }}</b>
          <em>{{ shortSummary(term.definition).slice(0, 90) }}</em>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.term-card{position:fixed;z-index:220;max-height:calc(100vh - 24px);overflow-y:auto;border:1px solid rgba(var(--theme-accent-rgb),.32);background:linear-gradient(155deg,rgba(20,21,30,.985),rgba(6,7,11,.99));padding:13px 15px 12px;box-shadow:0 22px 46px rgba(0,0,0,.62),0 0 0 1px rgba(var(--theme-contrast-rgb),.03);backdrop-filter:blur(14px)}
.term-card header{display:flex;align-items:center;justify-content:space-between;gap:10px}
.term-card header span{font:600 10px/1.2 'Hanken Grotesk',sans-serif;letter-spacing:.17em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}
.term-card header button{border:0;background:none;padding:0 0 0 6px;color:rgba(var(--theme-text-rgb),.34);font-size:12px;line-height:1;cursor:pointer}
.term-card header button:hover{color:var(--gold-bright)}
.term-card b{display:block;margin:9px 0 7px;font:600 22px/1.15 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.92)}
.term-card p{margin:0;color:rgba(var(--theme-text-rgb),.72);font:400 16px/1.5 'Cormorant Garamond',serif}
.term-card-more{display:inline-flex;align-items:center;gap:7px;margin-top:12px;border:1px solid rgba(var(--theme-accent-rgb),.24);background:none;padding:7px 11px;color:rgba(var(--theme-accent-strong-rgb),.78);font:600 10px/1 'Hanken Grotesk',sans-serif;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;transition:border-color .18s,color .18s}
.term-card-more:hover{border-color:var(--gold-bright);color:var(--gold-bright)}
.term-card-more i{font-style:normal}
.term-card-choice{margin:10px 0 0;padding:0;list-style:none;display:grid;gap:7px}
.term-card-choice button{display:block;width:100%;border:1px solid rgba(var(--theme-accent-rgb),.16);background:rgba(var(--theme-surface-rgb),.24);padding:9px 11px;text-align:left;cursor:pointer;transition:border-color .18s}
.term-card-choice button:hover{border-color:var(--gold-bright)}
.term-card-choice span{display:block;font:600 10px/1.2 'Hanken Grotesk',sans-serif;letter-spacing:.15em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}
.term-card-choice b{margin:5px 0 4px;font-size:19px}
.term-card-choice em{display:block;color:rgba(var(--theme-text-rgb),.55);font:italic 14px/1.4 'Cormorant Garamond',serif}
@media(prefers-reduced-motion:no-preference){
  .term-card{animation:termCardIn .16s ease-out}
  @keyframes termCardIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
}
</style>
