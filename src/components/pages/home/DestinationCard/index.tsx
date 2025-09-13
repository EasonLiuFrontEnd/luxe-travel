'use client'

import type { TBaseComponent } from '@/types'
import { booksApiMock } from '@/api/home/useBooks'

export type TDestinationCard = TBaseComponent & {
  number: string
  destination: string
  englishName: string
  countryPattern?: string
  size?: 'default' | 'compact'
  onClick?: () => void
  isActive?: boolean
  containerClassName?: string
  patternContainerClassName?: string
  patternTopOffset?: string
}
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

type TStyle = React.CSSProperties & {
  [key in `--${string}`]?: string | number
}

const DestinationCard = ({
  number,
  destination,
  englishName,
  countryPattern,
  className,
  onClick,
  isActive = false,
  containerClassName,
  patternContainerClassName,
  patternTopOffset,
  ...props
}: TDestinationCard) => {
  const [isPatternVisible, setIsPatternVisible] = useState(false)
  const [imageSrc, setImageSrc] = useState(
    countryPattern || '/home/itinerary/hr-croatia/pattern.svg',
  )

  useEffect(() => {
    setIsPatternVisible(isActive)
  }, [isActive])

  useEffect(() => {
    setImageSrc(countryPattern || '/home/itinerary/hr-croatia/pattern.svg')
  }, [countryPattern])

  const handleImageError = () => {
    if (imageSrc?.startsWith('http')) {
      const mockBook = booksApiMock.rows.find(
        (book) => book.title === destination,
      )
      if (mockBook?.imageUrl) {
        setImageSrc(mockBook.imageUrl)
      }
    }
  }

  const handleClick = () => {
    onClick?.()
  }

  const handleMouseEnter = () => {
    if (!isActive) {
      setIsPatternVisible(false)
    }
  }

  const handleMouseLeave = () => {
    if (!isActive) {
      setIsPatternVisible(false)
    }
  }

  const containerClasses = cn(
    'shrink-0 flex flex-col items-center justify-start relative cursor-pointer transition-all duration-300 overflow-hidden',
    className,
    containerClassName,
  )

  const getBackgroundColor = () => {
    if (isActive) return 'bg-figma-secondary-300'
    return 'bg-white hover:bg-figma-secondary-100'
  }

  const imageStyle: TStyle = {
    '--pattern-top': patternTopOffset || '20px',
  }

  return (
    <div
      className={cn(containerClasses, getBackgroundColor())}
      data-destination-card
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Image
        alt={`${destination} pattern`}
        className={cn(
          styles.pattern,
          isPatternVisible ? styles.patternVisible : styles.patternHidden,
          patternContainerClassName,
        )}
        style={imageStyle}
        src={imageSrc}
        width={182}
        height={533}
        onError={handleImageError}
      />

      <div className='flex flex-col gap-3 items-center text-[var(--color-figma-primary-950)] pt-[16px]'>
        <p className='font-family-noto-serif font-medium text-[16px] lg:text-[20px] lg:leading-[120%] tracking-[0%] lg:tracking-[8%]'>
          {number}
        </p>
        <p className='font-family-genseki font-medium text-[16px] lg:text-[24px] lg:leading-[120%] tracking-[0px]'>
          {destination}
        </p>
      </div>

      <p className='absolute bottom-[16px] left-[16px] rotate-[270deg] origin-top-left font-family-luxurious text-[var(--color-figma-primary-950)] text-[24px] lg:text-[48px] tracking-[10%] leading-[100%] text-center whitespace-nowrap'>
        {englishName}
      </p>
    </div>
  )
}

export default DestinationCard
