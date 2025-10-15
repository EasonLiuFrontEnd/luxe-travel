'use client'

import { usePathname } from 'next/navigation'
import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/rcar-tours'
import * as apiModule from '@/api/rcar-tours'

const RcarToursPage = () => {
  const pathname = usePathname()

  return (
    <TourPageLayout
      key={pathname}
      tourType='rcar-tours'
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
    />
  )
}

export default RcarToursPage
