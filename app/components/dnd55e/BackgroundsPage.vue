<script setup>
import {
  DND55E_BACKGROUNDS,
  DND55E_BACKGROUND_ABILITIES,
  DND55E_BACKGROUND_FEATS,
  DND55E_BACKGROUND_GROUPS,
  DND55E_BACKGROUND_RULES,
  DND55E_BACKGROUND_TIES
} from '~/data/dnd55e/backgrounds.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ group: [], ability: [], feat: [], tie: [] })

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

const visibleBackgrounds = computed(() => DND55E_BACKGROUNDS.filter((item) => {
  if (active.group.length && !active.group.includes(item.group)) return false
  if (active.ability.length && !item.abilities.some(value => active.ability.includes(value))) return false
  if (active.feat.length && !active.feat.includes(item.feat.id)) return false
  if (active.tie.length && !item.ties.some(value => active.tie.includes(value))) return false

  if (!query.value) return true

  return [
    item.title,
    item.originalName,
    item.summary,
    item.tool,
    item.enoaLead,
    item.play,
    item.feat.title,
    item.feat.note,
    ...item.abilities,
    ...item.skills,
    ...item.ties,
    ...item.equipment.items,
    ...item.variants.flatMap(entry => [entry.title, entry.region, entry.text]),
    ...item.hooks.entries.map(entry => entry.text)
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('ru')
    .includes(query.value)
}))

const groups = computed(() => Object.entries(DND55E_BACKGROUND_GROUPS)
  .map(([group, meta]) => ({
    id: group,
    title: meta.title,
    code: meta.code,
    items: visibleBackgrounds.value
      .filter(item => item.group === group)
      .map(item => ({
        id: item.id,
        title: item.title,
        meta: [item.originalName, item.feat.title].filter(Boolean).join(' · '),
        raw: item
      }))
  }))
  .filter(group => group.items.length))

const filters = computed(() => [
  {
    key: 'group',
    label: 'Каталог',
    note: 'Механика одинакова: перекрашена только подача предыстории',
    options: Object.entries(DND55E_BACKGROUND_GROUPS).map(([value, meta]) => ({
      value,
      label: meta.label,
      title: meta.title
    }))
  },
  {
    key: 'ability',
    label: 'Характеристика',
    options: DND55E_BACKGROUND_ABILITIES.map(value => ({ value, label: value }))
  },
  {
    key: 'feat',
    label: 'Черта происхождения',
    options: DND55E_BACKGROUND_FEATS.map(item => ({ value: item.id, label: item.title }))
  },
  {
    key: 'tie',
    label: 'Связь в Эноа',
    options: DND55E_BACKGROUND_TIES.map(value => ({ value, label: value }))
  }
])

const activeCount = computed(() => (
  active.group.length + active.ability.length + active.feat.length + active.tie.length
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
  active.group = []
  active.ability = []
  active.feat = []
  active.tie = []
}

function featPath(item) {
  return `/dnd55e/feats?feat=${item.feat.id}`
}

useSeoMeta({
  title: 'Предыстории — D&D 5.5e 2024 — TKK.club',
  description: 'Предыстории Player’s Handbook 2024, адаптированные под мир Эноа: характеристики, черты происхождения, навыки, инструменты и стартовое снаряжение.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/predystorii.png"
    emblem-alt="Предыстории"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    title="Предыстории"
    crumb-current="Предыстории"
    lead="Предыстории Player’s Handbook 2024 в декорациях Эноа и несколько предысторий, выросших из самого мира."
    search-placeholder="Найти предысторию, черту, навык или связь"
    node-prefix="d55-bg"
    query-key="background"
    :groups="groups"
    :total="DND55E_BACKGROUNDS.length"
    :visible="visibleBackgrounds.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="2"
    :thread-web="true"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-dnd55e-backgrounds-bookmarks"
    empty-text="Ничего не найдено. Попробуйте другой запрос или сбросьте фильтры."
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #intro>
      <aside class="bg-edition-note">
        <span class="bg-edition-mark" aria-hidden="true">◈</span>
        <div>
          <b>Каркас предыстории 2024 одинаков для всех записей</b>
          <p>
            Мир Эноа меняет не механику, а подачу: кто вы были, чьи это были порядки и почему вы ушли.
            Материалы редакции 2014 года сюда не подмешиваются.
          </p>
          <dl class="bg-rules">
            <div v-for="rule in DND55E_BACKGROUND_RULES" :key="rule.title" class="bg-rule">
              <dt>{{ rule.title }}</dt>
              <dd>{{ rule.text }}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </template>

    <template #item="{ item }">
      <span class="bg-list-card">
        <span class="bg-list-icon" aria-hidden="true">
          {{ DND55E_BACKGROUND_GROUPS[item.raw.group].icon }}
        </span>
        <span class="bg-list-copy">
          <span class="bg-list-name">
            {{ item.raw.title }}
            <small>{{ item.raw.originalName }}</small>
          </span>
          <span class="bg-list-meta">{{ item.raw.abilities.join(' · ') }}</span>
        </span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.raw.sourceTitle">{{ item.raw.source }}</span>
        <span class="tref-pill">
          <span>Черта</span>
          <b>{{ item.raw.feat.title }}</b>
        </span>
        <span v-for="tie in item.raw.ties" :key="tie" class="tref-tag">{{ tie }}</span>
      </div>

      <header class="bg-heading">
        <span class="bg-heading-icon" aria-hidden="true">
          {{ DND55E_BACKGROUND_GROUPS[item.raw.group].icon }}
        </span>
        <span>
          <span class="bg-title">{{ item.raw.title }}</span>
          <span class="bg-original">{{ item.raw.originalName }}</span>
          <span class="bg-summary">{{ item.raw.summary }}</span>
        </span>
      </header>

      <dl class="tref-stats bg-stats">
        <div class="tref-stat">
          <dt>Характеристики</dt>
          <dd>{{ item.raw.abilities.join(', ') }}</dd>
        </div>
        <div class="tref-stat">
          <dt>Черта происхождения</dt>
          <dd>
            <NuxtLink :to="featPath(item.raw)">{{ item.raw.feat.title }}</NuxtLink>
            <template v-if="item.raw.feat.note"> ({{ item.raw.feat.note }})</template>
          </dd>
        </div>
        <div class="tref-stat">
          <dt>Навыки</dt>
          <dd>{{ item.raw.skills.join(', ') }}</dd>
        </div>
        <div class="tref-stat">
          <dt>Инструмент</dt>
          <dd>{{ item.raw.tool }}</dd>
        </div>
      </dl>

      <p class="bg-note">
        Распределите между тремя характеристиками +2 и +1 либо по +1 каждой.
      </p>

      <section class="bg-block">
        <h3>Снаряжение</h3>
        <div class="bg-equipment">
          <div class="bg-equip-option">
            <span class="bg-equip-label">Набор «А»</span>
            <ul>
              <li v-for="entry in item.raw.equipment.items" :key="entry">{{ entry }}</li>
            </ul>
          </div>
          <div class="bg-equip-option alt">
            <span class="bg-equip-label">Или</span>
            <p>{{ item.raw.equipment.gold }}</p>
          </div>
        </div>
      </section>

      <section class="bg-block">
        <h3>В мире Эноа</h3>
        <p class="bg-lead"><RuleRichText :text="item.raw.enoaLead" edition="2024" /></p>
        <article v-for="entry in item.raw.variants" :key="entry.title" class="bg-variant">
          <h4>
            {{ entry.title }}
            <small>{{ entry.region }}</small>
          </h4>
          <p><RuleRichText :text="entry.text" edition="2024" /></p>
        </article>
      </section>

      <section class="bg-block">
        <h3>{{ item.raw.hooks.label }}</h3>
        <table class="bg-table">
          <thead>
            <tr>
              <th scope="col">{{ item.raw.hooks.dice }}</th>
              <th scope="col">Событие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in item.raw.hooks.entries" :key="entry.roll">
              <td>{{ entry.roll }}</td>
              <td>{{ entry.text }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <aside class="bg-advice">
        <b>Как это играется</b>
        <p>{{ item.raw.play }}</p>
      </aside>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.bg-edition-note{
  display:flex;
  align-items:flex-start;
  gap:14px;
  max-width:860px;
  margin:24px 0 2px;
  border:1px solid rgba(var(--theme-accent-rgb),.22);
  border-radius:10px;
  background:linear-gradient(100deg,rgba(var(--theme-accent-rgb),.075),rgba(var(--theme-surface-rgb),.36));
  padding:15px 17px;
}
.bg-edition-mark{
  display:grid;
  width:25px;
  height:25px;
  flex:0 0 auto;
  place-items:center;
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-size:18px;
}
.bg-edition-note b{
  font-family:'Cormorant Garamond',serif;
  color:rgba(var(--theme-accent-strong-rgb),.94);
  font-size:18px;
  font-weight:600;
}
.bg-edition-note > div > p{
  margin:4px 0 0;
  color:rgba(var(--theme-text-rgb),.62);
  font-size:12px;
  line-height:1.6;
}
.bg-rules{
  display:grid;
  gap:7px;
  margin:12px 0 0;
  grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
}
.bg-rule{
  border-left:2px solid rgba(var(--theme-accent-rgb),.26);
  padding-left:10px;
}
.bg-rule dt{
  color:rgba(var(--theme-accent-strong-rgb),.86);
  font-size:11px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.bg-rule dd{
  margin:3px 0 0;
  color:rgba(var(--theme-text-rgb),.6);
  font-size:12px;
  line-height:1.55;
}
.bg-list-card{
  display:grid;
  grid-template-columns:38px minmax(0,1fr);
  align-items:center;
  gap:10px;
  min-width:0;
}
.bg-list-icon{
  display:grid;
  width:34px;
  height:34px;
  place-items:center;
  border:1px solid rgba(var(--theme-accent-rgb),.22);
  color:rgba(var(--theme-accent-strong-rgb),.78);
  font-family:'Cormorant Garamond',serif;
}
.bg-list-copy{display:flex;min-width:0;flex-direction:column;gap:3px}
.bg-list-name{
  overflow:hidden;
  color:rgba(var(--theme-heading-rgb),.92);
  font-weight:650;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.bg-list-name small{
  margin-left:5px;
  color:rgba(var(--theme-text-rgb),.44);
  font-size:10px;
  font-weight:450;
}
.bg-list-meta{
  overflow:hidden;
  color:rgba(var(--theme-text-rgb),.48);
  font-size:11px;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.bg-heading{
  display:grid;
  grid-template-columns:72px minmax(0,1fr);
  align-items:center;
  gap:18px;
  margin:2px 0 20px;
}
.bg-heading-icon{
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
.bg-title{
  display:block;
  color:rgba(var(--theme-heading-rgb),.96);
  font-family:'Cormorant Garamond',serif;
  font-size:30px;
  line-height:1;
}
.bg-original{
  display:block;
  margin-top:5px;
  color:rgba(var(--theme-accent-strong-rgb),.66);
  font-size:11px;
  letter-spacing:.15em;
  text-transform:uppercase;
}
.bg-summary{
  display:block;
  margin-top:9px;
  color:rgba(var(--theme-text-rgb),.72);
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  line-height:1.42;
}
.bg-stats{grid-template-columns:repeat(4,minmax(0,1fr))}
.bg-stats a{color:rgba(var(--theme-accent-strong-rgb),.92)}
.bg-note{
  margin:-6px 0 18px;
  color:rgba(var(--theme-text-rgb),.5);
  font-size:11px;
  letter-spacing:.02em;
}
.bg-block{margin-top:20px}
.bg-block h3{
  margin:0 0 9px;
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
}
.bg-equipment{
  display:grid;
  gap:10px;
  grid-template-columns:minmax(0,2fr) minmax(0,1fr);
}
.bg-equip-option{
  border:1px solid rgba(var(--theme-text-rgb),.1);
  border-radius:9px;
  background:rgba(var(--theme-accent-rgb),.04);
  padding:11px 14px;
}
.bg-equip-option.alt{
  display:flex;
  flex-direction:column;
  justify-content:center;
  background:none;
}
.bg-equip-label{
  display:block;
  margin-bottom:6px;
  color:rgba(var(--theme-accent-rgb),.72);
  font-size:9px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
}
.bg-equip-option ul{
  margin:0;
  padding-left:17px;
  color:rgba(var(--theme-text-rgb),.72);
  font-size:13px;
  line-height:1.7;
}
.bg-equip-option.alt p{
  margin:0;
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:24px;
}
.bg-lead{
  margin:0 0 12px;
  color:rgba(var(--theme-text-rgb),.72);
  font-size:13px;
  line-height:1.68;
}
.bg-variant{
  border-left:2px solid rgba(var(--theme-accent-rgb),.28);
  background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.055),transparent 72%);
  padding:10px 13px;
}
.bg-variant + .bg-variant{margin-top:8px}
.bg-variant h4{
  margin:0 0 4px;
  color:rgba(var(--theme-heading-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  font-weight:600;
}
.bg-variant h4 small{
  margin-left:7px;
  color:rgba(var(--theme-text-rgb),.44);
  font-size:10px;
  font-weight:450;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.bg-variant p{
  margin:0;
  color:rgba(var(--theme-text-rgb),.7);
  font-size:13px;
  line-height:1.66;
}
.bg-table{
  width:100%;
  border-collapse:collapse;
  font-size:13px;
}
.bg-table th,
.bg-table td{
  border-bottom:1px solid rgba(var(--theme-text-rgb),.08);
  padding:7px 10px;
  text-align:left;
  vertical-align:top;
}
.bg-table th{
  color:rgba(var(--theme-accent-rgb),.72);
  font-size:9px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
}
.bg-table td:first-child{
  width:44px;
  color:rgba(var(--theme-accent-strong-rgb),.88);
  font-weight:700;
}
.bg-table td{color:rgba(var(--theme-text-rgb),.72);line-height:1.6}
.bg-advice{
  margin-top:20px;
  border:1px solid rgba(var(--theme-accent-rgb),.2);
  border-radius:9px;
  background:rgba(var(--theme-accent-rgb),.05);
  padding:12px 15px;
}
.bg-advice b{
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  font-weight:600;
}
.bg-advice p{
  margin:4px 0 0;
  color:rgba(var(--theme-text-rgb),.68);
  font-size:13px;
  line-height:1.66;
}
@media (max-width:700px){
  .bg-edition-note{padding:13px}
  .bg-heading{grid-template-columns:56px minmax(0,1fr);gap:13px}
  .bg-heading-icon{width:48px;height:48px;font-size:22px}
  .bg-title{font-size:25px}
  .bg-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
  .bg-equipment{grid-template-columns:minmax(0,1fr)}
}
</style>
