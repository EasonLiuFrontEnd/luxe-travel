'use client'

import { useState } from 'react'
import InteractiveMap from './InteractiveMap'
import type { TBaseComponent } from '@/types'

type TCollectionRecommendationProps = TBaseComponent

const CollectionRecommendation = ({ className }: TCollectionRecommendationProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <section className={`py-16 px-4 ${className} bg-[var(--color-figma-secondary-100)] relative`}>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            典藏推薦
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            探索歐洲精選目的地，每個角落都有獨特的文化與風景等待您的發現
          </p>
        </div>
        
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='relative'>
            <InteractiveMap 
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
            />
          </div>
          
          <div className='space-y-6'>
            {selectedRegion ? (
              <div className='p-6 bg-white rounded-lg shadow-lg'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  {getRegionName(selectedRegion)}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {getRegionDescription(selectedRegion)}
                </p>
                <button className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                  探索更多
                </button>
              </div>
            ) : (
              <div className='p-6 bg-gray-50 rounded-lg'>
                <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                  選擇一個地區
                </h3>
                <p className='text-gray-600'>
                  點擊地圖上的區域來了解更多關於該地區的旅遊資訊
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const getRegionName = (regionId: string): string => {
  const regions: Record<string, string> = {
    'iberian-peninsula': '伊比利半島',
    'baltic-states': '波羅的海國家'
  }
  return regions[regionId] || '未知地區'
}

const getRegionDescription = (regionId: string): string => {
  const descriptions: Record<string, string> = {
    'iberian-peninsula': '伊比利半島包括西班牙和葡萄牙，以其燦爛的陽光、豐富的歷史和熱情的佛朗明哥文化而聞名。從巴塞隆納的高第建築到里斯本的電車，每個角落都充滿了獨特的魅力。',
    'baltic-states': '波羅的海三國（愛沙尼亞、拉脫維亞、立陶宛）擁有保存完好的中世紀老城、美麗的海岸線和豐富的文化遺產。塔林的古城牆和里加的新藝術建築都是不容錯過的景點。'
  }
  return descriptions[regionId] || '這個地區有著獨特的文化和美麗的風景。'
}

export default CollectionRecommendation