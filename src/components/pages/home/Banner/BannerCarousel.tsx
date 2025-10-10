'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type TBannerCarousel = {
  images?: string[]
  autoPlayInterval?: number
  className?: string
}
import styles from './styles.module.css'
import Image from 'next/image'

const CAROUSEL_OPTS = {
  align: 'start' as const,
  loop: true,
}

const BannerCarousel = ({
  images = ['/home/banners/banner.jpg'],
  autoPlayInterval = 10000,
  className,
}: TBannerCarousel) => {
  const [api, setApi] = useState<CarouselApi>()
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || !isAutoPlaying) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, isAutoPlaying, autoPlayInterval])

  const handleMouseEnter = useCallback(() => setIsAutoPlaying(false), [])
  const handleMouseLeave = useCallback(() => setIsAutoPlaying(true), [])

  const formatNumber = (num: number) => {
    return String(num).padStart(2, '0')
  }

  return (
    <Carousel
      setApi={setApi}
      opts={CAROUSEL_OPTS}
      contentClassName='h-[460px] xl:h-[662px]'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent>
        {images.length > 0 ? (
          images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className={cn(
                  'h-[460px] xl:h-[662px] relative rounded-2xl overflow-hidden',
                  className,
                )}
              >
                <Image
                  key={`banner-${index}`}
                  src={image}
                  alt='BannerCarousel'
                  className='object-cover'
                  fill
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div
              className={cn(
                'h-[460px] xl:h-[662px] relative rounded-2xl overflow-hidden',
                className,
              )}
            ></div>
          </CarouselItem>
        )}
      </CarouselContent>

      <div className='absolute bottom-0 max-xl:right-0 xl:left-0'>
        <button
          className={cn(
            'group flex items-center cursor-pointer',
            'bg-figma-neutral-50 text-figma-secondary-950',
            'max-xl:rounded-ss-xl xl:rounded-se-2xl',
            'font-noto-serif-tc font-bold xl:text-[32px] xl:leading-[1.5] text-[24px] leading-[1.2]',
            'py-[8px] px-[12px]',
            'xl:py-[11px] xl:px-[32px]',
            styles['concave-border-4'],
            styles['concave-border-5'],
          )}
        >
          即刻預約 · 輕鬆啟程
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='14'
            viewBox='0 0 40 14'
            fill='none'
            className='hidden xl:block transition-transform duration-300 origin-right group-hover:scale-x-[1.3] ml-[29px]'
          >
            <path
              d='M39.088 13.3333H0.00714111V10.1666H27.4279L16.2549 3.61528L17.8568 0.884644L39.088 13.3333Z'
              fill='#926D3C'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='9'
            viewBox='0 0 25 9'
            fill='none'
            className='block xl:hidden m-[4px] ml-[12px]'
          >
            <path
              d='M24.6826 8.43115H0V6.43115H17.3184L10.2617 2.29346L11.2734 0.568848L24.6826 8.43115Z'
              fill='#926D3C'
            />
          </svg>
        </button>
      </div>

      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-10'>
        <button
          onClick={() => api?.scrollPrev()}
          className={cn(
            'max-xl:hidden w-[32px] h-[32px] rounded-full cursor-pointer',
            'flex items-center justify-center',
            'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
          )}
        >
          <ChevronLeft className='w-6 h-6' />
        </button>

        <div className='max-xl:hidden font-genseki-h5-medium text-figma-neutral-0'>
          {formatNumber(current + 1)}/{formatNumber(images.length)}
        </div>

        <button
          onClick={() => api?.scrollNext()}
          className={cn(
            'max-xl:hidden w-[32px] h-[32px] rounded-full cursor-pointer',
            'flex items-center justify-center',
            'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
          )}
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </Carousel>
  )
}

export default BannerCarousel
