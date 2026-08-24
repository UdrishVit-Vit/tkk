<script setup>
import {
  PF2E_MAGIC_ITEMS,
  PF2E_MAGIC_ITEM_CATEGORIES,
  PF2E_MAGIC_ITEM_RARITIES,
  PF2E_MAGIC_ITEM_RARITY_SINGULAR
} from '~/data/pf2e/magicItems.js'
import { pf2eTraitHint } from '~/data/pf2e/traits.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ category: [], rarity: [], tier: [] })

const query = computed(() => search.value.trim().toLowerCase())

// Item level is the number that actually decides whether a party can afford or
// find something, so the third filter slices the catalogue by tier of play.
const TIERS = {
  low: { label: '1–5 уровни', test: l => l >= 1 && l <= 5 },
  mid: { label: '6–10 уровни', test: l => l >= 6 && l <= 10 },
  high: { label: '11–15 уровни', test: l => l >= 11 && l <= 15 },
  epic: { label: '16–20 уровни', test: l => l >= 16 }
}

function matches(item) {
  if (active.category.length && !active.category.includes(item.cat)) return false
  if (active.rarity.length && !active.rarity.includes(item.rarity)) return false
  if (active.tier.length && !active.tier.some(t => TIERS[t]?.test(item.level))) return false
  if (!query.value) return true
  return [item.title, item.en, item.desc, ...(item.traits || [])].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(PF2E_MAGIC_ITEM_CATEGORIES).map(([id, title]) => ({
  id,
  title,
  items: PF2E_MAGIC_ITEMS
    .filter(item => item.cat === id && matches(item))
    .sort((a, b) => a.level - b.level)
    .map(item => ({
      id: item.id,
      title: item.title,
      meta: item.price,
      badge: `${item.level} ур.`,
      badgeTitle: `Уровень предмета ${item.level}`,
      raw: item
    }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((sum, g) => sum + g.items.length, 0))
const activeCount = computed(() => active.category.length + active.rarity.length + active.tier.length)

const filters = computed(() => [
  {
    key: 'category',
    label: 'Категория',
    options: Object.entries(PF2E_MAGIC_ITEM_CATEGORIES).map(([value, label]) => ({ value, label }))
  },
  {
    key: 'rarity',
    label: 'Редкость',
    options: Object.entries(PF2E_MAGIC_ITEM_RARITIES).map(([value, label]) => ({ value, label }))
  },
  {
    key: 'tier',
    label: 'Уровень предмета',
    options: Object.entries(TIERS).map(([value, t]) => ({ value, label: t.label }))
  }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.category = []; active.rarity = []; active.tier = [] }

useSeoMeta({
  title: 'Магические предметы — Pathfinder 2e — TKK.club',
  description: 'Магические предметы Pathfinder 2e: фундаментальные руны и руны свойств, зелья, талисманы, свитки, палочки, посохи, носимые и держимые предметы, реликвии Эноа.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/magicheskie.png"
    emblem-alt="Магические предметы"
    system-path="/pf2e"
    system-label="Pathfinder 2e"
    kicker="Pathfinder 2e"
    title="Магические предметы"
    crumb-current="Магические предметы"
    lead="Руны держат ваши числа на кривой, всё остальное задаёт характер: зелья, талисманы, свитки, посохи и реликвии Эноа."
    search-placeholder="Найти предмет, руну или эффект"
    node-prefix="pfmi"
    query-key="m"
    :groups="groups"
    :total="PF2E_MAGIC_ITEMS.length"
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
    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-pill"><b>{{ PF2E_MAGIC_ITEM_RARITY_SINGULAR[item.raw.rarity] }}</b></span>
        <span class="tref-source" :title="item.raw.en">{{ item.raw.en }}</span>
        <span
          v-for="trait in item.raw.traits"
          :key="trait"
          class="tref-tag"
          :title="pf2eTraitHint(trait)"
        >{{ trait }}</span>
      </div>

      <dl class="tref-stats">
        <div class="tref-stat"><dt>Уровень</dt><dd>{{ item.raw.level }}</dd></div>
        <div class="tref-stat"><dt>Цена</dt><dd>{{ item.raw.price }}</dd></div>
      </dl>

      <p class="tref-desc">{{ item.raw.desc }}</p>
    </template>
  </ThreadRefPage>
</template>
