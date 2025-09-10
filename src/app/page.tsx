import Banner from '@/components/pages/home/Banner'
import BookShelfSection from '@/components/pages/home/BookShelfSection'
import RecommendationSection from '@/components/pages/home/RecommendationSection'
import Feedback from '@/components/pages/home/Feedback'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <BookShelfSection />
      <RecommendationSection />
      <Feedback />
    </div>
  )
}

export default HomePage
