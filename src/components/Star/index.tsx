import clsx from 'clsx'
import styles from './styles.module.scss'

const Star = ({
  value,
  currentValue,
  hoveredValue,
  onHover,
  onClick,
}: {
  value: number
  currentValue: number
  hoveredValue: number
  onHover: (star: number) => void
  onClick: (star: number) => void
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.star, {
        [styles['star--active']]: value <= currentValue || value <= hoveredValue,
      })}
      onMouseEnter={() => {
        onHover(value)
      }}
      onMouseLeave={() => {
        onHover(0)
      }}
      onClick={() => {
        onClick(currentValue === value ? 0 : value)
      }}
    >
      {'\u2605'}
    </button>
  )
}

export default Star
