export const APP_CONFIG = {
  SCROLL: {
    BANNER_HEIGHT: 800,
    LOGO_TRANSITION_END: 1,
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
