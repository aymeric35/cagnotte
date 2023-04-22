// https://nuxt.com/docs/api/configuration/nuxt-config
// import { createResolver } from '@nuxt/kit'

// const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    '@nuxt-fullstack-starter/nuxt-layer-utils',
    '@nuxt-fullstack-starter/nuxt-layer-daisyui-form',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
})
