<script setup>
import { PF2E_CLASSES, PF2E_CLASS_BY_ID, PF2E_CLASS_FAMILIES } from '~/data/pf2e/classes/index.js'
import { useThreadConstellation } from '~/composables/useThreadConstellation.js'

const route = useRoute()

const CATALOGUE_PATH = '/pf2e/classes'
const SYSTEM_PATH = '/pf2e'
const SYSTEM_LABEL = 'Pathfinder 2e'

const search = ref('')
const copiedLink = ref(false)
const selectedSubclassIndex = ref(null)
const featLevelFilter = ref('all')
const descExpanded = ref(false)

const slug = computed(() => {
  const raw = route.params.slug
  return Array.isArray(raw) ? raw[0] : raw || ''
})

const selectedClass = computed(() => (slug.value ? PF2E_CLASS_BY_ID[slug.value] || null : null))

if (slug.value && !PF2E_CLASS_BY_ID[slug.value]) {
  throw createError({ statusCode: 404, statusMessage: 'Класс Pathfinder 2e не найден' })
}

const filteredClasses = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return PF2E_CLASSES
  return PF2E_CLASSES.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.originalName.toLowerCase().includes(q) ||
    item.role.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  )
})

const isDetail = computed(() => Boolean(selectedClass.value))

const { canvasEl: rlCanvasEl, center: rlCenter, fit: rlFit, map: classesMap } = useThreadConstellation(filteredClasses, {
  label: item => item.title,
  portrait: item => item.image,
  isDetail
})

function goToClass(item) {
  navigateTo(`${CATALOGUE_PATH}/${item.id}`)
}

// The subclass tabs default to the first entry; picking one overrides it, and
// switching classes has to forget the previous pick.
const activeSubclassIndex = computed(() => selectedSubclassIndex.value ?? 0)
const activeSubclass = computed(() => selectedClass.value?.subclasses?.[activeSubclassIndex.value] || null)
watch(slug, () => {
  selectedSubclassIndex.value = null
  featLevelFilter.value = 'all'
  descExpanded.value = false
})

const summaryRows = computed(() => {
  const c = selectedClass.value
  if (!c) return []
  const p = c.proficiencies
  return [
    { label: 'Ключевая характеристика', value: c.keyAbility },
    { label: 'Хиты за уровень', value: `${c.hp} + модификатор Телосложения` },
    { label: 'Восприятие', value: p.perception },
    { label: 'Спасброски', value: `Стойкость — ${p.fortitude}; Рефлексы — ${p.reflex}; Воля — ${p.will}` },
    { label: 'Навыки', value: p.skills },
    { label: 'Атаки', value: p.attacks },
    { label: 'Защита', value: p.defenses },
    { label: 'Сл класса', value: p.classDc },
    { label: 'Заклинания', value: p.spells }
  ]
})

const ancestryFeatsSource = computed(() => selectedClass.value?.classFeats || [])
const featLevels = computed(() => Array.from(new Set(ancestryFeatsSource.value.map(f => f.level))).sort((a, b) => a - b))
const featGroups = computed(() => {
  const levels = featLevelFilter.value === 'all'
    ? featLevels.value
    : featLevels.value.filter(l => l === featLevelFilter.value)
  return levels.map(level => ({ level, feats: ancestryFeatsSource.value.filter(f => f.level === level) }))
})

function featActionGlyph(actions = '') {
  const map = { 1: '◆', 2: '◆◆', 3: '◆◆◆', reaction: '⤶', free: '◇' }
  return map[String(actions).toLowerCase()] || ''
}
function featParagraphs(text = '') {
  return String(text).split(/\n\s*\n/g).map(t => t.trim()).filter(Boolean)
}

const familyLabel = computed(() => PF2E_CLASS_FAMILIES[selectedClass.value?.family]?.label || '')

async function copyClassLink() {
  if (!import.meta.client) return
  const url = new URL(route.fullPath, window.location.origin).toString()
  await navigator.clipboard?.writeText(url)
  copiedLink.value = true
  setTimeout(() => { copiedLink.value = false }, 1600)
}
function printClass() {
  if (import.meta.client) window.print()
}

useHead(() => ({
  title: selectedClass.value
    ? `${selectedClass.value.title} — Pathfinder 2e — TKK.club`
    : 'Классы — Pathfinder 2e — TKK.club'
}))
</script>

