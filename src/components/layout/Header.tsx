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
    logoProgress >= 1
      ? 'border-b border-[var(--color-figma-secondary-500)]'
      : ''
  ].join(' ')
  const opacityClass = logoProgress >= 1 ? 'transition-opacity duration-1200 ease-in-out opacity-100' : 'opacity-0 pointer-events-none'

  return (
    <div className={`${headerClasses} w-full flex items-center justify-between p-[48px] max-[374px]:p-[12px]`}>
      <div className='max-[374px]:hidden'>
        <Logo scale={logoScale} />
      </div>
      <div className='min-[375px]:hidden'>
        <Logo scale={1} />
      </div>
      <div className={`flex items-center px-2 ${opacityClass}`}>
        <Navigation
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          logoProgress={logoProgress}
        />
      <ConsultButton className='min-[375px]:hidden'/>
      </div>
    </div>
  )
}

export default Header
