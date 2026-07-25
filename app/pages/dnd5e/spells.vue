<script setup>
import { SPELLS_5E, SPELL_SOURCES, SPELL_LEVELS, SPELL_SCHOOLS, SPELL_TITLES_EN, SPELL_META, DAMAGE_TYPES, SAVES } from '~/data/spells5e.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({
  level: [], source: [], school: [], ritual: [], concentration: [],
  damage: [], healing: [], save: [], cast: [], range: [], duration: [], comp: []
})

function sourceName(id) { return SPELL_SOURCES[id] || id }
const SOURCE_LABELS = {
  PHB: 'PHB',
  XGE: 'XGE · Занатар',
  TCE: 'TCE · Таша',
  TU: 'TU · Авторские'
}
const SOURCE_ORDER = ['PHB', 'XGE', 'TCE', 'TU']
function sourceFilterLabel(id) { return SOURCE_LABELS[id] || id }
function schoolName(s) { return SPELL_SCHOOLS[s] || s }
function titleEn(sp) { return SPELL_TITLES_EN[sp.id] || '' }

const SCHOOL_ICONS = {
  abjuration: '/assets/spells/schools/abjuration.png',
  conjuration: '/assets/spells/schools/conjuration.png',
  divination: '/assets/spells/schools/divination.png',
  enchantment: '/assets/spells/schools/enchantment.png',
  evocation: '/assets/spells/schools/evocation.png',
  illusion: '/assets/spells/schools/illusion.png',
  necromancy: '/assets/spells/schools/necromancy.png',
  transmutation: '/assets/spells/schools/transmutation.png',
  special: '/assets/nodes/zaklinaniya.png'
}
function schoolIcon(sp) { return SCHOOL_ICONS[sp.school] || SCHOOL_ICONS.special }

// Классы → slug страницы класса (/dnd5e/classes/<slug>)
const CLASS_SLUG = {
  Бард: 'bard', Варвар: 'barbarian', Воин: 'fighter', Волшебник: 'wizard',
  Дрифтер: 'drifter', Друид: 'druid', Жрец: 'cleric', Изобретатель: 'inventor',
  Колдун: 'warlock', Монах: 'monk', Паладин: 'paladin', Плут: 'rogue',
  Следопыт: 'ranger', Чародей: 'sorcerer', Шаман: 'shaman'
}
function classSlug(name) { return CLASS_SLUG[name] || '' }
function classList(sp) {
  const cs = sp.classes || []
  return cs.map((name, i) => ({ name, slug: classSlug(name), last: i === cs.length - 1 }))
}

function levelLine(sp) { return sp.level === 0 ? 'заговор' : `${sp.level} уровень` }
function typeLine(sp) { return `${levelLine(sp)}, ${schoolName(sp.school).toLowerCase()}` }
function levelBadge(sp) { return String(sp.level) }

// Компоненты буквами-чипами с расшифровкой в тултипе. К — концентрация (из меток).
const COMPONENT_NAMES = { К: 'Концентрация', В: 'Вербальный', С: 'Соматический', М: 'Материальный' }
function parseComponents(str) {
  const s = String(str)
  const note = (s.match(/\(([^)]*)\)/) || [])[1] || ''
  const head = s.replace(/\s*\([^)]*\)\s*/, '').trim()
  const letters = head ? head.split(/,\s*/).filter(Boolean) : []
  return { letters, note }
}
function compChips(sp) {
  const out = []
  for (const l of parseComponents(sp.components).letters) out.push({ l, t: COMPONENT_NAMES[l] || l })
  if (sp.tags.includes('concentration')) out.push({ l: 'К', t: 'Концентрация' })
  return out
}
function compNote(sp) { return parseComponents(sp.components).note }

const usedSchools = [...new Set(SPELLS_5E.map(s => s.school))]
const usedSources = [...new Set(SPELLS_5E.map(s => s.source).filter(Boolean))]
  .sort((a, b) => {
    const ai = SOURCE_ORDER.indexOf(a)
    const bi = SOURCE_ORDER.indexOf(b)
    if (ai !== -1 || bi !== -1) {
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    }
    return sourceName(a).localeCompare(sourceName(b), 'ru')
  })

// ── Категоризация заклинаний для фильтров ────────────────────────
function spellDamage(sp) { const d = SPELL_META[sp.id]?.damage; return d && d.length ? d : ['none'] }
function spellSave(sp) { return SPELL_META[sp.id]?.save || '' }
function spellHealing(sp) { return SPELL_META[sp.id]?.healing || '' }

