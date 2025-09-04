import { useState, useEffect } from 'react'
import { NAV_ITEMS, DROPDOWN_MENUS } from '@/lib/constants'
import type { TBaseComponent } from '@/types'

export type TNavigation = TBaseComponent & {
  isMenuOpen?: boolean
  onMenuToggle?: () => void
  logoProgress?: number
  showConsultButton?: boolean
}
import DropdownMenu from './DropdownMenu'
import ConsultButton from '@/components/ui/ConsultButton'
import Logo from './Logo'
import SearchIcon from '@/components/shared/icons/header/SearchIcon'
import MenuIcon from '@/components/shared/icons/header/MenuIcon'
import NavigationHoverIcon from '@/components/shared/icons/header/NavigationHoverIcon'
import Search from './Search'

const Navigation = ({
  isMenuOpen = false,
  onMenuToggle = () => { },
  showConsultButton = false,
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
            <button className='font-noto-serif-body-l-semibold text-figma-primary-950 hover:text-figma-secondary-950 cursor-pointer pt-[48px] relative'>
              {activeDropdown === item.name && (
                <NavigationHoverIcon className='absolute top-0 right-[50%] translate-x-[50%]' />
              )}
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

      <ConsultButton
        className={`max-xs:hidden transition-opacity duration-800 ${showConsultButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      />

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
        <div className='block xs:hidden absolute top-full left-0 right-0 mt-px pt-[48px] px-[20px] space-y-7 bg-figma-neutral-50'>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='block font-noto-serif-body-m-medium py-[12px] px-[5px]'
              onClick={onMenuToggle}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      <Search isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  )
}

export default Navigation
