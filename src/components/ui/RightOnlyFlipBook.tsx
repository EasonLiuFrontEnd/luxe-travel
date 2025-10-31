'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Page } from '@/components/ui/Page'
import { PageFlip } from '@/components/ui/PageFlip'

import type { TPageFlipRef } from '@/types'

type TFlipBookPage = {
  id: string
  pageNumber?: string
  background?: string
  pageContentClassName?: string
  content: ReactNode
}

type TRightOnlyFlipBookProps = {
  className?: string
  pages: TFlipBookPage[]
  width?: number
  height?: number
  showCover?: boolean
  enableBackwardFlip?: boolean
  onFlip?: (() => void) | ((pageIndex: number) => void)
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
  const pathname = usePathname()
  const [remountKey, setRemountKey] = useState(0)

  useEffect(() => {
    setRemountKey((prev) => prev + 1)
  }, [pathname])

  const handleFlip = (data: number) => {
    if (onFlip) {
      if (onFlip.length === 0) {
        ;(onFlip as () => void)()
      } else {
        ;(onFlip as (pageIndex: number) => void)(data)
      }
    }
  }

  return (
    <div className={className} {...props}>
      <div className='relative overflow-hidden mx-auto'>
        <div className='relative'>
          <PageFlip
            key={remountKey}
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

          {!enableBackwardFlip && (
            <div
              className='absolute inset-0 pointer-events-none'
              style={{ zIndex: 1000 }}
            >
              <div
                className='absolute left-0 top-0 w-1/2 h-full bg-transparent pointer-events-auto'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
