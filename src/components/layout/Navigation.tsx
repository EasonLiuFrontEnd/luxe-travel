import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NAV_ITEMS, DROPDOWN_MENUS } from '@/lib/constants'
import type { TNavigation } from '@/types/components'
import DropdownMenu from '../ui/DropdownMenu'

const Navigation = ({
  isVisible = true,
  isMenuOpen = false,
  onMenuToggle = () => {},
  logoProgress = 0,
}: TNavigation) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [activeDropdown])


  const handleNavItemClick = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  if (!isVisible) return null

  return (
    <>
      <div className='hidden min-[375px]:flex items-center space-x-6'>
        {NAV_ITEMS.map((item) => (
          <div key={item.name} className='relative'>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNavItemClick(item.name)
              }}
              className='font-noto-serif-body-l-semibold text-figma-primary-950 cursor-pointer'
            >
              {item.name}
            </button>
            
            <DropdownMenu
              isVisible={activeDropdown === item.name}
              items={DROPDOWN_MENUS[item.name as keyof typeof DROPDOWN_MENUS] || []}
              onClose={() => setActiveDropdown(null)}
            />
          </div>
        ))}
        <div className='p-[8px]'>
          <img
            src='/search-icon.svg'
            alt='搜尋'
            className='w-6 h-6'
          />
        </div>
      </div>

      {logoProgress >= 1 && (
        <div className='absolute top-full left-0 right-0 border-t border-[var(--color-figma-secondary-500)] bg-transparent'>
          <div className='flex items-center justify-end px-[48px]'>
            <Link href='/inquiry'>
              <div className='bg-figma-secondary-500 p-4 rounded-b-2xl cursor-pointer hover:opacity-90 transition-opacity'>
                <span className="font-genseki-body-m-medium text-figma-primary-0 px-4 py-0">
                  諮詢單
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={onMenuToggle}
        className='max-[374px]:block hidden text-gray-700 hover:text-amber-600 transition-colors duration-200'
      >
        <div className='space-y-1'>
          <div className='w-5 h-0.5 bg-current'></div>
          <div className='w-5 h-0.5 bg-current'></div>
          <div className='w-5 h-0.5 bg-current'></div>
        </div>
      </button>

      {isMenuOpen && (
        <div className='max-[374px]:block hidden border-t border-gray-200 bg-white absolute top-full left-0 right-0'>
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

    </>
  )
}

export default Navigation
