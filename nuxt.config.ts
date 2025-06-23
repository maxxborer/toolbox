// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/content'
  ],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Toolbox',
      meta: [
        { name: 'description', content: 'A collection of tools for static development' }
      ]
    }
  }
})
