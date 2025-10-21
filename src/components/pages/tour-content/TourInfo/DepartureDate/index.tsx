import { useState, useEffect, useMemo } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel'
import type { CarouselApi } from '@/components/ui/Carousel'
import type { TTour } from '@/api/tour-content'
import TimeSlotCard from './TimeSlotCard'
import TitleIcon from '../../Highlight/icons/TitleIcon'

type TTimeSlotData = {
  id: string
  date: string
  status: '已成團' | '熱銷中' | '已滿團' | '取消'
  href: string
}

type TDepartureDateProps = {
  tours: TTour[]
  onTourSelect?: (id: string) => void
}

const DepartureDate = ({ tours, onTourSelect }: TDepartureDateProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedTourId, setSelectedTourId] = useState<string>(tours[0]?.id || '')

  const timeSlots: TTimeSlotData[] = useMemo(() => {
    return tours.map((tour) => {
      const departDate = new Date(tour.departDate)
      const month = departDate.getMonth() + 1
      const day = departDate.getDate()
      const weekday = ['日', '一', '二', '三', '四', '五', '六'][
        departDate.getDay()
      ]
      const formattedDate = `${month}/${day}(${weekday})`

      let status: TTimeSlotData['status']
      if (tour.status === 1) {
        status = '熱銷中'
      } else if (tour.status === 2) {
        status = '已成團'
      } else if (tour.status === 3) {
        status = '已滿團'
      } else {
        status = '取消'
      }

      return {
        id: tour.id,
        date: formattedDate,
        status,
        href: '#',
      }
    })
  }, [tours])

  const handleSelectTour = (id: string) => {
    setSelectedTourId(id)
    onTourSelect?.(id)
  }

  useEffect(() => {
    if (!carouselApi) return

    const updateButtonState = () => {
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateButtonState()
    carouselApi.on('select', updateButtonState)

    return () => {
      if (carouselApi) {
        carouselApi.off('select', updateButtonState)
      }
    }
  }, [carouselApi])

  const handleNext = () => carouselApi?.scrollNext()
  return (
    <div>
      <div className='flex items-center mb-3'>
        <TitleIcon
          topColor='#926D3C'
          bottomColor='#926D3C'
          scale={0.9}
          className='mr-2'
        />
        <p className='font-noto-serif-body-l-semibold text-figma-secondary-950'>
          出發日期
        </p>
      </div>
      <div className='p-4 xl:p-7 rounded-2xl bg-figma-neutral-0'>
        <div className='flex items-center gap-x-3 xl:gap-x-4'>
          <div className='relative flex-1 overflow-hidden'>
            <Carousel
              opts={{
                slidesToScroll: 1,
                containScroll: 'trimSnaps',
                align: 'start',
              }}
              className='relative'
              setApi={setCarouselApi}
            >
              <CarouselContent className='gap-x-3 -ml-0'>
                {timeSlots.map((slot) => (
                  <CarouselItem key={slot.id} className='basis-auto pl-0'>
                    <TimeSlotCard
                      slot={slot}
                      onSelect={handleSelectTour}
                      isActive={selectedTourId === slot.id}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {canScrollNext && (
                <div className='absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-figma-neutral-0 to-transparent pointer-events-none' />
              )}
            </Carousel>
          </div>
          <button
            onClick={handleNext}
            disabled={!canScrollNext}
            className='group pt-3 px-4 pb-4 rounded-[41px] border border-figma-secondary-950 bg-figma-neutral-0 enabled:hover:bg-figma-secondary-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='6'
              viewBox='0 0 20 6'
              fill='none'
            >
              <path
                d='M0.8 4.33H0V5.67H0.8V5V4.33ZM16.8 5V5.67H19.746L17.205 4.425L16.8 5ZM0.8 5V5.67H16.8V5V4.33H0.8V5ZM16.8 5L17.205 4.425L9.019 0.425L8.614 1L8.209 1.575L16.395 5.575L16.8 5Z'
                fill='#926D3C'
                className='group-enabled:group-hover:fill-white'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DepartureDate
