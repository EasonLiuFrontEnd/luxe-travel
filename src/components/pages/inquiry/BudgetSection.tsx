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
export type TBudgetSectionProps = {
  control: Control<TTravelInquiryFormData>
}
export const BudgetSection = ({
  control,
}: TBudgetSectionProps) => {
  return (
    <FormSection title='' hasBorder>
      <div className='space-y-8'>
        <FormField
          control={control}
          name='budget.budget'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel
                required
                subText='（不含午晚餐及部分自理當地城市內交通費用）'
                requiredText='此為必填資訊'
                className='font-noto-serif-body-l-semibold'
              >
                每人預算
              </RequiredLabel>
              <FormControl>
                <RadioFieldGroup
                  options={BUDGET_OPTIONS}
                  value={field.value}
                  onValueChange={field.onChange}
                  name='budget'
                  className='flex flex-wrap gap-5 p-4'
                  labelClassName='gap-2 font-genseki-body-m-regular text-figma-primary-950 cursor-pointer'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='budget.countries'
          render={({ field }) => (
            <FormItem>
              <RequiredLabel
                required
                subText='可複選'
                className='font-noto-serif-body-l-semibold'
              >
                想去的國家組合
              </RequiredLabel>
              <FormControl>
                <div className='grid grid-cols-1 xl:grid-cols-4 gap-y-4 xl:gap-x-7 max-xl:divide-y xl:divide-x divide-figma-primary-300 w-full'>
                  {Object.entries(EUROPEAN_REGIONS).map(
                    ([regionKey, region]) => (
                      <div
                        key={regionKey}
                        className='flex flex-col gap-1 xl:px-6 first:xl:pl-0 last:xl:pr-0'
                      >
                        <div className='font-family-genseki font-bold text-[16px] leading-[1.5] text-figma-secondary-500 mb-2'>
                          {region.label}
                        </div>
                        <div className='flex flex-wrap gap-5 items-center py-4'>
                          {region.countries.map((country) => (
                            <Label
                              key={country.value}
                              htmlFor={`country-${country.value}`}
                              className='flex items-center gap-1 font-genseki-body-m-regular text-figma-primary-950 cursor-pointer'
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
export default BudgetSection
