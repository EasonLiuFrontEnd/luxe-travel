import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type { TApiResponse, TUseHomeQueryResult } from '../type'

export type TProductSearchParams = {
  category?: string
  destination?: string
  budgetMin?: number
  budgetMax?: number
  daysRange?: string
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export type TCountryData = {
  code: string
  nameZh: string
  nameEn: string
}

export type TRegionData = {
  region: string
  countries: TCountryData[]
}

export type TCountriesResponse = {
  status: number
  total: number
  data: TRegionData[]
}

export type TTour = {
  id: string
  productId: string
  code: string
  departDate: string
  returnDate: string
  adult: string
  childWithBed: string
  childNoBed: string
  childExtraBed: string
  infant: string
  deposit: string
  status: number
  note: string | null
  createdAt: string
  updatedAt: string
}

export type TFlight = {
  id: string
  productId: string
  direction: string
  day: number
  departAirport: string
  departName: string
  arriveAirport: string
  arriveName: string
  departTime: string
  arriveTime: string
  duration: string
  crossDay: boolean
  airlineCode: string
  airlineName: string
  flightNo: string
  isTransit: boolean
  remark: string
  createdAt: string
  updatedAt: string
}

export type THighlight = {
  id: string
  productId: string
  imageUrls: string[]
  layout: number
  title: string
  subtitle: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TFeedback = {
  id: string
  title: string
  nickname: string
  imageUrl: string
  linkUrl: string
}

export type TProduct = {
  id: string
  isFeatured: boolean
  code: string
  namePrefix: string
  name: string
  mainImageUrl: string
  summary: string
  description?: string
  days: number
  nights: number
  departAirport: string
  arriveCountry: string
  arriveCity: string
  arriveAirport: string
  category: string
  priceMin: number
  priceMax: number
  tags: string[]
  countries: string[]
  policy: string | null
  status: number
  categoryId: string
  subCategoryId: string
  createdAt: string
  updatedAt: string
  tour: TTour[]
  feedback: TFeedback | null
  flights: TFlight[]
  highlights: THighlight[]
}

export type TProductSearchResponse = {
  page: number
  limit: number
  total: number
  totalPages: number
  sort: string
  order: string
  data: TProduct[]
}

const fetchProductsSearch = async (
  params: TProductSearchParams,
): Promise<TProduct[]> => {
  const searchParams = new URLSearchParams()

  if (params.category) searchParams.append('category', params.category)
  if (params.destination) searchParams.append('destination', params.destination)
  if (params.budgetMin !== undefined)
    searchParams.append('budgetMin', params.budgetMin.toString())
  if (params.budgetMax !== undefined)
    searchParams.append('budgetMax', params.budgetMax.toString())
  if (params.daysRange) searchParams.append('daysRange', params.daysRange)
  if (params.page !== undefined)
    searchParams.append('page', params.page.toString())
  if (params.limit !== undefined)
    searchParams.append('limit', params.limit.toString())
  if (params.sort) searchParams.append('sort', params.sort)
  if (params.order) searchParams.append('order', params.order)

  const endpoint = `/api/products/search?${searchParams.toString()}`
  const response = await apiClient.get<TProductSearchResponse>(endpoint)
  return response?.data?.data || []
}

export const productsSearchApiMock: TProductSearchResponse = {
  page: 1,
  limit: 100,
  total: 1,
  totalPages: 1,
  sort: 'createdAt',
  order: 'desc',
  data: [
    {
      id: '68e7541179f42429271fa190',
      code: 'LLWBR1860618MXP',
      namePrefix: '蜜月精選',
      name: '義法五大名城 巴黎香頌18天',
      mainImageUrl: 'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/JoHSetL-hoIPnvvDIoaKbpSqmfOX9h84pMhuEg.jpeg',
      summary: '義大利四大名城羅馬．威尼斯．佛羅倫斯．米蘭精華快覽Ｘ巴黎七天經典全覽，最適合想規劃多天數蜜月或首遊義法的您！',
      description: '自由行／包車： 售價包含歐洲網卡每人１張．全程５００萬意外身故＋１０萬意外醫療旅行社責任保險．詳細自由行操作手冊',
      days: 18,
      nights: 15,
      departAirport: 'TPE',
      arriveCountry: 'IT',
      arriveCity: 'MIL',
      arriveAirport: 'MXP',
      category: 'FREE',
      priceMin: 148000,
      priceMax: 148000,
      tags: [
        '蜜月精選',
        '義大利四大名城',
        '巴黎經典全覽',
        '卡端午連休'
      ],
      countries: ['IT', 'FR'],
      policy: null,
      status: 1,
      categoryId: '68b0375597cf77dce8590407',
      subCategoryId: '68d3abd7d9e9051454d7f91a',
      isFeatured: false,
      feedback: {
        id: '68dc89f1e3413e4013022ed9',
        title: '奧匈捷德+杜拜 30日蜜月',
        nickname: 'Winny 小夫妻',
        imageUrl: 'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/uTzfM3Y-kRNA9IOp2tAx9zwbzqg6j9C0AVDMDp.webp',
        linkUrl: 'https://verywed.com/forum/expexch/3267262.html'
      },
      createdAt: '2025-10-09T06:20:00.004Z',
      updatedAt: '2025-10-09T10:04:34.551Z',
      tour: [],
      flights: [
        {
          id: '68e75d34cf27148d2a5e64f9',
          productId: '68e7541179f42429271fa190',
          direction: 'OUTBOUND',
          day: 1,
          departAirport: 'TPE',
          departName: '桃園國際機場',
          arriveAirport: 'MXP',
          arriveName: '米蘭馬爾彭薩機場',
          departTime: '23:15',
          arriveTime: '07:35+1',
          duration: '13h50m',
          crossDay: true,
          airlineCode: 'BR',
          airlineName: '長榮航空',
          flightNo: 'BR95',
          isTransit: false,
          remark: '',
          createdAt: '2025-10-09T06:59:00.796Z',
          updatedAt: '2025-10-09T06:59:00.796Z'
        },
        {
          id: '68e75d34cf27148d2a5e64fb',
          productId: '68e7541179f42429271fa190',
          direction: 'OUTBOUND',
          day: 10,
          departAirport: 'FCO',
          departName: '羅馬達文西機場',
          arriveAirport: 'CDG',
          arriveName: '巴黎夏爾·戴高樂機場',
          departTime: '11:00',
          arriveTime: '13:15',
          duration: '2h15m',
          crossDay: false,
          airlineCode: 'CX',
          airlineName: '國泰航空',
          flightNo: ' AZ318',
          isTransit: false,
          remark: '',
          createdAt: '2025-10-09T06:59:00.796Z',
          updatedAt: '2025-10-09T06:59:00.796Z'
        },
        {
          id: '68e75d34cf27148d2a5e64fa',
          productId: '68e7541179f42429271fa190',
          direction: 'RETURN',
          day: 17,
          departAirport: 'CDG',
          departName: '巴黎夏爾·戴高樂機場',
          arriveAirport: 'TPE',
          arriveName: '桃園國際機場',
          departTime: '11:20',
          arriveTime: '06:40+1',
          duration: '13h50m',
          crossDay: true,
          airlineCode: 'BR',
          airlineName: '長榮航空',
          flightNo: 'BR88',
          isTransit: false,
          remark: '',
          createdAt: '2025-10-09T06:59:00.796Z',
          updatedAt: '2025-10-09T06:59:00.796Z'
        }
      ],
      highlights: []
    }
  ]
}

export const useProductsSearch = (
  params: TProductSearchParams,
): TUseHomeQueryResult<TProduct[], TProductSearchResponse> => {
  const query = useQuery<TProduct[], AxiosError<TApiResponse<TProduct[]>>>({
    queryKey: ['free-tours-products-search', params],
    queryFn: () => fetchProductsSearch(params),
    enabled: true,
  })

  return { query, mock: productsSearchApiMock }
}

const fetchProductCountries = async (): Promise<TRegionData[]> => {
  const endpoint = 'api/admin/product/countries'
  const response = await apiClient.get<TCountriesResponse>(endpoint)
  return response?.data?.data || []
}

export const countriesApiMock: TCountriesResponse = {
  status: 200,
  total: 3,
  data: [
    {
      region: '西歐',
      countries: [
        { code: 'BE', nameZh: '比利時', nameEn: 'Belgium' },
        { code: 'FR', nameZh: '法國', nameEn: 'France' },
        { code: 'NL', nameZh: '荷蘭', nameEn: 'Netherlands' },
      ],
    },
  ],
}

export const useProductCountries = (): TUseHomeQueryResult<
  TRegionData[],
  TCountriesResponse
> => {
  const query = useQuery<
    TRegionData[],
    AxiosError<TApiResponse<TRegionData[]>>
  >({
    queryKey: ['product-countries'],
    queryFn: fetchProductCountries,
    enabled: true,
    staleTime: 1000 * 60 * 60,
  })

  return { query, mock: countriesApiMock }
}
