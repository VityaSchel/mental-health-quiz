import CardButton from '@/shared/ui/card-button'
import { quizQuestion } from '@/widgets/quiz-page/question/model/questions'

export default function SingleOptionContent({ question, onSubmit }: {
  question: quizQuestion,
  onSubmit: (key: string) => any
}) {
  return (<>
    {question.answerType === 'single_option' && 
    question.options.map(option => (
      <CardButton
        key={option.key}
        title={option.label}
        caption={option.caption}
        onClick={() => onSubmit(option.key)}
      />
    ))}
  </>)
}