import type { UseQueryResult } from '@tanstack/react-query'
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
  pagination?: TPagination | null
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
  linkUrl: string | null
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
  titleLine1: string
  titleLine2: string
  subtitleLine1: string
  subtitleLine2: string
}

type TProduct = {
  id: string
  mainImageUrl?: string
  code?: string
  namePrefix?: string
  name: string
  summary?: string
  tags?: string[]
  countries?: string[]
  category?: string
  arriveCountry?: string
  days?: number
  nights?: number
  priceMin?: number
  priceMax?: number
  status?: number
  hoverTitle?: string
  hoverDescription?: string
}

export type TBooks = {
  id: string
  bookImage: string
  landscapeImage: string
  title: string
  subtitle: string
  description: string | null
  linkText: string | null
  linkUrl: string | null
  order: number
  createdAt: string
  updatedAt: string
  groupProducts: TProduct[]
  freeProducts: TProduct[]
  recoProducts: TProduct[]
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

export type TIntroduction = {
  id: string
  countryId: string
  countryName: string
  imageUrl: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TFreeTour = {
  id: string
  countryId: string
  imageUrl: string
  tagText: string
  title: string
  description: string
  price: string
  hoverTitle?: string
  hoverDescription?: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TGroupTour = {
  id: string
  countryId: string
  imageUrl: string
  tagText: string
  title: string
  description: string
  price: string
  hoverTitle?: string
  hoverDescription?: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TIntroductionResponse = TApiResponse<TIntroduction> & {
  rows: TIntroduction[]
}

export type TFreeTourResponse = TApiResponse<TFreeTour> & {
  rows: TFreeTour[]
}

export type TGroupTourResponse = TApiResponse<TGroupTour> & {
  rows: TGroupTour[]
}
