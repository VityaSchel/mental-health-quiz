import React from 'react'
import { RawHTML } from 'react-dom'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { quizQuestions } from '@/widgets/quiz-page/question/model/questions'
import QuizPageWrapper from '@/widgets/quiz-page/wrapper'
import QuestionContent from '@/widgets/quiz-page/question/ui/content'
import QuestionDecoration from '@/widgets/quiz-page/question/ui/decoration'
import LoadingResults from '@/widgets/loading-results'
import { getCv } from '@/shared/api'
import { JSONParse } from '@/shared/utils/safe-json-parse'
import { CvBasedQuestionnaireBody, CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'
import Head from 'next/head'

const questionsLength = quizQuestions.length
export default function Quiz() {
  const router = useRouter()
  const [loadingResults, setLoadingResults] = React.useState(false)

  const questionNumber = Number(router.query.question)
  const lastQuestion = questionNumber === questionsLength
  const nextPage = lastQuestion ? '/quiz/result' : `/quiz/${questionNumber + 1}`
  const formData = JSONParse<object>(router.query.data) ?? {}

  React.useEffect(() => {
    router.prefetch(nextPage)
  }, [router, nextPage])

  React.useEffect(() => {
    if (typeof window && questionNumber !== 1 && Object.entries(formData).length === 0) {
      router.replace('/quiz/1')
    }
  }, [questionNumber, router])

  const adsParameter = router.query.ads ? '?ads=' + router.query.ads : ''
  
  const handleSubmit = async (answerKey: string | string[]) => {
    const newFormData = Object.assign(formData, { [quizQuestions[questionNumber - 1].questionKey]: answerKey }) as object as CvBasedQuestionnaireBody
    if (lastQuestion) {
      setLoadingResults(true)
      const [cv] = await Promise.all([
        getCv(newFormData),
        new Promise(resolve => setTimeout(resolve, 5000)),
      ])
      const results = JSON.stringify(cv)
      window.localStorage.setItem('cv_results', results)
      router.push({ pathname: '/quiz/result', query: { cv: results, ads: router.query.ads } }, '/quiz/result' + adsParameter)
    } else {
      router.push({ 
        pathname: nextPage, 
        query: { data: JSON.stringify(newFormData), ads: router.query.ads }
      }, nextPage + adsParameter)
    }
  }

  return (
    <>
      {questionNumber === 1 && process.env.NODE_ENV === 'development' && (
        <button style={{ position: 'absolute', zIndex: 100 }} onClick={() => router.push({ pathname: '/quiz/result', query: { cv: JSON.stringify({ affiliation: 50, anxiety: 59, depression: 90, level_mental_health: 'critical', stress: 100, uncertainty: 95 } satisfies CvBasedQuestionnaireResponse) } }, '/quiz/result')}>Skip</button>
      )}
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
      <Head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("${process.env.NEXT_PUBLIC_VK_METRIC_HOMEPAGE ?? ''}"), VK.Retargeting.Hit()},document.head.appendChild(t)}();` }}></script><noscript dangerouslySetInnerHTML={{ __html: `<img src="https://vk.com/rtrg?p=${process.env.NEXT_PUBLIC_VK_METRIC_HOMEPAGE ?? ''}" style="position:fixed; left:-999px;" alt="" />` }}></noscript>
      </Head>
    </>
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