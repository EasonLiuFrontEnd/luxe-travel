import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import {
  TBooks,
  TBooksResponse,
  TUseHomeQueryResult,
  TApiResponse,
} from '../type'

const fetchBooksData = async (): Promise<TBooks[]> => {
  const response = await apiClient.get<TBooksResponse>(
    '/api/admin/country-showcases',
  )
  return response?.data?.rows || []
}

export const booksApiMock: TBooksResponse = {
  status: true,
  message: '成功取得書本列表',
  rows: [
    {
      id: '68b05373564da72a7ab17536',
      imageUrl: '/home/itinerary/hr-croatia/pattern.svg',
      title: '克羅埃西亞',
      subtitle: 'Republic Of Croatia',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 1,
      createdAt: '2025-08-28T13:02:43.217Z',
      updatedAt: '2025-08-28T13:02:43.217Z',
    },
    {
      id: '68b05382564da72a7ab17537',
      imageUrl: '/home/itinerary/cz-czech/pattern.svg',
      title: '捷克',
      subtitle: 'Czech Republic',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 2,
      createdAt: '2025-08-28T13:02:58.975Z',
      updatedAt: '2025-08-28T13:02:58.975Z',
    },
    {
      id: '68b05391564da72a7ab17538',
      imageUrl: '/home/itinerary/pt-portugal/pattern.svg',
      title: '葡萄牙',
      subtitle: 'Portugal',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 3,
      createdAt: '2025-08-28T13:03:13.127Z',
      updatedAt: '2025-08-28T13:03:13.127Z',
    },
    {
      id: '68b0539e564da72a7ab17539',
      imageUrl: '/home/itinerary/ch-switzerland/pattern.svg',
      title: '瑞士',
      subtitle: 'Switzerland',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 4,
      createdAt: '2025-08-28T13:03:26.187Z',
      updatedAt: '2025-08-28T13:03:26.187Z',
    },
    {
      id: '68b053ad564da72a7ab1753a',
      imageUrl: '/home/itinerary/ie-ireland/pattern.svg',
      title: '愛爾蘭',
      subtitle: 'Ireland',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 5,
      createdAt: '2025-08-28T13:03:41.930Z',
      updatedAt: '2025-08-28T13:03:41.930Z',
    },
    {
      id: '68b053ba564da72a7ab1753b',
      imageUrl: '/home/itinerary/de-germany/pattern.svg',
      title: '德國',
      subtitle: 'Germany',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 6,
      createdAt: '2025-08-28T13:03:54.312Z',
      updatedAt: '2025-08-28T13:03:54.312Z',
    },
    {
      id: '68b053c6564da72a7ab1753c',
      imageUrl: '/home/itinerary/hu-hungary/pattern.svg',
      title: '匈牙利',
      subtitle: 'Hungary',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 7,
      createdAt: '2025-08-28T13:04:06.694Z',
      updatedAt: '2025-08-28T13:04:06.694Z',
    },
    {
      id: '68b053d4564da72a7ab1753d',
      imageUrl: '/home/itinerary/es-spain/pattern.svg',
      title: '西班牙',
      subtitle: 'Spain',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 8,
      createdAt: '2025-08-28T13:04:20.726Z',
      updatedAt: '2025-08-28T13:04:20.726Z',
    },
    {
      id: '68b053e0564da72a7ab1753e',
      imageUrl: '/home/itinerary/gr-greece/pattern.svg',
      title: '希臘',
      subtitle: 'Greece',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 9,
      createdAt: '2025-08-28T13:04:32.030Z',
      updatedAt: '2025-08-28T13:04:32.030Z',
    },
    {
      id: '68b053f0564da72a7ab1753f',
      imageUrl: '/home/itinerary/be-belgium/pattern.svg',
      title: '比利時',
      subtitle: 'Belgium',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 10,
      createdAt: '2025-08-28T13:04:48.257Z',
      updatedAt: '2025-08-28T13:04:48.257Z',
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 10,
    pageCount: 1,
  },
}

export const useBooks = (): TUseHomeQueryResult<TBooks[], TBooksResponse> => {
  const query = useQuery<TBooks[], AxiosError<TApiResponse<TBooks[]>>>({
    queryKey: ['books'],
    queryFn: fetchBooksData,
  })

  return { query, mock: booksApiMock }
}
