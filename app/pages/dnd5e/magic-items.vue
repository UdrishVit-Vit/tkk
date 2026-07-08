<script setup>
import { MAGIC_ITEMS_5E, MAGIC_ITEM_RARITIES, MAGIC_ITEM_RARITY_SINGULAR, MAGIC_ITEM_TYPES } from '~/data/magicItems5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ rarity: [], type: [], attune: [] })

const query = computed(() => search.value.trim().toLowerCase())

function matches(m) {
  if (active.rarity.length && !active.rarity.includes(m.rarity)) return false
  if (active.type.length && !active.type.includes(m.type)) return false
  if (active.attune.length) {
    const want = active.attune.includes('yes')
    const wantNo = active.attune.includes('no')
    if (want && !wantNo && !m.attune) return false
    if (wantNo && !want && m.attune) return false
  }
  if (!query.value) return true
  return [m.title, m.description, MAGIC_ITEM_TYPES[m.type]].join(' ').toLowerCase().includes(query.value)
}

const usedTypes = [...new Set(MAGIC_ITEMS_5E.map(m => m.type))]

const groups = computed(() => Object.entries(MAGIC_ITEM_RARITIES).map(([id, title]) => ({
  id,
  title,
  items: MAGIC_ITEMS_5E.filter(m => m.rarity === id && matches(m)).map(m => ({
    id: m.id,
    title: m.title,
    meta: MAGIC_ITEM_TYPES[m.type] || m.type,
    badge: m.attune ? 'Настройка' : '',
    badgeTitle: m.attune ? 'Требует настройки' : '',
    raw: m
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.rarity.length + active.type.length + active.attune.length)

const filters = computed(() => [
  { key: 'rarity', label: 'Редкость', options: Object.entries(MAGIC_ITEM_RARITIES).map(([value, label]) => ({ value, label })) },
  { key: 'type', label: 'Тип', options: usedTypes.map(v => ({ value: v, label: MAGIC_ITEM_TYPES[v] || v })) },
  { key: 'attune', label: 'Настройка', options: [{ value: 'yes', label: 'Требует' }, { value: 'no', label: 'Без настройки' }] }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.rarity = []; active.type = []; active.attune = [] }

useSeoMeta({
  title: 'Магические предметы — D&D 5e — TKK.club',
  description: 'Магические предметы D&D 5e по редкости: тип, настройка и описание эффектов.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/magicheskie.png"
    emblem-alt="Магические предметы"
    title="Магические предметы"
    crumb-current="Магические предметы"
    lead="Артефакты и чудеса по редкости: тип, настройка и сила предмета."
    search-placeholder="Найти предмет или эффект"
    node-prefix="mi"
    query-key="m"
    :groups="groups"
    :total="MAGIC_ITEMS_5E.length"
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
        <span class="tref-pill"><b>{{ MAGIC_ITEM_RARITY_SINGULAR[item.raw.rarity] }}</b></span>
        <span class="tref-tag">{{ MAGIC_ITEM_TYPES[item.raw.type] }}</span>
        <span v-if="item.raw.attune" class="tref-tag">Требует настройки</span>
      </div>
      <p class="tref-desc"><RuleRichText :text="item.raw.description" /></p>
    </template>
  </ThreadRefPage>
</template>
