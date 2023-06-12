import React from 'react'
import styles from './styles.module.scss'
import { Info } from './info'
import Decoration from './decoration.svg'

export function Reviews() {
  return (
    <section className={styles.planContents}>
      <Decoration className={styles.decoration} />
      <Info />
    </section>
  )
}