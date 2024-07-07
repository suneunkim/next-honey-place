'use client'
import { create } from 'zustand'

interface ImageStoreState {
  files: File[]
  setFiles: (files: (prevFiles: File[]) => File[]) => void
  clearFileState: () => void
}

const useImageStore = create<ImageStoreState>((set) => ({
  files: [],
  setFiles: (updater) => set((state) => ({ files: updater(state.files) })),
  clearFileState: () => set({ files: [] }),
}))

export default useImageStore
