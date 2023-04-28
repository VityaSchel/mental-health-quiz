import Caption from '@/entities/typography/caption'
import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'
import GetPlan from '@/features/quiz-results/get-plan'

export default function Info({ cv }: {
  cv: CvBasedQuestionnaireResponse
}) {
  return (
    <div className={styles.info}>
      <Caption>Тест помог выявить</Caption>
      <Headline 
        color={{
          normal: 'rgba(176, 236, 49, 1)',
          risky: 'rgba(206, 209, 26, 1)',
          critical: 'rgba(226, 65, 30, 1)',
          alarming: 'rgba(231, 185, 25, 1)',
          low: 'rgba(235, 127, 27, 1)'
        }[cv.level_mental_health]}
      >
        <strong>{{
          normal: 'Нормальный',
          risky: 'Рискованный',
          critical: 'Критический',
          alarming: 'Тревожный',
          low: 'Низкий',
        }[cv.level_mental_health]}</strong>
        {' '}
        уровень вашего ментального здоровья 
      </Headline>
      <p>
        {{
          'critical': 'Ваше состояние может привести к необратимым психическим и эмоциональным проблемам, поэтому мы подготовили для вас индивидуальный план для улучшения ментального здоровья.',
          'low': 'Ваше психическое и эмоциональное состояние под угрозой быстрого ухудшения, поэтому мы подготовили для вас индивидуальный план для улучшения ментального здоровья.',
          'alarming': 'Очень велик риск ухудшения эмоционального состояния, поэтому мы подготовили для вас индивидуальный план для улучшения  ментального здоровья.',
          'risky': 'Ваше состояние можно улучшить и привести в норму, поэтому мы подготовили для вас индивидуальный план для улучшения  ментального здоровья.',
          'normal': 'Ваше состояние стоит сделать стабильным и избавить вас от депрессий на долгие годы, поэтому мы подготовили для вас индивидуальный план для улучшения  ментального здоровья.',
        }[cv.level_mental_health]}
      </p>
      <div className={styles.actions}>
        <GetPlan />
        <div className={styles.price}>
          <span className={styles.specialOffer}>27 рублей</span>
          <span className={styles.oldPrice}>500 рублей</span>
        </div>
      </div>
    </div>
  )
}