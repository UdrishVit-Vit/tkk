<script setup>
import { TEAS_5E, TEA_TIERS, TEA_TIER_LABEL, TEA_LORE, TEA_BY_SIG } from '~/data/tea5e.js'
import { sigKey } from '~/utils/shagai5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tier: [] })

function resolveTea(roll) {
  return TEA_BY_SIG[sigKey(roll.sig)] || null
}

const query = computed(() => search.value.trim().toLowerCase())

function matches(t) {
  if (active.tier.length && !active.tier.includes(t.tier)) return false
  if (!query.value) return true
  const table = t.table ? t.table.rows.flat().join(' ') : ''
  return [t.title, t.flavor, t.effect, t.success, t.fail, table].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(TEA_TIERS).map(([id, title]) => ({
  id,
  title,
  items: TEAS_5E.filter(t => t.tier === id && matches(t)).map(t => ({
    id: t.id,
    title: `${t.num}. ${t.title}`,
    badge: `СЛ ${t.dc}`,
    badgeTitle: `Сложность заваривания — ${TEA_TIER_LABEL[t.tier]}`,
    raw: t
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.tier.length)

const filters = computed(() => [
  { key: 'tier', label: 'Сложность заваривания', options: Object.entries(TEA_TIERS).map(([value, label]) => ({ value, label })) }
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
  title: 'Чай — D&D 5e — TKK.club',
  description: 'Чаи мира Эноа для D&D 5e: 35 напитков степей и оазисов. Бросьте 4к4, узнайте, какой чай заварился, его эффект и исход заваривания.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/chay.png"
    emblem-alt="Чай"
    title="Чай"
    crumb-current="Чай"
    lead="Ремесло, ритуал и малая магия степей и оазисов. Хорошо заваренный чай раскрывается наградой, дурно заваренный — оборачивается проклятием."
    search-placeholder="Найти чай или эффект"
    node-prefix="tea"
    query-key="t"
    collapsible
    collapse-label="Все чаи"
    :groups="groups"
    :total="TEAS_5E.length"
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
      <div class="tea-head">
        <details class="tea-lore">
          <summary>Как работает чай</summary>
          <div class="tea-lore-body">
            <p v-for="(p, i) in TEA_LORE" :key="i">{{ p }}</p>
            <p>Какой именно чай заварился, определяет знаменная кость <b>4к4</b>: по количеству выпавших граней (<b>1 — Бунти</b>, <b>2 — Аюр</b>, <b>3 — Додор</b>, <b>4 — Тахар</b>) находится один из 35 чаёв — так же, как у знамений. Чаи разбиты по <b>сложности заваривания</b>: простые (СЛ 10–13), изысканные (СЛ 14–16) и сложные (СЛ 17–20).</p>
          </div>
        </details>

        <ShagaiRoll :resolve="resolveTea" label="Заварить чай · 4к4" hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар">
          <template #result="{ entry }">
            <div class="tea-result-name">{{ entry.num }}. {{ entry.title }}</div>
            <TeaCard :tea="entry" framed />
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <TeaCard :tea="item.raw" />
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.tea-head{
  margin-top:26px;
}

.tea-lore{
  border:1px solid rgba(232,236,248,.1);
  border-radius:10px;
  background:rgba(255,255,255,.012);
  padding:0 16px;
}

.tea-lore summary{
  padding:13px 0;
  font-size:11px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(214,170,96,.8);
  cursor:pointer;
  list-style:none;
}

.tea-lore summary::-webkit-details-marker{ display:none; }

.tea-lore summary::before{
  content:'+ ';
  color:rgba(214,170,96,.7);
}

.tea-lore[open] summary::before{
  content:'− ';
}

.tea-lore-body{
  padding:0 0 14px;
}

.tea-lore-body p{
  margin:0 0 10px;
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  line-height:1.55;
  color:rgba(224,232,242,.78);
}

.tea-lore-body b{
  color:rgba(244,224,170,.9);
}

.tea-result-name{
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
  letter-spacing:.04em;
  color:rgba(246,248,255,.95);
}
</style>
