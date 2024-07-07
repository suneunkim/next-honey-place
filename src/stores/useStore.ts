'use client'
import { create } from 'zustand'

interface StoreState {
  name: string
  address: string
  latitude?: number | null
  longitude?: number | null
  images: string[]
  files: File[]
  setInitialName: () => void
  updateName: (name: string) => void
  updateAddress: (address: string, lat?: number, lng?: number) => void
  setFiles: (files: (prevFiles: File[]) => File[]) => void
  clearFileState: () => void
  clearState: () => void
}

const useStore = create<StoreState>((set) => ({
  name: '',
  address: '',
  latitude: null,
  longitude: null,
  images: [],
  files: [],
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
  setFiles: (updater) => set((state) => ({ files: updater(state.files) })),
  clearFileState: () => set({ files: [] }),
  clearState: () => set({ name: '', address: '', files: [], images: [] }),
}))

export default useStore
