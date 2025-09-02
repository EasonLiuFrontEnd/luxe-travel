'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { TBaseComponent } from '@/types'

export type TBannerCarousel = TBaseComponent & {
  images?: string[]
  autoPlayInterval?: number
}
import styles from './styles.module.css'
import Image from 'next/image'

const BannerCarousel = ({
  images = ['/home/banners/banner.jpg'],
  autoPlayInterval = 10000,
  className,
}: TBannerCarousel) => {
  const [api, setApi] = useState<CarouselApi>()
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!api || !isAutoPlaying) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, isAutoPlaying, autoPlayInterval])

  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: true,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div
              className={cn(
                'h-[460px] xs:h-[662px] relative rounded-2xl overflow-hidden',
                className,
              )}
            >
              <Image
                src={image}
                alt='BannerCarousel'
                className='object-cover'
                fill
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className='absolute bottom-0 max-xs:right-0 xs:left-0'>
        <button
          className={cn(
            'flex items-center cursor-pointer',
            'bg-figma-neutral-50 text-figma-secondary-950',
            'max-xs:rounded-ss-xl xs:rounded-se-2xl',
            'font-noto-serif-tc font-bold xs:text-[32px] xs:leading-[1.5] text-[24px] leading-[1.2]',
            'py-[8px] px-[12px]',
            'xs:py-[11px] xs:px-[32px]',
            styles['concave-border-4'],
            styles['concave-border-5'],
          )}
        >
          即刻預約 · 輕鬆啟程
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='76'
            height='38'
            viewBox='0 0 76 38'
            fill='none'
            className={cn(styles['arrow'], 'hidden xs:block')}
          >
            <path
              d='M68.088 25.3333H29.0072V22.1666H56.4279L45.2549 15.6153L46.8568 12.8846L68.088 25.3333Z'
              fill='#926D3C'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='9'
            viewBox='0 0 25 9'
            fill='none'
            className={cn(styles['arrow'], 'block xs:hidden m-[4px] ml-[12px]')}
          >
            <path
              d='M24.6826 8.43115H0V6.43115H17.3184L10.2617 2.29346L11.2734 0.568848L24.6826 8.43115Z'
              fill='#926D3C'
            />
          </svg>
        </button>
      </div>

      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4 z-10'>
        <button
          onClick={() => api?.scrollPrev()}
          className={cn(
            'max-xs:hidden w-[32px] h-[32px] rounded-full cursor-pointer',
            'flex items-center justify-center',
            'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
          )}
        >
          <ChevronLeft className='w-6 h-6' />
        </button>

        <button
          onClick={() => api?.scrollNext()}
          className={cn(
            'max-xs:hidden w-[32px] h-[32px] rounded-full cursor-pointer',
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
