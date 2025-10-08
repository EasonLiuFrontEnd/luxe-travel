import { useMemo } from 'react'
import TravelCard from '@/components/shared/TravelCard'
import RecommendationButton from '@/components/ui/RecommendationButton'
import { useSelectedCountry } from '@/hooks/useSelectedCountry'
import { useGroupTours, useIntroductions } from '@/api/home'

const GroupTourRecommendation = () => {
  const { selectedCountryId } = useSelectedCountry()
  const { query: groupToursQuery, mock: groupToursMock } = useGroupTours()
  const { query: introductionsQuery, mock: introductionsMock } =
    useIntroductions()

  const currentCountryName = useMemo(() => {
    // 只有在 API 錯誤且非生產環境時才使用假資料，API 正常回應（包括空陣列）都使用 API 資料
    const data = (introductionsQuery.error && process.env.NODE_ENV !== 'production')
      ? introductionsMock.rows 
      : (introductionsQuery.data || [])
    const country = data.find((intro) => intro.countryId === selectedCountryId)
    return country?.countryName || ''
  }, [introductionsQuery.data, introductionsQuery.error, introductionsMock.rows, selectedCountryId])

  const currentGroupTours = useMemo(() => {
    // 只有在 API 錯誤且非生產環境時才使用假資料，API 正常回應（包括空陣列）都使用 API 資料
    const data = (groupToursQuery.error && process.env.NODE_ENV !== 'production')
      ? groupToursMock.rows 
      : (groupToursQuery.data || [])
    return data
      .filter((tour) => tour.countryId === selectedCountryId)
      .slice(0, 3)
  }, [groupToursQuery.data, groupToursQuery.error, groupToursMock.rows, selectedCountryId])

  return (
    <div className='bg-white box-border flex flex-col gap-8 justify-between items-center pb-6 pt-0 px-6 xl:px-6 px-4 relative rounded-2xl xl:rounded-2xl rounded-[12px] w-full h-full'>
      <div className='flex flex-col gap-6 items-center justify-start w-full'>
        <div className='bg-[var(--color-figma-primary-50)] box-border flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-bl-[16px] rounded-br-[16px] xl:rounded-bl-[16px] xl:rounded-br-[16px] rounded-bl-[12px] rounded-br-[12px]'>
          <div className='font-family-noto-serif font-bold text-[var(--color-figma-primary-500)] text-[24px] leading-[1.2] whitespace-nowrap'>
            {currentCountryName}團體行推薦
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_1fr_auto] gap-5 w-full'>
          {currentGroupTours.length > 0 ? (
            currentGroupTours.map((tour) => (
              <TravelCard
                key={tour.id}
                image={tour.imageUrl}
                tagText={tour.tagText}
                tagColor='primary'
                title={tour.title}
                description={tour.description}
                price={tour.price}
                priceColor='primary'
                hoverTitle={tour.hoverTitle}
                hoverDescription={tour.hoverDescription}
                className=''
              />
            ))
          ) : (
            <div className='col-span-3 flex items-center justify-center h-32'>
              <p className='text-gray-500'>
                暫無{currentCountryName}團體行推薦
              </p>
            </div>
          )}
        </div>
      </div>

      <RecommendationButton text='查看更多' variant='secondary' />
    </div>
  )
}

export default GroupTourRecommendation
