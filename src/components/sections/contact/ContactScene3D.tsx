import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Float } from '@react-three/drei'
import { useStore } from '../../../store/useStore'
import * as THREE from 'three'

function OrbitRing({ radius, color, speed, tilt }: { radius: number; color: THREE.Color; speed: number; tilt: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    ringRef.current.rotation.x += delta * speed * 0.3
    ringRef.current.rotation.y += delta * speed
    ringRef.current.rotation.z += delta * speed * 0.2
  })

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, tilt * 0.5]}>
      <torusGeometry args={[radius, 0.015, 8, 80]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export function ContactScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()
  const mousePosition = useStore((s) => s.mousePosition)

  const colors = useMemo(() => [
    new THREE.Color('#00ffff'),
    new THREE.Color('#ff00ff'),
    new THREE.Color('#ffff00'),
  ], [])

  useFrame(() => {
    const progress = scroll.range(5 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(5 / 6, 1 / 6)

    // Tilt group toward mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mousePosition.normalizedY * 0.2,
      0.03
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mousePosition.normalizedX * 0.2,
      0.03
    )

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
    <group ref={groupRef} position={[0, 0, -1.5]}>
      {/* Nested orbit rings */}
      <OrbitRing radius={0.5} color={colors[0]} speed={0.5} tilt={0.3} />
      <OrbitRing radius={0.7} color={colors[1]} speed={-0.4} tilt={-0.5} />
      <OrbitRing radius={0.9} color={colors[2]} speed={0.6} tilt={0.8} />

      {/* Center floating shapes */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh>
          <icosahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh position={[0.3, 0.1, 0]}>
          <octahedronGeometry args={[0.1, 0]} />
          <meshBasicMaterial color="#ff00ff" wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.3}>
        <mesh position={[-0.25, -0.1, 0.1]}>
          <dodecahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#ffff00" wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </Float>

      {/* Scattered glow dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const r = 0.55 + Math.random() * 0.3
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * r,
              Math.sin(angle) * r * 0.6,
              (Math.random() - 0.5) * 0.5,
            ]}
          >
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial
              color={colors[i % 3]}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}
