import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type { TApiResponse, TUseHomeQueryResult } from '../type'

export type TProductSearchParams = {
  destination?: string
  budgetMin?: number
  budgetMax?: number
  daysRange?: string
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
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

export type TProduct = {
  id: string
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
  policy: string
  status: number
  categoryId: string
  subCategoryId: string
  createdAt: string
  updatedAt: string
  tour: TTour[]
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

const fetchProductsSearch = async (params: TProductSearchParams): Promise<TProduct[]> => {
  const searchParams = new URLSearchParams()

  if (params.destination) searchParams.append('destination', params.destination)
  if (params.budgetMin !== undefined) searchParams.append('budgetMin', params.budgetMin.toString())
  if (params.budgetMax !== undefined) searchParams.append('budgetMax', params.budgetMax.toString())
  if (params.daysRange) searchParams.append('daysRange', params.daysRange)
  if (params.page !== undefined) searchParams.append('page', params.page.toString())
  if (params.limit !== undefined) searchParams.append('limit', params.limit.toString())
  if (params.sort) searchParams.append('sort', params.sort)
  if (params.order) searchParams.append('order', params.order)

  const endpoint = `/api/products/search?${searchParams.toString()}`
  const response = await apiClient.get<TProductSearchResponse>(endpoint)
  return response?.data?.data || []
}

export const productsSearchApiMock: TProductSearchResponse = {
  page: 1,
  limit: 10,
  total: 1,
  totalPages: 1,
  sort: 'priceMin',
  order: 'asc',
  data: [
    {
      id: '68d50e578cf025275327d3c0',
      code: 'LLWCX1260418BRU',
      namePrefix: '荷蘭．比利時',
      name: '限量甄藏！春日雙慶典 荷比雙國12天',
      mainImageUrl: 'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/rS5wwD4-z5FaBhxZZsih9akcGEijQJaHeAP1Kk.jpeg',
      summary: '限量兩團，手刀快搶！一年僅此一天的【荷蘭國王節】、聞名全球的【庫肯霍夫鬱金香花季】、雙國經典城鎮一趟全覽，荷蘭與比利時豐富多元的人文美景一次典藏！',
      description: '',
      days: 12,
      nights: 9,
      departAirport: 'TPE',
      arriveCountry: 'BE',
      arriveCity: 'BRU',
      arriveAirport: 'BRU',
      category: 'GROUP',
      priceMin: 158000,
      priceMax: 158000,
      tags: [
        '荷蘭國王節',
        '庫肯霍夫鬱金香花季',
        '精選星級饗宴',
        '經典三大遊船'
      ],
      countries: [
        'NL',
        'BE'
      ],
      policy: '年齡說明 ：年齡以「團體回國日」計算。\n費用不包括 ：機場來回接送、護照工本費、床頭與行李等禮貌性質小費、私人費用等。\n團費報價以雙人房（２人一室）為主，歡迎您結伴參加。若單數報名，須酌收全程單人房差額，或由本公司協助安排同性團友共用一室，若能順利調整，則免收單人房差額。\n單人房為一人房（Single for Single use），非雙人房供一人使用（Double for Single use），單人房空間通常較雙人房小。\n三人房通常為雙人房加一床，只接受一大二小或二大一小合住，加床大多為摺疊床、沙發床或行軍彈簧床，房間空間本就不大，加上三人份的行李，勢必影響住宿品質，故建議避免住宿三人房。',
      status: 1,
      categoryId: '68b0375597cf77dce8590407',
      subCategoryId: '68d3abd7d9e9051454d7f91a',
      createdAt: '2025-09-25T09:41:43.998Z',
      updatedAt: '2025-09-26T08:54:51.325Z',
      tour: [
        {
          "id": "68da22fb078dbf20c0acc92f",
          "productId": "68d7e8e520c7e711cdd774e6",
          "code": "123-20250929-01",
          "departDate": "2025-09-29T06:10:59.016Z",
          "returnDate": "2025-09-29T06:10:59.016Z",
          "adult": "5000",
          "childWithBed": "5000",
          "childNoBed": "5000",
          "childExtraBed": "5000",
          "infant": "5000",
          "deposit": "5000",
          "status": 1,
          "note": null,
          "createdAt": "2025-09-29T06:11:07.583Z",
          "updatedAt": "2025-09-29T06:11:07.583Z"
        }
      ],
    }
  ]
}

export const useProductsSearch = (params: TProductSearchParams): TUseHomeQueryResult<TProduct[], TProductSearchResponse> => {
  const query = useQuery<TProduct[], AxiosError<TApiResponse<TProduct[]>>>({
    queryKey: ['products-search', params],
    queryFn: () => fetchProductsSearch(params),
    enabled: !!params.destination,
  })

  return { query, mock: productsSearchApiMock }
}