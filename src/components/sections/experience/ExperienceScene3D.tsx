import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

function TimelineNode({
  position,
  color,
  delay,
  index,
}: {
  position: [number, number, number]
  color: THREE.Color
  delay: number
  index: number
}) {
  const ringRef = useRef<THREE.Mesh>(null!)
  const dotRef = useRef<THREE.Mesh>(null!)
  const scroll = useScroll()

  useFrame(() => {
    const sectionProgress = scroll.range(4 / 6, 1 / 6)
    const nodeProgress = Math.max(0, Math.min(1, (sectionProgress - delay) / 0.25))

    // Pulse based on scroll progress
    const pulse = 1 + Math.sin(Date.now() * 0.003 + index) * 0.1 * nodeProgress
    ringRef.current.scale.setScalar(pulse * nodeProgress)
    if (dotRef.current) {
      dotRef.current.scale.setScalar(nodeProgress)
    }
  })

  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.18, 0.02, 16, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Center dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Connection line to next node (drawn as we scroll) */}
      {index < 3 && (
        <mesh position={[0, -0.8, 0]} scale={[0.005, 0.4, 0.005]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

export function ExperienceScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const lineRef = useRef<THREE.Mesh>(null!)
  const scroll = useScroll()

  const colors = useMemo(() => [
    new THREE.Color('#00ffff'),
    new THREE.Color('#ff00ff'),
    new THREE.Color('#ffff00'),
    new THREE.Color('#00ff88'),
  ], [])

  useFrame(() => {
    const progress = scroll.range(4 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(4 / 6, 1 / 6)

    // Draw the main timeline line
    if (lineRef.current) {
      lineRef.current.scale.y = Math.max(0.01, progress)
    }

    const opacity = progress < 0.15
      ? progress / 0.15
      : progress > 0.85
        ? (1 - progress) / 0.15
        : 1

    groupRef.current.children.forEach((child) => {
      child.traverse((obj) => {
        if ((obj as THREE.Mesh).material) {
          const mats = Array.isArray((obj as THREE.Mesh).material)
            ? (obj as THREE.Mesh).material as THREE.Material[]
            : [(obj as THREE.Mesh).material as THREE.Material]
          mats.forEach((mat) => {
            if ('opacity' in mat) {
              ;(mat as THREE.MeshBasicMaterial).opacity = Math.min(
                (mat as THREE.MeshBasicMaterial).opacity || 0.3, opacity
              )
            }
          })
        }
      })
    })
  })

  return (
    <group ref={groupRef} position={[1.5, 0, -1]}>
      {/* Main timeline spine */}
      <mesh ref={lineRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[0.04, 2.8, 0.04]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Timeline nodes */}
      <TimelineNode position={[0, 1.5, 0]} color={colors[0]} delay={0} index={0} />
      <TimelineNode position={[0, 0.5, 0]} color={colors[1]} delay={0.25} index={1} />
      <TimelineNode position={[0, -0.5, 0]} color={colors[2]} delay={0.5} index={2} />
      <TimelineNode position={[0, -1.5, 0]} color={colors[3]} delay={0.75} index={3} />

      {/* Floating particles around timeline */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`p-${i}`}
          position={[
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 0.6,
          ]}
        >
          <sphereGeometry args={[0.015, 4, 4]} />
          <meshBasicMaterial
            color={colors[i % 4]}
            transparent
            opacity={0.3 + Math.random() * 0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
