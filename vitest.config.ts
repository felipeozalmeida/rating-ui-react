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
            include: ['src/**/*.node.{test,spec}.ts'],
          },
        },
        {
          extends: true,
          test: {
            name: 'jsdom',
            environment: 'jsdom',
            setupFiles: ['src/env.dom.setup.ts'],
            include: ['src/**/*.jsdom.{test,spec}.{ts,tsx}'],
          },
        },
        {
          extends: true,
          test: {
            name: 'happy-dom',
            environment: 'happy-dom',
            setupFiles: ['src/env.dom.setup.ts'],
            include: [
              // `.dom.` specs need a DOM but not a particular one, so they run
              // on the default implementation. Moving this include, here and in
              // the matching tsconfig and ESLint block, changes the default.
              'src/**/*.dom.{test,spec}.{ts,tsx}',
              'src/**/*.happy-dom.{test,spec}.{ts,tsx}',
            ],
          },
        },
      ],
    },
  }),
)
