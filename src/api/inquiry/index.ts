import apiClient from '../client'
import type { TApiResponse } from '../type'

export type TInquiryRequest = {
  contactName: string
  gender?: string
  phone: string
  lineId?: string
  contactMethod?: string[]
  contactTime?: string
  source?: string
  budget?: string
  regions?: string[]
  adults?: number
  children?: number
  days?: number
  departDate?: string
  wishlist?: string
  note?: string
}

export type TTravelInquiryRequest = {
  contactName: string
  gender?: string
  phone: string
  lineId?: string
  travelType: string
  contactMethod?: string[]
  contactTime?: string
  source?: string
  note?: string
  adults?: number
  children?: number
  itinerary?: string
  departDate?: string
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

export const submitTravelInquiry = async (
  payload: TTravelInquiryRequest,
): Promise<TApiResponse<unknown>> => {
  const response = await apiClient.post<TApiResponse<unknown>>(
    '/api/admin/travel-inquiry',
    payload,
  )
  return response.data
}

export const getTravelTypeLabel = (travelType: string): string => {
  const mapping: Record<string, string> = {
    'deluxe-group': '精緻團體行',
    theme: '主題旅遊',
    'mitsui-cruise': '三井郵輪',
  }
  return mapping[travelType] || travelType
}

const homeInquiryApiMock: TApiResponse<unknown> = {
  status: true,
  message: '家庭旅遊諮詢提交成功',
  data: [],
}

const travelInquiryApiMock: TApiResponse<unknown> = {
  status: true,
  message: '團體旅遊諮詢提交成功',
  data: [],
}
