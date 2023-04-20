import styles from './styles.module.scss'
import cx from 'classnames'

export function Button({ variant = 'text', children, className, ...props }: React.PropsWithChildren<{
  className?: string | string[]
  variant: 'text' | 'contained'
}> & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cx(styles.button, {
        [styles.text]: variant === 'text',
        [styles.contained]: variant === 'contained',
      }, className)}
    >
      {children}
    </button>
  )
}