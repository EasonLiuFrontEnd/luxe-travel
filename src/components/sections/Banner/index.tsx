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
      className={cn(
        'banner-dynamic-padding',
        'pt-[168px] px-[12px]',
        'xs:pt-[152px] xs:px-[48px]'
      )}
      style={{ '--dynamic-padding': dynamicPadding } as React.CSSProperties}
    >
      <div className={cn(
        'z-10 sticky',
        'top-[104px] -mt-[192px]',
        'xs:top-[123px] xs:-mt-[250px]'
      )}>
        <h1 className={cn(
          'flex flex-col text-right text-figma-neutral-950',
          'font-noto-serif-tc font-bold text-[40px] xs:text-[96px] leading-[1.2]'
        )}>
          <div className={cn(
            'self-end max-xs:self-start',
            'bg-figma-neutral-50 max-xs:rounded-ee-xl xs:rounded-es-2xl',
            'pt-[12px] pb-[4px] px-[12px]',
            'xs:pt-[16px] xs:px-[16px]'
          )}>
            歐洲自由行
          </div>
          <div
            className={cn(
              'self-end max-xs:self-start',
              'bg-figma-neutral-50 xs:rounded-bl-2xl',
              'py-[4px] px-[12px]',
              'xs:pt-[4px] xs:pb-[16px] xs:px-[16px]',
              styles['concave-border-1']
            )}
          >
            精緻首選
          </div>
        </h1>
        <div className={cn(
          'flex flex-col text-figma-primary-950',
          'font-genseki-gothic font-medium xs:text-[24px] text-[16px] xs:leading-[1.2] leading-[1.5]' // 手機版 xs:
        )}>
          <p
            className={cn(
              'self-end max-xs:self-start text-right',
              'bg-figma-neutral-50 max-xs:rounded-se-xl',
              'py-[4px] px-[12px]',
              'xs:py-[4px] xs:px-[16px]',
              styles['concave-border-2']
            )}
          >
            典藏旅遊30年經驗團隊服務
          </p>
          <p
            className={cn(
              'self-end max-xs:self-start',
              'bg-figma-neutral-50 max-xs:rounded-e-xl xs:rounded-s-2xl',
              'pt-[4px] pb-[12px] px-[12px]',
              'xs:py-[10px] xs:px-[16px]',
              styles['concave-border-3']
            )}
          >
            為您客製化旅程，典藏經典回憶
          </p>
        </div>
      </div>
      <div className={cn(
        'relative rounded-2xl',
        'bg-[url(/banner.jpg)] bg-cover bg-center',
        'h-[460px] xs:h-[662px]'
      )}>

        <div className='absolute bottom-0 max-xs:right-0 xs:left-0'>
          <button
            className={cn(
              'flex items-center cursor-pointer',
              'bg-figma-neutral-50 text-figma-secondary-950',
              'max-xs:rounded-ss-xl xs:rounded-se-2xl',
              'font-noto-serif-tc font-bold xs:text-[32px] xs:-[1.5] text-[24px] leading-[1.2]',
              'py-[8px] px-[12px]',
              'xs:py-[11px] xs:px-[32px]',
              styles['concave-border-4'],
              styles['concave-border-5']
            )}
          >
            即刻預約 · 輕鬆啟程
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="38" viewBox="0 0 76 38" fill="none"
              className={cn(styles['arrow'], 'hidden xs:block')}
            >
              <path d="M68.088 25.3333H29.0072V22.1666H56.4279L45.2549 15.6153L46.8568 12.8846L68.088 25.3333Z" fill="#926D3C" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="9" viewBox="0 0 25 9" fill="none"
              className={cn(styles['arrow'], 'block xs:hidden m-[4px] ml-[12px]')}
            >
              <path d="M24.6826 8.43115H0V6.43115H17.3184L10.2617 2.29346L11.2734 0.568848L24.6826 8.43115Z" fill="#926D3C" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
