<script setup>
import { MAFRASH_THREAD } from '~/data/loreHistory.js'

defineProps({
  theme: { type: Object, required: true },
})

defineEmits(['up'])

const openEvent = ref(0)

function toggleEvent(index) {
  openEvent.value = openEvent.value === index ? -1 : index
}
</script>

<template>
  <main class="lore-history" :style="{ background: theme.bg }">
    <div class="lore-history__texture" aria-hidden="true" />

    <header class="lore-history__header">
      <button type="button" class="lore-history__back" @click="$emit('up')">
        <span aria-hidden="true">←</span> к карте Lore
      </button>
      <div class="lore-history__index">Архивная нить · 01</div>
    </header>

    <section class="lore-history__intro" aria-labelledby="mafrash-thread-title">
      <div class="lore-history__sigil" aria-hidden="true">
        <span /><span /><i />
      </div>
      <p class="lore-history__eyebrow">{{ MAFRASH_THREAD.eyebrow }}</p>
      <h1 id="mafrash-thread-title">{{ MAFRASH_THREAD.title }}</h1>
      <p class="lore-history__lead">{{ MAFRASH_THREAD.lead }}</p>
      <aside class="lore-history__note">
        <span>Примечание хранителей</span>
        <p>{{ MAFRASH_THREAD.archiveNote }}</p>
      </aside>
    </section>

    <section class="mafrash-loom" aria-label="Пять моментов истории Башни Мафраш">
      <div class="mafrash-loom__warp" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>

      <article
        v-for="(event, index) in MAFRASH_THREAD.events"
        :key="event.title"
        class="mafrash-moment"
        :class="[`mafrash-moment--${event.side}`, { 'is-open': openEvent === index }]"
      >
        <div class="mafrash-moment__weft" aria-hidden="true">
          <i /><i /><i />
        </div>

        <div class="mafrash-moment__number" aria-hidden="true"><span>0{{ index + 1 }}</span></div>

        <button
          type="button"
          class="mafrash-moment__card"
          :aria-expanded="openEvent === index"
          @click="toggleEvent(index)"
        >
          <span class="mafrash-moment__era">{{ event.era }}</span>
          <strong>{{ event.title }}</strong>
          <span class="mafrash-moment__summary">{{ event.summary }}</span>
          <span class="mafrash-moment__detail">{{ event.detail }}</span>
          <span class="mafrash-moment__action">
            {{ openEvent === index ? 'свернуть запись' : 'прочесть запись' }}
            <i aria-hidden="true">{{ openEvent === index ? '−' : '+' }}</i>
          </span>
        </button>
      </article>

      <div class="mafrash-loom__seal" aria-hidden="true">
        <span>Нить</span>
        <strong>Башня Мафраша</strong>
      </div>
    </section>

    <footer class="lore-history__footer">
      <span>Пять узлов одной памяти</span>
      <button type="button" @click="$emit('up')">Вернуться к карте Lore →</button>
    </footer>
  </main>
</template>

<style scoped>
.lore-history{position:absolute;inset:0 0 0 68px;z-index:58;overflow-y:auto;overflow-x:hidden;color:rgba(var(--theme-text-rgb),.9);isolation:isolate}
.lore-history__texture{position:fixed;inset:0 0 0 68px;z-index:-1;pointer-events:none;opacity:.5;background:repeating-linear-gradient(90deg,rgba(var(--theme-contrast-rgb),.018) 0 1px,transparent 1px 6px),repeating-linear-gradient(0deg,rgba(var(--theme-contrast-rgb),.014) 0 1px,transparent 1px 5px),radial-gradient(ellipse 62% 35% at 50% 16%,rgba(var(--theme-accent-rgb),.11),transparent 68%);mix-blend-mode:screen}
.lore-history__header{position:relative;z-index:3;display:flex;align-items:center;justify-content:space-between;max-width:1220px;margin:0 auto;padding:32px 48px 0}
.lore-history__back,.lore-history__footer button{border:0;background:none;padding:8px 0;color:rgba(var(--theme-text-rgb),.56);font:500 10px/1 'Hanken Grotesk',sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:color .2s ease}
.lore-history__back:hover,.lore-history__footer button:hover{color:rgba(var(--theme-accent-strong-rgb),.95)}
.lore-history__back span{display:inline-block;margin-right:8px;color:rgba(var(--theme-accent-rgb),.85);transition:transform .2s ease}
.lore-history__back:hover span{transform:translateX(-4px)}
.lore-history__index{font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.32)}
.lore-history__intro{position:relative;max-width:790px;margin:58px auto 0;padding:0 44px;text-align:center}
.lore-history__sigil{position:relative;width:84px;height:84px;margin:0 auto 24px;animation:sigil-breathe 5s ease-in-out infinite}
.lore-history__sigil span{position:absolute;inset:8px;border:1px solid rgba(var(--theme-accent-rgb),.55);transform:rotate(45deg)}
.lore-history__sigil span:nth-child(2){inset:20px;border-color:rgba(var(--theme-accent-strong-rgb),.45);transform:rotate(45deg)}
.lore-history__sigil i{position:absolute;inset:31px;border:1px solid rgba(var(--theme-accent-strong-rgb),.8);border-radius:50%;box-shadow:0 0 22px rgba(var(--theme-accent-rgb),.25)}
.lore-history__eyebrow{margin:0 0 13px;font:500 10px/1 'Hanken Grotesk',sans-serif;letter-spacing:.34em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.82)}
.lore-history h1{margin:0;font:500 clamp(46px,6vw,78px)/.92 'Cormorant Garamond',serif;letter-spacing:.015em;color:rgba(var(--theme-heading-rgb),.98);text-wrap:balance;text-shadow:0 0 36px rgba(var(--theme-accent-rgb),.08)}
.lore-history__lead{max-width:660px;margin:25px auto 0;font:400 clamp(18px,2vw,22px)/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.72);text-wrap:balance}
.lore-history__note{position:relative;max-width:610px;margin:38px auto 0;padding:18px 28px 19px;border:1px solid rgba(var(--theme-accent-rgb),.18);background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.045),transparent)}
.lore-history__note::before,.lore-history__note::after{content:'';position:absolute;top:50%;width:38px;height:1px;background:rgba(var(--theme-accent-rgb),.36)}
.lore-history__note::before{right:100%}.lore-history__note::after{left:100%}
.lore-history__note span{font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.68)}
.lore-history__note p{margin:9px 0 0;font:italic 16px/1.5 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.55)}
.mafrash-loom{position:relative;max-width:1260px;margin:78px auto 0;padding:32px 38px 190px}
.mafrash-loom::before{content:'';position:absolute;inset:0 18px 128px;border:1px solid rgba(var(--theme-contrast-rgb),.045);background:repeating-linear-gradient(90deg,transparent 0 11px,rgba(var(--theme-contrast-rgb),.013) 11px 12px),repeating-linear-gradient(0deg,transparent 0 9px,rgba(var(--theme-contrast-rgb),.012) 9px 10px);mask-image:linear-gradient(transparent,#000 7%,#000 92%,transparent)}
.mafrash-loom__warp{position:absolute;top:0;bottom:76px;left:50%;width:22px;transform:translateX(-50%);display:flex;justify-content:center;gap:2px;filter:drop-shadow(0 0 9px rgba(var(--theme-accent-rgb),.2))}
.mafrash-loom__warp i{display:block;width:1px;background:linear-gradient(to bottom,transparent 0,rgba(var(--theme-accent-strong-rgb),.2) 5%,rgba(var(--theme-accent-rgb),.72) 18%,rgba(var(--theme-accent-strong-rgb),.42) 82%,rgba(var(--theme-accent-rgb),.72) 96%,transparent 100%)}
.mafrash-loom__warp i:nth-child(2),.mafrash-loom__warp i:nth-child(4){opacity:.45}
.mafrash-moment{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 126px minmax(0,1fr);align-items:center;min-height:248px}
.mafrash-moment__weft{position:absolute;left:4%;right:4%;top:50%;height:8px;transform:translateY(-50%);display:grid;gap:2px;z-index:0}
.mafrash-moment__weft i{display:block;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--theme-accent-rgb),.24) 8%,rgba(var(--theme-accent-strong-rgb),.68) 48%,rgba(var(--theme-accent-rgb),.3) 92%,transparent);transform-origin:center;transition:filter .35s ease,opacity .35s ease}
.mafrash-moment__weft i:nth-child(1){opacity:.36}.mafrash-moment__weft i:nth-child(3){opacity:.52}
.mafrash-moment.is-open .mafrash-moment__weft i{filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.65));opacity:.9}
.mafrash-moment__number{position:absolute;z-index:2;left:50%;top:50%;display:grid;width:46px;height:46px;place-items:center;transform:translate(-50%,-50%) rotate(45deg);border:1px solid rgba(var(--theme-accent-rgb),.48);background:rgba(var(--theme-surface-rgb),.94);box-shadow:0 0 0 7px rgba(var(--theme-surface-rgb),.55),0 0 25px rgba(var(--theme-accent-rgb),.13);font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.08em;color:rgba(var(--theme-accent-strong-rgb),.84)}
.mafrash-moment__number span{display:block;transform:rotate(-45deg)}
.mafrash-moment__card{position:relative;z-index:1;width:min(100%,500px);border:1px solid rgba(var(--theme-contrast-rgb),.085);border-radius:2px;background:linear-gradient(135deg,rgba(var(--theme-contrast-rgb),.048),rgba(var(--theme-contrast-rgb),.012)),rgb(var(--theme-surface-rgb));padding:25px 28px 21px;color:inherit;text-align:left;cursor:pointer;box-shadow:0 18px 56px rgba(0,0,0,.14);transition:transform .3s ease,border-color .3s ease,background .3s ease}
.mafrash-moment__card::before{content:'';position:absolute;inset:7px;border:1px solid rgba(var(--theme-accent-rgb),.075);pointer-events:none}
.mafrash-moment__card:hover,.mafrash-moment__card:focus-visible,.mafrash-moment.is-open .mafrash-moment__card{border-color:rgba(var(--theme-accent-rgb),.34);background:linear-gradient(135deg,rgba(var(--theme-accent-rgb),.075),rgba(var(--theme-contrast-rgb),.016)),rgb(var(--theme-surface-rgb));outline:none}
.mafrash-moment--left .mafrash-moment__card{grid-column:1;justify-self:end;margin-right:26px}
.mafrash-moment--right .mafrash-moment__card{grid-column:3;justify-self:start;margin-left:26px}
.mafrash-moment--left .mafrash-moment__card:hover,.mafrash-moment--left.is-open .mafrash-moment__card{transform:translateX(-5px)}
.mafrash-moment--right .mafrash-moment__card:hover,.mafrash-moment--right.is-open .mafrash-moment__card{transform:translateX(5px)}
.mafrash-moment__era{display:block;margin-bottom:8px;font:500 9px/1 'Hanken Grotesk',sans-serif;letter-spacing:.26em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.78)}
.mafrash-moment__card strong{display:block;font:600 clamp(24px,2.5vw,31px)/1.05 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.96)}
.mafrash-moment__summary{display:block;margin-top:11px;font:400 16px/1.48 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.7)}
.mafrash-moment__detail{display:block;max-height:0;margin-top:0;padding-top:0;border-top:1px solid transparent;font:400 15px/1.58 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.62);opacity:0;overflow:hidden;transition:max-height .38s ease,margin .38s ease,padding .38s ease,border-color .38s ease,opacity .25s ease}
.mafrash-moment.is-open .mafrash-moment__detail{max-height:190px;margin-top:16px;padding-top:15px;border-color:rgba(var(--theme-accent-rgb),.16);opacity:1}
.mafrash-moment__action{display:flex;align-items:center;justify-content:space-between;margin-top:17px;font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.23em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.35)}
.mafrash-moment__action i{display:grid;width:22px;height:22px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.22);border-radius:50%;font:400 15px/1 'Cormorant Garamond',serif;color:rgba(var(--theme-accent-rgb),.82)}
.mafrash-loom__seal{position:absolute;z-index:3;left:50%;bottom:54px;display:flex;flex-direction:column;align-items:center;width:230px;padding:17px 22px 18px;transform:translateX(-50%);border:1px solid rgba(var(--theme-accent-rgb),.34);background:rgba(var(--theme-surface-rgb),.92);box-shadow:0 0 0 7px rgba(var(--theme-surface-rgb),.35),0 18px 44px rgba(0,0,0,.2);text-align:center}
.mafrash-loom__seal::before{content:'';position:absolute;left:50%;bottom:100%;width:1px;height:78px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.72))}
.mafrash-loom__seal span{font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.32em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.64)}
.mafrash-loom__seal strong{margin-top:5px;font:600 21px/1 'Cormorant Garamond',serif;letter-spacing:.05em;color:rgba(var(--theme-heading-rgb),.94)}
.lore-history__footer{display:flex;align-items:center;justify-content:space-between;max-width:1160px;margin:0 auto;padding:30px 46px 54px;border-top:1px solid rgba(var(--theme-contrast-rgb),.065);font:500 8px/1 'Hanken Grotesk',sans-serif;letter-spacing:.28em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.28)}
@keyframes sigil-breathe{0%,100%{filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.08));transform:scale(.98)}50%{filter:drop-shadow(0 0 16px rgba(var(--theme-accent-rgb),.2));transform:scale(1.02)}}
@media (max-width:820px){
  .lore-history{left:0;padding-bottom:58px}.lore-history__texture{left:0}.lore-history__header{padding:22px 22px 0}.lore-history__index{display:none}
  .lore-history__intro{margin-top:42px;padding:0 24px}.lore-history__sigil{width:70px;height:70px;margin-bottom:20px}.lore-history h1{font-size:46px;line-height:.96}.lore-history__lead{font-size:18px}.lore-history__note{padding:16px 20px}.lore-history__note::before,.lore-history__note::after{display:none}
  .mafrash-loom{margin-top:46px;padding:24px 18px 150px}.mafrash-loom::before{inset:0 4px 104px}.mafrash-loom__warp{left:36px;transform:none}.mafrash-moment{display:block;min-height:0;padding:27px 0 27px 70px}.mafrash-moment__weft{left:35px;right:0}.mafrash-moment__number{left:36px;width:34px;height:34px;font-size:8px}.mafrash-moment__card,.mafrash-moment--left .mafrash-moment__card,.mafrash-moment--right .mafrash-moment__card{width:100%;margin:0;padding:22px 22px 19px}.mafrash-moment--left .mafrash-moment__card:hover,.mafrash-moment--right .mafrash-moment__card:hover,.mafrash-moment--left.is-open .mafrash-moment__card,.mafrash-moment--right.is-open .mafrash-moment__card{transform:translateX(3px)}
  .mafrash-moment__card strong{font-size:25px}.mafrash-loom__seal{left:36px;bottom:33px;width:190px;transform:translateX(-14px);align-items:flex-start;text-align:left}.mafrash-loom__seal::before{left:14px}.lore-history__footer{padding:26px 22px 32px}.lore-history__footer>span{display:none}
}
@media (prefers-reduced-motion:reduce){.lore-history__sigil{animation:none}.mafrash-moment__card,.mafrash-moment__detail{transition:none}}
</style>
