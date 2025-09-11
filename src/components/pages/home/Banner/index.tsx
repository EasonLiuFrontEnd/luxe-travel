'use client'

import { useMemo } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import { APP_CONFIG } from '@/lib/config'
import type { TBaseComponent } from '@/types'

export type TBanner = TBaseComponent & {
  logoProgress?: number
}
import { cn } from '@/lib/utils'
import BannerCarousel from './BannerCarousel'
import styles from './styles.module.css'
import AirplaneIcon from '@/components/shared/icons/banner/AirplaneIcon'
import Image from 'next/image'

const Banner = ({ logoProgress: propLogoProgress }: TBanner) => {
  const { logoProgress: contextLogoProgress } = useScrollContext()

  const logoProgress = propLogoProgress ?? contextLogoProgress

  const dynamicPadding = useMemo(
    () =>
      `${APP_CONFIG.SCROLL.BANNER_HEIGHT * 0.1 + (1 - logoProgress) * APP_CONFIG.SCROLL.LOGO_TRANSITION_END * 0.2}px`,
    [logoProgress],
  )

  return (
    <>
      <div
        className={cn(
          'banner-dynamic-padding',
          'pt-[168px] px-[12px]',
          'lg:pt-[152px] lg:px-[48px]',
        )}
        style={{ '--dynamic-padding': dynamicPadding } as React.CSSProperties}
      >
        <div
          className={cn(
            'z-10 sticky',
            'top-[104px] -mt-[192px]',
            'lg:top-[123px] lg:-mt-[250px]',
          )}
        >
          <h1
            className={cn(
              'flex flex-col text-right text-figma-neutral-950',
              'font-noto-serif-tc font-bold text-[40px] lg:text-[96px] leading-[1.2]',
            )}
          >
            <div
              className={cn(
                'self-end max-lg:self-start',
                'bg-figma-neutral-50 max-lg:rounded-ee-xl lg:rounded-es-2xl',
                'pt-[12px] pb-[4px] px-[12px]',
                'lg:pt-[16px] lg:px-[16px]',
              )}
            >
              歐洲自由行
            </div>
            <div
              className={cn(
                'self-end max-lg:self-start',
                'bg-figma-neutral-50 lg:rounded-bl-2xl',
                'py-[4px] px-[12px]',
                'lg:pt-[4px] lg:pb-[16px] lg:px-[16px]',
                styles['concave-border-1'],
              )}
            >
              精緻首選
            </div>
          </h1>
          <div
            className={cn(
              'flex flex-col text-figma-primary-950',
              'font-genseki-gothic font-medium lg:text-[24px] text-[16px] lg:leading-[1.2] leading-[1.5]',
            )}
          >
            <p
              className={cn(
                'self-end max-lg:self-start text-right',
                'bg-figma-neutral-50 max-lg:rounded-se-xl',
                'py-[4px] px-[12px]',
                'lg:py-[4px] lg:px-[16px]',
                styles['concave-border-2'],
              )}
            >
              典藏旅遊30年經驗團隊服務
            </p>
            <p
              className={cn(
                'self-end max-lg:self-start',
                'bg-figma-neutral-50 max-lg:rounded-e-xl lg:rounded-s-2xl',
                'pt-[4px] pb-[12px] px-[12px]',
                'lg:py-[10px] lg:px-[16px]',
                styles['concave-border-3'],
              )}
            >
              為您客製化旅程，典藏經典回憶
            </p>
          </div>
        </div>
        <BannerCarousel
          images={['/home/banners/banner.jpg', '/home/banners/banner2.jpg']}
          autoPlayInterval={10000}
        />
      </div>
      <div className='flex justify-end w-full px-[48px]'>
        <AirplaneIcon className='max-lg:hidden'/>
        <Image
          src='/home/banners/slogan.svg'
          alt='slogan'
          className='pl-[24px]'
          width={1084}
          height={231}
        />
      </div>
    </>
  )
}

export default Banner
