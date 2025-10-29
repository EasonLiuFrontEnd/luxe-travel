import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import { TAdvantages, TApiResponse } from '../type'

const fetchAdvantagesData = async (): Promise<TAdvantages[]> => {
  const response = await apiClient.get<{ rows: TAdvantages[] }>(
    '/api/admin/advantages',
  )
  return response?.data?.rows || []
}

export const useAdvantages = () => {
  const query = useQuery<
    TAdvantages[],
    AxiosError<TApiResponse<TAdvantages[]>>
  >({
    queryKey: ['advantages'],
    queryFn: fetchAdvantagesData,
  })

  return { query }
}
