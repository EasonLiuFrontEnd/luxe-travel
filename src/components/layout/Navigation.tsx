import Link from 'next/link'
import { useState, useEffect } from 'react'
import { NAV_ITEMS, DROPDOWN_MENUS } from '@/lib/constants'
import type { TNavigation } from '@/types/components'
import DropdownMenu from './DropdownMenu'
import ConsultButton from '@/components/ui/ConsultButton'

const Navigation = ({
  isMenuOpen = false,
  onMenuToggle = () => { },
  logoProgress = 0,
}: TNavigation) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
      <div className='hidden min-[375px]:flex items-center space-x-6'>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.name}
            className='relative'
            onMouseEnter={() => setActiveDropdown(item.name)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className='font-noto-serif-body-l-semibold text-figma-primary-950 cursor-pointer'>{item.name}</button>
            <div className="absolute top-full left-0 right-0 h-[16px] bg-transparent" />
            <DropdownMenu
              isVisible={activeDropdown === item.name}
              items={DROPDOWN_MENUS[item.name as keyof typeof DROPDOWN_MENUS] || []}
              onClose={() => setActiveDropdown(null)}
            />
          </div>
        ))}
      </div>
      <div className='p-3 pl-[28px]'>
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
          <path d="M8.50002 14C9.28795 14 10.0682 13.8448 10.7961 13.5433C11.5241 13.2417 12.1855 12.7998 12.7427 12.2426C13.2998 11.6855 13.7418 11.0241 14.0433 10.2961C14.3448 9.56815 14.5 8.78793 14.5 8C14.5 7.21207 14.3448 6.43185 14.0433 5.7039C13.7418 4.97595 13.2998 4.31451 12.7427 3.75736C12.1855 3.20021 11.5241 2.75825 10.7961 2.45672C10.0682 2.15519 9.28795 2 8.50002 2C6.90872 2 5.38259 2.63214 4.25737 3.75736C3.13216 4.88258 2.50002 6.4087 2.50002 8C2.50002 9.5913 3.13216 11.1174 4.25737 12.2426C5.38259 13.3679 6.90872 14 8.50002 14ZM14.82 12.906L18.4 16.486C18.4955 16.5783 18.5716 16.6887 18.6239 16.8108C18.6762 16.9328 18.7037 17.064 18.7048 17.1968C18.7058 17.3296 18.6804 17.4613 18.63 17.5841C18.5797 17.707 18.5053 17.8186 18.4114 17.9124C18.3174 18.0062 18.2057 18.0804 18.0828 18.1306C17.9599 18.1808 17.8282 18.206 17.6954 18.2047C17.5626 18.2035 17.4314 18.1758 17.3095 18.1233C17.1875 18.0708 17.0772 17.9946 16.985 17.899L13.405 14.319C11.7975 15.5668 9.77481 16.1552 7.74877 15.9642C5.72273 15.7732 3.84562 14.8173 2.49957 13.2911C1.15351 11.7648 0.4397 9.78295 0.503441 7.74892C0.567182 5.7149 1.40368 3.78162 2.84266 2.34265C4.28164 0.903669 6.21492 0.0671666 8.24894 0.00342548C10.283 -0.0603156 12.2648 0.653496 13.7911 1.99955C15.3173 3.3456 16.2732 5.22271 16.4642 7.24875C16.6552 9.27479 16.0669 11.2975 14.819 12.905L14.82 12.906Z" fill="#926D3C"/>
        </svg>
      </div>

      <ConsultButton />

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
