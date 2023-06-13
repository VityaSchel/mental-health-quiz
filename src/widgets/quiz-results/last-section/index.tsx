import React from 'react'
import Paragraph from '@/entities/typography/paragraph'
import styles from './styles.module.scss'
import GetPlan from '@/features/quiz-results/get-plan'
import { Timer } from '@/features/quiz-results/timer'

export function LastSection() {
  const date = React.useMemo(() => new Date(Date.now() + 1000*60*15), [])

  return (
    <section className={styles.lastSection}>
      <Timer from={date} />
      <span className={styles.title}>Мы сможем помочь вам улучшить ваше состояние уже за 3 дня</span>
      <Paragraph>Не откладывайте на потом то, что можно начать сейчас</Paragraph>
      <GetPlan>Получить план за 27 рублей</GetPlan>
    </section>
  )
}