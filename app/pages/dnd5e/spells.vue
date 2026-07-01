<script setup>
import { SPELLS_5E, SPELL_SOURCES, SPELL_LEVELS, SPELL_SCHOOLS, SPELL_TAGS } from '~/data/spells5e.js'

const search = ref('')
const selectedId = ref(null)
const filterOpen = ref(false)

const activeSources = ref(new Set(Object.keys(SPELL_SOURCES)))
const activeLevels = ref(new Set())
const activeSchools = ref(new Set())
const activeTags = ref(new Set())

function toggleInSet(set, value) {
  const next = new Set(set.value)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  set.value = next
}
function toggleSource(id) { toggleInSet(activeSources, id) }
function toggleLevel(id) { toggleInSet(activeLevels, Number(id)) }
function toggleSchool(id) { toggleInSet(activeSchools, id) }
function toggleTag(id) { toggleInSet(activeTags, id) }

const activeFilterCount = computed(() =>
  (activeSources.value.size < Object.keys(SPELL_SOURCES).length ? 1 : 0) +
  activeLevels.value.size +
  activeSchools.value.size +
  activeTags.value.size
)
function resetFilters() {
  activeSources.value = new Set(Object.keys(SPELL_SOURCES))
  activeLevels.value = new Set()
  activeSchools.value = new Set()
  activeTags.value = new Set()
}

useSeoMeta({
  title: 'Заклинания — TKK.club',
  description: 'Заклинания D&D 5e для мира Эноа.'
})

const filteredSpells = computed(() => {
  const q = search.value.trim().toLowerCase()
  return SPELLS_5E.filter(spell => {
    if (!activeSources.value.has(spell.source)) return false
    if (activeLevels.value.size && !activeLevels.value.has(spell.level)) return false
    if (activeSchools.value.size && !activeSchools.value.has(spell.school)) return false
    if (activeTags.value.size && !spell.tags.some(t => activeTags.value.has(t))) return false
    if (!q) return true
    return spell.title.toLowerCase().includes(q) ||
      spell.description.toLowerCase().includes(q) ||
      spell.components.toLowerCase().includes(q) ||
      spell.sections.some(s => s.title.toLowerCase().includes(q) || s.text.toLowerCase().includes(q))
  })
})

const selectedSpell = computed(() => SPELLS_5E.find(spell => spell.id === selectedId.value) || null)

function select(id) { selectedId.value = selectedId.value === id ? null : id }
function sourceName(id) { return SPELL_SOURCES[id] || id }
function levelName(level) { return SPELL_LEVELS[level] || `${level} уровень` }
function schoolName(id) { return SPELL_SCHOOLS[id] || id }
function tagName(id) { return SPELL_TAGS[id] || id }

