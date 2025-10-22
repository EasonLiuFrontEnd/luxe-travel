'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    sessionStorage.setItem('tour-needs-refresh', 'true')

    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-figma-neutral-50 px-4'>
      <div className='text-center'>
        <h1 className='font-family-noto-serif font-bold text-[96px] xl:text-[120px] leading-none text-figma-primary-950'>
          404
        </h1>
        <p className='font-family-noto-serif text-[24px] xl:text-[32px] font-medium text-figma-primary-900 mt-4'>
          找不到此頁面
        </p>
        <p className='font-family-noto-serif text-[16px] xl:text-[18px] text-figma-primary-700 mt-2'>
          3 秒後將自動返回首頁...
        </p>
      </div>
    </div>
  )
}

export default NotFound
