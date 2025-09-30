export type TRegion = {
  id: string
  name: string
  countries: TCountry[]
}

export type TCountry = {
  id: string
  name: string
  code?: string
}

export type TSlideContent = {
  id: number
  title: string
  subtitle: string
  description: string
}

export type TFilterType = 'country' | 'price' | 'other'

export type TFilter = {
  id: string
  label: string
  type: TFilterType
}

export type TSelectedFilters = TFilter[]

export type TTourDate = {
  date: string
  status: '已成團' | '熱銷中' | '已滿團'
}

export type TTravelerReview = {
  author: string
  avatarUrl: string
}

export type TTourData = {
  id: string
  title: string
  subtitle: string
  description: string
  price: number
  days?: number
  tags: string[]
  dates: TTourDate[]
  mainImageUrl?: string
  countries?: string[]
  travelerReview?: TTravelerReview
  note?: string
}

export const REGIONS: TRegion[] = [
  {
    id: 'western-europe',
    name: '西歐',
    countries: [
      { id: 'france', name: '法國', code: 'FR' },
      { id: 'uk', name: '英國', code: 'GB' },
      { id: 'germany', name: '德國', code: 'DE' },
      { id: 'netherlands', name: '荷蘭', code: 'NL' },
      { id: 'belgium', name: '比利時', code: 'BE' },
    ],
  },
  {
    id: 'southern-europe',
    name: '南歐',
    countries: [
      { id: 'spain', name: '西班牙', code: 'ES' },
      { id: 'portugal', name: '葡萄牙', code: 'PT' },
      { id: 'italy', name: '義大利', code: 'IT' },
      { id: 'greece', name: '希臘', code: 'GR' },
    ],
  },
  {
    id: 'northern-europe',
    name: '北歐',
    countries: [
      { id: 'norway', name: '挪威', code: 'NO' },
      { id: 'sweden', name: '瑞典', code: 'SE' },
      { id: 'denmark', name: '丹麥', code: 'DK' },
      { id: 'finland', name: '芬蘭', code: 'FI' },
    ],
  },
]

export const SLIDE_CONTENT: TSlideContent[] = [
  {
    id: 1,
    title: '荷蘭．比利時',
    subtitle: '限量甄藏！春日雙慶典 荷比自由行12天',
    description:
      '限量兩團，手刀快搶！一年僅此一天的【荷蘭國王節】、聞名全球的【庫肯霍夫鬱金香花季】、雙國經典城鎮自由探索，荷蘭與比利時豐富多元的人文美景一次典藏！',
  },
]

export const SORT_OPTIONS = [
  '價格（低到高）',
  '價格（高到低）',
  '評價（低到高）',
  '評價（高到低）',
  '離市中心遠近',
]

export const TOTAL_SLIDES = 1

export const getCountryById = (countryId: string): TCountry | null => {
  for (const region of REGIONS) {
    const country = region.countries.find((c) => c.id === countryId)
    if (country) {
      return country
    }
  }
  return null
}

export const getCountryCodes = (countryIds: string[]): string[] => {
  return countryIds
    .map((countryId) => {
      const country = getCountryById(countryId)
      return country?.code
    })
    .filter(Boolean) as string[]
}

export const convertCountriesToFilters = (
  selectedCountries: string[],
): TFilter[] => {
  return selectedCountries
    .map((countryId) => {
      const country = getCountryById(countryId)
      if (country) {
        return {
          id: countryId,
          label: country.name,
          type: 'country' as const,
        }
      }
      return null
    })
    .filter(Boolean) as TFilter[]
}

export const mockTours: TTourData[] = [
  {
    id: '1',
    title: '限量甄藏！春日雙慶典 荷比自由行12天',
    subtitle: '荷蘭．比利時',
    description:
      '限量兩團，手刀快搶！一年僅此一天的【荷蘭國王節】、聞名全球的【庫肯霍夫鬱金香花季】、雙國經典城鎮自由探索，荷蘭與比利時豐富多元的人文美景一次典藏！',
    price: 88000,
    days: 12,
    tags: [
      '自由行',
      '荷蘭國王節',
      '庫肯霍夫鬱金香花季',
      '經典城鎮',
      '雙國探索',
    ],
    dates: [
      { date: '9/9(日)', status: '已成團' },
      { date: '9/12(三)', status: '熱銷中' },
      { date: '9/19(二)', status: '已成團' },
      { date: '10/8(四)', status: '已滿團' },
      { date: '10/18(五)', status: '熱銷中' },
      { date: '10/21(一)', status: '熱銷中' },
      { date: '10/28(日)', status: '已成團' },
      { date: '10/30(日)', status: '已成團' },
    ],
    countries: ['netherlands', 'belgium'],
    mainImageUrl: '/free-tours/1.jpg',
    travelerReview: {
      author: 'MAVIS小夫妻',
      avatarUrl: '/free-tours/avatar-placeholder.jpg',
    },
    note: '備註：此案例為參考範本，可依實際行程調整需求',
  },
]