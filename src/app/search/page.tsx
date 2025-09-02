'use client'

import { useState } from 'react'
import SearchIcon from '@/components/svg/header/SearchIcon'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import DeleteIcon from '@/components/svg/header/DeleteIcon'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const SearchPage = () => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const { isMobile } = useMediaQuery()

  const handleGoBack = () => {
    router.back()
  }

  const handleClearSearch = () => {
    setSearchValue('')
  }

  return (
    <div className='min-h-screen bg-figma-primary-50 py-[24px]'>
      <div className='max-xs:hidden flex justify-end w-full'>
        <button
          onClick={handleGoBack}
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
              className='w-full font-genseki-gothic text-[16px] xs:text-[20px] leading-[1.2] xs:leading-[1.5] placeholder:text-figma-primary-300 ml-[24px] outline-none'
            />
            {searchValue && (
              <DeleteIcon
                color='#926D3C'
                size={isMobile ? '19' : '20'}
                onClick={handleClearSearch}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
