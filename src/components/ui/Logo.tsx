import Link from 'next/link'
import type { ILogo } from '@/types/components'

const Logo = ({ scale = 0.5 }: ILogo) => {
  return (
    <Link href='/'>
      <div
        className='flex items-center logo-container'
        style={{ transform: `scale(${scale})` }}
      >
        <div className='flex items-center space-x-2'>
          <div className='bg-gray-800 text-white px-3 py-2 font-bold text-9xl'>
            LT
          </div>
          <div>
            <div className='text-6xl font-bold text-gray-800 leading-tight'>
              LUXE
            </div>
            <div className='text-6xl font-bold text-gray-800 leading-tight'>
              TRAVEL
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Logo
