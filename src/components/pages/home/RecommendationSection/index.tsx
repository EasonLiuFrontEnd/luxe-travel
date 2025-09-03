import Image from 'next/image'
import FreeTourRecommendation from './FreeTourRecommendation'
import GroupTourRecommendation from './GroupTourRecommendation'

const RecommendationSection = () => {
  return (
    <div className="bg-[var(--color-figma-primary-50)] relative box-border flex justify-center px-9 py-20">
      <div className="absolute flex justify-center items-end w-full h-full top-0 left-0">
        <Image 
          alt="背景裝飾" 
          className="object-cover"
          src="/home/itinerary/bg.png" width={1824} height={511}
        />
      </div>
        
      <div className="flex gap-[60px] items-center max-w-[1440px] w-full">
        <FreeTourRecommendation />
        <GroupTourRecommendation />
      </div>
    </div>
  )
}

export default RecommendationSection