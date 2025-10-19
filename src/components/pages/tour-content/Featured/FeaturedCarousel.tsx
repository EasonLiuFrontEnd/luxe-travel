'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export type TFeaturedCarousel = {
  images?: string[]
  className?: string
}

const CAROUSEL_OPTS = {
  align: 'start' as const,
  loop: true,
}

const FeaturedCarousel = ({
  images = ['/tour-content/hotel-lobby.jpg'],
  className,
}: TFeaturedCarousel) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const { isMobile } = useMediaQuery()

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

  const formatNumber = (num: number) => {
    return String(num).padStart(2, '0')
  }

  return (
    <Carousel
      setApi={setApi}
      opts={CAROUSEL_OPTS}
      className={cn('relative', className)}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              key={`featured-${index}`}
              src={image}
              alt={`featured-image-${index + 1}`}
              width={1440}
              height={530}
              className='min-h-[234px] xl:min-h-[530px] object-cover rounded-2xl'
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {!isMobile && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-10'>
          <button
            onClick={() => api?.scrollPrev()}
            className={cn(
              'w-[32px] h-[32px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
            )}
          >
            <ChevronLeft className='w-6 h-6' />
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
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
      )}

      {isMobile && (
        <>
          <button
            onClick={() => api?.scrollPrev()}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-10',
              'w-[32px] h-[32px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
            )}
          >
            <ChevronLeft className='w-6 h-6' />
          </button>

          <button
            onClick={() => api?.scrollNext()}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-10',
              'w-[32px] h-[32px] rounded-full cursor-pointer',
              'flex items-center justify-center',
              'bg-figma-secondary-300 hover:bg-figma-secondary-500 text-figma-neutral-0',
            )}
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </>
      )}
    </Carousel>
  )
}

export default FeaturedCarousel
