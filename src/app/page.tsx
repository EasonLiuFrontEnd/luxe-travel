import Banner from '@/components/sections/Banner'
import Services from '@/components/sections/Services'
import BookShelfSection from '@/components/sections/BookShelfSection'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative z-10 bg-figma-neutral-50'>
        <BookShelfSection />
        <Services />
      </div>
    </div>
  )
}

export default HomePage
