<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'
import historyContent from '~/data/loreHistoryContent.generated.json'

defineProps({
  theme: { type: Object, required: true },
})

defineEmits(['up'])

const scroller = ref(null)
const introSection = ref(null)
const eraSections = ref([])
const searchQuery = ref('')
const selectedEra = ref('all')
const activeIndex = ref(0)
const scrollProgress = ref(0)
let scrollAnimation = 0

const contentByEra = Object.fromEntries(historyContent.eras.map(era => [era.slug, era]))

function setEraRef(element, index) {
  if (element) eraSections.value[index] = element
}

function chapterPreview(chapter) {
  const text = (chapter.blocks || [])
    .flatMap(block => block.paragraphs || [])
    .join(' ')
    .trim()
  if (text.length <= 145) return text
  return `${text.slice(0, 142).trimEnd()}…`
}

function normalized(value) {
  return String(value || '').toLocaleLowerCase('ru-RU')
}

function chapterMatches(chapter) {
  const query = normalized(searchQuery.value).trim()
  if (!query) return true
  return normalized(`${chapter.title} ${chapterPreview(chapter)}`).includes(query)
}

function chapterOnRight(sectionSlug, chapterIndex) {
  if (sectionSlug === 'epoha-rassveta') return chapterIndex % 2 === 0
  return chapterIndex % 2 === 1
}

function eraMatches(section) {
  const query = normalized(searchQuery.value).trim()
  if (!query) return true
  const content = contentByEra[section.slug]
  const searchable = [section.title, section.summary, ...(content?.chapters || []).flatMap(chapter => [chapter.title, chapterPreview(chapter)])]
  return normalized(searchable.join(' ')).includes(query)
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3)
}

function tweenScroll(target) {
  const element = scroller.value
  if (!element) return
  cancelAnimationFrame(scrollAnimation)
  const start = element.scrollTop
  const distance = Math.max(0, target) - start
  const startedAt = performance.now()
  const duration = Math.min(820, Math.max(380, Math.abs(distance) * .42))

  function frame(now) {
    const elapsed = Math.min(1, (now - startedAt) / duration)
    element.scrollTop = start + distance * easeOutCubic(elapsed)
    if (elapsed < 1) scrollAnimation = requestAnimationFrame(frame)
  }

  scrollAnimation = requestAnimationFrame(frame)
}

function scrollToEra(index, filter = false) {
  if (filter) selectedEra.value = index === null ? 'all' : HISTORY_THREAD.sections[index].slug
  const target = index === null ? introSection.value : eraSections.value[index]
  if (!target || !scroller.value) return
  tweenScroll(target.offsetTop - 36)
}

function handleScroll() {
  const element = scroller.value
  if (!element) return
  const max = Math.max(1, element.scrollHeight - element.clientHeight)
  scrollProgress.value = Math.min(1, element.scrollTop / max)

  const marker = element.scrollTop + element.clientHeight * .32
  let closest = 0
  eraSections.value.forEach((section, index) => {
    if (section && section.offsetTop <= marker) closest = index
  })
  activeIndex.value = closest
}

function handleKeyboard(event) {
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  if (event.key === 'PageDown') {
    event.preventDefault()
    scrollToEra(Math.min(HISTORY_THREAD.sections.length - 1, activeIndex.value + 1))
  }
  if (event.key === 'PageUp') {
    event.preventDefault()
    scrollToEra(Math.max(0, activeIndex.value - 1))
  }
  if (event.key === 'Home') {
    event.preventDefault()
    scrollToEra(null)
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('keydown', handleKeyboard)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(scrollAnimation)
  window.removeEventListener('keydown', handleKeyboard)
})
</script>

