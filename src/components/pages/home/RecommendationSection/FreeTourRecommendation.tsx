import TravelCard from '@/components/shared/TravelCard'
import RecommendationButton from '@/components/ui/RecommendationButton'
import { freeTourData } from './config'

const FreeTourRecommendation = () => {
  return (
    <div className="bg-white box-border flex flex-col gap-8 justify-between items-center pb-6 pt-0 px-6 lg:px-6 px-4 relative rounded-2xl lg:rounded-2xl rounded-[12px] w-full h-full">
      <div className="flex flex-col gap-6 items-center w-full">
        <div className="bg-[var(--color-figma-primary-50)] box-border flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-bl-[16px] rounded-br-[16px] lg:rounded-bl-[16px] lg:rounded-br-[16px] rounded-bl-[12px] rounded-br-[12px]">
          <div className="font-family-noto-serif font-bold text-[var(--color-figma-secondary-500)] text-[24px] leading-[1.2] whitespace-nowrap">
            義大利自由行推薦
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_1fr_auto] gap-5 w-full">
          {freeTourData.map((tour) => (
            <TravelCard
              key={tour.id}
              image={tour.image}
              tagText={tour.tagText}
              tagColor="secondary"
              title={tour.title}
              description={tour.description}
              price={tour.price}
              priceColor="secondary"
              hoverTitle={tour.hoverTitle}
              hoverDescription={tour.hoverDescription}
              className=""
            />
          ))}
        </div>
      </div>
      
      <RecommendationButton text="查看更多" variant="primary" />
    </div>
  )
}

export default FreeTourRecommendation