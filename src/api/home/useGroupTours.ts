import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import {
  TGroupTour,
  TGroupTourResponse,
  TUseHomeQueryResult,
  TApiResponse,
} from '../type'

const fetchGroupToursData = async (
  countryId?: string,
): Promise<TGroupTour[]> => {
  const endpoint = countryId
    ? `/admin/group-tours?countryId=${countryId}`
    : '/admin/group-tours'
  const response = await apiClient.get<TGroupTourResponse>(endpoint)
  return response?.data?.rows || []
}

export const groupToursApiMock: TGroupTourResponse = {
  status: true,
  message: '成功取得團體旅遊推薦列表',
  rows: [
    {
      id: 'group-68b05373564da72a7ab17536-1',
      countryId: '68b05373564da72a7ab17536',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '巴爾幹探索',
      title: '亞得里亞海珍珠',
      description: '克羅埃西亞深度12日',
      price: '＄156,900',
      hoverTitle: '亞得里亞海岸線',
      hoverDescription: '探索古城杜布羅夫尼克與普利特維采湖',
      order: 1,
      createdAt: '2025-08-28T13:02:43.217Z',
      updatedAt: '2025-08-28T13:02:43.217Z',
    },
    {
      id: 'group-68b05382564da72a7ab17537-1',
      countryId: '68b05382564da72a7ab17537',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '中歐經典',
      title: '波西米亞風情',
      description: '捷克奧地利雙國10日',
      price: '＄128,900',
      hoverTitle: '百塔之城布拉格',
      hoverDescription: '中世紀建築與浪漫汛爾塔瓦河景',
      order: 1,
      createdAt: '2025-08-28T13:02:58.975Z',
      updatedAt: '2025-08-28T13:02:58.975Z',
    },
    {
      id: 'group-68b05391564da72a7ab17538-1',
      countryId: '68b05391564da72a7ab17538',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '大航海時代',
      title: '葡萄牙黃金海岸',
      description: '伊比利亞半島14日深度之旅',
      price: '＄179,900',
      hoverTitle: '里斯本與波爾圖',
      hoverDescription: '追随達伽瑪的足跡，品嚇最純正的葡式風情',
      order: 1,
      createdAt: '2025-08-28T13:03:13.127Z',
      updatedAt: '2025-08-28T13:03:13.127Z',
    },
    {
      id: 'group-68b0539e564da72a7ab17539-1',
      countryId: '68b0539e564da72a7ab17539',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '阿爾卑斯體驗',
      title: '瑞士精品高級遊',
      description: '雪山湖泊12天',
      price: '＄289,900',
      hoverTitle: '马特洪峰與少女峰',
      hoverDescription: '體驗世界頂級的山水風光和瑞士精工品質',
      order: 1,
      createdAt: '2025-08-28T13:03:26.187Z',
      updatedAt: '2025-08-28T13:03:26.187Z',
    },
    {
      id: 'group-68b053ad564da72a7ab1753a-1',
      countryId: '68b053ad564da72a7ab1753a',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '翡翠島情',
      title: '愛爾蘭田園風光',
      description: '凱爾特文化探索8日',
      price: '＄158,900',
      hoverTitle: '都柏林與克里夫斯',
      hoverDescription: '感受愛爾蘭的文學傳統與繁綣的田野風光',
      order: 1,
      createdAt: '2025-08-28T13:03:41.930Z',
      updatedAt: '2025-08-28T13:03:41.930Z',
    },
    {
      id: 'group-68b053ba564da72a7ab1753b-1',
      countryId: '68b053ba564da72a7ab1753b',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '浪漫大道',
      title: '德國古堡與啤酒',
      description: '巴伐利亞與菊茵河之旅15日',
      price: '＄218,900',
      hoverTitle: '新天鵅堡與福森堡',
      hoverDescription: '探索德國最著名的城堡與啤酒文化',
      order: 1,
      createdAt: '2025-08-28T13:03:54.312Z',
      updatedAt: '2025-08-28T13:03:54.312Z',
    },
    {
      id: 'group-68b053c6564da72a7ab1753c-1',
      countryId: '68b053c6564da72a7ab1753c',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '溫泉之都',
      title: '匈牙利多瑙河明珠',
      description: '布達佩斯與温泉奇蹟7日',
      price: '＄138,900',
      hoverTitle: '布達佩斯國會大廈',
      hoverDescription: '享受世界最美的溫泉浴場與多瑙河晚景',
      order: 1,
      createdAt: '2025-08-28T13:04:06.694Z',
      updatedAt: '2025-08-28T13:04:06.694Z',
    },
    {
      id: 'group-68b053d4564da72a7ab1753d-1',
      countryId: '68b053d4564da72a7ab1753d',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '伊比利亞風情',
      title: '西班牙藝術之旅',
      description: '高第建築與佛朗明哥12日',
      price: '＄208,900',
      hoverTitle: '巴塞隆納與馬德里',
      hoverDescription: '感受高第的建築藝術和佛朗明哥的熱情',
      order: 1,
      createdAt: '2025-08-28T13:04:20.726Z',
      updatedAt: '2025-08-28T13:04:20.726Z',
    },
    {
      id: 'group-68b053e0564da72a7ab1753e-1',
      countryId: '68b053e0564da72a7ab1753e',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '古希臘神話',
      title: '希臘愛琴海島嶼',
      description: '雅典聖托里尼10日',
      price: '＄189,900',
      hoverTitle: '雅典衛城與藍白小鎮',
      hoverDescription: '探索古希臘文明與愛琴海的浪漫風情',
      order: 1,
      createdAt: '2025-08-28T13:04:32.030Z',
      updatedAt: '2025-08-28T13:04:32.030Z',
    },
    {
      id: 'group-68b053f0564da72a7ab1753f-1',
      countryId: '68b053f0564da72a7ab1753f',
      imageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tagText: '歐盟首都',
      title: '比利時美食與藝術',
      description: '布魯塞尔布魯日雙心5日',
      price: '＄98,900',
      hoverTitle: '布魯塞尔與布魯日',
      hoverDescription: '品味世界最精致的巧克力與中世紀建築之美',
      order: 1,
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

export const useGroupTours = (
  countryId?: string,
): TUseHomeQueryResult<TGroupTour[], TGroupTourResponse> => {
  const query = useQuery<TGroupTour[], AxiosError<TApiResponse<TGroupTour[]>>>({
    queryKey: ['group-tours', countryId],
    queryFn: () => fetchGroupToursData(countryId),
  })

  return { query, mock: groupToursApiMock }
}
