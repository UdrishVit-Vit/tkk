<script setup>
import { WRATHS_5E, WRATH_TIERS, WRATH_TIER_LABEL, WRATH_TIER_TABLE, WRATH_FACE_SKILLS, WRATH_LORE, WRATH_BY_SIG } from '~/data/wrath5e.js'
import { sigKey } from '~/utils/shagai5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tier: [] })

function resolveWrath(roll) {
  return WRATH_BY_SIG[sigKey(roll.sig)] || null
}

const query = computed(() => search.value.trim().toLowerCase())

function matches(w) {
  if (active.tier.length && !active.tier.includes(w.tier)) return false
  if (!query.value) return true
  return [w.title, w.flavor, w.effect, w.success, w.fail].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(WRATH_TIERS).map(([id, title]) => ({
  id,
  title,
  items: WRATHS_5E.filter(w => w.tier === id && matches(w)).map(w => ({
    id: w.id,
    title: `${w.num}. ${w.title}`,
    badge: `СЛ ${Math.max(...w.checks.map(c => c.dc))}`,
    badgeTitle: w.checks.map(c => `${c.skill} — СЛ ${c.dc}`).join(' · '),
    raw: w
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.tier.length)

const filters = computed(() => [
  { key: 'tier', label: 'Тяжесть гнева', options: Object.entries(WRATH_TIER_LABEL).map(([value, label]) => ({ value, label })) }
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
  title: 'Гнев Ильбеша — D&D 5e — TKK.club',
  description: 'Гнев Ильбеша для D&D 5e: 35 кар хранителя Искры. Бросьте 4к4, узнайте тяжесть гнева и попробуйте отвести его проверкой навыка.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/gnev.png"
    emblem-alt="Гнев Ильбеша"
    title="Гнев Ильбеша"
    crumb-current="Гнев Ильбеша"
    lead="Закон воздаяния, отлитый в небесах: всякий раз, когда смертный берёт из линии силы больше, чем положено, он срывает рубец с живой плоти хранителя."
    search-placeholder="Найти гнев или эффект"
    node-prefix="wrath"
    query-key="w"
    collapsible
    collapse-label="Все гневы Ильбеша"
    :groups="groups"
    :total="WRATHS_5E.length"
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
      <div class="wrath-head">
        <details class="wrath-lore">
          <summary>Как работает Гнев Ильбеша</summary>
          <div class="wrath-lore-body">
            <p v-for="(p, i) in WRATH_LORE" :key="i">{{ p }}</p>

            <h4>Тяжесть гнева</h4>
            <p>Когда Мастер решает, что смертный зачерпнул из линий силы слишком жадно, бросается знаменная кость <b>4к4</b>. Комбинация выпавших граней определяет и конкретный гнев (по сигнатуре, как у знамений), и его ступень тяжести:</p>
            <div class="wrath-tiers-table">
              <div class="wrath-tiers-row wrath-tiers-head">
                <span>Комбинация</span><span>Вероятность</span><span>Ступень</span><span>Базовая СЛ</span>
              </div>
              <div v-for="row in WRATH_TIER_TABLE" :key="row.tier" class="wrath-tiers-row">
                <span>{{ row.combo }}</span>
                <span>{{ row.chance }}</span>
                <span class="wrath-tiers-name">{{ WRATH_TIER_LABEL[row.tier] }}</span>
                <span>{{ row.dc }}</span>
              </div>
            </div>

            <h4>Что показывает грань к4</h4>
            <p>Выпавшие грани задают навыки, которыми можно отвести или даже обернуть ярость Ильбеша себе на пользу. У каждого гнева указаны свои проверки и СЛ; последствия успеха и провала описаны в карточке.</p>
            <div v-for="face in WRATH_FACE_SKILLS" :key="face.face" class="wrath-face">
              <b>{{ face.face }} — {{ face.skill }} ({{ face.skillEn }}).</b> {{ face.text }}
            </div>
          </div>
        </details>

        <ShagaiRoll :resolve="resolveWrath" label="Призвать гнев · 4к4" hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар">
          <template #result="{ entry }">
            <div class="wrath-result-name">{{ entry.num }}. {{ entry.title }}</div>
            <WrathCard :wrath="entry" framed />
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <WrathCard :wrath="item.raw" />
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.wrath-head{
  margin-top:26px;
}

.wrath-lore{
  border:1px solid rgba(var(--theme-text-rgb),.1);
  border-radius:10px;
  background:rgba(var(--theme-contrast-rgb),.012);
  padding:0 16px;
}

.wrath-lore summary{
  padding:13px 0;
  font-size:11px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.8);
  cursor:pointer;
  list-style:none;
}

.wrath-lore summary::-webkit-details-marker{ display:none; }

.wrath-lore summary::before{
  content:'+ ';
  color:rgba(var(--theme-accent-rgb),.7);
}

.wrath-lore[open] summary::before{
  content:'− ';
}

.wrath-lore-body{
  padding:0 0 14px;
}

.wrath-lore-body p{
  margin:0 0 10px;
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  line-height:1.55;
  color:rgba(var(--theme-text-rgb),.78);
}

.wrath-lore-body b{
  color:rgba(var(--theme-accent-strong-rgb),.9);
}

.wrath-lore-body h4{
  margin:18px 0 8px;
  font-size:11px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.75);
}

.wrath-tiers-table{
  margin:6px 0 12px;
  border:1px solid rgba(var(--theme-accent-rgb),.18);
  border-radius:8px;
  overflow:hidden;
}

.wrath-tiers-row{
  display:grid;
  grid-template-columns:1.3fr .8fr 1.3fr 1fr;
  gap:1px;
  border-top:1px solid rgba(var(--theme-text-rgb),.06);
}

.wrath-tiers-row:first-child{ border-top:0; }

.wrath-tiers-row span{
  padding:8px 12px;
  font-size:13px;
  line-height:1.4;
  color:rgba(var(--theme-text-rgb),.75);
}

.wrath-tiers-head span{
  font-size:10px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.75);
  background:rgba(var(--theme-accent-rgb),.06);
}

.wrath-tiers-name{
  color:rgba(var(--theme-accent-strong-rgb),.88) !important;
  font-weight:700;
}

.wrath-face{
  margin:0 0 10px;
  font-size:14px;
  line-height:1.6;
  color:rgba(var(--theme-text-rgb),.72);
}

.wrath-face b{
  color:rgba(var(--theme-accent-strong-rgb),.9);
}

.wrath-result-name{
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
  letter-spacing:.04em;
  color:rgba(var(--theme-heading-rgb),.95);
}

@media (max-width: 700px){
  .wrath-tiers-row{ grid-template-columns:1fr 1fr; }
}
</style>
