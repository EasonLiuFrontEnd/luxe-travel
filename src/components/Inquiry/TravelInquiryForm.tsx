'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import {
  TravelInquiryFormData,
  travelInquiryFormSchema,
  defaultTravelInquiryFormData,
} from '@/types/inquiry'

import { HeroSection } from './HeroSection'
import { BasicInfoSection } from './BasicInfoSection'
import { BudgetDestinationSection } from './BudgetDestinationSection'
import { DetailRequirementsSection } from './DetailRequirementsSection'

export interface TravelInquiryFormProps {
  onSubmit?: (data: TravelInquiryFormData) => void | Promise<void>
  className?: string
  isLoading?: boolean
}

export function TravelInquiryForm({
  onSubmit,
  className = '',
  isLoading = false,
}: TravelInquiryFormProps) {
  const form = useForm<TravelInquiryFormData>({
    resolver: zodResolver(travelInquiryFormSchema),
    defaultValues: defaultTravelInquiryFormData,
    mode: 'onChange',
  })

  const handleSubmit = async (data: TravelInquiryFormData) => {
    try {
      console.log('旅遊諮詢表單提交:', data)
      await onSubmit?.(data)
    } catch (error) {
      console.error('表單提交錯誤:', error)
    }
  }

  return (
    <div
      className={`min-h-screen bg-[var(--Secondary-100,#F7F4EC)] ${className}`}
    >
      <HeroSection />

      <div className='relative -mt-20 pt-20'>
        <div className='mx-auto px-4 md:px-8 py-8 max-w-[1440px]'>
          <div className='mx-auto rounded-lg shadow-[0_24px_48px_rgba(0,0,0,0.12)] border border-[var(--color-figma-secondary-150)] bg-[var(--Secondary-100,#F7F4EC)] p-12'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex flex-col gap-8'
                noValidate
              >
                <div className='text-center flex flex-col gap-3'>
                  <h2 className='font-noto-serif-h4-bold text-[24px] text-figma-primary-950'>
                    旅遊諮詢需求單
                  </h2>
                  <p className='font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-500'>
                    誠摯感謝您蒞臨典藏旅遊。如需進一步諮詢行程內容或服務細節，請填寫表單，我們將由專人儘速與您聯繫。
                  </p>
                  <hr className='w-full border-t border-figma-primary-300 mt-4' />
                </div>

                <BasicInfoSection control={form.control} />

                <BudgetDestinationSection control={form.control} />

                <DetailRequirementsSection
                  control={form.control}
                  isLoading={isLoading}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelInquiryForm
