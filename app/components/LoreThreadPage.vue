<script setup>
defineProps({
  theme: { type: Object, required: true },
  title: { type: String, required: true },
  eyebrow: { type: String, required: true },
  icon: { type: String, required: true },
})
defineEmits(['up'])
</script>

<template>
  <main class="lore-thread-page" :style="{ background: theme.bg }">
    <div class="lore-thread-scroll">
      <div class="lore-thread-canvas">
        <div class="lore-thread-axis" aria-hidden="true"><i /><i /><i /><i /></div>
        <header class="lore-thread-intro">
          <button class="lore-thread-home" type="button" aria-label="Вернуться к миру Эноа" title="Вернуться к миру Эноа" @click="$emit('up')">
            <img :src="icon" width="112" height="112" alt="">
            <span aria-hidden="true">←</span>
          </button>
          <div class="lore-thread-copy">
            <p class="lore-thread-eyebrow">{{ eyebrow }}</p>
            <h1>{{ title }}</h1>
            <div class="lore-thread-note"><slot name="intro" /></div>
          </div>
        </header>
        <div class="lore-thread-body"><slot /></div>
        <div class="lore-thread-end" aria-hidden="true"><i /></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.lore-thread-page{position:fixed;inset:0 0 0 68px;z-index:45;overflow:hidden;color:rgba(var(--theme-text-rgb),.86);font-family:'Hanken Grotesk',sans-serif}
.lore-thread-scroll{height:100%;overflow:auto;background:radial-gradient(ellipse at 12% 20%,rgba(var(--theme-accent-rgb),.035),transparent 65%)}
.lore-thread-canvas{--thread-x:66px;--body-x:138px;position:relative;isolation:isolate;width:min(1240px,100%);min-height:100%;box-sizing:border-box;margin:auto;padding:54px 42px 80px}
.lore-thread-axis{position:absolute;left:var(--thread-x);top:0;bottom:48px;width:16px;transform:translateX(-50%);z-index:-1;pointer-events:none}
.lore-thread-axis i{position:absolute;left:50%;top:0;bottom:0;transform:translateX(-50%)}
.lore-thread-axis i:nth-child(1){width:2px;background:linear-gradient(transparent,rgba(var(--theme-accent-rgb),.48) 2%,rgba(var(--theme-accent-strong-rgb),.66) 50%,rgba(var(--theme-accent-rgb),.42) 98%,transparent);box-shadow:0 0 9px rgba(var(--theme-accent-rgb),.2)}
.lore-thread-axis i:nth-child(2){width:7px;background:rgba(var(--theme-accent-rgb),.18);filter:blur(5px)}
.lore-thread-axis i:nth-child(3),.lore-thread-axis i:nth-child(4){width:1px;background:repeating-linear-gradient(rgba(var(--theme-accent-strong-rgb),.75) 0 6px,transparent 6px 12px);animation:thread-weave 8s linear infinite}
.lore-thread-axis i:nth-child(3){margin-left:-3px}.lore-thread-axis i:nth-child(4){margin-left:3px;animation-direction:reverse;animation-duration:11s}
.lore-thread-intro{position:relative;min-height:240px;padding:20px 0 48px calc(var(--body-x) - 42px)}
.lore-thread-home{position:absolute;left:calc(var(--thread-x) - 42px);top:34px;transform:translateX(-50%);display:grid;place-items:center;width:112px;height:112px;padding:0;border:0;background:transparent;color:var(--gold-bright);cursor:pointer}
.lore-thread-home img{width:100%;height:100%;object-fit:contain;animation:thread-glow 6s ease-in-out infinite;transition:transform .34s ease}
.lore-thread-home:hover img,.lore-thread-home:focus-visible img{transform:scale(1.085)}.lore-thread-home span{position:absolute;bottom:-15px;padding:1px 5px;background:var(--theme-bg);font:18px/1 'Hanken Grotesk',sans-serif}
.lore-thread-eyebrow{margin:0 0 17px;color:rgba(var(--theme-accent-rgb),.62);font:600 9px/1.4 'Hanken Grotesk',sans-serif;letter-spacing:.25em;text-transform:uppercase}
.lore-thread-copy h1{margin:0;font:600 clamp(51px,5.2vw,76px)/.95 'Cormorant Garamond',serif;color:rgba(var(--theme-heading-rgb),.98)}
.lore-thread-note{max-width:650px;margin:26px 0 0;padding-left:20px;border-left:1px solid rgba(var(--theme-accent-rgb),.42);font:italic 19px/1.55 'Cormorant Garamond',serif;color:rgba(var(--theme-text-rgb),.65)}
.lore-thread-note :deep(p){margin:0}.lore-thread-note :deep(a){display:inline-block;margin-top:12px;font:600 10px 'Hanken Grotesk',sans-serif;color:var(--gold-bright);text-decoration:none}
.lore-thread-body{padding-left:calc(var(--body-x) - 42px)}
.lore-thread-body :deep(.lore-thread-section){position:relative}
.lore-thread-body :deep(.lore-thread-section::before){content:'';position:absolute;left:calc(var(--thread-x) - var(--body-x));top:22px;width:14px;height:14px;box-sizing:border-box;border:1px solid rgba(var(--theme-accent-strong-rgb),.7);background:var(--theme-bg);transform:translateX(-50%) rotate(45deg);box-shadow:0 0 0 5px rgba(var(--theme-surface-rgb),.65),0 0 16px rgba(var(--theme-accent-rgb),.15)}
.lore-thread-body :deep(.lore-thread-section::after){content:'';position:absolute;left:calc(var(--thread-x) - var(--body-x) + 12px);top:29px;width:44px;height:1px;background:rgba(var(--theme-accent-rgb),.25);pointer-events:none}
.lore-thread-end{position:relative;height:90px}.lore-thread-end i{position:absolute;left:calc(var(--thread-x) - 42px);bottom:0;width:9px;height:9px;border:1px solid rgba(var(--theme-accent-rgb),.6);background:var(--theme-bg);transform:translateX(-50%) rotate(45deg)}
.lore-thread-home:focus-visible{outline:1px solid var(--gold-bright);outline-offset:4px}
@keyframes thread-weave{to{background-position:0 24px}}@keyframes thread-glow{0%,100%{filter:drop-shadow(0 0 5px rgba(var(--theme-accent-rgb),.14))}50%{filter:drop-shadow(0 0 13px rgba(var(--theme-accent-rgb),.3))}}
@media(max-width:1000px){.lore-thread-canvas{padding-right:24px}}
@media(max-width:760px){.lore-thread-page{left:0}.lore-thread-canvas{--thread-x:39px;--body-x:83px;padding:34px 16px 96px}.lore-thread-intro{padding:12px 0 38px calc(var(--body-x) - 16px);min-height:210px}.lore-thread-home{left:calc(var(--thread-x) - 16px);top:18px;width:68px;height:68px}.lore-thread-copy h1{font-size:46px;overflow-wrap:anywhere}.lore-thread-eyebrow{font-size:7px;letter-spacing:.15em}.lore-thread-note{margin-top:20px;padding-left:14px;font-size:16px}.lore-thread-body{padding-left:calc(var(--body-x) - 16px)}.lore-thread-body :deep(.lore-thread-section::before){width:10px;height:10px}.lore-thread-body :deep(.lore-thread-section::after){left:calc(var(--thread-x) - var(--body-x) + 9px);width:22px;top:27px}.lore-thread-end i{left:calc(var(--thread-x) - 16px)}}
@media(prefers-reduced-motion:reduce){.lore-thread-axis i,.lore-thread-home img{animation:none}.lore-thread-home img{transition:none}}
</style>
