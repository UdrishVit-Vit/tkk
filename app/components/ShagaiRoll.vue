<script setup>
import { SHAGAI_FACES, rollShagai, shagaiCombo } from '~/utils/shagai5e.js'

const props = defineProps({
  // (result) => найденная запись. result = { dice, faces, counts, sig }.
  resolve: { type: Function, default: null },
  label: { type: String, default: 'Бросить · 4к4' },
  rollingLabel: { type: String, default: 'Кости катятся…' },
  hint: { type: String, default: '' }
})

const emit = defineEmits(['rolled'])

const rolling = ref(false)
const shown = ref([1, 2, 3, 4]) // грань (1..4), показываемая на каждой кости
const result = ref(null)
let spin = null
const settleTimers = []

function clearTimers() {
  if (spin) { clearInterval(spin); spin = null }
  while (settleTimers.length) clearTimeout(settleTimers.pop())
}

function roll() {
  if (rolling.value) return
  clearTimers()
  const outcome = rollShagai()
  rolling.value = true
  result.value = null

  // Все кости мелькают случайными гранями…
  spin = setInterval(() => {
    shown.value = shown.value.map(() => 1 + Math.floor(Math.random() * 4))
  }, 80)

  // …и по очереди «оседают» на свою грань.
  outcome.dice.forEach((d, i) => {
    settleTimers.push(setTimeout(() => {
      shown.value = shown.value.map((v, idx) => (idx <= i ? outcome.dice[idx] : v))
    }, 620 + i * 240))
  })

  settleTimers.push(setTimeout(() => {
    if (spin) { clearInterval(spin); spin = null }
    shown.value = [...outcome.dice]
    rolling.value = false
    const entry = props.resolve ? props.resolve(outcome) : null
    result.value = { ...outcome, entry, combo: shagaiCombo(outcome.sig) }
    emit('rolled', result.value)
  }, 620 + 4 * 240 + 120))
}

defineExpose({ roll })
onBeforeUnmount(clearTimers)
</script>

<template>
  <div class="shagai">
    <div class="shagai-tray" :class="{ rolling }" aria-hidden="true">
      <div v-for="(faceValue, i) in shown" :key="i" class="shagai-die" :style="{ '--d': i }">
        <img :src="SHAGAI_FACES[faceValue - 1].img" :alt="SHAGAI_FACES[faceValue - 1].label">
        <span v-if="!rolling && result" class="shagai-die-cap">{{ result.dice[i] }} · {{ SHAGAI_FACES[result.dice[i] - 1].label }}</span>
      </div>
    </div>

    <div class="shagai-controls">
      <button type="button" class="shagai-btn" :disabled="rolling" @click="roll">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/></svg>
        {{ rolling ? rollingLabel : label }}
      </button>
      <span v-if="hint" class="shagai-hint">{{ hint }}</span>
    </div>

    <Transition name="shagai-fade">
      <div v-if="result && !rolling" class="shagai-result">
        <div class="shagai-combo">
          <span class="shagai-combo-arrow">Выпало:</span>
          <b>{{ result.combo }}</b>
        </div>
        <div v-if="result.entry === null" class="shagai-empty">Для этой комбинации нет записи.</div>
        <slot v-else name="result" :entry="result.entry" :dice="result.dice" :faces="result.faces" :counts="result.counts" :sig="result.sig" :combo="result.combo" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.shagai{ margin-top:22px; }

.shagai-tray{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
  margin-bottom:16px;
}

.shagai-die{
  position:relative;
  display:grid;
  place-items:center;
  width:74px;
  height:74px;
  border:1px solid rgba(214,170,96,.4);
  border-radius:12px;
  background:radial-gradient(120% 120% at 30% 25%, #efe6d2, #d8cbb0 70%, #c9ba99);
  box-shadow:inset 0 1px 2px rgba(255,255,255,.5), 0 6px 14px rgba(0,0,0,.3);
}

.shagai-die img{
  width:52px;
  height:52px;
  object-fit:contain;
}

.shagai-tray.rolling .shagai-die{
  animation:shagai-shake .16s ease-in-out infinite;
  animation-delay:calc(var(--d) * .04s);
}

.shagai-tray:not(.rolling) .shagai-die{
  animation:shagai-settle .45s cubic-bezier(.34,1.4,.5,1) both;
  animation-delay:calc(.5s + var(--d) * .24s);
}

@keyframes shagai-shake{
  0%,100%{ transform:translateY(0) rotate(-4deg); }
  50%{ transform:translateY(-4px) rotate(5deg); }
}

@keyframes shagai-settle{
  0%{ transform:scale(1.18) rotate(-8deg); }
  60%{ transform:scale(.96) rotate(3deg); }
  100%{ transform:scale(1) rotate(0); }
}

.shagai-die-cap{
  position:absolute;
  bottom:-18px;
  left:50%;
  transform:translateX(-50%);
  white-space:nowrap;
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.04em;
  color:rgba(214,170,96,.8);
}

.shagai-controls{
  display:flex;
  align-items:center;
  gap:14px;
  flex-wrap:wrap;
  margin-top:10px;
}

.shagai-btn{
  display:inline-flex;
  align-items:center;
  gap:10px;
  border:1px solid rgba(214,170,96,.45);
  border-radius:10px;
  background:rgba(214,170,96,.1);
  padding:12px 22px;
  color:#f4e0aa;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
  letter-spacing:.06em;
  text-transform:uppercase;
  cursor:pointer;
  transition:border-color .16s ease,background .16s ease,transform .1s ease;
}

.shagai-btn svg{ width:20px; height:20px; }

.shagai-btn:hover:not(:disabled){
  border-color:rgba(244,224,170,.7);
  background:rgba(214,170,96,.18);
}

.shagai-btn:active:not(:disabled){ transform:translateY(1px); }
.shagai-btn:disabled{ opacity:.7; cursor:default; }

.shagai-hint{
  font-size:11px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:rgba(232,236,248,.4);
}

.shagai-result{ margin-top:20px; }

.shagai-combo{
  display:flex;
  align-items:baseline;
  gap:10px;
  margin-bottom:14px;
}

.shagai-combo-arrow{
  font-size:10px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(232,236,248,.4);
}

.shagai-combo b{
  font-family:'Cormorant Garamond',serif;
  font-size:19px;
  font-weight:600;
  letter-spacing:.03em;
  color:rgba(244,224,170,.92);
}

.shagai-empty{
  color:rgba(232,236,248,.5);
  font-style:italic;
}

.shagai-fade-enter-active{ transition:opacity .3s ease; }
.shagai-fade-enter-from{ opacity:0; }

@media (prefers-reduced-motion:reduce){
  .shagai-tray .shagai-die{ animation:none !important; }
}
</style>
