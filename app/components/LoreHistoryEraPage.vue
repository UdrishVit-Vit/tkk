<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'

const props = defineProps({
  section: { type: Object, required: true },
  content: { type: Object, required: true },
  index: { type: Number, required: true },
})

const route = useRoute()
const router = useRouter()
const activeSlug = ref('')
const articleTop = ref(null)

const chapters = computed(() => props.content?.chapters || [])
const hasIntro = computed(() => Boolean(props.content?.intro?.length))
const activeChapter = computed(() => chapters.value.find(chapter => chapter.slug === activeSlug.value) || null)
const activeBlocks = computed(() => activeChapter.value?.blocks || props.content?.intro || [])
const activeTitle = computed(() => activeChapter.value?.title || props.section.title)
const activePosition = computed(() => activeChapter.value ? chapters.value.findIndex(chapter => chapter.slug === activeChapter.value.slug) + 1 : 0)
const activeStep = computed(() => activeChapter.value ? activePosition.value - 1 + (hasIntro.value ? 1 : 0) : 0)
const totalSteps = computed(() => chapters.value.length + (hasIntro.value ? 1 : 0))
const previousEra = computed(() => HISTORY_THREAD.sections[props.index - 1] || null)
const nextEra = computed(() => HISTORY_THREAD.sections[props.index + 1] || null)

