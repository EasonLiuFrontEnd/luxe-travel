'use client'

import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/group-tours'
import * as apiModule from '@/api/group-tours'
import type { TBaseComponent } from '@/types'

type TGroupToursPageProps = TBaseComponent

const GroupToursPage = ({ className }: TGroupToursPageProps) => {
  return (
    <TourPageLayout
      tourType="group-tours"
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
      className={className}
    />
  )
}

export default GroupToursPage