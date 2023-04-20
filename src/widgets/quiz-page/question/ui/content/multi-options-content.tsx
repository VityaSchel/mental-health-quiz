import { MultiSelect, MultiSelectOption } from '@/shared/ui/multi-select'
import { quizQuestion } from '@/widgets/quiz-page/question/model/questions'

export default function MultiOptionsContent({ question, onChange }: {
  question: quizQuestion,
  onChange: (values: string[]) => any
}) {
  return (<MultiSelect onChange={onChange}>
    {question.answerType === 'multi_options' && 
    question.options.map(option => (
      <MultiSelectOption
        key={option.key}
        answerKey={option.key}
        icon={option.icon}
        label={option.label}
      />
    ))}
  </MultiSelect>)
}