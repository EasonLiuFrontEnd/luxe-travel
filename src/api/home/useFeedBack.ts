import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import apiClient from '../client'
import { TApiResponse, TUseHomeQueryResult } from '../type'

type TFeedBack = {
  id: string
  mode: 'REAL' | 'VIRTUAL' | 'MARKETING'
  nickname: string | null
  stars: number | null
  content: string
  linkUrl: string | null
  imageUrl: string | null
  order: number
  createdAt: string
  updatedAt: string
  color: {
    bg: string
    text: string
  }
}

export const feedbacksApiMock: TApiResponse<TFeedBack> = {
  status: true,
  message: '成功取得所有旅客回饋（全部資料）',
  rows: [
    {
      id: '68c2718aea9b6c997ca4e34d',
      mode: 'REAL',
      nickname: 'Janice Tseng',
      stars: 5,
      content:
        '旅行社很有彈性的客製化，提供的操作手冊清楚仔細（行前會議也解說清楚明瞭），每個行程串接順暢，預訂票務很方便，推薦飯店吃好住好。讓初次自由行體驗的我們，都輕鬆安全開心的達成～',
      linkUrl: null,
      imageUrl: null,
      order: 0,
      createdAt: '2025-09-11T06:51:53.052Z',
      updatedAt: '2025-09-11T06:51:53.052Z',
      color: {
        bg: '#F87171',
        text: '#B91C1C',
      },
    },
    {
      id: '68c271c3ea9b6c997ca4e34e',
      mode: 'REAL',
      nickname: 'Ching H.',
      stars: 5,
      content:
        '在選擇蜜月旅行時，看了好多旅行團的行程總是覺得差強人意，更無法接受繳了高額的費用卻可能無法保證期待的景觀列車可以搭乘，但也不希望完全都是自己處理行程的一切，畢竟是第一次要去歐洲，擔心自己缺乏經驗安排的不夠完善等等。\n在兩方的拉扯中意外發現還有一種「半自助」的方式，因而找上典藏來幫我們客製行程、安排、準備行前的一切事項，包含住宿機票交通等，真的讓忙錄於工作的我們放心不少。\n旅遊期間有問題詢問也都能隨時獲得答覆，真的非常非常感謝Johnny與Annie這個期間的協助，讓我們可以順利完成旅程。',
      linkUrl: null,
      imageUrl: null,
      order: 1,
      createdAt: '2025-09-11T06:52:50.562Z',
      updatedAt: '2025-09-11T06:52:50.562Z',
      color: {
        bg: '#FBBF24',
        text: '#B45309',
      },
    },
    {
      id: '68c69bc65a243c8f10da1a5e',
      mode: 'MARKETING',
      nickname: null,
      stars: null,
      content: '歐洲旅遊✕精緻首選 · 醉美蔚藍海岸浪漫璀璨巴黎',
      linkUrl:
        'https://www.luxetravel.com.tw/TripIntroduction.aspx?TripNo=T20250123000200&Date=2025/09/27&type=CX',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/cqfiCYZ-k8IUMyDfSJxz0qbqG4hIACU2CjowyY.jpeg',
      order: 2,
      createdAt: '2025-09-14T10:41:10.833Z',
      updatedAt: '2025-09-14T10:41:57.211Z',
      color: {
        bg: '#34D399',
        text: '#065F46',
      },
    },
    {
      id: '68c69c1c5a243c8f10da1a5f',
      mode: 'REAL',
      nickname: 'C C',
      stars: null,
      content:
        '２０１９年也是找典藏旅行社規劃半自助，疫情攪局只能忍痛將還沒開啟的旅程劃下句點．．．．\n\n２０２４年綜合考量之下，還是決定找典藏旅行社\n可以客製化想去的景點，由旅行社人員幫忙規劃行程、訂機票、車票、住宿，\n加上我們對歐洲食物真的吃不慣，不想花太多預算、時間在吃飯上面；\n雖然交接完行程就得憑自身本事出國探險，還是花了很多時間再額外做功課，\n不過．．． 回頭來看這一切 還是非・常・值・得 ！\n\n也謝謝典藏的 Johnny 跟 Annie，在國外遇到突發狀況，德鐵誤點或是差點趕不上車，都盡快回覆提供建議，讓我們第一次半自助安心不少。\n\n也貼心建議我們可以使用 Luggage station to station 的方式，準備過夜包，減輕某幾段行程要拖著大行李轉車的不方便\n（而且真的兩次都成功 當天寄隔天下午就到，超讚！！！）\n\n要時時留意line訊息真的很辛苦，\n感謝 Johnny 跟 Annie 讓我留下很多旅遊的寶貴回憶～～',
      linkUrl: null,
      imageUrl: null,
      order: 3,
      createdAt: '2025-09-14T10:42:36.866Z',
      updatedAt: '2025-09-14T10:42:36.866Z',
      color: {
        bg: '#60A5FA',
        text: '#1D4ED8',
      },
    },
  ],
  pagination: null,
}

const fetchFeedBacks = async (): Promise<TFeedBack[]> => {
  const response = await apiClient.get<TApiResponse<TFeedBack>>(
    '/api/admin/testimonials',
  )
  return response.data.rows || []
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
