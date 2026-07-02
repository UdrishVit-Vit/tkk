<script setup>
import { BESTIARY_5E, BESTIARY_SOURCES, CREATURE_SIZES, CREATURE_TYPES, CREATURE_TAGS } from '~/data/bestiary5e.js'

const search = ref('')
const selectedId = ref(null)
const filterOpen = ref(false)

const activeSources = ref(new Set(Object.keys(BESTIARY_SOURCES)))
const activeSizes = ref(new Set())
const activeTypes = ref(new Set())
const activeTags = ref(new Set())

function toggleInSet(set, value) {
  const next = new Set(set.value)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  set.value = next
}
function toggleSource(id) { toggleInSet(activeSources, id) }
function toggleSize(id) { toggleInSet(activeSizes, id) }
function toggleType(id) { toggleInSet(activeTypes, id) }
function toggleTag(id) { toggleInSet(activeTags, id) }

const activeFilterCount = computed(() =>
  (activeSources.value.size < Object.keys(BESTIARY_SOURCES).length ? 1 : 0) +
  activeSizes.value.size +
  activeTypes.value.size +
  activeTags.value.size
)
function resetFilters() {
  activeSources.value = new Set(Object.keys(BESTIARY_SOURCES))
  activeSizes.value = new Set()
  activeTypes.value = new Set()
  activeTags.value = new Set()
}

useSeoMeta({
  title: 'Бестиарий — TKK.club',
  description: 'Монстры D&D 5e для мира Эноа.'
})

const filteredCreatures = computed(() => {
  const q = search.value.trim().toLowerCase()
  return BESTIARY_5E.filter(c => {
    if (!activeSources.value.has(c.source)) return false
    if (activeSizes.value.size && !activeSizes.value.has(c.size)) return false
    if (activeTypes.value.size && !activeTypes.value.has(c.type)) return false
    if (activeTags.value.size && !c.tags.some(t => activeTags.value.has(t))) return false
    if (!q) return true
    return c.name.toLowerCase().includes(q) ||
      c.lore.toLowerCase().includes(q) ||
      c.traits.some(t => t.join(' ').toLowerCase().includes(q)) ||
      c.actions.some(a => a.join(' ').toLowerCase().includes(q))
  })
})

const selectedCreature = computed(() => BESTIARY_5E.find(c => c.id === selectedId.value) || null)

function select(id) { selectedId.value = selectedId.value === id ? null : id }
function sourceName(id) { return BESTIARY_SOURCES[id] || id }
function sizeName(id) { return CREATURE_SIZES[id] || id }
function typeName(id) { return CREATURE_TYPES[id] || id }
function tagName(id) { return CREATURE_TAGS[id] || id }
function traitText(list) { return list.map(([name, text]) => ({ name, text })) }

