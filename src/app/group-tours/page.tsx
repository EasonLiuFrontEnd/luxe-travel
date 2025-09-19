'use client'

import GroupToursBanner from '@/components/pages/group-tours/Banner'
import type { TBaseComponent } from '@/types'

type TGroupToursPageProps = TBaseComponent

const GroupToursPage = ({ className }: TGroupToursPageProps) => {
  return (
    <main className={`min-h-screen ${className || ''}`}>
      <GroupToursBanner />

      <div className='flex flex-col items-center justify-center min-h-[50vh] px-4'>
        <p className='font-family-genseki text-figma-secondary-500 text-[18px] xl:text-[20px] text-center max-w-2xl'>
          專為追求品質的旅客設計，小團精緻路線，專業領隊陪同，深度體驗歐洲文化
        </p>
      </div>
    </main>
  )
}

export default GroupToursPage