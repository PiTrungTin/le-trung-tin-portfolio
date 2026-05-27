import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'
import { useStore } from '../../../store/useStore'

const projects = [
  {
    name: 'Vue 3 Frontend Initialization',
    desc: 'Led frontend initialization at Hanatour Japan System with a modular Vue 3 architecture for booking-related modules.',
    tech: ['Vue 3', 'Architecture', 'State Management'],
    color: 'cyan' as const,
  },
  {
    name: 'Tour Builder Logic',
    desc: 'Developed custom tour-builder logic handling dynamic pricing and business rules for tour configuration.',
    tech: ['Business Rules', 'Pricing', 'Frontend Logic'],
    color: 'magenta' as const,
  },
  {
    name: 'NestJS Microservices Migration',
    desc: 'Transitioned legacy modules to NestJS microservices, improving scalability and maintainability.',
    tech: ['NestJS', 'Microservices', 'Scalability'],
    color: 'yellow' as const,
  },
  {
    name: 'Kafka and Reliability Patterns',
    desc: 'Implemented Kafka workflows, idempotent consumers, DLQ safety nets, and integrations with travel APIs.',
    tech: ['Kafka', 'Idempotency', 'DLQ'],
    color: 'cyan' as const,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="relative flex min-h-screen items-center py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[8%] top-16 h-44 w-44 rotate-6 rounded-[32px] border border-cyan-200/25" />
        <div className="absolute right-[6%] bottom-16 h-56 w-56 bg-[radial-gradient(circle,rgba(249,115,82,0.12),transparent_62%)]" />
        <div className="absolute left-[14%] bottom-24 flex gap-3 opacity-45">
          <span className="h-2 w-16 rounded-full bg-cyan-200/70" />
          <span className="h-2 w-8 rounded-full bg-orange-200/70" />
          <span className="h-2 w-20 rounded-full bg-amber-200/70" />
        </div>
      </div>

      <div className="relative z-10 w-full">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start xl:grid-cols-[320px_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading title="Selected Work" subtitle="projects with product context" variant="magenta" />
            <p className="text-base leading-8 text-slate-600">
              These cards summarize representative work and impact from my recent experience in travel systems,
              frontend architecture, and backend reliability.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, i) => (
              <div key={project.name} className={i % 2 === 1 ? 'lg:translate-y-8' : ''}>
                <HolographicCard variant={project.color} delay={i * 0.08} className="h-full bg-white/72">
                  <button
                    className="w-full cursor-pointer text-left"
                    onClick={() => {
                      useStore.getState().setActiveProject(i)
                      useStore.getState().triggerGlitchEffect()
                    }}
                    style={{ background: 'none', border: 'none', padding: 0 }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Case 0{i + 1}</p>
                    <h3 className="mt-4 font-display text-2xl uppercase leading-[1.2] tracking-[0.06em] text-slate-900">
                      {project.name}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{project.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/70 bg-white/75 px-3 py-1.5 font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-slate-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                </HolographicCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
