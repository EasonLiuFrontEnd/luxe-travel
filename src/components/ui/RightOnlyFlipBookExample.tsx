'use client'

import React from 'react'

import { RightOnlyFlipBook } from '@/components/ui/RightOnlyFlipBook'

import type { TFlipBookPage, TBaseComponent } from '@/types'

export type TRightOnlyFlipBookExampleProps = TBaseComponent

export const RightOnlyFlipBookExample = ({
  className,
  ...props
}: TRightOnlyFlipBookExampleProps) => {
  const handleFlip = (pageIndex: number) => {
    console.log('翻到第', pageIndex, '頁')
  }

  // 定義頁面內容
  const pages: TFlipBookPage[] = [
    {
      id: 'cover',
      pageNumber: 'Cover',
      background: 'bg-gradient-to-br from-blue-500 to-purple-600',
      content: (
        <div className='flex h-full items-center justify-center text-center text-white'>
          <div>
            <h1 className='text-3xl font-bold'>Luxe Travel</h1>
            <p className='mt-4 text-lg'>Premium Travel Experiences</p>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      pageNumber: 'Back Cover',
      background: 'bg-gradient-to-br from-gray-700 to-gray-900',
      content: (
        <div className='flex h-full items-center justify-center text-center text-white'>
          <div>
            <h2 className='text-2xl font-bold'>Contact Us</h2>
            <div className='mt-4 space-y-2 text-sm'>
              <p>📧 info@luxe-travel.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>🌐 www.luxe-travel.com</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className={className} {...props}>
      {/* 使用自定義尺寸和內容 */}
      <RightOnlyFlipBook
        pages={pages}
        width={350}
        height={500}
        showCover={false}
        enableBackwardFlip={false}
        onFlip={handleFlip}
        className='flex justify-center'
      />
    </div>
  )
}

// 另一個範例：小尺寸翻頁書
export const SmallFlipBookExample = ({
  className,
  ...props
}: TBaseComponent) => {
  const smallPages: TFlipBookPage[] = [
    {
      id: 'page1',
      pageNumber: '1',
      background: 'bg-gradient-to-br from-pink-200 to-blue-200',
      content: (
        <div className='p-4 text-center'>
          <h2 className='text-lg font-bold text-gray-800'>小書本</h2>
          <p className='mt-2 text-sm text-gray-600'>這是一本小尺寸的翻頁書</p>
        </div>
      )
    },
    {
      id: 'page2',
      pageNumber: '2',
      background: 'bg-gradient-to-br from-green-200 to-yellow-200',
      content: (
        <div className='p-4 text-center'>
          <h2 className='text-lg font-bold text-gray-800'>第二頁</h2>
          <p className='mt-2 text-sm text-gray-600'>可以自定義任何內容</p>
        </div>
      )
    },
    {
      id: 'page3',
      pageNumber: '3',
      background: 'bg-gradient-to-br from-purple-200 to-pink-200',
      content: (
        <div className='p-4 text-center'>
          <h2 className='text-lg font-bold text-gray-800'>結束頁</h2>
          <p className='mt-2 text-sm text-gray-600'>小巧實用的翻頁效果</p>
        </div>
      )
    }
  ]

  return (
    <div className={className} {...props}>
      <RightOnlyFlipBook
        pages={smallPages}
        width={250}
        height={350}
        showCover={false}
        enableBackwardFlip={true} // 允許向後翻頁
        className='flex justify-center'
      />
    </div>
  )
}