# Project Instructions

## Code Style

- Always use the following code order for React components and, when something does not fit the description, bring up the issue immediately: acessibility IDs (e.g. useId() and derived IDs), refs, state, computed variables, event handlers, effects, and a single returned JSX template.

## Tests

- Every spec filename carries an environment qualifier: `.node.`, `.dom.`, `.happy-dom.`, `.jsdom.` or `.browser.`. Unqualified specs fail lint.
- The environments form a fidelity gradient, from cheapest to most faithful: node, happy-dom, jsdom, browser. Keep that order wherever environments are listed (tsconfig `references`, Vitest `projects`, ESLint blocks, globs, docs), and place a new environment where it falls on the gradient rather than at the end.
- In lists of test files, put `.d.ts` files first, then setup files, then `.dom.` globs, then the pinned implementations in gradient order.
