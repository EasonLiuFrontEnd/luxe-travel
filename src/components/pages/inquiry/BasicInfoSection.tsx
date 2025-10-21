'use client'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
  FormSection,
  RadioFieldGroup,
  RadioGroup,
  RadioGroupItem,
  RequiredLabel,
} from '@/components/ui'
import {
  TTravelInquiryFormData,
  TRAVEL_TYPE_OPTIONS,
  GENDER_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  CONTACT_SOURCE_OPTIONS,
} from './TravelInquiryForm'
import { cn } from '@/lib/utils'

export const BasicInfoSection = () => {
  const { control, formState } = useFormContext<TTravelInquiryFormData>()
  const hasContactNameError = !!formState.errors.basicInfo?.contactName
  return (
    <FormSection title='' className='rounded-t-none pt-0'>
      <div className='flex flex-col gap-8 xl:gap-7 w-full'>
        <FormField
          control={control}
          name='basicInfo.travelType'
          render={({ field }) => (
            <FormItem className='w-full'>
              <RequiredLabel
                required
                className='font-noto-serif-body-l-semibold'
              >
                旅遊形式
              </RequiredLabel>
              <FormControl>
                <RadioFieldGroup
                  options={TRAVEL_TYPE_OPTIONS}
                  value={field.value}
                  onValueChange={field.onChange}
                  name='travel-type'
                  className='flex flex-wrap gap-5 items-center py-4'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full'>
          <div className='w-full relative'>
            <div
              className={cn(
                'flex gap-2.5 items-end px-0 w-full border-b',
                hasContactNameError
                  ? 'border-figma-function-alert'
                  : 'border-figma-primary-950-70',
              )}
            >
              <FormField
                control={control}
                name='basicInfo.contactName'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <RequiredLabel
                      required
                      requiredText='此為必填資訊'
                      className='font-noto-serif-body-l-semibold'
                    >
                      聯絡人
                    </RequiredLabel>
                    <FormControl>
                      <input
                        placeholder='請填姓名'
                        className='font-genseki-body-m-regular text-figma-primary-950 py-4 bg-transparent border-none outline-none placeholder:text-figma-primary-300 w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='basicInfo.gender'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className='flex gap-1.5 items-center justify-start'
                      >
                        {GENDER_OPTIONS.map((gender) => (
                          <Label
                            key={gender.value}
                            htmlFor={`gender-${gender.value}`}
                            className='flex gap-1 items-center justify-start font-genseki-body-m-regular text-figma-primary-950 cursor-pointer'
                          >
                            <RadioGroupItem
                              value={gender.value}
                              id={`gender-${gender.value}`}
                            />
                            {gender.label}
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col xl:flex-row xl:gap-4 w-full'>
          <FormField
            control={control}
            name='basicInfo.phoneNumber'
            render={({ field }) => (
              <FormItem className='w-full mb-6 xl:mb-0'>
                <RequiredLabel
                  required
                  requiredText='此為必填資訊'
                  className='font-noto-serif-body-l-semibold'
                >
                  手機號碼
                </RequiredLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='請輸入手機號碼'
                    className='w-full py-4 border-figma-primary-950-70'
                    {...field}
                    maxLength={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='basicInfo.lineId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <RequiredLabel
                  subText='（較建議，最方便專員聯繫討論）'
                  className='font-noto-serif-body-l-semibold'
                >
                  LINE ID
                </RequiredLabel>
                <FormControl>
                  <Input
                    placeholder='請輸入LINE ID'
                    className='w-full py-4 border-figma-primary-950-70'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name='basicInfo.contactMethod'
          render={({ field }) => (
            <FormItem className='w-full'>
              <RequiredLabel className='font-noto-serif-body-l-semibold'>
                請選擇偏好的聯絡方式
              </RequiredLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='flex flex-wrap gap-x-5 py-4'
                >
                  {CONTACT_METHOD_OPTIONS.map((method) => (
                    <Label
                      key={method.value}
                      htmlFor={`contact-method-${method.value}`}
                      className='flex items-center gap-2 font-genseki-body-m-regular text-figma-primary-950 cursor-pointer'
                    >
                      <RadioGroupItem
                        value={method.value}
                        id={`contact-method-${method.value}`}
                      />
                      {method.label}
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='basicInfo.contactTime'
          render={({ field }) => (
            <FormItem className='w-full'>
              <RequiredLabel className='font-noto-serif-body-l-semibold'>
                聯絡時間
              </RequiredLabel>
              <FormControl>
                <div className='relative w-full xl:w-[180px]'>
                  <input
                    placeholder='請填入您方便的聯繫時段'
                    className='font-genseki-body-m-regular text-figma-primary-950 bg-transparent border-none outline-none placeholder:text-figma-primary-300 py-4 w-full'
                    {...field}
                  />
                  <div className='absolute border-b border-figma-primary-950-70 left-0 right-0 bottom-0 pointer-events-none' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='basicInfo.contactSource'
          render={({ field }) => (
            <FormItem className='w-full'>
              <RequiredLabel className='font-noto-serif-body-l-semibold'>
                您是從何管道得知典藏旅遊？
              </RequiredLabel>
              <FormControl>
                <div className='flex gap-4 items-center px-0 py-3'>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='flex flex-wrap gap-5 items-center py-4'
                  >
                    {CONTACT_SOURCE_OPTIONS.map((source) => (
                      <div
                        key={source.value}
                        className={
                          source.value === '其他'
                            ? 'flex gap-1.5 items-center'
                            : 'flex gap-1 items-center'
                        }
                      >
                        <Label
                          htmlFor={`contact-source-${source.value}`}
                          className='flex items-center gap-1 font-genseki-body-m-regular text-figma-primary-950 cursor-pointer'
                        >
                          <RadioGroupItem
                            value={source.value}
                            id={`contact-source-${source.value}`}
                          />
                          {source.value === '其他' ? '其他：' : source.label}
                        </Label>
                        {source.value === '其他' && (
                          <FormField
                            control={control}
                            name='basicInfo.otherSource'
                            render={({ field: otherField }) => (
                              <FormItem>
                                <FormControl>
                                  <input
                                    className='w-[120px] bg-transparent border-0 border-b border-figma-primary-950-70 outline-none text-figma-primary-950 text-[16px] leading-[1.2] py-1 aria-invalid:border-figma-function-alert'
                                    {...otherField}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  )
}
export default BasicInfoSection
