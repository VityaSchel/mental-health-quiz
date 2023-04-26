import React from 'react'
import { FirstSection } from '@/widgets/quiz-results/first-section'
import { StateIndicatorWidget } from '@/widgets/quiz-results/state-indicator'
import { ResultPageWrapper } from '@/widgets/quiz-results/result-page-wrapper'
import { useRouter } from 'next/router'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'
import { JSONParse } from '@/shared/utils/safe-json-parse'

// @ts-expect-error It will not render until filled
export const CVResultContext = React.createContext<CvBasedQuestionnaireResponse>()

export default function Result() {
  const [cv, setCV] = React.useState<CvBasedQuestionnaireResponse>()
  const router = useRouter()

  React.useEffect(() => {
    if(process.env.NODE_ENV === 'development') {
      setCV({ affiliation: 50, anxiety: 59, depression: 90, level_mental_health: 'critical', stress: 100, uncertainty: 95 })
      return
    }

    const cv = JSONParse(router.query.cv)
    if(!cv) {
      router.replace('/quiz/1')
      return
    } else {
      setCV(cv as CvBasedQuestionnaireResponse)
    }
  }, [router.query])

  if(!cv) return <></>

  return (
    <CVResultContext.Provider value={cv}>
      <ResultPageWrapper>
        <FirstSection />
        <StateIndicatorWidget />
      </ResultPageWrapper>
    </CVResultContext.Provider>
  )
}