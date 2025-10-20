import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { TItinerary } from '../config'
import styles from './styles.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type TItineraryActivityProps = {
  activityGroup: TItinerary['activity'][0]
  activityIndex: number
  openPlace: TItinerary['activity'][0]['place'][0] | null
  setOpenPlace: (place: TItinerary['activity'][0]['place'][0] | null) => void
}

const ItineraryActivity = ({
  activityGroup,
  activityIndex,
  openPlace,
  setOpenPlace,
}: TItineraryActivityProps) => {
  const { isMobile } = useMediaQuery()

  const handleToggle = (place: TItinerary['activity'][0]['place'][0]) => {
    if (openPlace === place) {
      setOpenPlace(null)
    } else {
      setOpenPlace(place)
    }
  }

  return (
    <div
      key={activityIndex}
      className={cn('flex max-xl:flex-col justify-between items-center max-xl:gap-y-[30px] xl:gap-x-[42px] py-[30px] px-4 xl:pt-12 xl:px-[152px] xl:pb-10', styles.gridBackground)}
    >
      <h4 className='xl:w-[571px] font-family-noto-serif text-2xl xl:text-[32px] font-bold leading-[1.2] xl:leading-[1.5] text-figma-secondary-500 text-center'>
        {activityGroup.title}
      </h4>
      <div className='w-full text-figma-primary-950 border-t border-b border-figma-secondary-500'>
        {activityGroup.place.map((place, placeIndex) => {
          const isLast = placeIndex === activityGroup.place.length - 1
          const hasContent = place.picture || place.intro

          return (
            <div
              key={placeIndex}
              className={`grid grid-cols-[273px_auto] xl:grid-cols-[530px_auto] p-2.5 ${!isLast ? 'border-b border-figma-secondary-500' : ''}`}
            >
              <div className='min-h-[30px] xl:min-h-9 flex items-center'>
                {place['zh-TW'] && (
                  <span className='font-family-genseki text-[20px] xl:text-2xl xl:font-medium leading-[1.5] xl:leading-[1.2]'>
                    {place['zh-TW']}
                  </span>
                )}
                {place.en && (
                  <span
                    className={`font-family-luxurious text-2xl xl:text-5xl tracking-[2.4px] xl:tracking-[4.8px] ${place['zh-TW'] ? 'ml-4' : ''}`}
                  >
                    {place.en}
                  </span>
                )}
              </div>
              {hasContent && (
                <div
                  className='flex items-end my-[8px] ml-[18px] mr-[5px] cursor-pointer group'
                  onClick={isMobile ? () => handleToggle(place) : undefined}
                  onMouseEnter={!isMobile ? () => setOpenPlace(place) : undefined}
                  onMouseLeave={!isMobile ? () => setOpenPlace(null) : undefined}
                >
                  <Image
                    src='/shared/icons/CTA-default.svg'
                    alt='arrow'
                    width={25}
                    height={9}
                    className='group-hover:hidden transition-all duration-200'
                  />
                  <Image
                    src='/shared/icons/CTA-hover.svg'
                    alt='arrow hover'
                    width={38}
                    height={9}
                    className='hidden group-hover:block transition-all duration-200'
                  />
                </div>
              )}
              {openPlace === place && (
                <div
                  className={cn(
                    'bg-figma-secondary-100 z-10',
                    isMobile
                      ? 'mt-2.5 w-[351px]'
                      : 'absolute w-[397px] top-[50%] right-[51px] translate-y-[-50%]',
                  )}
                >
                  {place.picture && (
                    <Image
                      src={place.picture}
                      alt={place['zh-TW'] || place.en}
                      width={isMobile ? 351 : 397}
                      height={isMobile ? 205 : 231}
                      className='object-cover rounded-2xl mb-7'
                    />
                  )}
                  {place.intro && (
                    <p className='font-family-genseki leading-[1.5] mx-2 max-xl:mb-[6px]'>
                      {place.intro}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ItineraryActivity