function onKeydown(e) { if (e.key === 'Escape') { filterOpen.value = false; selectedId.value = null } }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="bp">
    <aside class="bp-sidebar">
      <div class="bp-sidebar-head">
        <NuxtLink to="/dnd5e" class="bp-back" title="К карте D&D 5e">
          <img src="/assets/knot-main.png" width="22" height="22" style="display:block;object-fit:contain">
        </NuxtLink>
        <div class="bp-wordmark">
          <div class="bp-wordmark-eyebrow">Threads of the Knot of Knots</div>
          <div class="bp-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
        </div>
      </div>

      <nav class="bp-crumb">
        <NuxtLink to="/" class="bp-crumb-link">Системы</NuxtLink>
        <span class="bp-crumb-sep">/</span>
        <NuxtLink to="/dnd5e" class="bp-crumb-link">D&D 5e</NuxtLink>
        <span class="bp-crumb-sep">/</span>
        <span class="bp-crumb-current">Бестиарий</span>
      </nav>

      <div class="bp-search-wrap">
        <input v-model="search" class="bp-search" type="search" placeholder="Поиск существа...">
        <button type="button" class="bp-filter-btn" :class="{ active: activeFilterCount > 0 }" title="Фильтр" @click="filterOpen = true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
          <span v-if="activeFilterCount" class="bp-filter-badge">{{ activeFilterCount }}</span>
        </button>
      </div>

      <div class="bp-list">
        <button v-for="c in filteredCreatures" :key="c.id" type="button" class="bp-item" :class="{ active: selectedId === c.id }" @click="select(c.id)">
          <span class="bp-item-diamond" />
          <span class="bp-item-body">
            <span class="bp-item-title">{{ c.name }}</span>
            <span class="bp-item-req">{{ sizeName(c.size) }} {{ typeName(c.type) }} · CR {{ c.cr }}</span>
          </span>
          <span class="bp-item-source" :title="sourceName(c.source)">{{ c.source }}</span>
        </button>
        <div v-if="filteredCreatures.length === 0" class="bp-empty">Ничего не найдено</div>
      </div>

      <div class="bp-sidebar-foot">
        <span class="bp-total">{{ BESTIARY_5E.length }} существ</span>
      </div>
    </aside>

    <main class="bp-detail">
      <transition name="bp-fade" mode="out-in">
        <div v-if="selectedCreature" :key="selectedCreature.id" class="bp-card">
          <span class="bp-corner bp-corner-tl" /><span class="bp-corner bp-corner-tr" />
          <span class="bp-corner bp-corner-br" /><span class="bp-corner bp-corner-bl" />

          <div class="bp-card-top">
            <div class="bp-card-eyebrow">
              <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
              <span class="bp-eyebrow-sep">/</span>
              <span>Бестиарий</span>
            </div>
            <button class="bp-close" type="button" title="Закрыть" @click="selectedId = null">✕</button>
          </div>

          <h1 class="bp-title">{{ selectedCreature.name.toUpperCase() }}</h1>
          <span class="bp-subtitle">{{ sizeName(selectedCreature.size) }} {{ typeName(selectedCreature.type) }} · CR {{ selectedCreature.cr }}</span>
          <div class="bp-divider"><span class="bp-divider-diamond" /></div>

          <div class="bp-badge-row">
            <span class="bp-source-badge" :title="sourceName(selectedCreature.source)">{{ selectedCreature.source }}</span>
            <span v-for="tag in selectedCreature.tags" :key="tag" class="bp-cat-badge">{{ tagName(tag) }}</span>
          </div>

          <p v-if="selectedCreature.lore" class="bp-lore">{{ selectedCreature.lore }}</p>

          <div class="bp-stat-grid">
            <div class="bp-stat"><span class="bp-stat-label">КД</span><span class="bp-stat-value">{{ selectedCreature.armorClass }}</span></div>
            <div class="bp-stat"><span class="bp-stat-label">Хиты</span><span class="bp-stat-value">{{ selectedCreature.hitPoints }}</span></div>
            <div class="bp-stat"><span class="bp-stat-label">Скорость</span><span class="bp-stat-value">{{ selectedCreature.speed }}</span></div>
            <div v-if="selectedCreature.proficiencyBonus" class="bp-stat"><span class="bp-stat-label">Бонус мастерства</span><span class="bp-stat-value">{{ selectedCreature.proficiencyBonus }}</span></div>
          </div>

          <div class="bp-abilities">
            <div v-for="(value, key) in selectedCreature.stats" :key="key" class="bp-ability">
              <span>{{ key.toUpperCase() }}</span>
              <strong>{{ value }}</strong>
            </div>
          </div>

          <div class="bp-lines">
            <div><strong>Спасброски:</strong> {{ selectedCreature.savingThrows }}</div>
            <div><strong>Навыки:</strong> {{ selectedCreature.skills }}</div>
            <div><strong>Сопротивление урону:</strong> {{ selectedCreature.damageResistances }}</div>
            <div><strong>Иммунитет к урону:</strong> {{ selectedCreature.damageImmunities }}</div>
            <div><strong>Иммунитет к состояниям:</strong> {{ selectedCreature.conditionImmunities }}</div>
            <div><strong>Чувства:</strong> {{ selectedCreature.senses }}</div>
            <div><strong>Языки:</strong> {{ selectedCreature.languages }}</div>
          </div>

          <div v-if="selectedCreature.traits.length" class="bp-section">
            <h2 class="bp-h2">Особенности</h2>
            <p v-for="t in traitText(selectedCreature.traits)" :key="t.name"><strong>{{ t.name }}.</strong> {{ t.text }}</p>
          </div>
          <div v-if="selectedCreature.actions.length" class="bp-section">
            <h2 class="bp-h2">Действия</h2>
            <p v-for="a in traitText(selectedCreature.actions)" :key="a.name"><strong>{{ a.name }}.</strong> {{ a.text }}</p>
          </div>
          <div v-if="selectedCreature.bonusActions.length" class="bp-section">
            <h2 class="bp-h2">Бонусные действия</h2>
            <p v-for="a in traitText(selectedCreature.bonusActions)" :key="a.name"><strong>{{ a.name }}.</strong> {{ a.text }}</p>
          </div>
          <div v-if="selectedCreature.reactions.length" class="bp-section">
            <h2 class="bp-h2">Реакции</h2>
            <p v-for="r in traitText(selectedCreature.reactions)" :key="r.name"><strong>{{ r.name }}.</strong> {{ r.text }}</p>
          </div>
          <div v-if="selectedCreature.legendaryActions.length" class="bp-section">
            <h2 class="bp-h2">Легендарные действия</h2>
            <p v-for="a in traitText(selectedCreature.legendaryActions)" :key="a.name"><strong>{{ a.name }}.</strong> {{ a.text }}</p>
          </div>
        </div>

        <div v-else class="bp-empty-state">
          <div class="bp-empty-glyph">✦</div>
          <div class="bp-empty-title">Выберите существо</div>
          <div class="bp-empty-sub">Выберите запись из списка слева, чтобы увидеть статблок.</div>
        </div>
      </transition>
    </main>

    <Teleport to="body">
      <transition name="bp-filter-fade">
        <div v-if="filterOpen" class="bp-filter-overlay" @click="filterOpen = false">
          <div class="bp-filter-panel" @click.stop>
            <div class="bp-filter-head">
              <h2 class="bp-filter-title">Фильтр</h2>
              <button class="bp-close" type="button" title="Закрыть" @click="filterOpen = false">✕</button>
            </div>
            <div class="bp-filter-body">
              <div class="bp-filter-group"><div class="bp-filter-group-head">Размер</div><div class="bp-pill-row"><button v-for="(name,id) in CREATURE_SIZES" :key="id" class="bp-pill" :class="{ on: activeSizes.has(id) }" @click="toggleSize(id)">{{ name }}</button></div></div>
              <div class="bp-filter-group"><div class="bp-filter-group-head">Тип</div><div class="bp-pill-row"><button v-for="(name,id) in CREATURE_TYPES" :key="id" class="bp-pill" :class="{ on: activeTypes.has(id) }" @click="toggleType(id)">{{ name }}</button></div></div>
              <div class="bp-filter-group"><div class="bp-filter-group-head">Метки</div><div class="bp-pill-row"><button v-for="(name,id) in CREATURE_TAGS" :key="id" class="bp-pill" :class="{ on: activeTags.has(id) }" @click="toggleTag(id)">{{ name }}</button></div></div>
              <div class="bp-filter-group"><div class="bp-filter-group-head">Источники нитей</div><div class="bp-pill-row"><button v-for="(name,id) in BESTIARY_SOURCES" :key="id" class="bp-pill" :class="{ on: activeSources.has(id) }" :title="name" @click="toggleSource(id)">{{ id }}</button></div></div>
            </div>
            <div class="bp-filter-foot">
              <button type="button" class="bp-filter-reset" @click="resetFilters">Сбросить фильтры</button>
              <span class="bp-filter-note">Фильтры применяются автоматически!</span>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.bp{display:grid;grid-template-columns:320px 1fr;min-height:100vh;background:radial-gradient(130% 120% at 50% 0%,#0c0e14 0%,#070810 52%,#040406 100%);color:rgba(226,230,244,.92);font-family:'Hanken Grotesk',sans-serif}.bp-sidebar{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.07);background:rgba(7,8,12,.55);backdrop-filter:blur(12px);overflow:hidden}.bp-sidebar-head{display:flex;align-items:center;gap:14px;padding:18px 20px 14px;border-bottom:1px solid rgba(255,255,255,.06)}.bp-back{flex:none;width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:10px;transition:background .2s}.bp-back:hover{background:rgba(255,255,255,.06)}.bp-wordmark-eyebrow{font-size:8.5px;letter-spacing:.38em;text-transform:uppercase;color:rgba(226,230,244,.38)}.bp-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:17px;letter-spacing:.28em;color:rgba(232,236,250,.9);margin-top:2px}.bp-crumb{display:flex;align-items:center;gap:7px;padding:10px 20px;flex-wrap:wrap}.bp-crumb-link{font-size:9.5px;letter-spacing:.28em;text-transform:uppercase;color:rgba(226,230,244,.38);text-decoration:none}.bp-crumb-link:hover{color:rgba(226,230,244,.7)}.bp-crumb-sep{font-size:10px;color:rgba(226,230,244,.22)}.bp-crumb-current{font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.08em;color:rgba(244,224,170,.9)}.bp-search-wrap{padding:0 14px 12px;display:flex;gap:8px}.bp-search{flex:1;min-width:0;min-height:38px;padding:0 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);outline:none;color:rgba(236,240,252,.9);font-family:'Cormorant Garamond',serif;font-size:15px;box-sizing:border-box}.bp-search:focus{border-color:rgba(214,170,96,.5)}.bp-filter-btn{position:relative;flex:none;width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);color:rgba(226,230,244,.65);cursor:pointer;transition:all .18s}.bp-filter-btn:hover{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.9)}.bp-filter-btn.active{border-color:rgba(214,170,96,.55);background:rgba(214,170,96,.12);color:rgba(244,224,170,.95)}.bp-filter-badge{position:absolute;top:-4px;right:-4px;width:16px;height:16px;display:grid;place-items:center;border-radius:50%;background:rgba(214,170,96,.95);color:rgba(20,15,6,.95);font-size:9.5px;font-weight:700}.bp-list{flex:1;overflow-y:auto;padding:4px 10px 8px;display:flex;flex-direction:column;gap:3px}.bp-list::-webkit-scrollbar{width:4px}.bp-list::-webkit-scrollbar-thumb{background:rgba(214,170,96,.25);border-radius:2px}.bp-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid transparent;border-radius:12px;background:none;color:rgba(226,230,244,.8);cursor:pointer;text-align:left;transition:all .18s}.bp-item:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.07);color:rgba(236,240,252,.95)}.bp-item.active{background:rgba(214,170,96,.1);border-color:rgba(214,170,96,.38);color:rgba(244,224,170,.98)}.bp-item-diamond{flex:none;width:6px;height:6px;background:rgba(214,170,96,.5);transform:rotate(45deg)}.bp-item-body{flex:1;min-width:0}.bp-item-title{display:block;font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:.03em;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bp-item-req{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(214,170,96,.7);margin-top:2px}.bp-item-source{flex:none;padding:3px 8px;border:1px solid rgba(255,255,255,.12);border-radius:999px;font-size:9.5px;font-weight:700;letter-spacing:.04em;color:rgba(226,230,244,.45)}.bp-empty{padding:20px;text-align:center;color:rgba(226,230,244,.4);font-style:italic}.bp-sidebar-foot{padding:12px 20px;border-top:1px solid rgba(255,255,255,.06)}.bp-total{font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,230,244,.3)}
.bp-detail{display:flex;align-items:flex-start;justify-content:center;padding:48px 52px;min-height:100vh;box-sizing:border-box}.bp-card{position:relative;width:100%;max-width:820px;border:1px solid rgba(214,170,96,.22);border-radius:20px;background:rgba(255,255,255,.018);padding:36px 40px 44px}.bp-corner{position:absolute;width:28px;height:28px;pointer-events:none}.bp-corner-tl{top:10px;left:10px;border-top:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:6px 0 0 0}.bp-corner-tr{top:10px;right:10px;border-top:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 6px 0 0}.bp-corner-br{bottom:10px;right:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 0 6px 0}.bp-corner-bl{bottom:10px;left:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:0 0 0 6px}.bp-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.bp-card-eyebrow{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(214,170,96,.75)}.bp-card-eyebrow a{color:rgba(214,170,96,.75);text-decoration:none}.bp-eyebrow-sep{color:rgba(226,230,244,.28)}.bp-close{width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(7,8,12,.4);color:rgba(226,230,244,.6);cursor:pointer;font-size:12px}.bp-title{font-family:'Cormorant Garamond',serif;font-size:42px;letter-spacing:.07em;color:rgba(238,242,252,.97);margin:0;line-height:1.05}.bp-subtitle{display:block;font-size:12px;letter-spacing:.1em;font-style:italic;color:rgba(226,230,244,.45);margin-top:4px}.bp-divider{display:flex;align-items:center;gap:10px;margin:16px 0 20px}.bp-divider::before,.bp-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(214,170,96,.35),transparent)}.bp-divider::after{background:linear-gradient(90deg,transparent,rgba(214,170,96,.35))}.bp-divider-diamond{flex:none;width:7px;height:7px;background:rgba(214,170,96,.7);transform:rotate(45deg)}.bp-badge-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:20px}.bp-source-badge,.bp-cat-badge{display:inline-flex;align-items:center;padding:8px 14px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.03);font-size:11px;font-weight:700;letter-spacing:.06em;color:rgba(226,230,244,.65)}.bp-cat-badge{border-color:rgba(214,170,96,.35);background:rgba(214,170,96,.07);font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:rgba(244,224,170,.95)}.bp-lore{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;line-height:1.7;color:rgba(226,230,244,.7);margin:0 0 22px}.bp-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:18px}.bp-stat{display:flex;flex-direction:column;gap:5px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.02)}.bp-stat-label{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45)}.bp-stat-value{font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(236,240,252,.92);line-height:1.35}.bp-abilities{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin:18px 0}.bp-ability{display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 6px;border:1px solid rgba(214,170,96,.18);border-radius:10px;background:rgba(214,170,96,.04)}.bp-ability span{font-size:10px;letter-spacing:.14em;color:rgba(214,170,96,.7)}.bp-ability strong{font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(236,240,252,.94)}.bp-lines{display:grid;gap:7px;margin:16px 0 20px;font-size:13.5px;line-height:1.5;color:rgba(226,230,244,.76)}.bp-lines strong{color:rgba(244,224,170,.9)}.bp-section{margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)}.bp-h2{font-family:'Hanken Grotesk';font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(214,170,96,.85);margin:0 0 10px}.bp-section p{margin:0 0 11px;font-size:14px;line-height:1.68;color:rgba(226,230,244,.78)}.bp-section p:last-child{margin-bottom:0}.bp-section strong{color:rgba(244,224,170,.92)}
.bp-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;gap:14px}.bp-empty-glyph{font-size:48px;color:rgba(214,170,96,.25);line-height:1}.bp-empty-title{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.08em;color:rgba(226,230,244,.5)}.bp-empty-sub{font-size:13.5px;color:rgba(226,230,244,.34);max-width:300px;line-height:1.6}.bp-fade-enter-active,.bp-fade-leave-active{transition:opacity .18s ease,transform .18s ease}.bp-fade-enter-from,.bp-fade-leave-to{opacity:0;transform:translateY(8px)}
.bp-filter-overlay{position:fixed;inset:0;z-index:300;display:flex;align-items:flex-start;justify-content:center;padding:60px 20px;background:rgba(5,6,9,.7);backdrop-filter:blur(4px);overflow-y:auto}.bp-filter-panel{width:100%;max-width:460px;border:1px solid rgba(214,170,96,.25);border-radius:18px;background:#0c0e14;box-shadow:0 30px 90px rgba(0,0,0,.6);font-family:'Hanken Grotesk',sans-serif;color:rgba(226,230,244,.92)}.bp-filter-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid rgba(255,255,255,.07)}.bp-filter-title{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.04em;margin:0;color:rgba(238,242,252,.97)}.bp-filter-body{padding:18px 22px;display:flex;flex-direction:column;gap:20px;max-height:60vh;overflow-y:auto}.bp-filter-group{display:flex;flex-direction:column;gap:10px}.bp-filter-group-head{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(226,230,244,.55)}.bp-pill-row{display:flex;flex-wrap:wrap;gap:8px}.bp-pill{padding:7px 15px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.65);font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.02em;cursor:pointer;transition:all .16s}.bp-pill:hover{border-color:rgba(214,170,96,.4);color:rgba(236,240,252,.92)}.bp-pill.on{border-color:rgba(214,170,96,.6);background:rgba(214,170,96,.16);color:rgba(244,224,170,.98);font-weight:600}.bp-filter-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 20px;border-top:1px solid rgba(255,255,255,.07);flex-wrap:wrap}.bp-filter-reset{padding:8px 16px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.7);font-family:'Hanken Grotesk';font-size:12px;cursor:pointer}.bp-filter-note{font-size:11px;font-style:italic;color:rgba(226,230,244,.35)}.bp-filter-fade-enter-active,.bp-filter-fade-leave-active{transition:opacity .18s ease}.bp-filter-fade-enter-from,.bp-filter-fade-leave-to{opacity:0}
@media (max-width:900px){.bp{grid-template-columns:1fr}.bp-sidebar{position:static;height:auto}.bp-detail{padding:28px 20px}.bp-card{padding:24px 22px 32px}.bp-title{font-size:32px}.bp-stat-grid{grid-template-columns:1fr}.bp-abilities{grid-template-columns:repeat(3,1fr)}}
</style>
