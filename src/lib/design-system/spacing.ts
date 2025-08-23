export const spacing = {
  0: '0px', // 0
  1: '2px', // 2
  2: '4px', // 4
  3: '8px', // 8
  4: '12px', // 12
  5: '16px', // 16
  6: '20px', // 20
  7: '24px', // 24
  8: '32px', // 32
  9: '48px', // 48
  10: '60px', // 60
  11: '80px', // 80
  12: '120px', // 120
  13: '200px', // 200
} as const

export const spacingValues = {
  s: '4px',
  m: '12px',
  l: '16px',
} as const

export const itemSpacing = {
  '-1_19': '-1.190000057220459',
} as const

export const textSizes = {
  '4xl': '48px',
} as const

export type SpacingKey = keyof typeof spacing
export type SpacingValue = (typeof spacing)[SpacingKey]

export const getSpacing = (key: SpacingKey): SpacingValue => {
  return spacing[key]
}

export const designTokenSpacing = {
  'spacing-0': spacing[0],
  'spacing-1': spacing[1],
  'spacing-2': spacing[2],
  'spacing-3': spacing[3],
  'spacing-4': spacing[4],
  'spacing-5': spacing[5],
  'spacing-6': spacing[6],
  'spacing-7': spacing[7],
  'spacing-8': spacing[8],
  'spacing-9': spacing[9],
  'spacing-10': spacing[10],
  'spacing-11': spacing[11],
  'spacing-12': spacing[12],
  'spacing-13': spacing[13],
} as const
