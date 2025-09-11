'use client'

import React, { useState, useMemo, useEffect } from 'react'
import DestinationCard from '@/components/pages/home/DestinationCard/index'
import styles from './styles.module.css'
import { useBooks } from '@/api/home/useBooks'
import { transformBooksData } from './utils'

type TStyle = React.CSSProperties & {
  [key in `--${string}`]?: string | number
}

type TBookShelfProps = {
  trackRef?: React.RefObject<HTMLDivElement>
}

const BookShelf = ({ trackRef }: TBookShelfProps) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [showArrow, setShowArrow] = useState(false)
  const [isVerticalLayout, setIsVerticalLayout] = useState(false)

  const { query: booksQuery, mock } = useBooks()
  const {
    data: booksData,
    isLoading: isBooksLoading,
    error: booksError,
  } = booksQuery

  const displayData = useMemo(() => {
    if (booksError || !booksData) {
      return transformBooksData(mock.rows)
    }

    if (isBooksLoading) {
      return []
    }

    return transformBooksData(booksData)
  }, [booksError, booksData, isBooksLoading, mock.rows])

  const handleCardClick = (cardId: string) => {
    setActiveCardId(cardId)
  }

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
      const translateXMatch = currentTransform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/)
      const translateX = translateXMatch ? Math.abs(parseFloat(translateXMatch[1])) : 0
      
      setShowArrow(scrollLeft === 0 && translateX === 0)
    }

    const observer = new MutationObserver(() => {
      handleScroll()
    })

    observer.observe(trackElement, {
      attributes: true,
      attributeFilter: ['style']
    })

    handleScroll()

    return () => {
      observer.disconnect()
    }
  }, [trackRef, isVerticalLayout])

  return (
    <div 
      className='w-full flex items-end lg:flex-[0_0_59.5%] lg:max-w-[1142.4px] min-w-0 lg:border-r lg:border-[var(--color-figma-secondary-500)] relative'
    >
      {showArrow && (
        <div className='absolute top-[88px] right-[24px] z-10 bg-transparent border border-[var(--color-figma-secondary-500)] rounded-[41px] pt-3 px-4 pb-4 text-[var(--color-figma-primary-950)] transition-opacity duration-300 ease-out'>
          <svg
            className='w-[20px] h-[6px]'
            viewBox='0 0 25 9'
            fill='none'
          >
            <path
              d='M25.0029 8.5H0.320312V6.5H17.6387L10.582 2.3623L11.5938 0.637695L25.0029 8.5Z'
              fill='currentColor'
            />
          </svg>
        </div>
      )}
      <div className='relative overflow-hidden w-full bottom-[1px]'>
        <div ref={trackRef} className={styles.track}>
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
            } ${rotation} lg:[width:var(--w)] lg:[height:var(--h)]`

            return (
              <div
                key={id}
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
