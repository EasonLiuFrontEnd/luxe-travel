import type { TCountry, TFilter } from './types'
import { REGIONS } from './constants'

export const getCountryById = (countryId: string): TCountry | null => {
  for (const region of REGIONS) {
    const country = region.countries.find((c) => c.id === countryId)
    if (country) {
      return country
    }
  }
  return null
}

export const getCountryCodes = (countryCodes: string[]): string[] => {
  return countryCodes
}

export const convertCountriesToFilters = (
  selectedCountries: string[],
  regionsData?: Array<{
    region: string
    countries: Array<{ code: string; nameZh: string }>
  }>,
): TFilter[] => {
  if (!regionsData || regionsData.length === 0) {
    return selectedCountries.map((code) => ({
      id: code,
      label: code,
      type: 'country' as const,
    }))
  }

  return selectedCountries
    .map((countryCode) => {
      for (const region of regionsData) {
        const country = region.countries.find((c) => c.code === countryCode)
        if (country) {
          return {
            id: countryCode,
            label: country.nameZh,
            type: 'country' as const,
          }
        }
      }
      return null
    })
    .filter(Boolean) as TFilter[]
}
