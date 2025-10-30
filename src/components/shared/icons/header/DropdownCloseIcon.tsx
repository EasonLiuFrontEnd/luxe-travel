type TDropdownCloseIcon = {
  isMobile?: boolean
  className?: string
  onClick?: () => void
}

const DropdownCloseIcon = ({
  isMobile = false,
  className,
}: TDropdownCloseIcon) => {
  return isMobile ? (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='12'
      viewBox='0 0 20 12'
      fill='none'
      className={className}
    >
      <path
        d='M10.9588 6.95246L5.28125 1.2749L4.31726 2.23889L8.08231 6.00395L4.32129 9.76497L5.25422 10.6979L9.01524 6.93687L9.99482 7.91645L10.9588 6.95246Z'
        fill='#BDA05E'
      />
      <path
        d='M9.04791 5.04022L14.7255 10.7178L15.6822 9.76108L11.9171 5.99604L15.6781 2.23502L14.7519 1.30875L10.9908 5.06977L10.0046 4.08353L9.04791 5.04022Z'
        fill='#BDA05E'
      />
    </svg>
  ) : (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='16'
      viewBox='0 0 24 16'
      fill='none'
      className={className}
    >
      <path
        d='M13.1985 9.1907L6.10156 2.09375L4.89657 3.29874L9.60289 8.00505L4.90161 12.7063L6.06777 13.8725L10.7691 9.17121L11.9935 10.3957L13.1985 9.1907Z'
        fill='#926D3C'
      />
      <path
        d='M10.8099 6.80022L17.9068 13.8972L19.1027 12.7013L14.3964 7.99499L19.0977 3.29371L17.9398 2.13588L13.2386 6.83715L12.0058 5.60436L10.8099 6.80022Z'
        fill='#926D3C'
      />
    </svg>
  )
}

export default DropdownCloseIcon
