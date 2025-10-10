import Image from 'next/image'
import type { TItinerary } from '../config'
import styles from './styles.module.css'

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
  return (
    <div
      key={activityIndex}
      className={`${styles.gridBackground} flex justify-between items-center gap-x-[42px] pt-12 px-[152px] pb-10`}
    >
      <h4 className='w-[571px] font-noto-serif-h4-bold text-figma-secondary-500 text-center'>
        {activityGroup.title}
      </h4>
      <div className='w-full text-figma-primary-950 border-t border-b border-figma-secondary-500'>
        {activityGroup.place.map((place, placeIndex) => {
          const isLast = placeIndex === activityGroup.place.length - 1
          const hasContent = place.picture || place.intro

          return (
            <div
              key={placeIndex}
              className={`grid grid-cols-[530px_auto] p-2.5 ${!isLast ? 'border-b border-figma-secondary-500' : ''}`}
            >
              <div className='flex items-center min-h-9'>
                {place['zh-TW'] && (
                  <span className='font-genseki-h5-medium'>
                    {place['zh-TW']}
                  </span>
                )}
                {place.en && (
                  <span
                    className={`font-luxurious-deco-regular ${place['zh-TW'] ? 'ml-4' : ''}`}
                  >
                    {place.en}
                  </span>
                )}
              </div>
              {hasContent && (
                <div
                  className='flex items-end my-[8px] ml-[18px] mr-[5px] cursor-pointer group'
                  onMouseEnter={() => setOpenPlace(place)}
                  onMouseLeave={() => setOpenPlace(null)}
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
                <div className='absolute w-[397px] top-[50%] right-[51px] translate-y-[-50%] bg-figma-neutral-50'>
                  {place.picture && (
                    <Image
                      src={place.picture}
                      alt={place['zh-TW'] || place.en}
                      width={397}
                      height={231}
                      className='object-cover rounded-2xl mb-7 h-[231px]'
                    />
                  )}
                  {place.intro && (
                    <p className='font-family-genseki leading-[1.5]'>
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
