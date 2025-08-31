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
        'pt-[152px] px-[48px]',
        'max-xs:pt-[168px] max-xs:px-[12px]'
      )}
      style={{ '--dynamic-padding': dynamicPadding } as React.CSSProperties}
    >
      <div className={cn(
        'z-10 sticky',
        'top-[123px] -mt-[250px]',
        'max-xs:top-[104px] max-xs:-mt-[192px]'
      )}>
        <h1 className={cn(
          'flex flex-col text-right text-figma-neutral-950',
          'xs:font-noto-serif-h1-bold max-xs:font-noto-serif-h3-bold'
        )}>
          <div className={cn(
            'self-end max-xs:self-start',
            'bg-figma-neutral-50 xs:rounded-es-2xl max-xs:rounded-ee-xl',
            'pt-[16px] pb-[4px] px-[16px]',
            'max-xs:pt-[12px] max-xs:px-[12px]'
          )}>
            歐洲自由行
          </div>
          <div
            className={cn(
              'self-end max-xs:self-start',
              'bg-figma-neutral-50 xs:rounded-bl-2xl',
              'pt-[4px] pb-[16px] px-[16px]',
              'max-xs:py-[4px] max-xs:px-[12px]',
              styles['concave-border-1']
            )}
          >
            精緻首選
          </div>
        </h1>
        <div className={cn(
          'flex flex-col text-figma-primary-950',
          'xs:font-genseki-h5-medium max-xs:font-genseki-body-m-medium' // 手機版 xs:
        )}>
          <p
            className={cn(
              'self-end max-xs:self-start text-right',
              'bg-figma-neutral-50 max-xs:rounded-se-xl',
              'py-[4px] px-[16px]',
              'max-xs:py-[4px] max-xs:px-[12px]',
              styles['concave-border-2']
            )}
          >
            典藏旅遊30年經驗團隊服務
          </p>
          <p
            className={cn(
              'self-end max-xs:self-start',
              'bg-figma-neutral-50 xs:rounded-s-2xl max-xs:rounded-e-xl',
              'py-[10px] px-[16px]',
              'max-xs:pt-[4px] max-xs:pb-[12px] max-xs:px-[12px]',
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
        'h-[662px] max-xs:h-[460px]'
      )}>

        <div className={cn(
          'absolute bottom-0',
          'xs:left-0 max-xs:right-0'
        )}>
          <button
            className={cn(
              'flex items-center cursor-pointer',
              'bg-figma-neutral-50 text-figma-secondary-950',
              'xs:rounded-se-2xl max-xs:rounded-ss-xl',
              'xs:font-noto-serif-h4-bold max-xs:font-noto-serif-h5-bold', // 手機版 xs:
              'py-[11px] px-[32px]',
              'max-xs:py-[8px] max-xs:px-[12px]',
              styles['concave-border-4'],
              styles['concave-border-5']
            )}
          >
            即刻預約 · 輕鬆啟程
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="38" viewBox="0 0 76 38" fill="none"
              className={cn(styles['arrow'], 'xs:block max-xs:hidden')}
            >
              <path d="M68.088 25.3333H29.0072V22.1666H56.4279L45.2549 15.6153L46.8568 12.8846L68.088 25.3333Z" fill="#926D3C" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="9" viewBox="0 0 25 9" fill="none"
              className={cn(styles['arrow'], 'max-xs:block xs:hidden m-[4px] ml-[12px]')}
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
