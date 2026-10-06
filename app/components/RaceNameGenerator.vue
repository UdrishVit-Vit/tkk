<script setup>
import { availableRows, drawNameRow, rowKeys, worldNameTable } from '~/data/raceNameRoll.js'

// Генератор имён для раздела «Имена» на странице расы. Бросок 4к4 упорядочивается
// по возрастанию и даёт одно из 35 сочетаний — строку таблицы подрасы.
const props = defineProps({
  tables: { type: Array, required: true },
  // Короткое название выбранной разновидности на странице («Дангун», «Эрх»…):
  // генератор сам переключается на её таблицу, если такая есть.
  activeVariety: { type: String, default: '' },
  showResearch: { type: Boolean, default: false }
})

const pickedLabel = ref(null)
const roll = ref(null)
const usedNames = ref(new Set())

const matchedTable = computed(() => props.tables.find(t => t.variety && t.variety === props.activeVariety) || null)
const table = computed(() => worldNameTable(
  props.tables.find(t => t.label === pickedLabel.value)
  || matchedTable.value
  || props.tables[0]
))

// Смена разновидности на странице — новая таблица и чистый результат.
watch(() => props.activeVariety, () => {
  pickedLabel.value = null
  roll.value = null
})
watch(() => props.tables, () => {
  pickedLabel.value = null
  roll.value = null
})

function pickTable(label) {
  pickedLabel.value = label
  roll.value = null
}

const exhausted = computed(() => availableRows(table.value, usedNames.value).length === 0)

function rollName() {
  const next = drawNameRow(table.value, usedNames.value)
  if (!next) return
  roll.value = next
  for (const key of rowKeys(table.value, next.index)) usedNames.value.add(key)
}

const result = computed(() => {
  if (!roll.value || roll.value.index < 0) return null
  const t = table.value
  const i = roll.value.index
  if (t.names) return { neutral: t.isLostName?.(t.names[i]) ? 'Безымянный — утерянное имя Цикла' : t.names[i] }
  return { m: t.m[i], f: t.f[i] }
})

function isLong(name = '') {
  return name.length > 18
}
</script>

<template>
  <div class="rng">
    <div v-if="tables.length > 1" class="rng-tabs" role="tablist" aria-label="Таблица имён">
      <button
        v-for="t in tables"
        :key="t.label"
        type="button"
        role="tab"
        class="rng-tab"
        :class="{ active: t.label === table.label }"
        :aria-selected="t.label === table.label"
        @click="pickTable(t.label)"
      >
        {{ t.label }}
      </button>
    </div>

    <p v-if="showResearch" class="rng-hint">{{ table.hint }}</p>

    <transition name="rng-fade">
      <div v-if="result" class="rng-result" aria-live="polite">
        <div v-if="roll.dice.length" class="rng-dice" :aria-label="`Бросок 4к4: ${roll.dice.join(', ')}`">
          <span v-if="roll.prefixRoll" class="rng-die-tag">1к13: {{ roll.prefixRoll }}</span>
          <span class="rng-die-tag">4к4</span>
          <span class="rng-dice-values">{{ roll.dice.join(' · ') }}</span>
          <span class="rng-dice-sorted">→ {{ roll.sorted.join(' ') }}</span>
        </div>
        <div v-if="result.neutral" class="rng-name-row">
          <span class="rng-lbl">Имя</span>
          <span class="rng-name" :class="{ long: isLong(result.neutral) }">{{ result.neutral }}</span>
        </div>
        <template v-else>
          <div class="rng-name-row">
            <span class="rng-lbl">{{ table.columnLabels?.m || 'Мужское' }}</span>
            <span class="rng-name" :class="{ long: isLong(result.m) }">{{ result.m }}</span>
          </div>
          <div class="rng-name-row">
            <span class="rng-lbl">{{ table.columnLabels?.f || 'Женское' }}</span>
            <span class="rng-name" :class="{ long: isLong(result.f) }">{{ result.f }}</span>
          </div>
        </template>
      </div>
    </transition>

    <p v-if="exhausted" class="rng-hint" role="status">Все варианты этой таблицы уже показаны.<template v-if="tables.length > 1"> Можно выбрать другую таблицу.</template></p>
    <button class="rng-roll" type="button" :disabled="exhausted" @click="rollName">
      {{ exhausted ? 'Варианты закончились' : result ? 'Придумать ещё' : 'Придумать имя' }}
    </button>
    <RaceNameGuide v-if="showResearch" :table="table" />
  </div>
