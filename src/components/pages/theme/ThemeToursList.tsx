'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import GroupTourCard from '@/components/shared/cards/GroupTourCard'
import { convertProductToTourData } from '@/components/pages/tours/config'
import { useThemeToursSearch } from '@/api/theme'
import type { TTourData } from '@/components/pages/tours/config'

const ThemeToursList = () => {
  const router = useRouter()
  const [tours, setTours] = useState<TTourData[]>([])
  const { mutation, mock } = useThemeToursSearch()

  useEffect(() => {
    mutation.mutate(
      {
        category: 'GROUP',
        page: 1,
        limit: 100,
        sort: 'createdAt',
        order: 'desc',
      },
      {
        onSuccess: (data) => {
          const convertedTours = data.map((product) =>
            convertProductToTourData(product, 'group-tours'),
          )
          setTours(convertedTours)
        },
        onError: () => {
          const convertedTours = mock.data.map((product) =>
            convertProductToTourData(product, 'group-tours'),
          )
          setTours(convertedTours)
        },
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDetailsClick = useCallback(
    (tourId: string) => {
      sessionStorage.setItem('tour-needs-refresh', 'true')
      router.push(`/tour-content/${tourId}`)
    },
    [router],
  )

  if (tours.length === 0) {
    return (
      <div className='text-center py-20 font-genseki-body-l-regular text-figma-primary-950'>
        目前暫無相關行程
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-7 xl:gap-y-[79px] xl:gap-x-8 xl:grid xl:grid-cols-[repeat(auto-fit,minmax(680px,1fr))]'>
      {tours.map((tour) => (
        <GroupTourCard
          key={tour.id}
          title={tour.title}
          subtitle={tour.subtitle}
          description={tour.description}
          price={tour.price}
          tags={tour.tags}
          dates={tour.dates || []}
          mainImageUrl={tour.mainImageUrl || '/theme/bg.png'}
          onDetailsClick={() => handleDetailsClick(tour.id)}
        />
      ))}
    </div>
  )
}

export default ThemeToursList
