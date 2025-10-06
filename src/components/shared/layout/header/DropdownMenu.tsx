'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { TBaseComponent } from '@/types'
import DropdownCloseIcon from '../../icons/header/DropdownCloseIcon'

export type TSubmenuItem = {
  label: string
  href: string
}

export type TDropdownItem = {
  label: string
  href: string
  hasSubmenu?: boolean
  submenuItems?: TSubmenuItem[]
}

export type TDropdownMenu = TBaseComponent & {
  isVisible: boolean
  items: TDropdownItem[]
  onClose: () => void
  onPageNavigation?: (href: string) => void
}

const DropdownMenu = ({
  isVisible,
  items,
  onClose,
  onPageNavigation = () => {},
}: TDropdownMenu) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [submenuPosition, setSubmenuPosition] = useState<'right' | 'left'>(
    'right',
  )
  const { isMobile } = useMediaQuery()

  if (!isVisible) return null

  const handleHoverShowSubmenu = (label: string, event: React.MouseEvent) => {
    const item = items.find((item: TDropdownItem) => item.label === label)
    if (item?.hasSubmenu) {
      setActiveSubmenu(label)

      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      const submenuWidth = 200
      const screenWidth = window.innerWidth

      if (rect.right + submenuWidth > screenWidth) {
        setSubmenuPosition('left')
      } else {
        setSubmenuPosition('right')
      }
    }
  }

  const handleHoverHideSubmenu = () => {
    setActiveSubmenu(null)
    setSubmenuPosition('right')
  }

  const handleClickToggleSubmenu = (item: TDropdownItem) => {
    const hasSubmenu = item.hasSubmenu && item.submenuItems
    if (hasSubmenu) {
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label)
    } else {
      onPageNavigation(item.href)
      onClose()
    }
  }

  const renderMobileMenu = () => (
    <div className='space-y-3'>
      {items.map((item, index) => (
        <div key={index} className='relative'>
          <div
            className={`flex items-center font-genseki-gothic leading-[1.5] text-figma-primary-400 py-[8px] px-[40px] gap-[8px]
              ${activeSubmenu === item.label ? 'text-figma-secondary-500' : ''}`}
            onClick={() => handleClickToggleSubmenu(item)}
          >
            {'- ' + item.label}
            {item.hasSubmenu && (
              <DropdownCloseIcon
                isMobile={true}
                className={`transition-transform duration-600 ease-in-out 
                          ${
                            activeSubmenu === item.label
                              ? 'rotate-180'
                              : 'rotate-135'
                          }`}
              />
            )}
          </div>

          {item.hasSubmenu &&
            activeSubmenu === item.label &&
            item.submenuItems && (
              <div className='overflow-x-auto scrollbar-hide scroll-smooth'>
                <div
                  className='flex gap-4 py-[8px] px-[40px]'
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {item.submenuItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className='flex-shrink-0 py-[4px] px-[12px] font-genseki-body-s-regular text-figma-primary-400 border-figma-primary-400 rounded-[18px] border active:text-figma-secondary-500 active:border-figma-secondary-500'
                      style={{ scrollSnapAlign: 'start' }}
                      onClick={() => {
                        onPageNavigation(subItem.href)
                        onClose()
                      }}
                    >
                      <a
                        href={subItem.href}
                        className='font-noto-serif-body-s-regular text-figma-primary-600 whitespace-nowrap block text-center'
                      >
                        {subItem.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  )

  const renderDesktopMenu = () => (
    <div
      className='absolute left-0 bottom-[-15px] translate-y-full bg-white z-50'
      onMouseLeave={() => {
        setActiveSubmenu(null)
        onClose()
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className='relative'
          onMouseEnter={(e) => handleHoverShowSubmenu(item.label, e)}
          onMouseLeave={handleHoverHideSubmenu}
        >
          <div className='py-[8px] pr-[8px] pl-[12px] cursor-pointer hover:bg-figma-accent-yellow-light transition duration-300'>
            <div className='flex items-center justify-between min-w-[130px] h-[24px] text-figma-primary-500 font-noto-serif-body-m-semibold hover:text-figma-secondary-500 transition duration-300'>
              {item.label}
              {item.hasSubmenu && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='10'
                  viewBox='0 0 6 10'
                  fill='none'
                >
                  <path
                    d='M1 9L5 5L1 1'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </div>
          </div>

          {item.hasSubmenu &&
            activeSubmenu === item.label &&
            item.submenuItems && (
              <div
                className={`absolute top-0 bg-white ${
                  submenuPosition === 'right' ? 'left-full' : 'right-full'
                }`}
              >
                {item.submenuItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className='py-[8px] pr-[8px] pl-[12px] cursor-pointer hover:bg-figma-accent-yellow-light transition duration-300'
                    onClick={() => {
                      onPageNavigation(subItem.href)
                      onClose()
                    }}
                  >
                    <a
                      href={subItem.href}
                      className='block min-w-[96px] h-[24px] text-figma-primary-500 font-noto-serif-body-m-semibold hover:text-figma-secondary-500 transition duration-300 whitespace-nowrap'
                    >
                      {subItem.label}
                    </a>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  )

  return isMobile ? renderMobileMenu() : renderDesktopMenu()
}

export default DropdownMenu
