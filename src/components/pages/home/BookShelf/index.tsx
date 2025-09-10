'use client'

import React, { useState, useMemo } from 'react'
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

  return (
    <div 
      className='w-full flex items-end lg:flex-[0_0_59.5%] lg:max-w-[1142.4px] min-w-0 lg:border-r lg:border-[var(--color-figma-secondary-500)]'
    >
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
