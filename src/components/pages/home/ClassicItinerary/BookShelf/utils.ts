import type { TBooks } from '@/api/type'
import { bookShelfStyleConfig, type TBook } from './config'

export const transformBooksData = (booksData: TBooks[]): TBook[] => {
  const activeBooks = booksData.filter((book) => book.title && book.subtitle)
  activeBooks.sort((a, b) => a.order - b.order)

  return activeBooks.map((book, index) => {
    const styleConfig = bookShelfStyleConfig[index] || {
      size: {
        mobileClassName: 'w-[80px] h-[360px]',
        web: { width: '104px', height: '424px' },
      },
      rotation: 'rotate-0',
      patternTopOffset: '110px',
      margin: { left: '0px', right: '0px' },
    }

    return {
      id: book.id,
      number: String(book.order).padStart(2, '0'),
      destination: book.title,
      english: book.subtitle,
      pattern: book.imageUrl,
      size: styleConfig.size,
      rotation: styleConfig.rotation,
      patternTopOffset: styleConfig.patternTopOffset,
      margin: styleConfig.margin,
    }
  })
}
