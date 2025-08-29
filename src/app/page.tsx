import Banner from '@/components/sections/Banner'
import Services from '@/components/sections/Services'
import PopularDestinations from '@/components/sections/PopularDestinations'
import DestinationCard from '@/components/customUI/DestinationCard'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-figma-neutral-50'>
      <Banner />
      <div className='relative z-10 bg-white'>
        <Services />
        <PopularDestinations />

        {/* 測試 DestinationCard 組件 */}
        <div className='p-8'>
          <h2 className='text-2xl font-bold mb-6'>目的地卡片展示</h2>
          <div className='flex gap-6'>
            <div className='w-40 h-96'>
              <DestinationCard
                number='01'
                destination='克羅埃西亞'
                englishName='Republic of Croatia'
              />
            </div>
            <div className='w-40 h-96'>
              <DestinationCard
                number='02'
                destination='義大利'
                englishName='Republic of Italy'
                countryPattern='/patterns/croatia.svg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
