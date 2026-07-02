<script setup>
import { CLASS_FEATURES_5E, CLASS_FEATURE_SOURCE_NAMES } from '~/data/classFeatures5e.js'

const route = useRoute()
const router = useRouter()

const CLASS_SLUGS = {
  'Бард': 'bard',
  'Варвар': 'barbarian',
  'Воин': 'fighter',
  'Волшебник': 'wizard',
  'Дрифтер': 'drifter',
  'Друид': 'druid',
  'Жрец': 'cleric',
  'Изобретатель': 'inventor',
  'Колдун': 'warlock',
  'Монах': 'monk',
  'Паладин': 'paladin',
  'Плут': 'rogue',
  'Следопыт': 'ranger',
  'Чародей': 'sorcerer',
  'Шаман': 'shaman'
}

const search = ref('')
const selectedId = ref(typeof route.query.feature === 'string' ? route.query.feature : '')
const activeClass = ref(typeof route.query.cls === 'string' ? route.query.cls : 'all')
const activeSource = ref(typeof route.query.source === 'string' ? route.query.source : 'all')
const activeLevel = ref('all')
const activeType = ref('all')

const classes = [...new Set(CLASS_FEATURES_5E.map(feature => feature.className))].sort((a, b) => a.localeCompare(b, 'ru'))
const sources = [...new Set(CLASS_FEATURES_5E.map(feature => feature.source).filter(Boolean))].sort()
const levels = [...new Set(CLASS_FEATURES_5E.map(feature => feature.level).filter(level => level !== 999))].sort((a, b) => a - b)

const filteredFeatures = computed(() => {
  const q = search.value.trim().toLowerCase()
  return CLASS_FEATURES_5E.filter(feature => {
    if (activeClass.value !== 'all' && feature.className !== activeClass.value) return false
    if (activeSource.value !== 'all' && feature.source !== activeSource.value) return false
    if (activeLevel.value !== 'all' && String(feature.level) !== String(activeLevel.value)) return false
    if (activeType.value !== 'all' && feature.type !== activeType.value) return false
    if (!q) return true
    return feature.name.toLowerCase().includes(q) ||
      feature.className.toLowerCase().includes(q) ||
      feature.subclassName.toLowerCase().includes(q) ||
      feature.text.toLowerCase().includes(q)
  })
})

const selectedFeature = computed(() =>
  CLASS_FEATURES_5E.find(feature => feature.id === selectedId.value) ||
  filteredFeatures.value[0] ||
  null
)

watch(() => route.query.feature, value => {
  if (typeof value === 'string') selectedId.value = value
})

watch(() => route.query.source, value => {
  if (typeof value === 'string') activeSource.value = value
})

watch(() => route.query.cls, value => {
  if (typeof value === 'string') activeClass.value = value
})

function sourceName(source) {
  return CLASS_FEATURE_SOURCE_NAMES[source] || source
}

function featureParagraphs(text) {
  return String(text || '').split(/\n{2,}/).map(p => p.trim()).filter(Boolean)
}

const FEATURE_SECTION_TITLES = [
  'Заговоры',
  'Ячейки заклинаний',
  'Известные заклинания 1-го и более высоких уровней',
  'Базовая характеристика заклинаний',
  'Исполнение ритуалов',
  'Фокусировка заклинания'
]

function featureBlocks(text) {
  return featureParagraphs(text).map(paragraph => {
    const formula = paragraph.match(/^(Сл спасброск(?:а|ов)|Модификатор броска атаки)\s*=\s*(.+)$/i)
    if (formula) return { type: 'formula', label: formula[1], value: formula[2] }
    if (/^Например,/i.test(paragraph)) return { type: 'example', text: paragraph }
    const title = FEATURE_SECTION_TITLES.find(name => paragraph.startsWith(`${name}. `))
    if (title) return { type: 'section', title, text: paragraph.slice(title.length + 2) }
    return { type: 'paragraph', text: paragraph }
  })
}

function classRoute(className) {
  return `/dnd5e/classes/${CLASS_SLUGS[className] || ''}`
}

