'use client'

import { Control } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/Button'

import { TravelInquiryFormData } from '@/types/inquiry'
import { CalendarIcon } from '@/components/ui/CalendarIcon'
import { formatDateForDisplay } from '@/lib/dateUtils'

export interface DetailRequirementsSectionProps {
  control: Control<TravelInquiryFormData>
  isLoading?: boolean
}

export function DetailRequirementsSection({
  control,
  isLoading = false,
}: DetailRequirementsSectionProps) {
  return (
    <div className='flex flex-col self-stretch bg-white rounded-2xl w-full p-8 gap-4'>
      <div className='flex flex-col gap-1'>
        <h3 className='font-noto-serif-h5-bold text-[18px] text-figma-primary-950'>
          詳細需求
        </h3>
      </div>

      <div className='space-y-6 w-full'>
        {/* 預計人數、預計旅遊天數、預計出發日 - 水平三欄佈局 */}
        <div className='flex gap-8 items-start justify-start w-full'>
          {/* 預計人數 */}
          <div className='flex flex-col gap-1 items-start justify-start shrink-0'>
            <div className='flex flex-wrap gap-0.5 items-center justify-start'>
              <div className='flex gap-1 items-center justify-start'>
                <div className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                  預計人數
                </div>
                <div className='font-noto-sans text-[18px] leading-[1.5] text-figma-function-alert'>
                  *
                </div>
              </div>
            </div>
            <div className='flex gap-6 items-start justify-start'>
              <FormField
                control={control}
                name='detailedRequirements.adultCount'
                render={({ field }) => (
                  <FormItem className='w-[218px]'>
                    <div className='flex gap-2.5 items-center justify-start px-0 py-3 border-b border-[rgba(56,56,65,0.7)]'>
                      <div className='flex-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950'>
                        大人
                      </div>
                      <button
                        type='button'
                        className='backdrop-blur-sm rounded-[25px] border border-[#b7b8c2] p-[2px] shrink-0 cursor-pointer hover:opacity-80'
                        onClick={() =>
                          field.onChange(Math.max(1, field.value - 1))
                        }
                      >
                        <div className='size-4 flex items-center justify-center'>
                          <span className='text-[#b7b8c2] text-xs'>-</span>
                        </div>
                      </button>
                      <div className='flex gap-[3px] items-center justify-start'>
                        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                          {field.value}
                        </span>
                        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                          位
                        </span>
                      </div>
                      <button
                        type='button'
                        className='backdrop-blur-sm rounded-[25px] border border-figma-primary-950 p-[2px] shrink-0 cursor-pointer hover:opacity-80'
                        onClick={() =>
                          field.onChange(Math.min(20, field.value + 1))
                        }
                      >
                        <div className='size-4 flex items-center justify-center'>
                          <span className='text-figma-primary-950 text-xs'>
                            +
                          </span>
                        </div>
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name='detailedRequirements.childCount'
                render={({ field }) => (
                  <FormItem className='w-[249px]'>
                    <div className='flex gap-2.5 items-center justify-start px-0 py-3 border-b border-[rgba(56,56,65,0.7)]'>
                      <div className='flex-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950'>
                        孩童
                      </div>
                      <button
                        type='button'
                        className='backdrop-blur-sm rounded-[25px] border border-[#b7b8c2] p-[2px] shrink-0 cursor-pointer hover:opacity-80'
                        onClick={() =>
                          field.onChange(Math.max(0, field.value - 1))
                        }
                      >
                        <div className='size-4 flex items-center justify-center'>
                          <span className='text-[#b7b8c2] text-xs'>-</span>
                        </div>
                      </button>
                      <div className='flex gap-[3px] items-center justify-start'>
                        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                          {field.value}
                        </span>
                        <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                          位
                        </span>
                      </div>
                      <button
                        type='button'
                        className='backdrop-blur-sm rounded-[25px] border border-figma-primary-950 p-[2px] shrink-0 cursor-pointer hover:opacity-80'
                        onClick={() =>
                          field.onChange(Math.min(20, field.value + 1))
                        }
                      >
                        <div className='size-4 flex items-center justify-center'>
                          <span className='text-figma-primary-950 text-xs'>
                            +
                          </span>
                        </div>
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* 預計旅遊天數 */}
          <div className='flex-1 flex flex-col gap-1 items-start justify-start min-w-0'>
            <div className='flex flex-wrap gap-0.5 items-center justify-start'>
              <div className='flex gap-1 items-center justify-start'>
                <div className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
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
                  <div className='flex gap-2.5 items-center justify-start px-0 py-3 border-b border-[rgba(56,56,65,0.7)] w-full'>
                    <div className='font-genseki-body-m-regular w-100% text-[16px] leading-[1.2] text-figma-primary-950'>
                      旅遊天數
                    </div>
                    <button
                      type='button'
                      className='backdrop-blur-sm rounded-[25px] border border-[#b7b8c2] p-[2px] shrink-0'
                      onClick={() =>
                        field.onChange(Math.max(1, field.value - 1))
                      }
                    >
                      <div className='size-4 flex items-center justify-center'>
                        <span className='text-[#b7b8c2] text-xs'>-</span>
                      </div>
                    </button>
                    <div className='flex gap-[3px] items-center justify-start'>
                      <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                        {field.value}
                      </span>
                      <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                        天
                      </span>
                    </div>
                    <button
                      type='button'
                      className='backdrop-blur-sm rounded-[25px] border border-figma-primary-950 p-[2px] shrink-0 cursor-pointer hover:opacity-80'
                      onClick={() =>
                        field.onChange(Math.min(60, field.value + 1))
                      }
                    >
                      <div className='size-4 flex items-center justify-center'>
                        <span className='text-figma-primary-950 text-xs'>
                          +
                        </span>
                      </div>
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 預計出發日 */}
          <div className='flex-1 flex flex-col gap-1 items-start justify-start min-w-0'>
            <div className='flex flex-wrap gap-0.5 items-center justify-start'>
              <div className='flex gap-1 items-center justify-start'>
                <div className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
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
                    className='relative cursor-pointer'
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
                    <div className='flex items-center justify-between px-0 py-3 border-b border-[rgba(56,56,65,0.7)] w-full hover:border-figma-primary-950 transition-colors duration-200'>
                      <span className='font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950'>
                        {field.value
                          ? formatDateForDisplay(field.value)
                          : '請選擇日期'}
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

        {/* 心願清單 */}
        <FormField
          control={control}
          name='detailedRequirements.wishlist'
          render={({ field }) => (
            <FormItem className='w-full'>
              <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
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

        {/* 其他特別需求 */}
        <FormField
          control={control}
          name='detailedRequirements.specialRequirements'
          render={({ field }) => (
            <FormItem className='w-full'>
              <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
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

        {/* 個資聲明 */}
        <div className='flex flex-col justify-center font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950 mt-8'>
          <p className='leading-6'>
            典藏旅遊遵循「個人資料保護法」以妥善處理、利用本表所載之個人資料，並採取資料保護措施。
            <br />
            您有權提出要求使用、更正、補充、刪除或封鎖這些個人資料，請將任何這類需求寄至
            info@luxetravel.com.tw
          </p>
        </div>

        {/* 送出按鈕 */}
        <div className='flex justify-end pt-4'>
          <Button
            type='submit'
            size='lg'
            disabled={isLoading}
            className='px-8 py-3 font-genseki-body-m-medium text-[16px] leading-[1.2] bg-figma-secondary-500 hover:bg-figma-secondary-950 text-figma-neutral-0 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? '送出諮詢中...' : '送出諮詢'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailRequirementsSection
