import React from 'react'
import QuizPageWrapper from '@/widgets/quiz-page/wrapper'
import QuestionContent from '@/widgets/quiz-page/question/ui/content'
import QuestionDecoration from '@/widgets/quiz-page/question/ui/decoration'

export default function Quiz() {
  const [questionNumber, setQuestionNumber] = React.useState(1)

  return (
    <QuizPageWrapper>
      <QuestionContent 
        questionNumber={questionNumber}
      />
      <QuestionDecoration
        questionNumber={questionNumber}
      />
    </QuizPageWrapper>
  )
}
