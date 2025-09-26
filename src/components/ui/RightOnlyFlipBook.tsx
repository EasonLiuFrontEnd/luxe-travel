'use client'

import React, { useRef } from 'react'

import { Page } from '@/components/ui/Page'
import { PageFlip } from '@/components/ui/PageFlip'

import type { TPageFlipRef, TBaseComponent } from '@/types'

export type TFlipBookPage = {
  id: string
  pageNumber?: string
  background?: string
  pageContentClassName?: string
  content: React.ReactNode
}

export type TRightOnlyFlipBookProps = TBaseComponent & {
  pages: TFlipBookPage[]
  width?: number
  height?: number
  showCover?: boolean
  enableBackwardFlip?: boolean
  onFlip?: (pageIndex: number) => void
}

export const RightOnlyFlipBook = ({
  className,
  pages,
  width = 400,
  height = 600,
  showCover = false,
  enableBackwardFlip = false,
  onFlip,
  ...props
}: TRightOnlyFlipBookProps) => {
  const flipBookRef = useRef<TPageFlipRef>(null)

  const handleFlip = (data: number) => {
    console.log('Current page:', data)
    onFlip?.(data)
  }

  return (
    <div className={className} {...props}>
      {/* Container that clips the left half */}
      <div className='relative overflow-hidden mx-auto'>
        {/* Flipbook positioned so only right half shows */}
        <div className='relative'>
          <PageFlip
            ref={flipBookRef}
            width={width}
            height={height}
            size='fixed'
            showCover={showCover}
            onFlip={handleFlip}
            className=''
          >
            {pages.map((page) => (
              <Page
                key={page.id}
                pageNumber={page.pageNumber}
                background={page.background}
                pageContentClassName={page.pageContentClassName}
              >
                {page.content}
              </Page>
            ))}
          </PageFlip>

          {/* Overlay to block left-side clicks (backward flips) - only if disabled */}
          {!enableBackwardFlip && (
            <div
              className='absolute inset-0 pointer-events-none'
              style={{ zIndex: 1000 }}
            >
              {/* Block left half - prevents backward flips */}
              <div
                className='absolute left-0 top-0 w-1/2 h-full bg-transparent pointer-events-auto'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Blocked backward flip attempt')
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}