import { useLayoutEffect } from 'react'
import './index.scss'
import Rating from './components/Rating'

const App = () => {
  // Using native VH is strange on mobile, so we calculate a new VH unit here
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  useLayoutEffect(() => {
    const fixVhUnit = () => {
      const vhInPx = window.innerHeight * 0.01
      window.document.documentElement.style.setProperty('--vh', `${vhInPx.toString()}px`)
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
