import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  js.configs.all,
  tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}', '**/*.{js,mjs}'],
    rules: {
      camelcase: 'off',
      'consistent-return': 'off',
      eqeqeq: 'off',
      'id-length': ['warn', { min: 2, max: 30, exceptions: ['_'] }],
      'max-lines-per-function': ['warn', 100],
      'max-statements': ['warn', { max: 15 }],
      'no-inline-comments': 'off',
      'no-magic-numbers': 'off',
      'no-shadow': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'one-var': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
])
