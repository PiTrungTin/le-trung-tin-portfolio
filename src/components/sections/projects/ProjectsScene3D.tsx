import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useStore } from '../../../store/useStore'
import * as THREE from 'three'

interface ProjectCard3DProps {
  position: [number, number, number]
  rotation: [number, number, number]
  color: THREE.Color
  index: number
}

function ProjectCard3D({ position, rotation, color, index }: ProjectCard3DProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const borderRef = useRef<THREE.LineSegments>(null!)
  const mousePosition = useStore((s) => s.mousePosition)
  const scroll = useScroll()
  const basePos = useMemo(() => position, [position])

  const borderGeo = useMemo(() => {
    const shape = new THREE.Shape()
    const w = 0.7
    const h = 0.95
    shape.moveTo(-w / 2, -h / 2)
    shape.lineTo(w / 2, -h / 2)
    shape.lineTo(w / 2, h / 2)
    shape.lineTo(-w / 2, h / 2)
    shape.closePath()
    return new THREE.EdgesGeometry(new THREE.ShapeGeometry(shape))
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    const sectionProgress = scroll.range(3 / 6, 1 / 6)

    // Tilt toward mouse
    const targetRotX = mousePosition.normalizedY * 0.15
    const targetRotY = mousePosition.normalizedX * 0.15
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + rotation[0], 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + rotation[1], 0.05)

    // Subtle floating
    groupRef.current.position.y = basePos[1] + Math.sin(Date.now() * 0.001 + index) * 0.1

    // Fade
    const opacity = sectionProgress < 0.15
      ? sectionProgress / 0.15
      : sectionProgress > 0.85
        ? (1 - sectionProgress) / 0.15
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
                (mat as THREE.MeshBasicMaterial).opacity || 0.4, opacity
              )
            }
          })
        }
      })
    })
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Card face */}
      <mesh>
        <planeGeometry args={[0.7, 0.95]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Neon border */}
      <lineSegments ref={borderRef} geometry={borderGeo}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Title strip */}
      <mesh position={[0, -0.3, 0.005]}>
        <planeGeometry args={[0.6, 0.12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Corner dots */}
      {[[-0.33, 0.45, 0.01], [0.33, 0.45, 0.01], [-0.33, -0.45, 0.01], [0.33, -0.45, 0.01]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

export function ProjectsScene3D() {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  const colors = useMemo(() => [
    new THREE.Color('#00ffff'),
    new THREE.Color('#ff00ff'),
    new THREE.Color('#ffff00'),
    new THREE.Color('#00ffff'),
  ], [])

  const cards = useMemo(() => {
    const positions: Array<{
      position: [number, number, number]
      rotation: [number, number, number]
      color: THREE.Color
      index: number
      title: string
    }> = []

    // 2x2 grid of cards
    const offsets: [number, number][] = [
      [-0.9, 0.4], [0.9, 0.4],
      [-0.9, -0.8], [0.9, -0.8],
    ]

    offsets.forEach(([x, y], i) => {
      positions.push({
        position: [x, y, -1],
        rotation: [0, (i % 2 === 0 ? -0.1 : 0.1), 0],
        color: colors[i],
        index: i,
        title: `Project ${i + 1}`,
      })
    })

    return positions
  }, [colors])

  useFrame(() => {
    groupRef.current.visible = scroll.visible(3 / 6, 1 / 6)
  })

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => (
        <ProjectCard3D key={i} {...card} />
      ))}
    </group>
  )
}
