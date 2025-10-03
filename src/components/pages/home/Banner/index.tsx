'use client'

import { useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useScrollContext } from '@/context/ScrollContext'
import { useBanners } from '@/api/home/useBanners'
import { cn } from '@/lib/utils'
import { APP_CONFIG } from '@/lib/config'
import type { TBaseComponent } from '@/types'
import AirplaneIcon from '@/components/shared/icons/banner/AirplaneIcon'
import BannerCarousel from './BannerCarousel'

export type TBannerComponent = TBaseComponent & {
  logoProgress?: number
}

const GooeyFilters = () => (
  <svg
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      zIndex: -1,
    }}
  >
    <defs>
      <filter id='gooey-desktop'>
        <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' />
        <feColorMatrix
          in='blur'
          mode='matrix'
          values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -18'
          result='goo'
        />
        <feBlend in='SourceGraphic' in2='goo' />
      </filter>
      <filter id='gooey-mobile'>
        <feGaussianBlur in='SourceGraphic' stdDeviation='4' result='blur' />
        <feColorMatrix
          in='blur'
          mode='matrix'
          values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -18'
          result='goo'
        />
        <feBlend in='SourceGraphic' in2='goo' />
      </filter>
    </defs>
  </svg>
)

const Banner = ({ logoProgress: propLogoProgress }: TBannerComponent) => {
  const { logoProgress: contextLogoProgress } = useScrollContext()
  const gooAreaRef = useRef<HTMLDivElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)

  const logoProgress = propLogoProgress ?? contextLogoProgress

  const { query: bannersQuery, mock } = useBanners()
  const {
    data: bannersData,
    isLoading: isBannersLoading,
    error: bannersError,
  } = bannersQuery

  const effectiveData = useMemo(() => {
    if (bannersError) {
      return mock.rows
    }

    if (isBannersLoading) {
      return [] // 載入中時返回空陣列，讓組件自己處理載入狀態
    }

    // 如果 API 正常回應，即使是空陣列也使用 API 資料
    return bannersData || []
  }, [bannersError, bannersData, isBannersLoading, mock.rows])

  const dynamicPadding = useMemo(
    () =>
      `${APP_CONFIG.SCROLL.BANNER_HEIGHT * 0.1 + (1 - logoProgress) * APP_CONFIG.SCROLL.LOGO_TRANSITION_END * 0.2}px`,
    [logoProgress],
  )

  const firstBanner = effectiveData[0] || mock.rows[0]

  const supportsSvgGoo = () => {
    if (!gooAreaRef.current) return true
    const cs = getComputedStyle(gooAreaRef.current)
    return (
      (cs.filter && cs.filter.includes('url')) ||
      (cs.webkitFilter && cs.webkitFilter.includes('url'))
    )
  }

  const buildCssGoo = () => {
    if (!gooAreaRef.current || !fallbackRef.current) return

    document.body.classList.add('use-css-goo')
    fallbackRef.current.innerHTML = ''

    const rows = gooAreaRef.current.querySelectorAll('.goo-text-row')
    rows.forEach((row) => {
      const clone = row.cloneNode(true) as HTMLElement
      clone.style.color = 'transparent'
      clone.style.position = 'absolute'

      const r = row.getBoundingClientRect()
      const host = gooAreaRef.current!.getBoundingClientRect()
      const top = r.top - host.top

      const isDesktop = window.innerWidth >= 1280
      if (isDesktop) {
        const right = host.right - r.right
        clone.style.right = `${right}px`
      } else {
        const left = r.left - host.left
        clone.style.left = `${left}px`
      }

      clone.style.top = `${top}px`
      fallbackRef.current!.appendChild(clone)
    })
  }

  useEffect(() => {
    const setGooeyFilter = () => {
      if (gooAreaRef.current) {
        const isDesktop = window.innerWidth >= 1280
        const filterId = isDesktop ? 'gooey-desktop' : 'gooey-mobile'
        gooAreaRef.current.style.filter = `url(#${filterId})`
        gooAreaRef.current.style.webkitFilter = `url(#${filterId})`
      }
    }

    const timer = setTimeout(() => {
      setGooeyFilter()
      if (!supportsSvgGoo()) {
        buildCssGoo()
      }
    }, 100)

    const handleResize = () => {
      setGooeyFilter()
      if (document.body.classList.contains('use-css-goo')) {
        buildCssGoo()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [firstBanner])

  return (
    <>
      <GooeyFilters />
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
          <div className='gooey-text-container relative'>
            <div
              ref={gooAreaRef}
              className={cn(
                'goo-area relative',
                'xl:text-right max-xl:text-left',
              )}
            >
              <h1
                className={cn(
                  'flex flex-col',
                  'font-noto-serif-tc font-bold text-[40px] xl:text-[96px]',
                  'xl:text-right max-xl:text-left',
                )}
              >
                {firstBanner?.titleLine1 && (
                  <div
                    className={cn(
                      'goo-text-row relative inline-block',
                      'xl:self-end max-xl:self-start',
                      'text-figma-neutral-950 px-[14px] xl:mb-[0.05em] xl:mt-[0.1em] max-xl:mb-[0.05em] max-xl:mt-[0.05em]',
                      "before:content-[''] before:absolute before:z-[-1]",
                      'before:left-[0] before:right-[-8px] before:top-1/2',
                      'before:h-[1.8em] before:translate-y-[-50%]',
                      'before:bg-figma-neutral-50',
                      'xl:before:rounded-bl-[50px] max-xl:before:rounded-r-[50px]',
                    )}
                  >
                    {firstBanner.titleLine1}
                  </div>
                )}
                {firstBanner?.titleLine2 && (
                  <div
                    className={cn(
                      'goo-text-row relative inline-block',
                      'xl:self-end max-xl:self-start',
                      'text-figma-neutral-950 px-[14px] xl:mt-[-8px] xl:mb-2 max-xl:mt-[0.02em] max-xl:mb-[0.05em]',
                      "before:content-[''] before:absolute before:z-[-1]",
                      'before:left-[-8px] before:right-[-8px] before:top-1/2',
                      'before:h-[1.8em] before:translate-y-[-50%]',
                      'before:bg-figma-neutral-50',
                      'xl:before:rounded-l-[50px] max-xl:before:rounded-r-[50px]',
                    )}
                  >
                    {firstBanner.titleLine2}
                  </div>
                )}
              </h1>
              <div
                className={cn(
                  'flex flex-col',
                  'font-genseki-gothic font-medium xl:text-[24px] text-[16px]',
                )}
              >
                {firstBanner?.subtitleLine1 && (
                  <p
                    className={cn(
                      'goo-text-row relative inline-block',
                      'xl:self-end max-xl:self-start text-right',
                      'text-figma-primary-950 px-[14px] my-0',
                      "before:content-[''] before:absolute before:z-[-1]",
                      'before:left-0 before:right-0 before:top-1/2',
                      'before:h-[2em] before:translate-y-[-50%]',
                      'before:bg-figma-neutral-50',
                      'xl:before:rounded-l-[50px] max-xl:before:rounded-r-[50px]',
                    )}
                  >
                    {firstBanner.subtitleLine1}
                  </p>
                )}
                {firstBanner?.subtitleLine2 && (
                  <p
                    className={cn(
                      'goo-text-row relative inline-block',
                      'xl:self-end max-xl:self-start',
                      'text-figma-primary-950 px-[14px] mt-[0.1em] mb-[0.1em]',
                      "before:content-[''] before:absolute before:z-[-1]",
                      'before:left-0 before:right-0 before:top-1/2',
                      'before:h-[2em] before:translate-y-[-50%]',
                      'before:bg-figma-neutral-50',
                      'xl:before:rounded-l-[50px] max-xl:before:rounded-r-[50px]',
                    )}
                  >
                    {firstBanner.subtitleLine2}
                  </p>
                )}
              </div>
            </div>

            <div
              ref={fallbackRef}
              className='goo-fallback absolute inset-0 pointer-events-none z-[-1] [filter:blur(10px)_contrast(30)_brightness(0.7)]'
              aria-hidden='true'
            />
          </div>
        </div>

        <BannerCarousel
          images={
            bannersError 
              ? ['/home/banners/banner.jpg']
              : (effectiveData && effectiveData.length > 0)
                ? effectiveData.map(banner => banner.imageUrl)
                : []
          }
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
