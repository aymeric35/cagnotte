// process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['@nuxt-fullstack-starter/eslint-config-custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
