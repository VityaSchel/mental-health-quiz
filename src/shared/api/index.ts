import { CvBasedQuestionnaireBody, CvBasedQuestionnaireResponse, ErrorResponse } from '@/shared/api/ApiDefinitions'

export async function getCv(inputs: CvBasedQuestionnaireBody): Promise<CvBasedQuestionnaireResponse> {
  // const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cv_based_questionnaire`, {
  //   method: 'POST',
  //   body: JSON.stringify(inputs),
  //   headers: { 'Content-Type': 'application/json' }
  // })
  // if(request.status === 200) {
  //   const response = await request.json() as CvBasedQuestionnaireResponse
  //   return response
  // } else {
  //   const response = await request.json() as ErrorResponse
  //   throw new Error(response.message)
  // } 
  const mentalHealthLevels = ['critical', 'low', 'alarming', 'risky', 'normal'] as const
  return { affiliation: Math.floor(Math.random() * 100), anxiety: Math.floor(Math.random() * 100), depression: Math.floor(Math.random() * 100), level_mental_health: mentalHealthLevels[Math.floor(Math.random() * 5)], stress: Math.floor(Math.random() * 100), uncertainty: Math.floor(Math.random() * 90) }
}