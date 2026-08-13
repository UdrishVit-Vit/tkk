<script setup>
const props = defineProps({
  section: { type: Object, required: true },
  entry: { type: Object, required: true },
  entries: { type: Array, required: true },
  eraIndex: { type: Number, required: true },
  entryIndex: { type: Number, required: true },
})

const previous = computed(() => props.entries[props.entryIndex - 1] || null)
const next = computed(() => props.entries[props.entryIndex + 1] || null)
const pageRoot = ref(null)
let touchStartX = 0
let touchStartY = 0
let navigationLocked = false

const entryUrl = entry => `/lore/history/${props.section.slug}/${entry.slug}`

function move(direction) {
  if (navigationLocked) return
  const target = direction > 0 ? next.value : previous.value
  if (target) {
    navigationLocked = true
    navigateTo(entryUrl(target))
  }
}

function onTouchStart(event) {
  touchStartX = event.changedTouches[0]?.clientX || 0
  touchStartY = event.changedTouches[0]?.clientY || 0
}

function onTouchEnd(event) {
  const x = event.changedTouches[0]?.clientX || 0
  const y = event.changedTouches[0]?.clientY || 0
  const dx = x - touchStartX
  const dy = y - touchStartY
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) move(dx < 0 ? 1 : -1)
}

watch(() => props.entry.slug, () => { navigationLocked = false })
</script>

<template>
  <main ref="pageRoot" class="entry-page" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
    <div class="entry-page__texture" aria-hidden="true" />

    <header class="entry-header">
      <NuxtLink :to="`/lore/history/${section.slug}`"><span aria-hidden="true">←</span> {{ section.title }}</NuxtLink>
      <div class="entry-header__progress">
        <i :style="{ '--progress': `${((entryIndex + 1) / entries.length) * 100}%` }" />
        <span>{{ String(entryIndex + 1).padStart(2, '0') }} / {{ String(entries.length).padStart(2, '0') }}</span>
      </div>
      <NuxtLink to="/lore/history">все эпохи</NuxtLink>
    </header>

    <button v-if="previous" type="button" class="entry-edge entry-edge--previous" :aria-label="`Предыдущая глава: ${previous.title}`" @click="move(-1)">
      <span aria-hidden="true">←</span><small>{{ previous.title }}</small>
    </button>
    <button v-if="next" type="button" class="entry-edge entry-edge--next" :aria-label="`Следующая глава: ${next.title}`" @click="move(1)">
      <small>{{ next.title }}</small><span aria-hidden="true">→</span>
    </button>

    <div class="entry-layout">
      <aside class="entry-toc" aria-label="Главы эпохи">
        <div class="entry-toc__heading">
          <span>Полотно эпохи</span>
          <strong>{{ section.title }}</strong>
        </div>
        <nav>
          <NuxtLink
            v-for="(item, index) in entries"
            :key="item.slug"
            :to="entryUrl(item)"
            :class="{ 'is-current': index === entryIndex }"
            :aria-current="index === entryIndex ? 'page' : undefined"
          >
            <span>{{ eraIndex }}.{{ index + 1 }}</span>
            <b>{{ item.title }}</b>
          </NuxtLink>
        </nav>
      </aside>

      <article class="entry-article">
        <header class="entry-hero">
          <div class="entry-hero__knot" aria-hidden="true"><span>{{ eraIndex }}.{{ entryIndex + 1 }}</span></div>
          <p>{{ entry.kind === 'opening' ? 'Вступление эпохи' : `Глава ${entryIndex + 1}` }}</p>
          <h1>{{ entry.title }}</h1>
          <div class="entry-hero__meta"><i />{{ entry.readingMinutes }} мин. чтения <i /> {{ entry.wordCount }} слов<i /></div>
        </header>

        <div class="entry-article__body">
          <template v-for="(block, blockIndex) in entry.blocks" :key="blockIndex">
            <blockquote v-if="block.type === 'verse'" class="entry-verse">
              <i aria-hidden="true" />
              <p v-for="line in block.paragraphs" :key="line">{{ line }}</p>
            </blockquote>
            <template v-else>
              <p v-for="paragraph in block.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </template>
          </template>
        </div>

        <footer class="entry-article__end">
          <span aria-hidden="true"><i /><i /><i /></span>
          <p>Конец записи {{ eraIndex }}.{{ entryIndex + 1 }}</p>
        </footer>
      </article>

      <aside class="entry-aside" aria-hidden="true">
        <span>Архив Башни Мафраш</span>
        <div><i /><i /><i /></div>
        <strong>{{ String(eraIndex).padStart(2, '0') }}</strong>
      </aside>
    </div>

    <nav class="entry-pagination" aria-label="Навигация между главами">
      <NuxtLink v-if="previous" :to="entryUrl(previous)">
        <span>← предыдущая запись</span><strong>{{ previous.title }}</strong>
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="next" :to="entryUrl(next)" class="entry-pagination__next">
        <span>следующая запись →</span><strong>{{ next.title }}</strong>
      </NuxtLink>
      <NuxtLink v-else :to="`/lore/history/${section.slug}`" class="entry-pagination__next">
        <span>вернуться к эпохе →</span><strong>{{ section.title }}</strong>
      </NuxtLink>
    </nav>

    <p class="entry-swipe-hint">Листайте главы горизонтальным свайпом</p>
  </main>
