import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import {
  TBanners,
  TBannersResponse,
  TUseHomeQueryResult,
  TApiResponse,
} from '../type'

const fetchBanners = async (): Promise<TBanners[]> => {
  const response = await apiClient.get<TBannersResponse>('/api/admin/banners')
  return response?.data?.rows || []
}

export const bannersApiMock: TBannersResponse = {
  rows: [
    {
      id: '68b054a9564da72a7ab17540',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/aqqsaUK-hnslNFMOa6DmvTupkiNHDUVmhQWARo.jpeg',
      title: '歐洲自由行精緻首選',
      subtitle: '典藏旅遊30年經驗團隊服務為您客製化旅程，典藏精彩回憶',
      linkText: '即刻預約·輕鬆啟程',
      linkUrl: 'https://www.luxetravel.com.tw/',
      order: 0,
      createdAt: '2025-08-28T13:07:53.138Z',
      updatedAt: '2025-09-04T10:25:33.374Z',
      titleLine1: '歐洲自由行',
      titleLine2: '精緻首選',
      subtitleLine1: '典藏旅遊30年經驗團隊服',
      subtitleLine2: '務為您客製化旅程，典藏精彩回憶',
    },
  ],
  pagination: { page: 1, pageSize: 10, total: 1, pageCount: 1 },
}

export const useBanners = (): TUseHomeQueryResult<
  TBanners[],
  TBannersResponse
> => {
  const query = useQuery<TBanners[], AxiosError<TApiResponse<TBanners[]>>>({
    queryKey: ['banners'],
    queryFn: fetchBanners,
  })

  return { query, mock: bannersApiMock }
}
