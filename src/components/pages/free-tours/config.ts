import type { TSlideContent, TTravelerReview, TTourData } from '@/lib/tours'
import { REGIONS, SORT_OPTIONS, getCountryCodes, convertCountriesToFilters } from '@/lib/tours'

export type { TSelectedFilters, TTourData, TTravelerReview } from '@/lib/tours'
export { REGIONS, SORT_OPTIONS, getCountryCodes, convertCountriesToFilters }

export const SLIDE_CONTENT: TSlideContent[] = [
  {
    id: 1,
    title: '荷蘭．比利時',
    subtitle: '限量甄藏！春日雙慶典 荷比自由行12天',
    description:
      '限量兩團，手刀快搶！一年僅此一天的【荷蘭國王節】、聞名全球的【庫肯霍夫鬱金香花季】、雙國經典城鎮自由探索，荷蘭與比利時豐富多元的人文美景一次典藏！',
  },
]

export const TOTAL_SLIDES = 1

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