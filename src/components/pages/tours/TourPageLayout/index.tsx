'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import TourBanner from '../TourBanner'
import DestinationFilter from '../DestinationFilter'
import ResultsSort from '../ResultsSort'
import Tours from '../Tours'
import {
  convertCountriesToFilters,
  getCountryCodes,
  convertProductToTourData,
  SORT_OPTIONS,
  getSlideConfig,
  getTourTypeConfig,
  type TTourData,
  type TSelectedFilters,
  type TTourType,
} from '../config'
import type {
  TProduct,
  TProductSearchParams,
  TRegionData,
  TProductSearchResponse,
  TCountriesResponse,
} from '@/api/free-tours'
import type { TApiResponse } from '@/api/type'

type TUseProductsSearchResult = {
  query: UseQueryResult<TProduct[], AxiosError<TApiResponse<TProduct[]>>>
  mock: TProductSearchResponse
}

type TUseProductCountriesResult = {
  query: UseQueryResult<TRegionData[], AxiosError<TApiResponse<TRegionData[]>>>
  mock: TCountriesResponse
}

type TTourPageLayoutProps = {
  tourType: TTourType
  useProductsSearch: (params: TProductSearchParams) => TUseProductsSearchResult
  useProductCountries: () => TUseProductCountriesResult
  apiModule: Record<string, unknown>
}

