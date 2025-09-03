'use client'

import { useState, useEffect } from 'react'
import SearchIcon from '@/components/shared/icons/header/SearchIcon'
import DeleteIcon from '@/components/shared/icons/header/DeleteIcon'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { TBaseComponent } from '@/types'
import { cn } from '@/lib/utils'

export type TSearch = TBaseComponent & {
  isOpen: boolean
  onClose: () => void
}

const Search = ({ isOpen, onClose }: TSearch) => {
  const [searchValue, setSearchValue] = useState('')
  const { isMobile } = useMediaQuery()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleClearSearch = () => {
    setSearchValue('')
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'
      onClick={handleBackdropClick}
    >
      <div className='bg-figma-primary-50 w-full h-full overflow-y-auto py-[24px]'>
        <div className='max-xs:hidden flex justify-end w-full'>
          <button
            onClick={onClose}
            className={cn(
              'font-genseki-h6-regular py-[6px] px-[12px] mt-[24px] mr-[48px]',
              'border border-figma-secondary-500  text-figma-secondary-500 rounded-3xl',
              'cursor-pointer hover:bg-figma-secondary-500 hover:text-figma-neutral-0 transition-all duration-200',
            )}
          >
            Go back
          </button>
        </div>
        <div className='flex flex-col items-center pt-[120px] xs:pt-[200px]'>
          <p className='font-luxurious-deco-regular text-figma-secondary-500 tracking-[4.8px]'>
            Search
          </p>
          <p className='font-noto-serif-h4-medium text-figma-primary-950'>搜尋</p>
          <div className='w-[319px] xs:w-[1440px] pt-[60px] border-b border-[var(--color-figma-secondary-500)]'>
            <div className='flex items-center py-[12px]'>
              <SearchIcon color='#926D3C' size={isMobile ? '19' : '31'} />
              <input
                id='search'
                type='text'
                placeholder='請輸入關鍵字搜尋'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='w-full font-genseki-gothic text-[16px] xs:text-[20px] leading-[1.2] xs:leading-[1.5] placeholder:text-figma-primary-300 ml-[24px] outline-none bg-transparent'
                autoFocus
              />
              {searchValue && (
                <DeleteIcon
                  size={isMobile ? '19' : '20'}
                  onClick={handleClearSearch}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search