'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { HeroSection } from './HeroSection'
import { BasicInfoSection } from './BasicInfoSection'
import { BudgetSection } from './BudgetSection'
import { IndependentTravelSection } from './IndependentTravelSection'
import { Form } from '../../../components/ui/Form'
import RequirementsSection from './RequirementsSection'
import GroupTravelSection from './GroupTravelSection'

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

export type TTravelType =
  | 'europe-free'
  | 'chartered'
  | 'deluxe-group'
  | 'theme'
  | 'mitsui-cruise'

export type TGender = 'ms' | 'mr'

export type TContactMethod = 'any' | 'phone' | 'line'

export type TContactSource =
  | 'triumph-member'
  | 'line'
  | 'facebook'
  | 'search'
  | 'media'
  | 'other'

export type TBudgetRange = '10-12' | '12-15' | '15-20' | '20+'

export type TEuropeanRegion = 'western' | 'central' | 'southern' | 'northern'

export type TCountry =
  | 'uk'
  | 'france'
  | 'ireland'
  | 'netherlands'
  | 'belgium'
  | 'luxembourg'
  | 'germany'
  | 'austria'
  | 'switzerland'
  | 'czech'
  | 'hungary'
  | 'baltic'
  | 'italy'
  | 'spain'
  | 'portugal'
  | 'greece'
  | 'croatia'
  | 'nordic'

export type TBasicInfo = {
  travelType: TTravelType
  contactName: string
  gender: TGender
  phoneNumber: string
  lineId?: string
  contactMethod: TContactMethod
  contactTime: string
  contactSource: TContactSource
  otherSource?: string
}

export type TBudget = {
  budget: TBudgetRange
  countries: TCountry[]
}

export type TIndependentTravel = {
  adultCount: number
  childCount: number
  travelDays: number
  departureDate: string
  wishlist?: string
  specialRequirements?: string
}

export type TGroupTravel = {
  adultCount: number
  childCount: number
  tourProgram: string
  departureDate: string
}

export type TTravelInquiryFormData = {
  basicInfo: TBasicInfo
  budget: TBudget
  independentTravel: TIndependentTravel
  groupTravel: TGroupTravel
  requirementsDescription?: string
}

const travelTypeSchema = z.enum(
  ['europe-free', 'chartered', 'deluxe-group', 'theme', 'mitsui-cruise'],
  {
    error: '請選擇旅遊形式',
  },
)

const genderSchema = z.enum(['ms', 'mr'], {
  error: '請選擇稱謂',
})

const contactMethodSchema = z.enum(['any', 'phone', 'line'], {
  error: '請選擇偏好聯絡方式',
})

const contactSourceSchema = z.enum(
  ['triumph-member', 'line', 'facebook', 'search', 'media', 'other'],
  {
    error: '請選擇得知管道',
  },
)

const budgetRangeSchema = z.enum(['10-12', '12-15', '15-20', '20+'], {
  error: '請選擇每人預算',
})

const countrySchema = z.enum(
  [
    'uk',
    'france',
    'ireland',
    'netherlands',
    'belgium',
    'luxembourg',
    'germany',
    'austria',
    'switzerland',
    'czech',
    'hungary',
    'baltic',
    'italy',
    'spain',
    'portugal',
    'greece',
    'croatia',
    'nordic',
  ],
  {
    error: '請選擇有效的國家',
  },
)

const basicInfoSchema = z.object({
  travelType: travelTypeSchema,
  contactName: z.string().min(1, '請輸入聯絡人姓名'),
  gender: genderSchema,
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, '請輸入有效的台灣手機號碼格式 (09xxxxxxxx)'),
  lineId: z.string().optional(),
  contactMethod: contactMethodSchema,
  contactTime: z.string().min(1, '請填入您方便的聯繫時段'),
  contactSource: contactSourceSchema,
  otherSource: z.string().optional(),
})

const budgetSchema = z.object({
  budget: budgetRangeSchema,
  countries: z.array(countrySchema).min(1, '請至少選擇一個國家'),
})

const independentTravelSchema = z.object({
  adultCount: z
    .number()
    .min(1, '大人數量必須至少為 1')
    .max(20, '大人數量不能超過 20'),
  childCount: z
    .number()
    .min(0, '孩童數量不能為負數')
    .max(20, '孩童數量不能超過 20'),
  travelDays: z
    .number()
    .min(1, '旅遊天數必須至少為 1')
    .max(60, '旅遊天數不能超過 60'),
  departureDate: z.string().min(1, '請選擇預計出發日期'),
  wishlist: z.string().optional(),
  specialRequirements: z.string().optional(),
})

