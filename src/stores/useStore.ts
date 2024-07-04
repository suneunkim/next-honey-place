'use client'
import { create } from 'zustand'

interface StoreState {
  name: string
  address: string
  latitude?: number | null
  longitude?: number | null
  setInitialName: () => void
  updateName: (name: string) => void
  updateAddress: (address: string, lat?: number, lng?: number) => void
}

const useStore = create<StoreState>((set) => ({
  name: '',
  address: '',
  latitude: null,
  longitude: null,
  setInitialName: () => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('name')
      if (storedName) {
        set({ name: storedName })
      }
    }
  },
  updateName: (newName) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('name', newName || '')
    }
    set({ name: newName })
  },
  updateAddress: (newAddress, lat, lng) =>
    set({ address: newAddress, latitude: lat, longitude: lng }),
}))

export default useStore
