import { UseQueryResult } from '@tanstack/react-query'

export type TPagination = {
  page: number
  pageSize: number
  total: number
  pageCount: number
}

export interface TApiResponse<T> {
  status?: boolean
  message?: string
  rows?: T[]
  data?: T[]
  pagination?: TPagination
}

export type TUseHomeQueryResult<TData, TMock> = {
  query: UseQueryResult<TData, Error>
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

export interface TAdvantagesResponse extends TApiResponse<TAdvantages> {
  rows: TAdvantages[]
}

export interface TConcernsResponse extends TApiResponse<TConcern> {
  rows: TConcern[]
}

export interface TMenuResponse extends TApiResponse<TMenuItem> {
  data: TMenuItem[]
}

export interface TBannersResponse extends TApiResponse<TBanners> {
  rows: TBanners[]
}

export interface TBooksResponse extends TApiResponse<TBooks> {
  rows: TBooks[]
}
