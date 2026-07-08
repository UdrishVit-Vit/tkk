<script setup>
import { BESTIARY_5E, BESTIARY_SOURCES, CREATURE_SIZES, CREATURE_TYPES, CREATURE_TAGS } from '~/data/bestiary5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ type: [], size: [], tag: [] })

const ABILITY_LABELS = { str: 'Сил', dex: 'Лов', con: 'Тел', int: 'Инт', wis: 'Мдр', cha: 'Хар' }
const usedTags = [...new Set(BESTIARY_5E.flatMap(c => c.tags))]

const query = computed(() => search.value.trim().toLowerCase())

function matches(c) {
  if (active.type.length && !active.type.includes(c.type)) return false
  if (active.size.length && !active.size.includes(c.size)) return false
  if (active.tag.length && !active.tag.some(t => c.tags.includes(t))) return false
  if (!query.value) return true
  return [c.name, c.type, ...c.traits.map(t => t[0])].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => Object.entries(CREATURE_TYPES).map(([id, title]) => ({
  id,
  title,
  items: BESTIARY_5E.filter(c => c.type === id && matches(c)).map(c => ({
    id: c.id,
    title: c.name,
    meta: `УО ${c.cr} · ${CREATURE_SIZES[c.size] || c.size}`,
    badge: c.source,
    badgeTitle: BESTIARY_SOURCES[c.source] || c.source,
    raw: c
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.type.length + active.size.length + active.tag.length)

const filters = computed(() => [
  { key: 'type', label: 'Тип', options: Object.entries(CREATURE_TYPES).map(([value, label]) => ({ value, label })) },
  { key: 'size', label: 'Размер', options: Object.entries(CREATURE_SIZES).map(([value, label]) => ({ value, label })) },
  { key: 'tag', label: 'Метки', options: usedTags.map(v => ({ value: v, label: CREATURE_TAGS[v] || v })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.type = []; active.size = []; active.tag = [] }

const STAT_ROWS = [
  ['savingThrows', 'Спасброски'],
  ['skills', 'Навыки'],
  ['damageResistances', 'Сопротивления'],
  ['damageImmunities', 'Иммунитеты к урону'],
  ['conditionImmunities', 'Иммунитеты к состояниям'],
  ['senses', 'Чувства'],
  ['languages', 'Языки']
]

function shownStatRows(c) {
  return STAT_ROWS.filter(([key]) => c[key] && c[key] !== '—')
}

useSeoMeta({
  title: 'Бестиарий — D&D 5e — TKK.club',
  description: 'Бестиарий мира Эноа для D&D 5e: статблоки существ, умения, действия и легендарные действия.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/bestiariy.png"
    emblem-alt="Бестиарий"
    title="Бестиарий"
    crumb-current="Бестиарий"
    lead="Существа мира Эноа: характеристики, умения, действия и легендарные силы."
    search-placeholder="Найти существо"
    node-prefix="creature"
    query-key="c"
    :groups="groups"
    :total="BESTIARY_5E.length"
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
        <span class="tref-pill"><b>УО {{ item.raw.cr }}</b></span>
        <span class="tref-tag">{{ CREATURE_SIZES[item.raw.size] }} · {{ CREATURE_TYPES[item.raw.type] }}</span>
        <span v-for="t in item.raw.tags" :key="t" class="tref-tag">{{ CREATURE_TAGS[t] || t }}</span>
      </div>

      <dl class="tref-stats">
        <div class="tref-stat"><dt>Класс доспеха</dt><dd>{{ item.raw.armorClass }}</dd></div>
        <div class="tref-stat"><dt>Хиты</dt><dd>{{ item.raw.hitPoints }}</dd></div>
        <div class="tref-stat"><dt>Скорость</dt><dd>{{ item.raw.speed }}</dd></div>
      </dl>

      <div class="tref-abilities">
        <div v-for="(label, key) in ABILITY_LABELS" :key="key" class="tref-ability">
          <span>{{ label }}</span>
          <b>{{ item.raw.stats[key] }}</b>
        </div>
      </div>

      <dl v-if="shownStatRows(item.raw).length" class="tref-stats">
        <div v-for="[key, label] in shownStatRows(item.raw)" :key="key" class="tref-stat">
          <dt>{{ label }}</dt><dd style="font-size:13px;font-weight:600">{{ item.raw[key] }}</dd>
        </div>
      </dl>

      <div v-for="block in [['traits','Умения'],['actions','Действия'],['bonusActions','Бонусные действия'],['reactions','Реакции'],['legendaryActions','Легендарные действия']]" :key="block[0]">
        <div v-if="item.raw[block[0]]?.length" class="tref-block">
          <h3 class="tref-block-title">{{ block[1] }}</h3>
          <ul class="tref-list">
            <li v-for="row in item.raw[block[0]]" :key="row[0]">
              <b>{{ row[0] }}.</b> <RuleRichText :text="row[1]" />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </ThreadRefPage>
</template>
