import { useEffect, useId, useRef, useState, type ComponentRef } from 'react'
import clsx from 'clsx'
import Star from '../Star'
import Button from '../Button'
import Modal from '../Modal'
import styles from './styles.module.scss'

const defaultTitle = 'Rate Your Experience'
const defaultMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent']
const defaultFeedback = 'Select a rating'

const stars = Array.from({ length: 5 }, (_, i) => i + 1)
const defaultValue = 0
const minValue = stars[0]
const maxValue = stars[stars.length - 1]
const stepValue = 1

const Rating = ({ title = defaultTitle, messages = defaultMessages }) => {
  const id = useId()
  const titleId = `${id}-rating-title`
  const feedbackId = `${id}-rating-feedback`

  const starRefs = useRef<Map<number, ComponentRef<typeof Star> | null>>(null)

  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [hoveredValue, setHoveredValue] = useState(defaultValue)
  const [isShowingModal, setIsShowingModal] = useState(false)
  const [shouldRestoreFocus, setShouldRestoreFocus] = useState(false)

  const feedback =
    messages[currentValue - 1] || defaultMessages[currentValue - 1] || defaultFeedback

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

  const setValues = (value: number) => {
    setCurrentValue(value)
    setHoveredValue(defaultValue)
  }

  const handleClose = () => {
    setValues(defaultValue)
    setIsShowingModal(false)
    setShouldRestoreFocus(true)
  }

  const handleKeyDown = (value: number) => {
    setValues(value)
    getStarRefs()
      .get(value === defaultValue ? minValue : value)
      ?.focus()
  }

  useEffect(() => {
    if (shouldRestoreFocus) {
      getStarRefs().get(minValue)?.focus()
      setShouldRestoreFocus(false)
    }
  }, [shouldRestoreFocus])

  return (
    <div
      className={styles.rating}
      role="radiogroup"
      aria-labelledby={titleId}
      aria-describedby={feedbackId}
    >
      <h1 className={styles.title} id={titleId}>
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
            onClick={setValues}
            onHover={setHoveredValue}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      <p
        className={clsx('text', { 'sr-only': feedback === defaultFeedback })}
        id={feedbackId}
        aria-live="polite"
        aria-atomic
      >
        {feedback}
      </p>
      <Button
        className={styles.button}
        disabled={!currentValue || isShowingModal}
        onClick={() => {
          setIsShowingModal(true)
        }}
      >
        Submit
      </Button>
      {isShowingModal && (
        <Modal
          title="Thank You"
          content={`You rated us ${currentValue.toString()}!`}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default Rating
