'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { TBaseComponent } from '@/types'
import { SORT_OPTIONS, type TSelectedFilters } from '../config'
import { useClickOutside } from '@/hooks/useClickOutside'
import CloseIcon from '@/components/shared/icons/common/CloseIcon'
import SortIcon from '@/components/shared/icons/common/SortIcon'

type TSearchResultsProps = TBaseComponent & {
  resultCount?: number
  selectedFilters?: TSelectedFilters
  onRemoveFilter?: (filterId: string) => void
  onSort?: (sortOption: string) => void
  hasSearched?: boolean
}

const SearchResults = ({
  className,
  resultCount = 10,
  selectedFilters = [],
  onRemoveFilter,
  onSort,
  hasSearched = false,
}: TSearchResultsProps) => {
  const [sortOption, setSortOption] = useState('價格（低到高）')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const handleCloseSortDropdown = useCallback(() => {
    setShowSortDropdown(false)
  }, [])

  const sortDropdownRef = useClickOutside<HTMLDivElement>(handleCloseSortDropdown)

  const handleSort = (option: string) => {
    setSortOption(option)
    setShowSortDropdown(false)
    onSort?.(option)
  }

  const handleRemoveFilter = (filterId: string) => {
    onRemoveFilter?.(filterId)
  }

  const getSortDirection = () => {
    if (sortOption.includes('低到高')) return 'asc'
    if (sortOption.includes('高到低')) return 'desc'
    return 'none'
  }

  if (!hasSearched) {
    return null
  }

  return (
    <section
      className={cn(
        'pt-8 mb-9 px-[clamp(12px,2.5vw,48px)] xl:pt-[60px] xl:mb-[79px]',
        className,
      )}
    >
      <div className='max-w-[1824px] mx-auto'>
        <div className='flex flex-col xl:flex-row xl:justify-between gap-[10px]'>
          <div className='flex gap-1 font-genseki-gothic text-figma-primary-500 text-xl'>
            <span className='text-nowrap'>搜尋出</span>
            <span className='text-nowrap'>{resultCount}</span>
            <span className='text-nowrap'>筆行程</span>
          </div>

          <div className='flex flex-col xl:flex-row gap-5'>
            {selectedFilters.length > 0 && (
              <div className='flex flex-wrap gap-3'>
                {selectedFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className='flex items-center gap-[9px] bg-figma-secondary-100 border border-figma-secondary-950 rounded pl-5 pr-4 py-3'
                  >
                    <span className='font-genseki-gothic text-sm text-figma-secondary-950 leading-[1.5]'>
                      {filter.label}
                    </span>
                    <button
                      onClick={() => handleRemoveFilter(filter.id)}
                      className='w-4 h-4 flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer'
                      aria-label={`移除 ${filter.label} 篩選`}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className='relative h-fit w-fit' ref={sortDropdownRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className='flex items-center gap-[14px] border border-figma-primary-300 rounded pl-5 pr-4 py-3 bg-white hover:border-figma-primary-500 transition-colors cursor-pointer'
              >
                <div className='flex items-center gap-2 font-genseki-gothic text-sm text-figma-primary-500 leading-[1.5]'>
                  <span className='text-nowrap'>排序依：</span>
                  <span className='text-nowrap'>{sortOption}</span>
                </div>
                <SortIcon sortDirection={getSortDirection()} />
              </button>

              {showSortDropdown && (
                <div className='absolute top-full left-0 bg-white border border-figma-primary-300 rounded shadow-lg z-50 min-w-full'>
                  {SORT_OPTIONS.map((option, index) => (
                    <button
                      key={option}
                      onClick={() => handleSort(option)}
                      className={cn(
                        'w-full text-left px-4 py-2 font-genseki-gothic text-sm hover:bg-figma-neutral-50 transition-colors cursor-pointer',
                        option === sortOption
                          ? 'text-figma-secondary-950 bg-figma-secondary-100'
                          : 'text-figma-primary-500',
                        index === 0 && 'rounded-t',
                        index === SORT_OPTIONS.length - 1 && 'rounded-b',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchResults
