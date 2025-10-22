'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import NavigationSidebar from '@/components/pages/tour-content/NavigationSidebar'
import Banner from '@/components/pages/tour-content/Banner'
import TourInfo from '@/components/pages/tour-content/TourInfo'
import Highlight from '@/components/pages/tour-content/Highlight'
import DailyItinerary from '@/components/pages/tour-content/DailyItinerary'
import TourNotice from '@/components/pages/tour-content/TourNotice'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTourProduct } from '@/api/tour-content/useTourProduct'

type TPageProps = {
  params: Promise<{ id: string }>
}

const TourContentPage = ({ params }: TPageProps) => {
  const { isMobile } = useMediaQuery()
  const resolvedParams = React.use(params)
  const { id } = resolvedParams

  const { data: tourProduct, isLoading, error } = useTourProduct(id)

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-figma-neutral-50'>
        <div className='text-center'>
          <div className='mb-4 h-12 w-12 animate-spin rounded-full border-4 border-figma-secondary-200 border-t-figma-secondary-500 mx-auto'></div>
          <p className='font-genseki-body-l-regular text-figma-secondary-700'>
            載入中...
          </p>
        </div>
      </div>
    )
  }

  if (error || !tourProduct) {
    notFound()
  }
  const hasHighlights =
    tourProduct.highlights && tourProduct.highlights.length > 0

  return (
    <div className='relative bg-figma-neutral-50'>
      <NavigationSidebar
        category={tourProduct.category as 'GROUP' | 'FREE'}
        hasHighlights={hasHighlights}
      />
      <Banner
        category={tourProduct.category as 'GROUP' | 'FREE'}
        namePrefix={tourProduct.namePrefix}
        name={tourProduct.name}
        mainImageUrl={tourProduct.mainImageUrl}
      />
      <TourInfo
        category={tourProduct.category as 'GROUP' | 'FREE'}
        tours={tourProduct.tour}
        flights={tourProduct.flights}
        mapUrl={tourProduct.map || undefined}
        note={tourProduct.note}
        deposit={tourProduct.deposit || undefined}
        feedback={tourProduct.feedback}
        description={tourProduct.description}
      />
      {hasHighlights && (
        <Highlight highlights={tourProduct.highlights} productId={id} />
      )}
      {tourProduct.itineraries && tourProduct.itineraries.length > 0 && (
        <DailyItinerary itineraries={tourProduct.itineraries}>
          <TourNotice
            category={tourProduct.category as 'GROUP' | 'FREE'}
            itemCount={tourProduct.itineraries.length}
            reminder={tourProduct.reminder}
            policy={tourProduct.policy}
          />
        </DailyItinerary>
      )}
      {isMobile && (
        <div className='flex justify-between items-end p-7'>
          <div className='flex flex-col'>
            <div className='flex justify-between font-genseki-body-s-regular'>
              <p>9/20(日)</p>
              <button className='text-figma-secondary-950 underline cursor-pointer'>
                更改出發日
              </button>
            </div>
            <h3 className='font-family-noto-serif text-2xl xl:text-[40px] font-bold leading-[1.2] text-figma-secondary-500'>
              ＄119,000
              <span className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.2] xl:leading-[1.5] ml-2'>
                起
              </span>
            </h3>
          </div>
          <button className='box-content w-[123px] font-genseki-h6-regular text-figma-primary-0 py-[9px] px-7 rounded-[60px] bg-figma-function-available-normal hover:bg-figma-function-available-light cursor-pointer'>
            我要報名
          </button>
        </div>
      )}
    </div>
  )
}

export default TourContentPage
