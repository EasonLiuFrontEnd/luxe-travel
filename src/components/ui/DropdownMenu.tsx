'use client'

import { useState } from 'react'

interface SubmenuItem {
  label: string
  href: string
}

interface DropdownItem {
  label: string
  href: string
  hasSubmenu?: boolean
  submenuItems?: SubmenuItem[]
}

interface DropdownProps {
  isVisible: boolean
  items: DropdownItem[]
  onClose: () => void
}

const DropdownMenu = ({ isVisible, items, onClose }: DropdownProps) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [submenuPosition, setSubmenuPosition] = useState<'right' | 'left'>('right')

  if (!isVisible) return null

  const handleSubmenuEnter = (label: string, event: React.MouseEvent) => {
    const item = items.find(item => item.label === label)
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

  const handleSubmenuLeave = () => {
    setActiveSubmenu(null)
    setSubmenuPosition('right')
  }

  return (
    <div 
      className="absolute top-9 left-0 bg-white z-50"
      onMouseLeave={() => {
        setActiveSubmenu(null)
        onClose()
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={(e) => handleSubmenuEnter(item.label, e)}
          onMouseLeave={handleSubmenuLeave}
        >
          <div className="py-[8px] pr-[8px] pl-[12px] cursor-pointer hover:bg-figma-neutral-50 transition-colors duration-300">
            <div className="flex items-center justify-between min-w-[130px] h-[24px] text-figma-primary-500 font-noto-serif-body-m-semibold hover:text-figma-secondary-500 transition-colors duration-300">
              {item.label}
              {item.hasSubmenu && (
                <img 
                  src="/chevron-right.svg" 
                  alt=">" 
                  className="w-3 h-4" 
                />
              )}
            </div>
          </div>

          {/* 二級選單 */}
          {item.hasSubmenu && activeSubmenu === item.label && item.submenuItems && (
            <div className={`absolute top-0 bg-white ${
              submenuPosition === 'right' ? 'left-full' : 'right-full'
            }`}>
              {item.submenuItems.map((subItem, subIndex) => (
                <div
                  key={subIndex}
                  className="py-[8px] pr-[8px] pl-[12px] cursor-pointer hover:bg-figma-neutral-50 transition-colors duration-300"
                >
                  <div className="min-w-[96px] h-[24px] text-figma-primary-500 font-noto-serif-body-m-semibold hover:text-figma-secondary-500 transition-colors duration-300 whitespace-nowrap">
                    {subItem.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default DropdownMenu