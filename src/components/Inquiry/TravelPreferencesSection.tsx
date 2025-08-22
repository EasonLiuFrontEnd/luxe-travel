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
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

import {
  TravelInquiryFormData,
  DESTINATION_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  CONTACT_TIME_OPTIONS,
} from '@/types/travel-inquiry'

export interface TravelPreferencesSectionProps {
  control: Control<TravelInquiryFormData>
}

export function TravelPreferencesSection({
  control,
}: TravelPreferencesSectionProps) {
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h3 className='text-xl md:text-2xl font-semibold text-gray-900'>
          旅遊資訊偏好
        </h3>
        <p className='text-sm text-gray-600'>
          請告訴我們您的旅遊偏好，讓我們為您規劃最適合的行程
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          <FormField
            control={control}
            name='travelPreferences.destinations'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>
                  想去哪裡？ <span className='text-red-500'>*</span>
                </FormLabel>
                <FormDescription>
                  可以多選，我們會為您安排最佳路線
                </FormDescription>
                <FormControl>
                  <div className='grid grid-cols-2 gap-3'>
                    {DESTINATION_OPTIONS.map((destination) => (
                      <div
                        key={destination.value}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox
                          id={`destination-${destination.value}`}
                          checked={field.value?.includes(destination.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...field.value,
                                destination.value,
                              ])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (item) => item !== destination.value,
                                ),
                              )
                            }
                          }}
                        />
                        <Label
                          htmlFor={`destination-${destination.value}`}
                          className='text-sm font-normal cursor-pointer'
                        >
                          {destination.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='travelPreferences.groupSize'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>
                  景點人數 <span className='text-red-500'>*</span>
                </FormLabel>
                <FormDescription>包含成人和兒童的總人數</FormDescription>
                <FormControl>
                  <div className='flex items-center space-x-2'>
                    <Input
                      type='number'
                      min='1'
                      max='50'
                      placeholder='請輸入人數'
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      className='w-32'
                    />
                    <span className='text-sm text-gray-500'>人</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='travelPreferences.phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>
                  聯絡人手機 <span className='text-red-500'>*</span>
                </FormLabel>
                <FormDescription>
                  請輸入台灣手機號碼 (格式: 09xxxxxxxx)
                </FormDescription>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='0912345678'
                    {...field}
                    maxLength={10}
                    className='font-mono'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='travelPreferences.lineId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>
                  LINE ID (選填)
                </FormLabel>
                <FormDescription>方便我們透過 LINE 與您聯絡</FormDescription>
                <FormControl>
                  <Input placeholder='請輸入您的 LINE ID' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-6'>
          <FormField
            control={control}
            name='travelPreferences.contactMethods'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>
                  會想透過哪個方式聯絡呢？{' '}
                  <span className='text-red-500'>*</span>
                </FormLabel>
                <FormDescription>
                  可以多選，我們會依您的偏好聯絡
                </FormDescription>
                <FormControl>
                  <div className='grid grid-cols-2 gap-3'>
                    {CONTACT_METHOD_OPTIONS.map((method) => (
                      <div
                        key={method.value}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox
                          id={`contact-${method.value}`}
                          checked={field.value?.includes(method.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, method.value])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (item) => item !== method.value,
                                ),
                              )
                            }
                          }}
                        />
                        <Label
                          htmlFor={`contact-${method.value}`}
                          className='text-sm font-normal cursor-pointer'
                        >
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='travelPreferences.contactTimePreference'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base font-medium'>
                  您是想要我們什麼時候聯絡您的？{' '}
                  <span className='text-red-500'>*</span>
                </FormLabel>
                <FormDescription>選擇您方便接聽的時段</FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='grid grid-cols-1 gap-3'
                  >
                    {CONTACT_TIME_OPTIONS.map((time) => (
                      <div
                        key={time.value}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem
                          value={time.value}
                          id={`time-${time.value}`}
                        />
                        <Label
                          htmlFor={`time-${time.value}`}
                          className='text-sm font-normal cursor-pointer'
                        >
                          {time.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <div className='flex items-start space-x-3'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-blue-500 mt-0.5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div>
                <h4 className='text-sm font-medium text-blue-900'>溫馨提醒</h4>
                <p className='text-sm text-blue-700 mt-1'>
                  填寫完整的聯絡資訊有助於我們更快為您安排行程諮詢。
                  我們承諾不會將您的個人資訊用於其他用途。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelPreferencesSection
