import { z } from 'zod'

export type ContactMethod = 'sms' | 'phone' | 'line' | 'email'
export type Gender = 'male' | 'female' | 'other'
export type AgeRange = '10-12' | '12-18' | '15-20' | '20+'
export type BudgetRange = 'budget' | 'standard' | 'luxury' | 'premium'
export type Theme =
  | 'adventure'
  | 'culture'
  | 'relaxation'
  | 'food'
  | 'nature'
  | 'history'

export interface AgeGroup {
  range: AgeRange
  count: number
}

export interface PersonalInfo {
  gender: Gender
  age: number
  notes?: string
}

export interface TravelPreferences {
  destinations: string[]
  groupSize: number
  phoneNumber: string
  lineId?: string
  contactMethods: ContactMethod[]
  contactTimePreference: string
}

export interface DepartureSchedule {
  morning: boolean
  afternoon: boolean
  evening: boolean
  night: boolean
}

export interface TravelInquiryFormData {
  travelPreferences: TravelPreferences

  ageGroups: AgeGroup[]

  departureSchedule: DepartureSchedule

  budget: BudgetRange
  themes: Theme[]

  personalInfo: PersonalInfo

  additionalRequirements?: string

  agreeToTerms: boolean
}

const contactMethodSchema = z.enum(['sms', 'phone', 'line', 'email'])

const genderSchema = z.enum(['male', 'female', 'other'])

const ageRangeSchema = z.enum(['10-12', '12-18', '15-20', '20+'])

const budgetRangeSchema = z.enum(['budget', 'standard', 'luxury', 'premium'])

const themeSchema = z.enum([
  'adventure',
  'culture',
  'relaxation',
  'food',
  'nature',
  'history',
])

const ageGroupSchema = z.object({
  range: ageRangeSchema,
  count: z.number().min(1, '人數必須至少為 1').max(20, '人數不能超過 20'),
})

const travelPreferencesSchema = z.object({
  destinations: z.array(z.string()).min(1, '請至少選擇一個旅遊地點'),
  groupSize: z.number().min(1, '人數必須至少為 1').max(50, '人數不能超過 50'),
  phoneNumber: z
    .string()
    .regex(/^09\d{8}$/, '請輸入有效的台灣手機號碼格式 (09xxxxxxxx)'),
  lineId: z.string().optional(),
  contactMethods: z.array(contactMethodSchema).min(1, '請至少選擇一種聯絡方式'),
  contactTimePreference: z.string().min(1, '請選擇偏好的聯絡時段'),
})

const departureScheduleSchema = z
  .object({
    morning: z.boolean(),
    afternoon: z.boolean(),
    evening: z.boolean(),
    night: z.boolean(),
  })
  .refine(
    (data) => data.morning || data.afternoon || data.evening || data.night,
    {
      message: '請至少選擇一個出發時段',
      path: ['morning'],
    },
  )

const personalInfoSchema = z.object({
  gender: genderSchema,
  age: z.number().min(1, '年齡必須大於 0').max(120, '年齡不能超過 120'),
  notes: z.string().optional(),
})

export const travelInquiryFormSchema = z.object({
  travelPreferences: travelPreferencesSchema,
  ageGroups: z.array(ageGroupSchema).min(1, '請至少添加一個年齡分組'),
  departureSchedule: departureScheduleSchema,
  budget: budgetRangeSchema,
  themes: z.array(themeSchema).min(1, '請至少選擇一個主題偏好'),
  personalInfo: personalInfoSchema,
  additionalRequirements: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: '您必須同意服務條款和隱私政策',
  }),
})

export const defaultTravelInquiryFormData: Partial<TravelInquiryFormData> = {
  travelPreferences: {
    destinations: [],
    groupSize: 2,
    phoneNumber: '',
    lineId: '',
    contactMethods: [],
    contactTimePreference: '',
  },
  ageGroups: [{ range: '20+', count: 2 }],
  departureSchedule: {
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  },
  budget: 'standard',
  themes: [],
  personalInfo: {
    gender: 'other',
    age: 25,
    notes: '',
  },
  additionalRequirements: '',
  agreeToTerms: false,
}

export const DESTINATION_OPTIONS = [
  { value: 'hehuanfeng', label: '合歡高峰' },
  { value: 'magazine', label: '雜誌風情' },
  { value: 'main-alliance', label: '主要高聯' },
  { value: 'sanshi', label: '三井專核' },
] as const

export const CONTACT_METHOD_OPTIONS = [
  { value: 'sms', label: '簡訊' },
  { value: 'phone', label: '手機' },
  { value: 'line', label: 'LINE' },
  { value: 'email', label: 'Email' },
] as const

export const CONTACT_TIME_OPTIONS = [
  { value: 'morning', label: '上午 (9:00-12:00)' },
  { value: 'afternoon', label: '下午 (12:00-18:00)' },
  { value: 'evening', label: '晚上 (18:00-21:00)' },
] as const

export const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: '其他' },
] as const

export const AGE_RANGE_OPTIONS = [
  { value: '10-12', label: '10-12歲' },
  { value: '12-18', label: '12-18歲' },
  { value: '15-20', label: '15-20歲' },
  { value: '20+', label: '20歲以上' },
] as const

export const BUDGET_OPTIONS = [
  { value: 'budget', label: '經濟型' },
  { value: 'standard', label: '標準型' },
  { value: 'luxury', label: '豪華型' },
  { value: 'premium', label: '頂級型' },
] as const

export const THEME_OPTIONS = [
  { value: 'adventure', label: '冒險探索' },
  { value: 'culture', label: '文化體驗' },
  { value: 'relaxation', label: '休閒度假' },
  { value: 'food', label: '美食之旅' },
  { value: 'nature', label: '自然生態' },
  { value: 'history', label: '歷史古蹟' },
] as const

export const DEPARTURE_TIME_OPTIONS = [
  { value: 'morning', label: '早上' },
  { value: 'afternoon', label: '下午' },
  { value: 'evening', label: '傍晚' },
  { value: 'night', label: '晚上' },
] as const
