import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function HeroScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  const accents = useMemo(
    () => [
      { position: [-2.4, 1.3, -1.8] as [number, number, number], color: '#79d8ff', scale: 0.46 },
      { position: [-1.9, -0.4, -1.2] as [number, number, number], color: '#ffb391', scale: 0.3 },
      { position: [-2.8, 0.1, -2.3] as [number, number, number], color: '#f3b63f', scale: 0.22 },
    ],
    []
  )

  useFrame(() => {
    const progress = scroll.range(0, 1 / 6)
    groupRef.current.visible = scroll.visible(0, 1 / 6)
    groupRef.current.position.y = progress * 0.15
    groupRef.current.traverse((obj) => {
      if ('material' in obj && obj.material instanceof THREE.Material && 'opacity' in obj.material) {
        ;(obj.material as THREE.MeshBasicMaterial).opacity = 0.35 * (1 - progress)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {accents.map((accent, index) => (
        <Float key={index} speed={1 + index * 0.2} floatIntensity={0.25} rotationIntensity={0.15}>
          <mesh position={accent.position} scale={accent.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={accent.color} wireframe transparent opacity={0.35} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
