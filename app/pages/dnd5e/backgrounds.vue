<script setup>
import { BACKGROUNDS_5E, BACKGROUND_SOURCES } from '~/data/backgrounds5e.js'

const search = ref('')
const selectedId = ref(null)
const rolled = ref({}) // { [tableId]: rowIndex }
const filterOpen = ref(false)
const sortDir = ref('asc') // 'asc' | 'desc'

// Fixed skill names granted by each background (skip "choose N of..." entries,
// those aren't a concrete filterable skill).
function skillNamesOf(bg) {
  if (!bg.proficiencies?.skills) return []
  return bg.proficiencies.skills
    .map(s => s.name)
    .filter(name => !/выбор/i.test(name))
}
const BACKGROUND_SKILLS = [...new Set(BACKGROUNDS_5E.flatMap(skillNamesOf))].sort()

// ---- filter state ----
const activeSources = ref(new Set(Object.keys(BACKGROUND_SOURCES)))
const activeSkills = ref(new Set())
const activeReqs = ref(new Set()) // subset of 'yes' | 'no'

function toggleInSet(set, value) {
  const next = new Set(set.value)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  set.value = next
}
function toggleSource(id) { toggleInSet(activeSources, id) }
function toggleSkill(s) { toggleInSet(activeSkills, s) }
function toggleReq(r) { toggleInSet(activeReqs, r) }

const activeFilterCount = computed(() =>
  (activeSources.value.size < Object.keys(BACKGROUND_SOURCES).length ? 1 : 0) +
  activeSkills.value.size +
  activeReqs.value.size
)
function resetFilters() {
  activeSources.value = new Set(Object.keys(BACKGROUND_SOURCES))
  activeSkills.value = new Set()
  activeReqs.value = new Set()
}

useSeoMeta({
  title: 'Предыстории — TKK.club',
  description: 'Предыстории персонажей мира Эноа для D&D 5e.'
})

const filteredBackgrounds = computed(() => {
  const q = search.value.trim().toLowerCase()
  const list = BACKGROUNDS_5E.filter(b => {
    if (!activeSources.value.has(b.source)) return false
    if (activeSkills.value.size && !skillNamesOf(b).some(s => activeSkills.value.has(s))) return false
    if (activeReqs.value.size) {
      const kind = b.grantsFeat ? 'yes' : 'no'
      if (!activeReqs.value.has(kind)) return false
    }
    if (!q) return true
    return b.title.toLowerCase().includes(q) ||
      (b.intro && b.intro.toLowerCase().includes(q))
  })
  const sorted = [...list].sort((a, b) => a.title.localeCompare(b.title, 'ru'))
  return sortDir.value === 'desc' ? sorted.reverse() : sorted
})

const selectedBackground = computed(() => BACKGROUNDS_5E.find(b => b.id === selectedId.value) || null)

