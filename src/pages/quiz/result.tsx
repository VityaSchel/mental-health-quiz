import React from 'react'
import { FirstSection } from '@/widgets/quiz-results/first-section'
import { useRouter } from 'next/router'
import { CvBasedQuestionnaireResponse } from '@/shared/api/ApiDefinitions'
import { JSONParse } from '@/shared/utils/safe-json-parse'

// @ts-expect-error It will not render until filled
const CVResultContext = React.createContext<CvBasedQuestionnaireResponse>()

export default function Result() {
  const [cv, setCV] = React.useState<CvBasedQuestionnaireResponse>()
  const router = useRouter()

  React.useEffect(() => {
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