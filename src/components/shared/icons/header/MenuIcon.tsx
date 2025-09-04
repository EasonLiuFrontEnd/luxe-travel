export type TMenuIcon = {
  isOpen?: boolean
  onClick?: () => void
  className?: string
}

const MenuIcon = ({
  isOpen = false,
  onClick,
  className
}: TMenuIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      onClick={onClick}
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <path
        d='M18.3673 19.7761L19.7773 18.3661L13.4114 11.9999L19.7774 5.63394L18.3674 4.22394L12.0014 10.5899L5.63525 4.22389L4.22525 5.63389L10.5914 11.9999L4.22523 18.3661L5.63523 19.7761L12.0014 13.4099L18.3673 19.7761Z'
        fill='#BDA05E'
        className={`transition-all duration-800 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <g className={`transition-all duration-800 ease-in-out ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}>
        <path
          d='M4 6H20'
          stroke='#BDA05E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4 12H20'
          stroke='#BDA05E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4 18H20'
          stroke='#BDA05E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default MenuIcon