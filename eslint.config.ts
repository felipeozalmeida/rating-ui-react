import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitest from '@vitest/eslint-plugin'
import skipFormatting from 'eslint-config-prettier/flat'

const typescript = [
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
]

const react = [reactHooks.configs.flat.recommended, reactRefresh.configs.vite]

const parserOptions = {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
}

export default defineConfig([
  globalIgnores(['**/*.js', '**/*.mjs', '*/**/*.cjs']),
  {
    name: 'app',
    files: ['src/**/*.{ts,tsx}'],
    // Node-environment specs never hold JSX; they get their own block below
    ignores: ['src/**/*.{test,spec}.ts'],
    extends: [...typescript, ...react],
    languageOptions: {
      globals: globals.browser,
      parserOptions,
    },
  },
  {
    name: 'node',
    files: ['*.{ts,cjs}'],
    extends: typescript,
    languageOptions: {
      globals: globals.node,
      parserOptions,
    },
  },
  {
    name: 'node/cjs',
    files: ['*.cjs'],
    rules: {
      // Make tseslint play nice with cjs files
      // Ref: https://github.com/typescript-eslint/typescript-eslint/issues/9730
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    name: 'app/vitest/node',
    files: ['src/**/*.{test,spec}.ts'],
    ignores: ['src/**/*.jsdom.{test,spec}.ts'],
    extends: [...typescript, vitest.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions,
    },
    rules: {
      // We run with `globals: false`, so the APIs must be imported
      'vitest/prefer-importing-vitest-globals': 'error',
    },
  },
  {
    name: 'app/vitest/jsdom',
    files: ['src/setup-jsdom-tests.ts', 'src/**/*.jsdom.{test,spec}.{ts,tsx}'],
    extends: [...typescript, vitest.configs.recommended],
    languageOptions: {
      // jsdom layers a DOM onto Node rather than replacing it, so tests see both
      globals: { ...globals.node, ...globals.browser },
      parserOptions,
    },
    rules: {
      // We run with `globals: false`, so the APIs must be imported
      'vitest/prefer-importing-vitest-globals': 'error',
    },
  },
  skipFormatting,
])
