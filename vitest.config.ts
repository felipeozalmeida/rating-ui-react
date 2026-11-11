import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import type { TestProjectInlineConfiguration } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config.ts'

// A function, since Vitest writes the resolved instance names into the object
const browser = () => ({
  enabled: true,
  // Vitest opens a visible window by default. Pass
  // `--browser.headless=false` to get it back for debugging.
  headless: true,
  // New headless: the full Chromium build rather than Playwright's
  // separate headless shell, which is the point of this tier.
  // https://vitest.dev/config/browser/playwright
  provider: playwright({ launchOptions: { channel: 'chromium' } }),
  instances: [{ browser: 'chromium' as const }],
})

// Screenshots only match the environment that took them, so visual specs run
// in CI alone, inside the Playwright image that deploy.yml pins. Locally the
// project doesn't exist: `vitest run` skips it and `--project visual` fails
// with "No projects matched". New references come from the "Update visual
// regression screenshots" workflow, never from a local run.
// https://vitest.dev/guide/browser/visual-regression-testing
const visualProjects: TestProjectInlineConfiguration[] = process.env['CI']
  ? [
      {
        test: {
          name: 'visual',
          include: ['src/**/*.visual.{spec,test}.{ts,tsx}'],
          browser: browser(),
        },
      },
    ]
  : []

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      projects: [
        {
          test: {
            name: 'node',
            environment: 'node',
            include: ['src/**/*.node.{spec,test}.ts'],
          },
        },
        {
          test: {
            name: 'happy-dom',
            environment: 'happy-dom',
            setupFiles: ['src/tests/env.dom.setup.ts'],
            // `.dom.` specs need a DOM but not a particular one, so they run on
            // the default implementation. Moving `dom` out of this glob, here
            // and in the matching tsconfig and ESLint block, changes the
            // default.
            include: ['src/**/*.{dom,happy-dom}.{spec,test}.{ts,tsx}'],
          },
        },
        {
          test: {
            name: 'jsdom',
            environment: 'jsdom',
            setupFiles: ['src/tests/env.dom.setup.ts'],
            include: ['src/**/*.jsdom.{spec,test}.{ts,tsx}'],
          },
        },
        {
          test: {
            name: 'browser',
            include: ['src/**/*.browser.{spec,test}.{ts,tsx}'],
            browser: browser(),
          },
        },
        ...visualProjects,
      ],
    },
  }),
)
