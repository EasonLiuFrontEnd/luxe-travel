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
        'max-[374px]:pt-[168px] max-[374px]:px-[12px]'
      )}
      style={{ '--dynamic-padding': dynamicPadding } as React.CSSProperties}
    >
      <div className={cn(
        'z-10 sticky',
        'top-[123px] -mt-[250px]',
        'max-[374px]:top-[104px] max-[374px]:-mt-[192px]'
      )}>
        <h1 className={cn(
          'flex flex-col text-right',
          'font-noto-serif-h1-bold text-figma-neutral-950',
          'font-noto-serif-h3-bold' // 要下 max-[374px]:
        )}>
          <div className={cn(
            'self-end max-[374px]:self-start',
            'bg-figma-neutral-50 min-[375px]:rounded-es-2xl max-[374px]:rounded-ee-xl',
            'pt-[16px] pb-[4px] px-[16px]',
            'max-[374px]:pt-[12px] max-[374px]:px-[12px]'
          )}>
            歐洲自由行
          </div>
          <div
            className={cn(
              'self-end max-[374px]:self-start',
              'bg-figma-neutral-50 min-[375px]:rounded-bl-2xl',
              'pt-[4px] pb-[16px] px-[16px]',
              'max-[374px]:py-[4px] max-[374px]:px-[12px]',
              styles['concave-border-1']
            )}
          >
            精緻首選
          </div>
        </h1>
        <div className={cn(
          'flex flex-col',
          'font-genseki-h5-medium text-figma-primary-950',
          'font-genseki-body-m-medium' // 要下 max-[374px]:
        )}>
          <p
            className={cn(
              'self-end max-[374px]:self-start text-right',
              'bg-figma-neutral-50 max-[374px]:rounded-se-xl',
              'py-[4px] px-[16px]',
              'max-[374px]:py-[4px] max-[374px]:px-[12px]',
              styles['concave-border-2']
            )}
          >
            典藏旅遊30年經驗團隊服務
          </p>
          <p
            className={cn(
              'self-end max-[374px]:self-start',
              'bg-figma-neutral-50 min-[375px]:rounded-s-2xl max-[374px]:rounded-e-xl',
              'py-[10px] px-[16px]',
              'max-[374px]:pt-[4px] max-[374px]:pb-[12px] max-[374px]:px-[12px]',
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
        'h-[662px] max-[374px]:h-[460px]'
      )}>

        <div className={cn(
          'absolute bottom-0',
          'min-[375px]:left-0 max-[374px]:right-0'
        )}>
          <button
            className={cn(
              'flex items-center cursor-pointer',
              'bg-figma-neutral-50 min-[375px]:rounded-se-2xl max-[374px]:rounded-ss-xl',
              'font-noto-serif-h4-bold text-figma-secondary-950',
              'font-noto-serif-h5-bold', // 要下 max-[374px]:
              'py-[11px] px-[32px]',
              'max-[374px]:py-[8px] max-[374px]:px-[12px]',
              styles['concave-border-4'],
              styles['concave-border-5']
            )}
          >
            即刻預約 · 輕鬆啟程
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="38" viewBox="0 0 76 38" fill="none"
              className={cn(styles['arrow'], 'min-[375px]:block max-[374px]:hidden')}
            >
              <path d="M68.088 25.3333H29.0072V22.1666H56.4279L45.2549 15.6153L46.8568 12.8846L68.088 25.3333Z" fill="#926D3C" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="9" viewBox="0 0 25 9" fill="none"
              className={cn(styles['arrow'], 'max-[374px]:block min-[375px]:hidden m-[4px] ml-[12px]')}
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
