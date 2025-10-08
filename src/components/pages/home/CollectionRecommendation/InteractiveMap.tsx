'use client'

import { useState, useLayoutEffect } from 'react'
import Image from 'next/image'
import EuropeMap from './EuropeMap'
import IconCta from '@/components/shared/icons/IconCta'
import { regionData } from './config'

type TInteractiveMapProps = {
  selectedRegion: string | null
  onRegionSelect: (
    regionId: string | null,
    elementPosition?: { x: number; y: number },
  ) => void
  className?: string
}

const InteractiveMap = ({
  selectedRegion,
  onRegionSelect,
}: TInteractiveMapProps) => {
  const [clickPosition, setClickPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const selectedRegionData = selectedRegion ? regionData[selectedRegion] : null

  useLayoutEffect(() => {
    if (selectedRegion && !clickPosition) {
      const regionElement = document.querySelector(
        `#${selectedRegion}`,
      ) as SVGPathElement
      if (regionElement) {
        const svgRect = regionElement.ownerSVGElement?.getBoundingClientRect()
        const elementRect = regionElement.getBoundingClientRect()

        if (svgRect) {
          const elementPosition = {
            x: elementRect.left + elementRect.width / 2 - svgRect.left,
            y: elementRect.top + elementRect.height / 2 - svgRect.top,
          }
          setClickPosition(elementPosition)
        }
      }
    }
  }, [selectedRegion, clickPosition])

  const handleRegionSelect = (
    regionId: string | null,
    elementPosition?: { x: number; y: number },
  ) => {
    if (elementPosition) {
      setClickPosition(elementPosition)
    } else {
      setClickPosition(null)
    }
    onRegionSelect(regionId, elementPosition)
  }

  return (
    <div className='w-full h-full relative'>
      <EuropeMap
        selectedRegion={selectedRegion}
        onRegionClick={handleRegionSelect}
      />

      {selectedRegion && clickPosition && (
        <div
          className='absolute pointer-events-none z-10'
          style={{
            left: `${clickPosition.x}px`,
            top: `${clickPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Image
            src='/home/recommend/pressed.svg'
            alt='選中指示器'
            width={33}
            height={50}
            className='w-[29.634px] h-[44.9px] lg:w-[32.999px] lg:h-[50px]'
          />
        </div>
      )}

      {selectedRegionData && (
        <div
          className='absolute left-1/2 top-0 -translate-x-full translate-y-0 pr-0
                          md:left-0 md:top-0 md:-translate-x-[60px] md:translate-y-0 md:pr-0
                          xl:left-0 xl:top-1/2 xl:-translate-x-full xl:-translate-y-1/2 xl:pr-[29px]'
        >
          <div
            className='flex flex-col items-center justify-start relative mt-0
                            md:flex-row md:items-center md:justify-start'
          >
            <div
              className='bg-white box-border flex flex-col gap-1 items-center justify-center p-3 rounded-xl shadow-lg
                              md:flex-row md:gap-5 md:items-center md:justify-start md:p-5 md:rounded-2xl md:max-w-[90vw]
                              xl:max-w-none'
            >
              <div
                className='bg-center bg-cover bg-no-repeat rounded size-20 flex-shrink-0
                             md:size-[100px]'
                style={{
                  backgroundImage: `url('${selectedRegionData.image}')`,
                }}
              />
              <div
                className='flex flex-col justify-between w-auto h-auto
                                md:min-h-[100px] md:w-[180px] xl:w-[220px]'
              >
                <div
                  className='flex flex-col items-center text-[#383841]
                                  md:gap-1.5 md:items-start'
                >
                  <div
                    className='text-sm leading-[1.5] font-normal hidden
                                    md:block'
                  >
                    {selectedRegionData.description}
                  </div>
                  <div
                    className='text-base leading-[1.5] font-medium text-center
                                    md:text-2xl md:leading-[1.2] md:font-bold md:text-left'
                  >
                    {selectedRegionData.name}
                  </div>
                </div>
                <div
                  className='flex items-center justify-end px-3 py-1 rounded-[18px] cursor-pointer group group/cta hidden
                                  md:flex'
                >
                  <div className='text-[#926d3c] text-base font-medium leading-[1.5]'>
                    查看行程
                  </div>
                  <div className='w-[24.68px] group-hover/cta:w-[37.68px] transition-all duration-300 ml-2 overflow-hidden'>
                    <IconCta className='text-[var(--color-figma-secondary-950)]' />
                  </div>
                </div>
              </div>
            </div>
            <div
              className='flex items-center justify-center relative -ml-1 hidden
                              xl:flex'
            >
              <div className='w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent'></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveMap
