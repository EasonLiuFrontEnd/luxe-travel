import { cn } from '@/lib/utils'

type TPlusIconProps = {
  className?: string
  topColor?: string
  bottomColor?: string
  scale?: number
}

const PlusIcon = ({
  className,
  topColor,
  bottomColor,
  scale = 1,
}: TPlusIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      className={cn('mr-3', className)}
      style={{ transform: `scale(${scale})` }}
    >
      <path
        d='M15.5 12.6426H1.5V14.6924H10.7794V22.6426H13.0735V14.6924H15.5V12.6426Z'
        fill={bottomColor}
      />
      <path
        d='M8.5 12.6426H22.5V10.6066H13.2206V2.64258H10.9265V10.6066H8.5V12.6426Z'
        fill={topColor}
      />
    </svg>
  )
}

export default PlusIcon
