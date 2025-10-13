'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollLock } from '@/hooks/useScrollLock'

gsap.registerPlugin(Observer, ScrollTrigger)

type TBookShelfGsapReturn = {
  bookShelfWrapperRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLDivElement>
  isMobile: boolean
}

export const useBookShelfGsap = (): TBookShelfGsapReturn => {
  const [isAnimationActive, setIsAnimationActive] = useState(false)
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [isPageScrollable, setIsPageScrollable] = useState(true)
  const [currentBookIndex, setCurrentBookIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useScrollLock(!isPageScrollable)

  useEffect(() => {
    const checkMobileLayout = () => {
      setIsMobile(window.innerWidth < 1280)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)

    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  const bookShelfWrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const observerRef = useRef<Observer | null>(null)
  const hasInitializedFromBottom = useRef<boolean>(false)
  const isCompletedRef = useRef<boolean>(false)

  useLayoutEffect(() => {
    if (!bookShelfWrapperRef.current || isMobile) {
      return
    }

    const wrapper = bookShelfWrapperRef.current
    const track = trackRef.current
    const bookContainers = track?.querySelectorAll('[data-book-container]')
    const books = Array.from(bookContainers || []) as HTMLElement[]

    const trigger = ScrollTrigger.create({
      id: 'book-shelf-trigger',
      trigger: wrapper,
      start: 'top 120px',
      end: '+=100',
      pin: false,
      pinSpacing: false,
      scrub: false,
      refreshPriority: -1,
      invalidateOnRefresh: true,
      markers: true,
      anticipatePin: 1,
      fastScrollEnd: true,
      onEnter: () => {
        setIsAnimationActive(true)
        setIsAnimationCompleted(false)
        setIsPageScrollable(false)
      },
      onLeave: () => {
        if (isAnimationCompleted) {
          setIsAnimationActive(false)
          setIsPageScrollable(true)
        } else {
          setIsAnimationCompleted(true)
          setIsAnimationActive(false)
          setIsPageScrollable(true)
        }
      },
      onUpdate: (self) => {
        if (isAnimationActive && !isAnimationCompleted) {
          self.scroll(self.start)
        }

        if (isAnimationCompleted) {
          setIsPageScrollable(true)
        }
      },
      onEnterBack: () => {
        if (!isAnimationCompleted) {
          setIsAnimationActive(true)
          setIsAnimationCompleted(false)
          setIsPageScrollable(false)
          setCurrentBookIndex(books.length - 1)

          if (!hasInitializedFromBottom.current) {
            hasInitializedFromBottom.current = true
            setAnimationKey((prev) => prev + 1)
          }
        }
      },
      onLeaveBack: () => {
        if (isAnimationCompleted) {
          setIsAnimationActive(false)
          setIsPageScrollable(true)
        }
      },
    })

    scrollTriggerRef.current = trigger

    ScrollTrigger.refresh()

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [isMobile])

  useLayoutEffect(() => {
    if (!isAnimationActive || !trackRef.current || isMobile) return

    isCompletedRef.current = false

    const track = trackRef.current
    const bookContainers = track.querySelectorAll('[data-book-container]')
    const books = Array.from(bookContainers) as HTMLElement[]

    if (!books.length || !track) {
      return
    }

    const wrap = gsap.utils.wrap(0, books.length)
    let currentIndex = -1
    let animating = false
    let isScrollingUp = false

    gsap.set(books, { xPercent: 0 })
    gsap.set(track, { x: 0 })

    const trackWidth = track.scrollWidth
    const trackContainerWidth = track.parentElement?.offsetWidth || 0
    const maxScrollPosition = -(trackWidth - trackContainerWidth)

    const getBookPosition = (index: number) => {
      let position = 0;
      for (let i = 0; i < index; i++) {
        const book = books[i];
        const bookWidth = parseFloat(book.style.getPropertyValue('--w')) || 100;
        const marginLeft = parseFloat(book.style.getPropertyValue('--book-margin-left')) || 0;
        const marginRight = parseFloat(book.style.getPropertyValue('--book-margin-right')) || 0;
        position -= (bookWidth + marginLeft + marginRight);
      }
      // 還要減去 gap（12px * index）
      position -= (12 * index);
      return position;
    };

    const gotoBook = (index: number, direction: number) => {
      if (animating) {
        return
      }

      index = wrap(index)
      animating = true

      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power1.inOut' },
        onComplete: () => {
          animating = false
          currentIndex = index
          setCurrentBookIndex(index);

          const currentX = gsap.getProperty(track, 'x') as number
          const isAtEnd = !isScrollingUp && currentX <= maxScrollPosition
          const isAtStart = isScrollingUp && index === 0

          if (isAtEnd || isAtStart) {
            setIsAnimationCompleted(true)
            isCompletedRef.current = true
            gsap.delayedCall(0.5, () => {
              setIsAnimationActive(false)
              setIsPageScrollable(true)
            })
          }
        },
      })

      let targetPosition = getBookPosition(index)

      if (targetPosition > 0) {
        targetPosition = 0
      }
      if (targetPosition < maxScrollPosition) {
        targetPosition = maxScrollPosition
      }

      tl.to(track, {
        x: targetPosition,
        duration: 0.1,
        ease: 'power1.inOut',
      })
    }

    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => {
        if (!animating && !isCompletedRef.current) {
          isScrollingUp = true
          const nextIndex = currentIndex - 1
          gotoBook(nextIndex, -1)
        }
        return true
      },
      onUp: () => {
        if (!animating && !isCompletedRef.current) {
          isScrollingUp = false
          const nextIndex = currentIndex + 1
          gotoBook(nextIndex, 1)
        }
        return true
      },
      tolerance: 10,
      preventDefault: true,
    })

    observerRef.current = observer

    const trigger = ScrollTrigger.getById('book-shelf-trigger')
    const isEnteringFromTop = trigger ? trigger.direction === 1 : true

    isScrollingUp = !isEnteringFromTop

    animating = false

    if (isScrollingUp) {
      gsap.set(track, { x: maxScrollPosition })

      let closestIndex = 0
      let minDiff = Math.abs(getBookPosition(0) - maxScrollPosition)

      for (let i = 1; i < books.length; i++) {
        const pos = getBookPosition(i)
        const diff = Math.abs(pos - maxScrollPosition)
        if (diff < minDiff) {
          minDiff = diff
          closestIndex = i
        }
      }

      if (minDiff > 100) {
        closestIndex = Math.max(0, books.length - 2)
      }

      currentIndex = closestIndex
      setCurrentBookIndex(closestIndex)
    } else {
      currentIndex = 0
      setCurrentBookIndex(0)
      gsap.set(track, { x: 0 })
    }

    return () => {
      if (observer) {
        observer.kill()
      }
      gsap.killTweensOf(books)
      gsap.killTweensOf(track)
    }
  }, [isAnimationActive, animationKey, isMobile])

  return {
    bookShelfWrapperRef: bookShelfWrapperRef as React.RefObject<HTMLDivElement>,
    trackRef: trackRef as React.RefObject<HTMLDivElement>,
    isMobile,
  }
}
