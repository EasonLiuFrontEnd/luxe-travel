'use client'

import { useState, useCallback, useEffect } from 'react'
import FreeToursBanner from '@/components/pages/free-tours/Banner'
import DestinationFilter from '@/components/pages/free-tours/DestinationFilter'
import ResultsSort from '@/components/pages/free-tours/ResultsSort'
import FreeTourResults from '@/components/pages/free-tours/FreeTourResults'
import {
  convertCountriesToFilters,
  getCountryCodes,
  convertProductToTourData,
  type TTourData,
  type TSelectedFilters
} from '@/components/pages/free-tours/config'
import { useProductsSearch, useProductCountries, type TProductSearchParams, type TProduct } from '@/api/free-tours'
import type { TBaseComponent } from '@/types'

type TFreeToursPageProps = TBaseComponent

const sortProducts = (products: TProduct[]): TProduct[] => {
  return [...products].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

const FreeToursPage = ({ className }: TFreeToursPageProps) => {
  const [searchedCountries, setSearchedCountries] = useState<TSelectedFilters>([])
  const [searchParams, setSearchParams] = useState<TProductSearchParams>({
    category: 'FREE',
    page: 1,
    limit: 100,
    sort: 'createdAt',
    order: 'desc'
  })
  const [tours, setTours] = useState<TTourData[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const { query: searchQuery, mock: searchMock } = useProductsSearch(searchParams)
  const { query: countriesQuery, mock: countriesMock } = useProductCountries()

  const regionsData = countriesQuery.data || countriesMock.data || []

  useEffect(() => {
    if (searchQuery.isSuccess) {
      const dataSource = searchQuery.data && searchQuery.data.length > 0
        ? searchQuery.data
        : (searchMock.data || [])

      if (dataSource.length > 0) {
        const sortedProducts = sortProducts(dataSource)
        const convertedTours = sortedProducts.map(convertProductToTourData)
        setTours(convertedTours)
      }
    }
  }, [searchQuery.isSuccess, searchQuery.data, searchMock.data])

  const handleSearch = useCallback((selectedCountries: string[], budgetRange: [number, number], daysRange: string | null) => {
    const filters: TSelectedFilters = []

    if (selectedCountries.length > 0) {
      const countryFilters = convertCountriesToFilters(selectedCountries, regionsData)
      filters.push(...countryFilters)
    }

    const isDefaultBudget = budgetRange[0] === 80000 && budgetRange[1] === 600000
    if (!isDefaultBudget) {
      filters.push({
        id: 'budget',
        label: `＄${budgetRange[0].toLocaleString()} - ＄${budgetRange[1].toLocaleString()}`,
        type: 'price'
      })
    }

    const isDefaultDays = !daysRange || daysRange === '不限天數'
    if (!isDefaultDays) {
      filters.push({
        id: 'days',
        label: daysRange,
        type: 'other'
      })
    }

    setSearchedCountries(filters)
    setHasSearched(true)

    const newParams: TProductSearchParams = {
      category: 'FREE',
      page: 1,
      limit: 100,
      sort: 'priceMin',
      order: 'asc',
      budgetMin: budgetRange[0],
      budgetMax: budgetRange[1]
    }

    if (selectedCountries.length > 0) {
      const countryCodes = getCountryCodes(selectedCountries)
      newParams.destination = countryCodes.join(',')
    }

    if (daysRange && daysRange !== '不限天數') {
      newParams.daysRange = daysRange.replace('天', '')
    }

    setSearchParams(newParams)
  }, [regionsData])

  const handleRemoveFilter = useCallback((filterId: string) => {
    const updatedFilters = searchedCountries.filter((filter) => filter.id !== filterId)
    const newParams: TProductSearchParams = { ...searchParams }

    if (filterId === 'budget') {
      newParams.budgetMin = 80000
      newParams.budgetMax = 600000
      setSearchedCountries(updatedFilters)
    } else if (filterId === 'days') {
      delete newParams.daysRange
      setSearchedCountries(updatedFilters)
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
      setSearchedCountries(updatedFilters)
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
          歐洲自由行
        </h1>
      </div>
      <FreeToursBanner tours={searchQuery.data || []} isLoading={searchQuery.isLoading} />
      <DestinationFilter onSearch={handleSearch} />
      <ResultsSort
        resultCount={tours.length}
        selectedFilters={searchedCountries}
        onRemoveFilter={handleRemoveFilter}
        onSort={handleSort}
        hasSearched={hasSearched}
      />

      <div className='px-[clamp(12px,2.5vw,48px)] pb-[80px] mt-9 xl:mt-[79px]'>
        <FreeTourResults tours={tours} />
      </div>
    </main>
  )
}

export default FreeToursPage