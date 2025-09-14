import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import apiClient from '../client'
import { TApiResponse, TUseHomeQueryResult } from '../type'

type TFeedBack = {
  id: string
  mode: 'REAL' | 'VIRTUAL'
  nickname: string
  stars: number
  content: string
  linkUrl: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export const feedbacksApiMock: TApiResponse<TFeedBack> = {
  status: true,
  message: '成功取得所有旅客回饋 (Mock)',
  data: [
    {
      id: '68c2718aea9b6c997ca4e34d',
      mode: 'REAL',
      nickname: 'Janice Tseng (Mock)',
      stars: 5,
      content:
        '旅行社很有彈性的客製化，提供的操作手冊清楚仔細（行前會議也解說清楚明瞭），每個行程串接順暢，預訂票務很方便，推薦飯店吃好住好。讓初次自由行體驗的我們，都輕鬆安全開心的達成～',
      linkUrl: null,
      order: 0,
      createdAt: '2025-09-11T06:51:53.052Z',
      updatedAt: '2025-09-11T06:51:53.052Z',
    },
    {
      id: '68c271c3ea9b6c997ca4e34e',
      mode: 'REAL',
      nickname: 'Ching H. (Mock)',
      stars: 5,
      content:
        '在選擇蜜月旅行時，看了好多旅行團的行程總是覺得差強人意，更無法接受繳了高額的費用卻可能無法保證期待的景觀列車可以搭乘，但也不希望完全都是自己處理行程的一切，畢竟是第一次要去歐洲，擔心自己缺乏經驗安排的不夠完善等等。',
      linkUrl: null,
      order: 1,
      createdAt: '2025-09-11T06:52:50.562Z',
      updatedAt: '2025-09-11T06:52:50.562Z',
    },
  ],
}

const fetchFeedBacks = async (): Promise<TFeedBack[]> => {
  const response = await apiClient.get<TApiResponse<TFeedBack>>(
    '/api/admin/testimonials',
  )
  return response.data.data || []
}

export const useFeedBack = (): TUseHomeQueryResult<
  TFeedBack[],
  TApiResponse<TFeedBack>
> => {
  const query = useQuery<TFeedBack[], AxiosError<TApiResponse<TFeedBack[]>>>({
    queryKey: ['feedbacks'],
    queryFn: fetchFeedBacks,
    staleTime: 15 * 60 * 1000,
  })

  return { query, mock: feedbacksApiMock }
}
