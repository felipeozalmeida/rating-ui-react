import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Star from '../Star'
import Button from '../Button'
import Modal from '../Modal'
import styles from './styles.module.scss'

const defaultTitle = 'Rate Your Experience'
const defaultMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent']

const stars = Array.from({ length: 5 }, (_, i) => i + 1)
const defaultValue = 0
const minValue = stars[0]
const maxValue = stars[stars.length - 1]
const stepValue = 1

const Rating = ({ title = defaultTitle, messages = defaultMessages }) => {
  const starsRef = useRef<HTMLDivElement>(null)

  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [hoveredValue, setHoveredValue] = useState(defaultValue)
  const [isShowingModal, setIsShowingModal] = useState(false)

  const handleClick = (value: number) => {
    setCurrentValue(value)
    setHoveredValue(defaultValue)
  }

  const handleClose = () => {
    setCurrentValue(defaultValue)
    setHoveredValue(defaultValue)
    setIsShowingModal(false)
  }

  const handleKeyDown = (value: number) => {
    setCurrentValue(value)
    setHoveredValue(defaultValue)
    starsRef.current
      ?.querySelector<HTMLButtonElement>(`button[data-value="${value.toString()}"]`)
      ?.focus()
  }

  useEffect(() => {
    if (!isShowingModal) starsRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
  }, [isShowingModal])

  const feedback = messages[currentValue - 1] || defaultMessages[currentValue - 1]

  return (
    <div
      className={styles.rating}
      role="radiogroup"
      aria-labelledby="ratingLabel"
      aria-describedby={feedback ? 'ratingFeedback' : undefined}
    >
      <h1 className={styles.title} id="ratingLabel">
        {title || defaultTitle}
      </h1>
      <div className={styles.stars} ref={starsRef}>
        {stars.map((value) => (
          <Star
            key={value}
            value={value}
            currentValue={currentValue}
            hoveredValue={hoveredValue}
            defaultValue={defaultValue}
            minValue={minValue}
            maxValue={maxValue}
            stepValue={stepValue}
            disabled={isShowingModal}
            role="radio"
            onClick={handleClick}
            onHover={setHoveredValue}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      {feedback && (
        <p className="text" id="ratingFeedback">
          {feedback}
        </p>
      )}
      <Button
        className={styles.button}
        disabled={!currentValue || isShowingModal}
        onClick={() => {
          setIsShowingModal(true)
        }}
      >
        Submit
      </Button>
      {isShowingModal &&
        createPortal(
          <Modal
            title="Thank You"
            content={`You rated us ${currentValue.toString()}!`}
            onClose={handleClose}
          />,
          document.body,
        )}
    </div>
  )
}

export default Rating
