<script setup>
import { tokenizeRuleText, getRuleTooltip } from '~/utils/ruleText5e.js'

const props = defineProps({
  text: { type: [String, Number], required: true },
  currentPath: { type: String, default: '' },
  excludePaths: { type: Array, default: () => [] }
})

const tokens = computed(() => String(props.text || '')
  .split(/(\*\*[^*\n]+\*\*)/g)
  .filter(Boolean)
  .flatMap(segment => {
    const bold = segment.startsWith('**') && segment.endsWith('**')
    const text = bold ? segment.slice(2, -2) : segment
    return tokenizeRuleText(text, props.currentPath, props.excludePaths).map(token => ({ ...token, bold }))
  }))

const tip = ref(null)
let showTimer = null
let hideTimer = null
let hoveredPath = null

function tipPosition(target) {
  const rect = target.getBoundingClientRect()
  const below = rect.bottom + 150 < window.innerHeight
  return {
    x: Math.min(Math.max(rect.left + rect.width / 2, 172), window.innerWidth - 172),
    y: below ? rect.bottom + 10 : rect.top - 10,
    below
  }
}

function onLinkEnter(event, token) {
  const target = event.currentTarget
  hoveredPath = token.path
  window.clearTimeout(showTimer)
  window.clearTimeout(hideTimer)
  showTimer = window.setTimeout(async () => {
    const info = await getRuleTooltip(token.path)
    if (!info || hoveredPath !== token.path) return
    tip.value = { mode: 'rule', path: token.path, ...info, ...tipPosition(target) }
  }, 200)
}

function hideNow() {
  hoveredPath = null
  window.clearTimeout(showTimer)
  window.clearTimeout(hideTimer)
  tip.value = null
}

function onLeave() {
  hoveredPath = null
  window.clearTimeout(showTimer)
  window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => { tip.value = null }, 180)
}

function onTipEnter() {
  window.clearTimeout(hideTimer)
  if (tip.value?.path) hoveredPath = tip.value.path
}

function onTipLeave() {
  onLeave()
}

function onDiceEnter(event) {
  window.clearTimeout(showTimer)
  window.clearTimeout(hideTimer)
  tip.value = { mode: 'dice', ...tipPosition(event.currentTarget) }
}

function rollDice(event, token) {
  const { count, sides, mod } = token.dice
  const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * sides))
  const total = rolls.reduce((sum, roll) => sum + roll, 0) + mod

  let breakdown = ''
  if (count > 1 || mod) {
    breakdown = rolls.join(' + ')
    if (mod) breakdown += mod > 0 ? ` + ${mod}` : ` − ${Math.abs(mod)}`
  }

  tip.value = {
    mode: 'dice',
    result: total,
    formula: token.text,
    breakdown,
    ...tipPosition(event.currentTarget)
  }

  // На сенсорных устройствах нет mouseleave — прячем результат сами.
  window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => { tip.value = null }, 2600)
}

onBeforeUnmount(() => {
  window.clearTimeout(showTimer)
  window.clearTimeout(hideTimer)
})
</script>

<template>
  <span class="rt">
    <template v-for="(token, i) in tokens" :key="i">
      <NuxtLink
        v-if="token.type === 'link' || token.type === 'adv' || token.type === 'dis'"
        :to="token.path"
        class="rt-link"
        :class="{ 'rt-adv': token.type === 'adv', 'rt-dis': token.type === 'dis', 'rt-bold': token.bold }"
        @mouseenter="onLinkEnter($event, token)"
        @mouseleave="onLeave"
        @focus="onLinkEnter($event, token)"
        @blur="onLeave"
        @click="hideNow"
      >{{ token.text }}</NuxtLink>
      <button
        v-else-if="token.type === 'dice'"
        type="button"
        class="rt-dice"
        :class="{ 'rt-bold': token.bold }"
        :aria-label="`Бросить ${token.text}`"
        @mouseenter="onDiceEnter($event)"
        @mouseleave="onLeave"
        @focus="onDiceEnter($event)"
        @blur="onLeave"
        @click="rollDice($event, token)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>{{ token.text }}
      </button>
      <strong v-else-if="token.bold" class="rt-bold">{{ token.text }}</strong>
      <template v-else>{{ token.text }}</template>
    </template>

    <Teleport to="body">
      <Transition name="rt-tip">
        <div
          v-if="tip"
          class="rt-tip"
          :class="{ above: !tip.below, dice: tip.mode === 'dice' }"
          :style="{ left: `${tip.x}px`, top: `${tip.y}px` }"
          :role="tip.mode === 'rule' ? 'dialog' : 'tooltip'"
          :aria-label="tip.mode === 'rule' ? `Кратко: ${tip.title}` : undefined"
          @mouseenter="onTipEnter"
          @mouseleave="onTipLeave"
        >
          <template v-if="tip.mode === 'dice'">
            <div v-if="tip.result === undefined" class="rt-tip-hint">Нажмите для броска</div>
            <div v-else class="rt-tip-roll">
              <b>{{ tip.result }}</b>
              <span>
                {{ tip.formula }}<template v-if="tip.breakdown">: {{ tip.breakdown }}</template>
              </span>
            </div>
          </template>

          <template v-else>
            <div class="rt-tip-head">
              <b>{{ tip.title }}</b>
              <small v-if="tip.titleEn">{{ tip.titleEn }}</small>
            </div>
            <p v-if="tip.summary">{{ tip.summary }}</p>
            <div class="rt-tip-foot">
              <div v-if="tip.section" class="rt-tip-section">{{ tip.section }}</div>
              <NuxtLink
                v-if="tip.path"
                :to="tip.path"
                class="rt-tip-more"
                :aria-label="`Открыть полное описание: ${tip.title}`"
                title="Открыть полное описание"
                @click="hideNow"
              >…</NuxtLink>
            </div>
          </template>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<style scoped>
