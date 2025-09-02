'use client'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form'
import { Label } from '@/components/ui/Label'
import {
  Checkbox,
  FormSection,
  RadioFieldGroup,
  RequiredLabel,
} from '@/components/ui'
import {
  TTravelInquiryFormData,
  BUDGET_OPTIONS,
  EUROPEAN_REGIONS,
  TCountry,
} from './TravelInquiryForm'
export type TBudgetDestinationSectionProps = {
  control: Control<TTravelInquiryFormData>
}
export const BudgetDestinationSection = ({
  control,
}: TBudgetDestinationSectionProps) => {
  return (
    <FormSection title='預算與目的地' hasBorder>
      <div className='space-y-8'>
        <FormField
          control={control}
          name='budgetDestination.budget'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel
                required
                subText='（不含午晚餐及部分自理當地城市內交通費用）'
              >
                每人預算
              </RequiredLabel>
              <FormControl>
                <RadioFieldGroup
                  options={BUDGET_OPTIONS}
                  value={field.value}
                  onValueChange={field.onChange}
                  name='budget'
                  className='grid grid-cols-2 md:grid-cols-4 gap-4'
                  labelClassName='flex items-center gap-2 font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-950 cursor-pointer'
                />
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
              <RequiredLabel required subText='可複選'>
                想去的國家組合
              </RequiredLabel>
              <FormControl>
                <div className='flex gap-6 items-start justify-start w-full'>
                  {Object.entries(EUROPEAN_REGIONS).map(
                    ([regionKey, region], index) => (
                      <div
                        key={regionKey}
                        className='flex-1 flex flex-col gap-1 relative'
                      >
                        {index > 0 && (
                          <div className='absolute left-[-12px] top-0 bottom-0 w-px bg-figma-primary-300'></div>
                        )}
                        <div className='font-genseki-body-s-bold text-[16px] leading-[1.5] text-figma-secondary-500 tracking-[0.96px] mb-1'>
                          {region.label}
                        </div>
                        <div className='flex flex-wrap gap-4 items-center justify-start py-3'>
                          {region.countries.map((country) => (
                            <Label
                              key={country.value}
                              htmlFor={`country-${country.value}`}
                              className='flex items-center gap-1 font-genseki-body-s-regular text-[16px] leading-[1.2] text-figma-primary-950 cursor-pointer'
                            >
                              <Checkbox
                                id={`country-${country.value}`}
                                checked={field.value?.includes(
                                  country.value as TCountry,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...field.value,
                                      country.value as TCountry,
                                    ])
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (item) =>
                                          item !== (country.value as TCountry),
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
    </FormSection>
  )
}
export default BudgetDestinationSection
