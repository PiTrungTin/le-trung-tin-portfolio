import { create } from 'zustand'

export type DeviceTier = 'high' | 'medium' | 'low'

interface StoreState {
  scrollProgress: number
  setScrollProgress: (p: number) => void

  activeSection: number
  setActiveSection: (idx: number) => void

  deviceTier: DeviceTier
  setDeviceTier: (tier: DeviceTier) => void

  mousePosition: { x: number; y: number; normalizedX: number; normalizedY: number }
  setMousePosition: (pos: { x: number; y: number; normalizedX: number; normalizedY: number }) => void

  effectsIntensity: number
  setEffectsIntensity: (v: number) => void

  triggerGlitch: boolean
  triggerGlitchEffect: () => void

  activeProject: number | null
  setActiveProject: (idx: number | null) => void

  isReady: boolean
  setReady: (v: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),

  activeSection: 0,
  setActiveSection: (idx) => set({ activeSection: idx }),

  deviceTier: 'high',
  setDeviceTier: (tier) => set({ deviceTier: tier }),

  mousePosition: { x: 0, y: 0, normalizedX: 0, normalizedY: 0 },
  setMousePosition: (pos) => set({ mousePosition: pos }),

  effectsIntensity: 1,
  setEffectsIntensity: (v) => set({ effectsIntensity: v }),

  triggerGlitch: false,
  triggerGlitchEffect: () => {
    set({ triggerGlitch: true })
    setTimeout(() => set({ triggerGlitch: false }), 300)
  },

  activeProject: null,
  setActiveProject: (idx) => set({ activeProject: idx }),

  isReady: false,
  setReady: (v) => set({ isReady: v }),
}))
