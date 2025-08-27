'use client'

import { useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import BannerButton from '../customUI/BannerButton'
import type { THeader } from '@/types/components'

const Header = ({
  isHomePage,
  logoScale = 0.34,
  logoProgress = 0,
  isNavbarVisible = true,
  isConsultButtonVisible = false,
  headerBehavior = 'fixed',
  hasTransparentHeader = false,
}: THeader) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const containerHeight = logoProgress >= 1 ? 'h-[123px]' : 'py-4'
  
  const headerClasses = [
    'top-0 left-0 right-0 z-50',
    headerBehavior === 'fixed'
      ? 'fixed'
      : headerBehavior === 'sticky'
        ? 'sticky'
        : 'relative',
    hasTransparentHeader && isHomePage && logoProgress < 1
      ? 'bg-transparent'
      : 'bg-figma-neutral-50 header-container',
  ].join(' ')

  return (
    <div className={headerClasses}>
      <div className='px-[48px]'>
        <div className={`flex items-center justify-between ${containerHeight}`}>
          <Logo scale={logoScale} />
          <div className='flex items-center py-12 px-1 gap-2'>
            <Navigation
              isVisible={isNavbarVisible}
              isMenuOpen={isMenuOpen}
              onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
              logoProgress={logoProgress}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
