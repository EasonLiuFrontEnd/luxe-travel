import ItineraryCarousel, {
  type TItineraryCarouselRef,
} from './ItineraryCarousel'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import styles from './styles.module.css'
import { TBaseComponent } from '@/types'
import type { TItinerary } from '../config'

type TItineraryCardProps = TBaseComponent & {
  itinerary: TItinerary
}

const ItineraryCard = ({ itinerary }: TItineraryCardProps) => {
  const carouselRef = useRef<TItineraryCarouselRef>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(itinerary.attractions.length)

  const formatNumber = (num: number) => {
    return String(num).padStart(2, '0')
  }

  useEffect(() => {
    const api = carouselRef.current?.api
    if (!api) return

    const updateState = () => {
      setCurrent(api.selectedScrollSnap())
      setCount(api.scrollSnapList().length)
    }

    updateState()
    api.on('select', updateState)
    api.on('reInit', updateState)

    return () => {
      api.off('select', updateState)
      api.off('reInit', updateState)
    }
  }, [carouselRef.current?.api])

  const handlePrevious = () => {
    carouselRef.current?.api?.scrollPrev()
  }

  const handleNext = () => {
    carouselRef.current?.api?.scrollNext()
  }

  return (
    <div className='min-h-[700px] mt-12 ml-[152px] mr-9 rounded-2xl bg-figma-neutral-0'>
      <div className='flex justify-between'>
        <h3
          className={cn(
            'relative px-7 rounded-ee-2xl bg-figma-secondary-100',
            styles['concave-border'],
          )}
        >
          <span className='font-luxurious-deco-l-regular text-figma-secondary-500 mr-6'>
            {itinerary.day}
          </span>
          <span className='font-noto-serif-h3-bold text-figma-primary-500'>
            {itinerary.destination}
          </span>
        </h3>
        <div className='flex items-center space-x-4 pr-7'>
          <button
            onClick={handlePrevious}
            className={cn(
              'w-[24px] h-[24px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
              'transition-colors duration-200',
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
            >
              <path
                d='M7 13.1426L1 7.14258L7 1.14258'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <div className='font-genseki-body-m-medium text-figma-secondary-500'>
            {formatNumber(current + 1)} / {formatNumber(count)}
          </div>

          <button
            onClick={handleNext}
            className={cn(
              'w-[24px] h-[24px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
              'transition-colors duration-200',
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='8'
              height='14'
              viewBox='0 0 8 14'
              fill='none'
            >
              <path
                d='M1 13.1426L7 7.14258L1 1.14258'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
      <div className='box-content flex pt-[28px] px-7 pb-9'>
        <div className='flex flex-col w-[541px] justify-between mr-9'>
          {itinerary.route.length > 0 && (
            <div>
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
              <div className='flex flex-col gap-y-7 font-noto-serif-title-medium text-figma-primary-950 whitespace-nowrap'>
                {itinerary.route.map((route, index) => (
                  <div key={index} className='flex items-center gap-x-4'>
                    <p>{route.start}</p>
                    <div className='w-full text-center font-genseki-body-m-medium text-figma-primary-500'>
                      <p>{route.time}</p>
                      <div className={styles['horizontal-line']}></div>
                      <p>{route.distance}</p>
                    </div>
                    <p>{route.end}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className='w-7 h-[3px] bg-figma-secondary-950 mt-[27px] mb-5'></div>
            <p className='font-genseki-h6-regular text-figma-primary-950'>
              {itinerary.routeDescription}
            </p>
          </div>
        </div>
        <div className='relative w-full max-w-[calc(100%-577px)]'>
          <div className='flex items-center mb-5'>
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
          <div className='overflow-hidden'>
            <ItineraryCarousel
              ref={carouselRef}
              attractions={itinerary.attractions}
            />
          </div>
          <div className='absolute top-[56px] right-0 w-[82px] h-[calc(100%-56px)] bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.8)] pointer-events-none z-10'></div>
          <Image
            src='tour-content/highlight.svg'
            alt='highlight'
            width={267}
            height={78}
            className='absolute right-0 top-0 translate-y-[-50%]'
          />
        </div>
      </div>
    </div>
  )
}
export default ItineraryCard