function castBuckets(sp) {
  const c = String(sp.castingTime)
  if (/бонус/i.test(c)) return ['бонусное действие']
  if (/реакц/i.test(c)) return ['реакция']
  if (/действие/i.test(c)) return ['действие']
  const b = []
  if (/\bход\b/i.test(c)) b.push('ход')
  if (/1 минут/i.test(c)) b.push('1 минута')
  if (/10 минут/i.test(c)) b.push('10 минут')
  if (/1 час/i.test(c)) b.push('1 час')
  if (/8 час/i.test(c)) b.push('8 час')
  if (/12 час/i.test(c)) b.push('12 час')
  if (/24 час/i.test(c)) b.push('24 час')
  return b
}

function rangeBuckets(sp) {
  const r = String(sp.range)
  if (/на себя/i.test(r)) return ['на себя']
  if (/касан/i.test(r)) return ['касание']
  if (/мил[яи]/i.test(r)) return ['1 миля']
  const m = r.match(/(\d+)\s*фт/i)
  return m ? [`${m[1]} футов`] : []
}

function durationBuckets(sp) {
  const d = String(sp.duration)
  const b = []
  if (/мгновен/i.test(d)) b.push('Мгновенная')
  if (/1 раунд/i.test(d)) b.push('1 раунд')
  if (/1 минут/i.test(d)) b.push('1 минута')
  if (/10 минут/i.test(d)) b.push('10 минут')
  if (/1 час/i.test(d)) b.push('1 час')
  if (/8 час/i.test(d)) b.push('8 часов')
  if (/12 час/i.test(d)) b.push('12 часов')
  if (/24 час/i.test(d)) b.push('24 часа')
  if (/1 д(ень|ня)/i.test(d)) b.push('1 день')
  if (/7 дн/i.test(d)) b.push('7 дней')
  if (/10 дн/i.test(d)) b.push('10 дней')
  if (/1 год/i.test(d)) b.push('1 год')
  return b
}

function compBuckets(sp) {
  const { letters } = parseComponents(sp.components)
  const b = []
  if (letters.includes('В')) b.push('вербальный')
  if (letters.includes('С')) b.push('соматический')
  if (letters.includes('М')) { b.push('материальный'); b.push(SPELL_META[sp.id]?.consumed ? 'расходуемый' : 'не расходуемый') }
  return b
}

// Порядок опций (как задал пользователь); реально показываем только присутствующие в данных
const DAMAGE_ORDER = ['none', 'bludgeoning', 'piercing', 'slashing', 'fire', 'cold', 'lightning', 'poison', 'acid', 'thunder', 'necrotic', 'radiant', 'force', 'psychic']
const SAVE_ORDER = ['str', 'dex', 'con', 'int', 'wis', 'cha']
const CAST_ORDER = ['бонусное действие', 'реакция', 'действие', 'ход', '1 минута', '10 минут', '1 час', '8 час', '12 час', '24 час']
const RANGE_ORDER = ['на себя', 'касание', '5 футов', '10 футов', '20 футов', '25 футов', '30 футов', '40 футов', '50 футов', '60 футов', '90 футов', '100 футов', '120 футов', '150 футов', '300 футов', '400 футов', '1000 футов', '1 миля']
const DURATION_ORDER = ['Мгновенная', '1 раунд', '1 минута', '10 минут', '1 час', '8 часов', '12 часов', '24 часа', '1 день', '7 дней', '10 дней', '1 год']
const COMP_ORDER = ['вербальный', 'соматический', 'материальный', 'расходуемый', 'не расходуемый']

function collect(fn) { const s = new Set(); for (const sp of SPELLS_5E) for (const v of fn(sp)) s.add(v); return s }
const present = {
  damage: collect(spellDamage),
  save: collect(sp => spellSave(sp) ? [spellSave(sp)] : []),
  healing: collect(sp => spellHealing(sp) ? [spellHealing(sp)] : []),
  cast: collect(castBuckets),
  range: collect(rangeBuckets),
  duration: collect(durationBuckets),
  comp: collect(compBuckets)
}
function opt(order, set, labelFn) { return order.filter(v => set.has(v)).map(v => ({ value: v, label: labelFn(v) })) }

const query = computed(() => search.value.trim().toLowerCase())

