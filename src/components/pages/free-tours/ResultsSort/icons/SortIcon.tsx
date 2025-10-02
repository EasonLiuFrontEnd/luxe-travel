type TSortIconProps = {
  sortDirection?: 'asc' | 'desc' | 'none'
  className?: string
}

const SortIcon = ({
  sortDirection = 'none',
  className = '',
}: TSortIconProps) => {
  const upColor =
    sortDirection === 'asc'
      ? 'var(--color-figma-neutral-300)'
      : 'var(--color-figma-primary-300)'
  const downColor =
    sortDirection === 'desc'
      ? 'var(--color-figma-neutral-300)'
      : 'var(--color-figma-primary-300)'

  return (
    <div className={`inline-flex flex-col gap-1 ${className}`}>
      <svg
        width='12'
        height='5'
        viewBox='0 0 12 5'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M6 0.5L11.1962 5H0.803848L6 0.5Z' fill={upColor} />
      </svg>

      <svg
        width='12'
        height='5'
        viewBox='0 0 12 5'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6 4.5L0.803849 -9.78799e-07L11.1962 -7.02746e-08L6 4.5Z'
          fill={downColor}
        />
      </svg>
    </div>
  )
}

export default SortIcon