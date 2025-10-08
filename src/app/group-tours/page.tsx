'use client'

import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/group-tours'
import * as apiModule from '@/api/group-tours'

const GroupToursPage = () => {
  return (
    <TourPageLayout
      tourType='group-tours'
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
    />
  )
}

export default GroupToursPage
