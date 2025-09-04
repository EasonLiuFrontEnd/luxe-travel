import { useQuery } from '@tanstack/react-query'
import apiClient from '../client'
import { TBanners, TBannersResponse, TUseHomeQueryResult } from '../type'

const fetchBanners = async (): Promise<TBanners[]> => {
  const response = await apiClient.get<TBannersResponse>('/api/admin/banners')
  return response?.data?.rows || []
}

export const bannersApiMock: TBannersResponse = {
  status: true,
  message: '成功取得 Banner 列表',
  rows: [
    {
      id: '68b054a9564da72a7ab17540',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/DiR2D8V-sunMjB07f3qwKvCB6aFXVZTLlVMtfk.jpeg',
      title: '歐洲自由行精緻首選',
      subtitle: '典藏旅遊30年經驗團隊服務為您客製化旅程，典藏精彩回憶',
      linkText: '即刻預約·輕鬆啟程',
      linkUrl: 'https://luxetravel.com.tw/',
      order: 0,
      createdAt: '2025-08-28T13:07:53.138Z',
      updatedAt: '2025-09-02T13:27:44.604Z',
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 1,
    pageCount: 1,
  },
}

export const useBanners = (): TUseHomeQueryResult<
  TBanners[],
  TBannersResponse
> => {
  const query = useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
    staleTime: 15 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  return { query, mock: bannersApiMock }
}
