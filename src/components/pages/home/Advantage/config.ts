import type { TAdvantages } from '@/api/type'

const gradientOverlays = [
  'to-[#8bc3de]',
  'to-[#e0dbc7]',
  'to-[rgba(61,84,0,0.6)]',
  'to-[#333333]',
]

export const getGradientOverlay = (order: number): string => {
  return gradientOverlays[order - 1] || 'to-[#333333]'
}

export const transformAdvantageData = (advantages: TAdvantages[]) => {
  return advantages
    .sort((a, b) => a.order - b.order)
    .map((advantage) => ({
      ...advantage,
      gradientOverlay: getGradientOverlay(advantage.order),
    }))
}
