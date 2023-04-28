import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'
import Paragraph from '@/entities/typography/paragraph'
import GetPlan from '@/features/quiz-results/get-plan'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'

export default function StateInficatorInfo({ cv }: { cv: CvBasedQuestionnaireResponse }) {
  return (
    <div className={styles.info}>
      <Headline 
        color={{
          critical: 'rgba(225, 40, 40, 1)',
          low: 'rgba(235, 164, 27, 1)',
          alarming: 'rgba(238, 192, 31, 1)',
          risky: 'rgba(224, 227, 35, 1)',
          normal: 'rgba(176, 236, 49, 1)', 
        }[cv.level_mental_health]}
        variant='h2'
      >
        <span dangerouslySetInnerHTML={{ __html:
          {
            critical: 'Вам <strong>срочно</strong> необходимо нормализовать уровень вашего ментального здоровья',
            low: 'Вам <strong>срочно</strong> необходимо нормализовать уровень вашего ментального здоровья',
            alarming: 'Вам <strong>необходимо</strong> нормализовать уровень вашего ментального здоровья',
            risky: 'Вам <strong>стоит</strong> улучшить уровень вашего ментального здоровья',
            normal: 'Отлично! Советуем сделать <strong>стабильным</strong> ваше ментальное здоровье'
          }[cv.level_mental_health]
        }} />
      </Headline>
      <Paragraph>
        {{
          critical: 'Такое состояние ставит под угрозу вашу жизнь и здоровье',
          low: 'Иначе психическое состояние может стать необратимым',
          alarming: 'Риск ухудшения психологического здоровья очень велик',
          risky: 'Улучшения приведут к успехам во всех сверах жизни',
          normal: 'Профилактика позволит избавить вас от депрессий на долгие годы ',
        }[cv.level_mental_health]}
      </Paragraph>
      <GetPlan>Улучшить состояние</GetPlan>
    </div>
  )
}