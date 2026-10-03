// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // XSS guard: render untrusted HTML only through a sanitizer
    'vue/no-v-html': 'error',
  },
})
