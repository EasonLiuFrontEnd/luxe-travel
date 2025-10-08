'use client'

import { useRef } from 'react'
import Banner from '@/components/pages/home/Banner'
import {
  BookShelfSection,
  RecommendationSection,
} from '@/components/pages/home/ClassicItinerary'
import ServiceProcess from '@/components/pages/home/ServiceProcess'
import CollectionRecommendation from '@/components/pages/home/CollectionRecommendation'
import Advantage from '@/components/pages/home/Advantage'
import Feedback from '@/components/pages/home/Feedback'
import Concerns from './Concerns'
import TravelInquiryForm from '../inquiry'

const HomePageClient = () => {
  const collectionRef = useRef<HTMLDivElement>(null!)
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
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
        className='relative pt-10 pb-[80px] px-4 xl:py-10 xl:px-9 z-10'
        heroTopPosition='top-[9px] xl:top-[-24px]'
      />
    </div>
  )
}

export default HomePageClient
