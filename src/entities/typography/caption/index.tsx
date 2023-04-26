import React from 'react'
import styles from './styles.module.scss'

export default function Caption({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.caption}>{children}</span>
  )
}