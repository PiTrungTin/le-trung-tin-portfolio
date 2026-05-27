import { useEffect, useState } from 'react'
import { useStore } from '../../store/useStore'

const sections = [
  { id: 'hero', label: 'Intro', idx: 0 },
  { id: 'about', label: 'About', idx: 1 },
  { id: 'skills', label: 'Stack', idx: 2 },
  { id: 'projects', label: 'Work', idx: 3 },
  { id: 'experience', label: 'Path', idx: 4 },
  { id: 'contact', label: 'Contact', idx: 5 },
]

export function Navigation() {
  const activeSection = useStore((s) => s.activeSection)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const handleClick = (idx: number) => {
    window.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[100] transition-all duration-700 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <div className="rounded-[22px] border border-white/60 bg-white/70 px-3 py-3 backdrop-blur-xl shadow-[0_24px_60px_rgba(23,50,77,0.12)]">
        <div className="flex flex-col gap-2">
          {sections.map((section) => {
            const isActive = section.idx === activeSection
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.idx)}
                className={`group flex items-center justify-end gap-3 rounded-full px-3 py-2 text-right transition-all duration-300 ${
                  isActive ? 'bg-sky-50' : 'hover:bg-white/85'
                }`}
                title={section.label}
                aria-label={`Scroll to ${section.label}`}
              >
                <span
                  className={`hidden md:block font-mono text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 ${
                    isActive ? 'text-slate-700' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  {section.label}
                </span>

                <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive ? 'scale-150 bg-cyber-cyan/20' : 'scale-100 bg-transparent'
                    }`}
                  />
                  <span
                    className={`relative h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                      isActive
                        ? 'border-cyber-cyan bg-cyber-cyan'
                        : 'border-slate-300 bg-white group-hover:border-cyber-magenta group-hover:bg-cyber-magenta/70'
                    }`}
                  />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
