import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// React Testing Library registers this itself, but only behind a bare
// `typeof afterEach === 'function'` check at import time. We run with
// `globals: false`, so that check finds nothing and cleanup would silently
// never register. Register it explicitly instead.
afterEach(cleanup)
