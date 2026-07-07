<script setup>
const props = defineProps({
  screen: { type: Object, required: true },
  groups: { type: Array, required: true },
  icons: { type: Object, required: true },
  rulePath: { type: Function, required: true }
})

const route = useRoute()
const { load: loadBookmarks, isBookmarked, toggle: toggleBookmark } = useRuleBookmarks5e()

const copied = ref(false)
const sectionPath = computed(() => route.path)

onMounted(loadBookmarks)

function toggleSectionBookmark() {
  toggleBookmark({
    path: sectionPath.value,
    title: props.screen.title,
    titleEn: props.screen.titleEn,
    section: 'Раздел ширмы'
  })
}

async function copyPageLink() {
  if (typeof window === 'undefined') return
  try {
    await navigator.clipboard?.writeText(window.location.href)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1400)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="rlist-page">
    <div class="rlist-panel">
      <header class="rlist-head">
        <div>
          <nav class="rlist-crumb" aria-label="Навигация">
            <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
            <span>/</span>
            <NuxtLink to="/dnd5e/screens">Ширма</NuxtLink>
            <span>/</span>
            <span>{{ props.screen.title }}</span>
          </nav>
          <h1>{{ props.screen.title }}</h1>
          <div class="rlist-subtitle">{{ props.screen.titleEn }}</div>
        </div>

        <div class="rlist-actions">
          <button
            type="button"
            class="rlist-icon-btn"
            :class="{ active: isBookmarked(sectionPath) }"
            :title="isBookmarked(sectionPath) ? 'Убрать из закладок' : 'Добавить в закладки'"
            @click="toggleSectionBookmark"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" :class="{ filled: isBookmarked(sectionPath) }"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>
          </button>
          <button type="button" class="rlist-icon-btn" :class="{ active: copied }" :title="copied ? 'Ссылка скопирована' : 'Скопировать ссылку'" @click="copyPageLink">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>
          </button>
          <NuxtLink to="/dnd5e/screens" class="rlist-icon-btn" title="К ширме правил">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </NuxtLink>
        </div>
      </header>

      <p class="rlist-intro">
        <RuleRichText :text="props.screen.intro" :current-path="sectionPath" />
      </p>

      <section
        v-for="group in props.groups"
        :key="group.id"
        class="rlist-group"
      >
        <header v-if="group.title || group.description" class="rlist-group-head">
          <h2 v-if="group.title">{{ group.title }}</h2>
          <p v-if="group.description">{{ group.description }}</p>
        </header>

        <div class="rlist-items">
          <NuxtLink
            v-for="rule in group.rules"
            :key="rule.slug"
            class="rlist-item"
            :to="props.rulePath(rule.slug)"
          >
            <span class="rlist-item-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" v-html="props.icons[rule.icon] || props.icons.default" />
            </span>
            <span class="rlist-item-copy">
              <span class="rlist-item-title">{{ rule.title }}</span>
              <span class="rlist-item-meta">{{ rule.source }} / {{ rule.titleEn }}</span>
            </span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.rlist-page{
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

.rlist-panel{
  width:min(920px,calc(100% - 48px));
  margin:0 auto;
  padding:38px 0 90px;
}

.rlist-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:24px;
}

.rlist-crumb{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-bottom:30px;
  font-size:11px;
  font-weight:750;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.rlist-crumb a{
  color:var(--t-gold-soft);
  text-decoration:none;
}

.rlist-crumb a:hover{
  color:#f4e0aa;
}

.rlist-head h1{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:46px;
  line-height:1;
  font-weight:500;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:rgba(246,248,255,.96);
}

.rlist-subtitle{
  margin-top:6px;
  font-size:13px;
  font-weight:700;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.rlist-actions{
  display:flex;
  gap:8px;
  padding-top:2px;
}

.rlist-icon-btn{
  display:grid;
  place-items:center;
  width:36px;
  height:36px;
  border:1px solid var(--t-line);
  border-radius:8px;
  background:transparent;
  color:var(--t-muted);
  cursor:pointer;
  text-decoration:none;
  transition:.16s ease;
}

.rlist-icon-btn svg{
  width:17px;
  height:17px;
  fill:none;
  stroke:currentColor;
  stroke-width:1.9;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.rlist-icon-btn:hover,
.rlist-icon-btn.active{
  border-color:rgba(214,170,96,.5);
  color:var(--t-gold-soft);
}

.rlist-icon-btn svg.filled{
  fill:currentColor;
}

.rlist-intro{
  max-width:640px;
  margin:18px 0 0;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  line-height:1.5;
  color:var(--t-muted);
}

/* Нить */
.rlist-group{
  position:relative;
  margin-top:36px;
  padding-left:30px;
}

.rlist-group::before{
  content:'';
  position:absolute;
  left:5px;
  top:12px;
  bottom:-36px;
  width:1px;
  background:var(--t-line);
}

.rlist-group:last-of-type::before{
  bottom:0;
  background:linear-gradient(180deg,var(--t-line) 60%,transparent);
}

.rlist-group-head{
  position:relative;
  margin-bottom:6px;
}

.rlist-group-head::before{
  content:'';
  position:absolute;
  left:-30px;
  top:9px;
  width:11px;
  height:11px;
  border:1px solid var(--t-gold);
  background:var(--t-bg);
  transform:rotate(45deg);
}

.rlist-group-head h2{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:26px;
  line-height:1.15;
  font-weight:500;
  letter-spacing:.07em;
  text-transform:uppercase;
  color:rgba(246,248,255,.94);
}

.rlist-group-head p{
  margin:4px 0 0;
  max-width:640px;
  font-size:14px;
  line-height:1.5;
  color:var(--t-faint);
}

.rlist-items{
  display:flex;
  flex-direction:column;
}

.rlist-item{
  position:relative;
  display:grid;
  grid-template-columns:26px minmax(0,1fr);
  gap:14px;
  align-items:center;
  padding:10px 2px;
  border-bottom:1px solid rgba(232,236,248,.05);
  color:inherit;
  text-decoration:none;
}

.rlist-item:last-child{
  border-bottom:0;
}

.rlist-item::before{
  content:'';
  position:absolute;
  left:-27.5px;
  top:50%;
  width:5px;
  height:5px;
  margin-top:-2.5px;
  border-radius:50%;
  background:rgba(232,236,248,.28);
  transition:background .16s ease,box-shadow .16s ease;
}

.rlist-item:hover::before{
  background:var(--t-gold);
  box-shadow:0 0 0 3px rgba(214,170,96,.18);
}

.rlist-item-icon{
  display:grid;
  place-items:center;
  width:26px;
  height:26px;
  color:rgba(214,170,96,.66);
  transition:color .16s ease;
}

.rlist-item:hover .rlist-item-icon{
  color:var(--t-gold-soft);
}

.rlist-item-icon svg{
  width:24px;
  height:24px;
}

.rlist-item-copy{
  display:flex;
  min-width:0;
  align-items:baseline;
  gap:12px;
}

.rlist-item-title{
  font-size:16px;
  line-height:1.3;
  font-weight:750;
  color:rgba(246,248,255,.92);
  transition:color .16s ease;
}

.rlist-item:hover .rlist-item-title{
  color:#f4e0aa;
}

.rlist-item-meta{
  font-size:12px;
  line-height:1.3;
  color:var(--t-faint);
}

@media (max-width:720px){
  .rlist-panel{
    width:min(100% - 32px,920px);
    padding-top:28px;
  }

  .rlist-head{
    flex-direction:column;
  }

  .rlist-actions{
    order:-1;
    align-self:flex-end;
    margin-bottom:-30px;
  }

  .rlist-head h1{
    font-size:36px;
  }

  .rlist-intro{
    font-size:18px;
  }

  .rlist-item-copy{
    flex-direction:column;
    gap:2px;
  }
}
</style>