</template>

<style scoped>
/* Оформление повторяет блок имён Вету (thread-dossier.css): тот подключён к
   странице как scoped и не доходит до элементов этого компонента. */
.rng{margin-top:14px}
.rng-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}
.rng-tab{font-family:'Hanken Grotesk',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:999px;border:1px solid rgba(var(--theme-accent-rgb),.35);background:transparent;color:rgba(var(--theme-text-rgb),.7);cursor:pointer;transition:all .2s}
.rng-tab:hover{border-color:rgba(var(--theme-accent-rgb),.7);color:rgba(var(--theme-accent-strong-rgb),.95)}
.rng-tab.active{background:rgba(var(--theme-accent-rgb),.9);border-color:transparent;color:rgba(20,15,6,.95)}
.rng-hint{font-family:'Cormorant Garamond',serif;font-size:15.5px;line-height:1.6;font-style:italic;color:rgba(var(--theme-text-rgb),.72);margin:0 0 14px;border-left:2px solid rgba(var(--theme-accent-rgb),.45);padding-left:12px}
.rng-result{display:flex;flex-direction:column;gap:10px;padding:16px 20px;border:1px solid rgba(var(--theme-accent-rgb),.4);border-radius:12px;background:rgba(var(--theme-accent-rgb),.1)}
.rng-dice{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-family:'Cormorant Garamond',serif;font-size:15px;color:rgba(var(--theme-text-rgb),.65)}
.rng-die-tag{display:inline-flex;align-items:center;justify-content:center;min-width:44px;padding:3px 10px;border:1px solid rgba(var(--theme-accent-rgb),.45);border-radius:6px;font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;letter-spacing:.04em;color:rgba(var(--theme-accent-strong-rgb),.95);background:rgba(var(--theme-accent-rgb),.1)}
.rng-dice-values{letter-spacing:.06em}
.rng-dice-sorted{color:rgba(var(--theme-accent-strong-rgb),.85)}
.rng-name-row{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}
.rng-lbl{min-width:72px;font-family:'Hanken Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.7);align-self:center}
.rng-name{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;line-height:1.1;letter-spacing:.04em;color:rgba(var(--theme-accent-strong-rgb),.98);overflow-wrap:anywhere;min-width:0;flex:1}
.rng-name.long{font-size:20px;letter-spacing:.02em;line-height:1.25}
.rng-roll{display:block;width:100%;margin:14px 0 0;padding:13px 22px;border:1px solid rgba(var(--theme-accent-rgb),.5);border-radius:12px;background:rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-accent-strong-rgb),.97);font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;letter-spacing:.06em;text-align:center;cursor:pointer;transition:all .2s}
.rng-roll:disabled{opacity:.5;cursor:default}
.rng-roll:not(:disabled):hover{background:rgba(var(--theme-accent-rgb),.2);border-color:rgba(var(--theme-accent-rgb),.75);color:#f0d890}
.rng-roll:focus-visible,.rng-tab:focus-visible{outline:2px solid rgba(var(--theme-accent-rgb),.8);outline-offset:2px}
.rng-fade-enter-active,.rng-fade-leave-active{transition:opacity .22s,transform .22s}
.rng-fade-enter-from,.rng-fade-leave-to{opacity:0;transform:translateY(-5px)}
@media (max-width:600px){
  .rng-result{padding:14px 14px}
  .rng-name{font-size:25px}
  .rng-name.long{font-size:17px}
  .rng-lbl{min-width:0;width:100%}
}
</style>
