import clsx from 'clsx'
import styles from './styles.module.scss'

const Star = ({
  value,
  currentValue,
  hoveredValue,
  onClick,
  onHover,
}: {
  value: number
  currentValue: number
  hoveredValue: number
  onClick: (star: number) => void
  onHover: (star: number) => void
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.star, {
        [styles['star--active']]: value <= currentValue || value <= hoveredValue,
      })}
      onClick={() => {
        onClick(currentValue === value ? 0 : value)
      }}
      onMouseEnter={() => {
        onHover(value)
      }}
      onMouseLeave={() => {
        onHover(0)
      }}
    >
      {'\u2605'}
    </button>
  )
}

export default Star
