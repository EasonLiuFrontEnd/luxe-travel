'use client'

import TourCard from '@/components/shared/TourCard'
import type { TBaseComponent } from '@/types'
import type { TTourData } from './config'
import { useRouter } from 'next/navigation'

type TFreeToursProps = TBaseComponent & {
  tours?: TTourData[]
}

const FreeTours = ({
  tours = [],
  className,
}: TFreeToursProps) => {

  const router = useRouter()

  const handleDetailsClick = (tourId: string) => {
    router.push(`/free-tours/${tourId}`)
  }

  const handleReviewClick = () => {
  }

  return (
    <div className={`w-full max-w-[1920px] mx-auto ${className || ''}`}>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-y-[79px] xl:gap-x-8'>
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            title={tour.title}
            subtitle={tour.subtitle}
            description={tour.description}
            price={tour.price}
            tags={tour.tags}
            mainImageUrl={tour.mainImageUrl || ''}
            travelerReview={tour.travelerReview}
            note={tour.note}
            onDetailsClick={() => handleDetailsClick(tour.id)}
            onReviewClick={handleReviewClick}
            tourType="free"
            logoPath="/free-tours/logo.png"
          />
        ))}
      </div>
    </div>
  )
}

export default FreeTours
