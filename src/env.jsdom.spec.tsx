import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

// Compile-time guard. Erased at runtime, but `npm run type-check` fails if the
// tsconfig `types` stop providing one of these. Note `process` currently
// resolves via vitest/jsdom -> @types/jsdom -> node, so dropping "node" from
// `types` alone would not trip it.
export type _TypesGuard = [typeof jsdom, typeof process, ImportMetaEnv]

// Fails if `environment` regresses to node.
test('the DOM is live', () => {
  document.body.innerHTML = '<p>raw dom</p>'
  expect(document.body.textContent).toContain('raw dom')
})

// Fails if `environment` becomes a DOM that is not jsdom. The test above
// cannot catch that, and the vitest/jsdom types assume this global exists.
test('the DOM is jsdom specifically', () => {
  expect(typeof jsdom.window).toBe('object')
})

// Fails if jest-dom's matchers stop being registered by the setup file.
test('jest-dom matchers are registered', () => {
  render(<p>hi</p>)
  expect(screen.getByText('hi')).toBeVisible()
})

// Pairs with the test above: if `afterEach(cleanup)` is dropped from the setup
// file, that render survives into this one and the count is 2. RTL registers
// cleanup itself only when globals are on, which they are not here.
test('cleanup ran between tests', () => {
  render(<p>hi</p>)
  expect(screen.getAllByText('hi')).toHaveLength(1)
})
