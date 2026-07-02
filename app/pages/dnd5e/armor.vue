<script setup>
import { ARMOR_5E, ARMOR_SOURCES, ARMOR_CATEGORIES, ARMOR_TRAITS } from '~/data/armor5e.js'

const search = ref('')
const selectedId = ref(null)
const filterOpen = ref(false)

const activeSources = ref(new Set(Object.keys(ARMOR_SOURCES)))
const activeCategories = ref(new Set(Object.keys(ARMOR_CATEGORIES)))
const activeTraits = ref(new Set())

function toggleInSet(set, value) {
  const next = new Set(set.value)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  set.value = next
}
function toggleSource(id) { toggleInSet(activeSources, id) }
function toggleCategory(id) { toggleInSet(activeCategories, id) }
function toggleTrait(id) { toggleInSet(activeTraits, id) }

const activeFilterCount = computed(() =>
  (activeSources.value.size < Object.keys(ARMOR_SOURCES).length ? 1 : 0) +
  (activeCategories.value.size < Object.keys(ARMOR_CATEGORIES).length ? 1 : 0) +
  activeTraits.value.size
)
function resetFilters() {
  activeSources.value = new Set(Object.keys(ARMOR_SOURCES))
  activeCategories.value = new Set(Object.keys(ARMOR_CATEGORIES))
  activeTraits.value = new Set()
}

useSeoMeta({
  title: 'Доспехи — TKK.club',
  description: 'Доспехи и щиты по правилам D&D 5e 2014.'
})

const filteredArmor = computed(() => {
  const q = search.value.trim().toLowerCase()
  return ARMOR_5E.filter(a => {
    if (!activeSources.value.has(a.source)) return false
    if (!activeCategories.value.has(a.category)) return false
    if (activeTraits.value.size && !a.traits.some(t => activeTraits.value.has(t))) return false
    if (!q) return true
    return a.title.toLowerCase().includes(q) ||
      (a.englishName && a.englishName.toLowerCase().includes(q)) ||
      a.armorClass.toLowerCase().includes(q) ||
      (a.lore && a.lore.toLowerCase().includes(q))
  })
})

const selectedArmor = computed(() => ARMOR_5E.find(a => a.id === selectedId.value) || null)

function select(id) { selectedId.value = selectedId.value === id ? null : id }
function sourceName(id) { return ARMOR_SOURCES[id] || id }
function categoryName(id) { return ARMOR_CATEGORIES[id] || id }
function traitName(id) {
  if (id === 'stealthDisadvantage') return 'Скрытность'
  if (id === 'strengthRequired') return 'Требование Силы'
  if (id === 'dexCap') return 'Ловкость макс. 2'
  if (id === 'shieldBonus') return 'Бонус щита'
  return id
}
function traitTooltip(id) { return ARMOR_TRAITS[id] || '' }

