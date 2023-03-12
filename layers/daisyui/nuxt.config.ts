// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
import { presetUno, transformerDirectives } from 'unocss'
import presetDaisy from 'unocss-preset-daisy'
import presetIcons from '@unocss/preset-icons'


const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    modules: [resolve("./setup.ts"), '@unocss/nuxt', '@nuxtjs/color-mode'],
    css: [
        resolve('./node_modules/@unocss/reset/tailwind.css'),
        resolve('./node_modules/@kidonng/daisyui/index.css'),
    ],
    colorMode: {
        preference: 'system', // default theme
        dataValue: 'theme', // activate data-theme in <html> tag
        classSuffix: '',
    },
    unocss: {
        transformers: [transformerDirectives()],
        presets: [presetUno(), presetDaisy(), presetIcons()],
    },
    sourcemap: {
        server: true,
        client: false,
    },
})
