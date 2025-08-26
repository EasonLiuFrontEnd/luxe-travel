import { NAV_ITEMS, DESTINATIONS } from '@/lib/constants'
import type { TNavigation } from '@/types/components'

const Navigation = ({
  isVisible = true,
  isMenuOpen = false,
  onMenuToggle = () => {},
}: TNavigation) => {
  if (!isVisible) return null

  return (
    <>
      <div className='hidden min-[375px]:flex items-center space-x-6'>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className='text-gray-700 hover:text-amber-600 transition-colors duration-200 font-bold'
          >
            {item.name}
          </a>
        ))}
      </div>

      <button className='text-gray-700 hover:text-amber-600 transition-colors duration-200'>
        <div className='w-5 h-5 border-2 border-current rounded-full relative'>
          <div className='absolute -right-1 -bottom-1 w-2 h-0.5 bg-current transform rotate-45'></div>
        </div>
      </button>

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

      <div className='border-b border-gray-200 shadow-sm absolute top-full left-0 right-0'>
        <div className='bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center space-x-6 py-2 overflow-x-auto'>
              {DESTINATIONS.map((dest) => (
                <a
                  key={dest.name}
                  href={dest.href}
                  className='text-xs text-gray-600 hover:text-amber-600 transition-colors duration-200 whitespace-nowrap flex items-center'
                >
                  {dest.name}
                  {'hasSubmenu' in dest && dest.hasSubmenu && (
                    <span className='ml-1 text-xs'>▶</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
