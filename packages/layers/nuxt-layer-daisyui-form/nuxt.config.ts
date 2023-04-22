// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  tailwindcss: {
    config: {
      content: [
        resolve('./components/daisy/**/*.vue'),
      ],
    },
  },
})
