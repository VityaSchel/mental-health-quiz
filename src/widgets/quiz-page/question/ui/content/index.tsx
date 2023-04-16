import { quizQuestions } from '@/widgets/quiz-page/question/model/questions'
import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'
import CardButton from '@/shared/ui/card-button'

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
        <span className={styles.hint}>Выберите вариант который больше всего вам соответствует</span>
      </div>
      <div className={styles.content}>
        {question.options.map(question => (
          <CardButton 
            key={question.key}
            title={question.label}
            caption={question.caption}
          />
        ))}
      </div>
    </div>
  )
}