import Image from 'next/image'
import styles from './styles.module.scss'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'

import CriticalEmoji from '@/assets/state-indicator/critical.png'
import LowEmoji from '@/assets/state-indicator/low.png'
import AlarmingEmoji from '@/assets/state-indicator/alarming.png'
import RiskyEmoji from '@/assets/state-indicator/risky.png'
import NormalEmoji from '@/assets/state-indicator/normal.png'

import CriticalIcon from '@/assets/state-indicator/critical.svg'
import NotCriticalIcon from '@/assets/state-indicator/not-critical.svg'

export default function StateIndicatorBlock({ cv }: { cv: CvBasedQuestionnaireResponse }) {
  const parts = ['critical', 'low', 'alarming', 'risky', 'normal']
  const partIndex = parts.indexOf(cv.level_mental_health)
  const statusEmojiLeftPos = (partIndex / parts.length + (1 / parts.length / 2)) * 100

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
        {cv.level_mental_health !== 'normal' && {
          critical: <CriticalIcon />,
          low: <NotCriticalIcon />,
          alarming: <NotCriticalIcon />,
          risky: <NotCriticalIcon />
        }[cv.level_mental_health]}
      </span>
      <div className={styles.state}>
        <div className={styles.indicator}>
          {cv.level_mental_health !== 'normal' && (<>
            <div 
              className={styles.improvement} 
              style={{ 
                marginLeft: `${statusEmojiLeftPos}%`,
                width: `${100 - statusEmojiLeftPos - (22/520*100)}%`
              }}
            >
              <div className={styles.label}>
                {{
                  critical: 'Можно улучшить за 3 недели',
                  low: 'Можно улучшить за 2 недели',
                  alarming: 'Можно улучшить за неделю',
                  risky: 'Улучшить за 3 дня'
                }[cv.level_mental_health]}
              </div>
              <div className={styles.visual} />
            </div>
          </>)}
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
            <Image 
              src={{
                critical: CriticalEmoji,
                low: LowEmoji,
                alarming: AlarmingEmoji,
                risky: RiskyEmoji,
                normal: NormalEmoji,
              }[cv.level_mental_health]} alt='' 
              className={styles.statusEmoji}
              style={{ left: `${statusEmojiLeftPos}%` }}
            />
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