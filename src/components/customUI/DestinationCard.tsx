import type { TDestinationCard } from '@/types/components'
import { cn } from '@/lib/utils'
import React from 'react'

// 默認提供克羅埃西亞範例
const DEFAULT_CROATIA_PATTERN = '/patterns/croatia.svg'

const DestinationCard = ({
  number,
  destination,
  englishName,
  countryPattern = DEFAULT_CROATIA_PATTERN,
  size = 'default',
  className,
  ...props
}: TDestinationCard) => {
  const containerClasses = cn(
    'bg-white box-border content-stretch flex flex-col gap-2.5 items-start bg-red-500 justify-start p-4 relative',
    size === 'default' ? 'size-full' : 'w-32 h-80',
    className,
  )

  return (
    <div className={containerClasses} {...props}>
      {/* 主要文字內容區域 */}
      <div className='basis-0 content-stretch flex flex-col gap-2 grow items-center justify-start leading-[0] min-h-px min-w-px relative shrink-0 text-[var(--color-figma-primary-950)] text-base text-nowrap'>
        {/* 編號 */}
        <div className="font-['var(--font-noto-serif-tc)',_sans-serif] font-medium relative shrink-0">
          <p className='leading-[1.5] text-nowrap whitespace-pre'>{number}</p>
        </div>
        {/* 目的地名稱 */}
        <div className="font-['var(--font-genseki-gothic)',_sans-serif] not-italic relative shrink-0">
          <p className='leading-[1.5] text-nowrap whitespace-pre'>
            {destination}
          </p>
        </div>
      </div>

      {/* 旋轉的英文標題 */}
      <div className='flex h-0 items-center justify-center relative shrink-0 w-0'>
        <div className='flex-none rotate-[270deg]'>
          <div className="flex flex-col font-['var(--font-luxurious-script)',_sans-serif] justify-center leading-[0] not-italic relative text-[var(--color-figma-primary-950)] text-2xl text-center text-nowrap tracking-[2.4px]">
            <p className='leading-none whitespace-pre'>{englishName}</p>
          </div>
        </div>
      </div>

      {/* 裝飾圖案 */}
      {countryPattern && (
        <div className='absolute bottom-0 box-border content-stretch flex gap-2.5 h-[311px] items-start justify-start left-[15px] p-px w-[107px]'>
          <div className='aspect-[91.0196/88.6128] basis-0 grow min-h-px min-w-px relative shrink-0'>
            <div className='absolute inset-[-0.26%_-0.24%_-0.2%_-0.27%]'>
              <img
                alt={`${destination} pattern`}
                className='block max-w-none size-full'
                src={countryPattern}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DestinationCard
