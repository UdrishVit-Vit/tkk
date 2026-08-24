<script setup>
import { PF2E_EQUIPMENT, PF2E_EQUIPMENT_CATEGORIES, PF2E_EQUIPMENT_GROUPS } from '~/data/pf2e/equipment.js'
import { pf2eTraitHint } from '~/data/pf2e/traits.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ group: [], category: [] })

const query = computed(() => search.value.trim().toLowerCase())

// A group filter is a shortcut for "all categories inside it", so the two
// filter rows combine instead of fighting each other.
const allowedCategories = computed(() => {
  if (!active.group.length) return null
  return new Set(active.group.flatMap(g => PF2E_EQUIPMENT_GROUPS[g]?.categories || []))
})

function matches(item) {
  // Section and category are one union rather than two ANDed filters: ticking
  // "Оружие" and then "Щиты" should widen the list, never empty it.
  if (active.group.length || active.category.length) {
    const inGroup = allowedCategories.value?.has(item.category) || false
    const inCategory = active.category.includes(item.category)
    if (!inGroup && !inCategory) return false
  }
  if (!query.value) return true
  return [item.title, item.en, item.desc, ...(item.traits || [])].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(PF2E_EQUIPMENT_CATEGORIES).map(([id, title]) => ({
  id,
  title,
  items: PF2E_EQUIPMENT.filter(item => item.category === id && matches(item)).map(item => ({
    id: item.id,
    title: item.title,
    meta: item.price,
    badge: item.level ? `${item.level} ур.` : '',
    badgeTitle: item.level ? `Уровень предмета ${item.level}` : '',
    raw: item
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((sum, g) => sum + g.items.length, 0))
const activeCount = computed(() => active.group.length + active.category.length)

const filters = computed(() => [
  {
    key: 'group',
    label: 'Раздел',
    options: Object.entries(PF2E_EQUIPMENT_GROUPS).map(([value, g]) => ({ value, label: g.label }))
  },
  {
    key: 'category',
    label: 'Категория',
    note: 'Дополняет выбранные разделы',
    options: Object.entries(PF2E_EQUIPMENT_CATEGORIES).map(([value, label]) => ({ value, label }))
  }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.group = []; active.category = [] }

useSeoMeta({
  title: 'Снаряжение — Pathfinder 2e — TKK.club',
  description: 'Снаряжение Pathfinder 2e: оружие, броня, щиты, походные предметы, инструменты, алхимия, услуги и особые материалы.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/snaryazhenie.png"
    emblem-alt="Снаряжение"
    system-path="/pf2e"
    system-label="Pathfinder 2e"
    kicker="Pathfinder 2e"
    title="Снаряжение"
    crumb-current="Снаряжение"
    lead="Оружие, броня, щиты, походные предметы, инструменты, алхимия и особые материалы по правилам Second Edition."
    search-placeholder="Найти предмет или черту"
    node-prefix="pfeq"
    query-key="e"
    :groups="groups"
    :total="PF2E_EQUIPMENT.length"
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
        <span class="tref-source" :title="item.raw.en">{{ item.raw.en }}</span>
        <span
          v-for="trait in item.raw.traits"
          :key="trait"
          class="tref-tag"
          :title="pf2eTraitHint(trait)"
        >{{ trait }}</span>
      </div>

      <dl class="tref-stats">
        <div v-for="stat in item.raw.stats" :key="stat.label" class="tref-stat">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>

      <p v-if="item.raw.desc" class="tref-desc">{{ item.raw.desc }}</p>
    </template>
  </ThreadRefPage>
</template>
