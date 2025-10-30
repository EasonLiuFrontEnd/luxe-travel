'use client'

import { create } from 'zustand'

type TSelectedCountryState = {
  selectedCountryId: string
  setSelectedCountryId: (countryId: string) => void
}

const useSelectedCountryStore = create<TSelectedCountryState>((set) => ({
  selectedCountryId: '',
  setSelectedCountryId: (countryId: string) =>
    set({ selectedCountryId: countryId }),
}))

export const useSelectedCountry = () => {
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryStore()
  return { selectedCountryId, setSelectedCountryId }
}
