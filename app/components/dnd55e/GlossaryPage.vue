<script setup>
import {
  DND55E_GLOSSARY,
  DND55E_GLOSSARY_CATEGORIES,
  DND55E_GLOSSARY_SOURCES
} from '~/data/dnd55e/glossary.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ category: [], source: [] })

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

function sectionSearchText(item) {
  return (item.sections || []).flatMap(section => [
    section.title,
    ...(section.paragraphs || []),
    ...(section.bullets || [])
  ])
}

const visibleRules = computed(() => DND55E_GLOSSARY.filter((item) => {
  if (active.category.length && !active.category.includes(item.category)) return false
  if (active.source.length && !active.source.includes(item.source)) return false

  if (!query.value) return true

  return [
    item.title,
    item.originalName,
    item.categoryTitle,
    item.source,
    item.sourceTitle,
    item.summary,
    ...(item.paragraphs || []),
    ...sectionSearchText(item)
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('ru')
    .includes(query.value)
}))

const groups = computed(() => Object.entries(DND55E_GLOSSARY_CATEGORIES)
  .map(([category, group]) => ({
    id: category,
    title: group.title,
    code: group.code,
    items: visibleRules.value
      .filter(item => item.category === category)
      .map(item => ({
        id: item.id,
        title: item.title,
        meta: `${item.originalName} · ${item.source}`,
        raw: item
      }))
  }))
  .filter(group => group.items.length))

const usedSources = [...new Set(DND55E_GLOSSARY.map(item => item.source))]

const filters = computed(() => [
  {
    key: 'category',
    label: 'Категория',
    options: Object.entries(DND55E_GLOSSARY_CATEGORIES).map(([value, item]) => ({
      value,
      label: item.title
    }))
  },
  {
    key: 'source',
    label: 'Источник',
    options: usedSources.map(value => ({
      value,
      label: value,
      title: DND55E_GLOSSARY_SOURCES[value]
    }))
  }
])

const activeCount = computed(() => active.category.length + active.source.length)

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
  active.source = []
}

