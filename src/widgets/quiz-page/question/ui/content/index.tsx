import { quizQuestions } from '@/widgets/quiz-page/question/model/questions'
import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'

export default function QuestionContent({ questionNumber }: { questionNumber: number }) {
  const question = quizQuestions[questionNumber - 1]

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Headline 
          color={question.textAccentColor}
        >
          <span dangerouslySetInnerHTML={{ __html: question.text }} />
        </Headline>
      </div>
      <div className={styles.content}>

      </div>
    </div>
  )
}