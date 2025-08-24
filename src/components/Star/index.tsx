import { forwardRef, type AriaRole } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

const Star = forwardRef<
  HTMLButtonElement,
  {
    value: number
    currentValue: number
    hoveredValue: number
    defaultValue: number
    minValue: number
    maxValue: number
    stepValue: number
    disabled: boolean
    role: AriaRole
    onClick: (value: number) => void
    onHover: (value: number) => void
    onKeyDown: (value: number) => void
  }
>(
  (
    {
      value,
      currentValue,
      hoveredValue,
      defaultValue,
      minValue,
      maxValue,
      stepValue,
      disabled,
      role,
      onClick,
      onHover,
      onKeyDown,
    },
    ref,
  ) => {
    const isActive = hoveredValue !== defaultValue ? value <= hoveredValue : value <= currentValue
    const isChecked = value === currentValue
    const isFocusable = isChecked || (currentValue === defaultValue && value === minValue)
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(styles.star, { [styles['star--active']]: isActive })}
        disabled={disabled}
        role={role}
        tabIndex={isFocusable ? 0 : -1}
        aria-label={`Rate ${value.toString()} out of ${maxValue.toString()} stars`}
        aria-checked={isChecked}
        data-value={value}
        onClick={() => {
          onClick(isChecked ? defaultValue : value)
        }}
        onMouseEnter={() => {
          onHover(value)
        }}
        onMouseLeave={() => {
          onHover(defaultValue)
        }}
        onKeyDown={(event) => {
          let newValue: number | null = null
          switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
              newValue = value === minValue ? maxValue : value - stepValue
              break
            case 'ArrowRight':
            case 'ArrowDown':
              newValue = value === maxValue ? minValue : value + stepValue
              break
            case ' ':
            case 'Enter':
              newValue = isChecked ? defaultValue : value
              break
          }
          if (newValue != null) {
            event.stopPropagation()
            event.preventDefault()
            onKeyDown(newValue)
          }
        }}
      >
        <span aria-hidden>{'\u2605'}</span>
      </button>
    )
  },
)

export default Star