function select(id) {
  selectedId.value = selectedId.value === id ? null : id
  rolled.value = {}
}
function sourceName(id) { return BACKGROUND_SOURCES[id] || id }
function toggleSort() { sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc' }

// Very small **bold** / _italic_ → <strong>/<em> converter for our own trusted static copy.
function mdBold(text) {
  if (!text) return ''
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
}

function rollTable(table) {
  rolled.value = { ...rolled.value, [table.id]: Math.floor(Math.random() * table.entries.length) }
}

function onKeydown(e) { if (e.key === 'Escape') { filterOpen.value = false; selectedId.value = null } }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="fp">
    <!-- SIDEBAR LIST -->
    <aside class="fp-sidebar">
      <div class="fp-sidebar-head">
        <NuxtLink to="/?system=5e" class="fp-back" title="К карте D&D 5e">
          <img src="/assets/knot-main.png" width="22" height="22" style="display:block;object-fit:contain">
        </NuxtLink>
        <div class="fp-wordmark">
          <div class="fp-wordmark-eyebrow">Threads of the Knot of Knots</div>
          <div class="fp-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
        </div>
      </div>

      <nav class="fp-crumb">
        <NuxtLink to="/" class="fp-crumb-link">Системы</NuxtLink>
        <span class="fp-crumb-sep">/</span>
        <NuxtLink to="/?system=5e" class="fp-crumb-link">D&D 5e</NuxtLink>
        <span class="fp-crumb-sep">/</span>
        <span class="fp-crumb-current">Предыстории</span>
      </nav>

      <div class="fp-search-wrap">
        <input v-model="search" class="fp-search" type="search" placeholder="Поиск предыстории...">
        <button
          type="button"
          class="fp-filter-btn"
          :title="sortDir === 'asc' ? 'По алфавиту (А-Я)' : 'По алфавиту (Я-А)'"
          @click="toggleSort"
        >
          <svg v-if="sortDir === 'asc'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h9M4 12h6M4 18h3M17 4v16M17 4l-4 4M17 4l4 4"/></svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h3M4 12h6M4 18h9M17 20V4M17 20l-4-4M17 20l4-4"/></svg>
        </button>
        <button
          type="button"
          class="fp-filter-btn"
          :class="{ active: activeFilterCount > 0 }"
          title="Фильтр"
          @click="filterOpen = true"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
          <span v-if="activeFilterCount" class="fp-filter-badge">{{ activeFilterCount }}</span>
        </button>
      </div>

      <div class="fp-list">
        <button
          v-for="bg in filteredBackgrounds"
          :key="bg.id"
          type="button"
          class="fp-item"
          :class="{ active: selectedId === bg.id }"
          @click="select(bg.id)"
        >
          <span class="fp-item-diamond" />
          <span class="fp-item-body">
            <span class="fp-item-title">{{ bg.title }}</span>
            <span v-if="bg.grantsFeat" class="fp-item-req">Черта: {{ bg.grantsFeat }}</span>
          </span>
          <span class="fp-item-source" :title="sourceName(bg.source)">{{ bg.source }}</span>
        </button>
        <div v-if="filteredBackgrounds.length === 0" class="fp-empty">Ничего не найдено</div>
      </div>

      <div class="fp-sidebar-foot">
        <span class="fp-total">{{ BACKGROUNDS_5E.length }} предысторий</span>
      </div>
    </aside>

    <!-- DETAIL PANEL -->
    <main class="fp-detail">
      <transition name="fp-fade" mode="out-in">
        <div v-if="selectedBackground" :key="selectedBackground.id" class="fp-card">
          <span class="fp-corner fp-corner-tl" /><span class="fp-corner fp-corner-tr" />
          <span class="fp-corner fp-corner-br" /><span class="fp-corner fp-corner-bl" />

          <div class="fp-card-top">
            <div class="fp-card-eyebrow">
              <NuxtLink to="/?system=5e">D&D 5e</NuxtLink>
              <span class="fp-eyebrow-sep">/</span>
              <span>Предыстории</span>
            </div>
            <button class="fp-close" type="button" title="Закрыть" @click="selectedId = null">✕</button>
          </div>

          <h1 class="fp-title">{{ selectedBackground.title.toUpperCase() }}</h1>
          <div class="fp-divider"><span class="fp-divider-diamond" /></div>

          <div class="fp-badge-row">
            <span class="fp-source-badge" :title="sourceName(selectedBackground.source)">{{ selectedBackground.source }}</span>
            <div v-if="selectedBackground.grantsFeat" class="fp-req-badge">
              <span class="fp-req-label">Черта при старте</span>
              <span class="fp-req-value">{{ selectedBackground.grantsFeat }}</span>
            </div>
          </div>

          <p v-if="selectedBackground.intro" class="fp-intro">{{ selectedBackground.intro }}</p>

          <!-- Proficiencies -->
          <div v-if="selectedBackground.proficiencies" class="fp-block">
            <h2 class="fp-h2">Владения</h2>

            <div v-if="selectedBackground.proficiencies.skills" class="fp-prof-group">
              <span class="fp-prof-label">Навыки</span>
              <div class="fp-prof-list">
                <div v-for="s in selectedBackground.proficiencies.skills" :key="s.name" class="fp-prof-item">
                  <strong>{{ s.name }}</strong><span v-if="s.text"> — {{ s.text }}</span>
                </div>
              </div>
            </div>

            <div v-if="selectedBackground.proficiencies.tools" class="fp-prof-group">
              <span class="fp-prof-label">Инструменты</span>
              <div class="fp-prof-list">
                <div v-for="t in selectedBackground.proficiencies.tools" :key="t.name" class="fp-prof-item">
                  <strong>{{ t.name }}</strong><span v-if="t.text"> — {{ t.text }}</span>
                </div>
              </div>
            </div>

            <div v-if="selectedBackground.proficiencies.languages" class="fp-prof-group">
              <span class="fp-prof-label">Языки</span>
              <div class="fp-prof-list">
                <div v-for="(l, i) in selectedBackground.proficiencies.languages" :key="i" class="fp-prof-item">{{ l }}</div>
              </div>
            </div>

            <div v-if="selectedBackground.proficiencies.equipment" class="fp-prof-group">
              <span class="fp-prof-label">Снаряжение</span>
              <div class="fp-prof-list">
                <div v-for="(e, i) in selectedBackground.proficiencies.equipment" :key="i" class="fp-prof-item">{{ e }}</div>
              </div>
            </div>
          </div>

          <!-- Feature -->
          <div v-if="selectedBackground.feature" class="fp-block">
            <h2 class="fp-h2">Умение: {{ selectedBackground.feature.title }}</h2>
            <p class="fp-feature-text" v-html="mdBold(selectedBackground.feature.text)" />
            <p v-if="selectedBackground.feature.alt" class="fp-feature-alt">
              <span class="fp-feature-alt-lbl">Или:</span> <span v-html="mdBold(selectedBackground.feature.alt)" />
            </p>
          </div>

          <blockquote v-if="selectedBackground.quote" class="fp-quote">{{ selectedBackground.quote }}</blockquote>

          <p v-if="selectedBackground.personalization" class="fp-personalization">{{ selectedBackground.personalization }}</p>

          <!-- Personality tables -->
          <div v-for="table in selectedBackground.tables" :key="table.id" class="fp-block">
            <div class="fp-table-head">
              <h2 class="fp-h2">{{ table.label }}<span class="fp-h2-dice">{{ table.dice }}</span></h2>
              <button type="button" class="fp-roll-btn" @click="rollTable(table)">Бросить</button>
            </div>

            <transition name="fp-fade">
              <div v-if="rolled[table.id] !== undefined" class="fp-roll-result">
                <span class="fp-roll-result-die">{{ table.entries[rolled[table.id]].roll }}</span>
                <span class="fp-roll-result-text" v-html="mdBold(table.entries[rolled[table.id]].text)" />
              </div>
            </transition>

            <div class="fp-roll-table">
              <div
                v-for="(entry, idx) in table.entries"
                :key="entry.roll"
                class="fp-roll-row"
                :class="{ hl: rolled[table.id] === idx }"
              >
                <span class="fp-roll-die">{{ entry.roll }}</span>
                <span class="fp-roll-text" v-html="mdBold(entry.text)" />
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="fp-empty-state">
          <div class="fp-empty-glyph">✦</div>
          <div class="fp-empty-title">Выберите предысторию</div>
          <div class="fp-empty-sub">Выберите предысторию из списка слева, чтобы увидеть подробное описание.</div>
        </div>
      </transition>
    </main>

    <!-- FILTER PANEL -->
    <Teleport to="body">
      <transition name="fp-filter-fade">
        <div v-if="filterOpen" class="fp-filter-overlay" @click="filterOpen = false">
          <div class="fp-filter-panel" @click.stop>
            <div class="fp-filter-head">
              <h2 class="fp-filter-title">Фильтр</h2>
              <button class="fp-close" type="button" title="Закрыть" @click="filterOpen = false">✕</button>
            </div>

            <div class="fp-filter-body">
              <!-- Sources -->
              <div class="fp-filter-group">
                <div class="fp-filter-group-head">
                  <span>Источники нитей</span>
                </div>
                <div class="fp-pill-row">
                  <button
                    v-for="(name, id) in BACKGROUND_SOURCES"
                    :key="id"
                    type="button"
                    class="fp-pill"
                    :class="{ on: activeSources.has(id) }"
                    :title="name"
                    @click="toggleSource(id)"
                  >{{ id }}</button>
                </div>
              </div>

              <!-- Skills -->
              <div v-if="BACKGROUND_SKILLS.length" class="fp-filter-group">
                <div class="fp-filter-group-head">
                  <span>Навыки</span>
                </div>
                <div class="fp-pill-row">
                  <button
                    v-for="s in BACKGROUND_SKILLS"
                    :key="s"
                    type="button"
                    class="fp-pill"
                    :class="{ on: activeSkills.has(s) }"
                    @click="toggleSkill(s)"
                  >{{ s }}</button>
                </div>
              </div>

              <!-- Additional requirements -->
              <div class="fp-filter-group">
                <div class="fp-filter-group-head">
                  <span>Черта при старте</span>
                </div>
                <div class="fp-pill-row">
                  <button type="button" class="fp-pill" :class="{ on: activeReqs.has('yes') }" @click="toggleReq('yes')">да</button>
                  <button type="button" class="fp-pill" :class="{ on: activeReqs.has('no') }" @click="toggleReq('no')">нет</button>
                </div>
              </div>
            </div>

            <div class="fp-filter-foot">
              <button type="button" class="fp-filter-reset" @click="resetFilters">Сбросить фильтры</button>
              <span class="fp-filter-note">Фильтры применяются автоматически!</span>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fp {
  display: grid;
  grid-template-columns: 320px 1fr;
  min-height: 100vh;
  background: radial-gradient(130% 120% at 50% 0%, #0c0e14 0%, #070810 52%, #040406 100%);
  color: rgba(226,230,244,.92);
  font-family: 'Hanken Grotesk', sans-serif;
}

/* ---- sidebar ---- */
.fp-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255,255,255,.07);
  background: rgba(7,8,12,.55);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

.fp-sidebar-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.fp-back {
  flex: none;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: background .2s;
}
.fp-back:hover { background: rgba(255,255,255,.06); }

.fp-wordmark-eyebrow {
  font-size: 8.5px;
  letter-spacing: .38em;
  text-transform: uppercase;
  color: rgba(226,230,244,.38);
}
.fp-wordmark-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  letter-spacing: .28em;
  color: rgba(232,236,250,.9);
  margin-top: 2px;
}

