<script setup>
import { ARMOR_5E, ARMOR_SOURCES, ARMOR_CATEGORIES } from '~/data/armor5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ category: [] })

const query = computed(() => search.value.trim().toLowerCase())

function matches(a) {
  if (active.category.length && !active.category.includes(a.category)) return false
  if (!query.value) return true
  return [a.title, a.englishName, a.armorClass].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(ARMOR_CATEGORIES).map(([id, title]) => ({
  id,
  title,
  items: ARMOR_5E.filter(a => a.category === id && matches(a)).map(a => ({
    id: a.id,
    title: a.title,
    meta: a.armorClass,
    badge: a.source,
    badgeTitle: ARMOR_SOURCES[a.source] || a.source,
    raw: a
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.category.length)

const filters = computed(() => [
  { key: 'category', label: 'Категория', options: Object.entries(ARMOR_CATEGORIES).map(([value, label]) => ({ value, label })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.category = [] }

useSeoMeta({
  title: 'Доспехи — D&D 5e — TKK.club',
  description: 'Доспехи D&D 5e: класс доспеха, требование Силы, скрытность, стоимость и вес.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/dospehi.png"
    emblem-alt="Доспехи"
    title="Доспехи"
    crumb-current="Доспехи"
    lead="Лёгкие, средние, тяжёлые доспехи и щиты: класс доспеха и условия ношения."
    search-placeholder="Найти доспех"
    node-prefix="armor"
    query-key="a"
    :groups="groups"
    :total="ARMOR_5E.length"
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
      </div>

      <dl class="tref-stats">
        <div class="tref-stat"><dt>Класс доспеха</dt><dd>{{ item.raw.armorClass }}</dd></div>
        <div class="tref-stat"><dt>Сила</dt><dd>{{ item.raw.strength }}</dd></div>
        <div class="tref-stat"><dt>Скрытность</dt><dd>{{ item.raw.stealth }}</dd></div>
        <div class="tref-stat"><dt>Стоимость</dt><dd>{{ item.raw.cost }}</dd></div>
        <div class="tref-stat"><dt>Вес</dt><dd>{{ item.raw.weight }}</dd></div>
      </dl>

      <p v-if="item.raw.lore" class="tref-desc">{{ item.raw.lore }}</p>
    </template>
  </ThreadRefPage>
</template>
