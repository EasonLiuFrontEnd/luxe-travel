'use client'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
export type TBasicInfoSectionProps = {
  control: Control<TTravelInquiryFormData>
}
export const BasicInfoSection = ({ control }: TBasicInfoSectionProps) => {
  return (
    <FormSection title='基本聯絡資訊'>
      <div className='flex flex-col gap-6 w-full'>
        <FormField
          control={control}
          name='basicInfo.travelType'
          render={({ field }) => (
            <FormItem className='w-full'>
              <RequiredLabel required>旅遊形式</RequiredLabel>
              <FormControl>
                <div className='box-border flex gap-4 items-center justify-start px-0 py-3'>
                  <RadioFieldGroup
                    options={TRAVEL_TYPE_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    name='travel-type'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full'>
          <div className='flex flex-wrap gap-0.5 items-center justify-start mb-1'>
            <div className='flex gap-1 items-center justify-start'>
              <div className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                聯絡人
              </div>
              <div className='font-noto-sans text-[18px] leading-[1.5] text-figma-function-alert'>
                *
              </div>
            </div>
          </div>
          <div className='w-full relative'>
            <div className='flex gap-2.5 items-center justify-start px-0 py-3 w-full border-b border-[rgba(56,56,65,0.7)]'>
              <FormField
                control={control}
                name='basicInfo.contactName'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <input
                        placeholder='請填姓名'
                        className='font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 bg-transparent border-none outline-none placeholder:text-figma-primary-300 w-full'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='mt-4' />
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
                            className='flex gap-1 items-center justify-start font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 cursor-pointer'
                          >
                            <RadioGroupItem
                              value={gender.value}
                              id={`gender-${gender.value}`}
                              className='size-4'
                            />
                            {gender.label}
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className='mt-4' />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 w-full'>
          <FormField
            control={control}
            name='basicInfo.phoneNumber'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                  手機號碼 <span className='text-figma-function-alert'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='0912345678'
                    className='w-full'
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
                <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                  <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                    LINE ID
                  </FormLabel>
                  <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                    （較建議，最方便專員聯繫討論）
                  </span>
                </div>
                <FormControl>
                  <Input
                    placeholder='請輸入您的 LINE ID'
                    className='w-full'
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
              <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                偏好聯絡方式{' '}
                <span className='text-figma-function-alert'>*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='flex flex-wrap gap-6'
                >
                  {CONTACT_METHOD_OPTIONS.map((method) => (
                    <Label
                      key={method.value}
                      htmlFor={`contact-method-${method.value}`}
                      className='flex items-center gap-2 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 cursor-pointer'
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
              <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                  聯絡時間 <span className='text-figma-function-alert'>*</span>
                </FormLabel>
              </div>
              <FormControl>
                <Input
                  placeholder='請填入您方便的聯繫時段'
                  className='w-full'
                  {...field}
                />
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
              <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                您是從何管道得知典藏旅遊？
              </FormLabel>
              <FormControl>
                <div className='box-border flex gap-4 items-center justify-start px-0 py-3'>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='flex gap-4 items-center'
                  >
                    {CONTACT_SOURCE_OPTIONS.map((source) => (
                      <div
                        key={source.value}
                        className={
                          source.value === 'other'
                            ? 'flex gap-1.5 items-center'
                            : 'flex gap-1 items-center'
                        }
                      >
                        <Label
                          htmlFor={`contact-source-${source.value}`}
                          className='flex items-center gap-1 font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 cursor-pointer'
                        >
                          <RadioGroupItem
                            value={source.value}
                            id={`contact-source-${source.value}`}
                          />
                          {source.value === 'other' ? '其他：' : source.label}
                        </Label>
                        {source.value === 'other' &&
                          field.value === 'other' && (
                            <FormField
                              control={control}
                              name='basicInfo.otherSource'
                              render={({ field: otherField }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className='h-full w-[120px] relative'>
                                      <input
                                        placeholder='請說明其他管道'
                                        className='w-full bg-transparent border-none outline-none text-figma-primary-950 text-[16px] leading-[1.2] border-b border-[rgba(56,56,65,0.7)] pb-1'
                                        {...otherField}
                                      />
                                    </div>
                                  </FormControl>
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
