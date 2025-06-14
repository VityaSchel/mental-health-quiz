import React from 'react'
import { quizQuestions } from '@/widgets/quiz-page/question/model/questions'
import styles from './styles.module.scss'
import Headline from '@/entities/typography/headline'
import { MdOutlineArrowBack } from 'react-icons/md'
import { Button } from '@/shared/ui/button'
import SingleOptionContent from './single-option-content'
import MultiOptionsContent from './multi-options-content'
import SliderContent from './slider-content'

export default function QuestionContent({ questionNumber, onSubmit, onGoBack }: { 
  questionNumber: number
  onSubmit: (answerKey: string | string[]) => void
  onGoBack: () => void
}) {
  const question = quizQuestions[questionNumber - 1]
  const [values, setValues] = React.useState<string | string[]>([])

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
        {{
          'single_option': <SingleOptionContent question={question} onSubmit={onSubmit} />,
          'slider': <SliderContent question={question} value={values as string} onChange={setValues} />,
          'multi_options': <MultiOptionsContent question={question} onChange={setValues} />,
        }[question.answerType]}
      </div>
      <div className={styles.action}>
        {questionNumber > 1 && (
          <Button variant='text' onClick={() => onGoBack()}>
            <MdOutlineArrowBack /> Назад
          </Button>
        )}
        {question.answerType !== 'single_option' && (
          <Button variant='contained' disabled={!values.length} onClick={() => onSubmit(values)}>
            Продолжить
          </Button>
        )}
      </div>
    </div>
  )
}