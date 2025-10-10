'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'
import type { TBaseComponent } from '@/types'
import Image from 'next/image'

export type TFeaturedCarousel = {
  images?: string[]
  className?: string
}

const FeaturedCarousel = ({
  images = ['/tour-content/hotel-lobby.jpg'],
  className,
}: TFeaturedCarousel) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const formatNumber = (num: number) => {
    return String(num).padStart(2, '0')
  }

  return (
    <>
      <Image
        src='/tour-content/plus-aggregate.svg'
        alt='plus-aggregate'
        width={290}
        height={290}
        className="absolute top-0 left-0 rounded-2xl object-cover z-0"
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className={cn('relative', className)}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={`featured-image-${index + 1}`}
                className='object-cover rounded-2xl'
                width={1440}
                height={590}
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-10'>
          <button
            onClick={() => api?.scrollPrev()}
            className={cn(
              'w-[32px] h-[32px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M9 15L1 8L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className='font-genseki-h5-medium text-figma-neutral-0'>
            {formatNumber(current + 1)}/{formatNumber(images.length)}
          </div>

          <button
            onClick={() => api?.scrollNext()}
            className={cn(
              'w-[32px] h-[32px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M1 15L9 8L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Carousel>
      <Image
        src='/tour-content/plus-aggregate-large.svg'
        alt='plus-aggregate-large'
        width={429}
        height={395}
        className="absolute bottom-0 right-0 translate-y-[45%] rounded-2xl object-cover z-0"
      />
    </>
  )
}

export default FeaturedCarousel
