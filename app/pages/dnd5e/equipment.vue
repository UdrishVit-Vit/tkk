<script setup>
import { EQUIPMENT_5E, EQUIPMENT_SOURCES, EQUIPMENT_CATEGORIES, EQUIPMENT_TAGS } from '~/data/equipment5e.js'

const search = ref('')
const selectedId = ref(null)
const filterOpen = ref(false)

const activeSources = ref(new Set(Object.keys(EQUIPMENT_SOURCES)))
const activeCategories = ref(new Set(Object.keys(EQUIPMENT_CATEGORIES)))
const activeTags = ref(new Set())

function toggleInSet(set, value) {
  const next = new Set(set.value)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  set.value = next
}
function toggleSource(id) { toggleInSet(activeSources, id) }
function toggleCategory(id) { toggleInSet(activeCategories, id) }
function toggleTag(id) { toggleInSet(activeTags, id) }

const activeFilterCount = computed(() =>
  (activeSources.value.size < Object.keys(EQUIPMENT_SOURCES).length ? 1 : 0) +
  (activeCategories.value.size < Object.keys(EQUIPMENT_CATEGORIES).length ? 1 : 0) +
  activeTags.value.size
)
function resetFilters() {
  activeSources.value = new Set(Object.keys(EQUIPMENT_SOURCES))
  activeCategories.value = new Set(Object.keys(EQUIPMENT_CATEGORIES))
  activeTags.value = new Set()
}

useSeoMeta({
  title: 'Снаряжение — TKK.club',
  description: 'Снаряжение по правилам D&D 5e 2014.'
})

const filteredEquipment = computed(() => {
  const q = search.value.trim().toLowerCase()
  return EQUIPMENT_5E.filter(item => {
    if (!activeSources.value.has(item.source)) return false
    if (!activeCategories.value.has(item.category)) return false
    if (activeTags.value.size && !item.tags.some(t => activeTags.value.has(t))) return false
    if (!q) return true
    return item.title.toLowerCase().includes(q) ||
      (item.englishName && item.englishName.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q) ||
      item.details.some(d => d.title.toLowerCase().includes(q) || d.text.toLowerCase().includes(q))
  })
})

const selectedEquipment = computed(() => EQUIPMENT_5E.find(item => item.id === selectedId.value) || null)

function select(id) { selectedId.value = selectedId.value === id ? null : id }
function sourceName(id) { return EQUIPMENT_SOURCES[id] || id }
function categoryName(id) { return EQUIPMENT_CATEGORIES[id] || id }
function tagName(id) {
  const names = {
    expendable: 'Расходник',
    light: 'Лёгкое',
    magic: 'Магия',
    travel: 'Путешествие',
    utility: 'Польза',
    social: 'Социальное'
  }
  return names[id] || id
}
function tagTooltip(id) { return EQUIPMENT_TAGS[id] || '' }

