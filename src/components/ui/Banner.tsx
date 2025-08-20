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
      className='relative bg-gradient-to-br from-gray-100 via-white to-gray-50 min-h-screen banner-dynamic-padding'
      style={{ paddingTop: dynamicPadding }}
    >
      <div className='relative z-10 h-full flex flex-col justify-center items-center text-center px-4 py-20'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-6'>
            開啟您的夢想之旅
          </h1>
          <p className='text-xl md:text-2xl text-gray-600 mb-8'>
            專業團隊為您打造獨一無二的旅遊體驗，讓每一刻都成為珍貴回憶
          </p>
          <Button variant='primary' size='lg'>
            立即諮詢行程
          </Button>
        </div>
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
