import { useState } from 'react'
import clsx from 'clsx'
import styles from './Rating.module.css'

const Rating = () => {
  const [rating, setRating] = useState(0)
  return (
    <div className={styles.rating}>
      <p>Rate Your Experience</p>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={clsx(styles.star, { [styles['star--active']]: star === rating })}
            type="button"
            onClick={() => setRating((prevRating) => (prevRating === star ? 0 : star))}
          >
            {'\u2605'}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Rating
