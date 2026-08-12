<script setup>
import { HISTORY_THREAD } from '~/data/loreHistory.js'

defineProps({
  theme: { type: Object, required: true },
})

defineEmits(['up'])

const activeSection = ref('')

function selectSection(slug) {
  activeSection.value = activeSection.value === slug ? '' : slug
}
</script>

<template>
  <main class="lore-history" :style="{ background: theme.bg }">
    <div class="lore-history__texture" aria-hidden="true" />

    <header class="lore-history__header">
      <button type="button" class="lore-history__back" @click="$emit('up')">
        <span aria-hidden="true">←</span> к карте Lore
      </button>
      <div class="lore-history__index">Летопись · семь разделов</div>
    </header>

    <section class="lore-history__intro" aria-labelledby="history-title">
      <div class="lore-history__sigil" aria-hidden="true">
        <span /><span /><i />
      </div>
      <p class="lore-history__eyebrow">{{ HISTORY_THREAD.eyebrow }}</p>
      <h1 id="history-title">{{ HISTORY_THREAD.title }}</h1>
      <p class="lore-history__lead">{{ HISTORY_THREAD.lead }}</p>
      <aside class="lore-history__note">
        <span>Примечание хранителей</span>
        <p>{{ HISTORY_THREAD.archiveNote }}</p>
      </aside>
    </section>

    <section class="history-thread" aria-label="Семь разделов истории Эноа">
      <div class="history-thread__strand" aria-hidden="true">
        <span /><span /><span />
      </div>

      <article
        v-for="(section, index) in HISTORY_THREAD.sections"
        :id="section.slug"
        :key="section.slug"
        class="history-era"
        :class="{ 'is-active': activeSection === section.slug }"
      >
        <button
          type="button"
          class="history-era__square"
          :aria-pressed="activeSection === section.slug"
          @click="selectSection(section.slug)"
        >
          <span class="history-era__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="history-era__label">{{ section.label }}</span>
          <strong>{{ section.title }}</strong>
          <span class="history-era__summary">{{ section.summary }}</span>
          <span class="history-era__chapters">
            <template v-if="section.chapters.length">
              {{ section.chapters.length }} {{ section.chapters.length === 1 ? 'внутренняя глава' : section.chapters.length < 5 ? 'внутренние главы' : 'внутренних глав' }}
            </template>
            <template v-else>основная запись</template>
          </span>
          <i class="history-era__corner history-era__corner--tl" aria-hidden="true" />
          <i class="history-era__corner history-era__corner--br" aria-hidden="true" />
        </button>

        <div class="history-era__knot" aria-hidden="true">
          <span>{{ index + 1 }}</span>
        </div>
      </article>

      <div class="history-thread__end" aria-hidden="true">
        <span>Нить</span>
        <strong>продолжается</strong>
      </div>
    </section>

    <footer class="lore-history__footer">
      <span>Семь разделов одной летописи</span>
      <button type="button" @click="$emit('up')">Вернуться к карте Lore →</button>
    </footer>
  </main>
</template>

