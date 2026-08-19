<script setup>
import { TALES_THREAD, TALES_CONTENT } from '~/data/loreTales.js'

const props = defineProps({
  section: { type: Object, required: true },
  content: { type: Object, required: true },
  index: { type: Number, required: true },
})

const route = useRoute()
const router = useRouter()
const activeSlug = ref('')
const stage = ref(null)
const transitionName = ref('page-forward')
const routeIsChanging = ref(false)
let swipeStartX = 0
let swipeStartY = 0
let swipeIsActive = false

const chapters = computed(() => props.content?.chapters || [])
const hasIntro = computed(() => Boolean(props.content?.intro?.length))
const activeChapter = computed(() => chapters.value.find(chapter => chapter.slug === activeSlug.value) || null)
const activeBlocks = computed(() => activeChapter.value?.blocks || props.content?.intro || [])
const activeTitle = computed(() => activeChapter.value?.title || props.section.title)
const activePosition = computed(() => activeChapter.value ? chapters.value.findIndex(chapter => chapter.slug === activeChapter.value.slug) + 1 : 0)
const activeStep = computed(() => activeChapter.value ? activePosition.value - 1 + (hasIntro.value ? 1 : 0) : 0)
const totalSteps = computed(() => Math.max(1, chapters.value.length + (hasIntro.value ? 1 : 0)))
const sceneKey = computed(() => `${props.section.slug}:${activeSlug.value || 'intro'}`)

function statesForCat(catIndex) {
  const section = TALES_THREAD.sections[catIndex]
  const content = TALES_CONTENT.categories?.[catIndex]
  if (!section || !content) return []

  const states = []
  if (content.intro?.length || !content.chapters?.length) {
    states.push({ catIndex, stateIndex: 0, title: section.title, slug: '', path: `/lore/tales/${section.slug}` })
  }
  for (const chapter of content.chapters || []) {
    states.push({
      catIndex,
      stateIndex: states.length,
      title: chapter.title,
      slug: chapter.slug,
      path: `/lore/tales/${section.slug}`,
    })
  }
  return states
}

const currentStates = computed(() => statesForCat(props.index))
const currentStateIndex = computed(() => {
  const found = currentStates.value.findIndex(item => item.slug === activeSlug.value)
  return found < 0 ? 0 : found
})

const previousTarget = computed(() => {
  if (currentStateIndex.value > 0) return currentStates.value[currentStateIndex.value - 1]
  const previousStates = statesForCat(props.index - 1)
  return previousStates.at(-1) || null
})

const nextTarget = computed(() => {
  if (currentStateIndex.value < currentStates.value.length - 1) return currentStates.value[currentStateIndex.value + 1]
  return statesForCat(props.index + 1)[0] || null
})

function targetLocation(target) {
  return target.slug ? { path: target.path, query: { chapter: target.slug } } : { path: target.path }
}

async function restoreViewport(scrollTop) {
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(resolve))
  await new Promise(resolve => requestAnimationFrame(resolve))
  window.scrollTo({ top: scrollTop, behavior: 'instant' })
}

async function goToTarget(target, direction) {
  if (!target || routeIsChanging.value) return
  transitionName.value = direction > 0 ? 'page-forward' : 'page-backward'
  const scrollTop = window.scrollY

  if (target.catIndex === props.index) {
    activeSlug.value = target.slug
    await router.replace(targetLocation(target))
    await restoreViewport(scrollTop)
    return
  }

  routeIsChanging.value = true
  await new Promise(resolve => setTimeout(resolve, 180))
  await router.push(targetLocation(target))
}

function selectChapter(slug) {
  const target = currentStates.value.find(item => item.slug === slug)
  if (!target) return
  goToTarget(target, target.stateIndex >= currentStateIndex.value ? 1 : -1)
}

function startSwipe(event) {
  if (!stage.value?.contains(event.target)) return
  const point = event.touches?.[0] || event
  swipeStartX = point.clientX || 0
  swipeStartY = point.clientY || 0
  swipeIsActive = true
}

