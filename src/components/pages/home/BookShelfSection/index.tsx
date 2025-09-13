'use client'

import BookShelf from '../BookShelf'
import Introduction from '../Introduction'
import styles from './styles.module.css'
import { useBookShelfScroll } from '@/hooks/useBookShelfScroll'
import { useBannerBookShelfScroll } from '@/hooks/useBannerBookShelfScroll'

const BookShelfSection = () => {
  const { bookShelfRef, trackRef, isFixed } = useBookShelfScroll()
  const { transformY } = useBannerBookShelfScroll()

  return (
    <div
      ref={bookShelfRef}
      data-bookshelf-section
      className='z-10 bg-figma-neutral-50 pt-[60px] lg:pt-[120px] border-t border-[var(--color-figma-secondary-500)] relative transition-transform duration-300 ease-out'
      style={
        {
          '--transform-y': `${transformY}px`,
          transform: 'translateY(calc(-1 * var(--transform-y)))',
        } as React.CSSProperties
      }
    >
      <div
        data-bookshelf-title
        className='mb-[32px] lg:mb-[48px] flex flex-col items-center'
      >
        <h2
          className={`inline-block font-family-noto-serif font-bold text-[32px] lg:text-[64px] lg:leading-[120%] text-[var(--color-figma-primary-950)] px-5 py-[6px] lg:py-4 ${styles.gradientTitle}`}
        >
          查看經典行程
        </h2>

        <div
          className={`w-fit font-family-genseki text-base lg:text-xl leading-[120%] lg:leading-[150%] text-[var(--color-figma-secondary-950)] text-center mt-6 lg:mt-7 flex flex-col lg:flex-row justify-center ${styles.decoBar}`}
        >
          <span>從書櫃點擊挑選想去的國家，</span>
          <span>參考典藏推薦行程！</span>
        </div>
      </div>

      <div className='flex flex-col-reverse lg:flex-row border-b border-[var(--color-figma-secondary-500)]'>
        <BookShelf trackRef={trackRef} />

        <Introduction />
      </div>
    </div>
  )
}

export default BookShelfSection
