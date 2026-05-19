import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Float } from '@react-three/drei'
import * as THREE from 'three'

function WireframeGeo({
  geometry,
  position,
  color,
  scale = 1,
  speed = 1,
  rotationSpeed = 0.3,
}: {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  color: THREE.Color
  scale?: number
  speed?: number
  rotationSpeed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * rotationSpeed * 0.5
    meshRef.current.rotation.y += delta * rotationSpeed
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />

        <lineSegments>
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial
            color={color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </mesh>
    </Float>
  )
}

export function HeroScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  const geometries = useMemo(() => {
    const octa = new THREE.OctahedronGeometry(0.6, 0)
    const torus = new THREE.TorusKnotGeometry(0.5, 0.12, 64, 8, 2, 3)
    const icosa = new THREE.IcosahedronGeometry(0.4, 0)
    const ring = new THREE.TorusGeometry(0.7, 0.02, 16, 64)
    const smallOcta = new THREE.OctahedronGeometry(0.25, 0)
    const smallIcosa = new THREE.IcosahedronGeometry(0.2, 0)

    return [octa, torus, icosa, ring, smallOcta, smallIcosa]
  }, [])

  const neonColors = useMemo(() => [
    new THREE.Color('#00ffff'), // cyan
    new THREE.Color('#ff00ff'), // magenta
    new THREE.Color('#ffff00'), // yellow
    new THREE.Color('#00ffff'), // cyan (ring)
    new THREE.Color('#ff00ff'), // magenta
    new THREE.Color('#ffff00'), // yellow
  ], [])

  const shapes = useMemo(() => [
    { geometry: geometries[0], position: [-1.8, 0.5, -1] as [number, number, number], color: neonColors[0], scale: 1, speed: 2, rotationSpeed: 0.3 },
    { geometry: geometries[1], position: [1.5, -0.3, -1.5] as [number, number, number], color: neonColors[1], scale: 1, speed: 1.5, rotationSpeed: 0.2 },
    { geometry: geometries[2], position: [0, 1.2, -2] as [number, number, number], color: neonColors[2], scale: 1.2, speed: 1.8, rotationSpeed: 0.25 },
    { geometry: geometries[3], position: [-0.5, -0.8, -0.5] as [number, number, number], color: neonColors[3], scale: 1, speed: 0.8, rotationSpeed: 0.15 },
    { geometry: geometries[4], position: [-2.5, -0.5, -1.8] as [number, number, number], color: neonColors[4], scale: 0.9, speed: 2.2, rotationSpeed: 0.35 },
    { geometry: geometries[5], position: [2, 1, -1.2] as [number, number, number], color: neonColors[5], scale: 1, speed: 1.6, rotationSpeed: 0.28 },
  ], [geometries, neonColors])

  useFrame(() => {
    const progress = scroll.range(0, 1 / 6)
    groupRef.current.visible = scroll.visible(0, 1 / 6)

    // Fade out as scroll progresses through hero section
    groupRef.current.children.forEach((child) => {
      const mesh = child as THREE.Group
      mesh.children.forEach((sub) => {
        if ((sub as THREE.Mesh).material) {
          const mat = (sub as THREE.Mesh).material as THREE.MeshBasicMaterial | THREE.LineBasicMaterial
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1 - progress * 1.2, 0.1)
        }
      })
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {shapes.map((shape, i) => (
        <WireframeGeo
          key={i}
          geometry={shape.geometry}
          position={shape.position}
          color={shape.color}
          scale={shape.scale}
          speed={shape.speed}
          rotationSpeed={shape.rotationSpeed}
        />
      ))}

      {/* Central glow sphere */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, 0, -3]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        <pointLight position={[0, 0, -3]} intensity={2} color="#00ffff" distance={10} />
      </Float>
    </group>
  )
}
