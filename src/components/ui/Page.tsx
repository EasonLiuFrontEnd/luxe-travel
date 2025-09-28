'use client'

import React, { forwardRef } from 'react'

import { cn } from '@/lib/utils'

import type { TBaseComponent } from '@/types'

export type TPageProps = TBaseComponent & {
  pageNumber?: number | string
  background?: string
  pageContentClassName?: string
}

const Page = forwardRef<HTMLDivElement, TPageProps>(
  ({ children, pageContentClassName, className, pageNumber, background, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col overflow-hidden',
          background || 'bg-white',
          className,
        )}
        {...props}
      >
        {pageNumber && (
          <div className='absolute bottom-4 right-4 text-sm text-gray-500'>
            {pageNumber}
          </div>
        )}
        <div className={cn('flex-1', pageContentClassName)}>{children}</div>
      </div>
    )
  },
)

Page.displayName = 'Page'

export { Page }
