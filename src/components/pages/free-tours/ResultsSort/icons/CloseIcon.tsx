type TCloseIconProps = {
  className?: string
}

const CloseIcon = ({ className = '' }: TCloseIconProps) => {
  return (
    <svg
      width='12'
      height='11'
      viewBox='0 0 12 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M10.2441 10.6841L11.1841 9.74409L6.9401 5.49999L11.1841 1.25598L10.2441 0.315982L6.0001 4.55999L1.75602 0.31595L0.816017 1.25595L5.0601 5.49999L0.816007 9.74407L1.75601 10.6841L6.0001 6.43999L10.2441 10.6841Z'
        fill='var(--color-figma-secondary-950)'
      />
    </svg>
  )
}

export default CloseIcon