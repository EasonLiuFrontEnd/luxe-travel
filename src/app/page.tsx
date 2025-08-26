import Banner from '@/components/sections/Banner'
import Services from '@/components/sections/Services'
import PopularDestinations from '@/components/sections/PopularDestinations'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative z-10 bg-white'>
        <Services />
        <PopularDestinations />
      </div>
    </div>
  )
}

export default HomePage
