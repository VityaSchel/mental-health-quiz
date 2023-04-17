import styles from './styles.module.scss'
import cx from 'classnames'

export function Button({ variant = 'text', children }: React.PropsWithChildren<{
  variant: 'text'
}>) {
  return (
    <button
      className={cx(styles.button, {
        [styles.text]: variant === 'text'
      })}
    >
      {children}
    </button>
  )
}