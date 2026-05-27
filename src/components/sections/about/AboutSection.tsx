import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'

const stats = [
  { value: '4+', label: 'Years of experience', variant: 'cyan' as const },
  { value: 'Travel', label: 'Hospitality domain experience', variant: 'magenta' as const },
  { value: 'Kafka', label: 'Event-driven systems', variant: 'yellow' as const },
  { value: 'React + Vue', label: 'Frontend delivery', variant: 'cyan' as const },
]

export function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[6%] top-24 h-40 w-40 rounded-full border border-cyan-100/40" />
        <div className="absolute right-[8%] bottom-20 h-56 w-56 rounded-full bg-orange-100/30 blur-3xl" />
        <div className="absolute right-[18%] top-28 h-24 w-24 rotate-45 rounded-[24px] border border-orange-200/30" />
      </div>

      <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <SectionHeading title="About" subtitle="system profile" variant="cyan" />
          <div className="space-y-5 text-base leading-8 text-slate-600 md:text-lg">
            <p>
              I am a full-stack software engineer with hands-on experience across backend services,
              frontend applications, and technical coordination in product teams. Most of my work
              has been in travel and hospitality, where correctness and reliability matter every day.
            </p>
            <p>
              My core strengths are Java and Spring Boot, NestJS microservices, Kafka-based workflows,
              and frontend implementation with React and Vue.js. I also care about maintainability,
              reusable module design, and practical performance improvements under real load.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <HolographicCard variant="magenta" className="bg-white/72">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">Working style</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                I focus on stable APIs, scalable module structure, and clear technical coordination when teams need help unblocking delivery.
              </p>
            </HolographicCard>
            <HolographicCard variant="yellow" className="bg-white/72">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">Based in</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Ho Chi Minh City, Vietnam. Open to backend, full-stack, and product engineering opportunities.
              </p>
            </HolographicCard>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {stats.map((stat, i) => (
            <HolographicCard key={stat.label} variant={stat.variant} delay={0.15 + i * 0.08} className="bg-white/70">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-display text-3xl uppercase tracking-[0.08em] text-slate-900">{stat.value}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">{stat.label}</p>
                </div>
                <div className={`h-10 w-10 rounded-2xl ${
                  stat.variant === 'cyan'
                    ? 'bg-sky-50'
                    : stat.variant === 'magenta'
                      ? 'bg-orange-50'
                      : 'bg-amber-50'
                }`} />
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  )
}
