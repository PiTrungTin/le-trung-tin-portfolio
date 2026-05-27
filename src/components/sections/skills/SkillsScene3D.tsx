import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function SkillsScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  const orbs = useMemo(
    () => [
      { position: [-2.25, 0.85, -1.6] as [number, number, number], color: '#79d8ff', scale: 0.28 },
      { position: [-2.8, 0.1, -1.3] as [number, number, number], color: '#ffb391', scale: 0.2 },
      { position: [-2.05, -0.6, -1.8] as [number, number, number], color: '#f3b63f', scale: 0.18 },
    ],
    []
  )

  useFrame(() => {
    const progress = scroll.range(2 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(2 / 6, 1 / 6)
    groupRef.current.traverse((obj) => {
      if ('material' in obj && obj.material instanceof THREE.Material && 'opacity' in obj.material) {
        ;(obj.material as THREE.MeshBasicMaterial).opacity = 0.3 * Math.sin(progress * Math.PI)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <Float key={index} speed={1.4 + index * 0.2} floatIntensity={0.25} rotationIntensity={0.12}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 20, 20]} />
            <meshBasicMaterial color={orb.color} wireframe transparent opacity={0.22} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
