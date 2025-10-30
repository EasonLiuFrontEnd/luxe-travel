import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { TItineraryAttraction } from '@/api/tour-content'
import styles from './styles.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type TItineraryActivityProps = {
  attractions: TItineraryAttraction[]
  openPlace: TItineraryAttraction | null
  setOpenPlace: (place: TItineraryAttraction | null) => void
}

const ItineraryActivity = ({
  attractions,
  openPlace,
  setOpenPlace,
}: TItineraryActivityProps) => {
  const { isMobile } = useMediaQuery()

  const handleToggle = (attraction: TItineraryAttraction) => {
    if (openPlace?.id === attraction.id) {
      setOpenPlace(null)
    } else {
      setOpenPlace(attraction)
    }
  }

  if (!attractions || attractions.length === 0) {
    return null
  }

  const visitType = attractions[0].visitType
  const visitTypeLabel =
    visitType === 'INSIDE'
      ? '入內參觀'
      : visitType === 'OUTSIDE'
        ? '下車參觀'
        : visitType === 'PHOTO'
          ? '拍照打卡'
          : visitType === 'SELF_PAY'
            ? '自費參觀'
            : visitType === 'FREE'
              ? '免費參觀'
              : '車覽'

  return (
    <div
      className={cn(
        'flex max-xl:flex-col justify-between items-center max-xl:gap-y-[30px] xl:gap-x-[42px] py-[30px] px-4 xl:pt-12 xl:px-[152px] xl:pb-10',
        styles.gridBackground,
      )}
    >
      <h4 className='xl:w-[571px] font-family-noto-serif text-2xl xl:text-[32px] font-bold leading-[1.2] xl:leading-[1.5] text-figma-secondary-500 text-center'>
        {visitTypeLabel}
      </h4>
      <div className='w-full text-figma-primary-950 border-t border-b border-figma-secondary-500'>
        {attractions.map((attraction) => {
          const hasContent =
            attraction.attraction.imageUrl || attraction.attraction.content
          return (
            <div
              key={attraction.id}
              className='group grid grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[530px_auto] p-2.5 border-b border-figma-secondary-500 last:border-b-0 cursor-pointer'
              onClick={isMobile ? () => handleToggle(attraction) : undefined}
              onMouseEnter={
                !isMobile ? () => setOpenPlace(attraction) : undefined
              }
              onMouseLeave={!isMobile ? () => setOpenPlace(null) : undefined}
            >
              <div className='min-h-[30px] xl:min-h-9 flex items-center'>
                <span className='font-family-genseki text-[20px] xl:text-2xl xl:font-medium leading-[1.5] xl:leading-[1.2]'>
                  {attraction.attraction.nameZh}
                </span>
                {attraction.attraction.nameEn && (
                  <span className='font-family-luxurious text-2xl xl:text-5xl tracking-[2.4px] xl:tracking-[4.8px] ml-4'>
                    {attraction.attraction.nameEn}
                  </span>
                )}
              </div>
              {hasContent && (
                <div className='flex items-end my-[8px] ml-[18px] mr-[18px]'>
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
              {openPlace?.id === attraction.id && (
                <div
                  className={cn(
                    'bg-figma-secondary-100 z-10',
                    isMobile
                      ? 'mt-2.5 w-[351px]'
                      : 'absolute w-[397px] top-[50%] right-[51px] translate-y-[-50%]',
                  )}
                >
                  {attraction.attraction.imageUrl && (
                    <Image
                      src={attraction.attraction.imageUrl}
                      alt={attraction.attraction.nameZh}
                      width={397}
                      height={231}
                      className='box-content w-full h-[205px] xl:h-[231px] object-cover rounded-2xl mb-7'
                    />
                  )}
                  {attraction.attraction.content && (
                    <p className='font-family-genseki leading-[1.5] mx-2 max-xl:mb-[6px]'>
                      {attraction.attraction.content}
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