function finishSwipe(event) {
  if (!swipeIsActive) return
  swipeIsActive = false
  const point = event.changedTouches?.[0] || event
  const deltaX = point.clientX - swipeStartX
  const deltaY = point.clientY - swipeStartY
  if (Math.abs(deltaX) < 64 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return
  if (deltaX < 0) goToTarget(nextTarget.value, 1)
  else goToTarget(previousTarget.value, -1)
}

function cancelSwipe() {
  swipeIsActive = false
}

function handleKeyboard(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  if (event.key === 'ArrowLeft' && previousTarget.value) goToTarget(previousTarget.value, -1)
  if (event.key === 'ArrowRight' && nextTarget.value) goToTarget(nextTarget.value, 1)
}

watch([() => route.fullPath, chapters, hasIntro], () => {
  const value = route.query.chapter
  const requested = chapters.value.some(chapter => chapter.slug === value) ? String(value) : ''
  activeSlug.value = requested || (!hasIntro.value && chapters.value.length ? chapters.value[0].slug : '')
  routeIsChanging.value = false
}, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', handleKeyboard)
  window.addEventListener('pointerdown', startSwipe)
  window.addEventListener('pointerup', finishSwipe)
  window.addEventListener('pointercancel', cancelSwipe)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboard)
  window.removeEventListener('pointerdown', startSwipe)
  window.removeEventListener('pointerup', finishSwipe)
  window.removeEventListener('pointercancel', cancelSwipe)
})
</script>

<template>
  <main class="era-page">
    <div class="era-page__texture" aria-hidden="true" />
    <section class="era-heading">
      <NuxtLink
        to="/lore/tales"
        class="era-heading__knot"
        aria-label="Вернуться к сказаниям"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
      </NuxtLink>
      <h1>{{ section.title }}</h1>
    </section>

    <nav v-if="chapters.length" class="era-thread" aria-label="Части сказания">
      <div class="era-thread__line" aria-hidden="true"><i /><i /><i /></div>
      <button
        v-for="(chapter, chapterIndex) in chapters"
        :key="chapter.slug"
        type="button"
        :class="{ 'is-active': activeSlug === chapter.slug }"
        @click="selectChapter(chapter.slug)"
      >
        <span>{{ index + 1 }}.{{ chapterIndex + 1 }}</span>
        <strong>{{ chapter.title }}</strong>
        <i aria-hidden="true" />
      </button>
    </nav>

    <section
      ref="stage"
      class="era-stage"
      :class="{ 'is-changing': routeIsChanging }"
      aria-label="Читательское полотно"
    >
      <button
        v-if="previousTarget"
        type="button"
        class="era-direction era-direction--previous"
        :aria-label="`Перейти назад: ${previousTarget.title}`"
        @click="goToTarget(previousTarget, -1)"
      >
        <span class="era-direction__arrow" aria-hidden="true"><i /><b><em>‹</em></b></span>
        <small>Назад</small>
        <strong>{{ previousTarget.title }}</strong>
      </button>
      <div v-else class="era-direction-placeholder" />

      <article class="era-reader">
        <Transition :name="transitionName" mode="out-in">
          <div :key="sceneKey" class="era-reader__scene">
            <header v-if="activeChapter">
              <span>{{ index + 1 }}.{{ activePosition }}</span>
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
              <p v-if="!activeBlocks.length" class="era-reader__empty">Текст этого сказания ещё не внесён в архив.</p>
            </div>

            <p class="era-reader__source">
              Вольный пересказ по мотивам сборника «Сказания» (House of Lamb, 2024) — фанатской книги легенд Виталия Демуры из подкаста «Эхо Эноа».
            </p>
          </div>
        </Transition>

        <footer class="era-reader__progress" aria-label="Положение в разделе">
          <i />
          <span>{{ activeStep + 1 }} / {{ totalSteps }}</span>
          <i />
        </footer>
      </article>

      <button
        v-if="nextTarget"
        type="button"
        class="era-direction era-direction--next"
        :aria-label="`Перейти дальше: ${nextTarget.title}`"
        @click="goToTarget(nextTarget, 1)"
      >
        <span class="era-direction__arrow" aria-hidden="true"><i /><b><em>›</em></b></span>
        <small>Далее</small>
        <strong>{{ nextTarget.title }}</strong>
      </button>
      <div v-else class="era-direction-placeholder" />

      <p class="era-stage__swipe"><span aria-hidden="true">←</span> Листайте нить <span aria-hidden="true">→</span></p>
    </section>
  </main>
