import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function ContactScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame((state) => {
    const progress = scroll.range(5 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(5 / 6, 1 / 6)
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08
    groupRef.current.traverse((obj) => {
      if ('material' in obj && obj.material instanceof THREE.Material && 'opacity' in obj.material) {
        ;(obj.material as THREE.MeshBasicMaterial).opacity = 0.28 * Math.sin(progress * Math.PI)
      }
    })
  })

  return (
    <group ref={groupRef} position={[-2.3, -0.1, -1.55]}>
      <Float speed={1.6} floatIntensity={0.18} rotationIntensity={0.15}>
        <mesh>
          <torusGeometry args={[0.52, 0.02, 12, 64]} />
          <meshBasicMaterial color="#79d8ff" transparent opacity={0.2} />
        </mesh>
      </Float>
      <Float speed={1.9} floatIntensity={0.16} rotationIntensity={0.12}>
        <mesh rotation={[0.8, 0.2, 0.4]}>
          <torusGeometry args={[0.82, 0.018, 12, 64]} />
          <meshBasicMaterial color="#ffb391" transparent opacity={0.18} />
        </mesh>
      </Float>
    </group>
  )
}
