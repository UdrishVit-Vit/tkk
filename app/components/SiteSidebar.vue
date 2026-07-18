<script setup>
const route = useRoute()

function active(path) {
  return path === '/dnd5e'
    ? route.path === '/dnd5e'
    : route.path.startsWith(path)
}
</script>

<template>
  <aside class="site-sidebar" aria-label="Основная навигация">
    <NuxtLink to="/" class="site-sidebar-btn site-sidebar-main" title="Главный узел" aria-label="Главный узел">
      <img src="/assets/knot-main.png" width="30" height="30" alt="">
    </NuxtLink>

    <NuxtLink
      to="/dnd5e/screens"
      class="site-sidebar-btn"
      :class="{ active: active('/dnd5e/screens') }"
      title="Справочник"
      aria-label="Справочник"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
    </NuxtLink>

    <ThemeSwitcher compact />

    <NuxtLink
      to="/dnd5e"
      class="site-sidebar-btn"
      :class="{ active: active('/dnd5e') }"
      title="Карта D&D 5e"
      aria-label="Карта D&D 5e"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>
    </NuxtLink>

  </aside>
</template>

<style scoped>
.site-sidebar{
  position:fixed;
  inset:0 auto 0 0;
  z-index:900;
  display:flex;
  width:68px;
  flex-direction:column;
  align-items:center;
  gap:4px;
  border-right:1px solid rgba(var(--theme-accent-rgb),.12);
  background:linear-gradient(180deg,rgba(var(--theme-surface-rgb),.94),rgba(var(--theme-surface-rgb),.78));
  padding:16px 0;
  box-shadow:10px 0 36px rgba(0,0,0,.16),1px 0 0 rgba(var(--theme-contrast-rgb),.025);
  backdrop-filter:blur(18px);
}
.site-sidebar-btn{
  display:flex;
  width:44px;
  height:44px;
  align-items:center;
  justify-content:center;
  border-radius:11px;
  color:rgba(var(--theme-text-rgb),.68);
  text-decoration:none;
  transition:color .22s ease,background .22s ease,box-shadow .22s ease;
}
.site-sidebar-btn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.site-sidebar-btn img{display:block;object-fit:contain}
.site-sidebar-btn:hover,.site-sidebar-btn.active{background:rgba(var(--theme-accent-rgb),.1);color:rgba(var(--theme-heading-rgb),.96);box-shadow:0 0 18px rgba(var(--theme-accent-rgb),.07)}
.site-sidebar-main{margin-bottom:6px;color:rgba(var(--theme-heading-rgb),.86)}
@media (max-width:760px){
  .site-sidebar{inset:auto 0 0 0;width:auto;height:54px;flex-direction:row;border-top:1px solid rgba(var(--theme-contrast-rgb),.06);border-right:0;padding:0 10px;box-shadow:0 -10px 36px rgba(0,0,0,.12)}
  .site-sidebar-main{margin:0 6px 0 0}
}
</style>