.fp-crumb {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  flex-wrap: wrap;
}
.fp-crumb-link {
  font-size: 9.5px;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: rgba(226,230,244,.38);
  text-decoration: none;
}
.fp-crumb-link:hover { color: rgba(226,230,244,.7); }
.fp-crumb-sep { font-size: 10px; color: rgba(226,230,244,.22); }
.fp-crumb-current {
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px;
  letter-spacing: .08em;
  color: rgba(244,224,170,.9);
}

.fp-search-wrap { padding: 0 14px 12px; display: flex; gap: 8px; }
.fp-search {
  flex: 1;
  min-width: 0;
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  background: rgba(7,8,12,.5);
  outline: none;
  color: rgba(236,240,252,.9);
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px;
  box-sizing: border-box;
}
.fp-search:focus { border-color: rgba(214,170,96,.5); }

.fp-filter-btn {
  position: relative;
  flex: none;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  background: rgba(7,8,12,.5);
  color: rgba(226,230,244,.65);
  cursor: pointer;
  transition: all .18s;
}
.fp-filter-btn:hover { border-color: rgba(214,170,96,.4); color: rgba(244,224,170,.9); }
.fp-filter-btn.active { border-color: rgba(214,170,96,.55); background: rgba(214,170,96,.12); color: rgba(244,224,170,.95); }
.fp-filter-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(214,170,96,.95);
  color: rgba(20,15,6,.95);
  font-size: 9.5px;
  font-weight: 700;
}

