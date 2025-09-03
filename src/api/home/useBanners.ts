import { useQuery, UseQueryResult } from '@tanstack/react-query'
import apiClient from '../client'
import { TBanner, TBannersResponse } from '../type'

const fetchBanners = async (): Promise<TBanner[]> => {
  const response = await apiClient.get<TBannersResponse>('/api/admin/banners')
  return response.data.rows || []
}

export const useBanners = (): UseQueryResult<TBanner[], Error> => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
