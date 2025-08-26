export const typography = {
  fontFamilies: {
    notoSerif: ['Noto Serif TC', 'serif'],
    genSeki: ['GenSekiGothic2 JP', 'sans-serif'],
    luxurious: ['Luxurious Script', 'cursive'],
  },

  notoSerif: {
    h1Bold: {
      fontFamily: 'Noto Serif TC',
      fontSize: '96px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2Bold: {
      fontFamily: 'Noto Serif TC',
      fontSize: '64px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2Regular: {
      fontFamily: 'Noto Serif TC',
      fontSize: '64px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h3Bold: {
      fontFamily: 'Noto Serif TC',
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4Bold: {
      fontFamily: 'Noto Serif TC',
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4Medium: {
      fontFamily: 'Noto Serif TC',
      fontSize: '32px',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5Bold: {
      fontFamily: 'Noto Serif TC',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    titleMedium: {
      fontFamily: 'Noto Serif TC',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    bodyLSemibold: {
      fontFamily: 'Noto Serif TC',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    bodyMSemibold: {
      fontFamily: 'Noto Serif TC',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    bodyMMedium: {
      fontFamily: 'Noto Serif TC',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },

  genSeki: {
    h5Medium: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5Bold: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6Regular: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h6Bold: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    bodyLRegular: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodyMMedium: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    bodyMRegular: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    bodySRegular: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodySBold: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    bodyXSRegular: {
      fontFamily: 'GenSekiGothic2 JP',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },

  luxurious: {
    decoRegular: {
      fontFamily: 'Luxurious Script',
      fontSize: '48px',
      fontWeight: 400,
      lineHeight: 1,
    },
    decoLRegular: {
      fontFamily: 'Luxurious Script',
      fontSize: '96px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
  },
} as const

export type TypographyVariant =
  | keyof typeof typography.notoSerif
  | keyof typeof typography.genSeki
  | keyof typeof typography.luxurious

export const getTypographyStyle = (variant: TypographyVariant) => {
  if (variant in typography.notoSerif) {
    return typography.notoSerif[variant as keyof typeof typography.notoSerif]
  }
  if (variant in typography.genSeki) {
    return typography.genSeki[variant as keyof typeof typography.genSeki]
  }
  if (variant in typography.luxurious) {
    return typography.luxurious[variant as keyof typeof typography.luxurious]
  }
  throw new Error(`Typography variant "${variant}" not found`)
}
