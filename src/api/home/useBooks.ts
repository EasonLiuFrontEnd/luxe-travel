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
      bookImage: '/home/itinerary/hr-croatia/pattern.svg',
      landscapeImage: '/home/itinerary/hr-croatia/pattern.svg',
      title: '克羅埃西亞',
      subtitle: 'Republic Of Croatia',
      description:
        '克羅埃西亞位於歐洲東南部，深受中東及巴爾幹半島地區影響，從古羅馬遺跡如斯普利特的戴克里先宮，到中世紀的哥德式與文藝復興建築，處處可見歷史痕跡。',
      linkText: null,
      linkUrl: null,
      order: 1,
      createdAt: '2025-08-28T13:02:43.217Z',
      updatedAt: '2025-08-28T13:02:43.217Z',
      groupProducts: [
        {
          id: '68db79e7eca955c01cedb51e',
          mainImageUrl:
            'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/NGxRiFY-fOnYe6AU3r2ORYUAbq4xWDjbQAWTDR.jpeg',
          code: 'LLWCX1270419BRU',
          namePrefix: '限量甄藏',
          name: '花開國王節 春遊荷比雙慶典12天',
          summary:
            '拒絕傳統荷比法快閃玩法！除了親訪荷蘭最重要的兩大年度盛事－每年僅舉辦一天的【荷蘭國王節】及春天限定【庫肯霍夫鬱金香花季】的百萬花海，我們還想邀請您一起走訪荷比大城小鎮：傳統與現代兼容的大都會，或典雅、或古樸的特色小鎮－荷蘭與比利時的美，很多元，值得您慢慢探索、細細品味！\n',
          tags: [
            '荷蘭國王節',
            '庫肯霍夫鬱金香花季',
            '雙國經典全覽',
            '精選星級美饌',
          ],
          countries: ['荷蘭', '比利時'],
          category: 'GROUP',
          arriveCountry: '比利時',
          days: 12,
          nights: 9,
          priceMin: 158000,
          priceMax: 178000,
          status: 1,
        },
        {
          id: '68d7e47e087da9aeb1dad29b',
          mainImageUrl:
            'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/DfzGML3-4b5AmC0YRC8rgFQp7ENKmZxdyJNcRb.jpeg',
          code: 'LLWCX1550927CDG',
          namePrefix: '法國',
          name: '醉美蔚藍海岸 浪漫璀璨巴黎 南北法15天',
          summary: '{{行程簡述}}',
          tags: ['高性價比飯店', '深度體驗'],
          countries: ['法國'],
          category: 'GROUP',
          arriveCountry: '法國',
          days: 15,
          nights: 13,
          priceMin: 199000,
          priceMax: 200000,
          status: 1,
        },
      ],
      freeProducts: [
        {
          id: '68e7541179f42429271fa190',
          mainImageUrl:
            'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/JoHSetL-hoIPnvvDIoaKbpSqmfOX9h84pMhuEg.jpeg',
          code: 'LLWBR1860618MXP',
          namePrefix: '蜜月精選',
          name: '義大利四大名城 經典巴黎18天',
          summary:
            '義大利四大名城羅馬．威尼斯．佛羅倫斯．米蘭精華快覽Ｘ巴黎經典全覽，最適合想規劃豐富蜜月行或首遊義法的您！',
          tags: ['蜜月精選', '義大利四大名城', '巴黎經典全覽', '卡端午連休'],
          countries: ['義大利', '法國'],
          category: 'FREE',
          arriveCountry: '義大利',
          days: 18,
          nights: 15,
          priceMin: 148000,
          priceMax: 148000,
          status: 1,
        },
      ],
    },
    {
      id: '68b05382564da72a7ab17537',
      bookImage: '/home/itinerary/cz-czech/pattern.svg',
      landscapeImage: '/home/itinerary/cz-czech/pattern.svg',
      title: '捷克',
      subtitle: 'Czech Republic',
      description:
        '捷克位於中歐心臟地帶，是個內陸國家，歷史上屬波西米亞王國，至今仍保有濃厚中世風情與歐陸歷史痕跡。',
      linkText: null,
      linkUrl: null,
      order: 2,
      createdAt: '2025-08-28T13:02:58.975Z',
      updatedAt: '2025-08-28T13:02:58.975Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b05391564da72a7ab17538',
      bookImage: '/home/itinerary/pt-portugal/pattern.svg',
      landscapeImage: '/home/itinerary/pt-portugal/pattern.svg',
      title: '葡萄牙',
      subtitle: 'Portugal',
      description:
        '葡萄牙位在歐洲西南角，正面對著浩瀚大西洋，是地中海邊最璀璨的明珠，也是「航海時代的起點」。',
      linkText: null,
      linkUrl: null,
      order: 3,
      createdAt: '2025-08-28T13:03:13.127Z',
      updatedAt: '2025-08-28T13:03:13.127Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b0539e564da72a7ab17539',
      bookImage: '/home/itinerary/ch-switzerland/pattern.svg',
      landscapeImage: '/home/itinerary/ch-switzerland/pattern.svg',
      title: '瑞士',
      subtitle: 'Switzerland',
      description:
        '瑞士位在中歐核心，阿爾卑斯山橫跨國土，是歐洲經典山水國度，也是高山鐵道及自然景觀的天堂。',
      linkText: null,
      linkUrl: null,
      order: 4,
      createdAt: '2025-08-28T13:03:26.187Z',
      updatedAt: '2025-08-28T13:03:26.187Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b053ad564da72a7ab1753a',
      bookImage: '/home/itinerary/ie-ireland/pattern.svg',
      landscapeImage: '/home/itinerary/ie-ireland/pattern.svg',
      title: '愛爾蘭',
      subtitle: 'Ireland',
      description:
        '愛爾蘭位在歐洲西北部，東臨愛爾蘭海與英國相望，大家稱之為翡翠之島。',
      linkText: null,
      linkUrl: null,
      order: 5,
      createdAt: '2025-08-28T13:03:41.930Z',
      updatedAt: '2025-08-28T13:03:41.930Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b053ba564da72a7ab1753b',
      bookImage: '/home/itinerary/de-germany/pattern.svg',
      landscapeImage: '/home/itinerary/de-germany/pattern.svg',
      title: '德國',
      subtitle: 'Germany',
      description:
        '德國位於中歐的心臟地帶，融合了豐富的歷史、現代的城市和美麗的自然景觀。',
      linkText: null,
      linkUrl: null,
      order: 6,
      createdAt: '2025-08-28T13:03:54.312Z',
      updatedAt: '2025-08-28T13:03:54.312Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b053c6564da72a7ab1753c',
      bookImage: '/home/itinerary/hu-hungary/pattern.svg',
      landscapeImage: '/home/itinerary/hu-hungary/pattern.svg',
      title: '匈牙利',
      subtitle: 'Hungary',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 7,
      createdAt: '2025-08-28T13:04:06.694Z',
      updatedAt: '2025-08-28T13:04:06.694Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b053d4564da72a7ab1753d',
      bookImage: '/home/itinerary/es-spain/pattern.svg',
      landscapeImage: '/home/itinerary/es-spain/pattern.svg',
      title: '西班牙',
      subtitle: 'Spain',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 8,
      createdAt: '2025-08-28T13:04:20.726Z',
      updatedAt: '2025-08-28T13:04:20.726Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b053e0564da72a7ab1753e',
      bookImage: '/home/itinerary/gr-greece/pattern.svg',
      landscapeImage: '/home/itinerary/gr-greece/pattern.svg',
      title: '希臘',
      subtitle: 'Greece',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 9,
      createdAt: '2025-08-28T13:04:32.030Z',
      updatedAt: '2025-08-28T13:04:32.030Z',
      groupProducts: [],
      freeProducts: [],
    },
    {
      id: '68b053f0564da72a7ab1753f',
      bookImage: '/home/itinerary/be-belgium/pattern.svg',
      landscapeImage: '/home/itinerary/be-belgium/pattern.svg',
      title: '比利時',
      subtitle: 'Belgium',
      description: null,
      linkText: null,
      linkUrl: null,
      order: 10,
      createdAt: '2025-08-28T13:04:48.257Z',
      updatedAt: '2025-08-28T13:04:48.257Z',
      groupProducts: [],
      freeProducts: [],
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

  return { query, mock: booksApiMock }
}