function onKeydown(e) { if (e.key === 'Escape') { filterOpen.value = false; selectedId.value = null } }
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="ep">
    <aside class="ep-sidebar">
      <div class="ep-sidebar-head">
        <NuxtLink to="/dnd5e" class="ep-back" title="К карте D&D 5e">
          <img src="/assets/knot-main.png" width="22" height="22" style="display:block;object-fit:contain">
        </NuxtLink>
        <div class="ep-wordmark">
          <div class="ep-wordmark-eyebrow">Threads of the Knot of Knots</div>
          <div class="ep-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
        </div>
      </div>

      <nav class="ep-crumb">
        <NuxtLink to="/" class="ep-crumb-link">Системы</NuxtLink>
        <span class="ep-crumb-sep">/</span>
        <NuxtLink to="/dnd5e" class="ep-crumb-link">D&D 5e</NuxtLink>
        <span class="ep-crumb-sep">/</span>
        <span class="ep-crumb-current">Снаряжение</span>
      </nav>

      <div class="ep-search-wrap">
        <input v-model="search" class="ep-search" type="search" placeholder="Поиск снаряжения...">
        <button
          type="button"
          class="ep-filter-btn"
          :class="{ active: activeFilterCount > 0 }"
          title="Фильтр"
          @click="filterOpen = true"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
          <span v-if="activeFilterCount" class="ep-filter-badge">{{ activeFilterCount }}</span>
        </button>
      </div>

      <div class="ep-list">
        <button
          v-for="item in filteredEquipment"
          :key="item.id"
          type="button"
          class="ep-item"
          :class="{ active: selectedId === item.id }"
          @click="select(item.id)"
        >
          <span class="ep-item-diamond" />
          <span class="ep-item-body">
            <span class="ep-item-title">{{ item.title }}</span>
            <span class="ep-item-req">{{ categoryName(item.category) }}</span>
          </span>
          <span class="ep-item-source" :title="sourceName(item.source)">{{ item.source }}</span>
        </button>
        <div v-if="filteredEquipment.length === 0" class="ep-empty">Ничего не найдено</div>
      </div>

      <div class="ep-sidebar-foot">
        <span class="ep-total">{{ EQUIPMENT_5E.length }} предметов</span>
      </div>
    </aside>

    <main class="ep-detail">
      <transition name="ep-fade" mode="out-in">
        <div v-if="selectedEquipment" :key="selectedEquipment.id" class="ep-card">
          <span class="ep-corner ep-corner-tl" /><span class="ep-corner ep-corner-tr" />
          <span class="ep-corner ep-corner-br" /><span class="ep-corner ep-corner-bl" />

          <div class="ep-card-top">
            <div class="ep-card-eyebrow">
              <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
              <span class="ep-eyebrow-sep">/</span>
              <span>Снаряжение</span>
            </div>
            <button class="ep-close" type="button" title="Закрыть" @click="selectedId = null">✕</button>
          </div>

          <h1 class="ep-title">{{ selectedEquipment.title.toUpperCase() }}</h1>
          <span v-if="selectedEquipment.englishName" class="ep-subtitle">{{ selectedEquipment.englishName }}</span>
          <div class="ep-divider"><span class="ep-divider-diamond" /></div>

          <div class="ep-badge-row">
            <span class="ep-source-badge" :title="sourceName(selectedEquipment.source)">{{ selectedEquipment.source }}</span>
            <span class="ep-cat-badge">{{ categoryName(selectedEquipment.category) }}</span>
          </div>

          <div class="ep-stat-grid">
            <div class="ep-stat">
              <span class="ep-stat-label">Стоимость</span>
              <span class="ep-stat-value">{{ selectedEquipment.cost }}</span>
            </div>
            <div class="ep-stat">
              <span class="ep-stat-label">Вес</span>
              <span class="ep-stat-value">{{ selectedEquipment.weight }}</span>
            </div>
          </div>

          <div v-if="selectedEquipment.tags.length" class="ep-props">
            <span class="ep-props-label">Метки</span>
            <div class="ep-props-list">
              <span
                v-for="tag in selectedEquipment.tags"
                :key="tag"
                class="ep-prop-pill"
                :title="tagTooltip(tag)"
              >{{ tagName(tag) }}</span>
            </div>
          </div>

          <p class="ep-lore">{{ selectedEquipment.description }}</p>

          <div v-for="detail in selectedEquipment.details" :key="detail.title" class="ep-block">
            <h2 class="ep-h2">{{ detail.title }}</h2>
            <p>{{ detail.text }}</p>
          </div>

          <div v-if="selectedEquipment.table" class="ep-block">
            <h2 class="ep-h2">Таблица</h2>
            <div class="ep-table">
              <div class="ep-table-head">
                <span v-for="col in selectedEquipment.table.columns" :key="col">{{ col }}</span>
              </div>
              <div v-for="(row, i) in selectedEquipment.table.rows" :key="i" class="ep-table-row">
                <span v-for="cell in row" :key="cell">{{ cell }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="ep-empty-state">
          <div class="ep-empty-glyph">✦</div>
          <div class="ep-empty-title">Выберите предмет</div>
          <div class="ep-empty-sub">Выберите снаряжение из списка слева, чтобы увидеть подробное описание.</div>
        </div>
      </transition>
    </main>

    <Teleport to="body">
      <transition name="ep-filter-fade">
        <div v-if="filterOpen" class="ep-filter-overlay" @click="filterOpen = false">
          <div class="ep-filter-panel" @click.stop>
            <div class="ep-filter-head">
              <h2 class="ep-filter-title">Фильтр</h2>
              <button class="ep-close" type="button" title="Закрыть" @click="filterOpen = false">✕</button>
            </div>

            <div class="ep-filter-body">
              <div class="ep-filter-group">
                <div class="ep-filter-group-head">Категория</div>
                <div class="ep-pill-row">
                  <button
                    v-for="(name, id) in EQUIPMENT_CATEGORIES"
                    :key="id"
                    type="button"
                    class="ep-pill"
                    :class="{ on: activeCategories.has(id) }"
                    @click="toggleCategory(id)"
                  >{{ name }}</button>
                </div>
              </div>

              <div class="ep-filter-group">
                <div class="ep-filter-group-head">Метки</div>
                <div class="ep-pill-row">
                  <button
                    v-for="(text, id) in EQUIPMENT_TAGS"
                    :key="id"
                    type="button"
                    class="ep-pill"
                    :class="{ on: activeTags.has(id) }"
                    :title="text"
                    @click="toggleTag(id)"
                  >{{ tagName(id) }}</button>
                </div>
              </div>

              <div class="ep-filter-group">
                <div class="ep-filter-group-head">Источники нитей</div>
                <div class="ep-pill-row">
                  <button
                    v-for="(name, id) in EQUIPMENT_SOURCES"
                    :key="id"
                    type="button"
                    class="ep-pill"
                    :class="{ on: activeSources.has(id) }"
                    :title="name"
                    @click="toggleSource(id)"
                  >{{ id }}</button>
                </div>
              </div>
            </div>

            <div class="ep-filter-foot">
              <button type="button" class="ep-filter-reset" @click="resetFilters">Сбросить фильтры</button>
              <span class="ep-filter-note">Фильтры применяются автоматически!</span>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.ep{display:grid;grid-template-columns:320px 1fr;min-height:100vh;background:radial-gradient(130% 120% at 50% 0%,#0c0e14 0%,#070810 52%,#040406 100%);color:rgba(226,230,244,.92);font-family:'Hanken Grotesk',sans-serif}
.ep-sidebar{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.07);background:rgba(7,8,12,.55);backdrop-filter:blur(12px);overflow:hidden}
.ep-sidebar-head{display:flex;align-items:center;gap:14px;padding:18px 20px 14px;border-bottom:1px solid rgba(255,255,255,.06)}
.ep-back{flex:none;width:38px;height:38px;display:flex;align-items:center;justify-content:center;border-radius:10px;transition:background .2s}.ep-back:hover{background:rgba(255,255,255,.06)}
.ep-wordmark-eyebrow{font-size:8.5px;letter-spacing:.38em;text-transform:uppercase;color:rgba(226,230,244,.38)}.ep-wordmark-title{font-family:'Cormorant Garamond',serif;font-size:17px;letter-spacing:.28em;color:rgba(232,236,250,.9);margin-top:2px}
.ep-crumb{display:flex;align-items:center;gap:7px;padding:10px 20px;flex-wrap:wrap}.ep-crumb-link{font-size:9.5px;letter-spacing:.28em;text-transform:uppercase;color:rgba(226,230,244,.38);text-decoration:none}.ep-crumb-link:hover{color:rgba(226,230,244,.7)}.ep-crumb-sep{font-size:10px;color:rgba(226,230,244,.22)}.ep-crumb-current{font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.08em;color:rgba(244,224,170,.9)}
.ep-search-wrap{padding:0 14px 12px;display:flex;gap:8px}.ep-search{flex:1;min-width:0;min-height:38px;padding:0 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);outline:none;color:rgba(236,240,252,.9);font-family:'Cormorant Garamond',serif;font-size:15px;box-sizing:border-box}.ep-search:focus{border-color:rgba(214,170,96,.5)}
.ep-filter-btn{position:relative;flex:none;width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(7,8,12,.5);color:rgba(226,230,244,.65);cursor:pointer;transition:all .18s}.ep-filter-btn:hover{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.9)}.ep-filter-btn.active{border-color:rgba(214,170,96,.55);background:rgba(214,170,96,.12);color:rgba(244,224,170,.95)}.ep-filter-badge{position:absolute;top:-4px;right:-4px;width:16px;height:16px;display:grid;place-items:center;border-radius:50%;background:rgba(214,170,96,.95);color:rgba(20,15,6,.95);font-size:9.5px;font-weight:700}
.ep-list{flex:1;overflow-y:auto;padding:4px 10px 8px;display:flex;flex-direction:column;gap:3px}.ep-list::-webkit-scrollbar{width:4px}.ep-list::-webkit-scrollbar-track{background:transparent}.ep-list::-webkit-scrollbar-thumb{background:rgba(214,170,96,.25);border-radius:2px}
.ep-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid transparent;border-radius:12px;background:none;color:rgba(226,230,244,.8);cursor:pointer;text-align:left;transition:all .18s}.ep-item:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.07);color:rgba(236,240,252,.95)}.ep-item.active{background:rgba(214,170,96,.1);border-color:rgba(214,170,96,.38);color:rgba(244,224,170,.98)}
.ep-item-diamond{flex:none;width:6px;height:6px;background:rgba(214,170,96,.5);transform:rotate(45deg);transition:background .18s}.ep-item.active .ep-item-diamond{background:rgba(244,224,170,.9)}.ep-item-body{flex:1;min-width:0}.ep-item-title{display:block;font-family:'Cormorant Garamond',serif;font-size:16px;letter-spacing:.03em;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ep-item-req{display:block;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(214,170,96,.7);margin-top:2px}.ep-item-source{flex:none;padding:3px 8px;border:1px solid rgba(255,255,255,.12);border-radius:999px;font-size:9.5px;font-weight:700;letter-spacing:.04em;color:rgba(226,230,244,.45);cursor:help}
.ep-empty{padding:20px;text-align:center;color:rgba(226,230,244,.4);font-style:italic}.ep-sidebar-foot{padding:12px 20px;border-top:1px solid rgba(255,255,255,.06)}.ep-total{font-size:9.5px;letter-spacing:.22em;text-transform:uppercase;color:rgba(226,230,244,.3)}
.ep-detail{display:flex;align-items:flex-start;justify-content:center;padding:48px 52px;min-height:100vh;box-sizing:border-box}.ep-card{position:relative;width:100%;max-width:740px;border:1px solid rgba(214,170,96,.22);border-radius:20px;background:rgba(255,255,255,.018);padding:36px 40px 44px}
.ep-corner{position:absolute;width:28px;height:28px;pointer-events:none}.ep-corner-tl{top:10px;left:10px;border-top:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:6px 0 0 0}.ep-corner-tr{top:10px;right:10px;border-top:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 6px 0 0}.ep-corner-br{bottom:10px;right:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-right:1.5px solid rgba(214,170,96,.55);border-radius:0 0 6px 0}.ep-corner-bl{bottom:10px;left:10px;border-bottom:1.5px solid rgba(214,170,96,.55);border-left:1.5px solid rgba(214,170,96,.55);border-radius:0 0 0 6px}
.ep-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.ep-card-eyebrow{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(214,170,96,.75)}.ep-card-eyebrow a{color:rgba(214,170,96,.75);text-decoration:none}.ep-card-eyebrow a:hover{color:rgba(244,224,170,1)}.ep-eyebrow-sep{color:rgba(226,230,244,.28)}
.ep-close{width:30px;height:30px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.14);border-radius:50%;background:rgba(7,8,12,.4);color:rgba(226,230,244,.6);cursor:pointer;font-size:12px;transition:all .18s}.ep-close:hover{background:rgba(255,255,255,.08);color:rgba(236,240,252,.95)}
.ep-title{font-family:'Cormorant Garamond',serif;font-size:42px;letter-spacing:.07em;color:rgba(238,242,252,.97);margin:0;line-height:1.05}.ep-subtitle{display:block;font-size:12px;letter-spacing:.1em;font-style:italic;color:rgba(226,230,244,.4);margin-top:4px}.ep-divider{display:flex;align-items:center;gap:10px;margin:16px 0 20px}.ep-divider::before,.ep-divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(214,170,96,.35),transparent)}.ep-divider::after{background:linear-gradient(90deg,transparent,rgba(214,170,96,.35))}.ep-divider-diamond{flex:none;width:7px;height:7px;background:rgba(214,170,96,.7);transform:rotate(45deg)}
.ep-badge-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:22px}.ep-source-badge{display:inline-flex;align-items:center;padding:8px 14px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(255,255,255,.03);font-size:11px;font-weight:700;letter-spacing:.06em;color:rgba(226,230,244,.65);cursor:help}.ep-cat-badge{display:inline-flex;align-items:center;padding:8px 16px;border:1px solid rgba(214,170,96,.35);border-radius:999px;background:rgba(214,170,96,.07);font-family:'Cormorant Garamond',serif;font-size:14px;color:rgba(244,224,170,.95)}
.ep-stat-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:20px}.ep-stat{display:flex;flex-direction:column;gap:5px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.02)}.ep-stat-label{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45)}.ep-stat-value{font-family:'Cormorant Garamond',serif;font-size:16px;color:rgba(236,240,252,.92)}
.ep-props{margin-bottom:22px}.ep-props-label{display:block;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45);margin-bottom:8px}.ep-props-list{display:flex;flex-wrap:wrap;gap:7px}.ep-prop-pill{padding:5px 12px;border:1px solid rgba(214,170,96,.3);border-radius:999px;background:rgba(214,170,96,.06);font-family:'Cormorant Garamond',serif;font-size:13.5px;color:rgba(244,224,170,.9);cursor:help}
.ep-lore{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;line-height:1.7;color:rgba(226,230,244,.72);margin:0 0 22px}.ep-block{margin-top:18px;padding:16px 18px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.018)}.ep-h2{font-family:'Hanken Grotesk';font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(214,170,96,.85);margin:0 0 10px}.ep-block p{margin:0;font-size:14px;line-height:1.68;color:rgba(226,230,244,.78)}
.ep-table{overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:12px}.ep-table-head,.ep-table-row{display:grid;grid-template-columns:64px 1fr;gap:12px;padding:10px 14px}.ep-table-head{background:rgba(214,170,96,.12);font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,224,170,.92)}.ep-table-row{border-top:1px solid rgba(255,255,255,.06);font-size:13.5px;line-height:1.5;color:rgba(226,230,244,.78)}.ep-table-row span:first-child{font-family:'Cormorant Garamond',serif;font-weight:700;color:rgba(244,224,170,.92)}
.ep-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;gap:14px}.ep-empty-glyph{font-size:48px;color:rgba(214,170,96,.25);line-height:1}.ep-empty-title{font-family:'Cormorant Garamond',serif;font-size:26px;letter-spacing:.08em;color:rgba(226,230,244,.5)}.ep-empty-sub{font-size:13.5px;color:rgba(226,230,244,.34);max-width:300px;line-height:1.6}
.ep-fade-enter-active,.ep-fade-leave-active{transition:opacity .18s ease,transform .18s ease}.ep-fade-enter-from,.ep-fade-leave-to{opacity:0;transform:translateY(8px)}
.ep-filter-overlay{position:fixed;inset:0;z-index:300;display:flex;align-items:flex-start;justify-content:center;padding:60px 20px;background:rgba(5,6,9,.7);backdrop-filter:blur(4px);overflow-y:auto}.ep-filter-panel{width:100%;max-width:460px;border:1px solid rgba(214,170,96,.25);border-radius:18px;background:#0c0e14;box-shadow:0 30px 90px rgba(0,0,0,.6);font-family:'Hanken Grotesk',sans-serif;color:rgba(226,230,244,.92)}.ep-filter-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid rgba(255,255,255,.07)}.ep-filter-title{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:.04em;margin:0;color:rgba(238,242,252,.97)}.ep-filter-body{padding:18px 22px;display:flex;flex-direction:column;gap:20px;max-height:60vh;overflow-y:auto}.ep-filter-group{display:flex;flex-direction:column;gap:10px}.ep-filter-group-head{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(226,230,244,.55)}
.ep-pill-row{display:flex;flex-wrap:wrap;gap:8px}.ep-pill{padding:7px 15px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.65);font-family:'Cormorant Garamond',serif;font-size:14px;letter-spacing:.02em;cursor:pointer;transition:all .16s}.ep-pill:hover{border-color:rgba(214,170,96,.4);color:rgba(236,240,252,.92)}.ep-pill.on{border-color:rgba(214,170,96,.6);background:rgba(214,170,96,.16);color:rgba(244,224,170,.98);font-weight:600}
.ep-filter-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 20px;border-top:1px solid rgba(255,255,255,.07);flex-wrap:wrap}.ep-filter-reset{padding:8px 16px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.03);color:rgba(226,230,244,.7);font-family:'Hanken Grotesk';font-size:12px;cursor:pointer;transition:all .16s}.ep-filter-reset:hover{border-color:rgba(214,170,96,.4);color:rgba(244,224,170,.9)}.ep-filter-note{font-size:11px;font-style:italic;color:rgba(226,230,244,.35)}.ep-filter-fade-enter-active,.ep-filter-fade-leave-active{transition:opacity .18s ease}.ep-filter-fade-enter-from,.ep-filter-fade-leave-to{opacity:0}
@media (max-width:900px){.ep{grid-template-columns:1fr}.ep-sidebar{position:static;height:auto}.ep-detail{padding:28px 20px}.ep-card{padding:24px 22px 32px}.ep-title{font-size:32px}.ep-stat-grid{grid-template-columns:1fr}}
</style>
