'use client'

import { useState, useRef, useEffect } from 'react'
import SearchIcon from '@/components/shared/icons/header/SearchIcon'
import DropdownArrowIcon from './icons/DropdownArrowIcon'
import ClearIcon from './icons/ClearIcon'
import CheckIcon from './icons/CheckIcon'
import type { TBaseComponent } from '@/types'
import { REGIONS } from '../config'
import styles from './styles.module.css'

type TDestinationFilterProps = TBaseComponent & {
  onSearch?: (selectedCountries: string[]) => void
}

const DestinationFilter = ({
  className,
  onSearch,
}: TDestinationFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSelectedRegion(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
      .map((countryId) => {
        for (const region of REGIONS) {
          const country = region.countries.find((c) => c.id === countryId)
          if (country) return country.name
        }
        return ''
      })
      .filter(Boolean)

    return (
      countryNames.slice(0, 2).join('、') +
      (countryNames.length > 2 ? `等${countryNames.length}個國家` : '')
    )
  }

  const handleSearch = () => {
    onSearch?.(selectedCountries)
    setIsOpen(false)
  }

  return (
    <section
      className={`relative xl:sticky xl:top-0 xl:left-0 xl:z-10 xl:bg-figma-neutral-50 border-y border-figma-secondary-500 py-4 px-[clamp(12px,2.5vw,48px)] xl:py-9 ${className || ''}`}
    >
      {/* 交錯背景圖層 - 上排和下排 */}
      <div
        className={`absolute inset-0 opacity-15 ${styles.backgroundLayer1}`}
      />
      <div
        className={`absolute inset-0 opacity-15 ${styles.backgroundLayer2}`}
      />
      <div
        className={`absolute inset-0 opacity-15 ${styles.backgroundLayer3}`}
      />

      {/* 內容層 */}
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
                        ? // 第一層：顯示所有區域
                          REGIONS.map((region) => (
                            <button
                              key={region.id}
                              onClick={() => handleRegionSelect(region.id)}
                              className='w-full text-left py-3 px-4 hover:bg-gray-50 rounded font-family-noto-serif font-semibold text-base cursor-pointer text-figma-neutral-300'
                            >
                              {region.name}
                            </button>
                          ))
                        : // 第二層：顯示選中區域和其國家
                          (() => {
                            const currentRegion = REGIONS.find(
                              (r) => r.id === selectedRegion,
                            )
                            if (!currentRegion) return null

                            return (
                              <div>
                                {/* 區域標題 with 返回按鈕 */}
                                <button
                                  onClick={() => setSelectedRegion(null)}
                                  className='flex items-center py-3 px-4 gap-4 w-full text-left hover:bg-gray-50 rounded cursor-pointer'
                                >
                                  <div className='w-5 h-5 rounded-full px-1 flex items-center justify-center bg-figma-secondary-500'>
                                    <ClearIcon color='var(--color-figma-secondary-100)' />
                                  </div>
                                  <span className='font-family-noto-serif font-semibold text-base text-figma-secondary-950'>
                                    {currentRegion.name}
                                  </span>
                                </button>

                                {/* 國家列表 */}
                                <div>
                                  {currentRegion.countries.map((country) => (
                                    <button
                                      key={country.id}
                                      onClick={() =>
                                        handleCountryToggle(country.id)
                                      }
                                      className='flex items-center gap-4 w-full text-left py-3 px-7 hover:bg-gray-50 rounded cursor-pointer'
                                    >
                                      <div className='w-5 h-5 flex items-center justify-center'>
                                        {selectedCountries.includes(
                                          country.id,
                                        ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <div className='w-5 h-5 rounded-full border border-figma-secondary-500'></div>
                                        )}
                                      </div>
                                      <span className='font-family-noto-serif font-semibold text-base text-figma-neutral-300'>
                                        {country.name}
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

            <button
              onClick={handleSearch}
              className='bg-figma-secondary-500 text-white rounded-2xl p-3.5 flex lg:flex-col justify-center items-center gap-2 min-w-[80px] lg:min-h-[80px] hover:bg-figma-secondary-950 cursor-pointer transition-colors'
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
