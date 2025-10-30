import { useQuery, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type { TApiResponse } from '../type'

type TProductSearchParams = {
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

type TCountryData = {
  code: string
  nameZh: string
  nameEn: string
}

type TRegionData = {
  region: string
  countries: TCountryData[]
}

type TCountriesResponse = {
  status: number
  total: number
  data: TRegionData[]
}

type TTour = {
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

type TFlight = {
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

type THighlight = {
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

type TFeedback = {
  id: string
  title: string
  nickname: string
  imageUrl: string
  linkUrl: string
}

type TProduct = {
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
  memo: string | null
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

type TProductSearchResponse = {
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

export const useProductsSearch = () => {
  const mutation = useMutation<
    TProduct[],
    AxiosError<TApiResponse<TProduct[]>>,
    TProductSearchParams
  >({
    mutationFn: (params: TProductSearchParams) => fetchProductsSearch(params),
  })

  return { mutation }
}

const fetchProductCountries = async (): Promise<TRegionData[]> => {
  const endpoint = 'api/admin/product/countries'
  const response = await apiClient.get<TCountriesResponse>(endpoint)
  return response?.data?.data || []
}

export const useProductCountries = () => {
  const query = useQuery<
    TRegionData[],
    AxiosError<TApiResponse<TRegionData[]>>
  >({
    queryKey: ['product-countries'],
    queryFn: fetchProductCountries,
    enabled: true,
  })

  return { query }
}
