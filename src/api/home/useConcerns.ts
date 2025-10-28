import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import { TConcern, TApiResponse } from '../type'

const fetchConcerns = async (): Promise<TConcern[]> => {
  const response = await apiClient.get<{ rows: TConcern[] }>(
    '/api/admin/concerns',
  )
  return response?.data?.rows || []
}

export const useConcerns = () => {
  const query = useQuery<TConcern[], AxiosError<TApiResponse<TConcern[]>>>({
    queryKey: ['concerns'],
    queryFn: fetchConcerns,
  })

  return { query }
}
