<script setup>
const props = defineProps({
  screen: { type: Object, required: true },
  groups: { type: Array, required: true },
  icons: { type: Object, required: true },
  rule: { type: Object, required: true },
  rulePath: { type: Function, required: true },
  sectionPath: { type: String, required: true }
})

const { load: loadBookmarks, isBookmarked, toggle: toggleBookmark } = useRuleBookmarks5e()

const copied = ref(false)

const sourceName = computed(() => props.rule.sourceName || props.screen.sourceName)
const rulePath = computed(() => `${props.sectionPath}/${props.rule.slug}`)

onMounted(loadBookmarks)

function toggleRuleBookmark() {
  toggleBookmark({
    path: rulePath.value,
    title: props.rule.title,
    titleEn: props.rule.titleEn,
    section: props.screen.title
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
  <div class="rdetail-page">
    <aside class="rdetail-side">
      <NuxtLink :to="props.sectionPath" class="rdetail-side-back">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>{{ props.screen.title }}</span>
      </NuxtLink>

      <nav class="rdetail-nav" :aria-label="`Правила: ${props.screen.title}`">
        <section v-for="group in props.groups" :key="group.id" class="rdetail-nav-group">
          <div v-if="group.title" class="rdetail-nav-title">{{ group.title }}</div>
          <NuxtLink
            v-for="item in group.rules"
            :key="item.slug"
            :to="props.rulePath(item.slug)"
            class="rdetail-nav-link"
            :class="{ active: item.slug === props.rule.slug }"
          >
            <span class="rdetail-nav-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true" v-html="props.icons[item.icon] || props.icons.default" />
            </span>
            <span class="rdetail-nav-text">
              <b>{{ item.title }}</b>
              <small>{{ item.titleEn }}</small>
            </span>
          </NuxtLink>
        </section>
      </nav>
    </aside>

    <main class="rdetail-article">
      <header class="rdetail-head">
        <div>
          <nav class="rdetail-crumb" aria-label="Навигация">
            <NuxtLink to="/dnd5e">D&D 5e</NuxtLink>
            <span>/</span>
            <NuxtLink to="/dnd5e/screens">Ширма</NuxtLink>
            <span>/</span>
            <NuxtLink :to="props.sectionPath">{{ props.screen.title }}</NuxtLink>
          </nav>
          <h1>{{ props.rule.title }}</h1>
          <div class="rdetail-subtitle">{{ props.rule.titleEn }}</div>
        </div>

        <div class="rdetail-actions">
          <button
            type="button"
            class="rdetail-icon-btn"
            :class="{ active: isBookmarked(rulePath) }"
            :title="isBookmarked(rulePath) ? 'Убрать из закладок' : 'Добавить в закладки'"
            @click="toggleRuleBookmark"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" :class="{ filled: isBookmarked(rulePath) }"><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>
          </button>
          <button type="button" class="rdetail-icon-btn" :class="{ active: copied }" :title="copied ? 'Ссылка скопирована' : 'Скопировать ссылку'" @click="copyPageLink">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>
          </button>
          <NuxtLink :to="props.sectionPath" class="rdetail-icon-btn" :title="`Назад: ${props.screen.title}`">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </NuxtLink>
        </div>
      </header>

      <p class="rdetail-summary">
        <RuleRichText :text="props.rule.summary" :current-path="rulePath" />
      </p>

      <dl class="rdetail-facts" aria-label="Краткие параметры">
        <div v-for="fact in props.rule.quick" :key="fact.label" class="rdetail-fact">
          <dt>{{ fact.label }}</dt>
          <dd><RuleRichText :text="String(fact.value)" :current-path="rulePath" /></dd>
        </div>
        <div v-if="props.rule.source" class="rdetail-fact">
          <dt>Источник</dt>
          <dd>
            <span class="rdetail-source-tag" :title="sourceName || props.rule.source">{{ props.rule.source }}</span>
          </dd>
        </div>
      </dl>

      <article class="rdetail-blocks">
        <section v-for="block in props.rule.blocks" :key="block.title" class="rdetail-block">
          <h2>{{ block.title }}</h2>
          <p v-for="paragraph in block.paragraphs || []" :key="paragraph">
            <RuleRichText :text="paragraph" :current-path="rulePath" />
          </p>
          <ul v-if="block.bullets?.length">
            <li v-for="bullet in block.bullets" :key="bullet">
              <RuleRichText :text="bullet" :current-path="rulePath" />
            </li>
          </ul>
        </section>
      </article>

      <footer v-if="props.rule.terms?.length" class="rdetail-terms">
        <span class="rdetail-terms-label">Связанные термины:</span>
        <span class="rdetail-term">{{ props.rule.terms.join(' · ') }}</span>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.rdetail-page{
  --t-bg:#07080d;
  --t-line:rgba(232,236,248,.12);
  --t-text:rgba(232,236,248,.9);
  --t-muted:rgba(232,236,248,.58);
  --t-faint:rgba(232,236,248,.38);
  --t-gold:#d6aa60;
  --t-gold-soft:rgba(244,224,170,.9);
  min-height:100vh;
  display:grid;
  grid-template-columns:270px minmax(0,720px);
  justify-content:center;
  column-gap:44px;
  padding:0 24px;
  background:linear-gradient(180deg,rgba(255,255,255,.02),transparent 300px),var(--t-bg);
  color:var(--t-text);
  font-family:'Hanken Grotesk',system-ui,sans-serif;
}

.rdetail-side{
  position:sticky;
  top:0;
  height:100vh;
  display:flex;
  flex-direction:column;
  gap:16px;
  border-right:1px solid rgba(232,236,248,.08);
  padding:30px 20px 24px;
}

.rdetail-side-back{
  display:flex;
  align-items:center;
  gap:9px;
  color:var(--t-gold-soft);
  text-decoration:none;
  font-size:12px;
  font-weight:800;
  letter-spacing:.12em;
  text-transform:uppercase;
}

.rdetail-side-back svg{
  width:15px;
  height:15px;
}

.rdetail-side-back:hover{
  color:#f4e0aa;
}

/* Нить в навигации */
.rdetail-nav{
  position:relative;
  display:flex;
  min-height:0;
  flex-direction:column;
  gap:14px;
  overflow:auto;
  padding-left:14px;
  padding-right:4px;
}

.rdetail-nav::before{
  content:'';
  position:absolute;
  left:2px;
  top:8px;
  bottom:8px;
  width:1px;
  background:linear-gradient(180deg,var(--t-line) 85%,transparent);
}

.rdetail-nav-group{
  display:flex;
  flex-direction:column;
}

.rdetail-nav-title{
  margin:6px 0 4px;
  font-size:10px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.rdetail-nav-link{
  position:relative;
  display:grid;
  grid-template-columns:22px minmax(0,1fr);
  gap:9px;
  align-items:center;
  padding:7px 6px;
  border-radius:6px;
  color:var(--t-muted);
  text-decoration:none;
  transition:color .16s ease,background .16s ease;
}

.rdetail-nav-link::before{
  content:'';
  position:absolute;
  left:-15.5px;
  top:50%;
  width:5px;
  height:5px;
  margin-top:-2.5px;
  border-radius:50%;
  background:rgba(232,236,248,.22);
  transition:background .16s ease,box-shadow .16s ease;
}

.rdetail-nav-link:hover{
  color:var(--t-text);
  background:rgba(255,255,255,.03);
}

.rdetail-nav-link:hover::before{
  background:var(--t-gold);
}

.rdetail-nav-link.active{
  color:#f4e0aa;
}

.rdetail-nav-link.active::before{
  background:var(--t-gold);
  box-shadow:0 0 0 3px rgba(214,170,96,.18);
}

.rdetail-nav-icon{
  display:grid;
  place-items:center;
  width:22px;
  height:22px;
  color:rgba(214,170,96,.6);
}

.rdetail-nav-link.active .rdetail-nav-icon,
.rdetail-nav-link:hover .rdetail-nav-icon{
  color:var(--t-gold-soft);
}

.rdetail-nav-icon svg{
  width:20px;
  height:20px;
}

.rdetail-nav-text b{
  display:block;
  font-size:12.5px;
  line-height:1.25;
  font-weight:700;
}

.rdetail-nav-text small{
  display:block;
  margin-top:1px;
  font-size:10px;
  line-height:1.2;
  color:var(--t-faint);
}

.rdetail-article{
  width:100%;
  padding:38px 0 90px;
}

.rdetail-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:24px;
}

.rdetail-crumb{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-bottom:26px;
  font-size:11px;
  font-weight:750;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.rdetail-crumb a{
  color:var(--t-gold-soft);
  text-decoration:none;
}

.rdetail-crumb a:hover{
  color:#f4e0aa;
}

.rdetail-head h1{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:42px;
  line-height:1.02;
  font-weight:500;
  letter-spacing:.05em;
  text-transform:uppercase;
  color:rgba(246,248,255,.96);
}

.rdetail-subtitle{
  margin-top:6px;
  font-size:13px;
  font-weight:700;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.rdetail-actions{
  display:flex;
  gap:8px;
  padding-top:2px;
}

.rdetail-icon-btn{
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

.rdetail-icon-btn svg{
  width:17px;
  height:17px;
  fill:none;
  stroke:currentColor;
  stroke-width:1.9;
  stroke-linecap:round;
  stroke-linejoin:round;
}

.rdetail-icon-btn:hover,
.rdetail-icon-btn.active{
  border-color:rgba(214,170,96,.5);
  color:var(--t-gold-soft);
}

.rdetail-icon-btn svg.filled{
  fill:currentColor;
}

.rdetail-summary{
  margin:18px 0 0;
  font-family:'Cormorant Garamond',serif;
  font-size:21px;
  line-height:1.5;
  color:var(--t-muted);
}

.rdetail-facts{
  display:flex;
  flex-wrap:wrap;
  gap:0 36px;
  margin:26px 0 0;
  border-top:1px solid var(--t-line);
  border-bottom:1px solid var(--t-line);
  padding:14px 0;
}

.rdetail-fact{
  display:flex;
  align-items:baseline;
  gap:9px;
  padding:4px 0;
}

.rdetail-fact dt{
  margin:0;
  font-size:10px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--t-faint);
}

.rdetail-fact dd{
  margin:0;
  font-size:15px;
  font-weight:700;
  color:var(--t-gold-soft);
}

.rdetail-fact a{
  color:inherit;
  text-decoration:none;
  border-bottom:1px solid rgba(214,170,96,.4);
}

.rdetail-fact a:hover{
  color:#f4e0aa;
}

.rdetail-source-tag{
  cursor:help;
  border-bottom:1px dotted rgba(214,170,96,.4);
}

.rdetail-block{
  margin-top:34px;
}

.rdetail-block h2{
  position:relative;
  margin:0 0 12px;
  padding-left:20px;
  font-family:'Cormorant Garamond',serif;
  font-size:26px;
  line-height:1.15;
  font-weight:500;
  letter-spacing:.06em;
  text-transform:uppercase;
  color:rgba(246,248,255,.94);
}

.rdetail-block h2::before{
  content:'';
  position:absolute;
  left:0;
  top:11px;
  width:9px;
  height:9px;
  border:1px solid var(--t-gold);
  transform:rotate(45deg);
}

.rdetail-block p{
  margin:0;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  line-height:1.55;
  color:rgba(224,232,242,.84);
}

.rdetail-block p+p{
  margin-top:12px;
}

.rdetail-block ul{
  display:flex;
  flex-direction:column;
  gap:8px;
  margin:12px 0 0;
  padding-left:22px;
  font-family:'Cormorant Garamond',serif;
  font-size:20px;
  line-height:1.48;
  color:rgba(224,232,242,.84);
}

.rdetail-block li::marker{
  color:var(--t-gold);
}

.rdetail-terms{
  margin-top:38px;
  border-top:1px solid var(--t-line);
  padding-top:14px;
  font-size:13px;
  line-height:1.7;
  color:var(--t-muted);
}

.rdetail-terms-label{
  margin-right:6px;
  font-size:10px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--t-faint);
}

@media (max-width:1000px){
  .rdetail-page{
    display:flex;
    flex-direction:column;
    padding:0;
  }

  .rdetail-side{
    position:relative;
    order:2;
    height:auto;
    border-right:0;
    border-top:1px solid rgba(232,236,248,.08);
    padding:22px 16px 40px;
  }

  .rdetail-nav{
    overflow:visible;
  }

  .rdetail-article{
    max-width:none;
    padding:26px 16px 70px;
  }
}

@media (max-width:620px){
  .rdetail-head{
    flex-direction:column;
  }

  .rdetail-actions{
    order:-1;
    align-self:flex-end;
    margin-bottom:-26px;
  }

  .rdetail-head h1{
    font-size:33px;
  }

  .rdetail-facts{
    flex-direction:column;
    gap:2px;
  }
}
</style>
