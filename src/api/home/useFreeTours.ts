import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import {
  TFreeTour,
  TFreeTourResponse,
  TUseHomeQueryResult,
  TApiResponse,
} from '../type'

const fetchFreeToursData = async (countryId?: string): Promise<TFreeTour[]> => {
  const endpoint = countryId
    ? `/admin/free-tours?countryId=${countryId}`
    : '/admin/free-tours'
  const response = await apiClient.get<TFreeTourResponse>(endpoint)
  return response?.data?.rows || []
}

export const freeToursApiMock: TFreeTourResponse = {
  status: true,
  message: '成功取得自由行推薦列表',
  rows: [
    {
      id: 'free-68b05373564da72a7ab17536-1',
      countryId: '68b05373564da72a7ab17536',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '海島風情',
      title: '克國跳島7日遊',
      description: '克羅埃西亞',
      price: '＄89,900',
      order: 1,
      createdAt: '2025-08-28T13:02:43.217Z',
      updatedAt: '2025-08-28T13:02:43.217Z',
      hoverTitle: '亞得里亞海珍珠',
      hoverDescription: '探索克羅埃西亞最美的海岸線和古城',
    },
    {
      id: 'free-68b05382564da72a7ab17537-1',
      countryId: '68b05382564da72a7ab17537',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '城堡之旅',
      title: '布拉格童話5日',
      description: '捷克',
      price: '＄72,900',
      order: 1,
      createdAt: '2025-08-28T13:02:58.975Z',
      updatedAt: '2025-08-28T13:02:58.975Z',
      hoverTitle: '百塔之城',
      hoverDescription: '漫步中世紀的石板路，感受童話般的布拉格',
    },
    {
      id: 'free-68b05391564da72a7ab17538-1',
      countryId: '68b05391564da72a7ab17538',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '海洋文化',
      title: '葡萄牙黃金海岸6日',
      description: '葡萄牙',
      price: '＄85,900',
      order: 1,
      createdAt: '2025-08-28T13:03:13.127Z',
      updatedAt: '2025-08-28T13:03:13.127Z',
      hoverTitle: '大航海時代',
      hoverDescription: '重溫航海家的足跡，品味葡式風情',
    },
    {
      id: 'free-68b0539e564da72a7ab17539-1',
      countryId: '68b0539e564da72a7ab17539',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '阿爾卑斯山',
      title: '瑞士精品8日遊',
      description: '瑞士',
      price: '＄128,900',
      order: 1,
      createdAt: '2025-08-28T13:03:26.187Z',
      updatedAt: '2025-08-28T13:03:26.187Z',
      hoverTitle: '雪山湖泊',
      hoverDescription: '體驗世界最美的山水風光和精密工藝',
    },
    {
      id: 'free-68b053ad564da72a7ab1753a-1',
      countryId: '68b053ad564da72a7ab1753a',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '翡翠島嶼',
      title: '愛爾蘭田園7日',
      description: '愛爾蘭',
      price: '＄95,900',
      order: 1,
      createdAt: '2025-08-28T13:03:41.930Z',
      updatedAt: '2025-08-28T13:03:41.930Z',
      hoverTitle: '凱爾特文化',
      hoverDescription: '感受愛爾蘭音樂和文學的浪漫魅力',
    },
    {
      id: 'free-68b053ba564da72a7ab1753b-1',
      countryId: '68b053ba564da72a7ab1753b',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '歷史文化',
      title: '德國古堡啤酒9日',
      description: '德國',
      price: '＄108,900',
      order: 1,
      createdAt: '2025-08-28T13:03:54.312Z',
      updatedAt: '2025-08-28T13:03:54.312Z',
      hoverTitle: '浪漫大道',
      hoverDescription: '探索德國的城堡與啤酒花園文化',
    },
    {
      id: 'free-68b053c6564da72a7ab1753c-1',
      countryId: '68b053c6564da72a7ab1753c',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '溫泉之都',
      title: '匈牙利布達佩斯5日',
      description: '匈牙利',
      price: '＄68,900',
      order: 1,
      createdAt: '2025-08-28T13:04:06.694Z',
      updatedAt: '2025-08-28T13:04:06.694Z',
      hoverTitle: '多瑙河明珠',
      hoverDescription: '享受歐洲最美的溫泉浴場和建築',
    },
    {
      id: 'free-68b053d4564da72a7ab1753d-1',
      countryId: '68b053d4564da72a7ab1753d',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '熱情佛朗明哥',
      title: '西班牙藝術10日',
      description: '西班牙',
      price: '＄118,900',
      order: 1,
      createdAt: '2025-08-28T13:04:20.726Z',
      updatedAt: '2025-08-28T13:04:20.726Z',
      hoverTitle: '高第建築',
      hoverDescription: '感受西班牙的藝術與熱情文化',
    },
    {
      id: 'free-68b053e0564da72a7ab1753e-1',
      countryId: '68b053e0564da72a7ab1753e',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '愛琴海島',
      title: '希臘神話8日遊',
      description: '希臘',
      price: '＄98,900',
      order: 1,
      createdAt: '2025-08-28T13:04:32.030Z',
      updatedAt: '2025-08-28T13:04:32.030Z',
      hoverTitle: '聖托里尼島',
      hoverDescription: '探索古希臘神話與愛琴海風情',
    },
    {
      id: 'free-68b053f0564da72a7ab1753f-1',
      countryId: '68b053f0564da72a7ab1753f',
      imageUrl:
        'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '巧克力王國',
      title: '比利時美食4日',
      description: '比利時',
      price: '＄58,900',
      order: 1,
      createdAt: '2025-08-28T13:04:48.257Z',
      updatedAt: '2025-08-28T13:04:48.257Z',
      hoverTitle: '歐盟首都',
      hoverDescription: '品味比利時的巧克力與啤酒文化',
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 10,
    pageCount: 1,
  },
}

export const useFreeTours = (
  countryId?: string,
): TUseHomeQueryResult<TFreeTour[], TFreeTourResponse> => {
  const query = useQuery<TFreeTour[], AxiosError<TApiResponse<TFreeTour[]>>>({
    queryKey: ['free-tours', countryId],
    queryFn: () => fetchFreeToursData(countryId),
  })

  return { query, mock: freeToursApiMock }
}
