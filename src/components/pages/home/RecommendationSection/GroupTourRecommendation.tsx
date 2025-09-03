import TravelCard from '@/components/shared/TravelCard'
import RecommendationButton from '@/components/ui/RecommendationButton'
import { groupTourData } from './config'

const GroupTourRecommendation = () => {
  return (
    <div className="bg-white box-border flex flex-col gap-8 items-center justify-start pb-6 pt-0 px-6 relative rounded-[16px] flex-1">
      <div className="flex flex-col gap-6 items-center justify-start w-full">
        <div className="bg-[var(--color-figma-primary-50)] box-border flex gap-2.5 items-center justify-center px-6 py-3 relative rounded-bl-[16px] rounded-br-[16px]">
          <div className="font-family-noto-serif font-bold text-[var(--color-figma-primary-500)] text-[24px] leading-[1.2] whitespace-nowrap">
            義大利團體行推薦
          </div>
        </div>
        
        <div className="flex gap-5 items-start justify-start w-full">
          {groupTourData.map((tour) => (
            <TravelCard
              key={tour.id}
              image={tour.image}
              tagText={tour.tagText}
              tagColor="primary"
              title={tour.title}
              description={tour.description}
              price={tour.price}
              priceColor="primary"
              hoverTitle={tour.hoverTitle}
              hoverDescription={tour.hoverDescription}
              className="flex-1"
            />
          ))}
        </div>
      </div>
      
      <RecommendationButton text="查看更多" variant="secondary" />
    </div>
  )
}

export default GroupTourRecommendation