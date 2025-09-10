'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useScroll } from '@/hooks/useScroll'
import { ScrollProvider } from '@/context/ScrollContext'
import { ClientProvider } from '@/providers'
import Header from '@/components/shared/layout/header/Header'
import Footer from '@/components/shared/layout/Footer'
import { getPageConfig, calculateLogoAnimation } from '@/lib/page-config'
import type { TBaseComponent } from '@/types'

const ClientLayout = ({ children }: TBaseComponent) => {
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
    <ClientProvider>
      <ScrollProvider value={scrollContextValue}>
        <Header
          isHomePage={pageConfig.type === 'home'}
          logoScale={logoScale}
          logoProgress={logoProgress}
          isNavbarVisible={isNavbarVisible}
          isConsultButtonVisible={isConsultButtonVisible}
          headerBehavior={pageConfig.headerBehavior}
          hasTransparentHeader={pageConfig.hasTransparentHeader}
        />
        <main>{children}</main>
        <Footer />
      </ScrollProvider>
    </ClientProvider>
  )
}

export default ClientLayout
