import { expect, test } from 'vitest'
import { page, server } from 'vitest/browser'
import { render } from 'vitest-browser-react'

// Compile-time guards. Erased at runtime, but `npm run type-check` fails if the
// tsconfig `types` stop providing vite/client or start providing node.
export type _TypesGuard = [ImportMetaEnv]
// @ts-expect-error -- `types` leaves out node, since this is a real browser
export type _NoNode = typeof process

// Fails if this project stops running in Playwright's Chromium.
test('the DOM is a real Chromium', () => {
  expect([server.provider, server.browser]).toEqual(['playwright', 'chromium'])
})

// The reason this tier exists: emulators have no layout engine, so jsdom and
// happy-dom report every box as 0x0.
test('layout is real', async () => {
  const screen = await render(<div style={{ width: 120, height: 40 }}>box</div>)
  const box = screen.getByText('box').element().getBoundingClientRect()
  expect([box.width, box.height]).toEqual([120, 40])
})

// Browser Mode ships its own DOM matchers, so this tier needs no jest-dom.
test('DOM matchers are available', async () => {
  const screen = await render(<p>hi</p>)
  await expect.element(screen.getByText('hi')).toBeVisible()
})

// Pairs with the test above: vitest-browser-react registers its own cleanup
// through an imported `beforeEach`, so it works with `globals: false` and this
// tier needs no setup file. If it stopped, that render would survive here.
test('cleanup ran between tests', async () => {
  await render(<p>hi</p>)
  expect(page.getByText('hi').elements()).toHaveLength(1)
})
