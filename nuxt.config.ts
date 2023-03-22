// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/color-mode'],
    colorMode: {
      preference: 'valentine', // default theme
      dataValue: 'theme', // activate data-theme in <html> tag
      classSuffix: '',
    },
    ssr: false,
    extends: [
        "./layers/firebase",
        "./layers/daisyui",
    ],
})
