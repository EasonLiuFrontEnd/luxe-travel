'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Banner from '@/components/pages/home/Banner'
import { RecommendationSection } from '@/components/pages/home/ClassicItinerary'
import ServiceProcess from '@/components/pages/home/ServiceProcess'
import CollectionRecommendation from '@/components/pages/home/CollectionRecommendation'
import Advantage from '@/components/pages/home/Advantage'
import Feedback from '@/components/pages/home/Feedback'
import Concerns from './Concerns'
import TravelInquiryForm from '../inquiry'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollbarWidth } from '@/hooks/useScrollbarWidth'

const HomePageClient = () => {
  const collectionRef = useRef<HTMLDivElement>(null!)
  const { isMobile } = useMediaQuery()
  const { contentWidth } = useScrollbarWidth()

  const containerStyle = {
    width: `${contentWidth}px`,
    maxWidth: `${contentWidth}px`,
    left: '0',
  }

  return (
    <div
      className='min-h-screen bg-figma-neutral-50'
      style={isMobile ? {} : containerStyle}
    >
      <Banner />
      <div className='relative bg-figma-neutral-50'>
        <BookShelfSection />
        <RecommendationSection />
        <Concerns />
      </div>
      <Advantage collectionRef={collectionRef} />
      <CollectionRecommendation collectionRef={collectionRef} />
      <Feedback />
      <ServiceProcess />
      <TravelInquiryForm
        className='relative pt-10 pb-[80px] px-4 xl:py-10 xl:px-9'
        heroTopPosition='top-[9px] xl:top-[-24px]'
      />
    </div>
  )
}

const BookShelfSection = dynamic(
  () =>
    import('@/components/pages/home/ClassicItinerary').then(
      (mod) => mod.BookShelfSection,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='h-full w-full flex items-center justify-center'>
        載入中...
      </div>
    ),
  },
)

export default HomePageClient
