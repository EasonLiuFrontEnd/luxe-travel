'use client'

import { useMemo } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import { APP_CONFIG } from '@/lib/config'
import Button from './Button'
import type { IBanner } from '@/types/components'
import BannerArrow from './BannerArrow'


const Banner = ({ logoProgress: propLogoProgress }: IBanner) => {
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
      style={{ paddingTop: dynamicPadding }}
    >
      <div className='z-10 sticky top-0 flex flex-col'>
          <h1 className='self-end text-right text-xl md:text-8xl font-bold text-gray-800'>
              <span className='inline-block rounded-s-3xl p-[12px] bg-gray-50'>歐洲自由行</span><br/>
              <span className='inline-block rounded-s-3xl p-[12px] bg-gray-50'>精緻首選</span>
          </h1>
          <div className='self-end flex flex-col'>
            <p className='self-end text-xl md:text-2xl rounded-s-2xl p-[3px] pl-[5px] text-gray-600 bg-gray-50'>
              典藏旅遊30年經驗團隊服務
            </p>
            <p className='self-end text-xl md:text-2xl rounded-s-2xl p-[3px] pl-[5px] text-gray-600 bg-gray-50'>
              為您客製化旅程，典藏經典回憶
            </p>
          </div>
        </div>
      <div className='relative h-[60vh] bg-[url(/banner.jpg)] bg-cover bg-center rounded-2xl'>
        <Button variant='primary' size='3xl' className='absolute left-0 bottom-0 self-start flex items-center rounded-se-xl font-semibold text-[rgb(61,84,0)] bg-gray-50 hover:scale-105'>
          即刻預約 · 輕鬆啟程
          <img src="/bannerArrow.svg" alt="Banner Arrow" className='pl-5' />
        </Button>
      </div>
    </div>
  )
}

export default Banner
