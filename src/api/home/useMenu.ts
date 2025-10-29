import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import { TMenuItem, TApiResponse } from '../type'

const fetchMenu = async (): Promise<TMenuItem[]> => {
  const response = await apiClient.get<{ data: TMenuItem[] }>('/api/admin/menu')
  return response?.data?.data || []
}

export const useMenu = () => {
  const query = useQuery<TMenuItem[], AxiosError<TApiResponse<TMenuItem[]>>>({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  })

  return { query }
}
