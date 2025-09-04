import { useState, useEffect } from 'react'
import { NAV_ITEMS, DROPDOWN_MENUS } from '@/lib/constants'
import type { TBaseComponent } from '@/types'

export type TNavigation = TBaseComponent & {
  isMenuOpen?: boolean
  onMenuToggle?: () => void
  logoProgress?: number
}
import DropdownMenu from './DropdownMenu'
import ConsultButton from '@/components/ui/ConsultButton'
import Logo from './Logo'
import SearchIcon from '@/components/shared/icons/header/SearchIcon'
import MenuIcon from '@/components/shared/icons/header/MenuIcon'
import Search from './Search'

const Navigation = ({
  isMenuOpen = false,
  onMenuToggle = () => {},
}: TNavigation) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const openSearch = () => {
    setIsSearchOpen(true)
    setActiveDropdown(null)
    if (isMenuOpen) {
      onMenuToggle()
    }
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <>
      <div className='hidden xs:flex items-center space-x-6'>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.name}
            className='relative'
            onMouseEnter={() => setActiveDropdown(item.name)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className='font-noto-serif-body-l-semibold text-figma-primary-950 cursor-pointer'>
              {item.name}
            </button>
            <div className='absolute top-full left-0 right-0 h-[16px] bg-transparent' />
            <DropdownMenu
              isVisible={activeDropdown === item.name}
              items={
                DROPDOWN_MENUS[item.name as keyof typeof DROPDOWN_MENUS] || []
              }
              onClose={() => setActiveDropdown(null)}
            />
          </div>
        ))}
      </div>
      <button className='p-3 ml-[25px] max-xs:hidden'>
        <SearchIcon onClick={openSearch} />
      </button>

      <ConsultButton />

      <div className='max-xs:z-60 flex xs:hidden w-full justify-between items-center'>
        <Logo isMobile={true} />
        <div className='flex items-center'>
          <button className='p-3'>
            <SearchIcon onClick={openSearch} />
          </button>
          <button
            onClick={isSearchOpen ? closeSearch : onMenuToggle}
            className='p-3'
          >
            <MenuIcon isOpen={isSearchOpen || isMenuOpen} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='max-xs:block hidden border-t border-gray-200 bg-white absolute top-full left-0 right-0'>
          <div className='px-4 py-4 space-y-3 max-w-7xl mx-auto'>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='block text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium text-sm'
                onClick={onMenuToggle}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <Search isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  )
}

export default Navigation
