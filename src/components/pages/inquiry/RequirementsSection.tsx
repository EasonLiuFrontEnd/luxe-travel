import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { TTravelInquiryFormData } from './TravelInquiryForm'

export type TRequirementsSectionProps = {
  control: Control<TTravelInquiryFormData>
}

const RequirementsSection = ({ control }: TRequirementsSectionProps) => {
  return (
    <div className='relative flex flex-col w-full gap-8 py-5 px-4 xl:p-8 border border-figma-secondary-500 rounded-2xl bg-white'>
      <FormField
        control={control}
        name='requirementsDescription'
        render={({ field }) => (
          <FormItem className='w-full'>
            <div className='flex gap-0.5 items-center mb-2'>
              <FormLabel className='font-noto-serif-body-l-semibold text-figma-primary-950'>
                需求說明
              </FormLabel>
              <span className='font-genseki-body-s-regular text-figma-primary-950'>
                （如飲食習慣、單人房等）
              </span>
            </div>
            <FormControl>
              <div className='flex gap-2.5 items-center px-0 py-3 w-full border-b border-[rgba(56,56,65,0.7)]'>
                <input
                  placeholder='歡迎將需求告訴我們，典藏將竭誠為您服務'
                  className='flex-1 bg-transparent border-none outline-none font-genseki-body-m-regular text-[16px] leading-[1.2] text-figma-primary-950 placeholder:text-figma-primary-300'
                  maxLength={100}
                  {...field}
                />
                <div className='flex gap-1.5 items-center shrink-0'>
                  <span className='font-genseki-body-s-regular text-[14px] leading-[1.5] text-figma-primary-300'>
                    {field.value?.length || 0}/100
                  </span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className='flex items-center w-full font-genseki-body-s-regular text-figma-primary-950'>
        典藏旅遊遵循「個人資料保護法」以妥善處理、利用本表所載之個人資料，並採取資料保護措施。
        <br />
        您有權提出要求使用、更正、補充、刪除或封鎖這些個人資料，請將任何這類需求寄至
        info@luxetravel.com.tw
      </p>
    </div>
  )
}
export default RequirementsSection