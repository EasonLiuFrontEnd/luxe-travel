'use client'

import { useState } from 'react'
import Image from 'next/image'
import InteractiveMap from './InteractiveMap'
import RecommendationList from './RecommendationList'
import type { TBaseComponent } from '@/types'
import { regionData } from './config'

type TCollectionRecommendationProps = TBaseComponent

const CollectionRecommendation = ({
  className,
}: TCollectionRecommendationProps) => {
  const firstRegionId = Object.keys(regionData)[0]
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    firstRegionId,
  )

  return (
    <section
      className={`py-16 px-4 bg-[var(--color-figma-secondary-100)] relative ${className}`}
    >
      <div className='max-w-7xl mx-auto relative'>
        <div className='w-full bg-figma-neutral-50 relative rounded-2xl overflow-hidden'>
          <Image
            alt='背景裝飾'
            className='object-cover'
            src='/home/recommend/bg.jpg'
            fill
          />

          <div className='absolute inset-0 bg-black/20 rounded-2xl'></div>

          <div className='relative z-10'>
            <h2
              className='text-center font-family-noto-serif text-[32px] leading-[1.5] font-bold text-[#383841] bg-[var(--color-figma-secondary-100)] px-4 py-3 rounded-bl-2xl rounded-br-2xl mx-auto w-fit
                           lg:text-[64px] lg:leading-[1.2] lg:px-7 lg:py-4'
            >
              典藏推薦
            </h2>

            <div className='mt-8 lg:mt-10 flex justify-center'>
              <div className='w-[361px] h-[435px] lg:w-[402px] lg:h-[485px] relative'>
                <InteractiveMap
                  selectedRegion={selectedRegion}
                  onRegionSelect={setSelectedRegion}
                />
              </div>
            </div>

            <div className='h-12 lg:h-7'></div>
          </div>
        </div>
      </div>

      <RecommendationList />
    </section>
  )
}

export default CollectionRecommendation