.fp-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.fp-list::-webkit-scrollbar { width: 4px; }
.fp-list::-webkit-scrollbar-track { background: transparent; }
.fp-list::-webkit-scrollbar-thumb { background: rgba(214,170,96,.25); border-radius: 2px; }

.fp-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: none;
  color: rgba(226,230,244,.8);
  cursor: pointer;
  text-align: left;
  transition: all .18s;
}
.fp-item:hover {
  background: rgba(255,255,255,.04);
  border-color: rgba(255,255,255,.07);
  color: rgba(236,240,252,.95);
}
.fp-item.active {
  background: rgba(214,170,96,.1);
  border-color: rgba(214,170,96,.38);
  color: rgba(244,224,170,.98);
}

.fp-item-diamond {
  flex: none;
  width: 6px;
  height: 6px;
  background: rgba(214,170,96,.5);
  transform: rotate(45deg);
  transition: background .18s;
}
.fp-item.active .fp-item-diamond { background: rgba(244,224,170,.9); }

.fp-item-body { flex: 1; min-width: 0; }
.fp-item-title {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  letter-spacing: .03em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fp-item-req {
  display: block;
  font-size: 10px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(214,170,96,.7);
  margin-top: 2px;
}
.fp-item.active .fp-item-req { color: rgba(244,224,170,.85); }

.fp-item-source {
  flex: none;
  padding: 3px 8px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: .04em;
  color: rgba(226,230,244,.45);
  cursor: help;
}
.fp-item.active .fp-item-source {
  border-color: rgba(214,170,96,.4);
  color: rgba(244,224,170,.8);
}

.fp-empty { padding: 20px; text-align: center; color: rgba(226,230,244,.4); font-style: italic; }

.fp-sidebar-foot {
  padding: 12px 20px;
  border-top: 1px solid rgba(255,255,255,.06);
}
.fp-total {
  font-size: 9.5px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(226,230,244,.3);
}

/* ---- detail panel ---- */
.fp-detail {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 52px;
  min-height: 100vh;
  box-sizing: border-box;
}

.fp-card {
  position: relative;
  width: 100%;
  max-width: 720px;
  border: 1px solid rgba(214,170,96,.22);
  border-radius: 20px;
  background: rgba(255,255,255,.018);
  padding: 36px 40px 44px;
}

.fp-corner { position: absolute; width: 28px; height: 28px; pointer-events: none; }
.fp-corner-tl { top: 10px; left: 10px; border-top: 1.5px solid rgba(214,170,96,.55); border-left: 1.5px solid rgba(214,170,96,.55); border-radius: 6px 0 0 0; }
.fp-corner-tr { top: 10px; right: 10px; border-top: 1.5px solid rgba(214,170,96,.55); border-right: 1.5px solid rgba(214,170,96,.55); border-radius: 0 6px 0 0; }
.fp-corner-br { bottom: 10px; right: 10px; border-bottom: 1.5px solid rgba(214,170,96,.55); border-right: 1.5px solid rgba(214,170,96,.55); border-radius: 0 0 6px 0; }
.fp-corner-bl { bottom: 10px; left: 10px; border-bottom: 1.5px solid rgba(214,170,96,.55); border-left: 1.5px solid rgba(214,170,96,.55); border-radius: 0 0 0 6px; }

.fp-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}
.fp-card-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(214,170,96,.75);
}
.fp-card-eyebrow a { color: rgba(214,170,96,.75); text-decoration: none; }
.fp-card-eyebrow a:hover { color: rgba(244,224,170,1); }
.fp-eyebrow-sep { color: rgba(226,230,244,.28); }
.fp-close {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 50%;
  background: rgba(7,8,12,.4);
  color: rgba(226,230,244,.6);
  cursor: pointer;
  font-size: 12px;
  transition: all .18s;
}
.fp-close:hover { background: rgba(255,255,255,.08); color: rgba(236,240,252,.95); }

.fp-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 42px;
  letter-spacing: .07em;
  color: rgba(238,242,252,.97);
  margin: 0;
  line-height: 1.05;
}

.fp-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0 20px;
}
.fp-divider::before, .fp-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(214,170,96,.35), transparent);
}
.fp-divider::after { background: linear-gradient(90deg, transparent, rgba(214,170,96,.35)); }
.fp-divider-diamond {
  flex: none;
  width: 7px;
  height: 7px;
  background: rgba(214,170,96,.7);
  transform: rotate(45deg);
}

.fp-badge-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.fp-source-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 999px;
  background: rgba(255,255,255,.03);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
  color: rgba(226,230,244,.65);
  cursor: help;
}
.fp-req-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border: 1px solid rgba(214,170,96,.35);
  border-radius: 999px;
  background: rgba(214,170,96,.07);
}
.fp-req-label {
  font-size: 9.5px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(214,170,96,.7);
}
.fp-req-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px;
  color: rgba(244,224,170,.95);
}

.fp-intro {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(226,230,244,.78);
  margin: 0 0 24px;
}

.fp-block { margin-bottom: 24px; }
.fp-h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Hanken Grotesk';
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(214,170,96,.85);
  margin: 0 0 14px;
}
.fp-h2-dice {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .02em;
  text-transform: none;
  color: rgba(226,230,244,.45);
}

