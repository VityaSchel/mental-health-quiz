import React from 'react'
import styles from './styles.module.scss'
import { Info } from './info'
import { Cards } from './cards'

export function PlanContents() {
  return (
    <section className={styles.planContents}>
      <Info />
      <Cards />
    </section>
  )
}