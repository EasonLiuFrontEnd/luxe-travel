'use client'

import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/rcar-tours'
import * as apiModule from '@/api/rcar-tours'
import type { TBaseComponent } from '@/types'

type TRcarToursPageProps = TBaseComponent

const RcarToursPage = ({ className }: TRcarToursPageProps) => {
  return (
    <TourPageLayout
      tourType="rcar-tours"
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
      className={className}
    />
  )
}

export default RcarToursPage