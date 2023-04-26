import React from 'react'
import styles from './styles.module.scss'
import Info from './info'
import Chart from '../../../features/quiz-results/chart'
import { CVResultContext } from '@/pages/quiz/result'

export function FirstSection() {
  const cv = React.useContext(CVResultContext)

  return (
    <section className={styles.firstSection}>
      <Info cv={cv} />
      <Chart cv={cv} />
    </section>
  )
}