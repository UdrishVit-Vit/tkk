<script setup>
import bestiaryData from '~/data/dnd55e/bestiary2024.json'

const CREATURES = bestiaryData.creatures

const CR_GROUPS = [...new Set(CREATURES.map(creature => creature.cr))].map(value => ({
  id: value === '—' ? 'variable' : `cr-${value.replace('/', '-')}`,
  value,
  title: `Уровень опасности ${value}`
}))

const TYPE_LABELS = {
  giant: 'Великан',
  aberration: 'Аберрация', beast: 'Зверь', celestial: 'Небожитель', construct: 'Конструкт',
  dragon: 'Дракон', elemental: 'Элементаль', fey: 'Фея', fiend: 'Исчадие', humanoid: 'Гуманоид',
  monstrosity: 'Монстр', ooze: 'Слизь', plant: 'Растение', undead: 'Нежить'
}

const ABILITY_LABELS = { str: 'Сил', dex: 'Лов', con: 'Тел', int: 'Инт', wis: 'Мдр', cha: 'Хар' }
const BLOCKS = [
  ['traits', 'Умения'],
  ['actions', 'Действия'],
  ['bonusActions', 'Бонусные действия'],
  ['reactions', 'Реакции'],
  ['legendaryActions', 'Легендарные действия']
]

const STAT_ROWS = [
  ['savingThrows', 'Спасброски'],
  ['skills', 'Навыки'],
  ['damageResistances', 'Сопротивления урону'],
  ['damageImmunities', 'Иммунитеты к урону'],
  ['conditionImmunities', 'Иммунитеты к состояниям'],
  ['senses', 'Чувства'],
  ['languages', 'Языки']
]

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ cr: [], type: [], source: [], size: [] })
const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

const visibleCreatures = computed(() => CREATURES.filter((creature) => {
  if (active.cr.length && !active.cr.includes(creature.cr)) return false
  if (active.type.length && !active.type.some(type => creature.types.includes(type))) return false
  if (active.source.length && !active.source.includes(creature.source)) return false
  if (active.size.length && !active.size.some(size => creature.sizes.includes(size))) return false
  if (!query.value) return true

  return [
    creature.title,
    creature.englishName,
    creature.source,
    creature.sourceTitle,
    creature.typeLabel,
    creature.cr,
    creature.sizes.join(' '),
    ...creature.traits.flatMap(trait => [trait.name, trait.englishName, trait.text]),
    ...creature.actions.flatMap(action => [action.name, action.englishName, action.text]),
    ...creature.bonusActions.flatMap(action => [action.name, action.englishName, action.text]),
    ...creature.reactions.flatMap(reaction => [reaction.name, reaction.englishName, reaction.text]),
    ...creature.legendaryActions.flatMap(action => [action.name, action.englishName, action.text])
  ].filter(Boolean).join(' ').toLocaleLowerCase('ru').includes(query.value)
}))

const groups = computed(() => CR_GROUPS.map(group => ({
  id: group.id,
  title: group.title,
  code: `${visibleCreatures.value.filter(creature => creature.cr === group.value).length} СУЩЕСТВ`,
  items: visibleCreatures.value
    .filter(creature => creature.cr === group.value)
    .map(creature => ({
      id: creature.id,
      title: creature.title,
      meta: creature.englishName,
      badge: creature.source,
      badgeTitle: creature.sourceTitle,
      raw: creature
    }))
})).filter(group => group.items.length))

const usedTypes = [...new Set(CREATURES.flatMap(creature => creature.types))]
const usedSizes = [...new Set(CREATURES.flatMap(creature => creature.sizes))]

const filters = computed(() => [
  {
    key: 'cr',
    label: 'Уровень опасности',
    options: CR_GROUPS.map(group => ({ value: group.value, label: group.value === '—' ? 'Не применяется' : group.value }))
  },
  {
    key: 'type',
    label: 'Тип существа',
    options: usedTypes.map(value => ({ value, label: TYPE_LABELS[value] || value }))
  },
  {
    key: 'source',
    label: 'Источник',
    options: Object.entries(bestiaryData.sources).map(([value, label]) => ({ value, label: `${value} · ${label}` }))
  },
  {
    key: 'size',
    label: 'Размер',
    options: usedSizes.map(value => ({ value, label: value }))
  }
])

