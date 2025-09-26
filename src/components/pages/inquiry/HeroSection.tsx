'use client'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

export type THeroSectionProps = {
  className?: string
  topPosition?: string
}

export const HeroSection = ({
  className = '',
  topPosition = 'top-[-64px] xl:top-[-101px]',
}: THeroSectionProps) => {
  return (
    <div
      className={`h-[530px] overflow-clip rounded-[16px] content-stretch flex flex-col gap-2.5 items-start justify-start relative size-full border-none sticky ${topPosition} mb-7 ${className}`}
    >
      <div
        className={cn(
          'absolute bg-no-repeat h-[530px] left-0 top-0 w-full border-none',
          styles['hero-bg'],
        )}
      />

      <h2
        className='
          absolute left-0 translate-[-1px] px-4 py-3 xl:px-7 xl:py-4
          font-family-noto-serif text-[32px] xl:text-[64px] font-bold leading-[1.5] xl:leading-[1.2]
          text-figma-secondary-950 bg-figma-secondary-100
          rounded-br-[12px] xl:rounded-br-[16px]
        '
      >
        立即諮詢
      </h2>
      <p
        className='
          absolute bottom-0 right-0 translate-[1px] px-4 py-3 xl:px-7 xl:py-4
          font-family-noto-serif text-[16px] xl:text-[24px] font-semibold xl:font-bold leading-[1.5] xl:leading-[1.2]
          text-figma-primary-950 text-nowrap bg-figma-secondary-100
          rounded-tl-[12px] xl:rounded-tl-[16px]
        '
      >
        為您客製化旅程，典藏精彩回憶
      </p>
    </div>
  )
}

export default HeroSection
