import { useEffect, useRef, useState, type ComponentRef } from 'react'
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
  const starRefs = useRef<Map<number, ComponentRef<typeof Star> | null>>(null)

  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [hoveredValue, setHoveredValue] = useState(defaultValue)
  const [isShowingModal, setIsShowingModal] = useState(false)

  const getStarRefs = () => {
    starRefs.current ??= new Map()
    return starRefs.current
  }

  const setStarRef = (instance: ComponentRef<typeof Star> | null, value: number) => {
    const map = getStarRefs()
    map.set(value, instance)
    return () => {
      map.delete(value)
    }
  }

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
    getStarRefs().get(value)?.focus()
  }

  useEffect(() => {
    if (!isShowingModal) getStarRefs().get(minValue)?.focus()
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
      <div className={styles.stars}>
        {stars.map((value) => (
          <Star
            ref={(instance) => setStarRef(instance, value)}
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
