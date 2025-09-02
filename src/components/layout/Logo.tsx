import Link from 'next/link'
import type { TLogo } from '@/types/components'

const logoImage = '/logo.svg'

const Logo = ({
  scale = 0.34,
  isMobile = false,
}: TLogo & { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <Link href='/'>
        <div className='flex items-center'>
          <img
            src={logoImage}
            alt='典藏旅遊 LUXE TRAVEL'
            className='block w-[181px] h-[48px]'
            data-node-id='422:1672'
          />
        </div>
      </Link>
    )
  }

  return (
    <Link href='/'>
      <div
        className='absolute top-[12px] left-[48px] logo-container scale-[var(--logo-scale)] translate-y-[var(--translate-y)]'
        style={
          {
            '--logo-scale': scale,
            '--translate-y': `31px`,
          } as React.CSSProperties
        }
      >
        <img
          src={logoImage}
          alt='典藏旅遊 LUXE TRAVEL'
          className='block w-[181px] h-[48px] xs:w-[527px] xs:h-[140px]'
          data-node-id='422:1672'
        />
      </div>
    </Link>
  )
}

export default Logo
