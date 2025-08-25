'use client'

import { useMemo } from 'react'
import { useScrollContext } from '@/context/ScrollContext'
import { APP_CONFIG } from '@/lib/config'
import Button from './Button'
import type { IBanner } from '@/types/components'

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
      className='relative min-h-screen banner-dynamic-padding'
      style={{ paddingTop: dynamicPadding }}
    >
      <div className='relative h-[50vh] max-w-[80vw] m-auto text-center mt-12 bg-[url(/banner.jpg)] bg-cover rounded-s-2xl'>
        <Button variant='primary' size='3xl' className='self-start absolute left-0 bottom-0 rounded-se-xl font-semibold text-[rgb(61,84,0)] bg-gray-50 hover:scale-105'>
          即刻預約 · 輕鬆啟程
        </Button>
      </div>

      <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
          logoProgress > 0.5 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='animate-bounce'>
          <div className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
