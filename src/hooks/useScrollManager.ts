import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useStore } from '../store/useStore'

const TOTAL_SECTIONS = 6

export function useScrollManager() {
  const scroll = useScroll()
  const setScrollProgress = useStore((s) => s.setScrollProgress)
  const setActiveSection = useStore((s) => s.setActiveSection)

  useFrame(() => {
    const offset = scroll.offset
    setScrollProgress(offset)

    const prevSection = useStore.getState().activeSection
    const sectionIndex = Math.min(Math.floor(offset * TOTAL_SECTIONS + 0.0001), TOTAL_SECTIONS - 1)
    if (sectionIndex !== prevSection) {
      setActiveSection(sectionIndex)
    }
  })
}
