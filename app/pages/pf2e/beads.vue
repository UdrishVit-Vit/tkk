<script setup>
import { BEAD_EPIGRAPHS, BEAD_LORE } from '~/data/beads5e.js'
import { PF2E_BEADS, PF2E_BEAD_TIERS, PF2E_BEAD_TIER_LABEL, PF2E_BEAD_RULES, PF2E_BEAD_BY_SIG } from '~/data/pf2e/beads.js'
import { sigKey } from '~/utils/shagai5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tier: [] })

function resolveBead(roll) {
  return PF2E_BEAD_BY_SIG[sigKey(roll.sig)] || null
}

const query = computed(() => search.value.trim().toLowerCase())

function powerText(p) {
  const table = p.table ? p.table.rows.flat().join(' ') : ''
  return [p.name, p.trigger, p.text, ...(p.list || []), table].join(' ')
}

function matches(b) {
  if (active.tier.length && !active.tier.includes(b.tier)) return false
  if (!query.value) return true
  return [b.title, b.flavor, b.charges, ...b.traits, ...b.powers.map(powerText)].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(PF2E_BEAD_TIERS).map(([id, title]) => ({
  id,
  title,
  items: PF2E_BEADS.filter(b => b.tier === id && matches(b)).map(b => ({
    id: b.id,
    title: `${b.num}. ${b.title}`,
    badge: `${b.level} ур.`,
    badgeTitle: `Предмет ${b.level} уровня · Сл ${b.dc}`,
    raw: b
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.tier.length)

const filters = computed(() => [
  { key: 'tier', label: 'Уровень предмета', options: Object.entries(PF2E_BEAD_TIER_LABEL).map(([value, label]) => ({ value, label })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.tier = [] }

useSeoMeta({
  title: 'Бусины — Pathfinder 2e — TKK.club',
  description: 'Бусины мира Эноа для Pathfinder 2e: 35 вкладываемых магических предметов с зарядами и историей, бросок 4к4, уровни предметов и активации по правилам PF2e.'
})
</script>

<template>
  <ThreadRefPage
    system-path="/pf2e"
    system-label="Pathfinder 2e"
    kicker="Pathfinder 2e"
    emblem-img="/assets/nodes/businy.svg"
    emblem-alt="Бусины"
    title="Бусины"
    crumb-current="Бусины"
    lead="Крошечные вещи, что переживают хозяев, династии и города. В бусине живёт узел: имя, память, договор. Вы держите её — а она держит вас."
    search-placeholder="Найти бусину или свойство"
    node-prefix="pfbead"
    query-key="b"
    collapsible
    collapse-label="Все бусины"
    :groups="groups"
    :total="PF2E_BEADS.length"
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
      <div class="bead-head">
        <details class="bead-lore">
          <summary>Как работают бусины</summary>
          <div class="bead-lore-body">
            <p><b>Версия для Pathfinder 2e.</b> Предыстории бусин и бросок 4к4 общие с D&D; уровни, Сл, активации и бонусы переписаны по правилам PF2e.</p>
            <blockquote v-for="(p, i) in BEAD_EPIGRAPHS" :key="'e' + i" class="bead-epigraph">{{ p }}</blockquote>
            <p v-for="(p, i) in BEAD_LORE" :key="'l' + i">{{ p }}</p>

            <template v-for="section in PF2E_BEAD_RULES" :key="section.title">
              <h4>{{ section.title }}</h4>
              <p v-for="(p, i) in section.paragraphs" :key="i">{{ p }}</p>
            </template>

            <h4>Какая бусина попалась</h4>
            <p>Какую бусину нашли герои, определяет знаменная кость <b>4к4</b>: по количеству выпавших граней (<b>1 — Бунти</b>, <b>2 — Аюр</b>, <b>3 — Додор</b>, <b>4 — Тахар</b>) находится одна из 35 бусин. Бусины 13 уровня выпадают только при четырёх одинаковых гранях (1,6% бросков), бусины 9 уровня — почти в половине бросков (47%), бусины 5 уровня — в остальных (52%).</p>
          </div>
        </details>

        <ShagaiRoll :resolve="resolveBead" label="Найти бусину · 4к4" hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар">
          <template #result="{ entry }">
            <div class="bead-result-name">{{ entry.num }}. {{ entry.title }}</div>
            <BeadCard :bead="entry" edition="pf2e" framed />
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <BeadCard :bead="item.raw" edition="pf2e" />
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.bead-head{
  margin-top:26px;
}

.bead-lore{
  border:1px solid rgba(var(--theme-text-rgb),.1);
  border-radius:10px;
  background:rgba(var(--theme-contrast-rgb),.012);
  padding:0 16px;
}

.bead-lore summary{
  padding:13px 0;
  font-size:11px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.8);
  cursor:pointer;
  list-style:none;
}

.bead-lore summary::-webkit-details-marker{ display:none; }

.bead-lore summary::before{
  content:'+ ';
  color:rgba(var(--theme-accent-rgb),.7);
}

.bead-lore[open] summary::before{
  content:'− ';
}

.bead-lore-body{
  padding:0 0 14px;
}

.bead-lore-body p{
  margin:0 0 10px;
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  line-height:1.55;
  color:rgba(var(--theme-text-rgb),.78);
}

.bead-lore-body b{
  color:rgba(var(--theme-accent-strong-rgb),.9);
}

.bead-lore-body h4{
  margin:18px 0 8px;
  font-size:11px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.75);
}

.bead-epigraph{
  margin:0 0 12px;
  padding:2px 0 2px 14px;
  border-left:2px solid rgba(var(--theme-accent-rgb),.35);
  font-family:'Cormorant Garamond',serif;
  font-style:italic;
  font-size:17px;
  line-height:1.55;
  color:rgba(var(--theme-accent-rgb),.78);
}

.bead-result-name{
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
  letter-spacing:.04em;
  color:rgba(var(--theme-heading-rgb),.95);
}
</style>
