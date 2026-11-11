import { expect, test } from 'vitest'
import { server } from 'vitest/browser'
import { render } from 'vitest-browser-react'

// Visual specs are browser specs, so they share that tier's real Chromium.
test('the DOM is a real Chromium', () => {
  expect([server.provider, server.browser]).toEqual(['playwright', 'chromium'])
})

// Fails until the "Update visual regression screenshots" workflow has written
// the reference, then fails again if Chromium's rendering of it changes. Text
// and a shadow exercise the image's fonts and anti-aliasing, not just flat fills.
test('screenshots match their reference', async () => {
  const screen = await render(
    <p
      data-testid="sample"
      style={{
        width: 160,
        padding: 8,
        font: '16px sans-serif',
        background: 'white',
        boxShadow: '0 4px 12px rgb(0 0 0 / 10%)',
      }}
    >
      Sample ★
    </p>,
  )
  await expect(screen.getByTestId('sample')).toMatchScreenshot('sample')
})
