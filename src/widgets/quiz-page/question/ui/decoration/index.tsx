import styles from './styles.module.scss'
import Question1DecorationStandalone from '@/assets/backgrounds/standalone1.svg'
import Question1DecorationMobile from '@/assets/backgrounds/mobile1.svg'
import Question2DecorationStandalone from '@/assets/backgrounds/standalone2.svg'
import Question2DecorationMobile from '@/assets/backgrounds/mobile2.svg'
import Question3DecorationStandalone from '@/assets/backgrounds/standalone3.svg'
import Question3DecorationMobile from '@/assets/backgrounds/mobile3.svg'
import Question4DecorationStandalone from '@/assets/backgrounds/standalone4.svg'
import Question4DecorationMobile from '@/assets/backgrounds/mobile4.svg'
import Question5DecorationStandalone from '@/assets/backgrounds/standalone5.svg'
import Question5DecorationMobile from '@/assets/backgrounds/mobile5.svg'

const decorationSources: {
  standalone: JSX.Element
  mobile: JSX.Element
}[] = [
  {
    standalone: <Question1DecorationStandalone className={styles.standalone} />,
    mobile: <Question1DecorationMobile className={styles.mobile} />,
  },
  {
    standalone: <Question2DecorationStandalone className={styles.standalone} />,
    mobile: <Question2DecorationMobile className={styles.mobile} />,
  },
  {
    standalone: <Question3DecorationStandalone className={styles.standalone} />,
    mobile: <Question3DecorationMobile className={styles.mobile} />,
  },
  {
    standalone: <Question4DecorationStandalone className={styles.standalone} />,
    mobile: <Question4DecorationMobile className={styles.mobile} />,
  },
  {
    standalone: <Question5DecorationStandalone className={styles.standalone} />,
    mobile: <Question5DecorationMobile className={styles.mobile} />
  }
]

export default function QuestionDecoration({ questionNumber }: {
  questionNumber: number
}) {
  const question = decorationSources[questionNumber - 1]

  return (
    <div className={styles.decoration}>
      {question.standalone}
      {question.mobile}
    </div>
  )
}