.fp-prof-group { margin-bottom: 14px; }
.fp-prof-group:last-child { margin-bottom: 0; }
.fp-prof-label {
  display: block;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(226,230,244,.4);
  margin-bottom: 6px;
}
.fp-prof-list { display: flex; flex-direction: column; gap: 4px; }
.fp-prof-item {
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(226,230,244,.8);
}
.fp-prof-item strong { color: rgba(244,224,170,.92); font-weight: 600; }

.fp-feature-text {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(226,230,244,.78);
  margin: 0;
}
.fp-feature-text :deep(strong) { color: rgba(244,224,170,.92); font-weight: 600; }
.fp-feature-alt {
  font-size: 13.5px;
  line-height: 1.65;
  color: rgba(226,230,244,.65);
  margin: 10px 0 0;
}
.fp-feature-alt-lbl {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(214,170,96,.7);
}

.fp-quote {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(244,224,170,.75);
  border-left: 2px solid rgba(214,170,96,.35);
  padding: 4px 0 4px 18px;
  margin: 0 0 24px;
}

.fp-personalization {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 15.5px;
  line-height: 1.65;
  color: rgba(226,230,244,.65);
  margin: 0 0 24px;
  padding: 14px 18px;
  border-left: 2px solid rgba(214,170,96,.35);
}

.fp-table-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.fp-table-head .fp-h2 { margin: 0; }
.fp-roll-btn {
  flex: none;
  padding: 7px 18px;
  border: 1px solid rgba(214,170,96,.5);
  border-radius: 999px;
  background: rgba(214,170,96,.12);
  color: rgba(244,224,170,.95);
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  letter-spacing: .04em;
  cursor: pointer;
  transition: all .18s;
}
.fp-roll-btn:hover { border-color: rgba(214,170,96,.8); background: rgba(214,170,96,.22); color: rgba(255,240,190,1); }

.fp-roll-result {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  padding: 12px 16px;
  border: 1px solid rgba(214,170,96,.4);
  border-radius: 12px;
  background: rgba(214,170,96,.1);
}
.fp-roll-result-die {
  flex: none;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(214,170,96,.9);
  color: rgba(20,15,6,.95);
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: 14px;
}
.fp-roll-result-text {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(244,224,170,.95);
  padding-top: 5px;
}
.fp-roll-result-text :deep(strong) { color: rgba(255,240,190,1); }

