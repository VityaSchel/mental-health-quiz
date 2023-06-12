import Caption from '@/entities/typography/caption'
import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'
import GetPlan from '@/features/quiz-results/get-plan'

export function Info() {
  return (
    <div className={styles.info}>
      <Caption>Что вы получите?</Caption>
      <Headline 
        color={'#5e72d6'}
      >
        Мы анализируем ваши <strong>проблемы</strong> и разрабатываем персонализированный план
      </Headline>
      <p>
        Вы получите индивидуальный план улучшения ментального здоровья, Еженедельные рекомендации от наших психологов, а также гарантию результата, основанную на опыте других людей.
      </p>
      <div className={styles.actions}>
        <GetPlan />
      </div>
    </div>
  )
}