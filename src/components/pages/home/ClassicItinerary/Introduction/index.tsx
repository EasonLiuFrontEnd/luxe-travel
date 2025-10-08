import { useMemo } from 'react'
import Image from 'next/image'
import { useSelectedCountry } from '@/hooks/useSelectedCountry'
import { useBooks } from '@/api/home/useBooks'

const Introduction = () => {
  const { selectedCountryId } = useSelectedCountry()
  const { query: booksQuery, mock } = useBooks()

  const currentIntroduction = useMemo(() => {
    const data =
      booksQuery.error && process.env.NODE_ENV !== 'production'
        ? mock.rows
        : booksQuery.data || []
    return data.find((book) => book.id === selectedCountryId) || data[0]
  }, [booksQuery.data, booksQuery.error, mock.rows, selectedCountryId])

  if (!currentIntroduction) {
    return (
      <div className='w-full xl:flex-[0_0_39.2%] xl:max-w-[753.6px] pb-7 px-[17px] xl:pl-7 xl:pr-0'>
        <div className='flex items-center justify-center h-64'>
          <p className='text-gray-500'>載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`w-full xl:flex-[0_0_39.2%] xl:max-w-[753.6px] pb-7 px-[17px] xl:pl-7 xl:pr-0`}
    >
      <div className='flex flex-col items-center gap-5 xl:gap-7 xl:max-w-[705px]'>
        <div className='relative mx-[62.5px] xl:mx-0'>
          <Image
            src={currentIntroduction.landscapeImage}
            alt={`${currentIntroduction.title}介紹圖片`}
            className='aspect-[216/160] xl:aspect-[705/347] object-cover rounded-2xl'
            width={705}
            height={347}
          />
          <div className='absolute top-0 right-0 bg-[var(--color-figma-neutral-50)] xl:px-7 xl:py-4 px-5 py-3 rounded-tr-2xl rounded-bl-2xl'>
            <span className='font-family-noto-serif font-bold xl:text-2xl text-lg leading-[120%] text-[var(--color-figma-primary-950)]'>
              {currentIntroduction.title}
            </span>
          </div>
        </div>

        <p className='font-family-genseki text-base text-[var(--color-figma-primary-950)]'>
          {currentIntroduction.description}
        </p>
      </div>
    </div>
  )
}

export default Introduction
