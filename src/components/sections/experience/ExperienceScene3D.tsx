import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function ExperienceScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame((state) => {
    const progress = scroll.range(4 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(4 / 6, 1 / 6)
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.06
    groupRef.current.traverse((obj) => {
      if ('material' in obj && obj.material instanceof THREE.Material && 'opacity' in obj.material) {
        ;(obj.material as THREE.MeshBasicMaterial).opacity = 0.3 * Math.sin(progress * Math.PI)
      }
    })
  })

  return (
    <group ref={groupRef} position={[-2.65, 0.0, -1.5]}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.05, 2.2, 0.05]} />
        <meshBasicMaterial color="#79d8ff" transparent opacity={0.2} />
      </mesh>
      {[-0.8, 0, 0.8].map((y, index) => (
        <mesh key={y} position={[0, y, 0]}>
          <sphereGeometry args={[0.12 - index * 0.02, 16, 16]} />
          <meshBasicMaterial
            color={index === 1 ? '#ffb391' : '#79d8ff'}
            transparent
            opacity={0.28}
          />
        </mesh>
      ))}
    </group>
  )
}
