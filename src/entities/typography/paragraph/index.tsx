import React from 'react'
import styles from './styles.module.scss'

export default function Paragraph({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.p}>
      {children}
    </p>
  )
}