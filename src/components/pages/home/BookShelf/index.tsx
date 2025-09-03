'use client'

import React, { useState } from 'react'
import DestinationCard from '@/components/pages/home/DestinationCard/index'
import styles from './styles.module.css'
import { bookShelfData } from './config'
import { useBookShelfScroll } from '@/hooks/useBookShelfScroll'

type TStyle = React.CSSProperties & {
  [key in `--${string}`]?: string | number
}

const BookShelf = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const { bookShelfRef, trackRef } = useBookShelfScroll()

  const handleCardClick = (cardId: string) => {
    setActiveCardId(cardId)
  }



  return (
    <div 
      ref={bookShelfRef}
      className='w-full flex items-end lg:flex-[0_0_59.5%] lg:max-w-[1142.4px] min-w-0 lg:border-r lg:border-[var(--color-figma-secondary-500)]'
    >
      <div className='relative overflow-hidden w-full'>
        <div ref={trackRef} className={styles.track}>
          {bookShelfData.map((card) => {
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
