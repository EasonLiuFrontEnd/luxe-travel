import Link from 'next/link'
import Image from 'next/image'

export type TLogo = {
  scale?: number
  className?: string
}

const logoImage = '/shared/icons/logo.svg'

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
        className='absolute top-0 left-[48px] transition-all duration-200 ease-in-out logo-container'
        style={
          {
            '--logo-scale': scale,
            transform: `scale(var(--logo-scale)) translateY(calc(35px + (var(--logo-scale) - 0.34) * 71px / 0.66))`,
          } as React.CSSProperties
        }
      >
        <Image
          src={logoImage}
          alt='典藏旅遊 LUXE TRAVEL'
          width={527}
          height={140}
        />
      </div>
    </Link>
  )
}

export default Logo
