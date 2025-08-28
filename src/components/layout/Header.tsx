'use client'

import { useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
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
  const headerClasses = [
    'z-50',
    headerBehavior === 'fixed'
      ? 'fixed'
      : headerBehavior === 'sticky'
        ? 'sticky'
        : 'relative',
    hasTransparentHeader && isHomePage && logoProgress < 1
      ? 'bg-transparent'
      : 'bg-figma-neutral-50 backdrop-filter: blur(8px);',
  ].join(' ')
  const opacityClass = logoProgress >= 1 ? 'transition-opacity duration-1000 ease-in-out opacity-100' : 'opacity-0 pointer-events-none'

  return (
    <>
      <div className={`${headerClasses} top-10 px-[48px] pt-4 ${logoProgress >= 0.999 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Logo scale={logoScale} isNavbarLogo={false} />
      </div>

      <div className={`${headerClasses} ${opacityClass} w-full h-[123px] flex items-center justify-between px-[48px] border-b border-[var(--color-figma-secondary-500)]`}>
        <Logo scale={logoScale} isNavbarLogo={logoProgress >= 1} />
        <div className='flex items-center px-1'>
          <Navigation
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            logoProgress={logoProgress}
          />
        </div>
      </div>
    </>
  )
}

export default Header
