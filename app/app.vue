<script setup>
const route = useRoute()
const { theme } = useKnotTheme()

const hubRoute = computed(() => {
  if (route.path === '/' || route.path === '/dnd5e' || route.path === '/dnd55e' || /^\/lore(?:\/|$)/.test(route.path)) return true
  return /^\/dnd(?:5e|55e)\/classes(?:\/[^/]+)?\/?$/.test(route.path)
})
const embeddedThemeRoute = computed(() => (
  /^\/dnd5e\/races(?:\/|$)/.test(route.path)
  || /^\/dnd55e\/species(?:\/|$)/.test(route.path)
))
const showSiteSidebar = computed(() => !hubRoute.value && !embeddedThemeRoute.value)
const referenceSystem = computed(() => ({ '/dnd55e/spells': '2024', '/dnd5e/screens': '5e' })[route.path.replace(/\/$/, '')])
const pilotReference = computed(() => Boolean(referenceSystem.value))
const referenceHub = computed(() => referenceSystem.value === '5e' ? '/dnd5e' : '/dnd55e')
const referenceSearch = ref(null)
function openReferenceSearch() { referenceSearch.value?.show() }

useHead(() => ({
  htmlAttrs: { 'data-theme': theme.value, style: 'color-scheme:dark' },
  meta: [{ name: 'theme-color', content: theme.value === 'manu' ? '#252c35' : theme.value === 'madness' ? '#100a1b' : theme.value === 'shamas' ? '#0c0805' : '#070810' }]
}))
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="var(--theme-accent)" :height="2" />
    <div class="site-page-frame" :class="{ 'with-sidebar': showSiteSidebar, 'pilot-reference-frame': pilotReference }">
      <NuxtPage />
    </div>
    <SiteSidebar v-if="showSiteSidebar" :design-pilot="pilotReference" :hub-path="referenceHub" :class="{ 'site-sidebar-desktop-only': pilotReference }" :key="`site-sidebar:${route.path}`" @search="openReferenceSearch" />
    <UiMobileNav v-if="pilotReference" panels-in-hub inline-search :hub-path="referenceHub" @select="openReferenceSearch" />
    <UiReferenceSearch v-if="pilotReference" ref="referenceSearch" :system="referenceSystem" />
  </UApp>
</template>

<style>
.site-page-frame{min-height:100vh}
.site-page-frame.with-sidebar{padding-left:68px}
@media (max-width:760px){
  .site-page-frame.with-sidebar{padding-left:0;padding-bottom:54px}
  .site-page-frame.with-sidebar.pilot-reference-frame{padding-bottom:var(--ds-mobile-nav-space)}
  .site-sidebar.site-sidebar-desktop-only{display:none}
}
</style>
