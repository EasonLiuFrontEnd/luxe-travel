import Link from 'next/link'
import type { TLogo } from '@/types/components'
import Image from 'next/image'

const logoImage = '/header/logo.svg'

const Logo = ({
  scale = 0.34,
  isMobile = false,
}: TLogo & { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <Link href='/'>
        <div className='flex items-center'>
          <Image
            src={logoImage}
            alt='典藏旅遊 LUXE TRAVEL'
            className='block'
            width={181}
            height={48}
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
        <Image
          src={logoImage}
          alt='典藏旅遊 LUXE TRAVEL'
          className='block w-[181px] h-[48px] xs:w-[527px] xs:h-[140px]'
          width={527}
          height={140}
        />
      </div>
    </Link>
  )
}

export default Logo
