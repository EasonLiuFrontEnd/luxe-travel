import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import TravelCard from './TravelCard'
import RecommendationButton from './RecommendationButton'
import { useSelectedCountry } from '@/hooks/useSelectedCountry'
import { useBooks } from '@/api/home/useBooks'
import styles from './styles.module.css'

const FreeTourRecommendation = () => {
  const router = useRouter()
  const { selectedCountryId } = useSelectedCountry()
  const { query: booksQuery } = useBooks()

  const currentCountryName = useMemo(() => {
    const data = booksQuery.data || []
    const selectedBook = data.find((book) => book.id === selectedCountryId)
    return selectedBook?.title || ''
  }, [booksQuery.data, selectedCountryId])

  const currentFreeTours = useMemo(() => {
    const data = booksQuery.data || []
    const selectedBook = data.find((book) => book.id === selectedCountryId)

    return (selectedBook?.freeProducts || [])
      .filter((tour) => tour.mainImageUrl && tour.name)
      .slice(0, 3)
      .map((tour) => ({
        id: tour.id,
        imageUrl: tour.mainImageUrl || '',
        tagText: tour.namePrefix || '',
        title: tour.name,
        description: tour.countries ? tour.countries.join('/') : '',
        price: tour.priceMin ? `$${tour.priceMin.toLocaleString()}` : '',
        hoverTitle: tour.hoverTitle,
        hoverDescription: tour.hoverDescription,
      }))
  }, [booksQuery.data, selectedCountryId])

  return (
    <div className='bg-white box-border flex flex-col gap-8 justify-between items-center pb-6 pt-0 px-4 xl:px-6 relative rounded-[12px] xl:rounded-2xl w-full h-full'>
      <div className='flex flex-col gap-6 items-center w-full'>
        <div
          className={`bg-figma-primary-50 box-border flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-bl-[12px] rounded-br-[12px] xl:rounded-bl-[16px] xl:rounded-br-[16px] ${styles.titleContainer}`}
        >
          <div className='font-family-noto-serif font-bold text-[var(--color-figma-secondary-500)] text-[24px] leading-[1.2] whitespace-nowrap'>
            {currentCountryName}自由行推薦
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_1fr_auto] gap-5 w-full'>
          {currentFreeTours.length > 0 ? (
            currentFreeTours.map((tour) => (
              <TravelCard
                key={tour.id}
                image={tour.imageUrl}
                tagText={tour.tagText}
                tagColor='secondary'
                title={tour.title}
                description={tour.description}
                price={tour.price}
                priceColor='secondary'
                hoverTitle={tour.hoverTitle}
                hoverDescription={tour.hoverDescription}
                className=''
              />
            ))
          ) : (
            <div className='col-span-3 flex items-center justify-center h-[90px] md:h-[252px]'>
              <p className='text-gray-500'>
                暫無{currentCountryName}自由行推薦
              </p>
            </div>
          )}
        </div>
      </div>

      <RecommendationButton
        text='查看更多'
        variant='primary'
        onClick={() => router.push('/free-tours')}
      />
    </div>
  )
}

export default FreeTourRecommendation
