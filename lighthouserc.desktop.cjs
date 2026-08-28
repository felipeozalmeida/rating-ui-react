const getConfig = require('./lighthouserc.base.cjs')

module.exports = getConfig({
  subdir: 'desktop',
  settings: {
    preset: 'desktop',
  },
})
