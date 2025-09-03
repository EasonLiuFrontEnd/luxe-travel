import { useQuery, UseQueryResult } from '@tanstack/react-query'
import apiClient from '../client'
import { TCountryShowcase, TCountryShowcasesResponse } from '../type'

const fetchCountryShowcases = async (): Promise<TCountryShowcase[]> => {
  const response = await apiClient.get<TCountryShowcasesResponse>(
    '/api/admin/country-showcases',
  )
  return response.data.rows || []
}

export const useCountryShowcases = (): UseQueryResult<
  TCountryShowcase[],
  Error
> => {
  return useQuery({
    queryKey: ['countryShowcases'],
    queryFn: fetchCountryShowcases,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
