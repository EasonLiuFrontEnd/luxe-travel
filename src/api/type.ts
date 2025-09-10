import type { UseQueryResult, QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export type TPagination = {
  page: number
  pageSize: number
  total: number
  pageCount: number
}

export type TApiResponse<T> = {
  status?: boolean
  message?: string
  rows?: T[]
  data?: T[]
  pagination?: TPagination
}

export type TUseHomeQueryResult<TData, TMock> = {
  query: UseQueryResult<TData, AxiosError<TApiResponse<TData>>>
  mock: TMock
}

export type TAdvantages = {
  id: string
  moduleId: string
  imageUrl: string
  title: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TConcern = {
  id: string
  moduleId: string
  number: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TMenuItem = {
  id: string
  title: string
  linkUrl: string
  icon: string | null
  order: number
  isActive: boolean
  parentId: string | null
  createdAt: string
  updatedAt: string
  children: TMenuItem[]
}

export type TBanners = {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  linkText: string
  linkUrl: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TBooks = {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  description: string | null
  linkText: string | null
  linkUrl: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export type TAdvantagesResponse = TApiResponse<TAdvantages> & {
  rows: TAdvantages[]
}

export type TConcernsResponse = TApiResponse<TConcern> & {
  rows: TConcern[]
}

export type TMenuResponse = TApiResponse<TMenuItem> & {
  data: TMenuItem[]
}

export type TBannersResponse = TApiResponse<TBanners> & {
  rows: TBanners[]
}

export type TBooksResponse = TApiResponse<TBooks> & {
  rows: TBooks[]
}
