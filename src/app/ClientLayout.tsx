'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useScroll } from '@/hooks/useScroll'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ScrollProvider } from '@/context/ScrollContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getPageConfig, calculateLogoAnimation } from '@/lib/page-config'
import type { TBaseComponent } from '@/types'

const ClientLayout = ({ children }: TBaseComponent) => {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const { isMobile } = useMediaQuery()

  const pageConfig = useMemo(() => getPageConfig(pathname), [pathname])

  const { logoProgress, logoScale, isNavbarVisible, isConsultButtonVisible } =
    useMemo(
      () => calculateLogoAnimation(scrollY, pageConfig),
      [scrollY, pageConfig],
    )

  const scrollContextValue = useMemo(
    () => ({
      scrollY,
      logoProgress,
    }),
    [scrollY, logoProgress],
  )

  const shouldShowHeader = useMemo(() => {
    if (pageConfig.type === 'search') {
      return isMobile
    }
    return pageConfig.showHeader
  }, [pageConfig.showHeader, pageConfig.type, isMobile])

  return (
    <ScrollProvider value={scrollContextValue}>
      {shouldShowHeader && (
        <Header
          isHomePage={pageConfig.type === 'home'}
          logoScale={logoScale}
          logoProgress={logoProgress}
          isNavbarVisible={isNavbarVisible}
          isConsultButtonVisible={isConsultButtonVisible}
          headerBehavior={pageConfig.headerBehavior}
          hasTransparentHeader={pageConfig.hasTransparentHeader}
        />
      )}
      <main>{children}</main>
      <Footer />
    </ScrollProvider>
  )
}

export default ClientLayout
