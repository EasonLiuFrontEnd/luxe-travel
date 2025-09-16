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
    <FormSection title='' className='rounded-t-none pt-0'>
      <div className='flex flex-col gap-7 w-full'>
        <FormField
          control={control}
          name='basicInfo.travelType'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className="font-noto-serif-body-l-semibold text-figma-primary-950">
                旅遊形式 <span className='font-genseki-body-l-regular text-figma-function-alert'>*</span>
              </FormLabel>
              <FormControl>
                <div className='flex gap-4 items-center py-4'>
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
          <div className='flex flex-wrap gap-0.5 items-center mb-2'>
            <div className='flex gap-1 items-center justify-start'>
              <div className="font-noto-serif-body-l-semibold text-figma-primary-950">
                聯絡人
              </div>
              <div className='font-genseki-body-s-regular text-figma-function-alert'>
                <span className='font-genseki-body-l-regular'>*</span>
                此為必填資訊
              </div>
            </div>
          </div>
          <div className='w-full relative'>
            <div className='flex gap-2.5 items-center px-0 py-4 w-full border-b border-figma-primary-950-70'>
              <FormField
                control={control}
                name='basicInfo.contactName'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <input
                        placeholder='請填姓名'
                        className='font-genseki-body-m-regular text-figma-primary-950 bg-transparent border-none outline-none placeholder:text-figma-primary-300 w-full'
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
                    <FormMessage className='mt-4' />
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
                <FormLabel className="font-noto-serif-body-l-semibold text-figma-primary-950 mb-2">
                  手機號碼 <span className='font-genseki-body-l-regular text-figma-function-alert'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='請輸入手機號碼'
                    className='w-full py-[12px] border-figma-primary-950-70'
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
                <FormLabel className='font-noto-serif-body-l-semibold text-figma-primary-950 mb-2'>
                  LINE ID
                  <span className='font-genseki-body-s-regular text-figma-primary-950'>
                  （較建議，最方便專員聯繫討論）
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='請輸入LINE ID'
                    className='w-full py-[12px] border-figma-primary-950-70'
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
              <FormLabel className="font-noto-serif-body-l-semibold text-figma-primary-950 mb-2">
                請選擇偏好的聯絡方式
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='flex flex-wrap gap-x-5 py-[12px]'
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
              <div className='flex flex-wrap gap-0.5 items-center mb-2'>
                <div className='flex gap-1 items-center'>
                  <div className="font-noto-serif-body-l-semibold text-figma-primary-950">
                    聯絡時間
                  </div>
                  <div className='font-genseki-body-s-regular text-figma-function-alert'>
                    <span className='font-genseki-body-l-regular'>*</span>
                    此為必填資訊
                  </div>
                </div>
              </div>
              <FormControl>
                <div className='relative w-full xl:w-[180px]'>
                  <input
                    placeholder='請填入您方便的聯繫時段'
                    className='font-genseki-body-m-regular text-figma-primary-950 bg-transparent border-none outline-none placeholder:text-figma-primary-300 py-3 w-full'
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
              <FormLabel className="font-noto-serif-body-l-semibold text-figma-primary-950 mb-2">
                您是從何管道得知典藏旅遊？
              </FormLabel>
              <FormControl>
                <div className='flex gap-4 items-center px-0 py-3'>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='flex gap-5 items-center py-4'
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
                          className='flex items-center gap-1 font-genseki-body-m-regular text-figma-primary-950 cursor-pointer'
                        >
                          <RadioGroupItem
                            value={source.value}
                            id={`contact-source-${source.value}`}
                          />
                          {source.value === 'other' ? '其他：' : source.label}
                        </Label>
                        {source.value === 'other' && (
                          <FormField
                            control={control}
                            name='basicInfo.otherSource'
                            render={({ field: otherField }) => (
                              <FormItem>
                                <FormControl>
                                  <div className='h-full w-[120px] relative'>
                                    <input
                                      className='w-full bg-transparent border-none outline-none text-figma-primary-950 text-[16px] leading-[1.2] py-1'
                                      {...otherField}
                                    />
                                    <div className='absolute border-b border-figma-primary-950-70 inset-0 pointer-events-none' />
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
