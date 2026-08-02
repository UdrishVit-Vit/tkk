<script setup>
import {
  DND55E_SPELLS,
  DND55E_SPELL_CLASSES,
  DND55E_SPELL_SCHOOLS
} from '~/data/dnd55e/spells.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ level: [], school: [], class: [], concentration: [], ritual: [], component: [] })

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

const visibleSpells = computed(() => DND55E_SPELLS.filter((spell) => {
  if (active.level.length && !active.level.includes(String(spell.level))) return false
  if (active.school.length && !active.school.includes(spell.school)) return false
  if (active.class.length && !spell.classes.some(value => active.class.includes(value))) return false
  if (active.concentration.length) {
    const value = spell.concentration ? 'yes' : 'no'
    if (!active.concentration.includes(value)) return false
  }
  if (active.ritual.length) {
    const value = spell.ritual ? 'yes' : 'no'
    if (!active.ritual.includes(value)) return false
  }
  if (active.component.length && !active.component.every(value => spell.components.includes(value))) return false

  if (!query.value) return true
  return [
    spell.title,
    spell.originalName,
    DND55E_SPELL_SCHOOLS[spell.school]?.title,
    spell.castingTime,
    spell.range,
    spell.duration,
    spell.material,
    spell.summary,
    spell.description,
    spell.upgrade,
    ...spell.classes,
    ...spell.tags
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('ru')
    .includes(query.value)
}))

const LEVEL_GROUPS = [
  { level: 0, id: 'cantrips', title: 'Заговоры', code: '0 УРОВЕНЬ · PHB 2024' },
  { level: 1, id: 'level-1', title: 'Уровень 1', code: '1 УРОВЕНЬ · PHB 2024' },
  { level: 2, id: 'level-2', title: 'Уровень 2', code: '2 УРОВЕНЬ · PHB 2024' },
  { level: 3, id: 'level-3', title: 'Уровень 3', code: '3 УРОВЕНЬ · PHB 2024' },
  { level: 4, id: 'level-4', title: 'Уровень 4', code: '4 УРОВЕНЬ · PHB 2024' },
  { level: 5, id: 'level-5', title: 'Уровень 5', code: '5 УРОВЕНЬ · PHB 2024' },
  { level: 6, id: 'level-6', title: 'Уровень 6', code: '6 УРОВЕНЬ · PHB 2024' },
  { level: 7, id: 'level-7', title: 'Уровень 7', code: '7 УРОВЕНЬ · PHB 2024' },
  { level: 8, id: 'level-8', title: 'Уровень 8', code: '8 УРОВЕНЬ · PHB 2024' },
  { level: 9, id: 'level-9', title: 'Уровень 9', code: '9 УРОВЕНЬ · PHB 2024' }
]

const groups = computed(() => LEVEL_GROUPS
  .map(group => ({
    ...group,
    items: visibleSpells.value
      .filter(spell => spell.level === group.level)
      .map(spell => ({
        id: spell.id,
        title: spell.title,
        meta: `${spell.originalName} · ${DND55E_SPELL_SCHOOLS[spell.school].title}`,
        raw: spell
      }))
  }))
  .filter(group => group.items.length))

const filters = computed(() => [
  {
    key: 'level',
    label: 'Уровень',
    options: [
      { value: '0', label: 'Заговоры' },
      { value: '1', label: '1-й уровень' },
      { value: '2', label: '2-й уровень' },
      { value: '3', label: '3-й уровень' },
      { value: '4', label: '4-й уровень' },
      { value: '5', label: '5-й уровень' },
      { value: '6', label: '6-й уровень' },
      { value: '7', label: '7-й уровень' },
      { value: '8', label: '8-й уровень' },
      { value: '9', label: '9-й уровень' }
    ]
  },
  {
    key: 'school',
    label: 'Школа магии',
    options: Object.entries(DND55E_SPELL_SCHOOLS).map(([value, school]) => ({
      value,
      label: school.title
    }))
  },
  {
    key: 'class',
    label: 'Список класса',
    options: DND55E_SPELL_CLASSES.map(value => ({ value, label: value }))
  },
  {
    key: 'concentration',
    label: 'Концентрация',
    options: [
      { value: 'yes', label: 'Требуется' },
      { value: 'no', label: 'Не требуется' }
    ]
  },
  {
    key: 'ritual',
    label: 'Ритуал',
    options: [
      { value: 'yes', label: 'Можно ритуалом' },
      { value: 'no', label: 'Не ритуальное' }
    ]
  },
  {
    key: 'component',
    label: 'Компоненты',
    note: 'При выборе нескольких компонентов показываются заклинания, содержащие их все',
    options: [
      { value: 'В', label: 'Вербальный' },
      { value: 'С', label: 'Соматический' },
      { value: 'М', label: 'Материальный' }
    ]
  }
])

const activeCount = computed(() => (
  active.level.length + active.school.length + active.class.length + active.concentration.length
  + active.ritual.length + active.component.length
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
  active.level = []
  active.school = []
  active.class = []
  active.concentration = []
  active.ritual = []
  active.component = []
}

const COMPONENT_TITLES = {
  В: 'Вербальный',
  С: 'Соматический',
  М: 'Материальный'
}

useSeoMeta({
  title: 'Заклинания — D&D 5.5e 2024 — TKK.club',
  description: 'Заговоры и заклинания 1–9-го уровней из Player’s Handbook 2024: школы, компоненты, классы и полные игровые эффекты.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/zaklinaniya.png"
    emblem-alt="Заклинания"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    title="Заклинания"
    crumb-current="Заклинания"
    lead="Заговоры и заклинания 1–9-го уровней по правилам Player’s Handbook 2024 с актуальными эффектами, компонентами и списками классов."
    search-placeholder="Найти заклинание, эффект, класс или компонент"
    node-prefix="d55-spell"
    query-key="spell"
    :groups="groups"
    :total="DND55E_SPELLS.length"
    :visible="visibleSpells.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="3"
    :thread-web="true"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-dnd55e-spells-bookmarks"
    empty-text="Ничего не найдено. Попробуйте другой запрос или сбросьте фильтры."
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #intro>
      <aside class="spell-edition-note">
        <span class="spell-edition-mark" aria-hidden="true">◐</span>
        <div>
          <b>Заклинания приведены к редакции 2024 года</b>
          <p>
            Каталог не копирует версии 2014 года: кары накладываются после попадания, лечение усилено,
            а «Усыпление», «Прыжок» и другие заклинания используют новые механики.
          </p>
        </div>
      </aside>
    </template>

    <template #item="{ item }">
      <span class="spell-list-card">
        <span class="spell-list-icon" aria-hidden="true">
          <img
            :src="DND55E_SPELL_SCHOOLS[item.raw.school].icon"
            :alt="DND55E_SPELL_SCHOOLS[item.raw.school].title"
            width="38"
            height="38"
            loading="lazy"
          >
        </span>
        <span class="spell-list-copy">
          <span class="spell-list-name">
            {{ item.raw.title }}
            <small>{{ item.raw.originalName }}</small>
          </span>
          <span class="spell-list-meta">
            {{ item.raw.level === 0 ? 'Заговор' : `${item.raw.level}-й уровень` }} · {{ DND55E_SPELL_SCHOOLS[item.raw.school].title }}
            <template v-if="item.raw.concentration"> · Концентрация</template>
            <template v-if="item.raw.ritual"> · Ритуал</template>
          </span>
        </span>
        <span class="spell-components" aria-label="Компоненты заклинания">
          <span v-for="component in ['В', 'С', 'М']" :key="component" :class="{ muted: !item.raw.components.includes(component) }">
            {{ item.raw.components.includes(component) ? component : '·' }}
          </span>
        </span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.raw.sourceTitle">{{ item.raw.source }}</span>
        <span class="tref-pill"><span>Уровень</span><b>{{ item.raw.level === 0 ? 'Заговор' : `${item.raw.level}-й` }}</b></span>
        <span class="tref-tag">{{ DND55E_SPELL_SCHOOLS[item.raw.school].title }}</span>
        <span v-if="item.raw.concentration" class="tref-tag">Концентрация</span>
        <span v-if="item.raw.ritual" class="tref-tag">Ритуал</span>
      </div>

      <header class="spell-heading">
        <span class="spell-heading-icon" aria-hidden="true">
          <img
            :src="DND55E_SPELL_SCHOOLS[item.raw.school].icon"
            :alt="DND55E_SPELL_SCHOOLS[item.raw.school].title"
            width="68"
            height="68"
          >
        </span>
        <span>
          <span class="spell-title">{{ item.raw.title }}</span>
          <span class="spell-original">{{ item.raw.originalName }}</span>
          <span class="spell-summary">{{ item.raw.summary }}</span>
        </span>
      </header>

      <dl class="tref-stats spell-stats">
        <div class="tref-stat"><dt>Время накладывания</dt><dd>{{ item.raw.castingTime }}</dd></div>
        <div class="tref-stat"><dt>Дистанция</dt><dd>{{ item.raw.range }}</dd></div>
        <div class="tref-stat">
          <dt>Компоненты</dt>
          <dd>
            <span v-for="(component, index) in item.raw.components" :key="component" :title="COMPONENT_TITLES[component]">
              {{ index ? ', ' : '' }}{{ component }}
            </span>
            <small v-if="item.raw.material"> ({{ item.raw.material }})</small>
          </dd>
        </div>
        <div class="tref-stat"><dt>Длительность</dt><dd>{{ item.raw.duration }}</dd></div>
      </dl>

      <section class="spell-rules">
        <article class="spell-rule">
          <h3>Эффект</h3>
          <p><RuleRichText :text="item.raw.description" edition="2024" /></p>
        </article>
        <article v-if="item.raw.upgrade" class="spell-rule upgrade">
          <h3>{{ item.raw.level === 0 ? 'Улучшение заговора' : 'Ячейка высокого уровня' }}</h3>
          <p><RuleRichText :text="item.raw.upgrade" edition="2024" /></p>
        </article>
      </section>

      <section class="spell-classes">
        <h3>Списки заклинаний</h3>
        <span v-for="className in item.raw.classes" :key="className">{{ className }}</span>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.spell-edition-note{
  display:flex;
  align-items:flex-start;
  gap:14px;
  max-width:800px;
  margin:24px 0 2px;
  border:1px solid rgba(var(--theme-accent-rgb),.22);
  border-radius:10px;
  background:linear-gradient(100deg,rgba(var(--theme-accent-rgb),.075),rgba(var(--theme-surface-rgb),.36));
  padding:15px 17px;
}
.spell-edition-mark{
  display:grid;
  width:25px;
  height:25px;
  flex:0 0 auto;
  place-items:center;
  color:rgba(var(--theme-accent-strong-rgb),.9);
  font-size:18px;
}
.spell-edition-note b{font-family:'Cormorant Garamond',serif;color:rgba(var(--theme-accent-strong-rgb),.94);font-size:18px;font-weight:600}
.spell-edition-note p{margin:4px 0 0;color:rgba(var(--theme-text-rgb),.62);font-size:12px;line-height:1.6}
.spell-list-card{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:9px;min-width:0;width:100%}
.spell-list-icon{display:grid;width:38px;height:38px;place-items:center;border-right:1px solid rgba(var(--theme-text-rgb),.1);padding-right:7px}
.spell-list-icon img{width:31px;height:31px;object-fit:contain;filter:sepia(.25) saturate(.75) brightness(1.08)}
.spell-list-copy{display:flex;min-width:0;flex-direction:column;gap:3px}
.spell-list-name{overflow:hidden;color:rgba(var(--theme-heading-rgb),.92);font-weight:650;text-overflow:ellipsis;white-space:nowrap}
.spell-list-name small{margin-left:4px;color:rgba(var(--theme-text-rgb),.43);font-size:9px;font-weight:450}
.spell-list-meta{overflow:hidden;color:rgba(var(--theme-text-rgb),.48);font-size:10px;text-overflow:ellipsis;white-space:nowrap}
.spell-components{display:flex;gap:3px;color:rgba(var(--theme-accent-strong-rgb),.72);font-size:10px;font-weight:700}
.spell-components span{display:grid;width:17px;height:17px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.19);border-radius:50%}
.spell-components span.muted{border-color:transparent;color:rgba(var(--theme-text-rgb),.22)}
.spell-heading{display:grid;grid-template-columns:78px minmax(0,1fr);align-items:center;gap:18px;margin:2px 0 20px}
.spell-heading-icon{display:grid;width:68px;height:68px;place-items:center;border:1px solid rgba(var(--theme-accent-rgb),.23);background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.1),transparent 70%)}
.spell-heading-icon img{width:55px;height:55px;object-fit:contain;filter:sepia(.2) saturate(.8) brightness(1.08)}
.spell-title{display:block;color:rgba(var(--theme-heading-rgb),.96);font-family:'Cormorant Garamond',serif;font-size:30px;line-height:1}
.spell-original{display:block;margin-top:5px;color:rgba(var(--theme-accent-strong-rgb),.66);font-size:11px;letter-spacing:.15em;text-transform:uppercase}
.spell-summary{display:block;margin-top:9px;color:rgba(var(--theme-text-rgb),.72);font-family:'Cormorant Garamond',serif;font-size:18px;line-height:1.42}
.spell-stats{grid-template-columns:repeat(4,minmax(0,1fr))}
.spell-stats small{color:rgba(var(--theme-text-rgb),.58);font-size:10px}
.spell-rules{display:grid;gap:10px;margin-top:18px}
.spell-rule{border-left:2px solid rgba(var(--theme-accent-rgb),.28);background:linear-gradient(90deg,rgba(var(--theme-accent-rgb),.055),transparent 72%);padding:11px 14px}
.spell-rule.upgrade{border-left-color:rgba(var(--theme-accent-strong-rgb),.45)}
.spell-rule h3,.spell-classes h3{margin:0 0 5px;color:rgba(var(--theme-accent-strong-rgb),.9);font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600}
.spell-rule p{margin:0;color:rgba(var(--theme-text-rgb),.73);font-size:13px;line-height:1.68}
.spell-classes{display:flex;align-items:center;flex-wrap:wrap;gap:7px;margin-top:17px;border-top:1px solid rgba(var(--theme-text-rgb),.09);padding-top:14px}
.spell-classes h3{width:100%;margin-bottom:1px}
.spell-classes span{border:1px solid rgba(var(--theme-accent-rgb),.18);border-radius:999px;background:rgba(var(--theme-accent-rgb),.045);padding:4px 9px;color:rgba(var(--theme-text-rgb),.68);font-size:11px}
@media (max-width:700px){
  .spell-edition-note{padding:13px}
  .spell-list-card{grid-template-columns:36px minmax(0,1fr)}
  .spell-components{display:none}
  .spell-heading{grid-template-columns:56px minmax(0,1fr);gap:13px}
  .spell-heading-icon{width:49px;height:49px}
  .spell-heading-icon img{width:40px;height:40px}
  .spell-title{font-size:25px}
  .spell-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
}
</style>
