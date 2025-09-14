'use client'

import Banner from '@/components/pages/home/Banner'
import {
  BookShelfSection,
  RecommendationSection,
} from '@/components/pages/home/ClassicItinerary'
import ServiceProcess from '@/components/pages/home/ServiceProcess'
import CollectionRecommendation from '@/components/pages/home/CollectionRecommendation'
import Advantage from '@/components/pages/home/Advantage'
import Feedback from '@/components/pages/home/Feedback'

const HomePageClient = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative bg-figma-neutral-50'>
        <BookShelfSection />
        <RecommendationSection />
      </div>
      <Advantage />
      <CollectionRecommendation />
      <Feedback />
      <ServiceProcess />
    </div>
  )
}

export default HomePageClient
