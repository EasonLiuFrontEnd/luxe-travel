type TCalendarIconProps = {
  className?: string
}

export const CalendarIcon = ({ className = '' }: TCalendarIconProps) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect
        x='3'
        y='4'
        width='14'
        height='12'
        rx='2'
        stroke='currentColor'
        strokeWidth='1.5'
        fill='none'
      />
      <path
        d='M16 8H4'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M8 1V4'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M12 1V4'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}
