import { useQuery, UseQueryResult } from '@tanstack/react-query'
import apiClient from '../client'
import { TConcern, TConcernsResponse } from '../type'

const fetchConcerns = async (): Promise<TConcern[]> => {
  const response = await apiClient.get<TConcernsResponse>('/api/admin/concerns')
  return response.data.rows || []
}

export const useConcerns = (): UseQueryResult<TConcern[], Error> => {
  return useQuery({
    queryKey: ['concerns'],
    queryFn: fetchConcerns,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
