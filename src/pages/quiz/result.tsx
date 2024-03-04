import React from 'react'
import { FirstSection } from '@/widgets/quiz-results/first-section'
import { StateIndicatorWidget } from '@/widgets/quiz-results/state-indicator'
import { ResultPageWrapper } from '@/widgets/quiz-results/result-page-wrapper'
import { PlanContents } from '@/widgets/quiz-results/plan-contents'
import { Reviews } from '@/widgets/quiz-results/reviews'
import { useRouter } from 'next/router'
import { CvBasedQuestionnaireResponse, PricesResponse } from '@/shared/api/ApiDefinitions'
import { JSONParse } from '@/shared/utils/safe-json-parse'
import Script from 'next/script'
import { LastSection } from '@/widgets/quiz-results/last-section'
import Head from 'next/head'

// @ts-expect-error It will not render until filled
export const CVResultContext = React.createContext<CvBasedQuestionnaireResponse>()
export const PaymentDetailsContext = React.createContext<PricesResponse | null>(null)

export default function Result() {
  const [cv, setCV] = React.useState<CvBasedQuestionnaireResponse>()
  const [paymentDetails, setPaymentDetails] = React.useState<PricesResponse | null>(null)
  const router = useRouter()

  React.useEffect(() => {
    const cvResultsCached = window.localStorage.getItem('cv_results')
    const cv = JSONParse(router.query.cv ?? cvResultsCached)
    if(!cv) {
      router.replace('/quiz/1')
      return
    } else {
      setCV(cv as CvBasedQuestionnaireResponse)
    }
  }, [router.query])

  React.useEffect(() => {
    getPrices()
  }, [])

  const getPrices = async () => {
    // const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/prices')
    // const response = await request.json() as PricesResponse
    const response: PricesResponse = {
      amount: 699,
      amountWithoutDiscount: 1999,
      firstCheckbox: 'Я согласен на обработку персональных данных',
      secondCheckbox: 'Я согласен с условиями оферты',
    }
    setPaymentDetails(response)
  }

  if(!cv) return <></>

  return (
    <>
      <CVResultContext.Provider value={cv}>
        <PaymentDetailsContext.Provider value={paymentDetails}>
          <ResultPageWrapper>
            <FirstSection />
            <StateIndicatorWidget />
            <PlanContents />
            <Reviews />
            <LastSection />
          </ResultPageWrapper>
        </PaymentDetailsContext.Provider>
      </CVResultContext.Provider>
      <Script src='https://widget.cloudpayments.ru/bundles/cloudpayments.js' />
      <Head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src='https://vk.com/js/api/openapi.js?169',t.onload=function(){VK.Retargeting.Init("${process.env.NEXT_PUBLIC_VK_METRIC_RESULT ?? ''}"), VK.Retargeting.Hit()},document.head.appendChild(t)}();` }}></script><noscript dangerouslySetInnerHTML={{ __html: `<img src="https://vk.com/rtrg?p=${process.env.NEXT_PUBLIC_VK_METRIC_RESULT ?? ''}" style="position:fixed; left:-999px;" alt="" />`}}></noscript>
      </Head>
    </>
  )
}