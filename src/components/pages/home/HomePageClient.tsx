'use client'

import Banner from '@/components/pages/home/Banner'
import BookShelfSection from '@/components/pages/home/BookShelfSection'
import RecommendationSection from '@/components/pages/home/RecommendationSection'
import CollectionRecommendation from '@/components/pages/home/CollectionRecommendation'
import Feedback from '@/components/pages/home/Feedback'

const HomePageClient = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <BookShelfSection />
      <RecommendationSection />
      <CollectionRecommendation />
      <Feedback />
    </div>
  )
}

export default HomePageClient