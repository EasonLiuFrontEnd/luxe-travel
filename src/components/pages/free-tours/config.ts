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
  isFeatured: boolean
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

export const getCountryCodes = (countryCodes: string[]): string[] => {
  return countryCodes
}

export const convertCountriesToFilters = (
  selectedCountries: string[],
  regionsData?: Array<{ region: string; countries: Array<{ code: string; nameZh: string }> }>
): TFilter[] => {
  if (!regionsData || regionsData.length === 0) {
    return selectedCountries.map((code) => ({
      id: code,
      label: code,
      type: 'country' as const
    }))
  }

  return selectedCountries
    .map((countryCode) => {
      for (const region of regionsData) {
        const country = region.countries.find((c) => c.code === countryCode)
        if (country) {
          return {
            id: countryCode,
            label: country.nameZh,
            type: 'country' as const,
          }
        }
      }
      return null
    })
    .filter(Boolean) as TFilter[]
}

export const convertProductToTourData = (product: {
  id: string
  name: string
  namePrefix?: string
  summary?: string
  description?: string
  priceMin: number
  tags?: string[]
  days?: number
  mainImageUrl?: string
  feedback?: string | null
}): TTourData => {
  const parseFeedback = (): TTravelerReview | undefined => {
    if (!product.feedback) return undefined

    try {
      const feedbackData = JSON.parse(product.feedback)
      return {
        author: feedbackData.author || '',
        avatarUrl: feedbackData.avatarUrl || '',
      }
    } catch {
      return undefined
    }
  }

  return {
    id: product.id,
    isFeatured: false,
    title: product.name,
    subtitle: product.namePrefix || '',
    description: product.summary || product.description || '',
    price: product.priceMin,
    days: product.days,
    tags: product.tags || [],
    dates: [],
    mainImageUrl: product.mainImageUrl || '',
    countries: [],
    travelerReview: parseFeedback(),
  }
}