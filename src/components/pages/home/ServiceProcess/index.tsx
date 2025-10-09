'use client'

import { cn } from '@/lib/utils'
import { serviceSteps, getStepStyles, type TServiceStep } from './config'
import styles from './styles.module.css'
import '@/styles/components.css'

type TServiceProcessProps = {
  className?: string
}

const ServiceStep = ({ step }: { step: TServiceStep }) => {
  const { number, title, englishTitle, description } = step

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between p-7 w-full xl:min-h-auto xl:hover:min-w-[400px] xl:hover:h-full xl:hover:max-w-[25%] xl:hover:max-h-[526px] group',
        getStepStyles(number),
        styles.books,
      )}
    >
      <div className='flex flex-col gap-3 xl:gap-5 items-center justify-start text-nowrap'>
        <p className="font-['Amiri'] text-[64px] leading-none">{number}</p>
        <p className="font-['Noto_Serif_TC'] font-bold text-[32px] 2xl:text-[40px] leading-[1.2] text-center">
          {title}
        </p>
      </div>

      <div className='flex gap-4 xl:gap-8 items-end justify-start w-full'>
        <p className="rotate-[270deg] font-['Luxurious_Script'] text-[48px] text-center whitespace-nowrap tracking-[0.1em] leading-none max-w-[48px]">
          {englishTitle}
        </p>
        {description && (
          <p className='text-[20px] leading-[1.5] text-transparent group-hover:text-white transition-colors duration-300'>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

const ServiceProcess = ({ className, ...props }: TServiceProcessProps) => {
  return (
    <section
      className={cn(
        'relative',
        styles.serviceProcessBackgroundColor,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'px-0 py-[60px] xl:py-[120px] flex flex-col gap-[60px] xl:gap-[120px] items-center border-b border-figma-secondary-500 xl:border-none',
          styles.serviceProcessBackgroundImage,
        )}
      >
        <h2 className='inline-block font-family-noto-serif font-bold text-[32px] xl:text-[64px] xl:leading-[120%] text-[var(--color-figma-primary-950)] px-5 py-[6px] gradient-title-border'>
          典藏服務流程
        </h2>

        <div className='xl:relative max-w-[1440px] w-full xl:h-[641px] px-[clamp(12px,2.5vw,48px)] xl:border-b xl:border-[var(--color-figma-secondary-500)]'>
          <div className='xl:absolute xl:inset-0 flex flex-col xl:flex-row xl:items-end xl:justify-center gap-4 xl:gap-[6px]'>
            {serviceSteps.map((step) => (
              <ServiceStep key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceProcess
