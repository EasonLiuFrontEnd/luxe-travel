import BookShelf from '../BookShelf'
import ItalyIntroduction from '../ItalyIntroduction'
import styles from './styles.module.css'

const BookShelfSection = () => {
  return (
    <div className='pt-[60px] lg:pt-[120px] border-t border-[var(--color-figma-secondary-500)]'>
      <div className='mb-[32px] lg:mb-[48px] flex flex-col items-center'>
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

      {/* 主要佈局：mobile column-reverse；desktop 左書架、右介紹 */}
      <div className='flex flex-col-reverse lg:flex-row border-b border-[var(--color-figma-secondary-500)]'>
        {/* 書架區域 */}
        <BookShelf />

        {/* 義大利介紹區塊 */}
        <ItalyIntroduction />
      </div>
    </div>
  )
}

export default BookShelfSection
