import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'
import { Suspense } from 'react'
import { Effects } from './Effects'
import { SceneSetup } from './SceneSetup'
import { SceneController } from './SceneController'
import { GridFloor } from './GridFloor'
import { HeroScene3D } from '../sections/hero/HeroScene3D'
import { AboutScene3D } from '../sections/about/AboutScene3D'
import { SkillsScene3D } from '../sections/skills/SkillsScene3D'
import { ProjectsScene3D } from '../sections/projects/ProjectsScene3D'
import { ExperienceScene3D } from '../sections/experience/ExperienceScene3D'
import { ContactScene3D } from '../sections/contact/ContactScene3D'

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function ParticlesImpl({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const tier = useStore((s) => s.deviceTier)
  const scroll = useScroll()

  const actualCount = tier === 'high' ? count : tier === 'medium' ? 360 : 120

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3)
    const col = new Float32Array(actualCount * 3)
    const siz = new Float32Array(actualCount)

    const neonColors = [
      new THREE.Color('#7cd9ff'),
      new THREE.Color('#ffd1bd'),
      new THREE.Color('#ffe2a1'),
      new THREE.Color('#a0e7ff'),
    ]

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3
      const rx = pseudoRandom(i + 1)
      const ry = pseudoRandom(i + 101)
      const rz = pseudoRandom(i + 1001)
      const rc = pseudoRandom(i + 5001)
      const rs = pseudoRandom(i + 9001)

      pos[i3] = (rx - 0.5) * 30
      pos[i3 + 1] = (ry - 0.5) * 20
      pos[i3 + 2] = (rz - 0.5) * 15

      const color = neonColors[Math.floor(rc * neonColors.length)]
      col[i3] = color.r
      col[i3 + 1] = color.g
      col[i3 + 2] = color.b

      siz[i] = rs * 0.025 + 0.008
    }

    return [pos, col, siz]
  }, [actualCount])

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.015
    pointsRef.current.rotation.x += delta * 0.006

    const offset = scroll.offset
    pointsRef.current.position.z = offset * 1.2
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.18}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  )
}

function Particles({ count = 420 }: { count?: number }) {
  return (
    <Suspense fallback={null}>
      <ParticlesImpl count={count} />
    </Suspense>
  )
}

function SceneContent() {
  return (
    <>
      <SceneController />
      <GridFloor />
      <Particles />

      <Suspense fallback={null}>
        <HeroScene3D />
      </Suspense>

      <Suspense fallback={null}>
        <AboutScene3D />
      </Suspense>

      <Suspense fallback={null}>
        <SkillsScene3D />
      </Suspense>

      <Suspense fallback={null}>
        <ProjectsScene3D />
      </Suspense>

      <Suspense fallback={null}>
        <ExperienceScene3D />
      </Suspense>

      <Suspense fallback={null}>
        <ContactScene3D />
      </Suspense>

      <Effects />
    </>
  )
}

export { SceneContent, SceneSetup, Particles }
