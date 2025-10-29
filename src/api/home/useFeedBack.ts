import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type { TApiResponse } from '../type'

type TFeedBack = {
  id: string
  mode: 'REAL' | 'SOCIAL'
  nickname?: string
  content: string
  linkUrl?: string
  order: number
  stars?: number
  imageUrl?: string
  color?: {
    bg: string
    text: string
  }
  createdAt: string
  updatedAt: string
}

const fetchFeedBack = async (): Promise<TFeedBack[]> => {
  const response = await apiClient.get<{ rows: TFeedBack[] }>(
    '/api/admin/testimonials',
  )
  return response?.data?.rows || []
}

export const useFeedBack = () => {
  const query = useQuery<TFeedBack[], AxiosError<TApiResponse<TFeedBack[]>>>({
    queryKey: ['feedback'],
    queryFn: fetchFeedBack,
  })

  return { query }
}
