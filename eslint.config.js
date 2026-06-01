import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  ignores: [
    '.git',
    '.corepack',
    '.direnv',
    '.pnpm-home',
    '.yarn',
    '.storybook/stories_TEMP',
    '.storybook/.vite',
    '.vite',
    'node_modules',
    'coverage',
    'storybook-static',
    'dist',
  ],
}, {
  files: ['**/*.json'],
  rules: {
    'no-irregular-whitespace': 'warn',
  },
}, {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.cjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.json'],
      },
    },
  },
}, {
  files: ['playground/src/main.ts'],
  rules: {
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        ['internal', 'parent', 'sibling', 'index', 'unknown'],
        'object',
        'type',
      ],
      'pathGroups': [
        {
          pattern: 'vue-maplibre',
          group: 'external',
          position: 'after',
        },
      ],
      'pathGroupsExcludedImportTypes': ['builtin'],
      'newlines-between': 'ignore',
      'alphabetize': {
        order: 'asc',
        caseInsensitive: true,
      },
    }],
  },
}, {
  files: ['**/*.md/*.ts', '**/*.md/*.js', '**/*.md/*.tsx', '**/*.md/*.jsx'],
  rules: {
    'import/order': 'off',
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