.rt-link{
  color:rgba(244,224,170,.92);
  text-decoration:none;
  border-bottom:1px dotted rgba(214,170,96,.45);
  transition:color .16s ease,border-color .16s ease;
}

.rt-link:hover{
  color:#f4e0aa;
  border-bottom-color:rgba(244,224,170,.85);
  border-bottom-style:solid;
}

.rt-link.rt-adv,
.rt-link.rt-dis{
  font-weight:650;
  border-bottom-color:currentColor;
}

.rt-adv{
  color:#8fbe9a;
  font-weight:650;
}

.rt-dis{
  color:#cf7d72;
  font-weight:650;
}

.rt-link.rt-adv:hover{color:#a7d8b1}
.rt-link.rt-dis:hover{color:#e59487}

.rt-bold{
  font-weight:750;
}

.rt-dice{
  display:inline-flex;
  align-items:baseline;
  gap:4px;
  margin:0 1px;
  border:1px solid rgba(214,170,96,.32);
  border-radius:6px;
  background:rgba(214,170,96,.08);
  padding:0 6px 1px;
  color:rgba(244,224,170,.95);
  font:inherit;
  font-size:.88em;
  font-weight:750;
  font-variant-numeric:tabular-nums;
  cursor:pointer;
  transition:background .16s ease,border-color .16s ease,transform .1s ease;
}

.rt-dice svg{
  width:.85em;
  height:.85em;
  align-self:center;
  flex:0 0 auto;
}

.rt-dice:hover{
  border-color:rgba(244,224,170,.6);
  background:rgba(214,170,96,.16);
}

.rt-dice:active{
  transform:translateY(1px);
}

.rt-dice:focus-visible{
  outline:1px solid rgba(214,170,96,.6);
  outline-offset:2px;
}

.rt-tip{
  position:fixed;
  z-index:60;
  width:320px;
  max-width:calc(100vw - 24px);
  transform:translateX(-50%);
  border:1px solid rgba(214,170,96,.32);
  border-radius:10px;
  background:rgba(13,15,21,.97);
  box-shadow:0 14px 40px rgba(0,0,0,.5);
  padding:13px 15px;
  pointer-events:auto;
  font-family:'Hanken Grotesk',system-ui,sans-serif;
}

.rt-tip.above{
  transform:translate(-50%,-100%);
}

.rt-tip.dice{
  width:auto;
  padding:9px 13px;
}

.rt-tip-hint{
  font-size:12px;
  font-weight:700;
  letter-spacing:.05em;
  color:rgba(244,224,170,.9);
  white-space:nowrap;
}

.rt-tip-roll{
  display:flex;
  align-items:baseline;
  gap:10px;
  white-space:nowrap;
}

.rt-tip-roll b{
  font-size:22px;
  line-height:1;
  font-weight:850;
  color:#f4e0aa;
  font-variant-numeric:tabular-nums;
}

.rt-tip-roll span{
  font-size:12px;
  color:rgba(232,236,248,.6);
}

.rt-tip-head{
  display:flex;
  align-items:baseline;
  gap:9px;
}

.rt-tip-head b{
  font-size:14px;
  line-height:1.3;
  font-weight:800;
  color:rgba(244,224,170,.95);
}

.rt-tip-head small{
  font-size:10.5px;
  font-weight:600;
  color:rgba(232,236,248,.4);
}

.rt-tip p{
  margin:7px 0 0;
  font-size:13px;
  line-height:1.5;
  color:rgba(228,234,244,.82);
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:4;
  overflow:hidden;
}

.rt-tip-section{
  font-size:9.5px;
  font-weight:800;
  letter-spacing:.15em;
  text-transform:uppercase;
  color:rgba(214,170,96,.6);
}

.rt-tip-foot{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-top:9px;
}

.rt-tip-more{
  display:inline-grid;
  place-items:center;
  width:29px;
  height:23px;
  flex:0 0 auto;
  border:1px solid rgba(214,170,96,.32);
  border-radius:7px;
  color:#f4e0aa;
  text-decoration:none;
  font-size:18px;
  line-height:1;
  transition:background .16s ease,border-color .16s ease;
}

.rt-tip-more:hover,
.rt-tip-more:focus-visible{
  border-color:rgba(244,224,170,.72);
  background:rgba(214,170,96,.13);
  outline:none;
}

.rt-tip-enter-active,
.rt-tip-leave-active{
  transition:opacity .18s ease;
}

.rt-tip-enter-from,
.rt-tip-leave-to{
  opacity:0;
}

@media (hover:none){
  .rt-tip{
    width:min(320px,calc(100vw - 20px));
  }
}
</style>
