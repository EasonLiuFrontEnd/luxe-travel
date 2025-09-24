type TCheckIconProps = {
  className?: string
}

const CheckIcon = ({
  className = ''
}: TCheckIconProps) => {
  return (
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center border bg-figma-secondary-300 border-figma-secondary-500 ${className}`}
    >
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 3.6L4.2 7.6L9.4 0.8"
          stroke="var(--color-figma-secondary-950)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default CheckIcon