'use client'

import { Control, useFieldArray } from 'react-hook-form'

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
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/card'

import {
  TravelInquiryFormData,
  AGE_RANGE_OPTIONS,
  BUDGET_OPTIONS,
  THEME_OPTIONS,
  DEPARTURE_TIME_OPTIONS,
  GENDER_OPTIONS,
} from '@/types/travel-inquiry'

export interface PersonalInfoSectionProps {
  control: Control<TravelInquiryFormData>
}

export function PersonalInfoSection({ control }: PersonalInfoSectionProps) {
  const {
    fields: ageGroupFields,
    append: appendAgeGroup,
    remove: removeAgeGroup,
  } = useFieldArray({
    control,
    name: 'ageGroups',
  })

  const handleAddAgeGroup = () => {
    appendAgeGroup({ range: '20+', count: 1 })
  }

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <h3 className='text-xl md:text-2xl font-semibold text-gray-900'>
          詳細資訊設定
        </h3>
        <p className='text-sm text-gray-600'>
          提供更多資訊有助於我們為您規劃最合適的行程
        </p>
      </div>

      <div className='space-y-8'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-lg font-medium text-gray-900'>
                出入人數 <span className='text-red-500'>*</span>
              </h4>
              <p className='text-sm text-gray-600'>
                請依年齡分組填寫每組的人數
              </p>
            </div>
            <Button
              type='button'
              onClick={handleAddAgeGroup}
              variant='outline'
              size='sm'
              className='shrink-0'
            >
              + 新增分組
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {ageGroupFields.map((field, index) => (
              <Card key={field.id} className='p-4 border border-gray-200'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <h5 className='font-medium text-sm'>分組 {index + 1}</h5>
                    {ageGroupFields.length > 1 && (
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => removeAgeGroup(index)}
                        className='h-6 w-6 p-0 text-red-500 hover:text-red-700'
                        title={`刪除分組 ${index + 1}`}
                      >
                        ×
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={control}
                    name={`ageGroups.${index}.range`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs'>年齡範圍</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className='grid grid-cols-2 gap-2'
                          >
                            {AGE_RANGE_OPTIONS.map((range) => (
                              <div
                                key={range.value}
                                className='flex items-center space-x-1'
                              >
                                <RadioGroupItem
                                  value={range.value}
                                  id={`range-${index}-${range.value}`}
                                  className='h-3 w-3'
                                />
                                <Label
                                  htmlFor={`range-${index}-${range.value}`}
                                  className='text-xs cursor-pointer'
                                >
                                  {range.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`ageGroups.${index}.count`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs'>人數</FormLabel>
                        <FormControl>
                          <div className='flex items-center space-x-2'>
                            <Input
                              type='number'
                              min='1'
                              max='20'
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 1)
                              }
                              className='h-8 text-sm'
                            />
                            <span className='text-xs text-gray-500'>人</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <h4 className='text-lg font-medium text-gray-900'>
              出發時段及內容設定 <span className='text-red-500'>*</span>
            </h4>
            <p className='text-sm text-gray-600'>
              可以分時段勾選，我們會安排合適的行程時間
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {DEPARTURE_TIME_OPTIONS.map((time) => (
              <FormField
                key={time.value}
                control={control}
                name={`departureSchedule.${time.value}`}
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center space-x-2'>
                      <FormControl>
                        <Checkbox
                          id={`time-${time.value}`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label
                        htmlFor={`time-${time.value}`}
                        className='text-sm font-normal cursor-pointer'
                      >
                        {time.label}
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <FormField
            control={control}
            name='budget'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg font-medium'>
                  預算範圍 <span className='text-red-500'>*</span>
                </FormLabel>
                <FormDescription>
                  選擇您的預算範圍，我們會推薦合適的行程
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='grid grid-cols-2 gap-3'
                  >
                    {BUDGET_OPTIONS.map((budget) => (
                      <div
                        key={budget.value}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem
                          value={budget.value}
                          id={`budget-${budget.value}`}
                        />
                        <Label
                          htmlFor={`budget-${budget.value}`}
                          className='text-sm font-normal cursor-pointer'
                        >
                          {budget.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='themes'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg font-medium'>
                  主題偏好 <span className='text-red-500'>*</span>
                </FormLabel>
                <FormDescription>
                  可以多選，幫助我們規劃更符合您興趣的行程
                </FormDescription>
                <FormControl>
                  <div className='grid grid-cols-2 gap-3'>
                    {THEME_OPTIONS.map((theme) => (
                      <div
                        key={theme.value}
                        className='flex items-center space-x-2'
                      >
                        <Checkbox
                          id={`theme-${theme.value}`}
                          checked={field.value?.includes(theme.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, theme.value])
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (item) => item !== theme.value,
                                ),
                              )
                            }
                          }}
                        />
                        <Label
                          htmlFor={`theme-${theme.value}`}
                          className='text-sm font-normal cursor-pointer'
                        >
                          {theme.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-4'>
          <h4 className='text-lg font-medium text-gray-900'>聯絡人資訊</h4>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <FormField
              control={control}
              name='personalInfo.gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-medium'>
                    性別 <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className='flex space-x-4'
                    >
                      {GENDER_OPTIONS.map((gender) => (
                        <div
                          key={gender.value}
                          className='flex items-center space-x-2'
                        >
                          <RadioGroupItem
                            value={gender.value}
                            id={`gender-${gender.value}`}
                          />
                          <Label
                            htmlFor={`gender-${gender.value}`}
                            className='text-sm font-normal cursor-pointer'
                          >
                            {gender.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='personalInfo.age'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-medium'>
                    年齡 <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Input
                        type='number'
                        min='1'
                        max='120'
                        placeholder='請輸入年齡'
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                        className='w-24'
                      />
                      <span className='text-sm text-gray-500'>歲</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoSection
