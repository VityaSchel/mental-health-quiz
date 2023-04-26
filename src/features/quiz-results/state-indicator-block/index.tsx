import styles from './styles.module.scss'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'

export default function StateIndicatorBlock({ cv }: { cv: CvBasedQuestionnaireResponse }) {
  return (
    <div className={styles.block}>
      <span className={styles.title}>
        {
          cv.level_mental_health === 'normal'
            ? 'Вы в хорошей форме, сделайте ваше состояние постоянным'
            : cv.level_mental_health === 'low'
              ? 'Ваше состояние можно улучшить'
              : 'Ваше состояние под угрозой'
        }
      </span>
      <div className={styles.state}>
        <div className={styles.indicator}>
          <div className={styles.improvement}>
            <div className={styles.label}>Можно улучшить за 3 недели</div>
            <div className={styles.visual} />
          </div>
          <div className={styles.progress}>
            {[
              'rgba(225, 40, 40, 1)',
              'rgba(235, 127, 27, 1)',
              'rgba(238, 192, 31, 1)',
              'rgba(224, 227, 35, 1)',
              'rgba(176, 236, 49, 1)',
            ].map((filledColor, i) => (
              <div className={styles.part} style={
                i <= ['critical', 'low', 'alarming', 'risky', 'normal'].indexOf(cv.level_mental_health) 
                  ? { backgroundColor: filledColor } 
                  : undefined
              } key={i} />
            ))}
          </div>
        </div>
        <div className={styles.ticks}>
          <span>Плохо</span>
          <span className={styles.verticalBar} />
          <span>Тревожно</span>
          <span className={styles.verticalBar} />
          <span>Умеренно</span>
        </div>
      </div>
    </div>
  )
}