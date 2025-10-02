import type { TSlideContent, TTourDate, TTourData, TTravelerReview } from '@/lib/tours'
import { REGIONS, SORT_OPTIONS, getCountryCodes, convertCountriesToFilters } from '@/lib/tours'

export type { TSelectedFilters, TTourData, TTourDate } from '@/lib/tours'
export { REGIONS, SORT_OPTIONS, getCountryCodes, convertCountriesToFilters }
export const SLIDE_CONTENT: TSlideContent[] = [
  {
    id: 1,
    title: '荷蘭．比利時',
    subtitle: '限量甄藏！春日雙慶典 荷比雙國12天',
    description:
      '限量兩團，手刀快搶！一年僅此一天的【荷蘭國王節】、聞名全球的【庫肯霍夫鬱金香花季】、雙國經典城鎮一趟全覽，荷蘭與比利時豐富多元的人文美景一次典藏！',
  },
]

export const TOTAL_SLIDES = 6

export const convertProductToTourData = (product: {
  id: string
  isFeatured: boolean
  name: string
  namePrefix?: string
  summary?: string
  description?: string
  priceMin: number
  tags?: string[]
  days?: number
  mainImageUrl?: string
  feedback?: string | null
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
}): TTourData => {
  const convertTourDates = (): TTourDate[] => {
    if (product.tour && product.tour.length > 0) {
      return product.tour.map(tour => {
        const departDate = new Date(tour.departDate)
        const month = departDate.getMonth() + 1
        const day = departDate.getDate()
        const weekdays = ['日', '一', '二', '三', '四', '五', '六']
        const weekday = weekdays[departDate.getDay()]

        const dateString = `${month}/${day}(${weekday})`

        const status = tour.status === 1 ? '已成團' :
                      tour.status === 2 ? '熱銷中' :
                      tour.status === 3 ? '已滿團' : '熱銷中'

        return { date: dateString, status }
      })
    }

    return []
  }

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
    isFeatured: product.isFeatured,
    title: product.name,
    subtitle: product.namePrefix || '',
    description: product.summary || product.description || '',
    price: product.priceMin,
    days: product.days,
    tags: product.tags || [],
    dates: convertTourDates(),
    mainImageUrl: product.mainImageUrl || '',
    travelerReview: parseFeedback(),
  }
}

