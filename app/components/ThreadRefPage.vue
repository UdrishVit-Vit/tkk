<script setup>
// Переиспользуемый каркас справочника в дизайне «нить» (как /dnd5e/screens).
// Данные, фильтры и содержимое раскрытия задаёт страница через props и слоты.
const props = defineProps({
  emblemImg: { type: String, required: true },
  emblemAlt: { type: String, default: '' },
  kicker: { type: String, default: 'D&D 5e' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  crumbCurrent: { type: String, required: true },
  searchPlaceholder: { type: String, default: 'Поиск' },
  groups: { type: Array, default: () => [] }, // [{ id, title, code?, items:[{ id, title, meta?, badge?, badgeTitle? }] }]
  total: { type: Number, default: 0 },
  visible: { type: Number, default: 0 },
  filters: { type: Array, default: () => [] }, // [{ key, label, note?, options:[{ value, label, title? }] }]
  isActive: { type: Function, default: () => false },
  activeFilterCount: { type: Number, default: 0 },
  queryKey: { type: String, default: 'open' },
  nodePrefix: { type: String, default: 'node' },
  collapsible: { type: Boolean, default: false },
  collapseLabel: { type: String, default: 'Показать список' }
})

const listShown = ref(!props.collapsible)

const emit = defineEmits(['toggle-filter', 'reset-filters'])

const route = useRoute()
const router = useRouter()

const search = defineModel('search', { type: String, default: '' })
const open = defineModel('open', { default: null })
const showFilter = defineModel('showFilter', { type: Boolean, default: false })

function toggleItem(item) {
  open.value = open.value === item.id ? null : item.id
}

watch(open, () => {
  router.replace({ query: open.value ? { [props.queryKey]: open.value } : {} })
})

// ── Искра по нити, зажигающая золотые ромбы ──────────────────────
const railEl = ref(null)
const sparkEl = ref(null)
let sparkRaf = null
let sparkTimer = null

onMounted(() => {
  const initial = String(route.query[props.queryKey] || '')
  if (initial) {
    open.value = initial
    nextTick(() => document.getElementById(`${props.nodePrefix}-${initial}`)?.scrollIntoView({ block: 'center' }))
  }

  const rail = railEl.value
  const spark = sparkEl.value
  if (!rail || !spark) return

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const SPEED = 85
  const PAUSE = 1600

  function collectNodes() {
    const railTop = rail.getBoundingClientRect().top
    const line = rail.querySelector('.screens-thread-line')
    const titles = [...rail.querySelectorAll('.thread-group-title')]
    const startY = line ? line.getBoundingClientRect().top - railTop : 0
    const nodes = titles
      .map(t => ({ el: t, y: t.getBoundingClientRect().top + 17 - railTop }))
      .sort((a, b) => a.y - b.y)
    return { startY, nodes }
  }

  function clearLit(nodes) {
    for (const n of nodes) n.el.classList.remove('lit')
  }

  if (reduce) {
    const { nodes } = collectNodes()
    for (const n of nodes) n.el.classList.add('lit')
    spark.style.display = 'none'
    return
  }

  function runPass() {
    const { startY, nodes } = collectNodes()
    if (!nodes.length) {
      sparkTimer = window.setTimeout(runPass, 400)
      return
    }
    clearLit(nodes)
    const endY = nodes[nodes.length - 1].y
    const distance = Math.max(1, endY - startY)
    const duration = (distance / SPEED) * 1000
    let start = null
    spark.style.opacity = '1'

    function frame(ts) {
      if (start === null) start = ts
      const t = Math.min(1, (ts - start) / duration)
      const y = startY + (endY - startY) * t
      spark.style.transform = `translate(-50%, ${y}px)`
      for (const n of nodes) {
        if (y >= n.y - 10) n.el.classList.add('lit')
      }
      if (t < 1) {
        sparkRaf = requestAnimationFrame(frame)
      } else {
        spark.style.opacity = '0'
        sparkTimer = window.setTimeout(runPass, PAUSE)
      }
    }
    sparkRaf = requestAnimationFrame(frame)
  }

  sparkTimer = window.setTimeout(runPass, 500)
})

onBeforeUnmount(() => {
  if (sparkRaf) cancelAnimationFrame(sparkRaf)
  if (sparkTimer) clearTimeout(sparkTimer)
})
</script>

<template>
  <div class="screens-page">
    <div ref="railEl" class="screens-shell">
      <NuxtLink to="/dnd5e" class="screens-emblem" title="Вернуться к D&D 5e">
        <span class="screens-emblem-badge">
          <img :src="emblemImg" :alt="emblemAlt || title" width="120" height="120">
        </span>
      </NuxtLink>
      <span class="screens-thread-line" aria-hidden="true" />
      <span ref="sparkEl" class="thread-spark" aria-hidden="true" />

      <header class="screens-header">
        <nav class="screens-crumb" aria-label="Навигация">
          <NuxtLink to="/">Системы</NuxtLink>
          <span>/</span>
          <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
          <span>/</span>
          <span>{{ crumbCurrent }}</span>
        </nav>

        <p class="screens-kicker">{{ kicker }}</p>
        <h1>{{ title }}</h1>
        <p v-if="lead" class="screens-lead">{{ lead }}</p>

        <slot name="intro" />

        <div class="screens-controls">
          <input
            v-model="search"
            type="search"
            class="screens-search"
            :placeholder="searchPlaceholder"
            aria-label="Поиск"
          >
          <button
            type="button"
            class="screens-filter-btn"
            :class="{ active: activeFilterCount || showFilter }"
            :aria-expanded="showFilter"
            title="Фильтр"
            @click="showFilter = !showFilter"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v6l-4 2v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
            <span v-if="activeFilterCount" class="screens-filter-count">{{ activeFilterCount }}</span>
          </button>
          <span class="screens-count">{{ visible }} / {{ total }}</span>
        </div>

        <Transition name="weave">
          <div v-if="showFilter && filters.length" class="screens-filter-panel">
            <div v-for="fg in filters" :key="fg.key" class="screens-filter-group">
              <span class="screens-filter-label">{{ fg.label }}<span v-if="fg.note" class="screens-filter-note">{{ fg.note }}</span></span>
              <div class="screens-filter-chips">
                <button
                  v-for="opt in fg.options"
                  :key="opt.value"
                  type="button"
                  class="screens-filter-chip"
                  :class="{ active: isActive(fg.key, opt.value) }"
                  :title="opt.title || ''"
                  @click="emit('toggle-filter', fg.key, opt.value)"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>

            <button v-if="activeFilterCount" type="button" class="screens-filter-clear" @click="emit('reset-filters')">
              Сбросить всё
            </button>
          </div>
        </Transition>
      </header>

      <main class="screens-main">
        <button
          v-if="collapsible"
          type="button"
          class="thread-collapse-toggle"
          :class="{ open: listShown }"
          :aria-expanded="listShown"
          @click="listShown = !listShown"
        >
          <span class="thread-collapse-diamond" aria-hidden="true" />
          {{ collapseLabel }} <span class="thread-collapse-count">{{ visible }}</span>
          <span class="thread-collapse-chevron" aria-hidden="true" />
        </button>

        <div v-show="!collapsible || listShown" class="thread-rail">
          <section
            v-for="group in groups"
            :id="`grp-${group.id}`"
            :key="group.id"
            class="thread-group"
          >
            <h2 class="thread-group-title">
              {{ group.title }}
              <span v-if="group.code" class="thread-group-code">{{ group.code }}</span>
            </h2>

            <div class="thread-items">
              <div
                v-for="item in group.items"
                :id="`${nodePrefix}-${item.id}`"
                :key="item.id"
                class="thread-knot"
                :class="{ open: open === item.id }"
              >
                <button
                  type="button"
                  class="thread-item"
                  :aria-expanded="open === item.id"
                  @click="toggleItem(item)"
                >
                  <span class="thread-item-name">{{ item.title }}</span>
                  <span v-if="item.meta" class="thread-item-meta">{{ item.meta }}</span>
                  <span class="thread-item-tail">
                    <span v-if="item.badge" class="thread-item-badge" :title="item.badgeTitle || ''">{{ item.badge }}</span>
                    <span class="thread-toggle" aria-hidden="true" />
                  </span>
                </button>

                <Transition name="weave">
                  <div v-if="open === item.id" class="rule-body-wrap">
                    <div class="rule-body">
                      <span class="rt-corner rt-corner-tl" aria-hidden="true" /><span class="rt-corner rt-corner-tr" aria-hidden="true" />
                      <span class="rt-corner rt-corner-bl" aria-hidden="true" /><span class="rt-corner rt-corner-br" aria-hidden="true" />
                      <slot name="body" :item="item" />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </section>

          <div v-if="!groups.length" class="screens-empty">
            Ничего не найдено. Попробуйте другой запрос или сбросьте фильтр.
          </div>
        </div>
      </main>
    </div>
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

.screens-shell{
  --indent:112px;
  --axis:38px;
  position:relative;
  width:min(872px,calc(100% - 48px));
  margin:0 auto;
  padding-left:var(--indent);
}

.screens-header{
  padding:38px 0 8px;
}

.screens-thread-line{
  position:absolute;
  left:var(--axis);
  transform:translateX(-50%);
  top:26px;
  bottom:56px;
  width:1px;
  background:linear-gradient(180deg,rgba(214,170,96,.5),rgba(214,170,96,.5) 210px,var(--t-line) 320px);
  z-index:0;
}

.thread-spark{
  position:absolute;
  left:var(--axis);
  top:0;
  width:4px;
  height:4px;
  border-radius:50%;
  background:#ffe4a0;
  box-shadow:0 0 5px 1.5px rgba(255,220,140,.7),0 0 10px 3px rgba(214,170,96,.28);
  opacity:0;
  z-index:1;
  pointer-events:none;
  will-change:transform;
  transition:opacity .4s ease;
}

.screens-emblem{
  position:absolute;
  left:var(--axis);
  top:78px;
  transform:translateX(-50%);
  z-index:3;
  display:block;
  text-decoration:none;
  outline:none;
}

.screens-emblem-badge{
  position:relative;
  display:grid;
  place-items:center;
  width:116px;
  height:116px;
}

.screens-emblem-badge::before{
  content:'';
  position:absolute;
  inset:0;
  margin:auto;
  width:72px;
  height:72px;
  transform:rotate(45deg);
  border:1px solid rgba(214,170,96,.55);
  background:var(--t-bg);
  transition:border-color .25s ease,box-shadow .25s ease;
}

.screens-emblem-badge::after{
  content:'';
  position:absolute;
  inset:0;
  margin:auto;
  width:88px;
  height:88px;
  transform:rotate(45deg);
  border:1px solid rgba(214,170,96,.2);
  transition:border-color .25s ease;
}

.screens-emblem-badge img{
  position:relative;
  z-index:1;
  width:92px;
  height:92px;
  object-fit:contain;
  transition:transform .25s ease;
}

.screens-emblem:hover .screens-emblem-badge::before,
.screens-emblem:focus-visible .screens-emblem-badge::before{
  border-color:var(--t-gold);
  box-shadow:0 0 20px 4px rgba(214,170,96,.4);
}

.screens-emblem:hover .screens-emblem-badge::after{
  border-color:rgba(214,170,96,.5);
}

.screens-emblem:hover .screens-emblem-badge img{
  transform:scale(1.06);
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
  flex-direction:column;
  gap:14px;
  margin-top:18px;
  overflow:hidden;
}

.screens-filter-group{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.screens-filter-label{
  display:flex;
  align-items:baseline;
  gap:8px;
  font-size:10px;
  font-weight:800;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.screens-filter-note{
  font-size:9px;
  font-weight:700;
  letter-spacing:.06em;
  text-transform:none;
  color:rgba(214,170,96,.7);
}

.screens-filter-chips{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
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
  align-self:flex-start;
  border:0;
  background:none;
  padding:2px 0;
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

.screens-main{
  padding:28px 0 90px;
}

/* Раскрывающийся список (collapsible) */
.thread-collapse-toggle{
  position:relative;
  display:flex;
  align-items:center;
  gap:10px;
  width:100%;
  margin-bottom:6px;
  padding:12px 0;
  border:0;
  background:none;
  color:rgba(246,248,255,.9);
  font-family:'Cormorant Garamond',serif;
  font-size:22px;
  font-weight:500;
  letter-spacing:.05em;
  text-transform:uppercase;
  cursor:pointer;
}

.thread-collapse-diamond{
  position:absolute;
  left:calc(var(--axis) - var(--indent) - 6px);
  top:50%;
  width:12px;
  height:12px;
  margin-top:-6px;
  border:1px solid var(--t-gold);
  background:var(--t-bg);
  transform:rotate(45deg);
  z-index:1;
}

.thread-collapse-count{
  font-family:'Hanken Grotesk',system-ui,sans-serif;
  font-size:11px;
  font-weight:800;
  letter-spacing:.1em;
  color:var(--t-faint);
}

.thread-collapse-chevron{
  width:9px;
  height:9px;
  margin-left:4px;
  border-right:1.6px solid rgba(214,170,96,.7);
  border-bottom:1.6px solid rgba(214,170,96,.7);
  transform:rotate(45deg);
  transition:transform .25s ease;
}

.thread-collapse-toggle.open .thread-collapse-chevron{
  transform:rotate(-135deg);
}

.thread-collapse-toggle:hover{
  color:#f4e0aa;
}

.thread-group{
  position:relative;
  margin-top:38px;
  padding-left:0;
  scroll-margin-top:24px;
}

.thread-group:first-of-type{
  margin-top:6px;
}

.thread-group-title{
  position:relative;
  display:flex;
  align-items:baseline;
  gap:12px;
  margin:0 0 6px;
  font-family:'Cormorant Garamond',serif;
  font-size:28px;
  line-height:1.15;
  font-weight:500;
  letter-spacing:.05em;
  color:rgba(246,248,255,.94);
}

.thread-group-title::before{
  content:'';
  position:absolute;
  left:calc(var(--axis) - var(--indent) - 6px);
  top:11px;
  width:12px;
  height:12px;
  border:1px solid var(--t-gold);
  background:var(--t-bg);
  transform:rotate(45deg);
  transition:background .4s ease,box-shadow .4s ease;
  z-index:1;
}

.thread-group-title.lit::before{
  background:var(--t-gold);
  box-shadow:0 0 13px 3px rgba(214,170,96,.6);
}

.thread-group-code{
  font-family:'Hanken Grotesk',system-ui,sans-serif;
  font-size:10px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--t-faint);
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
  cursor:pointer;
}

.thread-item:focus-visible{
  outline:1px solid rgba(214,170,96,.6);
  outline-offset:2px;
}

.thread-item::before{
  content:'';
  position:absolute;
  left:calc(var(--axis) - var(--indent) - 2.5px);
  top:21px;
  width:5px;
  height:5px;
  border-radius:50%;
  background:rgba(232,236,248,.28);
  transition:background .18s ease,box-shadow .18s ease,transform .18s ease;
  z-index:1;
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

.thread-item-meta{
  font-size:11px;
  font-weight:700;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:rgba(214,170,96,.66);
}

.thread-item-tail{
  display:inline-flex;
  align-items:center;
  gap:12px;
  margin-left:auto;
  align-self:center;
  flex:0 0 auto;
}

.thread-item-badge{
  border:1px solid var(--t-line);
  border-radius:999px;
  padding:3px 9px;
  font-size:9.5px;
  font-weight:800;
  letter-spacing:.06em;
  color:var(--t-faint);
  cursor:help;
}

.thread-toggle{
  position:relative;
  width:14px;
  height:14px;
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

.thread-knot.open .thread-item .thread-toggle{
  transform:rotate(45deg);
}

.rule-body-wrap{
  display:grid;
  grid-template-rows:1fr;
}

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

.rule-body{
  position:relative;
  margin:8px 0 12px;
  padding:22px 24px 20px;
  border:1px solid rgba(214,170,96,.16);
  border-radius:10px;
  background:linear-gradient(180deg,rgba(214,170,96,.045),rgba(255,255,255,.008));
}

.rt-corner{
  position:absolute;
  width:14px;
  height:14px;
  pointer-events:none;
}

.rt-corner-tl{
  top:6px;
  left:6px;
  border-top:1.5px solid rgba(214,170,96,.5);
  border-left:1.5px solid rgba(214,170,96,.5);
  border-radius:5px 0 0 0;
}

.rt-corner-tr{
  top:6px;
  right:6px;
  border-top:1.5px solid rgba(214,170,96,.5);
  border-right:1.5px solid rgba(214,170,96,.5);
  border-radius:0 5px 0 0;
}

.rt-corner-bl{
  bottom:6px;
  left:6px;
  border-bottom:1.5px solid rgba(214,170,96,.5);
  border-left:1.5px solid rgba(214,170,96,.5);
  border-radius:0 0 0 5px;
}

.rt-corner-br{
  bottom:6px;
  right:6px;
  border-bottom:1.5px solid rgba(214,170,96,.5);
  border-right:1.5px solid rgba(214,170,96,.5);
  border-radius:0 0 5px 0;
}

.screens-empty{
  margin-top:40px;
  padding:40px 0;
  text-align:center;
  color:var(--t-muted);
  border-top:1px solid var(--t-line);
  border-bottom:1px solid var(--t-line);
}

@media (max-width:720px){
  .screens-shell{
    --indent:76px;
    --axis:26px;
    width:min(100% - 20px,760px);
  }

  .screens-header h1{
    font-size:34px;
  }

  .screens-lead{
    font-size:18px;
  }

  .screens-emblem{
    top:64px;
  }

  .screens-emblem-badge{
    width:84px;
    height:84px;
  }

  .screens-emblem-badge::before{
    width:46px;
    height:46px;
  }

  .screens-emblem-badge::after{
    width:60px;
    height:60px;
  }

  .screens-emblem-badge img{
    width:62px;
    height:62px;
  }

  .screens-thread-line{
    top:150px;
  }

  .thread-item{
    flex-wrap:wrap;
    row-gap:2px;
  }
}
</style>
