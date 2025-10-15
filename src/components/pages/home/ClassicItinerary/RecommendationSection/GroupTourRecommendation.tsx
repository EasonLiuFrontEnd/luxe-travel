import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import TravelCard from './TravelCard'
import RecommendationButton from '@/components/ui/RecommendationButton'
import { useSelectedCountry } from '@/hooks/useSelectedCountry'
import { useBooks } from '@/api/home/useBooks'
import styles from './styles.module.css'

const GroupTourRecommendation = () => {
  const router = useRouter()
  const { selectedCountryId } = useSelectedCountry()
  const { query: booksQuery, mock: booksMock } = useBooks()

  const currentCountryName = useMemo(() => {
    const data =
      booksQuery.error && process.env.NODE_ENV !== 'production'
        ? booksMock.rows
        : booksQuery.data || []
    const selectedBook = data.find((book) => book.id === selectedCountryId)
    return selectedBook?.title || ''
  }, [booksQuery.data, booksQuery.error, booksMock.rows, selectedCountryId])

  const currentGroupTours = useMemo(() => {
    const data =
      booksQuery.error && process.env.NODE_ENV !== 'production'
        ? booksMock.rows
        : booksQuery.data || []
    const selectedBook = data.find((book) => book.id === selectedCountryId)
    return (selectedBook?.groupProducts || [])
      .filter((tour) => tour.imageUrl && tour.title)
      .slice(0, 3)
  }, [booksQuery.data, booksQuery.error, booksMock.rows, selectedCountryId])

  return (
    <div className='bg-white box-border flex flex-col gap-8 justify-between items-center pb-6 pt-0 px-4 xl:px-6 relative rounded-[12px] xl:rounded-2xl w-full h-full'>
      <div className='flex flex-col gap-6 items-center justify-start w-full'>
        <div
          className={`bg-figma-primary-50 box-border flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-bl-[12px] rounded-br-[12px] xl:rounded-bl-[16px] xl:rounded-br-[16px] ${styles.titleContainer}`}
        >
          <div className='font-family-noto-serif font-bold text-[var(--color-figma-primary-500)] text-[24px] leading-[1.2] whitespace-nowrap'>
            {currentCountryName}團體行推薦
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_1fr_auto] gap-5 w-full'>
          {currentGroupTours.length > 0 ? (
            currentGroupTours.map((tour) => (
              <TravelCard
                key={tour.id}
                image={tour.imageUrl || ''}
                tagText={tour.tagText || ''}
                tagColor='primary'
                title={tour.title}
                description={tour.description || ''}
                price={tour.price || ''}
                priceColor='primary'
                hoverTitle={tour.hoverTitle}
                hoverDescription={tour.hoverDescription}
                className=''
              />
            ))
          ) : (
            <div className='col-span-3 flex items-center justify-center h-[90px] md:h-[252px]'>
              <p className='text-gray-500'>
                暫無{currentCountryName}團體行推薦
              </p>
            </div>
          )}
        </div>
      </div>

      <RecommendationButton
        text='查看更多'
        variant='secondary'
        onClick={() => router.push('/group-tours')}
      />
    </div>
  )
}

export default GroupTourRecommendation
