'use client'

export type TDestinationCard = {
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
  className?: string
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
  const [shouldRenderImage, setShouldRenderImage] = useState(false)

  useEffect(() => {
    setIsPatternVisible(isActive)
  }, [isActive])

  useEffect(() => {
    const isValidImage = Boolean(countryPattern?.startsWith('https://'))
    setShouldRenderImage(isValidImage)
  }, [countryPattern])

  const handleImageError = () => {
    setShouldRenderImage(false)
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
      {shouldRenderImage && countryPattern && (
        <Image
          key={`${destination}-pattern`}
          alt={`${destination} pattern`}
          className={cn(
            styles.pattern,
            isPatternVisible ? styles.patternVisible : styles.patternHidden,
            patternContainerClassName,
          )}
          style={imageStyle}
          src={countryPattern}
          width={182}
          height={533}
          onError={handleImageError}
        />
      )}

      <div className='flex flex-col gap-3 items-center text-[var(--color-figma-primary-950)] pt-[16px]'>
        <p className='font-family-noto-serif font-medium text-[16px] xl:text-[20px] xl:leading-[120%] tracking-[0%] xl:tracking-[8%]'>
          {number}
        </p>
        <p className='font-family-genseki font-medium text-[16px] xl:text-[24px] xl:leading-[120%] tracking-[0px]'>
          {destination}
        </p>
      </div>

      <p className='absolute bottom-[calc((1em*-1)+16px)] left-[16px] rotate-[270deg] origin-top-left font-family-luxurious text-[var(--color-figma-primary-950)] text-[24px] xl:text-[48px] tracking-[0.081em] leading-[100%] text-center whitespace-nowrap'>
        {englishName}
      </p>
    </div>
  )
}

export default DestinationCard
