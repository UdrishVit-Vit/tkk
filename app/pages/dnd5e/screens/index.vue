<script setup>
import { RULE_SCREEN_GROUPS_5E, RULE_SCREENS_5E, RULE_SCREEN_BY_SLUG_5E } from '~/data/ruleScreens5e.js'
import { RULE_SCREEN_LOADERS_5E } from '~/data/ruleScreenRegistry5e.js'

const route = useRoute()
const router = useRouter()
const { bookmarks, load: loadBookmarks, isBookmarked, toggle: toggleBookmark } = useRuleBookmarks5e()

const search = ref('')
const openSection = ref(null)
const openRule = ref(null)
const loadingSection = ref(null)
const copiedRule = ref(null)
const sectionCache = shallowRef({})
const activeFilters = ref([])
const showFilter = ref(false)

const groups = computed(() => RULE_SCREEN_GROUPS_5E.map(group => ({
  ...group,
  anchor: `screen-${group.id}`,
  screens: group.items
    .map(slug => RULE_SCREEN_BY_SLUG_5E[slug])
    .filter(Boolean)
    .map(screen => ({
      ...screen,
      terms: screen.terms || [],
      isLocal: Boolean(screen.path)
    }))
})))

const totalScreens = computed(() => RULE_SCREENS_5E.length)
const query = computed(() => search.value.trim().toLowerCase())

const filteredGroups = computed(() => groups.value
  .filter(group => !activeFilters.value.length || activeFilters.value.includes(group.id))
  .map(group => ({
    ...group,
    screens: group.screens.filter(screen => {
      if (!query.value) return true

      return [
        group.title,
        screen.title,
        screen.titleEn,
        screen.summary,
        ...screen.terms
      ].join(' ').toLowerCase().includes(query.value)
    })
  }))
  .filter(group => group.screens.length))

function toggleFilter(id) {
  activeFilters.value = activeFilters.value.includes(id)
    ? activeFilters.value.filter(item => item !== id)
    : [...activeFilters.value, id]
}

function resetFilters() {
  activeFilters.value = []
}

const totalVisible = computed(() => filteredGroups.value.reduce((sum, group) => sum + group.screens.length, 0))

const openData = computed(() => sectionCache.value[openSection.value] || null)

async function ensureSection(slug) {
  if (sectionCache.value[slug]) return
  loadingSection.value = slug
  try {
    const data = await RULE_SCREEN_LOADERS_5E[slug]()
    sectionCache.value = { ...sectionCache.value, [slug]: data }
  } finally {
    loadingSection.value = null
  }
}

async function toggleSection(screen) {
  if (openSection.value === screen.slug) {
    openSection.value = null
    openRule.value = null
    return
  }

  openRule.value = null
  await ensureSection(screen.slug)
  openSection.value = screen.slug
}

function toggleRule(rule) {
  openRule.value = openRule.value === rule.slug ? null : rule.slug
}

function rulePagePath(screen, rule) {
  return `${screen.path}/${rule.slug}`
}

async function copyRuleLink(screen, rule) {
  if (typeof window === 'undefined') return
  try {
    await navigator.clipboard?.writeText(`${window.location.origin}${rulePagePath(screen, rule)}`)
    copiedRule.value = rule.slug
    window.setTimeout(() => {
      if (copiedRule.value === rule.slug) copiedRule.value = null
    }, 1400)
  } catch {
    copiedRule.value = null
  }
}

function sectionBookmarkEntry(screen) {
  return { path: screen.path, title: screen.title, titleEn: screen.titleEn, section: 'Раздел ширмы' }
}

function ruleBookmarkEntry(screen, rule) {
  return { path: rulePagePath(screen, rule), title: rule.title, titleEn: rule.titleEn, section: screen.title }
}

// Состояние аккордеона в URL: ?s=<раздел>&r=<правило> — ссылку можно переслать.
watch([openSection, openRule], () => {
  const nextQuery = {}
  if (openSection.value) nextQuery.s = openSection.value
  if (openSection.value && openRule.value) nextQuery.r = openRule.value
  router.replace({ query: nextQuery })
})

