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
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

import {
  TravelInquiryFormData,
  BUDGET_OPTIONS,
  EUROPEAN_REGIONS,
} from '@/types/inquiry'

export interface BudgetDestinationSectionProps {
  control: Control<TravelInquiryFormData>
}

export function BudgetDestinationSection({
  control,
}: BudgetDestinationSectionProps) {
  return (
    <div className='flex flex-col self-stretch w-full p-8 gap-4 rounded-2xl border border-figma-secondary-500 bg-white'>
      <div className='flex flex-col gap-1'>
        <h3 className='font-noto-serif-h5-bold text-[18px] text-figma-primary-950'>
          預算與目的地
        </h3>
      </div>

      <div className='space-y-8'>
        <FormField
          control={control}
          name='budgetDestination.budget'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                  每人預算 <span className='text-figma-function-alert'>*</span>
                </FormLabel>
                <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950'>
                  （不含午晚餐及部分自理當地城市內交通費用）
                </span>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='grid grid-cols-2 md:grid-cols-4 gap-4'
                >
                  {BUDGET_OPTIONS.map((budget) => (
                    <Label
                      key={budget.value}
                      htmlFor={`budget-${budget.value}`}
                      className='flex items-center gap-2 font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950 cursor-pointer'
                    >
                      <RadioGroupItem
                        value={budget.value}
                        id={`budget-${budget.value}`}
                      />
                      {budget.label}
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
          name='budgetDestination.countries'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-wrap gap-0.5 items-center justify-start'>
                <FormLabel className='font-noto-serif-bold text-[18px] leading-[1.5] text-figma-primary-950'>
                  想去的國家組合{' '}
                  <span className='text-figma-function-alert'>*</span>
                </FormLabel>
                <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-500'>
                  可複選
                </span>
              </div>
              <FormControl>
                <div className='flex gap-6 items-start justify-start w-full'>
                  {Object.entries(EUROPEAN_REGIONS).map(
                    ([regionKey, region], index) => (
                      <div
                        key={regionKey}
                        className='flex-1 flex flex-col gap-1 relative'
                      >
                        {/* 垂直分隔線 */}
                        {index > 0 && (
                          <div className='absolute left-[-12px] top-0 bottom-0 w-px bg-figma-primary-300'></div>
                        )}

                        {/* 區域標題 */}
                        <div className='font-genseki-body-s-bold text-[16px] leading-[1.5] text-figma-secondary-500 tracking-[0.96px] mb-1'>
                          {region.label}
                        </div>

                        {/* 國家選項 */}
                        <div className='flex flex-wrap gap-4 items-center justify-start py-3'>
                          {region.countries.map((country) => (
                            <Label
                              key={country.value}
                              htmlFor={`country-${country.value}`}
                              className='flex items-center gap-1 font-genseki-body-s-regular text-[16px] leading-[1.2] text-figma-primary-950 cursor-pointer'
                            >
                              <Checkbox
                                id={`country-${country.value}`}
                                checked={field.value?.includes(country.value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...field.value,
                                      country.value,
                                    ])
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (item) => item !== country.value,
                                      ),
                                    )
                                  }
                                }}
                              />
                              {country.label}
                            </Label>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default BudgetDestinationSection
