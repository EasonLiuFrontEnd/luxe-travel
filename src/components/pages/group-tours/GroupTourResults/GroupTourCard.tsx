'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RightOnlyFlipBook } from '@/components/ui/RightOnlyFlipBook'
import type { TBaseComponent, TFlipBookPage } from '@/types'
import styles from './style.module.css'
import type { TTourDate } from '../config'

type TGroupTourCardProps = TBaseComponent & {
  title: string
  subtitle: string
  description: string
  price: number
  tags: string[]
  dates: TTourDate[]
  mainImageUrl: string
  onDetailsClick?: () => void
}

const GroupTourCard = ({
  title,
  subtitle,
  description,
  price,
  tags,
  dates,
  mainImageUrl,
  onDetailsClick,
  className,
}: TGroupTourCardProps) => {
  const getDateCardStyle = (status: string) => {
    if (status === '已滿團') {
      return {
        bgColor: 'bg-figma-primary-100',
        borderColor: 'border-figma-primary-300',
        textColor: 'text-figma-primary-500',
        hoverBg: 'group-hover/date:bg-[rgba(238,238,240,1)]',
        cardHoverBorder:
          'group-hover/date:border group-hover/date:border-[rgba(183,184,194,1)]',
      }
    }
    return {
      bgColor: 'bg-[rgba(0,212,117,0.1)]',
      borderColor: 'border-[#0cf38b]',
      textColor: 'text-[#00d475]',
      hoverBg: 'group-hover/date:bg-[rgba(0,212,117,0.2)]',
      cardHoverBorder:
        'group-hover/date:border group-hover/date:border-[rgba(12,243,139,1)]',
    }
  }

  const imageUrl = mainImageUrl
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 創建翻頁書頁面
  const flipBookPages: TFlipBookPage[] = [
    {
      id: 'cover',
      pageNumber: '',
      pageContentClassName: 'h-full w-full',
      content: (
        <div className='relative h-full w-full'>
          <div
            className='h-full w-full bg-center bg-cover bg-no-repeat flex items-center relative'
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className='bg-gradient-to-l from-[rgba(87,87,87,0.4)] to-[rgba(217,217,217,0.4)] via-[57.692%] via-[rgba(189,189,189,0.4)] h-full w-[10px] relative shrink-0'>
              <div className='absolute inset-0 border-l border-[rgba(146,109,60,0.2)]' />
            </div>
            <div className='flex-1 h-full bg-gradient-to-l from-[rgba(255,255,255,0.15)] to-[rgba(113,112,112,0.3)]' />

            <div className='absolute h-[17px] w-[64px] top-[10px] xl:top-[13px] left-1/2 transform -translate-x-1/2'>
              <Image
                src='/group-tours/logo.png'
                alt='Logo'
                width={64}
                height={17}
                className='object-contain'
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'content',
      pageNumber: '',
      pageContentClassName: 'h-full w-full',
      content: (
        <div />
      )
    }
  ]
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const checkScrollEnd = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const isAtEnd =
      container.scrollLeft >= container.scrollWidth - container.clientWidth - 5
    setIsScrollAtEnd(isAtEnd)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    checkScrollEnd()

    container.addEventListener('scroll', checkScrollEnd)
    return () => container.removeEventListener('scroll', checkScrollEnd)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    setIsDragging(true)
    setStartX(e.pageX - container.offsetLeft)
    setScrollLeft(container.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return

    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div
      className={cn(
        'group relative w-full max-w-[680px] xl:max-w-[900px]',
        styles.foldedCornerHolder, className,
      )}
    >
      <div className='flex items-end relative isolate w-full'>
        <div className='hidden xl:block xl:w-[245px] xl:h-[326px] xl:bg-figma-neutral-50 relative shrink-0 z-[1] transition-transform duration-300 origin-bottom-left cursor-pointer'>
          <RightOnlyFlipBook
            pages={flipBookPages}
            width={245}
            height={326}
            showCover={false}
            enableBackwardFlip={false}
            onFlip={onDetailsClick}
          />
        </div>

        <div className='relative flex flex-1 min-w-0'>
          <div className='hidden xl:block absolute bg-figma-secondary-500 bottom-0 right-0 transition-all duration-300 group-hover:-translate-x-[40px] group-hover:-translate-y-[36px] h-full w-full' />

          <div className='xl:bg-white flex flex-col justify-between w-full min-w-0 relative xl:gap-7 xl:pl-8 xl:pr-5 xl:py-5 transition-all duration-300'>
            <div className='flex flex-col xl:gap-3 w-full'>
              <div className='flex items-end xl:items-start xl:justify-between w-full'>
                <div className={cn('xl:hidden relative cursor-pointer', styles.foldedCornerMobile)} onClick={onDetailsClick}>
                  <div
                    className='bg-center bg-cover bg-no-repeat flex items-center relative shrink-0 h-[193px] w-[145px] min-w-[145px]'
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    <div className='bg-gradient-to-l from-[rgba(87,87,87,0.4)] to-[rgba(217,217,217,0.4)] via-[57.692%] via-[rgba(189,189,189,0.4)] h-full w-[10px] relative shrink-0'>
                      <div className='absolute inset-0 border-l border-[rgba(146,109,60,0.2)]' />
                    </div>
                    <div className='flex-1 h-full bg-gradient-to-l from-[rgba(255,255,255,0.15)] to-[rgba(113,112,112,0.3)]' />

                    <div className='absolute h-[17px] w-[64px] top-[10px] left-1/2 transform -translate-x-1/2'>
                      <Image
                        src='/group-tours/logo.png'
                        alt='Logo'
                        width={64}
                        height={17}
                        className='object-contain'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex-1 flex relative min-w-0'>
                  <div className='xl:hidden absolute z-[-1] bg-figma-secondary-500 bottom-0 right-0 transition-all duration-300 -translate-x-[16px] -translate-y-[22px] h-full w-full' />

                  <div className='flex flex-col xl:flex-row xl:items-start justify-between gap-4 xl:gap-3 p-4 xl:p-0 w-full bg-figma-primary-0 xl:bg-transparent'>
                    <div className='flex flex-col gap-1 text-figma-primary-950 flex-1 min-w-0'>
                      <div className='font-genseki-body-s-regular xl:font-genseki-body-m-regular max-h-[21px] xl:max-h-[24px] overflow-hidden truncate'>
                        {subtitle}
                      </div>
                      <div className='font-noto-serif-h5-bold truncate'>
                        {title}
                      </div>
                    </div>
                    <div className='flex items-end gap-1 text-figma-secondary-500 shrink-0'>
                      <div className='whitespace-nowrap font-noto-serif-body-l-semibold xl:font-noto-serif-h5-bold'>
                        ＄{price.toLocaleString()}
                      </div>
                      <div className='font-genseki-body-s-regular xl:font-genseki-body-m-regular'>
                        起
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-3 p-4 xl:p-0 bg-figma-primary-0 xl:bg-transparent'>
                <div className='flex flex-wrap gap-3'>
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className='bg-figma-primary-500 px-2 py-1 text-white font-genseki-body-s-regular'
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className='font-genseki-body-xs-regular text-figma-primary-950 line-clamp-4 xl:line-clamp-2'>
                  {description}
                </div>
              </div>
            </div>

            <div className='bg-figma-primary-0 flex justify-between items-center gap-1 w-full relative p-4 xl:p-0'>
              <div
                ref={scrollContainerRef}
                className={`flex gap-3 items-center overflow-x-scroll scroll-smooth hide-scrollbar select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {dates.slice(0, 8).map((dateItem, index) => {
                  const cardStyles = getDateCardStyle(dateItem.status)
                  return (
                    <div
                      key={index}
                      className={cn(
                        'group/date flex flex-col items-center rounded w-[84px] shrink-0 relative cursor-pointer transition-all duration-300',
                        dateItem.status === '已滿團'
                          ? styles.dateCardSoldOut
                          : styles.dateCardAvailable,
                      )}
                    >
                      <div
                        className={`${cardStyles.bgColor} ${cardStyles.hoverBg} border-b ${cardStyles.borderColor} flex items-center justify-center px-3 py-1 rounded-t w-full transition-all duration-300`}
                      >
                        <div
                          className={`font-noto-serif-body-m-medium ${cardStyles.textColor} transition-all duration-300`}
                        >
                          {dateItem.date}
                        </div>
                      </div>
                      <div
                        className={`${cardStyles.bgColor} ${cardStyles.hoverBg} flex items-center justify-center px-2 py-0.5 rounded-b w-full transition-all duration-300`}
                      >
                        <div
                          className={`font-genseki-body-s-regular ${cardStyles.textColor} transition-all duration-300`}
                        >
                          {dateItem.status}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {!isScrollAtEnd && (
                  <div className='absolute right-[50px] xl:right-[38px] top-0 w-[150px] h-full bg-gradient-to-r from-transparent to-white pointer-events-none transition-opacity duration-300' />
                )}
              </div>

              {!isScrollAtEnd && (
                <button
                  className='border border-figma-secondary-950 rounded-full px-3 pt-2 pb-3 flex items-center justify-center shrink-0'
                >
                  <div className='w-[20px] h-[6px] relative'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <svg
                        width='25'
                        height='9'
                        viewBox='0 0 25 9'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M1 6.5H0V8.5H1V7.5V6.5ZM21 7.5V8.5H24.6824L21.5058 6.63736L21 7.5ZM1 7.5V8.5H21V7.5V6.5H1V7.5ZM21 7.5L21.5058 6.63736L11.2733 0.637361L10.7674 1.5L10.2616 2.36264L20.4942 8.36264L21 7.5Z'
                          fill='#926D3C'
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupTourCard
