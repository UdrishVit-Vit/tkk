<script setup>
import { BACKGROUNDS_5E, BACKGROUND_SOURCES } from '~/data/backgrounds5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ source: [], feat: [] })
const rolled = ref({}) // { `${bgId}:${tableId}`: rowIndex }

function sourceName(id) { return BACKGROUND_SOURCES[id] || id }

// Небольшой конвертер **жирного** / _курсива_ для доверенного статического текста.
function mdBold(text) {
  if (!text) return ''
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
}

function rollTable(bgId, table) {
  rolled.value = { ...rolled.value, [`${bgId}:${table.id}`]: Math.floor(Math.random() * table.entries.length) }
}
function rolledIndex(bgId, table) {
  return rolled.value[`${bgId}:${table.id}`]
}

const query = computed(() => search.value.trim().toLowerCase())

function matches(bg) {
  if (active.source.length && !active.source.includes(bg.source)) return false
  if (active.feat.length) {
    const has = !!bg.grantsFeat
    if (active.feat.includes('yes') && !active.feat.includes('no') && !has) return false
    if (active.feat.includes('no') && !active.feat.includes('yes') && has) return false
  }
  if (!query.value) return true
  return [bg.title, bg.intro, bg.feature?.title, bg.feature?.text].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => {
  const bySource = new Map()
  for (const bg of BACKGROUNDS_5E) {
    if (!matches(bg)) continue
    if (!bySource.has(bg.source)) bySource.set(bg.source, [])
    bySource.get(bg.source).push(bg)
  }
  return [...bySource.entries()].map(([source, list]) => ({
    id: source,
    title: sourceName(source),
    code: source,
    items: list.map(bg => ({
      id: bg.id,
      title: bg.title,
      meta: bg.feature?.title || '',
      badge: bg.source,
      badgeTitle: sourceName(bg.source),
      raw: bg
    }))
  }))
})

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.source.length + active.feat.length)

