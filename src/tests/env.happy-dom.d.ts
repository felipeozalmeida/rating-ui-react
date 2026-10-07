import type { DetachedWindowAPI } from 'happy-dom'

// Vitest ships types for the jsdom global (vitest/jsdom) but not for happy-dom's,
// so this declares it, as happy-dom's docs suggest:
// https://github.com/capricorn86/happy-dom/wiki/Setup-as-Test-Environment#browser-api
declare global {
  const happyDOM: DetachedWindowAPI
}
