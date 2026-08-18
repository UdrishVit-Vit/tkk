<script setup>
import { FACTIONS_THREAD, FACTIONS_CONTENT } from '~/data/loreFactions.js'

defineProps({
  theme: { type: Object, required: true },
})

defineEmits(['up'])

const scroller = ref(null)
const introSection = ref(null)
const catSections = ref([])
const searchQuery = ref('')
const selectedCat = ref('all')
const activeIndex = ref(0)
const scrollProgress = ref(0)
let scrollAnimation = 0

const contentByCat = Object.fromEntries(FACTIONS_CONTENT.categories.map(cat => [cat.slug, cat]))

function setCatRef(element, index) {
  if (element) catSections.value[index] = element
}

function chapterPreview(chapter) {
  const text = (chapter.blocks || [])
    .flatMap(block => {
      if (block.paragraphs) return block.paragraphs
      if (block.type === 'facts') return (block.items || []).map(item => `${item.label}: ${item.value}`)
      return block.items || []
    })
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

function catOnRight(sectionSlug, chapterIndex) {
  return chapterIndex % 2 === 1
}

function catMatches(section) {
  const query = normalized(searchQuery.value).trim()
  if (!query) return true
  const content = contentByCat[section.slug]
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

function scrollToCat(index, filter = false) {
  if (filter) selectedCat.value = index === null ? 'all' : FACTIONS_THREAD.sections[index].slug
  const target = index === null ? introSection.value : catSections.value[index]
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
  catSections.value.forEach((section, index) => {
    if (section && section.offsetTop <= marker) closest = index
  })
  activeIndex.value = closest
}

function handleKeyboard(event) {
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  if (event.key === 'PageDown') {
    event.preventDefault()
    scrollToCat(Math.min(FACTIONS_THREAD.sections.length - 1, activeIndex.value + 1))
  }
  if (event.key === 'PageUp') {
    event.preventDefault()
    scrollToCat(Math.max(0, activeIndex.value - 1))
  }
  if (event.key === 'Home') {
    event.preventDefault()
    scrollToCat(null)
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
    <aside class="lore-rail" aria-label="Карта фракций">
      <p>Силы Эноа</p>
      <nav>
        <button type="button" class="lore-rail__map" @click="selectedCat = 'all'; scrollToCat(null)">
          <i aria-hidden="true" /> <span>Фракции</span>
        </button>
        <div class="lore-rail__line" aria-hidden="true"><i :style="{ height: `${scrollProgress * 100}%` }" /></div>
        <button
          v-for="(section, index) in FACTIONS_THREAD.sections"
          :key="section.slug"
          type="button"
          :class="{ 'is-active': activeIndex === index }"
          @click="scrollToCat(index)"
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

        <section ref="introSection" class="history-intro timeline-row" aria-labelledby="factions-title">
          <div class="history-intro__copy">
            <p>{{ FACTIONS_THREAD.eyebrow }}</p>
            <h1 id="factions-title">{{ FACTIONS_THREAD.title }}</h1>
            <aside>
              <span>Архив Башни</span>
              <p>{{ FACTIONS_THREAD.archiveNote }}</p>
            </aside>
          </div>
          <button
            type="button"
            class="history-intro__sigil"
            aria-label="Вернуться к карте Lore"
            @click="$emit('up')"
          >
            <img src="/assets/nodes/factions-lore.webp" width="256" height="256" alt="" decoding="async">
          </button>
        </section>

        <section
          v-for="(section, index) in FACTIONS_THREAD.sections"
          :key="section.slug"
          :ref="element => setCatRef(element, index)"
          class="history-era"
          :class="{ 'is-dimmed': selectedCat !== 'all' && selectedCat !== section.slug, 'is-search-dimmed': !catMatches(section) }"
        >
          <div class="history-era__heading timeline-row">
            <NuxtLink :to="`/lore/factions/${section.slug}`" class="history-era__title">
              <h2>{{ section.title }}</h2>
              <p>{{ section.summary }}</p>
            </NuxtLink>
            <NuxtLink
              :to="`/lore/factions/${section.slug}`"
              class="history-node history-node--era"
              :aria-label="`Открыть ${section.title}`"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
            </NuxtLink>
          </div>

          <div v-if="contentByCat[section.slug]?.chapters.length" class="history-era__chapters">
            <div
              v-for="(chapter, chapterIndex) in contentByCat[section.slug].chapters"
              :key="chapter.slug"
              class="history-entry timeline-row"
              :class="[catOnRight(section.slug, chapterIndex) ? 'history-entry--right' : 'history-entry--left', { 'is-search-dimmed': !chapterMatches(chapter) }]"
            >
              <NuxtLink
                class="history-entry__card"
                :to="`/lore/factions/${section.slug}?chapter=${chapter.slug}`"
              >
                <small>{{ index + 1 }}.{{ chapterIndex + 1 }}</small>
                <strong>{{ chapter.title }}</strong>
                <p v-if="chapterPreview(chapter)">{{ chapterPreview(chapter) }}</p>
              </NuxtLink>
              <div class="history-entry__node" aria-hidden="true"><i /></div>
            </div>
          </div>
        </section>

        <div class="history-end timeline-row" aria-hidden="true">
          <i /><span>Даскар полон сил</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.lore-history{position:absolute;inset:0 0 0 68px;z-index:58;overflow:hidden;color:rgba(var(--theme-text-rgb),.9);background:#040406!important;isolation:isolate}
.lore-rail{position:absolute;z-index:15;top:18px;bottom:auto;left:max(18px,calc(50% - 650px));width:158px;height:min(580px,calc(100% - 46px));border:1px solid rgba(var(--theme-contrast-rgb),.08);background:rgba(4,4,7,.9);padding:18px 10px 16px;box-shadow:0 18px 45px rgba(0,0,0,.28);backdrop-filter:blur(12px)}.lore-rail>p{margin:0 0 14px;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.27em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.26)}.lore-rail nav{position:relative;display:flex;height:calc(100% - 20px);flex-direction:column;justify-content:space-between}.lore-rail button{position:relative;z-index:2;display:grid;width:100%;grid-template-columns:12px 18px minmax(0,1fr);align-items:center;border:0;background:none;padding:5px 0;color:rgba(var(--theme-text-rgb),.32);text-align:left;cursor:pointer;transition:color .2s}.lore-rail button:hover,.lore-rail button.is-active{color:rgba(var(--theme-accent-strong-rgb),.82)}.lore-rail button>i{grid-column:1;width:6px;height:6px;border:1px solid rgba(var(--theme-text-rgb),.25);background:#07080d;transform:rotate(45deg);transition:border-color .2s,background .2s}.lore-rail button.is-active>i{border-color:rgba(var(--theme-accent-strong-rgb),.88);background:rgba(var(--theme-accent-strong-rgb),.9);box-shadow:0 0 12px rgba(var(--theme-accent-rgb),.24)}.lore-rail button small{font:600 5px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.lore-rail button span{overflow:hidden;font:500 12px/1.1 'Cormorant Garamond',serif;text-overflow:ellipsis;white-space:nowrap}.lore-rail__map{color:rgba(var(--theme-accent-strong-rgb),.62)!important}.lore-rail__map i{border-color:rgba(var(--theme-accent-rgb),.52)!important}.lore-rail__map span{grid-column:2/4;overflow:visible;line-height:1.05;white-space:normal}.lore-rail__line{position:absolute;z-index:0;top:10px;bottom:10px;left:2px;width:1px;background:rgba(var(--theme-text-rgb),.1)}.lore-rail__line i{position:absolute;top:0;left:0;width:1px;background:linear-gradient(rgba(var(--theme-accent-strong-rgb),.85),rgba(var(--theme-accent-rgb),.3));box-shadow:0 0 8px rgba(var(--theme-accent-rgb),.18)}
.lore-viewport{position:absolute;z-index:1;top:0;right:0;bottom:0;left:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:rgba(var(--theme-text-rgb),.36) rgba(var(--theme-surface-rgb),.2);background:radial-gradient(ellipse 58% 35% at 50% 0,rgba(16,18,27,.82),#07080e 70%,#040406)}.lore-viewport::-webkit-scrollbar{width:9px}.lore-viewport::-webkit-scrollbar-track{background:rgba(var(--theme-surface-rgb),.35)}.lore-viewport::-webkit-scrollbar-thumb{border:2px solid rgba(var(--theme-surface-rgb),.35);background:rgba(var(--theme-text-rgb),.34)}.lore-history__texture{position:fixed;inset:0 0 0 68px;z-index:-1;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.01) 0 1px,transparent 1px 4px);opacity:.68}
.history-canvas{position:relative;width:min(1240px,100%);min-height:100%;margin:0 auto;padding:82px 42px 90px;isolation:isolate}.timeline-row{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 116px minmax(0,1fr);align-items:center}.history-thread{position:absolute;z-index:-1;top:0;bottom:48px;left:50%;width:16px;pointer-events:none;transform:translateX(-50%)}.history-thread>i{position:absolute;top:0;bottom:0;left:50%}.history-thread>i:nth-child(1){width:2px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.48) 2%,rgba(var(--theme-accent-strong-rgb),.66) 50%,rgba(var(--theme-accent-rgb),.42) 98%,transparent);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.2);transform:translateX(-50%)}.history-thread>i:nth-child(2){width:7px;background:rgba(var(--theme-accent-rgb),.18);filter:blur(5px);transform:translateX(-50%)}.history-thread>i:nth-child(3),.history-thread>i:nth-child(4){width:1px;background:repeating-linear-gradient(to bottom,rgba(var(--theme-accent-strong-rgb),.75) 0 6px,transparent 6px 12px);animation:weaveY 8s linear infinite}.history-thread>i:nth-child(3){margin-left:-3px}.history-thread>i:nth-child(4){margin-left:3px;animation-direction:reverse;animation-duration:11s}.history-thread>b{position:absolute;top:4%;left:50%;width:9px;height:9px;border:1px solid rgba(var(--theme-accent-strong-rgb),.9);background:#07080d;box-shadow:0 0 18px rgba(var(--theme-accent-rgb),.38);transform:translateX(-50%) rotate(45deg);animation:sparkY 26s ease-in-out infinite}
.history-intro{min-height:310px}.history-intro__copy{grid-column:1;text-align:right}.history-intro__copy>p{margin:0 0 17px;font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}.history-intro h1{margin:0;font:600 clamp(51px,5.2vw,76px)/.88 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance}.history-intro aside{max-width:400px;margin:32px 0 0 auto;padding-right:24px;border-right:1px solid rgba(var(--theme-accent-rgb),.42)}.history-intro aside span{font:600 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.86)}.history-intro aside p{margin:10px 0 0;font:italic 16px/1.58 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.7);text-shadow:0 1px 12px rgba(0,0,0,.3)}.history-intro__sigil{position:relative;z-index:3;grid-column:2;display:grid;width:124px;height:124px;place-self:center;place-items:center;background:transparent;border:0;padding:0;color:inherit;cursor:pointer;isolation:isolate;transition:transform .34s cubic-bezier(.2,.8,.2,1),filter .34s ease}.history-intro__sigil::after{content:'';position:absolute;z-index:0;inset:2px;background:url('/assets/nodes/factions-lore.webp') center/contain no-repeat;filter:brightness(0) drop-shadow(0 0 3px rgba(0,0,0,.96));opacity:.96;transform:scale(1.055);pointer-events:none}.history-intro__sigil img{position:relative;z-index:1;width:115px;height:115px;pointer-events:none;object-fit:contain;animation:historySigilGlow 6s ease-in-out infinite}.history-intro__sigil:hover,.history-intro__sigil:focus-visible{outline:none;filter:drop-shadow(0 0 12px rgba(var(--theme-accent-rgb),.24));transform:scale(1.085)}.history-intro__sigil:active{transform:scale(1.025)}
.history-era{position:relative;padding:46px 0;transition:opacity .3s ease}.history-era.is-dimmed{opacity:.22}.history-era.is-search-dimmed{opacity:.2}.history-era__heading{min-height:185px}.history-era__title{grid-column:1;display:block;text-align:right;text-decoration:none;color:inherit}.history-era__title h2{margin:0;font:600 clamp(38px,4vw,55px)/.95 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);text-wrap:balance;transition:color .2s}.history-era__title:hover h2,.history-era__title:focus-visible h2{color:rgba(var(--theme-accent-strong-rgb),.95)}.history-era__title p{max-width:400px;margin:15px 0 0 auto;font:italic 15px/1.48 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.42);display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3}.history-node--era{position:relative;grid-column:2;display:grid;width:66px;height:66px;place-self:center;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.44);background:#090a10;color:inherit;text-decoration:none;box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 22px rgba(var(--theme-accent-rgb),.12);transform:rotate(45deg);animation:nodePulse 6s ease-in-out infinite}.history-node--era::before{content:'';position:absolute;inset:9px;border:1px dashed rgba(var(--theme-accent-rgb),.16)}.history-node--era span{transform:rotate(-45deg);font:600 12px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.86)}
.history-era__chapters{position:relative}.history-entry{min-height:136px;transition:opacity .25s}.history-entry.is-search-dimmed{opacity:.14}.history-entry__card{position:relative;display:block;min-height:98px;align-self:center;border:1px solid rgba(var(--theme-accent-rgb),.23);background:linear-gradient(145deg,rgba(15,16,24,.96),rgba(8,9,15,.95));padding:24px 28px 20px;color:inherit;text-decoration:none;box-shadow:0 16px 34px rgba(0,0,0,.14);transition:border-color .2s,background .2s,transform .2s}.history-entry__card::after{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.1);pointer-events:none}.history-entry__card:hover,.history-entry__card:focus-visible{border-color:rgba(var(--theme-accent-strong-rgb),.56);background:linear-gradient(145deg,rgba(19,20,29,.98),rgba(9,10,17,.98));transform:translateY(-2px);outline:none}.history-entry--left .history-entry__card{grid-column:1;text-align:right}.history-entry--right .history-entry__card{grid-column:3;text-align:left}.history-entry__card small{position:absolute;top:11px;font:600 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.history-entry--left small{left:12px}.history-entry--right small{right:12px}.history-entry__card strong{display:block;font:600 21px/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.9)}.history-entry__card p{display:-webkit-box;margin:11px 0 0;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;font:italic 15px/1.48 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.58)}.history-entry__node{position:relative;grid-column:2;display:grid;width:100%;height:100%;place-items:center}.history-entry__node::before{content:'';position:absolute;top:50%;width:50%;height:1px;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.46),transparent)}.history-entry--left .history-entry__node::before{right:50%;transform:scaleX(-1)}.history-entry--right .history-entry__node::before{left:50%}.history-entry__node i{position:relative;z-index:1;width:13px;height:13px;border:1px solid rgba(var(--theme-accent-rgb),.54);background:#08090f;box-shadow:0 0 0 4px rgba(5,6,10,.7);transform:rotate(45deg)}
.history-end{min-height:100px}.history-end i{grid-column:2;width:13px;height:13px;place-self:start center;border:1px solid rgba(var(--theme-accent-rgb),.5);background:#08090f;transform:rotate(45deg)}.history-end span{position:absolute;top:29px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.26em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.25)}
@media(min-width:1001px){.history-intro aside{max-width:400px}.history-era__title{margin-left:110px}.history-era__title p{max-width:400px}.history-entry--left .history-entry__card{margin-left:110px}}
@keyframes weaveY{to{background-position:0 24px}}@keyframes sparkY{0%,100%{top:4%;opacity:.2}10%,42%{opacity:1}50%{top:48%;opacity:.32}65%,92%{opacity:.9}96%{top:94%;opacity:.15}}@keyframes nodePulse{0%,100%{box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 16px rgba(var(--theme-accent-rgb),.08)}50%{box-shadow:0 0 0 6px rgba(5,6,10,.72),0 0 29px rgba(var(--theme-accent-rgb),.2)}}@keyframes historySigilGlow{0%,100%{opacity:.86;transform:scale(.97)}50%{opacity:1;transform:scale(1.045)}}
@media(max-width:1000px){.lore-rail{display:none}.lore-viewport{left:0}.lore-history__texture{left:68px}.history-canvas{max-width:780px;padding-inline:24px}.timeline-row{grid-template-columns:0 64px minmax(0,1fr)}.history-thread{left:56px}.history-intro__copy,.history-era__title{grid-column:3;text-align:left}.history-intro aside{margin-left:0;margin-right:auto;padding-right:0;padding-left:18px;border-right:0;border-left:1px solid rgba(var(--theme-accent-rgb),.32)}.history-intro__sigil,.history-node--era{grid-column:2}.history-era__title p{margin-left:0;margin-right:auto}.history-entry--left .history-entry__card,.history-entry--right .history-entry__card{grid-column:3;text-align:left}.history-entry__node{grid-column:2}.history-entry__node::before,.history-entry--left .history-entry__node::before,.history-entry--right .history-entry__node::before{left:50%;right:auto;transform:none}.history-entry--left small{right:12px;left:auto}.history-end i{grid-column:2}.history-end span{left:56px;transform:translateX(-50%)}}
@media(max-width:720px){.lore-history{left:0}.lore-viewport{top:0}.history-canvas{padding:58px 15px 68px}.timeline-row{grid-template-columns:0 48px minmax(0,1fr)}.history-thread{left:39px}.history-intro{min-height:260px}.history-intro h1{font-size:46px}.history-intro aside p{font-size:14px}.history-intro__sigil{width:72px;height:72px}.history-intro__sigil::after{inset:1px}.history-intro__sigil img{width:68px;height:68px}.history-era{padding:30px 0}.history-era__heading{min-height:150px}.history-era__title h2{font-size:36px}.history-era__title p{font-size:14px}.history-node--era{width:46px;height:46px}.history-entry{min-height:122px}.history-entry__card{min-height:90px;padding:22px 18px 18px}.history-entry__card strong{font-size:19px}.history-entry__card p{font-size:13px}.history-end span{left:39px}}
@media(prefers-reduced-motion:reduce){.history-thread>i,.history-thread>b,.history-node--era,.history-intro__sigil img{animation:none}.history-intro__sigil,.history-era,.history-entry,.history-entry__card{transition:none}}
</style>
