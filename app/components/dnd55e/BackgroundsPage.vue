<script setup>
import {
  DND55E_ABILITY_GLOSSARY,
  DND55E_BACKGROUNDS,
  DND55E_BACKGROUND_ABILITIES,
  DND55E_BACKGROUND_FEATS,
  DND55E_BACKGROUND_GROUPS,
  DND55E_BACKGROUND_TIES,
  DND55E_SKILL_GLOSSARY,
  DND55E_TOOL_EQUIPMENT
} from '~/data/dnd55e/backgrounds.js'
import { DND55E_GLOSSARY } from '~/data/dnd55e/glossary.js'
import { DND55E_FEATS } from '~/data/dnd55e/feats.js'

// Подпись ячейки берётся из категории самой черты: у «Безымянного» она свободная,
// а не черта происхождения, и ячейка не должна утверждать обратное.
const FEAT_CATEGORY_TITLES = new Map(DND55E_FEATS.map(item => [item.id, item.categoryTitle]))
const featCategory = item => FEAT_CATEGORY_TITLES.get(item.feat.id) || 'Черта происхождения'

// Ширма — единственный источник названий терминов: заголовки не дублируются в данных
// предысторий, поэтому переименование правила не оставляет здесь мёртвой строки.
const GLOSSARY_TITLES = new Map(DND55E_GLOSSARY.map(item => [item.id, item.title]))

const glossaryPath = id => `/dnd55e/glossary?rule=${id}`
const equipmentPath = id => `/dnd55e/equipment?item=${id}`

function abilityLinks(item) {
  return item.abilities
    .map(ability => ({ id: DND55E_ABILITY_GLOSSARY[ability], title: ability }))
    .filter(entry => entry.id)
}

function skillLinks(item) {
  return item.skills
    .map(skill => ({ id: DND55E_SKILL_GLOSSARY[skill], title: skill }))
    .filter(entry => entry.id)
}

function ruleLinks(item) {
  // Навыки уже выведены отдельной строкой, поэтому в «Ширме» они не дублируются:
  // предыстория вправе указать свой навык в glossary, чтобы подчеркнуть его роль.
  const shown = new Set(skillLinks(item).map(entry => entry.id))
  return item.glossary
    .filter(id => !shown.has(id))
    .map(id => ({ id, title: GLOSSARY_TITLES.get(id) }))
    .filter(entry => entry.title)
}

function toolPath(item) {
  const id = DND55E_TOOL_EQUIPMENT[item.tool.replace(' (на выбор)', '')]
  return id ? `/dnd55e/equipment?item=${id}` : null
}

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
    ...item.equipment.items.map(entry => entry.label),
    ...(item.equipment.extra || []),
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
          <dd>
            <template v-for="(entry, index) in abilityLinks(item.raw)" :key="entry.id">
              <template v-if="index">, </template>
              <NuxtLink :to="glossaryPath(entry.id)">{{ entry.title }}</NuxtLink>
            </template>
          </dd>
          <p class="bg-stat-hint">+2 и +1 на две из них либо по +1 каждой</p>
        </div>
        <div class="tref-stat">
          <dt>{{ featCategory(item.raw) }}</dt>
          <dd>
            <NuxtLink :to="featPath(item.raw)">{{ item.raw.feat.title }}</NuxtLink>
            <template v-if="item.raw.feat.note"> ({{ item.raw.feat.note }})</template>
          </dd>
        </div>
        <div class="tref-stat">
          <dt>Навыки</dt>
          <dd>
            <template v-for="(entry, index) in skillLinks(item.raw)" :key="entry.id">
              <template v-if="index">, </template>
              <NuxtLink :to="glossaryPath(entry.id)">{{ entry.title }}</NuxtLink>
            </template>
          </dd>
        </div>
        <div class="tref-stat">
          <dt>Инструмент</dt>
          <dd>
            <NuxtLink v-if="toolPath(item.raw)" :to="toolPath(item.raw)">{{ item.raw.tool }}</NuxtLink>
            <template v-else>{{ item.raw.tool }}</template>
          </dd>
        </div>
      </dl>

      <section class="bg-block">
        <h3>Стартовое снаряжение</h3>
        <div class="bg-equipment">
          <p class="bg-equip-rule">Выберите А или Б — смешивать нельзя.</p>
          <p class="bg-equip-row">
            <span class="bg-equip-key" aria-hidden="true">А</span>
            <span class="bg-equip-items">
              <template v-for="(entry, index) in item.raw.equipment.items" :key="entry.label">
                <template v-if="index">, </template>
                <NuxtLink v-if="entry.id" :to="equipmentPath(entry.id)">{{ entry.title }}</NuxtLink>
                <span v-else>{{ entry.title }}</span>
                <small v-if="entry.note"> ({{ entry.note }})</small>
              </template>
              <template v-if="item.raw.equipment.coins">
                <span class="bg-equip-coins"> и {{ item.raw.equipment.coins }}</span>
              </template>
            </span>
          </p>
          <p class="bg-equip-row">
            <span class="bg-equip-key" aria-hidden="true">Б</span>
            <span class="bg-equip-items"><b>{{ item.raw.equipment.alt }}</b> вместо всего набора</span>
          </p>
          <p v-if="item.raw.equipment.extra" class="bg-equip-extra">
            При вас также: {{ item.raw.equipment.extra.join(', ').toLocaleLowerCase('ru') }}
            <small>— вещи без игровой стоимости</small>
          </p>
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
        <p><RuleRichText :text="item.raw.play" edition="2024" /></p>
      </aside>

      <section v-if="ruleLinks(item.raw).length" class="bg-block bg-screen">
        <h3>Ширма</h3>
        <p class="bg-screen-hint">Правила редакции 2024, которые стоит открыть до первой сессии за этого персонажа.</p>
        <div class="bg-screen-links">
          <NuxtLink
            v-for="entry in [...skillLinks(item.raw), ...ruleLinks(item.raw)]"
            :key="entry.id"
            :to="glossaryPath(entry.id)"
            class="bg-screen-link"
          >{{ entry.title }}</NuxtLink>
          <NuxtLink :to="featPath(item.raw)" class="bg-screen-link feat">{{ item.raw.feat.title }}</NuxtLink>
          <NuxtLink v-if="toolPath(item.raw)" :to="toolPath(item.raw)" class="bg-screen-link tool">{{ item.raw.tool }}</NuxtLink>
        </div>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
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
/* Четыре колонки на широкой карточке, две на узкой. Промежуточных раскладок нет
   намеренно: при трёх колонках четвёртая ячейка уходит на вторую строку одна.
   «Проницательность» в четверть узкой карточки не помещается и раньше обрезалась. */
