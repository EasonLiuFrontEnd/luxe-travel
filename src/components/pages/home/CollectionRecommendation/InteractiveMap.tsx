'use client'

import EuropeMap from './EuropeMap'
import type { TBaseComponent } from '@/types'
import IconCta from '@/components/shared/icons/IconCta'

type TInteractiveMapProps = TBaseComponent & {
  selectedRegion: string | null
  onRegionSelect: (regionId: string | null) => void
}

const InteractiveMap = ({
  selectedRegion,
  onRegionSelect,
  className
}: TInteractiveMapProps) => {
  return (
    <div className={`flex justify-center items-center pb-[69px] pt-[141px]`}>
    <div className={`w-fit relative`}>
      <EuropeMap
        selectedRegion={selectedRegion}
        onRegionClick={onRegionSelect}
      />

      <div className='absolute -left-[calc(50%+29px)] -translate-x-[calc(50%+29px)] group'>
        {selectedRegion ? (
          <div className='p-6 bg-white rounded-lg shadow-lg'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              {getRegionName(selectedRegion)}
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              {getRegionDescription(selectedRegion)}
            </p>
            <div className=''>
              查看行程
              <IconCta />
            </div>
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
  )
}

const getRegionName = (regionId: string): string => {
  const regions: Record<string, string> = {
    'it': '義大利',
    'at': '奧地利',
    'uk': '英國',
    'fr': '法國',
    'be': '比利時',
    'es': '西班牙',
    'de': '德國',
    'se': '瑞典',
    'ie': '愛爾蘭',
    'nl': '荷蘭',
    'lu': '盧森堡',
    'hu': '匈牙利',
    'lt': '立陶宛',
    'lv': '拉脫維亞',
    'pl': '波蘭',
    'cz': '捷克',
    'ro': '羅馬尼亞',
    'bg': '保加利亞',
    'hr': '克羅埃西亞',
    'sk': '斯洛伐克',
    'si': '斯洛維尼亞',
  }
  return regions[regionId] || '未知地區'
}

const getRegionDescription = (regionId: string): string => {
  const descriptions: Record<string, string> = {
    'it': '新婚夫妻15日蜜月遊',
    'at': '親子五人暑假快樂遊',
    'uk': '小資5日輕鬆遊',
    'fr': '新婚夫妻15日蜜月遊',
    'be': '閨蜜6日渡假遊',
    'es': '新婚夫妻15日蜜月遊',
    'de': '小資5日輕鬆遊',
    'se': '閨蜜6日渡假遊',
  }
  return descriptions[regionId] || '這個地區有著獨特的文化和美麗的風景。'
}

export default InteractiveMap