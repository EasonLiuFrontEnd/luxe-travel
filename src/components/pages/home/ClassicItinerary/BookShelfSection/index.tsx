'use client'

import BookShelf from '../BookShelf'
import Introduction from '../Introduction'
import styles from './styles.module.css'
import { useBookShelfScroll } from '@/hooks/useBookShelfScroll'
import '@/styles/components.css'
import { RefObject } from 'react'
const BookShelfSection = () => {
  const { bookShelfRef, trackRef, isMobile } = useBookShelfScroll()

  return (
    <div
      ref={bookShelfRef}
      data-bookshelf-section
      className='bg-figma-neutral-50 pt-[60px] lg:pt-[120px] border-t border-[var(--color-figma-secondary-500)] sticky top-[-60vh] left-0 lg:relative lg:top-auto lg:left-auto'
    >
      <div
        data-bookshelf-title
        className='mb-[32px] xl:mb-[48px] flex flex-col items-center'
      >
        <h2 className='inline-block font-family-noto-serif font-bold text-[32px] xl:text-[64px] xl:leading-[120%] text-[var(--color-figma-primary-950)] px-5 py-[6px] gradient-title-border'>
          查看經典行程
        </h2>

        <div
          className={`w-fit font-family-genseki text-base xl:text-xl leading-[120%] xl:leading-[150%] text-[var(--color-figma-secondary-950)] text-center mt-6 xl:mt-7 flex flex-col xl:flex-row justify-center ${styles.decoBar}`}
        >
          <span>從書櫃點擊挑選想去的國家，</span>
          <span>參考典藏推薦行程！</span>
        </div>
      </div>

      <div className='flex flex-col-reverse lg:flex-row'>
        <BookShelf trackRef={trackRef as RefObject<HTMLDivElement>} isMobile={isMobile} />

        <Introduction />
      </div>
    </div>
  )
}

export default BookShelfSection
