import Banner from '@/components/ui/Banner'
import Services from '@/components/ui/Services'
import PopularDestinations from '@/components/ui/PopularDestinations'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Banner />
      <div className='relative z-10 bg-white'>
        <Services />
        <PopularDestinations />
      </div>
    </div>
  )
}

export default HomePage
