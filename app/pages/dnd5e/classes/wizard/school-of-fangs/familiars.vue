<script setup>
import { WIZARD_FANGS_FAMILIARS } from '~/data/wizardFangsFamiliars.js'
import { toSig, sigKey, bySignature } from '~/utils/shagai5e.js'

const order = ['small', 'medium', 'large']
const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ size: [] })
const rollSize = ref('small')

// Индекс «сигнатура → фамильяр» для каждого размера (свой бросок на каждую таблицу).
const sigMaps = Object.fromEntries(order.map(size =>
  [size, bySignature(WIZARD_FANGS_FAMILIARS[size].familiars, f => toSig(f.roll))]
))

const rollRitual = computed(() => WIZARD_FANGS_FAMILIARS[rollSize.value].ritual)
function resolveFamiliar(roll) {
  return sigMaps[rollSize.value][sigKey(roll.sig)] || null
}

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

function matches(f) {
  if (!query.value) return true
  return `${f.name} ${f.lines.join(' ')}`.toLocaleLowerCase('ru').includes(query.value)
}

const groups = computed(() => order
  .filter(size => !active.size.length || active.size.includes(size))
  .map(size => ({
    id: size,
    title: `${WIZARD_FANGS_FAMILIARS[size].size} фамильяр`,
    code: `с ${WIZARD_FANGS_FAMILIARS[size].level} ур.`,
    items: WIZARD_FANGS_FAMILIARS[size].familiars.filter(matches).map(f => ({
      id: `${size}-${f.number}`,
      title: `${f.number}. ${f.name}`,
      meta: shortCombo(f.roll),
      raw: f
    }))
  }))
  .filter(g => g.items.length))

function shortCombo(roll) {
  return toSig(roll).map((n, i) => n ? `${n}×${['Б', 'А', 'Д', 'Т'][i]}` : null).filter(Boolean).join(' ')
}

const total = order.reduce((s, size) => s + WIZARD_FANGS_FAMILIARS[size].familiars.length, 0)
const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.size.length)

const filters = computed(() => [
  { key: 'size', label: 'Размер', options: order.map(size => ({ value: size, label: WIZARD_FANGS_FAMILIARS[size].size })) }
])
function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.size = [] }

useSeoMeta({
  title: 'Фамильяры Сошид-е-Мута — Школа Клыков — D&D 5e — TKK.club',
  description: 'Конструктор патчфамильяров Школы Клыков: бросьте кости Шагай (4к4) и получите фамильяра по размеру.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/classes/wizard.png"
    emblem-alt="Школа Клыков"
    kicker="Волшебник · Школа Клыков"
    title="Сошид-е-Мута"
    crumb-current="Фамильяры"
    lead="Конструктор патчфамильяров: сшейте существо из обрывков судеб, бросив кости Шагай."
    search-placeholder="Название, способность или характеристика"
    node-prefix="fam"
    query-key="f"
    collapsible
    collapse-label="Все фамильяры"
    :groups="groups"
    :total="total"
    :visible="totalVisible"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #intro>
      <div class="fam-head">
        <div class="fam-sizes" role="tablist" aria-label="Размер фамильяра для броска">
          <button
            v-for="size in order"
            :key="size"
            type="button"
            class="fam-size"
            :class="{ active: rollSize === size }"
            @click="rollSize = size"
          >
            <small>с {{ WIZARD_FANGS_FAMILIARS[size].level }} ур.</small>
            <b>{{ WIZARD_FANGS_FAMILIARS[size].size }}</b>
            <span>ячейка {{ WIZARD_FANGS_FAMILIARS[size].slot }} ур.</span>
          </button>
        </div>

        <dl class="fam-ritual tref-stats">
          <div class="tref-stat"><dt>Длительность</dt><dd>{{ rollRitual.duration }}</dd></div>
          <div class="tref-stat"><dt>Стоимость</dt><dd>{{ rollRitual.cost }}</dd></div>
          <div class="tref-stat"><dt>Композиция</dt><dd>{{ rollRitual.composition }}</dd></div>
          <div class="tref-stat"><dt>Проверка</dt><dd>{{ rollRitual.difficulty }}</dd></div>
        </dl>

        <ShagaiRoll
          :key="rollSize"
          :resolve="resolveFamiliar"
          label="Создать фамильяра · 4к4"
          rolling-label="Ритуал идёт…"
          hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар"
        >
          <template #result="{ entry }">
            <div class="fam-result-name">Фамильяр № {{ entry.number }} · {{ entry.name }}</div>
            <div class="fam-result-card">
              <span class="rt-corner rt-corner-tl" /><span class="rt-corner rt-corner-tr" />
              <span class="rt-corner rt-corner-bl" /><span class="rt-corner rt-corner-br" />
              <FamiliarBody :familiar="entry" />
            </div>
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <FamiliarBody :familiar="item.raw" />
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.fam-head{ margin-top:26px; }

.fam-sizes{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.fam-size{
  display:grid; gap:4px; padding:14px; text-align:left;
  border:1px solid rgba(var(--theme-text-rgb),.1); border-radius:10px;
  background:rgba(var(--theme-contrast-rgb),.014); color:rgba(var(--theme-text-rgb),.58); cursor:pointer;
  transition:border-color .16s ease,background .16s ease,color .16s ease;
}
.fam-size:hover{ border-color:rgba(var(--theme-accent-rgb),.4); }
.fam-size.active{ border-color:rgba(var(--theme-accent-rgb),.55); background:rgba(var(--theme-accent-rgb),.1); color:rgba(var(--theme-accent-strong-rgb),.95); }
.fam-size small,.fam-size span{ font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(var(--theme-text-rgb),.4); }
.fam-size.active small,.fam-size.active span{ color:rgba(var(--theme-accent-rgb),.7); }
.fam-size b{ font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:500; }

.fam-ritual{ margin-top:14px; }

.fam-result-name{
  margin-bottom:12px;
  font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:600;
  letter-spacing:.04em; color:rgba(var(--theme-heading-rgb),.95);
}
.fam-result-card{
  position:relative; padding:22px 24px 20px;
  border:1px solid rgba(var(--theme-accent-rgb),.22); border-radius:10px;
  background:linear-gradient(180deg,rgba(var(--theme-accent-rgb),.05),rgba(var(--theme-contrast-rgb),.008));
}
.rt-corner{ position:absolute; width:14px; height:14px; pointer-events:none; }
.rt-corner-tl{ top:6px; left:6px; border-top:1.5px solid rgba(var(--theme-accent-rgb),.5); border-left:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:5px 0 0 0; }
.rt-corner-tr{ top:6px; right:6px; border-top:1.5px solid rgba(var(--theme-accent-rgb),.5); border-right:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 5px 0 0; }
.rt-corner-bl{ bottom:6px; left:6px; border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5); border-left:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 0 0 5px; }
.rt-corner-br{ bottom:6px; right:6px; border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5); border-right:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 0 5px 0; }

@media (max-width:560px){ .fam-sizes{ grid-template-columns:1fr; } }
</style>