const TourPageLayout = ({
  tourType,
  useProductsSearch,
  useProductCountries,
}: TTourPageLayoutProps) => {
  const [searchedCountries, setSearchedCountries] = useState<TSelectedFilters>(
    [],
  )
  const [searchParams, setSearchParams] = useState<TProductSearchParams>({
    category:
      tourType === 'free-tours'
        ? 'FREE'
        : tourType === 'group-tours'
          ? 'GROUP'
          : 'RCAR',
    page: 1,
    limit: 100,
    sort: 'createdAt',
    order: 'desc',
  })
  const [tours, setTours] = useState<TTourData[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const { query: searchQuery, mock: searchMock } =
    useProductsSearch(searchParams)
  const { query: countriesQuery, mock: countriesMock } = useProductCountries()

  const regionsData = useMemo(() => {
    if (countriesQuery.error && process.env.NODE_ENV !== 'production') {
      return countriesMock.data || []
    }
    return countriesQuery.data || []
  }, [countriesQuery.data, countriesQuery.error, countriesMock.data])

  const tourConfig = getTourTypeConfig(tourType)
  const slideConfig = getSlideConfig(tourType)

  const featuredTours = useMemo(() => {
    if (searchQuery.isSuccess && searchQuery.data) {
      return searchQuery.data.filter((product) => product.isFeatured)
    }
    return []
  }, [searchQuery.isSuccess, searchQuery.data])

  useEffect(() => {
    if (searchQuery.isSuccess) {
      let dataSource = searchQuery.data || []

      if (dataSource.length > 0) {
        dataSource = dataSource.filter((product) => !product.isFeatured)

        const destinationCodes = searchParams.destination?.split(',') || []
        if (destinationCodes.length > 0) {
          dataSource = dataSource.filter((product) =>
            destinationCodes.some((code) => product.countries?.includes(code)),
          )
        }

        if (tourType !== 'group-tours') {
          if (
            searchParams.budgetMin !== undefined ||
            searchParams.budgetMax !== undefined
          ) {
            const minBudget = searchParams.budgetMin ?? 0
            const maxBudget = searchParams.budgetMax ?? Infinity
            dataSource = dataSource.filter(
              (product) =>
                product.priceMin >= minBudget && product.priceMin <= maxBudget,
            )
          }

          if (searchParams.daysRange) {
            const daysRangeMatch = searchParams.daysRange.match(/(\d+)-(\d+)/)
            if (daysRangeMatch) {
              const minDays = parseInt(daysRangeMatch[1])
              const maxDays = parseInt(daysRangeMatch[2])
              dataSource = dataSource.filter(
                (product) => product.days >= minDays && product.days <= maxDays,
              )
            }
          }
        }

        const convertedTours = dataSource.map((product) =>
          convertProductToTourData(product, tourType),
        )
        setTours(convertedTours)
      } else {
        setTours([])
      }
    } else if (searchQuery.isError) {
      if (process.env.NODE_ENV !== 'production') {
        let dataSource = searchMock.data || []
        dataSource = dataSource.filter((product) => !product.isFeatured)
        const convertedTours = dataSource.map((product) =>
          convertProductToTourData(product, tourType),
        )
        setTours(convertedTours)
      } else {
        setTours([])
      }
    }
  }, [
    searchQuery.isSuccess,
    searchQuery.isError,
    searchQuery.data,
    searchMock.data,
    searchParams,
    tourType,
  ])

  const handleSearch = useCallback(
    (
      selectedCountries: string[],
      budgetRange?: [number, number],
      daysRange?: string | null,
    ) => {
      const filters: TSelectedFilters = []

      if (selectedCountries.length > 0) {
        const countryFilters = convertCountriesToFilters(
          selectedCountries,
          regionsData,
        )
        filters.push(...countryFilters)
      }

      if (tourType !== 'group-tours') {
        if (budgetRange) {
          const isDefaultBudget =
            budgetRange[0] === 80000 && budgetRange[1] === 600000
          if (!isDefaultBudget) {
            filters.push({
              id: 'budget',
              label: `＄${budgetRange[0].toLocaleString()} - ＄${budgetRange[1].toLocaleString()}`,
              type: 'price',
            })
          }
        }

        const isDefaultDays = !daysRange || daysRange === '不限天數'
        if (daysRange && !isDefaultDays) {
          filters.push({
            id: 'days',
            label: daysRange,
            type: 'other',
          })
        }
      }

      setSearchedCountries(filters)
      setHasSearched(true)

      const newParams: TProductSearchParams = {
        category:
          tourType === 'free-tours'
            ? 'FREE'
            : tourType === 'group-tours'
              ? 'GROUP'
              : 'RCAR',
        page: 1,
        limit: 100,
        sort: 'priceMin',
        order: 'asc',
      }

      if (tourType !== 'group-tours') {
        if (budgetRange) {
          newParams.budgetMin = budgetRange[0]
          newParams.budgetMax = budgetRange[1]
        }

        if (daysRange && daysRange !== '不限天數') {
          newParams.daysRange = daysRange.replace('天', '')
        }
      }

      if (selectedCountries.length > 0) {
        const countryCodes = getCountryCodes(selectedCountries)
        newParams.destination = countryCodes.join(',')
      }

      setSearchParams(newParams)
    },
    [regionsData, tourType],
  )

  const handleRemoveFilter = useCallback(
    (filterId: string) => {
      const updatedFilters = searchedCountries.filter(
        (filter) => filter.id !== filterId,
      )
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
          .filter((f) => f.type === 'country')
          .map((f) => f.id)

        if (remainingCountryIds.length > 0) {
          const countryCodes = getCountryCodes(remainingCountryIds)
          newParams.destination = countryCodes.join(',')
        } else {
          delete newParams.destination
        }
        setSearchedCountries(updatedFilters)
      }

      setSearchParams(newParams)
    },
    [searchedCountries, searchParams],
  )

  const handleSort = useCallback(
    (sortOption: string) => {
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
    },
    [searchParams],
  )

  return (
    <main className='min-h-screen bg-figma-neutral-50'>
      <div className='pt-[37px] xl:pt-[60px] px-[clamp(12px,2.5vw,48px)]'>
        <h1 className='font-family-noto-serif font-bold text-[48px] xl:text-[96px] leading-[1.2] text-figma-primary-950'>
          {tourConfig.title}
        </h1>
      </div>
      <TourBanner
        tourType={tourType}
        slideContent={slideConfig.content}
        tours={featuredTours}
        isLoading={searchQuery.isLoading}
        hasError={!!searchQuery.error}
        altTextPrefix={tourConfig.altTextPrefix}
      />
      <DestinationFilter
        tourType={tourType}
        showBudgetFilter={tourConfig.showBudgetFilter}
        showDaysFilter={tourConfig.showDaysFilter}
        gapSize={tourConfig.gapSize}
        maxWidth={tourConfig.maxWidth}
        useProductCountriesHook={useProductCountries}
        onSearch={handleSearch}
      />
      <ResultsSort
        resultCount={tours.length}
        selectedFilters={searchedCountries}
        onRemoveFilter={handleRemoveFilter}
        onSort={handleSort}
        hasSearched={hasSearched}
        sortOptions={SORT_OPTIONS}
      />

      <div className='px-[clamp(12px,2.5vw,48px)] pb-[80px] mt-9 xl:mt-[79px]'>
        <Tours tours={tours} tourType={tourType} />
      </div>
    </main>
  )
}

export default TourPageLayout