function matches(sp) {
  if (active.level.length && !active.level.includes(String(sp.level))) return false
  if (active.source.length && !active.source.includes(sp.source)) return false
  if (active.school.length && !active.school.includes(sp.school)) return false
  if (active.ritual.length && !active.ritual.includes(sp.tags.includes('ritual') ? 'yes' : 'no')) return false
  if (active.concentration.length && !active.concentration.includes(sp.tags.includes('concentration') ? 'yes' : 'no')) return false
  if (active.damage.length && !active.damage.some(v => spellDamage(sp).includes(v))) return false
  if (active.healing.length && !active.healing.includes(spellHealing(sp))) return false
  if (active.save.length && !active.save.includes(spellSave(sp))) return false
  if (active.cast.length && !active.cast.some(v => castBuckets(sp).includes(v))) return false
  if (active.range.length && !active.range.some(v => rangeBuckets(sp).includes(v))) return false
  if (active.duration.length && !active.duration.some(v => durationBuckets(sp).includes(v))) return false
  if (active.comp.length && !active.comp.some(v => compBuckets(sp).includes(v))) return false
  if (!query.value) return true
  return [sp.title, sp.description, sp.range, sp.components, sp.source, sourceName(sp.source), ...sp.sections.map(x => x.title + ' ' + x.text)]
    .join(' ').toLowerCase().includes(query.value)
}

// Каждый уровень — отдельная нить (группа) с ромбом.
const groups = computed(() => Object.keys(SPELL_LEVELS).map(lvl => ({
  id: `lvl-${lvl}`,
  title: SPELL_LEVELS[lvl],
  items: SPELLS_5E.filter(s => String(s.level) === lvl && matches(s)).map(s => ({
    id: s.id,
    title: s.title,
    meta: [schoolName(s.school), s.tags.includes('concentration') ? 'конц.' : null, s.tags.includes('ritual') ? 'ритуал' : null].filter(Boolean).join(' · '),
    badge: s.source,
    badgeTitle: sourceName(s.source),
    raw: s
  }))
})).filter(g => g.items.length))

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => Object.values(active).reduce((s, arr) => s + arr.length, 0))

const YESNO = [{ value: 'yes', label: 'Да' }, { value: 'no', label: 'Нет' }]

