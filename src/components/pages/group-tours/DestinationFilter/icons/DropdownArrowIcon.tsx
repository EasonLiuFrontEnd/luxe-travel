type TDropdownArrowIconProps = {
  color?: string
  className?: string
  isOpen?: boolean
}

const DropdownArrowIcon = ({
  color = 'var(--color-figma-neutral-950)',
  className = '',
  isOpen = false
}: TDropdownArrowIconProps) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${className}`}
    >
      <path
        d="M5 8L10 13L15 8"
        stroke={color}
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default DropdownArrowIcon