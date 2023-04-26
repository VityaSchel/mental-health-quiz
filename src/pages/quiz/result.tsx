import React from 'react'
import { FirstSection } from '@/widgets/quiz-results/first-section'
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
      setCV({ affiliation: 5, anxiety: 5, depression: 5, level_mental_health: 'critical', stress: 5, uncertainty: 5 })
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
      <FirstSection />
    </CVResultContext.Provider>
  )
}