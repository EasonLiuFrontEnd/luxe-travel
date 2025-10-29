import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type { TTourProduct, TTourProductApiResponse } from './index'

const fetchTourProduct = async (id: string): Promise<TTourProduct> => {
  const response = await apiClient.get<TTourProductApiResponse>(
    `/api/admin/product/${id}`,
  )
  return response.data.data
}

export const useTourProduct = (id: string) => {
  return useQuery<TTourProduct, AxiosError>({
    queryKey: ['tour-product', id],
    queryFn: () => fetchTourProduct(id),
    enabled: !!id,
  })
}
