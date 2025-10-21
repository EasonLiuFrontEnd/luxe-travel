'use client'

import React, { useState, useEffect } from 'react'
import TourCard from './TourCard'
import GroupTourCard from './GroupTourCard'
import type { TTourData, TTourType } from './config'
import { useRouter } from 'next/navigation'

type TToursProps = {
  className?: string
  tours?: TTourData[]
  tourType: TTourType
}

const Tours = ({ tours = [], tourType, className }: TToursProps) => {
  const router = useRouter()
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const needsRefresh = sessionStorage.getItem('tour-needs-refresh')
    if (needsRefresh === 'true') {
      sessionStorage.removeItem('tour-needs-refresh')
      setRefreshKey((prev) => prev + 1)
    }

    const handlePopState = () => {
      const needsRefresh = sessionStorage.getItem('tour-needs-refresh')
      if (needsRefresh === 'true') {
        sessionStorage.removeItem('tour-needs-refresh')
        setRefreshKey((prev) => prev + 1)
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleDetailsClick = (tourId: string) => {
    sessionStorage.setItem('tour-needs-refresh', 'true')
    router.push(`/tour-content/${tourId}`)
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
      return (
        <GroupTourCard
          key={`${tour.id}-${refreshKey}`}
          {...commonProps}
          dates={tour.dates}
        />
      )
    }

    return (
      <TourCard
        key={`${tour.id}-${refreshKey}`}
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
      <div className='flex flex-wrap gap-7 xl:gap-y-[79px] xl:gap-x-8 xl:grid xl:grid-cols-[repeat(auto-fit,minmax(680px,1fr))]'>
        {tours.map(renderTourCard)}
      </div>
    </div>
  )
}

export default Tours
