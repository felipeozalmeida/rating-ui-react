import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

// DEMO ONLY, DO NOT MERGE: block the main thread for 3s on desktop-sized
// viewports, so Lighthouse's desktop performance score drops below 0.9 while
// the mobile run (412px wide) stays unaffected.
if (window.matchMedia('(min-width: 1024px)').matches) {
  const end = performance.now() + 3000
  while (performance.now() < end) {
    // Busy-wait.
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
