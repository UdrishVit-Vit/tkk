<script setup>
import { PF2E_BESTIARY, PF2E_BESTIARY_TIERS, PF2E_BESTIARY_RARITIES } from '~/data/pf2e/bestiary.js'

const search = ref('')
const open = ref(null)
const showFilter = ref(false)
const active = reactive({ tier: [], rarity: [] })

const query = computed(() => search.value.trim().toLowerCase())

function searchText(creature) {
  return [
    creature.title, creature.en, creature.lore, creature.languages, creature.skills,
    ...creature.traits,
    ...creature.attacks.map(a => `${a.name} ${a.damage}`),
    ...creature.abilities.map(a => `${a.name} ${a.text}`)
  ].join(' ').toLowerCase()
}

function matches(creature) {
  if (active.tier.length && !active.tier.includes(creature.cat)) return false
  if (active.rarity.length && !active.rarity.includes(creature.rarity)) return false
  if (!query.value) return true
  return searchText(creature).includes(query.value)
}

const groups = computed(() => Object.entries(PF2E_BESTIARY_TIERS).map(([id, title]) => ({
  id,
  title,
  items: PF2E_BESTIARY
    .filter(creature => creature.cat === id && matches(creature))
    .sort((a, b) => a.level - b.level)
    .map(creature => ({
      id: creature.id,
      title: creature.title,
      meta: `${creature.en} · ${creature.size}`,
      badge: `${creature.level} ур.`,
      badgeTitle: `Уровень существа ${creature.level}`,
      raw: creature
    }))
})).filter(group => group.items.length))

const totalVisible = computed(() => groups.value.reduce((sum, g) => sum + g.items.length, 0))
const activeCount = computed(() => active.tier.length + active.rarity.length)

const filters = computed(() => [
  { key: 'tier', label: 'Ступень', options: Object.entries(PF2E_BESTIARY_TIERS).map(([value, label]) => ({ value, label })) },
  { key: 'rarity', label: 'Редкость', options: PF2E_BESTIARY_RARITIES.map(value => ({ value, label: value })) }
])

function isActive(key, value) { return active[key].includes(value) }
function toggleFilter(key, value) {
  const arr = active[key]
  const i = arr.indexOf(value)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(value)
}
function resetFilters() { active.tier = []; active.rarity = [] }

const ACTION_GLYPHS = { 1: '◆', 2: '◆◆', 3: '◆◆◆', reaction: '⤶', free: '◇' }
function actionGlyph(actions) { return ACTION_GLYPHS[String(actions).toLowerCase()] || '' }

// Only the defence lines a given creature actually has should take up a row.
function defenceRows(creature) {
  return [
    { label: 'КБ', value: String(creature.ac) },
    { label: 'Спасброски', value: creature.saves },
    { label: 'Хиты', value: String(creature.hp) },
    creature.immunities ? { label: 'Иммунитеты', value: creature.immunities } : null,
    creature.resistances ? { label: 'Сопротивления', value: creature.resistances } : null,
    creature.weaknesses ? { label: 'Слабости', value: creature.weaknesses } : null,
    { label: 'Скорость', value: creature.speed }
  ].filter(Boolean)
}

useSeoMeta({
  title: 'Бестиарий — Pathfinder 2e — TKK.club',
  description: 'Бестиарий Pathfinder 2e в мире Эноа: статблоки существ по уровням, от трёхногого додора до отпрыска Иджин’Ана.'
})
</script>

