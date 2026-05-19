import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Float } from '@react-three/drei'
import * as THREE from 'three'

function ScanlineRing({
  radius,
  y,
  color,
  speed,
  thickness = 0.02,
}: {
  radius: number
  y: number
  color: THREE.Color
  speed: number
  thickness?: number
}) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    ringRef.current.rotation.z += delta * speed
    ringRef.current.rotation.x += delta * speed * 0.3
  })

  return (
    <mesh ref={ringRef} position={[0, y, 0]}>
      <torusGeometry args={[radius, thickness, 16, 80]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function HolographicFigure() {
  const groupRef = useRef<THREE.Group>(null!)
  const scanPlaneRef = useRef<THREE.Mesh>(null!)

  const cyanColor = useMemo(() => new THREE.Color('#00ffff'), [])
  const magentaColor = useMemo(() => new THREE.Color('#ff00ff'), [])

  // Body rings: head, shoulders, chest, waist
  const rings = useMemo(() => [
    { radius: 0.35, y: 1.1, color: cyanColor, speed: 0.3, thickness: 0.03 },
    { radius: 0.5, y: 0.6, color: magentaColor, speed: -0.25, thickness: 0.02 },
    { radius: 0.55, y: 0.2, color: cyanColor, speed: 0.2, thickness: 0.025 },
    { radius: 0.45, y: -0.2, color: magentaColor, speed: -0.35, thickness: 0.02 },
    { radius: 0.4, y: -0.6, color: cyanColor, speed: 0.28, thickness: 0.02 },
  ], [cyanColor, magentaColor])

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.15

    // Scanline plane moving up and down
    if (scanPlaneRef.current) {
      scanPlaneRef.current.position.y = Math.sin(Date.now() * 0.002) * 1.2
    }
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <ScanlineRing key={i} {...ring} />
      ))}

      {/* Central vertical line */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2.4, 8]} />
        <meshBasicMaterial
          color={cyanColor}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Scanline plane */}
      <mesh ref={scanPlaneRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 0.04]} />
        <meshBasicMaterial
          color={cyanColor}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow dots at joints */}
      {[[0, 1.1, 0], [0.35, 0.6, 0], [-0.35, 0.6, 0], [0, -0.6, 0]].map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0} floatIntensity={0.3}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#00ffff' : '#ff00ff'} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function AboutScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame(() => {
    const progress = scroll.range(1 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(1 / 6, 1 / 6)

    // Fade in at start, fade out at end
    const opacity = progress < 0.2
      ? progress / 0.2
      : progress > 0.8
        ? (1 - progress) / 0.2
        : 1

    groupRef.current.children.forEach((child) => {
      child.traverse((obj) => {
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial
          if (mat.transparent) {
            mat.opacity = Math.min(mat.opacity, opacity)
          }
        }
      })
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <HolographicFigure />

      {/* Orbiting particles */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[0.8, 0.3, 0.2]}>
          <icosahedronGeometry args={[0.08, 0]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
        <mesh position={[-0.7, -0.4, 0.1]}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </Float>
    </group>
  )
}
