import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import {
  TMenuItem,
  TMenuResponse,
  TUseHomeQueryResult,
  TApiResponse,
} from '../type'

const fetchMenu = async (): Promise<TMenuItem[]> => {
  const response = await apiClient.get<TMenuResponse>('/admin/menu')
  return response?.data?.data || []
}

export const menuApiMock: TMenuResponse = {
  status: true,
  message: '成功取得選單列表',
  data: [
    {
      id: '68b054d365cf8e1dc78c18b5',
      title: '首頁',
      linkUrl: '/',
      icon: null,
      order: 0,
      isActive: true,
      parentId: null,
      createdAt: '2025-08-28T13:08:35.428Z',
      updatedAt: '2025-09-01T06:30:20.578Z',
      children: [],
    },
    {
      id: '68b0551f65cf8e1dc78c18ba',
      title: '團體',
      linkUrl: '/tour',
      icon: null,
      order: 1,
      isActive: true,
      parentId: null,
      createdAt: '2025-08-28T13:09:51.313Z',
      updatedAt: '2025-09-01T06:30:20.578Z',
      children: [],
    },
    {
      id: '68b0553165cf8e1dc78c18bb',
      title: '主題旅遊',
      linkUrl: '#',
      icon: null,
      order: 2,
      isActive: true,
      parentId: null,
      createdAt: '2025-08-28T13:10:09.955Z',
      updatedAt: '2025-09-01T06:30:20.579Z',
      children: [
        {
          id: '68b0556165cf8e1dc78c18bd',
          title: 'F1賽車',
          linkUrl: '/tour/race',
          icon: null,
          order: 0,
          isActive: true,
          parentId: '68b0553165cf8e1dc78c18bb',
          createdAt: '2025-08-28T13:10:57.038Z',
          updatedAt: '2025-09-01T06:30:20.580Z',
          children: [],
        },
      ],
    },
    {
      id: '68b0551165cf8e1dc78c18b9',
      title: '自由行',
      linkUrl: '/free',
      icon: null,
      order: 3,
      isActive: true,
      parentId: null,
      createdAt: '2025-08-28T13:09:37.986Z',
      updatedAt: '2025-09-01T06:30:20.580Z',
      children: [],
    },
    {
      id: '68b0550565cf8e1dc78c18b8',
      title: '包車',
      linkUrl: '/car',
      icon: null,
      order: 4,
      isActive: true,
      parentId: null,
      createdAt: '2025-08-28T13:09:25.986Z',
      updatedAt: '2025-09-01T06:30:20.580Z',
      children: [],
    },
    {
      id: '68b054f865cf8e1dc78c18b7',
      title: '三井郵輪',
      linkUrl: 'https://www.mitsuioceancruises.com.tw/',
      icon: null,
      order: 5,
      isActive: true,
      parentId: null,
      createdAt: '2025-08-28T13:09:12.374Z',
      updatedAt: '2025-09-01T06:30:20.579Z',
      children: [],
    },
    {
      id: '68b054dc65cf8e1dc78c18b6',
      title: '關於典藏',
      linkUrl: '/about',
      icon: null,
      order: 6,
      isActive: true,
      parentId: null,
      createdAt: '2025-08-28T13:08:44.455Z',
      updatedAt: '2025-09-01T06:30:20.580Z',
      children: [],
    },
  ],
}

export const useMenu = (): TUseHomeQueryResult<TMenuItem[], TMenuResponse> => {
  const query = useQuery<TMenuItem[], AxiosError<TApiResponse<TMenuItem[]>>>({
    queryKey: ['menu'],
    queryFn: fetchMenu,
  })

  return { query, mock: menuApiMock }
}