const groupTravelSchema = z.object({
  adultCount: z
    .number()
    .min(1, '大人數量必須至少為 1')
    .max(20, '大人數量不能超過 20'),
  childCount: z
    .number()
    .min(0, '孩童數量不能為負數')
    .max(20, '孩童數量不能超過 20'),
  tourProgram: z.string().min(1, '請選擇團體行程'),
  departureDate: z.string().min(1, '請選擇出發日期'),
})

export const travelInquiryFormSchema = z.object({
  basicInfo: basicInfoSchema,
  budget: budgetSchema,
  independentTravel: independentTravelSchema,
  groupTravel: groupTravelSchema,
  requirementsDescription: z.string().optional(),
})

export const defaultTravelInquiryFormData: DeepPartial<TTravelInquiryFormData> =
{
  basicInfo: {
    travelType: 'europe-free',
    contactName: '',
    gender: undefined,
    phoneNumber: '',
    lineId: '',
    contactMethod: undefined,
    contactTime: '',
    contactSource: undefined,
    otherSource: '',
  },
  budget: {
    budget: undefined,
    countries: [],
  },
  independentTravel: {
    adultCount: 1,
    childCount: 0,
    travelDays: 1,
    departureDate: '',
    wishlist: '',
    specialRequirements: '',
  },
  groupTravel: {
    adultCount: 1,
    childCount: 0,
    tourProgram: '',
    departureDate: '',
  },
  requirementsDescription: '',
}

export const TRAVEL_TYPE_OPTIONS = [
  { value: 'europe-free', label: '歐洲自由行' },
  { value: 'chartered', label: '包車旅遊' },
  { value: 'deluxe-group', label: '精緻團體行' },
  { value: 'theme', label: '主題旅遊' },
  { value: 'mitsui-cruise', label: '三井郵輪' },
]

export const GROUP_TOUR_PROGRAMS = [
  { value: 'italy-classic-8days', label: '義大利經典8日遊' },
  { value: 'france-romantic-10days', label: '法國浪漫10日遊' },
  { value: 'spain-portugal-12days', label: '西葡雙國12日遊' },
  { value: 'germany-austria-9days', label: '德奧風情9日遊' },
  { value: 'uk-scotland-10days', label: '英國蘇格蘭10日遊' },
  { value: 'greece-islands-8days', label: '希臘愛琴海島嶼8日遊' },
  { value: 'nordic-aurora-11days', label: '北歐極光11日遊' },
  { value: 'eastern-europe-14days', label: '東歐四國14日遊' },
]

export const GENDER_OPTIONS = [
  { value: 'ms', label: '小姐' },
  { value: 'mr', label: '先生' },
]

export const CONTACT_METHOD_OPTIONS = [
  { value: 'any', label: '都可以' },
  { value: 'phone', label: '手機' },
  { value: 'line', label: 'LINE' },
]

export const CONTACT_SOURCE_OPTIONS = [
  { value: 'triumph-member', label: '我是凱旋集團會員' },
  { value: 'line', label: 'LINE訊息' },
  { value: 'facebook', label: 'FB訊息' },
  { value: 'search', label: '網路搜尋' },
  { value: 'media', label: '廣告' },
  { value: 'other', label: '其他' },
]

export const BUDGET_OPTIONS = [
  { value: '10-12', label: '10-12萬' },
  { value: '12-15', label: '12-15萬' },
  { value: '15-20', label: '15-20萬' },
  { value: '20+', label: '20萬以上' },
]

export const WESTERN_EUROPE_COUNTRIES = [
  { value: 'uk', label: '英國' },
  { value: 'france', label: '法國' },
  { value: 'ireland', label: '愛爾蘭' },
  { value: 'netherlands', label: '荷蘭' },
  { value: 'belgium', label: '比利時' },
  { value: 'luxembourg', label: '盧森堡' },
]

export const CENTRAL_EUROPE_COUNTRIES = [
  { value: 'germany', label: '德國' },
  { value: 'austria', label: '奧地利' },
  { value: 'switzerland', label: '瑞士' },
  { value: 'czech', label: '捷克' },
  { value: 'hungary', label: '匈牙利' },
  { value: 'baltic', label: '波羅地海三小國' },
]

