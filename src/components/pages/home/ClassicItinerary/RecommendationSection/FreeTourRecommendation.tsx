import { useMemo } from 'react'
import TravelCard from '@/components/shared/TravelCard'
import RecommendationButton from '@/components/ui/RecommendationButton'
import { useSelectedCountry } from '@/hooks/useSelectedCountry'
import { useFreeTours, useIntroductions } from '@/api/home'

const FreeTourRecommendation = () => {
  const { selectedCountryId } = useSelectedCountry()
  const { query: freeToursQuery, mock: freeToursMock } = useFreeTours()
  const { query: introductionsQuery, mock: introductionsMock } =
    useIntroductions()

  const currentCountryName = useMemo(() => {
    const data = introductionsQuery.data || introductionsMock.rows
    const country = data.find((intro) => intro.countryId === selectedCountryId)
    return country?.countryName || '義大利'
  }, [introductionsQuery.data, introductionsMock.rows, selectedCountryId])

  const currentFreeTours = useMemo(() => {
    const data = freeToursQuery.data || freeToursMock.rows
    return data
      .filter((tour) => tour.countryId === selectedCountryId)
      .slice(0, 3)
  }, [freeToursQuery.data, freeToursMock.rows, selectedCountryId])

  return (
    <div className='bg-white box-border flex flex-col gap-8 justify-between items-center pb-6 pt-0 px-6 xl:px-6 px-4 relative rounded-2xl xl:rounded-2xl rounded-[12px] w-full h-full'>
      <div className='flex flex-col gap-6 items-center w-full'>
        <div className='bg-[var(--color-figma-primary-50)] box-border flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-bl-[16px] rounded-br-[16px] xl:rounded-bl-[16px] xl:rounded-br-[16px] rounded-bl-[12px] rounded-br-[12px]'>
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
            <div className='col-span-3 flex items-center justify-center h-[90px] md:h-[300px]'>
              <p className='text-gray-500'>
                暫無{currentCountryName}自由行推薦
              </p>
            </div>
          )}
        </div>
      </div>

      <RecommendationButton text='查看更多' variant='primary' />
    </div>
  )
}

export default FreeTourRecommendation
