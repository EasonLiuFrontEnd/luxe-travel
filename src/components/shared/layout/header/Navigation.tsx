import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useMenu } from '@/api/home/useMenu'
import { transformMenuData } from './utils'
import type { TBaseComponent } from '@/types'

type TNavigation = TBaseComponent & {
  isMenuOpen?: boolean
  onMenuToggle?: () => void
  logoProgress?: number
  showConsultButton?: boolean
}

import DropdownMenu from './DropdownMenu'
import ConsultButton from '@/components/shared/layout/header/ConsultButton'
import Logo from './Logo'
import SearchIcon from '@/components/shared/icons/header/SearchIcon'
import MenuIcon from '@/components/shared/icons/header/MenuIcon'
import NavigationHoverIcon from '@/components/shared/icons/header/NavigationHoverIcon'
import Search from './Search'
import Image from 'next/image'
import DropdownCloseIcon from '../../icons/header/DropdownCloseIcon'

const Navigation = ({
  isMenuOpen = false,
  onMenuToggle = () => {},
  showConsultButton = false,
}: TNavigation) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { push } = useRouter()

  const { query: menuQuery, mock } = useMenu()
  const {
    data: menuData,
    isLoading: isMenuLoading,
    error: menuError,
  } = menuQuery

  const { navItems, dropdownMenus } = useMemo(() => {
    if (menuError) {
      return transformMenuData(mock.data)
    }

    if (isMenuLoading) {
      return { navItems: [], dropdownMenus: {} }
    }

    // 如果 API 正常回應，即使是空陣列也使用 API 資料
    return transformMenuData(menuData || [])
  }, [menuError, menuData, isMenuLoading, mock.data])

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

  const handlePageNavigation = (href: string) => {
    push(href)
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

  useEffect(() => {
    if (!isMenuOpen) {
      setActiveDropdown(null)
    }
  }, [isMenuOpen])

  return (
    <>
      <div className='hidden xl:flex items-center space-x-7'>
        {navItems.map((item) => (
          <div
            key={item.label}
            className='relative'
            onMouseEnter={() => setActiveDropdown(item.label)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className='font-noto-serif-body-l-semibold text-figma-primary-950 hover:text-figma-secondary-950 cursor-pointer pt-[48px] relative'>
              {activeDropdown === item.label && (
                <NavigationHoverIcon className='absolute top-0 right-[50%] translate-x-[50%]' />
              )}
              {item.label}
            </button>
            <div className='absolute top-full left-0 right-0 h-[16px] bg-transparent' />
            <DropdownMenu
              isVisible={activeDropdown === item.label}
              items={
                dropdownMenus[item.label as keyof typeof dropdownMenus] || []
              }
              onClose={() => setActiveDropdown(null)}
              onPageNavigation={handlePageNavigation}
            />
          </div>
        ))}
        <button className='pt-[48px] px-[8px] max-xl:hidden'>
          <SearchIcon onClick={openSearch} />
        </button>
      </div>

      <ConsultButton
        className={`max-xl:hidden transition-opacity duration-800 ${
          showConsultButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className='max-xl:z-60 flex xl:hidden w-full justify-between items-center'>
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
        <div className='flex flex-col xl:hidden absolute top-full left-0 right-0 mt-px pt-[48px] pb-[53px] space-y-7 bg-figma-neutral-50 h-[calc(100dvh-73px)] overflow-y-auto'>
          {navItems.map((item) => {
            const menuItems =
              dropdownMenus[item.label as keyof typeof dropdownMenus] || []
            const hasDropdown = menuItems.length > 0

            return (
              <div key={item.label} className='space-y-0'>
                <div
                  className={`flex justify-between items-center font-noto-serif-body-m-medium py-[12px] px-[40px] cursor-pointer
                    ${activeDropdown === item.label ? 'text-figma-secondary-950' : ''}`}
                  onClick={() =>
                    hasDropdown
                      ? setActiveDropdown(
                          activeDropdown === item.label ? null : item.label,
                        )
                      : onMenuToggle()
                  }
                >
                  {item.label}
                  {hasDropdown && (
                    <DropdownCloseIcon
                      className={`transition-transform duration-600 ease-in-out 
                          ${
                            activeDropdown === item.label
                              ? 'rotate-180'
                              : 'rotate-135'
                          }`}
                    />
                  )}
                </div>
                {hasDropdown && (
                  <DropdownMenu
                    isVisible={activeDropdown === item.label}
                    items={menuItems}
                    onClose={onMenuToggle}
                    onPageNavigation={handlePageNavigation}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      {isMenuOpen && (
        <Image
          src='/shared/icons/company-name.svg'
          alt='company-name'
          className='fixed bottom-0 left-0 right-0 w-full xl:hidden bg-figma-neutral-50 z-30'
          width={375}
          height={33}
        />
      )}

      <Search isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  )
}

export type { TNavigation }
export default Navigation
