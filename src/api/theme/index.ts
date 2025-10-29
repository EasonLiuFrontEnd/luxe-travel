import { useQuery, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type {
  TProduct,
  TProductSearchParams,
  TRegionData,
  TProductSearchResponse,
} from '../free-tours'
import type { TApiResponse } from '../type'

const fetchThemeToursSearch = async (
  params: TProductSearchParams,
): Promise<TProduct[]> => {
  const searchParams = new URLSearchParams()

  if (params.category) searchParams.append('category', params.category)
  if (params.page !== undefined)
    searchParams.append('page', params.page.toString())
  if (params.limit !== undefined)
    searchParams.append('limit', params.limit.toString())
  if (params.sort) searchParams.append('sort', params.sort)
  if (params.order) searchParams.append('order', params.order)

  const response = await apiClient.get<TProductSearchResponse>(
    `/api/products/search?${searchParams.toString()}`,
  )

  return response.data.data
}

export const useThemeToursSearch = () => {
  const mutation = useMutation<
    TProduct[],
    AxiosError<TApiResponse<TProduct[]>>,
    TProductSearchParams
  >({
    mutationFn: fetchThemeToursSearch,
  })

  return { mutation }
}

export const useThemeToursCountries = () => {
  const query = useQuery<
    TRegionData[],
    AxiosError<TApiResponse<TRegionData[]>>
  >({
    queryKey: ['theme-tours-countries'],
    queryFn: async () => {
      return []
    },
  })

  return { query }
}
