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
      <svg class="history-thread__embroidery" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path class="history-thread__fiber history-thread__fiber--ghost" d="M50 0 C45 7 55 12 50 19 S45 31 50 39 S56 51 50 59 S44 72 50 80 S55 93 50 100" />
        <path class="history-thread__fiber" d="M50 0 C48 8 53 13 50 20 S47 32 50 40 S53 52 50 60 S47 73 50 81 S52 94 50 100" />
        <path class="history-thread__fiber history-thread__fiber--fine" d="M49.65 0 C53 8 47 13 50 20 S53 32 50 40 S47 52 50 60 S53 73 50 81 S48 94 50.35 100" />
      </svg>

      <article
        v-for="(section, index) in HISTORY_THREAD.sections"
        :id="section.slug"
        :key="section.slug"
        class="history-era"
        :class="{ 'is-active': activeSection === section.slug }"
        :style="{ '--era-order': index }"
      >
        <div class="history-era__weave" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div class="history-era__main">
          <button
            type="button"
            class="history-era__square"
            :aria-pressed="activeSection === section.slug"
            @click="selectSection(section.slug)"
          >
            <span class="history-era__number">{{ String(index).padStart(2, '0') }}</span>
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
            <span>{{ index }}</span>
          </div>
        </div>

        <div
          v-if="index > 0 && section.chapters.length"
          class="history-era__chapter-grid"
          role="list"
          :aria-label="`Разделы: ${section.title}`"
        >
          <div class="history-era__chapter-label" aria-hidden="true">
            <span>узор эпохи</span>
            <i />
            <strong>{{ String(index).padStart(2, '0') }}</strong>
            <i />
            <span>{{ section.chapters.length }} нитей</span>
          </div>
          <div
            v-for="(chapter, chapterIndex) in section.chapters"
            :key="chapter"
            class="history-chapter"
            role="listitem"
          >
            <span class="history-chapter__number">{{ index }}.{{ chapterIndex + 1 }}</span>
            <strong>{{ chapter }}</strong>
            <span class="history-chapter__mark" aria-hidden="true"><i /></span>
          </div>
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
.lore-history__texture{position:fixed;inset:0 0 0 68px;z-index:-1;pointer-events:none;opacity:.78;background:linear-gradient(90deg,transparent 0 4%,rgba(var(--theme-accent-rgb),.025) 4.1% 4.2%,transparent 4.3% 95.7%,rgba(var(--theme-accent-rgb),.025) 95.8% 95.9%,transparent 96%),repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.018) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.015) 0 1px,transparent 1px 4px),radial-gradient(ellipse 64% 32% at 50% 12%,rgba(var(--theme-accent-rgb),.11),transparent 68%);mix-blend-mode:screen}
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
.history-thread{position:relative;display:flex;max-width:1280px;margin:76px auto 0;padding:72px 30px 190px;flex-direction:column;gap:0;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.018) 12%,rgba(var(--theme-contrast-rgb),.012) 50%,rgba(var(--theme-accent-rgb),.018) 88%,transparent);isolation:isolate}
.history-thread::before{content:'';position:absolute;inset:0 6px 108px;border-block:1px solid rgba(var(--theme-accent-rgb),.12);background:repeating-linear-gradient(90deg,transparent 0 10px,rgba(var(--theme-accent-rgb),.018) 10px 11px),repeating-linear-gradient(0deg,transparent 0 7px,rgba(var(--theme-contrast-rgb),.014) 7px 8px);mask-image:linear-gradient(transparent,#000 4%,#000 96%,transparent)}
.history-thread::after{content:'';position:absolute;z-index:-1;inset:40px 20px 132px;border-inline:1px solid rgba(var(--theme-accent-rgb),.13);box-shadow:inset 18px 0 42px rgba(var(--theme-accent-rgb),.015),inset -18px 0 42px rgba(var(--theme-accent-rgb),.015)}
.history-thread__strand{position:absolute;z-index:0;inset:0 0 72px;pointer-events:none}
.history-thread__strand span{position:absolute;display:block;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.52) 12%,rgba(var(--theme-accent-strong-rgb),.78) 50%,rgba(var(--theme-accent-rgb),.52) 88%,transparent);filter:drop-shadow(0 0 4px rgba(var(--theme-accent-rgb),.24))}
.history-thread__strand span:nth-child(1){top:4%;left:20%;right:50%;transform:rotate(20deg);transform-origin:right}
.history-thread__strand span:nth-child(2){top:4%;bottom:3%;left:50%;width:1px;height:auto;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.75) 3%,rgba(var(--theme-accent-strong-rgb),.65) 96%,transparent);box-shadow:3px 0 rgba(var(--theme-accent-rgb),.2),-3px 0 rgba(var(--theme-accent-rgb),.18)}
.history-thread__strand span:nth-child(3){left:50%;right:20%;bottom:3%;transform:rotate(20deg);transform-origin:left}
.history-thread__embroidery{position:absolute;z-index:0;inset:0 0 96px;width:100%;height:calc(100% - 96px);overflow:visible;pointer-events:none}
.history-thread__fiber{fill:none;stroke:rgba(var(--theme-accent-strong-rgb),.58);stroke-width:.105;vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 4px rgba(var(--theme-accent-rgb),.42))}
.history-thread__fiber--ghost{stroke:rgba(var(--theme-accent-rgb),.13);stroke-width:.62;filter:blur(.45px)}
.history-thread__fiber--fine{stroke:rgba(var(--theme-accent-rgb),.3);stroke-width:.07;stroke-dasharray:.4 .45}
.history-era{position:relative;z-index:1;display:flex;min-height:620px;flex-direction:column;align-items:center;justify-content:center;gap:58px;padding:92px 42px 108px;border-block:1px solid rgba(var(--theme-accent-rgb),.1);background:linear-gradient(90deg,transparent 0 4%,rgba(var(--theme-surface-rgb),.25) 17%,rgba(var(--theme-accent-rgb),.024) 50%,rgba(var(--theme-surface-rgb),.25) 83%,transparent 96%)}
.history-era:first-of-type{border-top-color:transparent}.history-era:last-of-type{border-bottom-color:transparent}
.history-era:nth-of-type(even){background:linear-gradient(90deg,transparent 0 5%,rgba(var(--theme-accent-rgb),.018) 18%,rgba(var(--theme-surface-rgb),.28) 50%,rgba(var(--theme-accent-rgb),.018) 82%,transparent 95%)}
.history-era__weave{position:absolute;z-index:0;inset:0;overflow:hidden;pointer-events:none}
.history-era__weave span{position:absolute;display:block;opacity:.48}
.history-era__weave span:nth-child(1){top:50%;left:3%;right:3%;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.34) 12%,rgba(var(--theme-accent-strong-rgb),.54) 50%,rgba(var(--theme-accent-rgb),.34) 88%,transparent)}
.history-era__weave span:nth-child(2){top:calc(50% - 5px);left:8%;right:8%;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.13) 18%,rgba(var(--theme-accent-rgb),.35) 50%,rgba(var(--theme-accent-rgb),.13) 82%,transparent)}
.history-era__weave span:nth-child(3){top:calc(50% + 5px);left:8%;right:8%;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.1) 18%,rgba(var(--theme-accent-rgb),.28) 50%,rgba(var(--theme-accent-rgb),.1) 82%,transparent)}
.history-era__weave span:nth-child(4){top:50%;left:50%;width:460px;height:460px;transform:translate(-50%,-50%) rotate(45deg);border:1px solid rgba(var(--theme-accent-rgb),.055);box-shadow:0 0 0 24px rgba(var(--theme-accent-rgb),.012),0 0 0 48px rgba(var(--theme-accent-rgb),.008)}
.history-era__main{position:relative;width:min(100%,430px)}
.history-era__main::before,.history-era__main::after{content:'';position:absolute;z-index:-1;top:50%;width:190px;height:190px;opacity:.24;background:repeating-linear-gradient(45deg,transparent 0 8px,rgba(var(--theme-accent-rgb),.18) 8px 9px),repeating-linear-gradient(-45deg,transparent 0 8px,rgba(var(--theme-accent-rgb),.1) 8px 9px);border:1px solid rgba(var(--theme-accent-rgb),.16);transform:translateY(-50%) rotate(45deg)}
.history-era__main::before{right:calc(100% - 34px)}.history-era__main::after{left:calc(100% - 34px)}
.history-era__square{position:relative;display:flex;width:100%;aspect-ratio:1;flex-direction:column;align-items:flex-start;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.36);border-radius:1px;background:radial-gradient(circle at 50% 42%,rgba(var(--theme-accent-rgb),.055),transparent 58%),repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.012) 0 1px,transparent 1px 5px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.01) 0 1px,transparent 1px 5px),rgb(var(--theme-surface-rgb));padding:46px 44px;color:inherit;text-align:left;cursor:pointer;box-shadow:0 24px 70px rgba(0,0,0,.27),0 0 0 9px rgba(var(--theme-surface-rgb),.48),0 0 34px rgba(var(--theme-accent-rgb),.045);transition:transform .32s ease,border-color .32s ease,box-shadow .32s ease}
.history-era__square::before{content:'';position:absolute;inset:9px;border:1px dashed rgba(var(--theme-accent-rgb),.16);pointer-events:none}
.history-era__square::after{content:'';position:absolute;inset:18px;border:1px solid rgba(var(--theme-accent-rgb),.045);pointer-events:none}
.history-era__square:hover,.history-era__square:focus-visible,.history-era.is-active .history-era__square{border-color:rgba(var(--theme-accent-rgb),.56);box-shadow:0 22px 70px rgba(0,0,0,.23),0 0 34px rgba(var(--theme-accent-rgb),.08);transform:translateY(-5px);outline:none}
.history-era__number{position:absolute;top:30px;right:32px;font:500 10px/1 'Hanken Grotesk',sans-serif;letter-spacing:.16em;color:rgba(var(--theme-accent-strong-rgb),.64)}
.history-era__label{font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.8)}
.history-era__square strong{display:block;max-width:330px;margin-top:13px;font:600 clamp(28px,3vw,38px)/.98 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.97);text-wrap:balance}
.history-era__summary{display:block;margin-top:18px;font:400 16px/1.52 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.67)}
.history-era__chapters{position:absolute;left:42px;bottom:35px;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.31)}
.history-era__corner{position:absolute;width:30px;height:30px;opacity:.75}.history-era__corner--tl{left:17px;top:17px;border-left:1px solid rgba(var(--theme-accent-rgb),.5);border-top:1px solid rgba(var(--theme-accent-rgb),.5)}.history-era__corner--br{right:17px;bottom:17px;border-right:1px solid rgba(var(--theme-accent-rgb),.5);border-bottom:1px solid rgba(var(--theme-accent-rgb),.5)}
.history-era__knot{position:absolute;z-index:2;top:50%;display:grid;width:50px;height:50px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.64);background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.09),transparent 68%),rgb(var(--theme-surface-rgb));box-shadow:0 0 0 6px rgba(var(--theme-surface-rgb),.62),0 0 28px rgba(var(--theme-accent-rgb),.22);transform:translateY(-50%) rotate(45deg)}
.history-era__main .history-era__knot{left:50%;top:auto;bottom:-58px;transform:translateX(-50%) rotate(45deg)}
.history-era__knot span{transform:rotate(-45deg);font:500 8px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.8)}
.history-era__chapter-grid{--chapter-size:172px;position:relative;display:grid;width:min(100%,1120px);grid-template-columns:repeat(auto-fit,minmax(var(--chapter-size),var(--chapter-size)));justify-content:center;gap:17px;padding:79px 32px 34px;background:repeating-linear-gradient(90deg,rgba(var(--theme-accent-rgb),.014) 0 1px,transparent 1px 8px),repeating-linear-gradient(0deg,rgba(var(--theme-accent-rgb),.012) 0 1px,transparent 1px 8px),linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.025) 8%,rgba(var(--theme-accent-rgb),.025) 92%,transparent);border-block:1px solid rgba(var(--theme-accent-rgb),.16);box-shadow:inset 0 18px 44px rgba(0,0,0,.12),inset 0 -18px 44px rgba(0,0,0,.12)}
.history-era__chapter-grid::before{content:'';position:absolute;top:-58px;left:50%;width:1px;height:98px;background:linear-gradient(rgba(var(--theme-accent-rgb),.65),rgba(var(--theme-accent-strong-rgb),.75));box-shadow:4px 0 rgba(var(--theme-accent-rgb),.18),-4px 0 rgba(var(--theme-accent-rgb),.18)}
.history-era__chapter-grid::after{content:'';position:absolute;top:52px;left:3%;right:3%;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.4) 6%,rgba(var(--theme-accent-strong-rgb),.62) 50%,rgba(var(--theme-accent-rgb),.4) 94%,transparent);box-shadow:0 5px rgba(var(--theme-accent-rgb),.09)}
.history-era__chapter-label{position:absolute;z-index:2;top:17px;left:50%;display:flex;align-items:center;gap:13px;transform:translateX(-50%);white-space:nowrap;font:500 7px/1 'Hanken Grotesk',sans-serif;letter-spacing:.22em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.34)}
.history-era__chapter-label i{display:block;width:26px;height:1px;background:rgba(var(--theme-accent-rgb),.28)}
.history-era__chapter-label strong{font:500 9px/1 'Hanken Grotesk',sans-serif;color:rgba(var(--theme-accent-strong-rgb),.66)}
.history-chapter{position:relative;z-index:1;display:flex;width:var(--chapter-size);aspect-ratio:1;flex-direction:column;align-items:center;justify-content:center;border:1px solid rgba(var(--theme-accent-rgb),.24);background:radial-gradient(circle at 50% 45%,rgba(var(--theme-accent-rgb),.055),transparent 64%),repeating-linear-gradient(45deg,rgba(var(--theme-accent-rgb),.012) 0 1px,transparent 1px 6px),rgb(var(--theme-surface-rgb));padding:23px;text-align:center;box-shadow:0 12px 32px rgba(0,0,0,.18),0 0 0 5px rgba(var(--theme-surface-rgb),.35);transition:transform .25s ease,border-color .25s ease}
.history-chapter::before{content:'';position:absolute;inset:7px;border:1px dashed rgba(var(--theme-accent-rgb),.12)}
.history-chapter::after{content:'';position:absolute;left:50%;bottom:100%;width:1px;height:28px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.58));box-shadow:3px 0 rgba(var(--theme-accent-rgb),.12)}
.history-chapter:hover{transform:translateY(-4px);border-color:rgba(var(--theme-accent-rgb),.5)}
.history-chapter__number{position:absolute;top:15px;right:16px;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.08em;color:rgba(var(--theme-accent-strong-rgb),.5)}
.history-chapter strong{position:relative;z-index:1;font:600 20px/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.92);text-wrap:balance}
.history-chapter__mark{position:absolute;bottom:-9px;left:50%;display:grid;width:16px;height:16px;place-items:center;transform:translateX(-50%) rotate(45deg);border:1px solid rgba(var(--theme-accent-rgb),.48);background:rgb(var(--theme-surface-rgb));box-shadow:0 0 8px rgba(var(--theme-accent-rgb),.08)}
.history-chapter__mark i{width:3px;height:3px;border-radius:50%;background:rgba(var(--theme-accent-strong-rgb),.75)}
.history-thread__end{position:absolute;z-index:2;left:50%;bottom:34px;display:flex;flex-direction:column;align-items:center;width:190px;padding:14px 20px 15px;transform:translateX(-50%);border:1px solid rgba(var(--theme-accent-rgb),.27);background:rgb(var(--theme-surface-rgb));text-align:center}
.history-thread__end span{font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.3em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.62)}
.history-thread__end strong{margin-top:5px;font:600 19px/1 'Cormorant Garamond',serif;letter-spacing:.05em;color:rgba(var(--theme-heading-rgb),.9)}
.lore-history__footer{display:flex;align-items:center;justify-content:space-between;max-width:1160px;margin:0 auto;padding:30px 46px 54px;border-top:1px solid rgba(var(--theme-contrast-rgb),.065);font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.28)}
@keyframes sigil-breathe{0%,100%{filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.08));transform:scale(.98)}50%{filter:drop-shadow(0 0 16px rgba(var(--theme-accent-rgb),.2));transform:scale(1.02)}}
@media (max-width:920px){
  .history-thread{padding-left:80px;padding-right:24px}.history-thread__strand span:nth-child(1),.history-thread__strand span:nth-child(3){display:none}.history-thread__strand span:nth-child(2){left:48px}.history-thread__embroidery{display:none}.history-era{align-items:stretch}.history-era__weave span:nth-child(4){display:none}.history-era__main{width:min(100%,540px);align-self:center}.history-era__main::before,.history-era__main::after{display:none}.history-era__main .history-era__knot{left:-53px;right:auto;top:50%;bottom:auto;transform:translateY(-50%) rotate(45deg)}.history-era__chapter-grid{--chapter-size:158px;padding-left:14px;padding-right:14px}.history-era__chapter-grid::before{left:48px}.history-era__chapter-grid::after{left:48px;right:4%;background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.55),rgba(var(--theme-accent-rgb),.28) 80%,transparent)}
}
@media (max-width:820px){
  .lore-history{left:0;padding-bottom:58px}.lore-history__texture{left:0}.lore-history__header{padding:22px 22px 0}.lore-history__index{display:none}.lore-history__intro{margin-top:42px;padding:0 24px}.lore-history__sigil{width:70px;height:70px;margin-bottom:20px}.lore-history h1{font-size:48px}.lore-history__lead{font-size:18px}.lore-history__note{padding:16px 20px}.lore-history__note::before,.lore-history__note::after{display:none}
  .history-thread{margin-top:52px;padding:28px 16px 150px 88px}.history-thread::before{inset:0 4px 95px}.history-thread__strand span:nth-child(2){left:50px}.history-era{min-height:0;gap:46px;padding:65px 0 76px}.history-era__square{padding:34px 27px;min-height:286px;aspect-ratio:auto}.history-era__number{top:24px;right:25px}.history-era__square strong{font-size:29px}.history-era__summary{font-size:15px}.history-era__chapters{left:27px;bottom:27px}.history-era__main .history-era__knot{left:-59px;width:36px;height:36px}.history-era__chapter-grid{--chapter-size:min(124px,calc((100vw - 126px)/2));grid-template-columns:repeat(2,var(--chapter-size));gap:19px 16px;padding:61px 8px 27px}.history-era__chapter-grid::before{left:-38px;width:38px;height:1px;top:22px;box-shadow:none}.history-era__chapter-grid::after{top:22px;left:-38px;right:4px}.history-era__chapter-label{top:39px;gap:7px}.history-era__chapter-label i{width:10px}.history-chapter{padding:16px}.history-chapter::after{height:21px}.history-chapter strong{font-size:16px}.history-chapter__number{top:11px;right:12px;font-size:7px}.history-thread__end{left:50px;bottom:28px;align-items:flex-start;width:180px;transform:translateX(-18px);text-align:left}.lore-history__footer{padding:26px 22px 32px}.lore-history__footer>span{display:none}
}
@media (prefers-reduced-motion:reduce){.lore-history__sigil{animation:none}.history-era__square{transition:none}}
</style>
