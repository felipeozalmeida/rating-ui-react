import { useEffect } from 'react'
import Button from '../Button'
import styles from './styles.module.scss'

const defaultTitle = 'Title'
const defaultContent = 'Content'

const Modal = ({
  title = defaultTitle,
  content = defaultContent,
  onClose = () => {
    /* noop */
  },
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <p className={styles.title}>{title || defaultTitle}</p>
        <p className="text">{content || defaultContent}</p>
        <Button className={styles.button} onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

export default Modal
