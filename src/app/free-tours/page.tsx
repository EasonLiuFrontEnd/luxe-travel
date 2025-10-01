'use client'

import { useState, useCallback } from 'react'
import FreeToursBanner from '@/components/pages/free-tours/Banner'
import DestinationFilter from '@/components/pages/free-tours/DestinationFilter'
import ResultsSort from '@/components/pages/free-tours/ResultsSort'
import FreeTourResults from '@/components/pages/free-tours/FreeTourResults'
import {
  convertCountriesToFilters,
  mockTours,
  type TTourData,
  type TSelectedFilters
} from '@/components/pages/free-tours/config'
import type { TBaseComponent } from '@/types'

type TFreeToursPageProps = TBaseComponent

const FreeToursPage = ({ className }: TFreeToursPageProps) => {
  const [searchedCountries, setSearchedCountries] = useState<TSelectedFilters>([])
  const [showResultsSort, setShowResultsSort] = useState(false)
  const [tours, setTours] = useState<TTourData[]>([])

  const handleSearch = useCallback((selectedCountries: string[], budgetRange: [number, number], daysRange: string | null) => {
    const countryFilters = convertCountriesToFilters(selectedCountries)
    setSearchedCountries(countryFilters)
    setShowResultsSort(true)

    if (selectedCountries.length > 0) {
      let filteredTours = mockTours.filter(tour =>
        selectedCountries.some(countryId => tour.countries?.includes(countryId))
      )

      filteredTours = filteredTours.filter(tour =>
        tour.price >= budgetRange[0] && tour.price <= budgetRange[1]
      )

      if (daysRange && daysRange !== '不限天數') {
        const [minDays, maxDays] = daysRange.replace('天', '').split('-').map(Number)
        filteredTours = filteredTours.filter(tour => {
          const days = tour.days || 0
          return days >= minDays && days <= maxDays
        })
      }

      setTours(filteredTours)
    } else {
      setTours([])
      setShowResultsSort(false)
    }
  }, [])

  const handleRemoveFilter = useCallback((filterId: string) => {
    const updatedFilters = searchedCountries.filter((filter) => filter.id !== filterId)
    setSearchedCountries(updatedFilters)

    if (updatedFilters.length === 0) {
      setTours([])
      setShowResultsSort(false)
    } else {
      const remainingCountryIds = updatedFilters
        .filter(f => f.type === 'country')
        .map(f => f.id)

      if (remainingCountryIds.length > 0) {
        const filteredTours = mockTours.filter(tour =>
          remainingCountryIds.some(countryId => tour.countries?.includes(countryId))
        )
        setTours(filteredTours)
      } else {
        setTours([])
        setShowResultsSort(false)
      }
    }
  }, [searchedCountries])

  const handleSort = useCallback((sortOption: string) => {
    const sortedTours = [...tours].sort((a, b) => {
      switch (sortOption) {
        case '價格（低到高）':
          return a.price - b.price
        case '價格（高到低）':
          return b.price - a.price
        case '評價（低到高）':
          return a.id.localeCompare(b.id)
        case '評價（高到低）':
          return b.id.localeCompare(a.id)
        case '離市中心遠近':
          return a.price - b.price
        default:
          return 0
      }
    })
    setTours(sortedTours)
  }, [tours])

  return (
    <main className={`min-h-screen bg-figma-neutral-50 ${className || ''}`}>
      <div className='pt-[37px] xl:pt-[60px] px-[clamp(12px,2.5vw,48px)]'>
        <h1 className='font-family-noto-serif font-bold text-[48px] xl:text-[96px] leading-[1.2] text-figma-primary-950'>
          自由行程
        </h1>
      </div>
      <FreeToursBanner tours={mockTours.slice(0, 6)} />
      <DestinationFilter onSearch={handleSearch} />
      {showResultsSort && (
        <ResultsSort
          resultCount={tours.length}
          selectedFilters={searchedCountries}
          onRemoveFilter={handleRemoveFilter}
          onSort={handleSort}
        />
      )}

      <div className='px-[clamp(12px,2.5vw,48px)] pb-[80px] mt-9 xl:mt-[79px]'>
        <FreeTourResults tours={tours} />
      </div>
    </main>
  )
}

export default FreeToursPage