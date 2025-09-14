export const APP_CONFIG = {
  SCROLL: {
    BANNER_HEIGHT: 800,
    LOGO_TRANSITION_END: 200,
    THROTTLE_DELAY: 16,
  },

  LOGO: {
    MIN_SCALE: 0.34,
    MAX_SCALE: 1.0,
    SCALE_FACTOR: 0.66,
  },

  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  ANIMATION_DURATION: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
} as const

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
} as const
