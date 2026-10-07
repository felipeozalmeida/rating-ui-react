import { expect, test } from 'vitest'

// Fails if `.dom.` specs stop being routed to a DOM environment. Which DOM, and
// whether its setup file is wired in, is each pinned guard spec's job, since
// both can differ per project.
test('the DOM is live', () => {
  document.body.innerHTML = '<p>raw dom</p>'
  expect(document.body.textContent).toContain('raw dom')
})
