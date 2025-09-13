import type { TBooks } from '@/api/type'
import { bookShelfData, type TBook } from './config'

export const transformBooksData = (booksData: TBooks[]): TBook[] => {
  const activeBooks = booksData.filter((book) => book.title && book.subtitle)
  activeBooks.sort((a, b) => a.order - b.order)

  return activeBooks.map((book, index) => {
    // 從 config 中找對應的樣式配置
    const styleConfig = bookShelfData[index] || {
      size: {
        mobileClassName: 'w-[80px] h-[360px]',
        web: { width: '104px', height: '424px' },
      },
      rotation: 'rotate-0',
      patternTopOffset: '110px',
      margin: { left: '0px', right: '0px' },
    }

    // API/Mock 資料 + Config 樣式配置
    return {
      id: book.id,
      number: String(book.order).padStart(2, '0'),
      destination: book.title,
      english: book.subtitle,
      pattern: book.imageUrl, // 使用 API 的 imageUrl (API 失敗時會用 mock 的本地路徑)
      // 以下來自 config 的樣式配置
      size: styleConfig.size,
      rotation: styleConfig.rotation,
      patternTopOffset: styleConfig.patternTopOffset,
      margin: styleConfig.margin,
    }
  })
}
