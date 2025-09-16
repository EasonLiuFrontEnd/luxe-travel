'use client'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { CounterInput } from '@/components/ui'
import { TTravelInquiryFormData } from './TravelInquiryForm'
import { CalendarIcon } from '@/components/ui/CalendarIcon'
import { formatDateForDisplay } from '@/lib/dateUtils'
export type TDetailRequirementsSectionProps = {
  control: Control<TTravelInquiryFormData>
  isLoading?: boolean
}
export const DetailRequirementsSection = ({
  control,
  isLoading = false,
}: TDetailRequirementsSectionProps) => {
  return (
    <div className='bg-white box-border content-stretch flex flex-col gap-8 items-start justify-start pb-[60px] pt-8 px-4 xl:px-8 relative rounded-2xl rounded-br-0 w-full'>
      <div className='box-border content-stretch flex flex-col gap-6 items-start justify-start pb-6 pt-0 px-0 relative shrink-0 w-full'>
        <div className='flex flex-col xl:flex-row gap-6 xl:items-end items-start justify-start w-full'>
          <div className='flex flex-col gap-1 items-start justify-start shrink-0 w-full xl:w-auto'>
            <div className='flex flex-wrap gap-0.5 items-center justify-start'>
              <div className='flex gap-1 items-center justify-start'>
                <div className="font-['Noto_Serif_TC',_sans-serif] font-light text-[18px] leading-[1.5] text-figma-primary-950">
                  預計人數
                </div>
                <div className='font-noto-sans text-[18px] leading-[1.5] text-figma-function-alert'>
                  *
                </div>
              </div>
            </div>
            <div className='flex flex-col xl:flex-row gap-6 xl:gap-[31px] items-start justify-start w-full xl:w-auto'>
              <FormField
                control={control}
                name='detailedRequirements.adultCount'
                render={({ field }) => (
                  <FormItem className='w-full xl:w-[218px]'>
                    <CounterInput
                      label='大人'
                      value={field.value}
                      onChange={field.onChange}
                      min={1}
                      max={20}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='detailedRequirements.childCount'
                render={({ field }) => (
                  <FormItem className='w-full xl:w-[249px]'>
                    <CounterInput
                      label='孩童'
                      value={field.value}
                      onChange={field.onChange}
                      min={0}
                      max={20}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-1 items-start justify-start min-w-0 w-full xl:w-auto'>
            <div className='flex flex-wrap gap-0.5 items-center justify-start'>
              <div className='flex gap-1 items-center justify-start'>
                <div className="font-['Noto_Serif_TC',_sans-serif] font-light text-[18px] leading-[1.5] text-figma-primary-950">
                  預計旅遊天數
                </div>
                <div className='font-noto-sans text-[18px] leading-[1.5] text-figma-function-alert'>
                  *
                </div>
              </div>
            </div>
            <FormField
              control={control}
              name='detailedRequirements.travelDays'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <CounterInput
                    label='旅遊天數'
                    value={field.value}
                    onChange={field.onChange}
                    min={1}
                    max={60}
                    unit='天'
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex-1 flex flex-col gap-1 items-start justify-start min-w-0 w-full xl:w-auto'>
            <div className='flex flex-wrap gap-0.5 items-center justify-start'>
              <div className='flex gap-1 items-center justify-start'>
                <div className="font-['Noto_Serif_TC',_sans-serif] font-light text-[18px] leading-[1.5] text-figma-primary-950">
                  預計出發日
                </div>
                <div className='font-noto-sans text-[18px] leading-[1.5] text-figma-function-alert'>
                  *
                </div>
              </div>
            </div>
            <FormField
              control={control}
              name='detailedRequirements.departureDate'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <div
                    className='relative'
                    onClick={() => {
                      const input = document.getElementById(
                        'departure-date-input',
                      ) as HTMLInputElement
                      if (input) {
                        input.focus()
                        input.showPicker?.()
                      }
                    }}
                  >
                    <div className='flex items-center justify-between px-0 py-3 border-b border-figma-primary-950-70 w-full hover:border-figma-primary-950 transition-colors duration-200'>
                      <span
                        className={`font-genseki-body-m-regular text-[16px] leading-[1.2] ${
                          field.value
                            ? 'text-figma-primary-950'
                            : 'text-figma-primary-300'
                        }`}
                      >
                        {field.value
                          ? formatDateForDisplay(field.value)
                          : '輸入日期  範例：2025/08/25'}
                      </span>
                      <div className='shrink-0 size-5 text-figma-primary-950 pointer-events-none'>
                        <CalendarIcon className='w-full h-full' />
                      </div>
                    </div>
                    <input
                      id='departure-date-input'
                      type='date'
                      className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                      {...field}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={control}
          name='detailedRequirements.wishlist'
          render={({ field }) => (
            <FormItem className='w-full'>
              <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                <FormLabel className="font-['Noto_Serif_TC',_sans-serif] font-light text-[18px] leading-[1.5] text-figma-primary-950">
                  心願清單
                </FormLabel>
                <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                  （希望必造訪的景點、城市等）
                </span>
              </div>
              <FormControl>
                <div className='w-full relative'>
                  <div className='flex flex-wrap gap-2.5 items-center justify-start px-0 py-3 w-full border-b border-[rgba(56,56,65,0.7)]'>
                    <input
                      placeholder='歡迎將需求告訴我們，典藏將竭誠為您服務'
                      className='flex-1 bg-transparent border-none outline-none font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 placeholder:text-figma-primary-300'
                      maxLength={100}
                      {...field}
                    />
                    <div className='flex gap-1.5 items-center justify-start shrink-0'>
                      <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-300'>
                        {field.value?.length || 0}/100
                      </span>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='detailedRequirements.specialRequirements'
          render={({ field }) => (
            <FormItem className='w-full'>
              <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                <FormLabel className="font-['Noto_Serif_TC',_sans-serif] font-light text-[18px] leading-[1.5] text-figma-primary-950">
                  其他特別需求
                </FormLabel>
                <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                  （如交通、接送、特別活動等）
                </span>
              </div>
              <FormControl>
                <div className='w-full relative'>
                  <div className='flex flex-wrap gap-2.5 items-center justify-start px-0 py-3 w-full border-b border-[rgba(56,56,65,0.7)]'>
                    <input
                      placeholder='歡迎將需求告訴我們，典藏將竭誠為您服務'
                      className='flex-1 bg-transparent border-none outline-none font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 placeholder:text-figma-primary-300'
                      maxLength={100}
                      {...field}
                    />
                    <div className='flex gap-1.5 items-center justify-start shrink-0'>
                      <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-300'>
                        {field.value?.length || 0}/100
                      </span>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='content-stretch flex items-center justify-between relative shrink-0 w-full'>
        <div className='basis-0 flex flex-col font-genseki-body-s-regular leading-[1.5] grow justify-center min-h-px min-w-px not-italic relative shrink-0 text-figma-primary-950 text-[14px]'>
          <p>
            典藏旅遊遵循「個人資料保護法」以妥善處理、利用本表所載之個人資料，並採取資料保護措施。
            <br />
            您有權提出要求使用、更正、補充、刪除或封鎖這些個人資料，請將任何這類需求寄至
            info@luxetravel.com.tw
          </p>
        </div>
      </div>
      <div className='absolute bg-[var(--color-figma-secondary-100)] box-border content-stretch flex gap-4 items-center justify-center px-6 py-3 right-0 rounded-tl-[16px] rounded-br-[16px] bottom-0'>
        <button
          type='submit'
          disabled={isLoading}
          className='flex items-center gap-4 font-genseki-body-m-medium text-[20px] leading-[1.2] text-figma-secondary-950 tracking-[0.5px] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
        >
          <span>送出諮詢</span>
          <div className='h-1.5 w-5 relative shrink-0'>
            <svg
              className='size-full'
              viewBox='0 0 20 6'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19.707 3.707a1 1 0 0 0 0-1.414L16.828.414a1 1 0 1 0-1.414 1.414L17.586 4l-2.172 2.172a1 1 0 0 0 1.414 1.414l2.879-2.879zM0 4h19V2H0v2z'
                fill='#926d3c'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
export default DetailRequirementsSection
