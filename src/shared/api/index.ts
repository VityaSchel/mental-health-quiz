import { CvBasedQuestionnaireBody, CvBasedQuestionnaireResponse, ErrorResponse } from '@/shared/api/ApiDefinitions'

export async function getCv(inputs: CvBasedQuestionnaireBody): Promise<CvBasedQuestionnaireResponse> {
  const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cv_based_questionnaire`, {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: { 'Content-Type': 'application/json' }
  })
  if(request.status === 200) {
    const response = await request.json() as CvBasedQuestionnaireResponse
    return response
  } else {
    const response = await request.json() as ErrorResponse
    throw new Error(response.message)
  } 
}