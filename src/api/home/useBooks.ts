import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import { TBooks, TApiResponse } from '../type'

const fetchBooksData = async (): Promise<TBooks[]> => {
  const response = await apiClient.get<{ rows: TBooks[] }>(
    '/api/admin/country-showcases',
  )
  return response?.data?.rows || []
}

export const useBooks = () => {
  const query = useQuery<TBooks[], AxiosError<TApiResponse<TBooks[]>>>({
    queryKey: ['books'],
    queryFn: fetchBooksData,
  })

  return { query }
}
