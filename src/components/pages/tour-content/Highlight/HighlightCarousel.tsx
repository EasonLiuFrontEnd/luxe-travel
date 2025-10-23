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
import type { THighlight } from '@/api/tour-content'

type THighlightCarouselProps = {
  highlight: THighlight
}

const CAROUSEL_OPTS = {
  align: 'start' as const,
  loop: true,
}

const HighlightCarousel = ({ highlight }: THighlightCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const { isMobile } = useMediaQuery()
  const contentLines = highlight.content.split('\n')

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
    <>
      <div
        className='relative py-[40px] px-4 xl:pt-[150px] xl:px-[240px] xl:pb-[172px]'
        style={{
          background:
            'linear-gradient(180deg, #F5F5F5 0%, rgba(189, 160, 94, 0.25) 40%, rgba(189, 160, 94, 0.25) 80%, #F5F5F5 100%)',
        }}
      >
        {isMobile ? (
          <>
            <Image
              src='/tour-content/plus-aggregate-m.svg'
              alt='plus-aggregate-m'
              width={90}
              height={90}
              className='rounded-2xl object-cover absolute top-0 left-0 z-0'
            />
            <Image
              src='/tour-content/plus-aggregate-large-m.svg'
              alt='plus-aggregate-large-m'
              width={111}
              height={88}
              className='rounded-2xl object-cover absolute bottom-0 right-0 translate-y-[45%] z-0'
            />
          </>
        ) : (
          <>
            <Image
              src='/tour-content/plus-aggregate.svg'
              alt='plus-aggregate'
              width={290}
              height={290}
              className='rounded-2xl object-cover absolute top-0 left-0 z-0'
            />
            <Image
              src='/tour-content/plus-aggregate-large.svg'
              alt='plus-aggregate-large'
              width={429}
              height={395}
              className='rounded-2xl object-cover absolute bottom-0 right-0 translate-y-[45%] z-0'
            />
          </>
        )}
        <Carousel
          setApi={setApi}
          opts={CAROUSEL_OPTS}
          className={cn('relative rounded-2xl overflow-hidden z-10')}
        >
          <CarouselContent>
            {highlight.imageUrls?.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <Image
                  key={`highlight-${index}`}
                  src={highlight.imageUrls[index]}
                  alt={`highlight-image-${index + 1}`}
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
                {formatNumber(current + 1)}/
                {formatNumber(highlight.imageUrls?.length || 0)}
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
      </div>
      <div className='mx-[20px] xl:mx-[240px] mb-[40px] xl:mb-[150px]'>
        <h3 className='font-family-noto-serif text-[24px] xl:text-[40px] font-bold leading-[1.2] mb-[40px] xl:mb-11'>
          <p className='text-figma-secondary-500'>{highlight.title}</p>
          <p className='text-figma-primary-950'>{highlight.subtitle}</p>
        </h3>
        <p className='font-family-genseki text-[16px] xl:text-[20px] leading-[1.5] text-figma-primary-950'>
          {contentLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < contentLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </>
  )
}

export default HighlightCarousel
