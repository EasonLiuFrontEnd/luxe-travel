import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type { TApiResponse } from '../type'

type TBanner = {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  linkText: string
  linkUrl: string
  order: number
  createdAt: string
  updatedAt: string
  titleLine1: string
  titleLine2: string
  subtitleLine1: string
  subtitleLine2: string
}

const fetchBannersData = async (): Promise<TBanner[]> => {
  const response = await apiClient.get<{ rows: TBanner[] }>(
    '/api/admin/banners',
  )
  return response?.data?.rows || []
}

export const useBanners = () => {
  const query = useQuery<TBanner[], AxiosError<TApiResponse<TBanner[]>>>({
    queryKey: ['banners'],
    queryFn: fetchBannersData,
  })

  return { query }
}