.bg-stats{grid-template-columns:repeat(4,minmax(0,1fr))}
.bg-stats dd{overflow-wrap:break-word}
@media (max-width:1200px){
  .bg-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
}
/* Ссылка внутри карточки должна читаться как ссылка: пунктир, который
   становится сплошным при наведении. Иначе значение неотличимо от текста. */
.bg-stats a,
.bg-equip-items a{
  color:rgba(var(--theme-accent-strong-rgb),.92);
  border-bottom:1px dotted rgba(var(--theme-accent-rgb),.55);
  text-decoration:none;
  transition:border-color .18s ease,color .18s ease;
}
.bg-stats a:hover,
.bg-equip-items a:hover{
  border-bottom-color:rgba(var(--theme-accent-strong-rgb),.9);
  border-bottom-style:solid;
  color:rgba(var(--theme-accent-strong-rgb),1);
}
.bg-stat-hint{
  margin:5px 0 0;
  color:rgba(var(--theme-text-rgb),.42);
  font-size:10px;
  font-weight:450;
  line-height:1.4;
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
  border:1px solid rgba(var(--theme-text-rgb),.1);
  border-radius:9px;
  background:rgba(var(--theme-accent-rgb),.04);
  padding:12px 15px;
}
.bg-equip-rule{
  margin:0 0 9px;
  color:rgba(var(--theme-text-rgb),.5);
  font-size:12px;
  line-height:1.5;
}
/* Строка варианта: буква слева, перечисление справа — как в книге. */
.bg-equip-row{
  display:grid;
  align-items:baseline;
  gap:10px;
  grid-template-columns:22px minmax(0,1fr);
  margin:0;
  padding:7px 0;
}
.bg-equip-row + .bg-equip-row{border-top:1px solid rgba(var(--theme-text-rgb),.07)}
.bg-equip-key{
  display:grid;
  width:22px;
  height:22px;
  place-items:center;
  border:1px solid rgba(var(--theme-accent-rgb),.3);
  border-radius:50%;
  color:rgba(var(--theme-accent-strong-rgb),.85);
  font-size:11px;
  font-weight:700;
}
.bg-equip-items{
  color:rgba(var(--theme-text-rgb),.75);
  font-size:13px;
  line-height:1.72;
}
.bg-equip-items small{
  color:rgba(var(--theme-text-rgb),.45);
  font-size:11px;
}
.bg-equip-items b{
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-weight:650;
}
.bg-equip-coins{
  color:rgba(var(--theme-accent-strong-rgb),.88);
  font-weight:650;
  white-space:nowrap;
}
.bg-equip-extra{
  margin:8px 0 0;
  border-top:1px dashed rgba(var(--theme-text-rgb),.1);
  padding-top:8px;
  color:rgba(var(--theme-text-rgb),.55);
  font-size:12px;
  line-height:1.5;
}
.bg-equip-extra small{
  color:rgba(var(--theme-text-rgb),.36);
  font-size:11px;
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
.bg-screen-hint{
  margin:0 0 9px;
  color:rgba(var(--theme-text-rgb),.5);
  font-size:12px;
  line-height:1.55;
}
.bg-screen-links{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}
.bg-screen-link{
  border:1px solid rgba(var(--theme-accent-rgb),.24);
  border-radius:999px;
  background:rgba(var(--theme-accent-rgb),.05);
  padding:5px 12px;
  color:rgba(var(--theme-accent-strong-rgb),.86);
  font-size:12px;
  text-decoration:none;
  transition:background .18s ease,border-color .18s ease;
}
.bg-screen-link:hover{
  border-color:rgba(var(--theme-accent-rgb),.5);
  background:rgba(var(--theme-accent-rgb),.12);
}
.bg-screen-link.feat::before,
.bg-screen-link.tool::before{
  margin-right:6px;
  color:rgba(var(--theme-accent-rgb),.6);
  font-size:10px;
}
.bg-screen-link.feat::before{content:'✦'}
.bg-screen-link.tool::before{content:'⚒'}
@media (max-width:700px){
  .bg-heading{grid-template-columns:56px minmax(0,1fr);gap:13px}
  .bg-heading-icon{width:48px;height:48px;font-size:22px}
  .bg-title{font-size:25px}
  .bg-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
}
</style>
