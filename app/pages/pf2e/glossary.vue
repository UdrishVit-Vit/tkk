<script setup>
import { PF2E_GLOSSARY, PF2E_GLOSSARY_CATEGORIES, PF2E_GLOSSARY_BY_ID } from '~/data/pf2e/glossary/index.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ cat: [] })

const query = computed(() => search.value.trim().toLowerCase())

function matches(entry) {
  if (active.cat.length && !active.cat.includes(entry.cat)) return false
  if (!query.value) return true
  return entry.searchText.toLowerCase().includes(query.value)
}

// "◆ одно действие" → "◆". Rules without a cost simply get no badge.
function actionGlyph(entry) {
  const cost = entry.quick?.find(q => q.label === 'Стоимость')?.value || ''
  const glyph = cost.match(/^[◆◇⤶]+/)
  return glyph ? glyph[0] : ''
}

const groups = computed(() => Object.entries(PF2E_GLOSSARY_CATEGORIES).map(([id, meta]) => ({
  id,
  title: meta.title,
  code: `${meta.icon}  ПРАВИЛА · PATHFINDER 2E`,
  items: PF2E_GLOSSARY.filter(entry => entry.cat === id && matches(entry)).map(entry => ({
    id: entry.id,
    title: entry.title,
    meta: entry.en,
    // The collapsed row is easier to scan by action cost than by trait, and the
    // traits are already listed inside the open card.
    badge: actionGlyph(entry),
    badgeTitle: actionGlyph(entry) ? 'Стоимость действий' : '',
    raw: entry
  }))
})).filter(group => group.items.length))

const totalVisible = computed(() => groups.value.reduce((sum, g) => sum + g.items.length, 0))

const filters = computed(() => [{
  key: 'cat',
  label: 'Раздел правил',
  options: Object.entries(PF2E_GLOSSARY_CATEGORIES).map(([value, meta]) => ({ value, label: meta.title }))
}])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.cat = [] }

// "Смотрите также" links jump straight to the referenced rule instead of making
// the reader search for it.
function relatedTitle(id) { return PF2E_GLOSSARY_BY_ID[id]?.title || id }
function openRelated(id) {
  if (!PF2E_GLOSSARY_BY_ID[id]) return
  search.value = ''
  active.cat = []
  open.value = id
}

useSeoMeta({
  title: 'Глоссарий правил — Pathfinder 2e — TKK.club',
  description: 'Справочник правил Pathfinder 2e на русском: проверки и степени успеха, экономия трёх действий, все состояния, урон и защиты, чувства и скрытность, магия, режимы игры.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/shirma.png"
    emblem-alt="Глоссарий правил"
    system-path="/pf2e"
    system-label="Pathfinder 2e"
    kicker="Pathfinder 2e"
    title="Глоссарий правил"
    crumb-current="Глоссарий"
    lead="Свод правил Second Edition: как считается проверка, куда уходят три действия, что делает каждое состояние и чем отличается заслон от укрытия."
    search-placeholder="Найти правило, состояние или действие"
    node-prefix="pfg"
    query-key="r"
    :groups="groups"
    :total="PF2E_GLOSSARY.length"
    :visible="totalVisible"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="active.cat.length"
    :card-actions="['expand', 'print', 'bookmark', 'link']"
    bookmark-store="pf2e-glossary-bookmarks"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #body="{ item }">
      <div v-if="item.raw.traits?.length" class="tref-badges">
        <span v-for="trait in item.raw.traits" :key="trait" class="tref-tag">{{ trait }}</span>
      </div>

      <p class="tref-desc pfg-summary">{{ item.raw.summary }}</p>

      <dl v-if="item.raw.quick?.length" class="tref-stats">
        <div v-for="q in item.raw.quick" :key="q.label" class="tref-stat">
          <dt>{{ q.label }}</dt>
          <dd>{{ q.value }}</dd>
        </div>
      </dl>

      <section v-for="section in item.raw.sections" :key="section.title" class="pfg-section">
        <h4 class="pfg-section-title">{{ section.title }}</h4>
        <p v-for="(paragraph, i) in section.paragraphs || []" :key="'p'+i" class="tref-desc">{{ paragraph }}</p>
        <ul v-if="section.list?.length" class="pfg-list">
          <li v-for="(line, i) in section.list" :key="'l'+i">{{ line }}</li>
        </ul>
      </section>

      <div v-if="item.raw.related?.length" class="pfg-related">
        <span class="pfg-related-label">Смотрите также</span>
        <button
          v-for="id in item.raw.related"
          :key="id"
          type="button"
          class="pfg-related-link"
          @click.stop="openRelated(id)"
        >{{ relatedTitle(id) }}</button>
      </div>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.pfg-summary{font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.6;color:rgba(var(--theme-heading-rgb),.9)}
.pfg-section{margin-top:16px}
.pfg-section-title{margin:0 0 7px;font-family:'Hanken Grotesk';font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.8)}
.pfg-list{margin:8px 0 0;padding-left:18px;display:grid;gap:6px}
.pfg-list li{font-size:13.5px;line-height:1.6;color:rgba(var(--theme-text-rgb),.76)}
.pfg-related{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:18px;padding-top:14px;border-top:1px solid rgba(var(--theme-contrast-rgb),.08)}
.pfg-related-label{font-family:'Hanken Grotesk';font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.45)}
.pfg-related-link{border:1px solid rgba(var(--theme-accent-rgb),.3);background:rgba(var(--theme-accent-rgb),.07);color:rgba(var(--theme-accent-strong-rgb),.92);border-radius:999px;padding:4px 12px;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:14px;transition:all .2s}
.pfg-related-link:hover{border-color:rgba(var(--theme-accent-strong-rgb),.6);background:rgba(var(--theme-accent-rgb),.16)}
</style>
