export type TCloseIcon = {
  size?: string
  className?: string
  onClick?: () => void
}

const CloseIcon = ({
  size = '16',
  className,
  onClick
}: TCloseIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
      onClick={onClick}
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <path
        d='M18.3673 19.7761L19.7773 18.3661L13.4114 11.9999L19.7774 5.63394L18.3674 4.22394L12.0014 10.5899L5.63525 4.22389L4.22525 5.63389L10.5914 11.9999L4.22523 18.3661L5.63523 19.7761L12.0014 13.4099L18.3673 19.7761Z'
        fill='#BDA05E'
      />
    </svg>
  )
}

export default CloseIcon
