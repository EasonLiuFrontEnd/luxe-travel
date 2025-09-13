'use client'

import { create } from 'zustand'

type TSelectedCountryState = {
  selectedCountryId: string
  setSelectedCountryId: (countryId: string) => void
}

export const useSelectedCountryStore = create<TSelectedCountryState>((set) => ({
  selectedCountryId: '68b05373564da72a7ab17536',
  setSelectedCountryId: (countryId: string) => set({ selectedCountryId: countryId }),
}))

export const useSelectedCountry = () => {
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryStore()
  return { selectedCountryId, setSelectedCountryId }
}