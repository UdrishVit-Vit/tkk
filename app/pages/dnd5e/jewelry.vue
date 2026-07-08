<script setup>
import { GEMS_5E, GEM_TIERS } from '~/data/gems5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ kind: [], tier: [] })

const KIND_OPTIONS = [
  { value: 'gem', label: 'Самоцветы' },
  { value: 'art', label: 'Предметы искусства' }
]

const query = computed(() => search.value.trim().toLowerCase())

function matches(g) {
  if (active.kind.length && !active.kind.includes(g.kind)) return false
  if (active.tier.length && !active.tier.includes(g.tier)) return false
  if (!query.value) return true
  return [g.title, g.description, g.color || ''].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(GEM_TIERS).map(([id, title]) => ({
  id,
  title,
  items: GEMS_5E.filter(g => g.tier === id && matches(g)).map(g => ({
    id: g.id,
    title: g.title,
    meta: g.cost,
    raw: g
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.kind.length + active.tier.length)

const filters = computed(() => [
  { key: 'kind', label: 'Вид', options: KIND_OPTIONS },
  { key: 'tier', label: 'Стоимость', options: Object.entries(GEM_TIERS).map(([value, label]) => ({ value, label })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.kind = []; active.tier = [] }

useSeoMeta({
  title: 'Драгоценности — D&D 5e — TKK.club',
  description: 'Драгоценности D&D 5e: самоцветы и предметы искусства по стоимости для сокровищ и наград.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/dragocennosti.png"
    emblem-alt="Драгоценности"
    title="Драгоценности"
    crumb-current="Драгоценности"
    lead="Самоцветы и предметы искусства по стоимости — то, чем измеряют клады и награды."
    search-placeholder="Найти самоцвет или предмет"
    node-prefix="gem"
    query-key="g"
    :groups="groups"
    :total="GEMS_5E.length"
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
        <span class="tref-pill"><b>{{ item.raw.cost }}</b></span>
        <span v-if="item.raw.color" class="tref-tag">{{ item.raw.color }}</span>
      </div>
      <p class="tref-desc">{{ item.raw.description }}</p>
    </template>
  </ThreadRefPage>
</template>
