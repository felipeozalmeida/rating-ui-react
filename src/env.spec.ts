import { expect, test } from 'vitest'

// Compile-time guard. Erased at runtime, but `npm run type-check` fails if the
// tsconfig `types` stop providing one of these. Note `process` currently
// resolves via vitest/jsdom -> @types/jsdom -> node, so dropping "node" from
// `types` alone would not trip it.
export type _TypesGuard = [typeof jsdom, typeof process, ImportMetaEnv]

// Fails if `environment` regresses to node.
test('the DOM is live', () => {
  document.body.innerHTML = '<p>hi</p>'
  expect(document.body.textContent).toBe('hi')
})

// Fails if `environment` becomes a DOM that is not jsdom. The test above
// cannot catch that, and the vitest/jsdom types assume this global exists.
test('the DOM is jsdom specifically', () => {
  expect(typeof jsdom.window).toBe('object')
})
