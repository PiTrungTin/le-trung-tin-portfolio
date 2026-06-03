import { useStore } from '../../store/useStore'

const sections = [
  { id: 'hero', label: 'Home', idx: 0 },
  { id: 'why-me', label: 'Why me', idx: 1 },
  { id: 'skills', label: 'Skills', idx: 2 },
  { id: 'projects', label: 'Projects', idx: 3 },
  { id: 'experience', label: 'Experience', idx: 4 },
  { id: 'contact', label: 'Contact', idx: 5 },
]

export function Navigation() {
  const activeSection = useStore((s) => s.activeSection)

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/6 bg-[#f8f4ec]/92 backdrop-blur-md">
      <div className="mx-auto flex min-h-[92px] max-w-[1200px] items-center justify-between px-6 sm:px-8 lg:px-12">
        <button
          onClick={() => handleClick('hero')}
          className="flex min-w-[180px] items-center justify-center"
          aria-label="Go to top"
        >
          <img
            src="/logo-new.png"
            alt="Le Trung Tin logo"
            className="h-16 w-auto object-contain md:h-20"
          />
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {sections.map((section) => {
            const isActive = section.idx === activeSection

            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={`text-sm transition-colors ${
                  isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {section.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
