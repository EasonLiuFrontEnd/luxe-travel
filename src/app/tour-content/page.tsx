'use client'

import NavigationSidebar from '@/components/pages/tour-content/NavigationSidebar'
import Banner from '@/components/pages/tour-content/Banner'
import TourInfo from '@/components/pages/tour-content/TourInfo'
import Featured from '@/components/pages/tour-content/Featured'
import DailyItinerary from '@/components/pages/tour-content/DailyItinerary'
import TourNotice from '@/components/pages/tour-content/TourNotice'
import { itineraryData } from '@/components/pages/tour-content/config'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const TourContentPage = () => {
  const { isMobile } = useMediaQuery()
  return (
    <div className='relative bg-figma-neutral-50'>
      <NavigationSidebar />
      <Banner />
      <TourInfo />
      <Featured />
      <DailyItinerary>
        <TourNotice itemCount={itineraryData.length} />
      </DailyItinerary>
      {isMobile && (
        <div className='flex justify-between items-end p-7'>
          <div className='flex flex-col'>
            <div className='flex justify-between font-genseki-body-s-regular'>
              <p>9/20(日)</p>
              <button className='text-figma-secondary-950 underline cursor-pointer'>
                更改出發日
              </button>
            </div>
            <h3 className='font-family-noto-serif text-2xl xl:text-[40px] font-bold leading-[1.2] text-figma-secondary-500'>
              ＄119,000
              <span className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.2] xl:leading-[1.5] ml-2'>起</span>
            </h3>
          </div>
          <button className='box-content w-[123px] font-genseki-h6-regular text-figma-primary-0 py-[9px] px-7 rounded-[60px] bg-figma-function-available-normal hover:bg-figma-function-available-light cursor-pointer'>
            我要報名
          </button>
        </div>
      )}
    </div>
  )
}

export default TourContentPage
