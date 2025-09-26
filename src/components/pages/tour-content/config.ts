export type TTimeSlot = {
  id: string
  date: string
  status: '已成團' | '熱銷中' | '已滿團'
  href: string
}

export const mockTimeSlots: TTimeSlot[] = [
  { id: '1', date: '9/9(日)', status: '已成團', href: '#' },
  { id: '2', date: '9/16(日)', status: '熱銷中', href: '#' },
  { id: '3', date: '9/23(日)', status: '已滿團', href: '#' },
  { id: '4', date: '9/30(日)', status: '已成團', href: '#' },
  { id: '5', date: '10/7(日)', status: '熱銷中', href: '#' },
  { id: '6', date: '10/14(日)', status: '已滿團', href: '#' },
  { id: '7', date: '10/21(日)', status: '已成團', href: '#' },
  { id: '8', date: '10/28(日)', status: '熱銷中', href: '#' },
  { id: '9', date: '11/4(日)', status: '已滿團', href: '#' },
  { id: '10', date: '11/11(日)', status: '已成團', href: '#' },
  { id: '11', date: '11/18(日)', status: '熱銷中', href: '#' },
  { id: '12', date: '11/25(日)', status: '已滿團', href: '#' },
]