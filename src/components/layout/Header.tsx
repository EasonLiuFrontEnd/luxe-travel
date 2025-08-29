'use client'

import { useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import ConsultButton from '@/components/ui/ConsultButton'
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

  const baseClasses = 'z-50 w-full flex items-center justify-between'
  const mobileClasses = 'max-[374px]:bg-figma-neutral-50 max-[374px]:border-b max-[374px]:border-[var(--color-figma-secondary-500)] max-[374px]:p-[12px]'
  const desktopClasses = 'p-[48px]'
  const positionClass = headerBehavior === 'fixed' ? 'fixed' : headerBehavior === 'sticky' ? 'sticky' : 'relative'
  const backgroundClass = hasTransparentHeader && isHomePage && logoProgress < 1 ? 'bg-transparent' : 'bg-figma-neutral-50 backdrop-filter: blur(8px);'
  const borderClass = logoProgress >= 1 ? 'border-b border-[var(--color-figma-secondary-500)]' : ''
  const headerClasses = `${baseClasses} ${mobileClasses} ${desktopClasses} ${positionClass} ${backgroundClass} ${borderClass}`
  const opacityClass = logoProgress >= 1 ? 'transition-opacity duration-1200 ease-in-out opacity-100' : 'opacity-0 pointer-events-none'

  return (
    <div className={headerClasses}>
      <div className='max-[374px]:hidden'>
        <Logo scale={logoScale} />
      </div>
      <div className={`flex items-center px-2 max-[374px]:w-full max-[374px]:px-0 max-[374px]:opacity-100 ${opacityClass}`}>
        <Navigation
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          logoProgress={logoProgress}
        />
        <ConsultButton className='min-[375px]:hidden' />
      </div>
    </div>
  )
}

export default Header
