import ItineraryCard from "./ItineraryCard"
import { itineraryData } from "../config"

const DailyItinerary = () => {
  return (
    <div className="flex flex-col border-t border-figma-secondary-500">
      <h2 className='mx-auto font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-4 mt-13 mb-12 gradient-title-border'>
        每日行程
      </h2>
      <ItineraryCard itinerary={itineraryData[0]} />
    </div>
  )
}

export default DailyItinerary