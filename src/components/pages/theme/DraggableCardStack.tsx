'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

type TCard = {
  id: number
  image: string
  visible: boolean
}

const DraggableCardStack = () => {
  const [cards, setCards] = useState<TCard[]>([
    { id: 1, image: '/theme/card.png', visible: true },
    { id: 2, image: '/theme/bg.png', visible: false },
    { id: 3, image: '/theme/card.png', visible: false },
    { id: 4, image: '/theme/bg.png', visible: false },
  ])
  const [dragStartY, setDragStartY] = useState(0)
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStartY(e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const offsetY = e.clientY - dragStartY
    if (offsetY > 0) {
      setDragOffsetY(offsetY)
    }
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const offsetY = e.touches[0].clientY - dragStartY
    if (offsetY > 0) {
      setDragOffsetY(offsetY)
    }
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  const handleDragEnd = () => {
    if (dragOffsetY > 50) {
      setCards((prev) => {
        const newCards = [...prev]
        const topCard = newCards.shift()!
        topCard.visible = false
        newCards.push(topCard)
        newCards[0].visible = true
        return newCards
      })
    }
    setIsDragging(false)
    setDragOffsetY(0)
  }

  return (
    <div
      className='relative w-full h-full aspect-[351/379] xl:aspect-[480/519] max-w-[351px] xl:max-w-[480px] max-h-[379px] xl:max-h-[519px] select-none cursor-grab active:cursor-grabbing'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <svg width='0' height='0' className='absolute'>
        <defs>
          <clipPath id='notch-mobile' clipPathUnits='objectBoundingBox'>
            <path d='M 0 0 H 1 V 1 H 0.6825 Q 0.67 1 0.6596 0.98 A 0.1596 0.1055 0 0 0 0.3404 0.98 Q 0.33 1 0.3175 1 H 0 V 0 Z' />
          </clipPath>
          <clipPath id='notch-desktop' clipPathUnits='objectBoundingBox'>
            <path d='M 0 0 H 1 V 1 H 0.6333 Q 0.62 1 0.6083 0.98 A 0.1083 0.0771 0 0 0 0.3917 0.98 Q 0.38 1 0.3667 1 H 0 V 0 Z' />
          </clipPath>
        </defs>
      </svg>
      {cards.map((card, index) => {
        const isTop = index === 0
        const zIndex = cards.length - index
        const offsetY = isTop && isDragging ? dragOffsetY : 0
        const topPosition = (3 - index) * 6

        return (
          <div
            key={card.id}
            className={cn(
              'absolute top-0 left-0 w-full h-full rounded-2xl bg-figma-neutral-50',
              isDragging && isTop ? '' : 'transition-all duration-300 ease-out',
              index === 0 ? '' : 'border border-figma-secondary-950',
            )}
            style={{
              top: `${topPosition + offsetY}px`,
              zIndex,
              clipPath: isMobile ? 'url(#notch-mobile)' : 'url(#notch-desktop)',
            }}
          >
            {card.visible && (
              <div
                className='w-full h-full bg-cover bg-center bg-no-repeat rounded-2xl'
                style={{ backgroundImage: `url(${card.image})` }}
              />
            )}

            {isTop && (
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[24px] z-10 pointer-events-none'>
                <svg width='28' height='16' viewBox='0 0 28 16' fill='none'>
                  <path
                    d='M2 2L14 14L26 2'
                    stroke='#5B5B6E'
                    strokeWidth='4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default DraggableCardStack
