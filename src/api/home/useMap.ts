import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type { TApiResponse } from '../type'

type TCountry = {
  code: string
  nameZh: string
  nameEn: string
}

type TMapArticle = {
  id: string
  title: string
  subtitle: string
  content: string
  imageUrl: string
  linkUrl: string
  countries?: TCountry[]
  createdAt: string
  updatedAt: string
}

const fetchMapData = async (): Promise<TMapArticle[]> => {
  const response = await apiClient.get<{ rows: TMapArticle[] }>(
    '/api/admin/article',
  )
  return response?.data?.rows || []
}

export const useMap = () => {
  const query = useQuery<
    TMapArticle[],
    AxiosError<TApiResponse<TMapArticle[]>>
  >({
    queryKey: ['map'],
    queryFn: fetchMapData,
  })

  return { query }
}
