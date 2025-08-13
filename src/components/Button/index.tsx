import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './styles.module.scss'

const Button = ({ children, className, ...rest }: ComponentProps<'button'>) => (
  <button className={clsx(styles.button, className)} type="button" {...rest}>
    {children}
  </button>
)

export default Button
