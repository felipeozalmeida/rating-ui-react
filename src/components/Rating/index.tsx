import { useState } from 'react'
import styles from './styles.module.scss'
import Star from '../Star'

const defaultTitle = 'Rate Your Experience'
const defaultMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent']

const Rating = ({ title = defaultTitle, messages = defaultMessages }) => {
  const [currentValue, setCurrentValue] = useState(0)
  const [hoveredValue, setHoveredValue] = useState(0)

  const feedback = messages[currentValue - 1] || defaultMessages[currentValue - 1]

  return (
    <div className={styles.rating}>
      <p className={styles.title}>{title || defaultTitle}</p>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            value={value}
            currentValue={currentValue}
            hoveredValue={hoveredValue}
            onClick={setCurrentValue}
            onHover={setHoveredValue}
          />
        ))}
      </div>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  )
}

export default Rating
