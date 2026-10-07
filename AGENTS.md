# Project Instructions

## Project

- An educational rating component showing core React concepts working together: JSX, components, styling (global, scoped and dynamic), props and state, events, lists, conditional rendering, children, effects, portals, and accessibility (keyboard navigation, focus management, ARIA roles and feedback).
- Live demo: https://felipeozalmeida.github.io/rating-ui-react/

## Setup

- Developed with node v24.18.0 and npm v11.16.0.
- `npm install`, then `npm run dev`.
- Before running tests the first time, `npm run test:install` downloads Playwright's Chromium for Browser Mode. On Debian-based Linux, add `-- --with-deps` to also install Chromium's system libraries. It uses apt, so on other distributions install them with the system package manager instead.

## Code Style

- Always use the following code order for React components and, when something does not fit the description, bring up the issue immediately: acessibility IDs (e.g. useId() and derived IDs), refs, state, computed variables, event handlers, effects, and a single returned JSX template.

## Tests

- Every spec filename carries an environment qualifier. Unqualified specs fail lint.
  - `.node.`: Node, with no DOM (`.ts` only)
  - `.dom.`: the default DOM implementation, currently happy-dom
  - `.happy-dom.`, `.jsdom.`: that implementation specifically
  - `.browser.`: real Chromium through Playwright
- Choose the cheapest environment that can exercise what the spec tests: `.node.` for DOM-free logic, `.dom.` for components and hooks (rendering a hook goes through React DOM), a pinned implementation (`.happy-dom.`, `.jsdom.`) only when the spec depends on that implementation, and `.browser.` only for what emulators cannot do, such as layout, real CSS or workers.
- The environments form a fidelity gradient, from cheapest to most faithful: node, happy-dom, jsdom, browser. Keep that order wherever environments are listed (tsconfig `references`, Vitest `projects`, ESLint blocks, globs, docs), and place a new environment where it falls on the gradient rather than at the end.
- In lists of test files, put `.d.ts` files first, then setup files, then `.dom.` globs, then the pinned implementations in gradient order.
- Wherever globs or include-like lists (Vitest `include`, tsconfig `include`/`exclude`, ESLint `files`/`ignores`) cover both suffixes, list `spec` before `test`, e.g. `{spec,test}`, or `.spec.ts` and `.spec.tsx` before `.test.ts` and `.test.tsx`.
