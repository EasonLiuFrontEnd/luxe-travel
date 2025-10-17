import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/Carousel'
import Image from 'next/image'
import { forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { TBaseComponent } from '@/types'
import type { TItinerary } from '../config'

type TItineraryCarouselProps = TBaseComponent & {
  attractions: TItinerary['attractions']
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

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
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
        {attractions.map((item, index) => (
          <CarouselItem
            key={index}
            className='box-content basis-[526px] flex-shrink-0 pl-0 mr-[36px] last:mr-0'
          >
            <div className='relative'>
              <h5 className='absolute top-0 right-0 font-noto-serif-h5-bold text-figma-secondary-950 py-4 px-7 rounded-es-2xl bg-figma-neutral-0'>
                {item.title}
              </h5>
              <Image
                src={item.picture}
                alt={item.title}
                width={526}
                height={280}
                className='object-cover rounded-2xl mb-7'
              />
              <div className='absolute left-4 bottom-4 flex gap-x-2 p-2 rounded-[4px] bg-figma-secondary-200'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='21'
                  viewBox='0 0 20 21'
                  fill='none'
                >
                  <g style={{ mixBlendMode: 'darken' }} opacity='0.6'>
                    <path
                      d='M13.2327 2.92773H8.56957C6.10148 2.92773 4.86744 2.92773 4.10071 3.65997C3.33398 4.3922 3.33398 5.57071 3.33398 7.92773L3.42248 12.9277H13.2327C15.0853 12.9277 16.0116 12.9277 16.4046 12.449C16.5133 12.3166 16.593 12.1645 16.6386 12.0019C16.8039 11.4144 16.2482 10.7067 15.1366 9.2914C14.6742 8.70261 14.4431 8.40823 14.4018 8.07365C14.3899 7.97671 14.3899 7.87876 14.4018 7.78182C14.4431 7.44724 14.6742 7.15286 15.1366 6.5641C16.2482 5.14874 16.8039 4.44107 16.6386 3.85355C16.593 3.69099 16.5133 3.53892 16.4046 3.40646C16.0116 2.92773 15.0853 2.92773 13.2327 2.92773Z'
                      stroke='#383841'
                      strokeWidth='1.25'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M3.33398 17.9271V7.09375'
                      stroke='#383841'
                      strokeWidth='1.25'
                      strokeLinecap='round'
                    />
                  </g>
                </svg>
                <p className='font-genseki-body-s-bold text-figma-primary-950'>
                  入內參觀
                </p>
              </div>
            </div>
            <p className='font-genseki-body-l-regular text-figma-primary-950 mb-1'>
              {item.intro}
            </p>
            <p className='font-genseki-body-m-medium text-figma-secondary-950'>
              {item.note}
            </p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
})

ItineraryCarousel.displayName = 'ItineraryCarousel'

export default ItineraryCarousel
