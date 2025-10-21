import Link from 'next/link'

type TTimeSlotData = {
  id: string
  date: string
  status: '已成團' | '熱銷中' | '已滿團' | '取消'
  href: string
}

const TimeSlotCard = ({ slot }: { slot: TTimeSlotData }) => {
  const isDisabled = slot.status !== '熱銷中' && slot.status !== '已成團'

  const disabledStyles = {
    container: 'text-figma-primary-500 bg-figma-primary-100 cursor-not-allowed',
    border: 'border-figma-primary-300',
  }

  const activeStyles = {
    container:
      'text-figma-function-available-normal bg-[#00D4751A] border border-transparent hover:border-figma-function-available-light hover:bg-[#ccf6e3] cursor-pointer',
    border: 'border-figma-function-available-light',
  }

  return (
    <Link href={slot.href} className={isDisabled ? 'pointer-events-none' : ''}>
      <div
        className={`flex flex-col items-center rounded-[4px] w-[84px] ${
          isDisabled ? disabledStyles.container : activeStyles.container
        }`}
      >
        <p
          className={`w-full font-noto-serif-body-m-medium text-center py-2 border-b ${
            isDisabled ? disabledStyles.border : activeStyles.border
          }`}
        >
          {slot.date}
        </p>
        <p className='font-genseki-body-s-regular pt-1 pb-2'>{slot.status}</p>
      </div>
    </Link>
  )
}

export default TimeSlotCard
