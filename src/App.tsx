import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { SceneSetup, SceneContent } from './components/canvas/SceneContainer'
import { HeroSection } from './components/sections/hero/HeroSection'
import { AboutSection } from './components/sections/about/AboutSection'
import { SkillsSection } from './components/sections/skills/SkillsSection'
import { ProjectsSection } from './components/sections/projects/ProjectsSection'
import { ExperienceSection } from './components/sections/experience/ExperienceSection'
import { ContactSection } from './components/sections/contact/ContactSection'
import { useStore } from './store/useStore'
import { useDeviceTier } from './hooks/useDeviceTier'
import { Navigation } from './components/ui/Navigation'
import { ProjectModal } from './components/sections/projects/ProjectModal'

function App() {
  const tier = useDeviceTier()

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      useStore.getState().setMousePosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div className="relative w-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, tier === 'high' ? 2 : 1.5]}
        gl={{
          antialias: tier !== 'low',
          toneMapping: 3,
          toneMappingExposure: 1.0,
          outputColorSpace: 'srgb',
        }}
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      >
        <SceneSetup />

        <ScrollControls pages={6} damping={0.25}>
          <Scroll>
            <SceneContent />
          </Scroll>

          <Scroll html>
            <main className="relative z-10 w-full max-w-[1400px] mx-auto pointer-events-auto px-4 md:px-8">
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <ContactSection />
            </main>
          </Scroll>
        </ScrollControls>
      </Canvas>

      <Navigation />
      <ProjectModal />
    </div>
  )
}

export default App
