import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

// Compile-time guard. Erased at runtime, but `npm run type-check` fails if the
// tsconfig stops providing one of these: `happyDOM` comes from
// env.happy-dom.d.ts, the rest from `types`. Unlike the jsdom program, nothing
// else here pulls in @types/node, so `process` depends on "node".
export type _TypesGuard = [typeof process, typeof happyDOM, ImportMetaEnv]

// Fails if this project's `environment` becomes a DOM that is not happy-dom.
// The `.dom.` spec cannot catch that, and env.happy-dom.d.ts assumes this
// global exists.
test('the DOM is happy-dom specifically', () => {
  expect(typeof happyDOM.setViewport).toBe('function')
})

// `setupFiles` is per project, so each project proves its own wiring rather
// than relying on whichever one `.dom.` specs are routed to.

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
