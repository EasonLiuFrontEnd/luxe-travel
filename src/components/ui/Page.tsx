'use client'

import React, { forwardRef } from 'react'

import { cn } from '@/lib/utils'

import type { TBaseComponent } from '@/types'

export type TPageProps = TBaseComponent & {
  pageNumber?: number | string
  background?: string
}

const Page = forwardRef<HTMLDivElement, TPageProps>(
  ({ children, className, pageNumber, background, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col overflow-hidden p-4',
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
        <div className='flex-1'>{children}</div>
      </div>
    )
  },
)

Page.displayName = 'Page'

export { Page }
