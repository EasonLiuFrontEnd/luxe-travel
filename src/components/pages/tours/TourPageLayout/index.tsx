'use client'
export const dynamic = 'force-dynamic'

import { useState, useCallback, useEffect, useMemo } from 'react'
import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query'
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
  getTourTypeConfig,
  type TTourData,
  type TSelectedFilters,
  type TTourType,
} from '../config'
import type {
  TProduct,
  TProductSearchParams,
  TRegionData,
} from '@/api/free-tours'
import type { TApiResponse } from '@/api/type'

type TUseProductsSearchResult = {
  mutation: UseMutationResult<
    TProduct[],
    AxiosError<TApiResponse<TProduct[]>>,
    TProductSearchParams
  >
}

type TUseProductCountriesResult = {
  query: UseQueryResult<TRegionData[], AxiosError<TApiResponse<TRegionData[]>>>
}

type TTourPageLayoutProps = {
  tourType: TTourType
  useProductsSearch: () => TUseProductsSearchResult
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

  const [featuredTours, setFeaturedTours] = useState<TProduct[]>([])

  const { mutation: searchMutation } = useProductsSearch()
  const { query: countriesQuery } = useProductCountries()

  const regionsData = useMemo(() => {
    return countriesQuery.data || []
  }, [countriesQuery.data])

  const tourConfig = getTourTypeConfig(tourType)

  const processInitialData = useCallback(
    (data: TProduct[]) => {
      const featured = data.filter((product) => product.isFeatured)
      setFeaturedTours(featured)

      const nonFeatured = data.filter((product) => !product.isFeatured)

      const convertedTours = nonFeatured.map((product) =>
        convertProductToTourData(product, tourType),
      )
      setTours(convertedTours)
    },
    [tourType],
  )

  const processSearchResults = useCallback(
    (data: TProduct[]) => {
      const nonFeatured = data.filter((product) => !product.isFeatured)

      const convertedTours = nonFeatured.map((product) =>
        convertProductToTourData(product, tourType),
      )
      setTours(convertedTours)
    },
    [tourType],
  )

  const executeSearch = useCallback(
    (params: TProductSearchParams, isInitialLoad = false) => {
      searchMutation.mutate(params, {
        onSuccess: (data) => {
          if (isInitialLoad) {
            processInitialData(data)
          } else {
            processSearchResults(data)
          }
        },
        onError: () => {
          setTours([])
          if (isInitialLoad) {
            setFeaturedTours([])
          }
        },
      })
    },
    [searchMutation, processInitialData, processSearchResults],
  )

  useEffect(() => {
    executeSearch(searchParams, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = useCallback(
    (
      selectedCountries: string[],
      budgetRange?: [number, number],
      daysRange?: string[],
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

        const hasUnlimited = daysRange?.includes('不限天數')
        const otherDays = daysRange?.filter((d) => d !== '不限天數') || []
        const isOnlyUnlimited =
          hasUnlimited && otherDays.length === 0 && daysRange?.length === 1

        if (!isOnlyUnlimited && daysRange && daysRange.length > 0) {
          daysRange.forEach((range) => {
            filters.push({
              id: `days-${range}`,
              label: range,
              type: 'other',
            })
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

        const hasUnlimited = daysRange?.includes('不限天數')
        const otherDays = daysRange?.filter((d) => d !== '不限天數') || []

        if (hasUnlimited) {
          newParams.daysRange = 'all'
        } else if (otherDays.length > 0) {
          newParams.daysRange = otherDays
            .map((d) => d.replace('天', ''))
            .join(',')
        } else {
          newParams.daysRange = 'all'
        }
      }

      if (selectedCountries.length > 0) {
        const countryCodes = getCountryCodes(selectedCountries)
        newParams.destination = countryCodes.join(',')
      }

      setSearchParams(newParams)
      executeSearch(newParams)
    },
    [regionsData, tourType, executeSearch],
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
      } else if (filterId.startsWith('days-')) {
        const remainingDaysFilters = updatedFilters.filter((f) =>
          f.id.startsWith('days-'),
        )

        if (remainingDaysFilters.length === 0) {
          newParams.daysRange = 'all'
        } else {
          const remainingDays = remainingDaysFilters.map((f) => f.label)
          const hasUnlimited = remainingDays.includes('不限天數')
          const otherDays = remainingDays.filter((d) => d !== '不限天數')

          if (hasUnlimited) {
            newParams.daysRange = 'all'
          } else if (otherDays.length > 0) {
            newParams.daysRange = otherDays
              .map((d) => d.replace('天', ''))
              .join(',')
          } else {
            newParams.daysRange = 'all'
          }
        }
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
      executeSearch(newParams)
    },
    [searchedCountries, searchParams, executeSearch],
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
      executeSearch(newParams)
    },
    [searchParams, executeSearch],
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
        tours={featuredTours}
        isLoading={searchMutation.isPending}
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
