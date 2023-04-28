import React from 'react'
import styles from './styles.module.scss'
import StateIndicatorBlock from '@/features/quiz-results/state-indicator-block'
import StateIndicatorInfo from './info'
import { CVResultContext } from '@/pages/quiz/result'

export function StateIndicatorWidget() {
  const cv = React.useContext(CVResultContext)

  return (
    <section className={styles.container}>
      <StateIndicatorBlock cv={cv} />
      <StateIndicatorInfo cv={cv} />
    </section>
  )
}