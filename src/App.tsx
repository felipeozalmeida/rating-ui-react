import { useLayoutEffect } from 'react'
import './index.scss'
import Rating from './components/Rating'

const App = () => {
  // Using native VH is awkward on mobile, so we calculate a new VH unit here
  // (yes, we could've used dvh, but it only entered Baseline in December 2022
  // and on Samsung Internet it became available only in March 2023 💀)
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  // https://caniuse.com/viewport-unit-variants
  useLayoutEffect(() => {
    const fixVhUnit = () => {
      const vhInPx = innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vhInPx.toString()}px`)
    }
    fixVhUnit()
    addEventListener('resize', fixVhUnit)
    return () => {
      removeEventListener('resize', fixVhUnit)
    }
  }, [])

  return (
    <Rating
      title="What do you feel about TypeScript?"
      messages={[
        "It's the worst piece of undefined 💀",
        'I enjoy the wild west 🤠',
        "I mean, it's alright 🤷",
        'Autocomplete is cool 😊',
        "Perfect, it's a godsend 😍",
      ]}
    />
  )
}

export default App
