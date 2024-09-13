// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/dashboard-tekkare/'
  },
  compatibilityDate: '2024-04-03',
  // devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt',
    [
      '@nuxtjs/i18n',
      {
        defaultLocale: 'fr',
        locales: [
          { code: 'fr', iso: 'fr-FR', file: 'fr.json' },
          { code: 'en', iso: 'en-US', file: 'en.json' },
        ],
        lazy: true,
        langDir: 'i18n/locales',
      },
    ],
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  components: [
    { path: '~/components/ui', extensions: ['vue'] }
  ],
})