import React from 'react'
import styles from './styles.module.scss'
import { createPortal } from 'react-dom'
import cx from 'classnames'
import CloseIcon from './close.svg'
import { useHotkeys } from 'react-hotkeys-hook'

export function Modal({ visible, children, onClose, className, ...props }: React.PropsWithChildren<{
  visible: boolean
  className?: string
  onClose?: () => any
}>) {
  useHotkeys('esc', () => visible && onClose?.(), [visible, onClose])
  const modalRef = React.useRef<HTMLDivElement>(null)
  const randomModalID = React.useRef<number | undefined>()

  React.useEffect(() => {
    const root = document.querySelector('html')
    if (root && modalRef.current) {
      if (visible) {
        if (randomModalID.current === undefined) randomModalID.current = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        root.classList.add('scroll-lock-' + randomModalID.current)
      } else {
        root.classList.remove('scroll-lock-' + randomModalID.current)
      }
    }
  }, [modalRef, visible])

  return createPortal(
    <div
      className={cx(styles.modalContainer, { [styles.visible]: visible })}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return false
        onClose?.()
      }}
      ref={modalRef}
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