'use client'

import Banner from '@/components/pages/home/Banner'
import BookShelfSection from '@/components/pages/home/BookShelfSection'
import RecommendationSection from '@/components/pages/home/RecommendationSection'
import Feedback from '@/components/pages/home/Feedback'
import Concerns from './Concerns'

const HomePageClient = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative bg-figma-neutral-50'>
        <BookShelfSection />
        <RecommendationSection />
        <Concerns />
      </div>
      <CollectionRecommendation />
      <Feedback />
    </div>
  )
}

export default HomePageClient
