'use client'

import { useMemo } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useConcerns } from '@/api/home/useConcerns'
import { useScrollDrivenAnimation } from '@/hooks/useScrollDrivenAnimation'
import StickyNotes from './StickyNotes'

const Concerns = () => {
  const { isMobile } = useMediaQuery()
  const { query: concernsQuery, mock } = useConcerns()
  const { containerRef, notePositions, getNoteTransformY } =
    useScrollDrivenAnimation()
  const {
    data: concernsData,
    isLoading: isConcernsLoading,
    error: concernsError,
  } = concernsQuery

  const effectiveData = useMemo(() => {
    if (concernsError || !concernsData) {
      return mock.rows
    }

    if (isConcernsLoading) {
      return mock.rows
    }

    // 使用 API 資料
    return concernsData
  }, [concernsError, concernsData, isConcernsLoading, mock.rows])

  const gradientStyle = {
    background:
      'linear-gradient(to bottom, transparent 0%, transparent calc(100% - 26px), #e5d9bf calc(100% - 26px), #e5d9bf 100%)',
  }

  const gridBackgroundStyle = {
    backgroundColor: '#F2F2F2',
    backgroundImage: `
        linear-gradient(90deg, #ECE7DB 1px, transparent 1px),
        linear-gradient(#ECE7DB 1px, transparent 1px),
        linear-gradient(180deg, #F2F2F2 0%, #ECE7DB 100%)
    `,
    backgroundSize: '46.8px 46.8px, 46.8px 46.8px, 100% 100%',
  }

  return (
    <div
      className='flex flex-col justify-center items-center self-stretch gap-y-[32px] xl:gap-y-[120px] xl:pt-[200px] py-[60px] px-[12px] relative z-20'
      style={gridBackgroundStyle}
    >
      <h2
        ref={containerRef}
        className='font-noto-serif-tc font-bold text-[32px] xl:text-[64px] xl:leading-[1.2] text-figma-primary-950 py-[6px] px-[12px] text-center'
      >
        {isMobile ? (
          <>
            <span style={gradientStyle}>歐洲自由行</span>
            <br />
            <span style={gradientStyle}>規劃煩惱多？</span>
          </>
        ) : (
          <span style={gradientStyle}>歐洲自由行規劃煩惱多？</span>
        )}
      </h2>
      <div className='flex flex-col items-center gap-8 xl:gap-7 xl:flex-row xl:justify-center w-full'>
        {effectiveData.map((concern, index) => {
          const rotations = [-2.23, 1.82, 3.73, -3.15, 2.23]
          const colors = ['#BDA05E', '#8BC3DE', '#5B5B6E', '#FFD900', '#BDA05E']
          const offsetYs = ['0', '28', '0', '26', '0']

          return (
            <StickyNotes
              key={concern.id}
              data={concern}
              rotation={rotations[index]}
              color={colors[index]}
              offsetY={isMobile ? '0' : offsetYs[index]}
              position={isMobile ? 100 : notePositions[index]}
              transformY={isMobile ? 0 : getNoteTransformY(notePositions[index])}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Concerns
