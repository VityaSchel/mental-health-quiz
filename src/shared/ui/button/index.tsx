import styles from './styles.module.scss'
import cx from 'classnames'

export function Button({ variant = 'text', children, className, big = false, ...props }: React.PropsWithChildren<{
  className?: string | string[]
  variant: 'text' | 'contained'
  big: boolean
}> & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cx(styles.button, {
        [styles.text]: variant === 'text',
        [styles.contained]: variant === 'contained',
        [styles.big]: big,
      }, className)}
    >
      {children}
    </button>
  )
}