import fs from 'fs'
import { defineNuxtModule } from '@nuxt/kit'
import { tailwindConfigFileTemplate } from './tailwind.config.template'

export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-daisyui',
        // configKey: 'daisyui'
    },
    defaults: {
    },
    setup(options, nuxt) {
        const rootDir = nuxt.options.rootDir

        const tailwindConfigPath = rootDir + '/tailwind.config.js'

        if (!fs.existsSync(tailwindConfigPath)) {
            fs.writeFileSync(`${rootDir}/tailwind.config.js`, tailwindConfigFileTemplate)
        }
    }
})