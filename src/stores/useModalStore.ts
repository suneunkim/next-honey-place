'use client'
import { create } from 'zustand'

interface ModalState {
  isSearchModal: boolean
  openSearchModal: () => void
  closeSearchModal: () => void
}

const useModalStore = create<ModalState>((set) => ({
  isSearchModal: false,
  openSearchModal: () => set({ isSearchModal: true }),
  closeSearchModal: () => set({ isSearchModal: false }),
}))

export default useModalStore
