<script setup>
import { BEADS_5E, BEAD_TIERS, BEAD_TIER_LABEL, BEAD_EPIGRAPHS, BEAD_LORE, BEAD_RULES, BEAD_BY_SIG } from '~/data/beads5e.js'
import { BEADS_2024, BEAD_RULES_2024, BEAD_2024_BY_SIG } from '~/data/dnd55e/tools2024.js'
import { sigKey } from '~/utils/shagai5e.js'

const props = defineProps({
  edition: { type: String, default: '2014' }
})

const is2024 = computed(() => props.edition === '2024')
const beads = computed(() => is2024.value ? BEADS_2024 : BEADS_5E)
const beadRules = computed(() => is2024.value ? BEAD_RULES_2024 : BEAD_RULES)
const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tier: [] })

function resolveBead(roll) {
  const index = is2024.value ? BEAD_2024_BY_SIG : BEAD_BY_SIG
  return index[sigKey(roll.sig)] || null
}

const query = computed(() => search.value.trim().toLowerCase())

function powerText(p) {
  const table = p.table ? p.table.rows.flat().join(' ') : ''
  return [p.name, p.text, ...(p.list || []), table].join(' ')
}

function matches(b) {
  if (active.tier.length && !active.tier.includes(b.tier)) return false
  if (!query.value) return true
  return [b.title, b.flavor, b.charges, ...b.powers.map(powerText)].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(BEAD_TIERS).map(([id, title]) => ({
  id,
  title: is2024.value ? title.replace('СЛ', 'Сл') : title,
  items: beads.value.filter(b => b.tier === id && matches(b)).map(b => ({
    id: b.id,
    title: `${b.num}. ${b.title}`,
    badge: `${is2024.value ? 'Сл' : 'СЛ'} ${b.dc}`,
    badgeTitle: `Сложность опознания — ${BEAD_TIER_LABEL[b.tier]} бусина`,
    raw: b
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.tier.length)

const filters = computed(() => [
  { key: 'tier', label: 'Редкость', options: Object.entries(BEAD_TIER_LABEL).map(([value, label]) => ({ value, label })) }
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
  title: () => is2024.value ? 'Бусины — D&D 5.5e 2024 — TKK.club' : 'Бусины — D&D 5e — TKK.club',
  description: () => is2024.value
    ? 'Бусины мира Эноа для D&D 5.5e 2024: 35 малых магических предметов с зарядами и историей, бросок 4к4 и свойства по правилам редакции 2024.'
    : 'Бусины мира Эноа для D&D 5e: 35 малых магических предметов с зарядами и историей. Бросьте 4к4, чтобы узнать, какая бусина попала в руки героям.'
})
</script>

<template>
  <ThreadRefPage
    :system-path="is2024 ? '/dnd55e' : '/dnd5e'"
    :system-label="is2024 ? 'D&D 5.5e' : 'D&D 5e'"
    :kicker="is2024 ? 'D&D 5.5e · редакция 2024' : 'D&D 5e'"
    emblem-img="/assets/nodes/businy.svg"
    emblem-alt="Бусины"
    title="Бусины"
    crumb-current="Бусины"
    lead="Крошечные вещи, что переживают хозяев, династии и города. В бусине живёт узел: имя, память, договор. Вы держите её — а она держит вас."
    search-placeholder="Найти бусину или свойство"
    node-prefix="bead"
    query-key="b"
    collapsible
    collapse-label="Все бусины"
    :groups="groups"
    :total="beads.length"
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
            <p v-if="is2024"><b>Версия для D&D 2024.</b> Игровые термины, состояния и ссылки на заклинания приведены к редакции 2024; авторская механика зарядов и броска 4к4 сохранена.</p>
            <blockquote v-for="(p, i) in BEAD_EPIGRAPHS" :key="'e' + i" class="bead-epigraph">{{ p }}</blockquote>
            <p v-for="(p, i) in BEAD_LORE" :key="'l' + i">{{ p }}</p>

            <template v-for="section in beadRules" :key="section.title">
              <h4>{{ section.title }}</h4>
              <p v-for="(p, i) in section.paragraphs" :key="i">{{ p }}</p>
            </template>

            <h4>Какая бусина попалась</h4>
            <p>Какую бусину нашли герои, определяет знаменная кость <b>4к4</b> — так же, как у чая и знамений: по количеству выпавших граней (<b>1 — Бунти</b>, <b>2 — Аюр</b>, <b>3 — Додор</b>, <b>4 — Тахар</b>) находится одна из 35 бусин. Очень редкие бусины выпадают только при четырёх одинаковых гранях (1,6% бросков), редкие — почти в половине бросков (47%), необычные — в остальных (52%).</p>
          </div>
        </details>

        <ShagaiRoll :resolve="resolveBead" label="Найти бусину · 4к4" hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар">
          <template #result="{ entry }">
            <div class="bead-result-name">{{ entry.num }}. {{ entry.title }}</div>
            <BeadCard :bead="entry" :edition="is2024 ? '2024' : ''" framed />
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <BeadCard :bead="item.raw" :edition="is2024 ? '2024' : ''" />
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
