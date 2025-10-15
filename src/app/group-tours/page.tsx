'use client'

import { usePathname } from 'next/navigation'
import TourPageLayout from '@/components/pages/tours/TourPageLayout'
import { useProductsSearch, useProductCountries } from '@/api/group-tours'
import * as apiModule from '@/api/group-tours'

const GroupToursPage = () => {
  const pathname = usePathname()

  return (
    <TourPageLayout
      key={pathname}
      tourType='group-tours'
      useProductsSearch={useProductsSearch}
      useProductCountries={useProductCountries}
      apiModule={apiModule}
    />
  )
}

export default GroupToursPage
