'use client'

import { useState } from 'react'
import InteractiveMap from './InteractiveMap'
import type { TBaseComponent } from '@/types'
import Image from 'next/image'
import IconCta from '@/components/shared/icons/IconCta'

type TCollectionRecommendationProps = TBaseComponent

const CollectionRecommendation = ({ className }: TCollectionRecommendationProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <section className={`py-16 px-4 ${className} bg-[var(--color-figma-secondary-100)] relative`}>
      <div className='max-w-7xl mx-auto relative'>
        <div className='absolute top-0 left-0 w-full h-full bg-figma-neutral-50'>
          <Image
            alt="背景裝飾"
            className="object-cover rounded-2xl h-full"
            src="/home/recommend/bg.jpg" width={1824} height={695}
          />
        </div>

        <h2 className='text-center absolute top-0 text-4xl font-bold text-gray-900 left-1/2 -translate-x-1/2 bg-[var(--color-figma-secondary-100)] px-6 py-4 rounded-bl-2xl rounded-br-2xl'>
          典藏推薦
        </h2>

        <InteractiveMap
          selectedRegion={selectedRegion}
          onRegionSelect={setSelectedRegion}
        />
      </div>

      <div>
        <div className='group'>
          <Image src="/home/recommend/area-1.jpg" alt="推薦地點-1" width={60} height={60} />

          <div>
            <p>孝親輕鬆休閒10日遊</p>

            <div>
              <p>愛爾蘭</p>
              <IconCta />
            </div>
          </div>
        </div>

        <div className='group'>
          <Image src="/home/recommend/area-2.jpg" alt="推薦地點-2" width={60} height={60} />

          <div>
            <p>親子五人暑假快樂遊</p>

            <div>
              <p>奧地利</p>
              <IconCta />
            </div>
          </div>
        </div>

        <div className='group'>
          <Image src="/home/recommend/area-3.jpg" alt="推薦地點-3" width={60} height={60} />

          <div>
            <p>小資5日輕鬆遊</p>

            <div>
              <p>比利時</p>
              <IconCta />
            </div>
          </div>
        </div>

        <div className='group'>
          <Image src="/home/recommend/area-4.jpg" alt="推薦地點-4" width={60} height={60} />

          <div>
            <p>新婚夫妻15日蜜月遊</p>

            <div>
              <p>英國</p>
              <IconCta />
            </div>
          </div>
        </div>

        <div className='group'>
          <Image src="/home/recommend/area-5.jpg" alt="推薦地點-5" width={60} height={60} />

          <div>
            <p>閨蜜6日渡假遊</p>

            <div>
              <p>西班牙</p>
              <IconCta />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionRecommendation