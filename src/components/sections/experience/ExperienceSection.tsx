import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'

const experiences = [
  {
    role: 'Middle Software Engineer',
    company: 'Hanatour Japan System',
    year: 'Oct 2024 - Present',
    desc: 'Led Vue 3 frontend initialization, built dynamic tour-builder logic, optimized high-load APIs with Redis caching, and improved hotel search response time with ElasticSearch.',
    variant: 'cyan' as const,
  },
  {
    role: 'Full-Stack Software Engineer',
    company: 'FPT Software',
    year: 'Sep 2022 - Sep 2024',
    desc: 'Worked across Java/Spring Boot, NestJS microservices, Kafka workflows, Azure DevOps pipelines, and React/Vue booking interfaces for travel systems.',
    variant: 'magenta' as const,
  },
  {
    role: 'Technical Coordination and Reliability',
    company: 'Sub-leader responsibilities and production support',
    year: 'Recent impact',
    desc: 'Coordinated tasks, unblocked technical issues, improved code quality through peer review, and introduced idempotency plus DLQ patterns to prevent duplicate processing and data loss.',
    variant: 'yellow' as const,
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative flex min-h-screen items-center py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[9%] top-20 h-[60%] w-px bg-[linear-gradient(180deg,rgba(22,158,230,0),rgba(22,158,230,0.35),rgba(249,115,82,0.25),rgba(243,182,63,0))]" />
        <div className="absolute right-[10%] top-28 space-y-8 opacity-40">
          <div className="h-16 w-16 rounded-full border border-cyan-200/40" />
          <div className="ml-10 h-10 w-10 rounded-full border border-orange-200/40" />
          <div className="ml-4 h-12 w-12 rounded-full border border-amber-200/40" />
        </div>
      </div>

      <div className="relative z-10 w-full">
        <SectionHeading title="Path" subtitle="experience and delivery style" variant="yellow" />

        <div className="relative mt-10 space-y-6 before:absolute before:left-[18px] before:top-6 before:bottom-6 before:w-px before:bg-[linear-gradient(180deg,rgba(22,158,230,0.4),rgba(249,115,82,0.32),rgba(243,182,63,0.32))] md:before:left-1/2 md:before:-translate-x-1/2">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative grid gap-5 md:grid-cols-2 md:gap-8 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="hidden md:block" />
              <div className="absolute left-[18px] top-8 h-3.5 w-3.5 -translate-x-[5px] rounded-full border border-white bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.6)] md:left-1/2 md:-translate-x-1/2" />
              <HolographicCard variant={exp.variant} className="ml-10 md:ml-0 bg-white/74">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{exp.year}</p>
                <h3 className="mt-4 font-display text-2xl uppercase leading-[1.2] tracking-[0.06em] text-slate-900">{exp.role}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-slate-500">{exp.company}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{exp.desc}</p>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
