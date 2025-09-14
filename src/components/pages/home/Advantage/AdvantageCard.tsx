'use client'

import type { TBaseComponent } from '@/types'
import type { TAdvantages } from '@/api/type'
import styles from './styles.module.css'

type TAdvantageCardProps = TBaseComponent & {
  card: TAdvantages & { gradientOverlay: string }
  className?: string
}

const AdvantageCard = ({ card, className }: TAdvantageCardProps) => {
  return (
    <div className={`content-stretch flex flex-col h-[480px] items-start justify-between overflow-hidden relative rounded-xl shrink-0 ${className || ''}`}>
      {/* 背景圖層 - 模糊效果 */}
      <div
        className={`absolute -inset-3 bg-center bg-cover bg-no-repeat ${styles.blurredBackground}`}
        style={{ backgroundImage: `url('${card.imageUrl}')` }}
      />

      {/* 前景圖層 - 漸層遮罩 */}
      <div
        className={`absolute inset-0 bg-center bg-cover bg-no-repeat ${styles.gradientMask}`}
        style={{ backgroundImage: `url('${card.imageUrl}')` }}
      />
      {/* 標題區域 */}
      <div className='bg-figma-secondary-100 box-border content-stretch flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-br-xl shrink-0 z-10'>
        <h3 className='font-family-noto-serif font-bold text-[24px] leading-[1.2] text-figma-primary-950 text-nowrap'>
          {card.title}
        </h3>
      </div>

      {/* 內容區域 */}
      <div className='box-border content-stretch flex flex-col gap-10 items-start justify-start pb-6 pt-8 px-6 relative shrink-0 w-full z-10'>
        <div className='flex flex-col font-family-genseki justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[20px] text-white'>
          <p className='leading-[1.5]'>{card.content}</p>
        </div>
      </div>
    </div>
  )
}

export default AdvantageCard