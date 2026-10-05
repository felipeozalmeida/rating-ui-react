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
    ignores: ['src/env.*.d.ts', 'src/env.*.setup.ts', 'src/**/*.{test,spec}.{ts,tsx}'],
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
    files: ['src/**/*.node.{test,spec}.ts'],
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
    files: ['src/env.dom.setup.ts', 'src/**/*.jsdom.{test,spec}.{ts,tsx}'],
    extends: [...typescript, ...react, vitest.configs.recommended],
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
  {
    name: 'app/vitest/happy-dom',
    files: [
      'src/env.happy-dom.d.ts',
      'src/env.dom.setup.ts',
      // `.dom.` specs run on the default DOM implementation, which is this one
      'src/**/*.{dom,happy-dom}.{test,spec}.{ts,tsx}',
    ],
    extends: [...typescript, ...react, vitest.configs.recommended],
    languageOptions: {
      // happy-dom layers a DOM onto Node rather than replacing it, so tests see both
      globals: { ...globals.node, ...globals.browser },
      parserOptions,
    },
    rules: {
      // We run with `globals: false`, so the APIs must be imported
      'vitest/prefer-importing-vitest-globals': 'error',
    },
  },
  {
    name: 'app/vitest/browser',
    files: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
    extends: [...typescript, ...react, vitest.configs.recommended],
    languageOptions: {
      // A real browser: no Node globals, unlike the emulated DOMs
      globals: globals.browser,
      parserOptions,
    },
    rules: {
      // We run with `globals: false`, so the APIs must be imported
      'vitest/prefer-importing-vitest-globals': 'error',
    },
  },
  {
    name: 'app/vitest/unqualified',
    files: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Everything some Vitest project includes. A spec outside this list would
    // belong to no project, so it would never run and never be type-checked.
    ignores: [
      'src/**/*.node.{test,spec}.ts',
      'src/**/*.{dom,jsdom,happy-dom,browser}.{test,spec}.{ts,tsx}',
    ],
    languageOptions: { parser: tseslint.parser },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Program',
          message:
            'Qualify the spec filename with its environment: .node. (.ts only), .dom., .jsdom., .happy-dom. or .browser.',
        },
      ],
    },
  },
  skipFormatting,
])
