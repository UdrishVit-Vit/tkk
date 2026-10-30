<script setup>
defineProps({ links: { type: Array, default: () => [] } })
</script>

<template>
  <nav v-if="links?.length" class="related-content-links" aria-label="Связанные материалы">
    <NuxtLink v-for="link in links" :key="link.path" :to="link.path">{{ link.title }} <span aria-hidden="true">→</span></NuxtLink>
  </nav>
</template>

<style scoped>
.related-content-links{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:20px;padding-top:14px;border-top:1px solid rgba(var(--theme-accent-rgb),.2);font-size:13px}
.related-content-links a{color:var(--theme-accent-strong);text-decoration:none;text-underline-offset:4px}
.related-content-links a:hover{text-decoration:underline}.related-content-links a:focus-visible{outline:2px solid currentColor;outline-offset:4px}
</style>
