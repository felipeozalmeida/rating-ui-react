import { useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import styles from './styles.module.scss'
import Star from '../Star'
import Modal from '../Modal'

const defaultTitle = 'Rate Your Experience'
const defaultMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent']

const Rating = ({ title = defaultTitle, messages = defaultMessages }) => {
  const [currentValue, setCurrentValue] = useState(0)
  const [hoveredValue, setHoveredValue] = useState(0)
  const [isShowingModal, setIsShowingModal] = useState(false)

  const handleClose = () => {
    setCurrentValue(0)
    setHoveredValue(0)
    setIsShowingModal(false)
  }

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
      {feedback && <p className="text">{feedback}</p>}
      <button
        className={clsx('button', styles.button)}
        type="button"
        disabled={!currentValue}
        onClick={() => {
          setIsShowingModal(true)
        }}
      >
        Submit
      </button>
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