const activeCount = computed(() => Object.values(active).reduce((sum, values) => sum + values.length, 0))
const isActive = (key, value) => active[key]?.includes(value)

function toggleFilter(key, value) {
  const values = active[key]
  const index = values.indexOf(value)
  if (index >= 0) values.splice(index, 1)
  else values.push(value)
}

function resetFilters() {
  Object.keys(active).forEach((key) => { active[key] = [] })
}

function shownStatRows(creature) {
  return STAT_ROWS.filter(([key]) => creature[key] && creature[key] !== '—')
}

function referenceMarkdown(reference) {
  return reference ? `[${reference.label}](${reference.path})` : ''
}

useSeoMeta({
  title: 'Бестиарий — D&D 5.5e 2024 — TKK.club',
  description: 'Бестиарий D&D 2024: русские и английские названия существ, источники, уровень опасности, типы, характеристики, умения и действия.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/bestiariy.png"
    emblem-alt="Бестиарий"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    title="Бестиарий"
    crumb-current="Бестиарий"
    search-placeholder="Найти существо, тип или способность"
    node-prefix="d55-creature"
    query-key="creature"
    :groups="groups"
    :total="CREATURES.length"
    :visible="visibleCreatures.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="2"
    :thread-web="true"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-dnd55e-bestiary-bookmarks"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >

    <template #item="{ item }">
      <span class="creature-list-card">
        <span class="creature-list-copy">
          <span class="creature-list-name">{{ item.raw.title }}</span>
          <span class="creature-list-original">{{ item.raw.englishName }}</span>
        </span>
        <span class="creature-list-type">{{ item.raw.typeLabel }}</span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.raw.sourceTitle">{{ item.raw.source }}</span>
        <span class="tref-pill"><span>Уровень опасности</span><b>{{ item.raw.cr }}</b></span>
        <span class="tref-tag">{{ item.raw.typeLabel }}</span>
        <span class="tref-tag">{{ item.raw.sizes.join(' или ') }}</span>
      </div>

      <header class="creature-heading">
        <span class="creature-title">{{ item.raw.title }}</span>
        <span class="creature-original">{{ item.raw.englishName }}</span>
        <span class="creature-subtitle">{{ item.raw.sizes.join(' или ') }} {{ item.raw.typeLabel.toLocaleLowerCase('ru') }}</span>
      </header>

      <dl class="tref-stats creature-source-stats">
        <div class="tref-stat"><dt>Источник</dt><dd>{{ item.raw.sourceTitle }}</dd></div>
        <div class="tref-stat"><dt>Страница</dt><dd>{{ item.raw.sourcePage || '—' }}</dd></div>
        <div class="tref-stat"><dt>УО</dt><dd>{{ item.raw.cr }}</dd></div>
        <div class="tref-stat"><dt>Бонус мастерства</dt><dd>{{ item.raw.proficiencyBonus }}</dd></div>
      </dl>

      <div class="creature-combat-stats">
        <div><span>Класс доспеха</span><b>{{ item.raw.armorClass }}</b></div>
        <div><span>Хиты</span><b>{{ item.raw.hitPoints }}</b></div>
        <div><span>Скорость</span><b>{{ item.raw.speed }}</b></div>
      </div>

      <div class="tref-abilities creature-abilities">
        <div v-for="(label, key) in ABILITY_LABELS" :key="key" class="tref-ability">
          <span>{{ label }}</span>
          <b>{{ item.raw.stats[key] }}</b>
        </div>
      </div>

      <dl v-if="shownStatRows(item.raw).length" class="creature-detail-rows">
        <div v-for="[key, label] in shownStatRows(item.raw)" :key="key">
          <dt>{{ label }}</dt>
          <dd><RuleRichText :text="item.raw[key]" edition="2024" /></dd>
        </div>
      </dl>

      <section v-if="item.raw.reference" class="creature-reference">
        <h3>Связанное правило</h3>
        <p><RuleRichText :text="referenceMarkdown(item.raw.reference)" edition="2024" /></p>
      </section>

      <template v-for="[key, title] in BLOCKS" :key="key">
        <section v-if="item.raw[key]?.length" class="creature-rules">
          <h3>{{ title }}</h3>
          <article v-for="ability in item.raw[key]" :key="ability.englishName" class="creature-rule">
            <h4>
              <span>{{ ability.name }}</span>
              <small>{{ ability.englishName }}</small>
            </h4>
            <p><RuleRichText :text="ability.text" edition="2024" /></p>
          </article>
        </section>
      </template>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.creature-list-card{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-width:0}
.creature-list-copy{display:flex;min-width:0;flex-direction:column;gap:2px;text-align:left}
.creature-list-name,.creature-list-original,.creature-list-type{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.creature-list-name{color:rgba(var(--theme-heading-rgb),.94);font-size:13px;font-weight:700}
.creature-list-original{color:rgba(var(--theme-text-rgb),.47);font-size:10px;letter-spacing:.02em}
.creature-list-type{flex:0 1 auto;color:rgba(var(--theme-text-rgb),.44);font-size:10px;text-align:right}
.creature-heading{display:flex;flex-direction:column;gap:3px;margin:15px 0 19px}
.creature-title{font:700 29px/1.08 Georgia,serif;color:var(--theme-heading)}
.creature-original{font:600 13px/1.35 Georgia,serif;color:rgba(var(--theme-accent-rgb),.76)}
.creature-subtitle{margin-top:4px;color:rgba(var(--theme-text-rgb),.6);font-size:12px}
.creature-source-stats{grid-template-columns:repeat(4,minmax(0,1fr))}
.creature-combat-stats{display:grid;grid-template-columns:1fr 1fr 1.45fr;margin:16px 0;border:1px solid rgba(var(--theme-text-rgb),.11);border-radius:9px;overflow:hidden}
.creature-combat-stats>div{display:flex;flex-direction:column;gap:5px;padding:12px 14px;border-left:1px solid rgba(var(--theme-text-rgb),.08)}
.creature-combat-stats>div:first-child{border-left:0}
.creature-combat-stats span{font-size:9px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.46)}
.creature-combat-stats b{font-size:13px;line-height:1.45;color:rgba(var(--theme-heading-rgb),.9)}
.creature-abilities{margin:16px 0}
.creature-detail-rows{margin:16px 0;padding:5px 15px;border:1px solid rgba(var(--theme-text-rgb),.09);border-radius:9px;background:rgba(var(--theme-surface-rgb),.18)}
.creature-detail-rows>div{display:grid;grid-template-columns:165px 1fr;gap:14px;padding:8px 0;border-top:1px solid rgba(var(--theme-text-rgb),.07)}
.creature-detail-rows>div:first-child{border-top:0}
.creature-detail-rows dt{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.68)}
.creature-detail-rows dd{margin:0;font-size:13px;line-height:1.5;color:rgba(var(--theme-text-rgb),.76)}
.creature-reference,.creature-rules{margin-top:18px;padding:14px 16px;border:1px solid rgba(var(--theme-text-rgb),.09);border-radius:9px;background:rgba(var(--theme-contrast-rgb),.012)}
.creature-reference{border-color:rgba(var(--theme-accent-rgb),.2);background:rgba(var(--theme-accent-rgb),.045)}
.creature-reference h3,.creature-rules>h3{margin:0 0 11px;font-size:10px;font-weight:850;letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.78)}
.creature-reference p{margin:0;font-size:14px}
.creature-rule{padding:11px 0;border-top:1px solid rgba(var(--theme-text-rgb),.07)}
.creature-rule:first-of-type{padding-top:0;border-top:0}
.creature-rule:last-child{padding-bottom:0}
.creature-rule h4{display:flex;flex-wrap:wrap;align-items:baseline;gap:7px;margin:0 0 5px;font-size:14px;color:rgba(var(--theme-heading-rgb),.93)}
.creature-rule h4 small{font-size:10px;font-weight:500;color:rgba(var(--theme-text-rgb),.43)}
.creature-rule p{margin:0;font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.55;color:rgba(var(--theme-text-rgb),.8)}
@media(max-width:760px){.creature-source-stats{grid-template-columns:1fr 1fr}.creature-combat-stats{grid-template-columns:1fr}.creature-combat-stats>div{border-top:1px solid rgba(var(--theme-text-rgb),.08);border-left:0}.creature-combat-stats>div:first-child{border-top:0}.creature-detail-rows>div{grid-template-columns:1fr;gap:4px}.creature-list-type{display:none}}
</style>
