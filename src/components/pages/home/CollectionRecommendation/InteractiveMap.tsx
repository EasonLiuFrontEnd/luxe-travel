'use client'

import EuropeMap from './EuropeMap'
import type { TBaseComponent } from '@/types'

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
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <EuropeMap
        selectedRegion={selectedRegion}
        onRegionClick={onRegionSelect}
      />
    </div>
  )
}

export default InteractiveMap