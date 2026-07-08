<script setup>
import { SPELLS_5E, SPELL_SOURCES, SPELL_LEVELS, SPELL_SCHOOLS, SPELL_TAGS } from '~/data/spells5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ level: [], school: [], tag: [] })

function sourceName(id) { return SPELL_SOURCES[id] || id }
function schoolName(s) { return SPELL_SCHOOLS[s] || s }
function tagName(t) { return SPELL_TAGS[t] || t }

const usedSchools = [...new Set(SPELLS_5E.map(s => s.school))]
const usedTags = [...new Set(SPELLS_5E.flatMap(s => s.tags))]

const query = computed(() => search.value.trim().toLowerCase())

function matches(sp) {
  if (active.level.length && !active.level.includes(String(sp.level))) return false
  if (active.school.length && !active.school.includes(sp.school)) return false
  if (active.tag.length && !active.tag.some(t => sp.tags.includes(t))) return false
  if (!query.value) return true
  return [sp.title, sp.description, sp.range, sp.components, ...sp.sections.map(x => x.title + ' ' + x.text)]
    .join(' ').toLowerCase().includes(query.value)
}

// Каждый уровень — отдельная нить (группа) с ромбом.
const groups = computed(() => Object.keys(SPELL_LEVELS).map(lvl => ({
  id: `lvl-${lvl}`,
  title: SPELL_LEVELS[lvl],
  items: SPELLS_5E.filter(s => String(s.level) === lvl && matches(s)).map(s => ({
    id: s.id,
    title: s.title,
    meta: [schoolName(s.school), s.tags.includes('concentration') ? 'конц.' : null, s.tags.includes('ritual') ? 'ритуал' : null].filter(Boolean).join(' · '),
    badge: s.source,
    badgeTitle: sourceName(s.source),
    raw: s
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.level.length + active.school.length + active.tag.length)

const filters = computed(() => [
  { key: 'level', label: 'Уровень', options: Object.keys(SPELL_LEVELS).map(v => ({ value: v, label: v + ' ур.' })) },
  { key: 'school', label: 'Школа', options: usedSchools.map(v => ({ value: v, label: schoolName(v) })) },
  { key: 'tag', label: 'Метки', options: usedTags.map(v => ({ value: v, label: tagName(v) })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.level = []; active.school = []; active.tag = [] }

useSeoMeta({
  title: 'Заклинания — D&D 5e — TKK.club',
  description: 'Заклинания мира Эноа для D&D 5e: уровень, школа, время наложения, дистанция, компоненты и эффекты.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/zaklinaniya.png"
    emblem-alt="Заклинания"
    title="Заклинания"
    crumb-current="Заклинания"
    lead="Магия мира Эноа по уровням: время наложения, дистанция, компоненты и эффекты нитей."
    search-placeholder="Найти заклинание, эффект или дистанцию"
    node-prefix="spell"
    query-key="s"
    :groups="groups"
    :total="SPELLS_5E.length"
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
        <span class="tref-pill"><b>{{ SPELL_LEVELS[item.raw.level] }}</b></span>
        <span class="tref-tag">{{ schoolName(item.raw.school) }}</span>
        <span v-for="t in item.raw.tags" :key="t" class="tref-tag">{{ tagName(t) }}</span>
      </div>

      <dl class="tref-stats">
        <div class="tref-stat"><dt>Время наложения</dt><dd>{{ item.raw.castingTime }}</dd></div>
        <div class="tref-stat"><dt>Дистанция</dt><dd>{{ item.raw.range }}</dd></div>
        <div class="tref-stat"><dt>Компоненты</dt><dd>{{ item.raw.components }}</dd></div>
        <div class="tref-stat"><dt>Длительность</dt><dd>{{ item.raw.duration }}</dd></div>
      </dl>

      <div v-if="item.raw.classes?.length" class="tref-badges">
        <span v-for="c in item.raw.classes" :key="c" class="tref-tag">{{ c }}</span>
      </div>

      <p class="tref-desc"><RuleRichText :text="item.raw.description" /></p>

      <div v-for="section in item.raw.sections" :key="section.title" class="tref-block">
        <h3 class="tref-block-title">{{ section.title }}</h3>
        <p class="tref-desc"><RuleRichText :text="section.text" /></p>
      </div>
    </template>
  </ThreadRefPage>
</template>
