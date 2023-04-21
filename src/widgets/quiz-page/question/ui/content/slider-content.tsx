import { quizQuestion } from '@/widgets/quiz-page/question/model/questions'
import { Range } from '@/shared/range'

export default function SliderContent({ question, value, onChange }: {
  question: quizQuestion
  value: string
  onChange: (valueKey: string) => any
}) {
  return (
    <>
      {question.answerType === 'slider' && (
        <Range
          values={question.options}
          valueKey={value}
          defaultValueKey={question.options[2].key}
          onChange={onChange}
        />
      )}
    </>
  )
}