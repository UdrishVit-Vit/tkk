<script setup>
import { DND55E_SECTIONS, dnd55eSection } from '~/data/dnd55e/sections.js'
import { DND55E_CLASSES, DND55E_SPECIES } from '~/data/dnd55e/catalogues.js'

const props = defineProps({
  sectionId: { type: String, required: true }
})

const section = computed(() => dnd55eSection(props.sectionId))

if (!section.value) {
  throw createError({ statusCode: 404, statusMessage: 'Раздел D&D 5.5e не найден' })
}

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ edition: [], family: [], source: [] })

const SECTION_ICONS = {
  classes: '/assets/nodes/klassy.png',
  species: '/assets/nodes/rasy.png',
  feats: '/assets/nodes/cherty.png',
  backgrounds: '/assets/nodes/predystorii.png',
  spells: '/assets/nodes/zaklinaniya.png',
  equipment: '/assets/nodes/snaryazhenie.png',
  'magic-items': '/assets/nodes/magicheskie.png',
  omens: '/assets/nodes/znameniya.png',
  wrath: '/assets/nodes/gnev.png',
  tea: '/assets/nodes/chay.png',
  bestiary: '/assets/nodes/bestiariy.png',
  glossary: '/assets/nodes/shirma.png'
}

const CLASS_FAMILIES = {
  core: {
    title: 'Классы игрока',
    code: 'PHB · 2024',
    label: 'Классы 2024'
  },
  enoa: {
    title: 'Авторские классы Эноа',
    code: 'ENOА · 2024',
    label: 'Авторские'
  },
  adaptation: {
    title: 'Дополнительные классы',
    code: 'ОТДЕЛЬНАЯ РЕДАКЦИЯ',
    label: 'Дополнительные'
  }
}

const catalogueItems = computed(() => {
  if (section.value.id === 'classes') {
    return DND55E_CLASSES.map(item => ({
      ...item,
      meta: `${item.originalName} · ${item.role}`,
      badge: item.family === 'core' ? '2024' : item.source.split(' · ')[0],
      badgeTitle: item.source,
      raw: item
    }))
  }

  if (section.value.id === 'species') {
    return DND55E_SPECIES.map(item => ({
      ...item,
      meta: [item.originalName, item.sourceTitle].filter(Boolean).join(' · '),
      badge: item.source,
      badgeTitle: item.sourceTitle,
      raw: item
    }))
  }

  return []
})

