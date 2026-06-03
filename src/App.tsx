import { lazy, useEffect } from 'react'
import { useStore } from './store/useStore'
import { Navigation } from './components/ui/Navigation'
import { ProjectModal } from './components/sections/projects/ProjectModal'
import { LazySection } from './components/ui/LazySection'

const HeroSection = lazy(() => import('./components/sections/hero/HeroSection').then((m) => ({ default: m.HeroSection })))
const WhyMeSection = lazy(() => import('./components/sections/why-me/WhyMeSection').then((m) => ({ default: m.WhyMeSection })))
const SkillsSection = lazy(() => import('./components/sections/skills/SkillsSection').then((m) => ({ default: m.SkillsSection })))
const ProjectsSection = lazy(() => import('./components/sections/projects/ProjectsSection').then((m) => ({ default: m.ProjectsSection })))
const ExperienceSection = lazy(() => import('./components/sections/experience/ExperienceSection').then((m) => ({ default: m.ExperienceSection })))
const ContactSection = lazy(() => import('./components/sections/contact/ContactSection').then((m) => ({ default: m.ContactSection })))

const sectionIds = ['hero', 'why-me', 'skills', 'projects', 'experience', 'contact'] as const

function App() {
  useEffect(() => {
    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight * 0.32
      let activeIndex = 0

      sectionIds.forEach((id, index) => {
        const element = document.getElementById(id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          activeIndex = index
        }
      })

      useStore.getState().setActiveSection(activeIndex)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-slate-900">
      <Navigation />

      <main className="pt-28 md:pt-32">
        <LazySection id="hero" backgroundClassName="bg-[#f4ede1]">
          <HeroSection />
        </LazySection>
        <LazySection id="why-me" backgroundClassName="bg-[#fbf8f2]">
          <WhyMeSection />
        </LazySection>
        <LazySection id="skills" backgroundClassName="bg-[#f2ece3]">
          <SkillsSection />
        </LazySection>
        <LazySection id="projects" backgroundClassName="bg-[#f8f5ef]">
          <ProjectsSection />
        </LazySection>
        <LazySection id="experience" backgroundClassName="bg-[#efe8de]">
          <ExperienceSection />
        </LazySection>
        <LazySection id="contact" backgroundClassName="bg-[#f7f2ea]">
          <ContactSection />
        </LazySection>
      </main>

      <ProjectModal />
    </div>
  )
}

export default App
