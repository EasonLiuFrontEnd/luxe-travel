'use client'

import { useState } from 'react'
import Image from 'next/image'
import InteractiveMap from './InteractiveMap'
import RecommendationList from './RecommendationList'
import type { TBaseComponent } from '@/types'
import { regionData } from './config'

type TCollectionRecommendationProps = TBaseComponent & {
  collectionRef?: React.RefObject<HTMLDivElement>
}

const CollectionRecommendation = ({
  className,
  collectionRef,
}: TCollectionRecommendationProps) => {
  const firstRegionId = Object.keys(regionData)[0]
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    firstRegionId,
  )

  return (
    <section
      className={`pb-[60px] lg:py-[120px] px-[clamp(12px,2.5vw,48px)] bg-[var(--color-figma-secondary-100)] relative xl:sticky xl:top-[-40vh] xl:left-0 ${className || ''}`}
    >
      <div className='mx-auto relative'>
        <div className='w-full bg-figma-neutral-50 relative rounded-2xl overflow-hidden'>
          <Image
            alt='背景裝飾'
            className='object-cover'
            src='/home/recommend/bg.jpg'
            fill
          />

          <div className='absolute inset-0 bg-black/20 rounded-2xl'></div>

          <div ref={collectionRef} className='relative z-10'>
            <h2
              className='text-center font-family-noto-serif text-[32px] leading-[1.5] font-bold text-[#383841] bg-[var(--color-figma-secondary-100)] px-4 py-3 rounded-bl-2xl rounded-br-2xl mx-auto w-fit
                           xl:text-[64px] xl:leading-[1.2] lg:px-7 lg:py-4'
            >
              典藏推薦
            </h2>

            <div className='mt-[40px] flex justify-center'>
              <div className='w-[361px] h-[435px] lg:w-[402px] lg:h-[485px] relative'>
                <InteractiveMap
                  selectedRegion={selectedRegion}
                  onRegionSelect={setSelectedRegion}
                />
              </div>
            </div>

            <div className='h-[69px]'></div>
          </div>
        </div>
      </div>

      <RecommendationList />
    </section>
  )
}

export default CollectionRecommendation
