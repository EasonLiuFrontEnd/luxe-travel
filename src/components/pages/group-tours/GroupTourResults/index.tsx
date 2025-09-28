'use client'

import GroupTourCard from './GroupTourCard'
import type { TBaseComponent } from '@/types'
import type { TTourData } from '../config'
import { mockTours } from '../config'
import { useRouter } from 'next/navigation'

type TGroupTourResultsProps = TBaseComponent & {
  tours?: TTourData[]
}

const GroupTourResults = ({
  tours = [],
  className,
}: TGroupTourResultsProps) => {
  const toursToDisplay = tours.length > 0 ? tours : mockTours

  const router = useRouter()
  const handleDetailsClick = (tourId: string) => {
    setTimeout(() => {
      router.push(`/group-tours/${tourId}`)
    }, 300)
  }

  return (
    <div className={`w-full max-w-[1920px] mx-auto ${className || ''}`}>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-y-[79px] xl:gap-x-8'>
        {toursToDisplay.map((tour) => (
          <GroupTourCard
            key={tour.id}
            title={tour.title}
            subtitle={tour.subtitle}
            description={tour.description}
            price={tour.price}
            tags={tour.tags}
            dates={tour.dates}
            imageIndex={tour.imageIndex}
            onDetailsClick={() => handleDetailsClick(tour.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupTourResults
