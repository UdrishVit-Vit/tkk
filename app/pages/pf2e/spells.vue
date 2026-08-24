<script setup>
import {
  PF2E_SPELLS,
  PF2E_SPELL_CATEGORIES,
  PF2E_SPELL_RARITIES,
  PF2E_TRADITIONS,
  PF2E_SPELL_ACTION_GLYPHS
} from '~/data/pf2e/spells/index.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tradition: [], cat: [], rarity: [] })

const query = computed(() => search.value.trim().toLowerCase())

function matches(spell) {
  if (active.tradition.length && !active.tradition.some(t => spell.traditions.includes(t))) return false
  if (active.cat.length && !active.cat.includes(spell.cat)) return false
  if (active.rarity.length && !active.rarity.includes(spell.rarity)) return false
  if (!query.value) return true
  return spell.searchText.toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(PF2E_SPELL_CATEGORIES).map(([id, title]) => ({
  id,
  title,
  items: PF2E_SPELLS
    .filter(spell => spell.cat === id && matches(spell))
    .map(spell => ({
      id: spell.id,
      title: spell.title,
      meta: spell.traditions.join(', ') || '—',
      badge: actionGlyph(spell.actions),
      badgeTitle: `Время сотворения: ${spell.actions}`,
      raw: spell
    }))
})).filter(group => group.items.length))

const totalVisible = computed(() => groups.value.reduce((sum, g) => sum + g.items.length, 0))
const activeCount = computed(() => active.tradition.length + active.cat.length + active.rarity.length)

// "2" → "◆◆". Casting times measured in minutes keep their text instead.
function actionGlyph(actions) {
  return PF2E_SPELL_ACTION_GLYPHS[String(actions)] || actions
}

// Only the lines a given spell actually has should take up a row.
function statRows(spell) {
  return [
    { label: 'Сотворение', value: actionGlyph(spell.actions) },
    spell.range ? { label: 'Дальность', value: spell.range } : null,
    spell.area ? { label: 'Область', value: spell.area } : null,
    spell.targets ? { label: 'Цели', value: spell.targets } : null,
    spell.save ? { label: 'Спасбросок', value: spell.save } : null,
    spell.duration ? { label: 'Длительность', value: spell.duration } : null,
    spell.trigger ? { label: 'Триггер', value: spell.trigger } : null,
    spell.requirements ? { label: 'Условие', value: spell.requirements } : null
  ].filter(Boolean)
}

const filters = computed(() => [
  { key: 'tradition', label: 'Традиция', options: PF2E_TRADITIONS.map(value => ({ value, label: value })) },
  { key: 'cat', label: 'Круг', options: Object.entries(PF2E_SPELL_CATEGORIES).map(([value, label]) => ({ value, label })) },
  { key: 'rarity', label: 'Редкость', options: PF2E_SPELL_RARITIES.map(value => ({ value, label: value })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.tradition = []; active.cat = []; active.rarity = [] }

useSeoMeta({
  title: 'Заклинания — Pathfinder 2e — TKK.club',
  description: 'Заклинания Pathfinder 2e на русском: заговоры и все десять кругов, четыре традиции, время сотворения, области, спасброски и повышение.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/zaklinaniya.png"
    emblem-alt="Заклинания"
    system-path="/pf2e"
    system-label="Pathfinder 2e"
    kicker="Pathfinder 2e"
    title="Заклинания"
    crumb-current="Заклинания"
    lead="Заговоры и десять кругов по традициям: сколько действий, какая область, какой спасбросок и что даёт повышение круга."
    search-placeholder="Найти заклинание, черту или эффект"
    node-prefix="pfs"
    query-key="s"
    :groups="groups"
    :total="PF2E_SPELLS.length"
    :visible="totalVisible"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :card-actions="['expand', 'print', 'bookmark', 'link']"
    bookmark-store="pf2e-spell-bookmarks"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #body="{ item }">
      <div class="tref-badges">
        <span v-if="item.raw.rarity !== 'Обычное'" class="tref-pill"><b>{{ item.raw.rarity }}</b></span>
        <span class="tref-source" :title="item.raw.en">{{ item.raw.en }}</span>
        <span v-for="trait in item.raw.traits" :key="trait" class="tref-tag">{{ trait }}</span>
      </div>

      <p class="pfs-traditions">
        <span class="pfs-traditions-label">Традиции</span>
        <span>{{ item.raw.traditions.join(', ') || 'фокус-заклинание' }}</span>
      </p>

      <dl class="tref-stats">
        <div v-for="row in statRows(item.raw)" :key="row.label" class="tref-stat">
          <dt>{{ row.label }}</dt><dd>{{ row.value }}</dd>
        </div>
      </dl>

      <p class="tref-desc">{{ item.raw.desc }}</p>

      <p v-if="item.raw.heightened" class="pfs-heightened">
        <strong>Повышение.</strong> {{ item.raw.heightened }}
      </p>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.pfs-traditions{display:flex;flex-wrap:wrap;align-items:baseline;gap:10px;margin:12px 0 0;font-size:13.5px;color:rgba(var(--theme-text-rgb),.78)}
.pfs-traditions-label{font-family:'Hanken Grotesk';font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.45)}
.pfs-heightened{margin:14px 0 0;padding-top:12px;border-top:1px solid rgba(var(--theme-contrast-rgb),.08);font-size:13px;line-height:1.62;color:rgba(var(--theme-text-rgb),.7)}
.pfs-heightened strong{color:rgba(var(--theme-accent-strong-rgb),.9);font-weight:700}
</style>
