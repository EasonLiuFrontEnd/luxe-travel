'use client'

import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/free-tours'
import * as apiModule from '@/api/free-tours'
import type { TBaseComponent } from '@/types'

type TFreeToursPageProps = TBaseComponent

const FreeToursPage = ({ className }: TFreeToursPageProps) => {
  return (
    <TourPageLayout
      tourType="free-tours"
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
      className={className}
    />
  )
}

export default FreeToursPage