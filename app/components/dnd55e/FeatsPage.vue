<script setup>
import {
  DND55E_FEATS,
  DND55E_FEAT_ABILITIES,
  DND55E_FEAT_CATEGORIES
} from '~/data/dnd55e/feats.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ category: [], ability: [], repeatable: [] })

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

const visibleFeats = computed(() => DND55E_FEATS.filter((item) => {
  if (active.category.length && !active.category.includes(item.category)) return false
  if (active.ability.length && !item.abilities.some(value => active.ability.includes(value))) return false

  const repeatableKey = item.repeatable ? 'yes' : 'no'
  if (active.repeatable.length && !active.repeatable.includes(repeatableKey)) return false

  if (!query.value) return true

  return [
    item.title,
    item.originalName,
    item.categoryTitle,
    item.source,
    item.sourceTitle,
    item.requirement,
    item.summary,
    item.intro,
    ...item.abilities,
    ...item.benefits.flatMap(entry => [entry.title, entry.text])
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('ru')
    .includes(query.value)
}))

const groups = computed(() => Object.entries(DND55E_FEAT_CATEGORIES)
  .map(([category, group]) => ({
    id: category,
    title: group.title,
    code: group.code,
    items: visibleFeats.value
      .filter(item => item.category === category)
      .map(item => ({
        id: item.id,
        title: item.title,
        meta: [item.originalName, item.requirement || 'Без требований'].join(' · '),
        raw: item
      }))
  }))
  .filter(group => group.items.length))

const filters = computed(() => [
  {
    key: 'category',
    label: 'Категория',
    options: Object.entries(DND55E_FEAT_CATEGORIES).map(([value, item]) => ({
      value,
      label: item.singular
    }))
  },
  {
    key: 'ability',
    label: 'Увеличивает характеристику',
    options: DND55E_FEAT_ABILITIES.map(value => ({ value, label: value }))
  },
  {
    key: 'repeatable',
    label: 'Повторяемость',
    options: [
      { value: 'yes', label: 'Можно брать повторно' },
      { value: 'no', label: 'Только один раз' }
    ]
  }
])

const activeCount = computed(() => (
  active.category.length + active.ability.length + active.repeatable.length
))

function isActive(key, value) {
  return active[key]?.includes(value)
}

function toggleFilter(key, value) {
  const values = active[key]
  if (!values) return
  const index = values.indexOf(value)
  if (index >= 0) values.splice(index, 1)
  else values.push(value)
}

function resetFilters() {
  active.category = []
  active.ability = []
  active.repeatable = []
}

useSeoMeta({
  title: 'Черты — D&D 5.5e 2024 — TKK.club',
  description: 'Боевые стили, общие черты и черты происхождения из Player’s Handbook 2024 для D&D 5.5e.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/cherty.png"
    emblem-alt="Черты"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    title="Черты"
    crumb-current="Черты"
    search-placeholder="Найти черту, требование или эффект"
    node-prefix="d55-feat"
    query-key="feat"
    :groups="groups"
    :total="DND55E_FEATS.length"
    :visible="visibleFeats.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="2"
    :thread-web="true"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-dnd55e-feats-bookmarks"
    empty-text="Ничего не найдено. Попробуйте другой запрос или сбросьте фильтры."
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >

    <template #item="{ item }">
      <span class="feat-list-card">
        <span class="feat-list-icon" aria-hidden="true">
          {{ DND55E_FEAT_CATEGORIES[item.raw.category].icon }}
        </span>
        <span class="feat-list-copy">
          <span class="feat-list-name">
            {{ item.raw.title }}
            <small>{{ item.raw.originalName }}</small>
          </span>
          <span class="feat-list-meta">{{ item.raw.categoryTitle }} · {{ item.raw.source }}</span>
        </span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.raw.sourceTitle">{{ item.raw.source }}</span>
        <span class="tref-pill"><span>Категория</span><b>{{ item.raw.categoryTitle }}</b></span>
        <span v-if="item.raw.repeatable" class="tref-tag">Повторяемая</span>
      </div>

      <header class="feat-heading">
        <span class="feat-heading-icon" aria-hidden="true">
          {{ DND55E_FEAT_CATEGORIES[item.raw.category].icon }}
        </span>
        <span>
          <span class="feat-title">{{ item.raw.title }}</span>
          <span class="feat-original">{{ item.raw.originalName }}</span>
          <span class="feat-summary">{{ item.raw.summary }}</span>
        </span>
      </header>

      <dl class="tref-stats feat-stats">
        <div class="tref-stat">
          <dt>Категория</dt>
          <dd>{{ item.raw.categoryTitle }}</dd>
        </div>
        <div class="tref-stat">
          <dt>Требование</dt>
          <dd>{{ item.raw.requirement || 'Нет' }}</dd>
        </div>
        <div class="tref-stat">
          <dt>Характеристика</dt>
          <dd>{{ item.raw.abilities.length ? item.raw.abilities.join(', ') : 'Не увеличивает' }}</dd>
        </div>
        <div class="tref-stat">
          <dt>Источник</dt>
          <dd>{{ item.raw.sourceTitle }}</dd>
        </div>
      </dl>

      <p v-if="item.raw.intro" class="feat-intro">
        <RuleRichText :text="item.raw.intro" edition="2024" />
      </p>

      <section class="feat-benefits">
        <article v-for="entry in item.raw.benefits" :key="entry.title" class="feat-benefit">
          <h3>{{ entry.title }}</h3>
          <p><RuleRichText :text="entry.text" edition="2024" /></p>
        </article>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.feat-list-card{
  display:grid;
  grid-template-columns:38px minmax(0,1fr);
  align-items:center;
  gap:10px;
  min-width:0;
}
.feat-list-icon{
  display:grid;
  width:34px;
  height:34px;
  place-items:center;
  border:1px solid rgba(var(--theme-accent-rgb),.22);
  color:rgba(var(--theme-accent-strong-rgb),.78);
  font-family:'Cormorant Garamond',serif;
}
.feat-list-copy{display:flex;min-width:0;flex-direction:column;gap:3px}
.feat-list-name{
  overflow:hidden;
  color:rgba(var(--theme-heading-rgb),.92);
  font-weight:650;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.feat-list-name small{
  margin-left:5px;
  color:rgba(var(--theme-text-rgb),.44);
  font-size:10px;
  font-weight:450;
}
.feat-list-meta{
  overflow:hidden;
  color:rgba(var(--theme-text-rgb),.48);
  font-size:11px;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.feat-heading{
  display:grid;
  grid-template-columns:72px minmax(0,1fr);
  align-items:center;
  gap:18px;
  margin:2px 0 20px;
}
.feat-heading-icon{
  display:grid;
  width:62px;
  height:62px;
  place-items:center;
  border:1px solid rgba(var(--theme-accent-rgb),.25);
  background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.1),transparent 70%);
  color:rgba(var(--theme-accent-strong-rgb),.88);
  font-family:'Cormorant Garamond',serif;
  font-size:28px;
}
.feat-title{
  display:block;
  color:rgba(var(--theme-heading-rgb),.96);
  font-family:'Cormorant Garamond',serif;
  font-size:30px;
  line-height:1;
}
.feat-original{
  display:block;
  margin-top:5px;
  color:rgba(var(--theme-accent-strong-rgb),.66);
  font-size:11px;
  letter-spacing:.15em;
  text-transform:uppercase;
}
.feat-summary{
  display:block;
  margin-top:9px;
  color:rgba(var(--theme-text-rgb),.72);
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  line-height:1.42;
}
.feat-stats{grid-template-columns:repeat(4,minmax(0,1fr))}
.feat-intro{
  margin:0 0 4px;
  color:rgba(var(--theme-text-rgb),.7);
  font-size:13px;
  line-height:1.7;
}
.feat-benefits{
  display:grid;
  gap:10px;
  margin-top:18px;
}
.feat-benefit{
  border-left:2px solid rgba(var(--theme-accent-rgb),.28);
  background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.055),transparent 72%);
  padding:10px 13px;
}
.feat-benefit h3{
  margin:0 0 4px;
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  font-weight:600;
}
.feat-benefit p{
  margin:0;
  color:rgba(var(--theme-text-rgb),.72);
  font-size:13px;
  line-height:1.66;
}
@media (max-width:700px){
  .feat-heading{grid-template-columns:56px minmax(0,1fr);gap:13px}
  .feat-heading-icon{width:48px;height:48px;font-size:22px}
  .feat-title{font-size:25px}
  .feat-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
}
</style>
