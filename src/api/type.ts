export interface TPagination {
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

export interface TAdvantage {
  id: string
  moduleId: string
  imageUrl: string
  title: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface TConcern {
  id: string
  moduleId: string
  number: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface TMenuItem {
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

export interface TBanner {
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

export interface TCountryShowcase {
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

export interface TAdvantagesResponse extends TApiResponse<TAdvantage> {
  rows: TAdvantage[]
}

export interface TConcernsResponse extends TApiResponse<TConcern> {
  rows: TConcern[]
}

export interface TMenuResponse extends TApiResponse<TMenuItem> {
  data: TMenuItem[]
}

export interface TBannersResponse extends TApiResponse<TBanner> {
  rows: TBanner[]
}

export interface TCountryShowcasesResponse
  extends TApiResponse<TCountryShowcase> {
  rows: TCountryShowcase[]
}
