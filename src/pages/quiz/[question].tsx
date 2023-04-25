import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { quizQuestions } from '@/widgets/quiz-page/question/model/questions'
import QuizPageWrapper from '@/widgets/quiz-page/wrapper'
import QuestionContent from '@/widgets/quiz-page/question/ui/content'
import QuestionDecoration from '@/widgets/quiz-page/question/ui/decoration'
import LoadingResults from '@/widgets/loading-results'
import { getCv } from '@/shared/api'

const questionsLength = quizQuestions.length
export default function Quiz() {
  const router = useRouter()
  const [loadingResults, setLoadingResults] = React.useState(false)

  const questionNumber = Number(router.query.question)
  const lastQuestion = questionNumber === questionsLength
  const nextPage = lastQuestion ? '/quiz/result' : `/quiz/${questionNumber + 1}`

  React.useEffect(() => {
    router.prefetch(nextPage)
  }, [router, nextPage])
  
  const handleSubmit = async (answerKey: string | string[]) => {
    if (lastQuestion) {
      setLoadingResults(true)
      getCv()
    } else {
      router.push(nextPage)
    }
  }

  return (
    <QuizPageWrapper>
      {!loadingResults && (
        <>
          <QuestionContent 
            questionNumber={questionNumber}
            onSubmit={handleSubmit}
            onGoBack={() => router.back()}
          />
          <QuestionDecoration
            questionNumber={questionNumber}
          />
        </>
      )}
      <LoadingResults visible={loadingResults} />
    </QuizPageWrapper>
  )
}

export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<Record<string, never>> {
  const question = Number(context.params?.question)
  if (!Number.isSafeInteger(question) || question < 1 || question > questionsLength) {
    return {
      notFound: true
    }
  } else {
    return {
      props: {}
    }
  }
}