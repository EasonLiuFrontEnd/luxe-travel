type TClearIconProps = {
  color?: string
  className?: string
  onClick?: () => void
}

const ClearIcon = ({
  color = 'var(--color-figma-secondary-100)',
  className = '',
  onClick
}: TClearIconProps) => {
  return (
    <svg
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <path
        d="M0 1H6H12"
        stroke={color}
      />
    </svg>
  )
}

export default ClearIcon