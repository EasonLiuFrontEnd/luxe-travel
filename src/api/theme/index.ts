import { useQuery, useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import apiClient from '../client'
import type {
  TProduct,
  TProductSearchParams,
  TRegionData,
  TProductSearchResponse,
  TCountriesResponse,
} from '../free-tours'
import type { TApiResponse } from '../type'

const fetchThemeToursSearch = async (
  params: TProductSearchParams,
): Promise<TProduct[]> => {
  const searchParams = new URLSearchParams()

  if (params.category) searchParams.append('category', params.category)
  if (params.page !== undefined)
    searchParams.append('page', params.page.toString())
  if (params.limit !== undefined)
    searchParams.append('limit', params.limit.toString())
  if (params.sort) searchParams.append('sort', params.sort)
  if (params.order) searchParams.append('order', params.order)

  const response = await apiClient.get<TProductSearchResponse>(
    `/api/products/search?${searchParams.toString()}`,
  )

  return response.data.data
}

const mockThemeTours: TProduct[] = [
  {
    id: 'theme-001',
    isFeatured: false,
    code: 'DE-OKT-THEME-001',
    namePrefix: '經典慕尼黑',
    name: '德國啤酒節暢遊之旅',
    mainImageUrl: '/theme/bg.png',
    summary: '體驗世界最大啤酒節，暢遊巴伐利亞',
    description:
      '參加慕尼黑啤酒節，體驗德國傳統文化，品嚐正宗巴伐利亞美食與啤酒，暢遊新天鵝堡、國王湖等經典景點。',
    days: 10,
    nights: 8,
    departAirport: 'TPE',
    arriveCountry: 'DE',
    arriveCity: 'MUC',
    arriveAirport: 'MUC',
    category: 'GROUP',
    priceMin: 128000,
    priceMax: 138000,
    tags: ['啤酒節', '文化體驗', '經典景點'],
    countries: ['DE'],
    policy: null,
    status: 1,
    categoryId: 'theme-tours',
    subCategoryId: 'beer-festival',
    createdAt: '2025-10-29T00:00:00.000Z',
    updatedAt: '2025-10-29T00:00:00.000Z',
    tour: [
      {
        id: 'tour-001-1',
        productId: 'theme-001',
        code: 'DE-OKT-001',
        departDate: '2025-09-20',
        returnDate: '2025-09-29',
        adult: '128000',
        childWithBed: '118000',
        childNoBed: '108000',
        childExtraBed: '118000',
        infant: '8000',
        deposit: '30000',
        status: 1,
        note: null,
        createdAt: '2025-10-29T00:00:00.000Z',
        updatedAt: '2025-10-29T00:00:00.000Z',
      },
      {
        id: 'tour-001-2',
        productId: 'theme-001',
        code: 'DE-OKT-002',
        departDate: '2025-09-27',
        returnDate: '2025-10-06',
        adult: '128000',
        childWithBed: '118000',
        childNoBed: '108000',
        childExtraBed: '118000',
        infant: '8000',
        deposit: '30000',
        status: 4,
        note: null,
        createdAt: '2025-10-29T00:00:00.000Z',
        updatedAt: '2025-10-29T00:00:00.000Z',
      },
    ],
    feedback: null,
    flights: [],
    highlights: [],
  },
  {
    id: 'theme-002',
    isFeatured: false,
    code: 'DE-OKT-THEME-002',
    namePrefix: '慕尼黑深度',
    name: '啤酒節深度文化之旅',
    mainImageUrl: '/theme/card.png',
    summary: '深入探索啤酒文化，品味巴伐利亞風情',
    description:
      '深度體驗慕尼黑啤酒節，參觀知名啤酒廠，學習啤酒釀造歷史，探訪羅曼蒂克大道，感受中世紀古城魅力。',
    days: 12,
    nights: 10,
    departAirport: 'TPE',
    arriveCountry: 'DE',
    arriveCity: 'MUC',
    arriveAirport: 'MUC',
    category: 'GROUP',
    priceMin: 138000,
    priceMax: 148000,
    tags: ['啤酒節', '深度文化', '美食之旅'],
    countries: ['DE'],
    policy: null,
    status: 1,
    categoryId: 'theme-tours',
    subCategoryId: 'beer-festival',
    createdAt: '2025-10-29T00:00:00.000Z',
    updatedAt: '2025-10-29T00:00:00.000Z',
    tour: [
      {
        id: 'tour-002-1',
        productId: 'theme-002',
        code: 'DE-OKT-003',
        departDate: '2025-09-22',
        returnDate: '2025-10-03',
        adult: '138000',
        childWithBed: '128000',
        childNoBed: '118000',
        childExtraBed: '128000',
        infant: '8000',
        deposit: '35000',
        status: 1,
        note: null,
        createdAt: '2025-10-29T00:00:00.000Z',
        updatedAt: '2025-10-29T00:00:00.000Z',
      },
    ],
    feedback: null,
    flights: [],
    highlights: [],
  },
]

export const useThemeToursSearch = () => {
  const mutation = useMutation<
    TProduct[],
    AxiosError<TApiResponse<TProduct[]>>,
    TProductSearchParams
  >({
    mutationFn: fetchThemeToursSearch,
  })

  return {
    mutation,
    mock: { data: mockThemeTours } as TProductSearchResponse,
  }
}

export const useThemeToursCountries = () => {
  const query = useQuery<
    TRegionData[],
    AxiosError<TApiResponse<TRegionData[]>>
  >({
    queryKey: ['theme-tours-countries'],
    queryFn: async () => {
      return []
    },
  })

  return {
    query,
    mock: { status: 200, total: 0, data: [] } as TCountriesResponse,
  }
}
