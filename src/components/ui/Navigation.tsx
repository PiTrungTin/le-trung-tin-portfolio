import { useEffect, useState } from 'react'
import { useStore } from '../../store/useStore'

const sections = [
  { id: 'hero', label: 'HOME', idx: 0 },
  { id: 'about', label: 'ABOUT', idx: 1 },
  { id: 'skills', label: 'SKILLS', idx: 2 },
  { id: 'projects', label: 'PROJECTS', idx: 3 },
  { id: 'experience', label: 'EXP', idx: 4 },
  { id: 'contact', label: 'CONTACT', idx: 5 },
]

export function Navigation() {
  const activeSection = useStore((s) => s.activeSection)
  const setActiveSection = useStore((s) => s.setActiveSection)
  const [visible, setVisible] = useState(false)

  // Show nav after a short delay (after loading screen)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  // Reliable scroll-based section detection using native scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      // Each section = 1 viewport height; 6 sections total
      const sectionIndex = Math.min(Math.floor(scrollY / vh + 0.3), 5)
      if (sectionIndex !== useStore.getState().activeSection) {
        setActiveSection(sectionIndex)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveSection])

  const handleClick = (idx: number) => {
    // ScrollControls maps offset to native scroll: offset 0 = scrollY 0, offset 6 = scrollY 6*vh
    const targetY = idx * window.innerHeight
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-2.5 transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {sections.map((s) => {
        const isActive = s.idx === activeSection
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.idx)}
            className="group flex items-center gap-3 py-1.5 cursor-pointer"
            title={s.label}
            aria-label={`Scroll to ${s.label}`}
          >
            {/* Label */}
            <span
              className={`hidden md:inline-block font-mono text-[10px] tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'text-cyber-cyan opacity-100 translate-x-0'
                  : 'text-gray-600 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-400'
              }`}
            >
              {s.label}
            </span>

            {/* Dot */}
            <span className="relative flex items-center justify-center w-3.5 h-3.5">
              <span
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-cyber-cyan/20 scale-150'
                    : 'bg-transparent scale-100 group-hover:bg-cyber-cyan/10 group-hover:scale-125'
                }`}
              />
              <span
                className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-cyber-cyan'
                    : 'bg-gray-700 group-hover:bg-gray-400'
                }`}
                style={
                  isActive
                    ? { boxShadow: '0 0 6px #00ffff, 0 0 14px #00ffff, 0 0 22px #00ffffaa' }
                    : undefined
                }
              />
            </span>
          </button>
        )
      })}

      {/* Vertical line */}
      <div
        className="absolute right-[6.5px] top-1 bottom-1 w-px bg-gradient-to-b from-transparent via-cyber-cyan/15 to-transparent pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </nav>
  )
}
