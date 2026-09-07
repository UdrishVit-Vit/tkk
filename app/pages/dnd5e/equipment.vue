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

function itemPath(item) { return `/dnd5e/equipment?e=${item.id}` }

// Обычные слова описаний совпадают с названиями заклинаний: «принесённый обет»
// — не «Обет», «племенные знаки» — не «Знак». Автоссылка на них только сбивает.
const DETAIL_LINK_EXCLUDE = ['/dnd5e/spells?s=geas', '/dnd5e/spells?s=symbol']

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

      <div v-if="item.raw.details?.length" class="eq-details">
        <div v-for="detail in item.raw.details" :key="detail.title" class="eq-detail">
          <h3>{{ detail.title }}</h3>
          <p><RuleRichText :text="detail.text" :current-path="itemPath(item.raw)" :exclude-paths="DETAIL_LINK_EXCLUDE" /></p>
          <div v-if="detail.table" class="eq-table">
            <div class="eq-table-head">
              <span v-for="column in detail.table.columns" :key="column">{{ column }}</span>
            </div>
            <div v-for="row in detail.table.rows" :key="row[0]" class="eq-table-row">
              <span v-for="(cell, ci) in row" :key="ci">{{ cell }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="item.raw.table" class="eq-table">
        <div class="eq-table-head">
          <span v-for="column in item.raw.table.columns" :key="column">{{ column }}</span>
        </div>
        <div v-for="row in item.raw.table.rows" :key="row[0]" class="eq-table-row">
          <span v-for="(cell, ci) in row" :key="ci">{{ cell }}</span>
        </div>
      </div>

      <div v-if="item.raw.usedBy?.length" class="eq-used">
        <h3>Где используется</h3>
        <div class="eq-used-links">
          <NuxtLink v-for="use in item.raw.usedBy" :key="use.path" :to="use.path" class="eq-used-link">{{ use.title }}</NuxtLink>
        </div>
      </div>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.eq-details{display:grid;gap:10px;margin-top:12px}
.eq-detail h3{margin:0 0 3px;color:var(--theme-accent-strong);font-size:13px;font-weight:700}
.eq-detail p{margin:0;font-size:13px;line-height:1.6}
.eq-table{display:grid;margin-top:12px;overflow:hidden;border:1px solid rgba(var(--theme-contrast-rgb),.1);border-radius:10px}
.eq-table-head,.eq-table-row{display:grid;grid-template-columns:64px minmax(0,1fr);gap:12px;padding:8px 12px}
.eq-table-head{background:rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-accent-strong-rgb),.92);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.eq-table-row{border-top:1px solid rgba(var(--theme-contrast-rgb),.07);font-size:13px;line-height:1.55}
.eq-table-row span:first-child{color:var(--theme-accent-strong);font-weight:700}
.eq-used{margin-top:12px}
.eq-used h3{margin:0 0 6px;color:var(--theme-accent-strong);font-size:13px;font-weight:700}
.eq-used-links{display:flex;flex-wrap:wrap;gap:7px}
.eq-used-link{border:1px solid rgba(var(--theme-accent-rgb),.3);background:rgba(var(--theme-accent-rgb),.08);color:rgba(var(--theme-accent-strong-rgb),.92);border-radius:999px;padding:5px 12px;font-size:12.5px;text-decoration:none;transition:border-color .25s ease,background .25s ease,color .25s ease}
.eq-used-link:hover,.eq-used-link:focus-visible{border-color:rgba(var(--theme-accent-strong-rgb),.62);background:rgba(var(--theme-accent-rgb),.16);color:rgba(var(--theme-accent-strong-rgb),1);outline:0}
@media (max-width:760px){.eq-table-head,.eq-table-row{grid-template-columns:52px minmax(0,1fr);gap:10px}}
</style>
