import { useRef, useState, useCallback, useMemo } from 'react'
import RecommendationItem from './RecommendationItem'
import { useMap } from '@/api/home/useMap'

type TRecommendationListProps = {
  className?: string
}

const RecommendationList = ({ className }: TRecommendationListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const { query: mapQuery } = useMap()

  const recommendationData = useMemo(() => {
    const data = mapQuery.data || []

    return (data || []).slice(0, 5).map((article) => ({
      id: article.id,
      title: article.title,
      country: article.subtitle,
      imageSrc: article.imageUrl,
      imageAlt: `${article.title} ${article.subtitle}`,
      linkUrl: article.linkUrl,
    }))
  }, [mapQuery.data])

  const handleRecommendationClick = (linkUrl: string) => {
    if (linkUrl) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  return (
    <div className={`mx-auto mt-7 ${className || ''}`}>
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto gap-4 xl:grid xl:grid-cols-5 xl:gap-7 xl:overflow-x-visible hide-scrollbar ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab xl:cursor-auto'
        }`}
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {recommendationData.map((item, index) => (
          <RecommendationItem
            key={item.id}
            item={item}
            onClick={handleRecommendationClick}
            className={`min-w-[290px] xl:min-w-0 flex-shrink-0 xl:flex-shrink flex gap-4 items-start p-[10px] xl:p-4 bg-figma-neutral-0 rounded-[16px] hover:bg-figma-secondary-300 transition-colors duration-300 ${
              index === 0 ? 'bg-figma-secondary-300' : ''
            }`}
            style={{ scrollSnapAlign: 'start' }}
          />
        ))}
      </div>
    </div>
  )
}

export default RecommendationList
