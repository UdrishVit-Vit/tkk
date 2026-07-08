<script setup>
import { FEATS_5E, FEAT_SOURCES, FEAT_ABILITIES } from '~/data/feats5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ source: [], ability: [], req: [] })

const REQ_OPTIONS = [
  { value: 'yes', label: 'С требованием' },
  { value: 'no', label: 'Без требования' },
  { value: 'level', label: 'По уровню' }
]

function sourceName(id) { return FEAT_SOURCES[id] || id }
function reqKindsOf(feat) {
  const kinds = feat.requirement ? ['yes'] : ['no']
  if (feat.minLevel) kinds.push('level')
  return kinds
}

const query = computed(() => search.value.trim().toLowerCase())

function matches(feat) {
  if (active.source.length && !active.source.includes(feat.source)) return false
  if (active.ability.length && !feat.abilities.some(a => active.ability.includes(a))) return false
  if (active.req.length && !reqKindsOf(feat).some(k => active.req.includes(k))) return false
  if (!query.value) return true
  return [feat.title, feat.requirement || '', feat.intro, ...feat.benefits].join(' ').toLowerCase().includes(query.value)
}

const groups = computed(() => {
  const bySource = new Map()
  for (const feat of FEATS_5E) {
    if (!matches(feat)) continue
    if (!bySource.has(feat.source)) bySource.set(feat.source, [])
    bySource.get(feat.source).push(feat)
  }
  return [...bySource.entries()].map(([source, feats]) => ({
    id: source,
    title: sourceName(source),
    code: source,
    items: feats.map(f => ({
      id: f.id,
      title: f.title,
      meta: f.requirement || '',
      raw: f
    }))
  }))
})

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.source.length + active.ability.length + active.req.length)

const filters = computed(() => [
  { key: 'source', label: 'Источник', options: Object.entries(FEAT_SOURCES).map(([value, name]) => ({ value, label: value, title: name })) },
  { key: 'ability', label: 'Характеристика', options: FEAT_ABILITIES.map(v => ({ value: v, label: v })) },
  { key: 'req', label: 'Требования', options: REQ_OPTIONS }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.source = []; active.ability = []; active.req = [] }

useSeoMeta({
  title: 'Черты — D&D 5e — TKK.club',
  description: 'Черты персонажей мира Эноа для D&D 5e: требования, характеристики и преимущества нитей.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/cherty.png"
    emblem-alt="Черты"
    title="Черты"
    crumb-current="Черты"
    lead="Особые дары нитей: требования, характеристики и преимущества."
    search-placeholder="Найти черту, требование или эффект"
    node-prefix="feat"
    query-key="feat"
    :groups="groups"
    :total="FEATS_5E.length"
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
        <span class="tref-source" :title="sourceName(item.raw.source)">{{ item.raw.source }}</span>
        <span v-if="item.raw.requirement" class="tref-pill"><span>Требование</span><b>{{ item.raw.requirement }}</b></span>
        <span v-if="item.raw.abilities?.length" class="tref-tag">{{ item.raw.abilities.join(', ') }}</span>
      </div>

      <p class="feat-intro"><RuleRichText :text="item.raw.intro" /></p>

      <ul class="tref-list feat-benefits">
        <li v-for="(benefit, i) in item.raw.benefits" :key="i"><RuleRichText :text="benefit" /></li>
      </ul>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.feat-intro{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-style:italic;
  font-size:19px;
  line-height:1.55;
  color:rgba(228,234,244,.82);
}

.feat-benefits{
  margin-top:16px;
}
</style>
