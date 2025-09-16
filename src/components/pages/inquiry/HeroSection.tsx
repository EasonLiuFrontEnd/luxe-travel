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
      <div className='h-[530px] overflow-clip rounded-[16px] shrink-0 sticky top-0 w-full'>
        <div
          className={cn(
            'absolute bg-no-repeat h-[530px] left-0 top-0 w-full border-none',
            styles['hero-bg'],
          )}
        />
      </div>

      <h2 className='absolute left-0 translate-[-1px] font-noto-serif-h2-bold text-figma-secondary-950 shrink-0 text-nowrap bg-figma-secondary-100 px-[24px] py-[12px] rounded-br-[16px] box-border'>
        立即諮詢
      </h2>

      <p className='absolute bottom-0 right-0 translate-[1px] font-noto-serif-h5-bold text-figma-primary-950 text-nowrap bg-figma-secondary-100 px-[24px] py-[12px] rounded-tl-[16px] box-border'>
        為您客製化旅程，典藏精彩回憶
      </p>
    </div>
  )
}

export default HeroSection
