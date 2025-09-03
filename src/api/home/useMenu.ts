import { useQuery, UseQueryResult } from '@tanstack/react-query'
import apiClient from '../client'
import { TMenuItem, TMenuResponse } from '../type'

const fetchMenu = async (): Promise<TMenuItem[]> => {
  const response = await apiClient.get<TMenuResponse>('/api/admin/menu')
  return response.data.data || []
}

export const useMenu = (): UseQueryResult<TMenuItem[], Error> => {
  return useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
