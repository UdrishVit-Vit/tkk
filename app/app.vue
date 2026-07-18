<script setup>
const route = useRoute()
const { theme } = useKnotTheme()

const hubRoute = computed(() => {
  if (route.path === '/' || route.path === '/dnd5e') return true
  return /^\/dnd5e\/classes\/[^/]+\/?$/.test(route.path)
})
const embeddedThemeRoute = computed(() => /^\/dnd5e\/races(?:\/|$)/.test(route.path))
const showSiteSidebar = computed(() => !hubRoute.value && !embeddedThemeRoute.value)

useHead(() => ({
  htmlAttrs: { 'data-theme': theme.value, style: 'color-scheme:dark' },
  meta: [{ name: 'theme-color', content: theme.value === 'manu' ? '#252c35' : theme.value === 'madness' ? '#100a1b' : theme.value === 'shamas' ? '#0c0805' : '#070810' }]
}))
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="site-page-frame" :class="{ 'with-sidebar': showSiteSidebar }">
      <NuxtPage />
    </div>
    <SiteSidebar v-if="showSiteSidebar" :key="`site-sidebar:${route.path}`" />
  </UApp>
</template>

<style>
.site-page-frame{min-height:100vh}
.site-page-frame.with-sidebar{padding-left:68px}
@media (max-width:760px){.site-page-frame.with-sidebar{padding-left:0;padding-bottom:54px}}
</style>
