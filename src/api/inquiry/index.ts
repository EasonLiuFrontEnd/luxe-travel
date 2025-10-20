import apiClient from '../client'
import type { TApiResponse } from '../type'

export type TInquiryRequest = {
  contactName: string
  gender: string
  phone: string
  lineId?: string
  contactMethod: string[]
  contactTime: string
  source: string
  budget?: string
  regions?: string[]
  adults?: number
  children?: number
  days?: number
  departDate?: string
  wishlist?: string
  note?: string
  tourProgram?: string
}

export const submitInquiry = async (
  payload: TInquiryRequest,
): Promise<TApiResponse<unknown>> => {
  const response = await apiClient.post<TApiResponse<unknown>>(
    '/api/admin/home-inquiry',
    payload,
  )
  return response.data
}
