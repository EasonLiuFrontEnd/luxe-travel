import Link from 'next/link'

type TConsultButton = {
  className?: string
}

const ConsultButton = ({ className = '' }: TConsultButton) => {
  return (
    <div
      className={`absolute top-full left-0 right-0 bg-transparent ${className}`}
    >
      <div className='flex items-center justify-end xl:px-[48px] px-3'>
        <Link href='/inquiry'>
          <div className='p-3 xl:p-4 rounded-b-2xl cursor-pointer bg-figma-secondary-500 hover:bg-figma-secondary-950 transition duration-300'>
            <span className='font-genseki-body-m-medium text-figma-primary-0 px-4 py-0'>
              諮詢單
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ConsultButton
