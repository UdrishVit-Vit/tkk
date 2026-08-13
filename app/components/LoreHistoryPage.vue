<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'

defineProps({
  theme: { type: Object, required: true },
})

defineEmits(['up'])

const chapterWord = count => {
  if (!count) return 'главная запись'
  if (count === 1) return '1 событие'
  if (count < 5) return `${count} события`
  return `${count} событий`
}
</script>

<template>
  <main class="lore-history" :style="{ background: theme.bg }">
    <div class="lore-history__texture" aria-hidden="true" />

    <header class="lore-history__header">
      <button type="button" class="lore-history__back" @click="$emit('up')">
        <span aria-hidden="true">←</span> к карте Lore
      </button>
      <div class="lore-history__index">Летопись · семь эпох</div>
    </header>

    <section class="lore-history__intro" aria-labelledby="history-title">
      <div class="lore-history__sigil" aria-hidden="true"><span /><span /><i /></div>
      <div>
        <p class="lore-history__eyebrow">{{ HISTORY_THREAD.eyebrow }}</p>
        <h1 id="history-title">{{ HISTORY_THREAD.title }}</h1>
        <p class="lore-history__lead">{{ HISTORY_THREAD.lead }}</p>
      </div>
      <aside class="lore-history__note">
        <span>Архив Башни</span>
        <p>{{ HISTORY_THREAD.archiveNote }}</p>
      </aside>
    </section>

    <section class="history-map" aria-label="Семь эпох истории Эноа">
      <div class="history-map__spine" aria-hidden="true">
        <span /><span /><span />
      </div>

      <article
        v-for="(section, index) in HISTORY_THREAD.sections"
        :key="section.slug"
        class="history-era"
        :class="index % 2 ? 'history-era--right' : 'history-era--left'"
      >
        <div class="history-era__branch" aria-hidden="true"><span /></div>
        <div class="history-era__knot" aria-hidden="true">
          <span>{{ String(index).padStart(2, '0') }}</span>
        </div>

        <NuxtLink class="history-era__card" :to="`/lore/history/${section.slug}`">
          <span class="history-era__index">{{ String(index).padStart(2, '0') }}</span>
          <span class="history-era__label">{{ section.label }}</span>
          <strong>{{ section.title }}</strong>
          <p>{{ section.summary }}</p>
          <span class="history-era__meta">
            <i aria-hidden="true" /> {{ chapterWord(section.chapters.length) }}
            <b>Открыть эпоху <span aria-hidden="true">→</span></b>
          </span>
          <span class="history-era__stitch" aria-hidden="true" />
        </NuxtLink>
      </article>

      <div class="history-map__end" aria-hidden="true"><i /><span>нить продолжается</span></div>
    </section>

    <footer class="lore-history__footer">
      <span>Семь эпох · одно полотно</span>
      <button type="button" @click="$emit('up')">Вернуться к карте Lore →</button>
    </footer>
  </main>
</template>

