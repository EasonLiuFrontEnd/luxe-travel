type TTimeSlotData = {
  id: string
  date: string
  status: '已成團' | '熱銷中' | '已滿團' | '取消'
  href: string
}

type TTimeSlotCardProps = {
  slot: TTimeSlotData
  onSelect: (id: string) => void
  isActive?: boolean
}

const TimeSlotCard = ({
  slot,
  onSelect,
  isActive = false,
}: TTimeSlotCardProps) => {
  const isDisabled = slot.status !== '熱銷中' && slot.status !== '已成團'

  const disabledStyles = {
    container: 'text-figma-primary-500 bg-figma-primary-100 cursor-not-allowed',
    border: 'border-figma-primary-300',
  }

  const activeStyles = {
    container:
      'text-figma-function-available-normal bg-[#00D4751A] border border-figma-function-available-light cursor-pointer',
    border: 'border-figma-function-available-light',
  }

  const hoverStyles = {
    container:
      'text-figma-function-available-normal bg-[#00D4751A] border border-transparent hover:border-figma-function-available-light hover:bg-[#ccf6e3] cursor-pointer',
    border: 'border-figma-function-available-light',
  }

  const getContainerStyles = () => {
    if (isDisabled) return disabledStyles.container
    if (isActive) return activeStyles.container
    return hoverStyles.container
  }

  return (
    <button
      onClick={() => onSelect(slot.id)}
      disabled={isDisabled}
      className={`flex flex-col items-center rounded-[4px] w-[84px] ${getContainerStyles()}`}
    >
      <p
        className={`w-full font-noto-serif-body-m-medium text-center py-2 border-b ${
          isDisabled
            ? disabledStyles.border
            : activeStyles.border
        }`}
      >
        {slot.date}
      </p>
      <p className='font-genseki-body-s-regular pt-1 pb-2'>{slot.status}</p>
    </button>
  )
}

export default TimeSlotCard
