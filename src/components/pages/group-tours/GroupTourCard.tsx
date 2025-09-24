'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import type { TBaseComponent } from '@/types'

type TTourDate = {
  date: string
  status: '已成團' | '熱銷中' | '已滿團'
}

type TGroupTourCardProps = TBaseComponent & {
  title: string
  subtitle: string
  description: string
  price: number
  tags: string[]
  dates: TTourDate[]
  imageIndex?: number
  onDetailsClick?: () => void
}

const GroupTourCard = ({
  title,
  subtitle,
  description,
  price,
  tags,
  dates,
  imageIndex = 1,
  onDetailsClick,
  className
}: TGroupTourCardProps) => {
  const getDateCardStyle = (status: string) => {
    if (status === '已滿團') {
      return {
        bgColor: 'bg-figma-primary-100',
        borderColor: 'border-figma-primary-300',
        textColor: 'text-figma-primary-500'
      }
    }
    return {
      bgColor: 'bg-[rgba(0,212,117,0.1)]',
      borderColor: 'border-[#0cf38b]',
      textColor: 'text-[#00d475]'
    }
  }

  const imageUrl = `/group-tours/${imageIndex}.jpg`
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false)

  const checkScrollEnd = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const isAtEnd = container.scrollLeft >= (container.scrollWidth - container.clientWidth - 5)
    setIsScrollAtEnd(isAtEnd)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScrollEnd()

    container.addEventListener('scroll', checkScrollEnd)
    return () => container.removeEventListener('scroll', checkScrollEnd)
  }, [])

  return (
    <div className={`group relative w-full max-w-[680px] xl:max-w-[900px] ${className || ''}`}>
      <div className='flex items-end relative isolate w-full'>
        <div className='hidden xl:block absolute bg-figma-secondary-500 z-[1] bottom-0 right-0 transition-all duration-300 group-hover:-translate-x-[40px] group-hover:-translate-y-[54px]
                      h-[237px] w-[calc(100%-136px)]' />

        <div
          className='hidden xl:flex bg-center bg-cover bg-no-repeat items-center overflow-hidden relative shrink-0 z-[3]
                     h-[272px] w-[204px] min-w-[204px]
                     transition-transform duration-300 group-hover:scale-[1.2] origin-bottom-left'
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className='bg-gradient-to-l from-[rgba(87,87,87,0.4)] to-[rgba(217,217,217,0.4)] via-[57.692%] via-[rgba(189,189,189,0.4)] h-full w-[10px] relative shrink-0'>
            <div className='absolute inset-0 border-l border-[rgba(146,109,60,0.2)]' />
          </div>
          <div className='flex-1 h-full bg-gradient-to-l from-[rgba(255,255,255,0.15)] to-[rgba(113,112,112,0.3)]' />

          <div
            className='absolute h-[17px] w-[64px]
                       top-[10px] xl:top-[13px] left-1/2 transform -translate-x-1/2'
          >
            <Image
              src="/group-tours/logo.png"
              alt="Logo"
              width={64}
              height={17}
              className='object-contain'
            />
          </div>

          <div
            className='absolute bottom-0 right-0
                       w-[80px] h-[53px] xl:w-[147px] xl:h-[98px]
                       xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300'
          >
            <div
              className='w-full h-full bg-gradient-to-tl from-figma-secondary-300 via-figma-secondary-200 to-transparent
                         relative overflow-hidden rounded-tl-[20px]'
            >
              <div className='absolute bottom-0 right-0 w-full h-full'>
                <div className='absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent border-b-figma-secondary-950' />
              </div>
            </div>
          </div>
        </div>

        <div
          className='flex-1 bg-white flex flex-col justify-between relative z-[2] min-w-0
                     xl:h-[255px] p-3 xl:pl-8 xl:pr-5 xl:py-5
                     transition-all duration-300 xl:group-hover:pl-10'
        >
          <div className='flex flex-col gap-3 xl:gap-2 w-full'>
            <div className='flex items-end xl:items-start xl:justify-between gap-3 xl:gap-2 w-full'>
              {/* 手機版書本 */}
              <div className='xl:hidden'>
                <div
                  className='bg-center bg-cover bg-no-repeat flex items-center overflow-hidden relative shrink-0 z-[3]
                             h-[193px] w-[145px] min-w-[145px]'
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className='bg-gradient-to-l from-[rgba(87,87,87,0.4)] to-[rgba(217,217,217,0.4)] via-[57.692%] via-[rgba(189,189,189,0.4)] h-full w-[10px] relative shrink-0'>
                    <div className='absolute inset-0 border-l border-[rgba(146,109,60,0.2)]' />
                  </div>
                  <div className='flex-1 h-full bg-gradient-to-l from-[rgba(255,255,255,0.15)] to-[rgba(113,112,112,0.3)]' />

                  <div className='absolute h-[17px] w-[64px] top-[10px] left-1/2 transform -translate-x-1/2'>
                    <Image
                      src="/group-tours/logo.png"
                      alt="Logo"
                      width={64}
                      height={17}
                      className='object-contain'
                    />
                  </div>

                  <div className='absolute bottom-0 right-0 w-[80px] h-[53px]'>
                    <div className='w-full h-full bg-gradient-to-tl from-figma-secondary-300 via-figma-secondary-200 to-transparent relative overflow-hidden rounded-tl-[20px]'>
                      <div className='absolute bottom-0 right-0 w-full h-full'>
                        <div className='absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent border-b-figma-secondary-950' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                  <div className='flex-1 flex items-start justify-between gap-3 xl:gap-2 min-w-0'>
                <div className='flex flex-col gap-0.5 text-figma-primary-950 flex-1 min-w-0'>
                  <div className='font-genseki-body-s-regular xl:font-genseki-body-m-regular max-h-[21px] xl:max-h-[24px] overflow-hidden truncate'>
                    {subtitle}
                  </div>
                  <div className='font-noto-serif-h5-bold truncate'>
                    {title}
                  </div>
                </div>
                <div className='flex items-end gap-1 text-figma-secondary-500 shrink-0'>
                  <div className='font-noto-serif-body-l-semibold xl:font-noto-serif-h5-bold whitespace-nowrap'>
                    ＄{price.toLocaleString()}
                  </div>
                  <div className='font-genseki-body-s-regular xl:font-genseki-body-m-regular'>起</div>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap gap-2'>
              {tags.slice(0, 3).map((tag, index) => (
                <div
                  key={index}
                  className='bg-figma-primary-500 px-1 py-0.5 rounded text-white font-genseki-body-s-regular xl:hidden'
                >
                  {tag}
                </div>
              ))}
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className='bg-figma-primary-500 px-1 py-0.5 rounded text-white font-genseki-body-s-regular hidden xl:block'
                >
                  {tag}
                </div>
              ))}
            </div>

            <div className='font-genseki-body-xs-regular text-figma-primary-950 line-clamp-2'>
              {description}
            </div>
          </div>

          <div className='bg-white flex items-center gap-1 w-full relative min-w-0'>
            <div
              ref={scrollContainerRef}
              className='flex-1 flex gap-2 items-center overflow-x-auto relative min-w-0 scroll-smooth hide-scrollbar'
            >
              {dates.slice(0, 8).map((dateItem, index) => {
                const styles = getDateCardStyle(dateItem.status)
                return (
                  <div key={index} className='flex flex-col items-center rounded w-[84px] shrink-0 relative z-[2]'>
                    <div
                      className={`${styles.bgColor} border-b ${styles.borderColor} flex items-center justify-center px-3 py-1 rounded-t w-full`}
                    >
                      <div className={`font-noto-serif-body-m-medium ${styles.textColor}`}>
                        {dateItem.date}
                      </div>
                    </div>
                    <div
                      className={`${styles.bgColor} flex items-center justify-center px-2 py-0.5 rounded-b w-full z-[1]`}
                    >
                      <div className={`font-genseki-body-s-regular ${styles.textColor}`}>
                        {dateItem.status}
                      </div>
                    </div>
                  </div>
                )
              })}

              {!isScrollAtEnd && (
                <div className='absolute right-0 top-0 w-[150px] h-full bg-gradient-to-r from-transparent to-white pointer-events-none transition-opacity duration-300' />
              )}
            </div>

            {!isScrollAtEnd && (
              <button
                onClick={onDetailsClick}
                className='border border-figma-secondary-950 rounded-full px-3 py-2 flex items-center justify-center shrink-0 hover:bg-figma-secondary-50 transition-all duration-300'
              >
              <div className='w-5 h-1.5 relative'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <svg width="20" height="6" viewBox="0 0 20 6" fill="none">
                    <path d="M1 3H19M19 3L16 1M19 3L16 5" stroke="#926d3c" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default GroupTourCard