useSeoMeta({
  title: 'Глоссарий правил — D&D 5.5e 2024 — TKK.club',
  description: 'Алфавитный справочник действий, состояний, навыков, опасностей и других правил D&D 5.5e редакции 2024 года.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/shirma.png"
    emblem-alt="Глоссарий"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    title="Глоссарий"
    crumb-current="Глоссарий"
    search-placeholder="Найти правило или термин"
    node-prefix="d55-glossary"
    query-key="rule"
    :groups="groups"
    :total="DND55E_GLOSSARY.length"
    :visible="visibleRules.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="2"
    :thread-web="true"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-dnd55e-glossary-bookmarks"
    empty-text="Ничего не найдено. Попробуйте другой запрос или сбросьте фильтры."
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >

    <template #item="{ item }">
      <span class="glossary-list-card">
        <span class="glossary-list-icon" aria-hidden="true">
          <UIcon :name="item.raw.icon" class="glossary-rule-icon" />
        </span>
        <span class="glossary-list-copy">
          <span class="glossary-list-name">
            {{ item.raw.title }}
            <small>{{ item.raw.originalName }}</small>
          </span>
          <span class="glossary-list-meta">{{ item.raw.categoryTitle }} · {{ item.raw.source }}</span>
        </span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.raw.sourceTitle">{{ item.raw.source }}</span>
        <span class="tref-pill"><span>Категория</span><b>{{ item.raw.categoryTitle }}</b></span>
        <span class="tref-tag">Редакция 2024</span>
      </div>

      <header class="glossary-heading">
        <span class="glossary-heading-icon" aria-hidden="true">
          <UIcon :name="item.raw.icon" class="glossary-rule-icon" />
        </span>
        <span>
          <span class="glossary-title">{{ item.raw.title }}</span>
          <span class="glossary-original">{{ item.raw.originalName }}</span>
        </span>
      </header>

      <section class="glossary-rule-block">
        <p class="glossary-rule-lead">
          <RuleRichText
            :text="item.raw.summary"
            :current-path="`/dnd55e/glossary?rule=${item.raw.id}`"
            edition="2024"
          />
        </p>

        <dl class="glossary-quick" aria-label="Краткие параметры правила">
          <div v-for="fact in item.raw.quick" :key="fact.label">
            <dt>{{ fact.label }}</dt>
            <dd>
              <RuleRichText
                :text="fact.value"
                :current-path="`/dnd55e/glossary?rule=${item.raw.id}`"
                edition="2024"
              />
            </dd>
          </div>
        </dl>

        <div class="glossary-rule-sections">
          <section
            v-for="section in item.raw.sections"
            :key="section.title"
            class="glossary-rule-section"
            :class="`is-${section.kind || 'rule'}`"
          >
            <h3>{{ section.title }}</h3>
            <p v-for="(paragraph, index) in section.paragraphs" :key="index">
              <RuleRichText
                :text="paragraph"
                :current-path="`/dnd55e/glossary?rule=${item.raw.id}`"
                edition="2024"
              />
            </p>
            <ul v-if="section.bullets?.length">
              <li v-for="(bullet, index) in section.bullets" :key="index">
                <RuleRichText
                  :text="bullet"
                  :current-path="`/dnd55e/glossary?rule=${item.raw.id}`"
                  edition="2024"
                />
              </li>
            </ul>
          </section>
        </div>

        <footer>
          <span :title="item.raw.sourceTitle"><b>{{ item.raw.source }}</b></span>
          <span>D&D 5.5e · редакция <b>2024</b></span>
        </footer>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.glossary-list-card{
  display:grid;
  grid-template-columns:38px minmax(0,1fr);
  align-items:center;
  gap:10px;
  min-width:0;
}
.glossary-list-icon{
  display:grid;
  width:34px;
  height:34px;
  place-items:center;
  border:1px solid rgba(var(--theme-accent-rgb),.22);
  color:rgba(var(--theme-accent-strong-rgb),.78);
  font-family:'Cormorant Garamond',serif;
}
.glossary-rule-icon{display:block;width:1em;height:1em}
.glossary-list-icon .glossary-rule-icon{font-size:20px}
.glossary-list-copy{display:flex;min-width:0;flex-direction:column;gap:3px}
.glossary-list-name{
  overflow:hidden;
  color:rgba(var(--theme-heading-rgb),.92);
  font-weight:650;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.glossary-list-name small{
  margin-left:5px;
  color:rgba(var(--theme-text-rgb),.44);
  font-size:10px;
  font-weight:450;
}
.glossary-list-meta{
  overflow:hidden;
  color:rgba(var(--theme-text-rgb),.48);
  font-size:11px;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.glossary-heading{
  display:grid;
  grid-template-columns:76px minmax(0,1fr);
  align-items:center;
  gap:17px;
  margin:18px 0 20px;
}
.glossary-heading-icon{
  display:grid;
  width:72px;
  height:72px;
  place-items:center;
  border:1px solid rgba(var(--theme-accent-rgb),.25);
  background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.09),transparent 70%);
  color:rgba(var(--theme-accent-strong-rgb),.88);
  font-family:'Cormorant Garamond',serif;
  font-size:30px;
}
.glossary-heading-icon .glossary-rule-icon{font-size:36px}
.glossary-title{
  display:block;
  color:rgba(var(--theme-heading-rgb),.96);
  font-family:'Cormorant Garamond',serif;
  font-size:30px;
  line-height:1;
}
.glossary-original{
  display:block;
  margin-top:5px;
  color:rgba(var(--theme-accent-strong-rgb),.68);
  font-size:11px;
  letter-spacing:.14em;
  text-transform:uppercase;
}
.glossary-rule-block{
  position:relative;
  margin-top:15px;
  border:1px solid rgba(var(--theme-accent-rgb),.24);
  border-radius:11px;
  background:linear-gradient(150deg,rgba(var(--theme-surface-rgb),.52),rgba(var(--theme-surface-rgb),.18));
  padding:22px 22px 16px;
  box-shadow:inset 0 0 0 1px rgba(var(--theme-text-rgb),.025);
}
.glossary-rule-block::before,
.glossary-rule-block::after{
  position:absolute;
  width:13px;
  height:13px;
  border-color:rgba(var(--theme-accent-strong-rgb),.64);
  content:'';
  pointer-events:none;
}
.glossary-rule-block::before{
  top:6px;
  left:6px;
  border-top:1px solid;
  border-left:1px solid;
}
.glossary-rule-block::after{
  right:6px;
  bottom:6px;
  border-right:1px solid;
  border-bottom:1px solid;
}
.glossary-rule-lead{
  max-width:850px;
  margin:0;
  color:rgba(var(--theme-heading-rgb),.82);
  font-family:'Cormorant Garamond',serif;
  font-size:19px;
  line-height:1.55;
}
.glossary-quick{
  display:flex;
  flex-wrap:wrap;
  gap:0;
  margin:15px 0 18px;
  border-top:1px solid rgba(var(--theme-text-rgb),.1);
  border-bottom:1px solid rgba(var(--theme-text-rgb),.1);
  padding:10px 0;
}
.glossary-quick div{
  display:flex;
  align-items:baseline;
  gap:9px;
  min-width:210px;
  padding-right:25px;
}
.glossary-quick dt{
  color:rgba(var(--theme-text-rgb),.4);
  font-size:9px;
  font-weight:700;
  letter-spacing:.09em;
  text-transform:uppercase;
}
.glossary-quick dd{
  margin:0;
  color:rgba(var(--theme-accent-strong-rgb),.88);
  font-size:12px;
  font-weight:650;
}
.glossary-rule-sections{display:grid;gap:17px}
.glossary-rule-section{
  position:relative;
}
.glossary-rule-section.is-example,
.glossary-rule-section.is-gm,
.glossary-rule-section.is-nuance{
  border-left:2px solid rgba(var(--theme-accent-rgb),.28);
  border-radius:0 7px 7px 0;
  background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.045),transparent 72%);
  padding:12px 14px 7px 16px;
}
.glossary-rule-section.is-example::before,
.glossary-rule-section.is-gm::before,
.glossary-rule-section.is-nuance::before{
  position:absolute;
  top:14px;
  left:-7px;
  display:grid;
  width:12px;
  height:12px;
  place-items:center;
  border:1px solid rgba(var(--theme-accent-strong-rgb),.55);
  border-radius:50%;
  background:rgb(var(--theme-surface-rgb));
  color:rgba(var(--theme-accent-strong-rgb),.84);
  content:'';
}
.glossary-rule-section.is-example::before{content:'›';font-size:12px;line-height:1}
.glossary-rule-section.is-gm::before{content:'?';font-size:8px;font-weight:800}
.glossary-rule-section.is-nuance::before{content:'!';font-size:8px;font-weight:800}
.glossary-rule-section h3{
  margin:0 0 7px;
  color:rgba(var(--theme-heading-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:19px;
  font-weight:600;
  letter-spacing:.035em;
  text-transform:uppercase;
}
.glossary-rule-section p,
.glossary-rule-section li{
  max-width:800px;
  color:rgba(var(--theme-text-rgb),.7);
  font-size:14px;
  line-height:1.72;
}
.glossary-rule-section p{margin:0 0 8px}
.glossary-rule-section ul{display:grid;gap:5px;margin:5px 0 8px;padding-left:21px}
.glossary-rule-section li{padding-left:3px}
.glossary-rule-section li::marker{color:rgba(var(--theme-accent-strong-rgb),.72)}
.glossary-rule-block footer{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:8px 20px;
  margin-top:18px;
  border-top:1px dashed rgba(var(--theme-text-rgb),.1);
  padding-top:11px;
  color:rgba(var(--theme-text-rgb),.46);
  font-size:10px;
  letter-spacing:.06em;
  text-transform:uppercase;
}
.glossary-rule-block footer b{color:rgba(var(--theme-accent-strong-rgb),.74)}
@media (max-width:700px){
  .glossary-heading{grid-template-columns:58px minmax(0,1fr);gap:13px}
  .glossary-heading-icon{width:54px;height:54px;font-size:24px}
  .glossary-title{font-size:25px}
  .glossary-rule-block{padding:18px 16px 14px}
  .glossary-quick{display:grid;gap:7px}
  .glossary-quick div{padding-right:0}
}
</style>
