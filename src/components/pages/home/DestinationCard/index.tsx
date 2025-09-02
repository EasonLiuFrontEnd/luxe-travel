'use client'

import type { TBaseComponent } from '@/types'

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

  // 當 isActive 改變時，更新圖案顯示狀態
  useEffect(() => {
    setIsPatternVisible(isActive)
  }, [isActive])

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

  // 動態背景色
  const getBackgroundColor = () => {
    if (isActive) return 'bg-figma-secondary-300'
    return 'bg-white hover:bg-figma-secondary-100'
  }

  // 旋轉角度由外部 props containerClassName 控制
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
      {/* 主要文字內容區域 */}
      <div className='flex flex-col gap-3 items-center text-[var(--color-figma-primary-950)] pt-[16px]'>
        {/* 編號 */}
        <p className='font-family-noto-serif font-medium text-[16px] lg:text-[20px] lg:leading-[120%] tracking-[0%] lg:tracking-[8%]'>
          {number}
        </p>
        {/* 目的地名稱 */}
        <p className='font-family-genseki font-medium text-[16px] lg:text-[24px] lg:leading-[120%] tracking-[0px]'>
          {destination}
        </p>
      </div>

      {/* 旋轉的英文標題 */}
      <p className='absolute bottom-[16px] left-[16px] rotate-[270deg] origin-top-left font-family-luxurious text-[var(--color-figma-primary-950)] text-[24px] lg:text-[48px] tracking-[10%] leading-[100%] text-center whitespace-nowrap'>
        {englishName}
      </p>

      {/* 裝飾圖案 */}
      <Image
        alt={`${destination} pattern`}
        className={cn(
          styles.pattern,
          isPatternVisible ? styles.patternVisible : styles.patternHidden,
          patternContainerClassName,
        )}
        style={imageStyle}
        src={countryPattern || '/home/patterns/hr-croatia.svg'}
        width={182}
        height={533}
      />
    </div>
  )
}

export default DestinationCard
