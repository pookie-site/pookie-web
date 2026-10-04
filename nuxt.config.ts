// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/test-utils'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: { strict: true },
  eslint: {
    config: { stylistic: true },
  },
  // Self-hosted at build time. Families match the --font-* tokens; the tokens
  // reach them through custom properties, which the module does not scan.
  fonts: {
    families: [
      { name: 'Catamaran', provider: 'google', weights: [400, 700, 800, 900] },
      { name: 'Hind Madurai', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Ubuntu', provider: 'google', weights: [700] },
    ],
    defaults: { subsets: ['latin', 'latin-ext'] },
  },
})