.fp-roll-table {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 12px;
  overflow: hidden;
}
.fp-roll-row {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: start;
  padding: 10px 14px;
  border-top: 1px solid rgba(255,255,255,.06);
  transition: background .2s;
}
.fp-roll-row:first-child { border-top: 0; }
.fp-roll-row:nth-child(even) { background: rgba(255,255,255,.015); }
.fp-roll-row.hl { background: rgba(214,170,96,.12); }
.fp-roll-die {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: 13px;
  color: rgba(214,170,96,.8);
  text-align: center;
  padding-top: 1px;
}
.fp-roll-text {
  font-size: 13px;
  line-height: 1.55;
  color: rgba(226,230,244,.75);
}
.fp-roll-text :deep(strong) { color: rgba(244,224,170,.92); font-weight: 600; }

/* empty state */
.fp-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 14px;
}
.fp-empty-glyph {
  font-size: 48px;
  color: rgba(214,170,96,.25);
  line-height: 1;
}
.fp-empty-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  letter-spacing: .08em;
  color: rgba(226,230,244,.5);
}
.fp-empty-sub {
  font-size: 13.5px;
  color: rgba(226,230,244,.34);
  max-width: 300px;
  line-height: 1.6;
}

/* transitions */
.fp-fade-enter-active, .fp-fade-leave-active { transition: opacity .18s ease, transform .18s ease; }
.fp-fade-enter-from, .fp-fade-leave-to { opacity: 0; transform: translateY(8px); }

/* breakpoints */
@media (max-width: 900px) {
  .fp { grid-template-columns: 1fr; }
  .fp-sidebar { position: static; height: auto; }
  .fp-detail { padding: 28px 20px; }
  .fp-card { padding: 24px 22px 32px; }
  .fp-title { font-size: 32px; }
}

/* ---- filter panel ---- */
.fp-filter-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 20px;
  background: rgba(5,6,9,.7);
  backdrop-filter: blur(4px);
  overflow-y: auto;
}
.fp-filter-panel {
  width: 100%;
  max-width: 420px;
  border: 1px solid rgba(214,170,96,.25);
  border-radius: 18px;
  background: #0c0e14;
  box-shadow: 0 30px 90px rgba(0,0,0,.6);
  font-family: 'Hanken Grotesk', sans-serif;
  color: rgba(226,230,244,.92);
}
.fp-filter-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.fp-filter-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  letter-spacing: .04em;
  margin: 0;
  color: rgba(238,242,252,.97);
}

.fp-filter-body { padding: 18px 22px; display: flex; flex-direction: column; gap: 20px; }
.fp-filter-group { display: flex; flex-direction: column; gap: 10px; }
.fp-filter-group-head {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(226,230,244,.55);
}

.fp-pill-row { display: flex; flex-wrap: wrap; gap: 8px; }
.fp-pill {
  padding: 7px 15px;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 999px;
  background: rgba(255,255,255,.03);
  color: rgba(226,230,244,.65);
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  letter-spacing: .02em;
  cursor: pointer;
  transition: all .16s;
}
.fp-pill:hover { border-color: rgba(214,170,96,.4); color: rgba(236,240,252,.92); }
.fp-pill.on {
  border-color: rgba(214,170,96,.6);
  background: rgba(214,170,96,.16);
  color: rgba(244,224,170,.98);
  font-weight: 600;
}

.fp-filter-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 22px 20px;
  border-top: 1px solid rgba(255,255,255,.07);
  flex-wrap: wrap;
}
.fp-filter-reset {
  padding: 8px 16px;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 999px;
  background: rgba(255,255,255,.03);
  color: rgba(226,230,244,.7);
  font-family: 'Hanken Grotesk';
  font-size: 12px;
  cursor: pointer;
  transition: all .16s;
}
.fp-filter-reset:hover { border-color: rgba(214,170,96,.4); color: rgba(244,224,170,.9); }
.fp-filter-note { font-size: 11px; font-style: italic; color: rgba(226,230,244,.35); }

.fp-filter-fade-enter-active, .fp-filter-fade-leave-active { transition: opacity .18s ease; }
.fp-filter-fade-enter-from, .fp-filter-fade-leave-to { opacity: 0; }
</style>