const filters = computed(() => {
  const result = [{
    key: 'edition',
    label: 'Редакция',
    note: 'Каталог не смешивается с механическими материалами 2014 года',
    options: [{ value: '2024', label: '2024', title: 'D&D 5.5e, редакция 2024 года' }]
  }]

  if (section.value.id === 'classes') {
    result.push({
      key: 'family',
      label: 'Каталог',
      options: Object.entries(CLASS_FAMILIES).map(([value, item]) => ({
        value,
        label: item.label
      }))
    })
  }

  if (section.value.id === 'species') {
    const sources = [...new Map(DND55E_SPECIES.map(item => [
      item.source,
      { value: item.source, label: item.source, title: item.sourceTitle }
    ])).values()]
    result.push({ key: 'source', label: 'Источник нити', options: sources })
  }

  return result
})

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))
const visibleItems = computed(() => catalogueItems.value.filter(item => {
  if (active.edition.length && !active.edition.includes('2024')) return false
  if (active.family.length && !active.family.includes(item.family)) return false
  if (active.source.length && !active.source.includes(item.source)) return false

  if (!query.value) return true
  return [
    item.title,
    item.originalName,
    item.meta,
    item.description,
    item.source,
    item.sourceTitle,
    item.role,
    item.primary
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('ru')
    .includes(query.value)
}))

const groups = computed(() => {
  if (section.value.id === 'classes') {
    return Object.entries(CLASS_FAMILIES)
      .map(([family, group]) => ({
        id: family,
        title: group.title,
        code: group.code,
        items: visibleItems.value.filter(item => item.family === family)
      }))
      .filter(group => group.items.length)
  }

  if (section.value.id === 'species' && visibleItems.value.length) {
    return [{
      id: 'enoa-species',
      title: 'Народы Эноа',
      code: 'ВИДЫ · D&D 5.5e',
      items: visibleItems.value
    }]
  }

  return []
})

const activeCount = computed(() => (
  active.edition.length + active.family.length + active.source.length
))

const hasCatalogue = computed(() => catalogueItems.value.length > 0)
const isActive = (key, value) => active[key]?.includes(value)

function toggleFilter(key, value) {
  const values = active[key]
  if (!values) return
  const index = values.indexOf(value)
  if (index >= 0) values.splice(index, 1)
  else values.push(value)
}

function resetFilters() {
  active.edition = []
  active.family = []
  active.source = []
}

const siblingSections = computed(() => Object.entries(DND55E_SECTIONS)
  .filter(([id]) => id !== section.value.id)
  .map(([id, item]) => ({ id, ...item })))

useHead(() => ({
  title: `${section.value.title} — D&D 5.5e — TKK.club`,
  meta: [{
    name: 'description',
    content: `${section.value.description} Отдельный раздел правил D&D 5.5e 2024 года.`
  }]
}))
</script>

<template>
  <ThreadRefPage
    :emblem-img="SECTION_ICONS[section.id]"
    :emblem-alt="section.title"
    system-path="/dnd55e"
    system-label="D&D 5.5e"
    kicker="D&D 5.5e · редакция 2024"
    :title="section.title"
    :crumb-current="section.title"
    :lead="section.description"
    :search-placeholder="`Найти материал в разделе «${section.title}»`"
    :node-prefix="`d55-${section.id}`"
    :query-key="section.id"
    :groups="groups"
    :total="catalogueItems.length"
    :visible="visibleItems.length"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :columns="hasCatalogue ? 2 : 1"
    :thread-web="hasCatalogue"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    :bookmark-store="`tkk-dnd55e-${section.id}-bookmarks`"
    :empty-text="hasCatalogue
      ? 'Ничего не найдено. Попробуйте другой запрос или сбросьте фильтры.'
      : 'Материалы этого раздела ещё не перенесены в отдельную редакцию D&D 5.5e.'"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #intro>
      <aside class="d55-edition-note" :class="{ populated: hasCatalogue }">
        <span class="d55-edition-mark" aria-hidden="true" />
        <div>
          <b>{{ hasCatalogue ? 'Наполнение D&D 5.5e подключено' : 'Самостоятельная система правил' }}</b>
          <p v-if="section.id === 'classes'">
            В каталоге собраны классы игрока редакции 2024 года и авторские классы Эноа.
            Дополнительные материалы вынесены в отдельную группу, чтобы не смешивать их с PHB 2024.
          </p>
          <p v-else-if="section.id === 'species'">
            Народы Эноа сохранены вместе с их наследием, названиями, портретами и авторскими источниками.
            В D&D 5.5e они представлены как виды; механические формулировки редакции 2014 сюда не подмешиваются.
          </p>
          <p v-else>
            D&D 5.5e использует отдельные данные, источники и терминологию редакции 2024 года.
            Совместимость с D&D 5e 2014 не подразумевается и будет отмечаться явно.
          </p>
        </div>
      </aside>
    </template>

    <template #item="{ item }">
      <span class="d55-list-card" :class="{ species: section.id === 'species' }">
        <span class="d55-list-visual">
          <img
            :src="item.image || item.portrait"
            :alt="item.title"
            width="54"
            height="54"
            loading="lazy"
          >
        </span>
        <span class="d55-list-copy">
          <span class="d55-list-name">
            {{ item.title }}
            <small v-if="item.originalName">{{ item.originalName }}</small>
          </span>
          <span class="d55-list-meta">{{ item.role || item.sourceTitle }}</span>
        </span>
      </span>
    </template>

    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-source" :title="item.sourceTitle || item.source">{{ item.source }}</span>
        <span class="tref-pill"><span>Редакция</span><b>2024</b></span>
        <span class="tref-tag">{{ section.id === 'species' ? 'Вид' : item.role }}</span>
      </div>

      <header class="d55-card-heading">
        <span class="d55-card-emblem">
          <img :src="item.image || item.portrait" :alt="item.title" width="112" height="112">
        </span>
        <span>
          <span class="d55-card-title">{{ item.title }}</span>
          <span v-if="item.originalName" class="d55-card-original">{{ item.originalName }}</span>
          <span class="d55-card-lead">{{ item.description }}</span>
        </span>
      </header>

      <dl v-if="section.id === 'classes'" class="tref-stats d55-stats">
        <div class="tref-stat"><dt>Кость хитов</dt><dd>{{ item.hitDie }}</dd></div>
        <div class="tref-stat"><dt>Основная характеристика</dt><dd>{{ item.primary }}</dd></div>
        <div class="tref-stat"><dt>Спасброски</dt><dd>{{ item.saves }}</dd></div>
        <div class="tref-stat"><dt>Категория</dt><dd>{{ CLASS_FAMILIES[item.family]?.label }}</dd></div>
      </dl>

      <dl v-else class="tref-stats d55-stats d55-species-stats">
        <div class="tref-stat"><dt>Система</dt><dd>D&D 5.5e</dd></div>
        <div class="tref-stat"><dt>Термин</dt><dd>Вид</dd></div>
        <div class="tref-stat"><dt>Источник нити</dt><dd>{{ item.source }}</dd></div>
        <div class="tref-stat"><dt>Наследие</dt><dd>Мир Эноа</dd></div>
      </dl>

      <section class="tref-block">
        <h3 class="tref-block-title">
          {{ section.id === 'classes' ? 'Место в каталоге 2024' : 'Наследие вида' }}
        </h3>
        <p v-if="section.id === 'classes'" class="d55-body-copy">
          Карточка относится к самостоятельному пространству D&D 5.5e. Таблицы развития,
          особенности уровней и подклассы здесь будут храниться только в редакции 2024 года.
          Материалы D&D 5e 2014 остаются в своём разделе и не подменяют эту карточку.
        </p>
        <p v-else class="d55-body-copy">
          История, культура и образ народа перенесены в каталог видов без потери авторского
          источника. Игровые особенности будут оформляться терминами D&D 5.5e отдельно от
          старой карточки расы.
        </p>
      </section>

      <section class="d55-related">
        <h3 class="tref-block-title">Другие разделы D&D 5.5e</h3>
        <div class="d55-related-links">
          <NuxtLink v-for="link in siblingSections" :key="link.id" :to="link.path">{{ link.title }}</NuxtLink>
        </div>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.d55-edition-note{
  display:flex;
  align-items:flex-start;
  gap:16px;
  max-width:780px;
  margin:24px 0 2px;
  border:1px solid rgba(var(--theme-accent-rgb),.22);
  border-radius:10px;
  background:linear-gradient(100deg,rgba(var(--theme-accent-rgb),.075),rgba(var(--theme-surface-rgb),.36));
  padding:15px 17px;
}
.d55-edition-note.populated{
  box-shadow:inset 0 0 28px rgba(var(--theme-accent-rgb),.025);
}
.d55-edition-mark{
  width:11px;
  height:11px;
  flex:0 0 auto;
  margin-top:5px;
  border:1px solid rgba(var(--theme-accent-rgb),.92);
  box-shadow:0 0 10px rgba(var(--theme-accent-rgb),.35);
  transform:rotate(45deg);
}
.d55-edition-note b{
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  font-weight:600;
  color:rgba(var(--theme-accent-strong-rgb),.92);
}
.d55-edition-note p{
  margin:4px 0 0;
  font-size:12px;
  line-height:1.55;
  color:rgba(var(--theme-text-rgb),.58);
}
.d55-list-card{
  display:grid;
  grid-template-columns:50px minmax(0,1fr);
  align-items:center;
  gap:11px;
  flex:1 1 auto;
  min-width:0;
}
.d55-list-visual{
  display:grid;
  width:42px;
  height:42px;
  place-items:center;
  overflow:hidden;
  border-right:1px solid rgba(var(--theme-text-rgb),.1);
  padding-right:8px;
}
.d55-list-visual img{
  width:36px;
  height:36px;
  object-fit:contain;
  filter:sepia(.24) saturate(.8) brightness(1.08);
}
.d55-list-card.species .d55-list-visual img{
  width:40px;
  height:40px;
  border-radius:50%;
  object-fit:cover;
  object-position:top center;
  filter:saturate(.74) sepia(.12) brightness(.88);
}
.d55-list-copy{display:flex;min-width:0;flex-direction:column;gap:3px}
.d55-list-name{
  overflow:hidden;
  color:rgba(var(--theme-heading-rgb),.9);
  font-weight:650;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.d55-list-name small{
  margin-left:5px;
  color:rgba(var(--theme-text-rgb),.47);
  font-size:11px;
  font-weight:450;
}
.d55-list-meta{
  overflow:hidden;
  color:rgba(var(--theme-text-rgb),.48);
  font-size:11px;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.d55-card-heading{
  display:grid;
  grid-template-columns:92px minmax(0,1fr);
  align-items:center;
  gap:18px;
  margin:0 0 20px;
}
.d55-card-emblem{
  display:grid;
  width:90px;
  height:90px;
  place-items:center;
  overflow:hidden;
  border:1px solid rgba(var(--theme-accent-rgb),.18);
  background:radial-gradient(circle,rgba(var(--theme-accent-rgb),.075),transparent 72%);
  transform:rotate(45deg);
}
.d55-card-emblem img{
  width:78px;
  height:78px;
  object-fit:contain;
  filter:sepia(.2) saturate(.84) brightness(1.08);
  transform:rotate(-45deg);
}
.d55-card-emblem img[src*="/portraits/"]{
  width:90px;
  height:90px;
  object-fit:cover;
  object-position:top center;
  filter:saturate(.75) sepia(.12) brightness(.84);
}
.d55-card-title{
  display:block;
  font-family:'Cormorant Garamond',serif;
  font-size:30px;
  line-height:1;
  color:rgba(var(--theme-heading-rgb),.96);
}
.d55-card-original{
  display:block;
  margin-top:4px;
  color:rgba(var(--theme-accent-strong-rgb),.68);
  font-size:11px;
  letter-spacing:.16em;
  text-transform:uppercase;
}
.d55-card-lead{
  display:block;
  margin-top:10px;
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  line-height:1.45;
  color:rgba(var(--theme-text-rgb),.78);
}
.d55-stats{grid-template-columns:repeat(4,minmax(0,1fr))}
.d55-body-copy{
  margin:0;
  max-width:850px;
  color:rgba(var(--theme-text-rgb),.7);
  font-size:13px;
  line-height:1.7;
}
.d55-related{margin-top:20px;border-top:1px solid rgba(var(--theme-text-rgb),.09);padding-top:17px}
.d55-related-links{display:flex;flex-wrap:wrap;gap:7px}
.d55-related-links a{
  border:1px solid rgba(var(--theme-text-rgb),.11);
  border-radius:999px;
  padding:6px 11px;
  color:rgba(var(--theme-text-rgb),.58);
  font-size:11px;
  text-decoration:none;
}
.d55-related-links a:hover{border-color:rgba(var(--theme-accent-rgb),.38);color:rgba(var(--theme-accent-strong-rgb),.9)}
@media (max-width:700px){
  .d55-edition-note{padding:13px}
  .d55-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
  .d55-card-heading{grid-template-columns:70px minmax(0,1fr);gap:13px}
  .d55-card-emblem{width:66px;height:66px}
  .d55-card-emblem img{width:57px;height:57px}
  .d55-card-emblem img[src*="/portraits/"]{width:66px;height:66px}
  .d55-card-title{font-size:25px}
}
</style>
