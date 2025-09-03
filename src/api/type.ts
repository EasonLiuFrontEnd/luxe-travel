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

export interface TAdvantages {
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

export interface TBanners {
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

export interface TBooks {
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

export interface TAdvantagesResponse extends TApiResponse<TAdvantages> {
  rows: TAdvantages[]
}

export interface TConcernsResponse extends TApiResponse<TConcern> {
  rows: TConcern[]
}

export interface TMenuResponse extends TApiResponse<TMenuItem> {
  data: TMenuItem[]
}

export interface TBannersResponse extends TApiResponse<TBanners> {
  rows: TBanners[]
}

export interface TBooksResponse extends TApiResponse<TBooks> {
  rows: TBooks[]
}
