import { useEffect, useId, useRef, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { FocusTrap } from 'focus-trap-react'
import Button from '../Button'
import styles from './styles.module.scss'

const defaultTitle = 'Title'
const defaultContent = 'Content'
const defaultOnClose = () => {
  /* noop */
}

const Modal = ({ title = defaultTitle, content = defaultContent, onClose = defaultOnClose }) => {
  const id = useId()
  const titleId = `${id}-modal-title`
  const contentId = `${id}-modal-content`

  const onCloseRef = useRef(onClose)

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) onClose()
  }

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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    <FocusTrap>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal
        aria-labelledby={titleId}
        aria-describedby={contentId}
        onClick={handleBackdropClick}
      >
        <div className={styles.content}>
          <h1 className={styles.title} id={titleId}>
            {title || defaultTitle}
          </h1>
          <p className="text" id={contentId}>
            {content || defaultContent}
          </p>
          <Button className={styles.button} onClick={onClose} autoFocus>
            Close
          </Button>
        </div>
      </div>
    </FocusTrap>,
    document.body,
  )
}

export default Modal
