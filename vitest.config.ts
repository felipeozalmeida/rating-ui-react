import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      projects: [
        {
          extends: true,
          test: {
            name: 'node',
            environment: 'node',
            include: ['src/**/*.{test,spec}.ts'],
            exclude: ['src/**/*.jsdom.{test,spec}.ts'],
          },
        },
        {
          extends: true,
          test: {
            name: 'jsdom',
            environment: 'jsdom',
            setupFiles: ['src/setup-jsdom-tests.ts'],
            include: ['src/**/*.jsdom.{test,spec}.{ts,tsx}'],
          },
        },
      ],
    },
  }),
)
