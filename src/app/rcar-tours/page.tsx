'use client'

import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/rcar-tours'
import * as apiModule from '@/api/rcar-tours'

const RcarToursPage = () => {
  return (
    <TourPageLayout
      tourType='rcar-tours'
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
    />
  )
}

export default RcarToursPage
