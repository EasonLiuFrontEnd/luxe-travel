import { useQuery } from '@tanstack/react-query'
import apiClient from '../client'
import { TAdvantages, TAdvantagesResponse, TUseHomeQueryResult } from '../type'

const fetchAdvantages = async (): Promise<TAdvantages[]> => {
  const response = await apiClient.get<TAdvantagesResponse>(
    '/api/admin/advantages',
  )
  return response?.data?.rows || []
}

export const advantagesApiMock: TAdvantagesResponse = {
  status: true,
  message: '成功取得 Advantage 模組與清單',
  rows: [
    {
      id: '68b052e1f0fbcc6736579ad7',
      moduleId: '68b04a89eb0b7404083d887a',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/mtXeoaK-WvhOE1Hgib2po4CpTTiwksFrgkjYXY.jpeg',
      title: '30年經驗團隊服務',
      content:
        '累積三十年歐洲市場經驗，熟悉各大熱門與冷門城市，量身打造最懂你的行程建議。',
      order: 1,
      createdAt: '2025-08-28T13:00:17.054Z',
      updatedAt: '2025-09-02T17:03:29.911Z',
    },
    {
      id: '68b052ef564da72a7ab1752e',
      moduleId: '68b04a89eb0b7404083d887a',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/owFADyS-tfHzNDQ9zRm0O5YT5TL93e5tuQj14U.jpeg',
      title: '節省大量規劃時間',
      content:
        '我們一次整合住宿、交通、門票等資訊，適合工作忙碌，但不喜歡制式跟團的你。',
      order: 2,
      createdAt: '2025-08-28T13:00:31.436Z',
      updatedAt: '2025-09-02T17:08:24.697Z',
    },
    {
      id: '68b052fb564da72a7ab1752f',
      moduleId: '68b04a89eb0b7404083d887a',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/G3l562k-bAoql59lvMFuxkaFFObQrh5p4obICv.jpeg',
      title: '服務細心·溝通順暢',
      content:
        '從初次洽詢到行程結束，皆有專員一對一服務，提供貼心提醒與即時支援，確保旅程安心無憂。',
      order: 3,
      createdAt: '2025-08-28T13:00:43.817Z',
      updatedAt: '2025-09-02T17:04:52.167Z',
    },
    {
      id: '68b05315564da72a7ab17530',
      moduleId: '68b04a89eb0b7404083d887a',
      imageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/DqzyObd-3TTZKrVC2sFn67okJ4bli0zdRjZB33.jpeg',
      title: '熟悉跨國移動規則',
      content:
        '因應歐洲各國最新政策與入境規範，提供準確建議與文件協助，避免移動風險與不便。',
      order: 4,
      createdAt: '2025-08-28T13:01:09.791Z',
      updatedAt: '2025-09-02T17:06:09.777Z',
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 4,
    pageCount: 1,
  },
}

export const useAdvantages = (): TUseHomeQueryResult<
  TAdvantages[],
  TAdvantagesResponse
> => {
  const query = useQuery({
    queryKey: ['advantages'],
    queryFn: fetchAdvantages,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
  return { query, mock: advantagesApiMock }
}
