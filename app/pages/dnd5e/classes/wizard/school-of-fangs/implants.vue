<script setup>
import { CLASS_ARCHETYPES_IMPORTED } from '~/data/importedClassArchetypes.js'
import { toSig, sigKey, bySignature } from '~/utils/shagai5e.js'

const school = CLASS_ARCHETYPES_IMPORTED['Волшебник']?.find(item => item.name === 'Школа Клыков')
const catalogue = school?.features?.find(item => item.name === 'Импланты')
const implants = catalogue?.items || []

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ difficulty: [] })

function cleanName(name) {
  return String(name || '').replace(/^\d+[.,]?\s*/, '')
}
function difficultyOf(item) {
  const m = String(item.text || '').match(/(?:Создание|Получение) импланта\s*:\s*(\d+)/i)
  return m ? Number(m[1]) : null
}
function implantSig(item) {
  return toSig(item.roll?.counts || item.roll)
}

const sigMap = bySignature(implants, implantSig)
function resolveImplant(roll) {
  return sigMap[sigKey(roll.sig)] || null
}

const difficulties = [...new Set(implants.map(difficultyOf).filter(Boolean))].sort((a, b) => a - b)

const query = computed(() => search.value.trim().toLocaleLowerCase('ru'))
function matches(item) {
  if (active.difficulty.length && !active.difficulty.includes(String(difficultyOf(item)))) return false
  if (!query.value) return true
  return `${item.name} ${item.text}`.toLocaleLowerCase('ru').includes(query.value)
}

// Группировка по сложности создания.
const groups = computed(() => {
  const tiers = [...difficulties.map(String), 'other']
  return tiers.map(tier => {
    const items = implants.filter(item => {
      const d = difficultyOf(item)
      const inTier = tier === 'other' ? !d : String(d) === tier
      return inTier && matches(item)
    })
    return {
      id: `d${tier}`,
      title: tier === 'other' ? 'Без сложности' : `Сложность создания · Сл ${tier}`,
      items: items.map((item) => ({
        id: `imp-${implants.indexOf(item) + 1}`,
        title: `${implants.indexOf(item) + 1}. ${cleanName(item.name)}`,
        meta: shortCombo(item),
        raw: item
      }))
    }
  }).filter(g => g.items.length)
})

function shortCombo(item) {
  return implantSig(item).map((n, i) => n ? `${n}×${['Б', 'А', 'Д', 'Т'][i]}` : null).filter(Boolean).join(' ')
}

const totalVisible = computed(() => groups.value.reduce((s, g) => s + g.items.length, 0))
const activeCount = computed(() => active.difficulty.length)

const filters = computed(() => [
  { key: 'difficulty', label: 'Сложность создания', options: difficulties.map(d => ({ value: String(d), label: `Сл ${d}` })) }
])
function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.difficulty = [] }

useSeoMeta({
  title: 'Импланты Школы Клыков — Волшебник — D&D 5e — TKK.club',
  description: 'Каталог имплантов Школы Клыков: бросьте кости Шагай (4к4) и получите случайный имплант со всеми свойствами.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/classes/wizard.png"
    emblem-alt="Школа Клыков"
    kicker="Волшебник · Школа Клыков"
    title="Импланты"
    crumb-current="Импланты"
    lead="Плоть Вуали, вживлённая в тело: бросьте кости Шагай и получите случайный имплант со всеми свойствами."
    search-placeholder="Название или свойство: тёмное зрение, коготь…"
    node-prefix="imp"
    query-key="i"
    collapsible
    collapse-label="Все импланты"
    :groups="groups"
    :total="implants.length"
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
    <template #intro>
      <div class="imp-head">
        <ShagaiRoll
          :resolve="resolveImplant"
          label="Получить имплант · 4к4"
          rolling-label="Вживление…"
          hint="кости Шагай: 1 Бунти · 2 Аюр · 3 Додор · 4 Тахар"
        >
          <template #result="{ entry }">
            <div class="imp-result-name">Имплант № {{ implants.indexOf(entry) + 1 }} · {{ cleanName(entry.name) }}</div>
            <div class="imp-result-card">
              <span class="rt-corner rt-corner-tl" /><span class="rt-corner rt-corner-tr" />
              <span class="rt-corner rt-corner-bl" /><span class="rt-corner rt-corner-br" />
              <ImplantBody :implant="entry" />
            </div>
          </template>
        </ShagaiRoll>
      </div>
    </template>

    <template #body="{ item }">
      <ImplantBody :implant="item.raw" />
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.imp-head{ margin-top:26px; }

.imp-result-name{
  margin-bottom:12px;
  font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:600;
  letter-spacing:.04em; color:rgba(var(--theme-heading-rgb),.95);
}
.imp-result-card{
  position:relative; padding:22px 24px 20px;
  border:1px solid rgba(var(--theme-accent-rgb),.22); border-radius:10px;
  background:linear-gradient(180deg,rgba(var(--theme-accent-rgb),.05),rgba(var(--theme-contrast-rgb),.008));
}
.rt-corner{ position:absolute; width:14px; height:14px; pointer-events:none; }
.rt-corner-tl{ top:6px; left:6px; border-top:1.5px solid rgba(var(--theme-accent-rgb),.5); border-left:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:5px 0 0 0; }
.rt-corner-tr{ top:6px; right:6px; border-top:1.5px solid rgba(var(--theme-accent-rgb),.5); border-right:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 5px 0 0; }
.rt-corner-bl{ bottom:6px; left:6px; border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5); border-left:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 0 0 5px; }
.rt-corner-br{ bottom:6px; right:6px; border-bottom:1.5px solid rgba(var(--theme-accent-rgb),.5); border-right:1.5px solid rgba(var(--theme-accent-rgb),.5); border-radius:0 0 5px 0; }
</style>