<style scoped>
.lore-history{position:absolute;inset:0 0 0 68px;z-index:58;overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain;scrollbar-gutter:stable;scrollbar-color:rgba(var(--theme-accent-rgb),.48) rgba(var(--theme-surface-rgb),.65);scrollbar-width:thin;touch-action:pan-y;color:rgba(var(--theme-text-rgb),.9);isolation:isolate}
.lore-history::-webkit-scrollbar{width:10px}.lore-history::-webkit-scrollbar-track{background:rgba(var(--theme-surface-rgb),.7);border-left:1px solid rgba(var(--theme-accent-rgb),.08)}.lore-history::-webkit-scrollbar-thumb{border:2px solid rgba(var(--theme-surface-rgb),.7);border-radius:8px;background:linear-gradient(rgba(var(--theme-accent-rgb),.3),rgba(var(--theme-accent-strong-rgb),.58),rgba(var(--theme-accent-rgb),.3))}.lore-history::-webkit-scrollbar-thumb:hover{background:rgba(var(--theme-accent-strong-rgb),.7)}
.lore-history__texture{position:fixed;inset:0 0 0 68px;z-index:-1;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.018) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 4px),radial-gradient(ellipse 60% 38% at 50% 5%,rgba(var(--theme-accent-rgb),.1),transparent 72%);opacity:.9}
.lore-history__header{display:flex;align-items:center;justify-content:space-between;max-width:1180px;margin:auto;padding:28px 42px 0}
.lore-history__back,.lore-history__footer button{border:0;background:none;padding:8px 0;color:rgba(var(--theme-text-rgb),.52);font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:color .2s ease}
.lore-history__back:hover,.lore-history__footer button:hover{color:rgba(var(--theme-accent-strong-rgb),.95)}
.lore-history__back span{margin-right:8px;color:rgba(var(--theme-accent-rgb),.8)}
.lore-history__index{font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.3)}
.lore-history__intro{display:grid;max-width:1120px;margin:34px auto 0;padding:0 42px;grid-template-columns:112px minmax(0,1fr) 280px;align-items:center;gap:34px}
.lore-history__sigil{position:relative;width:82px;height:82px;margin:auto}.lore-history__sigil span{position:absolute;inset:8px;border:1px solid rgba(var(--theme-accent-rgb),.45);transform:rotate(45deg)}.lore-history__sigil span:nth-child(2){inset:22px}.lore-history__sigil i{position:absolute;inset:33px;border:1px solid rgba(var(--theme-accent-strong-rgb),.74);border-radius:50%;box-shadow:0 0 20px rgba(var(--theme-accent-rgb),.2)}
.lore-history__eyebrow{margin:0 0 9px;font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.3em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.82)}
.lore-history h1{margin:0;font:500 clamp(42px,5vw,66px)/.9 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98)}
.lore-history__lead{max-width:570px;margin:15px 0 0;font:400 17px/1.45 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.66)}
.lore-history__note{padding:17px 20px;border-left:1px solid rgba(var(--theme-accent-rgb),.32);background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.035),transparent)}.lore-history__note span{font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.7)}.lore-history__note p{margin:8px 0 0;font:italic 14px/1.38 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.5)}
.history-map{position:relative;display:flex;max-width:1080px;margin:46px auto 0;padding:26px 42px 92px;flex-direction:column;gap:18px;isolation:isolate}
.history-map::before{content:'';position:absolute;inset:0 5px 50px;pointer-events:none;border:1px solid rgba(var(--theme-accent-rgb),.1);background:repeating-linear-gradient(45deg,transparent 0 13px,rgba(var(--theme-accent-rgb),.012) 13px 14px),linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.018) 48%,rgba(var(--theme-accent-rgb),.035) 50%,rgba(var(--theme-accent-rgb),.018) 52%,transparent);mask-image:linear-gradient(transparent,#000 4%,#000 94%,transparent)}
.history-map__spine{position:absolute;z-index:1;top:0;bottom:47px;left:50%;width:12px;transform:translateX(-50%);pointer-events:none}.history-map__spine span{position:absolute;top:0;bottom:0;width:1px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.62) 4%,rgba(var(--theme-accent-strong-rgb),.78) 50%,rgba(var(--theme-accent-rgb),.55) 96%,transparent);filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.3))}.history-map__spine span:nth-child(1){left:1px}.history-map__spine span:nth-child(2){left:6px;background:repeating-linear-gradient(to bottom,rgba(var(--theme-accent-strong-rgb),.86) 0 7px,transparent 7px 11px)}.history-map__spine span:nth-child(3){right:0}
.history-era{position:relative;z-index:2;display:grid;min-height:164px;grid-template-columns:minmax(0,1fr) 64px minmax(0,1fr);align-items:center}.history-era__card{position:relative;z-index:4;display:flex;min-height:154px;flex-direction:column;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.25);background:radial-gradient(circle at 20% 50%,rgba(var(--theme-accent-rgb),.05),transparent 48%),repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.012) 0 1px,transparent 1px 5px),rgb(var(--theme-surface-rgb));padding:22px 29px;text-decoration:none;color:inherit;cursor:pointer;box-shadow:0 15px 38px rgba(0,0,0,.17),0 0 0 5px rgba(var(--theme-surface-rgb),.28);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}.history-era--left .history-era__card{grid-column:1}.history-era--right .history-era__card{grid-column:3}.history-era__card::before{content:'';position:absolute;inset:7px;pointer-events:none;border:1px dashed rgba(var(--theme-accent-rgb),.12)}.history-era__card:hover,.history-era__card:focus-visible{transform:translateY(-3px);border-color:rgba(var(--theme-accent-rgb),.52);box-shadow:0 18px 46px rgba(0,0,0,.2),0 0 25px rgba(var(--theme-accent-rgb),.08);outline:none}
.history-era__index{position:absolute;right:22px;top:17px;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.15em;color:rgba(var(--theme-accent-strong-rgb),.58)}.history-era__label{font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.27em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.78)}.history-era__card strong{display:block;margin-top:7px;font:600 27px/.98 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96);text-wrap:balance}.history-era__card p{max-width:420px;margin:10px 0 0;font:400 14px/1.35 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.6)}
.history-era__meta{display:flex;align-items:center;justify-content:space-between;margin-top:14px;font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.32)}.history-era__meta i{width:17px;height:1px;margin-right:7px;background:rgba(var(--theme-accent-rgb),.5)}.history-era__meta b{margin-left:auto;color:rgba(var(--theme-accent-strong-rgb),.68);font-weight:500}.history-era__meta b span{display:inline-block;margin-left:5px;transition:transform .2s ease}.history-era__card:hover .history-era__meta b span{transform:translateX(4px)}
.history-era__stitch{position:absolute;top:15px;bottom:15px;width:1px;background:repeating-linear-gradient(to bottom,rgba(var(--theme-accent-rgb),.28) 0 3px,transparent 3px 7px)}.history-era--left .history-era__stitch{right:13px}.history-era--right .history-era__stitch{left:13px}
.history-era__branch{position:absolute;z-index:-1;left:50%;width:calc(50% - 16px);height:18px;border-block:1px solid rgba(var(--theme-accent-rgb),.22)}.history-era--left .history-era__branch{transform:translateX(-100%)}.history-era--right .history-era__branch{transform:none}.history-era__branch span{position:absolute;inset:5px 0;border-top:1px dashed rgba(var(--theme-accent-rgb),.22)}
.history-era__knot{position:absolute;z-index:3;left:50%;display:grid;width:38px;height:38px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.62);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 0 5px rgba(var(--theme-surface-rgb),.64),0 0 22px rgba(var(--theme-accent-rgb),.2);transform:translateX(-50%) rotate(45deg)}.history-era__knot::before{content:'';position:absolute;inset:5px;border:1px solid rgba(var(--theme-accent-rgb),.17)}.history-era__knot span{transform:rotate(-45deg);font:500 7px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.76)}
.history-map__end{position:absolute;z-index:3;left:50%;bottom:16px;display:flex;flex-direction:column;align-items:center;gap:9px;transform:translateX(-50%);font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.23em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.3)}.history-map__end i{width:12px;height:12px;border:1px solid rgba(var(--theme-accent-rgb),.5);background:rgb(var(--theme-surface-rgb));transform:rotate(45deg)}
.lore-history__footer{display:flex;align-items:center;justify-content:space-between;max-width:1080px;margin:auto;padding:24px 42px 42px;border-top:1px solid rgba(var(--theme-contrast-rgb),.06);font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.26em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.26)}
@media(max-width:820px){.lore-history{left:0;padding-bottom:56px}.lore-history__texture{left:0}.lore-history__header{padding:20px 20px 0}.lore-history__index{display:none}.lore-history__intro{margin-top:28px;padding:0 22px;grid-template-columns:60px minmax(0,1fr);gap:20px}.lore-history__sigil{width:52px;height:52px}.lore-history__sigil span{inset:6px}.lore-history__sigil span:nth-child(2){inset:16px}.lore-history__sigil i{inset:22px}.lore-history h1{font-size:42px}.lore-history__lead{font-size:15px}.lore-history__note{display:none}.history-map{margin-top:30px;padding:18px 18px 78px 64px;gap:16px}.history-map__spine{left:39px}.history-map::before{inset:0 4px 44px}.history-era{display:block;min-height:0}.history-era__card{min-height:148px;padding:22px 23px}.history-era--left .history-era__card,.history-era--right .history-era__card{grid-column:auto}.history-era__card strong{font-size:25px}.history-era__card p{font-size:13px}.history-era__knot{left:-25px;width:31px;height:31px}.history-era__branch{left:-25px;width:25px;height:12px;transform:none!important}.history-era__meta b{font-size:0}.history-era__meta b span{font-size:12px}.history-map__end{left:39px;align-items:flex-start;white-space:nowrap}.lore-history__footer{padding:22px 20px 28px}.lore-history__footer>span{display:none}}
@media(prefers-reduced-motion:reduce){.history-era__card{transition:none}}
</style>
