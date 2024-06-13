import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  ignores: ['!**/*', '.yarn', '.storybook/stories_TEMP', '.storybook/.vite', '.vite', 'node_modules', 'coverage', 'storybook-static', 'dist'],
}, {
  files: ['**/*.json'],
  rules: {
    'no-irregular-whitespace': 'warn',
  },
}, {
  rules: {
    'curly': ['error', 'all'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'node/prefer-global/process': ['error', 'always'],
    'antfu/if-newline': 'error',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below',
    }],
  },
})
