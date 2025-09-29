'use client'

import { useState, useEffect, useCallback } from 'react'
import GroupToursBanner from '@/components/pages/group-tours/Banner'
import DestinationFilter from '@/components/pages/group-tours/DestinationFilter'
import ResultsSort from '@/components/pages/group-tours/ResultsSort'
import GroupTourResults from '@/components/pages/group-tours/GroupTourResults'
import {
  convertCountriesToFilters,
  getCountryCodes,
  convertSortOption,
  convertProductToTourData,
  type TTourData,
  type TSelectedFilters
} from '@/components/pages/group-tours/config'
import { useProductsSearch, type TProductSearchParams } from '@/api'
import type { TBaseComponent } from '@/types'

type TGroupToursPageProps = TBaseComponent

const GroupToursPage = ({ className }: TGroupToursPageProps) => {
  const [searchedCountries, setSearchedCountries] = useState<TSelectedFilters>([])
  const [showResultsSort, setShowResultsSort] = useState(false)
  const [searchParams, setSearchParams] = useState<TProductSearchParams>({
    page: 1,
    limit: 10,
    sort: 'priceMin',
    order: 'asc'
  })
  const [tours, setTours] = useState<TTourData[]>([])
  const [isUsingMockData, setIsUsingMockData] = useState(false)
  const [bannerData, setBannerData] = useState<Array<{
    id: string
    namePrefix: string
    name: string
    summary: string
    mainImageUrl: string
  }>>([])

  const { query: searchQuery, mock: searchMock } = useProductsSearch(searchParams)

  useEffect(() => {
    if (searchedCountries.length === 0) {
      setTours([])
      return
    }

    const searchedCountryIds = searchedCountries
      .filter(f => f.type === 'country')
      .map(f => f.id)

    if (searchedCountryIds.length === 0) {
      setTours([])
      return
    }

    if (searchQuery.data && searchQuery.data.length > 0) {
      const convertedTours = searchQuery.data.map(convertProductToTourData)
      setTours(convertedTours)
      setBannerData(searchQuery.data)
      setIsUsingMockData(false)
    } else {
      const searchedCountryCodes = getCountryCodes(searchedCountryIds)

      const mockDataMatches = searchMock.data?.some(mockProduct => {
        return mockProduct.countries.some(mockCountryCode =>
          searchedCountryCodes.includes(mockCountryCode)
        )
      })

      if (mockDataMatches && searchMock.data) {
        const relevantMockData = searchMock.data.filter(mockProduct =>
          mockProduct.countries.some(mockCountryCode =>
            searchedCountryCodes.includes(mockCountryCode)
          )
        )
        const convertedTours = relevantMockData.map(convertProductToTourData)
        setTours(convertedTours)
        setBannerData(relevantMockData)
        setIsUsingMockData(true)
      } else {
        setTours([])
        setBannerData([])
        setIsUsingMockData(false)
      }
    }
  }, [searchQuery.data, searchedCountries, searchMock.data])

  const handleSearch = useCallback((selectedCountries: string[]) => {
    const countryFilters = convertCountriesToFilters(selectedCountries)
    setSearchedCountries(countryFilters)
    setShowResultsSort(true)

    if (selectedCountries.length > 0) {
      const countryCodes = getCountryCodes(selectedCountries)
      const newSearchParams = {
        destination: countryCodes.join(','),
        page: 1,
        limit: 10,
        sort: searchParams.sort || 'priceMin',
        order: searchParams.order || 'asc'
      }
      setSearchParams(newSearchParams)
    } else {
      setTours([])
      setShowResultsSort(false)
    }
  }, [searchParams.sort, searchParams.order])

  const handleRemoveFilter = useCallback((filterId: string) => {
    const updatedFilters = searchedCountries.filter((filter) => filter.id !== filterId)
    setSearchedCountries(updatedFilters)

    if (updatedFilters.length === 0) {
      setSearchParams(prev => ({
        ...prev,
        destination: undefined,
        page: 1
      }))
      setTours([])
      setShowResultsSort(false)
    } else {
      const remainingCountryIds = updatedFilters
        .filter(f => f.type === 'country')
        .map(f => f.id)

      if (remainingCountryIds.length > 0) {
        const countryCodes = getCountryCodes(remainingCountryIds)
        setSearchParams(prev => ({
          ...prev,
          destination: countryCodes.join(','),
          page: 1
        }))
      } else {
        setTours([])
        setShowResultsSort(false)
      }
    }
  }, [searchedCountries])

  const handleSort = useCallback((sortOption: string) => {
    const { sort, order } = convertSortOption(sortOption)
    setSearchParams(prev => ({
      ...prev,
      sort,
      order,
      page: 1
    }))
  }, [])

  return (
    <main className={`min-h-screen bg-figma-neutral-50 ${className || ''}`}>
      <div className='pt-[37px] xl:pt-[60px] px-[clamp(12px,2.5vw,48px)]'>
        <h1 className='font-family-noto-serif font-bold text-[48px] xl:text-[96px] leading-[1.2] text-figma-primary-950'>
          精緻團體行
        </h1>
      </div>
      <GroupToursBanner tours={bannerData} />
      <DestinationFilter onSearch={handleSearch} />
      {showResultsSort && (
        <ResultsSort
          resultCount={tours.length}
          selectedFilters={searchedCountries}
          onRemoveFilter={handleRemoveFilter}
          onSort={handleSort}
          isUsingMockData={isUsingMockData}
        />
      )}

      <div className='px-[clamp(12px,2.5vw,48px)] pb-[80px] mt-9 xl:mt-[79px]'>
        <GroupTourResults tours={tours} />
      </div>
    </main>
  )
}

export default GroupToursPage
