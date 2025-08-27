'use client'

import { useMemo } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import { APP_CONFIG } from '@/lib/config'
import BannerButton from '../../customUI/BannerButton'
import type { TBanner } from '@/types/components'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

const Banner = ({ logoProgress: propLogoProgress }: TBanner) => {
  const { logoProgress: contextLogoProgress } = useScrollContext()

  const logoProgress = propLogoProgress ?? contextLogoProgress

  const dynamicPadding = useMemo(
    () =>
      `${APP_CONFIG.SCROLL.BANNER_HEIGHT * 0.1 + (1 - logoProgress) * APP_CONFIG.SCROLL.LOGO_TRANSITION_END * 0.2}px`,
    [logoProgress],
  )

  return (
    <div
      className='relative min-h-screen banner-dynamic-padding max-w-[76vw] m-auto'
      style={{ '--dynamic-padding': dynamicPadding } as React.CSSProperties}
    >
      <div className='z-10 sticky top-0'>
        <h1 className='flex flex-col text-right font-noto-serif-h1-bold text-figma-neutral-950'>
          <div className='self-end bg-figma-neutral-50 rounded-es-2xl pt-4 px-4 pb-1'>
            歐洲自由行
          </div>
          <div
            className={cn(
              'self-end bg-figma-neutral-50 rounded-bl-2xl pt-1 px-4 pb-4',
              styles['concave-border-1'],
            )}
          >
            精緻首選
          </div>
        </h1>
        <div className='font-genseki-h5-medium flex flex-col text-figma-primary-950'>
          <p
            className={cn(
              'self-end text-right bg-figma-neutral-50 py-1',
              styles['concave-border-2'],
            )}
          >
            典藏旅遊30年經驗團隊服務
          </p>
          <p
            className={cn(
              'self-end bg-figma-neutral-50 rounded-s-2xl py-[10px] px-4',
              styles['concave-border-3'],
            )}
          >
            為您客製化旅程，典藏經典回憶
          </p>
        </div>
      </div>
      <div className='relative h-[60vh] bg-[url(/banner.jpg)] bg-cover bg-center rounded-2xl'>
        <div className={cn('absolute left-0 bottom-0 self-start')}>
          <BannerButton
            variant='primary'
            size='3xl'
            className={cn(
              'flex items-center rounded-se-xl font-semibold text-[rgb(61,84,0)] bg-figma-neutral-50',
              styles['concave-border-4'],
              styles['concave-border-5'],
            )}
          >
            即刻預約 · 輕鬆啟程
            <img src='/bannerArrow.svg' alt='Banner Arrow' className='pl-5' />
          </BannerButton>
        </div>
      </div>
    </div>
  )
}

export default Banner
