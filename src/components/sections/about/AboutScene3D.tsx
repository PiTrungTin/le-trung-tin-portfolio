import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function AboutScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame((state) => {
    const progress = scroll.range(1 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(1 / 6, 1 / 6)
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
    groupRef.current.traverse((obj) => {
      if ('material' in obj && obj.material instanceof THREE.Material && 'opacity' in obj.material) {
        ;(obj.material as THREE.MeshBasicMaterial).opacity = 0.26 * Math.sin(progress * Math.PI)
      }
    })
  })

  return (
    <group ref={groupRef} position={[-2.3, 0.15, -1.4]}>
      <mesh>
        <torusGeometry args={[0.9, 0.03, 16, 80]} />
        <meshBasicMaterial color="#79d8ff" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[0.7, 0.2, 0.4]}>
        <torusGeometry args={[0.55, 0.025, 16, 80]} />
        <meshBasicMaterial color="#ffb391" transparent opacity={0.18} />
      </mesh>
      <mesh position={[0.25, -0.2, 0.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#79d8ff" transparent opacity={0.26} />
      </mesh>
    </group>
  )
}
