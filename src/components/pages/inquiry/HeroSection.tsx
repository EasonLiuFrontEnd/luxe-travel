'use client'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

export type THeroSectionProps = {
  className?: string
}

export const HeroSection = ({ className = '' }: THeroSectionProps) => {
  return (
    <div
      className={`content-stretch flex flex-col gap-2.5 items-start justify-start relative size-full border-none ${className}`}
    >
      <div className='h-[530px] overflow-clip rounded-tr-[16px] rounded-bl-[16px] border-none shrink-0 sticky top-0 w-full'>
        <div
          className={cn(
            'absolute bg-no-repeat h-[530px] left-0 top-0 w-full border-none',
            styles['hero-bg'],
          )}
        />
      </div>

      <div className='absolute translate-[-1px] bg-[var(--color-figma-secondary-100)] box-border content-stretch flex gap-4 items-center justify-center left-0 px-6 py-3 rounded-br-[16px]'>
        <div className="font-['Noto_Serif_TC',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#926d3c] text-[64px] text-nowrap">
          <p className='leading-[1.2] whitespace-pre'>立即諮詢</p>
        </div>
      </div>

      <div className='absolute bg-[var(--color-figma-secondary-100)] bottom-0 translate-[1px] box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 right-0 rounded-tl-[16px]'>
        <div className="font-['Noto_Serif_TC:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#383841] text-[24px] text-nowrap text-right">
          <p className='leading-[1.2] whitespace-pre'>
            為您客製化旅程，典藏精彩回憶
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
