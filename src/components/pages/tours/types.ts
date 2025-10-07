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