function selectFeature(id) {
  selectedId.value = id
  router.replace({ query: { ...route.query, feature: id } })
}

function setFilter(name, value) {
  if (name === 'class') activeClass.value = value
  if (name === 'source') activeSource.value = value
  if (name === 'level') activeLevel.value = String(value)
  if (name === 'type') activeType.value = value
}

function resetFilters() {
  search.value = ''
  activeClass.value = 'all'
  activeSource.value = 'all'
  activeLevel.value = 'all'
  activeType.value = 'all'
  router.replace({ query: selectedId.value ? { feature: selectedId.value } : {} })
}

useSeoMeta({
  title: 'Особенности классов — TKK.club',
  description: 'Справочник особенностей классов и подклассов D&D 5e 2014.'
})
</script>

<template>
  <div class="cf-page">
    <aside class="cf-sidebar">
      <div class="cf-brand">
        <NuxtLink to="/dnd5e" class="cf-back" title="К карте D&D 5e">
          <img src="/assets/knot-main.png" width="22" height="22" style="display:block;object-fit:contain">
        </NuxtLink>
        <div>
          <div class="cf-brand-eyebrow">Threads of the Knot of Knots</div>
          <div class="cf-brand-title">TKK<span style="opacity:.5">.club</span></div>
        </div>
      </div>

      <nav class="cf-crumb">
        <NuxtLink to="/" class="cf-crumb-link">Системы</NuxtLink>
        <span>/</span>
        <NuxtLink to="/dnd5e" class="cf-crumb-link">D&D 5e</NuxtLink>
        <span>/</span>
        <span>Особенности классов</span>
      </nav>

      <input v-model="search" class="cf-search" type="search" placeholder="Поиск особенности...">

      <div class="cf-filter-block">
        <div class="cf-filter-title">Класс</div>
        <div class="cf-pills">
          <button type="button" class="cf-pill" :class="{ active: activeClass === 'all' }" @click="setFilter('class', 'all')">Все</button>
          <button v-for="className in classes" :key="className" type="button" class="cf-pill" :class="{ active: activeClass === className }" @click="setFilter('class', className)">{{ className }}</button>
        </div>
      </div>

      <div class="cf-filter-block">
        <div class="cf-filter-title">Источник</div>
        <div class="cf-pills">
          <button type="button" class="cf-pill" :class="{ active: activeSource === 'all' }" @click="setFilter('source', 'all')">Все</button>
          <button v-for="source in sources" :key="source" type="button" class="cf-pill" :class="{ active: activeSource === source }" :title="sourceName(source)" @click="setFilter('source', source)">{{ source }}</button>
        </div>
      </div>

      <div class="cf-filter-row">
        <div class="cf-filter-block compact">
          <div class="cf-filter-title">Уровень</div>
          <select v-model="activeLevel" class="cf-select">
            <option value="all">Все</option>
            <option v-for="level in levels" :key="level" :value="String(level)">{{ level }}</option>
          </select>
        </div>
        <div class="cf-filter-block compact">
          <div class="cf-filter-title">Тип</div>
          <select v-model="activeType" class="cf-select">
            <option value="all">Все</option>
            <option value="class">Класс</option>
            <option value="subclass">Подкласс</option>
            <option value="spells">Заклинания</option>
          </select>
        </div>
      </div>

      <button type="button" class="cf-reset" @click="resetFilters">Сбросить фильтры</button>

      <div class="cf-list">
        <button
          v-for="feature in filteredFeatures"
          :key="feature.id"
          type="button"
          class="cf-list-item"
          :class="{ active: selectedFeature?.id === feature.id }"
          @click="selectFeature(feature.id)"
        >
          <span class="cf-diamond" />
          <span class="cf-list-body">
            <span class="cf-list-title">{{ feature.name }}</span>
            <span class="cf-list-meta">{{ feature.className }} · {{ feature.levelText }}</span>
          </span>
          <span class="cf-source" :title="feature.sourceName">{{ feature.source }}</span>
        </button>
        <div v-if="!filteredFeatures.length" class="cf-empty">Ничего не найдено</div>
      </div>
    </aside>

    <main class="cf-detail">
      <article v-if="selectedFeature" class="cf-card">
        <div class="cf-card-top">
          <div>
            <div class="cf-eyebrow">{{ selectedFeature.typeLabel }} · {{ selectedFeature.levelText }}</div>
            <h1>{{ selectedFeature.name }}</h1>
            <div class="cf-subtitle">{{ selectedFeature.className }} · {{ selectedFeature.subclassName }}</div>
          </div>
          <span class="cf-source large" :title="selectedFeature.sourceName">{{ selectedFeature.source }}</span>
        </div>

        <div class="cf-actions">
          <NuxtLink class="cf-action" :to="classRoute(selectedFeature.className)">Открыть класс</NuxtLink>
          <a v-if="selectedFeature.sourceUrl" class="cf-action" :href="selectedFeature.sourceUrl" target="_blank" rel="noreferrer">Открыть источник</a>
          <span v-else class="cf-action muted" :title="selectedFeature.sourceName">{{ selectedFeature.sourceName }}</span>
        </div>

        <div class="cf-stats">
          <div><span>Класс</span><strong>{{ selectedFeature.className }}</strong></div>
          <div><span>Подкласс</span><strong>{{ selectedFeature.subclassName }}</strong></div>
          <div><span>Уровень</span><strong>{{ selectedFeature.levelText }}</strong></div>
          <div><span>Источник</span><strong>{{ selectedFeature.sourceName }}</strong></div>
        </div>

        <div class="cf-text">
          <template v-for="(block, bi) in featureBlocks(selectedFeature.text)" :key="bi">
            <section v-if="block.type === 'section'" class="cf-text-section">
              <h2>{{ block.title }}</h2>
              <p>{{ block.text }}</p>
            </section>
            <aside v-else-if="block.type === 'example'" class="cf-text-example">{{ block.text }}</aside>
            <div v-else-if="block.type === 'formula'" class="cf-text-formula">
              <strong>{{ block.label }}</strong> = {{ block.value }}
            </div>
            <p v-else>{{ block.text }}</p>
          </template>
        </div>

        <div v-if="selectedFeature.items.length" class="cf-items">
          <details v-for="item in selectedFeature.items" :key="item.name" class="cf-item" open>
            <summary>{{ item.name }}</summary>
            <p>{{ item.text }}</p>
          </details>
        </div>

        <div v-if="selectedFeature.spellTable.length" class="cf-table">
          <div class="cf-table-head">
            <span>Уровень</span>
            <span>Заклинание</span>
          </div>
          <div v-for="row in selectedFeature.spellTable" :key="row.level + row.spell" class="cf-table-row">
            <span>{{ row.level }}</span>
            <span>{{ row.spell }}</span>
          </div>
        </div>

        <div v-if="selectedFeature.spells.length" class="cf-spells">
          <details v-for="spell in selectedFeature.spells" :key="spell.name" class="cf-spell" open>
            <summary>
              <span>{{ spell.name }}</span>
              <small>{{ spell.level }} · {{ spell.school }}</small>
            </summary>
            <div class="cf-spell-meta">
              <span>Сотворение: {{ spell.casting }}</span>
              <span>Дистанция: {{ spell.range }}</span>
              <span>Компоненты: {{ spell.components }}</span>
              <span>Длительность: {{ spell.duration }}</span>
            </div>
            <p>{{ spell.text }}</p>
            <p v-if="spell.hasHigher"><strong>На больших уровнях.</strong> {{ spell.higher }}</p>
          </details>
        </div>
      </article>

      <div v-else class="cf-card empty">Выберите особенность класса слева.</div>
    </main>
  </div>
