import type { TTourDate, TTourData, TTravelerReview } from './types'
import { SORT_OPTIONS } from './constants'
import { getCountryCodes, convertCountriesToFilters } from './utils'

export type { TSelectedFilters, TTourData, TTourDate } from './types'
export { SORT_OPTIONS, getCountryCodes, convertCountriesToFilters }

export type TTourType = 'free-tours' | 'group-tours' | 'rcar-tours'

export const convertProductToTourData = (
  product: {
    id: string
    isFeatured?: boolean
    name: string
    namePrefix?: string
    summary?: string
    description?: string
    memo?: string | null
    priceMin: number
    tags?: string[]
    days?: number
    mainImageUrl?: string
    feedback?:
      | {
          id: string
          title: string
          nickname: string
          imageUrl: string
          linkUrl: string
        }
      | string
      | null
    tour?: Array<{
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
    }>
  },
  tourType: TTourType,
): TTourData => {
  const convertTourDates = (): TTourDate[] => {
    if (tourType === 'group-tours' && product.tour && product.tour.length > 0) {
      return product.tour.map((tour) => {
        const departDate = new Date(tour.departDate)
        const month = departDate.getMonth() + 1
        const day = departDate.getDate()
        const weekdays = ['日', '一', '二', '三', '四', '五', '六']
        const weekday = weekdays[departDate.getDay()]

        const dateString = `${month}/${day}(${weekday})`

        const status =
          tour.status === 1
            ? '已成團'
            : tour.status === 2
              ? '熱銷中'
              : tour.status === 3
                ? '已滿團'
                : '熱銷中'

        return { date: dateString, status }
      })
    }

    return []
  }

  const parseFeedback = (): TTravelerReview | undefined => {
    if (!product.feedback) return undefined

    if (typeof product.feedback === 'object') {
      return {
        author: product.feedback.nickname || '',
        avatarUrl: product.feedback.imageUrl || '',
      }
    }

    try {
      const feedbackData = JSON.parse(product.feedback)
      return {
        author: feedbackData.nickname || feedbackData.author || '',
        avatarUrl: feedbackData.imageUrl || feedbackData.avatarUrl || '',
      }
    } catch {
      return undefined
    }
  }

  return {
    id: product.id,
    isFeatured: product.isFeatured || false,
    title: product.name,
    subtitle: product.namePrefix || '',
    description: product.summary || '',
    price: product.priceMin,
    days: product.days,
    tags: product.tags || [],
    dates: convertTourDates(),
    mainImageUrl: product.mainImageUrl || '',
    countries: [],
    travelerReview: parseFeedback(),
    note: product.memo || undefined,
  }
}

const TOUR_TYPE_CONFIG = {
  'free-tours': {
    title: '歐洲自由行',
    logoPath: '/tours/logo.png',
    altTextPrefix: '自由行程精選',
    gapSize: 'lg:gap-8' as const,
    maxWidth: 'max-w-[1824px]' as const,
    showBudgetFilter: true,
    showDaysFilter: true,
  },
  'group-tours': {
    title: '精緻團體行',
    logoPath: '/tours/logo.png',
    altTextPrefix: '團體旅遊精選行程',
    gapSize: 'lg:gap-9' as const,
    maxWidth: 'xl:max-w-[740px]' as const,
    showBudgetFilter: false,
    showDaysFilter: false,
  },
  'rcar-tours': {
    title: '歐洲包車行',
    logoPath: '/tours/logo.png',
    altTextPrefix: '包車行程精選',
    gapSize: 'lg:gap-8' as const,
    maxWidth: 'max-w-[1824px]' as const,
    showBudgetFilter: true,
    showDaysFilter: true,
  },
} as const

export const getTourTypeConfig = (tourType: TTourType) => {
  return TOUR_TYPE_CONFIG[tourType]
}