const filters = computed(() => [
  { key: 'level', label: 'Уровень', options: Object.keys(SPELL_LEVELS).map(v => ({ value: v, label: v === '0' ? 'Заговоры' : v + ' ур.' })) },
  {
    key: 'source',
    label: 'Источник',
    note: 'Официальные книги и авторские сборники',
    options: usedSources.map(v => ({
      value: v,
      label: sourceFilterLabel(v),
      title: sourceName(v)
    }))
  },
  { key: 'school', label: 'Школа', options: usedSchools.map(v => ({ value: v, label: schoolName(v) })) },
  { key: 'ritual', label: 'Ритуал', options: YESNO },
  { key: 'concentration', label: 'Концентрация', options: [{ value: 'yes', label: 'Требуется' }, { value: 'no', label: 'Не требуется' }] },
  { key: 'damage', label: 'Тип урона', options: opt(DAMAGE_ORDER, present.damage, v => DAMAGE_TYPES[v]) },
  ...(present.healing.size ? [{ key: 'healing', label: 'Лечение', options: opt(['hits', 'temp'], present.healing, v => (v === 'hits' ? 'Хиты' : 'Временные хиты')) }] : []),
  { key: 'save', label: 'Спасбросок', options: opt(SAVE_ORDER, present.save, v => SAVES[v]) },
  { key: 'cast', label: 'Время накладывания', options: opt(CAST_ORDER, present.cast, v => v) },
  { key: 'range', label: 'Дистанция', options: opt(RANGE_ORDER, present.range, v => v) },
  { key: 'duration', label: 'Длительность', options: opt(DURATION_ORDER, present.duration, v => v) },
  { key: 'comp', label: 'Компоненты', options: opt(COMP_ORDER, present.comp, v => v) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { for (const k of Object.keys(active)) active[k] = [] }

useSeoMeta({
  title: 'Заклинания — D&D 5e — TKK.club',
  description: 'Заклинания мира Эноа для D&D 5e: уровень, школа, время наложения, дистанция, компоненты и эффекты.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/zaklinaniya.png"
    emblem-alt="Заклинания"
    title="Заклинания"
    crumb-current="Заклинания"
    search-placeholder="Найти заклинание, эффект или дистанцию"
    node-prefix="spell"
    query-key="s"
    :columns="3"
    thread-web
    :card-corners="false"
    :card-actions="['link', 'bookmark', 'print', 'expand', 'close']"
    bookmark-store="tkk-spell-bookmarks-5e"
    :groups="groups"
    :total="SPELLS_5E.length"
    :visible="totalVisible"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #item="{ item }">
      <span class="sp-list-card">
        <span class="sp-list-level" :title="levelLine(item.raw)">{{ levelBadge(item.raw) }}</span>
        <span class="sp-list-copy">
          <span class="sp-list-title-line">
            <span class="sp-list-name">{{ item.raw.title }}</span>
            <span v-if="titleEn(item.raw)" class="sp-list-name-en">[{{ titleEn(item.raw) }}]</span>
          </span>
          <span class="sp-list-details">
            <span class="sp-list-school" :title="`Школа: ${schoolName(item.raw.school)}`">
              <NuxtImg
                :src="schoolIcon(item.raw)"
                :alt="schoolName(item.raw.school)"
                width="64"
                height="64"
                format="webp"
                loading="lazy"
              />
            </span>
            <span class="sp-list-chips" aria-label="Компоненты заклинания">
              <abbr
                v-for="c in compChips(item.raw)"
                :key="c.l"
                class="sp-list-chip"
                :class="{ 'sp-list-chip-conc': c.l === 'К' }"
                :title="c.t"
              >{{ c.l }}</abbr>
            </span>
          </span>
        </span>
      </span>
    </template>

    <template #body="{ item, expanded }">
      <header class="sp-head">
        <span class="sp-head-copy">
          <h2 class="sp-title">{{ item.raw.title }}</h2>
          <span v-if="titleEn(item.raw)" class="sp-title-en">{{ titleEn(item.raw) }}</span>
          <span class="sp-head-chips" aria-label="Компоненты заклинания">
            <span class="sp-head-school" :title="`Школа: ${schoolName(item.raw.school)}`">
              <NuxtImg
                :src="schoolIcon(item.raw)"
                :alt="schoolName(item.raw.school)"
                width="72"
                height="72"
                format="webp"
              />
            </span>
            <abbr
              v-for="c in compChips(item.raw)"
              :key="c.l"
              class="sp-comp"
              :class="{ 'sp-comp-conc': c.l === 'К' }"
              :title="c.t"
            >{{ c.l }}</abbr>
          </span>
        </span>
      </header>

      <div class="sp-meta">
        <span class="sp-type">{{ typeLine(item.raw) }}</span>
        <span class="sp-src">Источник: <b :title="sourceName(item.raw.source)">{{ item.raw.source }}</b></span>
      </div>

      <dl class="sp-stats">
        <div class="sp-stat"><dt>Время накладывания</dt><dd>{{ item.raw.castingTime }}</dd></div>
        <div class="sp-stat"><dt>Дистанция</dt><dd>{{ item.raw.range }}</dd></div>
        <div class="sp-stat"><dt>Длительность</dt><dd>{{ item.raw.duration }}</dd></div>
        <div v-if="compNote(item.raw)" class="sp-stat sp-stat-wide">
          <dt>Материальный компонент</dt>
          <dd class="sp-comp-note">{{ compNote(item.raw) }}</dd>
        </div>
      </dl>

      <p class="sp-desc"><RuleRichText :text="item.raw.description" /></p>

      <div v-for="section in item.raw.sections" :key="section.title" class="sp-block">
        <h3 class="sp-block-title">{{ section.title }}</h3>
        <p class="sp-desc"><RuleRichText :text="section.text" /></p>
      </div>

      <p v-if="item.raw.classes?.length" class="sp-classes">
        <span class="sp-classes-label">Классы:</span>
        <span class="sp-classes-list">
          <span v-for="c in classList(item.raw)" :key="c.name">
            <NuxtLink v-if="c.slug" :to="`/dnd5e/classes/${c.slug}`" class="sp-class-link">{{ c.name }}</NuxtLink>
            <span v-else>{{ c.name }}</span>
            <span v-if="!c.last" class="sp-class-sep">, </span>
          </span>
        </span>
      </p>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
@media (min-width:901px){
  :deep(.screens-shell){
    width:min(1240px,calc(100% - 48px));
  }
}

.sp-list-card{
  display:grid;
  grid-template-columns:32px minmax(0,1fr);
  align-items:center;
  gap:9px;
  flex:1 1 auto;
  min-width:0;
}

.sp-list-level{
  align-self:stretch;
  display:grid;
  place-items:center;
  min-height:40px;
  border-right:1px solid rgba(var(--theme-text-rgb),.1);
  font-size:17px;
  font-weight:550;
  color:rgba(var(--theme-text-rgb),.78);
}

.sp-list-school,
.sp-head-school{
  position:relative;
  display:block;
  overflow:hidden;
  background:#020817;
  border:1px solid rgba(var(--theme-accent-rgb),.28);
  box-shadow:inset 0 0 16px rgba(0,0,0,.28);
}

.sp-list-school{
  width:22px;
  height:22px;
  flex:0 0 22px;
  border-radius:5px;
}

.sp-list-school img,
.sp-head-school img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  transform:scale(1.72);
}

.sp-list-copy{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  min-width:0;
}

.sp-list-title-line{
  display:flex;
  align-items:baseline;
  gap:4px;
  width:100%;
  min-width:0;
  overflow:hidden;
  white-space:nowrap;
}

.sp-list-name{
  flex:0 1 auto;
  min-width:0;
  overflow:hidden;
  font-size:14px;
  line-height:1.16;
  font-weight:750;
  white-space:nowrap;
  text-overflow:ellipsis;
  color:rgba(var(--theme-heading-rgb),.94);
  transition:color .16s ease;
}

.sp-list-name-en{
  flex:1 1 auto;
  min-width:36px;
  overflow:hidden;
  font-size:11px;
  line-height:1.2;
  font-weight:500;
  white-space:nowrap;
  text-overflow:ellipsis;
  color:rgba(var(--theme-text-rgb),.52);
}

.sp-list-details{
  display:flex;
  align-items:center;
  gap:6px;
  min-height:22px;
  margin-top:5px;
}

.sp-list-chips,
.sp-head-chips{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:4px;
}

.sp-list-chips{
  margin:0;
}

.sp-list-chip{
  display:inline-grid;
  place-items:center;
  width:18px;
  height:18px;
  border:1px solid rgba(var(--theme-accent-rgb),.34);
  border-radius:4px;
  font-size:9px;
  font-weight:850;
  line-height:1;
  color:rgba(var(--theme-accent-strong-rgb),.92);
  text-decoration:none;
  cursor:help;
}

.sp-list-chip-conc{
  border-color:rgba(var(--theme-accent-rgb),.68);
  background:rgba(var(--theme-accent-rgb),.15);
  box-shadow:0 0 8px rgba(var(--theme-accent-rgb),.1);
}

:deep(.thread-item){
  align-items:center;
  min-height:58px;
  gap:8px;
  margin:4px 0;
  padding:8px 9px;
  border:1px solid rgba(var(--theme-text-rgb),.045);
  border-radius:10px;
  background:rgba(var(--theme-text-rgb),.025);
  transition:background .16s ease,border-color .16s ease;
}

:deep(.thread-item:hover){
  border-color:rgba(var(--theme-accent-rgb),.14);
  background:rgba(var(--theme-accent-rgb),.045);
}

:deep(.thread-knot){
  border-bottom:0;
}

:deep(.thread-item:hover .sp-list-name),
:deep(.thread-knot.open .sp-list-name){
  color:var(--theme-accent-strong);
}

.sp-head{
  margin:0 148px 14px 0;
}

/* У раскрытого заклинания заголовок и служебные метки живут в карточке —
   строку-список сворачиваем в тонкий коннектор (крестик и бейдж убраны) */
:deep(.thread-knot.open .sp-list-card),
:deep(.thread-knot.open .thread-item-name),
:deep(.thread-knot.open .thread-item-meta),
:deep(.thread-knot.open .thread-item-tail){
  display:none;
}

:deep(.thread-knot.open .thread-item){
  margin:0;
  padding:5px 2px;
  border-color:transparent;
  background:transparent;
  min-height:0;
}

.sp-head-school{
  width:26px;
  height:26px;
  flex:0 0 26px;
  border-radius:5px;
  border-color:rgba(var(--theme-accent-rgb),.4);
}

.sp-head-copy{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  min-width:0;
}

.sp-title{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:30px;
  line-height:1.05;
  font-weight:500;
  letter-spacing:.03em;
  color:rgba(var(--theme-heading-rgb),.97);
}

.sp-title-en{
  display:block;
  margin:3px 0 0;
  font-size:13px;
  font-weight:600;
  letter-spacing:.04em;
  color:rgba(var(--theme-accent-rgb),.62);
}

.sp-head-chips{
  min-height:26px;
  margin-top:9px;
}

/* Строка «тип · школа / Источник» */
.sp-meta{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  gap:16px;
  margin-bottom:16px;
  padding:9px 14px;
  border:1px solid rgba(var(--theme-accent-rgb),.14);
  border-radius:8px;
  background:rgba(var(--theme-accent-rgb),.05);
}

.sp-type{
  font-family:'Cormorant Garamond',serif;
  font-size:17px;
  font-style:italic;
  color:rgba(var(--theme-text-rgb),.8);
}

.sp-src{
  flex:0 0 auto;
  font-size:11px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:rgba(var(--theme-text-rgb),.5);
}

.sp-src b{
  color:var(--theme-accent);
  cursor:help;
}

/* Сетка характеристик: 3 колонки + компоненты во всю ширину */
.sp-stats{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  margin:0 0 18px;
  border:1px solid rgba(var(--theme-accent-rgb),.16);
  border-radius:8px;
  overflow:hidden;
}

.sp-stat{
  padding:11px 16px;
  border-top:1px solid rgba(var(--theme-accent-rgb),.13);
  border-left:1px solid rgba(var(--theme-accent-rgb),.13);
}

.sp-stat:nth-child(-n+3){ border-top:0; }
.sp-stat:nth-child(3n+1){ border-left:0; }

.sp-stat-wide{ grid-column:1 / -1; }

.sp-stat dt{
  margin-bottom:3px;
  font-size:10px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:rgba(var(--theme-accent-rgb),.7);
}

.sp-stat dd{
  margin:0;
  font-size:15px;
  color:rgba(var(--theme-text-rgb),.92);
}

.sp-comp{
  display:inline-grid;
  place-items:center;
  width:23px;
  height:23px;
  border:1px solid rgba(var(--theme-accent-rgb),.4);
  border-radius:5px;
  font-size:12px;
  font-weight:800;
  line-height:1;
  color:var(--theme-accent-strong);
  text-decoration:none;
  cursor:help;
}

.sp-comp-conc{
  border-color:rgba(var(--theme-accent-rgb),.65);
  background:rgba(var(--theme-accent-rgb),.16);
}

.sp-comp-note{
  display:block;
  font-size:13px;
  color:rgba(var(--theme-text-rgb),.6);
}

.sp-desc{
  margin:0 0 12px;
  font-family:'Cormorant Garamond',serif;
  font-size:19px;
  line-height:1.55;
  color:rgba(var(--theme-text-rgb),.86);
}

.sp-block{
  margin-top:14px;
}

.sp-block-title{
  margin:0 0 4px;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  font-weight:500;
  letter-spacing:.03em;
  color:rgba(var(--theme-accent-rgb),.9);
}

.sp-classes{
  display:flex;
  flex-wrap:wrap;
  align-items:baseline;
  gap:8px;
  margin:16px 0 0;
  padding-top:14px;
  border-top:1px solid rgba(var(--theme-text-rgb),.08);
}

.sp-classes-label{
  font-size:11px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:rgba(var(--theme-text-rgb),.5);
}

.sp-classes-list{
  font-size:14px;
  font-weight:650;
  color:var(--theme-accent-strong);
}

.sp-class-link{
  color:var(--theme-accent-strong);
  text-decoration:none;
  border-bottom:1px solid rgba(var(--theme-accent-rgb),.35);
  transition:color .16s ease,border-color .16s ease;
}

.sp-class-link:hover{
  color:var(--theme-accent);
  border-bottom-color:var(--theme-accent);
}

.sp-class-sep{
  color:rgba(var(--theme-text-rgb),.4);
}

@media (max-width:600px){
  :deep(.thread-item){
    flex-wrap:nowrap;
  }

  .sp-head{
    margin-right:0;
  }

  .sp-stats{
    grid-template-columns:1fr;
  }

  .sp-stat:nth-child(-n+3){ border-top:1px solid rgba(var(--theme-accent-rgb),.13); }
  .sp-stat:first-child{ border-top:0; }
  .sp-stat:nth-child(3n+1){ border-left:0; }
}
</style>