function onKeydown(e) { if (e.key === 'Escape') { filterOpen.value = false; selectedId.value = null } }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="fp">
    <aside class="fp-sidebar">
      <div class="fp-sidebar-head">
        <NuxtLink to="/dnd5e" class="fp-back" title="К карте D&D 5e">
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
        <NuxtLink to="/dnd5e" class="fp-crumb-link">D&D 5e</NuxtLink>
        <span class="fp-crumb-sep">/</span>
        <span class="fp-crumb-current">Доспехи</span>
      </nav>

      <div class="fp-search-wrap">
        <input v-model="search" class="fp-search" type="search" placeholder="Поиск доспеха...">
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
          v-for="a in filteredArmor"
          :key="a.id"
          type="button"
          class="fp-item"
          :class="{ active: selectedId === a.id }"
          @click="select(a.id)"
        >
          <span class="fp-item-diamond" />
          <span class="fp-item-body">
            <span class="fp-item-title">{{ a.title }}</span>
            <span class="fp-item-req">{{ categoryName(a.category) }}</span>
          </span>
          <span class="fp-item-source" :title="sourceName(a.source)">{{ a.source }}</span>
        </button>
        <div v-if="filteredArmor.length === 0" class="fp-empty">Ничего не найдено</div>
      </div>

      <div class="fp-sidebar-foot">
        <span class="fp-total">{{ ARMOR_5E.length }} позиций</span>
      </div>
    </aside>

    <main class="fp-detail">
      <transition name="fp-fade" mode="out-in">
        <div v-if="selectedArmor" :key="selectedArmor.id" class="fp-card">
          <span class="fp-corner fp-corner-tl" /><span class="fp-corner fp-corner-tr" />
          <span class="fp-corner fp-corner-br" /><span class="fp-corner fp-corner-bl" />

          <div class="fp-card-top">
            <div class="fp-card-eyebrow">
              <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
              <span class="fp-eyebrow-sep">/</span>
              <span>Доспехи</span>
            </div>
            <button class="fp-close" type="button" title="Закрыть" @click="selectedId = null">✕</button>
          </div>

          <h1 class="fp-title">{{ selectedArmor.title.toUpperCase() }}</h1>
          <span v-if="selectedArmor.englishName" class="fp-subtitle">{{ selectedArmor.englishName }}</span>
          <div class="fp-divider"><span class="fp-divider-diamond" /></div>

          <div class="fp-badge-row">
            <span class="fp-source-badge" :title="sourceName(selectedArmor.source)">{{ selectedArmor.source }}</span>
            <span class="fp-cat-badge">{{ categoryName(selectedArmor.category) }}</span>
          </div>

          <div class="fp-stat-grid">
            <div class="fp-stat">
              <span class="fp-stat-label">Стоимость</span>
              <span class="fp-stat-value">{{ selectedArmor.cost }}</span>
            </div>
            <div class="fp-stat">
              <span class="fp-stat-label">Класс Доспеха</span>
              <span class="fp-stat-value">{{ selectedArmor.armorClass }}</span>
            </div>
            <div class="fp-stat">
              <span class="fp-stat-label">Вес</span>
              <span class="fp-stat-value">{{ selectedArmor.weight }}</span>
            </div>
            <div class="fp-stat">
              <span class="fp-stat-label">Сила</span>
              <span class="fp-stat-value">{{ selectedArmor.strength }}</span>
            </div>
            <div class="fp-stat">
              <span class="fp-stat-label">Скрытность</span>
              <span class="fp-stat-value">{{ selectedArmor.stealth }}</span>
            </div>
          </div>

          <div v-if="selectedArmor.traits.length" class="fp-props">
            <span class="fp-props-label">Правила</span>
            <div class="fp-props-list">
              <span
                v-for="t in selectedArmor.traits"
                :key="t"
                class="fp-prop-pill"
                :title="traitTooltip(t)"
              >{{ traitName(t) }}</span>
            </div>
          </div>

          <p v-if="selectedArmor.lore" class="fp-lore">{{ selectedArmor.lore }}</p>
        </div>

        <div v-else class="fp-empty-state">
          <div class="fp-empty-glyph">✦</div>
          <div class="fp-empty-title">Выберите доспех</div>
          <div class="fp-empty-sub">Выберите доспех или щит из списка слева, чтобы увидеть подробное описание.</div>
        </div>
      </transition>
    </main>

    <Teleport to="body">
      <transition name="fp-filter-fade">
        <div v-if="filterOpen" class="fp-filter-overlay" @click="filterOpen = false">
          <div class="fp-filter-panel" @click.stop>
            <div class="fp-filter-head">
              <h2 class="fp-filter-title">Фильтр</h2>
              <button class="fp-close" type="button" title="Закрыть" @click="filterOpen = false">✕</button>
            </div>

            <div class="fp-filter-body">
              <div class="fp-filter-group">
                <div class="fp-filter-group-head">
                  <span>Категория</span>
                </div>
                <div class="fp-pill-row">
                  <button
                    v-for="(name, id) in ARMOR_CATEGORIES"
                    :key="id"
                    type="button"
                    class="fp-pill"
                    :class="{ on: activeCategories.has(id) }"
                    @click="toggleCategory(id)"
                  >{{ name }}</button>
                </div>
              </div>

              <div class="fp-filter-group">
                <div class="fp-filter-group-head">
                  <span>Правила</span>
                </div>
                <div class="fp-pill-row">
                  <button
                    v-for="(text, id) in ARMOR_TRAITS"
                    :key="id"
                    type="button"
                    class="fp-pill"
                    :class="{ on: activeTraits.has(id) }"
                    :title="text"
                    @click="toggleTrait(id)"
                  >{{ traitName(id) }}</button>
                </div>
              </div>

              <div class="fp-filter-group">
                <div class="fp-filter-group-head">
                  <span>Источники нитей</span>
                </div>
                <div class="fp-pill-row">
                  <button
                    v-for="(name, id) in ARMOR_SOURCES"
                    :key="id"
                    type="button"
                    class="fp-pill"
                    :class="{ on: activeSources.has(id) }"
                    :title="name"
                    @click="toggleSource(id)"
                  >{{ id }}</button>
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
.fp{display:grid;grid-template-columns:320px 1fr;min-height:100vh;background:radial-gradient(130% 120% at 50% 0%,#0c0e14 0%,#070810 52%,#040406 100%);color:rgba(226,230,244,.92);font-family:'Hanken Grotesk',sans-serif}
.fp-sidebar{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.07);background:rgba(7,8,12,.55);backdrop-filter:blur(12px);overflow:hidden}
.fp-sidebar-head{display:flex;align-items:center;gap:14px;padding:18px 20px 14px;border-bottom:1px solid rgba(255,255,255,.06)}
.fp-back{flex:none;width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:10px;transition:background .2s}
.fp-back:hover{background:rgba(255,255,255,.06)}
.fp-wordmark-eyebrow{font-size:8.5px;letter-spacing:.38em;text-transform:uppercase;color:rgba(226,230,244,.38)}
.fp-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:17px;letter-spacing:.28em;color:rgba(232,236,250,.9);margin-top:2px}
.fp-crumb{display:flex;align-items:center;gap:7px;padding:10px 20px;flex-wrap:wrap}
.fp-crumb-link{font-size:9.5px;letter-spacing:.28em;text-transform:uppercase;color:rgba(226,230,244,.38);text-decoration:none}
.fp-crumb-link:hover{color:rgba(226,230,244,.7)}
.fp-crumb-sep{font-size:10px;color:rgba(226,230,244,.22)}
.fp-crumb-current{font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.08em;color:rgba(244,224,170,.9)}
.fp-search-wrap{padding:0 14px 12px;display:flex;gap:8px}
.fp-search{flex:1;min-width:0;min-height:38px;padding:0 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);outline:none;color:rgba(236,240,252,.9);font-family:'Cormorant Garamond',serif;font-size:15px;box-sizing:border-box}
.fp-search:focus{border-color:rgba(214,170,96,.5)}
.fp-filter-btn{position:relative;flex:none;width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);color:rgba(226,230,244,.65);cursor:pointer;transition:all .18s}
.fp-filter-btn:hover{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.9)}
.fp-filter-btn.active{border-color:rgba(214,170,96,.55);background:rgba(214,170,96,.12);color:rgba(244,224,170,.95)}
.fp-filter-badge{position:absolute;top:-4px;right:-4px;width:16px;height:16px;display:grid;place-items:center;border-radius:50%;background:rgba(214,170,96,.95);color:rgba(20,15,6,.95);font-size:9.5px;font-weight:700}
.fp-list{flex:1;overflow-y:auto;padding:4px 10px 8px;display:flex;flex-direction:column;gap:3px}
.fp-list::-webkit-scrollbar{width:4px}
.fp-list::-webkit-scrollbar-track{background:transparent}
.fp-list::-webkit-scrollbar-thumb{background:rgba(214,170,96,.25);border-radius:2px}
.fp-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid transparent;border-radius:12px;background:none;color:rgba(226,230,244,.8);cursor:pointer;text-align:left;transition:all .18s}
.fp-item:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.07);color:rgba(236,240,252,.95)}
.fp-item.active{background:rgba(214,170,96,.1);border-color:rgba(214,170,96,.38);color:rgba(244,224,170,.98)}
.fp-item-diamond{flex:none;width:6px;height:6px;background:rgba(214,170,96,.5);transform:rotate(45deg);transition:background .18s}
.fp-item.active .fp-item-diamond{background:rgba(244,224,170,.9)}
.fp-item-body{flex:1;min-width:0}
.fp-item-title{display:block;font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:.03em;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fp-item-req{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(214,170,96,.7);margin-top:2px}
.fp-item.active .fp-item-req{color:rgba(244,224,170,.85)}
.fp-item-source{flex:none;padding:3px 8px;border:1px solid rgba(255,255,255,.12);border-radius:999px;font-size:9.5px;font-weight:700;letter-spacing:.04em;color:rgba(226,230,244,.45);cursor:help}
.fp-item.active .fp-item-source{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.8)}
.fp-empty{padding:20px;text-align:center;color:rgba(226,230,244,.4);font-style:italic}
.fp-sidebar-foot{padding:12px 20px;border-top:1px solid rgba(255,255,255,.06)}
.fp-total{font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,230,244,.3)}
.fp-detail{display:flex;align-items:flex-start;justify-content:center;padding:48px 52px;min-height:100vh;box-sizing:border-box}
.fp-card{position:relative;width:100%;max-width:720px;border:1px solid rgba(214,170,96,.22);border-radius:20px;background:rgba(255,255,255,.018);padding:36px 40px 44px}
.fp-corner{position:absolute;width:28px;height:28px;pointer-events:none}
.fp-corner-tl{top:10px;left:10px;border-top:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:6px 0 0 0}
.fp-corner-tr{top:10px;right:10px;border-top:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 6px 0 0}
.fp-corner-br{bottom:10px;right:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 0 6px 0}
.fp-corner-bl{bottom:10px;left:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:0 0 0 6px}
.fp-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}
.fp-card-eyebrow{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(214,170,96,.75)}
.fp-card-eyebrow a{color:rgba(214,170,96,.75);text-decoration:none}
.fp-card-eyebrow a:hover{color:rgba(244,224,170,1)}
.fp-eyebrow-sep{color:rgba(226,230,244,.28)}
.fp-close{width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(7,8,12,.4);color:rgba(226,230,244,.6);cursor:pointer;font-size:12px;transition:all .18s}
.fp-close:hover{background:rgba(255,255,255,.08);color:rgba(236,240,252,.95)}
.fp-title{font-family:'Cormorant Garamond',serif;font-size:42px;letter-spacing:.07em;color:rgba(238,242,252,.97);margin:0;line-height:1.05}
.fp-subtitle{display:block;font-size:12px;letter-spacing:.1em;font-style:italic;color:rgba(226,230,244,.4);margin-top:4px}
.fp-divider{display:flex;align-items:center;gap:10px;margin:16px 0 20px}
.fp-divider::before,.fp-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(214,170,96,.35),transparent)}
.fp-divider::after{background:linear-gradient(90deg,transparent,rgba(214,170,96,.35))}
.fp-divider-diamond{flex:none;width:7px;height:7px;background:rgba(214,170,96,.7);transform:rotate(45deg)}
.fp-badge-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:22px}
.fp-source-badge{display:inline-flex;align-items:center;padding:8px 14px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.03);font-size:11px;font-weight:700;letter-spacing:.06em;color:rgba(226,230,244,.65);cursor:help}
.fp-cat-badge{display:inline-flex;align-items:center;padding:8px 16px;border:1px solid rgba(214,170,96,.35);border-radius:999px;background:rgba(214,170,96,.07);font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(244,224,170,.95)}
.fp-stat-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:20px}
.fp-stat{display:flex;flex-direction:column;gap:5px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.02)}
.fp-stat-label{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45)}
.fp-stat-value{font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(236,240,252,.92)}
.fp-props{margin-bottom:22px}
.fp-props-label{display:block;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45);margin-bottom:8px}
.fp-props-list{display:flex;flex-wrap:wrap;gap:7px}
.fp-prop-pill{padding:5px 12px;border:1px solid rgba(214,170,96,.3);border-radius:999px;background:rgba(214,170,96,.06);font-family:'Cormorant Garamond',serif;font-size:13.5px;color:rgba(244,224,170,.9);cursor:help}
.fp-lore{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;line-height:1.7;color:rgba(226,230,244,.7);margin:0}
.fp-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;gap:14px}
.fp-empty-glyph{font-size:48px;color:rgba(214,170,96,.25);line-height:1}
.fp-empty-title{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.08em;color:rgba(226,230,244,.5)}
.fp-empty-sub{font-size:13.5px;color:rgba(226,230,244,.34);max-width:300px;line-height:1.6}
.fp-fade-enter-active,.fp-fade-leave-active{transition:opacity .18s ease,transform .18s ease}
.fp-fade-enter-from,.fp-fade-leave-to{opacity:0;transform:translateY(8px)}
.fp-filter-overlay{position:fixed;inset:0;z-index:300;display:flex;align-items:flex-start;justify-content:center;padding:60px 20px;background:rgba(5,6,9,.7);backdrop-filter:blur(4px);overflow-y:auto}
.fp-filter-panel{width:100%;max-width:460px;border:1px solid rgba(214,170,96,.25);border-radius:18px;background:#0c0e14;box-shadow:0 30px 90px rgba(0,0,0,.6);font-family:'Hanken Grotesk',sans-serif;color:rgba(226,230,244,.92)}
.fp-filter-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid rgba(255,255,255,.07)}
.fp-filter-title{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.04em;margin:0;color:rgba(238,242,252,.97)}
.fp-filter-body{padding:18px 22px;display:flex;flex-direction:column;gap:20px;max-height:60vh;overflow-y:auto}
.fp-filter-group{display:flex;flex-direction:column;gap:10px}
.fp-filter-group-head{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(226,230,244,.55)}
.fp-pill-row{display:flex;flex-wrap:wrap;gap:8px}
.fp-pill{padding:7px 15px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.65);font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.02em;cursor:pointer;transition:all .16s}
.fp-pill:hover{border-color:rgba(214,170,96,.4);color:rgba(236,240,252,.92)}
.fp-pill.on{border-color:rgba(214,170,96,.6);background:rgba(214,170,96,.16);color:rgba(244,224,170,.98);font-weight:600}
.fp-filter-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 20px;border-top:1px solid rgba(255,255,255,.07);flex-wrap:wrap}
.fp-filter-reset{padding:8px 16px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.7);font-family:'Hanken Grotesk';font-size:12px;cursor:pointer;transition:all .16s}
.fp-filter-reset:hover{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.9)}
.fp-filter-note{font-size:11px;font-style:italic;color:rgba(226,230,244,.35)}
.fp-filter-fade-enter-active,.fp-filter-fade-leave-active{transition:opacity .18s ease}
.fp-filter-fade-enter-from,.fp-filter-fade-leave-to{opacity:0}
@media (max-width:900px){
  .fp{grid-template-columns:1fr}
  .fp-sidebar{position:static;height:auto}
  .fp-detail{padding:28px 20px}
  .fp-card{padding:24px 22px 32px}
  .fp-title{font-size:32px}
  .fp-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
</style>
