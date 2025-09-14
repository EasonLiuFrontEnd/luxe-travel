'use client'

import { useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import ConsultButton from '@/components/shared/layout/header/ConsultButton'
import type { TBaseComponent } from '@/types'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScroll } from '@/hooks/useScroll'

export type THeader = TBaseComponent & {
  isHomePage: boolean
  logoScale?: number
  logoProgress?: number
  isNavbarVisible?: boolean
  isConsultButtonVisible?: boolean
  headerBehavior?: 'fixed' | 'sticky' | 'static'
  hasTransparentHeader?: boolean
}

const Header = ({
  isHomePage,
  logoScale = 0.34,
  logoProgress = 0,
  headerBehavior = 'fixed',
  hasTransparentHeader = false,
}: THeader) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile } = useMediaQuery()
  const { scrollY } = useScroll()

  const showConsultButton = scrollY > 797

  const baseClasses =
    'z-50 w-full flex items-center justify-between max-xl:p-[12px] xl:pb-[48px] xl:px-[48px]  bg-figma-neutral-50'
  const positionClass =
    headerBehavior === 'fixed'
      ? 'fixed'
      : headerBehavior === 'sticky'
        ? 'sticky'
        : 'relative'
  const backgroundClass =
    hasTransparentHeader && isHomePage && logoProgress < 1
      ? 'xl:bg-transparent'
      : ''
  const borderClass = isMobile
    ? 'border-b border-[var(--color-figma-secondary-500)]'
    : logoProgress >= 1
      ? 'border-b border-[var(--color-figma-secondary-500)] transition-all duration-1200 ease-in-out'
      : 'border-b border-transparent'
  const headerClasses = `${baseClasses} ${positionClass} ${backgroundClass} ${borderClass}`
  const opacityClass =
    logoProgress >= 1
      ? 'transition-opacity duration-1200 ease-in-out opacity-100'
      : 'max-xl:opacity-100 opacity-0 xl:pointer-events-none'

  return (
    <div className={headerClasses}>
      <div className='max-xl:hidden'>
        <Logo scale={logoScale} />
      </div>
      <div
        className={`flex items-center px-2 max-xl:w-full max-xl:px-0 max-xl:opacity-100 ${opacityClass}`}
      >
        <Navigation
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          logoProgress={logoProgress}
          showConsultButton={showConsultButton}
        />
        <ConsultButton className='xl:hidden' />
      </div>
    </div>
  )
}

export default Header