function onKeydown(e) { if (e.key === 'Escape') { filterOpen.value = false; selectedId.value = null } }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="sp">
    <aside class="sp-sidebar">
      <div class="sp-sidebar-head">
        <NuxtLink to="/?system=5e" class="sp-back" title="К карте D&D 5e">
          <img src="/assets/knot-main.png" width="22" height="22" style="display:block;object-fit:contain">
        </NuxtLink>
        <div class="sp-wordmark">
          <div class="sp-wordmark-eyebrow">Threads of the Knot of Knots</div>
          <div class="sp-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
        </div>
      </div>

      <nav class="sp-crumb">
        <NuxtLink to="/" class="sp-crumb-link">Системы</NuxtLink>
        <span class="sp-crumb-sep">/</span>
        <NuxtLink to="/?system=5e" class="sp-crumb-link">D&D 5e</NuxtLink>
        <span class="sp-crumb-sep">/</span>
        <span class="sp-crumb-current">Заклинания</span>
      </nav>

      <div class="sp-search-wrap">
        <input v-model="search" class="sp-search" type="search" placeholder="Поиск заклинания...">
        <button type="button" class="sp-filter-btn" :class="{ active: activeFilterCount > 0 }" title="Фильтр" @click="filterOpen = true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
          <span v-if="activeFilterCount" class="sp-filter-badge">{{ activeFilterCount }}</span>
        </button>
      </div>

      <div class="sp-list">
        <button v-for="spell in filteredSpells" :key="spell.id" type="button" class="sp-item" :class="{ active: selectedId === spell.id }" @click="select(spell.id)">
          <span class="sp-item-diamond" />
          <span class="sp-item-body">
            <span class="sp-item-title">{{ spell.title }}</span>
            <span class="sp-item-req">{{ levelName(spell.level) }} · {{ schoolName(spell.school) }}</span>
          </span>
          <span class="sp-item-source" :title="sourceName(spell.source)">{{ spell.source }}</span>
        </button>
        <div v-if="filteredSpells.length === 0" class="sp-empty">Ничего не найдено</div>
      </div>

      <div class="sp-sidebar-foot">
        <span class="sp-total">{{ SPELLS_5E.length }} заклинаний</span>
      </div>
    </aside>

    <main class="sp-detail">
      <transition name="sp-fade" mode="out-in">
        <div v-if="selectedSpell" :key="selectedSpell.id" class="sp-card">
          <span class="sp-corner sp-corner-tl" /><span class="sp-corner sp-corner-tr" />
          <span class="sp-corner sp-corner-br" /><span class="sp-corner sp-corner-bl" />

          <div class="sp-card-top">
            <div class="sp-card-eyebrow">
              <NuxtLink to="/?system=5e">D&D 5e</NuxtLink>
              <span class="sp-eyebrow-sep">/</span>
              <span>Заклинания</span>
            </div>
            <button class="sp-close" type="button" title="Закрыть" @click="selectedId = null">✕</button>
          </div>

          <h1 class="sp-title">{{ selectedSpell.title.toUpperCase() }}</h1>
          <span class="sp-subtitle">{{ levelName(selectedSpell.level) }} · {{ schoolName(selectedSpell.school) }}</span>
          <div class="sp-divider"><span class="sp-divider-diamond" /></div>

          <div class="sp-badge-row">
            <span class="sp-source-badge" :title="sourceName(selectedSpell.source)">{{ selectedSpell.source }}</span>
            <span v-for="tag in selectedSpell.tags" :key="tag" class="sp-cat-badge">{{ tagName(tag) }}</span>
          </div>

          <div class="sp-stat-grid">
            <div class="sp-stat">
              <span class="sp-stat-label">Сотворение</span>
              <span class="sp-stat-value">{{ selectedSpell.castingTime }}</span>
            </div>
            <div class="sp-stat">
              <span class="sp-stat-label">Дистанция</span>
              <span class="sp-stat-value">{{ selectedSpell.range }}</span>
            </div>
            <div class="sp-stat">
              <span class="sp-stat-label">Компоненты</span>
              <span class="sp-stat-value">{{ selectedSpell.components }}</span>
            </div>
            <div class="sp-stat">
              <span class="sp-stat-label">Длительность</span>
              <span class="sp-stat-value">{{ selectedSpell.duration }}</span>
            </div>
            <div class="sp-stat">
              <span class="sp-stat-label">Классы</span>
              <span class="sp-stat-value">{{ selectedSpell.classes.length ? selectedSpell.classes.join(', ') : '—' }}</span>
            </div>
          </div>

          <p class="sp-lore">{{ selectedSpell.description }}</p>

          <div v-for="section in selectedSpell.sections" :key="section.title" class="sp-block">
            <h2 class="sp-h2">{{ section.title }}</h2>
            <p>{{ section.text }}</p>
          </div>
        </div>

        <div v-else class="sp-empty-state">
          <div class="sp-empty-glyph">✦</div>
          <div class="sp-empty-title">Выберите заклинание</div>
          <div class="sp-empty-sub">Выберите заклинание из списка слева, чтобы увидеть подробное описание.</div>
        </div>
      </transition>
    </main>

    <Teleport to="body">
      <transition name="sp-filter-fade">
        <div v-if="filterOpen" class="sp-filter-overlay" @click="filterOpen = false">
          <div class="sp-filter-panel" @click.stop>
            <div class="sp-filter-head">
              <h2 class="sp-filter-title">Фильтр</h2>
              <button class="sp-close" type="button" title="Закрыть" @click="filterOpen = false">✕</button>
            </div>
            <div class="sp-filter-body">
              <div class="sp-filter-group">
                <div class="sp-filter-group-head">Уровень</div>
                <div class="sp-pill-row">
                  <button v-for="(name, id) in SPELL_LEVELS" :key="id" type="button" class="sp-pill" :class="{ on: activeLevels.has(Number(id)) }" @click="toggleLevel(id)">{{ name }}</button>
                </div>
              </div>
              <div class="sp-filter-group">
                <div class="sp-filter-group-head">Школа</div>
                <div class="sp-pill-row">
                  <button v-for="(name, id) in SPELL_SCHOOLS" :key="id" type="button" class="sp-pill" :class="{ on: activeSchools.has(id) }" @click="toggleSchool(id)">{{ name }}</button>
                </div>
              </div>
              <div class="sp-filter-group">
                <div class="sp-filter-group-head">Метки</div>
                <div class="sp-pill-row">
                  <button v-for="(name, id) in SPELL_TAGS" :key="id" type="button" class="sp-pill" :class="{ on: activeTags.has(id) }" @click="toggleTag(id)">{{ name }}</button>
                </div>
              </div>
              <div class="sp-filter-group">
                <div class="sp-filter-group-head">Источники нитей</div>
                <div class="sp-pill-row">
                  <button v-for="(name, id) in SPELL_SOURCES" :key="id" type="button" class="sp-pill" :class="{ on: activeSources.has(id) }" :title="name" @click="toggleSource(id)">{{ id }}</button>
                </div>
              </div>
            </div>
            <div class="sp-filter-foot">
              <button type="button" class="sp-filter-reset" @click="resetFilters">Сбросить фильтры</button>
              <span class="sp-filter-note">Фильтры применяются автоматически!</span>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.sp{display:grid;grid-template-columns:320px 1fr;min-height:100vh;background:radial-gradient(130% 120% at 50% 0%,#0c0e14 0%,#070810 52%,#040406 100%);color:rgba(226,230,244,.92);font-family:'Hanken Grotesk',sans-serif}.sp-sidebar{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.07);background:rgba(7,8,12,.55);backdrop-filter:blur(12px);overflow:hidden}.sp-sidebar-head{display:flex;align-items:center;gap:14px;padding:18px 20px 14px;border-bottom:1px solid rgba(255,255,255,.06)}.sp-back{flex:none;width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:10px;transition:background .2s}.sp-back:hover{background:rgba(255,255,255,.06)}.sp-wordmark-eyebrow{font-size:8.5px;letter-spacing:.38em;text-transform:uppercase;color:rgba(226,230,244,.38)}.sp-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:17px;letter-spacing:.28em;color:rgba(232,236,250,.9);margin-top:2px}.sp-crumb{display:flex;align-items:center;gap:7px;padding:10px 20px;flex-wrap:wrap}.sp-crumb-link{font-size:9.5px;letter-spacing:.28em;text-transform:uppercase;color:rgba(226,230,244,.38);text-decoration:none}.sp-crumb-link:hover{color:rgba(226,230,244,.7)}.sp-crumb-sep{font-size:10px;color:rgba(226,230,244,.22)}.sp-crumb-current{font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.08em;color:rgba(244,224,170,.9)}.sp-search-wrap{padding:0 14px 12px;display:flex;gap:8px}.sp-search{flex:1;min-width:0;min-height:38px;padding:0 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);outline:none;color:rgba(236,240,252,.9);font-family:'Cormorant Garamond',serif;font-size:15px;box-sizing:border-box}.sp-search:focus{border-color:rgba(214,170,96,.5)}.sp-filter-btn{position:relative;flex:none;width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);color:rgba(226,230,244,.65);cursor:pointer;transition:all .18s}.sp-filter-btn:hover{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.9)}.sp-filter-btn.active{border-color:rgba(214,170,96,.55);background:rgba(214,170,96,.12);color:rgba(244,224,170,.95)}.sp-filter-badge{position:absolute;top:-4px;right:-4px;width:16px;height:16px;display:grid;place-items:center;border-radius:50%;background:rgba(214,170,96,.95);color:rgba(20,15,6,.95);font-size:9.5px;font-weight:700}.sp-list{flex:1;overflow-y:auto;padding:4px 10px 8px;display:flex;flex-direction:column;gap:3px}.sp-list::-webkit-scrollbar{width:4px}.sp-list::-webkit-scrollbar-track{background:transparent}.sp-list::-webkit-scrollbar-thumb{background:rgba(214,170,96,.25);border-radius:2px}.sp-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid transparent;border-radius:12px;background:none;color:rgba(226,230,244,.8);cursor:pointer;text-align:left;transition:all .18s}.sp-item:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.07);color:rgba(236,240,252,.95)}.sp-item.active{background:rgba(214,170,96,.1);border-color:rgba(214,170,96,.38);color:rgba(244,224,170,.98)}.sp-item-diamond{flex:none;width:6px;height:6px;background:rgba(214,170,96,.5);transform:rotate(45deg);transition:background .18s}.sp-item.active .sp-item-diamond{background:rgba(244,224,170,.9)}.sp-item-body{flex:1;min-width:0}.sp-item-title{display:block;font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:.03em;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sp-item-req{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(214,170,96,.7);margin-top:2px}.sp-item-source{flex:none;padding:3px 8px;border:1px solid rgba(255,255,255,.12);border-radius:999px;font-size:9.5px;font-weight:700;letter-spacing:.04em;color:rgba(226,230,244,.45);cursor:help}.sp-empty{padding:20px;text-align:center;color:rgba(226,230,244,.4);font-style:italic}.sp-sidebar-foot{padding:12px 20px;border-top:1px solid rgba(255,255,255,.06)}.sp-total{font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,230,244,.3)}
.sp-detail{display:flex;align-items:flex-start;justify-content:center;padding:48px 52px;min-height:100vh;box-sizing:border-box}.sp-card{position:relative;width:100%;max-width:760px;border:1px solid rgba(214,170,96,.22);border-radius:20px;background:rgba(255,255,255,.018);padding:36px 40px 44px}.sp-corner{position:absolute;width:28px;height:28px;pointer-events:none}.sp-corner-tl{top:10px;left:10px;border-top:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:6px 0 0 0}.sp-corner-tr{top:10px;right:10px;border-top:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 6px 0 0}.sp-corner-br{bottom:10px;right:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 0 6px 0}.sp-corner-bl{bottom:10px;left:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:0 0 0 6px}.sp-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.sp-card-eyebrow{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(214,170,96,.75)}.sp-card-eyebrow a{color:rgba(214,170,96,.75);text-decoration:none}.sp-card-eyebrow a:hover{color:rgba(244,224,170,1)}.sp-eyebrow-sep{color:rgba(226,230,244,.28)}.sp-close{width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(7,8,12,.4);color:rgba(226,230,244,.6);cursor:pointer;font-size:12px;transition:all .18s}.sp-close:hover{background:rgba(255,255,255,.08);color:rgba(236,240,252,.95)}.sp-title{font-family:'Cormorant Garamond',serif;font-size:42px;letter-spacing:.07em;color:rgba(238,242,252,.97);margin:0;line-height:1.05}.sp-subtitle{display:block;font-size:12px;letter-spacing:.1em;font-style:italic;color:rgba(226,230,244,.4);margin-top:4px}.sp-divider{display:flex;align-items:center;gap:10px;margin:16px 0 20px}.sp-divider::before,.sp-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(214,170,96,.35),transparent)}.sp-divider::after{background:linear-gradient(90deg,transparent,rgba(214,170,96,.35))}.sp-divider-diamond{flex:none;width:7px;height:7px;background:rgba(214,170,96,.7);transform:rotate(45deg)}.sp-badge-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:22px}.sp-source-badge,.sp-cat-badge{display:inline-flex;align-items:center;padding:8px 14px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.03);font-size:11px;font-weight:700;letter-spacing:.06em;color:rgba(226,230,244,.65)}.sp-cat-badge{border-color:rgba(214,170,96,.35);background:rgba(214,170,96,.07);font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;letter-spacing:.02em;color:rgba(244,224,170,.95)}.sp-stat-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:20px}.sp-stat{display:flex;flex-direction:column;gap:5px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.02)}.sp-stat-label{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45)}.sp-stat-value{font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(236,240,252,.92);line-height:1.35}.sp-lore{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;line-height:1.7;color:rgba(226,230,244,.72);margin:0 0 22px}.sp-block{margin-top:18px;padding:16px 18px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.018)}.sp-h2{font-family:'Hanken Grotesk';font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(214,170,96,.85);margin:0 0 10px}.sp-block p{margin:0;font-size:14px;line-height:1.68;color:rgba(226,230,244,.78)}
.sp-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;gap:14px}.sp-empty-glyph{font-size:48px;color:rgba(214,170,96,.25);line-height:1}.sp-empty-title{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.08em;color:rgba(226,230,244,.5)}.sp-empty-sub{font-size:13.5px;color:rgba(226,230,244,.34);max-width:300px;line-height:1.6}.sp-fade-enter-active,.sp-fade-leave-active{transition:opacity .18s ease,transform .18s ease}.sp-fade-enter-from,.sp-fade-leave-to{opacity:0;transform:translateY(8px)}
.sp-filter-overlay{position:fixed;inset:0;z-index:300;display:flex;align-items:flex-start;justify-content:center;padding:60px 20px;background:rgba(5,6,9,.7);backdrop-filter:blur(4px);overflow-y:auto}.sp-filter-panel{width:100%;max-width:460px;border:1px solid rgba(214,170,96,.25);border-radius:18px;background:#0c0e14;box-shadow:0 30px 90px rgba(0,0,0,.6);font-family:'Hanken Grotesk',sans-serif;color:rgba(226,230,244,.92)}.sp-filter-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid rgba(255,255,255,.07)}.sp-filter-title{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.04em;margin:0;color:rgba(238,242,252,.97)}.sp-filter-body{padding:18px 22px;display:flex;flex-direction:column;gap:20px;max-height:60vh;overflow-y:auto}.sp-filter-group{display:flex;flex-direction:column;gap:10px}.sp-filter-group-head{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(226,230,244,.55)}.sp-pill-row{display:flex;flex-wrap:wrap;gap:8px}.sp-pill{padding:7px 15px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.65);font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.02em;cursor:pointer;transition:all .16s}.sp-pill:hover{border-color:rgba(214,170,96,.4);color:rgba(236,240,252,.92)}.sp-pill.on{border-color:rgba(214,170,96,.6);background:rgba(214,170,96,.16);color:rgba(244,224,170,.98);font-weight:600}.sp-filter-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 20px;border-top:1px solid rgba(255,255,255,.07);flex-wrap:wrap}.sp-filter-reset{padding:8px 16px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.7);font-family:'Hanken Grotesk';font-size:12px;cursor:pointer;transition:all .16s}.sp-filter-reset:hover{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.9)}.sp-filter-note{font-size:11px;font-style:italic;color:rgba(226,230,244,.35)}.sp-filter-fade-enter-active,.sp-filter-fade-leave-active{transition:opacity .18s ease}.sp-filter-fade-enter-from,.sp-filter-fade-leave-to{opacity:0}@media (max-width:900px){.sp{grid-template-columns:1fr}.sp-sidebar{position:static;height:auto}.sp-detail{padding:28px 20px}.sp-card{padding:24px 22px 32px}.sp-title{font-size:32px}.sp-stat-grid{grid-template-columns:1fr}}
</style>
