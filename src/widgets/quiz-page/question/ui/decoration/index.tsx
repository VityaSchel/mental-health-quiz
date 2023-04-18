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
import Question6DecorationStandalone from '@/assets/backgrounds/standalone6.svg'
import Question6DecorationMobile from '@/assets/backgrounds/mobile6.svg'
import Question7DecorationStandalone from '@/assets/backgrounds/standalone7.svg'
import Question7DecorationMobile from '@/assets/backgrounds/mobile7.svg'
import Question8DecorationStandalone from '@/assets/backgrounds/standalone8.svg'
import Question8DecorationMobile from '@/assets/backgrounds/mobile8.svg'
import Question9DecorationStandalone from '@/assets/backgrounds/standalone9.svg'
import Question9DecorationMobile from '@/assets/backgrounds/mobile9.svg'

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
  },
  {
    standalone: <Question6DecorationStandalone className={styles.standalone} />,
    mobile: <Question6DecorationMobile className={styles.mobile} />
  },
  {
    standalone: <Question7DecorationStandalone className={styles.standalone} />,
    mobile: <Question7DecorationMobile className={styles.mobile} />
  },
  {
    standalone: <Question8DecorationStandalone className={styles.standalone} />,
    mobile: <Question8DecorationMobile className={styles.mobile} />
  },
  {
    standalone: <Question9DecorationStandalone className={styles.standalone} />,
    mobile: <Question9DecorationMobile className={styles.mobile} />
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