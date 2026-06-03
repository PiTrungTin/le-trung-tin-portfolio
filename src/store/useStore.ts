import { create } from 'zustand'

interface StoreState {
  activeSection: number
  setActiveSection: (idx: number) => void

  activeProject: number | null
  setActiveProject: (idx: number | null) => void

  isReady: boolean
  setReady: (v: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  activeSection: 0,
  setActiveSection: (idx) => set({ activeSection: idx }),

  activeProject: null,
  setActiveProject: (idx) => set({ activeProject: idx }),

  isReady: false,
  setReady: (v) => set({ isReady: v }),
}))
