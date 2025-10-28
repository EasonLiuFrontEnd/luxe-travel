'use client'

import { useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import ConsultButton from '@/components/shared/layout/header/ConsultButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollbarWidth } from '@/hooks/useScrollbarWidth'

export type THeader = {
  isHomePage: boolean
  logoScale?: number
  logoProgress?: number
  isNavbarVisible?: boolean
  isConsultButtonVisible?: boolean
  headerBehavior?: 'fixed' | 'sticky' | 'static'
  hasTransparentHeader?: boolean
  className?: string
}

const Header = ({
  isHomePage,
  logoScale = 0.34,
  logoProgress = 0,
  headerBehavior = 'fixed',
  isConsultButtonVisible = false,
}: THeader) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile } = useMediaQuery()
  const { contentWidth } = useScrollbarWidth()

  const showConsultButton = isConsultButtonVisible

  const baseClasses =
    'z-50 w-full flex items-center justify-between p-4 xl:py-0'

  const headerStyle = isHomePage
    ? {
        width: `${contentWidth}px`,
        maxWidth: `${contentWidth}px`,
        left: '0',
      }
    : {}
  const positionClass =
    headerBehavior === 'fixed'
      ? 'fixed'
      : headerBehavior === 'sticky'
        ? 'sticky'
        : 'relative'
  const backgroundClass =
    isHomePage && logoProgress < 1
      ? 'bg-transparent h-[75.5px]'
      : 'bg-[#F7F7F8] h-[75.5px]'
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
    <div className={headerClasses} style={isMobile ? {} : headerStyle}>
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
