import { quizQuestions } from '@/widgets/quiz-page/question/model/questions'
import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'
import CardButton from '@/shared/ui/card-button'
import { MdOutlineArrowBack } from 'react-icons/md'
import { Button } from '@/shared/ui/button'

export default function QuestionContent({ questionNumber, onSubmit, onGoBack }: { 
  questionNumber: number
  onSubmit: (answerKey: string | string[]) => void
  onGoBack: () => void
}) {
  const question = quizQuestions[questionNumber - 1]

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Headline 
          color={question.textAccentColor}
        >
          <span dangerouslySetInnerHTML={{ __html: question.text }} />
        </Headline>
        <span className={styles.hint}>{question.subtitle}</span>
      </div>
      <div className={styles.content}>
        {question.options.map(question => (
          <CardButton 
            key={question.key}
            title={question.label}
            caption={question.caption}
            onClick={() => onSubmit(question.key)}
          />
        ))}
      </div>
      <div className={styles.action}>
        {questionNumber > 1 && (
          <Button variant='text' onClick={() => onGoBack()}>
            <MdOutlineArrowBack /> Назад
          </Button>
        )}
      </div>
    </div>
  )
}