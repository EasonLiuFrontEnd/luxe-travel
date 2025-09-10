type TIconCtaProps = {
  className?: string
}

const IconCta = ({ className = '' }: TIconCtaProps) => {
  return (
    <div className={`relative size-full ${className}`}>
      <div className='absolute top-1/2 right-0 -translate-y-1/2 transition-all duration-300 ease-out'>
        <svg
          className='w-[25px] h-[9px] group-hover:w-[38px] opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out'
          viewBox='0 0 25 9'
          fill='none'
        >
          <path
            d='M25.0029 8.5H0.320312V6.5H17.6387L10.582 2.3623L11.5938 0.637695L25.0029 8.5Z'
            fill='currentColor'
          />
        </svg>
        <svg
          className='w-[38px] h-[9px] absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out'
          viewBox='0 0 38 9'
          fill='none'
        >
          <path
            d='M38.0029 8.3623H0.320312V6.3623H30.6387L23.582 2.22461L24.5938 0.5L38.0029 8.3623Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </div>
  )
}

export default IconCta
