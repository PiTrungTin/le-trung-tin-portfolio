import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useStore } from '../store/useStore'

export function useScrollManager() {
  const scroll = useScroll()
  const setScrollProgress = useStore((s) => s.setScrollProgress)
  const setActiveSection = useStore((s) => s.setActiveSection)

  useFrame(() => {
    const offset = scroll.offset
    setScrollProgress(offset)

    const prevSection = useStore.getState().activeSection
    const sectionIndex = Math.min(Math.floor(offset), 5)
    if (sectionIndex !== prevSection) {
      setActiveSection(sectionIndex)
    }
  })
}
