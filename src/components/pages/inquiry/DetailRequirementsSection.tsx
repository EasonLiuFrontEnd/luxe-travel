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
import styles from './styles.module.css'
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
    <div className='bg-white flex flex-col gap-8 pb-[60px] pt-5 xl:pt-8 px-4 xl:px-8 relative rounded-2xl rounded-br-0 w-full'>
      <div className='flex flex-col gap-7 xl:pb-7 w-full'>
        <div className='flex flex-col xl:flex-row gap-6 xl:items-end w-full'>
          <div className='flex flex-col gap-1'>
            <div className='flex gap-1 items-center mb-2'>
              <div className='font-noto-serif-body-l-semibold text-figma-primary-950'>
                預計人數
              </div>
              <div className='font-genseki-body-l-regular text-figma-function-alert'>
                *
              </div>
            </div>
            <div className='flex flex-col xl:flex-row gap-6 xl:gap-7'>
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
          <div className='w-full xl:flex-1 flex flex-col gap-1 xl:min-w-0'>
            <div className='flex gap-1 items-center mb-2'>
              <div className='font-noto-serif-body-l-semibold text-figma-primary-950'>
                預計旅遊天數
              </div>
              <div className='font-genseki-body-l-regular text-figma-function-alert'>
                *
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
          <div className='w-full xl:flex-1 flex flex-col gap-1 xl:min-w-0'>
            <div className='flex gap-1 items-center mb-2'>
              <div className='font-noto-serif-body-l-semibold text-figma-primary-950'>
                預計出發日
              </div>
              <div className='font-genseki-body-l-regular text-figma-function-alert'>
                *
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
                        className={`font-genseki-body-m-regular text-[16px] leading-[1.2] ${field.value
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
              <div className='flex gap-0.5 items-center mb-2'>
                <FormLabel className='font-noto-serif-body-l-semibold text-figma-primary-950'>
                  心願清單
                </FormLabel>
                <span className='font-genseki-body-s-regular text-figma-primary-950'>
                  （希望必造訪的景點、城市等）
                </span>
              </div>
              <FormControl>
                <div className='flex gap-2.5 items-center px-0 py-3 w-full border-b border-[rgba(56,56,65,0.7)]'>
                  <input
                    placeholder='歡迎將需求告訴我們，典藏將竭誠為您服務'
                    className='flex-1 bg-transparent border-none outline-none font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 placeholder:text-figma-primary-300'
                    maxLength={100}
                    {...field}
                  />
                  <div className='flex gap-1.5 items-center shrink-0'>
                    <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-300'>
                      {field.value?.length || 0}/100
                    </span>
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
              <div className='flex gap-0.5 items-center mb-2'>
                <FormLabel className='font-noto-serif-body-l-semibold text-figma-primary-950'>
                  其他特別需求
                </FormLabel>
                <span className='font-genseki-body-s-regular text-figma-primary-950'>
                  （如交通、接送、特別活動等）
                </span>
              </div>
              <FormControl>
                <div className='flex gap-2.5 items-center px-0 py-3 w-full border-b border-[rgba(56,56,65,0.7)]'>
                  <input
                    placeholder='歡迎將需求告訴我們，典藏將竭誠為您服務'
                    className='flex-1 bg-transparent border-none outline-none font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 placeholder:text-figma-primary-300'
                    maxLength={100}
                    {...field}
                  />
                  <div className='flex gap-1.5 items-center shrink-0'>
                    <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-300'>
                      {field.value?.length || 0}/100
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <p className='flex items-center w-full font-genseki-body-s-regular text-figma-primary-950'>
        典藏旅遊遵循「個人資料保護法」以妥善處理、利用本表所載之個人資料，並採取資料保護措施。
        <br />
        您有權提出要求使用、更正、補充、刪除或封鎖這些個人資料，請將任何這類需求寄至
        info@luxetravel.com.tw
      </p>
      <div className='absolute bottom-0 right-0'>
        <div className={`bg-figma-secondary-100 flex gap-4 items-center justify-center px-4 py-3 xl:px-7 xl:py-4 rounded-tl-[16px] rounded-br-[16px] ${styles.descriptionContainer}`}>
          <button
            type='submit'
            disabled={isLoading}
            className='
            flex items-center gap-5 text-figma-secondary-950 tracking-[0.5px]
            font-family-noto-serif xl:font-family-genseki text-[24px] xl:text-[20px] font-bold xl:font-medium leading-[1.2]
            cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
          '
          >
            <span>送出諮詢</span>
            <div className='h-1.5 w-5 shrink-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='9'
                viewBox='0 0 25 9'
                fill='none'
              >
                <path
                  d='M1 6.33105H0V8.33105H1V7.33105V6.33105ZM21 7.33105V8.33105H24.6824L21.5058 6.46842L21 7.33105ZM1 7.33105V8.33105H21V7.33105V6.33105H1V7.33105ZM21 7.33105L21.5058 6.46842L11.2733 0.468416L10.7674 1.33105L10.2616 2.19369L20.4942 8.19369L21 7.33105Z'
                  fill='#926D3C'
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
export default DetailRequirementsSection