const filters = computed(() => [
  { key: 'source', label: 'Источник', options: Object.entries(BACKGROUND_SOURCES).map(([value, name]) => ({ value, label: value, title: name })) },
  { key: 'feat', label: 'Черта', options: [{ value: 'yes', label: 'Даёт черту' }, { value: 'no', label: 'Без черты' }] }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.source = []; active.feat = [] }

const PROF_BLOCKS = [
  ['skills', 'Владения навыками'],
  ['tools', 'Владения инструментами'],
  ['languages', 'Языки'],
  ['equipment', 'Снаряжение']
]

function profText(entry) {
  return typeof entry === 'string' ? entry : (entry.text ? `${entry.name} — ${entry.text}` : entry.name)
}

useSeoMeta({
  title: 'Предыстории — D&D 5e — TKK.club',
  description: 'Предыстории персонажей мира Эноа для D&D 5e: владения, снаряжение, умения и таблицы характера.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/predystorii.png"
    emblem-alt="Предыстории"
    title="Предыстории"
    crumb-current="Предыстории"
    lead="Прошлое героя: владения, снаряжение, особые умения и таблицы характера."
    search-placeholder="Найти предысторию или умение"
    node-prefix="bg"
    query-key="bg"
    :groups="groups"
    :total="BACKGROUNDS_5E.length"
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
        <span v-if="item.raw.grantsFeat" class="tref-pill"><span>Черта</span><b>{{ item.raw.grantsFeat }}</b></span>
      </div>

      <p class="bg-intro">{{ item.raw.intro }}</p>
      <blockquote v-if="item.raw.quote" class="bg-quote">{{ item.raw.quote }}</blockquote>

      <div v-if="item.raw.feature" class="bg-feature">
        <h3 class="tref-block-title">{{ item.raw.feature.title }}</h3>
        <p class="tref-desc" v-html="mdBold(item.raw.feature.text)" />
        <p v-if="item.raw.feature.alt" class="bg-feature-alt"><span>Или:</span> <span v-html="mdBold(item.raw.feature.alt)" /></p>
      </div>

      <div v-for="[key, label] in PROF_BLOCKS" :key="key">
        <div v-if="item.raw.proficiencies?.[key]?.length" class="tref-block">
          <h3 class="tref-block-title">{{ label }}</h3>
          <ul class="tref-list">
            <li v-for="(entry, i) in item.raw.proficiencies[key]" :key="i">{{ profText(entry) }}</li>
          </ul>
        </div>
      </div>

      <p v-if="item.raw.personalization" class="tref-desc bg-person">{{ item.raw.personalization }}</p>

      <div v-for="table in item.raw.tables || []" :key="table.id" class="bg-table">
        <div class="bg-table-head">
          <span class="bg-table-label">{{ table.label }}</span>
          <button type="button" class="bg-roll-btn" @click="rollTable(item.raw.id, table)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
            Бросить {{ table.dice }}
          </button>
        </div>
        <div v-if="rolledIndex(item.raw.id, table) != null" class="bg-roll-result">
          <b>{{ table.entries[rolledIndex(item.raw.id, table)].roll }}</b>
          <span v-html="mdBold(table.entries[rolledIndex(item.raw.id, table)].text)" />
        </div>
        <ol class="bg-table-list">
          <li
            v-for="(entry, i) in table.entries"
            :key="entry.roll"
            :class="{ hit: rolledIndex(item.raw.id, table) === i }"
          >
            <span class="bg-roll-num">{{ entry.roll }}</span>
            <span v-html="mdBold(entry.text)" />
          </li>
        </ol>
      </div>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.bg-intro{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:19px;
  line-height:1.55;
  color:rgba(228,234,244,.84);
}

.bg-quote{
  margin:14px 0 0;
  padding:2px 0 2px 16px;
  border-left:2px solid rgba(var(--theme-accent-rgb),.4);
  font-family:'Cormorant Garamond',serif;
  font-style:italic;
  font-size:17px;
  line-height:1.5;
  color:rgba(var(--theme-accent-rgb),.75);
}

.bg-feature{
  margin-top:18px;
  padding:16px 18px;
  border:1px solid rgba(var(--theme-accent-rgb),.2);
  border-radius:9px;
  background:rgba(var(--theme-accent-rgb),.05);
}

.bg-feature .tref-block-title{
  margin-top:0;
}

.bg-feature-alt{
  margin:10px 0 0;
  font-size:14px;
  line-height:1.55;
  color:rgba(var(--theme-text-rgb),.7);
}

.bg-feature-alt span:first-child{
  font-weight:800;
  letter-spacing:.1em;
  text-transform:uppercase;
  font-size:10px;
  color:rgba(var(--theme-accent-rgb),.7);
}

.bg-person{
  margin-top:16px;
  font-style:italic;
}

.bg-table{
  margin-top:18px;
  border-top:1px solid rgba(var(--theme-text-rgb),.08);
  padding-top:14px;
}

.bg-table-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  margin-bottom:10px;
}

.bg-table-label{
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  font-weight:600;
  letter-spacing:.04em;
  text-transform:uppercase;
  color:rgba(var(--theme-heading-rgb),.9);
}

.bg-roll-btn{
  display:inline-flex;
  align-items:center;
  gap:7px;
  border:1px solid rgba(var(--theme-accent-rgb),.35);
  border-radius:999px;
  background:rgba(var(--theme-accent-rgb),.08);
  padding:5px 13px;
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-size:11px;
  font-weight:750;
  letter-spacing:.06em;
  text-transform:uppercase;
  cursor:pointer;
  transition:border-color .16s ease,background .16s ease;
}

.bg-roll-btn svg{
  width:14px;
  height:14px;
}

.bg-roll-btn:hover{
  border-color:rgba(var(--theme-accent-strong-rgb),.6);
  background:rgba(var(--theme-accent-rgb),.16);
}

.bg-roll-result{
  display:flex;
  align-items:baseline;
  gap:12px;
  margin-bottom:12px;
  padding:12px 14px;
  border:1px solid rgba(var(--theme-accent-rgb),.32);
  border-radius:9px;
  background:rgba(var(--theme-accent-rgb),.09);
}

.bg-roll-result b{
  flex:0 0 auto;
  font-size:20px;
  font-weight:850;
  color:var(--theme-accent-strong);
  font-variant-numeric:tabular-nums;
}

.bg-roll-result span{
  font-size:15px;
  line-height:1.5;
  color:rgba(228,234,244,.88);
}

.bg-table-list{
  display:flex;
  flex-direction:column;
  gap:6px;
  margin:0;
  padding:0;
  list-style:none;
}

.bg-table-list li{
  display:flex;
  gap:12px;
  padding:5px 8px;
  border-radius:6px;
  font-size:14px;
  line-height:1.5;
  color:rgba(var(--theme-text-rgb),.72);
  transition:background .16s ease,color .16s ease;
}

.bg-table-list li.hit{
  background:rgba(var(--theme-accent-rgb),.12);
  color:rgba(var(--theme-accent-strong-rgb),.95);
}

.bg-roll-num{
  flex:0 0 auto;
  width:22px;
  font-weight:800;
  color:rgba(var(--theme-accent-rgb),.7);
  font-variant-numeric:tabular-nums;
}
</style>
