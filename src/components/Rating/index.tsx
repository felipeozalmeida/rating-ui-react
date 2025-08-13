import { useState } from 'react'
import { createPortal } from 'react-dom'
import Star from '../Star'
import Button from '../Button'
import Modal from '../Modal'
import styles from './styles.module.scss'

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
      <Button
        className={styles.button}
        disabled={!currentValue}
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
