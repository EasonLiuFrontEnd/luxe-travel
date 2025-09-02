"use client"

import React, { useState, useRef, useEffect } from 'react'
import DestinationCard from '@/components/customUI/DestinationCard'

const BookShelf = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [startTranslate, setStartTranslate] = useState(0)
  const [minTranslate, setMinTranslate] = useState(0)
  const bookshelfRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleCardClick = (cardId: string) => {
    setActiveCardId(cardId)
  }

  // 拖曳功能（純 JS：translateX）
  const handleMouseDown = (e: React.MouseEvent) => {
    // 檢查點擊的是否為書本元素
    const target = e.target as HTMLElement
    if (target.closest('[data-destination-card]')) {
      // 如果點擊的是書本，不啟動拖曳
      return
    }
    
    if (!bookshelfRef.current || !trackRef.current) return
    const containerWidth = bookshelfRef.current.clientWidth
    const trackWidth = trackRef.current.scrollWidth
    const minT = Math.min(0, containerWidth - trackWidth)
    setMinTranslate(minT)
    setIsDragging(true)
    setStartX(e.pageX)
    setStartTranslate(translateX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const delta = e.pageX - startX
    const next = Math.max(minTranslate, Math.min(0, startTranslate + delta))
    setTranslateX(next)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  // 添加全局滑鼠事件監聽器，確保拖曳狀態能正確重置
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    const handleGlobalMouseLeave = () => {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    document.addEventListener('mouseleave', handleGlobalMouseLeave)

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('mouseleave', handleGlobalMouseLeave)
    }
  }, [])

  // 18 本書尺寸：mobile 與 website（lg 以上）
  const cardSizesMobile = [
    'w-[112px] h-[394px]', 'w-[64px] h-[334px]', 'w-[80px] h-[360px]', 'w-[86.87px] h-[269.72px]',
    'w-[80px] h-[326px]', 'w-[64px] h-[394px]', 'w-[108.27px] h-[333.58px]', 'w-[80px] h-[261px]',
    'w-[64px] h-[378px]', 'w-[80px] h-[344px]', 'w-[107.05px] h-[319.63px]', 'w-[89.09px] h-[264.43px]',
    'w-[64px] h-[394px]', 'w-[75.98px] h-[346.54px]', 'w-[144px] h-[304px]', 'w-[64px] h-[354px]',
    'w-[86.95px] h-[270.72px]', 'w-[80px] h-[378px]',
  ]

  const cardSizesWeb = [
    'w-[152px] h-[458px]', 'w-[80px] h-[398px]', 'w-[104px] h-[424px]', 'w-[108.37px] h-[334.72px]',
    'w-[104px] h-[390px]', 'w-[80px] h-[458px]', 'w-[137.6px] h-[397.58px]', 'w-[104px] h-[325px]',
    'w-[80px] h-[442px]', 'w-[104px] h-[408px]', 'w-[136.38px] h-[383.63px]', 'w-[115.28px] h-[328.43px]',
    'w-[80px] h-[458px]', 'w-[94.19px] h-[410.54px]', 'w-[200px] h-[368px]', 'w-[80px] h-[418px]',
    'w-[108.37px] h-[334.72px]', 'w-[104px] h-[442px]',
  ]

  const rotations = [
    'rotate-0', 'rotate-0', 'rotate-0', '-rotate-5', 'rotate-0', 'rotate-0', 'rotate-5', 'rotate-0', 'rotate-0', 'rotate-0', '-rotate-5', 'rotate-2', 'rotate-0', '-rotate-2', 'rotate-0', 'rotate-0', '-rotate-5', 'rotate-0'
  ]

  // 18 本書在 website 版本的 pattern top 偏移量（統一設定為 110px）
  const patternTopOffsets = [
    '110px', '110px', '110px', '110px', '110px', '110px', '110px', '110px', '110px', '110px',
    '110px', '110px', '110px', '110px', '110px', '110px', '110px', '110px'
  ]

  // 18 本書的個別 margin 設定（針對有旋轉的書本）
  const bookMargins = [
    { left: '0px', right: '0px' },     // 01 克羅埃西亞 - 無旋轉
    { left: '0px', right: '0px' },     // 02 捷克 - 無旋轉
    { left: '0px', right: '0px' },     // 03 葡萄牙 - 無旋轉
    { left: '15px', right: '15px' },   // 04 瑞士 - 逆時針 5 度
    { left: '0px', right: '0px' },     // 05 愛爾蘭 - 無旋轉
    { left: '0px', right: '0px' },     // 06 德國 - 無旋轉
    { left: '18px', right: '13px' },   // 07 匈牙利 - 順時針 5 度
    { left: '0px', right: '0px' },     // 08 西班牙 - 無旋轉
    { left: '0px', right: '0px' },     // 09 希臘 - 無旋轉
    { left: '0px', right: '0px' },     // 10 比利時 - 無旋轉
    { left: '18px', right: '8px' },   // 11 義大利 - 逆時針 5 度
    { left: '15px', right: '6px' },   // 12 奧地利 - 順時針 2 度
    { left: '0px', right: '0px' },     // 13 英國 - 無旋轉
    { left: '8px', right: '8px' },   // 14 法國 - 逆時針 2 度
    { left: '0px', right: '0px' },     // 15 波羅地海 - 無旋轉
    { left: '0px', right: '0px' },     // 16 荷蘭 - 無旋轉
    { left: '15px', right: '15px' },   // 17 北歐 - 逆時針 5 度
    { left: '0px', right: '0px' },     // 18 盧森堡 - 無旋轉
  ]

  const cards = [
    { id: 'croatia', number: '01', destination: '克羅埃西亞', english: 'Republic of Croatia', pattern: '/book-shell/patterns/hr-croatia.svg' },
    { id: 'czech', number: '02', destination: '捷克', english: 'Czech Republic', pattern: '/book-shell/patterns/cz-czech.svg' },
    { id: 'portugal', number: '03', destination: '葡萄牙', english: 'Portugal', pattern: '/book-shell/patterns/pt-portugal.svg' },
    { id: 'switzerland', number: '04', destination: '瑞士', english: 'Switzerland', pattern: '/book-shell/patterns/ch-switzerland.svg' },
    { id: 'ireland', number: '05', destination: '愛爾蘭', english: 'Ireland', pattern: '/book-shell/patterns/ie-ireland.svg' },
    { id: 'germany', number: '06', destination: '德國', english: 'Germany', pattern: '/book-shell/patterns/de-germany.svg' },
    { id: 'hungary', number: '07', destination: '匈牙利', english: 'Hungary', pattern: '/book-shell/patterns/hu-hungary.svg' },
    { id: 'spain', number: '08', destination: '西班牙', english: 'Spain', pattern: '/book-shell/patterns/es-spain.svg' },
    { id: 'greece', number: '09', destination: '希臘', english: 'Greece', pattern: '/book-shell/patterns/gr-greece.svg' },
    { id: 'belgium', number: '10', destination: '比利時', english: 'Belgium', pattern: '/book-shell/patterns/be-belgium.svg' },
    { id: 'italy', number: '11', destination: '義大利', english: 'Italy', pattern: '/book-shell/patterns/it-italy.svg' },
    { id: 'austria', number: '12', destination: '奧地利', english: 'Austria', pattern: '/book-shell/patterns/at-austria.svg' },
    { id: 'uk', number: '13', destination: '英國', english: 'United Kingdom', pattern: '/book-shell/patterns/gb-uk.svg' },
    { id: 'france', number: '14', destination: '法國', english: 'France', pattern: '/book-shell/patterns/fr-france.svg' },
    { id: 'baltic', number: '15', destination: '波羅地海三小國', english: 'Baltic States', pattern: '/book-shell/patterns/baltic-states.svg' },
    { id: 'netherlands', number: '16', destination: '荷蘭', english: 'Netherlands', pattern: '/book-shell/patterns/nl-netherlands.svg' },
    { id: 'nordic', number: '17', destination: '北歐', english: 'Scandi', pattern: '/book-shell/patterns/nordic-countries.svg' },
    { id: 'luxembourg', number: '18', destination: '盧森堡', english: 'Luxembourg', pattern: '/book-shell/patterns/lu-luxembourg.svg' },
  ]

  return (
    <div className='w-full flex items-end lg:flex-[0_0_59.5%] lg:max-w-[1142.4px] min-w-0 lg:border-r lg:border-[var(--color-figma-secondary-500)]'>
      <div
        ref={bookshelfRef}
        className='relative overflow-hidden select-none cursor-grab active:cursor-grabbing'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={trackRef}
          className='flex items-end gap-3 transform translate-x-[var(--tx)] [will-change:transform]'
          style={{ ['--tx' as any]: `${translateX}px` }}
        >
          {cards.map((c, idx) => {
            const mobileSize = cardSizesMobile[idx]
            const webSize = cardSizesWeb[idx]
            const rotation = rotations[idx]
            const webWidth = webSize.split(' ')[0].replace('w-[', '').replace('px]', '')
            const webHeight = webSize.split(' ')[1].replace('h-[', '').replace('px]', '')
            const className = `${mobileSize} ${rotation} lg:[width:var(--w)] lg:[height:var(--h)]`
            
            console.log(`Card ${c.number}: ${className}`)
            
            return (
              <DestinationCard
                key={c.id}
                number={c.number}
                destination={c.destination}
                englishName={c.english}
                countryPattern={c.pattern}
                isActive={activeCardId === c.id}
                onClick={() => handleCardClick(c.id)}
                containerClassName={className}
                patternTopOffset={patternTopOffsets[idx]}
                style={{ 
                  ['--w' as any]: `${webWidth}px`, 
                  ['--h' as any]: `${webHeight}px`,
                  marginLeft: bookMargins[idx].left,
                  marginRight: bookMargins[idx].right
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BookShelf 