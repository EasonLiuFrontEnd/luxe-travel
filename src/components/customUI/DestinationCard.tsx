"use client"

import type { TDestinationCard } from '@/types/components'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

// 圖示映射表
const PATTERN_MAP = {
  croatia: '/patterns/hr-croatia.svg',
  italy: '/patterns/it-italy.svg',
  france: '/patterns/fr-france.svg',
  germany: '/patterns/de-germany.svg',
  spain: '/patterns/es-spain.svg',
  greece: '/patterns/gr-greece.svg',
  uk: '/patterns/gb-uk.svg',
  ireland: '/patterns/ie-ireland.svg',
  netherlands: '/patterns/nl-netherlands.svg',
  belgium: '/patterns/be-belgium.svg',
  austria: '/patterns/at-austria.svg',
  switzerland: '/patterns/ch-switzerland.svg',
  czech: '/patterns/cz-czech.svg',
  hungary: '/patterns/hu-hungary.svg',
  baltic: '/patterns/baltic-states.svg',
  portugal: '/patterns/pt-portugal.svg',
  luxembourg: '/patterns/lu-luxembourg.svg',
  nordic: '/patterns/nordic-countries.svg',
} as const

const DestinationCard = ({
  number,
  destination,
  englishName,
  countryPattern,
  size = 'default',
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
  React.useEffect(() => {
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

  return (
    <div 
      className={cn(
        containerClasses, 
        getBackgroundColor(),
      )} 
      data-destination-card
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* 主要文字內容區域 */}
      <div className='flex flex-col gap-3 items-center text-[var(--color-figma-primary-950)] pt-[16px]'>
        {/* 編號 */}
        <p className="font-family-noto-serif font-medium text-[16px] lg:text-[20px] lg:leading-[120%] tracking-[0%] lg:tracking-[8%]">{number}</p>
        {/* 目的地名稱 */}
        <p className="font-family-genseki font-medium text-[16px] lg:text-[24px] lg:leading-[120%] tracking-[0px]">{destination}</p>
      </div>

      {/* 旋轉的英文標題 */}
      <p className="absolute bottom-[16px] left-[16px] rotate-[270deg] origin-top-left font-family-luxurious text-[var(--color-figma-primary-950)] text-[24px] lg:text-[48px] tracking-[10%] leading-[100%] text-center whitespace-nowrap">
        {englishName}
      </p>

      {/* 裝飾圖案 */}
      <img
        alt={`${destination} pattern`}
        className={cn(
          'max-w-none absolute left-[15px] w-[107px] h-[311px]',
          'lg:w-[182px] lg:h-[533px]',
          'top-[var(--pattern-top)]',
          'transition-all duration-500 ease-in-out',
          isPatternVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          patternContainerClassName,
        )}
        style={{ ['--pattern-top' as any]: patternTopOffset || '20px' }}
        src={countryPattern || '/patterns/hr-croatia.svg'} width={182} height={533}
      />
    </div>
  )
}

export default DestinationCard
