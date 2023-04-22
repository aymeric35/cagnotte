// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    '@nuxt-fullstack-starter/nuxt-layer-daisyui',
  ],
  modules: [
    '@nuxtjs/color-mode',
    'nuxt-icon',
  ],
  tailwindcss: {
    config: {
      content: [
        resolve('./components/daisy/**/*.vue'),
        resolve('./plugins/toast/Wrapper.vue'),
      ],
    },
  },
  appConfig: {
    nuxtIcon: {
      size: '24px',
    },
  },
  colorMode: {
    preference: 'light', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: '',
  },
})