<template>
  <main class="lore-history" :style="{ background: theme.bg }">
    <aside class="lore-rail" aria-label="Карта истории">
      <p>Нить времени</p>
      <nav>
        <button type="button" class="lore-rail__map" @click="selectedEra = 'all'; scrollToEra(null)">
          <i aria-hidden="true" /> <span>Карта</span>
        </button>
        <div class="lore-rail__line" aria-hidden="true"><i :style="{ height: `${scrollProgress * 100}%` }" /></div>
        <button
          v-for="(section, index) in HISTORY_THREAD.sections"
          :key="section.slug"
          type="button"
          :class="{ 'is-active': activeIndex === index }"
          @click="scrollToEra(index)"
        >
          <i aria-hidden="true" />
          <small>{{ String(index).padStart(2, '0') }}</small>
          <span>{{ section.title }}</span>
        </button>
      </nav>
    </aside>

    <section ref="scroller" class="lore-viewport" @scroll="handleScroll">
      <div class="lore-history__texture" aria-hidden="true" />
      <div class="history-canvas">
        <div class="history-thread" aria-hidden="true">
          <i /><i /><i /><i />
          <b />
        </div>

        <section ref="introSection" class="history-intro timeline-row" aria-labelledby="history-title">
          <div class="history-intro__copy">
            <p>{{ HISTORY_THREAD.eyebrow }}</p>
            <h1 id="history-title">{{ HISTORY_THREAD.title }}</h1>
            <aside>
              <span>Архив Башни</span>
              <p>{{ HISTORY_THREAD.archiveNote }}</p>
            </aside>
          </div>
          <button
            type="button"
            class="history-intro__sigil"
            aria-label="Вернуться к карте Lore"
            @click="$emit('up')"
          >
            <img src="/assets/nodes/historia.webp" width="256" height="256" alt="" decoding="async">
          </button>
        </section>

        <section
          v-for="(section, index) in HISTORY_THREAD.sections"
          :key="section.slug"
          :ref="element => setEraRef(element, index)"
          class="history-era"
          :class="{ 'is-dimmed': selectedEra !== 'all' && selectedEra !== section.slug, 'is-search-dimmed': !eraMatches(section) }"
        >
          <div class="history-era__heading timeline-row">
            <NuxtLink :to="`/lore/history/${section.slug}`" class="history-era__title">
              <h2>{{ section.title }}</h2>
              <p>{{ section.summary }}</p>
            </NuxtLink>
            <NuxtLink :to="`/lore/history/${section.slug}`" class="history-node history-node--era" :aria-label="`Открыть ${section.title}`" />
          </div>

          <div v-if="contentByEra[section.slug]?.chapters.length" class="history-era__chapters">
            <div
              v-for="(chapter, chapterIndex) in contentByEra[section.slug].chapters"
              :key="chapter.slug"
              class="history-entry timeline-row"
              :class="[chapterOnRight(section.slug, chapterIndex) ? 'history-entry--right' : 'history-entry--left', { 'is-search-dimmed': !chapterMatches(chapter) }]"
            >
              <NuxtLink
                class="history-entry__card"
                :to="`/lore/history/${section.slug}?chapter=${chapter.slug}`"
              >
                <small>{{ index }}.{{ chapterIndex + 1 }}</small>
                <strong>{{ chapter.title }}</strong>
                <p v-if="chapterPreview(chapter)">{{ chapterPreview(chapter) }}</p>
              </NuxtLink>
              <div class="history-entry__node" aria-hidden="true"><i /></div>
            </div>
          </div>
        </section>

        <div class="history-end timeline-row" aria-hidden="true">
          <i /><span>Нить продолжается</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.lore-history{position:absolute;inset:0 0 0 68px;z-index:58;overflow:hidden;color:rgba(var(--theme-text-rgb),.9);background:#040406!important;isolation:isolate}.lore-toolbar{position:absolute;z-index:20;top:0;left:0;right:0;display:flex;height:58px;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(var(--theme-contrast-rgb),.07);background:rgba(4,4,6,.94);padding:0 18px 0 22px;backdrop-filter:blur(12px)}.lore-toolbar__brand{display:flex;align-items:center;gap:20px}.lore-toolbar__brand>span{padding-left:20px;border-left:1px solid rgba(var(--theme-contrast-rgb),.1);font:600 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.72)}.lore-toolbar__back{border:0;background:none;padding:10px 0;color:rgba(var(--theme-text-rgb),.38);font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase;cursor:pointer}.lore-toolbar__back:hover{color:rgba(var(--theme-heading-rgb),.8)}.lore-toolbar__tools{display:flex;align-items:center;gap:18px}.lore-search{position:relative;display:flex;width:220px;height:32px;align-items:center;border:1px solid rgba(var(--theme-accent-rgb),.25);background:rgba(var(--theme-surface-rgb),.4)}.lore-search i{width:7px;height:7px;margin:0 12px;border:1px solid rgba(var(--theme-accent-rgb),.52);transform:rotate(45deg)}.lore-search input{min-width:0;flex:1;border:0;outline:0;background:none;padding:0 11px 0 0;color:rgba(var(--theme-heading-rgb),.75);font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.04em}.lore-search input::placeholder{color:rgba(var(--theme-accent-strong-rgb),.38)}.lore-search input::-webkit-search-cancel-button{display:none}.lore-filters{display:flex;gap:5px}.lore-filters button{display:grid;width:28px;height:28px;place-items:center;border:1px solid rgba(var(--theme-contrast-rgb),.1);background:transparent;color:rgba(var(--theme-text-rgb),.24);font:600 6px/1 'Hanken Grotesk',sans-serif;cursor:pointer}.lore-filters button:first-child{width:38px}.lore-filters button:hover,.lore-filters button.is-selected{border-color:rgba(var(--theme-accent-strong-rgb),.68);color:rgba(var(--theme-accent-strong-rgb),.9);background:rgba(var(--theme-accent-rgb),.035)}
.lore-rail{position:absolute;z-index:15;top:58px;bottom:0;left:0;width:220px;border-right:1px solid rgba(var(--theme-contrast-rgb),.07);background:rgba(4,4,7,.84);padding:28px 13px}.lore-rail>p{margin:0 0 22px;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.27em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.26)}.lore-rail nav{position:relative;display:flex;height:calc(100% - 30px);flex-direction:column;justify-content:space-between}.lore-rail button{position:relative;z-index:2;display:grid;width:100%;grid-template-columns:16px 24px minmax(0,1fr);align-items:center;border:0;background:none;padding:8px 0;color:rgba(var(--theme-text-rgb),.32);text-align:left;cursor:pointer;transition:color .2s}.lore-rail button:hover,.lore-rail button.is-active{color:rgba(var(--theme-accent-strong-rgb),.82)}.lore-rail button>i{grid-column:1;width:7px;height:7px;border:1px solid rgba(var(--theme-text-rgb),.25);background:#07080d;transform:rotate(45deg);transition:border-color .2s,background .2s}.lore-rail button.is-active>i{border-color:rgba(var(--theme-accent-strong-rgb),.88);background:rgba(var(--theme-accent-strong-rgb),.9);box-shadow:0 0 12px rgba(var(--theme-accent-rgb),.24)}.lore-rail button small{font:600 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.lore-rail button span{overflow:hidden;font:500 13px/1.1 'Cormorant Garamond',serif;text-overflow:ellipsis;white-space:nowrap}.lore-rail__map{color:rgba(var(--theme-accent-strong-rgb),.62)!important}.lore-rail__map i{border-color:rgba(var(--theme-accent-rgb),.52)!important}.lore-rail__map span{grid-column:2/4}.lore-rail__line{position:absolute;z-index:0;top:14px;bottom:14px;left:3px;width:1px;background:rgba(var(--theme-text-rgb),.1)}.lore-rail__line i{position:absolute;top:0;left:0;width:1px;background:linear-gradient(rgba(var(--theme-accent-strong-rgb),.85),rgba(var(--theme-accent-rgb),.3));box-shadow:0 0 8px rgba(var(--theme-accent-rgb),.18)}
.lore-viewport{position:absolute;z-index:1;top:58px;right:0;bottom:0;left:220px;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:rgba(var(--theme-text-rgb),.36) rgba(var(--theme-surface-rgb),.2);background:radial-gradient(ellipse 58% 35% at 50% 0,rgba(16,18,27,.82),#07080e 70%,#040406)}.lore-viewport::-webkit-scrollbar{width:9px}.lore-viewport::-webkit-scrollbar-track{background:rgba(var(--theme-surface-rgb),.35)}.lore-viewport::-webkit-scrollbar-thumb{border:2px solid rgba(var(--theme-surface-rgb),.35);background:rgba(var(--theme-text-rgb),.34)}.lore-history__texture{position:fixed;inset:58px 0 0 288px;z-index:-1;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.01) 0 1px,transparent 1px 4px);opacity:.68}
.history-canvas{position:relative;width:min(1240px,100%);min-height:100%;margin:0 auto;padding:82px 42px 90px;isolation:isolate}.timeline-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 116px minmax(0,1fr);align-items:center}.history-thread{position:absolute;z-index:-1;top:0;bottom:48px;left:50%;width:16px;pointer-events:none;transform:translateX(-50%)}.history-thread>i{position:absolute;top:0;bottom:0;left:50%}.history-thread>i:nth-child(1){width:2px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.48) 2%,rgba(var(--theme-accent-strong-rgb),.66) 50%,rgba(var(--theme-accent-rgb),.42) 98%,transparent);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.2);transform:translateX(-50%)}.history-thread>i:nth-child(2){width:7px;background:rgba(var(--theme-accent-rgb),.18);filter:blur(5px);transform:translateX(-50%)}.history-thread>i:nth-child(3),.history-thread>i:nth-child(4){width:1px;background:repeating-linear-gradient(to bottom,rgba(var(--theme-accent-strong-rgb),.75) 0 6px,transparent 6px 12px);animation:weaveY 8s linear infinite}.history-thread>i:nth-child(3){margin-left:-3px}.history-thread>i:nth-child(4){margin-left:3px;animation-direction:reverse;animation-duration:11s}.history-thread>b{position:absolute;top:4%;left:50%;width:9px;height:9px;border:1px solid rgba(var(--theme-accent-strong-rgb),.9);background:#07080d;box-shadow:0 0 18px rgba(var(--theme-accent-rgb),.38);transform:translateX(-50%) rotate(45deg);animation:sparkY 26s ease-in-out infinite}
.history-intro{min-height:310px}.history-intro__copy{grid-column:1;text-align:right}.history-intro__copy>p{margin:0 0 17px;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}.history-intro h1{margin:0;font:600 clamp(51px,5.2vw,76px)/.88 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance}.history-intro aside{max-width:530px;margin:32px 0 0 auto;padding-right:24px;border-right:1px solid rgba(var(--theme-accent-rgb),.32)}.history-intro aside span{font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.68)}.history-intro aside p{margin:10px 0 0;font:italic 15px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.47)}.history-intro__sigil{position:relative;grid-column:2;display:grid;width:88px;height:88px;place-self:center;place-items:center;background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.12),rgba(7,8,14,.72) 58%,transparent 74%)}.history-intro__sigil::before{content:'';position:absolute;inset:11px;border:1px solid rgba(var(--theme-accent-rgb),.2);transform:rotate(45deg);box-shadow:0 0 24px rgba(var(--theme-accent-rgb),.12)}.history-intro__sigil img{position:relative;width:82px;height:82px;object-fit:contain;filter:drop-shadow(0 0 9px rgba(var(--theme-accent-rgb),.24));animation:historySigilGlow 6s ease-in-out infinite}
.history-era{position:relative;padding:46px 0;transition:opacity .3s ease}.history-era.is-dimmed{opacity:.22}.history-era.is-search-dimmed{opacity:.2}.history-era__heading{min-height:185px}.history-era__title{grid-column:1;display:block;text-align:right;text-decoration:none;color:inherit}.history-era__title h2{margin:0;font:600 clamp(38px,4vw,55px)/.95 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);text-wrap:balance;transition:color .2s}.history-era__title:hover h2,.history-era__title:focus-visible h2{color:rgba(var(--theme-accent-strong-rgb),.95)}.history-era__title p{max-width:470px;margin:15px 0 0 auto;font:italic 15px/1.48 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.42);display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3}.history-node--era{position:relative;grid-column:2;display:grid;width:66px;height:66px;place-self:center;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.44);background:#090a10;color:inherit;text-decoration:none;box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 22px rgba(var(--theme-accent-rgb),.12);transform:rotate(45deg);animation:nodePulse 6s ease-in-out infinite}.history-node--era::before{content:'';position:absolute;inset:9px;border:1px dashed rgba(var(--theme-accent-rgb),.16)}.history-node--era span{transform:rotate(-45deg);font:600 8px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.86)}
.history-era__chapters{position:relative}.history-entry{min-height:136px;transition:opacity .25s}.history-entry.is-search-dimmed{opacity:.14}.history-entry__card{position:relative;display:block;min-height:98px;align-self:center;border:1px solid rgba(var(--theme-accent-rgb),.23);background:linear-gradient(145deg,rgba(15,16,24,.96),rgba(8,9,15,.95));padding:24px 28px 20px;color:inherit;text-decoration:none;box-shadow:0 16px 34px rgba(0,0,0,.14);transition:border-color .2s,background .2s,transform .2s}.history-entry__card::after{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.1);pointer-events:none}.history-entry__card:hover,.history-entry__card:focus-visible{border-color:rgba(var(--theme-accent-strong-rgb),.56);background:linear-gradient(145deg,rgba(19,20,29,.98),rgba(9,10,17,.98));transform:translateY(-2px);outline:none}.history-entry--left .history-entry__card{grid-column:1;text-align:right}.history-entry--right .history-entry__card{grid-column:3;text-align:left}.history-entry__card small{position:absolute;top:11px;font:600 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.history-entry--left small{left:12px}.history-entry--right small{right:12px}.history-entry__card strong{display:block;font:600 21px/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.85);text-wrap:balance}.history-entry__card p{display:-webkit-box;margin:11px 0 0;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;font:italic 14px/1.45 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.4)}.history-entry__node{position:relative;grid-column:2;display:grid;width:100%;height:100%;place-items:center}.history-entry__node::before{content:'';position:absolute;top:50%;width:50%;height:1px;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.46),transparent)}.history-entry--left .history-entry__node::before{right:50%;transform:scaleX(-1)}.history-entry--right .history-entry__node::before{left:50%}.history-entry__node i{position:relative;z-index:1;width:13px;height:13px;border:1px solid rgba(var(--theme-accent-rgb),.54);background:#08090f;box-shadow:0 0 0 4px rgba(5,6,10,.7);transform:rotate(45deg)}
.history-end{min-height:100px}.history-end i{grid-column:2;width:13px;height:13px;place-self:start center;border:1px solid rgba(var(--theme-accent-rgb),.5);background:#08090f;transform:rotate(45deg)}.history-end span{position:absolute;top:29px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.26em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.25)}
.history-intro aside{border-color:rgba(var(--theme-accent-rgb),.42)}.history-intro aside span{color:rgba(var(--theme-accent-strong-rgb),.86)}.history-intro aside p{font-size:16px;line-height:1.58;color:rgba(var(--theme-text-rgb),.7);text-shadow:0 1px 12px rgba(0,0,0,.3)}.history-era__title p{font-size:16px;line-height:1.52;color:rgba(var(--theme-text-rgb),.64);text-shadow:0 1px 10px rgba(0,0,0,.25)}.history-entry__card strong{color:rgba(var(--theme-heading-rgb),.9)}.history-entry__card p{font-size:15px;line-height:1.48;color:rgba(var(--theme-text-rgb),.58)}

/* Compact fixed navigator: it stays near the chronology while the inner canvas scrolls. */
.lore-rail{top:18px;bottom:auto;left:max(18px,calc(50% - 650px));width:158px;height:min(580px,calc(100% - 46px));border:1px solid rgba(var(--theme-contrast-rgb),.08);background:rgba(4,4,7,.9);padding:18px 10px 16px;box-shadow:0 18px 45px rgba(0,0,0,.28);backdrop-filter:blur(12px)}
.lore-rail>p{margin:0 0 14px;font-size:6px}.lore-rail nav{height:calc(100% - 20px)}.lore-rail button{grid-template-columns:12px 18px minmax(0,1fr);padding:5px 0}.lore-rail button>i{width:6px;height:6px}.lore-rail button small{font-size:5px}.lore-rail button span{font-size:12px}.lore-rail__line{top:10px;bottom:10px;left:2px}
.lore-viewport{top:0;left:0}.lore-history__texture{inset:0 0 0 68px}

/* The emblem is the main interactive knot and masks the thread underneath. */
.history-intro__sigil{z-index:3;width:124px;height:124px;border:0;border-radius:0;background:transparent;padding:0;color:inherit;cursor:pointer;isolation:isolate;transition:transform .34s cubic-bezier(.2,.8,.2,1),filter .34s ease}
.history-intro__sigil::after{content:'';position:absolute;z-index:0;inset:2px;background:url('/assets/nodes/historia.webp') center/contain no-repeat;filter:brightness(0) drop-shadow(0 0 3px rgba(0,0,0,.96));opacity:.96;transform:scale(1.055);pointer-events:none}
.history-intro__sigil::before{display:none}
.history-intro__sigil img{position:relative;z-index:1;width:115px;height:115px;pointer-events:none}
.history-intro__sigil:hover,.history-intro__sigil:focus-visible{outline:none;filter:drop-shadow(0 0 12px rgba(var(--theme-accent-rgb),.24));transform:scale(1.085)}
.history-intro__sigil:focus-visible::before{border-color:rgba(var(--theme-accent-strong-rgb),.78)}.history-intro__sigil:active{transform:scale(1.025)}
@media(min-width:1001px){.history-intro aside{max-width:400px}.history-era__title p{max-width:400px}.history-entry--left .history-entry__card{margin-left:110px}}
@keyframes weaveY{to{background-position:0 24px}}@keyframes sparkY{0%,100%{top:4%;opacity:.2}10%,42%{opacity:1}50%{top:48%;opacity:.32}65%,92%{opacity:.9}96%{top:94%;opacity:.15}}@keyframes nodePulse{0%,100%{box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 16px rgba(var(--theme-accent-rgb),.08)}50%{box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 29px rgba(var(--theme-accent-rgb),.2)}}@keyframes historySigilGlow{0%,100%{opacity:.86;transform:scale(.97)}50%{opacity:1;transform:scale(1.045)}}
@media(max-width:1000px){.lore-rail{display:none}.lore-viewport{left:0}.lore-history__texture{left:68px}.history-canvas{max-width:780px;padding-inline:24px}.timeline-row{grid-template-columns:0 64px minmax(0,1fr)}.history-thread{left:56px}.history-intro__copy,.history-era__title{grid-column:3;text-align:left}.history-intro aside{margin-left:0;margin-right:auto;padding-right:0;padding-left:18px;border-right:0;border-left:1px solid rgba(var(--theme-accent-rgb),.32)}.history-intro__sigil,.history-node--era{grid-column:2}.history-era__title p{margin-left:0;margin-right:auto}.history-entry--left .history-entry__card,.history-entry--right .history-entry__card{grid-column:3;text-align:left}.history-entry__node{grid-column:2}.history-entry__node::before,.history-entry--left .history-entry__node::before,.history-entry--right .history-entry__node::before{left:50%;right:auto;transform:none}.history-entry--left small{right:12px;left:auto}.history-end i{grid-column:2}.history-end span{left:56px;transform:translateX(-50%)}}
@media(max-width:720px){.lore-history{left:0}.lore-toolbar{height:54px;padding:0 12px}.lore-toolbar__brand>span{display:none}.lore-toolbar__tools{min-width:0;gap:8px}.lore-search{width:min(39vw,170px);height:29px}.lore-search i{margin:0 8px}.lore-filters{max-width:37vw;overflow-x:auto;scrollbar-width:none}.lore-filters::-webkit-scrollbar{display:none}.lore-filters button{width:26px;min-width:26px;height:26px}.lore-filters button:first-child{width:35px;min-width:35px}.lore-viewport{top:54px}.lore-history__texture{inset:54px 0 0 0}.history-canvas{padding:58px 15px 68px}.timeline-row{grid-template-columns:0 48px minmax(0,1fr)}.history-thread{left:39px}.history-intro{min-height:260px}.history-intro h1{font-size:46px}.history-intro aside p{font-size:14px}.history-intro__sigil{width:52px;height:52px}.history-intro__sigil::before{inset:7px}.history-intro__sigil img{width:50px;height:50px}.history-era{padding:30px 0}.history-era__heading{min-height:150px}.history-era__title h2{font-size:36px}.history-era__title p{font-size:14px}.history-node--era{width:46px;height:46px}.history-entry{min-height:122px}.history-entry__card{min-height:90px;padding:22px 18px 18px}.history-entry__card strong{font-size:19px}.history-entry__card p{font-size:13px}.history-end span{left:39px}}
@media(max-width:720px){.lore-viewport{top:0}.lore-history__texture{inset:0}.history-intro__sigil{width:72px;height:72px}.history-intro__sigil::after{inset:1px}.history-intro__sigil img{width:68px;height:68px}}
@media(prefers-reduced-motion:reduce){.history-thread>i,.history-thread>b,.history-node--era,.history-intro__sigil img{animation:none}.history-intro__sigil,.history-era,.history-entry,.history-entry__card{transition:none}}
</style>
