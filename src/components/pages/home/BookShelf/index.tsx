'use client'

import React, { useState, useRef, useEffect } from 'react'
import DestinationCard from '@/components/pages/home/DestinationCard/index'
import styles from './styles.module.css'
import { bookShelfData } from './config'

type TStyle = React.CSSProperties & {
  [key in `--${string}`]?: string | number
}

const BookShelf = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [startTranslate, setStartTranslate] = useState(0)
  const [minTranslate, setMinTranslate] = useState(0)
  const bookshelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleCardClick = (cardId: string) => {
    setActiveCardId(cardId)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('[data-destination-card]')) {
      return
    }

    if (!bookshelfRef.current || !trackRef.current) return
    const containerWidth = bookshelfRef.current.clientWidth
    const trackWidth = trackRef.current.scrollWidth
    const minT = Math.min(0, containerWidth - trackWidth)
    setMinTranslate(minT)
    setIsDragging(true)
    setStartX(e.pageX)
    setStartTranslate(translateX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const delta = e.pageX - startX
    const next = Math.max(minTranslate, Math.min(0, startTranslate + delta))
    setTranslateX(next)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [])

  const trackStyle: TStyle = {
    '--tx': `${translateX}px`,
  }

  return (
    <div className='w-full flex items-end lg:flex-[0_0_59.5%] lg:max-w-[1142.4px] min-w-0 lg:border-r lg:border-[var(--color-figma-secondary-500)]'>
      <div
        ref={bookshelfRef}
        className='relative overflow-hidden select-none cursor-grab active:cursor-grabbing'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className={styles.track} style={trackStyle}>
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