<template>
  <div class="races-page">
    <!-- LIST VIEW: same constellation map as the ancestry catalogue -->
    <div v-if="!selectedClass" class="rl">
      <main class="rl-mobile" aria-label="Каталог классов">
        <header class="rl-mobile-head">
          <NuxtLink :to="SYSTEM_PATH" class="rl-mobile-back" aria-label="Назад к Pathfinder 2e">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
          </NuxtLink>
          <div class="rl-mobile-brand"><span>Threads of the Knot of Knots</span><b>TKK<em>.club</em></b></div>
          <span class="rl-mobile-head-spacer" />
        </header>

        <section class="rl-mobile-hero">
          <NuxtLink :to="SYSTEM_PATH" class="rl-mobile-centre" aria-label="Назад к Pathfinder 2e">
            <span /><span />
            <img src="/assets/nodes/klassy.png" alt="Классы">
          </NuxtLink>
          <div>
            <span>{{ SYSTEM_LABEL }}</span>
            <h1>Классы</h1>
            <p>{{ PF2E_CLASSES.length }} классов</p>
          </div>
        </section>

        <label class="rl-mobile-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/></svg>
          <input v-model="search" type="search" placeholder="Найти класс">
          <span v-if="search" @click="search = ''">×</span>
        </label>

        <section class="rl-mobile-list">
          <button v-for="node in classesMap.nodes" :key="node.item.id" type="button" @click="goToClass(node.item)">
            <span class="rl-mobile-portrait">
              <img :src="node.portrait" :alt="node.label" @error="$event.target.src = node.emblem">
            </span>
            <span class="rl-mobile-copy">
              <b>{{ node.label }}</b>
              <small>{{ node.item.originalName }} · {{ node.item.role }}</small>
            </span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
          </button>
          <p v-if="!classesMap.nodes.length" class="rl-mobile-empty">По вашему запросу ничего не найдено.</p>
        </section>
      </main>

      <canvas ref="rlCanvasEl" class="rl-canvas" />

      <svg class="rl-conn">
        <g :transform="`translate(${rlCenter.x},${rlCenter.y}) scale(${rlFit})`">
          <g class="rl-halo">
            <rect x="-300" y="-300" width="600" height="600" transform="rotate(45)" />
            <rect x="-430" y="-430" width="860" height="860" transform="rotate(45)" />
          </g>
          <path v-for="(s, i) in classesMap.stubs" :key="'s'+i" :d="s" class="rl-stub" />
          <g v-for="(c, i) in classesMap.connectors" :key="'c'+i">
            <path :d="c.d" :style="c.glow" />
            <path :d="c.d" :style="c.base" />
            <path :d="c.d" :style="c.flow" />
            <circle :r="c.sparkR" :style="c.sparkStyle">
              <animateMotion :dur="c.sparkDur" :begin="c.sparkBegin" repeatCount="indefinite" :path="c.d" />
            </circle>
          </g>
          <path v-for="(m, i) in classesMap.markers" :key="'m'+i" :d="m.d" :style="m.style" />
        </g>
      </svg>

      <div class="rl-nodes" :style="{ transform: `scale(${rlFit})` }">
        <NuxtLink :to="SYSTEM_PATH" class="rl-node rl-node-center" title="К карте Pathfinder 2e">
          <div class="rl-disc rl-disc-center" />
          <div class="rl-knot rl-knot-center">
            <img src="/assets/nodes/klassy.png" alt="Классы">
          </div>
          <div class="rl-text rl-text-below">
            <div class="rl-label rl-label-center">Классы</div>
          </div>
        </NuxtLink>

        <button
          v-for="node in classesMap.nodes"
          :key="node.item.id"
          type="button"
          class="rl-node"
          :style="{ transform: `translate(${node.x}px, ${node.y}px)` }"
          @click="goToClass(node.item)"
        >
          <div class="rl-portrait">
            <img :src="node.portrait" :alt="node.label" draggable="false" @error="$event.target.src = node.emblem">
          </div>
          <div class="rl-text" :class="{ 'rl-text-above': node.labelAbove, 'rl-text-below': !node.labelAbove }">
            <div class="rl-label">{{ node.label }}</div>
          </div>
        </button>
      </div>

      <div class="rl-wordmark">
        <div class="rl-wordmark-eyebrow">Threads of the Knot of Knots</div>
        <div class="rl-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
      </div>

      <nav class="rl-crumb">
        <NuxtLink to="/" class="rl-crumb-link">Системы</NuxtLink>
        <span class="rl-crumb-sep">/</span>
        <span class="rl-crumb-strong">Классы</span>
        <NuxtLink to="/" class="rl-crumb-exit">← выйти</NuxtLink>
      </nav>

      <div class="rl-search-wrap">
        <input v-model="search" class="rl-search" type="search" placeholder="Поиск класса...">
      </div>

      <aside class="rl-sidebar" aria-label="Навигация">
        <NuxtLink to="/" class="rl-sidebar-btn" title="Главная">
          <img src="/assets/knot-main.png" width="30" height="30" style="display:block;object-fit:contain">
          <span>Главная</span>
        </NuxtLink>
        <NuxtLink :to="SYSTEM_PATH" class="rl-sidebar-btn" title="Система">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>
          <span>Система</span>
        </NuxtLink>
        <div class="rl-sidebar-theme"><ThemeSwitcher compact /><span>Тема</span></div>
      </aside>
    </div>

    <!-- DETAIL DOSSIER -->
    <div v-else class="rd">
      <aside class="rd-nav">
        <NuxtLink to="/" class="rd-nav-btn rd-nav-main" title="Главная">
          <img src="/assets/knot-main.png" width="24" height="24" style="display:block;object-fit:contain">
          <span>Главная</span>
        </NuxtLink>
        <NuxtLink :to="CATALOGUE_PATH" class="rd-nav-btn" title="Все классы">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
          <span>Классы</span>
        </NuxtLink>
        <NuxtLink :to="SYSTEM_PATH" class="rd-nav-btn" title="Система">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>
          <span>Система</span>
        </NuxtLink>
        <div class="rd-nav-theme"><ThemeSwitcher compact /><span>Тема</span></div>
      </aside>

      <div class="rd-main">
        <header class="rd-top">
          <div class="rd-wordmark">
            <div class="rd-wordmark-eyebrow">Threads of the Knot of Knots</div>
            <div class="rd-wordmark-title">TKK<span style="opacity:.5">.club</span></div>
          </div>
          <div class="rd-top-right">
            <nav class="rd-crumb">
              <NuxtLink to="/" class="crumb-link">Системы</NuxtLink>
              <span class="crumb-sep">/</span>
              <NuxtLink :to="CATALOGUE_PATH" class="crumb-link crumb-gold">Классы</NuxtLink>
              <span class="crumb-sep">/</span>
              <span class="crumb-gold">{{ selectedClass.title }}</span>
            </nav>
            <div class="rd-actions">
              <button class="rd-action-btn" type="button" :title="copiedLink ? 'Скопировано' : 'Скопировать ссылку'" @click="copyClassLink">
                <span v-if="copiedLink">✓</span><span v-else>🔗</span>
              </button>
              <button class="rd-action-btn" type="button" title="Печать" @click="printClass">🖨</button>
              <NuxtLink :to="CATALOGUE_PATH" class="rd-action-btn" title="Закрыть">✕</NuxtLink>
            </div>
          </div>
        </header>

        <div class="rd-window">
          <section class="rd-central-head">
            <NuxtLink :to="CATALOGUE_PATH" class="rd-central-emblem rd-central-emblem--clean-knot">
              <img :src="selectedClass.image" :alt="selectedClass.title">
            </NuxtLink>
            <div class="rd-central-copy">
              <h1 class="rd-title">{{ selectedClass.title }}</h1>
              <div class="rd-subtitle">{{ selectedClass.originalName }} · {{ selectedClass.role }}</div>
              <div class="rd-source-line">{{ familyLabel }} · {{ selectedClass.source }}</div>
            </div>
          </section>

          <div class="rd-thread">
            <aside class="rd-edition-note rd-thread-node">
              <span class="rd-edition-note-mark" aria-hidden="true">PF2e</span>
              <div>
                <h2>Как читать класс в Pathfinder 2e</h2>
                <p>
                  Класс задаёт ключевую характеристику, хиты за уровень и стартовые владения, а дальше
                  растёт ступенями мастерства: обучен → эксперт → мастер → легенда. Классовые таланты
                  берутся на чётных уровнях, таланты навыков — вместе с ними, общие таланты и повышения
                  навыков — на нечётных, повышения характеристик — на 5, 10, 15 и 20.
                </p>
              </div>
            </aside>

            <section class="rd-block rd-thread-node">
              <h2 class="rd-h2">Описание</h2>
              <div class="rd-variety-desc">
                <p>{{ selectedClass.description }}</p>
                <template v-if="descExpanded">
                  <p v-for="(paragraph, i) in selectedClass.lore" :key="i">{{ paragraph }}</p>
                </template>
              </div>
              <button v-if="selectedClass.lore?.length" class="rd-desc-toggle" type="button" @click="descExpanded = !descExpanded">
                <span v-if="descExpanded" class="rd-desc-toggle-arrow">↑</span>
                <span v-else class="rd-desc-toggle-ellipsis">…</span>
                {{ descExpanded ? 'Свернуть описание' : 'Продолжить чтение' }}
              </button>
            </section>

            <section class="rd-block rd-summary-block rd-details-block rd-thread-node">
              <h2 class="rd-h2">Начальные владения</h2>
              <div class="rd-summary-grid">
                <div v-for="row in summaryRows" :key="row.label" class="rd-stat">
                  <span class="rd-stat-label">{{ row.label }}</span>
                  <span class="rd-stat-value">{{ row.value }}</span>
                </div>
              </div>
              <div class="rd-details-divider" aria-hidden="true"><span /></div>
              <div class="rd-features">
                <div v-for="feature in selectedClass.keyFeatures" :key="feature.name" class="rd-feat" :class="{ wide: feature.text.length > 200 }">
                  <span class="rd-feat-name">{{ feature.name }}<span class="rd-feat-tag">{{ feature.level }} ур.</span></span>
                  <span class="rd-feat-text">{{ feature.text }}</span>
                </div>
              </div>
            </section>

            <section v-if="selectedClass.subclasses?.length" class="rd-block rd-thread-node">
              <h2 class="rd-h2">
                {{ selectedClass.subclassLabel }}
                <span class="rd-h2-sub">{{ activeSubclass?.name }}</span>
              </h2>
              <p class="rd-feats-note">{{ selectedClass.subclassIntro }}</p>
              <div class="rd-variety-tabs">
                <button
                  v-for="(sub, i) in selectedClass.subclasses"
                  :key="sub.name"
                  class="rd-vtab"
                  :class="{ active: activeSubclassIndex === i }"
                  type="button"
                  @click="selectedSubclassIndex = i"
                >
                  <span class="rd-vtab-diamond" aria-hidden="true" />
                  {{ sub.name }}
                </button>
              </div>
              <div v-if="activeSubclass" class="rd-variety-desc rd-subclass-body">
                <p>{{ activeSubclass.text }}</p>
              </div>
            </section>

            <section class="rd-block rd-thread-node">
              <h2 class="rd-h2">Таблица класса</h2>
              <p class="rd-feats-note">Строка уровня перечисляет всё, что вы получаете на нём: сначала собственные особенности класса, затем заклинания, затем общие для всех классов выборы.</p>
              <div class="rd-ct">
                <div class="rd-ct-head">
                  <span>Ур.</span>
                  <span>Что вы получаете</span>
                </div>
                <div v-for="row in selectedClass.table" :key="row.level" class="rd-ct-row">
                  <span class="rd-ct-level">{{ row.level }}</span>
                  <span class="rd-ct-features">
                    <span v-for="feature in row.features" :key="feature" class="rd-ct-chip">{{ feature }}</span>
                  </span>
                </div>
              </div>
            </section>

            <div v-if="ancestryFeatsSource.length" class="rd-block rd-feats-block rd-thread-node">
              <h2 class="rd-h2">Классовые таланты</h2>
              <p class="rd-feats-note">
                Классовые таланты берутся на чётных уровнях, а некоторые классы получают первый уже на 1 уровне.
                Талант доступен, если его уровень не превышает ваш.
              </p>
              <div class="rd-feat-levels">
                <button type="button" class="rd-feat-level" :class="{ active: featLevelFilter === 'all' }" @click="featLevelFilter = 'all'">Все</button>
                <button
                  v-for="level in featLevels"
                  :key="level"
                  type="button"
                  class="rd-feat-level"
                  :class="{ active: featLevelFilter === level }"
                  @click="featLevelFilter = level"
                >{{ level }} ур.</button>
              </div>

              <div v-for="group in featGroups" :key="group.level" class="rd-feat-group">
                <div class="rd-feat-group-head">
                  <span class="rd-feat-group-level"><i aria-hidden="true" /><b>{{ group.level }}</b></span>
                  <span class="rd-feat-group-label">уровень</span>
                  <i aria-hidden="true" />
                </div>
                <article v-for="feat in group.feats" :key="feat.name" class="rd-pf-feat">
                  <header class="rd-pf-feat-head">
                    <h3>
                      {{ feat.name }}
                      <em v-if="featActionGlyph(feat.actions)" class="rd-pf-actions" :title="`Действия: ${feat.actions}`">{{ featActionGlyph(feat.actions) }}</em>
                    </h3>
                    <span class="rd-pf-feat-tier">Талант {{ feat.level }}</span>
                  </header>
                  <div v-if="feat.traits?.length" class="rd-pf-traits">
                    <span v-for="trait in feat.traits" :key="trait" class="rd-pf-trait">{{ trait }}</span>
                  </div>
                  <dl class="rd-pf-meta">
                    <div v-if="feat.prerequisites"><dt>Требования</dt><dd>{{ feat.prerequisites }}</dd></div>
                    <div v-if="feat.frequency"><dt>Частота</dt><dd>{{ feat.frequency }}</dd></div>
                    <div v-if="feat.trigger"><dt>Триггер</dt><dd>{{ feat.trigger }}</dd></div>
                    <div v-if="feat.requirements"><dt>Условие</dt><dd>{{ feat.requirements }}</dd></div>
                  </dl>
                  <p v-for="(paragraph, pi) in featParagraphs(feat.text)" :key="pi" class="rd-pf-feat-text">{{ paragraph }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../../assets/css/thread-dossier.css"></style>

<style scoped>
/* Class table: a level column of diamonds and a wrapping row of feature chips. */
.rd-ct{border:1px solid rgba(var(--theme-contrast-rgb),.08);border-radius:13px;overflow:hidden}
.rd-ct-head{display:grid;grid-template-columns:64px minmax(0,1fr);gap:14px;padding:10px 16px;background:rgba(var(--theme-contrast-rgb),.04);font-family:'Hanken Grotesk';font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.5)}
.rd-ct-row{display:grid;grid-template-columns:64px minmax(0,1fr);gap:14px;align-items:start;padding:11px 16px;border-top:1px solid rgba(var(--theme-contrast-rgb),.06);transition:background .2s}
.rd-ct-row:hover{background:rgba(var(--theme-accent-rgb),.06)}
.rd-ct-level{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;color:rgba(var(--theme-accent-strong-rgb),.95);font-family:'Cormorant Garamond',serif;font-size:18px;line-height:1;position:relative}
.rd-ct-level::before{content:'';position:absolute;inset:1px 0;width:28px;left:1px;border:1px solid rgba(var(--theme-accent-rgb),.34);transform:rotate(45deg)}
.rd-ct-features{display:flex;flex-wrap:wrap;gap:6px}
.rd-ct-chip{border:1px solid rgba(var(--theme-contrast-rgb),.09);background:rgba(var(--theme-contrast-rgb),.02);color:rgba(var(--theme-text-rgb),.74);padding:4px 10px;border-radius:999px;font-size:12px;line-height:1.35}
.rd-ct-row:hover .rd-ct-chip{border-color:rgba(var(--theme-accent-rgb),.24)}
.rd-subclass-body{margin-top:16px}
.rd-central-copy{display:flex;flex-direction:column;gap:6px;align-items:center;text-align:center}
.rd-source-line{font-family:'Hanken Grotesk';font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(var(--theme-text-rgb),.45)}
@media(max-width:720px){
  .rd-ct-head,.rd-ct-row{grid-template-columns:44px minmax(0,1fr);gap:10px;padding:10px 12px}
  .rd-ct-level{min-width:24px;height:24px;font-size:15px}
  .rd-ct-level::before{width:22px;inset:1px 0}
}
</style>
