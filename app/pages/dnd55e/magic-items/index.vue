<script setup>
const { data: magicItemsData, error: magicItemsError } = await useFetch('/data/dnd55e/magic-items-2024.json', {
  key: 'dnd55e-magic-items-2024',
  server: false,
  default: () => ({ items: [] })
})

const MAGIC_ITEMS = computed(() => magicItemsData.value?.items || [])

const RARITIES = {
  varies: 'Редкость варьируется',
  common: 'Обычные',
  uncommon: 'Необычные',
  rare: 'Редкие',
  'very-rare': 'Очень редкие',
  legendary: 'Легендарные',
  artifact: 'Артефакты',
  unknown: 'Редкость не определена'
}

const RARITY_SINGULAR = {
  varies: 'Редкость варьируется',
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  'very-rare': 'Очень редкий',
  legendary: 'Легендарный',
  artifact: 'Артефакт',
  unknown: 'Редкость не определена'
}

const TYPE_LABELS = {
  armor: 'Доспех',
  weapon: 'Оружие',
  potion: 'Зелье',
  ring: 'Кольцо',
  rod: 'Жезл',
  staff: 'Посох',
  wand: 'Волшебная палочка',
  scroll: 'Свиток',
  wondrous: 'Чудесный предмет',
  other: 'Другой предмет'
}

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ rarity: [], type: [], source: [], attunement: [] })

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))

const visibleItems = computed(() => MAGIC_ITEMS.value.filter((item) => {
  if (active.rarity.length && !active.rarity.includes(item.rarity)) return false
  if (active.type.length && !active.type.includes(item.type)) return false
  if (active.source.length && !active.source.includes(item.source)) return false
  if (active.attunement.length) {
    const state = item.attunement ? 'yes' : 'no'
    if (!active.attunement.includes(state)) return false
  }
  if (!query.value) return true

  return [
    item.title,
    item.englishName,
    item.source,
    item.sourceTitle,
    item.subtitle,
    item.summary,
    RARITY_SINGULAR[item.rarity],
    TYPE_LABELS[item.type]
  ].filter(Boolean).join(' ').toLocaleLowerCase('ru').includes(query.value)
}))

const groups = computed(() => Object.entries(RARITIES).map(([id, title]) => ({
  id,
  title,
  code: `${visibleItems.value.filter(item => item.rarity === id).length} ПРЕДМЕТОВ`,
  items: visibleItems.value
    .filter(item => item.rarity === id)
    .map(item => ({
      id: item.id,
      title: item.title,
      meta: item.englishName,
      badge: item.source,
      badgeTitle: item.sourceTitle,
      raw: item
    }))
})).filter(group => group.items.length))

const usedTypes = computed(() => [...new Set(MAGIC_ITEMS.value.map(item => item.type))])
const usedSources = computed(() => [...new Map(MAGIC_ITEMS.value.map(item => [item.source, item.sourceTitle])).entries()])

