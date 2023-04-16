import React from 'react'
import QuizPageWrapper from '@/widgets/quiz-page/wrapper'
import QuestionContent from '@/widgets/quiz-page/question/ui/content'

export default function Quiz() {
  const [questionNumber, setQuestionNumber] = React.useState(1)

  return (
    <QuizPageWrapper>
      <QuestionContent 
        questionNumber={questionNumber}
      />
      {/* <QuestionDecoration 
        questionNumber={questionNumber}
      /> */}
    </QuizPageWrapper>
  )
}
