'use client'

import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'

import { cn } from '@/lib/utils'

import type {
  TFlipBookProps,
  TFlipBookCorner,
  TFlipBookOrientation,
  TFlipBookState,
  TPageFlipRef,
} from '@/types'

interface HTMLFlipBookInstance {
  getPageCount: () => number
  getCurrentPageIndex: () => number
  turnToPage: (pageNum: number) => void
  turnToNextPage: () => void
  turnToPrevPage: () => void
  flip: (pageNum: number, corner?: TFlipBookCorner) => void
  flipNext: (corner?: TFlipBookCorner) => void
  flipPrev: (corner?: TFlipBookCorner) => void
  loadFromImages: (images: string[]) => void
  loadFromHtml: (items: NodeListOf<HTMLElement> | HTMLElement[]) => void
  updateFromHtml: (items: NodeListOf<HTMLElement> | HTMLElement[]) => void
  updateFromImages: (images: string[]) => void
  destroy: () => void
}

interface HTMLFlipBookRef {
  getPageFlip: () => HTMLFlipBookInstance
}

const PageFlip = forwardRef<TPageFlipRef, TFlipBookProps>(
  (
    {
      children,
      className,
      width,
      height,
      size = 'fixed',
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      drawShadow = true,
      flippingTime = 1000,
      usePortrait = true,
      startZIndex = 0,
      autoSize = true,
      maxShadowOpacity = 1,
      showCover = false,
      mobileScrollSupport = true,
      onFlip,
      onChangeOrientation,
      onChangeState,
      ...props
    },
    ref,
  ) => {
    const flipBookRef = useRef<HTMLFlipBookRef | null>(null)

    useImperativeHandle(ref, () => ({
      getPageCount: () =>
        flipBookRef.current?.getPageFlip().getPageCount() ?? 0,
      getCurrentPageIndex: () =>
        flipBookRef.current?.getPageFlip().getCurrentPageIndex() ?? 0,
      turnToPage: (pageNum: number) => {
        flipBookRef.current?.getPageFlip().turnToPage(pageNum)
      },
      turnToNextPage: () => {
        flipBookRef.current?.getPageFlip().turnToNextPage()
      },
      turnToPrevPage: () => {
        flipBookRef.current?.getPageFlip().turnToPrevPage()
      },
      flip: (pageNum: number, corner?: TFlipBookCorner) => {
        flipBookRef.current?.getPageFlip().flip(pageNum, corner)
      },
      flipNext: (corner?: TFlipBookCorner) => {
        flipBookRef.current?.getPageFlip().flipNext(corner)
      },
      flipPrev: (corner?: TFlipBookCorner) => {
        flipBookRef.current?.getPageFlip().flipPrev(corner)
      },
      loadFromImages: (images: string[]) => {
        flipBookRef.current?.getPageFlip().loadFromImages(images)
      },
      loadFromHtml: (items: NodeListOf<HTMLElement> | HTMLElement[]) => {
        flipBookRef.current?.getPageFlip().loadFromHtml(items)
      },
      updateFromHtml: (items: NodeListOf<HTMLElement> | HTMLElement[]) => {
        flipBookRef.current?.getPageFlip().updateFromHtml(items)
      },
      updateFromImages: (images: string[]) => {
        flipBookRef.current?.getPageFlip().updateFromImages(images)
      },
      destroy: () => {
        flipBookRef.current?.getPageFlip().destroy()
      },
    }))

    const handleFlip = (e: { data: number }) => {
      onFlip?.(e.data)
    }

    const handleChangeOrientation = (e: { data: TFlipBookOrientation }) => {
      onChangeOrientation?.(e.data)
    }

    const handleChangeState = (e: { data: TFlipBookState }) => {
      onChangeState?.(e.data)
    }

    return (
      <div className={cn('select-none', className)} {...props}>
        <HTMLFlipBook
          ref={flipBookRef}
          width={width}
          height={height}
          size={size}
          minWidth={minWidth}
          maxWidth={maxWidth}
          minHeight={minHeight}
          maxHeight={maxHeight}
          drawShadow={drawShadow}
          flippingTime={flippingTime}
          usePortrait={usePortrait}
          startZIndex={startZIndex}
          autoSize={autoSize}
          maxShadowOpacity={maxShadowOpacity}
          showCover={showCover}
          mobileScrollSupport={mobileScrollSupport}
          onFlip={handleFlip}
          onChangeOrientation={handleChangeOrientation}
          onChangeState={handleChangeState}
        >
          {children}
        </HTMLFlipBook>
      </div>
    )
  },
)

PageFlip.displayName = 'PageFlip'

export { PageFlip }
