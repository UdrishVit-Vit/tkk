<script setup>
import { OMENS_5E, OMEN_TIERS, OMEN_TIER_LABEL, OMEN_BY_SIG } from '~/data/omens5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tier: [] })

function resolveOmen(roll) {
  return OMEN_BY_SIG[roll.sig.join(',')] || null
}

const query = computed(() => search.value.trim().toLowerCase())

function matches(o) {
  if (active.tier.length && !active.tier.includes(o.tier)) return false
  if (!query.value) return true
  return [o.title, o.flavor, o.effect, o.success, o.fail].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(OMEN_TIERS).map(([id, title]) => ({
  id,
  title,
  items: OMENS_5E.filter(o => o.tier === id && matches(o)).map(o => ({
    id: o.id,
    title: `${o.num}. ${o.title}`,
    badge: `СЛ ${o.dc}`,
    badgeTitle: `Сложность влияния — ${OMEN_TIER_LABEL[o.dc]}`,
    raw: o
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.tier.length)

const filters = computed(() => [
  { key: 'tier', label: 'Сложность', options: Object.entries(OMEN_TIERS).map(([value, label]) => ({ value, label })) }
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
  title: 'Знамения — D&D 5e — TKK.club',
  description: 'Знамения мира Эноа для D&D 5e: бросьте 4к4 и узнайте примету пустыни, её эффект и исход влияния.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/znameniya.png"
    emblem-alt="Знамения"
    title="Знамения"
    crumb-current="Знамения"
    lead="Мир старше, чем кажется. В Эноа даже боги подвластны знамениям, когда кузница судьбы создаёт их."
    search-placeholder="Найти знамение или эффект"
    node-prefix="omen"
    query-key="o"
    collapsible
    collapse-label="Все знамения"
    :groups="groups"
    :total="OMENS_5E.length"
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
      <div class="omens-head">
        <details class="omens-lore">
          <summary>Как работают знамения</summary>
          <div class="omens-lore-body">
            <p>Многие жители Эноа забыли о древних знаках, но среди гор и степей до сих пор всматриваются в лучи Шамаса в поисках знаков от мироздания, следуя им фанатично и без вопросов.</p>
            <p>Знамение — это проявление окружающего мира и инструмент, помогающий ГМу задать настроение сессии. В начале сессии или в любой удобный момент кто-то из игроков делает бросок на знамение. Кинув <b>4к4</b>, игрок озвучивает результат на каждой кости, и у каждого знамения есть особый эффект, который действует сразу после объявления результата — пока не явится новое знамение.</p>
            <p>Грани знаменной кости: <b>1 — Бунти</b>, <b>2 — Аюр</b>, <b>3 — Додор</b>, <b>4 — Тахар</b>. По количеству выпавших граней определяется одно из 35 знамений. Например, 4, 1, 1, 2 (одна четвёрка, две единицы, одна двойка) — это «Сломанная клетка».</p>
            <p>Эффект знамения влияет только на персонажей игроков, если не указано иное. За одну сессию может случиться несколько знамений — вы сами решаете, действует одно или заменяет другое.</p>
            <p><b>Сложность знамения.</b> В момент определения знамения группа может попытаться повлиять на него проверкой Интеллекта (Религия) — один бросок от группы. СЛ малых знамений — 13, средних — 15, больших — 19; последствия успеха и провала указаны в каждом знамении.</p>
          </div>
        </details>

        <ShagaiRoll :resolve="resolveOmen" label="Бросить знамение · 4к4" hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар">
          <template #result="{ entry }">
            <div class="omens-result-name">{{ entry.num }}. {{ entry.title }}</div>
            <OmenCard :omen="entry" framed />
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <OmenCard :omen="item.raw" />
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.omens-head{
  margin-top:26px;
}

.omens-lore{
  border:1px solid rgba(var(--theme-text-rgb),.1);
  border-radius:10px;
  background:rgba(var(--theme-contrast-rgb),.012);
  padding:0 16px;
}

.omens-lore summary{
  padding:13px 0;
  font-size:11px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.8);
  cursor:pointer;
  list-style:none;
}

.omens-lore summary::-webkit-details-marker{ display:none; }

.omens-lore summary::before{
  content:'+ ';
  color:rgba(var(--theme-accent-rgb),.7);
}

.omens-lore[open] summary::before{
  content:'− ';
}

.omens-lore-body{
  padding:0 0 14px;
}

.omens-lore-body p{
  margin:0 0 10px;
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  line-height:1.55;
  color:rgba(var(--theme-text-rgb),.78);
}

.omens-lore-body b{
  color:rgba(var(--theme-accent-strong-rgb),.9);
}

.omens-roll-btn{
  display:inline-flex;
  align-items:center;
  gap:10px;
  margin-top:18px;
  border:1px solid rgba(var(--theme-accent-rgb),.45);
  border-radius:10px;
  background:rgba(var(--theme-accent-rgb),.1);
  padding:12px 22px;
  color:var(--theme-accent-strong);
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
  letter-spacing:.06em;
  text-transform:uppercase;
  cursor:pointer;
  transition:border-color .16s ease,background .16s ease,transform .1s ease;
}

.omens-roll-btn svg{
  width:20px;
  height:20px;
}

.omens-roll-btn:hover{
  border-color:rgba(var(--theme-accent-strong-rgb),.7);
  background:rgba(var(--theme-accent-rgb),.18);
}

.omens-roll-btn:active{
  transform:translateY(1px);
}

.omens-result{
  margin-top:18px;
}

.omens-dice{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:10px;
  margin-bottom:14px;
}

.omens-die{
  display:inline-flex;
  align-items:baseline;
  gap:6px;
  border:1px solid rgba(var(--theme-accent-rgb),.32);
  border-radius:8px;
  background:rgba(var(--theme-accent-rgb),.08);
  padding:6px 12px;
  font-size:13px;
  font-weight:700;
  letter-spacing:.04em;
  color:rgba(var(--theme-text-rgb),.8);
}

.omens-die b{
  font-size:16px;
  color:var(--theme-accent-strong);
  font-variant-numeric:tabular-nums;
}

.omens-arrow{
  color:rgba(var(--theme-accent-rgb),.6);
  font-size:18px;
}

.omens-result-name{
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
  letter-spacing:.04em;
  color:rgba(var(--theme-heading-rgb),.95);
}
</style>
