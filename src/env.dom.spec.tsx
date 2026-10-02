import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

// Fails if `.dom.` specs stop being routed to a DOM environment.
test('the DOM is live', () => {
  document.body.innerHTML = '<p>raw dom</p>'
  expect(document.body.textContent).toContain('raw dom')
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
