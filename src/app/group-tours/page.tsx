'use client'

import { useState } from 'react'
import GroupToursBanner from '@/components/pages/group-tours/Banner'
import DestinationFilter from '@/components/pages/group-tours/DestinationFilter'
import SearchResults from '@/components/pages/group-tours/SearchResults'
import GroupTourResults from '@/components/pages/group-tours/GroupTourResults'
import { convertCountriesToFilters } from '@/components/pages/group-tours/config'
import type { TBaseComponent } from '@/types'

type TGroupToursPageProps = TBaseComponent

const GroupToursPage = ({ className }: TGroupToursPageProps) => {
  const [searchedCountries, setSearchedCountries] = useState<Array<{
    id: string
    label: string
    type: 'country' | 'price' | 'other'
  }>>([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const handleSearch = (selectedCountries: string[]) => {
    const countryFilters = convertCountriesToFilters(selectedCountries)
    setSearchedCountries(countryFilters)
    setShowSearchResults(true)
  }

  const handleRemoveFilter = (filterId: string) => {
    setSearchedCountries(prev => prev.filter(filter => filter.id !== filterId))
  }

  return (
    <main className={`min-h-screen bg-figma-neutral-50 ${className || ''}`}>
      <div className='pt-[37px] xl:pt-[60px] px-[clamp(12px,2.5vw,48px)]'>
          <h1 className='font-family-noto-serif font-bold text-[48px] xl:text-[96px] leading-[1.2] text-figma-primary-950'>
            精緻團體行
          </h1>
      </div>
      <GroupToursBanner />
      <DestinationFilter onSearch={handleSearch} />
      {showSearchResults && (
        <SearchResults
          selectedFilters={searchedCountries}
          onRemoveFilter={handleRemoveFilter}
        />
      )}

      <div className='px-[clamp(12px,2.5vw,48px)] pb-[80px] mt-9 xl:mt-[79px]'>
        <GroupTourResults />
      </div>
    </main>
  )
}

export default GroupToursPage