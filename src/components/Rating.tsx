import { useState } from 'react'
import clsx from 'clsx'
import styles from './Rating.module.css'

const messages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent']

const Rating = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  return (
    <div className={styles.rating}>
      <p className={styles.title}>Rate Your Experience</p>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={clsx(styles.star, {
              [styles['star--active']]: star <= rating || star <= hover,
            })}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating((prevRating) => (prevRating === star ? 0 : star))}
          >
            {'\u2605'}
          </button>
        ))}
      </div>
      {rating > 0 && <p className={styles.feedback}>{messages[rating - 1]}</p>}
    </div>
  )
}

export default Rating