<template>
  <ThreadRefPage
    emblem-img="/assets/nodes/bestiariy.png"
    emblem-alt="Бестиарий"
    system-path="/pf2e"
    system-label="Pathfinder 2e"
    kicker="Pathfinder 2e"
    title="Бестиарий"
    crumb-current="Бестиарий"
    lead="Существа Эноа по правилам Second Edition: полные статблоки, разложенные по ступеням опасности."
    search-placeholder="Найти существо, черту или способность"
    node-prefix="pfb"
    query-key="b"
    :groups="groups"
    :total="PF2E_BESTIARY.length"
    :visible="totalVisible"
    :filters="filters"
    :is-active="isActive"
    :active-filter-count="activeCount"
    :card-actions="['expand', 'print', 'bookmark', 'link']"
    bookmark-store="pf2e-bestiary-bookmarks"
    v-model:search="search"
    v-model:open="open"
    v-model:show-filter="showFilter"
    @toggle-filter="toggleFilter"
    @reset-filters="resetFilters"
  >
    <template #body="{ item }">
      <div class="tref-badges">
        <span class="tref-pill"><b>{{ item.raw.rarity }}</b></span>
        <span class="tref-tag">{{ item.raw.size }}</span>
        <span v-for="trait in item.raw.traits" :key="trait" class="tref-tag">{{ trait }}</span>
      </div>

      <p v-if="item.raw.lore" class="tref-desc pfb-lore">{{ item.raw.lore }}</p>

      <section class="pfb-block">
        <h4 class="pfb-block-title">Чувства и навыки</h4>
        <dl class="tref-stats">
          <div class="tref-stat"><dt>Восприятие</dt><dd>{{ item.raw.perception }}</dd></div>
          <div class="tref-stat"><dt>Языки</dt><dd>{{ item.raw.languages }}</dd></div>
          <div class="tref-stat"><dt>Навыки</dt><dd>{{ item.raw.skills }}</dd></div>
          <div class="tref-stat"><dt>Характеристики</dt><dd>{{ item.raw.abilities_mods }}</dd></div>
        </dl>
      </section>

      <section class="pfb-block">
        <h4 class="pfb-block-title">Защита</h4>
        <dl class="tref-stats">
          <div v-for="row in defenceRows(item.raw)" :key="row.label" class="tref-stat">
            <dt>{{ row.label }}</dt><dd>{{ row.value }}</dd>
          </div>
        </dl>
      </section>

      <section class="pfb-block">
        <h4 class="pfb-block-title">Атаки</h4>
        <div v-for="attack in item.raw.attacks" :key="attack.name" class="pfb-attack">
          <span class="pfb-attack-name">{{ attack.name }}</span>
          <span class="pfb-attack-bonus">{{ attack.bonus }}</span>
          <span class="pfb-attack-damage">{{ attack.damage }}</span>
          <span v-if="attack.traits?.length" class="pfb-attack-traits">{{ attack.traits.join(', ') }}</span>
        </div>
      </section>

      <section class="pfb-block">
        <h4 class="pfb-block-title">Способности</h4>
        <article v-for="ability in item.raw.abilities" :key="ability.name" class="pfb-ability">
          <h5>
            {{ ability.name }}
            <em v-if="actionGlyph(ability.actions)" class="pfb-ability-actions">{{ actionGlyph(ability.actions) }}</em>
          </h5>
          <p>{{ ability.text }}</p>
        </article>
      </section>
    </template>
  </ThreadRefPage>
</template>

<style scoped>
.pfb-lore{font-family:'Cormorant Garamond',serif;font-size:16.5px;line-height:1.62;color:rgba(var(--theme-heading-rgb),.85)}
.pfb-block{margin-top:16px}
.pfb-block-title{margin:0 0 8px;font-family:'Hanken Grotesk';font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(var(--theme-accent-rgb),.8)}
.pfb-attack{display:grid;grid-template-columns:minmax(120px,1fr) 60px minmax(0,2fr);gap:10px;align-items:baseline;padding:8px 0;border-top:1px solid rgba(var(--theme-contrast-rgb),.06)}
.pfb-attack-name{font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(var(--theme-heading-rgb),.92)}
.pfb-attack-bonus{font-family:'Hanken Grotesk';font-size:13px;font-weight:700;color:rgba(var(--theme-accent-strong-rgb),.92)}
.pfb-attack-damage{font-size:13.5px;line-height:1.5;color:rgba(var(--theme-text-rgb),.78)}
.pfb-attack-traits{grid-column:3;font-size:11.5px;color:rgba(var(--theme-text-rgb),.5)}
.pfb-ability{margin:0 0 12px}
.pfb-ability h5{margin:0 0 4px;font-family:'Hanken Grotesk';font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(var(--theme-accent-strong-rgb),.9)}
.pfb-ability-actions{margin-left:6px;font-style:normal;font-size:13px;letter-spacing:.06em}
.pfb-ability p{margin:0;font-size:13.5px;line-height:1.65;color:rgba(var(--theme-text-rgb),.76)}
@media(max-width:720px){
  .pfb-attack{grid-template-columns:1fr 56px;gap:6px}
  .pfb-attack-damage,.pfb-attack-traits{grid-column:1 / -1}
}
</style>