<style scoped>
.lore-history{position:absolute;inset:0 0 0 68px;z-index:58;overflow-y:auto;overflow-x:hidden;color:rgba(var(--theme-text-rgb),.9);isolation:isolate}
.lore-history__texture{position:fixed;inset:0 0 0 68px;z-index:-1;pointer-events:none;opacity:.48;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.018) 0 1px,transparent 1px 6px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 5px),radial-gradient(ellipse 62% 35% at 50% 15%,rgba(var(--theme-accent-rgb),.1),transparent 68%);mix-blend-mode:screen}
.lore-history__header{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;max-width:1220px;margin:0 auto;padding:32px 48px 0}
.lore-history__back,.lore-history__footer button{border:0;background:none;padding:8px 0;color:rgba(var(--theme-text-rgb),.56);font:500 10px/1 'Hanken Grotesk',sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:color .2s ease}
.lore-history__back:hover,.lore-history__footer button:hover{color:rgba(var(--theme-accent-strong-rgb),.95)}
.lore-history__back span{display:inline-block;margin-right:8px;color:rgba(var(--theme-accent-rgb),.85);transition:transform .2s ease}
.lore-history__back:hover span{transform:translateX(-4px)}
.lore-history__index{font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.32)}
.lore-history__intro{position:relative;max-width:790px;margin:58px auto 0;padding:0 44px;text-align:center}
.lore-history__sigil{position:relative;width:84px;height:84px;margin:0 auto 24px;animation:sigil-breathe 5s ease-in-out infinite}
.lore-history__sigil span{position:absolute;inset:8px;border:1px solid rgba(var(--theme-accent-rgb),.55);transform:rotate(45deg)}
.lore-history__sigil span:nth-child(2){inset:20px;border-color:rgba(var(--theme-accent-strong-rgb),.45)}
.lore-history__sigil i{position:absolute;inset:31px;border:1px solid rgba(var(--theme-accent-strong-rgb),.8);border-radius:50%;box-shadow:0 0 22px rgba(var(--theme-accent-rgb),.25)}
.lore-history__eyebrow{margin:0 0 13px;font:500 10px/1 'Hanken Grotesk',sans-serif;letter-spacing:.34em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.82)}
.lore-history h1{margin:0;font:500 clamp(50px,6vw,80px)/.92 'Cormorant Garamond',serif;letter-spacing:.015em;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance;text-shadow:0 0 36px rgba(var(--theme-accent-rgb),.08)}
.lore-history__lead{max-width:660px;margin:25px auto 0;font:400 clamp(18px,2vw,22px)/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.72);text-wrap:balance}
.lore-history__note{position:relative;max-width:610px;margin:38px auto 0;padding:18px 28px 19px;border:1px solid rgba(var(--theme-accent-rgb),.18);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.045),transparent)}
.lore-history__note::before,.lore-history__note::after{content:'';position:absolute;top:50%;width:38px;height:1px;background:rgba(var(--theme-accent-rgb),.36)}
.lore-history__note::before{right:100%}.lore-history__note::after{left:100%}
.lore-history__note span{font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.68)}
.lore-history__note p{margin:9px 0 0;font:italic 16px/1.5 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.55)}
.history-thread{position:relative;display:grid;grid-template-columns:repeat(2,minmax(260px,430px));justify-content:center;column-gap:190px;row-gap:76px;max-width:1260px;margin:98px auto 0;padding:48px 42px 180px}
.history-thread::before{content:'';position:absolute;inset:0 18px 108px;border:1px solid rgba(var(--theme-contrast-rgb),.045);background:repeating-linear-gradient(90deg,transparent 0 11px,rgba(var(--theme-contrast-rgb),.013) 11px 12px),repeating-linear-gradient(0deg,transparent 0 9px,rgba(var(--theme-contrast-rgb),.012) 9px 10px);mask-image:linear-gradient(transparent,#000 7%,#000 92%,transparent)}
.history-thread__strand{position:absolute;z-index:0;inset:0 0 72px;pointer-events:none}
.history-thread__strand span{position:absolute;display:block;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.52) 12%,rgba(var(--theme-accent-strong-rgb),.78) 50%,rgba(var(--theme-accent-rgb),.52) 88%,transparent);filter:drop-shadow(0 0 4px rgba(var(--theme-accent-rgb),.24))}
.history-thread__strand span:nth-child(1){top:11%;left:20%;right:50%;transform:rotate(20deg);transform-origin:right}
.history-thread__strand span:nth-child(2){top:12%;bottom:6%;left:50%;width:1px;height:auto;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.75) 7%,rgba(var(--theme-accent-strong-rgb),.65) 92%,transparent);box-shadow:3px 0 rgba(var(--theme-accent-rgb),.2),-3px 0 rgba(var(--theme-accent-rgb),.18)}
.history-thread__strand span:nth-child(3){left:50%;right:20%;bottom:8%;transform:rotate(20deg);transform-origin:left}
.history-era{position:relative;z-index:1;display:flex;justify-content:center}
.history-era:nth-of-type(odd){grid-column:1}.history-era:nth-of-type(even){grid-column:2}
.history-era:nth-of-type(7){grid-column:1 / -1;width:min(100%,430px);justify-self:center}
.history-era__square{position:relative;display:flex;width:100%;aspect-ratio:1;flex-direction:column;align-items:flex-start;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.24);border-radius:2px;background:linear-gradient(135deg,rgba(var(--theme-contrast-rgb),.04),rgba(var(--theme-contrast-rgb),.01)),rgb(var(--theme-surface-rgb));padding:44px 42px;color:inherit;text-align:left;cursor:pointer;box-shadow:0 18px 58px rgba(0,0,0,.17);transition:transform .32s ease,border-color .32s ease,box-shadow .32s ease}
.history-era__square::before{content:'';position:absolute;inset:9px;border:1px solid rgba(var(--theme-accent-rgb),.07);pointer-events:none}
.history-era__square:hover,.history-era__square:focus-visible,.history-era.is-active .history-era__square{border-color:rgba(var(--theme-accent-rgb),.56);box-shadow:0 22px 70px rgba(0,0,0,.23),0 0 34px rgba(var(--theme-accent-rgb),.08);transform:translateY(-5px);outline:none}
.history-era__number{position:absolute;top:30px;right:32px;font:500 10px/1 'Hanken Grotesk',sans-serif;letter-spacing:.16em;color:rgba(var(--theme-accent-strong-rgb),.64)}
.history-era__label{font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.8)}
.history-era__square strong{display:block;max-width:330px;margin-top:13px;font:600 clamp(28px,3vw,38px)/.98 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.97);text-wrap:balance}
.history-era__summary{display:block;margin-top:18px;font:400 16px/1.52 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.67)}
.history-era__chapters{position:absolute;left:42px;bottom:35px;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.31)}
.history-era__corner{position:absolute;width:24px;height:24px;opacity:.7}.history-era__corner--tl{left:17px;top:17px;border-left:1px solid rgba(var(--theme-accent-rgb),.45);border-top:1px solid rgba(var(--theme-accent-rgb),.45)}.history-era__corner--br{right:17px;bottom:17px;border-right:1px solid rgba(var(--theme-accent-rgb),.45);border-bottom:1px solid rgba(var(--theme-accent-rgb),.45)}
.history-era__knot{position:absolute;z-index:2;top:50%;display:grid;width:42px;height:42px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.48);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 0 6px rgba(var(--theme-surface-rgb),.48),0 0 20px rgba(var(--theme-accent-rgb),.15);transform:translateY(-50%) rotate(45deg)}
.history-era:nth-of-type(odd):not(:nth-of-type(7)) .history-era__knot{left:calc(100% + 74px)}.history-era:nth-of-type(even) .history-era__knot{right:calc(100% + 74px)}.history-era:nth-of-type(7) .history-era__knot{left:50%;top:auto;bottom:-59px;transform:translateX(-50%) rotate(45deg)}
.history-era__knot span{transform:rotate(-45deg);font:500 8px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.8)}
.history-thread__end{position:absolute;z-index:2;left:50%;bottom:34px;display:flex;flex-direction:column;align-items:center;width:190px;padding:14px 20px 15px;transform:translateX(-50%);border:1px solid rgba(var(--theme-accent-rgb),.27);background:rgb(var(--theme-surface-rgb));text-align:center}
.history-thread__end span{font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.3em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}
.history-thread__end strong{margin-top:5px;font:600 19px/1 'Cormorant Garamond',serif;letter-spacing:.05em;color:rgba(var(--theme-heading-rgb),.9)}
.lore-history__footer{display:flex;align-items:center;justify-content:space-between;max-width:1160px;margin:0 auto;padding:30px 46px 54px;border-top:1px solid rgba(var(--theme-contrast-rgb),.065);font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.28)}
@keyframes sigil-breathe{0%,100%{filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.08));transform:scale(.98)}50%{filter:drop-shadow(0 0 16px rgba(var(--theme-accent-rgb),.2));transform:scale(1.02)}}
@media (max-width:920px){
  .history-thread{grid-template-columns:minmax(0,540px);row-gap:58px;padding-left:80px;padding-right:24px}.history-era:nth-of-type(n){grid-column:1;width:100%}.history-thread__strand span:nth-child(1),.history-thread__strand span:nth-child(3){display:none}.history-thread__strand span:nth-child(2){left:48px}.history-era__knot,.history-era:nth-of-type(odd):not(:nth-of-type(7)) .history-era__knot,.history-era:nth-of-type(even) .history-era__knot,.history-era:nth-of-type(7) .history-era__knot{left:-53px;right:auto;top:50%;bottom:auto;transform:translateY(-50%) rotate(45deg)}
}
@media (max-width:820px){
  .lore-history{left:0;padding-bottom:58px}.lore-history__texture{left:0}.lore-history__header{padding:22px 22px 0}.lore-history__index{display:none}.lore-history__intro{margin-top:42px;padding:0 24px}.lore-history__sigil{width:70px;height:70px;margin-bottom:20px}.lore-history h1{font-size:48px}.lore-history__lead{font-size:18px}.lore-history__note{padding:16px 20px}.lore-history__note::before,.lore-history__note::after{display:none}
  .history-thread{margin-top:52px;padding:28px 16px 150px 88px;row-gap:44px}.history-thread::before{inset:0 4px 95px}.history-thread__strand span:nth-child(2){left:50px}.history-era__square{padding:34px 27px;min-height:286px;aspect-ratio:auto}.history-era__number{top:24px;right:25px}.history-era__square strong{font-size:29px}.history-era__summary{font-size:15px}.history-era__chapters{left:27px;bottom:27px}.history-era__knot,.history-era:nth-of-type(odd):not(:nth-of-type(7)) .history-era__knot,.history-era:nth-of-type(even) .history-era__knot,.history-era:nth-of-type(7) .history-era__knot{left:-59px;width:36px;height:36px}.history-thread__end{left:50px;bottom:28px;align-items:flex-start;width:180px;transform:translateX(-18px);text-align:left}.lore-history__footer{padding:26px 22px 32px}.lore-history__footer>span{display:none}
}
@media (prefers-reduced-motion:reduce){.lore-history__sigil{animation:none}.history-era__square{transition:none}}
</style>