function selectChapter(slug, scroll = true) {
  activeSlug.value = chapters.value.some(chapter => chapter.slug === slug) ? slug : ''
  const query = { ...route.query }
  if (activeSlug.value) query.chapter = activeSlug.value
  else delete query.chapter
  router.replace({ query }).then(() => {
    if (scroll) nextTick(() => articleTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  })
}

function showNext() {
  if (!activeChapter.value && chapters.value.length) selectChapter(chapters.value[0].slug)
  else if (activePosition.value < chapters.value.length) selectChapter(chapters.value[activePosition.value].slug)
}

function showPrevious() {
  if (activePosition.value <= 1 && hasIntro.value) selectChapter('')
  else if (activePosition.value > 1) selectChapter(chapters.value[activePosition.value - 2].slug)
}

watch(() => route.query.chapter, value => {
  const requested = chapters.value.some(chapter => chapter.slug === value) ? String(value) : ''
  activeSlug.value = requested || (!hasIntro.value && chapters.value.length ? chapters.value[0].slug : '')
}, { immediate: true })
</script>

<template>
  <main class="era-page">
    <div class="era-page__texture" aria-hidden="true" />
    <header class="era-page__header">
      <NuxtLink to="/lore/history"><span aria-hidden="true">←</span> все эпохи</NuxtLink>
      <span>{{ String(index).padStart(2, '0') }} · {{ section.title }}</span>
    </header>

    <section class="era-heading">
      <div class="era-heading__knot" aria-hidden="true"><span>{{ String(index).padStart(2, '0') }}</span></div>
      <h1>{{ section.title }}</h1>
    </section>

    <nav v-if="chapters.length" class="era-thread" aria-label="Подразделы эпохи">
      <div class="era-thread__line" aria-hidden="true"><i /><i /><i /></div>
      <button
        v-for="(chapter, chapterIndex) in chapters"
        :key="chapter.slug"
        type="button"
        :class="{ 'is-active': activeSlug === chapter.slug }"
        @click="selectChapter(chapter.slug)"
      >
        <span>{{ index }}.{{ chapterIndex + 1 }}</span>
        <strong>{{ chapter.title }}</strong>
        <i aria-hidden="true" />
      </button>
    </nav>

    <article ref="articleTop" class="era-reader">
      <header v-if="activeChapter">
        <span>{{ index }}.{{ activePosition }}</span>
        <h2>{{ activeTitle }}</h2>
      </header>

      <div class="era-reader__body">
        <template v-for="(block, blockIndex) in activeBlocks" :key="`${activeSlug}:${blockIndex}`">
          <blockquote v-if="block.type === 'verse'">
            <i aria-hidden="true" />
            <p v-for="line in block.paragraphs" :key="line">{{ line }}</p>
          </blockquote>
          <template v-else>
            <p v-for="paragraph in block.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </template>
        </template>
        <p v-if="!activeBlocks.length" class="era-reader__empty">Выберите подраздел на нити, чтобы открыть его текст.</p>
      </div>

      <footer v-if="chapters.length" class="era-reader__switcher">
        <button type="button" :disabled="activeStep === 0" @click="showPrevious">← Назад</button>
        <div><i /><span>{{ activeStep + 1 }} / {{ totalSteps }}</span><i /></div>
        <button type="button" :disabled="activeStep >= totalSteps - 1" @click="showNext">Далее →</button>
      </footer>
    </article>

    <nav class="era-pagination" aria-label="Навигация между эпохами">
      <NuxtLink v-if="previousEra" :to="`/lore/history/${previousEra.slug}`">← {{ previousEra.title }}</NuxtLink>
      <span v-else />
      <NuxtLink v-if="nextEra" :to="`/lore/history/${nextEra.slug}`">{{ nextEra.title }} →</NuxtLink>
      <NuxtLink v-else to="/lore/history">Все эпохи →</NuxtLink>
    </nav>
  </main>
</template>

<style scoped>
.era-page{position:relative;min-height:100vh;padding-bottom:48px;overflow:hidden;color:rgba(var(--theme-text-rgb),.88);background:var(--theme-page-bg);isolation:isolate}.era-page__texture{position:fixed;inset:0;z-index:-1;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.016) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.012) 0 1px,transparent 1px 4px),radial-gradient(ellipse 65% 36% at 50% 0,rgba(var(--theme-accent-rgb),.1),transparent 72%)}
.era-page__header{display:flex;align-items:center;justify-content:space-between;max-width:1160px;margin:auto;padding:29px 42px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.1);font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.3)}.era-page__header a{color:rgba(var(--theme-text-rgb),.52);text-decoration:none}.era-page__header a:hover{color:rgba(var(--theme-accent-strong-rgb),.9)}.era-page__header a span{margin-right:8px;color:rgba(var(--theme-accent-rgb),.68)}
.era-heading{position:relative;display:flex;max-width:900px;margin:57px auto 0;padding:0 30px;align-items:center;justify-content:center;gap:38px}.era-heading::before,.era-heading::after{content:'';position:absolute;top:50%;width:15%;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.34))}.era-heading::before{right:100%}.era-heading::after{left:100%;transform:scaleX(-1)}.era-heading__knot{display:grid;width:58px;height:58px;flex:0 0 auto;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.52);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 0 7px rgba(var(--theme-surface-rgb),.5),0 0 25px rgba(var(--theme-accent-rgb),.16);transform:rotate(45deg)}.era-heading__knot::before{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.18)}.era-heading__knot span{transform:rotate(-45deg);font:500 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.72)}.era-heading h1{margin:0;font:600 clamp(44px,6vw,72px)/.92 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance}
.era-thread{position:relative;display:flex;max-width:1040px;margin:60px auto 0;padding:36px 28px 35px;flex-wrap:wrap;justify-content:center;gap:18px 14px;border-block:1px solid rgba(var(--theme-accent-rgb),.13);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.025) 18%,rgba(var(--theme-accent-rgb),.025) 82%,transparent)}.era-thread__line{position:absolute;z-index:0;top:50%;left:3%;right:3%;height:9px}.era-thread__line i{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.5) 8%,rgba(var(--theme-accent-strong-rgb),.68) 50%,rgba(var(--theme-accent-rgb),.5) 92%,transparent)}.era-thread__line i:nth-child(2){top:4px;opacity:.45}.era-thread__line i:nth-child(3){top:8px;opacity:.2}.era-thread button{position:relative;z-index:1;display:flex;width:156px;min-height:116px;align-items:center;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.24);background:repeating-linear-gradient(45deg,rgba(var(--theme-accent-rgb),.012) 0 1px,transparent 1px 7px),rgb(var(--theme-surface-rgb));padding:24px 17px;color:inherit;text-align:center;cursor:pointer;box-shadow:0 10px 26px rgba(0,0,0,.18),0 0 0 5px rgba(var(--theme-surface-rgb),.35);transition:transform .22s,border-color .22s,background .22s}.era-thread button:hover,.era-thread button:focus-visible,.era-thread button.is-active{transform:translateY(-4px);border-color:rgba(var(--theme-accent-rgb),.62);background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.08),transparent 70%),rgb(var(--theme-surface-rgb));outline:none}.era-thread button>span{position:absolute;top:12px;right:13px;font:500 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.era-thread button>strong{font:600 17px/1.04 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.86);text-wrap:balance}.era-thread button>i{position:absolute;bottom:-7px;left:50%;width:13px;height:13px;border:1px solid rgba(var(--theme-accent-rgb),.48);background:rgb(var(--theme-surface-rgb));transform:translateX(-50%) rotate(45deg)}
.era-reader{scroll-margin-top:28px;max-width:720px;margin:58px auto 0;padding:0 35px}.era-reader>header{position:relative;padding:0 0 31px;text-align:center;border-bottom:1px solid rgba(var(--theme-accent-rgb),.14)}.era-reader>header::after{content:'';position:absolute;bottom:-1px;left:50%;width:78px;height:1px;transform:translateX(-50%);background:rgba(var(--theme-accent-strong-rgb),.68)}.era-reader>header>span{font:500 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.58)}.era-reader h2{margin:12px 0 0;font:600 clamp(36px,5vw,54px)/.96 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);text-wrap:balance}.era-reader__body{padding:42px 0 20px}.era-reader__body>p{margin:0 0 1.35em;font:400 20px/1.66 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.78);text-wrap:pretty}.era-reader__body>p:first-child::first-letter{float:left;margin:.08em .13em 0 0;font:600 4em/.72 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.88)}.era-reader blockquote{position:relative;margin:30px 0;padding:31px 42px;border-block:1px solid rgba(var(--theme-accent-rgb),.16);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.032),transparent);text-align:center}.era-reader blockquote>i{position:absolute;top:-6px;left:50%;width:11px;height:11px;border:1px solid rgba(var(--theme-accent-rgb),.42);background:rgb(var(--theme-surface-rgb));transform:translateX(-50%) rotate(45deg)}.era-reader blockquote p{margin:0;font:italic 18px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.74)}.era-reader__empty{text-align:center;font-style:italic;color:rgba(var(--theme-text-rgb),.42)!important}.era-reader__switcher{display:grid;margin-top:37px;padding-top:22px;grid-template-columns:1fr auto 1fr;align-items:center;border-top:1px solid rgba(var(--theme-accent-rgb),.12)}.era-reader__switcher button{border:0;background:none;padding:10px 0;color:rgba(var(--theme-accent-strong-rgb),.68);font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;cursor:pointer}.era-reader__switcher button:last-child{text-align:right}.era-reader__switcher button:disabled{opacity:.18;cursor:default}.era-reader__switcher div{display:flex;align-items:center;gap:10px;color:rgba(var(--theme-text-rgb),.28);font:500 6px/1 'Hanken Grotesk',sans-serif}.era-reader__switcher div i{width:22px;height:1px;background:rgba(var(--theme-accent-rgb),.25)}
.era-pagination{display:grid;max-width:920px;margin:62px auto 0;padding:26px 32px 0;grid-template-columns:1fr 1fr;border-top:1px solid rgba(var(--theme-accent-rgb),.12)}.era-pagination a{text-decoration:none;color:rgba(var(--theme-heading-rgb),.64);font:600 19px/1 'Cormorant Garamond',serif}.era-pagination a:last-child{text-align:right}.era-pagination a:hover{color:rgba(var(--theme-heading-rgb),.95)}
@media(max-width:760px){.era-page{padding-bottom:66px}.era-page__header{padding:19px 20px}.era-page__header>span{display:none}.era-heading{margin-top:43px;padding:0 24px;flex-direction:column;gap:27px;text-align:center}.era-heading__knot{width:50px;height:50px}.era-heading h1{font-size:45px}.era-thread{margin-top:45px;padding:29px 15px;gap:15px 11px}.era-thread button{width:calc(50% - 6px);min-height:105px;padding:20px 12px}.era-thread button>strong{font-size:16px}.era-reader{margin-top:42px;padding:0 22px}.era-reader__body{padding-top:34px}.era-reader__body>p{font-size:19px;line-height:1.62}.era-reader blockquote{margin:26px -2px;padding:27px 14px}.era-reader blockquote p{font-size:17px}.era-reader__switcher{gap:10px}.era-pagination{margin:48px 20px 0;padding:23px 0 0;gap:14px}.era-pagination a{font-size:16px}}
</style>
