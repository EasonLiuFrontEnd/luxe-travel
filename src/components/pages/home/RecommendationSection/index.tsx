'use client'

import Image from 'next/image'
import FreeTourRecommendation from './FreeTourRecommendation'
import GroupTourRecommendation from './GroupTourRecommendation'
import { useBannerBookShelfScroll } from '@/hooks/useBannerBookShelfScroll'

const RecommendationSection = () => {
  const { transformY } = useBannerBookShelfScroll()

  return (
    <div 
      className="recommendation-section bg-[var(--color-figma-primary-50)] relative box-border flex justify-center py-20 px-4 border-b border-[var(--color-figma-secondary-500)]"
      style={{
        marginTop: `-${transformY}px`,
        transition: 'margin-top 300ms ease-out'
      }}
    >
      <div className="absolute flex justify-center items-end w-full h-full top-0 left-0">
        <Image 
          alt="背景裝飾" 
          className="object-cover lg:block hidden"
          src="/home/itinerary/bg.png" width={1824} height={511}
        />
      </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-6 xl:gap-[60px] items-center w-full">
        <FreeTourRecommendation />
        <GroupTourRecommendation />
      </div>
    </div>
  )
}

export default RecommendationSection