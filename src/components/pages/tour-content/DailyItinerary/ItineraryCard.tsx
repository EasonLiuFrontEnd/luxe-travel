import ItineraryCarousel, {
  type TItineraryCarouselRef,
} from './ItineraryCarousel'
import CarouselControls from './CarouselControls'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from './styles.module.css'
import { TBaseComponent } from '@/types'
import type { TItinerary } from '@/api/tour-content'

type TItineraryCardProps = TBaseComponent & {
  itinerary: TItinerary
  attractions?: TItinerary['attractions']
}

const ItineraryCard = ({ itinerary, attractions }: TItineraryCardProps) => {
  const carouselRef = useRef<TItineraryCarouselRef>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(attractions?.length || 0)
  const { isMobile } = useMediaQuery()

  const formatDayNumber = (day: number): string => {
    return `Day${String(day).padStart(2, '0')}`
  }

  const handleCarouselStateUpdate = useCallback(() => {
    const api = carouselRef.current?.api
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    setCount(api.scrollSnapList().length)
  }, [])

  useEffect(() => {
    const api = carouselRef.current?.api
    if (!api) return
    handleCarouselStateUpdate()
    api.on('select', handleCarouselStateUpdate)
    api.on('reInit', handleCarouselStateUpdate)

    return () => {
      api.off('select', handleCarouselStateUpdate)
      api.off('reInit', handleCarouselStateUpdate)
    }
  }, [carouselRef, handleCarouselStateUpdate])

  const handlePrevious = () => {
    carouselRef.current?.api?.scrollPrev()
  }

  const handleNext = () => {
    carouselRef.current?.api?.scrollNext()
  }

  return (
    <div className='min-h-[700px] mx-4 xl:ml-[152px] xl:mr-9 rounded-2xl bg-figma-neutral-0'>
      <div className='flex justify-between'>
        <h3
          className={cn(
            'max-xl:max-w-[312px] relative flex items-center max-xl:flex-wrap pl-4 pr-7 xl:px-7 rounded-ee-2xl bg-figma-secondary-100',
            styles['concave-border'],
          )}
        >
          <span className='font-family-luxurious text-5xl xl:text-8xl xl:leading-[1.2] max-xl:tracking-[4.8px] text-figma-secondary-500 mr-4 xl:mr-6'>
            {formatDayNumber(itinerary.day)}
          </span>
          <span className='font-family-noto-serif text-[18px] xl:text-[40px] font-semibold xl:font-bold leading-[1.5] xl:leading-[1.2] text-figma-primary-500'>
            {itinerary.title}
          </span>
        </h3>
        {!isMobile && attractions && attractions.length > 1 && (
          <CarouselControls
            current={current}
            count={count || attractions.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            className='min-w-[146px] pr-7'
          />
        )}
      </div>
      <div className='box-content flex max-xl:flex-col pt-[28px] px-5 pb-9 xl:px-7'>
        <div className='flex flex-col xl:w-[541px] justify-between max-xl:mb-[40px] xl:mr-9'>
          {itinerary.routes && itinerary.routes.length > 0 && (
            <div className='max-xl:mb-[40px]'>
              <div className='flex items-center mb-8'>
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
                  參考行車時間距離
                </p>
              </div>
              <div className='flex flex-col gap-y-8 xl:gap-y-7 font-family-noto-serif text-[18px] xl:text-[20px] font-semibold xl:font-medium leading-[1.5] xl:leading-[1.2] text-figma-primary-950'>
                {itinerary.routes.map((route) => (
                  <div key={route.id} className='flex items-center gap-x-4'>
                    <p className='min-w-11 xl:min-min-w-12'>{route.depart}</p>
                    <div className='w-full text-center font-genseki-body-m-medium text-figma-primary-500'>
                      <p>{route.duration}</p>
                      <div className={styles['horizontal-line']}></div>
                      <p>{route.distance}</p>
                    </div>
                    <p className='min-w-11 xl:min-min-w-12'>{route.arrive}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className='w-7 h-[3px] bg-figma-secondary-950 mt-[27px] mb-5'></div>
            <p className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.5] text-figma-primary-950'>
              {itinerary.content}
            </p>
          </div>
        </div>
        <div className='relative flex flex-col w-full xl:max-w-[calc(100%-577px)]'>
          <div className='flex max-xl:justify-between items-center mb-5'>
            <div className='flex items-center'>
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
                精選行程
              </p>
            </div>
            {isMobile && attractions && attractions.length > 1 && (
              <CarouselControls
                current={current}
                count={count || attractions.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}
          </div>
          <div className='overflow-hidden z-1'>
            <ItineraryCarousel ref={carouselRef} attractions={attractions} />
          </div>
          <div className='absolute top-[56px] right-0 w-[82px] xl:h-[calc(100%-56px)] xl:bg-gradient-to-r xl:from-transparent xl:to-[rgba(255,255,255,0.8)] pointer-events-none z-10'></div>
          {isMobile ? (
            <Image
              src='/tour-content/highlight-m.svg'
              alt='highlight-m'
              width={193}
              height={56.7}
              className='absolute bottom-[40%] right-0 z-0'
            />
          ) : (
            <Image
              src='/tour-content/highlight.svg'
              alt='highlight'
              width={267}
              height={78}
              className='absolute right-0 top-0 translate-y-[-50%]'
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default ItineraryCard
