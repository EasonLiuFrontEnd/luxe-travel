import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useState, useCallback } from 'react'
import ItineraryCard from './ItineraryCard'
import ItineraryActivity from './ItineraryActivity'
import type { TItinerary, TItineraryAttraction } from '@/api/tour-content'

type TDailyItineraryProps = {
  itineraries: TItinerary[]
}

const DailyItinerary = ({ itineraries }: TDailyItineraryProps) => {
  const [openPlace, setOpenPlace] = useState<TItineraryAttraction | null>(null)

  const groupAttractionsByVisitType = useCallback(
    (
      attractions: TItineraryAttraction[],
    ): { visitType: string; attractions: TItineraryAttraction[] }[] => {
      const groupMap = new Map<
        string,
        { visitType: string; attractions: TItineraryAttraction[] }
      >()
      const visitTypeOrder = ['INSIDE', 'PHOTO', 'OUTSIDE']

      attractions.forEach((attraction) => {
        if (!groupMap.has(attraction.visitType)) {
          groupMap.set(attraction.visitType, {
            visitType: attraction.visitType,
            attractions: [],
          })
        }
        groupMap.get(attraction.visitType)!.attractions.push(attraction)
      })

      return visitTypeOrder
        .filter((type) => groupMap.has(type))
        .map((type) => groupMap.get(type)!)
    },
    [],
  )

  if (!itineraries || itineraries.length === 0) {
    return null
  }

  const parseHotelString = (hotelStr: string | null) => {
    if (!hotelStr) {
      return { options: [], fallback: '' }
    }
    const parts = hotelStr.split(' 或 ')
    const options = parts.slice(0, -1)
    const fallback =
      parts.length === 1 ? parts[0] : `或${parts[parts.length - 1]}`
    return { options, fallback }
  }

  return (
    <div
      id='daily-itinerary'
      className='flex flex-col border-t border-figma-secondary-500 bg-figma-secondary-100'
    >
      <h2 className='mx-auto font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-4 my-10 xl:mt-13 xl:mb-12 gradient-title-border'>
        每日行程
      </h2>
      {itineraries.map((itinerary, index) => {
        const { options: hotelOptions, fallback: hotelFallback } =
          parseHotelString(itinerary.hotel)

        return (
          <div
            key={itinerary.id}
            className={cn(
              index === 0 ? '' : 'border-t pt-10',
              'border-figma-secondary-950 xl:pt-12 bg-figma-secondary-100',
            )}
          >
            <ItineraryCard itinerary={itinerary} />
            {itinerary.attractions && itinerary.attractions.length > 0 && (
              <>
                {groupAttractionsByVisitType(itinerary.attractions).map(
                  (group, groupIndex) => (
                    <ItineraryActivity
                      key={`${group.visitType}-${groupIndex}`}
                      attractions={group.attractions}
                      openPlace={openPlace}
                      setOpenPlace={setOpenPlace}
                    />
                  ),
                )}
              </>
            )}
            <div className='mt-10 mx-4 mb-[30px] xl:mt-12 xl:mx-[152px] xl:mb-10'>
              <div className='flex max-xl:flex-col max-xl:gap-y-[40px] pt-6 border-t border-figma-secondary-500'>
                <div className='w-full flex flex-col gap-y-[40px] px-5 xl:px-[40px] xl:border-r xl:border-figma-secondary-500'>
                  <h4 className='flex justify-center items-center'>
                    <Image
                      src='/tour-content/restaurant.svg'
                      alt='restaurant'
                      width={36}
                      height={36}
                      className='mr-3'
                    />
                    <span className='font-family-noto-serif text-2xl xl:text-[32px] font-bold leading-[1.2] xl:leading-[1.5] text-figma-primary-500'>
                      食
                    </span>
                  </h4>
                  <div className='flex flex-col gap-y-6 font-family-genseki text-[18px] xl:text-[20px] leading-[1.5] text-figma-primary-950'>
                    <p>
                      <span className='text-figma-secondary-950 mr-3'>早</span>
                      {itinerary.breakfast}
                    </p>
                    <p>
                      <span className='text-figma-secondary-950 mr-3'>午</span>
                      {itinerary.lunch}
                    </p>
                    <p>
                      <span className='text-figma-secondary-950 mr-3'>晚</span>
                      {itinerary.dinner}
                    </p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-y-[40px] px-5 xl:px-[40px]'>
                  <h4 className='flex justify-center items-center'>
                    <Image
                      src='/tour-content/hotel.svg'
                      alt='hotel'
                      width={36}
                      height={36}
                      className='mr-3'
                    />
                    <span className='font-family-noto-serif text-2xl xl:text-[32px] font-bold leading-[1.2] xl:leading-[1.5] text-figma-primary-500'>
                      飯店
                    </span>
                  </h4>
                  <div className='flex flex-col font-family-genseki text-[18px] xl:text-[20px] leading-[1.5] text-figma-secondary-500'>
                    {hotelOptions.map((hotel, index) => (
                      <p key={index} className='p-[10px] underline'>
                        {hotel}
                      </p>
                    ))}
                    <p className='p-[10px] text-figma-primary-950'>
                      {hotelFallback}
                    </p>
                  </div>
                </div>
              </div>
              {itinerary.note && (
                <div className='w-full p-5 mt-[30px] mb-10 xl:p-7 xl:mt-10 xl:mb-12 rounded-2xl bg-figma-secondary-200'>
                  <div className='flex items-center mb-[10px]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                      fill='none'
                      className='p-1 mr-2'
                    >
                      <path
                        d='M13.0283 10.9922H0.984375V13.0372H8.97126V21.0155H10.9503V13.0372H13.0283V10.9922Z'
                        fill='#926D3C'
                      />
                      <path
                        d='M8.97266 10.9923H21.0166V8.96283H13.0297V0.984497H11.0648V8.96283H8.97266V10.9923Z'
                        fill='#926D3C'
                      />
                    </svg>
                    <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
                      NOTE
                    </p>
                  </div>
                  <p className='font-family-genseki leading-[1.5] text-figma-primary-500'>
                    {itinerary.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DailyItinerary