</template>

<style scoped>
.entry-page{position:relative;min-height:100vh;overflow:hidden;color:rgba(var(--theme-text-rgb),.88);background:var(--theme-page-bg);isolation:isolate}.entry-page__texture{position:fixed;inset:0;z-index:-1;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.016) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.012) 0 1px,transparent 1px 4px),radial-gradient(ellipse 52% 28% at 50% 0,rgba(var(--theme-accent-rgb),.1),transparent 72%)}
.entry-header{position:relative;z-index:5;display:grid;max-width:1200px;margin:auto;padding:28px 44px;grid-template-columns:1fr 250px 1fr;align-items:center;border-bottom:1px solid rgba(var(--theme-accent-rgb),.1);font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase}.entry-header>a{color:rgba(var(--theme-text-rgb),.48);text-decoration:none;transition:color .2s}.entry-header>a:last-child{text-align:right}.entry-header>a:hover{color:rgba(var(--theme-accent-strong-rgb),.9)}.entry-header>a span{margin-right:8px;color:rgba(var(--theme-accent-rgb),.7)}.entry-header__progress{display:flex;align-items:center;gap:12px;color:rgba(var(--theme-text-rgb),.34)}.entry-header__progress i{position:relative;display:block;width:180px;height:1px;background:rgba(var(--theme-accent-rgb),.14)}.entry-header__progress i::after{content:'';position:absolute;left:0;top:0;width:var(--progress);height:1px;background:rgba(var(--theme-accent-strong-rgb),.7);box-shadow:0 0 7px rgba(var(--theme-accent-rgb),.24)}
.entry-layout{display:grid;max-width:1160px;margin:0 auto;padding:68px 42px 54px;grid-template-columns:minmax(0,650px) 220px 120px;justify-content:center;align-items:start;gap:48px}.entry-toc{position:sticky;top:34px;grid-column:2;max-height:calc(100vh - 68px);overflow-y:auto;overflow-x:hidden;padding:18px 0 20px 20px;border-left:1px solid rgba(var(--theme-accent-rgb),.13);scrollbar-color:rgba(var(--theme-accent-rgb),.42) transparent;scrollbar-width:thin}.entry-toc__heading{padding:0 14px 16px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.12)}.entry-toc__heading span{font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.23em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}.entry-toc__heading strong{display:block;margin-top:7px;font:600 18px/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.76)}.entry-toc nav{display:flex;margin-top:10px;flex-direction:column}.entry-toc nav a{display:grid;padding:9px 12px;grid-template-columns:29px 1fr;align-items:start;text-decoration:none;color:rgba(var(--theme-text-rgb),.36);transition:color .2s,background .2s}.entry-toc nav a:hover{color:rgba(var(--theme-text-rgb),.7)}.entry-toc nav a.is-current{color:rgba(var(--theme-heading-rgb),.9);background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.1),transparent)}.entry-toc nav a span{font:500 6px/1.4 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.55)}.entry-toc nav a b{font:500 13px/1.12 'Cormorant Garamond',serif}
.entry-article{grid-column:1;grid-row:1;min-width:0}.entry-hero{position:relative;padding:30px 25px 45px;text-align:center;border-bottom:1px solid rgba(var(--theme-accent-rgb),.16)}.entry-hero::after{content:'';position:absolute;bottom:-1px;left:50%;width:84px;height:1px;transform:translateX(-50%);background:rgba(var(--theme-accent-strong-rgb),.72)}.entry-hero__knot{display:grid;width:58px;height:58px;margin:0 auto 34px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.5);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 0 7px rgba(var(--theme-surface-rgb),.45),0 0 28px rgba(var(--theme-accent-rgb),.15);transform:rotate(45deg)}.entry-hero__knot::before{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.18)}.entry-hero__knot span{transform:rotate(-45deg);font:500 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.72)}.entry-hero>p{margin:0;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.72)}.entry-hero h1{margin:14px auto 0;font:600 clamp(42px,5vw,66px)/.92 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance}.entry-hero__meta{display:flex;align-items:center;justify-content:center;gap:11px;margin-top:22px;font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.3)}.entry-hero__meta i{width:24px;height:1px;background:rgba(var(--theme-accent-rgb),.24)}
.entry-article__body{padding:48px 10px 20px}.entry-article__body>p{margin:0 0 1.35em;font:400 20px/1.66 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.78);text-wrap:pretty}.entry-article__body>p:first-child::first-letter{float:left;margin:.08em .13em 0 0;font:600 4.3em/.72 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.88);text-shadow:0 0 20px rgba(var(--theme-accent-rgb),.13)}.entry-verse{position:relative;margin:32px 0;padding:31px 42px 30px;border-block:1px solid rgba(var(--theme-accent-rgb),.16);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.032),transparent);text-align:center}.entry-verse i{position:absolute;top:-6px;left:50%;width:11px;height:11px;border:1px solid rgba(var(--theme-accent-rgb),.42);background:rgb(var(--theme-surface-rgb));transform:translateX(-50%) rotate(45deg)}.entry-verse p{margin:0;font:italic 18px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.74)}
.entry-article__end{margin-top:34px;padding-top:28px;text-align:center;border-top:1px solid rgba(var(--theme-accent-rgb),.1)}.entry-article__end>span{display:flex;align-items:center;justify-content:center;gap:7px}.entry-article__end i{display:block;width:8px;height:8px;border:1px solid rgba(var(--theme-accent-rgb),.36);transform:rotate(45deg)}.entry-article__end i:nth-child(2){width:13px;height:13px}.entry-article__end p{margin:15px 0 0;font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.24em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.25)}
.entry-aside{position:sticky;top:52px;grid-column:3;display:flex;min-height:310px;align-items:center;flex-direction:column;gap:20px}.entry-aside>span{font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase;writing-mode:vertical-rl;color:rgba(var(--theme-text-rgb),.2)}.entry-aside div{position:relative;width:1px;height:150px;background:rgba(var(--theme-accent-rgb),.25)}.entry-aside div i{position:absolute;left:50%;width:8px;height:8px;border:1px solid rgba(var(--theme-accent-rgb),.34);background:rgb(var(--theme-surface-rgb));transform:translateX(-50%) rotate(45deg)}.entry-aside div i:first-child{top:0}.entry-aside div i:nth-child(2){top:48%}.entry-aside div i:last-child{bottom:0}.entry-aside strong{font:500 8px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-rgb),.38)}
.entry-edge{position:fixed;z-index:4;top:50%;display:flex;align-items:center;gap:10px;border:0;background:none;padding:14px;color:rgba(var(--theme-text-rgb),.24);cursor:pointer;transition:color .2s,transform .2s}.entry-edge:hover{color:rgba(var(--theme-accent-strong-rgb),.8)}.entry-edge small{max-width:95px;font:500 7px/1.3 'Hanken Grotesk',sans-serif;letter-spacing:.12em;text-transform:uppercase}.entry-edge>span{font-size:16px;color:rgba(var(--theme-accent-rgb),.55)}.entry-edge--previous{left:76px}.entry-edge--previous:hover{transform:translateX(-4px)}.entry-edge--next{right:10px;text-align:right}.entry-edge--next:hover{transform:translateX(4px)}
.entry-pagination{display:grid;max-width:650px;margin:0 auto 48px;padding:27px 0 0;grid-template-columns:1fr 1fr;border-top:1px solid rgba(var(--theme-accent-rgb),.13)}.entry-pagination a{display:flex;flex-direction:column;text-decoration:none;color:inherit}.entry-pagination__next{align-items:flex-end;text-align:right}.entry-pagination a span{font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.19em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.6)}.entry-pagination a strong{margin-top:8px;font:600 20px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.76);transition:color .2s}.entry-pagination a:hover strong{color:rgba(var(--theme-heading-rgb),1)}.entry-swipe-hint{display:none}
@media(max-width:1080px){.entry-layout{grid-template-columns:minmax(0,650px) 190px;gap:34px}.entry-toc{grid-column:2}.entry-article{grid-column:1}.entry-aside{display:none}.entry-edge{display:none}}
@media(max-width:760px){.entry-page{padding-bottom:56px}.entry-header{padding:18px 20px;grid-template-columns:1fr auto}.entry-header>a:last-child{display:none}.entry-header__progress{justify-content:flex-end}.entry-header__progress i{width:74px}.entry-layout{display:block;padding:34px 20px 36px}.entry-toc{position:static;display:none}.entry-hero{padding:20px 4px 34px}.entry-hero__knot{width:48px;height:48px;margin-bottom:28px}.entry-hero h1{font-size:44px}.entry-article__body{padding:37px 2px 10px}.entry-article__body>p{font-size:19px;line-height:1.62}.entry-verse{margin:27px -2px;padding:27px 15px}.entry-verse p{font-size:17px}.entry-pagination{margin:0 20px 26px;gap:15px}.entry-pagination a strong{font-size:17px}.entry-swipe-hint{display:block;margin:0 0 36px;text-align:center;font:500 6px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.22)}}
@media(prefers-reduced-motion:reduce){.entry-edge,.entry-toc nav a{transition:none}}
</style>
