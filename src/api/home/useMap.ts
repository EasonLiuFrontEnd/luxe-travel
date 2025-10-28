import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import { TApiResponse } from '../type'

type TCountry = {
  id: string
  name: string
  nameZh: string
  code: string
  createdAt: string
  updatedAt: string
}

type TArticle = {
  id: string
  title: string
  subtitle: string
  linkUrl: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  countries: TCountry[]
}

type TArticleResponse = TApiResponse<TArticle>

type TUseMapQueryResult = {
  query: ReturnType<
    typeof useQuery<TArticle[], AxiosError<TApiResponse<TArticle[]>>>
  >
  mock: TArticleResponse
}

const fetchMapData = async (): Promise<TArticle[]> => {
  const response = await apiClient.get<TArticleResponse>('/api/admin/article')
  return response?.data?.rows || []
}

export const mapApiMock: TArticleResponse = {
  status: true,
  message: '成功取得全部 Article 清單',
  rows: [
    {
      id: '68f0c22d0173c26a3e44023e',
      title: '航向伊比利亞',
      subtitle: '葡萄牙',
      linkUrl:
        'https://www.luxetravel.com.tw/TripIntroduction.aspx?TripNo=T20250124000201',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/P59sSzL-iaA3gB35qKa701inNTBWRlPG5M539H.jpeg',
      createdAt: '2025-10-16T10:00:13.916Z',
      updatedAt: '2025-10-16T10:00:13.916Z',
      countries: [
        {
          id: '68b6a2436fb65c979f13833b',
          name: 'Portugal',
          nameZh: '葡萄牙',
          code: 'PT',
          createdAt: '2025-09-02T07:52:35.031Z',
          updatedAt: '2025-09-02T07:52:35.031Z',
        },
      ],
    },
    {
      id: '68f0c1e70173c26a3e44023c',
      title: '歐洲自由行線上講座',
      subtitle: 'PON哥講座',
      linkUrl:
        'https://www.youtube.com/playlist?list=PLRVH5TZdmfQAGk1m0uJEQz9kVyB9ur8_h',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/8B95Ttq-qEbhA6Nx0PVi5k2ShzhoOYR87hb4lD.jpeg',
      createdAt: '2025-10-16T09:59:03.810Z',
      updatedAt: '2025-10-16T09:59:03.810Z',
      countries: [
        {
          id: '68b69e2e6fb65c979f1382ea',
          name: 'Germany',
          nameZh: '德國',
          code: 'DE',
          createdAt: '2025-09-02T07:35:09.936Z',
          updatedAt: '2025-09-02T07:35:09.936Z',
        },
      ],
    },
    {
      id: '68f0c10e0173c26a3e44023a',
      title: '歐洲旅遊推薦',
      subtitle: '義大利',
      linkUrl: 'https://www.luxetravel.com.tw/euro-backpack?page=1&no=2#result',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/3G8GvZ2-W0XCK8BChBWIl2tOSnU0ZCQyR6lL41.jpeg',
      createdAt: '2025-10-16T09:55:26.173Z',
      updatedAt: '2025-10-16T09:55:26.173Z',
      countries: [
        {
          id: '68b6a22a6fb65c979f138335',
          name: 'Italy',
          nameZh: '義大利',
          code: 'IT',
          createdAt: '2025-09-02T07:52:10.334Z',
          updatedAt: '2025-09-02T07:52:10.334Z',
        },
      ],
    },
    {
      id: '68ecf225e3b66e01493fe515',
      title: '歐洲旅遊推薦',
      subtitle: '法國亞爾Arles',
      linkUrl: 'https://www.luxetravel.com.tw/euro-backpack?page=1&no=3#result',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/TFyZ6E4-E4b3ygsh9NmE0ektoqJR8Gg1r4ZocL.jpeg',
      createdAt: '2025-10-13T12:35:49.404Z',
      updatedAt: '2025-10-16T09:54:29.344Z',
      countries: [
        {
          id: '68b055bd564da72a7ab17542',
          name: 'France',
          nameZh: '法國',
          code: 'FR',
          createdAt: '2025-08-28T13:12:29.537Z',
          updatedAt: '2025-08-28T13:12:29.537Z',
        },
      ],
    },
    {
      id: '68c27a18c93a45993dd350b0',
      title: '極光旅遊攻略',
      subtitle: '芬蘭',
      linkUrl: 'https://www.luxetravel.com.tw/euro-backpack?page=1&no=8#result',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/u97XhZ2-EvnGIGN9K0H7RuHJCXoiLXJWNYEYae.jpeg',
      createdAt: '2025-09-11T07:28:24.564Z',
      updatedAt: '2025-10-16T09:53:12.800Z',
      countries: [
        {
          id: '68c0f1716286fa3817533803',
          name: 'Finland',
          nameZh: '芬蘭',
          code: 'FI',
          createdAt: '2025-09-10T03:33:05.830Z',
          updatedAt: '2025-09-10T03:33:05.830Z',
        },
      ],
    },
  ],
  pagination: null,
}

export const useMap = (): TUseMapQueryResult => {
  const query = useQuery<TArticle[], AxiosError<TApiResponse<TArticle[]>>>({
    queryKey: ['map'],
    queryFn: fetchMapData,
    retry: (failureCount, error) => {
      if (
        error.response?.status &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return false
      }
      return failureCount < 2
    },
    retryDelay: 1000,
  })

  return { query, mock: mapApiMock }
}
