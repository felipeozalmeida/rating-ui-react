import { useEffect } from 'react'
import Rating from './components/Rating'
import './index.css'

const App = () => {
  // Using native VH is strange on mobile, so we calculate a new VH unit here
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  useEffect(() => {
    const fixVhUnit = () => {
      window.document.documentElement.style.setProperty('--vh', `${innerHeight * 0.01}px`)
    }
    fixVhUnit()
    addEventListener('resize', fixVhUnit)
    return () => {
      removeEventListener('resize', fixVhUnit)
    }
  }, [])

  return <Rating />
}

export default App
