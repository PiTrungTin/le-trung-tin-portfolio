import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface SkillOrb3DProps {
  position: [number, number, number]
  color: string
  speed: number
  scale?: number
  label?: string
}

function SkillOrb3D({ position, color, speed, scale = 1 }: SkillOrb3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.3 * speed
    meshRef.current.rotation.y += delta * 0.5 * speed
    if (glowRef.current) {
      glowRef.current.rotation.x += delta * 0.3 * speed
      glowRef.current.rotation.y += delta * 0.5 * speed
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position} scale={scale}>
        {/* Glass orb */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.35, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.05}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.1}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1.2}
            iridescenceThicknessRange={[100, 500]}
            envMapIntensity={0.5}
            background={new THREE.Color('#0a0a0f')}
            color={new THREE.Color(color)}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Wireframe glow shell */}
        <mesh ref={glowRef}>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Inner glow point */}
        <pointLight position={[0, 0, 0]} intensity={0.5} color={color} distance={2} />
      </group>
    </Float>
  )
}

export function SkillsScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  const orbs = useMemo(() => {
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff88']
    const items: Array<{ position: [number, number, number]; color: string; speed: number; scale: number }> = []

    // 3x3 grid arrangement
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        items.push({
          position: [
            (col - 1) * 1.2,
            (1 - row) * 0.9,
            (Math.random() - 0.5) * 0.5,
          ],
          color: colors[(row * 3 + col) % colors.length],
          speed: 1 + Math.random() * 1.5,
          scale: 0.7 + Math.random() * 0.5,
        })
      }
    }
    return items
  }, [])

  useFrame(() => {
    const progress = scroll.range(2 / 6, 1 / 6)
    groupRef.current.visible = scroll.visible(2 / 6, 1 / 6)

    const opacity = progress < 0.15
      ? progress / 0.15
      : progress > 0.85
        ? (1 - progress) / 0.15
        : 1

    groupRef.current.children.forEach((child) => {
      child.traverse((obj) => {
        if ((obj as THREE.Mesh).material) {
          const materials = Array.isArray((obj as THREE.Mesh).material)
            ? (obj as THREE.Mesh).material as THREE.Material[]
            : [(obj as THREE.Mesh).material as THREE.Material]
          materials.forEach((mat) => {
            if ('opacity' in mat && 'transparent' in mat) {
              ;(mat as THREE.MeshBasicMaterial).opacity = Math.min(
                (mat as THREE.MeshBasicMaterial).opacity || 0.3,
                opacity
              )
            }
          })
        }
      })
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {orbs.map((orb, i) => (
        <SkillOrb3D key={i} {...orb} />
      ))}
    </group>
  )
}
