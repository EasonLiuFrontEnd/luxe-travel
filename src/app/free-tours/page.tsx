'use client'

import { usePathname } from 'next/navigation'
import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/free-tours'
import * as apiModule from '@/api/free-tours'

const FreeToursPage = () => {
  const pathname = usePathname()

  return (
    <TourPageLayout
      key={pathname}
      tourType='free-tours'
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
    />
  )
}

export default FreeToursPage
