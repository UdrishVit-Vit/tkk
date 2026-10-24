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
const FEATS_BY_ID = new Map(DND55E_FEATS.map(item => [item.id, item]))
const featCategory = item => FEAT_CATEGORY_TITLES.get(item.feat.id) || 'Черта происхождения'

// Глоссарий — единственный источник названий терминов: заголовки не дублируются в данных
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
  // Навыки уже выведены отдельной строкой, поэтому в «Нитях» они не дублируются:
  // предыстория вправе указать свой навык в glossary, чтобы подчеркнуть его роль.
  const shown = new Set(skillLinks(item).map(entry => entry.id))
  return item.glossary
    .filter(id => !shown.has(id))
    .map(id => ({ id, title: GLOSSARY_TITLES.get(id) }))
    .filter(entry => entry.title)
}

// enoaLead пишется строкой, а где текста много — массивом абзацев.
function leadParagraphs(item) {
  return Array.isArray(item.enoaLead) ? item.enoaLead : [item.enoaLead]
}

function toolPath(item) {
  const id = DND55E_TOOL_EQUIPMENT[item.tool.replace(' (на выбор)', '')]
  return id ? `/dnd55e/equipment?item=${id}` : null
}

const cardSections = [
  { id: 'stats', label: 'Параметры' }, { id: 'equipment', label: 'Снаряжение' },
  { id: 'feat', label: 'Черта' }, { id: 'story', label: 'История' },
  { id: 'event', label: 'Событие' }
]
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
    ...(Array.isArray(item.enoaLead) ? item.enoaLead : [item.enoaLead]),
    item.feat.title,
    item.feat.note,
    ...item.abilities,
    ...item.skills,
    ...item.ties,
    ...item.equipment.items.map(entry => entry.label),
    ...(item.equipment.storyItems || []),
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
    note: 'Адаптации PHB 2024 и авторские предыстории Эноа',
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
      <header class="bg-heading">
        <span class="bg-heading-icon" aria-hidden="true">
          {{ DND55E_BACKGROUND_GROUPS[item.raw.group].icon }}
        </span>
        <div>
          <h2 class="bg-title">{{ item.raw.title }}</h2>
          <span class="bg-original">{{ item.raw.originalName }}</span>
          <span class="bg-summary">{{ item.raw.summary }}</span>
        </div>
      </header>

      <CardSectionNav :prefix="'bg-' + item.id" :sections="cardSections" />
      <h3 :id="'bg-' + item.id + '-stats'" class="bg-section-title" tabindex="-1">Игровые параметры</h3>
      <dl class="tref-stats bg-stats">
        <div class="tref-stat">
          <dt>Характеристики</dt>
          <dd>
            <template v-for="(entry, index) in abilityLinks(item.raw)" :key="entry.id">
              <template v-if="index">, </template>
              <NuxtLink :to="glossaryPath(entry.id)">{{ entry.title }}</NuxtLink>
            </template>
            <span class="bg-stat-hint bg-ability-hint">+2 и +1 на две из них либо по +1 каждой; не выше 20</span>
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
            <span v-if="item.raw.toolDisplay" :title="`По правилам: ${item.raw.tool}`">{{ item.raw.toolDisplay }}</span>
            <NuxtLink v-else-if="toolPath(item.raw)" :to="toolPath(item.raw)">{{ item.raw.tool }}</NuxtLink>
            <template v-else>{{ item.raw.tool }}</template>
          </dd>
        </div>
      </dl>

      <section class="bg-block bg-loadout">
        <h3 :id="'bg-' + item.id + '-equipment'" tabindex="-1">Стартовое снаряжение</h3>
        <div class="bg-equipment">
          <p class="bg-equip-rule">Выберите А или Б — смешивать нельзя.</p>
          <div class="bg-equipment-choices">
          <p class="bg-equip-row">
            <span class="bg-equip-key">А</span>
            <span class="bg-equip-items">
              <strong class="bg-choice-title">Готовый комплект</strong>
              <template v-for="(entry, index) in item.raw.equipment.items" :key="entry.label">
                <template v-if="index">, </template>
                <NuxtLink v-if="entry.id && !entry.loreAdaptation" :to="equipmentPath(entry.id)">{{ entry.title }}</NuxtLink>
                <span v-else :title="entry.adaptationNote">{{ entry.title }}</span>
                <small v-if="entry.note"> ({{ entry.note }})</small>
              </template>
              <template v-if="item.raw.equipment.coins">
                <span class="bg-equip-coins"> и {{ item.raw.equipment.coins }}</span>
              </template>
            </span>
          </p>
          <p class="bg-equip-row">
            <span class="bg-equip-key">Б</span>
            <span class="bg-equip-items"><strong class="bg-choice-title">Деньги</strong><b>{{ item.raw.equipment.alt }}</b> вместо всего набора</span>
          </p>
          </div>
          <p class="bg-stat-hint bg-equip-note">Стоимость комплекта А с монетами — 50 зм. Владение инструментом сохраняется при любом выборе.</p>
          <p v-if="item.raw.equipment.storyItems?.length" class="bg-equip-extra">
            Детали для истории: {{ item.raw.equipment.storyItems.join(', ') }}.
            <small>Не входят в комплект за 50 зм. Наличие и стоимость согласуются с мастером; предмет, предоставленный чертой, получают по правилам этой черты.</small>
          </p>
        </div>
      </section>



      <section class="bg-block bg-feat-preview">
        <h3 :id="'bg-' + item.id + '-feat'" tabindex="-1">{{ featCategory(item.raw) }}</h3>
        <h4 class="bg-feat-name"><NuxtLink :to="featPath(item.raw)" target="_blank" rel="noopener" :aria-label="item.raw.feat.title + ' — открыть в новой вкладке'">{{ item.raw.feat.title }} <span aria-hidden="true">↗</span></NuxtLink></h4>
        <p v-if="item.raw.feat.note" class="bg-stat-hint">{{ item.raw.feat.note }}</p>
        <p v-if="FEATS_BY_ID.get(item.raw.feat.id)?.category !== 'origin'" class="bg-stat-hint">
          Авторское исключение: свободная черта вместо Origin. Для стандартной предыстории 2024 требуется согласование с мастером.
        </p>
        <OriginFeatEffects v-if="FEATS_BY_ID.get(item.raw.feat.id)" :feat="FEATS_BY_ID.get(item.raw.feat.id)" compact />
      </section>

      <section class="bg-block">
        <h3 :id="'bg-' + item.id + '-story'" tabindex="-1">История и связи</h3>
        <p v-for="(para, index) in leadParagraphs(item.raw)" :key="index" class="bg-lead">
          {{ para }}
        </p>
        <div class="bg-variants-heading"><h4>Варианты прошлого</h4><p>Выберите подходящий или придумайте свой.</p></div>
        <article v-for="entry in item.raw.variants" :key="entry.title" class="bg-variant">
          <h4>
            {{ entry.title }}
            <small>{{ entry.region }}</small>
          </h4>
          <p>{{ entry.text }}</p>
        </article>
      </section>

      <section class="bg-block">
        <h3 :id="'bg-' + item.id + '-event'" tabindex="-1">{{ item.raw.hooks.label }}</h3>
        <p class="bg-event-help">Выберите событие или бросьте {{ item.raw.hooks.dice }}.</p>
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



      <section v-if="ruleLinks(item.raw).length" class="bg-block bg-screen">
        <h3>Нити</h3>
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
:deep(.rule-body-wrap > .rule-body){overflow:clip}
.bg-heading{padding-top:28px}
[tabindex="-1"]{scroll-margin-top:110px}
.bg-section-title{margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.6)}
.bg-feat-preview{padding:24px 0 0;border:0;border-top:1px solid rgba(var(--theme-accent-rgb),.25);border-radius:0;background:none}
.bg-block.bg-feat-preview > h3{margin:0 0 8px;font-family:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.75)}
.bg-feat-name{margin:0 0 12px;font-family:'Cormorant Garamond',serif;font-size:27px;color:rgba(var(--theme-heading-rgb),.95)}
.bg-feat-name a{color:inherit;text-decoration:none}
.bg-feat-name a:hover{text-decoration:underline;text-underline-offset:5px}
.bg-feat-name a span{font-family:system-ui,sans-serif;font-size:16px;color:rgba(var(--theme-accent-strong-rgb),.6);vertical-align:middle}
.bg-feat-name a:focus-visible{outline:2px solid currentColor;outline-offset:4px}
.bg-choice-title{display:block;margin-bottom:5px;color:rgba(var(--theme-heading-rgb),.95)}
.bg-event-help{font-size:13px;color:rgba(var(--theme-text-rgb),.72);margin:0 0 12px}

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
  grid-template-columns:44px minmax(0,1fr);
  align-items:start;
  gap:16px;
  margin:2px 0 24px;
}
.bg-heading-icon{
  display:grid;
  width:40px;
  height:40px;
  place-items:center;
  border:0;
  background:none;
  color:rgba(var(--theme-accent-strong-rgb),.88);
  font-family:'Cormorant Garamond',serif;
  font-size:28px;
}
.bg-title{
  display:block;
  margin:0;
  color:rgba(var(--theme-heading-rgb),.96);
  font-family:'Cormorant Garamond',serif;
  font-size:34px;
  line-height:1.15;
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
/* Сетка зависит от ширины карточки, в том числе в боковой панели. */
.bg-stats{display:block;margin:0;border:0;border-radius:0;background:none;overflow:visible}
.bg-stats .tref-stat{display:grid;grid-template-columns:140px minmax(0,1fr);align-items:baseline;gap:8px 16px;padding:11px 0;border:0;border-bottom:1px solid rgba(var(--theme-text-rgb),.1);border-radius:0;background:none}
.bg-stats dt{font-size:13px;font-weight:450;letter-spacing:0;text-transform:none;color:rgba(var(--theme-text-rgb),.65)}
.bg-stats dd{overflow-wrap:anywhere;font-size:15px;line-height:1.55;font-weight:500}
.bg-ability-hint{display:block;max-width:46ch}
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
  color:rgba(var(--theme-text-rgb),.66);
  font-size:12px;
  font-weight:450;
  line-height:1.55;
}
.bg-block{margin-top:32px}
.bg-block h3{
  margin:0 0 9px;
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:600;
}
.bg-equipment{
  container-type:inline-size;
  border:0;
  border-radius:0;
  background:none;
  padding:0;
}
.bg-loadout{margin-top:18px}
.bg-loadout > h3{font-family:inherit;font-size:13px;font-weight:500;color:rgba(var(--theme-text-rgb),.7);margin-bottom:4px}
.bg-equipment-choices{display:grid;grid-template-columns:minmax(0,2fr) minmax(140px,1fr);gap:12px}
.bg-equipment-choices .bg-equip-row{height:100%;padding:14px;border:1px solid rgba(var(--theme-accent-rgb),.18);border-radius:6px;background:rgba(var(--theme-accent-rgb),.025);align-content:start;box-sizing:border-box}
.bg-equip-note{margin-top:10px}
@container (max-width:440px){.bg-equipment-choices{grid-template-columns:1fr}}
.bg-equip-rule{
  margin:0 0 9px;
  color:rgba(var(--theme-text-rgb),.5);
  font-size:12px;
  line-height:1.5;
}
/* Буква варианта остаётся видимой и доступной скринридеру. */
.bg-equip-row{
  display:grid;
  align-items:baseline;
  gap:10px;
  grid-template-columns:22px minmax(0,1fr);
  margin:0;
  padding:14px 0;
}
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
  display:block;
  margin-top:4px;
  color:rgba(var(--theme-text-rgb),.6);
  font-size:11px;
}
.bg-lead{
  margin:0 0 10px;
  color:rgba(var(--theme-text-rgb),.84);
  font-size:15px;
  line-height:1.8;
}
.bg-variant{
  border-left:0;
  border-top:1px solid rgba(var(--theme-text-rgb),.1);
  background:none;
  padding:14px 0;
}
.bg-variant + .bg-variant{margin-top:0}
.bg-variants-heading{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:baseline;margin-top:24px;margin-bottom:10px}
.bg-variants-heading h4{margin:0;font-size:14px;color:rgba(var(--theme-heading-rgb),.9)}
.bg-variants-heading p{margin:0;font-size:12px;color:rgba(var(--theme-text-rgb),.6)}
.bg-variant h4{
  display:flex;
  flex-wrap:wrap;
  gap:4px 12px;
  justify-content:space-between;
  align-items:baseline;
  margin:0 0 4px;
  color:rgba(var(--theme-heading-rgb),.9);
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  font-weight:600;
}
.bg-variant h4 small{
  margin-left:0;
  color:rgba(var(--theme-text-rgb),.44);
  font-size:10px;
  font-weight:450;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.bg-variant p{
  margin:0;
  color:rgba(var(--theme-text-rgb),.7);
  font-size:14px;
  line-height:1.75;
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
  .bg-heading{grid-template-columns:32px minmax(0,1fr);gap:12px}
  .bg-heading-icon{width:30px;height:34px;font-size:22px}
  .bg-title{font-size:29px}
}
@media (max-width:440px){.bg-stats .tref-stat{grid-template-columns:1fr;gap:4px}}
.bg-stats a:focus-visible,.bg-equip-items a:focus-visible,.bg-screen-link:focus-visible{outline:2px solid rgba(var(--theme-accent-strong-rgb),.9);outline-offset:4px;border-radius:2px}
</style>
