'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import {
  TravelInquiryFormData,
  travelInquiryFormSchema,
  defaultTravelInquiryFormData,
} from '@/types/travel-inquiry'

import { HeroSection } from './HeroSection'
import { TravelPreferencesSection } from './TravelPreferencesSection'
import { PersonalInfoSection } from './PersonalInfoSection'
import { ContactInfoSection } from './ContactInfoSection'

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

  const hasErrors = Object.keys(form.formState.errors).length > 0

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${className}`}
    >
      <HeroSection />

      <div className='container mx-auto px-4 py-8 -mt-20 relative z-10'>
        <Card className='max-w-4xl mx-auto shadow-2xl bg-white/95 backdrop-blur-sm border-0'>
          <div className='p-6 md:p-8 lg:p-12'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-8'
                noValidate
              >
                <div className='text-center space-y-2'>
                  <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>
                    旅遊諮詢表單
                  </h2>
                  <p className='text-gray-600 text-sm md:text-base'>
                    請填寫以下資訊，我們將為您客製化最適合的旅遊行程
                  </p>
                </div>

                {hasErrors && (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex-shrink-0'>
                        <svg
                          className='h-5 w-5 text-red-400'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className='text-sm font-medium text-red-800'>
                          請修正以下錯誤後再提交
                        </h3>
                        <div className='mt-2 text-sm text-red-700'>
                          <ul className='list-disc pl-5 space-y-1'>
                            {Object.entries(form.formState.errors).map(
                              ([field, error]) => (
                                <li key={field}>
                                  {error?.message || `${field} 欄位有錯誤`}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <TravelPreferencesSection control={form.control} />
                </div>

                <div>
                  <PersonalInfoSection control={form.control} />
                </div>

                <div>
                  <ContactInfoSection
                    control={form.control}
                    isLoading={isLoading}
                  />
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default TravelInquiryForm
