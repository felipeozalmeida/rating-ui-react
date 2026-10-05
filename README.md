# Rating UI React

A simple rating component that demonstrates essential React concepts and
patterns. This project showcases how fundamental React features work together
to build interactive user interfaces.

**Live demo:** https://felipeozalmeida.github.io/rating-ui-react/

## What You'll Find Here

This rating UI implementation covers these key React concepts:

1. **JSX** - Writing component markup
2. **Components** - Building reusable UI pieces
3. **Styling** - Applying global, scoped, and dynamic styles
4. **Props & State** - Managing data flow and component state
5. **Events** - Handling user interactions
6. **Lists** - Rendering dynamic collections
7. **Conditional Rendering** - Showing/hiding UI based on conditions
8. **Children Components** - Component composition patterns
9. **Effects** - Managing side effects and lifecycle
10. **Portals** - Rendering outside the component tree (e.g. modals)
11. **Accessibility (a11y)** - Keyboard navigation, focus management, ARIA roles, and feedback

## Getting Started

First, make sure you have a suitable Node.js version installed. For reference,
this project was developed with:

1. node v24.18.0
2. npm v11.16.0

Install dependencies with your favorite package manager. Assuming it's npm:

```sh
npm install
```

Then you're ready to go with:

```sh
npm run dev
```

## Running Tests

Browser Mode specs run in Chromium through Playwright, which has to be
downloaded once:

```sh
npm run test:install
npm run test:unit
```

On Linux, Chromium also needs some system libraries. On Debian, Ubuntu and
their derivatives, Playwright can install them for you:

```sh
npm run test:install -- --with-deps
```

This uses apt, so it fails on other distributions. There, install Chromium's
dependencies with your own package manager instead.
