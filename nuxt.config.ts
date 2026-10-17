// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    'build:manifest'(manifest) {
      // Keep current-page preloads; do not download unused async JS/CSS speculatively.
      for (const chunk of Object.values(manifest)) {
        if (chunk.resourceType === 'script' || chunk.resourceType === 'style') chunk.prefetch = false
      }
    }
  },
  app: { head: { link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Hanken+Grotesk:wght@300;400;500;600&display=swap' }] } },
  compatibilityDate: '2025-07-15',
  sourcemap: { server: false, client: false },
  // Vite already removes unused SSR code; avoid a second pass over large reference datasets.
  nitro: { rollupConfig: { treeshake: false } },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: []
    }
  }
})
