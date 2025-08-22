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
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/Button'

import { TravelInquiryFormData } from '@/types/travel-inquiry'

export interface ContactInfoSectionProps {
  control: Control<TravelInquiryFormData>
  isLoading?: boolean
}

export function ContactInfoSection({
  control,
  isLoading = false,
}: ContactInfoSectionProps) {
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h3
          className='text-xl md:text-2xl font-semibold text-gray-900'
          id='contact-info-title'
        >
          額外需求與提交
        </h3>
        <p className='text-sm text-gray-600' id='contact-info-description'>
          如有其他特殊需求，請在此告訴我們
        </p>
      </div>

      <div className='space-y-6'>
        <FormField
          control={control}
          name='additionalRequirements'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                心動等級及其他需求
              </FormLabel>
              <FormDescription>
                例如：特殊飲食需求、行動不便需求、特別想體驗的活動等
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder='請描述您的特殊需求或想法，我們會盡力為您安排...'
                  className='min-h-24 resize-none'
                  maxLength={500}
                  {...field}
                />
              </FormControl>
              <div className='flex justify-between'>
                <FormMessage />
                <span className='text-xs text-gray-400'>
                  {field.value?.length || 0}/500
                </span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='personalInfo.notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base font-medium'>
                其他說明 (選填)
              </FormLabel>
              <FormDescription>任何我們需要知道的額外資訊</FormDescription>
              <FormControl>
                <Textarea
                  placeholder='例如：特殊節日慶祝、團體性質、預算彈性等...'
                  className='min-h-20 resize-none'
                  maxLength={300}
                  {...field}
                />
              </FormControl>
              <div className='flex justify-between'>
                <FormMessage />
                <span className='text-xs text-gray-400'>
                  {field.value?.length || 0}/300
                </span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='agreeToTerms'
          render={({ field }) => (
            <FormItem>
              <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
                <div className='flex items-start space-x-3'>
                  <FormControl>
                    <Checkbox
                      id='agree-terms'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='mt-1'
                    />
                  </FormControl>
                  <div className='space-y-2'>
                    <FormLabel
                      htmlFor='agree-terms'
                      className='text-sm font-medium cursor-pointer'
                    >
                      同意服務條款和隱私政策{' '}
                      <span className='text-red-500'>*</span>
                    </FormLabel>
                    <div
                      className='text-xs text-gray-600 space-y-1'
                      id='terms-description'
                    >
                      <p>當您填寫並提交此表單，即表示您同意以下條款：</p>
                      <ul className='list-disc pl-4 space-y-1'>
                        <li>我們會使用您提供的資訊為您規劃旅遊行程</li>
                        <li>您的個人資料將受到嚴格保護，不會用於其他用途</li>
                        <li>我們可能會透過您提供的聯絡方式與您聯繫</li>
                        <li>您有權隨時要求刪除或修改您的個人資料</li>
                      </ul>
                      <p className='pt-2'>
                        如需了解詳細的隱私政策，請聯繫我們的客服團隊。
                        <br />
                        客服信箱：info@luxurytravel.com.tw
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='border-t border-gray-200 pt-6'>
          <div className='flex flex-col space-y-4'>
            <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
              <div className='flex items-start space-x-3'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-5 w-5 text-green-500 mt-0.5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div>
                  <h4 className='text-sm font-medium text-green-900'>
                    提交後我們會做什麼？
                  </h4>
                  <div className='text-sm text-green-700 mt-1 space-y-1'>
                    <p>• 我們會在 24 小時內與您聯繫</p>
                    <p>• 根據您的需求提供初步的行程建議</p>
                    <p>• 安排專業顧問為您詳細規劃</p>
                    <p>• 提供透明的價格和完整的服務說明</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-center'>
              <Button
                type='submit'
                size='lg'
                disabled={isLoading}
                className='px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <div className='flex items-center space-x-2'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                    <span>送出諮詢中...</span>
                  </div>
                ) : (
                  <div className='flex items-center space-x-2'>
                    <span>送出諮詢</span>
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                      />
                    </svg>
                  </div>
                )}
              </Button>
            </div>

            <div className='text-center text-sm text-gray-500 space-y-1'>
              <p>如有任何問題，歡迎直接聯絡我們</p>
              <div className='flex justify-center space-x-4'>
                <span>📞 02-1234-5678</span>
                <span>📧 info@luxurytravel.com.tw</span>
              </div>
              <p className='text-xs'>服務時間：週一至週五 09:00-18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfoSection
