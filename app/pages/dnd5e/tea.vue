<script setup>
import { TEAS_5E, TEA_TIERS, TEA_TIER_LABEL, TEA_LORE, TEA_BY_SIG } from '~/data/tea5e.js'
import { TEAS_2024, TEA_LORE_2024, TEA_2024_BY_SIG } from '~/data/dnd55e/tools2024.js'
import { sigKey } from '~/utils/shagai5e.js'

const props = defineProps({
  edition: { type: String, default: '2014' }
})

const is2024 = computed(() => props.edition === '2024')
const teas = computed(() => is2024.value ? TEAS_2024 : TEAS_5E)
const teaLore = computed(() => is2024.value ? TEA_LORE_2024 : TEA_LORE)
const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tier: [] })

function resolveTea(roll) {
  const index = is2024.value ? TEA_2024_BY_SIG : TEA_BY_SIG
  return index[sigKey(roll.sig)] || null
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
  items: teas.value.filter(t => t.tier === id && matches(t)).map(t => ({
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
  title: () => is2024.value ? 'Чай — D&D 5.5e 2024 — TKK.club' : 'Чай — D&D 5e — TKK.club',
  description: () => is2024.value
    ? 'Чаи мира Эноа для D&D 5.5e 2024: 35 напитков степей и оазисов, бросок 4к4, эффекты и исходы заваривания по правилам редакции 2024.'
    : 'Чаи мира Эноа для D&D 5e: 35 напитков степей и оазисов. Бросьте 4к4, узнайте, какой чай заварился, его эффект и исход заваривания.'
})
</script>

<template>
  <ThreadRefPage
    :system-path="is2024 ? '/dnd55e' : '/dnd5e'"
    :system-label="is2024 ? 'D&D 5.5e' : 'D&D 5e'"
    :kicker="is2024 ? 'D&D 5.5e · редакция 2024' : 'D&D 5e'"
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
    :total="teas.length"
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
            <p v-if="is2024"><b>Версия для D&D 2024.</b> Игровые термины, отдых и ссылки на заклинания приведены к редакции 2024; авторская механика броска 4к4 сохранена.</p>
            <p v-for="(p, i) in teaLore" :key="i">{{ p }}</p>
            <p>Какой именно чай заварился, определяет знаменная кость <b>4к4</b>: по количеству выпавших граней (<b>1 — Бунти</b>, <b>2 — Аюр</b>, <b>3 — Додор</b>, <b>4 — Тахар</b>) находится один из 35 чаёв — так же, как у знамений. Чаи разбиты по <b>сложности заваривания</b>: простые (СЛ 10–13), изысканные (СЛ 14–16) и сложные (СЛ 17–20).</p>
          </div>
        </details>

        <ShagaiRoll :resolve="resolveTea" label="Заварить чай · 4к4" hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар">
          <template #result="{ entry }">
            <div class="tea-result-name">{{ entry.num }}. {{ entry.title }}</div>
            <TeaCard :tea="entry" :edition="is2024 ? '2024' : ''" framed />
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <TeaCard :tea="item.raw" :edition="is2024 ? '2024' : ''" />
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.tea-head{
  margin-top:26px;
}

.tea-lore{
  border:1px solid rgba(var(--theme-text-rgb),.1);
  border-radius:10px;
  background:rgba(var(--theme-contrast-rgb),.012);
  padding:0 16px;
}

.tea-lore summary{
  padding:13px 0;
  font-size:11px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.8);
  cursor:pointer;
  list-style:none;
}

.tea-lore summary::-webkit-details-marker{ display:none; }

.tea-lore summary::before{
  content:'+ ';
  color:rgba(var(--theme-accent-rgb),.7);
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
  color:rgba(var(--theme-text-rgb),.78);
}

.tea-lore-body b{
  color:rgba(var(--theme-accent-strong-rgb),.9);
}

.tea-result-name{
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
  letter-spacing:.04em;
  color:rgba(var(--theme-heading-rgb),.95);
}
</style>
