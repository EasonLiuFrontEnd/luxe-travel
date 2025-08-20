'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useScroll } from '@/hooks/useScroll'
import { ScrollProvider } from '@/context/ScrollContext'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { getPageConfig, calculateLogoAnimation } from '@/lib/page-config'
import type { IBaseComponent } from '@/types'

const ClientLayout = ({ children }: IBaseComponent) => {
  const pathname = usePathname()
  const { scrollY } = useScroll()

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

  return (
    <ScrollProvider value={scrollContextValue}>
      <Header
        isHomePage={pageConfig.type === 'home'}
        logoScale={logoScale}
        isNavbarVisible={isNavbarVisible}
        isConsultButtonVisible={isConsultButtonVisible}
        headerBehavior={pageConfig.headerBehavior}
        hasTransparentHeader={pageConfig.hasTransparentHeader}
      />
      <main>{children}</main>
      <Footer />
    </ScrollProvider>
  )
}

export default ClientLayout
