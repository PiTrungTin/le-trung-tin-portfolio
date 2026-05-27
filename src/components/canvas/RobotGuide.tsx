import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

const SECTION_POINTS: Array<[number, number, number]> = [
  [2.2, 1.0, -0.8],
  [1.8, 0.75, -0.7],
  [2.05, 0.35, -0.7],
  [1.7, 0.0, -0.95],
  [2.0, -0.45, -0.75],
  [1.45, -0.9, -0.7],
]

function lerpPoint(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return new THREE.Vector3(
    THREE.MathUtils.lerp(a.x, b.x, t),
    THREE.MathUtils.lerp(a.y, b.y, t),
    THREE.MathUtils.lerp(a.z, b.z, t)
  )
}

export function RobotGuide() {
  const groupRef = useRef<THREE.Group>(null!)
  const leftArmRef = useRef<THREE.Group>(null!)
  const rightArmRef = useRef<THREE.Group>(null!)
  const leftLegRef = useRef<THREE.Group>(null!)
  const rightLegRef = useRef<THREE.Group>(null!)
  const antennaRef = useRef<THREE.Mesh>(null!)
  const haloRef = useRef<THREE.Mesh>(null!)

  const scrollProgress = useStore((s) => s.scrollProgress)
  const tier = useStore((s) => s.deviceTier)
  const activeSection = useStore((s) => s.activeSection)

  const path = useMemo(
    () => SECTION_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    []
  )

  useFrame((state, delta) => {
    const rawIndex = scrollProgress * (path.length - 1)
    const fromIndex = Math.floor(rawIndex)
    const toIndex = Math.min(path.length - 1, fromIndex + 1)
    const blend = rawIndex - fromIndex

    const target = lerpPoint(path[fromIndex], path[toIndex], blend)
    const bob = Math.sin(state.clock.elapsedTime * 2.6) * 0.08
    const sway = Math.sin(state.clock.elapsedTime * 1.8) * 0.1

    groupRef.current.position.lerp(
      new THREE.Vector3(target.x + sway * 0.2, target.y + bob, target.z),
      1 - Math.pow(0.03, delta)
    )

    const nextPoint = path[toIndex] ?? path[fromIndex]
    const dx = nextPoint.x - path[fromIndex].x
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      dx >= 0 ? -0.18 : 0.18,
      1 - Math.pow(0.02, delta)
    )
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      Math.sin(state.clock.elapsedTime * 1.6) * 0.04,
      1 - Math.pow(0.05, delta)
    )

    leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3.4) * 0.22 - 0.15
    rightArmRef.current.rotation.z = -Math.sin(state.clock.elapsedTime * 3.4) * 0.22 + 0.15
    leftLegRef.current.rotation.x = -Math.sin(state.clock.elapsedTime * 3.4) * 0.14
    rightLegRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3.4) * 0.14
    antennaRef.current.scale.y = 0.9 + Math.sin(state.clock.elapsedTime * 5.5) * 0.08

    if (haloRef.current.material instanceof THREE.MeshBasicMaterial) {
      haloRef.current.material.opacity = 0.18 + activeSection * 0.02
    }
  })

  const bodyColor = '#f7fbff'
  const accentColor = '#12b5ff'
  const trimColor = '#ff8a5b'
  const haloColor = tier === 'low' ? '#89d7ff' : '#c8f2ff'

  return (
    <group ref={groupRef} position={SECTION_POINTS[0]} scale={0.95}>
      <mesh ref={haloRef} position={[0, 0.4, -0.35]}>
        <circleGeometry args={[0.9, 32]} />
        <meshBasicMaterial color={haloColor} transparent opacity={0.18} />
      </mesh>

      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.62, 0.44, 0.4]} />
        <meshStandardMaterial color={bodyColor} metalness={0.45} roughness={0.15} />
      </mesh>

      <mesh position={[0, 1.07, 0.22]}>
        <boxGeometry args={[0.42, 0.12, 0.06]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.85} />
      </mesh>

      <mesh ref={antennaRef} position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
        <meshStandardMaterial color={trimColor} metalness={0.2} roughness={0.35} />
      </mesh>

      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={trimColor} />
      </mesh>

      <mesh position={[0, 0.48, 0]}>
        <boxGeometry args={[0.8, 0.82, 0.45]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.22} />
      </mesh>

      <mesh position={[0, 0.55, 0.23]}>
        <planeGeometry args={[0.45, 0.2]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.35} />
      </mesh>

      <mesh position={[0, 0.05, 0.24]}>
        <planeGeometry args={[0.24, 0.14]} />
        <meshBasicMaterial color={trimColor} transparent opacity={0.25} />
      </mesh>

      <group ref={leftArmRef} position={[-0.47, 0.62, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.06, 0.36, 4, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.35} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={trimColor} metalness={0.2} roughness={0.3} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.47, 0.62, 0]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.06, 0.36, 4, 8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.35} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={trimColor} metalness={0.2} roughness={0.3} />
        </mesh>
      </group>

      <group ref={leftLegRef} position={[-0.18, -0.1, 0]}>
        <mesh position={[0, -0.33, 0]}>
          <capsuleGeometry args={[0.07, 0.46, 4, 8]} />
          <meshStandardMaterial color="#e7eef7" metalness={0.25} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.64, 0.06]}>
          <boxGeometry args={[0.22, 0.08, 0.32]} />
          <meshStandardMaterial color="#6ba9d6" metalness={0.15} roughness={0.4} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.18, -0.1, 0]}>
        <mesh position={[0, -0.33, 0]}>
          <capsuleGeometry args={[0.07, 0.46, 4, 8]} />
          <meshStandardMaterial color="#e7eef7" metalness={0.25} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.64, 0.06]}>
          <boxGeometry args={[0.22, 0.08, 0.32]} />
          <meshStandardMaterial color="#6ba9d6" metalness={0.15} roughness={0.4} />
        </mesh>
      </group>

      {tier !== 'low' && (
        <>
          <mesh position={[-0.86, 0.88, -0.15]}>
            <torusGeometry args={[0.16, 0.015, 12, 48]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.35} />
          </mesh>
          <mesh position={[0.82, 0.2, -0.25]} rotation={[0.6, 0.1, 0.4]}>
            <torusGeometry args={[0.12, 0.012, 12, 48]} />
            <meshBasicMaterial color={trimColor} transparent opacity={0.25} />
          </mesh>
        </>
      )}
    </group>
  )
}