</template>

<style scoped>
.cf-page{min-height:100vh;display:grid;grid-template-columns:360px minmax(0,1fr);background:radial-gradient(110% 110% at 48% 18%,#10131b 0%,#070810 54%,#040406 100%);color:rgba(226,230,244,.92);font-family:'Hanken Grotesk',sans-serif}
.cf-sidebar{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;gap:16px;border-right:1px solid rgba(255,255,255,.08);background:rgba(6,8,13,.72);backdrop-filter:blur(14px);padding:22px;overflow:auto}
.cf-brand{display:flex;align-items:center;gap:13px}
.cf-back{display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,255,255,.1);border-radius:10px;background:rgba(255,255,255,.035)}
.cf-brand-eyebrow{font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cf-brand-title{font-family:'Cormorant Garamond',serif;font-size:21px;letter-spacing:.24em;color:rgba(236,240,252,.94)}
.cf-crumb{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(226,230,244,.42)}
.cf-crumb-link{color:rgba(244,224,170,.82);text-decoration:none}
.cf-search,.cf-select{width:100%;border:1px solid rgba(255,255,255,.12);border-radius:9px;background:rgba(255,255,255,.04);color:rgba(236,240,252,.92);font:inherit;outline:none}
.cf-search{height:42px;padding:0 13px}
.cf-select{height:34px;padding:0 10px}
.cf-filter-block{display:flex;flex-direction:column;gap:9px}
.cf-filter-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cf-filter-title{font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,224,170,.72)}
.cf-pills{display:flex;gap:7px;flex-wrap:wrap}
.cf-pill{border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.035);color:rgba(226,230,244,.68);font-size:11px;font-weight:700;padding:7px 10px;cursor:pointer}
.cf-pill.active,.cf-pill:hover{border-color:rgba(214,170,96,.55);background:rgba(214,170,96,.13);color:rgba(244,224,170,.96)}
.cf-reset{height:34px;border:1px solid rgba(214,170,96,.28);border-radius:999px;background:rgba(214,170,96,.07);color:rgba(244,224,170,.86);font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.cf-list{display:flex;flex-direction:column;gap:8px;padding-bottom:20px}
.cf-list-item{display:grid;grid-template-columns:18px minmax(0,1fr) auto;gap:10px;align-items:center;border:1px solid rgba(255,255,255,.08);border-radius:10px;background:rgba(255,255,255,.025);padding:11px 10px;text-align:left;cursor:pointer}
.cf-list-item:hover,.cf-list-item.active{border-color:rgba(214,170,96,.45);background:rgba(214,170,96,.09)}
.cf-diamond{width:9px;height:9px;transform:rotate(45deg);border:1px solid rgba(214,170,96,.8);background:rgba(7,8,12,.9)}
.cf-list-body{display:flex;flex-direction:column;gap:3px;min-width:0}
.cf-list-title{font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(236,240,252,.94);line-height:1.1}
.cf-list-meta{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(226,230,244,.44);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cf-source{display:inline-flex;align-items:center;justify-content:center;border-radius:6px;background:rgba(214,170,96,.85);color:rgba(20,15,6,.95);font-size:9.5px;font-weight:800;letter-spacing:.08em;padding:4px 7px}
.cf-source.large{font-size:11px;padding:7px 9px}
.cf-empty{border:1px dashed rgba(255,255,255,.13);border-radius:10px;padding:18px;text-align:center;color:rgba(226,230,244,.48)}
.cf-detail{min-width:0;padding:54px clamp(24px,5vw,76px)}
.cf-card{position:relative;max-width:980px;margin:0 auto;border:1px solid rgba(255,255,255,.09);border-radius:14px;background:linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.015));box-shadow:0 30px 90px rgba(0,0,0,.35);padding:34px}
.cf-card.empty{font-family:'Cormorant Garamond',serif;font-size:22px;color:rgba(226,230,244,.55)}
.cf-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}
.cf-eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(214,170,96,.76)}
.cf-card h1{margin:7px 0 0;font-family:'Cormorant Garamond',serif;font-size:48px;line-height:1.02;letter-spacing:.03em;text-transform:uppercase;color:rgba(236,240,252,.98)}
.cf-subtitle{margin-top:8px;font-family:'Cormorant Garamond',serif;font-size:21px;color:rgba(226,230,244,.62)}
.cf-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}
.cf-action{min-height:34px;display:inline-flex;align-items:center;border:1px solid rgba(214,170,96,.32);border-radius:999px;background:rgba(214,170,96,.08);color:rgba(244,224,170,.9);font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:0 13px}
.cf-action.muted{border-color:rgba(255,255,255,.12);background:rgba(255,255,255,.035);color:rgba(226,230,244,.55)}
.cf-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;margin-top:24px;border:1px solid rgba(255,255,255,.08);border-radius:10px;overflow:hidden;background:rgba(255,255,255,.045)}
.cf-stats div{display:flex;flex-direction:column;gap:6px;background:rgba(5,6,10,.58);padding:13px}
.cf-stats span{font-size:9px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(226,230,244,.38)}
.cf-stats strong{font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(244,224,170,.9);line-height:1.15}
.cf-text{display:flex;flex-direction:column;gap:13px;margin:26px 0 0;font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.62;color:rgba(226,230,244,.8)}
.cf-text p{margin:0}
.cf-text-section{display:flex;flex-direction:column;gap:3px}
.cf-text-section h2{margin:0;font-family:'Hanken Grotesk',sans-serif;font-size:15px;line-height:1.3;font-weight:800;letter-spacing:.01em;color:rgba(236,240,252,.96);text-transform:none}
.cf-text-section p{margin:0}
.cf-text-example{margin:2px 0;border-left:2px solid rgba(92,142,236,.95);background:rgba(226,230,244,.065);padding:15px 18px;font-family:'Hanken Grotesk',sans-serif;font-size:15px;line-height:1.48;color:rgba(226,230,244,.78)}
.cf-text-formula{align-self:center;text-align:center;font-family:'Hanken Grotesk',sans-serif;font-size:15px;line-height:1.42;color:rgba(236,240,252,.9)}
.cf-text-formula strong{font-weight:800;color:rgba(236,240,252,.98)}
.cf-items,.cf-spells{display:flex;flex-direction:column;gap:12px;margin-top:22px}
.cf-item,.cf-spell{border:1px solid rgba(214,170,96,.16);border-radius:10px;background:rgba(7,8,12,.28);padding:15px 17px}
.cf-item summary,.cf-spell summary{cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:21px;color:rgba(244,224,170,.94)}
.cf-item p,.cf-spell p{margin:10px 0 0;font-family:'Cormorant Garamond',serif;font-size:17px;line-height:1.58;color:rgba(226,230,244,.78)}
.cf-table{margin-top:22px;border:1px solid rgba(214,170,96,.18);border-radius:10px;overflow:hidden;max-width:520px}
.cf-table-head,.cf-table-row{display:grid;grid-template-columns:130px minmax(0,1fr)}
.cf-table-head{background:rgba(214,170,96,.12);font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,224,170,.9)}
.cf-table-head span,.cf-table-row span{padding:10px 14px}
.cf-table-head span+span,.cf-table-row span+span{border-left:1px solid rgba(255,255,255,.06)}
.cf-table-row{border-top:1px solid rgba(255,255,255,.055);font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(226,230,244,.82)}
.cf-spell summary{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.cf-spell small{font-family:'Hanken Grotesk',sans-serif;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(226,230,244,.45)}
.cf-spell-meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;font-size:11.5px;color:rgba(226,230,244,.55)}
@media (max-width: 940px){
  .cf-page{grid-template-columns:1fr}
  .cf-sidebar{position:relative;height:auto}
  .cf-detail{padding:24px}
  .cf-card{padding:24px}
  .cf-card h1{font-size:34px}
  .cf-stats{grid-template-columns:1fr 1fr}
}
@media (max-width: 560px){
  .cf-filter-row,.cf-stats,.cf-spell-meta{grid-template-columns:1fr}
  .cf-card-top{flex-direction:column}
  .cf-table-head,.cf-table-row{grid-template-columns:90px minmax(0,1fr)}
}
</style>
