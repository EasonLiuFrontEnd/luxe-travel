'use client'

import { useMemo } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import { APP_CONFIG } from '@/lib/config'
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
      className='min-h-screen banner-dynamic-padding pt-[152px] px-[48px]'
      style={{ '--dynamic-padding': dynamicPadding } as React.CSSProperties}
    >
      <div className='z-10 sticky top-[123px] -mt-[250px]'>
          <h1 className='flex flex-col text-right font-noto-serif-h1-bold text-figma-neutral-950'>
            <div className='self-end bg-figma-neutral-50 rounded-es-2xl pt-[16px] px-[16px] pb-[4px]'>
              歐洲自由行
            </div>
            <div
              className={cn(
                'self-end bg-figma-neutral-50 rounded-bl-2xl pt-[4px] px-[16px] pb-[16px]',
                styles['concave-border-1'],
              )}
            >
              精緻首選
            </div>
          </h1>
          <div className='font-genseki-h5-medium flex flex-col text-figma-primary-950'>
            <p
              className={cn(
                'self-end text-right bg-figma-neutral-50 py-[4px] px-[16px]',
                styles['concave-border-2'],
              )}
            >
              典藏旅遊30年經驗團隊服務
            </p>
            <p
              className={cn(
                'self-end bg-figma-neutral-50 rounded-s-2xl py-[10px] px-[16px]',
                styles['concave-border-3'],
              )}
            >
              為您客製化旅程，典藏經典回憶
            </p>
          </div>
        </div>
      <div className='relative h-[662px] bg-[url(/banner.jpg)] bg-cover bg-center rounded-2xl'>
        
        <div className={cn('absolute left-0 bottom-0 self-start')}>
          <button
            className={cn(
              'flex items-center rounded-se-xl font-noto-serif-h4-bold text-figma-secondary-950 bg-figma-neutral-50 py-[11px] px-[32px] cursor-pointer ',
              styles['concave-border-4'],
              styles['concave-border-5'],
            )}
          >
            即刻預約 · 輕鬆啟程
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="38" viewBox="0 0 76 38" fill="none" 
              className={styles['arrow']}
            >
              <path d="M68.088 25.3333H29.0072V22.1666H56.4279L45.2549 15.6153L46.8568 12.8846L68.088 25.3333Z" fill="#926D3C"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
