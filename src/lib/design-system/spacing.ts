export const spacing = {
  0: '0px',
  1: '2px',
  2: '4px',
  3: '8px',
  4: '12px',
  5: '16px',
  6: '20px',
  7: '24px',
  8: '32px',
  9: '48px',
  10: '60px',
  11: '80px',
  12: '120px',
  13: '200px',
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
