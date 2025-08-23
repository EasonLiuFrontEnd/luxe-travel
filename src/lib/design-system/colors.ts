export const colors = {
  // Primary colors
  primary: {
    0: '#ffffff',
    50: '#f7f7f8',
    100: '#eeeef0',
    300: '#b7b8c2',
    400: '#737373',
    500: '#5b5b6e',
    950: '#383841',
  },

  // Secondary colors
  secondary: {
    50: '#fcfaf7',
    100: '#f7f4ec',
    150: '#e0dbc74d',
    200: '#e0dbc7cc',
    300: '#e5d9bf',
    500: '#bda05e',
    950: '#926d3c',
    default: '#383841',
  },

  // Neutral/Background colors
  neutral: {
    0: '#ffffff',
    50: '#f5f5f5',
    950: '#333333',
  },

  // Accent colors
  accent: {
    blueNormal: '#8bc3de',
    blueLight: '#edf9ff',
    yellowNormal: '#ffd900',
    yellowLight: '#fffdf0',
    brown: '#995d2f',
  },

  // Function colors
  function: {
    alert: '#d6111a',
    availableNormal: '#00d475',
    availableLight: '#0cf38b',
  },

  // Grayscale colors
  grayscale: {
    gray200: '#EBEBEB',
    white: '#ffffff',
  },

  // Theme colors
  theme: {
    black: '#333333',
    darkGray: '#6f6f6f',
    lightGray: '#f2f2f2',
  },
} as const

export type ColorKey = keyof typeof colors
export type ColorShade<T extends ColorKey> = keyof (typeof colors)[T]

export const getColor = <T extends ColorKey>(
  colorKey: T,
  shade: ColorShade<T>,
) => {
  return colors[colorKey][shade as keyof (typeof colors)[T]]
}

export const designTokenColors = {
  'primary-0': colors.primary[0],
  'primary-50': colors.primary[50],
  'primary-100': colors.primary[100],
  'primary-300': colors.primary[300],
  'primary-400': colors.primary[400],
  'primary-500': colors.primary[500],
  'primary-950': colors.primary[950],

  'secondary-50': colors.secondary[50],
  'secondary-100': colors.secondary[100],
  'secondary-150': colors.secondary[150],
  'secondary-200': colors.secondary[200],
  'secondary-300': colors.secondary[300],
  'secondary-500': colors.secondary[500],
  'secondary-950': colors.secondary[950],
  'secondary-default': colors.secondary.default,

  'neutral-0': colors.neutral[0],
  'neutral-50': colors.neutral[50],
  'neutral-950': colors.neutral[950],

  'accent-blue-normal': colors.accent.blueNormal,
  'accent-blue-light': colors.accent.blueLight,
  'accent-yellow-normal': colors.accent.yellowNormal,
  'accent-yellow-light': colors.accent.yellowLight,
  'accent-brown': colors.accent.brown,

  'function-alert': colors.function.alert,
  'function-available-normal': colors.function.availableNormal,
  'function-available-light': colors.function.availableLight,

  'grayscale-gray-200': colors.grayscale.gray200,
  'grayscale-white': colors.grayscale.white,

  'theme-black': colors.theme.black,
  'theme-dark-gray': colors.theme.darkGray,
  'theme-light-gray': colors.theme.lightGray,
} as const
