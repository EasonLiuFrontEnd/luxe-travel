'use client'

import { useMemo } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import { APP_CONFIG } from '@/lib/config'
import { useBanners } from '@/api/home/useBanners'
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

  const { query: bannersQuery, mock } = useBanners()
  const {
    data: bannersData,
    isLoading: isBannersLoading,
    error: bannersError,
  } = bannersQuery

  const effectiveData = useMemo(() => {
    if (bannersError || !bannersData) {
      return mock.rows
    }

    if (isBannersLoading) {
      return mock.rows
    }

    return bannersData
  }, [bannersError, bannersData, isBannersLoading, mock.rows])

  const dynamicPadding = useMemo(
    () =>
      `${APP_CONFIG.SCROLL.BANNER_HEIGHT * 0.1 + (1 - logoProgress) * APP_CONFIG.SCROLL.LOGO_TRANSITION_END * 0.2}px`,
    [logoProgress],
  )

  const firstBanner = effectiveData[0] || mock.rows[0]

  return (
    <>
      <div
        className={cn(
          'banner-dynamic-padding',
          'pt-[168px] px-[12px]',
          'xl:pt-[152px] xl:px-[48px]',
        )}
        style={
          {
            '--dynamic-padding': dynamicPadding,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            'z-10 sticky',
            'top-[104px] -mt-[192px]',
            'xl:top-[123px] xl:-mt-[250px]',
          )}
        >
          <h1
            className={cn(
              'flex flex-col text-right text-figma-neutral-950',
              'font-noto-serif-tc font-bold text-[40px] xl:text-[96px] leading-[1.2]',
            )}
          >
            <div
              className={cn(
                'self-end max-xl:self-start',
                'bg-figma-neutral-50 rounded-tr-xl max-xl:rounded-ee-[12px] xl:rounded-es-2xl',
                'pt-[12px] pb-[4px] px-[12px]',
                'xl:pt-[16px] xl:px-[16px]',
              )}
            >
              {firstBanner?.title?.split('精緻首選')[0] || '歐洲自由行'}
            </div>
            <div
              className={cn(
                'self-end max-xl:self-start',
                'bg-figma-neutral-50 xl:rounded-bl-2xl',
                'py-[4px] px-[12px]',
                'xl:pt-[4px] xl:pb-[16px] xl:px-[16px]',
                styles['concave-border-1'],
              )}
            >
              精緻首選
            </div>
          </h1>
          <div
            className={cn(
              'flex flex-col text-figma-primary-950',
              'font-genseki-gothic font-medium xl:text-[24px] text-[16px] xl:leading-[1.2] leading-[1.5]',
            )}
          >
            <p
              className={cn(
                'self-end max-xl:self-start text-right',
                'bg-figma-neutral-50 max-xl:rounded-se-[12px]',
                'py-[4px] px-[12px]',
                'xl:py-[4px] xl:px-[16px]',
                styles['concave-border-2'],
              )}
            >
              {firstBanner?.subtitle?.split('為您')[0] || '典藏旅遊30年經驗團隊服務'}
            </p>
            <p
              className={cn(
                'self-end max-xl:self-start',
                'bg-figma-neutral-50 max-xl:rounded-e-[12px] xl:rounded-s-2xl',
                'pt-[4px] pb-[12px] px-[12px]',
                'xl:py-[10px] xl:px-[16px]',
                styles['concave-border-3'],
              )}
            >
              {firstBanner?.subtitle?.includes('為您') ? '為您' + firstBanner.subtitle.split('為您')[1] : '為您客製化旅程，典藏經典回憶'}
            </p>
          </div>
        </div>
        <BannerCarousel
          images={effectiveData.map(banner => banner.imageUrl)}
          autoPlayInterval={10000}
        />
      </div>
      <div className='flex justify-end w-full xl:px-[48px] max-xs:px-[12px] sticky top-0'>
        <AirplaneIcon className='max-xl:hidden' />
        <Image
          src='/home/banners/slogan.svg'
          alt='slogan'
          className='xl:pl-[24px] max-xs:hidden'
          width={1084}
          height={231}
        />
        <Image
          src='/home/banners/mobile-slogan.svg'
          alt='mobile slogan'
          className='xs:hidden '
          width={352}
          height={430}
        />
      </div>
    </>
  )
}

export default Banner
