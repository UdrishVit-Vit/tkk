<script setup>
import { WEAPONS_5E, WEAPON_SOURCES, WEAPON_CATEGORIES, WEAPON_PROPERTIES } from '~/data/weapons5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ category: [], damage: [], property: [] })

const DAMAGE_TYPES = ['дробящий', 'колющий', 'рубящий']
const PROPERTY_KEYS = Object.keys(WEAPON_PROPERTIES)

function baseProp(p) {
  return p.replace(/\s*\(.*\)\s*$/, '')
}

const query = computed(() => search.value.trim().toLowerCase())

function matches(w) {
  if (active.category.length && !active.category.includes(w.category)) return false
  if (active.damage.length && !active.damage.includes(w.damageType)) return false
  if (active.property.length && !active.property.some(p => w.properties.some(wp => baseProp(wp) === p))) return false
  if (!query.value) return true
  return [w.title, w.englishName, w.damage, w.damageType, ...w.properties].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(WEAPON_CATEGORIES).map(([id, title]) => ({
  id,
  title,
  items: WEAPONS_5E.filter(w => w.category === id && matches(w)).map(w => ({
    id: w.id,
    title: w.title,
    meta: `${w.damage} · ${w.damageType}`,
    badge: w.source,
    badgeTitle: WEAPON_SOURCES[w.source] || w.source,
    raw: w
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.category.length + active.damage.length + active.property.length)

const filters = computed(() => [
  { key: 'category', label: 'Категория', options: Object.entries(WEAPON_CATEGORIES).map(([value, label]) => ({ value, label })) },
  { key: 'damage', label: 'Тип урона', options: DAMAGE_TYPES.map(v => ({ value: v, label: v })) },
  { key: 'property', label: 'Свойства', options: PROPERTY_KEYS.map(v => ({ value: v, label: v })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.category = []; active.damage = []; active.property = [] }

useSeoMeta({
  title: 'Оружие — D&D 5e — TKK.club',
  description: 'Оружие D&D 5e: урон, стоимость, вес и свойства простого и воинского оружия.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/oruzhie.png"
    emblem-alt="Оружие"
    title="Оружие"
    crumb-current="Оружие"
    lead="Простое и воинское оружие: урон, свойства, стоимость и вес."
    search-placeholder="Найти оружие, свойство или урон"
    node-prefix="weapon"
    query-key="w"
    :groups="groups"
    :total="WEAPONS_5E.length"
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
        <span v-for="p in item.raw.properties" :key="p" class="tref-tag">{{ p }}</span>
      </div>

      <dl class="tref-stats">
        <div class="tref-stat"><dt>Урон</dt><dd><RuleRichText :text="`${item.raw.damage} ${item.raw.damageType}`" /></dd></div>
        <div class="tref-stat"><dt>Стоимость</dt><dd>{{ item.raw.cost }}</dd></div>
        <div class="tref-stat"><dt>Вес</dt><dd>{{ item.raw.weight }}</dd></div>
      </dl>

      <p v-if="item.raw.lore" class="tref-desc">{{ item.raw.lore }}</p>
    </template>
  </ThreadRefPage>
</template>
