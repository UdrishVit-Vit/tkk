<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'

const props = defineProps({
  section: { type: Object, required: true },
  index: { type: Number, required: true },
})

const previous = computed(() => HISTORY_THREAD.sections[props.index - 1] || null)
const next = computed(() => HISTORY_THREAD.sections[props.index + 1] || null)
</script>

<template>
  <main class="era-page">
    <div class="era-page__texture" aria-hidden="true" />

    <header class="era-page__header">
      <NuxtLink to="/lore/history"><span aria-hidden="true">←</span> все эпохи</NuxtLink>
      <span>Башня Мафраш · запись {{ String(index).padStart(2, '0') }}</span>
    </header>

    <section class="era-hero">
      <div class="era-hero__thread" aria-hidden="true"><i /><i /><i /></div>
      <div class="era-hero__number"><span>{{ String(index).padStart(2, '0') }}</span></div>
      <div class="era-hero__copy">
        <p>{{ section.label }}</p>
        <h1>{{ section.title }}</h1>
        <div class="era-hero__rule"><i /><span>{{ section.chapters.length || '∞' }}</span><i /></div>
        <p class="era-hero__summary">{{ section.summary }}</p>
      </div>
      <div class="era-hero__seal" aria-hidden="true"><span /><span /><i /></div>
    </section>

    <section class="era-chronicle" :class="{ 'era-chronicle--empty': !section.chapters.length }">
      <header>
        <div>
          <span>Внутреннее полотно эпохи</span>
          <h2>{{ section.chapters.length ? 'Нити событий' : 'Первая запись' }}</h2>
        </div>
        <p>{{ section.chapters.length ? `${section.chapters.length} связанных фрагментов` : 'Исток, из которого начинается следующая нить' }}</p>
      </header>

      <div v-if="section.chapters.length" class="era-chapters" role="list">
        <article v-for="(chapter, chapterIndex) in section.chapters" :key="chapter" role="listitem">
          <span>{{ index }}.{{ chapterIndex + 1 }}</span>
          <strong>{{ chapter }}</strong>
          <i aria-hidden="true" />
        </article>
      </div>

      <article v-else class="era-origin">
        <span>Основная запись</span>
        <strong>{{ section.title }}</strong>
        <p>{{ section.summary }}</p>
      </article>
    </section>

    <nav class="era-pagination" aria-label="Навигация между эпохами">
      <NuxtLink v-if="previous" :to="`/lore/history/${previous.slug}`" class="era-pagination__previous">
        <span>← предыдущая эпоха</span><strong>{{ previous.title }}</strong>
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="next" :to="`/lore/history/${next.slug}`" class="era-pagination__next">
        <span>следующая эпоха →</span><strong>{{ next.title }}</strong>
      </NuxtLink>
      <NuxtLink v-else to="/lore/history" class="era-pagination__next">
        <span>вернуться к полотну →</span><strong>Все эпохи</strong>
      </NuxtLink>
    </nav>
  </main>
</template>

