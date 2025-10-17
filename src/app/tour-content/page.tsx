'use client'

import NavigationSidebar from '@/components/pages/tour-content/NavigationSidebar'
import Banner from '@/components/pages/tour-content/Banner'
import TourInfo from '@/components/pages/tour-content/TourInfo'
import Featured from '@/components/pages/tour-content/Featured'
import DailyItinerary from '@/components/pages/tour-content/DailyItinerary'
import TourNotice from '@/components/pages/tour-content/TourNotice'
import { itineraryData } from '@/components/pages/tour-content/config'

const TourContentPage = () => {
  return (
    <div className='relative bg-figma-neutral-50'>
      <NavigationSidebar />
      <Banner />
      <TourInfo />
      <Featured />
      <DailyItinerary>
        <TourNotice itemCount={itineraryData.length} />
      </DailyItinerary>
    </div>
  )
}

export default TourContentPage
