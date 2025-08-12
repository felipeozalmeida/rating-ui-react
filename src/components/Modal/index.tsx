import { useEffect } from 'react'
import clsx from 'clsx'
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
        <button className={clsx('button', styles.button)} type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
