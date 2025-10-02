'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import TourBanner from '@/components/shared/TourBanner'
import DestinationFilter from '@/components/pages/group-tours/DestinationFilter'
import ResultsSort from '@/components/shared/ResultsSort'
import GroupTourResults from '@/components/pages/group-tours/GroupTourResults'
import {
  convertCountriesToFilters,
  getCountryCodes,
  convertProductToTourData,
  SORT_OPTIONS,
  SLIDE_CONTENT,
  type TTourData,
  type TSelectedFilters
} from '@/components/pages/group-tours/config'
import { useProductsSearch, useProductCountries, type TProductSearchParams, type TProduct } from '@/api'
import type { TBaseComponent } from '@/types'

type TGroupToursPageProps = TBaseComponent

const sortProducts = (products: TProduct[]): TProduct[] => {
  return [...products].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

const GroupToursPage = ({ className }: TGroupToursPageProps) => {
  const [searchedCountries, setSearchedCountries] = useState<TSelectedFilters>([])
  const [searchParams, setSearchParams] = useState<TProductSearchParams>({
    category: 'GROUP',
    page: 1,
    limit: 100,
    sort: 'createdAt',
    order: 'desc'
  })
  const [tours, setTours] = useState<TTourData[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const { query: searchQuery, mock: searchMock } = useProductsSearch(searchParams)
  const { query: countriesQuery, mock: countriesMock } = useProductCountries()

  const regionsData = useMemo(() =>
    countriesQuery.data || countriesMock.data || []
  , [countriesQuery.data, countriesMock.data])

  useEffect(() => {
    if (searchQuery.isSuccess) {
      let dataSource = searchQuery.data && searchQuery.data.length > 0
        ? searchQuery.data
        : (searchMock.data || [])

      if (dataSource.length > 0) {
        const destinationCodes = searchParams.destination?.split(',') || []
        if (destinationCodes.length > 0) {
          dataSource = dataSource.filter(product =>
            destinationCodes.some(code => product.countries.includes(code))
          )
        }

        const sortedProducts = sortProducts(dataSource)
        const convertedTours = sortedProducts.map(convertProductToTourData)
        setTours(convertedTours)
      } else {
        setTours([])
      }
    }
  }, [searchQuery.isSuccess, searchQuery.data, searchMock.data, searchParams])

  const handleSearch = useCallback((selectedCountries: string[]) => {
    const countryFilters = convertCountriesToFilters(selectedCountries, regionsData)
    setSearchedCountries(countryFilters)
    setHasSearched(true)

    const newParams: TProductSearchParams = {
      category: 'GROUP',
      page: 1,
      limit: 100,
      sort: 'priceMin',
      order: 'asc'
    }

    if (selectedCountries.length > 0) {
      const countryCodes = getCountryCodes(selectedCountries)
      newParams.destination = countryCodes.join(',')
    }

    setSearchParams(newParams)
  }, [regionsData])

  const handleRemoveFilter = useCallback((filterId: string) => {
    const updatedFilters = searchedCountries.filter((filter) => filter.id !== filterId)
    setSearchedCountries(updatedFilters)

    const newParams: TProductSearchParams = { ...searchParams }

    if (updatedFilters.length === 0) {
      delete newParams.destination
    } else {
      const remainingCountryIds = updatedFilters
        .filter(f => f.type === 'country')
        .map(f => f.id)

      if (remainingCountryIds.length > 0) {
        const countryCodes = getCountryCodes(remainingCountryIds)
        newParams.destination = countryCodes.join(',')
      } else {
        delete newParams.destination
      }
    }

    setSearchParams(newParams)
  }, [searchedCountries, searchParams])

  const handleSort = useCallback((sortOption: string) => {
    const newParams: TProductSearchParams = { ...searchParams }

    switch (sortOption) {
      case '價格（低到高）':
        newParams.sort = 'priceMin'
        newParams.order = 'asc'
        break
      case '價格（高到低）':
        newParams.sort = 'priceMin'
        newParams.order = 'desc'
        break
      default:
        newParams.sort = 'priceMin'
        newParams.order = 'asc'
    }

    setSearchParams(newParams)
  }, [searchParams])

  return (
    <main className={`min-h-screen bg-figma-neutral-50 ${className || ''}`}>
      <div className='pt-[37px] xl:pt-[60px] px-[clamp(12px,2.5vw,48px)]'>
        <h1 className='font-family-noto-serif font-bold text-[48px] xl:text-[96px] leading-[1.2] text-figma-primary-950'>
          精緻團體行
        </h1>
      </div>
      <TourBanner
        tourType='group-tours'
        slideContent={SLIDE_CONTENT}
        tours={searchQuery.data || []}
        isLoading={searchQuery.isLoading}
        altTextPrefix='團體旅遊精選行程'
      />
      <DestinationFilter onSearch={handleSearch} />
      <ResultsSort
        resultCount={tours.length}
        selectedFilters={searchedCountries}
        onRemoveFilter={handleRemoveFilter}
        onSort={handleSort}
        hasSearched={hasSearched}
        sortOptions={SORT_OPTIONS}
      />

      <div className='px-[clamp(12px,2.5vw,48px)] pb-[80px] mt-9 xl:mt-[79px]'>
        <GroupTourResults tours={tours} />
      </div>
    </main>
  )
}

export default GroupToursPage
