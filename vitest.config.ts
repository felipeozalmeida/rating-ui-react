import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
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
            // `.dom.` specs need a DOM but not a particular one, so they run on
            // the default implementation. Moving `dom` out of this glob, here
            // and in the matching tsconfig and ESLint block, changes the
            // default.
            include: ['src/**/*.{dom,happy-dom}.{test,spec}.{ts,tsx}'],
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['src/**/*.browser.{test,spec}.{ts,tsx}'],
            browser: {
              enabled: true,
              // Vitest opens a visible window by default. Pass
              // `--browser.headless=false` to get it back for debugging.
              headless: true,
              // New headless: the real Chrome build rather than Playwright's
              // separate headless shell, which is the point of this tier.
              // https://vitest.dev/config/browser/playwright
              provider: playwright({ launchOptions: { channel: 'chromium' } }),
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
    },
  }),
)
