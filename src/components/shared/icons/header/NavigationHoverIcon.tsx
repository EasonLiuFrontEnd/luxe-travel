export type TNavigationHoverIcon = {
  size?: string
  className?: string
}

const NavigationHoverIcon = ({
  className = '',
  size = '28',
}: TNavigationHoverIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 28 28'
      fill='none'
      className={className}
    >
      <path
        d='M0 1.22392e-06C0 1.83851 0.362121 3.65901 1.06569 5.35757C1.76925 7.05613 2.80049 8.59947 4.10051 9.8995C5.40053 11.1995 6.94387 12.2307 8.64243 12.9343C10.341 13.6379 12.1615 14 14 14C15.8385 14 17.659 13.6379 19.3576 12.9343C21.0561 12.2307 22.5995 11.1995 23.8995 9.89949C25.1995 8.59947 26.2307 7.05613 26.9343 5.35757C27.6379 3.65901 28 1.83851 28 0L0 1.22392e-06Z'
        fill='#BDA05E'
      />
      <circle cx='13.9999' cy='23.3334' r='4.66667' fill='#BDA05E' />
    </svg>
  )
}

export default NavigationHoverIcon