const filters = computed(() => [
  {
    key: 'rarity',
    label: 'Редкость',
    options: Object.entries(RARITIES).map(([value, label]) => ({ value, label }))
  },
  {
    key: 'type',
    label: 'Тип предмета',
    options: usedTypes.value.map(value => ({ value, label: TYPE_LABELS[value] || value }))
  },
  {
    key: 'source',
    label: 'Источник',
    options: usedSources.value.map(([value, title]) => ({ value, label: value, title }))
  },
  {
    key: 'attunement',
    label: 'Настройка',
    options: [
      { value: 'yes', label: 'Требуется' },
      { value: 'no', label: 'Не требуется' }
    ]
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

useSeoMeta({
  title: 'Магические предметы — D&D 5.5e — TKK.club',
  description: 'Каталог магических предметов D&D 2024: русские и английские названия, источник, редкость, настройка и подробные правила.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/magicheskie.png"
    emblem-alt="Магические предметы"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    title="Магические предметы"
    crumb-current="Магические предметы"
    lead="Сокровища, оружие, доспехи и чудесные предметы по правилам редакции 2024 года."
    search-placeholder="Найти предмет, эффект или английское название"
    node-prefix="d55-magic-item"
    query-key="item"
    :groups="groups"
    :total="MAGIC_ITEMS.length"
    :visible="visibleItems.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="2"
    :thread-web="true"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-dnd55e-magic-items-bookmarks"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #intro>
      <aside class="magic-items-note">
        <span class="magic-items-note-mark" aria-hidden="true">✦</span>
        <div>
          <b>{{ magicItemsError ? 'Каталог временно недоступен' : 'Полный каталог D&D 2024' }}</b>
          <p>
            <template v-if="magicItemsError">Не удалось загрузить данные. Обновите страницу и попробуйте ещё раз.</template>
            <template v-else>
              В списке показаны только название предмета, оригинальное английское название и книга-источник.
              Нажмите на предмет, чтобы открыть его тип, редкость, настройку и полное описание игровых свойств.
            </template>
          </p>
        </div>
      </aside>
    </template>

    <template #item="{ item }">
      <span class="magic-item-list-card">
        <span class="magic-item-list-copy">
          <span class="magic-item-list-name">{{ item.raw.title }}</span>
          <span class="magic-item-list-original">{{ item.raw.englishName }}</span>
        </span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.raw.sourceTitle">{{ item.raw.source }}</span>
        <span class="tref-pill"><span>Редкость</span><b>{{ RARITY_SINGULAR[item.raw.rarity] }}</b></span>
        <span class="tref-tag">{{ TYPE_LABELS[item.raw.type] || item.raw.typeLabel }}</span>
        <span v-if="item.raw.attunement" class="tref-tag">Требует настройки</span>
      </div>

      <header class="magic-item-heading">
        <span>
          <span class="magic-item-title">{{ item.raw.title }}</span>
          <span class="magic-item-original">{{ item.raw.englishName }}</span>
          <span class="magic-item-subtitle">{{ item.raw.subtitle }}</span>
        </span>
      </header>

      <dl class="tref-stats magic-item-stats">
        <div class="tref-stat"><dt>Источник</dt><dd>{{ item.raw.sourceTitle }}</dd></div>
        <div class="tref-stat"><dt>Страница</dt><dd>{{ item.raw.sourcePage || '—' }}</dd></div>
        <div class="tref-stat"><dt>Редкость</dt><dd>{{ RARITY_SINGULAR[item.raw.rarity] }}</dd></div>
        <div class="tref-stat"><dt>Настройка</dt><dd>{{ item.raw.attunement ? 'Требуется' : 'Не требуется' }}</dd></div>
      </dl>

      <section class="magic-item-rules">
        <h3>Свойства предмета</h3>
        <template v-for="(block, blockIndex) in item.raw.description" :key="blockIndex">
          <p v-if="block.type === 'paragraph'">
            <RuleRichText :text="block.text" edition="2024" />
          </p>
          <ul v-else-if="block.type === 'list'" class="magic-item-list">
            <li v-for="(listItem, listIndex) in block.items" :key="listIndex">
              <RuleRichText :text="listItem" edition="2024" />
            </li>
          </ul>
          <div v-else-if="block.type === 'table'" class="magic-item-table-wrap">
            <table>
              <caption v-if="block.caption">{{ block.caption }}</caption>
              <thead v-if="block.columns.length">
                <tr><th v-for="column in block.columns" :key="column">{{ column }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    <RuleRichText :text="cell" edition="2024" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.magic-items-note{display:flex;align-items:flex-start;gap:14px;max-width:820px;margin:24px 0 20px;padding:15px 17px;border:1px solid rgba(var(--theme-accent-rgb),.24);border-radius:10px;background:linear-gradient(100deg,rgba(var(--theme-accent-rgb),.08),rgba(var(--theme-surface-rgb),.32));color:rgba(var(--theme-text-rgb),.78)}
.magic-items-note-mark{display:grid;place-items:center;width:34px;height:34px;flex:0 0 auto;border:1px solid rgba(var(--theme-accent-rgb),.34);border-radius:50%;color:var(--theme-accent-strong)}
.magic-items-note b{color:var(--theme-heading)}
.magic-items-note p{margin:5px 0 0;font-size:12px;line-height:1.55}
.magic-item-list-card{display:flex;align-items:center;gap:10px;width:100%;min-width:0}
.magic-item-list-copy{display:flex;min-width:0;flex-direction:column;gap:2px;text-align:left}
.magic-item-list-name,.magic-item-list-original{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.magic-item-list-name{color:rgba(var(--theme-heading-rgb),.94);font-size:13px;font-weight:700}
.magic-item-list-original{color:rgba(var(--theme-text-rgb),.47);font-size:10px;letter-spacing:.02em}
.magic-item-heading{margin:14px 0 19px}
.magic-item-title,.magic-item-original,.magic-item-subtitle{display:block}
.magic-item-title{font:700 27px/1.1 Georgia,serif;color:var(--theme-heading)}
.magic-item-original{margin-top:4px;color:rgba(var(--theme-accent-strong-rgb),.72);font-size:13px}
.magic-item-subtitle{margin-top:9px;color:rgba(var(--theme-text-rgb),.7);font-size:13px;line-height:1.45}
.magic-item-stats{grid-template-columns:repeat(4,minmax(0,1fr))}
.magic-item-rules{margin-top:15px;padding:16px 17px;border:1px solid rgba(var(--theme-accent-rgb),.14);border-radius:9px;background:rgba(var(--theme-surface-rgb),.22)}
.magic-item-rules>h3{margin:0 0 11px;color:var(--theme-accent-strong);font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.magic-item-rules p{margin:0;color:rgba(var(--theme-text-rgb),.78);font-size:13px;line-height:1.65}
.magic-item-rules p+p{margin-top:10px}
.magic-item-list{display:grid;gap:7px;margin:10px 0;padding-left:19px;color:rgba(var(--theme-text-rgb),.78);font-size:13px;line-height:1.58}
.magic-item-list li::marker{color:rgba(var(--theme-accent-rgb),.72)}
.magic-item-table-wrap{max-width:100%;margin:14px 0;overflow:auto;border:1px solid rgba(var(--theme-accent-rgb),.13);border-radius:8px}
.magic-item-table-wrap table{width:100%;border-collapse:collapse;font-size:12px}
.magic-item-table-wrap caption{padding:10px 12px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.14);color:var(--theme-heading);font-weight:750;text-align:left}
.magic-item-table-wrap th,.magic-item-table-wrap td{padding:9px 10px;border-bottom:1px solid rgba(var(--theme-accent-rgb),.09);text-align:left;vertical-align:top}
.magic-item-table-wrap th{background:rgba(var(--theme-accent-rgb),.055);color:rgba(var(--theme-accent-strong-rgb),.82);font-size:10px;letter-spacing:.05em;text-transform:uppercase}
.magic-item-table-wrap td{min-width:88px;color:rgba(var(--theme-text-rgb),.76);line-height:1.5}
.magic-item-table-wrap tr:last-child td{border-bottom:0}
@media (max-width:760px){.magic-item-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.magic-item-title{font-size:23px}}
</style>
