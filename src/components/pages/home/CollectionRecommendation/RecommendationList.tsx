import RecommendationItem from './RecommendationItem'
import type { TBaseComponent } from '@/types'
import { recommendationData } from './config'

type TRecommendationListProps = TBaseComponent

const RecommendationList = ({ className }: TRecommendationListProps) => {
  const handleRecommendationClick = () => {}

  return (
    <div
      className={`max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {recommendationData.map((item) => (
        <RecommendationItem
          key={item.id}
          item={item}
          onClick={handleRecommendationClick}
          className='p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300'
        />
      ))}
    </div>
  )
}

export default RecommendationList
