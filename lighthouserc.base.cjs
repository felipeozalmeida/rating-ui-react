/** @import { CliFlags } from "lighthouse" */

const { chromium } = require('playwright')

/**
 * @typedef {object} ConfigParameters
 * @property {"mobile" | "desktop"} [subdir]
 * @property {Partial<CliFlags>} [settings]
 */

/**
 * @param {ConfigParameters} configParameters
 */
const getConfig = ({ subdir = 'mobile', settings = {} } = {}) => ({
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local',
      startServerReadyTimeout: 30000,
      url: ['http://localhost:4173/rating-ui-react/'],
      // Audit with Playwright's Chromium, the one Vitest's Browser Mode runs,
      // so both test suites run against the same browser.
      chromePath: chromium.executablePath(),
      settings: {
        // LHCI appends its own flags to this string, so it can't be an array.
        chromeFlags: [
          // Keep Chrome's shared memory out of /dev/shm, which Docker caps at
          // 64MB, as Playwright does for the browsers it launches.
          '--disable-dev-shm-usage',
          // CI runs in Playwright's Docker image as root, and Chromium refuses
          // to start its sandbox as root, so it's disabled there, as
          // Playwright already does. This is safe here because Lighthouse
          // only loads our own build from localhost.
          ...(process.env['CI'] ? ['--no-sandbox'] : []),
        ].join(' '),
        ...settings,
      },
    },
    assert: {
      includePassedAssertions: true,
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: `./.lighthouseci-reports/${subdir}`,
      reportFilenamePattern: '_%%PATHNAME%%.report.%%EXTENSION%%',
    },
  },
})

module.exports = getConfig