<style scoped>
.era-page{position:relative;min-height:100vh;overflow:hidden;color:rgba(var(--theme-text-rgb),.9);background:var(--theme-page-bg);isolation:isolate}.era-page__texture{position:fixed;inset:0;z-index:-1;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.018) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 4px),radial-gradient(ellipse 70% 50% at 50% 0,rgba(var(--theme-accent-rgb),.1),transparent 70%)}
.era-page__header{display:flex;align-items:center;justify-content:space-between;max-width:1160px;margin:auto;padding:30px 42px;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.23em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.32)}.era-page__header a{color:rgba(var(--theme-text-rgb),.55);text-decoration:none;transition:color .2s}.era-page__header a:hover{color:rgba(var(--theme-accent-strong-rgb),.9)}.era-page__header a span{margin-right:8px;color:rgba(var(--theme-accent-rgb),.7)}
.era-hero{position:relative;display:grid;max-width:1080px;min-height:310px;margin:16px auto 0;padding:44px 66px;grid-template-columns:120px minmax(0,1fr) 150px;align-items:center;border-block:1px solid rgba(var(--theme-accent-rgb),.18);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.032) 18%,rgba(var(--theme-accent-rgb),.045) 50%,rgba(var(--theme-accent-rgb),.032) 82%,transparent)}.era-hero::before,.era-hero::after{content:'';position:absolute;top:28px;bottom:28px;width:1px;background:repeating-linear-gradient(to bottom,rgba(var(--theme-accent-rgb),.24) 0 4px,transparent 4px 9px)}.era-hero::before{left:19px}.era-hero::after{right:19px}
.era-hero__thread{position:absolute;left:0;right:0;top:50%;height:10px}.era-hero__thread i{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.35) 12%,rgba(var(--theme-accent-strong-rgb),.62) 50%,rgba(var(--theme-accent-rgb),.35) 88%,transparent)}.era-hero__thread i:nth-child(2){top:4px;opacity:.5}.era-hero__thread i:nth-child(3){top:8px;opacity:.25}
.era-hero__number{position:relative;z-index:1;display:grid;width:76px;height:76px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.52);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 0 8px rgba(var(--theme-surface-rgb),.58),0 0 32px rgba(var(--theme-accent-rgb),.16);transform:rotate(45deg)}.era-hero__number::before{content:'';position:absolute;inset:8px;border:1px dashed rgba(var(--theme-accent-rgb),.2)}.era-hero__number span{transform:rotate(-45deg);font:500 10px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.8)}
.era-hero__copy{position:relative;z-index:1;text-align:center}.era-hero__copy>p:first-child{margin:0;font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.31em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.82)}.era-hero h1{margin:12px 0 0;font:600 clamp(43px,6vw,70px)/.9 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance}.era-hero__summary{max-width:600px;margin:18px auto 0;font:400 18px/1.45 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.65)}.era-hero__rule{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:18px}.era-hero__rule i{width:42px;height:1px;background:rgba(var(--theme-accent-rgb),.3)}.era-hero__rule span{font:500 8px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.7)}
.era-hero__seal{position:relative;width:96px;height:96px;margin-left:auto}.era-hero__seal span{position:absolute;inset:8px;border:1px solid rgba(var(--theme-accent-rgb),.24);transform:rotate(45deg)}.era-hero__seal span:nth-child(2){inset:24px}.era-hero__seal i{position:absolute;inset:40px;border:1px solid rgba(var(--theme-accent-rgb),.55);border-radius:50%}
.era-chronicle{max-width:1080px;margin:42px auto 0;padding:0 42px 48px}.era-chronicle>header{display:flex;align-items:end;justify-content:space-between;padding-bottom:18px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.18)}.era-chronicle>header span{font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.68)}.era-chronicle h2{margin:8px 0 0;font:600 34px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.94)}.era-chronicle>header p{margin:0;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.28)}
.era-chapters{position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-top:25px}.era-chapters::before{content:'';position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(var(--theme-accent-rgb),.18)}.era-chapters article{position:relative;display:flex;min-height:142px;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.22);background:repeating-linear-gradient(45deg,rgba(var(--theme-accent-rgb),.012) 0 1px,transparent 1px 7px),rgb(var(--theme-surface-rgb));padding:26px 20px;text-align:center;box-shadow:0 12px 30px rgba(0,0,0,.14)}.era-chapters article::before{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.11)}.era-chapters article span{position:absolute;top:14px;right:15px;font:500 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.5)}.era-chapters article strong{position:relative;z-index:1;font:600 20px/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.9);text-wrap:balance}.era-chapters article i{position:absolute;left:50%;bottom:-7px;width:13px;height:13px;border:1px solid rgba(var(--theme-accent-rgb),.45);background:rgb(var(--theme-surface-rgb));transform:translateX(-50%) rotate(45deg)}
.era-origin{max-width:680px;margin:26px auto 0;padding:34px 42px;border:1px solid rgba(var(--theme-accent-rgb),.22);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.035),transparent);text-align:center}.era-origin span{font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.24em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.68)}.era-origin strong{display:block;margin-top:10px;font:600 28px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.94)}.era-origin p{margin:12px 0 0;font:400 16px/1.45 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.58)}
.era-pagination{display:grid;max-width:996px;margin:0 auto 54px;padding-top:25px;grid-template-columns:1fr 1fr;border-top:1px solid rgba(var(--theme-accent-rgb),.12)}.era-pagination a{display:flex;flex-direction:column;text-decoration:none;color:inherit}.era-pagination__next{align-items:flex-end;text-align:right}.era-pagination a span{font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.21em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}.era-pagination a strong{margin-top:8px;font:600 21px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.76);transition:color .2s}.era-pagination a:hover strong{color:rgba(var(--theme-heading-rgb),1)}
@media(max-width:760px){.era-page{padding-bottom:56px}.era-page__header{padding:20px 20px}.era-page__header>span{display:none}.era-hero{margin-top:6px;padding:38px 23px 38px;grid-template-columns:1fr;text-align:center}.era-hero__number{width:54px;height:54px;margin:0 auto 28px}.era-hero__seal{display:none}.era-hero h1{font-size:43px}.era-hero__summary{font-size:16px}.era-chronicle{margin-top:30px;padding:0 20px 38px}.era-chronicle>header{display:block}.era-chronicle>header p{margin-top:10px}.era-chapters{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.era-chapters article{min-height:132px;padding:22px 12px}.era-chapters article strong{font-size:17px}.era-origin{padding:28px 22px}.era-pagination{margin:0 20px 36px;gap:18px}.era-pagination a strong{font-size:17px}}
</style>
