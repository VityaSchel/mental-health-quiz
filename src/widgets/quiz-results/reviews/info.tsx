import Caption from '@/entities/typography/caption'
import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'
import GetPlan from '@/features/quiz-results/get-plan'

export function Info() {
  return (
    <div className={styles.info}>
      <Caption>Улучшите свою жизнь</Caption>
      <Headline 
        color={'#8ADFD6'}
      >
        Мы помогли уже более <strong>2000 людям</strong> улучшить своё ментальное здоровье 
      </Headline>
      <p>
        Наши пользователи отмечают уменьшение стресса, повышение самооценки, улучшение настроения и более глубокое понимание себя.
      </p>
      <div className={styles.actions}>
        <GetPlan>Начать терапию</GetPlan>
      </div>
    </div>
  )
}