import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function ProjectsScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame((state) => {
    const progress = scroll.range(3 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(3 / 6, 1 / 6)
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08
    groupRef.current.traverse((obj) => {
      if ('material' in obj && obj.material instanceof THREE.Material && 'opacity' in obj.material) {
        ;(obj.material as THREE.MeshBasicMaterial).opacity = 0.28 * Math.sin(progress * Math.PI)
      }
    })
  })

  return (
    <group ref={groupRef} position={[-2.45, -0.1, -1.5]}>
      <mesh rotation={[0.1, 0.18, 0]}>
        <planeGeometry args={[1.1, 1.45]} />
        <meshBasicMaterial color="#79d8ff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.28, -0.12, 0.08]} rotation={[-0.08, -0.22, 0]}>
        <planeGeometry args={[0.95, 1.2]} />
        <meshBasicMaterial color="#ffb391" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
