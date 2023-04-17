import React from 'react'
import QuizPageWrapper from '@/widgets/quiz-page/wrapper'
import QuestionContent from '@/widgets/quiz-page/question/ui/content'
import QuestionDecoration from '@/widgets/quiz-page/question/ui/decoration'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export default function Quiz() {
  const router = useRouter()
  const questionNumber = Number(router.query.question)

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

export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<Record<string, never>> {
  const question = Number(context.params?.question)
  if (!Number.isSafeInteger(question) || question < 1 || question > 8) {
    return {
      notFound: true
    }
  } else {
    return {
      props: {}
    }
  }
}