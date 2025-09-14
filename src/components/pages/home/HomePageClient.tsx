'use client'

import Banner from '@/components/pages/home/Banner'
import { BookShelfSection, RecommendationSection } from '@/components/pages/home/ClassicItinerary'
import CollectionRecommendation from '@/components/pages/home/CollectionRecommendation'
import Feedback from '@/components/pages/home/Feedback'

const HomePageClient = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative bg-figma-neutral-50'>
      <BookShelfSection />
      <RecommendationSection />
      </div>
      <CollectionRecommendation />
      <Feedback />
    </div>
  )
}

export default HomePageClient
