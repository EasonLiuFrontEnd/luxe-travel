'use client'

import { useCallback, useState, useEffect, useRef } from 'react'

export const useBannerBookShelfScroll = () => {
  const [transformY, setTransformY] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(124)
  const lastScrollY = useRef(0)
  const maxTransformY = useRef(0)

  const updateHeaderHeight = useCallback(() => {
    const header = document.querySelector('header')
    if (header) {
      setHeaderHeight(header.offsetHeight)
    }
  }, [])

  useEffect(() => {
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [updateHeaderHeight])

  useEffect(() => {
    const handleScroll = () => {
      const bookShelfTitleElement = document.querySelector(
        '[data-bookshelf-title]',
      )
      const bookShelfSection = document.querySelector(
        '[data-bookshelf-section]',
      ) as HTMLElement

      if (!bookShelfTitleElement || !bookShelfSection) return

      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current
      const titleRect = bookShelfTitleElement.getBoundingClientRect()
      const titleTop = titleRect.top
      const windowHeight = window.innerHeight

      const bookShelfRect = bookShelfSection.getBoundingClientRect()
      const bookShelfBottom = bookShelfRect.bottom
      const bookShelfHeight = bookShelfRect.height

      if (titleTop <= windowHeight && titleTop > 0) {
        const progress = Math.max(
          0,
          Math.min(1, (windowHeight - titleTop) / windowHeight),
        )

        const maxTransformDistance = Math.max(0, bookShelfHeight - windowHeight)
        const targetTransformY = progress * maxTransformDistance

        if (isScrollingDown) {
          const newTransformY = Math.max(transformY, targetTransformY)
          maxTransformY.current = Math.max(maxTransformY.current, newTransformY)
          setTransformY(newTransformY)
        } else {
          const newTransformY = Math.min(
            maxTransformY.current,
            targetTransformY,
          )
          setTransformY(newTransformY)
        }
      } else if (titleTop <= 0) {
        if (Math.abs(bookShelfBottom - windowHeight) <= 10) {
          setTransformY(maxTransformY.current)
        } else if (isScrollingDown) {
          setTransformY(maxTransformY.current)
        }
      } else {
        setTransformY(0)
        maxTransformY.current = 0
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [headerHeight, transformY])

  return {
    transformY,
  }
}
