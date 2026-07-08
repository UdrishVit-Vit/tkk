<script setup>
import { EQUIPMENT_5E, EQUIPMENT_SOURCES, EQUIPMENT_CATEGORIES, EQUIPMENT_TAGS } from '~/data/equipment5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ category: [], tag: [] })

const query = computed(() => search.value.trim().toLowerCase())

function matches(e) {
  if (active.category.length && !active.category.includes(e.category)) return false
  if (active.tag.length && !active.tag.some(t => e.tags.includes(t))) return false
  if (!query.value) return true
  return [e.title, e.englishName, e.description].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(EQUIPMENT_CATEGORIES).map(([id, title]) => ({
  id,
  title,
  items: EQUIPMENT_5E.filter(e => e.category === id && matches(e)).map(e => ({
    id: e.id,
    title: e.title,
    meta: e.cost,
    badge: e.source,
    badgeTitle: EQUIPMENT_SOURCES[e.source] || e.source,
    raw: e
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.category.length + active.tag.length)

const filters = computed(() => [
  { key: 'category', label: 'Категория', options: Object.entries(EQUIPMENT_CATEGORIES).map(([value, label]) => ({ value, label })) },
  { key: 'tag', label: 'Метки', options: Object.entries(EQUIPMENT_TAGS).map(([value, label]) => ({ value, label })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.category = []; active.tag = [] }

function tagLabel(t) { return EQUIPMENT_TAGS[t] || t }

useSeoMeta({
  title: 'Снаряжение — D&D 5e — TKK.club',
  description: 'Снаряжение D&D 5e: походные предметы, контейнеры, расходники, наборы и инструменты.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/snaryazhenie.png"
    emblem-alt="Снаряжение"
    title="Снаряжение"
    crumb-current="Снаряжение"
    lead="Походные предметы, контейнеры, расходники, наборы и инструменты искателя приключений."
    search-placeholder="Найти снаряжение"
    node-prefix="eq"
    query-key="e"
    :groups="groups"
    :total="EQUIPMENT_5E.length"
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
        <span class="tref-source" :title="item.badgeTitle">{{ item.badge }}</span>
        <span v-for="t in item.raw.tags" :key="t" class="tref-tag">{{ tagLabel(t) }}</span>
      </div>

      <dl class="tref-stats">
        <div class="tref-stat"><dt>Стоимость</dt><dd>{{ item.raw.cost }}</dd></div>
        <div class="tref-stat"><dt>Вес</dt><dd>{{ item.raw.weight }}</dd></div>
      </dl>

      <p v-if="item.raw.description" class="tref-desc">{{ item.raw.description }}</p>
    </template>
  </ThreadRefPage>
</template>
