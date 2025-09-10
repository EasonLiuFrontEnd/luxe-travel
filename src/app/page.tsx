import Banner from '@/components/pages/home/Banner'
import BookShelfSection from '@/components/pages/home/BookShelfSection'
import RecommendationSection from '@/components/pages/home/RecommendationSection'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <BookShelfSection />
      <RecommendationSection />
    </div>
  )
}

export default HomePage
