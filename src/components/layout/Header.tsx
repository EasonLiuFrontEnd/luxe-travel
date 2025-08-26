'use client'

import { useState } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import BannerButton from '../customUI/BannerButton'
import type { THeader } from '@/types/components'

const Header = ({
  isHomePage,
  logoScale = 0.6,
  isNavbarVisible = true,
  isConsultButtonVisible = false,
  headerBehavior = 'fixed',
  hasTransparentHeader = false,
}: THeader) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const headerClasses = [
    'top-0 left-0 right-0 z-50',
    headerBehavior === 'fixed'
      ? 'fixed'
      : headerBehavior === 'sticky'
        ? 'sticky'
        : 'relative',
    hasTransparentHeader && isHomePage
      ? 'bg-transparent'
      : 'bg-gray-50 header-container',
  ].join(' ')

  return (
    <div className={headerClasses}>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between py-4'>
            <Logo scale={isHomePage ? logoScale : 0.6} />

            <div className='flex items-center space-x-6'>
              <Navigation
                isVisible={isNavbarVisible}
                isMenuOpen={isMenuOpen}
                onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
              />

              {isConsultButtonVisible && (
                <BannerButton size='sm'>
                  諮詢專員
                </BannerButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
