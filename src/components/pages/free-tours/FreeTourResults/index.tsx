'use client'

import FreeTourCard from './FreeTourCard'
import type { TBaseComponent } from '@/types'
import type { TTourData } from '../config'
import { useRouter } from 'next/navigation'

type TFreeTourResultsProps = TBaseComponent & {
  tours?: TTourData[]
}

const FreeTourResults = ({
  tours = [],
  className,
}: TFreeTourResultsProps) => {

  const router = useRouter()
  const handleDetailsClick = (tourId: string) => {
    setTimeout(() => {
      router.push(`/free-tours/${tourId}`)
    }, 300)
  }

  const handleReviewClick = (tourId: string) => {
  }

  return (
    <div className={`w-full max-w-[1920px] mx-auto ${className || ''}`}>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-y-[79px] xl:gap-x-8'>
        {tours.map((tour) => (
          <FreeTourCard
            key={tour.id}
            title={tour.title}
            subtitle={tour.subtitle}
            description={tour.description}
            price={tour.price}
            tags={tour.tags}
            mainImageUrl={tour.mainImageUrl!}
            travelerReview={tour.travelerReview}
            note={tour.note}
            onDetailsClick={() => handleDetailsClick(tour.id)}
            onReviewClick={() => handleReviewClick(tour.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default FreeTourResults