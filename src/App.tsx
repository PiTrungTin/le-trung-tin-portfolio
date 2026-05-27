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
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(circle_at_20%_20%,rgba(22,158,230,0.12),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(249,115,82,0.12),transparent_28%)]" />
        <div className="absolute inset-x-[4%] top-[12vh] bottom-[10vh] rounded-[48px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
        <div className="absolute inset-x-[7%] top-[16vh] bottom-[14vh] rounded-[42px] border border-cyan-100/20" />
        <div className="absolute left-[-8rem] top-[18vh] h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-[48vh] h-64 w-64 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute left-[12%] top-[36vh] h-36 w-36 rotate-12 rounded-[32px] border border-cyan-200/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(22,158,230,0.03))]" />
        <div className="absolute right-[14%] top-[72vh] h-28 w-28 rotate-45 rounded-[28px] border border-orange-200/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(249,115,82,0.03))]" />
      </div>

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
            <main className="relative z-10 mx-auto w-full max-w-[1260px] pointer-events-auto pb-24">
              <div
                className="w-full"
                style={{
                  paddingLeft: 'max(24px, env(safe-area-inset-left))',
                  paddingRight: 'max(24px, env(safe-area-inset-right))',
                }}
              >
                <div className="md:px-4 lg:px-8 xl:px-12 2xl:px-16">
                  <HeroSection />
                  <AboutSection />
                  <SkillsSection />
                  <ProjectsSection />
                  <ExperienceSection />
                  <ContactSection />
                </div>
              </div>
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
