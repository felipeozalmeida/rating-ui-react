import { expect, test } from 'vitest'

// Compile-time guards. Erased at runtime, but `npm run type-check` fails if the
// node program gains a DOM or vite/client, or loses node's own types.
export type _TypesGuard = [typeof process]
// @ts-expect-error -- `lib` leaves out DOM, so node specs stay DOM-free
export type _NoDom = typeof document
// @ts-expect-error -- `types` leaves out vite/client, so node specs stay portable
export type _NoViteClient = ImportMetaEnv

// Fails if `.node.` specs get routed to a project with a DOM. The types above
// cannot catch that: they describe the program, not where Vitest runs it.
test('there is no DOM', () => {
  expect('document' in globalThis).toBe(false)
})