</template>

<style scoped>
.era-page{position:relative;min-height:100vh;padding-bottom:70px;overflow:hidden;color:rgba(var(--theme-text-rgb),.88);background:var(--theme-page-bg);isolation:isolate}.era-page__texture{position:fixed;inset:0;z-index:-1;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.016) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.012) 0 1px,transparent 1px 4px),radial-gradient(ellipse 68% 34% at 50% 0,rgba(var(--theme-accent-rgb),.1),transparent 74%)}
.era-heading{position:relative;display:flex;min-height:154px;padding:30px 38px;align-items:center;justify-content:center;gap:34px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.14);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.03) 24%,rgba(var(--theme-accent-rgb),.055) 50%,rgba(var(--theme-accent-rgb),.03) 76%,transparent)}.era-heading::before,.era-heading::after{content:'';position:absolute;top:50%;width:min(18vw,240px);height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.38))}.era-heading::before{right:calc(50% + 310px)}.era-heading::after{left:calc(50% + 310px);transform:scaleX(-1)}.era-heading__knot{position:relative;display:grid;width:58px;height:58px;flex:0 0 auto;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.62);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 0 7px rgba(var(--theme-surface-rgb),.5),0 0 25px rgba(var(--theme-accent-rgb),.16);transform:rotate(45deg);text-decoration:none;cursor:pointer;transition:transform .3s cubic-bezier(.2,.8,.2,1),border-color .3s,box-shadow .3s}.era-heading__knot::before{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.25);transition:inset .3s,border-color .3s}.era-heading__knot::after{content:'';position:absolute;inset:-9px;border:1px solid rgba(var(--theme-accent-rgb),.18);opacity:0;transform:scale(.82);transition:opacity .3s,transform .3s}.era-heading__knot span{transform:rotate(-45deg);font:600 12px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.86)}.era-heading__knot:hover,.era-heading__knot:focus-visible{outline:none;border-color:rgba(var(--theme-accent-strong-rgb),.95);box-shadow:0 0 0 7px rgba(var(--theme-surface-rgb),.5),0 0 34px rgba(var(--theme-accent-rgb),.34);transform:rotate(45deg) scale(1.12)}.era-heading__knot:hover::before,.era-heading__knot:focus-visible::before{inset:5px;border-color:rgba(var(--theme-accent-strong-rgb),.55)}.era-heading__knot:hover::after,.era-heading__knot:focus-visible::after{opacity:1;transform:scale(1)}.era-heading__knot:active{transform:rotate(45deg) scale(1.03)}.era-heading h1{margin:0;font:600 clamp(43px,5.5vw,68px)/.92 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance}
.era-thread{position:relative;display:flex;max-width:1040px;margin:0 auto;padding:22px 28px;flex-wrap:wrap;justify-content:center;gap:18px 14px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.13);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.025) 18%,rgba(var(--theme-accent-rgb),.025) 82%,transparent)}.era-thread__line{position:absolute;z-index:0;top:50%;left:3%;right:3%;height:9px}.era-thread__line i{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.5) 8%,rgba(var(--theme-accent-strong-rgb),.68) 50%,rgba(var(--theme-accent-rgb),.5) 92%,transparent)}.era-thread__line i:nth-child(2){top:4px;opacity:.45}.era-thread__line i:nth-child(3){top:8px;opacity:.2}.era-thread button{position:relative;z-index:1;display:flex;width:148px;min-height:88px;align-items:center;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.24);background:repeating-linear-gradient(45deg,rgba(var(--theme-accent-rgb),.012) 0 1px,transparent 1px 7px),rgb(var(--theme-surface-rgb));padding:20px 15px;color:inherit;text-align:center;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.18),0 0 0 5px rgba(var(--theme-surface-rgb),.35);transition:transform .22s,border-color .22s,background .22s}.era-thread button:hover,.era-thread button:focus-visible,.era-thread button.is-active{transform:translateY(-4px);border-color:rgba(var(--theme-accent-rgb),.62);background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.08),transparent 70%),rgb(var(--theme-surface-rgb));outline:none}.era-thread button>span{position:absolute;top:10px;right:11px;font:500 6px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.5)}.era-thread button>strong{font:600 17px/1.04 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.86);text-wrap:balance}.era-thread button>i{position:absolute;bottom:-7px;left:50%;width:13px;height:13px;border:1px solid rgba(var(--theme-accent-rgb),.48);background:rgb(var(--theme-surface-rgb));transform:translateX(-50%) rotate(45deg)}
.era-stage{position:relative;display:grid;width:min(1260px,calc(100% - 48px));margin:34px auto 0;grid-template-columns:minmax(150px,230px) minmax(0,760px) minmax(150px,230px);align-items:start;justify-content:center;border-block:1px solid rgba(var(--theme-accent-rgb),.13);background:linear-gradient(90deg,transparent 0,rgba(var(--theme-accent-rgb),.025) 18%,rgba(var(--theme-accent-rgb),.04) 50%,rgba(var(--theme-accent-rgb),.025) 82%,transparent 100%);scroll-margin-top:18px;touch-action:pan-y}.era-stage::before{content:'';position:absolute;top:-1px;left:9%;right:9%;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-strong-rgb),.45),transparent)}.era-stage.is-changing .era-reader{opacity:0}
.era-reader{position:relative;min-height:380px;padding:45px 42px 29px;border-inline:1px solid rgba(var(--theme-accent-rgb),.12);background:linear-gradient(180deg,rgba(var(--theme-surface-rgb),.72),rgba(var(--theme-surface-rgb),.34));box-shadow:0 28px 65px rgba(0,0,0,.16);transition:opacity .18s,transform .18s}.era-reader::before,.era-reader::after{content:'';position:absolute;width:24px;height:24px;border-color:rgba(var(--theme-accent-rgb),.42)}.era-reader::before{top:16px;left:16px;border-top:1px solid;border-left:1px solid}.era-reader::after{right:16px;bottom:16px;border-right:1px solid;border-bottom:1px solid}.era-reader__scene>header{position:relative;padding:0 0 31px;text-align:center;border-bottom:1px solid rgba(var(--theme-accent-rgb),.14)}.era-reader__scene>header::after{content:'';position:absolute;bottom:-1px;left:50%;width:78px;height:1px;transform:translateX(-50%);background:rgba(var(--theme-accent-strong-rgb),.68)}.era-reader__scene>header>span{font:500 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.58)}.era-reader h2{margin:12px 0 0;font:600 clamp(36px,5vw,54px)/.96 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);text-wrap:balance}.era-reader__body{padding:34px 0 10px}.era-reader__body>p{margin:0 0 1.35em;font:400 20px/1.66 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.78);text-wrap:pretty}.era-reader__body>p:first-child::first-letter{float:left;margin:.08em .13em 0 0;font:600 4em/.72 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.88)}.era-reader blockquote{position:relative;margin:30px 0;padding:31px 42px;border-block:1px solid rgba(var(--theme-accent-rgb),.16);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.032),transparent);text-align:center}.era-reader blockquote>i{position:absolute;top:-6px;left:50%;width:11px;height:11px;border:1px solid rgba(var(--theme-accent-rgb),.42);background:rgb(var(--theme-surface-rgb));transform:translateX(-50%) rotate(45deg)}.era-reader blockquote p{margin:0;font:italic 18px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.74)}.era-reader__empty{text-align:center;font-style:italic;color:rgba(var(--theme-text-rgb),.42)!important}.era-reader__progress{display:flex;margin-top:25px;align-items:center;justify-content:center;gap:13px;color:rgba(var(--theme-text-rgb),.33);font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.15em}.era-reader__progress i{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.38))}.era-reader__progress i:last-child{transform:scaleX(-1)}
.era-reader__source{margin:26px 0 0;padding-top:18px;border-top:1px dashed rgba(var(--theme-accent-rgb),.2);font:italic 13px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.4);text-align:center}
.era-direction{position:sticky;top:31vh;display:grid;width:100%;min-height:170px;align-content:center;border:0;background:none;padding:28px 26px;color:inherit;cursor:pointer;text-align:left;transition:background .22s,color .22s}.era-direction--next{text-align:right}.era-direction:hover,.era-direction:focus-visible{outline:none;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.055),transparent)}.era-direction--next:hover,.era-direction--next:focus-visible{background:linear-gradient(-90deg,rgba(var(--theme-accent-rgb),.055),transparent)}.era-direction small{margin:12px 0 8px;font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.24em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.5)}.era-direction strong{font:600 clamp(17px,1.6vw,23px)/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.63);text-wrap:balance;transition:color .22s}.era-direction:hover strong,.era-direction:focus-visible strong{color:rgba(var(--theme-heading-rgb),.96)}.era-direction__arrow{position:relative;display:flex;width:100%;height:24px;align-items:center}.era-direction__arrow i{width:100%;height:1px;background:linear-gradient(90deg,rgba(var(--theme-accent-strong-rgb),.62),transparent)}.era-direction--next .era-direction__arrow i{background:linear-gradient(-90deg,rgba(var(--theme-accent-strong-rgb),.62),transparent)}.era-direction__arrow b{position:absolute;left:-2px;display:grid;width:24px;height:24px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.46);background:rgb(var(--theme-surface-rgb));color:rgba(var(--theme-accent-strong-rgb),.8);transform:rotate(45deg)}.era-direction__arrow b em{font:400 22px/1 'Cormorant Garamond',serif;font-style:normal;transform:rotate(-45deg)}.era-direction--next .era-direction__arrow b{right:-2px;left:auto}.era-direction-placeholder{min-height:1px}.era-stage__swipe{display:none}
.page-forward-enter-active,.page-forward-leave-active,.page-backward-enter-active,.page-backward-leave-active{transition:opacity .24s ease,filter .24s ease}.page-forward-enter-from,.page-forward-leave-to,.page-backward-enter-from,.page-backward-leave-to{opacity:0;filter:blur(1.5px)}
.era-reader blockquote p{white-space:pre-line}.era-reader blockquote p+p{margin-top:1.45em}
@media(max-width:900px){.era-stage{width:min(100% - 30px,780px);grid-template-columns:120px minmax(0,1fr) 120px}.era-direction{padding:24px 15px}.era-direction strong{font-size:17px}.era-reader{padding-inline:31px}}
@media(max-width:680px){.era-page{padding-bottom:48px}.era-heading{min-height:126px;padding:24px 20px;gap:25px;text-align:left}.era-heading::before,.era-heading::after{display:none}.era-heading__knot{width:48px;height:48px}.era-heading h1{font-size:42px}.era-thread{padding:20px 15px;gap:15px 11px}.era-thread button{width:calc(50% - 6px);min-height:88px;padding:18px 12px}.era-thread button>strong{font-size:16px}.era-stage{width:100%;margin-top:28px;padding:0 16px 17px;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(var(--theme-accent-rgb),.13)}.era-reader{grid-column:1/-1;grid-row:1;min-height:330px;padding:38px 22px 23px;border-inline:0;border-bottom:1px solid rgba(var(--theme-accent-rgb),.13)}.era-reader__body{padding-top:30px}.era-reader__body>p{font-size:19px;line-height:1.62}.era-reader blockquote{margin:26px -2px;padding:27px 14px}.era-reader blockquote p{font-size:17px}.era-direction,.era-direction-placeholder{position:relative;top:auto;grid-row:2;min-height:116px;padding:23px 9px 12px}.era-direction--previous{grid-column:1}.era-direction--next{grid-column:2}.era-direction small{margin:9px 0 6px}.era-direction strong{font-size:16px}.era-direction__arrow{height:18px}.era-direction__arrow b{width:19px;height:19px;font-size:18px}.era-stage__swipe{display:block;grid-column:1/-1;grid-row:3;margin:10px 0 0;text-align:center;font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.27)}.era-stage__swipe span{padding:0 8px;color:rgba(var(--theme-accent-rgb),.55)}}
@media(prefers-reduced-motion:reduce){.era-reader,.era-thread button,.era-heading__knot,.era-heading__knot::before,.era-heading__knot::after,.page-forward-enter-active,.page-forward-leave-active,.page-backward-enter-active,.page-backward-leave-active{transition:none!important}}
</style>
