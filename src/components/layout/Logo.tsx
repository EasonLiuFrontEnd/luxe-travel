import Link from 'next/link'
import type { TLogo } from '@/types/components'

const Logo = ({ scale = 0.6 }: TLogo) => {
  return (
    <Link href='/'>
      <div
        className='flex items-center logo-container scale-[var(--logo-scale)]'
        style={{ '--logo-scale': scale } as React.CSSProperties}
      >
        <div className='flex items-center space-x-2'>
          <div className='bg-gray-800 text-white px-3 py-2 font-bold text-2xl'>
            LT
          </div>
          <div>
            <div className='text-xl font-bold text-gray-800 leading-tight'>
              LUXE
            </div>
            <div className='text-xl font-bold text-gray-800 leading-tight'>
              TRAVEL
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Logo
