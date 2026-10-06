// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