onMounted(async () => {
  loadBookmarks()

  const slug = String(route.query.s || '')
  if (!slug || !RULE_SCREEN_LOADERS_5E[slug]) return
  const screen = RULE_SCREEN_BY_SLUG_5E[slug]
  if (!screen?.path) return

  await ensureSection(slug)
  openSection.value = slug

  const ruleSlug = String(route.query.r || '')
  if (ruleSlug) openRule.value = ruleSlug

  await nextTick()
  document.getElementById(`knot-${slug}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
})

function ruleSourceName(rule) {
  return rule.sourceName || openData.value?.screen?.sourceName
}

useSeoMeta({
  title: 'Ширма правил D&D 5e 2014 — TKK.club',
  description: 'Внутренняя ширма правил D&D 5e 2014: действия, бой, проверки, состояния, заклинания, снаряжение, путешествия и инструменты Мастера.'
})
</script>

<template>
  <div class="screens-page">
    <header class="screens-header">
      <nav class="screens-crumb" aria-label="Навигация">
        <NuxtLink to="/">Системы</NuxtLink>
        <span>/</span>
        <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
        <span>/</span>
        <span>Ширма</span>
      </nav>

      <p class="screens-kicker">D&D 5e 2014</p>
      <div class="screens-title-row">
        <img class="screens-title-img" src="/assets/nodes/shirma.png" alt="Ширма-справочник" width="72" height="72">
        <h1>Ширма правил</h1>
      </div>
      <p class="screens-lead">
        Все правила игры — части одной нити. Потяните за узел — нить сплетётся
        и раскроет вложенные правила, не уводя вас со страницы.
      </p>

      <div class="screens-controls">
        <input
          v-model="search"
          type="search"
          class="screens-search"
          placeholder="Найти правило, термин или раздел"
          aria-label="Поиск по ширме"
        >
        <button
          type="button"
          class="screens-filter-btn"
          :class="{ active: activeFilters.length || showFilter }"
          :aria-expanded="showFilter"
          title="Фильтр разделов"
          @click="showFilter = !showFilter"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v6l-4 2v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
          <span v-if="activeFilters.length" class="screens-filter-count">{{ activeFilters.length }}</span>
        </button>
        <span class="screens-count">{{ totalVisible }} / {{ totalScreens }}</span>
      </div>

      <Transition name="weave">
        <div v-if="showFilter" class="screens-filter-panel">
          <button
            v-for="group in groups"
            :key="group.id"
            type="button"
            class="screens-filter-chip"
            :class="{ active: activeFilters.includes(group.id) }"
            @click="toggleFilter(group.id)"
          >
            {{ group.title }}
          </button>
          <button v-if="activeFilters.length" type="button" class="screens-filter-clear" @click="resetFilters">
            Сбросить
          </button>
        </div>
      </Transition>

      <nav v-if="!query" class="screens-anchors" aria-label="Разделы">
        <a v-for="group in groups" :key="group.id" :href="`#screen-${group.id}`">{{ group.title }}</a>
      </nav>
    </header>

    <main class="screens-main">

      <section v-if="bookmarks.length && !query" class="thread-group bookmarks-group">
        <h2 class="thread-group-title">Закладки</h2>

        <div class="thread-items">
          <div v-for="bm in bookmarks" :key="bm.path" class="thread-knot">
            <div class="thread-item bookmark-row">
              <NuxtLink :to="bm.path" class="bookmark-link">
                <span class="thread-item-name">{{ bm.title }}</span>
                <span class="thread-item-en">{{ bm.section || bm.titleEn }}</span>
              </NuxtLink>
              <button type="button" class="star-btn active" title="Убрать из закладок" @click="toggleBookmark(bm)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        v-for="group in filteredGroups"
        :id="group.anchor"
        :key="group.id"
        class="thread-group"
      >
        <h2 class="thread-group-title">{{ group.title }}</h2>

        <div class="thread-items">
          <div
            v-for="screen in group.screens"
            :id="`knot-${screen.slug}`"
            :key="screen.slug"
            class="thread-knot"
            :class="{ open: openSection === screen.slug }"
          >
            <button
              v-if="screen.isLocal"
              type="button"
              class="thread-item"
              :aria-expanded="openSection === screen.slug"
              @click="toggleSection(screen)"
            >
              <span class="thread-item-name">{{ screen.title }}</span>
              <span class="thread-item-en">{{ screen.titleEn }}</span>
              <span class="thread-toggle" aria-hidden="true" :class="{ spinning: loadingSection === screen.slug }" />
            </button>

            <a
              v-else
              class="thread-item"
              :href="screen.sourceUrl"
              target="_blank"
              rel="noopener"
            >
              <span class="thread-item-name">{{ screen.title }}</span>
              <span class="thread-item-en">{{ screen.titleEn }}</span>
              <svg class="thread-ext" viewBox="0 0 24 24" aria-label="внешний источник"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>

            <Transition name="weave">
              <div v-if="openSection === screen.slug && openData" class="branch-wrap">
                <div class="branch">
                  <div class="branch-head">
                    <p v-if="openData.screen.intro" class="branch-intro">
                      <RuleRichText :text="openData.screen.intro" :current-path="screen.path" />
                    </p>
                    <span class="branch-tools">
                      <button
                        type="button"
                        class="star-btn"
                        :class="{ active: isBookmarked(screen.path) }"
                        :title="isBookmarked(screen.path) ? 'Убрать раздел из закладок' : 'Раздел в закладки'"
                        @click="toggleBookmark(sectionBookmarkEntry(screen))"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>
                      </button>
                      <NuxtLink :to="screen.path" class="star-btn branch-open-icon" :title="`Открыть раздел «${screen.title}» на отдельной странице`">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </NuxtLink>
                    </span>
                  </div>

                  <template v-for="ruleGroup in openData.groups" :key="ruleGroup.id">
                    <div v-if="ruleGroup.title" class="branch-group-title">{{ ruleGroup.title }}</div>

                    <div
                      v-for="(rule, i) in ruleGroup.rules"
                      :key="rule.slug"
                      class="rule-knot"
                      :class="{ open: openRule === rule.slug }"
                      :style="{ '--i': i }"
                    >
                      <div class="rule-row">
                        <button
                          type="button"
                          class="rule-item"
                          :aria-expanded="openRule === rule.slug"
                          @click="toggleRule(rule)"
                        >
                          <span class="rule-item-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" v-html="openData.icons[rule.icon] || ''" />
                          </span>
                          <span class="rule-item-name">{{ rule.title }}</span>
                          <span class="rule-item-en">{{ rule.titleEn }}</span>
                          <svg v-if="isBookmarked(rulePagePath(screen, rule))" class="rule-item-star" viewBox="0 0 24 24" aria-label="в закладках"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>
                          <span class="thread-toggle small" aria-hidden="true" />
                        </button>
                        <NuxtLink
                          :to="rulePagePath(screen, rule)"
                          class="star-btn rule-open-icon"
                          :title="`Открыть «${rule.title}» на отдельной странице`"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </NuxtLink>
                      </div>

                      <Transition name="weave">
                        <div v-if="openRule === rule.slug" class="rule-body-wrap">
                          <div class="rule-body">
                            <p class="rule-summary">
                              <RuleRichText :text="rule.summary" :current-path="rulePagePath(screen, rule)" />
                            </p>

                            <dl v-if="rule.quick?.length" class="rule-quick">
                              <div v-for="fact in rule.quick" :key="fact.label">
                                <dt>{{ fact.label }}</dt>
                                <dd><RuleRichText :text="String(fact.value)" :current-path="rulePagePath(screen, rule)" /></dd>
                              </div>
                            </dl>

                            <section v-for="block in rule.blocks" :key="block.title" class="rule-block">
                              <h3>{{ block.title }}</h3>
                              <p v-for="paragraph in block.paragraphs || []" :key="paragraph">
                                <RuleRichText :text="paragraph" :current-path="rulePagePath(screen, rule)" />
                              </p>
                              <ul v-if="block.bullets?.length">
                                <li v-for="bullet in block.bullets" :key="bullet">
                                  <RuleRichText :text="bullet" :current-path="rulePagePath(screen, rule)" />
                                </li>
                              </ul>
                            </section>

                            <footer class="rule-foot">
                              <span
                                v-if="rule.source"
                                class="rule-source-tag"
                                :title="ruleSourceName(rule) || rule.source"
                              >{{ rule.source }}</span>

                              <span class="rule-foot-actions">
                                <button
                                  type="button"
                                  class="rule-foot-icon"
                                  :class="{ active: isBookmarked(rulePagePath(screen, rule)) }"
                                  :title="isBookmarked(rulePagePath(screen, rule)) ? 'Убрать из закладок' : 'Добавить в закладки'"
                                  @click="toggleBookmark(ruleBookmarkEntry(screen, rule))"
                                >
                                  <svg viewBox="0 0 24 24" aria-hidden="true" :class="{ filled: isBookmarked(rulePagePath(screen, rule)) }"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>
                                </button>
                                <button
                                  type="button"
                                  class="rule-foot-icon"
                                  :class="{ active: copiedRule === rule.slug }"
                                  :title="copiedRule === rule.slug ? 'Ссылка скопирована' : 'Скопировать ссылку'"
                                  @click="copyRuleLink(screen, rule)"
                                >
                                  <svg v-if="copiedRule === rule.slug" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4L19 6"/></svg>
                                  <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>
                                </button>
                                <NuxtLink
                                  :to="rulePagePath(screen, rule)"
                                  class="rule-foot-icon"
                                  title="Открыть страницу правила"
                                >
                                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/></svg>
                                </NuxtLink>
                              </span>
                            </footer>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </template>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <div v-if="!filteredGroups.length" class="screens-empty">
        Ничего не найдено. Попробуйте другой термин.
      </div>
    </main>
  </div>
</template>

<style scoped>
.screens-page{
  --t-bg:#07080d;
  --t-line:rgba(232,236,248,.12);
  --t-text:rgba(232,236,248,.9);
  --t-muted:rgba(232,236,248,.58);
  --t-faint:rgba(232,236,248,.38);
  --t-gold:#d6aa60;
  --t-gold-soft:rgba(244,224,170,.9);
  min-height:100vh;
  background:linear-gradient(180deg,rgba(255,255,255,.02),transparent 300px),var(--t-bg);
  color:var(--t-text);
  font-family:'Hanken Grotesk',system-ui,sans-serif;
}

.screens-header,
.screens-main{
  width:min(760px,calc(100% - 48px));
  margin:0 auto;
}

.screens-header{
  padding:38px 0 8px;
}

.screens-crumb{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-bottom:34px;
  font-size:11px;
  font-weight:750;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.screens-crumb a{
  color:var(--t-gold-soft);
  text-decoration:none;
}

.screens-crumb a:hover{
  color:#f4e0aa;
}

.screens-kicker{
  margin:0 0 10px;
  font-size:10px;
  font-weight:800;
  letter-spacing:.26em;
  text-transform:uppercase;
  color:rgba(214,170,96,.72);
}

.screens-title-row{
  display:flex;
  align-items:center;
  gap:20px;
}

.screens-title-img{
  flex:0 0 auto;
  width:72px;
  height:72px;
  object-fit:contain;
}

.screens-header h1{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:52px;
  line-height:1;
  font-weight:500;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:rgba(246,248,255,.96);
}

.screens-lead{
  max-width:600px;
  margin:16px 0 0;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  line-height:1.5;
  color:var(--t-muted);
}

.screens-controls{
  display:flex;
  align-items:center;
  gap:14px;
  margin-top:30px;
}

.screens-search{
  flex:1;
  min-width:0;
  border:0;
  border-bottom:1px solid var(--t-line);
  background:transparent;
  padding:10px 2px;
  color:var(--t-text);
  font:inherit;
  font-size:16px;
  outline:none;
  transition:border-color .18s ease;
}

.screens-search::placeholder{
  color:var(--t-faint);
}

.screens-search:focus{
  border-color:rgba(214,170,96,.6);
}

.screens-count{
  flex:0 0 auto;
  font-size:12px;
  font-weight:700;
  letter-spacing:.08em;
  color:var(--t-faint);
  font-variant-numeric:tabular-nums;
}

.screens-filter-btn{
  position:relative;
  display:grid;
  place-items:center;
  flex:0 0 auto;
  width:34px;
  height:34px;
  border:1px solid var(--t-line);
  border-radius:8px;
  background:none;
  color:var(--t-muted);
  cursor:pointer;
  transition:border-color .16s ease,color .16s ease;
}

.screens-filter-btn svg{
  width:17px;
  height:17px;
}

.screens-filter-btn:hover,
.screens-filter-btn.active{
  border-color:rgba(214,170,96,.5);
  color:var(--t-gold-soft);
}

.screens-filter-count{
  position:absolute;
  top:-6px;
  right:-6px;
  min-width:15px;
  height:15px;
  padding:0 3px;
  border-radius:8px;
  background:var(--t-gold);
  color:#1a1408;
  font-size:9px;
  font-weight:850;
  line-height:15px;
  text-align:center;
}

.screens-filter-panel{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:16px;
  overflow:hidden;
}

.screens-filter-chip{
  border:1px solid var(--t-line);
  border-radius:999px;
  background:none;
  padding:7px 14px;
  color:var(--t-muted);
  font-size:11px;
  font-weight:750;
  letter-spacing:.08em;
  text-transform:uppercase;
  cursor:pointer;
  transition:border-color .16s ease,color .16s ease,background .16s ease;
}

.screens-filter-chip:hover{
  border-color:rgba(214,170,96,.4);
  color:var(--t-gold-soft);
}

.screens-filter-chip.active{
  border-color:rgba(214,170,96,.55);
  background:rgba(214,170,96,.12);
  color:#f4e0aa;
}

.screens-filter-clear{
  border:0;
  background:none;
  padding:7px 6px;
  color:var(--t-faint);
  font-size:11px;
  font-weight:750;
  letter-spacing:.08em;
  text-transform:uppercase;
  cursor:pointer;
  transition:color .16s ease;
}

.screens-filter-clear:hover{
  color:var(--t-gold-soft);
}

.screens-anchors{
  display:flex;
  flex-wrap:wrap;
  gap:6px 20px;
  margin-top:18px;
}

.screens-anchors a{
  font-size:12px;
  font-weight:750;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:var(--t-faint);
  text-decoration:none;
  transition:color .16s ease;
}

.screens-anchors a:hover{
  color:var(--t-gold-soft);
}

.screens-main{
  padding:28px 0 90px;
}

/* ── Нить: вертикальная линия с узлами ─────────────────────────── */
.thread-group{
  position:relative;
  margin-top:40px;
  padding-left:30px;
  scroll-margin-top:24px;
}

.thread-group:first-of-type{
  margin-top:14px;
}

.thread-group::before{
  content:'';
  position:absolute;
  left:5px;
  top:14px;
  bottom:-40px;
  width:1px;
  background:var(--t-line);
}

.thread-group:last-of-type::before{
  bottom:0;
  background:linear-gradient(180deg,var(--t-line) 60%,transparent);
}

.thread-group-title{
  position:relative;
  margin:0 0 6px;
  font-family:'Cormorant Garamond',serif;
  font-size:28px;
  line-height:1.15;
  font-weight:500;
  letter-spacing:.07em;
  text-transform:uppercase;
  color:rgba(246,248,255,.94);
}

.thread-group-title::before{
  content:'';
  position:absolute;
  left:-30px;
  top:11px;
  width:11px;
  height:11px;
  border:1px solid var(--t-gold);
  background:var(--t-bg);
  transform:rotate(45deg);
}

.bookmarks-group .thread-group-title::before{
  background:var(--t-gold);
}

.thread-items{
  display:flex;
  flex-direction:column;
}

.thread-knot{
  border-bottom:1px solid rgba(232,236,248,.05);
  scroll-margin-top:20px;
}

.thread-knot:last-child{
  border-bottom:0;
}

.thread-item{
  position:relative;
  display:flex;
  width:100%;
  align-items:baseline;
  gap:12px;
  padding:12px 2px;
  border:0;
  background:none;
  color:inherit;
  font:inherit;
  text-align:left;
  text-decoration:none;
  cursor:pointer;
}

.thread-item:focus-visible{
  outline:1px solid rgba(214,170,96,.6);
  outline-offset:2px;
}

/* Точка раздела на нити */
.thread-item::before{
  content:'';
  position:absolute;
  left:-27.5px;
  top:21px;
  width:5px;
  height:5px;
  border-radius:50%;
  background:rgba(232,236,248,.28);
  transition:background .18s ease,box-shadow .18s ease,transform .18s ease;
}

.thread-item:hover::before,
.thread-knot.open .thread-item::before{
  background:var(--t-gold);
  box-shadow:0 0 0 3px rgba(214,170,96,.18);
}

.thread-knot.open .thread-item::before{
  transform:scale(1.35);
}

.thread-item-name{
  font-size:17px;
  line-height:1.3;
  font-weight:750;
  color:rgba(246,248,255,.92);
  transition:color .16s ease;
}

.thread-item:hover .thread-item-name,
.thread-knot.open .thread-item-name{
  color:#f4e0aa;
}

.thread-item-en{
  font-size:11.5px;
  font-weight:600;
  color:var(--t-faint);
}

/* Закладки */
.bookmark-row{
  cursor:default;
}

.bookmark-link{
  display:flex;
  align-items:baseline;
  gap:12px;
  min-width:0;
  color:inherit;
  text-decoration:none;
}

.bookmark-link:hover .thread-item-name{
  color:#f4e0aa;
}

.star-btn{
  display:inline-flex;
  align-items:center;
  gap:7px;
  border:0;
  background:none;
  padding:0;
  color:var(--t-faint);
  font:inherit;
  cursor:pointer;
  transition:color .16s ease;
}

.star-btn svg{
  width:15px;
  height:15px;
  fill:none;
  stroke:currentColor;
  stroke-width:1.6;
  stroke-linejoin:round;
}

.star-btn:hover{
  color:var(--t-gold-soft);
}

.star-btn.active{
  color:var(--t-gold);
}

.star-btn.active svg{
  fill:currentColor;
}

.bookmark-row .star-btn{
  margin-left:auto;
  align-self:center;
}

/* Плюс-переключатель, превращающийся в крест */
.thread-toggle{
  position:relative;
  width:14px;
  height:14px;
  margin-left:auto;
  align-self:center;
  flex:0 0 auto;
  transition:transform .3s cubic-bezier(.4,0,.2,1);
}

.thread-toggle::before,
.thread-toggle::after{
  content:'';
  position:absolute;
  left:50%;
  top:50%;
  background:rgba(232,236,248,.4);
  transition:background .16s ease;
}

.thread-toggle::before{
  width:14px;
  height:1px;
  transform:translate(-50%,-50%);
}

.thread-toggle::after{
  width:1px;
  height:14px;
  transform:translate(-50%,-50%);
}

.thread-item:hover .thread-toggle::before,
.thread-item:hover .thread-toggle::after{
  background:var(--t-gold-soft);
}

.thread-knot.open > .thread-item .thread-toggle,
.rule-knot.open .rule-item .thread-toggle{
  transform:rotate(45deg);
}

.thread-toggle.small{
  width:11px;
  height:11px;
}

.thread-toggle.small::before{
  width:11px;
}

.thread-toggle.small::after{
  height:11px;
}

.thread-toggle.spinning{
  animation:spin 1s linear infinite;
}

@keyframes spin{
  to{transform:rotate(180deg)}
}

.thread-ext{
  width:12px;
  height:12px;
  margin-left:auto;
  align-self:center;
  color:rgba(127,159,216,.75);
}

/* ── Раскрытие: ветвь нити ─────────────────────────────────────── */
.branch-wrap,
.rule-body-wrap{
  display:grid;
  grid-template-rows:1fr;
}

.branch-wrap > .branch,
.rule-body-wrap > .rule-body{
  overflow:hidden;
  min-height:0;
}

.weave-enter-active,
.weave-leave-active{
  transition:grid-template-rows .5s cubic-bezier(.4,0,.2,1),opacity .4s ease;
}

.weave-enter-from,
.weave-leave-to{
  grid-template-rows:0fr;
  opacity:0;
}

.branch{
  position:relative;
  margin-left:14px;
  padding:2px 0 18px 24px;
}

/* Ветвь нити, «сплетающаяся» при раскрытии */
.branch::before{
  content:'';
  position:absolute;
  left:0;
  top:0;
  bottom:14px;
  width:1px;
  background:linear-gradient(180deg,rgba(214,170,96,.55),rgba(214,170,96,.14) 85%,transparent);
  transform-origin:top;
  animation:weaveLine .6s cubic-bezier(.4,0,.2,1) both;
}

@keyframes weaveLine{
  from{transform:scaleY(0)}
  to{transform:scaleY(1)}
}

.branch-head{
  display:flex;
  align-items:baseline;
  justify-content:space-between;
  gap:18px;
  padding:8px 0 10px;
  animation:weaveIn .5s .1s both;
}

.branch-intro{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:16.5px;
  line-height:1.45;
  color:var(--t-faint);
}

.branch-tools{
  display:inline-flex;
  align-items:center;
  gap:16px;
  flex:0 0 auto;
}

.branch-page-link{
  flex:0 0 auto;
  border:0;
  background:none;
  padding:0;
  font-size:11px;
  font-weight:750;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:rgba(214,170,96,.66);
  text-decoration:none;
  cursor:pointer;
  transition:color .16s ease;
  white-space:nowrap;
}

.branch-page-link:hover{
  color:var(--t-gold-soft);
}

.branch-group-title{
  margin:14px 0 4px;
  font-size:10.5px;
  font-weight:800;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--t-faint);
  animation:weaveIn .5s .12s both;
}

/* ── Узлы правил ───────────────────────────────────────────────── */
.rule-knot{
  animation:weaveIn .45s both;
  animation-delay:calc(80ms + var(--i) * 30ms);
}

@keyframes weaveIn{
  from{
    opacity:0;
    transform:translateX(-10px);
  }
  to{
    opacity:1;
    transform:translateX(0);
  }
}

.rule-row{
  display:flex;
  align-items:center;
  gap:12px;
}

.rule-open-icon{
  flex:0 0 auto;
  opacity:.5;
  transition:opacity .16s ease,color .16s ease;
}

.rule-row:hover .rule-open-icon,
.rule-knot.open .rule-open-icon{
  opacity:1;
}

.rule-item{
  position:relative;
  display:flex;
  flex:1;
  min-width:0;
  align-items:center;
  gap:11px;
  padding:8px 2px;
  border:0;
  background:none;
  color:inherit;
  font:inherit;
  text-align:left;
  cursor:pointer;
}

.rule-item:focus-visible{
  outline:1px solid rgba(214,170,96,.6);
  outline-offset:2px;
}

/* Стежок: короткая горизонтальная нить от ветви к правилу */
.rule-item::before{
  content:'';
  position:absolute;
  left:-24px;
  top:50%;
  width:14px;
  height:1px;
  background:rgba(214,170,96,.3);
  transform-origin:left;
  transition:background .16s ease;
}

.rule-item:hover::before,
.rule-knot.open .rule-item::before{
  background:rgba(214,170,96,.7);
}

.rule-item-icon{
  display:grid;
  place-items:center;
  width:22px;
  height:22px;
  flex:0 0 auto;
  color:rgba(214,170,96,.6);
  transition:color .16s ease;
}

.rule-item:hover .rule-item-icon,
.rule-knot.open .rule-item-icon{
  color:var(--t-gold-soft);
}

.rule-item-icon svg{
  width:20px;
  height:20px;
}

.rule-item-name{
  font-size:15px;
  line-height:1.3;
  font-weight:700;
  color:rgba(240,243,250,.88);
  transition:color .16s ease;
}

.rule-item:hover .rule-item-name,
.rule-knot.open .rule-item-name{
  color:#f4e0aa;
}

.rule-item-en{
  font-size:11px;
  font-weight:600;
  color:var(--t-faint);
}

.rule-item-star{
  width:11px;
  height:11px;
  flex:0 0 auto;
  fill:rgba(214,170,96,.8);
  stroke:none;
}

/* ── Текст правила ─────────────────────────────────────────────── */
.rule-body{
  position:relative;
  margin-left:10px;
  padding:4px 0 16px 22px;
}

.rule-body::before{
  content:'';
  position:absolute;
  left:0;
  top:0;
  bottom:12px;
  width:1px;
  background:linear-gradient(180deg,rgba(214,170,96,.4),transparent);
  transform-origin:top;
  animation:weaveLine .5s cubic-bezier(.4,0,.2,1) both;
}

.rule-summary{
  margin:6px 0 0;
  font-family:'Cormorant Garamond',serif;
  font-size:19px;
  line-height:1.5;
  color:rgba(228,234,244,.85);
  animation:weaveIn .45s .08s both;
}

.rule-quick{
  display:flex;
  flex-wrap:wrap;
  gap:4px 28px;
  margin:14px 0 0;
  border-top:1px solid rgba(232,236,248,.07);
  border-bottom:1px solid rgba(232,236,248,.07);
  padding:9px 0;
  animation:weaveIn .45s .14s both;
}

.rule-quick div{
  display:flex;
  align-items:baseline;
  gap:8px;
}

.rule-quick dt{
  margin:0;
  font-size:9.5px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.rule-quick dd{
  margin:0;
  font-size:14px;
  font-weight:700;
  color:var(--t-gold-soft);
}

.rule-block{
  margin-top:18px;
  animation:weaveIn .5s .2s both;
}

.rule-block h3{
  margin:0 0 8px;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  line-height:1.2;
  font-weight:600;
  letter-spacing:.04em;
  text-transform:uppercase;
  color:rgba(246,248,255,.9);
}

.rule-block p{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  line-height:1.55;
  color:rgba(224,232,242,.8);
}

.rule-block p+p{
  margin-top:9px;
}

.rule-block ul{
  display:flex;
  flex-direction:column;
  gap:6px;
  margin:9px 0 0;
  padding-left:20px;
  font-family:'Cormorant Garamond',serif;
  font-size:18px;
  line-height:1.45;
  color:rgba(224,232,242,.8);
}

.rule-block li::marker{
  color:var(--t-gold);
}

.rule-foot{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:10px 16px;
  margin-top:18px;
  animation:weaveIn .5s .26s both;
}

.rule-source-tag{
  font-size:11px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--t-faint);
  cursor:help;
  border-bottom:1px dotted rgba(232,236,248,.28);
}

.rule-foot-actions{
  display:inline-flex;
  align-items:center;
  gap:7px;
  margin-left:auto;
}

.rule-foot .rule-foot-icon{
  display:grid;
  place-items:center;
  width:30px;
  height:30px;
  border:1px solid var(--t-line);
  border-radius:7px;
  background:none;
  color:var(--t-muted);
  cursor:pointer;
  text-decoration:none;
  transition:border-color .16s ease,color .16s ease;
}

.rule-foot .rule-foot-icon svg{
  width:15px;
  height:15px;
  fill:none;
  stroke:currentColor;
  stroke-width:1.8;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.rule-foot .rule-foot-icon svg.filled{
  fill:currentColor;
}

.rule-foot .rule-foot-icon:hover,
.rule-foot .rule-foot-icon.active{
  border-color:rgba(214,170,96,.5);
  color:var(--t-gold-soft);
}

.screens-empty{
  margin-top:40px;
  padding:40px 0;
  text-align:center;
  color:var(--t-muted);
  border-top:1px solid var(--t-line);
  border-bottom:1px solid var(--t-line);
}

@media (prefers-reduced-motion:reduce){
  .weave-enter-active,
  .weave-leave-active{
    transition:none;
  }

  .branch::before,
  .rule-body::before,
  .branch-head,
  .branch-group-title,
  .rule-knot,
  .rule-summary,
  .rule-quick,
  .rule-block,
  .rule-foot{
    animation:none;
  }
}

@media (max-width:720px){
  .screens-header,
  .screens-main{
    width:min(100% - 32px,760px);
  }

  .screens-header h1{
    font-size:40px;
  }

  .screens-title-img{
    width:54px;
    height:54px;
  }

  .screens-title-row{
    gap:14px;
  }

  .screens-lead{
    font-size:18px;
  }

  .branch{
    margin-left:4px;
    padding-left:16px;
  }

  .rule-item::before{
    left:-16px;
    width:9px;
  }

  .branch-head{
    flex-direction:column;
    gap:8px;
  }

  .rule-body{
    margin-left:4px;
    padding-left:14px;
  }

  .thread-item{
    flex-wrap:wrap;
    row-gap:2px;
  }
}
</style>
