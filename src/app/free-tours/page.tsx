'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import TourBanner from '@/components/shared/TourBanner'
import DestinationFilter from '@/components/pages/free-tours/DestinationFilter'
import ResultsSort from '@/components/shared/ResultsSort'
import FreeTourResults from '@/components/pages/free-tours/FreeTourResults'
import {
  convertCountriesToFilters,
  getCountryCodes,
  convertProductToTourData,
  SORT_OPTIONS,
  SLIDE_CONTENT,
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

        if (searchParams.budgetMin !== undefined || searchParams.budgetMax !== undefined) {
          const minBudget = searchParams.budgetMin ?? 0
          const maxBudget = searchParams.budgetMax ?? Infinity
          dataSource = dataSource.filter(product =>
            product.priceMin >= minBudget && product.priceMin <= maxBudget
          )
        }

        if (searchParams.daysRange) {
          const daysRangeMatch = searchParams.daysRange.match(/(\d+)-(\d+)/)
          if (daysRangeMatch) {
            const minDays = parseInt(daysRangeMatch[1])
            const maxDays = parseInt(daysRangeMatch[2])
            dataSource = dataSource.filter(product =>
              product.days >= minDays && product.days <= maxDays
            )
          }
        }

        const sortedProducts = sortProducts(dataSource)
        const convertedTours = sortedProducts.map(convertProductToTourData)
        setTours(convertedTours)
      } else {
        setTours([])
      }
    }
  }, [searchQuery.isSuccess, searchQuery.data, searchMock.data, searchParams])

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
      <TourBanner
        tourType='free-tours'
        slideContent={SLIDE_CONTENT}
        tours={searchQuery.data || []}
        isLoading={searchQuery.isLoading}
        altTextPrefix='自由行程精選'
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
        <FreeTourResults tours={tours} />
      </div>
    </main>
  )
}

export default FreeToursPage