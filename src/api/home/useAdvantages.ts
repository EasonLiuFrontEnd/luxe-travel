import { useQuery, UseQueryResult } from '@tanstack/react-query'
import apiClient from '../client'
import { TAdvantage, TAdvantagesResponse } from '../type'

const fetchAdvantages = async (): Promise<TAdvantage[]> => {
  const response = await apiClient.get<TAdvantagesResponse>(
    '/api/admin/advantages',
  )
  return response.data.rows || []
}

export const useAdvantages = (): UseQueryResult<TAdvantage[], Error> => {
  return useQuery({
    queryKey: ['advantages'],
    queryFn: fetchAdvantages,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
