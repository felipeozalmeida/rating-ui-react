import styles from './Rating.module.css'

const Rating = () => (
  <div className={styles.rating}>
    <h2>Rate Your Experience</h2>
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={styles.star}>
          {'\u2605'}
        </span>
      ))}
    </div>
  </div>
)

export default Rating
