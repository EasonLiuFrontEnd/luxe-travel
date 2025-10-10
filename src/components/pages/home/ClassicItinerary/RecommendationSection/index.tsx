'use client'

import Image from 'next/image'
import FreeTourRecommendation from './FreeTourRecommendation'
import GroupTourRecommendation from './GroupTourRecommendation'

const RecommendationSection = () => {
  return (
    <div className='recommendation-section bg-[var(--color-figma-primary-50)] relative box-border flex justify-center pt-[32px] pb-[60px] xl:py-20 px-[clamp(12px,2.5vw,48px)] border-y border-[var(--color-figma-secondary-500)]'>
      <div className='absolute flex justify-center items-end w-full h-full top-0 left-0'>
        <Image
          key='itinerary-background'
          alt='背景裝飾'
          className='object-cover xl:block hidden'
          src='/home/itinerary/bg.png'
          width={1824}
          height={511}
        />
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 justify-center gap-6 xl:gap-[60px] items-center w-full'>
        <FreeTourRecommendation />
        <GroupTourRecommendation />
      </div>
    </div>
  )
}

export default RecommendationSection
