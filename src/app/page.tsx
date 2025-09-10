import Banner from '@/components/pages/home/Banner'
import BookShelfSection from '@/components/pages/home/BookShelfSection'
import Feedback from '@/components/pages/home/Feedback'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative z-10 bg-figma-neutral-50'>
        <BookShelfSection />
      </div>
      <Feedback />
    </div>
  )
}

export default HomePage
