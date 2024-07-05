'use client'
import { create } from 'zustand'

interface ImageStoreState {
  files: File[]
  setFiles: (files: (prevFiles: File[]) => File[]) => void
}

const useImageStore = create<ImageStoreState>((set) => ({
  files: [],
  setFiles: (updater) => set((state) => ({ files: updater(state.files) })),
}))

export default useImageStore
