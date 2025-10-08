'use client'

import React from 'react'
import TourCard from './TourCard'
import GroupTourCard from './GroupTourCard'
import type { TBaseComponent } from '../../../types'
import type { TTourData, TTourType } from './config'
import { useRouter } from 'next/navigation'

type TToursProps = TBaseComponent & {
  tours?: TTourData[]
  tourType: TTourType
}

const Tours = ({ tours = [], tourType, className }: TToursProps) => {
  const router = useRouter()

  const handleDetailsClick = (tourId: string) => {
    router.push(`/${tourType}/${tourId}`)
  }

  const handleReviewClick = () => {}

  const renderTourCard = (tour: TTourData) => {
    const commonProps = {
      title: tour.title,
      subtitle: tour.subtitle,
      description: tour.description,
      price: tour.price,
      tags: tour.tags,
      mainImageUrl: tour.mainImageUrl || '',
      onDetailsClick: () => handleDetailsClick(tour.id),
    }

    if (tourType === 'group-tours') {
      return <GroupTourCard key={tour.id} {...commonProps} dates={tour.dates} />
    }

    return (
      <TourCard
        key={tour.id}
        {...commonProps}
        travelerReview={tour.travelerReview}
        note={tour.note}
        onReviewClick={handleReviewClick}
        tourType={tourType === 'free-tours' ? 'free' : 'rcar'}
        logoPath='/tours/logo.png'
      />
    )
  }

  return (
    <div className={`w-full max-w-[1920px] mx-auto ${className || ''}`}>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-7 xl:gap-y-[79px] xl:gap-x-8'>
        {tours.map(renderTourCard)}
      </div>
    </div>
  )
}

export default Tours
