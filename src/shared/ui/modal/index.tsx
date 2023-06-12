import { createPortal } from 'react-dom'
import cx from 'classnames'
import styles from './styles.module.scss'
import CloseIcon from './close.svg'
import { useHotkeys } from 'react-hotkeys-hook'

export function Modal({ visible, children, onClose, className, ...props }: React.PropsWithChildren<{
  visible: boolean
  className?: string
  onClose?: () => any
}>) {
  useHotkeys('esc', () => onClose?.())

  return createPortal(
    <div
      className={cx(styles.modalContainer, { [styles.visible]: visible })}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return false
        onClose?.()
      }}
    >
      <div className={cx(styles.modal, className)} {...props}>
        {children}
      </div>
      <button className={styles.closeButton} onClick={() => onClose?.()}>
        <CloseIcon />
      </button>
    </div>,
    document.querySelector('#modal')!
  )
}