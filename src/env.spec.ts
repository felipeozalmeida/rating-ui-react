import { expect, test } from 'vitest'

// Compile-time guard. Erased at runtime, but `npm run type-check` fails if the
// tsconfig `types` stop providing one of these. Note `process` currently
// resolves via vitest/jsdom -> @types/jsdom -> node, so dropping "node" from
// `types` alone would not trip it.
export type _TypesGuard = [typeof jsdom, typeof process, ImportMetaEnv]

// Runtime guard: fails if `environment` regresses away from jsdom.
test('the DOM is live', () => {
  document.body.innerHTML = '<p>hi</p>'
  expect(document.body.textContent).toBe('hi')
})
