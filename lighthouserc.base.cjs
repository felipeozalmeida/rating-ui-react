/** @import { CliFlags } from "lighthouse" */

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
      settings,
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
