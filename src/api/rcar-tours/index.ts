import { useQuery, useMutation } from '@tanstack/react-query'
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

export type TFeedback = {
  id: string
  title: string
  nickname: string
  imageUrl: string
  linkUrl: string
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
  memo: string
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
  limit: 10,
  total: 1,
  totalPages: 1,
  sort: 'priceMin',
  order: 'asc',
  data: [
    {
      id: '68db79e7eca955c01cedb51e',
      code: 'LLWCX1270419BRU',
      namePrefix: '限量兩團．限時甄藏',
      name: '花開國王節 春遊荷比雙慶典12天',
      mainImageUrl:
        'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/NGxRiFY-fOnYe6AU3r2ORYUAbq4xWDjbQAWTDR.jpeg',
      summary:
        '拒絕傳統荷比法快閃玩法！除了親訪荷蘭最重要的兩大年度盛事－每年僅舉辦一天的【荷蘭國王節】及春天限定【庫肯霍夫鬱金香花季】的百萬花海，我們還想邀請您一起走訪荷比大城小鎮：傳統與現代兼容的大都會，或典雅、或古樸的特色小鎮－荷蘭與比利時的美，很多元，值得您慢慢探索、細細品味！\n',
      description: 'TEST行程描述',
      days: 12,
      nights: 9,
      departAirport: 'TPE',
      arriveCountry: 'BE',
      arriveCity: 'BRU',
      arriveAirport: 'BRU',
      category: 'RCAR',
      priceMin: 158000,
      priceMax: 178000,
      tags: [
        '荷蘭國王節',
        '庫肯霍夫鬱金香花季',
        '雙國經典全覽',
        '精選星級美饌',
      ],
      countries: ['NL', 'BE'],
      memo:
        '◆ 航空公司座位安排：本行程全程使用『團體經濟艙』機票，不適用於出發前預先選位，也無法事先確認座位相關需求（如，靠窗、靠走道．．等），且機上座位是航空公司依照乘客英文姓名之字母順序做統一安排，因此同行者有可能無法安排在一起，敬請參團貴賓了解。',
      status: 1,
      categoryId: '68b0375597cf77dce8590407',
      subCategoryId: '68d3abd7d9e9051454d7f91a',
      isFeatured: false,
      feedback: {
        id: '68dc89f1e3413e4013022ed9',
        title: '奧匈捷德+杜拜 30日蜜月',
        nickname: 'Winny 小夫妻',
        imageUrl:
          'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/uTzfM3Y-kRNA9IOp2tAx9zwbzqg6j9C0AVDMDp.webp',
        linkUrl: 'https://verywed.com/forum/expexch/3267262.html',
      },
      createdAt: '2025-09-30T06:34:15.998Z',
      updatedAt: '2025-10-01T04:15:27.824Z',
      tour: [],
      flights: [
        {
          id: '68db7b59eca955c01cedb52d',
          productId: '68db79e7eca955c01cedb51e',
          direction: 'OUTBOUND',
          day: 1,
          departAirport: 'TPE',
          departName: '桃園國際機場',
          arriveAirport: 'HKG',
          arriveName: '香港國際機場',
          departTime: '19:50',
          arriveTime: '22:00',
          duration: '2h10m',
          crossDay: false,
          airlineCode: 'CX',
          airlineName: '國泰航空',
          flightNo: 'CX531',
          isTransit: false,
          remark: '',
          createdAt: '2025-09-30T06:40:25.126Z',
          updatedAt: '2025-09-30T06:40:25.126Z',
        },
      ],
      highlights: [
        {
          id: '68dca0162a01317fae50c1a9',
          productId: '68db79e7eca955c01cedb51e',
          imageUrls: [
            'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/wEhZb56-BF9oSEPnjakJzhdWiSHJok7Ci1OE54.jpeg',
            'https://okm2to3vnqmhjqm9.public.blob.vercel-storage.com/MRcTg5z-3AaNUagl1M7kieTMgJAszFPZhmzP5w.jpeg',
          ],
          layout: 2,
          title: '兩大慶典．限量甄藏',
          subtitle: '',
          content:
            '◆ 一年僅此一天的【荷蘭國王節】－準備好你的橙色造型，一起開趴啦！\n◆ 每年春季限時美景【庫肯霍夫鬱金香花季】－悠遊最壯觀的百萬花海！',
          order: 0,
          createdAt: '2025-10-01T03:29:26.006Z',
          updatedAt: '2025-10-01T03:29:26.006Z',
        },
      ],
    },
  ],
}

export const useProductsSearch = () => {
  const mutation = useMutation<
    TProduct[],
    AxiosError<TApiResponse<TProduct[]>>,
    TProductSearchParams
  >({
    mutationFn: (params: TProductSearchParams) => fetchProductsSearch(params),
  })

  return { mutation, mock: productsSearchApiMock }
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
