import { useQuery } from '@tanstack/react-query'
import apiClient from '../client'
import { TConcern, TConcernsResponse, TUseHomeQueryResult } from '../type'

const fetchConcerns = async (): Promise<TConcern[]> => {
  const response = await apiClient.get<TConcernsResponse>('/api/admin/concerns')
  return response?.data?.rows || []
}

export const concernsApiMock: TConcernsResponse = {
  status: true,
  message: '成功取得 Concerns 列表',
  rows: [
    {
      id: '68b0532b564da72a7ab17531',
      moduleId: '68b04b1aeb0b7404083d887b',
      number: '01',
      content: '交通路線不順 票券選擇困難',
      order: 1,
      createdAt: '2025-08-28T13:01:31.906Z',
      updatedAt: '2025-08-28T13:01:31.906Z',
    },
    {
      id: '68b05339564da72a7ab17532',
      moduleId: '68b04b1aeb0b7404083d887b',
      number: '02',
      content: '跨國移動對各國 入境規範不熟悉',
      order: 2,
      createdAt: '2025-08-28T13:01:45.668Z',
      updatedAt: '2025-08-28T13:01:45.668Z',
    },
    {
      id: '68b05340564da72a7ab17533',
      moduleId: '68b04b1aeb0b7404083d887b',
      number: '03',
      content: '非英語系國家多 無法順利溝通',
      order: 3,
      createdAt: '2025-08-28T13:01:52.926Z',
      updatedAt: '2025-08-28T13:01:52.926Z',
    },
    {
      id: '68b05348564da72a7ab17534',
      moduleId: '68b04b1aeb0b7404083d887b',
      number: '04',
      content: '不了解治安較佳 的住宿區域首選',
      order: 4,
      createdAt: '2025-08-28T13:02:00.408Z',
      updatedAt: '2025-08-28T13:02:00.408Z',
    },
    {
      id: '68b05350564da72a7ab17535',
      moduleId: '68b04b1aeb0b7404083d887b',
      number: '05',
      content: '預算難以掌控 各國物價變動大',
      order: 5,
      createdAt: '2025-08-28T13:02:08.533Z',
      updatedAt: '2025-08-28T13:02:08.533Z',
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 5,
    pageCount: 1,
  },
}

export const useConcerns = (): TUseHomeQueryResult<
  TConcern[],
  TConcernsResponse
> => {
  const query = useQuery({
    queryKey: ['concerns'],
    queryFn: fetchConcerns,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  return { query, mock: concernsApiMock }
}
