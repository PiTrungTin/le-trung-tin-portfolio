import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store/useStore'
import { useScrollManager } from '../../hooks/useScrollManager'
import * as THREE from 'three'

export function SceneController() {
  const groupRef = useRef<THREE.Group>(null!)
  const activeSection = useStore((s) => s.activeSection)
  const triggerGlitchEffect = useStore((s) => s.triggerGlitchEffect)

  useScrollManager()

  const prevSection = useRef(0)
  useFrame(() => {
    if (activeSection !== prevSection.current) {
      if (activeSection > 0) {
        triggerGlitchEffect()
      }
      prevSection.current = activeSection
    }
  })

  return <group ref={groupRef} />
}