export const SOUTHERN_EUROPE_COUNTRIES = [
  { value: 'italy', label: '義大利' },
  { value: 'spain', label: '西班牙' },
  { value: 'portugal', label: '葡萄牙' },
  { value: 'greece', label: '希臘' },
  { value: 'croatia', label: '克羅埃西亞' },
]

export const NORTHERN_EUROPE_COUNTRIES = [{ value: 'nordic', label: '北歐' }]

export const EUROPEAN_REGIONS = {
  western: {
    label: '西歐',
    countries: WESTERN_EUROPE_COUNTRIES,
  },
  central: {
    label: '中東歐',
    countries: CENTRAL_EUROPE_COUNTRIES,
  },
  southern: {
    label: '南歐',
    countries: SOUTHERN_EUROPE_COUNTRIES,
  },
  northern: {
    label: '北歐',
    countries: NORTHERN_EUROPE_COUNTRIES,
  },
}

export const ALL_COUNTRIES = [
  ...WESTERN_EUROPE_COUNTRIES,
  ...CENTRAL_EUROPE_COUNTRIES,
  ...SOUTHERN_EUROPE_COUNTRIES,
  ...NORTHERN_EUROPE_COUNTRIES,
]

export type TTravelInquiryFormProps = {
  onSubmit?: (data: TTravelInquiryFormData) => void | Promise<void>
  className?: string
  isLoading?: boolean
  heroTopPosition?: string
}

export const TravelInquiryForm = ({
  onSubmit,
  className = '',
  isLoading = false,
  heroTopPosition,
}: TTravelInquiryFormProps) => {
  const form = useForm<TTravelInquiryFormData>({
    resolver: zodResolver(travelInquiryFormSchema),
    defaultValues: defaultTravelInquiryFormData,
    mode: 'onChange',
  })

  const selectedTravelType = form.watch('basicInfo.travelType')

  const renderConditionalSections = () => {
    if (!selectedTravelType) {
      return null
    }

    if (selectedTravelType === 'europe-free' || selectedTravelType === 'chartered') {
      return (
        <>
          <BudgetSection control={form.control} />
          <IndependentTravelSection
            control={form.control}
            isLoading={isLoading}
          />
        </>
      )
    }

    if (selectedTravelType === 'deluxe-group' || selectedTravelType === 'theme' || selectedTravelType === 'mitsui-cruise') {
      return (
        <>
          <RequirementsSection control={form.control} />
          <GroupTravelSection
            control={form.control}
            isLoading={isLoading}
          />
        </>
      )
    }

    return null
  }

  const handleSubmit = async (data: TTravelInquiryFormData) => {
    try {
      await onSubmit?.(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <div
      className={`min-h-screen px-[clamp(12px,2.5vw,48px)] bg-figma-secondary-100 ${className}`}
    >
      <div className='w-full max-w-[1440px] mx-auto'>
        <HeroSection topPosition={heroTopPosition} />

        <div className='relative bg-figma-secondary-100 z-10 [transform:translate3d(0,0,0)]'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col relative rounded-[16px] w-full'
              noValidate
            >
              <div className='bg-figma-primary-0 flex flex-col gap-4 p-[16px] xl:p-[32px] rounded-t-[16px] w-full'>
                <div className='flex flex-col gap-y-[16px] pb-[16px] xl:pb-[24px] relative w-full'>
                  <div
                    aria-hidden='true'
                    className='absolute inset-0 border-b border-figma-primary-950'
                  />
                  <div className='font-family-noto-serif text-[18px] xl:text-[24px] font-semibold xl:font-bold leading-[1.5] xl:leading-[1.2] relative text-figma-primary-950'>
                    旅遊諮詢需求單
                  </div>
                  <div className='flex flex-col font-family-genseki text-[16px] xl:font-medium leading-[1.5] text-figma-primary-950'>
                    <p>誠摯感謝您蒞臨典藏旅遊。</p>
                    <p>
                      如需進一步諮詢行程內容或服務細節，請填寫表單，我們將由專人儘速與您聯繫。
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-4 pb-8 rounded-b-[16px] w-full'>
                <BasicInfoSection control={form.control} />
                {renderConditionalSections()}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default TravelInquiryForm
