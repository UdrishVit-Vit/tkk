<script setup>
import { CLASS_FEATURES_5E, CLASS_FEATURE_SOURCE_NAMES } from '~/data/classFeatures5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ className: [], source: [], type: [] })

const CLASS_NAMES = [...new Set(CLASS_FEATURES_5E.map(f => f.className))]
const SOURCE_CODES = [...new Set(CLASS_FEATURES_5E.map(f => f.source))]
const TYPE_OPTIONS = [
  { value: 'class', label: 'Класс' },
  { value: 'subclass', label: 'Подкласс' }
]

const query = computed(() => search.value.trim().toLowerCase())

function matches(f) {
  if (active.className.length && !active.className.includes(f.className)) return false
  if (active.source.length && !active.source.includes(f.source)) return false
  if (active.type.length && !active.type.includes(f.type === 'class' ? 'class' : 'subclass')) return false
  if (!query.value) return true
  return [f.name, f.className, f.subclassName, f.text].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => CLASS_NAMES.map(className => ({
  id: className,
  title: className,
  items: CLASS_FEATURES_5E.filter(f => f.className === className && matches(f)).map(f => ({
    id: f.id,
    title: f.name,
    meta: [f.levelText, f.subclassName !== 'Базовый класс' ? f.subclassName : null].filter(Boolean).join(' · '),
    badge: f.source,
    badgeTitle: f.sourceName || CLASS_FEATURE_SOURCE_NAMES[f.source] || f.source,
    raw: f
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.className.length + active.source.length + active.type.length)

const filters = computed(() => [
  { key: 'className', label: 'Класс', options: CLASS_NAMES.map(v => ({ value: v, label: v })) },
  { key: 'type', label: 'Тип', options: TYPE_OPTIONS },
  { key: 'source', label: 'Источник', options: SOURCE_CODES.map(v => ({ value: v, label: v, title: CLASS_FEATURE_SOURCE_NAMES[v] || v })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.className = []; active.source = []; active.type = [] }

useSeoMeta({
  title: 'Особенности классов — D&D 5e — TKK.club',
  description: 'Умения классов и подклассов D&D 5e: описания по уровням, источникам и классам.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/osobennosti.png"
    emblem-alt="Особенности классов"
    title="Особенности классов"
    crumb-current="Особенности классов"
    lead="Умения классов и подклассов по уровням: то, что получает герой с ростом мастерства."
    search-placeholder="Найти умение, класс или подкласс"
    node-prefix="cf"
    query-key="f"
    :groups="groups"
    :total="CLASS_FEATURES_5E.length"
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
        <span class="tref-pill"><span>{{ item.raw.levelText || 'Уровень' }}</span></span>
        <span v-if="item.raw.subclassName !== 'Базовый класс'" class="tref-tag">{{ item.raw.subclassName }}</span>
      </div>

      <p v-for="(para, i) in item.raw.text.split('\n')" :key="i" class="tref-desc">
        <RuleRichText :text="para" />
      </p>

      <div v-if="item.raw.items?.length" class="tref-block">
        <ul class="tref-list">
          <li v-for="sub in item.raw.items" :key="sub.name">
            <b>{{ sub.name }}.</b> <RuleRichText :text="sub.text" />
          </li>
        </ul>
      </div>
    </template>
  </ThreadRefPage>
</template>
