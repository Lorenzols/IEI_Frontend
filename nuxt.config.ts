// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/sass/main.sass'],
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap' }
      ]
    }
  },
  modules: [
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Poppins: true
    },
    download: true
  }
})
