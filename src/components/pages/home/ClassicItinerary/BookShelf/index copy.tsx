'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import DestinationCard from '../DestinationCard/index'
import styles from './styles.module.css'
import { useBooks } from '@/api/home/useBooks'
import { useSelectedCountry } from '@/hooks/useSelectedCountry'
import { transformBooksData } from './utils'

type TStyle = React.CSSProperties & {
  [key in `--${string}`]?: string | number
}

type TBookShelfProps = {
  trackRef?: React.RefObject<HTMLDivElement>
  bookShelfWrapperRef?: React.RefObject<HTMLDivElement>
  isMobile?: boolean
}

const BookShelf = ({
  trackRef,
  bookShelfWrapperRef,
  isMobile = false,
}: TBookShelfProps) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [showArrow, setShowArrow] = useState(false)
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const { query: booksQuery, mock } = useBooks()
  const {
    data: booksData,
    isLoading: isBooksLoading,
    error: booksError,
  } = booksQuery
  const { setSelectedCountryId } = useSelectedCountry()

  const displayData = useMemo(() => {
    if (booksError && process.env.NODE_ENV !== 'production') {
      return transformBooksData(mock.rows)
    }

    if (isBooksLoading) {
      return []
    }

    return transformBooksData(booksData || [])
  }, [booksError, booksData, isBooksLoading, mock.rows])

  const handleCardClick = (cardId: string) => {
    setActiveCardId(cardId)
    setSelectedCountryId(cardId)
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isMobile || !trackRef?.current) return
      setIsDragging(true)
      setStartX(e.pageX - trackRef.current.offsetLeft)
      setScrollLeft(trackRef.current.scrollLeft)
    },
    [isMobile, trackRef],
  )

  const handleMouseLeave = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseUp = useCallback(() => {
    if (isMobile) setIsDragging(false)
  }, [isMobile])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !isMobile || !trackRef?.current) return
      const x = e.pageX - trackRef.current.offsetLeft
      const walk = (x - startX) * 2
      trackRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, isMobile, startX, scrollLeft, trackRef],
  )

  useEffect(() => {
    const checkLayout = () => {
      const isMobileScreen = window.innerWidth < 1024
      setIsVerticalLayout(isMobileScreen)
    }

    checkLayout()
    window.addEventListener('resize', checkLayout)

    return () => {
      window.removeEventListener('resize', checkLayout)
    }
  }, [])

  useEffect(() => {
    const trackElement = trackRef?.current
    if (!trackElement || !isVerticalLayout) {
      setShowArrow(false)
      return
    }

    const handleScroll = () => {
      const scrollLeft = trackElement.scrollLeft || 0
      const currentTransform = trackElement.style.transform
      const translateXMatch = currentTransform.match(
        /translateX\((-?\d+(?:\.\d+)?)px\)/,
      )
      const translateX = translateXMatch
        ? Math.abs(parseFloat(translateXMatch[1]))
        : 0

      setShowArrow(scrollLeft === 0 && translateX === 0)
    }

    const observer = new MutationObserver(() => {
      handleScroll()
    })

    observer.observe(trackElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    handleScroll()

    return () => {
      observer.disconnect()
    }
  }, [trackRef, isVerticalLayout])

  return (
    <div
      ref={bookShelfWrapperRef}
      className='w-full xl:flex-[0_0_59.5%] xl:max-w-[1142.4px] min-w-0 xl:border-r xl:border-[var(--color-figma-secondary-500)] relative'
    >
      {showArrow && (
        <div className='absolute top-[88px] right-[24px] z-10 bg-transparent border border-[var(--color-figma-secondary-950)] rounded-[41px] pt-3 px-4 pb-4 text-[var(--color-figma-primary-950)] transition-opacity duration-300 ease-out'>
          <svg
            width='20'
            height='6'
            viewBox='0 0 25 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 6H0V8H1V7V6ZM21 7V8H24.6824L21.5058 6.13736L21 7ZM1 7V8H21V7V6H1V7ZM21 7L21.5058 6.13736L11.2733 0.137361L10.7674 1L10.2616 1.86264L20.4942 7.86264L21 7Z'
              fill='#926D3C'
            />
          </svg>
        </div>
      )}
      <div
        className={`relative w-full ${isMobile ? 'overflow-x-auto' : 'overflow-hidden'}`}
      >
        <div
          ref={trackRef}
          className={`${isMobile ? styles.trackMobile : styles.track} ${
            isDragging && isMobile
              ? 'cursor-grabbing'
              : isMobile
                ? 'cursor-grab'
                : ''
          } ${isMobile ? 'scroll-snap-type-x-mandatory select-none' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {displayData.map((card) => {
            const {
              id,
              number,
              destination,
              english,
              pattern,
              size,
              rotation,
              patternTopOffset,
              margin,
            } = card

            const containerStyle: TStyle = {
              '--w': size.web.width,
              '--h': size.web.height,
              '--book-margin-left': margin.left,
              '--book-margin-right': margin.right,
            }

            const cardClassName = `${
              size.mobileClassName
            } ${rotation} xl:[width:var(--w)] xl:[height:var(--h)]`

            return (
              <div
                key={id}
                data-book-container
                className={styles.bookContainer}
                style={containerStyle}
              >
                <DestinationCard
                  number={number}
                  destination={destination}
                  englishName={english}
                  countryPattern={pattern}
                  isActive={activeCardId === id}
                  onClick={() => handleCardClick(id)}
                  containerClassName={cardClassName}
                  patternTopOffset={patternTopOffset}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BookShelf
