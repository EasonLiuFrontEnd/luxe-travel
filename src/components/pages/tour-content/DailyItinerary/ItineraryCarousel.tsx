import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'
import Image from 'next/image'
import { forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { TBaseComponent } from '@/types'
import type { TItinerary } from '@/api/tour-content'

type TItineraryCarouselProps = TBaseComponent & {
  attractions: TItinerary['attractions'] | undefined
}

export type TItineraryCarouselRef = {
  api: CarouselApi | undefined
  current: number
  count: number
}

const ItineraryCarousel = forwardRef<
  TItineraryCarouselRef,
  TItineraryCarouselProps
>(({ attractions }, ref) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  useImperativeHandle(
    ref,
    () => ({
      api,
      current,
      count,
    }),
    [api, current, count],
  )

  return (
    <Carousel
      setApi={setApi}
      disableDefaultOverflow={true}
      opts={{
        align: 'start',
        loop: false,
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
      }}
    >
      <CarouselContent>
        {attractions?.map((item, index) => (
          <CarouselItem
            key={index}
            className='box-content basis-[319px] xl:basis-[526px] flex-shrink-0 pl-0 mr-7 xl:mr-[36px] last:mr-0'
          >
            <div className='relative'>
              <h5 className='absolute top-0 right-0 font-noto-serif-h5-bold text-figma-secondary-950 py-4 px-7 rounded-es-2xl bg-figma-neutral-0'>
                {item.attraction.nameZh}
              </h5>
              {item.attraction.imageUrl && (
                <Image
                  src={item.attraction.imageUrl}
                  alt={item.attraction.nameZh}
                  width={526}
                  height={280}
                  className='box-content w-full h-[170px] xl:h-[280px] object-cover rounded-2xl mb-7'
                />
              )}
              <div className='absolute left-4 bottom-4 flex gap-x-2 p-2 rounded-[4px] bg-figma-secondary-200'>
                <Image
                  src='/tour-content/flag.svg'
                  alt='flag'
                  width={20}
                  height={20}
                />
                <p className='font-genseki-body-s-bold text-figma-primary-950'>
                  {item.visitType === 'INSIDE' ? '入內參觀' : item.visitType === 'OUTSIDE' ? '下車參觀' : '拍照打卡'}
                </p>
              </div>
            </div>
            <p className='font-family-genseki text-[16px] xl:text-[18px] leading-[1.5] text-figma-primary-950 mb-1'>
              {item.attraction.content}
            </p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
})

ItineraryCarousel.displayName = 'ItineraryCarousel'

export default ItineraryCarousel
