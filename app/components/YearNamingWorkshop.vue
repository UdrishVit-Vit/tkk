<script setup>
import { yearThread } from '~/data/yearThreads.js'
import { yearReading, YEAR_NARRATORS as narrators } from '~/data/yearStories.js'
const narrator = ref('shaman')
const props = defineProps({ year: { type: Number, required: true }, era: { type: String, required: true }, yearName: { type: String, default: '' } })
const reading = computed(() => yearThread(props.year, props.yearName))
const story = computed(() => yearReading(reading.value, narrator.value))
const displayName = computed(() => props.yearName || reading.value?.name || 'Год без имени')
</script>

<template>
  <section class="lore-thread-section year-threads" aria-labelledby="year-threads-title">
    <p class="eyebrow">Поверья Эноа</p>
    <h2 id="year-threads-title">Нити о годах</h2>
    <div class="year-reading" :class="'voice-' + narrator">
      <p class="reading-date">{{ era }} · год {{ year }}</p>
      <h3 aria-live="polite" aria-atomic="true">{{ displayName }}</h3>
      <template v-if="story">
        <div class="narrator-choice" role="group" aria-label="Кто рассказывает о годе">
          <button v-for="voice in narrators" :key="voice.id" type="button" :aria-pressed="narrator === voice.id" @click="narrator = voice.id"><svg class="voice-sign" viewBox="0 0 24 24" aria-hidden="true"><template v-if="voice.id==='shaman'"><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M5 19l3-3m8-8 3-3"/><path d="m12 6 6 6-6 6-6-6Z"/></template><template v-else-if="voice.id==='magus'"><path d="m5 4 14 16M19 4 5 20M5 4h14M5 20h14"/><path d="m12 8 4 4-4 4-4-4Z"/></template><template v-else><path d="M4 19h16M7 19v-8a5 5 0 0 1 10 0v8M7 13h10M12 6V3"/><circle cx="12" cy="16" r="1"/></template></svg>{{ voice.label }}</button>
        </div>
        <article class="year-story" :aria-label="'Предсказание: ' + narrators.find(voice => voice.id === narrator).label">
          <h4>{{ story.title }}</h4>
          <p class="story-forecast">{{ story.forecast }}</p>
          <p class="story-omen">{{ story.omen }}</p>
        </article>
      </template>
      <p v-else class="unnamed-year">У этого имени пока нет принятого толкования. Здесь ещё спорят, каких перемен от него ждать.</p>
    </div>
  </section>
</template>

<style scoped>
.year-threads{margin-bottom:40px;color:rgba(var(--theme-text-rgb),.88);font:15px/1.85 'Hanken Grotesk',sans-serif}
.eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--theme-accent);margin:0 0 12px}
h2{margin:0 0 22px;font:600 34px/1.1 'Cormorant Garamond',serif;color:rgb(var(--theme-heading-rgb))}
.year-reading{--voice-color:var(--theme-accent-strong);padding:clamp(18px,3vw,34px);border:1px solid rgba(var(--theme-accent-rgb),.25);border-top:2px solid var(--voice-color);border-radius:6px;background:linear-gradient(120deg,rgba(var(--theme-accent-rgb),.045),transparent)}
.voice-shaman{--voice-color:#c6a4dc}.voice-magus{--voice-color:#83c5c5}.voice-elder{--voice-color:#d8b17d}
.reading-date{margin:0 0 8px;font-size:12px;color:rgba(var(--theme-text-rgb),.7)}
h3{font:600 34px/1.15 'Cormorant Garamond',serif;margin:0 0 22px;color:var(--theme-accent-strong);overflow-wrap:anywhere}
.narrator-choice{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 26px}
.narrator-choice button{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:9px 13px;border:1px solid rgba(var(--theme-accent-rgb),.25);border-radius:4px;background:transparent;color:rgba(var(--theme-text-rgb),.75);font:12px 'Hanken Grotesk',sans-serif;cursor:pointer}
.narrator-choice button:hover{background:rgba(var(--theme-accent-rgb),.08)}
.narrator-choice button[aria-pressed=true]{background:rgba(var(--theme-accent-rgb),.1);color:var(--voice-color);border-color:var(--voice-color)}
.narrator-choice button:focus-visible{outline:2px solid var(--theme-accent-strong);outline-offset:3px}
.voice-sign{width:22px;height:22px;flex-shrink:0;fill:none;stroke:currentColor;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round}
.year-story{max-width:66ch;padding-left:20px;border-left:2px solid var(--voice-color)}
.voice-shaman .year-story{border-left-style:dashed}.voice-magus .year-story{border-left:3px double var(--voice-color)}
h4{font:600 27px/1.2 'Cormorant Garamond',serif;color:rgb(var(--theme-heading-rgb));margin:0 0 16px}
.year-story p{margin:0;line-height:1.85}.year-story .story-omen{margin-top:18px;color:rgb(var(--theme-text-rgb))}
.unnamed-year{max-width:60ch}
@media(max-width:760px){h2,h3{font-size:29px}.year-reading{padding:18px}.narrator-choice{gap:8px}.narrator-choice button{padding:9px 10px}.year-story{padding-left:14px}h4{font-size:25px}}
</style>
