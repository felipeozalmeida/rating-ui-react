import { useEffect, useRef } from 'react'
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

  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const aborter = new AbortController()
    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape') onCloseRef.current()
      },
      { signal: aborter.signal },
    )
    return () => {
      aborter.abort()
    }
  }, [])

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal
      aria-labelledby="modalTitle"
      aria-describedby="modalContent"
    >
      <div className={styles.content}>
        <h1 className={styles.title} id="modalTitle">
          {title || defaultTitle}
        </h1>
        <p className="text" id="modalContent">
          {content || defaultContent}
        </p>
        <Button className={styles.button} onClick={onClose} autoFocus>
          Close
        </Button>
      </div>
    </div>
  )
}

export default Modal
