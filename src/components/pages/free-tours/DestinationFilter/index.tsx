'use client'

import { useState, useCallback, useEffect } from 'react'
import SearchIcon from '@/components/shared/icons/header/SearchIcon'
import DropdownArrowIcon from './icons/DropdownArrowIcon'
import ClearIcon from './icons/ClearIcon'
import CheckIcon from './icons/CheckIcon'
import type { TBaseComponent } from '@/types'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useProductCountries } from '@/api/free-tours'
import type { TRegionData } from '@/api/free-tours'
import styles from './styles.module.css'

type TDestinationFilterProps = TBaseComponent & {
  onSearch?: (selectedCountries: string[], budgetRange: [number, number], daysRange: string | null) => void
}

const DestinationFilter = ({
  className,
  onSearch,
}: TDestinationFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState<[number, number]>([80000, 600000])
  const [selectedDaysRange, setSelectedDaysRange] = useState<string | null>('不限天數')
  const [regions, setRegions] = useState<TRegionData[]>([])

  const { query: countriesQuery, mock: countriesMock } = useProductCountries()
  const daysRangeOptions = ['6-10天', '11-15天', '16-20天', '21-25天', '不限天數']

  useEffect(() => {
    if (countriesQuery.isSuccess) {
      const dataSource = countriesQuery.data && countriesQuery.data.length > 0
        ? countriesQuery.data
        : (countriesMock.data || [])
      setRegions(dataSource)
    }
  }, [countriesQuery.isSuccess, countriesQuery.data, countriesMock.data])

  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false)
    setSelectedRegion(null)
  }, [])

  const dropdownRef = useClickOutside<HTMLDivElement>(handleCloseDropdown)

  const handleRegionSelect = (regionId: string) => {
    if (selectedRegion === regionId) {
      setSelectedRegion(null)
    } else {
      setSelectedRegion(regionId)
    }
  }

  const handleCountryToggle = (countryId: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryId)
        ? prev.filter((id) => id !== countryId)
        : [...prev, countryId],
    )
  }

  const getSelectedCountryNames = () => {
    if (selectedCountries.length === 0) return '國家'

    const countryNames = selectedCountries
      .map((countryCode) => {
        for (const region of regions) {
          const country = region.countries.find((c) => c.code === countryCode)
          if (country) return country.nameZh
        }
        return ''
      })
      .filter(Boolean)

    return (
      countryNames.slice(0, 2).join('、') +
      (countryNames.length > 2 ? `等${countryNames.length}個國家` : '')
    )
  }

  const hasSelectedCountriesInRegion = (regionName: string) => {
    const region = regions.find((r) => r.region === regionName)
    if (!region) return false

    return region.countries.some((country) =>
      selectedCountries.includes(country.code)
    )
  }

  const handleBudgetChange = (index: number, value: number) => {
    const newRange: [number, number] = [...budgetRange] as [number, number]
    newRange[index] = value
    if (newRange[0] > newRange[1]) {
      if (index === 0) {
        newRange[1] = newRange[0]
      } else {
        newRange[0] = newRange[1]
      }
    }
    setBudgetRange(newRange)
  }

  const handleDaysRangeToggle = (range: string) => {
    setSelectedDaysRange(prev => prev === range ? null : range)
  }

  const handleSearch = () => {
    onSearch?.(selectedCountries, budgetRange, selectedDaysRange)
    setIsOpen(false)
  }

  return (
    <section
      className={`relative xl:sticky xl:top-0 xl:left-0 xl:z-10 xl:bg-figma-neutral-50 border-y border-figma-secondary-500 py-4 px-[clamp(12px,2.5vw,48px)] xl:py-9 ${className || ''}`}
    >
      <div
        className={`absolute inset-0 opacity-15 ${styles.backgroundLayer1}`}
      />
      <div
        className={`absolute inset-0 opacity-15 ${styles.backgroundLayer2}`}
      />
      <div
        className={`absolute inset-0 opacity-15 ${styles.backgroundLayer3}`}
      />

      <div className='relative z-10'>
        <div className='max-w-[1824px] mx-auto'>
          <div className='bg-white rounded-2xl p-6 flex flex-col lg:flex-row gap-[20px] lg:gap-9 lg:items-center'>
            <div className='flex-1 relative' ref={dropdownRef}>
              <div className='flex flex-col gap-1'>
                <label className='font-family-noto-serif font-semibold text-lg text-figma-primary-950'>
                  目的地
                </label>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='flex items-center justify-between py-3 border-b border-figma-primary-950/70 cursor-pointer'
                >
                  <span
                    className={`font-family-genseki text-base ${selectedCountries.length > 0 ? 'text-figma-primary-950' : 'text-figma-primary-300'}`}
                  >
                    {getSelectedCountryNames()}
                  </span>
                  <DropdownArrowIcon isOpen={isOpen} />
                </button>

                {isOpen && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto w-full max-w-[240px]'>
                    <div>
                      {!selectedRegion
                        ? regions.map((region) => {
                            const hasSelected = hasSelectedCountriesInRegion(region.region)
                            return (
                              <button
                                key={region.region}
                                onClick={() => handleRegionSelect(region.region)}
                                className={`w-full text-left py-3 px-4 hover:bg-gray-50 rounded font-family-noto-serif font-semibold text-base cursor-pointer ${
                                  hasSelected ? 'text-figma-secondary-950' : 'text-figma-neutral-300'
                                }`}
                              >
                                {region.region}
                              </button>
                            )
                          })
                        : (() => {
                            const currentRegion = regions.find(
                              (r) => r.region === selectedRegion,
                            )
                            if (!currentRegion) return null

                            return (
                              <div>
                                <button
                                  onClick={() => setSelectedRegion(null)}
                                  className='flex items-center py-3 px-4 gap-4 w-full text-left hover:bg-gray-50 rounded cursor-pointer'
                                >
                                  <div className='w-5 h-5 rounded-full px-1 flex items-center justify-center bg-figma-secondary-500'>
                                    <ClearIcon color='var(--color-figma-secondary-100)' />
                                  </div>
                                  <span className='font-family-noto-serif font-semibold text-base text-figma-secondary-950'>
                                    {currentRegion.region}
                                  </span>
                                </button>

                                <div>
                                  {currentRegion.countries.map((country) => (
                                    <button
                                      key={country.code}
                                      onClick={() =>
                                        handleCountryToggle(country.code)
                                      }
                                      className='flex items-center gap-4 w-full text-left py-3 px-7 hover:bg-gray-50 rounded cursor-pointer'
                                    >
                                      <div className='w-5 h-5 flex items-center justify-center'>
                                        {selectedCountries.includes(
                                          country.code,
                                        ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <div className='w-5 h-5 rounded-full border border-figma-secondary-500'></div>
                                        )}
                                      </div>
                                      <span className='font-family-noto-serif font-semibold text-base text-figma-neutral-300'>
                                        {country.nameZh}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )
                          })()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='font-family-noto-serif font-semibold text-lg text-figma-primary-950'>
                預算
              </label>
              <div className='flex flex-col gap-2'>
                <div className='font-family-genseki text-sm text-figma-primary-950'>
                  NT ${budgetRange[0].toLocaleString()} ~ NT ${budgetRange[1].toLocaleString()}
                </div>
                <div className='relative h-[20px]'>
                  <div className='absolute bg-[#ebebeb] h-[6px] left-0 right-0 rounded-full top-[7px] pointer-events-none' />
                  <div
                    className='absolute bg-figma-secondary-500 h-[6px] rounded-full top-[7px] pointer-events-none'
                    style={{
                      left: `${((budgetRange[0] - 80000) / (600000 - 80000)) * 100}%`,
                      right: `${100 - ((budgetRange[1] - 80000) / (600000 - 80000)) * 100}%`
                    }}
                  />
                  <input
                    type='range'
                    min='80000'
                    max='600000'
                    step='10000'
                    value={budgetRange[1]}
                    onChange={(e) => handleBudgetChange(1, Number(e.target.value))}
                    className={`absolute w-full h-[20px] top-0 appearance-none bg-transparent cursor-pointer ${styles.rangeInput}`}
                    style={{
                      WebkitAppearance: 'none',
                      zIndex: 3
                    }}
                  />
                  <input
                    type='range'
                    min='80000'
                    max='600000'
                    step='10000'
                    value={budgetRange[0]}
                    onChange={(e) => handleBudgetChange(0, Number(e.target.value))}
                    className={`absolute w-full h-[20px] top-0 appearance-none bg-transparent cursor-pointer ${styles.rangeInput}`}
                    style={{
                      WebkitAppearance: 'none',
                      zIndex: 4
                    }}
                  />
                </div>
                <div className='flex justify-between font-family-genseki text-xs text-figma-primary-950'>
                  <span>80,000</span>
                  <span>600,000</span>
                </div>
              </div>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='font-family-noto-serif font-semibold text-lg text-figma-primary-950'>
                旅行天數
              </label>
              <div className='flex gap-3 flex-wrap'>
                {daysRangeOptions.map((range) => (
                  <button
                    key={range}
                    onClick={() => handleDaysRangeToggle(range)}
                    className={`px-3 py-2 border cursor-pointer transition-colors ${
                      selectedDaysRange === range
                        ? 'border-figma-secondary-500 bg-figma-secondary-100 text-figma-secondary-950'
                        : 'border-figma-primary-500 text-figma-primary-500 hover:bg-figma-neutral-50'
                    }`}
                  >
                    <span className='font-family-genseki text-base leading-[1.2]'>
                      {range}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSearch}
              className='bg-figma-secondary-500 text-white rounded-2xl p-3.5 flex lg:flex-col justify-center items-center gap-2 min-w-[80px] lg:min-h-[80px] hover:bg-figma-secondary-950 cursor-pointer transition-colors self-end'
            >
              <SearchIcon color='white' size='19' />
              <span className='font-family-genseki text-base leading-[1.5]'>
                Search
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DestinationFilter