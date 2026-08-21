import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import skipFormatting from 'eslint-config-prettier/flat'

const typescript = [
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
]

const parserOptions = {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
}

export default defineConfig([
  globalIgnores(['**/*.js', '**/*.mjs', '**/*.cjs']),
  {
    name: 'app/browser',
    files: ['src/**/*.{ts,tsx}'],
    extends: [...typescript, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: globals.browser,
      parserOptions,
    },
  },
  {
    name: 'config-files/node',
    files: ['*.ts'],
    extends: typescript,
    languageOptions: {
      globals: globals.node,
      parserOptions,
    },
  },
  skipFormatting,
])
