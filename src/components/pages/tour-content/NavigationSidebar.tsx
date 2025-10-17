'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

type TNavigationItem = {
  id: string
  label: string
  targetId: string
}

const navigationItems: TNavigationItem[] = [
  { id: 'nav-tour-info', label: '行程資訊', targetId: 'tour-info' },
  { id: 'nav-featured', label: '焦點特色', targetId: 'featured' },
  { id: 'nav-daily-itinerary', label: '每日行程', targetId: 'daily-itinerary' },
  { id: 'nav-tour-notice', label: '參團須知', targetId: 'tour-notice' },
]

const NavigationSidebar = () => {
  const [activeSection, setActiveSection] = useState<string>('tour-info')
  const intersectingMap = useRef<Map<string, boolean>>(new Map())

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }

    const getElementDepth = (element: Element): number => {
      let depth = 0
      let currentElement: Element | null = element
      while (currentElement) {
        depth++
        currentElement = currentElement.parentElement
      }
      return depth
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        intersectingMap.current.set(entry.target.id, entry.isIntersecting)
      })

      const intersectingElements = Array.from(intersectingMap.current.entries())
        .filter(([, isIntersecting]) => isIntersecting)
        .map(([id]) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

      if (intersectingElements.length === 0) return

      const mostSpecificElement = intersectingElements.reduce((prev, current) => {
        const prevDepth = getElementDepth(prev)
        const currentDepth = getElementDepth(current)
        return currentDepth > prevDepth ? current : prev
      })

      setActiveSection(mostSpecificElement.id)
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navigationItems.forEach((item) => {
      const element = document.getElementById(item.targetId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='fixed top-0 right-5 flex gap-x-4 font-noto-serif-body-m-semibold text-figma-primary-300 [writing-mode:vertical-rl] pt-13 z-99'>
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleScrollTo(item.targetId)}
          className={cn(
            '[letter-spacing:4px] pt-[3px] pr-[12.5px] pl-[12.5px] pb-1 tracking-wider cursor-pointer transition-colors hover:text-figma-secondary-950 hover:bg-figma-accent-yellow-light',
            activeSection === item.targetId &&
              'text-figma-secondary-950 bg-figma-accent-yellow-light'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default NavigationSidebar
