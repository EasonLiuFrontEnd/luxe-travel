type TPagination = {
  page: number
  pageSize: number
  total: number
  pageCount: number
}

export type TApiResponse<T> = {
  status?: boolean
  message?: string
  rows?: T[]
  data?: T[]
  pagination?: TPagination | null
}

export type TAdvantages = {
  id: string
  moduleId: string
  imageUrl: string
  title: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TConcern = {
  id: string
  moduleId: string
  number: string
  content: string
  order: number
  createdAt: string
  updatedAt: string
}

export type TMenuItem = {
  id: string
  title: string
  linkUrl: string | null
  icon: string | null
  order: number
  isActive: boolean
  parentId: string | null
  createdAt: string
  updatedAt: string
  children: TMenuItem[]
}

export type TBanners = {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  linkText: string
  linkUrl: string
  order: number
  createdAt: string
  updatedAt: string
  titleLine1: string
  titleLine2: string
  subtitleLine1: string
  subtitleLine2: string
}

type TProduct = {
  id: string
  mainImageUrl?: string
  code?: string
  namePrefix?: string
  name: string
  summary?: string
  tags?: string[]
  countries?: string[]
  category?: string
  arriveCountry?: string
  days?: number
  nights?: number
  priceMin?: number
  priceMax?: number
  status?: number
  hoverTitle?: string
  hoverDescription?: string
}

export type TBooks = {
  id: string
  bookImage: string
  landscapeImage: string
  title: string
  subtitle: string
  description: string | null
  linkText: string | null
  linkUrl: string | null
  order: number
  createdAt: string
  updatedAt: string
  groupProducts: TProduct[]
  freeProducts: TProduct[]
}
